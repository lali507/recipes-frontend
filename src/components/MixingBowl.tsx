import { useId } from "react"

const fillBox = "[transform-box:fill-box] origin-center"

const Tomato = () => (
    <g>
        <circle cx="0" cy="30" r="15" fill="#E8452C" />
        <ellipse cx="-5" cy="25" rx="4" ry="2.5" fill="#fff" opacity=".45" />
        <path d="M0 16l3 -5 2 5 5 -1 -4 4 -6 1 -6 -1 -4 -4 5 1 2 -5z" fill="#4C9A3F" />
    </g>
)

const Carrot = () => (
    <g>
        <circle cx="0" cy="30" r="12" fill="#FF9A3C" />
        <circle cx="0" cy="30" r="7.5" fill="none" stroke="#FFC48A" strokeWidth="2" />
        <circle cx="0" cy="30" r="2.5" fill="#FFC48A" />
    </g>
)

const Leaf = () => (
    <g>
        <path d="M0 14c12 6 14 22 0 32C-14 36-12 20 0 14z" fill="#5BAA4A" />
        <path d="M0 18v26" stroke="#3E8034" strokeWidth="1.8" strokeLinecap="round" />
    </g>
)

const Cheese = () => (
    <g>
        <path d="M-14 38l14-22 14 22z" fill="#FFD166" stroke="#F2B63C" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="-3" cy="32" r="2.6" fill="#F2B63C" />
        <circle cx="5" cy="35" r="1.8" fill="#F2B63C" />
    </g>
)

const Egg = () => (
    <g>
        <ellipse cx="0" cy="30" rx="11" ry="14" fill="#FFF8EE" stroke="#F3D9C8" strokeWidth="1.5" />
        <ellipse cx="-3.5" cy="25" rx="3" ry="4" fill="#fff" />
    </g>
)

const ingredients = [
    { x: 150, delay: "[animation-delay:0s]!", Shape: Tomato },
    { x: 210, delay: "[animation-delay:0.84s]!", Shape: Carrot },
    { x: 172, delay: "[animation-delay:1.68s]!", Shape: Leaf },
    { x: 232, delay: "[animation-delay:2.52s]!", Shape: Cheese },
    { x: 128, delay: "[animation-delay:3.36s]!", Shape: Egg },
]

const steam = [
    { x: 128, delay: "[animation-delay:0s]!" },
    { x: 180, delay: "[animation-delay:1.2s]!" },
    { x: 232, delay: "[animation-delay:2.4s]!" },
]

const sparkles = [
    { x: 46, y: 70, delay: "[animation-delay:0s]!" },
    { x: 312, y: 96, delay: "[animation-delay:0.9s]!" },
    { x: 330, y: 238, delay: "[animation-delay:1.6s]!" },
    { x: 30, y: 210, delay: "[animation-delay:2.2s]!" },
]

const MixingBowl = () => {
    const uid = useId().replace(/:/g, "")
    const bowlGrad = `bowl-${uid}`
    const soupGrad = `soup-${uid}`
    const shine = `shine-${uid}`

    return (
        <svg viewBox="0 0 360 340" role="img" aria-label="איור: קערה שמרכיבים נופלים לתוכה ומתערבבים" className="h-auto w-full overflow-visible">
            <defs>
                <linearGradient id={bowlGrad} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#FFB067" />
                    <stop offset="0.55" stopColor="#F6743A" />
                    <stop offset="1" stopColor="#D63C26" />
                </linearGradient>
                <radialGradient id={soupGrad} cx="0.5" cy="0.4" r="0.7">
                    <stop offset="0" stopColor="#FFE2C2" />
                    <stop offset="1" stopColor="#FFB57A" />
                </radialGradient>
                <linearGradient id={shine} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#fff" stopOpacity=".55" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
            </defs>

            {sparkles.map((s) => (
                <g key={s.delay} transform={`translate(${s.x} ${s.y})`}>
                    <path d="M0-9L2.5-2.5 9 0 2.5 2.5 0 9-2.5 2.5-9 0-2.5-2.5z" fill="#FF9A3C"
                        className={`${fillBox} ${s.delay} motion-safe:animate-twinkle`} />
                </g>
            ))}

            <ellipse cx="180" cy="318" rx="118" ry="13" fill="#C4321F" opacity=".12" />

            <ellipse cx="180" cy="190" rx="130" ry="30" fill="#B22F1C" />
            <path d="M50 190A130 30 0 0 1 310 190" fill="none" stroke="#FFC79C" strokeWidth="4" strokeLinecap="round" opacity=".6" />

            {steam.map(({ x, delay }) => (
                <path key={x} d={`M${x} 176c-8-10 8-16 0-28s8-18 0-28`} fill="none" stroke="#FFB48A" strokeWidth="5" strokeLinecap="round"
                    className={`${fillBox} ${delay} opacity-0 motion-safe:animate-steam motion-reduce:opacity-40`} />
            ))}

            <g transform="translate(212 200)">
                <g className="motion-safe:animate-stir">
                    <g transform="rotate(28)">
                        <rect x="-6" y="-178" width="12" height="176" rx="6" fill="#D49A62" stroke="#A8703F" strokeWidth="2" />
                        <rect x="-2" y="-170" width="4" height="40" rx="2" fill="#fff" opacity=".35" />
                        <ellipse cx="0" cy="8" rx="17" ry="12" fill="#D49A62" stroke="#A8703F" strokeWidth="2" />
                    </g>
                </g>
            </g>

            <ellipse cx="180" cy="196" rx="117" ry="22" fill={`url(#${soupGrad})`} />

            <g transform="translate(180 196) scale(1 0.19)">
                <g className="motion-safe:animate-swirl">
                    <path d="M-82 0C-82-52 46-74 66-22C80 14 22 48-10 32C-36 19-26-12 0-10" fill="none" stroke="#fff" strokeOpacity=".7"
                        strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                    <circle cx="40" cy="40" r="7" fill="#5BAA4A" />
                    <circle cx="-50" cy="-30" r="6" fill="#E8452C" />
                    <circle cx="-30" cy="55" r="5" fill="#FF9A3C" />
                </g>
            </g>

            {ingredients.map(({ x, delay }) => (
                <ellipse key={`r-${x}`} cx={x} cy="197" rx="22" ry="5" fill="none" stroke="#fff" strokeWidth="2.5"
                    className={`${fillBox} ${delay} opacity-0 motion-safe:animate-ripple`} />
            ))}

            {ingredients.map(({ x, delay, Shape }) => (
                <g key={x} transform={`translate(${x} 0)`}>
                    <g className={`${fillBox} ${delay} opacity-0 motion-safe:animate-drop`}>
                        <Shape />
                    </g>
                </g>
            ))}

            <path d="M50 190A130 30 0 0 0 310 190C310 268 252 308 180 308S50 268 50 190z" fill={`url(#${bowlGrad})`} />
            <path d="M66 214C74 262 116 294 160 300" fill="none" stroke={`url(#${shine})`} strokeWidth="10" strokeLinecap="round" />
            <path d="M58 232A130 30 0 0 0 302 232" fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" />
            <path d="M180 286s-14-8.5-14-17.5a7 7 0 0 1 14-2 7 7 0 0 1 14 2c0 9-14 17.5-14 17.5z" fill="#fff" opacity=".9" />
            <path d="M50 190A130 30 0 0 0 310 190" fill="none" stroke="#FFC79C" strokeWidth="6" strokeLinecap="round" />
        </svg>
    )
}
export default MixingBowl
