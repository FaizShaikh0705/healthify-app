import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import './Header.css';
import logo from './hlogo.jpeg';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/apiCalls";

const Header = () => {

    const currentUser = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout);
    };

    return (
        <>
            <nav className="navbar navbar-light fixed-top bg-border-btm bg-blue">
                <div className="container-fluid">
                    <div className="text-center Usericon">
                        <img src={logo} width="260" alt="icon" />
                    </div>
                    {currentUser && currentUser.currentUser ? (
                        <NavDropdown title={currentUser.currentUser.userName} id="username" >
                            <NavDropdown.Item onClick={logoutHandler} className="pe-5">
                                <a className="nav-signout text-primary"><i className="fas fa-power-off pr-3"></i><small>Sign-Out</small></a>
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <div className="nav-sign-in">
                            <a href="/login" className="nav-signin text-primary"><h4>Sign-In</h4></a>
                        </div >
                    )}
                </div >
            </nav >

        </>
    );
}



export default Header;