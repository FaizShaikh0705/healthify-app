import React, { useState, useEffect, useContext } from 'react';
import firebase from '../../config/Fire';
import { storage } from "../../config/Fire";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { AuthContext } from '../../context/Auth';
import Loader from "../../common/Loader/Loader";
import { userRequest, publicRequest } from "../../requestMethods"
import $ from 'jquery';

function Order(props) {

    const { currentUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [editDetails, setEditDetails] = useState(false);
    const [status, setStatus] = useState("pending");
    const [order, setOrder] = useState([]);
    const [selectedAction, setSelectedAction] = useState('');
    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [formComplete, setFormComplete] = useState(false);
    const [formIncompleteError, setFormIncompleteError] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await publicRequest.get(`/orders`);
                console.log(res.data)
                setOrder(res.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
                // Handle error as needed, e.g., set an error state
            }
        };

        getOrders();
    }, []);


    $(document).ready(function () {
        $("#search-input").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#enrollment-list-table tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });

    const onClickhandleEdit = (orderId) => {
        setSelectedOrderId(orderId);
        setEditDetails(true);
        setShowModal(true);
    }

    const onClickhandleDelete = async (orderId) => {
        console.log("orderId", orderId)
        if (window.confirm("Are you sure you want to delete the order?")) {
            axios.delete(`http://localhost:5002/api/orders/${orderId}`)
                .then((response) => {
                    alert("products deleted successfully");
                    window.location.reload();
                })
                .catch((error) => console.log("Error" + error));
        }
    };


    const modalCloseHandler = () => { setShowModal(false); setEditDetails(false); };

    const handleEdit = async () => {
        try {
            const updatedOrder = await publicRequest.put(`/orders/${selectedOrderId}`, {
                status: selectedAction,
            });
            console.log("updatedOrder", updatedOrder.data);
            setOrder((prevOrders) =>
                prevOrders.map((orderItem) =>
                    orderItem._id === selectedOrderId ? { ...orderItem, status: updatedOrder.data.status } : orderItem
                )
            );
            setStatus(updatedOrder.data.status);
            modalCloseHandler();
            window.location.reload();
        }
        catch (error) {
            console.error("Error updating order status:", error);
            // Handle error as needed
        }
    }

    const renderActionButtons = () => (
        <>
            <button
                type="button"
                className="btn btn-sm btn-primary py-2 mx-2"
                onClick={() => setSelectedAction('Order Accepted')}
            >
                Order Accepted
            </button>
            <button
                type="button"
                className="btn btn-sm btn-warning  py-2 mx-2"
                onClick={() => setSelectedAction('Order Shipped')}
            >
                Order Shipped
            </button>
            <button
                type="button"
                className="btn btn-sm btn-danger  py-2 mx-2"
                onClick={() => setSelectedAction('Order Declined')}
            >
                Order Declined
            </button>
            <button
                type="button"
                className="btn btn-sm btn-success  py-2 mx-2"
                onClick={() => setSelectedAction('Order Delivered')}
            >
                Order Delivered
            </button>
        </>
    );

    let modalContent = showModal ?

        (
            <>
                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{editDetails ? "Edit Product" : "Add Product"}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={modalCloseHandler}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {renderActionButtons()}
                            </div>
                            <div className="modal-footer">
                                <button type="button" disabled={formComplete} onClick={handleEdit} className="btn btn-sm btn-primary">Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
        : null;

    return (
        <>
            <Navbar />
            <div className="wrapper d-flex align-items-stretch">
                <Sidebar />

                <div className="container-fluid main bg-light py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-11">
                            <div className="add-teacher-profile pb-3">
                                <div className="title">
                                    <h2 id="teach_profile">Order Leads</h2>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-12">
                                    <label for="inputEmail4">Search based on Name</label>
                                    <input type="text" className="form-control" placeholder="search data" id="search-input" />
                                </div>
                            </div>

                            <div className="view-post">
                                {/* {loading ? (
                                    <Loader></Loader>
                                ) : ( */}
                                <>
                                    <table className="table table-striped table-bordered">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Order ID</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Customer</th>
                                                <th scope="col">Items</th>
                                                <th scope="col">Payment</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.map((orderItem) => (
                                                <tr key={orderItem._id}>
                                                    <td>{orderItem._id}</td>
                                                    <td>{new Date(orderItem.createdAt).toLocaleDateString()}</td>
                                                    <td>{orderItem.userId}</td>
                                                    <td className="px-4">
                                                        {orderItem.products.map((product) => (
                                                            <div key={product.productId} className="d-flex">
                                                                <img
                                                                    src={product.postImage.length > 0 ? product.postImage[3] : ""}
                                                                    alt={product.postTopicName}
                                                                    style={{ width: "50px", height: "50px", marginRight: "5px" }}
                                                                />
                                                                <p>{product.postTopicName} ({product.quantity})</p>
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td>COD</td>
                                                    <td>{orderItem.status}</td>
                                                    <td>₹{orderItem.amount}</td>
                                                    <td>
                                                        <a
                                                            className="edit-btn"
                                                            title="Edit Order"
                                                            data-toggle="modal"
                                                            data-target="#exampleModal"
                                                            onClick={() => onClickhandleEdit(orderItem._id)}
                                                        >
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </a>
                                                        <button
                                                            type="button"
                                                            className="close btn trash-post"
                                                            onClick={() => onClickhandleDelete(orderItem._id)}
                                                        >
                                                            <span>
                                                                <i className="fas fa-trash"></i>
                                                            </span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>



                                </>
                                {/* )} */}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            {modalContent}
        </>
    );

}

export default Order;
