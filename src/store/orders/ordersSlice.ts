import { createSlice } from "@reduxjs/toolkit";
import { TOrderItem ,TLoading , isString } from "@types";
import actPlaceOrder from "./act/actPlaceOrder";
import actGetOrders from "./act/actGetOrders"



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
        resetOrderStatus :(state)=>{
          state.loading = "idle";
        }
    },
    extraReducers : (builder)=>{
//place order
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
     //get order items
      builder.addCase(actGetOrders.pending, (state) => {
        state.loading = 'pending';
        state.error = null;//reset when retry after failed
      })

      builder.addCase(actGetOrders.fulfilled, (state, action) => {
          state.loading = 'succeeded';
          state.orderList = action.payload;

        })
      builder.addCase(actGetOrders.rejected, (state, action) => {
          state.loading = 'failed';
          // 
          if (isString(action.payload))
          {
              state.error =  action.payload;

          }
      })
 

    }
});
export {actPlaceOrder , actGetOrders};
export const  {resetOrderStatus}  =  ordersSlice.actions;
export default ordersSlice.reducer;