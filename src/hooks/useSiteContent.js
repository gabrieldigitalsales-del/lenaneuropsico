import { useCallback, useEffect, useMemo, useState } from 'react'
import { defaultSiteContent } from '@/data/defaultSiteContent'
import { normalizeSiteContent } from '@/lib/site-content-utils'
import { fetchSiteContent } from '@/lib/api'

const LOCAL_STORAGE_KEY = 'lena-site-content'

function readLocalContent() {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!raw) return null
    return normalizeSiteContent(JSON.parse(raw))
  } catch {
    return null
  }
}

function hasUsableContent(data) {
  return !!(data && typeof data === 'object')
}

export function useSiteContent() {
  const [content, setContent] = useState(() => readLocalContent())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [source, setSource] = useState('local')

  const load = useCallback(async ({ silent = false } = {}) => {
    if (!silent) setLoading(true)

    try {
      const data = await fetchSiteContent()
      const onlineContent = data?.content

      if (hasUsableContent(onlineContent)) {
        const nextContent = normalizeSiteContent(onlineContent)
        setContent(nextContent)
        setSource(data?.source || 'online')
        setError('')

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextContent))
        }
      } else {
        const localContent = readLocalContent()

        if (localContent) {
          setContent(localContent)
          setSource('local')
          setError('')
        } else {
          setContent(normalizeSiteContent(defaultSiteContent))
          setSource('default')
          setError('')
        }
      }
    } catch (err) {
      const localContent = readLocalContent()

      if (localContent) {
        setContent(localContent)
        setSource('local')
      } else {
        setContent(normalizeSiteContent(defaultSiteContent))
        setSource('default')
      }

      setError(err?.message || 'Não foi possível carregar o conteúdo online.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()

    const interval = window.setInterval(() => {
      load({ silent: true })
    }, 15000)

    const handleFocus = () => load({ silent: true })
    window.addEventListener('focus', handleFocus)

    return () => {
      window.clearInterval(interval)
      window.removeEventListener('focus', handleFocus)
    }
  }, [load])

  return useMemo(
    () => ({
      content,
      loading,
      error,
      source,
      refresh: load,
      isOnlineSource: source === 'online',
    }),
    [content, loading, error, source, load],
  )
}