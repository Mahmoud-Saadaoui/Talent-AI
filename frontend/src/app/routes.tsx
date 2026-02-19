import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import RegisterPage from "../modules/auth/pages/RegisterPage.jsx";
import LoginPage from "../modules/auth/pages/LoginPage.jsx";
import HomePage from "../modules/home/pages/index.jsx";
import NotFound from "../shared/components/NotFound.js";

function Router() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <HomePage /> },
        { 
          path: "/login",
          element: <LoginPage /> ,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        { path: "/*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;