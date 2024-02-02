import React, { useState, useEffect, useContext } from 'react';
import firebase from '../../config/Fire';
import { storage } from "../../config/Fire";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { AuthContext } from '../../context/Auth';
import $ from 'jquery';
import axios from 'axios'
import Loader from "../../common/Loader/Loader";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReviewData from '../../components/ReviewData/ReviewData';

// var metadata = {
//     contentType: 'image/jpeg',
// };
// var tem = 1;
// class MyUploadAdapter {
//     constructor(loader) {
//         this.loader = loader;
//     }
//     // Starts the upload process.
//     upload() {
//         return this.loader.file.then(
//             file =>
//                 new Promise((resolve, reject) => {
//                     let storage = firebase.storage().ref();
//                     let uploadTask = storage
//                         .child(`/images/TestimonialData/${file.name}`)
//                         .put(file, metadata);
//                     uploadTask.on(
//                         console.log(uploadTask + "--------------------------------"),
//                         function () {
//                             uploadTask.snapshot.ref
//                                 .getDownloadURL()
//                                 .then(function (downloadURL) {
//                                     resolve({
//                                         default: downloadURL
//                                     });
//                                 });
//                         }
//                     );
//                 })
//         );
//     }
// }


function Testimonails() {
    const [showModal, setShowModal] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const [testPosition, setTestPosition] = useState("");
    const [testTopic, setTestTopic] = useState("");
    const [postLongDescription, setPostLongDescription] = useState("");
    const [testIsActive, setTestIsActive] = useState("");
    const [formComplete, setFormComplete] = useState(false);
    const [formIncompleteError, setFormIncompleteError] = useState(false);
    const [testEmail, setTestEmail] = useState("");
    const [testPositionNo, setTestPositionNo] = useState("");
    const [testTopicName, setTestTopicName] = useState("");
    const [postLongDetail, setPostLongDetail] = useState("");
    const [testIsActiveStatus, setTestIsActiveStatus] = useState("");
    const [testTimestamp, setTestTimestamp] = useState("");

    const [testData, setTestData] = useState("");
    const [isTestAdded, setIsTestAdded] = useState(false);
    const [isTestEdited, setIsTestEdited] = useState(false);
    const [editLink, setEditLink] = useState("");
    const [editLocation, setEditLocation] = useState("");

    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");

    const [editDetails, setEditDetails] = useState(false);

    const [testId, setTestId] = useState("");

    const testTopics = React.useRef();
    const testPositions = React.useRef();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTestData();
    }, []);

    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    // function handleUpload(e) {
    //     e.preventDefault();
    //     var today = new Date();
    //     var time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
    //     const uploadTask = storage.ref(`/images/testimonial/${time + "_" + file.name}`).put(file);
    //     uploadTask.on("state_changed", console.log, console.error, () => {
    //         storage
    //             .ref("images/testimonial")
    //             .child(time + "_" + file.name)
    //             .getDownloadURL()
    //             .then((url) => {
    //                 setFile(null);
    //                 setURL(url);
    //             });
    //     });
    // }

    const getTestData = () => {
        axios.get('http://localhost:5002/api/reviews')
            .then((response) => {
                setTestData(response.data);
                setLoading(false);
                console.log("data fetched", response.data)
            })
            .catch((error) => console.log(error));
    };

    const handleAddTestData = (e) => {
        e.preventDefault();

        //   check if all input is taken
        if (testPositions.current.value.length === 0 || testTopics.current.value.length === 0) {
            setFormComplete(false);
            setFormIncompleteError(true);
            return;
        }

        const newTestimonailData = {
            userId: currentUser.uid,
            UserName: testTopic,
            email: testEmail,
            postLongDetail: postLongDescription,
            position: testPosition,
            status: parseInt(testIsActive),
        };

        if (editDetails) {

            const editedTestimonailData = {
                UserName: testTopic,
                email: testEmail,
                postLongDetail: postLongDescription,
                position: testPosition,
                status: testIsActive,
                "updatedAt": new Date(),
                "__v": 0
            }

            axios.put(`http://localhost:5002/api/reviews/${testId}`, editedTestimonailData)
                .then((response) => {
                    alert("Reviews edited successfully");
                    window.location.reload();
                    setIsTestEdited(true); // Assuming you're using this state for some purpose
                })
                .catch((error) => console.error("Error editing Reviews:", error));

        } else {
            axios.post('http://localhost:5002/api/reviews', newTestimonailData)
                .then((response) => {
                    alert("Reviews added successfully");
                    window.location.reload();
                    setIsTestAdded(true); // Assuming you're using this state for some purpose
                })
                .catch((error) => console.error("Error adding Reviews:", error));
        }

    };

    const handleEdit = (
        testId,
        testTopic,
        testEmail,
        postLongDescription,
        position,
        status,
        e
    ) => {
        setShowModal(true);
        setEditDetails(true);

        setTestTopic(testTopic);
        setTestEmail(testEmail);
        setPostLongDescription(postLongDescription);
        setTestPosition(position);
        setTestIsActive(status);
        setTestId(testId);
    };

    // handles archive on card archive click
    const handleDelete = (testId, e) => {
        if (window.confirm("Are you sure you want to delete the Testimonail?")) {
            axios.delete(`/api/reviews/${testId}`)
                .then((response) => {
                    alert("Testimonail deleted successfully");
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


    const modalCloseHandler = () => { setShowModal(false); setEditDetails(false); setURL(false) };

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
                                <form>
                                    <div className="form-group">
                                        {formIncompleteError ? <p style={{ color: 'red' }}>Kindly complete the form before adding Column</p> : null}
                                    </div>
                                    <div className="form-group">
                                        <label for="topic">Customer Name</label>
                                        <input type="text" className="form-control" id="topic"
                                            defaultValue={editDetails ? testTopic : ""}
                                            ref={testTopics}
                                            onChange={(event) => setTestTopic(event.target.value)}
                                            placeholder="Enter Topic Name" />
                                    </div>
                                    <div className="form-group">
                                        <label for="email">Customer Email</label>
                                        <input type="email" className="form-control" id="email"
                                            defaultValue={editDetails ? testEmail : ""}
                                            onChange={(event) => setTestEmail(event.target.value)}
                                            placeholder="Enter Email Address" />
                                    </div>
                                    {/* <div className="form-group">
                                        <label for="description">Upload Image</label>
                                        <div className="custom-file">
                                            <input type="file" onChange={handleChange} />
                                            <button className="btn btn-dark btn-sm my-2 form-control" disabled={!file}>Click here to upload Image</button>
                                            <img src={editDetails ? url : url} width="100" height="100" alt="upload" />
                                        </div>
                                    </div> */}
                                    <div className="form-group pt-3">
                                        <label for="description">Long Description</label>
                                        {/* <div id="txtEditor1"></div> */}
                                        <CKEditor
                                            editor={ClassicEditor}
                                            // data={postLongDescription}
                                            data={editDetails ? postLongDescription : ""}
                                            config={{
                                                mediaEmbed: {
                                                    previewsInData: true
                                                }
                                            }}
                                            // onReady={editor => {
                                            //     editor.plugins.get("FileRepository").createUploadAdapter = loader => {
                                            //         return new MyUploadAdapter(loader);
                                            //     };
                                            // }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setPostLongDescription(data);
                                                // console.log(data);
                                            }}
                                        >
                                        </CKEditor>
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
                                        <h2 id="teach_profile">Reviews</h2>
                                        {/* <p>International Early Years Programs from Zero to Six. At Home and Online</p> */}
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
                                    <label for="inputEmail4">Search based on Reviews Name</label>
                                    <input type="text" className="form-control" placeholder="search data" id="search-input" />
                                </div>
                                <div className="form-group col-md-1 reset-btn">
                                    <button className="btn btn-primary btn-sm" onClick={() => window.location.reload()}>Reset</button>
                                </div>
                            </div>

                            <div className="view-post">
                                {/* <div className="post-datas">
                        <div className="card-deck"> */}
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <div className="row" id="session-data">
                                        {testData.length > 0 ? (
                                            testData.map((testimonial) => (
                                                <div key={testimonial._id}>
                                                    <ReviewData
                                                        id={testimonial._id}
                                                        testTopicName={testimonial.UserName}
                                                        testEmail={testimonial.email}
                                                        postLongDescription={testimonial.postLongDetail}
                                                        testPosition={testimonial.position}
                                                        testIsActiveStatus={testimonial.status}
                                                        onClickhandleDelete={(e) => handleDelete(testimonial._id, e)}
                                                        onClickhandleEdit={(e) =>
                                                            handleEdit(
                                                                testimonial._id,
                                                                testimonial.UserName,
                                                                testimonial.email,
                                                                testimonial.postLongDetail,
                                                                testimonial.position,
                                                                testimonial.status,
                                                                e
                                                            )
                                                        }
                                                    />
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

export default Testimonails