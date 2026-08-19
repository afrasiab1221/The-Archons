import { WHATSAPP_NUMBER } from '../data/content'

/**
 * Build a wa.me click-to-chat URL with an optional pre-filled message.
 * The message is URL-encoded so it survives special characters and emojis.
 */
export function buildWhatsAppLink(message = '') {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

/**
 * Open WhatsApp chat in a new tab with an optional pre-filled message.
 */
export function openWhatsApp(message = '') {
  if (typeof window === 'undefined') return
  window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer')
}
