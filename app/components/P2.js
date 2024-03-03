// P2.js
"use client";

import React from 'react';
import styles from './MA-Styles.css';

const Test = ({ children }) => {
  return (
        <div className="textBox">
          <input className="box" type="text" placeholder="Type a message" />
          <button onClick={() => { alert("Message Sent") }}>Send</button>
        </div>
  );
};

export default Test;
