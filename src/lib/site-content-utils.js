import { defaultSiteContent } from '../data/defaultSiteContent.js'

export function normalizeSiteContent(payload = {}) {
  return {
    ...defaultSiteContent,
    ...payload,
    heroSlides: safeArray(payload.heroSlides ?? defaultSiteContent.heroSlides).map((slide, index) => ({
      ...defaultSiteContent.heroSlides?.[index],
      ...slide,
      highlights: safeArray(slide?.highlights ?? defaultSiteContent.heroSlides?.[index]?.highlights),
    })),
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

export function safeArray(value) {
  return Array.isArray(value) ? value : []
}
