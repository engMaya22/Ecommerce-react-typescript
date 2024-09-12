import { configureStore } from "@reduxjs/toolkit";
import categories from "./categories/categoriesSlice";
import products from "./products/productsSlice";

export const store = configureStore({
    reducer:{
        categories ,
        products
    }

})
export type RootState = ReturnType<typeof store.getState>//ensure state is exsist where it gets all types
export type AppDispatch = typeof store.dispatch //ensure action is exsist