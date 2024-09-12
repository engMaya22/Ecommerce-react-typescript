import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { Tproduct } from "@customTypes/product";
const { product, productImg } = styles;

const Product = ({title ,img ,price }:Tproduct) => {
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
      <Button variant="info" style={{ color: "white" }}>
        Add to cart
      </Button>
    </div>
  );
};

export default Product;