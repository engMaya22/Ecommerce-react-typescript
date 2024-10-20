import { createSlice } from "@reduxjs/toolkit";
import { TOrderItem ,TLoading , isString } from "@types";
import actPlaceOrder from "./act/actPlaceOrder"


  interface IOrders {
    orderList : TOrderItem[], 
    loading : TLoading,
    error : string | null

  }
 const initialState:IOrders ={
    orderList :[],
    loading : "idle",
    error: null
 }


const ordersSlice = createSlice ({
    name:'orders',
    initialState,
    reducers : {

    },
    extraReducers : (builder)=>{

      builder.addCase(actPlaceOrder.pending, (state) => {
         state.loading = 'pending';
         state.error = null;//reset when retry after failed
       })

     builder.addCase(actPlaceOrder.fulfilled, (state, action) => {
         state.loading = 'succeeded';

       })
     builder.addCase(actPlaceOrder.rejected, (state, action) => {
         state.loading = 'failed';
         // 
         if (isString(action.payload))
          {
             state.error =  action.payload;

          }
     })
 

    }
});
export {actPlaceOrder};
export default ordersSlice.reducer;