import React, { useState, useEffect, useContext } from 'react';
import firebase from '../../config/Fire';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { AuthContext } from '../../context/Auth';
import axios from 'axios'
import $, { data } from 'jquery';
import Loader from "../../common/Loader/Loader";
import CouponsData from '../../components/CouponsData/CouponsData';
// import { RadioGroup, Radio } from 'react-radio-group';

function Coupons() {

    const [showModal, setShowModal] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [testPosition, setTestPosition] = useState("");
    const [testTopic, setTestTopic] = useState("");
    const [discountedPrice, setDiscountedPrice] = useState("");
    const [testDiscountedPrice, setTestDiscountedPrice] = useState("");
    const [usageLimit, setUsageLimit] = useState("");
    const [testUsageLimit, setTestUsageLimit] = useState("");
    const [orderValue, setOrderValue] = useState("");
    const [testOrderValue, setTestOrderValue] = useState("");
    const [orderQuantity, setOrderQuantity] = useState("");
    const [testOrderQuantity, setTestOrderQuantity] = useState("");
    const [minimumOrderCondition, setMinimumOrderCondition] = useState("");
    const [testMinimumOrderCondition, setTestMinimumOrderCondition] = useState("");
    const [minimumOrderValue, setMinimumOrderValue] = useState("");
    const [testMinimumOrderValue, setTestMinimumOrderValue] = useState("");
    const [maximumValue, setMaximumValue] = useState("");
    const [testMaximumValue, setTestMaximumValue] = useState("");
    // const [testLongDescription, setTestLongDescription] = useState("");
    const [testIsActive, setTestIsActive] = useState("");
    const [formComplete, setFormComplete] = useState(false);
    const [formIncompleteError, setFormIncompleteError] = useState(false);
    // const [testPositionNo, setTestPositionNo] = useState("");
    // const [testTopicName, setTestTopicName] = useState("");
    // const [testLongDetail, setTestLongDetail] = useState("");
    // const [testIsActiveStatus, setTestIsActiveStatus] = useState("");
    // const [testTimestamp, setTestTimestamp] = useState("");
    const [testData, setTestData] = useState("");
    const [isTestAdded, setIsTestAdded] = useState(false);
    const [isTestEdited, setIsTestEdited] = useState(false);
    // const [isTestDelete, setIsTestDelete] = useState(false);
    // const [editLink, setEditLink] = useState("");
    // const [editLocation, setEditLocation] = useState("");
    // const [file, setFile] = useState(null);
    const [editDetails, setEditDetails] = useState(false);
    const [testId, setTestId] = useState("");
    const testTopics = React.useRef();
    const testPositions = React.useRef();

    useEffect(() => {
        getTestData();
    }, []);

    function handleUpload(e) {
        e.preventDefault();
        var today = new Date();
        var time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
    }


    const getTestData = () => {
        axios.get('http://localhost:5002/api/coupons')
            .then((response) => {
                setTestData(response.data);
                setLoading(false);
                console.log("data fetched", response.data)
            })
            .catch((error) => console.log(error));
    };

    const handleAddTestData = (e) => {
        e.preventDefault();
        var temp = $("input[name='ord_pref']:checked").val();
        // Check if all required fields are filled
        if (testPositions.current.value.length === 0 || testTopics.current.value.length === 0) {
            setFormComplete(false);
            setFormIncompleteError(true);
            return;
        }

        const newCouponData = {
            userId: currentUser.id,
            coupons: [
                {
                    couponCode: testTopic,
                    usageLimitPerCustomer: testUsageLimit,
                    discountPercentage: testDiscountedPrice,
                    minimumOrderCondition: testMinimumOrderCondition,
                    minimumOrderValue: testMinimumOrderValue,
                    maximumDiscount: testMaximumValue,
                    position: testPosition,
                    status: testIsActive,
                },
            ],
        };

        if (editDetails) {

            const editedCouponData = {
                "coupons": [
                    {
                        couponCode: testTopic,
                        usageLimitPerCustomer: testUsageLimit,
                        discountPercentage: testDiscountedPrice,
                        minimumOrderCondition: testMinimumOrderValue,
                        minimumOrderValue: testMinimumOrderValue,
                        maximumDiscount: testMaximumValue,
                        position: testPosition,
                        status: testIsActive,
                    }
                ],
                "updatedAt": new Date(),
                "__v": 0
            }

            axios.put(`http://localhost:5002/api/coupons/${testId}`, editedCouponData)
                .then((response) => {
                    alert("Coupon edited successfully");
                    window.location.reload();
                    setIsTestEdited(true); // Assuming you're using this state for some purpose
                })
                .catch((error) => console.error("Error editing coupon:", error));

        } else {
            axios.post('http://localhost:5002/api/coupons', newCouponData)
                .then((response) => {
                    alert("Coupon added successfully");
                    window.location.reload();
                    setIsTestAdded(true); // Assuming you're using this state for some purpose
                })
                .catch((error) => console.error("Error adding coupon:", error));
        }

    };

    const handleEdit = (
        testId,
        couponCode,
        usageLimitPerCustomer,
        discountPercentage,
        minmumOrderCondition,
        minmumOrderValue,
        maximumDiscount,
        position,
        status,
        e
    ) => {
        setShowModal(true);
        setEditDetails(true);
        setTestPosition(position)
        setTestTopic(couponCode)
        setTestDiscountedPrice(discountPercentage)
        setTestUsageLimit(usageLimitPerCustomer)
        setTestMinimumOrderCondition(minmumOrderCondition)
        setTestMinimumOrderValue(minmumOrderValue)
        setTestMaximumValue(maximumDiscount)
        setTestIsActive(status)
        setTestId(testId)
        // console.log("Values:", testId, testTopic, testUsageLimit, testDiscountedPrice, testMinimumOrderValue, testMaximumValue, testPosition, testIsActive);
    };

    // handles archive on card archive click
    const handleDelete = (testId, e) => {
        if (window.confirm("Are you sure you want to delete the Coupon?")) {
            axios.delete(`/api/coupons/${testId}`)
                .then((response) => {
                    alert("Coupon deleted successfully");
                    window.location.reload();
                })
                .catch((error) => console.log("Error" + error));
        }
    };

    $(document).ready(function () {
        $('#search-input').keyup(function () {
            // Search text
            var text = $(this).val();
            // Hide all content className element
            $('.session-card').hide();
            // Search and show
            $('.session-card:contains("' + text + '")').show();
        });
    });


    const modalCloseHandler = () => { setShowModal(false); setEditDetails(false); };

    let modalContent = showModal ?

        (
            <>
                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{editDetails ? "Edit Testimonial" : "Add Testimonial"}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={modalCloseHandler}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleUpload}>
                                    <div className="form-group">
                                        {formIncompleteError ? <p style={{ color: 'red' }}>Kindly complete the form before adding Column</p> : null}
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label for="Coupon Code">Coupon Code</label>
                                            <input type="text" className="form-control" id="topic"
                                                defaultValue={editDetails ? testTopic : ""}
                                                ref={testTopics}
                                                onChange={(event) => setTestTopic(event.target.value)}
                                                placeholder="Enter Topic Name" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="Usage limit per customer">Usage limit per customer</label>
                                            <select id="status" className="form-control"
                                                defaultValue={editDetails ? testUsageLimit : ""}
                                                onChange={(event) => setTestUsageLimit(event.target.value)}>
                                                <option selected>Select Usage</option>
                                                <option value="Allow Once">Allow Once</option>
                                                <option value="Allow Twice">Allow Twice</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="Discount percentage">Discount percentage %</label>
                                            <input
                                                id="topic"
                                                type="number"
                                                className="form-control"
                                                defaultValue={editDetails ? testDiscountedPrice : ""}
                                                placeholder='Enter Discounted Percentage%'
                                                onChange={(event) => setTestDiscountedPrice(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <label htmlFor='Minimum Order Condition'>Minimum Order Condition</label>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            {/* <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id="flexRadioDefault1"
                                                    checked
                                                    defaultValue={editDetails ? orderValue : ""}
                                                    onChange={(event) => setOrderValue(event.target.value)}
                                                />
                                                <label className="form-check-label" for="flexRadioDefault1">
                                                    Order Value
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id="flexRadioDefault2"
                                                    defaultValue={editDetails ? orderQuantity : ""}
                                                    onChange={(event) => setOrderQuantity(event.target.value)}
                                                />
                                                <label className="form-check-label" for="flexRadioDefault2">
                                                    Order Quantity
                                                </label>
                                            </div> */}
                                        <input type="radio" id="ordVal" name="ord_pref" value="Order Value"/>
                                        <label for="html">Order Value</label><br/>
                                        <input type="radio" id="ordQuan" name="ord_pref" value="Order Quantity"/>
                                        <label for="css">Order Quantity</label><br/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label for="Minimum Order Value">Minimum Order Value</label>
                                            <input type="number" className="form-control" id="topic"
                                                defaultValue={editDetails ? testMinimumOrderValue : ""}
                                                onChange={(event) => setTestMinimumOrderValue(event.target.value)}
                                                placeholder="Enter Topic Name" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="Maximum Discount">Maximum Discount %</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="topic"
                                                defaultValue={editDetails ? testMaximumValue : ""}
                                                onChange={(event) => setTestMaximumValue(event.target.value)}
                                                placeholder="Enter Topic Name" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label for="session">position</label>
                                            <input type="text" className="form-control" id="session"
                                                defaultValue={editDetails ? testPosition : ""}
                                                ref={testPositions}
                                                onChange={(event) => setTestPosition(event.target.value)}
                                                placeholder="Enter session" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="status">Status</label>
                                            <select id="status" className="form-control"
                                                defaultValue={editDetails ? testIsActive : ""}
                                                onChange={(event) => setTestIsActive(event.target.value)}>
                                                <option selected>Select Session Status</option>
                                                <option value="0">In-Active</option>
                                                <option value="1">Active</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" disabled={formComplete} onClick={handleAddTestData} className="btn btn-sm btn-primary">Post</button>
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
                                <div className="d-flex justify-content-between">
                                    <div className="title">
                                        <h2 id="teach_profile">Coupons</h2>
                                    </div>
                                    <div className="add-post-button">
                                        <button onClick={() => setShowModal(true)} className="btn btn-dark btn-sm" data-toggle="modal" data-target="#exampleModal"><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                                <div className="m-content">
                                    {modalContent}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-11">
                                    <label for="inputEmail4">Search based on Testimonials Name</label>
                                    <input type="text" className="form-control" placeholder="search data" id="search-input" />
                                </div>
                                <div className="form-group col-md-1 reset-btn">
                                    <button className="btn btn-primary btn-sm" onClick={() => window.location.reload()}>Reset</button>
                                </div>
                            </div>

                            <div className="view-post">
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <div className="row" id="session-data">
                                        {testData && testData.length > 0 ? (
                                            testData.map((item) => (
                                                <div key={item._id}>
                                                    {item.coupons.map((coupon, index) => (
                                                        <CouponsData
                                                            key={`${item._id}_${index}`}
                                                            id={item._id}
                                                            testTopicName={coupon.couponCode}
                                                            usageLimitPerCustomer={coupon.usageLimitPerCustomer}
                                                            discountedPercentage={coupon.discountPercentage}
                                                            minimumOrderCondition={coupon.minimumOrderCondition}
                                                            minimumOrderValue={coupon.minimumOrderValue}
                                                            maximumValue={coupon.maximumDiscount}
                                                            testTimestamp={item.createdAt}
                                                            testIsActiveStatus={coupon.status === 1}
                                                            onClickhandleDelete={(e) => handleDelete(item._id, e)}
                                                            onClickhandleEdit={(e) => handleEdit(
                                                                item._id,
                                                                coupon.couponCode,
                                                                coupon.usageLimitPerCustomer,
                                                                coupon.discountPercentage,
                                                                coupon.minimumOrderCondition,
                                                                coupon.minimumOrderValue,
                                                                coupon.maximumDiscount,
                                                                coupon.position,
                                                                coupon.status,
                                                                e
                                                            )}
                                                        />
                                                    ))}
                                                </div>
                                            ))

                                        ) : (
                                            <div className="row justify-content-center pt-4">
                                                <div className="col-lg-12">
                                                    <div className="noprogramAdded text-center bg-white border shadow p-5">
                                                        <h2 className="noTaskAdded">Coming Soon</h2>
                                                        <span>We'll notify you as soon as something becomes available.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Coupons