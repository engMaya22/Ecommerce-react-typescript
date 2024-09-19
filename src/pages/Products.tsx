import { Container, Row, Col } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { memo, useEffect } from "react";
import { actGetProductsByCat, productsRecordCleanUp } from "@store/products/productsSlice";
import { useParams } from "react-router-dom";
import {Loading} from "@components/feedback"
import { GridList, Heading } from "@components/common";

const Products = memo(() => {
  const {records , loading , error} = useAppSelector((state)=>state.products);
  const params = useParams();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state)=>state.cart.items);
  const wishlistItemsId = useAppSelector((state)=>state.wishlist.itemsId)
  const productsFullInfo = records.map((el)=>({
    ...el ,
    quantity:cartItems[el.id] || 0 ,//we added current quantity to each item if no quantity it is zero
    //which is value of cartItems array
    isLiked : wishlistItemsId.includes(el.id)
  }));


  useEffect(()=>{
      dispatch(actGetProductsByCat(params?.prefix as string))//here I could make casting as I make guard ti sure
      //in app url that the prefix is string
      return ()=>{
        dispatch(productsRecordCleanUp());
      }


    } , [dispatch, params])
  // const productsList = records.length > 0 ? records.map((record)=>(
  //       <Col key={record.id} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
  //         <Product {...record} />
  //       </Col>
  
  // )): 'There are no products available'

  return (
    <>
    <Heading title={`${params.prefix?.toUpperCase()} Products`} />
      <Loading error={error}  status={loading} >
      <GridList records={productsFullInfo} 
                          renderItem={(record)=><Product {...record} />}
                />
                
      </Loading>
    </>
  );
});

export default Products;