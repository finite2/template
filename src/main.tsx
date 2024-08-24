import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import { router } from "./router";

createRoot(document.getElementById("root")!).render(
  <>
    <div className="fixed w-screen h-screen bg-gray-800 overflow-hidden "></div>
    <div className="min-h-screen w-screen relative z-10 overflow-auto text-white">
      <RouterProvider router={router} />
    </div>
  </>
);
