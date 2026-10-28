import { useAddFavoriteMutation, useRemoveFavoriteMutation } from "../store/api/favoriteApi"

interface FavoriteButtonProps {
  recipeId: number
  // מגיע מהשרת בכל מתכון
  isFavorite: boolean
}

// כפתור "לב": לא במועדפים ← POST, במועדפים ← DELETE
// אחרי הצלחה הרשימות נטענות מחדש (invalidatesTags), ו-isFavorite מגיע מעודכן מהשרת
const FavoriteButton = ({ recipeId, isFavorite }: FavoriteButtonProps) => {
  const [addFn, { isLoading: isAdding }] = useAddFavoriteMutation()
  const [removeFn, { isLoading: isRemoving }] = useRemoveFavoriteMutation()
  const isBusy = isAdding || isRemoving

  const toggle = async () => {
    try {
      if (isFavorite) await removeFn(recipeId).unwrap()
      else await addFn(recipeId).unwrap()
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      // חוסם לחיצה כפולה בזמן שהבקשה בדרך
      disabled={isBusy}
      // aria-pressed - קורא מסך יודע אם הכפתור "דלוק"
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "הסרה מהמועדפים" : "הוספה למועדפים"}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  )
}
export default FavoriteButton
