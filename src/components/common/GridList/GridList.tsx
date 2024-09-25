import { LottieHandler } from "@components/feedback";
import { Col, Row } from "react-bootstrap";


type GridListProps<T> = {//take record and function
    records:T[],
    renderItem:(record:T)=>React.ReactElement,//take record and return component
    emptyMessage:string

}
type HasId = {
    id?:number
}

 const  GridList = <T extends HasId>({records , renderItem ,emptyMessage}:GridListProps<T >) =>{

    const dataList = records.length > 0 ? records.map((record)=>(
        <Col key={record.id}   sx={3} className="d-flex justify-content-center mb-5 mt-2">
          {renderItem(record)}
          {/* this function return component  */}
        </Col>
      )): <LottieHandler type='emptyCart' message={emptyMessage} />;
  return <Row>
            {dataList}
         </Row>
}
 export default GridList;
