import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const UserGallery = () => {
  const galleryRef = useRef(null);

  const [allCodes, setallCodes] = useState([])

  useEffect(() => {
    gsap.from(galleryRef.current.children, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 1,
      delay: 1.5,
      ease: 'power3.out',
    });
  }, []);

  const fetchUserCode = async () => {
    console.log(localStorage.getItem("itemhai"))
    try {

      const res = await fetch(`${import.meta.env.VITE_REACT_BACKEND_URL}/api/haxplore/user/fetchmycodes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: localStorage.getItem("itemhai")
        })
      })

      // console.log(res)
      const data = await res.json()
      // console.log(data)
      setallCodes(data.data)
    } catch (error) {
      console.log(error.message)
      toast(error.message)
    }

  }

  useEffect(() => {
    fetchUserCode()
  }, [])
  console.log(allCodes)


  return (
    <>
      <ToastContainer />
      <div ref={galleryRef} className="flex flex-wrap justify-center items-center mb-8">
        {allCodes.map((item) => (
          <div
            key={item._id}
            className="bg-white md:w-[30%] sm:w-[40%] w-full h-[300px] overflow-auto dark:bg-slate-800 rounded-lg shadow-lg m-4 p-4"
          >
            <h3 className=' text-xl font-bold text-white py-1'>{item.title}</h3>
            <p className='text-sm font-light py-1'>{item.createdAt.split("T")[0]}</p>
            {/* <p className=' text-lg font-semibold py-3 '>{item.code}</p> */}
            <pre>
              <code>
                {item.code}
              </code>
            </pre>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserGallery;