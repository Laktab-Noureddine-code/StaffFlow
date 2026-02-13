import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/Login";
import {
  AuthenticatedRoute,
  GuestRoute,
  ProtectedRoute,
} from "./ProtectedRoute";
import App from "../App";
import Register from "../features/auth/Register";
import CreateCompany from "../features/company/pages/CreateCompany";
import ManageEmployees from "@/features/employees/pages/ManageEmployees";
import AddEmployee from "@/features/employees/pages/AddEmployee";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  // Auth Routes
  {
    path: "/login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <Register />
      </GuestRoute>
    ),
  },
  // Company Onboarding Route
  {
    path: "/onboarding/company",
    element: (
      <AuthenticatedRoute>
        <CreateCompany />
      </AuthenticatedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { path: "manage-employees", element: <ManageEmployees /> },
      { path: "add-employee", element: <AddEmployee /> },
    ],
  },
]);
