
interface CategoryInput{
name:	string
// minLength: 2
// maxLength: 40
}

interface Category{
    id:number,
    name:string,
    recipeCount:number
    totalRecipeCount?:number//for admin

}
export type {Category,CategoryInput}