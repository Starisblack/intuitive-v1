import React, { useContext, useEffect, useState } from "react";
import Message from "./Message/Message";
// import { ChatContext } from "../context/Chatcontext";
import { doc, onSnapshot } from "firebase/firestore";
import db from "../../../firebase-config";
import { useAppSelector } from "../../../store/store";
import { chatId } from "../../../reducers/chatReducers";
import "./Messages.css";
import { IonSpinner } from "@ionic/react";

function Messages() {
  const [messages, setMessages] = useState<any>([]);
  const msgId = useAppSelector(chatId);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const unSub = onSnapshot(doc(db, "chats", msgId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
      setLoading(false);
    });
    return () => {
      unSub();
    };
  }, [msgId]);

  
  return (
    <div className="messages">
      {loading ? ( <div style={{display: "flex", height: "60vh", alignItems: "center", justifyContent: "center"}}>
        <IonSpinner name="lines-sharp"></IonSpinner>
        </div>
      ) : (
        <>
          {messages?.map((m: any) => (
            <Message message={m} key={m.id} />
          ))}
        </>
      )}
    </div>
  );
}

export default Messages;
