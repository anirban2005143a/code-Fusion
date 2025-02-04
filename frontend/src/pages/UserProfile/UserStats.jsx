import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const UserStats = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    gsap.from(statsRef.current.children, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      delay: 1,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div ref={statsRef} className="flex justify-around mb-8">
      <div className="text-center">
        <p className="text-2xl font-bold">1.2K</p>
        <p className="text-gray-600 dark:text-gray-400">Followers</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold">356</p>
        <p className="text-gray-600 dark:text-gray-400">Posts</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold">789</p>
        <p className="text-gray-600 dark:text-gray-400">Following</p>
      </div>
    </div>
  );
};

export default UserStats;