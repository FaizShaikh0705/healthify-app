import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { publicRequest } from "../../requestMethods";
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const Plans = () => {

    const [dietPlan, setDietPlan] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dietPlans, setDietPlans] = useState([]);
    const [healthIssue, setHealthIssue] = useState('');


    const [selectedOrder, setSelectedOrder] = useState(null);
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        const fetchDietPlans = async () => {
            try {
                const response = await publicRequest.get(`/diet/${currentUser.healthIssues[0]}/${currentUser.weightGoal}`);
                setDietPlans(response.data);
                console.log("filtered Data", response.data)
            } catch (error) {
                console.error("Error fetching diet plans:", error);
            }
        };

        if (currentUser.healthIssues.length > 0 && currentUser.weightGoal) {
            fetchDietPlans();
        }
    }, [currentUser]);


    return (
        <>
            <Header />
            <section className="question-section">
                <Container>
                    <Row>
                        <div className="col-md-12">
                            <div className="mt-4 px-5 py-4 bg-white border shadow-lg rounded signup-box">
                                <h1 className="text-center">Personal Diet Details</h1>
                                {dietPlans.length === 0 ? (
                                    <p>No diet plans found for your profile</p>
                                ) : (
                                    dietPlans.map((dietPlan, index) => (
                                        <div key={index}>
                                            <h3>Type: {dietPlan.type}</h3>
                                            <h3>For: {dietPlan.for}</h3>
                                            <h3>Meals:</h3>
                                            <ul>
                                                {Object.entries(dietPlan.meals).map(([mealType, foods], index) => (
                                                    <li key={index}>
                                                        <strong>{mealType.replace('_', ' ').toUpperCase()}</strong>: {foods.join(', ')}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>

    )
}

export default Plans