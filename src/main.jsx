import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import "./index.css";
import Root from "./layouts/Root.jsx";

const Home = lazy(() => import("./pages/Home/Home.jsx"));
const About = lazy(() => import("./pages/About/About.jsx"));
const Projects = lazy(() => import("./pages/Projects/Projects.jsx"));
const ProjectDetails = lazy(() => import("./pages/Projects/ProjectDetails.jsx"));
const Contact = lazy(() => import("./pages/Contact/Contact.jsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage.jsx"));

function withSuspense(Component) {
  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        element: withSuspense(Home),
      },
      {
        path: "home",
        element: withSuspense(Home),
      },
      {
        path: "about",
        element: withSuspense(About),
      },
      {
        path: "projects",
        element: withSuspense(Projects),
      },
      {
        path: "projects/:id",
        element: withSuspense(ProjectDetails),
      },
      {
        path: "contact",
        element: withSuspense(Contact),
      },
      {
        path: "*",
        element: withSuspense(ErrorPage),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
    <Toaster position="bottom-right" />
  </StrictMode>,
);
