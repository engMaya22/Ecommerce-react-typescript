import { Tproduct } from "@types";
import { RootState } from "@store/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosErrorHandler from "@utils/AxiosErrorHandler";
import axios from "axios";


type TDataType = "productsFullInfo" | "productIds";
type TRresponse = Tproduct[];

const actGetWishlist = createAsyncThunk('/wishlist/actGetWishlist',async(dataType:TDataType, thunkAPI)=>{
 //this action return ether items of id of object items based on passed data type
    const {  rejectWithValue , signal ,getState} = thunkAPI;

    const { auth} = getState() as RootState;
    try{
        const userWishlist =  await axios.get<{productId:number}[]>(`/wishlist?${auth.user?.id}`,{
            signal
        });//get products of user id
        if(!userWishlist.data.length)//he hasnot any item in wishlist then no need to call API
            return {data:[] , dataType:"empty"};


        if(dataType === "productIds"){
            //in header I want just item ids for count in header fire this part
            const concatnectedItemsId = userWishlist.data.map((el)=> el.productId);
            return {data:concatnectedItemsId , dataType:"productsIds"};

        }else  if(dataType === "productsFullInfo"){
            //when access to wishlist page get items object
            const concatnectedItemsId = userWishlist.data.map((el)=> `id=${el.productId}`).join('&');
            const response = await axios.get<TRresponse>(`/products?${concatnectedItemsId}`)
            return {data:response.data , dataType:"productsFullInfo"};
        }

    }catch(error){
        const result = AxiosErrorHandler(error);
        return rejectWithValue(result);

    }
}
)




export default  actGetWishlist;