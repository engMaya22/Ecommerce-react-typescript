import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categories from "./categories/categoriesSlice";
import products from "./products/productsSlice";
import cart from "./cart/cartSlice";
import wishlist from "./wishlist/wishlistSlice";
import auth from "./auth/authSlice";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";

const rootPersistConfig = {
  key:'root',
  storage,
  whitelist:['cart','auth'],
}
const cartPersistConfig = {
    key:'cart',
    storage,//local storage for web
    whitelist:['items'],//cash just items in cart
  }
  
// const wishlistPersistConfig = {
//   key:'wishlist',
//   storage,
//   whitelist:['itemsId'],
// }
const authPersistConfig = {
  key:'auth',
  storage,
  whitelist:['user' , 'accessToken'],
}
const rootReducer = combineReducers({
    auth :persistReducer(authPersistConfig , auth),
    categories ,
    products,
    cart:persistReducer(cartPersistConfig, cart),//just save items from cart state
    wishlist,
   
    
});
const persistedReducer = persistReducer(rootPersistConfig  , rootReducer);

 const store = configureStore({
    reducer:persistedReducer,
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