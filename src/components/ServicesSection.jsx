import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, ClipboardList, HeartHandshake, Sparkles } from 'lucide-react'

const icons = { Brain, ClipboardList, HeartHandshake, Sparkles }

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.2, ease: [0.4, 0, 0.2, 1] } }),
}

export default function ServicesSection({ services }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="servicos" ref={ref} className="py-24 md:py-36 px-6 bg-muted/40">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-20">
          <span className="block text-muted-foreground font-jost text-xs tracking-[0.3em] uppercase mb-4">{services.eyebrow}</span>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-brown leading-tight">{services.title}</h2>
          <div className="w-12 h-[1px] bg-sand mx-auto mt-8" />
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          {services.items?.map((service, i) => {
            const Icon = icons[service.icon] || Sparkles
            return (
              <motion.div key={service.title} custom={i} variants={cardVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="bg-background rounded-sm p-10 border border-border/60 hover:border-sand/60 hover:shadow-lg transition-all duration-500 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-sand/30 flex items-center justify-center group-hover:bg-sand/50 transition-colors">
                    <Icon size={22} className="text-brown" />
                  </div>
                  <h3 className="font-cormorant text-2xl md:text-3xl text-brown font-light">{service.title}</h3>
                </div>
                <p className="font-jost text-muted-foreground text-[15px] leading-relaxed mb-8">{service.description}</p>
                <ul className="space-y-3">
                  {service.details?.map((d) => (
                    <li key={d} className="flex items-start gap-3 font-jost text-sm text-foreground/80"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-sand flex-shrink-0" />{d}</li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
