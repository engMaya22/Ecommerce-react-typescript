import { zodResolver } from "@hookform/resolvers/zod";
import { actAuthLogin, resetUI } from "@store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { signInSchema, signInType } from "@validations/signInSchema ";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams  } from "react-router-dom";


const  useLogin = () => {
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
  
    const { register, handleSubmit , formState: { errors :formErrors }} = useForm<signInType>({
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
  return{accessToken ,searchParams ,handleSubmit ,submitForm , register , error ,formErrors , loading}
}
export default useLogin;