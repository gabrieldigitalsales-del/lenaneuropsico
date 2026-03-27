import { useEffect, useMemo, useState } from 'react'
import { defaultSiteContent } from '@/data/defaultSiteContent'
import { saveSiteContent, uploadImage } from '@/lib/api'
import { normalizeSiteContent } from '@/lib/site-content-utils'

export default function AdminForm({ content, onSaved }) {
  const [jsonValue, setJsonValue] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [lastUploadUrl, setLastUploadUrl] = useState('')

  useEffect(() => {
    setJsonValue(JSON.stringify(content ?? defaultSiteContent, null, 2))
  }, [content])

  const parsedPreview = useMemo(() => {
    try {
      return JSON.parse(jsonValue)
    } catch {
      return null
    }
  }, [jsonValue])

  const handleSave = async (event) => {
    event.preventDefault()
    setStatus('')
    setError('')

    try {
      const parsed = JSON.parse(jsonValue)
      const normalized = normalizeSiteContent(parsed)
      await saveSiteContent(normalized)
      setStatus('Conteúdo salvo online com sucesso. Os outros dispositivos verão a atualização em breve.')
      onSaved?.()
    } catch (err) {
      setError(err.message || 'Não foi possível salvar.')
    }
  }

  const resetDefault = () => {
    setJsonValue(JSON.stringify(defaultSiteContent, null, 2))
    setStatus('Conteúdo padrão carregado no editor. Clique em salvar para publicar.')
    setError('')
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setUploading(true)
    setStatus('')
    setError('')

    try {
      const data = await uploadImage(file)
      setLastUploadUrl(data.url)
      setStatus(`Imagem enviada com sucesso. Cole a URL no JSON: ${data.url}`)

      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(data.url)
      }
    } catch (err) {
      setError(err.message || 'Não foi possível enviar a imagem.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="rounded-md bg-brown px-5 py-3 text-sm font-medium text-white transition hover:opacity-90">
              Salvar online
            </button>
            <button type="button" onClick={resetDefault} className="rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground transition hover:bg-muted">
              Restaurar conteúdo padrão
            </button>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <p className="mb-3 text-sm text-muted-foreground">
              Edite o JSON abaixo. Ao salvar, o site público passa a ler esse conteúdo da Netlify.
            </p>
            <textarea
              value={jsonValue}
              onChange={(e) => setJsonValue(e.target.value)}
              className="min-h-[560px] w-full rounded-lg border border-border bg-background p-4 font-mono text-sm outline-none"
              spellCheck={false}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <h2 className="font-cormorant text-2xl text-brown">Upload de imagem</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Envie uma imagem para a Netlify. Depois, cole a URL gerada dentro do JSON.
            </p>
            <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background px-4 py-8 text-center">
              <span className="text-sm font-medium">{uploading ? 'Enviando...' : 'Selecionar imagem'}</span>
              <span className="mt-2 text-xs text-muted-foreground">PNG, JPG, WEBP ou SVG</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={uploading} />
            </label>
            {lastUploadUrl ? (
              <div className="mt-4 rounded-lg bg-muted p-3 text-xs break-all">
                <span className="font-medium text-foreground">Última URL:</span>
                <div className="mt-2">{lastUploadUrl}</div>
              </div>
            ) : null}
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <h2 className="font-cormorant text-2xl text-brown">Prévia rápida</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Confira rapidamente os principais pontos antes de salvar.
            </p>
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <span className="text-muted-foreground">Marca</span>
                <p className="font-medium">{parsedPreview?.brandName || '—'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Footer</span>
                <p className="font-medium">{parsedPreview?.footerText || '—'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Imagem da profissional</span>
                {parsedPreview?.about?.image ? (
                  <img src={parsedPreview.about.image} alt="Prévia" className="mt-2 h-40 w-full rounded-lg object-cover" />
                ) : (
                  <p className="font-medium">—</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {status ? <p className="text-sm text-green-700">{status}</p> : null}
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </form>
  )
}
