// import Script from 'next/script'
"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
 
export default function ClassServer({serverInfo}) {
    let index =0;
    const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws:'.concat(serverInfo.address)); // Replace with your WebSocket server URL

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const newMessage = event.data;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
      }, []);    

    return (
    <>
        <Link href={serverInfo.route}><h4 class="layer1">{serverInfo.name}</h4></Link>
    {/* <div>
      <h2>WebSocket Messages:</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div> */}
  {/* ); */}
    </>
    )
}
