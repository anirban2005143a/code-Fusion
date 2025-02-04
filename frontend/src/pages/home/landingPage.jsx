import React, { useEffect, useRef } from 'react'
import gsap from "gsap"
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {

    const naviagte = useNavigate()
    const landingRef = useRef()

    useEffect(() => {

        if (landingRef.current) {
            gsap.fromTo(landingRef.current.querySelector(".brandName .code"), {
                y: -500,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 2,
                delay: 0,
                ease: "bounce.out",
            })

            gsap.fromTo(landingRef.current.querySelector(".brandName .editor"), {
                x: 500,
                opacity: 0,
            }, {
                x: 0,
                opacity: 1,
                duration: 2,
                ease: "back.out(1.5)",
            })

            gsap.fromTo(landingRef.current.querySelector(".intoduction"), {
                x: -200,
                opacity: 0,
            }, {
                x: 0,
                opacity: 1,
                duration: 2,
                delay: 0.6,
                ease: "power3.out",
            })

            gsap.fromTo(landingRef.current.querySelector(".getStartedBtn"), {
                y: 100,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 1.5,
                delay: 0,
                ease: "power3.out",
            })
        }

    }, [landingRef.current])


    return (
        <div id='landingPage' ref={landingRef} className=' h-screen bg-cover bg-right bg-[#000000] bg-blend-darken flex flex-col  '>
            <div className=" w-full h-[50%] z-10 relative md:px-8 px-2 brandName  font-bold  pt-[100px] flex md:flex-row flex-col justify-end items-center gap-[50px]">
                <p className='text-neutral-700 sm:text-[9.5rem] text-8xl code' >CODE</p>
                <p className=' playfair-display-font sm:text-7xl text-6xl editor'>FUSION</p>
            </div>
            <div className=" w-full h-[50%] flex flex-col items-start justify-center ">
                <p className='md:w-[60%] sm:w-[80%] w-full z-10 relative intoduction text-white text-[1.2rem] py-4 md:px-8 px-4  font-extralight'>
                    The AI-Assisted Code Editor is a lightweight, smart environment for real-time collaboration and AI-driven assistance. It offers auto-completion, syntax highlighting, AI-powered documentation, secure authentication, multi-user editing, and a customizable UI for a seamless coding experience.                </p>
                <div className='getStartedBtn py-4'>
                    <div className=" md:px-8 px-4 flex sm:justify-start justify-center items-center">
                        <div className="relative group">
                            <button
                                onClick={() => {
                                    naviagte("/editor")
                                }}
                                className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                            >
                                <span
                                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9795f0]  to-[#fbc8d4] p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                ></span>

                                <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                                    <div className="relative z-10 flex items-center space-x-2">
                                        <span className="transition-all duration-500 group-hover:translate-x-1"
                                        >Start Coding</span>
                                        <svg
                                            className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                                            data-slot="icon"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                                fillRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                </span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default LandingPage