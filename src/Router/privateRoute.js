import { Navigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Dashboard } from "../components/dashboard/dashboard";
import Caller from "../components/caller/Caller";

export const PrivateRoute = () => {
    return {
        element: <Sidebar />,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/caller", element: <Caller />},
          { path: "*", element: <Navigate to="/" replace /> },
        ],
    };
}