import crypto from 'node:crypto'

const COOKIE_NAME = 'lena_admin_session'
const MAX_AGE = 60 * 60 * 24 * 30

function getSecret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || ''
}

function getCookieFlags() {
  const isSecure = (process.env.URL || '').startsWith('https://') || process.env.CONTEXT === 'production'
  return [`Path=/`, 'HttpOnly', 'SameSite=Lax', `Max-Age=${MAX_AGE}`, isSecure ? 'Secure' : ''].filter(Boolean).join('; ')
}

export function isConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD)
}

function signPayload(payload) {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('hex')
}

export function createSessionCookie() {
  const issuedAt = Date.now().toString()
  const payload = `${issuedAt}:admin`
  const signature = signPayload(payload)
  const token = Buffer.from(`${payload}:${signature}`).toString('base64url')

  return `${COOKIE_NAME}=${token}; ${getCookieFlags()}`
}

export function clearSessionCookie() {
  const baseFlags = getCookieFlags().replace(`Max-Age=${MAX_AGE}`, 'Max-Age=0')
  return `${COOKIE_NAME}=; ${baseFlags}`
}

function parseCookies(headerValue = '') {
  return Object.fromEntries(
    headerValue
      .split(';')
      .map((part) => part.trim())
      .filter((part) => part.includes('='))
      .map((part) => {
        const index = part.indexOf('=')
        return [part.slice(0, index), part.slice(index + 1)]
      }),
  )
}

export function isAuthenticated(request) {
  const secret = getSecret()
  if (!secret) return false

  const cookies = parseCookies(request.headers.get('cookie') || '')
  const raw = cookies[COOKIE_NAME]
  if (!raw) return false

  try {
    const decoded = Buffer.from(raw, 'base64url').toString('utf8')
    const [issuedAt, role, signature] = decoded.split(':')
    if (!issuedAt || role !== 'admin' || !signature) return false

    const expected = signPayload(`${issuedAt}:${role}`)
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false

    const ageMs = Date.now() - Number(issuedAt)
    return Number.isFinite(ageMs) && ageMs >= 0 && ageMs < MAX_AGE * 1000
  } catch {
    return false
  }
}

export function unauthorized(message = 'Não autorizado.') {
  return Response.json({ error: message }, { status: 401 })
}
