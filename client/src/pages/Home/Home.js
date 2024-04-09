import React from 'react'
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import IMG1 from '../../assets/22222.jpg'
import IMG2 from '../../assets/CGM-Banner-p-800.png'
import IMG3 from '../../assets/11111.jpg'
import IMG4 from '../../assets/Snap-Banner-p-800.png'
import { useSelector, useDispatch } from 'react-redux';
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
                width="324"
                sizes="(max-width: 479px) 90vw, (max-width: 767px) 76vw, (max-width: 991px) 524px, (max-width: 1439px) 38vw, 524px"
                alt=""
                className="banner-1-2" />
            </div>
            <div className="text-wrapper">
              <div className="text-wrapper">
                <div className="text">Tailors meal plans based on individual profiles, considering factors like health conditions, dietary restrictions, and fitness goals.</div>
                <div className="just-healthify">
                  <div className="hashtag">
                    <div className="text grey _24-px">#JustHealthify</div>
                    <div className="text grey medium-text _24-px"> with</div>
                  </div>
                  <div className="text green">Fit Food</div>
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
      <section className="section">
        <div id="Ria-section" className="snap">
          <div className="content-wrapper">
            <div className="text-wrapper">
              <div className="text-wrapper">
                <div className="text">Utilizes artificial intelligence to provide accurate and science-backed nutritional recommendations, surpassing generic meal plans.</div>
                <div className="just-healthify">
                  <div className="hashtag">
                    <div className="text grey _24-px">#JustHealthify</div>
                    <div className="text grey medium-text _24-px"> with</div>
                  </div>
                  <div className="text green">Fit Food</div>
                </div>
              </div>
              <div className="action">
                <a href="/bmi" className="button-prime btn btn-primary">
                  <div className="text-4 text-white">Get Started</div>
                </a>
              </div>
            </div>
            <div className="image-container">
              <img src={IMG3}
                loading="lazy"
                width="524"
                sizes="(max-width: 479px) 90vw, (max-width: 767px) 76vw, (max-width: 991px) 524px, (max-width: 1439px) 38vw, 524px"
                alt=""
                className="banner-1-2" />
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div id="Ria-section" className="snap">
          <div className="content-wrapper">
            <div className="image-container">
              <img src={IMG2}
                loading="lazy"
                width="524"
                sizes="(max-width: 479px) 90vw, (max-width: 767px) 76vw, (max-width: 991px) 524px, (max-width: 1439px) 38vw, 524px"
                alt=""
                className="banner-1-2" />
            </div>
            <div className="text-wrapper">
              <div className="text-wrapper">
                <div className="text"> Gathers and analyzes user data to offer continuous improvements and a deeper understanding of nutritional needs, contributing to an evolving database of insights.</div>
                <div className="just-healthify">
                  <div className="hashtag">
                    <div className="text grey _24-px">#JustHealthify</div>
                    <div className="text grey medium-text _24-px"> with</div>
                  </div>
                  <div className="text green">Fit Food</div>
                </div>
              </div>
              <div className="action">
                <a href="/exercise" className="button-prime btn btn-primary">
                  <div className="text-4 text-white">Get Started</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div id="Ria-section" className="snap">
          <div className="content-wrapper">
            <div className="image-container">
              <img src={IMG4}
                loading="lazy"
                width="524"
                sizes="(max-width: 479px) 90vw, (max-width: 767px) 76vw, (max-width: 991px) 524px, (max-width: 1439px) 38vw, 524px"
                alt=""
                className="banner-1-2" />
            </div>
            <div className="text-wrapper">
              <div className="text-wrapper">
                <div className="text">Tailors meal plans based on individual profiles, considering factors like health conditions, dietary restrictions, and fitness goals.</div>
                <div className="just-healthify">
                  <div className="hashtag">
                    <div className="text grey _24-px">#JustHealthify</div>
                    <div className="text grey medium-text _24-px"> with</div>
                  </div>
                  <div className="text green">Fit Food</div>
                </div>
              </div>
              <div className="action">
                <a href="/plans" className="button-prime btn btn-primary">
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
