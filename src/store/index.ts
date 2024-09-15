import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categories from "./categories/categoriesSlice";
import products from "./products/productsSlice";
import cart from "./cart/cartSlice"
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";


const cartPersistConfig = {
    key:'cart',
    storage,//local storage for web
    whitelist:['items'],//cash just items in cart
  }
const rootReducer = combineReducers({
    categories ,
    products,
    cart:persistReducer(cartPersistConfig, cart)//just save items from cart state
});
 const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),

})
export type RootState = ReturnType<typeof store.getState>//ensure state is exsist where it gets all types
export type AppDispatch = typeof store.dispatch //ensure action is exsist


const persistor = persistStore(store);//to see the app this presisit
export {store,persistor}