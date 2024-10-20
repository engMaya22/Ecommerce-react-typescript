import { Tproduct } from "./product.types"

export type TOrderItem= {
   id:number ,
   userId : number ,
   items : Tproduct[],
   subtotal : number
}

