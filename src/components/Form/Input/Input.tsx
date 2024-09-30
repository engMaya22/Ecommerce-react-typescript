import { register } from "module";
import React from "react";
import { Form } from "react-bootstrap";
import {FieldValues, Path, UseFormRegister} from "react-hook-form";
type InputProps<TFieldValue extends FieldValues> = {
    name : Path<TFieldValue> ;//generic type cause input might be name or password or ...
    label:string ;
    type?:string;
    register : UseFormRegister<TFieldValue>;
    error?:string;
    onBlur? :(e:React.FocusEvent<HTMLInputElement>)=>void;
    formText?:string,
    success?:string,
    disabled?:boolean

}


const Input =<TFieldValue extends FieldValues>({
    label ,
    type = 'text' ,
    register , 
    name , 
    error,
    onBlur,
    formText,
    success,
    disabled
  }:InputProps<TFieldValue>)=> {

    const onblurHandler = (e:React.FocusEvent<HTMLInputElement>) => {
      if(onBlur){
        onBlur(e)
        register(name).onBlur(e)

      }else{
        register(name).onBlur(e)
      }
  
    }
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{label} </Form.Label>
        <Form.Control type={type} 
                      {...register(name)} 
                      isInvalid={error ? true : false}
                      isValid={success ? true : false}
                      onBlur ={onblurHandler}
                      disabled={disabled}
                      // onBlur = {onBlur} it is true but it will overwride -> register(name).onBlur
                      
                      />
        <Form.Control.Feedback type="invalid">{error }</Form.Control.Feedback>
        <Form.Control.Feedback type="valid">{success }</Form.Control.Feedback>

        {formText && <Form.Text muted>{formText}</Form.Text>}
    </Form.Group>
  )
}

export default Input;
