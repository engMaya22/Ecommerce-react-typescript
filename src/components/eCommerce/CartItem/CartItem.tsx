import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { Tproduct } from "@types";
import { memo, useCallback } from "react";
import { useAppDispatch } from "@store/hook";
import { removeCartItem } from "@store/cart/cartSlice";
import ProductInfo from "../ProductInfo/ProductInfo";

const { cartItem , cartItemSelection } =
  styles;

type CartItemProps = Tproduct & {
  ChangeQuantityHandler:(id:number,quantity:number)=>void;
  DeleteItemHandler:(id:number)=>void;

};

const CartItem = memo(({id ,title,img,price , max ,quantity ,ChangeQuantityHandler,DeleteItemHandler}:CartItemProps) => {
  const dispatch = useAppDispatch();

  const renderOptions = Array(max).fill(0).map((el,idx)=>{
    const quantity = ++idx;
    return (
      <option key={quantity} value={quantity}>{quantity}</option>

    );})
  
  const changeQuantity=(event:React.ChangeEvent<HTMLSelectElement>)=>{
    const quantity = +event.target.value;
    ChangeQuantityHandler(id,quantity);

  }


  return (
    <div className={cartItem}>
      {/* <div className={product}>
        <div className={productImg}>
          <img
            src={img}
            alt={title}
          />
        </div>
        <div className={productInfo}>
          <h2>{title}</h2>
          <h3>{price.toFixed(2)}</h3>
          <Button
            variant="secondary"
            style={{ color: "white" }}
            className="mt-auto"
            onClick={()=>DeleteItemHandler(id)}
          >
            Remove
          </Button>
        </div>
      </div> */}
      <ProductInfo title={title} img={img} price={price} direction="column" >
          <Button
              variant="secondary"
              style={{ color: "white" }}
              className="mt-auto"
              onClick={()=>DeleteItemHandler(id)}
          >
            Remove
          </Button>
      </ProductInfo>

      <div className={cartItemSelection}>
        <span className="d-block mb-1" > Quantity</span>
        {/* current quantity for each itme  is selected */}
        <Form.Select aria-label="Default select example" value={quantity} onChange={changeQuantity}>
          {renderOptions}
        </Form.Select>
      </div>
    </div>
    
  );
});

export default CartItem;


