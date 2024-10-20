import { Loading } from "@components/feedback";
import { Heading } from "@components/common";
import { ProductInfo } from "@components/eCommerce";
import { Table, Modal } from "react-bootstrap";
import useOrders from "@hooks/useOrders"
const Orders = () =>{
    const {
        loading ,
        error ,
        orderList ,
        showModal,
        selectedProduct,
        viewDetailsHandler,
        closeModalHandler
    } = useOrders();

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
            <Loading error={error}  status={loading} type="category" />
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