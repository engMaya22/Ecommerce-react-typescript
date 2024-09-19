import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const actLikeToggle = createAsyncThunk ('wishlist/actLikeToggle',
     async(id :number, thunkAPI)=>{
        const {rejectWithValue} = thunkAPI;

        try{
            const isRecordExist = await axios.get(`/wishlist?userId=1&productId=${id}`);
       
            if(isRecordExist.data.length){
                await axios.delete(`/wishlist/${isRecordExist.data[0].id}`);
                return {type:'remove',id}
            }else {
                await axios.post('/wishlist',{userId:'1',productId:id})
                return {type:'add' ,id}
        
            }


        }catch(error){
            if(axios.isAxiosError(error))// for typescript if the axios understand and handle this error
            {
              return rejectWithValue(error.response?.data.message || error.message)
            }   
            return rejectWithValue('An unexpected error')

        }

})

export default actLikeToggle;

