import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const PersonalQuestions = ({ className, onNext }) => {
    return (
        <>
            <Container className={className}>
                <Row className='justify-content-center mt-5'>
                    <h1>Personal Details</h1>
                    <Button onClick={onNext}>Continue</Button>                </Row>
            </Container>
        </>
    )
}

export default PersonalQuestions