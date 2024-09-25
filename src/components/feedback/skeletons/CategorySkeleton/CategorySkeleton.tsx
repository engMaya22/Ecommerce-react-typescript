import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader"

const  CategorySkeleton = ()=> {
  const renderSkeltons = Array(4).fill(0)
        .map((_,idx)=>(
         <Col key={idx} sx={3} className="d-flex justify-content-center mb-5 mt-2">
                  <ContentLoader 
                    speed={2}
                    width={200}
                    height={220}
                    viewBox="0 0 180 209"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                  <circle cx="99" cy="67" r="70" /> 
                  <rect x="116" y="40" rx="0" ry="0" width="2" height="52" /> 
                  <rect x="44" y="153" rx="5" ry="5" width="135" height="11" />
                </ContentLoader>
        </Col>
        ));
  return <Row>{renderSkeltons} </Row>
}
export default CategorySkeleton;
