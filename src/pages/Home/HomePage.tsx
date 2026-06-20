import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'

export default function HomePage() {
    return (
        <>
            <Hero />
            <Services limit={3} />
            <Projects limit={4} />
            <Experience />
            <Contact />
        </>
    )
}
