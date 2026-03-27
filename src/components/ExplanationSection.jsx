import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ExplanationSection({ explanation }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 bg-muted/35">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <span className="block text-muted-foreground font-jost text-xs tracking-[0.3em] uppercase mb-4">{explanation.eyebrow}</span>
          <h2 className="font-cormorant text-4xl md:text-6xl font-light text-brown leading-tight mb-8">{explanation.title}</h2>
          <div className="space-y-6">
            {explanation.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="font-jost text-[16px] leading-relaxed text-muted-foreground">{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
