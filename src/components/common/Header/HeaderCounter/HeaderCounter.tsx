import styles from "./styles.module.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const {container , totalNum ,pumpAnimate ,iconWrapper} = styles;
type HeaderQuantityProps = {
  title:string,
  totalQuantity:number,
  svgIcon :React.ReactNode,
  to : string ,//destination route when click on icon
}
const HeaderCounter = ({totalQuantity ,svgIcon ,to , title}:HeaderQuantityProps)=>{
    const navigate = useNavigate();
    const [isAnimated , setIsAnimated] = useState(false);
    const qunaitityStyle = `${totalNum} ${isAnimated ? pumpAnimate : ''} `

    useEffect(()=>{
      if(!totalQuantity)
         {return;}//not animated if zero
      setIsAnimated(true)

      const debounce = setTimeout(() => setIsAnimated(false), 300);//call set false  after  animation finised (300ms)
      return ()=>clearTimeout(debounce);
      
    },[totalQuantity])
   
    return <div className={container} onClick={()=>navigate(to)} >
    
            <div className={iconWrapper}>
              {svgIcon}
              { totalQuantity >0 && <div className={qunaitityStyle}>{totalQuantity}</div>}
            </div>
            <h3 >{title}</h3>
           </div>

}
export default HeaderCounter;
