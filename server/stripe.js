import Stripe from 'stripe'

let _stripe = null

export function getStripe() {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  }
  return _stripe
}

export const TIERS = {
  starter: {
    name: 'Starter Session',
    price: 4500, // pence
    description: '60-min diagnostic session',
  },
  sprint: {
    name: 'Homework System Sprint',
    price: 19900,
    description: '2-week intensive (2×60min + coaching)',
  },
  exam: {
    name: 'Exam Support Block',
    price: 34900,
    description: '6×60min sessions over 3–6 weeks',
  },
  bundle4: {
    name: '4-Session Bundle',
    price: 15200,
    description: '4×60min tutoring sessions',
  },
}
