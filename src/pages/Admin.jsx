import { useState } from 'react'
import AdminForm from '@/components/admin/AdminForm'
import { useAuth } from '@/lib/AuthContext'
import { useSiteContent } from '@/hooks/useSiteContent'

export default function Admin() {
  const { loading, isAuthenticated, login, logout, isConfigured } = useAuth()
  const { content, refresh } = useSiteContent()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    setError('')

    try {
      await login(password)
      setPassword('')
    } catch (err) {
      setError(err.message || 'Não foi possível entrar no painel.')
    }
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Carregando painel...</div>
  }

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-background px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h1 className="font-cormorant text-4xl text-brown">Admin</h1>
          <p className="mt-4 text-muted-foreground">
            Configure a variável <code>ADMIN_PASSWORD</code> na Netlify para ativar o painel online.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Em desenvolvimento local, use <code>netlify dev</code> para testar as Functions e os Blobs.
          </p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background px-6 py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h1 className="font-cormorant text-4xl text-brown">Área Admin</h1>
          <p className="mt-3 text-sm text-muted-foreground">Entre com a senha do painel.</p>
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Senha" className="w-full rounded-md border border-border bg-background px-4 py-3" required />
            <button type="submit" className="w-full rounded-md bg-brown px-4 py-3 text-white">Entrar</button>
          </form>
          {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-cormorant text-4xl text-brown">Painel administrativo</h1>
            <p className="text-sm text-muted-foreground">Conteúdo salvo em Netlify Blobs.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => refresh({ silent: true })} className="rounded-md border border-border px-4 py-2 text-sm">Atualizar</button>
            <button onClick={() => logout()} className="rounded-md border border-border px-4 py-2 text-sm">Sair</button>
          </div>
        </div>
        <AdminForm content={content} onSaved={() => refresh({ silent: true })} />
      </div>
    </div>
  )
}
