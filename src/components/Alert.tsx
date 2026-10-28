import type { ReactNode } from "react"

type AlertTone = "error" | "success" | "info" | "warning"

const tones: Record<AlertTone, { box: string; icon: string }> = {
    error: { box: "border-red-200 bg-red-50 text-red-800", icon: "⚠️" },
    success: { box: "border-emerald-200 bg-emerald-50 text-emerald-800", icon: "✓" },
    info: { box: "border-brand-200 bg-brand-50 text-ink", icon: "💡" },
    warning: { box: "border-amber-200 bg-amber-50 text-amber-900", icon: "ℹ️" },
}

const Alert = ({ tone = "info", children, icon }: { tone?: AlertTone; children: ReactNode; icon?: string }) => (
    <div role={tone === "error" ? "alert" : "status"}
        className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm leading-relaxed ${tones[tone].box}`}>
        <span aria-hidden="true" className="mt-0.5 shrink-0">{icon ?? tones[tone].icon}</span>
        <div className="flex-1">{children}</div>
    </div>
)
export default Alert
