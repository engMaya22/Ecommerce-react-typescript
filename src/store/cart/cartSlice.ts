import {  createSlice } from "@reduxjs/toolkit";
import { Tproduct ,TLoading, isString } from "@types";
import actGetProductsByItems from "./act/actGetProductsByItems";

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
        },
        cartChangeQuantity:(state,action)=>{
         state.items[action.payload.id] = action.payload.quantity;
        },
        removeCartItem:(state,action)=>{
            //we need to delete from two places
            delete state.items[action.payload]
            state.productsFullInfo = state.productsFullInfo.filter((el)=>el.id !== action.payload )
        },
        cartProductInfoCleanUp:(state)=>{
            state.productsFullInfo = [];
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
           // if 
            //(
                // this guard by type to insure the define and string type
                // action.payload &&
                // typeof action.payload === "string" )
             if(isString(action.payload))
             {
                state.error =  action.payload;

             }
        })
    

        }


});



export {actGetProductsByItems };
export const {addToCart , cartChangeQuantity ,removeCartItem ,cartProductInfoCleanUp} = cartSlice.actions;
export default cartSlice.reducer