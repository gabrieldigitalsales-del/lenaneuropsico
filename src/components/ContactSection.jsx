import { motion, useInView } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useRef } from 'react'

export default function ContactSection({ contact }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const whatsappLink = contact.whatsappNumber ? `https://wa.me/${contact.whatsappNumber}` : '#'

  return (
    <section id="contato" ref={ref} className="py-24 md:py-36 px-6 bg-brown text-white">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="block text-sand/70 font-jost text-xs tracking-[0.3em] uppercase mb-6">{contact.eyebrow}</span>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-white leading-tight mb-6">{contact.title}</h2>
          <div className="w-12 h-[1px] bg-sand/50 mx-auto mb-10" />
          <p className="font-jost text-white/70 text-[15px] leading-relaxed mb-12 max-w-lg mx-auto">{contact.description}</p>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 border border-sand/40 text-sand font-jost text-sm tracking-widest uppercase px-10 py-4 cursor-pointer hover:bg-sand/10 transition-all duration-300">
            <MessageCircle size={18} />
            {contact.buttonText}
          </a>
          <p className="mt-8 text-white/50 font-jost text-xs">{contact.infoText}</p>
        </motion.div>
      </div>
    </section>
  )
}
