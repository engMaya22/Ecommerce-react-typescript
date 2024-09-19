import { Container } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { useEffect } from "react";
import { actGetCategories, categoriesRecordsCleanUp } from "@store/categories/categoriesSlice";
import {Loading} from "@components/feedback"
import { GridList, Heading } from "@components/common";
const Categories = () => {
  const {loading , records , error} = useAppSelector((state) => state.categories)
  const dispatch = useAppDispatch()

  useEffect(()=>{
   // if(!records.length)//there is data as categories  take long time to add new categories
    //like products so dont fire and call api
    //every time I get the page so cash the result 
   
    dispatch(actGetCategories())
    return ()=>{
      dispatch(categoriesRecordsCleanUp());
    }
   
  },[dispatch ])

  // const categoriesList = records.length > 0 ? records.map((record)=>(
  //   <Col key={record.id}   xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
  //     <Category {...record} />
  //   </Col>
  // )): 'There are no categories';
  return (
        <>
              <Heading>Categories</Heading>
              <Loading error={error}  status={loading} >
                <GridList records={records} 
                          renderItem={(record)=><Category {...record} />}
                />
                
              </Loading>
        </>
  );
};

export default Categories;