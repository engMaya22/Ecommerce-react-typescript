import { useAppDispatch, useAppSelector } from "@store/hook";
import {  productsRecordCleanUp } from "@store/products/productsSlice";
import { actGetWishlist } from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";

const  useWishlist= ()=> {
    const dispatch = useAppDispatch();
    useEffect (()=>{
       const promise = dispatch(actGetWishlist("productsFullInfo"));
       return ()=>{
         dispatch(productsRecordCleanUp());
         promise.abort();
       }
    },[dispatch])

    const {loading , error , productsFullInfo } =  useAppSelector(state => state.wishlist);
    const cartItems = useAppSelector((state)=>state.cart.items);

    const records = productsFullInfo.map((el)=>({
      ...el ,
      quantity:cartItems[el.id] || 0 ,
      isLiked : true
    }));
  return {error , records , loading}
}
export default useWishlist;
