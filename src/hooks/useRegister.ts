import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { actAuthRegister, resetUI } from "@store/auth/authSlice";
import { useNavigate  } from "react-router-dom";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema ,signUpType } from "@validations/signUpSchema";

const useRegister = ()=>{
    
  const {accessToken} = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(()=>{
    return ()=>{
      dispatch(resetUI())
    }
  } , [dispatch])
  const {loading , error} = useAppSelector((state) => state.auth);
  const  {checkEmailAvailability , emailAvailabilityStatus , enteredEmail , resetcheckEmailAvailability}  = useCheckEmailAvailability();

  const { register, handleSubmit , formState: { errors :formErrors} , getFieldState ,trigger} = useForm<signUpType>({
    mode:"onBlur",//to  realtime validate
    resolver: zodResolver(signUpSchema), // Apply the zodResolver to link useForm with submitForm
  });
  const submitForm: SubmitHandler<signUpType> = async(data) => {//async to ensure that navigate when finish register
    const {firstName , lastName , email , password } = data;
    dispatch (actAuthRegister( {firstName , lastName , email , password }))//we need to save just this  data
    .unwrap()
    .then(()=>{
      navigate("/login?message=account_created")
    })
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
  return { accessToken ,loading , error  ,
     emailAvailabilityStatus ,  register, handleSubmit  ,
      formErrors ,onBlurHandler ,submitForm
    }
}

export default useRegister;