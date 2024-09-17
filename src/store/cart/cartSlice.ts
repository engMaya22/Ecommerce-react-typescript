import {  createSlice } from "@reduxjs/toolkit";
import { Tproduct } from "@customTypes/product";
import actGetProductsByItems from "./act/actGetProductsByItems";
import { TLoading } from "@customTypes/shared";

interface IcartInterface {
    items:{[key:string]:number};//key is id elmenet with number of items -- index signature
    productsFullInfo:Tproduct[]//products info,
    loading: TLoading,
    error:string|null,

}
const initialState :IcartInterface = {
    items:{},
    productsFullInfo:[],
    loading : 'idle',
    error : null,

}
const cartSlice = createSlice({
     name:'cart',
     initialState,
     reducers:{
        addToCart :(state, action)=>{
            const id = action.payload;//I pass id of product
            if(state.items[id]){
                state.items[id]++;//if id exsists increase quantity
            }else{
                state.items[id] = 1
            }
        }
        
     },
     extraReducers:(builder) =>{

        //get items
        builder.addCase(actGetProductsByItems.pending, (state) => {
            state.loading = 'pending';
            state.error = null;//reset when retry after failed
          })

        builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.productsFullInfo = action.payload ;//full this data by response

          })
        builder.addCase(actGetProductsByItems.rejected, (state, action) => {
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


});



export {actGetProductsByItems};
export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer