import { Form } from "react-bootstrap";
import {FieldValues, Path, UseFormRegister} from "react-hook-form";
type InputProps<TFieldValue extends FieldValues> = {
    name : Path<TFieldValue> ;//generic type cause input might be name or password or ...
    label:string ;
    type?:string;
    register : UseFormRegister<TFieldValue>;
    error?:string

}

const Input =<TFieldValue extends FieldValues>({
    label ,
    type = 'text' ,
    register , 
    name , 
    error
  }:InputProps<TFieldValue>)=> {
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{label} </Form.Label>
        <Form.Control type={type} {...register(name)} isInvalid={error ? true : false} />
        <Form.Control.Feedback type="invalid">
        {error }
        </Form.Control.Feedback>
    </Form.Group>
  )
}

export default Input;
