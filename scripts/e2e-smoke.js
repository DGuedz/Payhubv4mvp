const jwt = require('jsonwebtoken')

async function run() {
  const BASE_URL = process.env.BASE_URL
  const JWT_SECRET = process.env.JWT_SECRET
  if (!BASE_URL) {
    console.error('Missing BASE_URL')
    process.exit(1)
  }
  if (!JWT_SECRET) {
    console.error('Missing JWT_SECRET')
    process.exit(1)
  }
  const token = jwt.sign({ merchantId: 'test-merchant', role: 'merchant' }, JWT_SECRET, { expiresIn: '10m' })
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

  const results = { ok: true, steps: {} }

  async function post(endpoint, body) {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 8000)
    const res = await fetch(`${BASE_URL}${endpoint}`, { method: 'POST', headers, body: JSON.stringify(body), signal: ctrl.signal }).catch(err => {
      throw new Error(String(err))
    })
    clearTimeout(t)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  }

  async function get(endpoint) {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 8000)
    const res = await fetch(`${BASE_URL}${endpoint}`, { headers, signal: ctrl.signal }).catch(err => {
      throw new Error(String(err))
    })
    clearTimeout(t)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  }

  try {
    console.log('Trustline RLUSD')
    const trust = await post('/api/trustline-rlusd', { limit: '10000' })
    results.steps.trustline = trust
    console.log(`txHash=${trust.txHash} sequence=${trust.sequence}`)
  } catch (e) {
    results.ok = false
    results.steps.trustline = { ok: false, error: String(e) }
  }

  let owner
  let offerSequence
  try {
    console.log('EscrowCreate RLUSD')
    const create = await post('/api/escrow-create', { value: '250.00' })
    results.steps.escrowCreate = create
    owner = create.owner
    offerSequence = create.offerSequence
    console.log(`owner=${owner} offerSequence=${offerSequence} txHash=${create.txHash}`)
  } catch (e) {
    results.ok = false
    results.steps.escrowCreate = { ok: false, error: String(e) }
  }

  try {
    if (!owner || !offerSequence) throw new Error('Missing owner/offerSequence')
    console.log('EscrowFinish RLUSD')
    const finish = await post('/api/escrow-finish', { owner, offerSequence })
    results.steps.escrowFinish = finish
    console.log(`txHash=${finish.txHash} sequence=${finish.sequence}`)
  } catch (e) {
    results.ok = false
    results.steps.escrowFinish = { ok: false, error: String(e) }
  }

  try {
    console.log('Yield Activate')
    const ya = await post('/api/v1/merchant/yield/activate', {})
    results.steps.yieldActivate = ya
    console.log(`status=${ya.status || 'ACTIVE'}`)
  } catch (e) {
    results.ok = false
    results.steps.yieldActivate = { ok: false, error: String(e) }
  }

  try {
    console.log('Security Alerts')
    const sa = await get('/api/security/alerts')
    results.steps.securityAlerts = sa
    console.log(`alerts=${(sa.alerts && sa.alerts.length) || 0}`)
  } catch (e) {
    results.ok = false
    results.steps.securityAlerts = { ok: false, error: String(e) }
  }

  console.log(JSON.stringify(results, null, 2))
  process.exit(results.ok ? 0 : 1)
}

run()
