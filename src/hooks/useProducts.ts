
import { useAppDispatch, useAppSelector } from "@store/hook";
import {  useEffect } from "react";
import { actGetProductsByCat, productsRecordCleanUp } from "@store/products/productsSlice";
import { useParams } from "react-router-dom";
const  useProducts = ()=> {
    const {records , loading , error} = useAppSelector((state)=>state.products);
    const params = useParams();
    const paramsPrefix = params.prefix;
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state)=>state.cart.items);
    const wishlistItemsId = useAppSelector((state)=>state.wishlist.itemsId)
    const productsFullInfo = records.map((el)=>({
      ...el ,
      quantity:cartItems[el.id] || 0 ,//we added current quantity to each item if no quantity it is zero
      //which is value of cartItems array
      isLiked : wishlistItemsId.includes(el.id)
    }));
  
  
    useEffect(()=>{
      const promise = dispatch(actGetProductsByCat(params?.prefix as string))//here I could make casting as I make guard ti sure
        //in app url that the prefix is string

        //cancel http request
        return ()=>{
          dispatch(productsRecordCleanUp());
            // `createAsyncThunk` attaches an `abort()` method to the promise
            promise.abort()
        }
  
  
      } , [dispatch, params])
  
  return { loading , error , productsFullInfo ,paramsPrefix}
}

export default useProducts;