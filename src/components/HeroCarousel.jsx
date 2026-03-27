import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, MessageCircle } from 'lucide-react'

export default function HeroCarousel({ slides = [], whatsappNumber }) {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)

  useEffect(() => {
    if (slides.length <= 1) return undefined

    const timer = setInterval(() => {
      setDir(1)
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [slides.length])

  if (!slides.length) return null

  const slide = slides[current]
  const ctaHref = whatsappNumber ? `https://wa.me/${whatsappNumber}` : slide.ctaHref || '#contato'

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
    <section className="relative min-h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={dir} mode="wait">
        <motion.div
          key={current}
          custom={dir}
          initial={{ opacity: 0, x: dir * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -60 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt={slide.headline} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(55,38,29,0.88)_0%,rgba(55,38,29,0.72)_40%,rgba(55,38,29,0.35)_100%)]" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex min-h-screen items-center px-6 pt-24 pb-16 md:px-12 lg:px-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-4xl"
          >
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sand/90 font-jost text-xs tracking-[0.24em] uppercase mb-6">
              {slide.tag}
            </span>
            <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-7xl font-light text-white leading-[1.05] mb-5">
              {slide.headline}
            </h1>
            <p className="max-w-3xl font-jost text-base sm:text-lg lg:text-xl text-white/85 leading-relaxed mb-8">
              {slide.sub}
            </p>

            {slide.highlights?.length ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-10 max-w-4xl">
                {slide.highlights.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white/95 backdrop-blur-sm">
                    <Check size={18} className="text-sand shrink-0" />
                    <span className="font-jost text-sm leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            ) : null}

            <a
              href={ctaHref}
              target={whatsappNumber ? '_blank' : undefined}
              rel={whatsappNumber ? 'noreferrer' : undefined}
              className="inline-flex items-center gap-3 rounded-full border border-sand/60 bg-sand/10 text-sand hover:bg-sand/20 font-jost text-sm tracking-widest uppercase px-8 py-4 transition-all duration-300"
            >
              <MessageCircle size={18} />
              {slide.ctaText || 'Agendar avaliação pelo WhatsApp'}
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {slides.length > 1 ? (
        <>
          <button onClick={prev} className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 text-white/60 hover:text-white transition-colors">
            <ChevronLeft size={28} />
          </button>
          <button onClick={next} className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 text-white/60 hover:text-white transition-colors">
            <ChevronRight size={28} />
          </button>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`h-[2px] transition-all duration-500 ${i === current ? 'w-10 bg-sand' : 'w-4 bg-white/40'}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  )
}
