import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle"

interface IWishlistState {
    itemsId: number[], 
    error:string|null
}
const initialState:IWishlistState ={
    itemsId:[],
    error:null,
};
const wishlisSlice = createSlice({
    name:'wishlist',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
      
      builder.addCase(actLikeToggle.pending , (state=>{
        state.error = null;
      }));
      builder.addCase(actLikeToggle.fulfilled , (state , action)=>{
        if (action.payload.type =='add') state.itemsId.push(action.payload.id);
        else state.itemsId = state.itemsId.filter((id)=> id !== action.payload.id);
      });
      builder.addCase(actLikeToggle.rejected,(state ,action)=>{
        if (
            // this guard by type to insure the define and string type
            action.payload &&
            typeof action.payload === "string" )
         {
            state.error =  action.payload;

         }

      })
    }



});
export {actLikeToggle} ;

export default wishlisSlice.reducer;


