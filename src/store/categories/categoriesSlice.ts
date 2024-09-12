import {  createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";

interface ICategoriesState {
    records: {id:number, title:string,prefix:string ,img:string}[],//array or objects
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    error : string|null
}
const initialState:ICategoriesState = {
    records : [] ,
    loading:"idle", 
    error:null
}


  
 const categoriesSlice = createSlice({
    name:'categories',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{

        //get categories
        builder.addCase(actGetCategories.pending, (state) => {
            state.loading = 'pending';
            state.error = null;//reset when retry after failed
          })

        builder.addCase(actGetCategories.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.records = action.payload;

          })
        builder.addCase(actGetCategories.rejected, (state, action) => {
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
export {actGetCategories};// to use it easier from this path
export default categoriesSlice.reducer

