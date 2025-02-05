import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { account } from "./AppWrite";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isload, setIsload] = useState(false);
  const navigate = useNavigate();

  const handleLoginGoogle = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_BACKEND_URL}/api/haxplore/user/tokengeneration`);
  
      localStorage.setItem("token", response.data.jwttoken);
  
      console.log("Token saved in localStorage.");
  
      console.log("Redirecting to Google login...");
  
      await account.createOAuth2Session(
        "google",
        `${import.meta.env.VITE_REACT_CLIENT_URL}`,
        `${import.meta.env.VITE_REACT_CLIENT_URL}/fail`
      );
      localStorage.setItem("islogin" , "true")
    } catch (error) {
      localStorage.setItem("islogin" , "false")
      toast.error(error.message)
      error.response && error.response.data && toast.error(error.response.data.error);
      console.error("Error during the login process:", error);
    }
  };

  const handlelogin = async (e) => {
    try {
      e.preventDefault();
      setIsload(true);
      // toast.success("login into the system");
      console.log("handling login");
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_BACKEND_URL}/api/haxplore/user/Login`,
        {
          email,
          password,
        }
      );
      console.log(response);
      console.log(response.data.user._id);
      localStorage.setItem("itemhai", response.data.user._id);
      localStorage.setItem("token", response.data.jwttoken);
      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("islogin" , "true")
      toast.success(response.data.message);
      console.log(response.data.user.isverified);
      if (response.data.user.isverified) {
        navigate("/editor");
        localStorage.setItem("islogin" , "true")
      } else {
        localStorage.setItem("islogin" , "false")
        navigate("/mobilenumberverication");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      error.response && error.response.data && toast.error(error.response.data.error);
      error.response && error.response.data && toast.error(error.response.data.message);
      setIsload(false);
    }
  };


  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
          <div className="flex flex-col items-center mb-6">
            <div className="text-blue-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m2 8H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Sign in</h2>
            <p className="text-gray-500">to continue to Docs</p>
          </div>
          <form onSubmit={handlelogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                required
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  // console.log(email);
                }}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  // console.log(password);
                }}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign In
            </button>
            {isload ? (
              <>
                {" "}
                <div className=" w-[100vw] h-[100vh] bg-[#00000026] backdrop-blur-[3px] fixed z-50 top-0 left-0"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
                </div>
              </>
            ) : (
              <></>
            )}
            <div className="text-center text-gray-500">or</div>
            <button
            onClick={handleLoginGoogle}
              type="button"
              className="w-full px-4 py-2 cursor-pointer text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Sign in with Google
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default SignInPage;
