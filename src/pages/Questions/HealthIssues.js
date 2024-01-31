import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const HealthIssues = ({ className, onNext, onBack }) => {
    return (
        <Container className={className}>
            <Row className='justify-content-center mt-5'>
                <Button onClick={onBack}>Continue</Button>
                <h1>Health Issues</h1>
                {/* <Button onClick={onNext}>Continue</Button> */}
            </Row>
        </Container>
    )
}

export default HealthIssues