import io from "socket.io-client";
const socket = io(`${import.meta.env.VITE_REACT_BACKEND_URL}`);
export {socket};
