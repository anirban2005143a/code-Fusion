import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Privateroutes = ({ children }) => {
  const Authorization = localStorage.getItem("token");
  const [isverified, setIsverified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handlingverification = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_BACKEND_URL}/api/haxplore/user/checking_auth_token`,
        {
          Authorization,
        }
      );
      // console.log(response);
      if (response.data.success) {
        setIsverified(true);
        localStorage.setItem("islogin" , "true")
        toast.success("Token verified! Welcome to your private area.");
      } else {
        setIsverified(false);
        localStorage.setItem("islogin" , "false")
        toast.error("Unauthorized access. Please log in.");
      }
    } catch (error) {
      // console.error("Token verification failed:", error);
      setIsverified(false);
      localStorage.setItem("islogin" , "false")
      toast.error("Session timeout , Token has been expired,Login again");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handlingverification();
  }, []);

  useEffect(() => {
    if (!isLoading && !isverified) {
      navigate("/signin");
    }
  }, [isLoading, isverified, navigate]);

  if (isLoading) {
    return (
      <div className=" w-[100vw] h-[100vh] "
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      {isverified ? children : null}
    </>
  );
};

export default Privateroutes;   