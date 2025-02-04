// import React, { useState, useEffect, useRef } from 'react'
// import { io } from "socket.io-client";
// import "./livechat.css"

// const Livechat = () => {

//     const [isChatOpen, setIsChatOpen] = useState(false);
//     const [messages, setMessages] = useState([]);
//     const [chatMessage, setChatMessage] = useState("");
//     const [socket, setsocket] = useState(null)

//     const sendMessage = (e) => {
//         e.preventDefault();
//         if (socket) {
//             const newMessage = { userName: "You", chatMessage: chatMessage };
//             let userName = localStorage.getItem("username");
//             socket.emit("sending-message", { chatMessage, userName }, (response) => {
//                 console.log(userName);
//                 console.log("Message sent: " + chatMessage);
//                 console.log("Server response: " + response);
//             });

//             setMessages((prevMessages) => [...prevMessages, newMessage]);
//             setChatMessage("");
//         }
//     };

//     useEffect(() => {
//         const socketIoServer = io(`${import.meta.env.VITE_REACT_BACKEND_URL}`);
//         setsocket(socketIoServer)
//     }, [])

//     useEffect(() => {
//         if (socket) {
//             socket.on("new-message-to-all", (newMessage) => {
//                 setMessages((prevMessages) => [...prevMessages, newMessage]);
//                 console.log(newMessage);
//             });
//             return () => {
//                 socket.off("new-message-to-all");
//                 socket.disconnect();
//             };
//         }
//     }, [socket])




//     return (
//         <div id='livechat'>
//             <div className="live-chat-container">
//                 <div
//                     className={`chat-toggle ${isChatOpen ? "hidden" : ""}  `}
//                     onClick={() => setIsChatOpen(!isChatOpen)}
//                 >
//                     💬
//                 </div>
//                 {isChatOpen && (
//                     <div className="chat-box">
//                         <div className="chat-header">
//                             <span className="font-bold text-2xl text-black">Live Chat</span>
//                             <button
//                                 className="bg-black rounded p-2 cursor-pointer"
//                                 onClick={() => setIsChatOpen(false)}
//                             >
//                                 ❌
//                             </button>
//                         </div>
//                         <div className="chat-body">
//                             {messages.map((msg, index) => (
//                                 <div
//                                     key={index}
//                                     className="chat-message"
//                                     style={{
//                                         backgroundColor:
//                                             msg.userName == "You" ? "#DCF8C6" : "#EDEDED",
//                                     }}
//                                 >
//                                     <strong>{msg.userName}:</strong> {msg.chatMessage}
//                                 </div>
//                             ))}
//                         </div>
//                         <form className="chat-input" onSubmit={sendMessage}>
//                             <input
//                                 type="text"
//                                 value={chatMessage}
//                                 onChange={(e) => setChatMessage(e.target.value)}
//                                 placeholder="Type a message..."
//                                 required
//                             />
//                             <button type="submit">Send</button>
//                         </form>
//                     </div>
//                 )}
//             </div>
//         </div >
//     )
// }


import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import { gsap } from "gsap";

const Livechat = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [chatMessage, setChatMessage] = useState("");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketIoServer = io(`${import.meta.env.VITE_REACT_BACKEND_URL}`);
        setSocket(socketIoServer);
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("new-message-to-all", (newMessage) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
            return () => {
                socket.off("new-message-to-all");
                socket.disconnect();
            };
        }
    }, [socket]);

    useEffect(() => {
        if (isChatOpen) {
            gsap.fromTo(".chat-box", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
        }
    }, [isChatOpen]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (socket) {
            const userName = localStorage.getItem("username") || "You";
            const newMessage = { userName, chatMessage };
            socket.emit("sending-message", { chatMessage, userName });
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setChatMessage("");
        }
    };

    return (
        <div id='livechat' className="fixed z-50 bottom-4 right-4">
            <div className="relative">
                <div
                    className={`chat-toggle bg-gray-800  relative text-white p-4 rounded-full cursor-pointer shadow-lg ${isChatOpen ? "hidden" : ""}`}
                    onClick={() => setIsChatOpen(!isChatOpen)}
                >
                    💬
                </div>
                {isChatOpen && (
                    <div className="chat-box h-[400px] flex flex-col  bg-gray-900 text-white rounded-lg shadow-lg w-80 p-4 fixed bottom-16 right-4">
                        <div className="chat-header flex justify-between items-center border-b border-gray-700 pb-2">
                            <span className="font-bold text-xl">Live Chat</span>
                            <button className="bg-gray-700 rounded p-2" onClick={() => setIsChatOpen(false)}>
                                ❌
                            </button>
                        </div>
                        <div className="chat-body h-full overflow-y-auto mt-2 space-y-2">
                            {messages.map((msg, index) => (
                                <div key={index} className="chat-message p-2 rounded-lg" style={{ backgroundColor: msg.userName === "You" ? "#2C3E50" : "#34495E" }}>
                                    <strong>{msg.userName}:</strong> {msg.chatMessage}
                                </div>
                            ))}
                        </div>
                        <form className="chat-input mt-2 flex gap-2" onSubmit={sendMessage}>
                            <input
                                type="text"
                                value={chatMessage}
                                onChange={(e) => setChatMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="w-full bg-gray-800 text-white p-2 rounded"
                                required
                            />
                            <button type="submit" className="bg-blue-600 px-3 py-2 rounded">Send</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Livechat;

