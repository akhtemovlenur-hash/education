import { createBrowserRouter } from "react-router";
import { Paths } from "./paths";
import Menu from "../pages/Menu";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const router = createBrowserRouter([
    {
        path: Paths.menu,
        Component: Menu,
    },
    {
        path: Paths.login,
        Component: Login,
    },
    {
        path: Paths.register,
        Component: Register,
    },
])