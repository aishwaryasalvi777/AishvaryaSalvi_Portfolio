import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `mailto:aishwarya.salvi28@gmail.com?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.name} <${form.email}>`
    setSent(true)
  }

  const inputClass = "w-full bg-transparent font-mono text-sm text-white placeholder:text-[#525252] outline-none py-4 transition-colors duration-200 focus:placeholder:text-[#a3a3a3]"
  const inputWrap = "border-b border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] focus-within:border-white transition-colors duration-200"

  return (
    <section id="contact" className="py-24 px-8 max-w-[1400px] mx-auto" ref={ref}>
      <div className="divider mb-16" />

      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="section-label mb-4">
        <span className="dot" /><span className="num">08</span><span>—</span><span>CONTACT</span>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr,460px] gap-16 items-start">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          <h2 className="section-heading mb-8">
            LET'S BUILD<br />SOMETHING <span className="accent-word">THAT SHIPS.</span>
          </h2>
          <p className="text-[#a3a3a3] text-sm leading-relaxed mb-10 max-w-md">
            Open to data scientist & data analyst roles, AI engineering,
            and contract LLM work. Buffalo-based, open to remote across the US.
          </p>
          <div className="space-y-4 font-mono text-sm">
            {[
              { icon: '✉', label: 'aishwarya.salvi28@gmail.com', href: 'mailto:aishwarya.salvi28@gmail.com' },
              { icon: '◎', label: '+1 716-465-7631', href: 'tel:+17164657631' },
              { icon: '◈', label: 'github.com/aishwaryasalvi777', href: 'https://github.com/aishwaryasalvi777' },
              { icon: '◉', label: 'linkedin.com/in/aishvaryasalvi', href: 'https://www.linkedin.com/in/aishvaryasalvi' },
            ].map(item => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('mailto') || item.href.startsWith('tel') ? undefined : '_blank'}
                rel="noreferrer"
                className="flex items-center gap-3 text-[#a3a3a3] hover:text-white transition-colors duration-150"
              >
                <span className="text-[#cc2200]">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
        >
          <div className="font-mono text-[10px] text-[#cc2200] tracking-[0.3em] uppercase mb-6">
            ✦ DIRECT MESSAGE
          </div>

          {sent ? (
            <div className="py-12 text-center">
              <p className="font-display font-bold text-white text-lg mb-2">Email client opened.</p>
              <p className="text-[#a3a3a3] text-sm">I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-0">
              <div className={inputWrap}>
                <input
                  type="text" required placeholder="YOUR NAME"
                  value={form.name}
                  onChange={e => setForm(s => ({ ...s, name: e.target.value }))}
                  className={inputClass}
                  style={{ letterSpacing: '0.1em' }}
                />
              </div>
              <div className={inputWrap}>
                <input
                  type="email" required placeholder="EMAIL"
                  value={form.email}
                  onChange={e => setForm(s => ({ ...s, email: e.target.value }))}
                  className={inputClass}
                  style={{ letterSpacing: '0.1em' }}
                />
              </div>
              <div className={inputWrap}>
                <textarea
                  required rows={5} placeholder="MESSAGE"
                  value={form.message}
                  onChange={e => setForm(s => ({ ...s, message: e.target.value }))}
                  className={`${inputClass} resize-none`}
                  style={{ letterSpacing: '0.05em' }}
                />
              </div>
              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full font-display font-black text-sm uppercase tracking-widest py-4 transition-all duration-200 hover:bg-[#a31a00] flex items-center justify-center gap-3"
                  style={{ background: '#cc2200', color: '#fff' }}
                >
                  SEND VIA MAIL ↗
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="divider mt-20 mb-8" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[11px] text-[#525252] uppercase tracking-widest">
          © 2026 Aishvarya Salvi · Built with React + Caffeine ☕
        </p>
        <p className="font-mono text-[11px] text-[#525252] uppercase tracking-widest">
          Open to Data Scientist · Data Analyst Roles
        </p>
        <a
          href="#hero"
          className="font-mono text-[11px] uppercase tracking-widest transition-colors hover:text-white"
          style={{ color: '#cc2200' }}
        >
          ↑ BACK TO TOP
        </a>
      </div>
    </section>
  )
}
