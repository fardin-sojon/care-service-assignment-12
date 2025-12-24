import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-neutral text-neutral-content">
            <div className="footer p-10 container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                <aside>
                    <div className="text-3xl font-bold text-primary mb-2">Care Service</div>
                    <p>Reliable Care Service Platform.<br/>Providing trusted care since 2024</p>
                </aside> 
                <nav>
                    <header className="footer-title">Services</header> 
                    <a className="link link-hover">Baby Care</a> 
                    <a className="link link-hover">Elderly Care</a> 
                    <a className="link link-hover">Special Needs</a> 
                    <a className="link link-hover">Mental Support</a>
                </nav> 
                <nav>
                    <header className="footer-title">Company</header> 
                    <a className="link link-hover">About us</a> 
                    <a className="link link-hover">Contact</a> 
                    <a className="link link-hover">Jobs</a> 
                    <a className="link link-hover">Press kit</a>
                </nav> 
                <nav>
                    <header className="footer-title">Legal</header> 
                    <a className="link link-hover">Terms of use</a> 
                    <a className="link link-hover">Privacy policy</a> 
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
