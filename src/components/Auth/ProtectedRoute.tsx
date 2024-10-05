import { useAppSelector } from "@store/hook";
import React from "react";
import { Navigate } from "react-router-dom";

const  ProtectedRoute = ({children}:{children:React.ReactNode})=> {
  const {accessToken} = useAppSelector(state => state.auth)
  if(!accessToken)
    {
      return <Navigate to="/login?message=login_required" />
    }
  return <>
            {children }
         </>
}
export default ProtectedRoute;

