"use client"
import React, { useEffect, useState } from "react";
import { db } from './firebaseConfig';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { formatRelative } from "date-fns";

export default function Messages({mes}) {
    const [uid, setUid] = useState("");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
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
        <div class="messageContainer">
            <ul>
            {messages.map((message) => (
                <li key={message.id} className={message.uid === uid ? "sent" : "received"}>
                <section>
                    {/* Display the UID with the message */}
                    <p class="mesName">{message.uid}</p>
                    <p class="mesText">{message.text}</p>
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
  );
}