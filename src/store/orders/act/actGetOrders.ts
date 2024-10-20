
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { TOrderItem ,TLoading , isString } from "@types";
import axios from "axios";
import AxiosErrorHandler from "@utils/AxiosErrorHandler";

type TResponse = TOrderItem[];//i need to define type for get as i need to display this data unless insert data
const actGetOrders = createAsyncThunk("/orders/actGetOrders" , 
     async(_ , thunkAPI)=>{
        const {rejectWithValue , getState , signal} = thunkAPI;
        const {auth} = getState() as RootState;
          
        try{
            const res = await axios.get<TResponse>(`/orders?userId=${auth.user?.id}`  , {signal})
            return res.data

        }catch(error){
            return rejectWithValue(AxiosErrorHandler(error))

        }

})
export default actGetOrders;