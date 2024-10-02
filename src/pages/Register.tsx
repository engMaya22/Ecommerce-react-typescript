import { Heading } from "@components/common";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema ,signUpType } from "@validations/signUpSchema";
import { Input } from "@components/Form/Index";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { actAuthRegister } from "@store/auth/authSlice";


export default function Registeration() {
  const dispatch = useAppDispatch();
  const {loading , error} = useAppSelector((state) => state.auth);
  const  {checkEmailAvailability , emailAvailabilityStatus , enteredEmail , resetcheckEmailAvailability}  = useCheckEmailAvailability();

  const { register, handleSubmit , formState: { errors } , getFieldState ,trigger} = useForm<signUpType>({
    mode:"onBlur",//to  realtime validate
    resolver: zodResolver(signUpSchema), // Apply the zodResolver to link useForm with submitForm
  });
  const submitForm: SubmitHandler<signUpType> = (data) => {
    const {firstName , lastName , email , password } = data;
    dispatch (actAuthRegister( {firstName , lastName , email , password }))
    // console.log(data)
  } 
  const onBlurHandler = async(e:React.FocusEvent<HTMLInputElement>)=>{
    await trigger('email');//need it to have correct invalid value from the first time
    const value = e.target.value;
    const { isDirty , invalid} = getFieldState("email")//we are listening to email
    if(isDirty && !invalid &&
       value !== enteredEmail){// if inter same old value direct again  then no need to check 
      checkEmailAvailability(value);
      
    }
    //enteredEmail is a previous email state
    if(isDirty && invalid && enteredEmail ){//needed when add valid email then 123 then same valid email
      resetcheckEmailAvailability();
    }

  }
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
                <Input label="Email address" 
                       name="email" 
                       register={register}
                       error={errors.email?.message ? errors.email?.message //validation
                                                    : emailAvailabilityStatus == "notAvailable" 
                                                    ? "The email in use" 
                                                    : emailAvailabilityStatus == "failed" 
                                                    ?  "Error from the server"
                                                    :   ""
                                  }
                       onBlur={onBlurHandler} 
                       formText ={emailAvailabilityStatus == "checking" ? 
                                                                         "We're currently checking the availability of this email address. Please wait a moment."
                                                                        : "" }
                        success = {emailAvailabilityStatus == "available" ? "The email is avaiable to use" : ""}
                        disabled = {emailAvailabilityStatus === "checking"}
                         
                         />

                <Input label="Password" type="password" name="password" register={register} error={errors.password?.message}/>
                <Input label="Confirm password" type="password" name="confirmPassword" register={register} error={errors.confirmPassword?.message}/>

              
        
                <Button variant="info" type="submit" style={{color:"white"}} disabled = {emailAvailabilityStatus === "checking" ||
                   loading ==="pending"
                }>
                  {loading == "pending" ? <><Spinner animation="border" size="sm"></Spinner>Loading ..</> : 'Submit'}
                </Button>
                {error &&  <p style={{color:"#DC3545",marginTop:"10px"}}>{error}</p>}
                </Form>
              </Col>
            </Row>
          </>
  )
}
