import { Link, useHref } from "react-router-dom";
import styles from "./styles.module.css";
const { category, categoryImg, categoryTitle } = styles;
interface IProps {
  title:string,
  img:string,
  prefix:string
  
}
const Category = ({title,img,prefix}:IProps) => {

  return (
   <Link to={`products/${prefix}`} >
        <div className={category}>
          <div className={categoryImg}>
            <img
              src={img}
              alt={title}
            />
          </div>
          <h4 className={categoryTitle}>Title</h4>
    </div>
   </Link>
  );
};

export default Category;