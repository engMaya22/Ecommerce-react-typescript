
import { Heading } from "@components/common";
import { Input } from "@components/Form/Index";
import { zodResolver } from "@hookform/resolvers/zod";
import { actAuthLogin } from "@store/auth/authSlice";
import { useAppDispatch } from "@store/hook";
import { signInSchema, signInType } from "@validations/signInSchema ";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";



export default function Login() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams , setSearchParams] = useSearchParams();
  const { register, handleSubmit , formState: { errors }} = useForm<signInType>({
    mode:"onBlur",//to  realtime validate
    resolver: zodResolver(signInSchema), // Apply the zodResolver
  });
  const submitForm: SubmitHandler<signInType> = async(data) => {
    dispatch(actAuthLogin(data))
    .unwrap()
    .then(()=>{
      navigate("/")
    });
  }

  return (
    <>
        <Heading title="User Login"/>
        <Row>
          <Col md={{span:6 , offset:3}}>
            {searchParams.get('message') === "account_created" && ( <Alert variant="success"> Your account successfully created please login</Alert>)}
            <Form onSubmit={handleSubmit(submitForm)}>

            <Input label="Email address" name="email" register={register} error={errors.email?.message}/>
            <Input label="Password" type="password" name="password" register={register} error={errors.password?.message}/>

            
            <Button variant="info" type="submit" style={{color:"white"}}>
              Submit
            </Button>
              </Form>
          </Col>
        </Row>
    </>
  )
}
