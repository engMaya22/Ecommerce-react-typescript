import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle"
import actGetWishlist from "./act/actGetWishlist"
import { Tproduct ,TLoading, isString } from "@types";
 interface IWishlistState {
    itemsId: number[], 
    productsFullInfo :Tproduct[],
    error:string|null,
    loading : TLoading
}
const initialState:IWishlistState ={
    itemsId:[],
    productsFullInfo : [],
    error:null,
    loading:'idle'
};
const wishlisSlice = createSlice({
    name:'wishlist',
    initialState,
    reducers:{
      productsFullInfoCleanUp : (state)=>{
         state.productsFullInfo = [];

      }
    },
    extraReducers:(builder)=>{
      //toggle like
      builder.addCase(actLikeToggle.pending , (state=>{
        state.error = null;
      }));
      builder.addCase(actLikeToggle.fulfilled , (state , action)=>{
        if (action.payload.type =='add') state.itemsId.push(action.payload.id);
        else{
          state.itemsId = state.itemsId.filter((id)=> id !== action.payload.id);
          state.productsFullInfo = state.productsFullInfo.filter((el)=> el.id !== action.payload.id);

        }
      });
      builder.addCase(actLikeToggle.rejected,(state ,action)=>{
        if (isString(action.payload))
         {
            state.error =  action.payload;

         }

      })

      //get wishlist 
      builder.addCase(actGetWishlist.pending, (state)=>{
        state.loading = 'idle';
        state.error = null;
      })
      builder.addCase(actGetWishlist.fulfilled, (state, action)=>{
       state.productsFullInfo = action.payload;
       state.loading = 'succeeded'
      

      })
      builder.addCase(actGetWishlist.rejected, (state ,action)=>{
        state.loading = 'failed';
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
export {actLikeToggle ,actGetWishlist } ;
export const {productsFullInfoCleanUp} = wishlisSlice.actions;
export default wishlisSlice.reducer;


