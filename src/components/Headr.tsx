import { useState } from "react"
import { NavLink } from "react-router"
import { useAppSelector } from "../store/hook"
import { selectIsLoggedIn, selectUser } from "../store/state/userSlice"
import { buttonClass } from "./form/styles"
import Exit from "./exit"
import Logo from "./Logo"

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${isActive
        ? "bg-brand-100 text-brand-700"
        : "text-ink/75 hover:bg-brand-50 hover:text-brand-700"}`

const Header = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const user = useAppSelector(selectUser)
    const isAdmin = user?.role === "ADMIN"
    const [menuOpen, setMenuOpen] = useState(false)
    const close = () => setMenuOpen(false)

    const links = isLoggedIn
        ? <>
            <NavLink to="/" end className={navLinkClass} onClick={close}>דף הבית</NavLink>
            <NavLink to="/recipes" end className={navLinkClass} onClick={close}>מתכונים משותפים</NavLink>
            <NavLink to="/my-recipes" className={navLinkClass} onClick={close}>המתכונים שלי</NavLink>
            <NavLink to="/favorites" className={navLinkClass} onClick={close}>המועדפים</NavLink>
            {isAdmin && <NavLink to="/admin/categories" className={navLinkClass} onClick={close}>ניהול קטגוריות</NavLink>}
        </>
        : <>
            <NavLink to="/" end className={navLinkClass} onClick={close}>דף הבית</NavLink>
            <NavLink to="/login" className={navLinkClass} onClick={close}>התחברות</NavLink>
        </>

    const account = isLoggedIn
        ? <div className="flex items-center gap-2">
            <span title={user?.email} aria-label={`מחוברת בתור ${user?.name}`}
                className="flex items-center gap-2 rounded-full bg-white py-1 ps-1 pe-3 text-sm font-semibold text-ink ring-1 ring-brand-100">
                <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 font-bold text-white">
                    {user?.name.charAt(0)}
                </span>
                {user?.name}
            </span>
            <Exit />
        </div>
        : <NavLink to="/register" className={buttonClass("primary", "sm")} onClick={close}>הצטרפות חינם</NavLink>

    return (
        <header className="sticky top-0 z-40 border-b border-brand-100/70 bg-cream/80 backdrop-blur-lg">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
                <Logo />

                <nav aria-label="ניווט ראשי" className="hidden items-center gap-1 lg:flex">{links}</nav>
                <div className="hidden lg:block">{account}</div>

                <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu"
                    aria-label={menuOpen ? "סגירת התפריט" : "פתיחת התפריט"}
                    className="grid size-11 cursor-pointer place-items-center rounded-full text-2xl text-ink transition hover:bg-brand-50 lg:hidden">
                    {menuOpen ? "✕" : "☰"}
                </button>
            </div>

            {menuOpen && (
                <div id="mobile-menu" className="border-t border-brand-100 bg-cream px-4 pt-3 pb-5 lg:hidden motion-safe:animate-fade-up">
                    <nav aria-label="ניווט ראשי" className="flex flex-col gap-1">{links}</nav>
                    <div className="mt-4 border-t border-brand-100 pt-4">{account}</div>
                </div>
            )}
        </header>
    )
}

export default Header
