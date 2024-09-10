//layouts
import MainLayout from "@layouts/MainLayout/MainLayout"


//pages
import Home from "@pages/Home"
import Categories from "@pages/Categories"
import Products from "@pages/Products"
import About from "@pages/AboutUs"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "@pages/Login"
import Register from "@pages/Register"
import Error from "@pages/Error"
export default function AppRouter() {
    const router = createBrowserRouter([{
        path:"/",
        element: <MainLayout />,
        errorElement: <Error/>,
        children:[
          {
            index:true,
            element:<Home />
          },
          {
            path:"about-us",
            element : <About />
          },
          {
            path:"login",
            element : <Login />
          },
          {
            path:"register",
            element : <Register />
          },
          {
            path:"categories",
            element : <Categories />
          },
          {
            path:"products/:prefix",
            element : <Products />
          }
        ]
    }])
  return (
    <RouterProvider router={router} />

  )
}