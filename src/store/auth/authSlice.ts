import {  createSlice } from "@reduxjs/toolkit";
import { isString, TLoading } from "@types";
import actAuthRegister from "./act/actAuthRegister"
import actAuthLogin from "./act/actAuthLogin";
interface IAuthState {
    loading:TLoading , 
    error : string | null,
    accessToken : string | null,
    user:{
        id:number,
        firstName:string,
        lastName:string,
        email:string

    }|null
}
const initialState :IAuthState= {
    loading : 'idle',
    error : null,
    accessToken : null,
    user:null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers :{
        resetUI : (state)=>{
            state.error = null;
            state.loading = 'idle';
        }
    },
    extraReducers :(builder)=>{
        //register
        builder.addCase(actAuthRegister.pending , (state)=>{
            state.loading = "pending";
            state.error = null

        })
        builder.addCase(actAuthRegister.fulfilled , (state)=> {
         state.loading = 'succeeded';

        })
        builder.addCase(actAuthRegister.rejected , (state , action)=>{
         state.loading = 'failed';
         if(isString(action.payload)){
            state.error = action.payload
         }
        
        })

         //login
        builder.addCase(actAuthLogin.pending , (state)=>{
            state.loading = "pending";
            state.error = null

        })
        builder.addCase(actAuthLogin.fulfilled , (state , action)=> {
         state.loading = 'succeeded';
         state.accessToken = action.payload.accessToken;
         state.user = action.payload.user

        })
        builder.addCase(actAuthLogin.rejected , (state , action)=>{
         state.loading = 'failed';
         if(isString(action.payload)){
            state.error = action.payload
         }

        })

    }


});

export {actAuthRegister , actAuthLogin }//extra reducer
export const {resetUI} = authSlice.actions;//reducer
export default authSlice.reducer;
