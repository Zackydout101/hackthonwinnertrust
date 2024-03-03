// P2.js
"use client";

import React, { useEffect, useState } from "react";
import { db } from './firebaseConfig';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { formatRelative } from "date-fns";
import styles from './MA-Styles.css';

const Test = () => {
  const [uid, setUid] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Generate a random UID for the session
  useEffect(() => {
    const generateRandomUid = () => {
      // Generate a random UID, e.g., 'user_123456'
      return `anonymous_${Math.floor(Math.random() * 1000000)}`;
    };
    setUid(generateRandomUid());
  }, []);

  // Handle sending new messages
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        createdAt: serverTimestamp(),
        uid, // Use the random UID
      });

      setNewMessage("");
      alert("Data added to firestore DB!!");
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };

  // Fetching messages from Firestore
  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt"), limit(100));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(data);
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="text">
      <footer className={styles.footer}>
        <p>4School</p>
      </footer>
      <div className={styles.chatBox}>
        <div className={styles.chatIcon} onClick={() => alert("Open chat")}>
        </div>
        <div className={styles.textBox}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <button type="submit" disabled={!newMessage}>
              Send
            </button>
          </form>
          <ul>
            {messages.map((message) => (
              <li key={message.id} className={message.uid === uid ? "sent" : "received"}>
                <section>
                  {/* Display the UID with the message */}
                  <p>{message.uid}</p>
                  <p>{message.text}</p>
                  {/* Message date and time */}
                  {message.createdAt?.seconds && (
                    <span>
                      {formatRelative(new Date(message.createdAt.seconds * 1000), new Date())}
                    </span>
                  )}
                </section>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Test;
