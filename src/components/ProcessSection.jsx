import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ProcessSection({ process }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="processo" ref={ref} className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <span className="block text-muted-foreground font-jost text-xs tracking-[0.3em] uppercase mb-4">{process.eyebrow}</span>
          <h2 className="font-cormorant text-4xl md:text-6xl font-light text-brown leading-tight">{process.title}</h2>
          <div className="w-12 h-[1px] bg-sand mx-auto mt-8" />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {process.steps?.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-2xl border border-border bg-card p-7 shadow-sm"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sand/25 font-cormorant text-2xl text-brown">
                {index + 1}
              </div>
              <h3 className="font-cormorant text-2xl text-brown mb-3">{step.title}</h3>
              <p className="font-jost text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
