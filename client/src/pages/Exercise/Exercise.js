import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import "./Exercise.css"
import axios from 'axios';


const Exercise = () => {
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchExercises();
    }, []);

    const fetchExercises = async () => {
        try {
            const response = await fetch('https://exercisedb.p.rapidapi.com/exercises', {
                headers: {
                    'X-RapidAPI-Key': 'dda25a0db9msh23c2be3cd3778d6p17ea31jsn742136c66ecf',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setExercises(data);
                setFilteredExercises(data);
            } else {
                throw new Error('Failed to fetch exercises');
            }
        } catch (error) {
            console.error('Error fetching exercises:', error);
        }
    };

    const handleSearch = () => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const searchResults = exercises.filter((exercise) => {
            return (
                exercise.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                exercise.bodyPart.toLowerCase().includes(lowerCaseSearchTerm) ||
                exercise.target.toLowerCase().includes(lowerCaseSearchTerm)
            );
        });
        setFilteredExercises(searchResults);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setFilteredExercises(exercises);
    };

    const handleCardClick = (exercise) => {
        // Handle click event for exercise card
        console.log('Clicked exercise:', exercise);
    };

    // Define ExerciseCard component
    const ExerciseCard = ({ exercise }) => {
        return (
            <div className="col-lg-4 session-card exercise-container">
                <div className="card activity-card1 shadow mb-3" style={{ width: "100%", padding: "0px 10px" }} onClick={() => handleCardClick(exercise)}>
                    <img src={exercise.gifUrl} alt={exercise.name} />
                    <h3>{exercise.name}</h3>
                    <p>Body Part: {exercise.bodyPart}</p>
                    <p>Target: {exercise.target}</p>
                </div>
            </div>
        );
    };

    return (
        <>
            <Header />
            <section className="question-section">
                <Container>
                    <Row className='justify-content-center mt-5'>
                        <div className="col-md-10">
                            <div>
                                <input
                                    className='search-bar'
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search exercises..."
                                />
                                <button className='btn-google'
                                    variant="outline-dark" onClick={handleSearch}>Search</button>
                                <button className='btn-google'
                                    variant="outline-dark" onClick={clearSearch}>Clear</button>
                                <Row className='justify-content-center mt-5'>
                                    {filteredExercises.map((exercise) => (
                                        <ExerciseCard key={exercise.id} exercise={exercise} />
                                    ))}
                                </Row>
                            </div>
                        </div>
                    </Row>
                </Container>
            </section >
            <Footer />
        </>
    )
}

export default Exercise