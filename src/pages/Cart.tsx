import {  Heading } from "@components/common";
import {  CartItemList, CartSubtotalPrice } from "@components/eCommerce";
import { Loading, LottieHandler } from "@components/feedback";
import useCart from "@hooks/useCart";



const  Cart=()=> {
  const {products , loading ,error , ChangeQuantityHandler , deleteItemHandler } = useCart();
  return (
    <>
     <Heading title="Your Cart" /> 
     <Loading error={error}  status={loading} type="cart" >
      {products.length ? 
                <>
                <CartItemList products={products} 
                               ChangeQuantityHandler={ChangeQuantityHandler}
                               DeleteItemHandler={deleteItemHandler}/>
                {/* this cartItemList for loop databy map */}
                <CartSubtotalPrice products={products} />
        
              </> 
              : 
                <LottieHandler  type="emptyCart"  message="Your cart is empty" />

                 
              }

      </Loading>
     

    </>
  )
}
export default Cart;

