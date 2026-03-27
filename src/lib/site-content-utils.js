import { defaultSiteContent } from '../data/defaultSiteContent.js'

export function normalizeSiteContent(payload = {}) {
  return {
    ...defaultSiteContent,
    ...payload,
    heroSlides: normalizeHeroSlides(payload.heroSlides, defaultSiteContent.heroSlides),
    audience: {
      ...defaultSiteContent.audience,
      ...payload.audience,
      items: safeArray(payload.audience?.items ?? defaultSiteContent.audience.items),
    },
    explanation: {
      ...defaultSiteContent.explanation,
      ...payload.explanation,
      paragraphs: safeArray(payload.explanation?.paragraphs ?? defaultSiteContent.explanation.paragraphs),
    },
    process: {
      ...defaultSiteContent.process,
      ...payload.process,
      steps: safeArray(payload.process?.steps ?? defaultSiteContent.process.steps),
    },
    benefits: {
      ...defaultSiteContent.benefits,
      ...payload.benefits,
      items: safeArray(payload.benefits?.items ?? defaultSiteContent.benefits.items),
    },
    about: {
      ...defaultSiteContent.about,
      ...payload.about,
      paragraphs: safeArray(payload.about?.paragraphs ?? defaultSiteContent.about.paragraphs),
      stats: safeArray(payload.about?.stats ?? defaultSiteContent.about.stats),
      image: payload.about?.image ?? defaultSiteContent.about.image,
    },
    socialProof: {
      ...defaultSiteContent.socialProof,
      ...payload.socialProof,
    },
    services: {
      ...defaultSiteContent.services,
      ...payload.services,
      items: safeArray(payload.services?.items ?? defaultSiteContent.services.items).map((item, index) => ({
        ...defaultSiteContent.services.items?.[index],
        ...item,
        details: safeArray(item?.details ?? defaultSiteContent.services.items?.[index]?.details),
      })),
    },
    faq: {
      ...defaultSiteContent.faq,
      ...payload.faq,
      items: safeArray(payload.faq?.items ?? defaultSiteContent.faq.items),
    },
    contact: {
      ...defaultSiteContent.contact,
      ...payload.contact,
    },
  }
}

function normalizeHeroSlides(slides, fallbackSlides = []) {
  const sourceSlides = safeArray(slides)

  if (!sourceSlides.length) {
    return safeArray(fallbackSlides).map((slide) => ({
      ...slide,
      highlights: safeArray(slide?.highlights),
    }))
  }

  return sourceSlides.map((slide) => ({
    tag: slide?.tag ?? '',
    headline: slide?.headline ?? '',
    sub: slide?.sub ?? '',
    image: slide?.image ?? '',
    highlights: safeArray(slide?.highlights),
    ctaText: slide?.ctaText ?? '',
    ctaHref: slide?.ctaHref ?? '',
  }))
}

export function safeArray(value) {
  return Array.isArray(value) ? value : []
}