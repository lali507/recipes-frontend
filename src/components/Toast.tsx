import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/hook"
import { hideToast, selectToast } from "../store/state/toastSlice"

const Toast = () => {
    const dispatch = useAppDispatch()
    const { message, id } = useAppSelector(selectToast)

    useEffect(() => {
        if (!message) return
        const timer = setTimeout(() => dispatch(hideToast()), 3000)
        return () => clearTimeout(timer)
    }, [id, message, dispatch])

    return (
        <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-4 bottom-6 z-50 flex justify-center sm:inset-x-auto sm:start-6">
            {message && (
                <div key={id} className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-ink/95 py-3 ps-3 pe-4 text-white shadow-2xl shadow-ink/30 ring-1 ring-white/10 backdrop-blur motion-safe:animate-toast-in">
                    <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-500 text-sm font-bold">✓</span>
                    <span className="font-medium">{message}</span>
                    <button type="button" onClick={() => dispatch(hideToast())} aria-label="סגירת ההודעה"
                        className="ms-2 grid size-7 cursor-pointer place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white">
                        ×
                    </button>
                </div>
            )}
        </div>
    )
}
export default Toast
