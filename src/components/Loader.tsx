const Loader = ({ text = "טוען..." }: { text?: string }) => (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-16 text-cocoa">
        <span className="relative flex size-12">
            <span className="absolute inset-0 rounded-full border-4 border-brand-100" />
            <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-brand-500" />
            <span className="absolute inset-0 grid place-items-center text-lg" aria-hidden="true">🍲</span>
        </span>
        <span className="text-sm font-medium">{text}</span>
    </div>
)
export default Loader
