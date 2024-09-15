import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { Tproduct } from "@customTypes/product";
import { useDispatch } from "react-redux";
import { addToCart } from "@store/cart/cartSlice";
import { useEffect, useState } from "react";
const { product, productImg } = styles;

const Product = ({id , title ,img ,price }:Tproduct) => {
 
 const [isBtnClicked,setIsBtnClicked] = useState(0);
 const [isBtnDisabled, setIsBtnDisabled] = useState(false);
 useEffect(()=>{
   if(!isBtnClicked)
     return;
   setIsBtnDisabled(true)
   const debounse = setTimeout(()=>{
    setIsBtnDisabled(false)

   },300)
   
   return ()=>clearTimeout(debounse);
   

 },[isBtnClicked])

  const dispatch = useDispatch();
  const addToCartHandler =()=>{
    dispatch (addToCart(id));
    setIsBtnClicked((prev)=>prev+1);

  }
  return (
    <div className={product}>
      <div className={productImg}>
        <img
          src={img}
          alt={title}
        />
      </div>
      <h2 title={title}>{title}</h2>
      <h3>{price}</h3>
      <Button variant="info" style={{ color: "white" }} 
              onClick={addToCartHandler} 
              disabled={isBtnDisabled}
              >
                 {isBtnDisabled? <><Spinner animation="border" size="sm"/>Loading</> :"Add to cart" }
        
      </Button>
    </div>
  );
};

export default Product;