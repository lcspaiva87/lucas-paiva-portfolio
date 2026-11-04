import { About } from '@/components/home/about'
import { ContactSection } from '@/components/home/contact-section'
import { ExperienceSection } from '@/components/home/experience-section'
import { Hero } from '@/components/home/hero'
import { ProjectsSection } from '@/components/home/projects-section'
import { StackSection } from '@/components/home/stack-section'
import { Stats } from '@/components/home/stats'
import { JsonLd } from '@/components/json-ld'
import { getLocale } from '@/i18n/server'
import { getExperiences, getProfile, getProjects, getTechnologies } from '@/lib/cms'
import { personSchema } from '@/lib/structured-data'

export default async function HomePage() {
  const locale = await getLocale()
  const [profile, projects, technologies, experiences] = await Promise.all([
    getProfile(locale),
    getProjects(locale),
    getTechnologies(locale),
    getExperiences(locale),
  ])

  const featured = projects.filter((p) => p.featured)

  return (
    <>
      <JsonLd data={personSchema(profile, technologies, locale)} />
      <Hero profile={profile} heroTechs={technologies.filter((t) => t.showInHero)} />
      <Stats stats={profile.stats ?? []} />
      <About profile={profile} />
      <ProjectsSection
        heading={profile.projectsHeading}
        projects={featured.length > 0 ? featured : projects.slice(0, 3)}
      />
      <ExperienceSection heading={profile.experienceHeading} experiences={experiences} />
      <StackSection
        heading={profile.stackHeading}
        intro={profile.stackIntro}
        technologies={technologies}
      />
      <ContactSection profile={profile} />
    </>
  )
}
