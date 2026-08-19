import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CONTACT, SERVICE_OPTIONS, WHATSAPP_NUMBER } from '../data/content'
import { openWhatsApp } from '../utils/whatsapp'
import { ensureLenis } from '../hooks/useLenis'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const rootRef = useRef(null)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', service: '', budget: '', details: '',
  })
  const [status, setStatus] = useState(null)

  useEffect(() => {
    let cancelled = false
    let ctx
    ensureLenis().then(() => {
      if (cancelled) return
      requestAnimationFrame(() => {
        if (cancelled) return
        ctx = gsap.context(() => {
          gsap.from('.contact__title', {
            scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
            y: 60, opacity: 0, duration: 1, ease: 'power3.out',
          })
          gsap.from('.contact__form, .contact__aside', {
            scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
            y: 50, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
          })
        }, rootRef)
      })
    })
    return () => {
      cancelled = true
      if (ctx) ctx.revert()
    }
  }, [])

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()

    const blank = (v) => !v || !String(v).trim()
    const field = (label, value) =>
      blank(value) ? null : `${label}: ${value}`

    const lines = [
      'Hi The Archons! I\'d like to start a conversation.',
      '',
      field('Name', form.name),
      field('Email', form.email),
      field('Phone / WhatsApp', form.phone),
      field('Company', form.company),
      field('Service required', form.service),
      field('Estimated budget', form.budget),
    ].filter(Boolean)

    if (!blank(form.details)) {
      lines.push('', 'Project details:', form.details)
    }

    const message = lines.join('\n')

    if (!blank(form.name) || !blank(form.details)) {
      openWhatsApp(message)
    } else {
      openWhatsApp('Hi The Archons! I\'d like to start a conversation.')
    }

    setStatus({ kind: 'ok', msg: 'Opening WhatsApp with your message…' })
    setForm({ name: '', email: '', phone: '', company: '', service: '', budget: '', details: '' })
  }

  return (
    <section id="contact" className="contact section" ref={rootRef}>
      <div className="container contact__inner">
        <header className="contact__head">
          <div className="eyebrow"><span>Start a project</span></div>
          <h2 className="contact__title">
            Let's build something <span className="gradient-text">that grows.</span>
          </h2>
          <p className="contact__lede soft">
            Have an idea, project or business challenge? Tell us what you're building
            and let's turn it into something meaningful.
          </p>
        </header>

        <div className="contact__grid">
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__row">
              <Field label="Full name"  name="name"    value={form.name}    onChange={handleChange} required />
              <Field label="Email"      name="email"   type="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="contact__row">
              <Field label="Phone / WhatsApp" name="phone"   value={form.phone}   onChange={handleChange} />
              <Field label="Company"          name="company" value={form.company} onChange={handleChange} />
            </div>
            <div className="contact__row">
              <Select label="Service required" name="service" value={form.service} onChange={handleChange} options={SERVICE_OPTIONS} />
              <Field label="Estimated budget" name="budget" value={form.budget} onChange={handleChange} placeholder="e.g. $5k – $15k" />
            </div>
            <div className="contact__row contact__row--full">
              <label className="field">
                <span className="field__label">Project details</span>
                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  rows={5}
                  className="field__input field__input--textarea"
                  placeholder="Tell us about your goals, timeline, and what success looks like."
                />
              </label>
            </div>

            <div className="contact__action">
              <button type="submit" className="btn btn--primary" data-cursor>
                Start a Conversation <span className="arrow">→</span>
              </button>
              {status && <span className={`contact__status contact__status--${status.kind}`}>{status.msg}</span>}
            </div>
          </form>

          <aside className="contact__aside">
            <div className="contact__block">
              <span className="contact__label">Email</span>
              <a href={`mailto:${CONTACT.email}`} className="contact__value" data-cursor>{CONTACT.email}</a>
            </div>
            <div className="contact__block">
              <span className="contact__label">Phone</span>
              <a href={`tel:${CONTACT.phone}`} className="contact__value" data-cursor>{CONTACT.phone}</a>
            </div>
            <div className="contact__block">
              <span className="contact__label">WhatsApp</span>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="contact__value" data-cursor>{CONTACT.whatsapp}</a>
            </div>
            <div className="contact__block">
              <span className="contact__label">Address</span>
              <span className="contact__value">{CONTACT.address}</span>
            </div>

            <div className="contact__block">
              <span className="contact__label">Follow</span>
              <div className="contact__socials">
                <a href={CONTACT.social.instagram} data-cursor>Instagram</a>
                <a href={CONTACT.social.linkedin}  data-cursor>LinkedIn</a>
                <a href={CONTACT.social.facebook}  data-cursor>Facebook</a>
                <a href={CONTACT.social.x}         data-cursor>X</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', value, onChange, required, placeholder }) {
  return (
    <label className="field">
      <span className="field__label">{label}{required && <em>*</em>}</span>
      <input
        className="field__input"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </label>
  )
}

function Select({ label, name, value, onChange, options }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <select className="field__input field__input--select" name={name} value={value} onChange={onChange}>
        <option value="">Select a service</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  )
}
