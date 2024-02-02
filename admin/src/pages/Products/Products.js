import React, { useState, useEffect, useContext } from 'react';
import firebase from '../../config/Fire';
import { storage } from "../../config/Fire";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { AuthContext } from '../../context/Auth';
import $ from 'jquery';
import parse from 'html-react-parser';
import Loader from "../../common/Loader/Loader";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import ProductData from '../../components/ProductData/ProuctData';

var metadata = {
    contentType: 'image/jpeg',
};
class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.files.map((file) => {
            return new Promise((resolve, reject) => {
                let storageRef = firebase.storage().ref();
                let uploadTask = storageRef.child(`/images/productData/${file.name}`).put(file, metadata);

                uploadTask.on(
                    'state_changed',
                    null,
                    (error) => {
                        reject(error);
                    },
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                );
            });
        });
    }
}


function Products(props) {
    const [showModal, setShowModal] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const [postPosition, setPostPosition] = useState("");
    const [postTopic, setPostTopic] = useState("");
    const [postPrice, setPostPrice] = useState("");
    const [postPrice2, setPostPrice2] = useState("");
    const [postVariant1, setPostVariant1] = useState("");
    const [postVariant2, setPostVariant2] = useState("");
    const [postLongDescription, setPostLongDescription] = useState("");
    const [postIsActive, setPostIsActive] = useState("");
    const [formComplete, setFormComplete] = useState(false);
    const [formIncompleteError, setFormIncompleteError] = useState(false);

    const [postPositionNo, setPostPositionNo] = useState("");
    const [postImage, setPostImage] = useState("");
    const [postTopicName, setPostTopicName] = useState("");
    const [postPriceName, setPostPriceName] = useState("");
    const [postPriceName2, setPostPriceName2] = useState("");
    const [postVariantName1, setPostVariantName1] = useState("");
    const [postVariantName2, setPostVariantName2] = useState("");
    const [postLongDetail, setPostLongDetail] = useState("");
    const [postIsActiveStatus, setPostIsActiveStatus] = useState("");
    const [postTimestamp, setPostTimestamp] = useState("");

    const [postData, setPostData] = useState("");
    const [isPostAdded, setIsPostAdded] = useState(false);
    const [isPostEdited, setIsPostEdited] = useState(false);
    const [isPostDelete, setIsPostDelete] = useState(false);

    const [file, setFile] = useState(null);
    const [url, setURL] = useState("");

    const [editDetails, setEditDetails] = useState(false);

    const [testId, setTestId] = useState("");
    const postTopics = React.useRef();
    const postPositions = React.useRef();

    const [testData, setTestData] = useState("");
    const [isTestAdded, setIsTestAdded] = useState(false);
    const [isTestEdited, setIsTestEdited] = useState(false);

    const [loading, setLoading] = useState(true);

    const [selectedImages, setSelectedImages] = useState([]);


    useEffect(() => {
        getTestData();
    }, []);

    function handleChange(e) {
        setFile(e.target.files);
    }


    function handleUpload(e) {
        e.preventDefault();

        const uploadPromises = Array.from(file).map((file) => {
            var today = new Date();
            var time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
            const uploadTask = storage.ref(`/images/product/${time + "_" + file.name}`).put(file);

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    null,
                    (error) => {
                        reject(error);
                    },
                    () => {
                        storage
                            .ref("images/product")
                            .child(time + "_" + file.name)
                            .getDownloadURL()
                            .then((downloadURL) => {
                                resolve(downloadURL);
                            });
                    }
                );
            });
        });

        Promise.all(uploadPromises)
            .then((urls) => {
                setURL(urls); // Set an array of download URLs
            })
            .catch((error) => {
                console.error("Error uploading images: ", error);
            });
    }

    const handleRemoveImage = (index) => {
        const updatedImages = [...url];
        updatedImages.splice(index, 1);
        setURL(updatedImages);
    };



    const getTestData = () => {
        axios.get('http://localhost:5002/api/products')
            .then((response) => {
                setTestData(response.data);
                setLoading(false);
                console.log("data fetched", response.data)
            })
            .catch((error) => console.log(error));
    };

    const handleAddPostData = (e) => {
        e.preventDefault();

        //   check if all input is taken
        if (postPositions.current.value.length === 0 || postTopics.current.value.length === 0) {
            setFormComplete(false);
            setFormIncompleteError(true);
            return;
        }

        const newProductData = {
            userId: currentUser.uid,
            postTopicName: postTopic,
            postPriceName: postPrice,
            postPriceName2: postPrice2,
            postVariantName1: postVariant1,
            postVariantName2: postVariant2,
            postImage: url,
            postLongDetail: postLongDescription,
            postPositionNo: postPosition,
            postIsActiveStatus: parseInt(postIsActive),
            postusername: currentUser.displayName,

        };

        if (editDetails) {
            const editedProductData = {
                userId: currentUser.uid,
                postTopicName: postTopic,
                postPriceName: postPrice,
                postPriceName2: postPrice2,
                postVariantName1: postVariant1,
                postVariantName2: postVariant2,
                postImage: url,
                postLongDetail: postLongDescription,
                postPositionNo: postPosition,
                postIsActiveStatus: parseInt(postIsActive),
                postusername: currentUser.displayName,

                "updatedAt": new Date(),
                "__v": 0
            }


            axios.put(`http://localhost:5002/api/products/${testId}`, editedProductData)
                .then((response) => {
                    alert("Products edited successfully");
                    window.location.reload();
                    setIsTestEdited(true); // Assuming you're using this state for some purpose
                })
                .catch((error) => console.error("Error editing product:", error));

        } else {
            axios.post('http://localhost:5002/api/products', newProductData)
                .then((response) => {
                    alert("Products added successfully");
                    window.location.reload();
                    setIsTestAdded(true); // Assuming you're using this state for some purpose
                })
                .catch((error) => console.error("Error adding product:", error));
        }

    };



    const handleEdit = (
        testId,
        postTopic,
        postPrice,
        postPrice2,
        postVariant1,
        postVariant2,
        url,
        postLongDescription,
        postPosition,
        postIsActive,
        e
    ) => {
        setShowModal(true);
        setEditDetails(true);

        setPostTopic(postTopic);
        setPostPrice(postPrice);
        setPostPrice2(postPrice2);
        setPostVariant1(postVariant1);
        setPostVariant2(postVariant2);
        setURL(url);
        setPostLongDescription(postLongDescription);
        setPostPosition(postPosition);
        setPostIsActive(postIsActive);
        setTestId(testId);
    };

    // handles archive on card archive click
    const handleDelete = (testId, e) => {
        if (window.confirm("Are you sure you want to delete the products?")) {
            axios.delete(`/api/products/${testId}`)
                .then((response) => {
                    alert("products deleted successfully");
                    window.location.reload();
                })
                .catch((error) => console.log("Error" + error));
        }
    };

    const handleImageDelete = (testId) => {
        // Assuming you have a reference to the product in the database
        firebase.database().ref(`product/${testId}`).update({
            postImage: "" // Set the image field to an empty string or null
        })
            .then(() => {
                alert("Image deleted successfully");
                // Optionally, you can update the local state or trigger a reload of the product data
                // setPostData(updatedData); // Update the state with the modified data
                // window.location.reload(); // Reload the page to reflect changes
            })
            .catch((error) => {
                console.log("Error deleting image: ", error);
            });
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

    //    const filterStatus = () => {
    //   $('.filter-status').on('change', function() {
    //       // alert( this.value);
    //       $('.session-card').css("display","none");
    //       $('.'+this.value).css("display","table-row");
    //       if(this.value == "all"){
    //         $('.session-card').css("display","table-row");
    //       }
    //   });
    // }

    const modalCloseHandler = () => { setShowModal(false); setEditDetails(false); setURL(false) };

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
                                <form onSubmit={handleUpload}>
                                    <div className="form-group">
                                        {formIncompleteError ? <p style={{ color: 'red' }}>Kindly complete the form before adding Column</p> : null}
                                    </div>
                                    <div className="form-group">
                                        <label for="topic">Product Topic Name</label>
                                        <input type="text" className="form-control" id="topic"
                                            defaultValue={editDetails ? postTopic : ""}
                                            ref={postTopics}
                                            onChange={(event) => setPostTopic(event.target.value)}
                                            placeholder="Enter Product Topic Name" />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="price">Product Price1</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="price"
                                                value={postPrice}
                                                onChange={(event) => setPostPrice(event.target.value)}
                                                placeholder="Enter Product Price"
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="price">Product Price2</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="price"
                                                value={postPrice2}
                                                onChange={(event) => setPostPrice2(event.target.value)}
                                                placeholder="Enter Product Price"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="price">Varient1</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="price"
                                                value={postVariant1}
                                                onChange={(event) => setPostVariant1(event.target.value)}
                                                placeholder="Enter Product Price"
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="price">Varient2</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="price"
                                                value={postVariant2}
                                                onChange={(event) => setPostVariant2(event.target.value)}
                                                placeholder="Enter Product Price"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="description">Upload Image</label>
                                        <div className="custom-file">
                                            <input type="file" multiple onChange={handleChange} />
                                            <button className="btn btn-dark btn-sm my-2 form-control" disabled={!file}>Click here to upload Image</button>
                                            {Array.isArray(url) && url.length > 0 && (
                                                <div className="uploaded-images">
                                                    {url.map((imageUrl, index) => (
                                                        <div key={index} className="uploaded-image">
                                                            <img src={imageUrl} width="80" height="80" alt={`upload-${index}`} />
                                                            <span className="remove-image" onClick={() => handleRemoveImage(index)}>
                                                                &times;
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
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
                                            onReady={editor => {
                                                editor.plugins.get("FileRepository").createUploadAdapter = loader => {
                                                    return new MyUploadAdapter(loader);
                                                };
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setPostLongDescription(data);
                                                console.log(data);
                                            }}
                                        >
                                        </CKEditor>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label for="session">Position</label>
                                            <input type="text" className="form-control" id="session"
                                                defaultValue={editDetails ? postPosition : ""}
                                                ref={postPositions}
                                                onChange={(event) => setPostPosition(event.target.value)}
                                                placeholder="Enter session" />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="status">Status</label>
                                            <select id="status" className="form-control"
                                                defaultValue={editDetails ? postIsActive : ""}
                                                onChange={(event) => setPostIsActive(event.target.value)}>
                                                <option selected>Select Session Status</option>
                                                <option value="0">In-Active</option>
                                                <option value="1">Active</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" disabled={formComplete} onClick={handleAddPostData} className="btn btn-sm btn-primary">Post</button>
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
                                        <h2 id="teach_profile">Products</h2>
                                        {/* <p>International Early Years Programs from Zero to Six. At Home and Online</p> */}
                                    </div>
                                    {/* <div className="add-post-button">
                                        <button onClick={() => setShowModal(true)} className="btn btn-dark btn-sm" data-toggle="modal" data-target="#exampleModal"><i className="fas fa-plus"></i></button>
                                    </div> */}
                                </div>
                                <div className="m-content">
                                    {modalContent}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-11">
                                    <label for="inputEmail4">Search based on Product Name</label>
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
                                        {testData && testData.length > 0 ? (
                                            testData.map((item) => (
                                                <ProductData
                                                    key={item._id}
                                                    id={item._id}
                                                    postTopicName={item.postTopicName}
                                                    postPriceName={item.postPriceName}
                                                    postPriceName2={item.postPriceName2}
                                                    postVariantName1={item.postVariantName1}
                                                    postVariantName2={item.postVariantName2}
                                                    postImage={item.postImage}
                                                    postLongDetail={item.postLongDetail}
                                                    postTimestamp={item.postTimestamp}
                                                    onClickhandleDelete={(e) => handleDelete(item[0], e)}
                                                    onClickhandleImageDelete={() => handleImageDelete(item[0])}
                                                    postIsActiveStatus={item.postIsActiveStatus}
                                                    onClickhandleEdit={(e) =>
                                                        handleEdit(
                                                            item._id,
                                                            item.postTopicName,
                                                            item.postPriceName,
                                                            item.postPriceName2,
                                                            item.postVariantName1,
                                                            item.postVariantName2,
                                                            item.postImage,
                                                            item.postLongDetail,
                                                            item.postPositionNo,
                                                            item.postIsActiveStatus,
                                                            e
                                                        )}
                                                />
                                            ))
                                        ) :
                                            <div className="row justify-content-center pt-4">
                                                <div className="col-lg-12">
                                                    <div className="noprogramAdded text-center bg-white border shadow p-5">
                                                        <h2 className="noTaskAdded">Coming Soon</h2>
                                                        <span>We'll notify you as soon as something becomes available.</span>
                                                    </div>
                                                </div>
                                            </div>}
                                    </div>
                                )}
                            </div>



                        </div>
                    </div>
                </div>

            </div>
        </>
    );

}


export default Products