
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {AxiosErrorHandler} from "@utils/index"


type TFormData ={
    firstName:string,
    lastName:string,
    email:string,
    password:string
}
const actAuthRegister = createAsyncThunk ( "auth/actAuthRegister" ,
    async(formData : TFormData, thunkAPI)=>{
        const {rejectWithValue} = thunkAPI
        try{
            const res = await axios.post('/register', formData);
            return res.data
        }catch(error){
            const result = AxiosErrorHandler(error);
            return rejectWithValue(result);
        }


    }

);
export default actAuthRegister;