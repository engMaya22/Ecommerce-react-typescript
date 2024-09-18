import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { Tproduct } from "@customTypes/product";
import { useDispatch } from "react-redux";
import { addToCart } from "@store/cart/cartSlice";
import { memo, useEffect, useState } from "react";
import LikeFill from "@assets/svg/like-fill.svg?react"
import Like from "@assets/svg/like.svg?react"
const { product, productImg ,maximumNotice ,wishListBtn} = styles;


const Product = memo(({id , title ,img ,price , max ,quantity}:Tproduct) => {
  console.log(quantity);
  const currentRemainQuantity = max - (quantity?? 0);//if no quantity added from product make it zero 
  const quantityReachedMax = currentRemainQuantity == 0 ? true :false;
 const [isBtnDisabled, setIsBtnDisabled] = useState(false);
 useEffect(()=>{
   if(!isBtnDisabled)
     return;
   setIsBtnDisabled(true)
   const debounse = setTimeout(()=>{
    setIsBtnDisabled(false)

   },300)//make it disable after 300 ms
   
   return ()=>clearTimeout(debounse);
   

 },[isBtnDisabled])

  const dispatch = useDispatch();
  const addToCartHandler =()=>{
    dispatch (addToCart(id));
    setIsBtnDisabled(true)

  }
  return (
    <div className={product}>
      <div className={wishListBtn}> <Like /> </div>
      <div className={productImg}>
        <img
          src={img}
          alt={title}
        />
      </div>
      <h2 title={title}>{title}</h2>
      <h3>{price.toFixed(2)}</h3>
      <p className={maximumNotice}>{quantityReachedMax ? "you reached max" : `you can add ${currentRemainQuantity} item(s)`}</p>
      <Button variant="info" style={{ color: "white" }} 
              onClick={addToCartHandler} 
              disabled={isBtnDisabled || quantityReachedMax}
              >
                 {isBtnDisabled? <><Spinner animation="border" size="sm"/>Loading...</> :"Add to cart" }
        
      </Button>

    </div>
  );
});

export default Product;