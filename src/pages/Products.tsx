
import {Loading} from "@components/feedback"
import { GridList, Heading } from "@components/common";
import { memo } from "react";
import useProducts from "@hooks/useProducts";
import { Product } from "@components/eCommerce";

const Products = memo(() => {

 const { loading , error ,productsFullInfo ,paramsPrefix} = useProducts();
  return (
    <>
    <Heading title={`${paramsPrefix?.toUpperCase()} Products`} />
      <Loading error={error}  status={loading} >
      <GridList records={productsFullInfo} 
                          renderItem={(record)=><Product {...record} />}
                />
                
      </Loading>
    </>
  );
});

export default Products;