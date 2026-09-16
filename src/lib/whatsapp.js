import { WHATSAPP_NUMBER } from './site.js'

function line(label, value) {
  if (value === undefined || value === null || value === '') return ''
  return `${label}: ${value}`
}

export function buildWhatsAppMessage({ booking, puja }) {
  const details = [
    'Dharmaa Tribe - New Puja Booking',
    '',
    line('Puja code', puja?.code || booking.pujaId),
    line('Puja name', puja?.title?.en || puja?.title),
    line('Selected deity', puja?.deity?.en || puja?.deity),
    line('Puja price', booking.packagePrice ? `₹${booking.packagePrice}` : `₹${puja?.price ?? ''}`),
    '',
    line('Preferred date', booking.date),
    line('Preferred time', booking.time),
    line('Participation', booking.participation),
    line('Package', booking.package),
    line('Add-on', booking.addon),
    '',
    line('Name', booking.name),
    line('Phone', booking.phone),
    line('Email', booking.email),
    line('Gotra', booking.gotra),
    line('Ancestor name', booking.ancestorName),
    line('Relationship', booking.relationship),
    line('Tithi / passing date', booking.tithi),
    line('Purpose', booking.purpose),
    line('Family members', booking.familyMembers),
    line('City', booking.city),
    line('Country', booking.country),
    line('Notes', booking.notes),
    '',
    line('Payment', booking.payment),
  ].filter(Boolean)

  return details.join('\n')
}

export function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
