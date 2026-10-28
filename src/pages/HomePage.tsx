import type { CSSProperties } from "react"
import { Link } from "react-router"
import { useAppSelector } from "../store/hook"
import { selectUser } from "../store/state/userSlice"

const colors = {
    primary: "#E8452C",
    secondary: "#FF9A3C",
    text: "#15110d",
    soft: "#FFF4EC",
}

const features = [
    { icon: "🍲", title: "מאגר מתכונים", text: "מגוון מתכונים מסודרים לפי קטגוריות, עם חיפוש וסינון לפי רמת קושי וסוג תפריט" },
    { icon: "📝", title: "המתכונים שלי", text: "כתבי, ערכי ושמרי את המתכונים שלך. את בוחרת מה ציבורי ומה נשאר רק אצלך" },
    { icon: "❤️", title: "מועדפים", text: "מצאת מתכון שאהבת? לחיצה על הלב והוא תמיד יחכה לך ברשימת המועדפים" },
    { icon: "📷", title: "תמונות", text: "אפשר לצרף תמונה לכל מתכון, כדי לראות מראש איך המנה אמורה להיראות" },
]

const steps = [
    { title: "נרשמים", text: "הרשמה קצרה עם שם, אימייל וסיסמה" },
    { title: "מעיינים", text: "מחפשים מתכון מתאים ושומרים את האהובים במועדפים" },
    { title: "משתפים", text: "מוסיפים מתכון משלך ובוחרים אם לשתף אותו" },
]

const buttonStyle = (filled: boolean): CSSProperties => ({
    padding: "12px 28px",
    borderRadius: 999,
    fontWeight: 700,
    textDecoration: "none",
    border: `2px solid ${colors.primary}`,
    background: filled ? colors.primary : "transparent",
    color: filled ? "#fff" : colors.primary,
})

const HomePage = () => {
    const user = useAppSelector(selectUser)

    return (
        <main dir="rtl" style={{ color: colors.text, padding: "0 16px 48px" }}>

            <section style={{
                margin: "24px 0 48px",
                padding: "56px 24px",
                borderRadius: 24,
                background: `linear-gradient(135deg, ${colors.soft}, #FFE3D1)`,
            }}>
                <h1 style={{ margin: "0 0 16px", color: colors.primary, fontWeight: 800 }}>
                    {user ? `שלום ${user.name}, מה מבשלים היום?` : "כל המתכונים שאהבת, במקום אחד"}
                </h1>
                <p style={{ maxWidth: 560, margin: "0 auto 32px", fontSize: 20 }}>
                    מאגר מתכונים מסודר ונוח לבית - לימות החול, לשבתות ולמועדים.
                    מוצאים בקלות מתכון מתאים, שומרים את המועדפים ומשתפים מתכונים בדוקים.
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    {user ? <>
                        <Link to="/recipes" style={buttonStyle(true)}>לכל המתכונים</Link>
                        <Link to="/recipes/new" style={buttonStyle(false)}>הוספת מתכון</Link>
                    </> : <>
                        <Link to="/register" style={buttonStyle(true)}>הצטרפות חינם</Link>
                        <Link to="/login" style={buttonStyle(false)}>כבר רשומה? כניסה</Link>
                    </>}
                </div>
            </section>

            <section style={{ marginBottom: 56 }}>
                <h2>מה מחכה לך כאן</h2>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 20,
                    marginTop: 24,
                }}>
                    {features.map((f) => (
                        <div key={f.title} style={{
                            padding: 24,
                            borderRadius: 16,
                            border: "1px solid #F3D9C8",
                            boxShadow: "0 4px 14px rgba(232, 69, 44, 0.08)",
                        }}>
                            <div style={{
                                width: 56, height: 56, margin: "0 auto 12px",
                                borderRadius: "50%", background: colors.soft,
                                display: "grid", placeItems: "center", fontSize: 28,
                            }}>{f.icon}</div>
                            <h3 style={{ margin: "0 0 8px", color: colors.primary }}>{f.title}</h3>
                            <p style={{ fontSize: 16 }}>{f.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section style={{ marginBottom: 56 }}>
                <h2>איך זה עובד?</h2>
                <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
                    {steps.map((s, i) => (
                        <div key={s.title} style={{ flex: "1 1 200px", maxWidth: 280 }}>
                            <div style={{
                                width: 44, height: 44, margin: "0 auto 12px",
                                borderRadius: "50%", color: "#fff", fontWeight: 800, fontSize: 20,
                                background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
                                display: "grid", placeItems: "center",
                            }}>{i + 1}</div>
                            <h3 style={{ margin: "0 0 4px" }}>{s.title}</h3>
                            <p style={{ fontSize: 16 }}>{s.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {!user && (
                <section style={{
                    padding: "40px 24px",
                    borderRadius: 24,
                    color: "#fff",
                    background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
                }}>
                    <h2 style={{ color: "#fff" }}>מוכנה להתחיל לבשל?</h2>
                    <p style={{ marginBottom: 24 }}>ההרשמה לוקחת פחות מדקה</p>
                    <Link to="/register" style={{ ...buttonStyle(false), background: "#fff", borderColor: "#fff" }}>
                        להרשמה
                    </Link>
                </section>
            )}
        </main>
    )
}

export default HomePage;
