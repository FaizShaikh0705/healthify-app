import React, { useState, useEffect, useContext } from 'react';
import firebase from '../../config/Fire';
import { storage } from "../../config/Fire";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { AuthContext } from '../../context/Auth';
import Loader from "../../common/Loader/Loader";
import $ from 'jquery';

function Customer(props) {

    const [showModal, setShowModal] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const [testData, setTestData] = useState("");
    const [isPostDelete, setIsPostDelete] = useState(false);
    const [userId, setUserId] = useState("");
    const [postId, setPostId] = useState("");

    const [loading, setLoading] = useState(true);

    const [registerUser, setRegisterUser] = useState("");


    useEffect(() => {
        getPostData();
    }, []);


    const getPostData = () => {
        axios.get('http://localhost:5002/api/users')
            .then((response) => {
                setTestData(response.data);
                setLoading(false);
                console.log("data fetched", response.data)
            })
            .catch((error) => console.log(error));
    };

    // handles archive on card archive click
    const handleDelete = (postId, e) => {
        if (window.confirm("Are you sure you want to delete the Post?")) {
            axios.delete(`/api/users/${userId}`)
                .then((response) => {
                    alert("Coupon deleted successfully");
                    window.location.reload();
                })
                .catch((error) => console.log("Error" + error));
        }
    };

    $(document).ready(function () {
        $("#search-input").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#enrollment-list-table tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });


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
                                    <h2 id="teach_profile">Customer Leads</h2>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-12">
                                    <label for="inputEmail4">Search based on Name</label>
                                    <input type="text" className="form-control" placeholder="search data" id="search-input" />
                                </div>
                            </div>

                            <div className="view-post">
                                {/* <div className="post-datas">
                        <div class="card-deck"> */}
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <>
                                        <table className="table table-striped table-bordered">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Contact</th>
                                                    <th scope="col">Location</th>
                                                    <th scope="col">Total Orders</th>
                                                    <th scope="col">Total Sales</th>
                                                </tr>
                                            </thead>
                                            <tbody id="c">
                                                {testData ?
                                                    Object.entries(testData).sort((a, b) => a[1].postTimestamp < b[1].postTimestamp ? 1 : -1).map((item) => (
                                                        // var x = {item[1].status}
                                                        <>
                                                            <tr key={item[0]} className="job-open ">
                                                                <td>{item[1].userName}</td>
                                                                <td>{item[1].email}</td>
                                                                <td>{item[1].contact}</td>
                                                                <td>{item[1].address ? item[1].address.city : "" }</td>
                                                                <td>{item[1].order}</td>
                                                                <td>{item[1].sales}</td>
                                                                {/* <td>
                                                                    <a onClick={(e) => handleDelete(item[0], e)}><i className="fas fa-trash-alt text-danger pl-2"></i></a>
                                                                </td> */}
                                                            </tr>
                                                        </>

                                                    )) :
                                                    <span>We'll notify you as soon as something becomes available.</span>
                                                }
                                            </tbody>
                                        </table>



                                    </>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    );

}

export default Customer;
