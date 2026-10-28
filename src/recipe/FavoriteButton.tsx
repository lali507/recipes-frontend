import { useState } from "react"
import { useAddFavoriteMutation, useRemoveFavoriteMutation } from "../store/api/favoriteApi"
import { useAppDispatch } from "../store/hook"
import { showToast } from "../store/state/toastSlice"

interface FavoriteButtonProps {
  recipeId: number
  isFavorite: boolean
}

const FavoriteButton = ({ recipeId, isFavorite }: FavoriteButtonProps) => {
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

  return (<>
    <button
      type="button"
      onClick={toggle}
      disabled={isBusy}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "הסרה מהמועדפים" : "הוספה למועדפים"}
      title={hint}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
    {failed && <span role="alert">הפעולה נכשלה, נסי שוב</span>}
  </>)
}
export default FavoriteButton
