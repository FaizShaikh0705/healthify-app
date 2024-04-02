import React, { useState, useEffect } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import logo from '../../assets/hlogo.jpeg';
import './Login.css';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error, currentUser } = useSelector((state) => state.user);

  const handleFormSubmit = async (values, actions) => {
    try {
      login(dispatch, { email: values.email, password: values.password });
      alert("You have login successfully");
    } catch (error) {
      console.error('Error submitting form:', error);
      actions.setSubmitting(false);
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
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
                  <h2 className="text-center">Login</h2>
                   {error && <div className="alert alert-danger">{error}</div>}
                  <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string().email('Invalid email').required('Email is required'),
                      password: Yup.string().required('Password is required')
                    })}
                    onSubmit={handleFormSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form> {/* Include Form component here */}
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
                            {isSubmitting ? 'Logging in...' : 'Login Now'}
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
                      <p class="text-center"> Don't have an account?  <Link to="/SignUp">Sign up</Link></p>
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

export default Login;
