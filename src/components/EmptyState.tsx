import type { ReactNode } from "react"

const EmptyState = ({ icon = "🍽️", title, children }: { icon?: string; title: string; children?: ReactNode }) => (
    <div className="flex flex-col items-center rounded-3xl border-2 border-dashed border-brand-200 bg-white/60 px-6 py-14 text-center">
        <span aria-hidden="true" className="mb-4 text-5xl motion-safe:animate-float">{icon}</span>
        <p className="font-display text-xl font-bold text-ink">{title}</p>
        {children && <div className="mt-2 text-cocoa">{children}</div>}
    </div>
)
export default EmptyState
