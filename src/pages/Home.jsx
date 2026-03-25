import Navbar from '@/components/Navbar'
import HeroCarousel from '@/components/HeroCarousel'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import { useSiteContent } from '@/hooks/useSiteContent'

export default function Home() {
  const { content, loading, error, isOnlineSource } = useSiteContent()

  return (
    <div className="min-h-screen">
      <Navbar brandName={content.brandName} />
      <HeroCarousel brandName={content.brandName} slides={content.heroSlides} />
      <AboutSection about={content.about} />
      <ServicesSection services={content.services} />
      <ContactSection contact={content.contact} />
      <Footer footerText={content.footerText} brandName={content.brandName} />
      {!isOnlineSource ? (
        <div className="fixed bottom-4 right-4 max-w-xs rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow">
          Sem conexão com as Functions da Netlify. O site está usando o conteúdo local salvo neste dispositivo.
        </div>
      ) : null}
      {loading ? null : error ? (
        <div className="fixed bottom-4 left-4 max-w-xs rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 shadow">
          {error}
        </div>
      ) : null}
    </div>
  )
}
