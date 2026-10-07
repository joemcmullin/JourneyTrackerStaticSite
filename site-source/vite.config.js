import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

/** Build-time partial includes: `<!-- @include nav.html -->` → partials/nav.html.
 *  One source for the inner pages' header and footer, so pages can't drift. */
function includes() {
  return {
    name: 'includes',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        html.replace(/<!--\s*@include\s+([\w.-]+)\s*-->/g, (_, f) =>
          readFileSync(resolve(import.meta.dirname, 'partials', f), 'utf8')
        ),
    },
  }
}

export default defineConfig({
  plugins: [react(), includes()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        'dose-tracker': resolve(import.meta.dirname, 'features/dose-tracker/index.html'),
        labs: resolve(import.meta.dirname, 'features/labs/index.html'),
        medications: resolve(import.meta.dirname, 'medications/index.html'),
        'how-it-works': resolve(import.meta.dirname, 'how-it-works/index.html'),
        'your-data': resolve(import.meta.dirname, 'your-data/index.html'),
        faq: resolve(import.meta.dirname, 'faq/index.html'),
      },
    },
  },
})
