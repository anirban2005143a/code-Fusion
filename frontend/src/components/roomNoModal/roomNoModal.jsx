import React, { useState } from 'react'

const RoomNoModal = (props) => {

    const [roomId, setroomId] = useState("Generate room id")
    const getRoomId = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];

        const id = `${getRandomChar()}${getRandomChar()}${getRandomChar()}-${getRandomChar()}${getRandomChar()}${getRandomChar()}-${getRandomChar()}${getRandomChar()}${getRandomChar()}`;
        console.log(id)
        setroomId(id)
    }

    return (
        <>
        </>
    )
}

export default RoomNoModal