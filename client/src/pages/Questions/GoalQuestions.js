import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { userRequest, isTokenSet } from '../../requestMethods';
import { useSelector, useDispatch } from 'react-redux';
import { setWeightGoal, setTargetWeight, setExerciseFrequency, setMealsPerDay, setDietRating, setRestaurantFrequency, setVegetarian } from '../../redux/userRedux';

const GoalQuestions = ({ className, onNext, onBack }) => {
    const history = useHistory();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleFormSubmit = async (values, actions) => {
        try {
            const userId = user.currentUser._id;
            const response = await userRequest.put(`/users/weightgoal/${userId}`, {
                weightGoal: values.weightGoal,
                targetWeight: values.targetWeight,
                exerciseFrequency: values.exerciseFrequency,
                mealsPerDay: values.mealsPerDay,
                dietRating: values.dietRating,
                restaurantFrequency: values.restaurantFrequency,
                vegetarian: values.vegetarian,
            });
            dispatch(setWeightGoal(response.data.weightGoal));
            dispatch(setTargetWeight(response.data.targetWeight));
            dispatch(setExerciseFrequency(response.data.weightGoal));
            dispatch(setMealsPerDay(response.data.mealsPerDay));
            dispatch(setDietRating(response.data.dietRating));
            dispatch(setRestaurantFrequency(response.data.restaurantFrequency));
            dispatch(setVegetarian(response.data.vegetarian));
            // onNext();
            alert("Details successfully added");
            window.location.reload();
            history.push('/plans');
        } catch (error) {
            console.error('Error submitting form:', error);
            actions.setSubmitting(false);
        }
    };

    const payTypSte = async (values) => {
        try {
            const userId = user.currentUser._id;
            const response = await userRequest.put(`/users/weightgoal/${userId}`, {
                weightGoal: values.weightGoal,
                targetWeight: values.targetWeight,
                exerciseFrequency: values.exerciseFrequency,
                mealsPerDay: values.mealsPerDay,
                dietRating: values.dietRating,
                restaurantFrequency: values.restaurantFrequency,
                vegetarian: values.vegetarian,
            });

            dispatch(setWeightGoal(values.weightGoal));
            dispatch(setTargetWeight(values.targetWeight));
            // onNext();
            alert("Details successfully added");
            history.push('/plans');
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };


    return (
        <Container className={className}>
            <Row className='justify-content-center mt-5'>
                <div className="col-md-10 col-lg-01">
                    <div className="mt-4 px-5 py-4 bg-white border shadow-lg rounded signup-box">
                        <h1 className="text-center">Weight Goal</h1>
                        <Formik
                            initialValues={{
                                weightGoal: user.currentUser?.weightGoal || 'Weight Loss',
                                targetWeight: user.currentUser?.targetWeight || '',
                                exerciseFrequency: '',
                                mealsPerDay: '',
                                dietRating: '',
                                restaurantFrequency: '',
                                vegetarian: '',
                            }}
                            validationSchema={Yup.object().shape({
                                weightGoal: Yup.string().required('Weight goal is required'),
                                targetWeight: Yup.number().positive('Target weight must be positive').required('Target weight is required'),
                                exerciseFrequency: Yup.string().required('Exercise frequency is required'),
                                mealsPerDay: Yup.number().required('Number of meals per day is required'),
                                dietRating: Yup.number().required('Diet rating is required'),
                                restaurantFrequency: Yup.string().required('Restaurant frequency is required'),
                                vegetarian: Yup.string().required('Vegetarian preference is required'),
                            })}
                            onSubmit={handleFormSubmit}
                        >
                            {(formik) => (
                                <Form method="post" className="my-5">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="txt-lbl">Weight Goal</Form.Label>
                                        <div>
                                            <div className="form-check form-check-inline">
                                                <Field
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="weightGoal"
                                                    value="Weight Loss"
                                                    id="radioLoss"
                                                />
                                                <label className="form-check-label" htmlFor="radioLoss">Weight Loss</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <Field
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="weightGoal"
                                                    value="Weight Gain"
                                                    id="radioGain"
                                                />
                                                <label className="form-check-label" htmlFor="radioGain">Weight Gain</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <Field
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="weightGoal"
                                                    value="Maintenance"
                                                    id="radioGain"
                                                />
                                                <label className="form-check-label" htmlFor="radioMaintain">Weight Maintain</label>
                                            </div>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="txt-lbl">Target Weight (in kg or lbs)</Form.Label>
                                        <Field
                                            className={`form-control ${formik.touched.targetWeight && formik.errors.targetWeight ? 'is-invalid' : ''}`}
                                            type="text"
                                            name="targetWeight"
                                            id="targetWeight"
                                            placeholder="Enter target weight"
                                        />
                                        <ErrorMessage
                                            name="targetWeight"
                                            component="div"
                                            className="valid-clr invalid-feedback"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="txt-lbl">How often do you do exercise?</Form.Label>
                                        <Field
                                            className="form-control"
                                            as="select"
                                            name="exerciseFrequency"
                                        >
                                            <option value="">Select frequency</option>
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="occasionally">Occasionally</option>
                                            <option value="rarely">Rarely</option>
                                            <option value="never">Never</option>
                                        </Field>
                                        <ErrorMessage name="exerciseFrequency" component="div" className="valid-clr invalid-feedback" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="txt-lbl">How many meals do you eat in a day?</Form.Label>
                                        <Field
                                            className="form-control"
                                            type="number"
                                            name="mealsPerDay"
                                            min="1"
                                        />
                                        <ErrorMessage name="mealsPerDay" component="div" className="valid-clr invalid-feedback" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="txt-lbl">How would you rate your current diet habit?</Form.Label>
                                        <Field
                                            className="form-control"
                                            type="number"
                                            name="dietRating"
                                            min="1"
                                            max="10"
                                        />
                                        <ErrorMessage name="dietRating" component="div" className="valid-clr invalid-feedback" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="txt-lbl">How often do you eat in a restaurant?</Form.Label>
                                        <Field
                                            className="form-control"
                                            as="select"
                                            name="restaurantFrequency"
                                        >
                                            <option value="">Select frequency</option>
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="rarely">Rarely</option>
                                        </Field>
                                        <ErrorMessage name="restaurantFrequency" component="div" className="valid-clr invalid-feedback" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="txt-lbl">Vegetarian or Non-vegetarian?</Form.Label>
                                        <Field
                                            className="form-control"
                                            as="select"
                                            name="vegetarian"
                                        >
                                            <option value="">Select option</option>
                                            <option value="vegetarian_meals">Vegetarian</option>
                                            <option value="non_vegetarian_meals">Non-vegetarian</option>
                                        </Field>
                                        <ErrorMessage name="vegetarian" component="div" className="valid-clr invalid-feedback" />
                                    </Form.Group>
                                    <Button className="btn-google" variant="outline-dark" onClick={onBack}>
                                        Back
                                    </Button>
                                    <Button className="btn-google" variant="outline-dark" onClick={() => payTypSte(formik.values)}>
                                        Continue
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </Row>
        </Container>
    )
}

export default GoalQuestions