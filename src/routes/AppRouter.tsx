//layouts
import MainLayout from "@layouts/MainLayout/MainLayout"


import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from "react"

//pages
const Home = lazy(()=>import("@pages/Home"))
const Categories = lazy(()=>import("@pages/Categories"))
const Products = lazy(()=>import("@pages/Products"))
const About = lazy(()=>import("@pages/AboutUs"))
const Cart = lazy(()=>import("@pages/Cart"))
const WishList = lazy(()=>import("@pages/WishList"))
const Login = lazy(()=>import("@pages/Login"))
const Register = lazy(()=>import("@pages/Register"))
const Error = lazy(()=>import("@pages/Error"))


export default function AppRouter() {
    const router = createBrowserRouter([{
        path:"/",
        element: <MainLayout />,
        errorElement: <Suspense
         fallback="laoding please wait .."
         >  <Error/> </Suspense>,
        children:[
          {
            index:true,
            element: <Suspense fallback="laoding please wait .."> <Home /> </Suspense> 
          },
          {
            path:"about-us",
            element : <Suspense fallback="laoding please wait ..">  <About /> </Suspense>
          },
          {
            path:"login",
            element : <Suspense fallback="laoding please wait ..">  <Login /> </Suspense>
          },
          {
            path:"register",
            element :  <Suspense fallback="laoding please wait ..">  <Register /> </Suspense>
          },
          {
            path:"categories",
            element : <Suspense fallback="laoding please wait ..">  <Categories /></Suspense>
          },
          {
            path:"categories/products/:prefix",
            element : <Suspense
            //  fallback="laoding please wait .."
             >  <Products /> </Suspense>,
            loader:(({params})=>{
              if (
                // this guard by type to insure the define and string type
                typeof params.prefix !== "string" ||//undefined
                !/^[a-z]+$/i.test(params.prefix)//not string
              ) {
                throw new Response("Bad Request", {
                  statusText: "Category not found",
                  status: 400,
                });
              }
              return true;

            })
          },
          {
            path:"/cart",
            element : <Suspense 
            // fallback="laoding please wait .."
            >  <Cart /> </Suspense>
          },
          {
            path:"/wishlist",
            element : <Suspense
            //  fallback="laoding please wait .."
             >  <WishList /> </Suspense>
          },
        ]
    }])
  return (
    <RouterProvider router={router} />

  )
}
