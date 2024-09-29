import { Heading } from "@components/common";
import { Button, Col, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema ,signUpType } from "@validations/signUpSchema";
import { Input } from "@components/Form/Index";


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
                 <Input label="First name" name="firstName" register={register} error={errors.firstName?.message}/>
                  {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>First name </Form.Label>
                      <Form.Control type="text" {...register("firstName")} isInvalid={errors.firstName?.message ? true : false} />
                      <Form.Control.Feedback type="invalid">
                         {errors.firstName?.message }
                      </Form.Control.Feedback>
                  </Form.Group> */}
                 <Input label="Last name" name="lastName" register={register} error={errors.lastName?.message}/>

                <Input label="Email address" name="email" register={register} error={errors.email?.message}/>

                <Input label="Password" type="password" name="password" register={register} error={errors.password?.message}/>
                <Input label="Confirm password" type="password" name="confirmPassword" register={register} error={errors.confirmPassword?.message}/>

              
        
                <Button variant="info" type="submit" style={{color:"white"}}>
                  Submit
                </Button>
                  </Form>
              </Col>
            </Row>
          </>
  )
}
