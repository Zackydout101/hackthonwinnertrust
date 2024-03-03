// import Script from 'next/script'
"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
 
export default function ClassServer({serverInfo}) {
    let index =0;

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
