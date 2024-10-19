import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { Tproduct } from "@types";
import { useDispatch } from "react-redux";
import { addToCart } from "@store/cart/cartSlice";
import { memo, useEffect, useState } from "react";
import Like from "@assets/svg/like.svg?react"
import LikeFill from "@assets/svg/like-fill.svg?react"
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import ProductInfo from "../ProductInfo/ProductInfo";
const { maximumNotice ,wishListBtn} = styles;


const Product = memo(({id , title ,img ,price , max ,quantity , isLiked ,isAuthenticated}:Tproduct) => {

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
  const [isLoading, setIsLoading] = useState(false);//we need to specify type just in case there is more than one type
  const [showModal , setShowModal] =useState(false);
  const addToCartHandler =()=>{
    dispatch (addToCart(id));
    setIsBtnDisabled(true)

  }
  const likeToggleHandler = ()=>{
    if(!isAuthenticated)
    {
      setShowModal(true);
      return ;
    }
    if(isLoading)
      return;
    setIsLoading(true);
    dispatch(actLikeToggle(id)).unwrap()
                                .then(()=>{
                                 setIsLoading(false)
                                })
                                .catch()//if server fails
                                .then(()=>{
                                  setIsLoading(false)
                                 })

  }
  return (
  <>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You need to login first to add this item to your wishlist.
        </Modal.Body>
     </Modal>
    {/* <div className={product}>
      <div className={wishListBtn} onClick={likeToggleHandler} >
        {
              isLoading? 
                      <Spinner animation="border" variant="primary" size="sm"/>
                       :

              isLiked?
                       <LikeFill />
                     : <Like />  
        }
          
      </div>
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

    </div> */}
     <ProductInfo  title={title} img={img} price={price} direction="row">
      <div className={wishListBtn} onClick={likeToggleHandler} >
          {
                isLoading? 
                        <Spinner animation="border" variant="primary" size="sm"/>
                        :

                isLiked?
                        <LikeFill />
                      : <Like />  
          }
            
        </div>
        <p className={maximumNotice}>{quantityReachedMax ? "you reached max" : `you can add ${currentRemainQuantity} item(s)`}</p>
          <Button variant="info" style={{ color: "white" }} 
                  onClick={addToCartHandler} 
                  disabled={isBtnDisabled || quantityReachedMax}
                  >
                    {isBtnDisabled? <><Spinner animation="border" size="sm"/>Loading...</> :"Add to cart" }
            
          </Button>

     </ProductInfo>
      
      
     
 
  </>
  );
});

export default Product;