import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import UserHeader from './UserHeader';
import UserGallery from './UserGallery';
import UserFooter from './UserFooter';
import Navbar from '../../components/navbar/navbar';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"

function UserProfile() {
  const appRef = useRef(null);

  const [userDetails, setuserDetails] = useState({})

  const fetchUserDetails = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_BACKEND_URL}/api/haxplore/user/fetchUserData`,
        {
          email: localStorage.getItem("email"),
          Authorization: localStorage.getItem("token")
        }
      );
      setuserDetails(res.data.userDetails)
      console.log(res)
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(error)
    }

  }

  useEffect(() => {
    // GSAP animations on page load
    gsap.from(appRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  useEffect(() => {
    fetchUserDetails()
  }, [])
  

  return (
    <div ref={appRef} className="min-h-screen bg-gray-900 text-gray-900 dark:text-white overflow-x-hidden">
      <Navbar />
      <ToastContainer/>
      <div className="container mx-auto px-4 py-8 ">
        <UserHeader userDetails={userDetails}/>
        <UserGallery />
        <UserFooter userDetails={userDetails} />
      </div>
    </div>
  );
}

export default UserProfile;