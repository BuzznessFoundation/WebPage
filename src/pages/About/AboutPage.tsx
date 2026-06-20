import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Badge } from '@/components/ui/Badge'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'
import { skills } from '@/data/skills'

export default function AboutPage() {
    return (
        <>
            <section className="pt-bz-2xl pb-bz-xl">
                <Container size="narrow">
                    <SectionLabel>Sobre mí</SectionLabel>
                    <h1 className="font-display uppercase text-bz-negro leading-[0.95] text-[12vw] sm:text-bz-xl md:text-[56px] tracking-[-1px] mb-bz-md">
                        Ingeniería, no <span className="text-bz-ambar">improvisación.</span>
                    </h1>
                    <p className="font-body text-bz-lead text-bz-grafito mb-bz-sm">
                        Soy Cristián, estudiante de Ingeniería en Informática en la
                        Universidad de Santiago de Chile y fundador de Buzzness.
                    </p>
                    <p className="font-body text-bz-base text-bz-grafito leading-[1.65] mb-bz-sm">
                        Buzzness nació de una pregunta simple: ¿por qué seguir haciendo a
                        mano lo que un sistema bien diseñado podría hacer por mí? De ahí
                        salieron BuzzINT, mi NAS self-hosted, y los workflows de
                        automatización que sostienen ambos.
                    </p>
                    <p className="font-body text-bz-base text-bz-grafito leading-[1.65]">
                        Fuera del código, la ornitología es lo que más influye en cómo
                        pienso el diseño: precisión geométrica, sistemas que funcionan sin
                        necesitar explicación. No es casualidad que el nombre de la marca
                        venga del trabajo de las abejas.
                    </p>
                </Container>
            </section>

            <section className="pb-bz-2xl">
                <Container size="narrow">
                    <SectionLabel>Stack</SectionLabel>
                    <div className="flex flex-col gap-bz-sm">
                        {skills.map((group) => (
                            <div key={group.category} className="flex flex-col sm:flex-row sm:items-center gap-[6px] sm:gap-bz-sm">
                                <span className="font-body text-bz-xs text-bz-muted uppercase tracking-[1.5px] w-[120px] shrink-0">
                                    {group.category}
                                </span>
                                <div className="flex flex-wrap gap-[6px]">
                                    {group.items.map((item) => (
                                        <Badge key={item}>{item}</Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <Experience />
            <Contact />
        </>
    )
}
