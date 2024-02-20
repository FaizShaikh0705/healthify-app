import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { userRequest, isTokenSet } from '../../requestMethods';
import { useSelector, useDispatch } from 'react-redux';
import { setWeight, setHeight, setAge } from '../../redux/userRedux';


const BodyMeasures = ({ className, onNext, onBack }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleFormSubmit = async (values, actions) => {
        try {
            const userId = user.currentUser._id;
            const response = await userRequest.put(`/users/bodymeasures/${userId}`, {
                weight: values.weight,
                height: values.height,
                age: values.age,
            });
            dispatch(setWeight(response.data.weight));
            dispatch(setHeight(response.data.height));
            dispatch(setAge(response.data.age));
            console.log(response);
        } catch (error) {
            console.error('Error submitting form:', error);
            actions.setSubmitting(false);
        }
    };

    const payTypSte = async () => {
        try {
            const userId = user.currentUser._id;
            const weightElement = document.getElementById("weight");
            const heightElement = document.getElementById("height");
            const ageElement = document.getElementById("age");

            if (weightElement && heightElement && ageElement) {
                const weight = weightElement.value;
                const height = heightElement.value;
                const age = ageElement.value;

                const response = await userRequest.put(`/users/bodymeasures/${userId}`, {
                    weight: weight,
                    height: height,
                    age: age,
                });
                dispatch(setWeight(response.data.weight));
                dispatch(setHeight(response.data.height));
                dispatch(setAge(response.data.age));
                onNext();
            } else {
                console.error("One or more input elements not found.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };


    return (
        <>
            <Container className={className}>
                <Row className='justify-content-center mt-5'>
                    {/* <Button onClick={onBack}>Back</Button> */}
                    <div className="col-md-10 col-lg-01">
                        <div className="mt-4 px-5 py-4 bg-white border shadow-lg rounded signup-box">
                            <h1 className="text-center">Personal Details</h1>
                            <Formik
                                initialValues={{
                                    weight: user.currentUser?.weight ? user.currentUser.weight : '',
                                    height: user.currentUser?.height ? user.currentUser.height : '',
                                    age: user.currentUser?.age ? user.currentUser.age : '',
                                }}
                                validationSchema={Yup.object().shape({
                                    weight: Yup.number().required('Please enter your weight.'),
                                    height: Yup.number().required('Please enter your height.'),
                                    age: Yup.number().required('Please enter your age.'),
                                })}
                                onSubmit={handleFormSubmit}
                            >
                                {(formik) => (
                                    <Form method="post" className="my-5">
                                        <Form.Group className="mb-3" controlId="formBasicWeight">
                                            <Form.Label className="txt-lbl">Weight (kg)</Form.Label>
                                            <Field
                                                className={`form-control ${formik.touched.weight && formik.errors.weight ? 'is-invalid' : ''
                                                    } txt-border `}
                                                type="number"
                                                name="weight"
                                                id="weight"
                                                placeholder="Enter your weight"
                                            />
                                            <ErrorMessage
                                                name="weight"
                                                component="div"
                                                className="valid-clr invalid-feedback"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicHeight">
                                            <Form.Label className="txt-lbl">Height (cm)</Form.Label>
                                            <Field
                                                className={`form-control ${formik.touched.height && formik.errors.height ? 'is-invalid' : ''
                                                    } txt-border`}
                                                type="number"
                                                name="height"
                                                id="height"
                                                placeholder="Enter your height"
                                            />
                                            <ErrorMessage
                                                name="height"
                                                component="div"
                                                className="valid-clr invalid-feedback"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicAge">
                                            <Form.Label className="txt-lbl">Age</Form.Label>
                                            <Field
                                                className={`form-control ${formik.touched.age && formik.errors.age ? 'is-invalid' : ''
                                                    } txt-border`}
                                                type="number"
                                                name="age"
                                                id="age"
                                                placeholder="Enter your age"
                                            />
                                            <ErrorMessage
                                                name="age"
                                                component="div"
                                                className="valid-clr invalid-feedback"
                                            />
                                        </Form.Group>
                                        <Button className="btn-google" variant="outline-dark" onClick={() => payTypSte()}>
                                            Continue
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                    {/* <Button onClick={onNext}>Continue</Button> */}
                </Row>
            </Container>
        </>
    )
}

export default BodyMeasures;
