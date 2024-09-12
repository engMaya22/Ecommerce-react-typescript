import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TCresponse = {id:number, title:string,prefix:string ,img:string}[];//we define the api data returned for type script
//where we can use interface like category slice or type
// actions: 
 const actGetCategories = createAsyncThunk(
    'categories/actGetCategories',
    async (_, thunkAPI) => {
      const {rejectWithValue} = thunkAPI;
      try {
        const response = await axios.get<TCresponse>("http://localhost:5000/categories");
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
  export default actGetCategories;