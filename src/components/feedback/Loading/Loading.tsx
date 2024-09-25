
import { TLoading } from "@types";
import CategorySkeleton from "../skeletons/CategorySkeleton/CategorySkeleton";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";

const skeletonTypes = {
    cart:CartSkeleton,
    category:CategorySkeleton,
    product:ProductSkeleton
}
interface LoadingProps {
    status : TLoading,
    error:string | null,
    children:React.ReactNode,
    type?:'product'|'category'|'cart'//to add skelton dynamicaly basd on type
}
export default function Loading
     ({status , error ,children , type ='category'}:LoadingProps){//default is category
        const Component = skeletonTypes[type];
    if(status === 'pending'){
            return <Component />
    }
    if(status === 'failed'){
        return <p>{error}</p>
    }
    return  <>
             {children}
            </>
}

