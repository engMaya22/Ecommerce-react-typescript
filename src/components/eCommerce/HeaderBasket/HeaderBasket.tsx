import Logo from "@assets/svg/cart.svg?react"
import styles from "./styles.module.css"
import { useAppSelector } from "@store/hook";
import { getCartTotalQuantity } from "@store/cart/selectors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const {basketContainer , basketQuantity ,pumpCartQuantity ,basketCart} = styles;
const HeaderBasket = ()=>{
    const navigate = useNavigate();
    const totalQuantity = useAppSelector(getCartTotalQuantity);
    const [isAnimated , setIsAnimated] = useState(false);
    const qunaitityStyle = `${basketQuantity} ${isAnimated ? pumpCartQuantity : ''} `

    useEffect(()=>{
      if(!totalQuantity)
         {return;}//not animated if zero
      setIsAnimated(true)

      const debounce = setTimeout(() => setIsAnimated(false), 300);//call set false  after  animation finised (300ms)
      return ()=>clearTimeout(debounce);
      
    },[totalQuantity])
   
    return <div className={basketContainer} onClick={()=>navigate('/cart')} >
            <div className={basketCart}>
              <Logo />
              <div className={qunaitityStyle}>{totalQuantity}</div>
            </div>
            <h3 >Cart</h3>
           </div>

}
export default HeaderBasket;
