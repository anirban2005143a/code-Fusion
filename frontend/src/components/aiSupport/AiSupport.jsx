
import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ToastContainer, toast } from "react-toastify"
import { ImSpinner } from "react-icons/im";
import { IoMdCloseCircle } from "react-icons/io";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const AiSupport = (props) => {

    const sidebarRef = useRef(null);
    const [sidebarWidth, setSidebarWidth] = useState(300);
    const [prompt, setprompt] = useState("")
    const [output, setoutput] = useState("")
    const [IsDragging, setIsDragging] = useState(false)
    const [isLoading, setisLoading] = useState(false)

    // Function to close the sidebar
    const closeSidebar = () => {
        // setprompt("")
        // setoutput("")
        document.querySelector("#AiSupport").querySelector("textarea").value = ""
        gsap.to(sidebarRef.current, { x: "100%", duration: 0.5, ease: "power2.out" });
    };

    // Handle mouse down on the resize handle
    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    // Handle mouse move to resize the sidebar
    const handleMouseMove = (e) => {
        // console.log("dfvfbvg")
        const newWidth = window.innerWidth - e.clientX;
        if (newWidth >= 200 && newWidth <= 600) {
            setSidebarWidth(newWidth);
        }
        // console.log(newWidth)
    };

    // Handle mouse up to stop resizing
    const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleGenerateCode = async () => {
        try {
            // console.log(`${import.meta.env.VITE_REACT_FLASK_URL}/generate_code`)
            setisLoading(true)
            const response = await fetch(`${import.meta.env.VITE_REACT_FLASK_URL}/generate_code`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Set content type to JSON
                },
                body: JSON.stringify({ code_prompt: `language : ${props.language}\n code:${prompt}` }), // JSON payload
            });
            // console.log(response)
            setisLoading(false)
            if (!response.ok) {
                showToast(`HTTP error! Status: ${response.status}`, 1)
            }

            const data = await response.json();
            console.log(data)
            if (data.error) {
                showToast('some error occure please try again', 1)
            } else {
                // formatCodeWithLineBreaks(data.generated_code)
                // showToast('Code generated successfully', 0)
                console.log(typeof data.generated_code)
                const str = formatCodeWithLineBreaks(data.generated_code)
                // setoutput(str);
                // setoutput(data.generated_code);
            }
        } catch (error) {
            setisLoading(false)
            if (error.response && error.response.data) showToast(error.response.data.message, 1)
            else showToast(error.message, 1)
            // console.log(err.message);
        }
    };

    const formatCodeWithLineBreaks = (str) => {
        str = str.slice(3, str.length-2)
        console.log(str)
        setoutput(str)
    };

    //function to show alert
    const showToast = (message, err) => {
        if (err) {
            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    return (
        <>
            <ToastContainer />
            <div id="ai-support">
                <div
                    ref={sidebarRef}
                    style={{ width: `${sidebarWidth}px` }}
                    id="AiSupport"
                    className=" rounded-xl z-40 fixed top-[90px] right-0 min-h-[50vh] h-[70vh] max-h-[400px] overflow-x-visible overflow-hidden bg-gray-900 shadow-lg transform translate-x-full"
                >
                    <div className=" absolute h-full w-full overflow-auto ">

                        {/* Close button */}
                        <button button
                            onClick={closeSidebar}
                            className=" z-10 cursor-pointer fixed font-light m-3 top-0 right-0 w-12 h-12 text-white text-4xl pb-2 rounded-full "
                        >
                            <IoMdCloseCircle />
                        </button >

                        <div className=" relative w-full h-auto py-15  ">

                            {/* Resize handle */}
                            <div
                                onMouseDown={handleMouseDown}
                                className="absolute top-0 me-2 -left-[8px] w-3 h-full cursor-ew-resize bg-gray-700 hover:bg-blue-500"
                            />

                            {/* Text area */}
                            <div className="p-4" >
                                <textarea
                                    className="w-full h-32 p-2 bg-gray-800 text-white rounded min-h-20"
                                    placeholder="Type something..."
                                    value={prompt}
                                    onChange={(e) => {
                                        setprompt(e.target.value)
                                    }}
                                />
                            </div >

                            {/* Send button */}
                            <div className="p-4" >
                                <button onClick={() => {
                                    if (prompt && prompt !== "") handleGenerateCode()
                                }}
                                    disabled={isLoading}
                                    className="w-full bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                                    {isLoading ? <ImSpinner className=" animate-spin text-xl mx-auto" /> : "Ask AI"}
                                </button>
                            </div >

                            {/* output from ai  */}
                            {output && output !== "" && <div className="p-2 text-white rounded-2xl border-2 border-slate-700 mx-2">
                                <SyntaxHighlighter language={props.language} style={oneDark}>
                                    {output}
                                </SyntaxHighlighter>
                            </div>}

                        </div>

                    </div>
                </div >

            </div>
        </>
    );
};

export default AiSupport;