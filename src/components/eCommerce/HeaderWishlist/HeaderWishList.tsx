import WishList from "@assets/svg/wishlist.svg?react"
import styles from "./styles.module.css"
import { useAppSelector } from "@store/hook";
import { getCartTotalQuantity } from "@store/cart/selectors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const {container , totalNum ,pumpAnimate ,iconWrapper} = styles;
const HeaderBasket = ()=>{
    const navigate = useNavigate();
    const items = useAppSelector(state => state.wishlist.itemsId);
    const qunaitityStyle = `${totalNum}

     } `

   
   
    return <div className={container} onClick={()=>navigate('/wishlist')} >
    
            <div className={iconWrapper}>
              <WishList />
               {items && <div className={qunaitityStyle}>{items.length}</div>}
            </div>
            <h3 >Wishlist</h3>
           </div>

}
export default HeaderBasket;
