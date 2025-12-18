import React from 'react'
import HeroSection from '../components/Home/HeroSection'
import Features from '../components/Home/Features'
import Testimonials from '../components/Home/Testimonials'
import CallToAction from '../components/Home/CallToAction'

function Home() {
    return (
        <>
            <HeroSection />
            <div className='px-3'>
                <Features />
                <Testimonials />
            </div>
            <CallToAction />
        </>
    )
}

export default Home