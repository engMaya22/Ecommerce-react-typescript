import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import useWishlist from "@hooks/useWishlist";

const WishList = ()=>{
  const {error , records , loading} = useWishlist();
    return <>
            <Heading title="Your Wishlist" />
            <Loading error={error}  status={loading} >
               <GridList records={records} 
                          renderItem={(record)=><Product {...record} />}
                />
                
           </Loading>
           </>

}
export default WishList;