import { actGetProductsByItems, cartChangeQuantity, cartProductInfoCleanUp, removeCartItem } from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { useCallback, useEffect } from "react";
import {resetOrderStatus} from "@store/orders/ordersSlice";

const  useCart = () =>{
    const {items , loading , error ,productsFullInfo} = useAppSelector(state=>state.cart);
    const products = productsFullInfo.map((el)=>(
        {
          ...el ,
          quantity:items[el.id]
  
        } ));
  
    const dispatch = useAppDispatch();
    const userAccessToken = useAppSelector(state => state.auth.accessToken);
    const placeOrderStatus = useAppSelector(state => state.orders.loading);
    useEffect (()=>{
      const promise = dispatch(actGetProductsByItems())
      return ()=>{
        
        promise.abort();
        dispatch(cartProductInfoCleanUp());
        dispatch(resetOrderStatus());
      }
    },[dispatch])
  
    const ChangeQuantityHandler= useCallback(
     (id:number, quantity:number)=>{
      // console.log(id, quantity);//quanity is set from event target in cart item
       dispatch(cartChangeQuantity({id,quantity}))
  
      },[dispatch]);
      const deleteItemHandler=useCallback(
      (id:number)=>{
        dispatch(removeCartItem(id))
      
      } ,[dispatch]);
  return  {products , 
           loading ,
           error ,
           ChangeQuantityHandler ,
           deleteItemHandler , 
           userAccessToken ,
           placeOrderStatus
         }
  
}

export default useCart;
