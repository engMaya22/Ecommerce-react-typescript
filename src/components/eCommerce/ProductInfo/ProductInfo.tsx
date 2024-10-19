import styles from './styles.module.css'

type ProductInfoProps = {
    title :string,
    price: number ,
    direction : "row" | "column" ,// as the products cart is row but in products index page is col
    img : string ,
    children ?: React.ReactNode ,
    style ? : React.CSSProperties,
}
const ProductInfo = ({title , price , direction ="row" , img , children ,style }:ProductInfoProps) => {
  return (
    <div className={`${styles[`product-${direction}`]}`}  style={style}>
        <div className={`${styles[`productImg-${direction}`]}`}>
          <img
            src={img}
            alt={title}
          />
        </div>
        <div className={`${styles[`productInfo-${direction}`]}`}>
          <h2 title={title}>{title}</h2>
          <h3>{price.toFixed(2)}</h3>
          {children}
        </div>
      </div>
  )
}

export default ProductInfo
