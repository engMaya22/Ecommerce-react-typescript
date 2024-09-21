import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Tcategory } from "@types";
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
            <h4 className={categoryTitle}>{title}</h4>
        </Link>
    </div>
  
  );
};

export default Category;