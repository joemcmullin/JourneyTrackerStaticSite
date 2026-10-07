#!/usr/bin/env node
/**
 * Post-build prerender: capture the built homepage's rendered DOM with headless
 * Chrome and inject it into dist/index.html, so the page carries its real copy
 * without JavaScript. React re-renders over it on load (markup is var()-driven,
 * so the static paint is correct in both themes). Also stamps apex-build.
 *
 * Run from site-source/ after `vite build`:  node scripts/prerender.mjs
 */
import { execFileSync, execSync, spawn } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const DIST = resolve(import.meta.dirname, '..', 'dist')
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const PORT = 8899

// 1. Serve dist/ (SPA needs real HTTP for module scripts)
const server = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'], {
  cwd: DIST, stdio: 'ignore',
})
await new Promise((r) => setTimeout(r, 800))

try {
  // 2. Render with the entrance animations completed (virtual time fast-forwards GSAP)
  const dom = execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
    '--window-size=1280,900', '--virtual-time-budget=15000',
    '--dump-dom', `http://127.0.0.1:${PORT}/`,
  ], { maxBuffer: 64 * 1024 * 1024, encoding: 'utf8' })

  // 3. Extract the rendered #root subtree (tag-depth scan — dump-dom reserializes
  // markup, so no fixed anchor after the div can be trusted)
  const open = dom.indexOf('<div id="root"')
  if (open < 0) throw new Error('no #root in the dump')
  const start = dom.indexOf('>', open) + 1
  let depth = 1, i = start
  const re = /<div\b|<\/div>/g
  re.lastIndex = start
  let t
  while ((t = re.exec(dom))) {
    depth += t[0] === '</div>' ? -1 : 1
    if (depth === 0) { i = t.index; break }
  }
  if (depth !== 0) throw new Error('unbalanced #root markup in the dump')
  const rendered = dom.slice(start, i)
  if (rendered.trim().length < 2000) {
    throw new Error(`prerender capture too small (${rendered.trim().length} chars) — refusing to ship an empty shell`)
  }

  // 4. Splice into the built shell + stamp the build
  const shell = resolve(DIST, 'index.html')
  let html = readFileSync(shell, 'utf8')
  if (!html.includes('<div id="root"></div>')) throw new Error('dist/index.html has no empty #root to fill')
  html = html.replace('<div id="root"></div>', `<div id="root" data-prerendered>${rendered}</div>`)

  const sha = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim()
  const stamp = `<meta name="apex-build" content="${sha} · ${new Date().toISOString()}">`
  html = html.replace('</head>', `  ${stamp}\n</head>`)

  writeFileSync(shell, html)

  // 5. Prove it: the H1 and real copy must be in the static HTML
  const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
  const mustContain = ['The private companion for', 'your comeback', 'Three jobs', 'Questions,']
  const missing = mustContain.filter((s) => !text.includes(s))
  if (missing.length) throw new Error('prerendered HTML is missing expected copy: ' + missing.join(' | '))
  console.log(`prerender OK — ${Math.round(rendered.length / 1024)} KB of static DOM, build ${sha}, no-JS text ${text.length} chars`)
} finally {
  server.kill()
}
