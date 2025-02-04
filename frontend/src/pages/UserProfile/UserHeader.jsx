import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import userImg from "../../assets/user.png"

const UserHeader = (props) => {
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out',
    });
  }, []);

  console.log(props.userDetails)

  return (
    <div ref={headerRef} className="text-center mt-[100px] mb-8">
      <img
        src={userImg}
        alt="User Avatar"
        className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white dark:border-slate-800 shadow-lg"
      />
      <h1 className="text-3xl font-bold">{props.userDetails.name || "Fetching"}</h1>
      <p className="text-gray-600 dark:text-gray-400">{props.userDetails.email || "Fetching"}</p>
    </div>
  );
};

export default UserHeader;