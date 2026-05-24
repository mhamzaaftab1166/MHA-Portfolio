import heroEn        from '@/data/hero.json'
import aboutEn       from '@/data/about.json'
import skillsEn      from '@/data/skills.json'
import experienceEn  from '@/data/experience.json'
import educationEn   from '@/data/education.json'
import projectsEn    from '@/data/projects.json'
import contactEn     from '@/data/contact.json'
import navbarEn      from '@/data/navbar.json'

import heroAr        from '@/data/ar/hero.json'
import aboutAr       from '@/data/ar/about.json'
import skillsAr      from '@/data/ar/skills.json'
import experienceAr  from '@/data/ar/experience.json'
import educationAr   from '@/data/ar/education.json'
import projectsAr    from '@/data/ar/projects.json'
import contactAr     from '@/data/ar/contact.json'
import navbarAr      from '@/data/ar/navbar.json'

const dataMap = {
  en: { hero: heroEn, about: aboutEn, skills: skillsEn, experience: experienceEn, education: educationEn, projects: projectsEn, contact: contactEn, navbar: navbarEn },
  ar: { hero: heroAr, about: aboutAr, skills: skillsAr, experience: experienceAr, education: educationAr, projects: projectsAr, contact: contactAr, navbar: navbarAr },
}

type Locale  = 'en' | 'ar'
type DataKey = keyof typeof dataMap.en

export function getData<K extends DataKey>(key: K, locale: Locale): typeof dataMap.en[K] {
  return dataMap[locale]?.[key] ?? dataMap.en[key]
}
