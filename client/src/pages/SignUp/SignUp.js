import React, { useState, useContext, useEffect } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import logo from '../../assets/hlogo.jpeg';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './SignUp.css';
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/apiCalls";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


function SignUp(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { isFetching, error, currentUser } = useSelector((state) => state.user);


  const handleFormSubmit = async (values, actions) => {
    try {
      register(dispatch, { username: values.username, password: values.password, email: values.email });
      alert("You have SignUp successfully");
    } catch (error) {
      console.error('Error submitting form:', error);
      actions.setSubmitting(false);
    }
  };


  if (currentUser) {
    return <Redirect to="/home" />;
  }



  return (
    <>
      <Header />
      <section className="auth py-4">
        <div className="authentication">
          <div className="container">
            <div className="text-center">
              {/* <img src={logo} width="300" alt="icon" /> */}
            </div>
            <div className="row justify-content-center">

              <div className="col-md-5 col-lg-5">
                <div className="mt-4 px-5 py-4 bg-white border shadow-lg rounded signup-box">
                  <h2 className="text-center">Sign Up</h2>
                  <Formik
                    initialValues={{ username: '', email: '', password: '' }}
                    validationSchema={Yup.object().shape({
                      username: Yup.string().required('Full Name is required'),
                      email: Yup.string().email('Invalid email').required('Email is required'),
                      password: Yup.string().required('Password is required')
                    })}
                    onSubmit={handleFormSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="form-group">
                          <label htmlFor="name">Full Name</label>
                          <Field type="text" className="form-control" id="name" name="username" placeholder="Enter a name" />
                          <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email address</label>
                          <Field type="text" className="form-control" id="email" name="email" placeholder="Enter an email" />
                          <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <Field type="password" className="form-control" id="password" name="password" placeholder="Enter a password" />
                          <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                        </div>
                        <div className="form-group">
                          <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-md btn-block waves-effect text-center m-b-20">
                            {isSubmitting ? 'Signing up...' : 'Sign up Now'}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                  <div className="or py-3">
                    <h3><span>or</span></h3>
                  </div>
                  <div className="row pt-3">
                    <div className="col-lg-12 text-center">
                      <p class="text-center">Have an account? <Link to="/login">Log in</Link></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );

}

export default SignUp;
