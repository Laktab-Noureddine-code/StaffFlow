import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/Login";
import Dashboard from "../features/dashboard/Dashboard";

export const router = createBrowserRouter([{ path: "/", element: <Dashboard /> }]);