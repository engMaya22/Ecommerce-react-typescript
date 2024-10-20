import { Tproduct } from "./product.types"

export type TOrderItem= {
   id:number ,
  // userId : number , i dont need it as i can get it from login user
   items : Tproduct[],
   subtotal : number,

}

