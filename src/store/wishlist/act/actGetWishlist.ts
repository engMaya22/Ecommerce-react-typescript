import { Tproduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";



const actGetWishlist = createAsyncThunk('/wishlist/actGetWishlist',async(_ , thunkAPI)=>{
 
    const { fulfillWithValue , rejectWithValue} = thunkAPI;
    type TRresponse = Tproduct[];

    try{
        //   const concatenatedItemsId = userWishlist.data
        //     .map((el) => `id=${el.productId}`)
        //     .join("&");



        
        const userWishlist =  await axios.get<{productId:number}[]>('/wishlist?userId=1');//get products of user id
        if(!userWishlist.data.length)//he hasnot any item in wishlist then no need to call API
             return fulfillWithValue([]);

        const concatnectedItemsId = userWishlist.data.map((el)=> `id=${el.productId}`).join('&');
        const response = await axios.get<TRresponse>(`/products?${concatnectedItemsId}`)
        return response.data;

    }catch(error){
        if(axios.isAxiosError(error))// for typescript if the axios understand and handle this error
        {
          return rejectWithValue(error.response?.data.message || error.message)
        }   
        return rejectWithValue('An unexpected error')

    }
}
)




export default  actGetWishlist;