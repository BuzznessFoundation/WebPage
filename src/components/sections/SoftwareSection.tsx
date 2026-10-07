import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/ui/Reveal'
import { softwareGroups } from '@/data/software'
import type { SoftwareGroup } from '@/data/software'
import { useStaggerReveal } from '@/lib/useStaggerReveal'
import { cn } from '@/lib/utils'

function SoftwareGroupGrid({ group }: { group: SoftwareGroup }) {
    const { ref, visibleItems } = useStaggerReveal(group.items.length, { staggerMs: 80 })

    return (
        <div>
            <p className="font-mono uppercase text-bz-meta tracking-[1.5px] text-bz-beige/60 mb-bz-sm">
                {group.category}
            </p>

            <div
                ref={ref}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-bz-cards-gap"
            >
                {group.items.map((item, i) => (
                    <div
                        key={item.name}
                        className={cn(
                            'flex flex-col items-center gap-bz-xs border border-bz-beige/15 rounded-bz p-bz-sm text-center',
                            i < visibleItems ? 'animate-bz-rise' : 'opacity-0',
                        )}
                    >
                        <img
                            src={item.logo}
                            alt=""
                            className="w-[28px] h-[28px] object-contain"
                            loading="lazy"
                        />
                        <span className="font-body font-bold text-bz-sm text-bz-beige">
                            {item.name}
                        </span>
                        <span className="font-mono text-bz-meta uppercase text-bz-beige/50">
                            {item.role}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function SoftwareSection() {
    return (
        <section className="bg-bz-negro py-bz-2xl">
            <Container size="wide">
                <Reveal>
                    <SectionLabel invert>Stack</SectionLabel>

                    <h2 className="font-display uppercase text-bz-ambar text-bz-2xl">Software</h2>
                    <p className="font-body text-bz-sm text-bz-beige/70 max-w-[560px] mt-bz-sm">
                        Herramientas que usamos para construir, automatizar y mantener cada sistema.
                    </p>
                </Reveal>

                <div className="mt-bz-xl space-y-bz-xl">
                    {softwareGroups.map((group) => (
                        <SoftwareGroupGrid key={group.category} group={group} />
                    ))}
                </div>
            </Container>
        </section>
    )
}
