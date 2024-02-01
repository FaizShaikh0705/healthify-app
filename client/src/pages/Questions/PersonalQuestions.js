import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userRequest } from '../../requestMethods'
import { useSelector, useDispatch } from 'react-redux';
import { setAddress, setContact } from '../../redux/userRedux';

const PersonalQuestions = ({ className, onNext }) => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const handleFormSubmit = async (values, actions) => {
        try {
            const userId = user.currentUser._id;
            const response = await userRequest.put(`/users/checkout/${userId}`, { address: values.address, contact: values.contact });
            dispatch(setAddress(response.data.address));
            dispatch(setContact(response.data.contact));
            console.log(response);
        } catch (error) {
            console.error("Error submitting form:", error);
            actions.setSubmitting(false);
        }
    };

    const payTypSte = async () => {

        try {
            const userId = user.currentUser._id;
            var contNo = document.getElementById("contactNo").value;
            var addr = document.getElementById("address").value;
            var city = document.getElementById("city").value;
            var state = document.getElementById("state").value;
            var postalCode = document.getElementById("postalCode").value;

            var addr = {
                address: document.getElementById("address").value,
                postalCode: document.getElementById("postalCode").value,
                city: document.getElementById("city").value,
                state: document.getElementById("state").value,
            }

            const response = await userRequest.put(`/users/checkout/${userId}`, { address: addr, contact: contNo });
            dispatch(setAddress(response.data.address));
            dispatch(setContact(response.data.contact));
            onNext()
            console.log(user);
        } catch (error) {
            console.error("Error submitting form:", error);
        }

    };

    return (
        <>
            <Container className={className}>
                <Row className='justify-content-center mt-5'>
                    <div className="col-md-6 col-lg-6">
                        <div className="mt-4 px-5 py-4 bg-white border shadow-lg rounded signup-box">
                            <h1 className='text-center'>Personal Details</h1>
                            <Formik
                                initialValues={{
                                    contact: user.currentUser?.contact
                                        ? { contact: user.currentUser.contact || "" }
                                        : { contact: "" },
                                    address: user.currentUser?.address
                                        ? {
                                            address: user.currentUser.address.address || "",
                                            postalCode: user.currentUser.address.postalCode || "",
                                            city: user.currentUser.address.city || "",
                                            state: user.currentUser.address.state || "",
                                        }
                                        : {
                                            address: "",
                                            postalCode: "",
                                            city: "",
                                            state: "",
                                        },
                                    postTimestamp: new Date().toUTCString(),
                                }}
                                validationSchema={Yup.object().shape({
                                    contact: Yup.object().shape({
                                        contact: Yup.string().required("Please enter your contact number."),
                                    }),
                                    address: Yup.object().shape({
                                        address: Yup.string().required("Please enter your street address."),
                                        postalCode: Yup.string().required("Please enter your postal code."),
                                        city: Yup.string().required("Please enter your city name."),
                                        state: Yup.string().required("Please enter your state name."),
                                    }),
                                })}
                                onSubmit={handleFormSubmit}
                            >
                                {(formik) => (
                                    <Form method="post" className="my-5">
                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Label className="txt-lbl">Contact No</Form.Label>
                                            <Field
                                                className={`form-control ${formik.touched.contact?.contact && formik.errors.contact?.contact
                                                    ? "is-invalid"
                                                    : ""
                                                    } txt-border `}
                                                type="number"
                                                name="contact.contact"
                                                id="contactNo"
                                                placeholder="Enter Contact Number"
                                            />
                                            <ErrorMessage
                                                name="contact.contact"
                                                component="div"
                                                className=" valid-clr invalid-feedback"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Label className="txt-lbl">Address</Form.Label>
                                            <Field
                                                className={`form-control ${formik.touched.address?.address && formik.errors.address?.address
                                                    ? "is-invalid"
                                                    : ""} txt-border`}
                                                type="text"
                                                name="address.address"
                                                id="address"
                                                placeholder="Enter your Address"
                                            />
                                            <ErrorMessage
                                                name="address.address"
                                                component="div"
                                                className=" valid-clr invalid-feedback"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="txt-lbl">Postal Code</Form.Label>
                                            <Field
                                                className={`form-control ${formik.touched.address?.postalCode && formik.errors.address?.postalCode
                                                    ? "is-invalid"
                                                    : ""} txt-border`}
                                                type="number"
                                                name="address.postalCode"
                                                id="postalCode"
                                                placeholder="Enter Postal code"
                                            />
                                            <ErrorMessage
                                                name="address.postalCode"
                                                component="div"
                                                className=" valid-clr invalid-feedback"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="txt-lbl">City</Form.Label>
                                            <Field
                                                className={`form-control ${formik.touched.address?.city && formik.errors.address?.city
                                                    ? "is-invalid"
                                                    : ""} txt-border`}
                                                type="text"
                                                name="address.city"
                                                id="city"
                                                placeholder="Enter City Name"
                                            />
                                            <ErrorMessage
                                                name="address.city"
                                                component="div"
                                                className=" valid-clr invalid-feedback"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="txt-lbl">State</Form.Label>
                                            <Field
                                                className={`form-control ${formik.touched.address?.state && formik.errors.address?.state
                                                    ? "is-invalid"
                                                    : ""} txt-border`}
                                                type="text"
                                                name="address.state"
                                                id="state"
                                                placeholder="Enter State Name"
                                            />
                                            <ErrorMessage
                                                name="address.state"
                                                component="div"
                                                className=" valid-clr invalid-feedback"
                                            />
                                        </Form.Group>
                                        <Button
                                            className='btn-google'
                                            variant="outline-dark"
                                            onClick={() => payTypSte()}
                                        > Continue</Button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default PersonalQuestions