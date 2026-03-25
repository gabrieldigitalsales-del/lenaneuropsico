import { clearSessionCookie, createSessionCookie, isAuthenticated, isConfigured } from './_utils/auth.js'

export default async (request) => {
  if (request.method === 'GET') {
    return Response.json({ authenticated: isAuthenticated(request), configured: isConfigured() })
  }

  if (request.method === 'DELETE') {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': clearSessionCookie(),
      },
    })
  }

  if (request.method !== 'POST') {
    return Response.json({ error: 'Método não permitido.' }, { status: 405 })
  }

  if (!isConfigured()) {
    return Response.json({ error: 'Configure ADMIN_PASSWORD na Netlify.' }, { status: 500 })
  }

  const body = await request.json().catch(() => null)
  const password = body?.password || ''

  if (password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Senha inválida.' }, { status: 401 })
  }

  return new Response(JSON.stringify({ authenticated: true, configured: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': createSessionCookie(),
    },
  })
}
