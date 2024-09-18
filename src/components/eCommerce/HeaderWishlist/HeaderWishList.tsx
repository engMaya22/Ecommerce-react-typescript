import WishList from "@assets/svg/wishlist.svg?react"
import styles from "./styles.module.css"
import { useAppSelector } from "@store/hook";
import { getCartTotalQuantity } from "@store/cart/selectors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const {container , totalNum ,pumpAnimate ,iconWrapper} = styles;
const HeaderBasket = ()=>{
    const navigate = useNavigate();
    const totalQuantity = 0;
    const [isAnimated , setIsAnimated] = useState(false);
    const qunaitityStyle = `${totalNum} ${isAnimated ? pumpAnimate : ''} `

    // useEffect(()=>{
    //   if(!totalQuantity)
    //      {return;}//not animated if zero
    //   setIsAnimated(true)

    //   const debounce = setTimeout(() => setIsAnimated(false), 300);//call set false  after  animation finised (300ms)
    //   return ()=>clearTimeout(debounce);
      
    // },[totalQuantity])
   
    return <div className={container} onClick={()=>navigate('/wishlist')} >
    
            <div className={iconWrapper}>
              <WishList />
               {totalQuantity && <div className={qunaitityStyle}>{totalQuantity}</div>}
            </div>
            <h3 >Wishlist</h3>
           </div>

}
export default HeaderBasket;
