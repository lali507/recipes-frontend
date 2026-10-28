import AddCategory from "../category/Add";
import ShowAll from "../category/showAll";
import PageHeader from "../components/PageHeader";

const EditCategoriesPage = () => {
    return <>
        <PageHeader icon="🗂️" title="ניהול קטגוריות" subtitle="הוספה, שינוי שם ומחיקה של קטגוריות המתכונים" />
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
            <ShowAll />
            <AddCategory />
        </div>
    </>
}
export default EditCategoriesPage;
