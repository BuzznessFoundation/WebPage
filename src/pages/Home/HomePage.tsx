import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SeoMeta } from '@/components/ui/SeoMeta'

function FeaturedClient() {
    return (
        <section className="pb-bz-2xl">
            <Container size="narrow">
                <SectionLabel>Cliente destacado</SectionLabel>

                <a
                    href="https://www.macarenarioseco.cl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                >
                    <div className="relative">
                        <div className="absolute top-bz-shadow left-bz-shadow w-full h-full bg-bz-ambar rounded-bz transition-transform duration-200 group-hover:translate-x-[2px] group-hover:translate-y-[2px]" />
                        <div className="relative bg-bz-crema border border-bz-ambar rounded-bz px-bz-lg py-bz-xl text-center transition-transform duration-200 group-hover:-translate-y-[2px] group-hover:-translate-x-[2px]">
                            <img
                                src="/icons/mca-rioseco.ico"
                                alt="Dra. Macarena Rioseco"
                                className="w-[56px] h-[56px] mx-auto mb-bz-sm rounded-[8px]"
                            />

                            <div className="flex flex-col gap-[2px] mb-bz-sm">
                                <span className="font-body text-bz-md font-bold text-bz-ambar leading-none">
                                    Dra.
                                </span>
                                <span className="font-display uppercase text-bz-negro text-bz-xl md:text-[36px] leading-[1.05] tracking-[-1px]">
                                    Macarena Rioseco
                                </span>
                                <span className="font-body text-bz-xs text-bz-muted uppercase tracking-[1.5px]">
                                    Odontóloga U. de Chile · 25 años
                                </span>
                            </div>

                            <p className="font-body text-bz-sm text-bz-grafito leading-[1.55] max-w-[400px] mx-auto mb-bz-md">
                                Sitio web, SEO técnico y Google Business Profile para
                                odontología general en Providencia. Captación orgánica, agenda
                                por WhatsApp y diseño editorial adaptado al rubro salud.
                            </p>

                            <span className="inline-flex items-center font-body text-bz-label font-bold text-bz-ambar uppercase tracking-[2px] group-hover:tracking-[3px] transition-all duration-200">
                                Visitar sitio →
                            </span>
                        </div>
                    </div>
                </a>
            </Container>
        </section>
    )
}

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
            <FeaturedClient />
            <Contact />
        </>
    )
}
