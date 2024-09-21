import { Tproduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosErrorHandler from "src/utils/AxiosErrorHandler";
import axios from "axios";

type TCresponse = Tproduct[];//we define the api data returned for type script
//where we can use interface like category slice or type
// actions: 
 const actGetProductsByCat = createAsyncThunk(
    'products/actGetProductsByCat',
    async (prefix:string, thunkAPI) => {
      const {rejectWithValue , signal} = thunkAPI;
      try {
        const response = await axios.get<TCresponse>(`/products?cat_prefix=${prefix}`,{
          signal
        });
        // const data =  response.data.map(el=> el.i)
        return response.data;
      }catch(error){
        const result = AxiosErrorHandler(error);
        return rejectWithValue(result);
   }
    },
  )
  export default actGetProductsByCat;