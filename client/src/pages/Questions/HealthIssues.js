import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { userRequest, isTokenSet } from '../../requestMethods';
import { useSelector, useDispatch } from 'react-redux';
import { setHealthIssues } from '../../redux/userRedux';


const HealthIssues = ({ className, onNext, onBack }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleFormSubmit = async (values, actions) => {
        try {
            const userId = user.currentUser._id;
            const response = await userRequest.put(`/users/healthissues/${userId}`, {
                healthIssues: values.healthIssues,
            });
            dispatch(setHealthIssues(response.data.healthIssues));
            console.log(response);
            payTypSte();
        } catch (error) {
            console.error('Error submitting form:', error);
            actions.setSubmitting(false);
        }
    };

    const payTypSte = async () => {
        try {
            const userId = user.currentUser._id;
            const healthIssues = document.querySelectorAll('input[name="healthIssues"]:checked');
            const selectedHealthIssues = Array.from(healthIssues).map(issue => issue.value);

            const response = await userRequest.put(`/users/healthissues/${userId}`, {
                healthIssues: selectedHealthIssues,
            });

            dispatch(setHealthIssues(response.data.healthIssues));
            onNext();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };


    return (
        <Container className={className}>
            <Row className='justify-content-center mt-5'>
                <div className="col-md-10 col-lg-01">
                    <div className="mt-4 px-5 py-4 bg-white border shadow-lg rounded signup-box">
                        <h1 className="text-center">Health Issues</h1>
                        <Formik
                            initialValues={{
                                healthIssues: user.currentUser?.healthIssues || 'None',
                            }}
                            validationSchema={Yup.object().shape({
                                healthIssues: Yup.string().required('Select at least one health issue.'),
                            })}
                            onSubmit={handleFormSubmit}
                        >
                            {(formik) => (
                                <Form method="post" className="my-5">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="txt-lbl">Health Issues</Form.Label>
                                        <div className="form-check">
                                            <ErrorMessage
                                                name="healthIssues"
                                                component="div"
                                                className="valid-clr invalid-feedback"
                                            />
                                            <Field
                                                className={`form-check-input ${formik.touched.healthIssues &&
                                                    formik.errors.healthIssues
                                                    ? 'is-invalid'
                                                    : ''
                                                    }`}
                                                type="radio"
                                                name="healthIssues"
                                                value="Diabetes Patient"
                                                id="checkboxDiabetes"
                                            />
                                            <label className="form-check-label" htmlFor="checkboxDiabetes">
                                                Diabetes
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <Field
                                                className={`form-check-input ${formik.touched.healthIssues &&
                                                    formik.errors.healthIssues
                                                    ? 'is-invalid'
                                                    : ''
                                                    }`}
                                                type="radio"
                                                name="healthIssues"
                                                value="Cholesterol Patient"
                                                id="checkboxCholesterol"
                                            />
                                            <label className="form-check-label" htmlFor="checkboxCholesterol">
                                                Cholesterol
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <Field
                                                className={`form-check-input ${formik.touched.healthIssues &&
                                                    formik.errors.healthIssues
                                                    ? 'is-invalid'
                                                    : ''
                                                    }`}
                                                type="radio"
                                                name="healthIssues"
                                                value="Thyroid Patient"
                                                id="checkboxThyroid"
                                            />
                                            <label className="form-check-label" htmlFor="checkboxThyroid">
                                                Thyroid
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <Field
                                                className={`form-check-input ${formik.touched.healthIssues &&
                                                    formik.errors.healthIssues
                                                    ? 'is-invalid'
                                                    : ''
                                                    }`}
                                                type="radio"
                                                name="healthIssues"
                                                value="Blood Pressure"
                                                id="checkboxBloodPressure"
                                            />
                                            <label className="form-check-label" htmlFor="checkboxBloodPressure">
                                                Blood Pressure
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <Field
                                                className={`form-check-input ${formik.touched.healthIssues &&
                                                    formik.errors.healthIssues
                                                    ? 'is-invalid'
                                                    : ''
                                                    }`}
                                                type="radio"
                                                name="healthIssues"
                                                value="Heart Patient"
                                                id="checkboxHeartPatient"
                                            />
                                            <label className="form-check-label" htmlFor="checkboxHeartPatient">
                                                Heart Patient
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <Field
                                                className={`form-check-input ${formik.touched.healthIssues &&
                                                    formik.errors.healthIssues
                                                    ? 'is-invalid'
                                                    : ''
                                                    }`}
                                                type="radio"
                                                name="healthIssues"
                                                value="None"
                                                id="checkboxNone"
                                            />
                                            <label className="form-check-label" htmlFor="checkboxNone">
                                                None
                                            </label>
                                        </div>
                                    </Form.Group>
                                    <Button className="btn-google" variant="outline-dark" onClick={onBack}>
                                        Back
                                    </Button>
                                    <Button
                                        className="btn-google"
                                        variant="outline-dark"
                                        onClick={formik.handleSubmit}
                                    >
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

export default HealthIssues