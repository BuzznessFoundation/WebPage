import { Card } from '@/components/ui/Card'

interface ProblemSolutionProps {
    problem: string
    solution: string
}

/**
 * Bloque compartido problema→solución — usado en cada servicio para
 * mantener la misma estructura didáctica sin repetir el JSX.
 */
export function ProblemSolution({ problem, solution }: ProblemSolutionProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-bz-md">
            <Card variant="crema">
                <span className="font-mono text-bz-xs text-bz-ambar uppercase tracking-[1.5px] block mb-bz-xs">
                    El problema
                </span>
                <p className="font-body text-bz-sm text-bz-grafito leading-[1.6]">{problem}</p>
            </Card>
            <Card variant="negro">
                <span className="font-mono text-bz-xs text-bz-ambar uppercase tracking-[1.5px] block mb-bz-xs">
                    La solución
                </span>
                <p className="font-body text-bz-sm text-bz-beige/90 leading-[1.6]">{solution}</p>
            </Card>
        </div>
    )
}