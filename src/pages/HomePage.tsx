import { Link } from "react-router"
import { useAppSelector } from "../store/hook"
import { selectUser } from "../store/state/userSlice"
import { buttonClass } from "../components/form/styles"
import MixingBowl from "../components/MixingBowl"

const features = [
    { icon: "🍲", title: "מאגר מתכונים", text: "מגוון מתכונים מסודרים לפי קטגוריות, עם חיפוש וסינון לפי רמת קושי וסוג תפריט", delay: "[animation-delay:0s]!" },
    { icon: "📝", title: "המתכונים שלי", text: "כתבי, ערכי ושמרי את המתכונים שלך. את בוחרת מה ציבורי ומה נשאר רק אצלך", delay: "[animation-delay:0.6s]!" },
    { icon: "❤️", title: "מועדפים", text: "מצאת מתכון שאהבת? לחיצה על הלב והוא תמיד יחכה לך ברשימת המועדפים", delay: "[animation-delay:1.2s]!" },
    { icon: "📷", title: "תמונות", text: "אפשר לצרף תמונה לכל מתכון, כדי לראות מראש איך המנה אמורה להיראות", delay: "[animation-delay:1.8s]!" },
]

const steps = [
    { title: "נרשמים", text: "הרשמה קצרה עם שם, אימייל וסיסמה" },
    { title: "מעיינים", text: "מחפשים מתכון מתאים ושומרים את האהובים במועדפים" },
    { title: "משתפים", text: "מוסיפים מתכון משלך ובוחרים אם לשתף אותו" },
]

const floating = [
    { icon: "🥕", place: "top-6 start-[46%]", size: "text-3xl", delay: "[animation-delay:0s]!" },
    { icon: "🌿", place: "bottom-10 start-[44%]", size: "text-2xl", delay: "[animation-delay:1.1s]!" },
    { icon: "🍋", place: "top-10 end-6", size: "text-3xl", delay: "[animation-delay:2s]!" },
    { icon: "🧄", place: "bottom-8 end-10", size: "text-2xl", delay: "[animation-delay:0.6s]!" },
    { icon: "🌶️", place: "top-1/2 end-2", size: "text-2xl", delay: "[animation-delay:1.6s]!" },
]

const HomePage = () => {
    const user = useAppSelector(selectUser)

    return (
        <div className="space-y-20 sm:space-y-28">

            <section className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-50 via-white to-brand-100 px-6 py-12 shadow-sm ring-1 ring-brand-100 sm:px-12 sm:py-16">
                <div aria-hidden="true" className="absolute -top-24 -end-24 -z-10 size-80 rounded-full bg-brand-200/50 blur-3xl" />
                <div aria-hidden="true" className="absolute -bottom-32 -start-20 -z-10 size-96 rounded-full bg-brand-300/30 blur-3xl" />

                {floating.map((f) => (
                    <span key={f.icon} aria-hidden="true"
                        className={`absolute hidden select-none opacity-80 drop-shadow-sm md:block motion-safe:animate-float ${f.place} ${f.size} ${f.delay}`}>
                        {f.icon}
                    </span>
                ))}

                <div className="grid items-center gap-10 md:grid-cols-2">
                    <div className="text-center md:text-start motion-safe:animate-fade-up">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                            <span aria-hidden="true">✨</span> לימות החול, לשבתות ולמועדים
                        </span>
                        <h1 className="mt-5 font-display text-4xl leading-tight font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                            {user
                                ? <>שלום {user.name},<br /><span className="bg-gradient-to-l from-brand-500 to-brand-700 bg-clip-text text-transparent">מה מבשלים היום?</span></>
                                : <>כל המתכונים שאהבת, <span className="bg-gradient-to-l from-brand-500 to-brand-700 bg-clip-text text-transparent">במקום אחד</span></>}
                        </h1>
                        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-cocoa md:mx-0">
                            מאגר מתכונים מסודר ונוח לבית.
                            מוצאים בקלות מתכון מתאים, שומרים את המועדפים ומשתפים מתכונים בדוקים.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                            {user ? <>
                                <Link to="/recipes" className={buttonClass("primary", "lg")}>למתכונים המשותפים ←</Link>
                                <Link to="/recipes/new" className={buttonClass("secondary", "lg")}>+ הוספת מתכון</Link>
                            </> : <>
                                <Link to="/register" className={buttonClass("primary", "lg")}>הצטרפות חינם ←</Link>
                                <Link to="/login" className={buttonClass("secondary", "lg")}>כבר רשומה? כניסה</Link>
                            </>}
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-md">
                        <div aria-hidden="true" className="absolute inset-[8%] -z-10 rounded-full bg-white/70 shadow-[inset_0_0_60px_rgba(255,154,60,0.25)] ring-1 ring-brand-100" />
                        <MixingBowl />
                    </div>
                </div>
            </section>

            <section aria-labelledby="features-title">
                <div className="mx-auto mb-10 max-w-2xl text-center">
                    <p className="text-sm font-bold tracking-wide text-brand-600">מה באתר</p>
                    <h2 id="features-title" className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">מה מחכה לך כאן</h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((f) => (
                        <div key={f.title}
                            className="group rounded-3xl bg-white p-7 text-center shadow-sm ring-1 ring-brand-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-200/50">
                            <div aria-hidden="true"
                                className={`mx-auto mb-5 grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-3xl shadow-inner transition group-hover:scale-110 motion-safe:animate-float ${f.delay}`}>
                                {f.icon}
                            </div>
                            <h3 className="font-display text-lg font-bold text-ink">{f.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-cocoa">{f.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby="steps-title">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="text-sm font-bold tracking-wide text-brand-600">שלושה צעדים</p>
                    <h2 id="steps-title" className="mt-2 font-display text-3xl font-extrabold text-ink sm:text-4xl">איך זה עובד?</h2>
                </div>
                <div className="relative">
                    <div aria-hidden="true" className="absolute inset-x-[16%] top-7 -z-10 hidden h-0.5 bg-gradient-to-l from-brand-200 via-brand-400 to-brand-200 sm:block" />
                    <ol className="grid gap-10 sm:grid-cols-3">
                        {steps.map((s, i) => (
                            <li key={s.title} className="text-center">
                                <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 font-display text-2xl font-extrabold text-white shadow-lg shadow-brand-500/30 ring-8 ring-cream">
                                    {i + 1}
                                </div>
                                <h3 className="font-display text-xl font-bold text-ink">{s.title}</h3>
                                <p className="mx-auto mt-2 max-w-60 text-cocoa">{s.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {!user && (
                <section className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-l from-brand-500 to-brand-700 px-6 py-14 text-center text-white shadow-xl shadow-brand-600/20">
                    <div aria-hidden="true" className="absolute -top-20 start-10 -z-10 size-64 rounded-full bg-white/10 blur-2xl" />
                    <div aria-hidden="true" className="absolute -bottom-24 end-0 -z-10 size-72 rounded-full bg-brand-300/30 blur-2xl" />
                    <span aria-hidden="true" className="inline-block text-5xl motion-safe:animate-float">👩‍🍳</span>
                    <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">מוכנה להתחיל לבשל?</h2>
                    <p className="mt-3 text-lg text-white/85">ההרשמה לוקחת פחות מדקה</p>
                    <Link to="/register"
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-bold text-brand-700 shadow-lg transition hover:scale-105 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                        להרשמה ←
                    </Link>
                </section>
            )}
        </div>
    )
}

export default HomePage;
