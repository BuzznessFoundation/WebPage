import { useEffect, useRef } from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { GridField } from './GridField'
import { KineticMountain } from './KineticMountain'
import { ClientsSection } from './ClientsSection'
import { makeGrain } from './textures'
import './hero.css'

export type HeroProps = {
  /** Destino del botón principal. */
  projectsHref?: string
  /** Destino del botón secundario. */
  contactHref?: string
}

/** BUZZNESS — Kinetic Mountain hero + carrusel de clientes. */
export function Hero({ projectsHref = '/proyectos', contactHref = '/contacto' }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null)

  // Print textures (paper grain + worn ink), generated once and scoped to the hero.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    root.style.setProperty('--grain-dark', `url(${makeGrain('dark')})`)
    root.style.setProperty('--grain-light', `url(${makeGrain('light', 140, 29)})`)
  }, [])

  return (
    <>
      <section ref={rootRef} className="bz-hero" aria-labelledby="bz-hero-title">
        <GridField />

        <div className="bz-hero__body">
          <Container size="wide" className="bz-hero__copy-container">
            <div className="bz-hero__copy">
              <h1
                id="bz-hero-title"
                className="font-display uppercase text-bz-negro leading-[0.95] text-[14vw] sm:text-[11vw] md:text-bz-hero tracking-[-2px] max-w-[1000px]"
              >
                Tu negocio necesita
                <br />
                más que una <span className="text-bz-ambar">página web.</span>
                <br />
                Necesita un <span className="text-bz-ambar">sistema.</span>
              </h1>

              <p className="font-body text-bz-lead text-bz-grafito leading-[1.45] max-w-[560px] mt-bz-md mb-bz-lg">
                Construimos herramientas a medida para pequeñas y medianas empresas. Desde el CRM
                hasta la automatización. Sin suscripciones sorpresa, sin dependencia de plataformas
                de terceros. Todo tuyo.
              </p>

              <div className="flex flex-wrap gap-bz-sm mt-bz-lg">
                <Button href={projectsHref} variant="primary">
                  Ver proyectos
                </Button>
                <Button href={contactHref} variant="crema">
                  Hablemos
                </Button>
              </div>
            </div>
          </Container>

          <KineticMountain />
        </div>

        <p className="bz-hero__meta">
          <span>SANTIAGO, CL</span>
          <span>2026</span>
        </p>
      </section>

      <ClientsSection />
    </>
  )
}

export default Hero
