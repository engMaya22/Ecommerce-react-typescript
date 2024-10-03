import { isAxiosError } from "axios";

const  AxiosErrorHandler = (error : unknown) =>{
    //unknown best than any to acess functions of error
    if(isAxiosError(error))// for typescript if the axios understand and handle this error
    {
      return error.response?.data || error.response?.data.message || error.message
      // its by order if error.response?.data not exsist ? try to find error.response?.data.message..
    }   
    return ('An unexpected error')

}

export default AxiosErrorHandler;
