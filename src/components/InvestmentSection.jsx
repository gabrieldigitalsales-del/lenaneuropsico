import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageCircle } from 'lucide-react'

export default function InvestmentSection({ services, whatsappNumber }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}` : '#'

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <span className="block text-muted-foreground font-jost text-xs tracking-[0.3em] uppercase mb-4">{services.eyebrow}</span>
          <h2 className="font-cormorant text-4xl md:text-6xl font-light text-brown leading-tight">{services.title}</h2>
          <div className="w-12 h-[1px] bg-sand mx-auto mt-8" />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {services.items?.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-[1.75rem] border border-border bg-card p-8 shadow-sm"
            >
              <h3 className="font-cormorant text-3xl text-brown mb-4">{service.title}</h3>
              <p className="font-jost text-[15px] leading-relaxed text-muted-foreground mb-6">{service.description}</p>
              <ul className="space-y-3 mb-8">
                {service.details?.map((detail) => (
                  <li key={detail} className="font-jost text-sm leading-relaxed text-foreground/80 flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sand shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full border border-brown/15 bg-brown text-white px-6 py-3 font-jost text-xs tracking-[0.2em] uppercase hover:opacity-90 transition-opacity">
                <MessageCircle size={16} />
                Falar no WhatsApp
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
