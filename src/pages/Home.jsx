import Navbar from '@/components/Navbar'
import HeroCarousel from '@/components/HeroCarousel'
import AudienceSection from '@/components/AudienceSection'
import ExplanationSection from '@/components/ExplanationSection'
import ProcessSection from '@/components/ProcessSection'
import BenefitsSection from '@/components/BenefitsSection'
import AboutSection from '@/components/AboutSection'
import SocialProofSection from '@/components/SocialProofSection'
import InvestmentSection from '@/components/InvestmentSection'
import FAQSection from '@/components/FAQSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import { useSiteContent } from '@/hooks/useSiteContent'

export default function Home() {
  const { content } = useSiteContent()

  return (
    <div className="min-h-screen bg-background">
      <Navbar brandName={content.brandName} />
      <HeroCarousel slides={content.heroSlides} whatsappNumber={content.contact?.whatsappNumber} />
      <AudienceSection audience={content.audience} />
      <ExplanationSection explanation={content.explanation} />
      <ProcessSection process={content.process} />
      <BenefitsSection benefits={content.benefits} />
      <AboutSection about={content.about} />
      <SocialProofSection socialProof={content.socialProof} />
      <InvestmentSection services={content.services} whatsappNumber={content.contact?.whatsappNumber} />
      <FAQSection faq={content.faq} />
      <ContactSection contact={content.contact} />
      <Footer footerText={content.footerText} brandName={content.brandName} />
    </div>
  )
}
