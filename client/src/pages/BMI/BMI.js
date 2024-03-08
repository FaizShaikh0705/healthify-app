import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
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

    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBMI] = useState(null);

    const calculateBMI = () => {
        const weightInKg = parseFloat(weight);
        const heightInM = parseFloat(height);

        if (weightInKg > 0 && heightInM > 0) {
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
            // Make a POST request to your backend API to save BMI data
            const response = await publicRequest.put(`/bmi/${userId}`, { weight, height, bmi });
            dispatch(setBMI(response.data.bmi))
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
        } else {
            return 'Obese';
        }
    };

    return (
        <>
            <Header />
            <section className="question-section">
                <Container>
                    <Row>
                        <div className="col-md-12">
                            <div className="mt-4 px-5 py-4 bg-white border shadow-lg rounded signup-box">
                                <h1 className="text-center">BMI Calculator</h1>
                                <div>
                                    {bmi !== null && (
                                        <div>
                                            <p className="text grey _24-px">Your BMI is: {bmi.toFixed(2)}</p>
                                            <p className="text grey _24-px">Interpretation: {interpretBMI()}</p>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label>Weight (kg): </label>
                                    <input
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>Height (m): </label>
                                    <input
                                        type="number"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                    />
                                </div>
                                <button className="btn btn-google" onClick={calculateBMI}>Calculate BMI</button>
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