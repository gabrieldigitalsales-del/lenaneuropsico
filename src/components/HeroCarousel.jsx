import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function HeroCarousel({ slides = [], brandName = 'Lena Neuropsicologa' }) {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)

  useEffect(() => {
    if (!slides.length) return undefined
    const timer = setInterval(() => {
      setDir(1)
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  if (!slides.length) return null

  const go = (n) => {
    setDir(n > current ? 1 : -1)
    setCurrent(n)
  }

  const prev = () => {
    setDir(-1)
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const next = () => {
    setDir(1)
    setCurrent((prev) => (prev + 1) % slides.length)
  }

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <AnimatePresence initial={false} custom={dir} mode="wait">
        <motion.div key={current} custom={dir} initial={{ opacity: 0, x: dir * 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -60 }} transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }} className="absolute inset-0">
          <img src={slides[current].image} alt={slides[current].headline} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(25,30%,18%)]/75 via-[hsl(25,30%,18%)]/40 to-transparent" />
        </motion.div>
      </AnimatePresence>
      <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-20 max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <span className="inline-block text-sand/80 font-jost text-sm tracking-[0.25em] uppercase mb-6">{slides[current].tag}</span>
            <h1 className="font-cormorant text-5xl md:text-7xl font-light text-white leading-tight mb-4">{slides[current].headline}</h1>
            <p className="font-cormorant text-3xl md:text-5xl font-light text-sand italic mb-10">{slides[current].sub}</p>
            <a href="#servicos" className="inline-block border border-sand/60 text-sand hover:bg-sand/10 font-jost text-sm tracking-widest uppercase px-8 py-3 transition-all duration-300">Conheça os serviços</a>
          </motion.div>
        </AnimatePresence>
      </div>
      <button onClick={prev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 text-white/60 hover:text-white transition-colors"><ChevronLeft size={28} /></button>
      <button onClick={next} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 text-white/60 hover:text-white transition-colors"><ChevronRight size={28} /></button>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => go(i)} className={`h-[2px] transition-all duration-500 ${i === current ? 'w-10 bg-sand' : 'w-4 bg-white/40'}`} />
        ))}
      </div>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center">
        <span className="font-cormorant text-xl text-white/90 tracking-widest">{brandName}</span>
      </div>
    </section>
  )
}
