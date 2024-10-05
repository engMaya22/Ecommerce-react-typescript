
import { Heading } from "@components/common";
import { Input } from "@components/Form/Index";
import { Col, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import useLogin from "@hooks/useLogin";



export default function Login() {
  const { accessToken, searchParams ,handleSubmit ,submitForm , register , error , formErrors , loading} = useLogin();
  if(accessToken){
    return <Navigate to="/" />
    //This way it redirect to home page if I try to add login route from browser 
  }

  return (
    <>
        <Heading title="User Login"/>
        <Row>
          <Col md={{span:6 , offset:3}}>
            {searchParams.get('message') === "account_created" && ( <Alert variant="success"> Your account successfully created please login</Alert>)}
            
            {searchParams.get('message') === "login_required" && ( <Alert variant="success"> Your login to view this content</Alert>)}

            <Form onSubmit={handleSubmit(submitForm)}>

            <Input label="Email address" name="email" register={register} error={formErrors.email?.message}/>
            <Input label="Password" type="password" name="password" register={register} error={formErrors.password?.message}/>

            
            <Button variant="info" type="submit" style={{color:"white"}}>
              {loading == "pending" ? <><Spinner animation="border" size="sm"></Spinner>Loading ..</> : 'Submit'}
            </Button>
            {error &&  <p style={{color:"#DC3545",marginTop:"10px"}}>{error}</p>}
            </Form>
          </Col>
        

        </Row>
    </>
  )
}
