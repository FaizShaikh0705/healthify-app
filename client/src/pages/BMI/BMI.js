import React, { useState, useEffect } from 'react';
import { Container, Row, Form, Button, ListGroup } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { publicRequest } from "../../requestMethods";
import { useSelector, useDispatch } from 'react-redux';
import { setBMI } from '../../redux/userRedux';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './BMI.css'

const BMI = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const height = useSelector((state) => state.user.currentUser.height);
    const targetWeight1 = useSelector((state) => state.user.currentUser.targetWeight);
    const [weightDifference, setWeightDifference] = useState(null);

    const [weight, setWeight] = useState('');
    // const [height, setHeight] = useState('');
    const [latestBMI, setLatestBMI] = useState(null);
    const [bmiHistory, setBMIHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bmi, setBMI] = useState(null);

    useEffect(() => {
        const fetchBMIHistory = async () => {
            try {
                const userId = user.currentUser._id;
                const response = await publicRequest.get(`/users/bmical/${userId}`);
                setBMIHistory(response.data.bmical);
                console.log("bmical", response.data.bmical)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching BMI history:', error);
                setLoading(false);
            }
        };

        fetchBMIHistory();
    }, []);

    useEffect(() => {
        const fetchLatestBMI = async () => {
            try {
                const userId = user.currentUser._id;
                // Make a GET request to fetch the latest BMI data for the user
                const response = await publicRequest.get(`/users/stats/${userId}`);
                console.log("bmi", response.data)
                setLatestBMI(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching latest BMI:', error);
                setLoading(false);
            }
        };

        fetchLatestBMI();
    }, []);

    useEffect(() => {
        if (latestBMI && targetWeight1) {
            const recentWeight = parseFloat(latestBMI.weight);
            const difference = recentWeight - parseFloat(targetWeight1);
            setWeightDifference(difference.toFixed(2));
        }
    }, [latestBMI, targetWeight1]);


    const calculateBMI = () => {
        const weightInKg = parseFloat(weight);
        const heightInCm = parseFloat(height);

        if (weightInKg > 0 && heightInCm > 0) {
            // Convert height from cm to meters
            const heightInM = heightInCm / 100;
            const bmiValue = weightInKg / (heightInM * heightInM);
            setBMI(bmiValue.toFixed(2));
            saveBMI(weightInKg, heightInM, bmiValue.toFixed(2));
        } else {
            setBMI(null);
        }
    };


    const saveBMI = async (weight, height, bmi) => {
        try {
            const userId = user.currentUser._id;
            const response = await publicRequest.put(`/users/bmi/${userId}`, { weight, bmi });
            dispatch(setBMI(response.data.bmi));
        } catch (error) {
            console.error("Error saving BMI data:", error);
        }
    };

    const interpretBMI = () => {
        if (bmi === null) {
            return 'Please enter valid weight and height';
        } else if (bmi < 18.5) {
            return 'Underweight';
        } else if (bmi < 25) {
            return 'Normal weight';
        } else if (bmi < 30) {
            return 'Overweight';
        }
    };

    return (
        <>
            <Header />
            <section className="question-section">
                <Container>
                    <Row>
                        <div className="col-md-12">
                            {weightDifference !== null && (
                                <p className="text grey _24-px">To achieve your taget weight : {weightDifference} kg</p>
                            )}
                            <div className="mt-4 px-5 py-4 bg-white border shadow-lg rounded signup-box">
                                <h1 className="text-center">BMI Calculator</h1>
                                <div>
                                    {bmi !== null && (
                                        <div>
                                            <p className="text grey _24-px">Your BMI is: {bmi}</p>
                                            <p className="text grey _24-px">Interpretation: {interpretBMI()}</p>
                                        </div>
                                    )}
                                </div>
                                <Form>
                                    <Form.Group controlId="formWeight">
                                        <Form.Label>Weight (kg)</Form.Label>
                                        <Form.Control type="number" placeholder="Enter weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="formHeight">
                                        <Form.Label>Height (cm)</Form.Label>
                                        <Form.Control type="number" placeholder={height} value={height} readOnly />
                                    </Form.Group>
                                </Form>
                                <button className="btn btn-google mt-3" onClick={calculateBMI}>Calculate BMI</button>
                            </div>
                            <div className="mt-4 px-5 py-4 bg-white border shadow-lg rounded signup-box">
                                <h2 className="text-center">BMI History</h2>
                                <ListGroup>
                                    {Object.entries(bmiHistory).sort((a, b) => new Date(b[1].createdAt) - new Date(a[1].createdAt)).slice(0, 10).map((entry, index) => (
                                        <ListGroup.Item key={index}>
                                            BMI: {entry[1].bmi} | Weight: {entry[1].weight} kg | Date: {new Date(entry[1].createdAt).toLocaleDateString()}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>
                        </div>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default BMI