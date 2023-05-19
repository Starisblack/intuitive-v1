import React, { useContext, useEffect, useState } from "react";
import Message from "./Message/Message";
// import { ChatContext } from "../context/Chatcontext";
import { doc, onSnapshot } from "firebase/firestore";
import db from "../../../firebase-config";
import { useAppSelector } from "../../../store/store";
import { chatId } from "../../../reducers/chatReducers";
import "./Messages.css"


function Messages() {
  const [messages, setMessages] = useState<any>([]);
  const msgId = useAppSelector(chatId)

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", msgId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [msgId]);

  

  return (
    <div className="messages">
      {messages.map((m: any) => (
        <Message message={m} key={m.id} />
      ))}
      
    </div>
  );
}

export default Messages;
