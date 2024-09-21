import { Tproduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosErrorHandler from "@util/AxiosErrorHandler";
import axios from "axios";



const actGetWishlist = createAsyncThunk('/wishlist/actGetWishlist',async(_ , thunkAPI)=>{
 
    const { fulfillWithValue , rejectWithValue} = thunkAPI;
    type TRresponse = Tproduct[];

    try{
        const userWishlist =  await axios.get<{productId:number}[]>('/wishlist?userId=1');//get products of user id
        if(!userWishlist.data.length)//he hasnot any item in wishlist then no need to call API
             return fulfillWithValue([]);

        const concatnectedItemsId = userWishlist.data.map((el)=> `id=${el.productId}`).join('&');
        const response = await axios.get<TRresponse>(`/products?${concatnectedItemsId}`)
        return response.data;

    }catch(error){
        const result = AxiosErrorHandler(error);
        return rejectWithValue(result);

    }
}
)




export default  actGetWishlist;