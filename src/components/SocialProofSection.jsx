import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote } from 'lucide-react'

export default function SocialProofSection({ socialProof }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 bg-muted/35">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="rounded-[2rem] border border-border bg-background px-8 py-12 shadow-sm">
          <Quote className="mx-auto text-brown/60" size={34} />
          <span className="mt-5 block text-muted-foreground font-jost text-xs tracking-[0.3em] uppercase mb-4">{socialProof.eyebrow}</span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-light text-brown leading-tight mb-6">{socialProof.title}</h2>
          <p className="font-jost text-[16px] leading-relaxed text-muted-foreground max-w-2xl mx-auto">{socialProof.text}</p>
        </motion.div>
      </div>
    </section>
  )
}
