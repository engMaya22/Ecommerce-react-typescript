import {useState} from "react";
import { Tproduct } from "@types";
import styles from "./styles.module.css"
import { Button , Modal, Spinner} from "react-bootstrap";
import { useAppDispatch } from "@store/hook";
import {actPlaceOrder } from "@store/orders/ordersSlice"
import {cleanCartAfterPlaceHolder } from "@store/cart/cartSlice"


type CartSubTotalPriceProps ={
  products:Tproduct[],
  userAccessToken ? : string | null
}
const  CartSubtotalPrice=({products , userAccessToken}:CartSubTotalPriceProps) =>{

  const [error , setError]= useState<string | null >(null);
  const [loading , setLoading] = useState(false)

  const subTotal = products.reduce((accum, product) => {
    const price = product.price;
    const quantity = product.quantity;
    if(quantity && typeof quantity === 'number'){//if it is defined 
      return accum + price*quantity;

    }else{
      return accum
    }
  }, 0)

  const [showModal , setShowModal ]= useState(false);
  const dispatch = useAppDispatch();

  const handlePlaceHolder = ()=>{
    setLoading(true)
    dispatch(actPlaceOrder(subTotal))
    //there is another approach instead of get them from state
     .unwrap()
     .then(()=>{//success
         dispatch(cleanCartAfterPlaceHolder())
         setShowModal(false)
     })
     .catch((error)=>{//this error from state
        setError(error)
     })
     .finally(()=>{setLoading(false)})//if process failed or success
    
  }
  const modalHandler = ()=>{
    setShowModal(!showModal)
    setError(null)

  }
  return (
   <>

      <Modal show={showModal} onHide={modalHandler} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Placing Order </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to place order with subtotal : {subTotal } EGP
          { !loading && error && ( <p style={{color: "#DC3545" , marginTop:"10px"}}> {error}</p>) }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandler}>
            Close
          </Button>
          <Button variant="info" style={{color:"white"}} onClick={()=>handlePlaceHolder()}>
             {loading ? <><Spinner animation="border" size="sm"></Spinner>Loading ..</> : 'Confirm'}
            
          </Button>
        </Modal.Footer>
      </Modal>
  


      <div className={styles.container}> 
        <span>Subtotal:</span>
        <span>{subTotal.toFixed(2)}EGP</span>
       </div>
      <div className={styles.container}> 
      <span></span>
      {
        userAccessToken &&
        <span>
         <Button variant="info" style={{color:"white"}} onClick={modalHandler}>Place Order</Button>
        </span>
      }

  </div>
   </>

    
  )
}
export default CartSubtotalPrice;