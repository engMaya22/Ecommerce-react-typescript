import { Tproduct } from "@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import {AxiosErrorHandler} from "@utils/index"
import axios from "axios";

type TRresponse = Tproduct[];

const actGetProductsByItems = createAsyncThunk("cart/actGetProductsByItems" , async (_, thunkAPI)=>{
    const {rejectWithValue , fulfillWithValue , getState , signal} = thunkAPI;

       const {cart} = getState() as RootState;//now I got items cart state from thunkApi without need to pass it 
        //when dispatch and save render whenver change quantity -> items by useEffect
       const itemsId = Object.keys(cart.items);//get keys as array
      // console.log(itemsId);//['1', '2', '3']
      if(!itemsId.length){// if no data in cart not doing any api call
        return fulfillWithValue([]);//else it will get all products ! 
      }

    try{
        const concatnectedItemsId  = itemsId.map((el)=>`id=${el}`).join("&");
        // console.log(concatnectedItemsId);//id=1&id=2&id=3
        const response = await axios.get<TRresponse>(`/products?${concatnectedItemsId}`,{
          signal
        });
        return response.data;

    }catch(error ){
      const result = AxiosErrorHandler(error);
      return rejectWithValue(result);
    }


})
export default actGetProductsByItems