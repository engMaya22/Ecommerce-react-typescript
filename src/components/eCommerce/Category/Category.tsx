import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Tcategory } from "@customTypes/category";
const { category, categoryImg, categoryTitle } = styles;
// interface IProps {
//   title:string,
//   img:string,
//   prefix:string
  
// }
const Category = ({title,img,prefix}:Tcategory) => {

  return (
        <div className={category}>
          <Link to={`products/${prefix}`} >
            <div className={categoryImg}>
              <img
                src={img}
                alt={title}
              />
            </div>
            <h4 className={categoryTitle}>Title</h4>
        </Link>
    </div>
  
  );
};

export default Category;