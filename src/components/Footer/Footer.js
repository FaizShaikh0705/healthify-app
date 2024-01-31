import React from 'react'
import Logo from '../../assets/hlogo.jpeg'
import './Footer.css';

const Footer = () => {
    return (
        <>
            <div className="footer-body mt-4">
                <footer>
                    <div className="footer-content text-center">
                        <div className="footer-logo">
                            <img src={Logo} width="260" alt="Movement logo" />
                        </div>
                        <div className="name">Movement</div>
                        <div className="made-with-love">Made with ❤️ by Prajwal Jadhav</div>
                        <div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer