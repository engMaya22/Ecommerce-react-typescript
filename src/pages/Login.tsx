
import { Heading } from "@components/common";
import { Input } from "@components/Form/Index";
import { zodResolver } from "@hookform/resolvers/zod";
import { actAuthLogin, resetUI } from "@store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { signInSchema, signInType } from "@validations/signInSchema ";
import { useEffect } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams ,Navigate } from "react-router-dom";



export default function Login() {
  const {accessToken} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  useEffect(()=>{
    return ()=>{
      dispatch(resetUI())
    }
  } , [dispatch])
  const navigate = useNavigate();
  const {error , loading} = useAppSelector(state => state.auth);
  const [searchParams , setSearchParams] = useSearchParams();

  const { register, handleSubmit , formState: { errors }} = useForm<signInType>({
    mode:"onBlur",//to  realtime validate
    resolver: zodResolver(signInSchema), // Apply the zodResolver
  });
  const submitForm: SubmitHandler<signInType> = async(data) => {
    if(searchParams.get('message')){
      setSearchParams('');
    }
    dispatch(actAuthLogin(data))
    .unwrap()
    .then(()=>{
      navigate("/")
    });
  }
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

            <Input label="Email address" name="email" register={register} error={errors.email?.message}/>
            <Input label="Password" type="password" name="password" register={register} error={errors.password?.message}/>

            
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
