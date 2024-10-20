import { useAppDispatch ,useAppSelector} from "@store/hook";
import {useEffect , useState} from "react"
import {Tproduct} from "@types"
import {resetOrderStatus} from "@store/orders/ordersSlice";
import {actGetOrders} from "@store/orders/ordersSlice"

const useOrders =()=>{
    const dispatch = useAppDispatch();
    const {loading , error , orderList } = useAppSelector(state => state.orders)

    const [showModal , setShowModal] = useState(false);
    const [selectedProduct , setSelectedProduct] = useState<Tproduct[]>([]);
    useEffect (()=>{
        const promise = dispatch(actGetOrders())

        return ()=>{
            promise.abort();
            dispatch(resetOrderStatus())//as we go to orders page the loading will be sucess ! then cart will show 
            //success icon!

        } 
    },[dispatch])

    const viewDetailsHandler =(id:number)=>{
        const productDetails =  orderList.find(order => order.id == id);
        const newItems = productDetails?.items ?? [];//we added it if there no data dont get undefined
    //    console.log(productDetails);
         setShowModal(true)
         setSelectedProduct(prev => [...prev , ...newItems]);
    }
    const closeModalHandler =()=>{
        setShowModal(false);
        setSelectedProduct([]);
    }
    return {
        loading ,
        error ,
        orderList ,
        showModal,
        selectedProduct,
        viewDetailsHandler,
        closeModalHandler

    }

}
export  default useOrders;