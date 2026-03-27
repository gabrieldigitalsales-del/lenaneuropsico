import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'

export default function AudienceSection({ audience }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="avaliacao" ref={ref} className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-14">
          <span className="block text-muted-foreground font-jost text-xs tracking-[0.3em] uppercase mb-4">{audience.eyebrow}</span>
          <h2 className="font-cormorant text-4xl md:text-6xl font-light text-brown leading-tight">{audience.title}</h2>
          <div className="w-12 h-[1px] bg-sand mx-auto mt-8" />
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {audience.items?.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex gap-4">
                <CheckCircle2 className="mt-1 text-brown shrink-0" size={20} />
                <p className="font-jost text-[15px] leading-relaxed text-foreground/85">{item}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
