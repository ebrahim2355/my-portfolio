import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './layouts/Root.jsx'
import Home from './pages/Home/Home.jsx'
import About from './pages/About/About.jsx'
import Projects from './pages/Projects/Projects.jsx'
import ProjectDetails from './pages/Projects/ProjectDetails.jsx'
import Contact from './pages/Contact/Contact.jsx'
import { Toaster } from 'react-hot-toast'

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "home",
        element: <Home></Home>
      },
      {
        path: "about",
        Component: About
      },
      {
        path: "projects",
        Component: Projects
      },
      {
        path: "projects/:id",
        Component: ProjectDetails
      },
      {
        path: "contact",
        Component: Contact
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
    <Toaster position="bottom-right" />
  </StrictMode>,
)
