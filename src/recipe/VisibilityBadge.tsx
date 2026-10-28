import type { CSSProperties } from "react"

const badgeStyle = (isPublic: boolean): CSSProperties => ({
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 600,
    background: isPublic ? "#E6F4EA" : "#EEE",
    color: isPublic ? "#1E6B34" : "#444",
    cursor: "help",
})

const visibilityHelp = {
    public: "גלוי לכולם: כל המשתמשים רואים את המתכון ב'מתכונים משותפים'. אפשר לשנות בעריכת המתכון",
    private: "פרטי: רק את רואה את המתכון, הוא לא מופיע לאחרים. אפשר לשנות בעריכת המתכון",
}

const VisibilityBadge = ({ isPublic }: { isPublic: boolean }) => (
    <span style={badgeStyle(isPublic)} title={isPublic ? visibilityHelp.public : visibilityHelp.private}>
        {isPublic ? "🌐 גלוי לכולם" : "🔒 פרטי, רק לך"}
    </span>
)
export default VisibilityBadge
