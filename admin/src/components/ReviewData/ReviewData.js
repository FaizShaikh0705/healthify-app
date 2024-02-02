import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/Auth';
import Moment from 'react-moment';
import parse from 'html-react-parser';

const TestimonialData = (props) => {
    const { currentUser } = useContext(AuthContext);
    const { id,
        testTopicName,
        testEmail,
        postLongDescription,
        testTimestamp,
        testIsActiveStatus,
        onClickhandleEdit
    } = props;
    return (
        <div className={"session-card " + testTopicName}>
            <div className="card mb-3">
                <div className="card-body">
                    {/* <a className="view-data" data-toggle="modal" data-target={"#" + id}> */}
                    <h4 className="card-title blog-post-title">{testTopicName}</h4>
                    {/* </a> */}
                    <h6>{testEmail}</h6>
                    <div>
                        <p className="card-title blog-post-title">{parse(`${postLongDescription.substring(0, 50)}...`)}</p>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between'>
                        {testIsActiveStatus == 1 ? <span className='text-success'>Active</span> : <span className='text-danger'>In Active</span>}
                        <a className="edit-btn" title="Edit Post" data-toggle="modal" data-target="#exampleModal" onClick={onClickhandleEdit}><i className="fas fa-pencil-alt"></i></a>
                    </div>
                    <div className="user-profile-data">
                        <small className="card-text profile-text"><b>Posted By :</b> {currentUser.displayName}</small><br />
                        <small className="card-text profile-text"><b>Posted On :</b> <Moment format="DD MMM YYYY">{testTimestamp}</Moment></small>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TestimonialData