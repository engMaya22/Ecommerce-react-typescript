import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";
import AxiosErrorHandler from "@utils/AxiosErrorHandler";

const actPlaceOrder = createAsyncThunk("orders/actPlaceOrder" , async (subtotal:number , thunkAPI )=>{

    const {rejectWithValue , getState} = thunkAPI;
    const {cart , auth} = getState() as RootState;

    const orderItems  = cart.productsFullInfo.map(el =>({
        id : el.id ,
        title : el.title ,
        price : el.price ,
        img : el.img,
        quantity : cart.items[el.id]
        //this way I select only needed data from this cart , if I want to take all cols I will use spread o
       //operator likr ...el 
    }));

    try {
        const res = await axios.post("/orders" ,{
            userId : auth.user?.id,
            items : orderItems,
            subtotal ,

        })
        return res.data;

    }catch(error){
        return rejectWithValue(AxiosErrorHandler(error))
    }
});
export default actPlaceOrder;