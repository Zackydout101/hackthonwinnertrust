// P2.js
"use client";

import React, { useEffect, useState } from "react";
import { db } from './firebaseConfig';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { formatRelative } from "date-fns";
import styles from './MA-Styles.css';

const Test = ({dbCollection}) => {
  
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
      await addDoc(collection(db, dbCollection), {
        text: newMessage,
        createdAt: serverTimestamp(),
        uid, // Use the random UID
      });

      setNewMessage("");
      //alert("Data added to firestore DB!!");
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };

  // Fetching messages from Firestore
  useEffect(() => {
    const messagesRef = collection(db, dbCollection);
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
      <div className="textBox">
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
      </div>
  )
};

export default Test;
