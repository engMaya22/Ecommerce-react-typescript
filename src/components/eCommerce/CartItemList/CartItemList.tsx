import { Tproduct } from "@customTypes/product";
import CartItem from "../CartItem/CartItem";
type CartItemListProps = {
    products :Tproduct[];
};

const CartItemList=({products}:CartItemListProps)=> {
  const renderList = products.map((el)=> <CartItem key={el.id} {...el} />)
  return (
    <div>
      {renderList}
    </div>
  )
}
export default CartItemList;