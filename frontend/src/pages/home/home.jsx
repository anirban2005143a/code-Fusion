import React, { useEffect, useState } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import LandingPage from './landingPage'
import Navbar from '../../components/navbar/navbar'
import Features from './features'
import MousePointer from '../../components/mousePointer/mousePointer'
import RoomNoModal from '../../components/roomNoModal/roomNoModal';

const Home = () => {
    
    return (
        <div id='home' className=' bg-black relative overflow-x-hidden'>
            {/* navbar  */}
            <Navbar />

            {/* mousepointer  */}
            <MousePointer />

            {/* random shapes  */}
            <div className='z-0 scale-150 rotate-90 fixed -top-0 md:left-10 -left-50 md:w-[40%] md:h-[40%] w-80 h-80 '>
                <svg className='' id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
                            <stop id="stop1" stopColor="#1a1a1a" offset="0%"></stop>
                            <stop id="stop2" stopColor="#1a1a1a" offset="70%"></stop>
                        </linearGradient>
                    </defs>
                    <path fill="url(#sw-gradient)" d="M24.1,-35.2C29.6,-29.2,31.2,-19.9,32.8,-11.5C34.3,-3.1,35.6,4.5,33.8,11.3C32,18.2,27.1,24.3,20.9,29.9C14.7,35.6,7.4,40.7,0.2,40.4C-6.9,40.1,-13.9,34.4,-21.6,29.2C-29.3,24.1,-37.8,19.6,-40.9,12.7C-44,5.8,-41.5,-3.5,-38,-11.7C-34.4,-19.9,-29.7,-27.2,-23.2,-32.8C-16.7,-38.5,-8.3,-42.6,0.5,-43.3C9.3,-44,18.6,-41.2,24.1,-35.2Z" width="100%" height="100%" transform="translate(50 50)" strokeWidth="0" style={{ transition: "0.3s" }} stroke="url(#sw-gradient)">
                    </path>
                </svg>
            </div>
            <div className='z-0 scale-150 -rotate-15 fixed bottom-20 md:-right-20 -right-50 md:w-[40%] md:h-[40%] w-80 h-80'>
                <svg id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
                            <stop id="stop2" stopColor="#171717" offset="100%"></stop>
                            <stop id="stop1" stopColor="#171717" offset="0%"></stop>
                        </linearGradient>
                    </defs>
                    <path fill="url(#sw-gradient)" d="M18.5,-32.2C24.6,-28.6,30.6,-24.8,33.9,-19.5C37.2,-14.1,37.8,-7,36.8,-0.6C35.7,5.9,33.1,11.7,29.7,16.9C26.3,22.2,22.2,26.8,17.2,31.5C12.1,36.1,6.1,40.8,-0.5,41.7C-7.1,42.6,-14.2,39.7,-20.4,35.7C-26.6,31.8,-32,26.7,-35.7,20.5C-39.4,14.4,-41.4,7.2,-41,0.3C-40.5,-6.7,-37.6,-13.3,-33.6,-18.9C-29.6,-24.6,-24.5,-29.2,-18.8,-33C-13,-36.8,-6.5,-39.8,-0.1,-39.5C6.2,-39.3,12.5,-35.8,18.5,-32.2Z" width="100%" height="100%" transform="translate(50 50)" strokeWidth="0" style={{ transition: "0.3s" }} stroke="url(#sw-gradient)">
                    </path>
                </svg>
            </div>

            {/* <Navbar /> */}
            <LandingPage />
            
            <Features />
        </div>
    )
}

export default Home