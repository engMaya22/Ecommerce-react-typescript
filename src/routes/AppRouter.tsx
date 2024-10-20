//layouts
import MainLayout from "@layouts/MainLayout/MainLayout"
import ProfileLayout from "@layouts/ProfileLayout/ProfileLayout"


import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from "react"
import Error from "@pages/Error";
import { LottieHandler, PageSuspense } from "@components/feedback";
import ProtectedRoute from "@components/Auth/ProtectedRoute";
//pages
const Home = lazy(()=>import("@pages/Home"))
const Categories = lazy(()=>import("@pages/Categories"))
const Products = lazy(()=>import("@pages/Products"))
const About = lazy(()=>import("@pages/AboutUs"))
const Cart = lazy(()=>import("@pages/Cart"))
const WishList = lazy(()=>import("@pages/WishList"))
const Login = lazy(()=>import("@pages/Login"))
const Register = lazy(()=>import("@pages/Register"))
const Orders = lazy(()=>import("@pages/Orders"))
const Account = lazy(()=>import("@pages/Account"))

export default function AppRouter() {
    const router = createBrowserRouter([
      {
        path:"/",
        element:  <Suspense
                        fallback={
                          <div style={{ marginTop: "10%" }}>
                            <LottieHandler type="loading" message="Loading please wait..." />
                          </div>
                        }>
                     <MainLayout />
                </Suspense>,
        errorElement:   <Error/> ,
        children:[
          {
            index:true,
            element: <PageSuspense  > <Home />  </PageSuspense>
          },
          {
            path:"about-us",
            element : <PageSuspense  >  <About /> </PageSuspense>
          },
          {
            path:"login",
            element : <PageSuspense  >  <Login />  </PageSuspense>
          },
          {
              path:"profile",
              element :  <ProtectedRoute>
                          <PageSuspense >
                              <ProfileLayout /> 
                          </PageSuspense> 
                        </ProtectedRoute> ,
              children:[
                  {
                    index:true,
                    // I dont need to protect child as I already protect parent
                    element: <PageSuspense >
                                <Account />  
                              </PageSuspense>
                  },
                  {
                    path: "orders",
                    element : <PageSuspense >
                                 <Orders />  
                              </PageSuspense>
                  }
              ]
          },

          {
            path:"register",
            element :  <PageSuspense  >  <Register />  </PageSuspense>
          },
          {
            path:"categories",
            element : <PageSuspense  >  <Categories /> </PageSuspense>
          },
          {
            path:"categories/products/:prefix",
            element : <PageSuspense  >
              <Products />  </PageSuspense>,
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
            element : <PageSuspense  > <Cart /> </PageSuspense>
          },
          {
            path:"/wishlist",
            element :  <ProtectedRoute>
                        <PageSuspense  >
                        <WishList /> 
                        </PageSuspense>
                      </ProtectedRoute>
            
            
          },
        ]
    }])
  return (
    <RouterProvider router={router} />

  )
}
