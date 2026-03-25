import crypto from 'node:crypto'
import { getStore } from '@netlify/blobs'
import { isAuthenticated, isConfigured, unauthorized } from './_utils/auth.js'

const store = getStore('site-assets')

function sanitizeName(name = 'imagem') {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 120)
}

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

  const form = await request.formData().catch(() => null)
  const file = form?.get('file')

  if (!(file instanceof File)) {
    return Response.json({ error: 'Arquivo inválido.' }, { status: 400 })
  }

  const safeName = sanitizeName(file.name)
  const key = `uploads/${Date.now()}-${crypto.randomUUID()}-${safeName}`
  const bytes = await file.arrayBuffer()

  await store.set(key, bytes, {
    metadata: {
      contentType: file.type || 'application/octet-stream',
      originalName: file.name,
    },
  })

  const siteUrl = process.env.URL || process.env.DEPLOY_PRIME_URL || process.env.DEPLOY_URL || ''
  const path = `/.netlify/functions/site-asset?key=${encodeURIComponent(key)}`
  const url = siteUrl ? `${siteUrl}${path}` : path

  return Response.json({ ok: true, key, url })
}
