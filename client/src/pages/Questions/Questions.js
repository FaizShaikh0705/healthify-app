import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { LinkContainer } from 'react-router-bootstrap';
import PersonalQuestions from './PersonalQuestions';
import BodyMeasures from './BodyMeasures';
import HealthIssues from './HealthIssues';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './Questions.css'

const Questions = () => {

    const [currentStep, setCurrentStep] = useState("personal");

    const handleNext = () => {
        if (currentStep === "personal") {
            setCurrentStep("body");
        } else if (currentStep === "body") {
            setCurrentStep("health");
        } else if (currentStep === "health") {
            setCurrentStep("success");
        }
    };

    const handleBack = () => {
        if (currentStep === "body") {
            setCurrentStep("personal");
        } else if (currentStep === "health") {
            setCurrentStep("body");
        }
    };

    return (
        <>
            <Header />
            <section className="question-section">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <PersonalQuestions className={currentStep === 'personal' ? 'visible' : 'hidden'} onNext={handleNext} />
                            <BodyMeasures className={currentStep === 'body' ? 'visible' : 'hidden'} onNext={handleNext} onBack={handleBack} />
                            <HealthIssues className={currentStep === 'health' ? 'visible' : 'hidden'} onBack={handleBack} />
                        </Col>

                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default Questions