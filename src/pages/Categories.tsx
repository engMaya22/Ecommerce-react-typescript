
import {Loading} from "@components/feedback"
import { GridList, Heading } from "@components/common";
import { Category } from "@components/eCommerce";
import useCategories from "@hooks/useCategories";
const Categories = () => {

  const {loading , error , records}  = useCategories();
  return (
        <>
              <Heading title="Categories" />
              <Loading error={error}  status={loading} type="category">
                <GridList records={records} 
                          renderItem={(record)=><Category {...record} />}
                />
                
              </Loading>
        </>
  );
};

export default Categories;