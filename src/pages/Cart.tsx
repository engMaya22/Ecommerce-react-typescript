import {  Heading } from "@components/common";
import { CartItem, CartItemList, CartSubtotalPrice } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { actGetProductsByItems, cartChangeQuantity } from "@store/cart/cartSlice";
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
  },[dispatch])

  const ChangeQuantityHandler= useCallback(
   (id:number, quantity:number)=>{
    // console.log(id, quantity);//quanity is set from event target in cart item
     dispatch(cartChangeQuantity({id,quantity}))

    },[dispatch]);
  return (
    <>
     <Heading> cart</Heading>
     <Loading error={error}  status={loading} >
      <>
        <CartItemList products={products} 
                       ChangeQuantityHandler={ChangeQuantityHandler}/>
        {/* this cartItemList for loop databy map */}
        <CartSubtotalPrice />

      </>

      </Loading>
     
     <CartSubtotalPrice/>

    </>
  )
}
export default Cart;

