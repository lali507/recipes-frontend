import { useState } from "react"
import { useAddFavoriteMutation, useRemoveFavoriteMutation } from "../store/api/favoriteApi"
import { useAppDispatch } from "../store/hook"
import { showToast } from "../store/state/toastSlice"

interface FavoriteButtonProps {
  recipeId: number
  isFavorite: boolean
  withLabel?: boolean
}

const FavoriteButton = ({ recipeId, isFavorite, withLabel = false }: FavoriteButtonProps) => {
  const [addFn, { isLoading: isAdding }] = useAddFavoriteMutation()
  const [removeFn, { isLoading: isRemoving }] = useRemoveFavoriteMutation()
  const isBusy = isAdding || isRemoving
  const [failed, setFailed] = useState(false)
  const dispatch = useAppDispatch()

  const toggle = async () => {
    setFailed(false)
    try {
      if (isFavorite) {
        await removeFn(recipeId).unwrap()
        dispatch(showToast("המתכון הוסר מהמועדפים"))
      }
      else {
        await addFn(recipeId).unwrap()
        dispatch(showToast("המתכון נוסף למועדפים ❤️"))
      }
    }
    catch {
      setFailed(true)
    }
  }

  const hint = isFavorite ? "מתכון שאהבתי - שמור במועדפים. לחיצה תסיר אותו" : "אהבת? לחיצה על הלב תשמור את המתכון במועדפים"
  const heart = <span key={String(isFavorite)} aria-hidden="true" className="inline-block motion-safe:animate-heart-pop">{isFavorite ? "❤️" : "🤍"}</span>

  return (
    <span className="inline-flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={toggle}
        disabled={isBusy}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? "הסרה מהמועדפים" : "הוספה למועדפים"}
        title={hint}
        className={withLabel
          ? `inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold ring-1 transition active:scale-95 disabled:opacity-60 ${isFavorite
            ? "bg-rose-50 text-rose-700 ring-rose-200 hover:bg-rose-100"
            : "bg-white text-ink ring-brand-200 hover:bg-brand-50"}`
          : "grid size-11 cursor-pointer place-items-center rounded-full bg-white/90 text-xl shadow-md ring-1 ring-black/5 backdrop-blur transition hover:scale-110 active:scale-95 disabled:opacity-60"}
      >
        {heart}
        {withLabel && (isFavorite ? "שמור במועדפים" : "שמירה למועדפים")}
      </button>
      {failed && <span role="alert" className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">הפעולה נכשלה, נסי שוב</span>}
    </span>
  )
}
export default FavoriteButton
