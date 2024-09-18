import { Tproduct } from "@customTypes/product";
import styles from "./styles.module.css"

type CartSubTotalPriceProps ={
  products:Tproduct[],
}
const  CartSubtotalPrice=({products}:CartSubTotalPriceProps) =>{
  const subTotal = products.reduce((accum, product) => {
    const price = product.price;
    const quantity = product.quantity;
    if(quantity && typeof quantity === 'number'){//if it is defined 
      return accum + price*quantity;

    }else{
      return accum
    }
  }, 0)

  return (
    <div className={styles.container}> 
        <span>Subtotal:</span>
        <span>{subTotal.toFixed(2)}$</span>
    </div>
    
  )
}
export default CartSubtotalPrice;