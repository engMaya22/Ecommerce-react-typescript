import { Heading } from "@components/common";
import { Button, Col, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema ,signUpType } from "@validations/signUpSchema";


export default function Registeration() {
  const { register, handleSubmit , formState: { errors }} = useForm<signUpType>({
    mode:"onBlur",//to  realtime validate
    resolver: zodResolver(signUpSchema), // Apply the zodResolver
  });
  const submitForm: SubmitHandler<signUpType> = (data) => console.log(data)
  return (
          <>
            <Heading title="User Register"/>
            <Row>
              <Col md={{span:6 , offset:3}}>
                <Form onSubmit={handleSubmit(submitForm)}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>First name </Form.Label>
                      <Form.Control type="text" {...register("firstName")} isInvalid={errors.firstName?.message ? true : false} />
                      <Form.Control.Feedback type="invalid">
                         {errors.firstName?.message }
                      </Form.Control.Feedback>
                  </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control type="text"   {...register("lastName")}  isInvalid={errors.lastName?.message ? true : false} />
                  <Form.Control.Feedback type="invalid">
                         {errors.lastName?.message }
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="text" {...register("email")}  isInvalid={errors.email?.message ? true : false} />
                  <Form.Control.Feedback type="invalid">
                         {errors.email?.message }
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password"    {...register("password")}  isInvalid={errors.password?.message ? true : false} />
                  <Form.Control.Feedback type="invalid">
                         {errors.password?.message }
                  </Form.Control.Feedback>
                </Form.Group>

                
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password"   {...register("confirmPassword")}  isInvalid={errors.confirmPassword?.message ? true : false} />
                  <Form.Control.Feedback type="invalid">
                         {errors.confirmPassword?.message }
                  </Form.Control.Feedback>
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
