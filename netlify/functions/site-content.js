import { getStore } from '@netlify/blobs'
import { defaultSiteContent } from '../../src/data/defaultSiteContent.js'
import { normalizeSiteContent } from '../../src/lib/site-content-utils.js'

const store = getStore('site-content')
const KEY = 'public.json'

export default async () => {
  const saved = await store.get(KEY, { type: 'json' })
  const content = normalizeSiteContent(saved || defaultSiteContent)

  if (!saved) {
    await store.setJSON(KEY, content)
  }

  return Response.json({ content, source: 'online' })
}
