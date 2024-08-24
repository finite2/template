import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./Layout";
import "./index.css";
import { ContactPage } from "./pages/contact";
import { HomePage } from "./pages/home";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
    ],
  },
]);
