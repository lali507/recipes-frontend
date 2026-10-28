const visibilityHelp = {
    public: "גלוי לכולם: כל המשתמשים רואים את המתכון ב'מתכונים משותפים'. אפשר לשנות בעריכת המתכון",
    private: "פרטי: רק את רואה את המתכון, הוא לא מופיע לאחרים. אפשר לשנות בעריכת המתכון",
}

const VisibilityBadge = ({ isPublic }: { isPublic: boolean }) => (
    <span title={isPublic ? visibilityHelp.public : visibilityHelp.private}
        className={`inline-flex cursor-help items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${isPublic
            ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
            : "bg-stone-100 text-stone-600 ring-stone-200"}`}>
        {isPublic ? "🌐 גלוי לכולם" : "🔒 פרטי, רק לך"}
    </span>
)
export default VisibilityBadge
