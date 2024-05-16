import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import UserPage from "./routes/UserPage.tsx";
import CertificadoPage from "./routes/CertificadoPage.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/certificados",
    element: <UserPage />,
    errorElement: <div>404 Not Found Users</div>,
  },
  {
    path: "/certificados/:userId",
    element: <CertificadoPage />,
    errorElement: <div>404 Not Found User Certificate</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />,
);
