import {  Heading } from "@components/common";
import { CartItem, CartItemList, CartSubtotalPrice } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { actGetProductsByItems } from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { useEffect } from "react";


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
  return (
    <>
     <Heading> cart</Heading>
     <Loading error={error}  status={loading} >
      <>
        <CartItemList products={products} />
        {/* this cartItemList for loop databy map */}
        <CartSubtotalPrice />

      </>

      </Loading>
     
     <CartSubtotalPrice/>

    </>
  )
}
export default Cart;

