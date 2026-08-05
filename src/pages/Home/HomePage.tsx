import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { SeoMeta } from '@/components/ui/SeoMeta'

export default function HomePage() {
    return (
        <>
            <SeoMeta
                title="Buzzness"
                description="Automatización, CRM y sistemas a medida para pequeñas y medianas empresas en Chile. Sin suscripciones sorpresa, sin depender de plataformas de terceros."
                path="/"
            />
            <Hero />
            <Services limit={3} />
            <Projects limit={4} />
            <Experience />
        </>
    )
}
