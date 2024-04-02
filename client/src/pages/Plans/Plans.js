import React, { useState, useEffect } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { publicRequest } from "../../requestMethods";
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Carousel from 'react-bootstrap/Carousel';
import './Plans.css'

const Plans = () => {

    const [dietPlan, setDietPlan] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dietPlans, setDietPlans] = useState([]);
    const [healthIssue, setHealthIssue] = useState('');


    const [selectedOrder, setSelectedOrder] = useState(null);
    const currentUser = useSelector((state) => state.user.currentUser);
    console.log(currentUser);

    
    useEffect(() => {
        const fetchAllDietPlans = async () => {
            try {
                const response = await publicRequest.get(`/diet`);
                setDietPlans(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching all diet plans:", error);
                setError(error.message);
            }
        };

        if (currentUser.healthIssues.length > 0 && currentUser.weightGoal) {
            fetchAllDietPlans();
        }
    }, [currentUser]);


    
        if (!currentUser) {
            alert("Please login to view this page");
            return <Redirect to="/" />;
        }
    


    return (
        <>
            <Header />
            <section className="question-section">
                <h1 className="text-center text-success">Personal Diet Details ({currentUser.healthIssues[0]})</h1>
                <Container>
                    <Row>
                        <div className="col-md-12">
                            <div className="signup-box">
                                {console.log(dietPlans)}
                                {dietPlans.length === 0 ? (
                                    <p>No diet plans found for your profile</p>
                                ) : (
                                    Object.entries(dietPlans).filter((item) => item[1].for === currentUser.healthIssues[0] && item[1].type === currentUser.weightGoal && item[1].mealType === currentUser.vegetarian).map((dietPlan, index) => (
                                        <>
                                            <div key={index}>
                                                {/* <h3>Type: {dietPlan[1].type}</h3>
                                                <h3>For: {dietPlan[1].for}</h3> */}
                                                <h3></h3>
                                                <Row className='justify-content-center'>
                                                    <Carousel
                                                        prevIcon={<FaChevronLeft />}
                                                        nextIcon={<FaChevronRight />}
                                                        indicators={false}
                                                    >
                                                        <Carousel.Item>
                                                            <div className='col-lg-10 mx-auto'>
                                                                <div className="card item shadow-sm mx-2 mb-4">
                                                                    <h2 className='text-center text-danger mt-4'>Monday</h2>
                                                                    <div className="card-body">
                                                                        <ul className='data'>
                                                                            {Object.entries(dietPlan[1].meals).map(([mealType, foods], index) => (
                                                                                <li key={index}>
                                                                                    <strong>{mealType.replace('_', ' ').toUpperCase()}</strong>: {foods.join(', ')}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Carousel.Item>
                                                        <Carousel.Item>
                                                            <div className='col-lg-10 mx-auto'>
                                                                <div className="card item shadow-sm mx-2 mb-4">
                                                                    <h2 className='text-center text-danger mt-4'>Tuesday</h2>
                                                                    <div className="card-body">
                                                                        <ul className='data'>
                                                                            {Object.entries(dietPlan[1].meals).map(([mealType, foods], index) => (
                                                                                <li key={index}>
                                                                                    <strong>{mealType.replace('_', ' ').toUpperCase()}</strong>: {foods.join(', ')}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Carousel.Item>
                                                        <Carousel.Item>
                                                            <div className='col-lg-10 mx-auto'>
                                                                <div className="card item shadow-sm mx-2 mb-4">
                                                                    <h2 className='text-center text-danger mt-4'>Wednesday</h2>
                                                                    <div className="card-body">
                                                                        <ul className='data'>
                                                                            {Object.entries(dietPlan[1].meals).map(([mealType, foods], index) => (
                                                                                <li key={index}>
                                                                                    <strong>{mealType.replace('_', ' ').toUpperCase()}</strong>: {foods.join(', ')}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Carousel.Item>
                                                        <Carousel.Item>
                                                            <div className='col-lg-10 mx-auto'>
                                                                <div className="card item shadow-sm mx-2 mb-4">
                                                                    <h2 className='text-center text-danger mt-4'>Thursday</h2>
                                                                    <div className="card-body">
                                                                        <ul className='data'>
                                                                            {Object.entries(dietPlan[1].meals).map(([mealType, foods], index) => (
                                                                                <li key={index}>
                                                                                    <strong>{mealType.replace('_', ' ').toUpperCase()}</strong>: {foods.join(', ')}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Carousel.Item>
                                                        <Carousel.Item>
                                                            <div className='col-lg-10 mx-auto'>
                                                                <div className="card item shadow-sm mx-2 mb-4">
                                                                    <h2 className='text-center text-danger mt-4'>Friday</h2>
                                                                    <div className="card-body">
                                                                        <ul className='data'>
                                                                            {Object.entries(dietPlan[1].meals).map(([mealType, foods], index) => (
                                                                                <li key={index}>
                                                                                    <strong>{mealType.replace('_', ' ').toUpperCase()}</strong>: {foods.join(', ')}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Carousel.Item>
                                                        <Carousel.Item>
                                                            <div className='col-lg-10 mx-auto'>
                                                                <div className="card item shadow-sm mx-2 mb-4">
                                                                    <h2 className='text-center text-danger mt-4'>Saturday</h2>
                                                                    <div className="card-body">
                                                                        <ul className='data'>
                                                                            {Object.entries(dietPlan[1].meals).map(([mealType, foods], index) => (
                                                                                <li key={index}>
                                                                                    <strong>{mealType.replace('_', ' ').toUpperCase()}</strong>: {foods.join(', ')}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Carousel.Item>
                                                        <Carousel.Item>
                                                            <div className='col-lg-10 mx-auto'>
                                                                <div className="card item shadow-sm mx-2">
                                                                    <h2 className='text-center text-danger mt-4'>Sunday</h2>
                                                                    <div className="card-body">
                                                                        <ul className='data'>
                                                                            {Object.entries(dietPlan[1].meals).map(([mealType, foods], index) => (
                                                                                <li key={index}>
                                                                                    <strong>{mealType.replace('_', ' ').toUpperCase()}</strong>: {foods.join(', ')}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Carousel.Item>
                                                    </Carousel>
                                                </Row>
                                            </div >
                                        </>
                                    ))
                                )}
                            </div>
                            {currentUser.healthIssues[0] === "Thyroid Patient" ?
                                <>
                                    <div className='text-center my-5'>
                                        <div>
                                            <h1 className="text-center">Exercise for ({currentUser.healthIssues[0]})</h1>
                                            <Carousel indicators={false} prevIcon={<FaChevronLeft />}
                                                nextIcon={<FaChevronRight />}>
                                                <Carousel.Item>
                                                    <iframe height="250" width="600" style={{ borderRadius: "10px" }} src="https://www.youtube.com/embed/uj2y9kXFaf0?si=Ahu7fJYoDMlGtfxD" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <iframe height="250" width="600" style={{ borderRadius: "10px" }} src="https://www.youtube.com/embed/Xzaye1lvL10?si=kijqbdiYpMz2ZOp8" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <iframe height="250" width="600" style={{ borderRadius: "10px" }} src="https://www.youtube.com/embed/JgOs6jnle0k?si=6UbBVJwseLBmRfWt" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                </Carousel.Item>
                                            </Carousel>
                                        </div>
                                    </div>
                                </> : ""
                            }

                            {currentUser.healthIssues[0] === "Cholesterol Patient" ?
                                <>
                                    <div className='text-center my-5'>
                                        <div>
                                            <h1 className="text-center">Exercise for ({currentUser.healthIssues[0]})</h1>
                                            <Carousel indicators={false} prevIcon={<FaChevronLeft />}
                                                nextIcon={<FaChevronRight />}>
                                                <Carousel.Item>
                                                    <iframe height="250" width="600" style={{ borderRadius: "10px" }} src="https://www.youtube.com/embed/y05IQfSoJn0?si=nTa2xyGI9HQK-9eD" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <iframe height="250" width="600" style={{ borderRadius: "10px" }} src="https://www.youtube.com/embed/CfojB8rywBI?si=mMCXR0AZCoB6SUjf" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <iframe height="250" width="600" style={{ borderRadius: "10px" }} src="https://www.youtube.com/embed/uMfNNGYunX0?si=Zs6axH0mvL6TtPiW" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                </Carousel.Item>
                                            </Carousel>
                                        </div>
                                    </div>
                                </> : ""
                            }

                            {currentUser.healthIssues[0] === "Diabetes Patient" ?
                                <>
                                    <div className='text-center my-5'>
                                        <div>
                                            <h1 className="text-center">Exercise for ({currentUser.healthIssues[0]})</h1>
                                            <Carousel indicators={false} prevIcon={<FaChevronLeft />}
                                                nextIcon={<FaChevronRight />}>
                                                <Carousel.Item>
                                                    <iframe height="250" width="600" style={{ borderRadius: "10px" }} src="https://www.youtube.com/embed/-uK8a80vyeI?si=0qpe5inzXmAFBCvW" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <iframe height="250" width="600" style={{ borderRadius: "10px" }} src="https://www.youtube.com/embed/zLhyXg0hlUI?si=J2BGvsDDsOA1_eVq" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <iframe height="250" width="600" style={{ borderRadius: "10px" }} src="https://www.youtube.com/embed/VNnI4H6L_NM?si=EEaH3Bu59LXpsgAj" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                </Carousel.Item>
                                            </Carousel>
                                        </div>
                                    </div>
                                </> : ""
                            }

                            {currentUser.healthIssues[0] === "Blood Pressure" ?
                                <>
                                    <div className='text-center my-5'>
                                        <div>
                                            <h1 className="text-center">Exercise for ({currentUser.healthIssues[0]})</h1>
                                            <Carousel indicators={false} prevIcon={<FaChevronLeft />}
                                                nextIcon={<FaChevronRight />}>
                                                <Carousel.Item>
                                                    <iframe height="250" width="600" style={{ borderRadius: "10px" }} src="https://www.youtube.com/embed/3ojB9kC6354?si=pltG4bX00sj2UuYw" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <iframe height="250" width="600" style={{ borderRadius: "10px" }} src="https://www.youtube.com/embed/zZlS_TRdXHM?si=xQu6rYiijEgavV6t" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <iframe height="250" width="600" style={{ borderRadius: "10px" }} src="https://www.youtube.com/embed/NDp_jRfVA5k?si=PRUi0kyHueRUOVDR" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                </Carousel.Item>
                                            </Carousel>
                                        </div>
                                    </div>
                                </> : ""
                            }

                            {currentUser.healthIssues[0] === "Heart Patient" ?
                                <>
                                    <div className='text-center my-5'>
                                        <div>
                                            <h1 className="text-center">Exercise for ({currentUser.healthIssues[0]})</h1>
                                            <Carousel indicators={false} prevIcon={<FaChevronLeft />}
                                                nextIcon={<FaChevronRight />}>
                                                <Carousel.Item>
                                                    <iframe height="250" width="600" style={{ borderRadius: "10px" }} src="https://www.youtube.com/embed/z7PGuInGMZ4?si=MIgKoXREegJ57lvu" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <iframe height="250" width="600" style={{ borderRadius: "10px" }} src="https://www.youtube.com/embed/TjzwohzLJgA?si=ZJiTDUfaDPiClKsf" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <iframe height="250" width="600" style={{ borderRadius: "10px" }} src="https://www.youtube.com/embed/CS7uNgsrlYA?si=c0g2Aj09xFhvomYx" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                                </Carousel.Item>
                                            </Carousel>
                                        </div>
                                    </div>
                                </> : ""
                            }


                        </div >
                    </Row>
                </Container >
            </section >
            <Footer />
        </>

    )
}

export default Plans