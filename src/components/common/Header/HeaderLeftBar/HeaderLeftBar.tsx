import { useAppSelector } from "@store/hook";
import { getCartTotalQuantity } from "@store/cart/selectors";
import WishlistIcon from "@assets/svg/wishlist.svg?react";
import CartIcon from "@assets/svg/cart.svg?react"
import styles from "./styles.module.css"

import HeaderCounter from "../HeaderCounter/HeaderCounter";
const {headerLeftBar} = styles;

const HeaderLeftBar=()=> {
  const wishlisttotalQuantity = useAppSelector(state => state.wishlist.itemsId.length);
  const cartTotalQuantity = useAppSelector(getCartTotalQuantity)
  return (
    <div className={headerLeftBar}>
      <HeaderCounter title="Wishlist" totalQuantity={wishlisttotalQuantity} svgIcon={<WishlistIcon title="wishlist"/>} to="/wishlist" />
      <HeaderCounter title="Cart" totalQuantity={cartTotalQuantity} svgIcon={<CartIcon title="cart"/>}  to="/cart" />
   </div>

  )
}
export default HeaderLeftBar;
