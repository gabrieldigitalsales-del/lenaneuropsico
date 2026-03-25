import { getStore } from '@netlify/blobs'

const store = getStore('site-assets')

export default async (request) => {
  const url = new URL(request.url)
  const key = url.searchParams.get('key')

  if (!key) {
    return new Response('Arquivo não encontrado.', { status: 404 })
  }

  const result = await store.getWithMetadata(key, { type: 'arrayBuffer' })

  if (!result || !result.data) {
    return new Response('Arquivo não encontrado.', { status: 404 })
  }

  return new Response(result.data, {
    headers: {
      'Content-Type': result.metadata?.contentType || 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
