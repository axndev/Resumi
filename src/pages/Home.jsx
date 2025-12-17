import React from 'react'
import HeroSection from '../components/HeroSection'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'

function Home() {
    return (
        <>
            <HeroSection />
            <Features />
            <Testimonials />
            <CallToAction />
        </>
    )
}

export default Home