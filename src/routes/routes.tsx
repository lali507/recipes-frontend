import { createBrowserRouter } from "react-router";
import App from "../App";
import Protected from "./protected";
import HomePage from "../pages/HomePage";
import PublicRecipesPage from "../pages/PublicRecipesPage";
import ShowRecipePage from "../pages/ShowRecipePage";
import AddRecipePage from "../pages/AddRecipePage";
import EditRecipePage from "../pages/EditRecipePage";
import PrivateRecipesPage from "../pages/PrivateRecipesPage";
import FavoritePage from "../pages/FavoritePage";
import EditCategoriesPage from "../pages/EditCategoriesPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";


const routes = createBrowserRouter([

    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },

            {
                element: <Protected roles={["USER", "ADMIN"]} />,
                children: [

                    { path: "recipes", element: <PublicRecipesPage /> },
                    { path: "recipes/new", element: <AddRecipePage /> },
                    { path: "recipes/:id", element: <ShowRecipePage /> },
                    { path: "recipes/:id/edit", element: <EditRecipePage /> },
                    { path: "my-recipes", element: <PrivateRecipesPage /> },
                    { path: "favorites", element: <FavoritePage /> },
                ]
            },

            {
                element: <Protected roles={["ADMIN"]} />,
                children: [
                    { path: "admin/categories", element: <EditCategoriesPage /> },
                ]
            },

            { path: "*", element: <NotFoundPage /> },
        ]
    },
])


export default routes
