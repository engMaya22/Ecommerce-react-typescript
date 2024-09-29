
import { Heading } from "@components/common";
import { Button, Col, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";


interface IFormInput {
  email: string,
  password: string,

}
export default function Login() {
  const { register, handleSubmit } = useForm<IFormInput>()
  const submitForm: SubmitHandler<IFormInput> = (data) => console.log(data)

  return (
    <>
        <Heading title="User Login"/>
        <Row>
          <Col md={{span:6 , offset:3}}>
            <Form onSubmit={handleSubmit(submitForm)}>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="text"  {...register("email")}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"   {...register("password")}/>
            </Form.Group>
            
            <Button variant="info" type="submit" style={{color:"white"}}>
              Submit
            </Button>
              </Form>
          </Col>
        </Row>
    </>
  )
}
