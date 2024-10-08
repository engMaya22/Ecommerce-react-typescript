import { Tcategory } from "@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosErrorHandler from "@utils/AxiosErrorHandler";
import axios from "axios";

type TCresponse = Tcategory[];//we define the api data returned for type script
//where we can use interface like category slice or type
// actions: 
 const actGetCategories = createAsyncThunk(
    'categories/actGetCategories',
    async (_, thunkAPI) => {
      const {rejectWithValue , signal} = thunkAPI;
      try {
        const response = await axios.get<TCresponse>("/categories",{
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
  export default actGetCategories;