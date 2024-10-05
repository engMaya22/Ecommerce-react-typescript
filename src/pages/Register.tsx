import { Heading } from "@components/common";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Input } from "@components/Form/Index";
import { Navigate } from "react-router-dom";
import useRegister from "@hooks/useRegister";


export default function Registeration() {

  const { accessToken ,loading , error  ,
            emailAvailabilityStatus ,
            register, handleSubmit  , formErrors ,onBlurHandler ,submitForm} = useRegister();

  if(accessToken){
    return <Navigate to="/" />
    // This way it redirect to home page if I try to add register route from browser 
  }
  return (
          <>
            <Heading title="User Register"/>
            <Row>
              <Col md={{span:6 , offset:3}}>
                <Form onSubmit={handleSubmit(submitForm)}>
                 <Input label="First name" name="firstName" register={register} error={formErrors.firstName?.message}/>
                  {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>First name </Form.Label>
                      <Form.Control type="text" {...register("firstName")} isInvalid={errors.firstName?.message ? true : false} />
                      <Form.Control.Feedback type="invalid">
                         {errors.firstName?.message }
                      </Form.Control.Feedback>
                  </Form.Group> */}
                <Input label="Last name" name="lastName" register={register} error={formErrors.lastName?.message}/>
                <Input label="Email address" 
                       name="email" 
                       register={register}
                       error={formErrors.email?.message ? formErrors.email?.message //validation
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

                <Input label="Password" type="password" name="password" register={register} error={formErrors.password?.message}/>
                <Input label="Confirm password" type="password" name="confirmPassword" register={register} error={formErrors.confirmPassword?.message}/>

              
        
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
