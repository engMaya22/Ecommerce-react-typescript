import {actGetOrders} from "@store/orders/ordersSlice"
import { Loading } from "@components/feedback";
import { Heading } from "@components/common";
import { ProductInfo } from "@components/eCommerce";
import { Table, Modal } from "react-bootstrap";
import { useAppDispatch ,useAppSelector} from "@store/hook";
import {useEffect , useState} from "react"
import {Tproduct} from "@types"

const Orders = () =>{
    const dispatch = useAppDispatch();
    const {loading , error , orderList } = useAppSelector(state => state.orders)

    const [showModal , setShowModal] = useState(false);
    const [selectedProduct , setSelectedProduct] = useState<Tproduct[]>([]);
    useEffect (()=>{
        const promise = dispatch(actGetOrders())
        return ()=>{
            promise.abort();
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

    return ( <>
               <Modal show={showModal} onHide={closeModalHandler}>
                    <Modal.Header closeButton>
                    <Modal.Title>Products Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {selectedProduct.map((el) => (
                        <ProductInfo
                        key={el.id}
                        title={el.title}
                        img={el.img}
                        price={el.price}
                        quantity={el.quantity}
                        direction="column"
                        style={{ marginBottom: "10px" }}
                        />
                    ))}
                    </Modal.Body>
                </Modal>
             <Heading title="My Orders" />
        //    <Loading error={error}  status={loading} type="category" />
            <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Order Number</th>
                        <th>Items</th>
                        <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList.map((el) => (
                        <tr key={el.id}>
                            <td>#{el.id}</td>
                            <td>
                            {el.items.length} item(s)
                            {" / "}
                            <span
                                onClick = {()=>viewDetailsHandler(el.id)}
                                style={{ textDecoration: "underline", cursor: "pointer" }}
                            >
                                Product Details
                            </span>
                            </td>
                            <td>{el.subtotal.toFixed(2)}</td>
                        </tr>
                        ))}
                    </tbody>
            </Table>
        
    </>
    );
};
export default Orders;