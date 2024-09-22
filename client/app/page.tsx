"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [currentSocket, setSocket] = useState<any>(undefined);
  const [inbox, setInbox] = useState<any>(["hello", "nice"])
  const [message, setMessage] = useState("");
  const [roomName, setRoomName] = useState("");

  const handleSendMessage = () => {
    currentSocket.emit("message", message, roomName);
    // emits an event called message it can take arguments which you can ccapture on the server side
  }
  useEffect(() => {
    const socket = io("http://localhost:3000"); 
    socket.on("message", (message) => {
      let result = [...inbox];
      result.push(message);
      setInbox(result);
    })
    //1. they must have the same port with your server port
    //2. establish connection with the socket io server running on localhost 3000
    setSocket(socket);
  }, [])
  return (
    <>
      <div>
        <div className="flex flex-col gap-5 mt-20 px-10 lg:px-48">
          {/* showing the messages */}
          <div className="flex flex-col gap-2 border rounded-lg p-10">
            {
              inbox.map((message: string, index: number) => (
                <div key={index} className="border rounded px-4 py-2">
                    {message}
                </div>
              ))
            }
          </div>

          <div className="flex gap-2 align-center justify-center ">
            {/* attach message parameters on input by attaching an on change function */}
            <input onChange={(e) => {setMessage(e.target.value)}} type="text" name="message" className="flex-1 bg-white border rounded px-2 py-1"/>
            
            {/* attach handle send message on send message */}
            <button className="w-40" onClick={handleSendMessage}> Send Message </button> 

          </div>

          <div className="flex gap-2 align-center justify-center ">
            <input type="text" name="room" className="flex-1 bg-white border rounded px-2 py-1"/>
            <button className="w-40"> Join room </button>
          </div>
        </div>
      </div>
    </>
  );
}
