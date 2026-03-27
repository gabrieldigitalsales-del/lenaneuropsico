import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { BadgeCheck } from 'lucide-react'

export default function BenefitsSection({ benefits }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 bg-brown text-white">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-14">
          <span className="block text-sand/70 font-jost text-xs tracking-[0.3em] uppercase mb-4">{benefits.eyebrow}</span>
          <h2 className="font-cormorant text-4xl md:text-6xl font-light text-white leading-tight">{benefits.title}</h2>
          <div className="w-12 h-[1px] bg-sand/60 mx-auto mt-8" />
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {benefits.items?.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="flex gap-4">
                <BadgeCheck className="mt-1 text-sand shrink-0" size={20} />
                <p className="font-jost text-[15px] leading-relaxed text-white/85">{item}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
