import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { useAppDispatch, useAppSelector } from "@store/hook";
import {  productsRecordCleanUp } from "@store/products/productsSlice";
import { actGetWishlist } from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";



const WishList = ()=>{
    const dispatch = useAppDispatch();
    useEffect (()=>{
       dispatch(actGetWishlist());
       return ()=>{
         dispatch(productsRecordCleanUp())
       }
    },[dispatch])

    const {loading , error , productsFullInfo } =  useAppSelector(state => state.wishlist);
    const cartItems = useAppSelector((state)=>state.cart.items);

    const records = productsFullInfo.map((el)=>({
      ...el ,
      quantity:cartItems[el.id] || 0 ,
      isLiked : true
    }));
  
    return <>
            <Heading>Your Wishlist</Heading>
            <Loading error={error}  status={loading} >
               <GridList records={records} 
                          renderItem={(record)=><Product {...record} />}
                />
                
           </Loading>
           </>

}
export default WishList;