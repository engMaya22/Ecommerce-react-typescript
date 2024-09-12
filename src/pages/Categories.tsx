import { Container, Row, Col } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { useEffect } from "react";
import { actGetCategories } from "@store/categories/categoriesSlice";
import {Loading} from "@components/feedback"
const Categories = () => {
  const {loading , records , error} = useAppSelector((state) => state.categories)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    if(!records.length)//there is data as categories  take long time to add new categories
    //like products so dont fire and call api
    //every time I get the page so cash the result 
    dispatch(actGetCategories())
  },[dispatch , records])

  const categoriesList = records.length > 0 ? records.map((record)=>(
    <Col key={record.id}   xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
      <Category {...record} />
    </Col>
  )): 'There are no categories';
  return (
        <Container>
              <Loading error={error}  status={loading} >
                <Row>
                 {categoriesList}
                </Row>
              </Loading>

        </Container>
  );
};

export default Categories;