import React from 'react'
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

const Home = () => {
  return (
    <>
      <Header />
      <div style={{ marginTop: "100px", height: "70vh" }}>Home</div>
      <Button><a href='/questions'>Get Started</a></Button>
      <Footer />
    </>
  )
}

export default Home
