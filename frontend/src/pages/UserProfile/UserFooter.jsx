import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const UserFooter = (props) => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.from(footerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 2,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div ref={footerRef} className="text-center text-gray-600 dark:text-gray-400">
      <p>© 2023 {props.userDetails.name}. All rights reserved.</p>
    </div>
  );
};

export default UserFooter;