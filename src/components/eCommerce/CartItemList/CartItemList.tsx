import { Tproduct } from "@customTypes/product";
import CartItem from "../CartItem/CartItem";
type CartItemListProps = {
    products :Tproduct[];
    ChangeQuantityHandler:(id:number,quantity:number)=>void;
    DeleteItemHandler:(id:number)=>void;
};

const CartItemList=({products , ChangeQuantityHandler ,DeleteItemHandler}:CartItemListProps)=> {
  const renderList = products.map((el)=> <CartItem key={el.id} {...el} 
                                           ChangeQuantityHandler={ChangeQuantityHandler}
                                           DeleteItemHandler={DeleteItemHandler} />)
  return (
    <div>
      {renderList}
    </div>
  )
}
export default CartItemList;
