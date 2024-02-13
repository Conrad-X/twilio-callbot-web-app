import { Navigate } from "react-router-dom";
import { SignIn } from "../components/auth/SignIn";
import { SignUp } from "../components/auth/SignUp";
import { VerifyToken } from "../components/auth/VerifyToken";

export const PublicRoute = () => {

  return [
    { path: "/login", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/verify/:verificationToken", element: <VerifyToken /> },
    { path: "*", element: <Navigate to="/login" replace /> },
  ];
};
