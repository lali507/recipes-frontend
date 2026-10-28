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
        <div role="status" aria-live="polite" style={{ position: "fixed", bottom: 24, insetInlineStart: 24, zIndex: 1000 }}>
            {message && (
                <div style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 20px", borderRadius: 12,
                    background: "#1E6B34", color: "#fff", fontWeight: 600,
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
                }}>
                    <span>✓ {message}</span>
                    <button type="button" onClick={() => dispatch(hideToast())} aria-label="סגירת ההודעה"
                        style={{ background: "none", border: "none", color: "#fff", fontSize: 18, cursor: "pointer" }}>
                        ×
                    </button>
                </div>
            )}
        </div>
    )
}
export default Toast
