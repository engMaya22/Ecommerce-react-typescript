import { isAxiosError } from "axios";

const  AxiosErrorHandler = (error : unknown) =>{
    //unknown best than any to acess functions of error
    if(isAxiosError(error))// for typescript if the axios understand and handle this error
    {
      return error.response?.data.message || error.message
    }   
    return ('An unexpected error')

}

export default AxiosErrorHandler;
