import { Container, Row, Col } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { useEffect } from "react";
import { actGetProductsByCat, productsCleanUp } from "@store/products/productsSlice";
import { useParams } from "react-router-dom";
import {Loading} from "@components/feedback"
import { GridList } from "@components/common";

const Products = () => {
  const {records , loading , error} = useAppSelector((state)=>state.products);
  const params = useParams();
  console.log(params);
  const dispatch = useAppDispatch();
  useEffect(()=>{
      dispatch(actGetProductsByCat(params?.prefix as string))//here I could make casting as I make guard ti sure
      //in app url that the prefix is string
      return ()=>{
        dispatch(productsCleanUp());
      }


    } , [dispatch, params])
  // const productsList = records.length > 0 ? records.map((record)=>(
  //       <Col key={record.id} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
  //         <Product {...record} />
  //       </Col>
  
  // )): 'There are no products available'

  return (
    <Container>
      <Loading error={error}  status={loading} >
      <GridList records={records} 
                          renderItem={(record)=><Product {...record} />}
                />
                
      </Loading>
    </Container>
  );
};

export default Products;