import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

const getCartTotalQuantity = createSelector(
    (state:RootState
    )=>state.cart.items ,//return items state which will pass to callback
    (items)=>{//if any change on items which pass in first paramter will invoke this code 
        const totalQuantity = Object.values(items).reduce(
            (accumulator,current)=>{
              return accumulator + current;
      
            },0//zero is initial value
          )
          
      return totalQuantity;
          
    }
)

export {getCartTotalQuantity}