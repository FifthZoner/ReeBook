import React from 'react';
import Hero from '../ui/hero'
import Navbar from '../ui/navbar';
import About from '../ui/about';
import Contact from '../ui/contact';
import Footer from '../ui/footer';
import UpperWaves from '../ui/waves/upperWaves';
import BottomWaves from '../ui/waves/bottomWaves';


const Welcome = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <UpperWaves />
            <About />
            <Contact />
            <BottomWaves />
            <Footer />
        </div>
    );
};

export default Welcome;