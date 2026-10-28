
interface CategoryInput{
name:	string
}

interface Category{
    id:number,
    name:string,
    recipeCount:number
    totalRecipeCount?:number

}
export type {Category,CategoryInput}