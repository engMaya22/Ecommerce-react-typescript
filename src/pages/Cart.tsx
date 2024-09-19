import {  Heading } from "@components/common";
import { CartItem, CartItemList, CartSubtotalPrice } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { actGetProductsByItems, cartChangeQuantity, cartProductInfoCleanUp, removeCartItem } from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { useCallback, useEffect } from "react";


const  Cart=()=> {
  const {items , loading , error ,productsFullInfo} = useAppSelector(state=>state.cart);
  const products = productsFullInfo.map((el)=>(
      {
        ...el ,
        quantity:items[el.id]

      } ));

  const dispatch = useAppDispatch();
  useEffect (()=>{
    dispatch(actGetProductsByItems())
    return ()=>{
      dispatch(cartProductInfoCleanUp());
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
  return (
    <>
     <Heading> cart</Heading>
     <Loading error={error}  status={loading} >
      {products.length ? 
                <>
                <CartItemList products={products} 
                               ChangeQuantityHandler={ChangeQuantityHandler}
                               DeleteItemHandler={deleteItemHandler}/>
                {/* this cartItemList for loop databy map */}
                <CartSubtotalPrice products={products} />
        
              </> 
              : (" Your Cart is empty")
              }

      </Loading>
     

    </>
  )
}
export default Cart;

