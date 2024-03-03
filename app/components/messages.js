"use client";
import React, { useEffect, useState, useRef } from "react";
import { db } from './firebaseConfig';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { formatRelative } from "date-fns";

export default function Messages({ dbCollection }) {
  const [uid, setUid] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messageContainerRef = useRef(null);

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
  }, [dbCollection]); // Include dbCollection as a dependency

  // Scroll to the bottom when messages are updated
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="messageContainer" ref={messageContainerRef}>
      <ul>
        {messages.map((message) => (
          <li key={message.id} className={message.uid === uid ? "sent" : "received"}>
            <span className="metadata">
              <h6 className="mesName">{message.uid}</h6>
              {message.createdAt?.seconds && (
                <h6 className="mesTime">
                  {formatRelative(new Date(message.createdAt.seconds * 1000), new Date())}
                </h6>
              )}
            </span>
            <section className="mesBody">
              <p className="mesText">{message.text}</p>
            </section>
          </li>
        ))}
      </ul>
    </div>
  );
}
