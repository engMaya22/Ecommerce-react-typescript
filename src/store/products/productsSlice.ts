import {  createSlice } from "@reduxjs/toolkit";
import actGetProductsByCat from "./act/actGetProductsByCat";
import { Tproduct ,TLoading } from "@types";

interface ICategoriesState {
    records: Tproduct[],//array or objects
    loading: TLoading,
    error : string|null
}
const initialState:ICategoriesState = {
    records : [] ,
    loading:"idle", 
    error:null
}


  
 const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        productsRecordCleanUp:(state)=>{
          state.records = [];
        }
    },
    extraReducers:(builder) =>{

        //get categories
        builder.addCase(actGetProductsByCat.pending, (state) => {
            state.loading = 'pending';
            state.error = null;//reset when retry after failed
          })

        builder.addCase(actGetProductsByCat.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.records = action.payload;

          })
        builder.addCase(actGetProductsByCat.rejected, (state, action) => {
            state.loading = 'failed';
            // 
            if (
                // this guard by type to insure the define and string type
                action.payload &&
                typeof action.payload === "string" )
             {
                state.error =  action.payload;

             }
        })
    

        }
})
export const {productsRecordCleanUp} = productsSlice.actions;
export {actGetProductsByCat};// to use it easier from this path
export default productsSlice.reducer

