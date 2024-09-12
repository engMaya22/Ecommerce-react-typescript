import { Container, Row, Col } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { useEffect } from "react";
import { actGetCategories } from "@store/categories/categoriesSlice";

const Categories = () => {
  const {loading , records , error} = useAppSelector((state) => state.categories)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(actGetCategories())
  },[dispatch])

  const categoriesList = records.length > 0 ? records.map((record)=>(
    <Col key={record.id}   xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
      <Category {...record} />
    </Col>
  )): 'There are no categories';
  return (
    <Container>
      <Row>
       {categoriesList}
      </Row>
    </Container>
  );
};

export default Categories;