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
    console.log("diet Data", dietPlans)

    const FdietData = dietPlans.filter(obj => obj.type === currentUser.weightGoal && obj.for === currentUser.healthIssues[0])
    console.log(" Filtered diet Data", FdietData)


    const data = [
        { name: "Public", email: "asjdaj@hhjas.com" },
        { name: "Private", email: "asjdaj@hhjas.com" },
        { name: "Restricted", email: "asjdaj@hhjas.com" },
    ];

    const filteredData = data.filter(obj => obj.name === "Public");

    console.log("public", filteredData);



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