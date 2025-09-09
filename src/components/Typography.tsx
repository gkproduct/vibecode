import { PropsWithChildren } from 'react'

export function SectionTitle({ children }: PropsWithChildren) {
  return <h2 className="text-2xl font-bold sm:text-4xl">{children}</h2>
}

export function SectionLead({ children }: PropsWithChildren) {
  return <p className="mt-3 text-neutral-600">{children}</p>
}


