import { Container } from "react-bootstrap";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError()  ;// to access status , statusText

  let status:number;
  let statusText:string;
  
  if(isRouteErrorResponse(error)){//error from react router dom
         status = error.status;
         statusText = error.statusText;
  }else{
    status = 400;
    statusText ='Page not found';

  }
  return (
  <Container className="notFound">
      <h1>{status}</h1>
      <p>{statusText}</p>
      <Link to="/" replace={true}> How about going back to safety?</Link>
    </Container>
  )
}
