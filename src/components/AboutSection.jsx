import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function AboutSection({ about }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="sobre" ref={ref} className="py-24 md:py-36 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }} className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <img src={about.image} alt={about.subtitle} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brown/20 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-sand/60 rounded-sm z-[-1]" />
            <div className="absolute -top-6 -left-6 w-20 h-20 border border-sand/40 rounded-sm z-[-1]" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}>
            <span className="block text-muted-foreground font-jost text-xs tracking-[0.3em] uppercase mb-6">{about.eyebrow}</span>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-brown leading-tight mb-8">{about.title}<br /><span className="italic">{about.subtitle}</span></h2>
            <div className="w-12 h-[1px] bg-sand mb-8" />
            {about.paragraphs?.map((paragraph, index) => (
              <p key={index} className={`font-jost text-muted-foreground leading-relaxed text-[15px] ${index < about.paragraphs.length - 1 ? 'mb-6' : ''}`}>{paragraph}</p>
            ))}
            <div className="grid grid-cols-2 gap-6 mt-12 pt-10 border-t border-border">
              {about.stats?.map((stat) => (
                <div key={`${stat.value}-${stat.label}`}>
                  <span className="font-cormorant text-4xl text-brown font-light">{stat.value}</span>
                  <p className="font-jost text-xs text-muted-foreground tracking-wider uppercase mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
