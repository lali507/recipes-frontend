import ShowPromise from "../components/showPromise";
import { useGetCategoriesQuery } from "../store/api/categoryApi";
import CategoryItem from "./categoryItem";

const ShowAll=()=>{
    // hook - ישירות בגוף הקומפוננטה, בלי async/await
    const { data: categories, isLoading, isError, error } = useGetCategoriesQuery()

    return (<>
        <h2>כל הקטגוריות</h2>
        <ShowPromise isLoading={isLoading} isError={isError} eror={error} />

        {/* data הוא undefined עד שהתשובה מגיעה, לכן ?. */}
        <ul>
            {categories?.map((category) => (
                <CategoryItem key={category.id} category={category} />
            ))}
        </ul>
    </>)
}
export default ShowAll;
