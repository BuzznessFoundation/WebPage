import { Hero } from '@/components/sections/Hero'
import { SoftwareSection } from '@/components/sections/SoftwareSection'
import { Services } from '@/components/sections/Services'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { SeoMeta } from '@/components/ui/SeoMeta'

export default function HomePage() {
    return (
        <>
            <SeoMeta path="/" />
            <Hero />
            <SoftwareSection />
            <Services limit={3} />
            <Projects featuredIds={['chatwoot-kanban', 'iot-tailscale', 'mca-rioseco']} />
            <Contact />
        </>
    )
}
