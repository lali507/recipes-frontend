import { useId } from "react"
import { Link } from "react-router"

type logoConfig = {
    name?: string;
    tagline?: string;
};

const Logo = ({ name = "מתכונים", tagline = "בישול מהלב" }: logoConfig) => {
    const bgId = `logo-bg-${useId().replace(/:/g, "")}`

    return (
        <Link to="/" aria-label={`${name} - דף הבית`}
            style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>

            <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
                <defs>
                    <linearGradient id={bgId} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#FF9A3C" />
                        <stop offset="1" stopColor="#E8452C" />
                    </linearGradient>
                </defs>

                <circle cx="24" cy="24" r="23" fill={`url(#${bgId})`} />
                <circle cx="24" cy="24" r="20" fill="none" stroke="#fff" strokeOpacity=".4" strokeDasharray="2 3" />

                <g fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M18 17c-2-2 2-3.5 0-6" />
                    <path d="M24 16c-2-2.5 2-4 0-7" />
                    <path d="M30 17c-2-2 2-3.5 0-6" />
                </g>

                <rect x="22" y="19.5" width="4" height="2.5" rx="1.2" fill="#fff" />
                <path d="M13 23h22" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />

                <path d="M14.5 25h19v6.5a5 5 0 0 1-5 5h-9a5 5 0 0 1-5-5z" fill="#fff" />
                <path d="M14.5 27h-3M33.5 27h3" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />

                <path d="M24 34s-4-2.4-4-5a2 2 0 0 1 4-.6 2 2 0 0 1 4 .6c0 2.6-4 5-4 5z" fill={`url(#${bgId})`} />
            </svg>

            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: "#E8452C" }}>{name}</span>
                <span style={{ fontSize: 12, color: "#8A6A55" }}>{tagline}</span>
            </span>
        </Link>
    )
}

export default Logo
