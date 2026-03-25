import { Link, useLocation } from 'react-router-dom'

export default function PageNotFound() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-lg text-center">
        <p className="font-jost text-sm uppercase tracking-[0.3em] text-muted-foreground">Erro 404</p>
        <h1 className="mt-4 font-cormorant text-6xl text-brown">Página não encontrada</h1>
        <p className="mt-6 font-jost text-muted-foreground">
          O caminho <span className="font-medium text-foreground">{location.pathname}</span> não existe neste site.
        </p>
        <Link to="/" className="mt-8 inline-flex rounded-md bg-brown px-6 py-3 text-sm font-medium text-white transition hover:opacity-90">
          Voltar para o início
        </Link>
      </div>
    </div>
  )
}
