import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/Auth';
import Moment from 'react-moment';
import parse from 'html-react-parser';

const TestimonialData = (props) => {
    const { currentUser } = useContext(AuthContext);
    const { id,
        postImage,
        testTimestamp,
        testIsActiveStatus,
        onClickhandleEdit
    } = props;
    return (
        <div className={"session-card "}>
            <div className="card mb-3">
                <img className="card-img-top" src={postImage} alt="Card image cap" />
                <div className="card-body">
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