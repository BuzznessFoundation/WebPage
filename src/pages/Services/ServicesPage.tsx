import { SeoMeta } from '@/components/ui/SeoMeta'
import { ServicesNarrative } from '@/components/sections/ServicesNarrative'

export default function ServicesPage() {
    return (
        <>
            <SeoMeta
                title="Servicios"
                description="Diseño web, automatizaciones, infraestructura propia, Meta & Google Ads, integraciones SII y banca, y herramientas a medida en Python. Siete capacidades, un solo criterio."
                path="/servicios"
            />
            <ServicesNarrative />
        </>
    )
}
