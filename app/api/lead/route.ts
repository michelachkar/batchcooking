import { isPack } from '@/lib/lead/pricing'

// Réception des demandes de rappel (modal « Commencer à planifier » et formulaire « Dites-nous l'essentiel »).
// Validation et anti-spam (champ piège) uniquement : la transmission à un outil (email, CRM…) reste à brancher.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^\+?[0-9 ().-]{8,20}$/
const text = (v: unknown, max: number) =>
  String(v ?? '')
    .trim()
    .slice(0, max)

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }
  // Champ piège rempli : on répond « ok » sans rien traiter.
  if (text(body.website, 100) !== '') return Response.json({ ok: true })

  const phone = text(body.phone, 30)
  const email = text(body.email, 120)
  if (!PHONE.test(phone) || (email !== '' && !EMAIL.test(email))) {
    return Response.json({ ok: false }, { status: 422 })
  }
  const lead = {
    source: text(body.source, 30),
    service: ['batch', 'chef', 'cours'].includes(text(body.service, 10))
      ? text(body.service, 10)
      : null,
    firstName: text(body.firstName, 60) || null,
    phone,
    email: email || null,
    pack: isPack(body.pack) ? body.pack : null,
    period: text(body.period, 10) || null,
    dinners: Number(body.dinners) || null,
    priceAfterCredit: text(body.price, 20) || null,
    household: text(body.household, 30) || null,
    meals: text(body.meals, 10) || null,
    eventDate: /^\d{4}-\d{2}-\d{2}$/.test(text(body.eventDate, 10))
      ? text(body.eventDate, 10)
      : null,
    guests: Number(body.guests) || null,
    location: text(body.location, 160) || null,
    occasion: text(body.occasion, 30) || null,
    formula: text(body.formula, 30) || null,
    choice: text(body.choice, 30) || null,
    message: text(body.message, 1000) || null,
    receivedAt: new Date().toISOString(),
  }
  // TODO : envoyer `lead` vers l'outil de suivi choisi (email, CRM, Google Sheet…).
  console.info('[lead]', lead)
  return Response.json({ ok: true })
}
