import ShowPromise from "../components/showPromise";
import { useGetCategoriesQuery } from "../store/api/categoryApi";
import CategoryItem from "./categoryItem";

const ShowAll = () => {
    const { data: categories, isLoading, isError, error } = useGetCategoriesQuery()

    return (
        <section aria-labelledby="categories-title" className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-brand-100">
            <h2 id="categories-title" className="flex items-center justify-between border-b border-brand-100 px-6 py-4 font-display text-lg font-bold text-ink">
                כל הקטגוריות
                {categories && <span className="rounded-full bg-brand-50 px-3 py-0.5 text-sm font-semibold text-brand-700">{categories.length}</span>}
            </h2>
            <div className="px-6"><ShowPromise isLoading={isLoading} isError={isError} eror={error} /></div>

            <ul className="divide-y divide-brand-50">
                {categories?.map((category) => (
                    <CategoryItem key={category.id} category={category} />
                ))}
            </ul>
        </section>
    )
}
export default ShowAll;
