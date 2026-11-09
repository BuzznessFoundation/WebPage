import { useEffect } from 'react'
import { SeoMeta } from '@/components/ui/SeoMeta'
import { ServicesBento } from '@/components/sections/ServicesBento'
import { trackViewContent } from '@/lib/analytics'

export default function ServicesPage() {
    // ViewContent: base para remarketing sobre quien miró la oferta y no escribió.
    useEffect(() => {
        trackViewContent('servicios')
    }, [])

    return (
        <>
            <SeoMeta path="/servicios" />
            <ServicesBento />
        </>
    )
}
