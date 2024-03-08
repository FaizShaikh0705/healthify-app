import React from 'react'
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import IMG1 from '../../assets/Ria-G-p-800.png'
import './Home.css'

const Home = () => {
  return (
    <>
      <Header />
      <section className="section">
        <div id="Ria-section" className="snap">
          <div className="content-wrapper">
            <div className="image-container">
              <img src={IMG1}
                loading="lazy"
                width="524"
                sizes="(max-width: 479px) 90vw, (max-width: 767px) 76vw, (max-width: 991px) 524px, (max-width: 1439px) 38vw, 524px"
                alt=""
                className="banner-1-2" />
            </div>
            <div className="text-wrapper">
              <div className="text-wrapper">
                <div className="text">Is it even possible to eat healthy while travelling?</div>
                <div className="just-healthify">
                  <div className="hashtag">
                    <div className="text grey _24-px">#JustHealthify</div>
                    <div className="text grey medium-text _24-px"> with</div>
                  </div>
                  <div className="text green">AI Coach Ria</div>
                </div>
              </div>
              <div className="action">
                <a href="/questions" className="button-prime btn btn-primary">
                  <div className="text-4 text-white">Get Started</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Button><a href='/questions' className='text-white'>Get Started</a></Button> */}
      <Footer />
    </>
  )
}

export default Home
