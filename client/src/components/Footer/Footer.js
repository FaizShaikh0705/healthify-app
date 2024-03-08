import React from 'react'
import Logo from '../../assets/fit-food.png'
import './Footer.css';

const Footer = () => {
    return (
        <>
            <div className="footer-body mt-4 bg-border-top">
                <footer className='my-3'>
                    <div className="footer-content text-center">
                        <div className="footer-logo">
                            <img src={Logo} width="160" alt="Movement logo" />
                        </div>
                        {/* <div className="name">Movement</div> */}
                        <div className="made-with-love">Made with ❤️ by Faiz Shaikh</div>
                        <div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer