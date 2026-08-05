import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'

export default function NotFoundPage() {
    return (
        <section className="py-bz-2xl">
            <Container size="narrow" className="text-center">
                <h1 className="font-display uppercase text-bz-negro leading-[0.95] text-[16vw] sm:text-bz-hero tracking-[-2px] mb-bz-md">
                    404
                </h1>
                <p className="font-body text-bz-lead text-bz-grafito mb-bz-lg">
                    Esta página no existe. Pero sí existen las que funcionan.
                </p>
                <Button href="/" variant="primary">
                    Volver al inicio
                </Button>
            </Container>
        </section>
    )
}
