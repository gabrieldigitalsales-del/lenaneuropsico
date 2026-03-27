import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function FAQSection({ faq }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 bg-muted/40">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-14">
          <span className="block text-muted-foreground font-jost text-xs tracking-[0.3em] uppercase mb-4">{faq.eyebrow}</span>
          <h2 className="font-cormorant text-4xl md:text-6xl font-light text-brown leading-tight">{faq.title}</h2>
          <div className="w-12 h-[1px] bg-sand mx-auto mt-8" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} className="rounded-[1.75rem] border border-border bg-background p-4 md:p-8 shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            {faq.items?.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-jost text-sm md:text-base">{item.question}</AccordionTrigger>
                <AccordionContent className="font-jost text-sm leading-relaxed text-muted-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
