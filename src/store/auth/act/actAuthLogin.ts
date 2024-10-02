import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosErrorHandler from "@utils/AxiosErrorHandler";
import axios from "axios";


type TFormData = {
    email : string,
    password : string
}
type TResponse ={
    accessToken:string,
    user:{
        id:number,
        firstName:string,
        lastName:string,
        email:string

    }
}

const actAuthLogin = createAsyncThunk("auth/actAuthLogin" , async(formData:TFormData , thunkApi)=>{
 const {rejectWithValue} = thunkApi;

 try{
    const res = await axios.post<TResponse>("/login" , formData)
    return res.data;

 }catch(error){
    const result = AxiosErrorHandler(error);
    return rejectWithValue(result);

 }

})
export default actAuthLogin;