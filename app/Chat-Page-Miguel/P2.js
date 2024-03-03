"use client"

import React from 'react';
import styles from './MA-Styles.css';

const Test = ({ children }) => {
  const handleChatIconClick = () => {
    alert("Open chat");
  };

  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
        <p>4School</p>
      </footer>
      {/* Text box */}
      <div className={styles.chatBox}>
        <div className={styles.chatIcon} onClick={handleChatIconClick}>
        </div>
        <div className={styles.textBox}>
          <input type="text" placeholder="Type your message" />
          <button onClick={() => { alert("Message Sent") }}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Test;
