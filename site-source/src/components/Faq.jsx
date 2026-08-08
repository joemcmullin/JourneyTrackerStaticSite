import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * FAQs — ported verbatim from the pre-redesign site (all 11 questions) so
 * existing /#faqs deep links keep working after the swap. Accessible
 * accordion: aria-expanded / aria-controls per WCAG 4.1.2.
 */
const FAQS = [
  ['What is Journey Tracker and who is it for?', 'Journey Tracker is a personal health tracking app for people on GLP-1 medications like semaglutide, tirzepatide, and similar — or anyone tracking weight and body composition. It helps you keep your doses, lab results, weight, and progress organized in one private place. No medication is required to use the app.'],
  ['Do I need to be on GLP-1 medication to use Journey Tracker?', "Not at all. While the app was built with GLP-1 users in mind, every core feature — weight tracking, body composition, hydration, fasting, and milestones — works great on its own. The GLP-1 Therapy feature can be enabled or disabled in Settings → Features. You can simply leave it off if it doesn't apply to you."],
  ['Where is my data stored? Is it in the cloud?', "Your data lives on your device and, if you enable it, in your personal iCloud account for sync and backup. We don't run servers that store your health data, and we can't see it. Apple's iCloud encryption protects data in transit and at rest."],
  ['How does Journey Tracker use Apple Health?', 'You choose exactly what Journey Tracker can read from or write to Apple Health — weight, body fat, steps, and more. Permissions are managed by iOS, and you can change or revoke them anytime in Settings. HealthKit data is never used for advertising and never leaves your device because of us.'],
  ['Is my information shared with my doctor, employer, or insurer?', "No. We don't share your information with anyone — not doctors, employers, insurers, or advertisers. Sharing is entirely in your hands: you can export reports or share progress images yourself, but nothing is ever sent on your behalf."],
  ['Is Journey Tracker free? How does the trial work?', "Journey Tracker offers a 7-day free trial with full access to every Pro feature — no charge today, cancel anytime before the trial ends. After that, keep Pro with a monthly, annual, or one-time lifetime purchase, or continue with the free tier, which keeps recent weight history, basic injection logging, and activity recording. Billing is handled privately through your Apple ID."],
  ['Does Journey Tracker give medical advice?', 'No. Journey Tracker is a tracking and organization tool, not a medical device, and it never gives medical advice, diagnosis, or treatment recommendations. Always talk with your healthcare provider about your medications and health decisions.'],
  ['Can I use Journey Tracker outside the United States?', 'Yes. Journey Tracker works worldwide and supports pounds, kilograms, and stones. Some regional lab-unit conventions are supported as well. The app is currently available in English.'],
  ['What devices are supported?', 'Journey Tracker is built for iPhone, iPad, and Mac (Apple silicon), with iCloud sync keeping them in step. It requires iOS 17 or later.'],
  ["My data isn't showing up on my other device yet. Is something wrong with sync?", "Probably not — iCloud sync is handled by Apple and can take a few moments (occasionally longer) to propagate between devices, especially after fresh installs or large imports. Make sure both devices are signed into the same Apple ID with iCloud enabled for Journey Tracker, and give it a little time."],
  ['How do I contact support?', 'Email support@journeytracker.app — a real person reads every message. You can also use the contact options on the Support page, where common troubleshooting steps are documented.'],
]

function Item({ q, a, i, open, onToggle }) {
  return (
    <div className="hairline rounded-2xl bg-card shadow-md shadow-black/[0.03]">
      <button
        id={`faq-btn-${i}`}
        aria-expanded={open}
        aria-controls={`faq-panel-${i}`}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[1.02rem] font-bold text-text-hi"
      >
        {q}
        <ChevronDown
          size={18}
          strokeWidth={2.5}
          aria-hidden="true"
          className={`shrink-0 text-accent transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-panel-${i}`}
            role="region"
            aria-labelledby={`faq-btn-${i}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-[0.95rem] leading-relaxed text-text-mid">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faqs" className="mx-auto w-[min(94vw,54rem)] py-28">
      <p className="font-mono text-[0.75rem] uppercase tracking-[0.24em] text-accent">FAQs</p>
      <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.9rem)] font-extrabold tracking-tight text-text-hi">
        Questions, <span className="font-drama italic text-gradient">answered.</span>
      </h2>

      <div className="mt-12 space-y-4">
        {FAQS.map(([q, a], i) => (
          <Item key={i} q={q} a={a} i={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </div>
    </section>
  )
}
