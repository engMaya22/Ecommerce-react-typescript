import { Tproduct } from "@customTypes/product";
import CartItem from "../CartItem/CartItem";
type CartItemListProps = {
    products :Tproduct[];
    ChangeQuantityHandler:(id:number,quantity:number)=>void;
};

const CartItemList=({products , ChangeQuantityHandler}:CartItemListProps)=> {
  const renderList = products.map((el)=> <CartItem key={el.id} {...el} ChangeQuantityHandler={ChangeQuantityHandler} />)
  return (
    <div>
      {renderList}
    </div>
  )
}
export default CartItemList;
