import { Tproduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TCresponse = Tproduct[];//we define the api data returned for type script
//where we can use interface like category slice or type
// actions: 
 const actGetProductsByCat = createAsyncThunk(
    'products/actGetProductsByCat',
    async (prefix:string, thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
      try {
        const response = await axios.get<TCresponse>(`/products?cat_prefix=${prefix}`);
        // const data =  response.data.map(el=> el.i)
        return response.data;
      }catch(error){
         if(axios.isAxiosError(error))// for typescript if the axios understand and handle this error
          {
            return rejectWithValue(error.response?.data.message || error.message)
          }   
          return rejectWithValue('An unexpected error')
   }
    },
  )
  export default actGetProductsByCat;