import React, { useState, useEffect, useContext } from 'react';
import firebase from '../../config/Fire';
import { storage } from "../../config/Fire";
import Axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { AuthContext } from '../../context/Auth';
import { publicRequest } from '../../requestMethods'
import Loader from "../../common/Loader/Loader";
import $ from 'jquery';

function ContactLeads(props) {

  const [showModal, setShowModal] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const [contact, setContact] = useState([]);
  const [isPostDelete, setIsPostDelete] = useState(false);

  const [postId, setPostId] = useState("");

  const [loading, setLoading] = useState(true);

  const [registerUser, setRegisterUser] = useState("");


  useEffect(() => {
    getPostData();
  }, []);


  const getPostData = async () => {
    try {
      const res = await publicRequest.get("/contacts")
      setContact(res.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
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
                  <h2 id="teach_profile">Enquire Leads</h2>
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
                {/* {loading ? (
                  <Loader></Loader>
                ) : ( */}
                <>
                  <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact</th>
                        <th scope="col">message</th>
                        {/* <th scope="col">position</th>
                        <th scope="col">status</th> */}
                      </tr>
                    </thead>
                    <tbody id="c">
                      {contact.map((item) => (
                        <tr key={item._id} className="job-open ">
                          <td>{item.UserName}</td>
                          <td>{item.email}</td>
                          <td>{item.number}</td>
                          <td>{item.message}</td>
                          {/* <td>{item.position}</td>
                          <td>{item.status}</td> */}
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
    </>
  );

}

export default ContactLeads;
