import { defaultSiteContent } from '../data/defaultSiteContent.js'

export function normalizeSiteContent(payload = {}) {
  return {
    ...defaultSiteContent,
    ...payload,
    heroSlides: safeArray(payload.heroSlides ?? defaultSiteContent.heroSlides),
    about: {
      ...defaultSiteContent.about,
      ...payload.about,
      paragraphs: safeArray(payload.about?.paragraphs ?? defaultSiteContent.about.paragraphs),
      stats: safeArray(payload.about?.stats ?? defaultSiteContent.about.stats),
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
    contact: {
      ...defaultSiteContent.contact,
      ...payload.contact,
    },
  }
}

export function safeArray(value) {
  return Array.isArray(value) ? value : []
}
