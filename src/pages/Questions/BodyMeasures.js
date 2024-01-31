import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const BodyMeasures = ({ className, onNext, onBack }) => {
    return (
        <>
            <Container className={className}>
                <Row className='justify-content-center mt-5'>
                    <Button onClick={onBack}>Continue</Button>
                    <h1>Body Measures</h1>
                    <Button onClick={onNext}>Continue</Button>
                </Row>
            </Container>
        </>
    )
}

export default BodyMeasures