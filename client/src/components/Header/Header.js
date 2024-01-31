import React from 'react';
import './Header.css';
import logo from './hlogo.jpeg';
import fire from '../../config/Fire';

const Header = () => {


    return (
        <>
            <nav className="navbar navbar-light fixed-top bg-border-btm bg-blue">
                <div className="container-fluid">
                    <div className="text-center Usericon">
                        <img src={logo} width="260" alt="icon" />
                    </div>
                    <div className="nav-sign-out">
                        <a className="nav-signout text-primary" onClick={() => fire.auth().signOut()}><i className="fas fa-power-off pr-3"></i><small>Sign-Out</small></a>
                    </div>
                </div>
            </nav>

        </>
    );
}



export default Header;