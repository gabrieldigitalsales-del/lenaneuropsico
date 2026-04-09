import Navbar from '@/components/Navbar'
import HeroCarousel from '@/components/HeroCarousel'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import { useSiteContent } from '@/hooks/useSiteContent'

export default function Home() {
  const { content, loading } = useSiteContent()

  if (loading || !content) {
    return <div className="min-h-screen bg-background" />
  }

  return (
    <div className="min-h-screen">
      <Navbar brandName={content.brandName} />
      <HeroCarousel slides={content.heroSlides} />
      <AboutSection about={content.about} />
      <ServicesSection services={content.services} />
      <ContactSection contact={content.contact} />
      <Footer footerText={content.footerText} brandName={content.brandName} />
    </div>
  )
}