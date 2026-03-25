import { getStore } from '@netlify/blobs'
import { normalizeSiteContent } from '../../src/lib/site-content-utils.js'
import { isAuthenticated, isConfigured, unauthorized } from './_utils/auth.js'

const store = getStore('site-content')
const KEY = 'public.json'

export default async (request) => {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Método não permitido.' }, { status: 405 })
  }

  if (!isConfigured()) {
    return Response.json({ error: 'Configure ADMIN_PASSWORD na Netlify.' }, { status: 500 })
  }

  if (!isAuthenticated(request)) {
    return unauthorized()
  }

  const body = await request.json().catch(() => null)
  const payload = normalizeSiteContent(body?.content || {})

  await store.setJSON(KEY, payload)

  return Response.json({ ok: true, content: payload })
}
