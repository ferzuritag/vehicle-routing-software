import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@/pages/public/Login";
import DashboardLayout from "@/layout/DashboardLayout";
import BaseLayout from "@/layout/BaseLayout";
import SignUp from "@/pages/public/SignUp";
import Solver from "@/pages/private/Solver";
import NotFound from "../pages/public/NotFound";
import HomePage from "../pages/private/HomePage";
import VRPHelp from "../pages/private/help-pages/VRPHelp";
import CVRPHelp from "../pages/private/help-pages/CVRPHelp";
import VRPTWHelp from "../pages/private/help-pages/VRPTWHelp";
import Tutorial from "../pages/private/help-pages/Tutorial";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: "sign-in",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "solver/:id",
        element: <Solver/>
      },
    ],
  },
  {
    path: "help",
    element: <DashboardLayout />,
    children: [
      {
        path: "vrp",
        element: <VRPHelp />,
      },
      {
        path: "cvrp",
        element: <CVRPHelp />,
      },
      {
        path: "vrptw",
        element: <VRPTWHelp />,
      },
      {
        path: "tutorial",
        element: <Tutorial />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
