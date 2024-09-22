import {  createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import { isString, Tcategory ,TLoading } from "@types";

interface ICategoriesState {
    records: Tcategory[],//array or objects
    loading: TLoading,
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
    reducers:{
        categoriesRecordsCleanUp:(state)=>{
            state.records =[ ];

        }
    },
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
            if (isString(action.payload))
             {
                state.error =  action.payload;

             }
        })
    

        }
})
export {actGetCategories};// to use it easier from this path
export const {categoriesRecordsCleanUp} = categoriesSlice.actions;
export default categoriesSlice.reducer

