const year = new Date().getFullYear()

const Footer = () => (
    <footer className="mt-16 border-t border-brand-100 bg-white/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-cocoa sm:flex-row sm:px-6">
            <p className="font-display font-bold text-brand-600">מתכונים · בישול מהלב</p>
            <p>מתכונים לימות החול, לשבתות ולמועדים · {year}</p>
        </div>
    </footer>
)
export default Footer
