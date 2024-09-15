import {  createSlice } from "@reduxjs/toolkit";
import { Tproduct } from "@customTypes/product";

interface IcartInterface {
    items:{[key:number]:number};//key is id elmenet with number of items -- index signature
    productFullInfo:Tproduct[]//products info

}
const initialState :IcartInterface = {
    items:{},
    productFullInfo:[],

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
     }


});




export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer