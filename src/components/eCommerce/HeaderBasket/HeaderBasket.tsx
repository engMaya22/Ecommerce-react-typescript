import Logo from "@assets/svg/cart.svg?react"
import styles from "./styles.module.css"
import { useAppSelector } from "@store/hook";
import { getCartTotalQuantity } from "@store/cart/selectors";
const {basketContainer , basketQuantity} = styles;
const HeaderBasket = ()=>{
    const cartItems = useAppSelector(getCartTotalQuantity);
    // const {items} = useAppSelector(state => state.cart);
    // const totalQuantity = Object.values(cartItems).reduce(//values of cartItem object which are quantity
    //   (accumulator,current)=>{
    //     return accumulator + current;

    //   },0//zero is initial value
    // )
    return <div className={basketContainer}>
             <Logo />
             <div className={basketQuantity}>{cartItems}</div>
           </div>

}
export default HeaderBasket;
