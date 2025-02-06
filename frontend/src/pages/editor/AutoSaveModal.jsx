import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AutoSaveModal = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [codeTitle, setcodeTitle] = useState("")
    const [loading, setloading] = useState(false)

    // function to save code 
    const saveCode = async () => {
        try {
            console.log({
                title: codeTitle,
                code: props.code,
                id: localStorage.getItem("itemhai") || "notKnow",
            })
            setloading(true)
            const res = await axios.post(`${import.meta.env.VITE_REACT_BACKEND_URL}/api/haxplore/user/saveCode`,
                {
                    title: codeTitle,
                    code: props.code,
                    id: localStorage.getItem("itemhai") || "notKnow",
                }
            )
            setloading(false)
            console.log(res)
            toast(`${res.data.message}`);
        } catch (error) {
            setloading(false)
            console.log(error.message)
            toast(`${error.message}`);
            console.log(error)
        }

    }

    return (
        <div className="flex items-center justify-center  bg-gray-100">

            <ToastContainer />

            {/* Button to Open Modal */}
            <button
                id="saveCodeModal"
                className="px-4 py-2 hidden bg-blue-600 text-white rounded-md"
                onClick={() => {
                    document.body.style.overflow = "hidden"
                    setIsOpen(true)
                }}
            >
                Open Modal
            </button>

            {/* Modal (Only visible when `isOpen` is true) */}
            {isOpen && (
                <div className="fixed z-50 inset-0 flex items-center justify-center bg-[#22232443] backdrop-blur-sm bg-opacity-50">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4 text-white">Modal Title</h2>

                        <p className=" text-yellow-400 py-3 ">Only the code of the selected file will be saved.</p>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            saveCode()
                        }}
                            className=" flex flex-col justify-center items-center">
                            <div className="relative w-full my-3">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                                    </svg>
                                </div>
                                <input
                                    required type="text"
                                    autoComplete="off"
                                    value={codeTitle}
                                    onChange={(e) => {
                                        setcodeTitle(e.target.value.trim())
                                    }} id="simple-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search branch name..." />
                            </div>
                            <button
                                disabled={loading}
                                type="submit"
                                className=" cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                {loading ? "saving" : "Save"}
                            </button>

                        </form>

                        <div className="mt-4 flex justify-end">
                            <button
                                className=" cursor-pointer px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md"
                                onClick={() => {
                                    document.body.style.overflow = "auto"
                                    setIsOpen(false)
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AutoSaveModal;
