import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Início', href: '#' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Contato', href: '#contato' },
]

export default function Navbar({ brandName }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className={`font-cormorant text-xl tracking-widest transition-colors ${scrolled ? 'text-brown' : 'text-white'}`}>
          {brandName}
        </a>
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a key={l.label} href={l.href} className={`font-jost text-xs tracking-[0.2em] uppercase hover:opacity-60 transition-opacity ${scrolled ? 'text-foreground' : 'text-white/80'}`}>
              {l.label}
            </a>
          ))}
        </div>
        <button onClick={() => setOpen(!open)} className={`md:hidden ${scrolled ? 'text-foreground' : 'text-white'}`}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background/98 border-t border-border px-6 py-6 flex flex-col gap-6">
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="font-jost text-sm tracking-[0.2em] uppercase text-foreground">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
