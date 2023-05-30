import React, { useState } from "react";
import {
  Timestamp,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import db from "../../firebase-config";
import { v4 as uuid } from "uuid";
import { useAppSelector } from "../../store/store";
import { user } from "../../reducers/authReducers";
import { chatId, userSelected } from "../../reducers/chatReducers";
import "./Input.css";
import { IonSpinner } from "@ionic/react";

const Input = () => {
  const [text, setText] = useState("");
  const currentUser = useAppSelector(user);
  const selectedUser = useAppSelector(userSelected);
  const msgId = useAppSelector(chatId);

  const handleSelect = async () => {
    const docRef = doc(db, "chats", msgId);
    const docSnap: any = await getDoc(docRef);

    const checkSenderOfTheLastMessage =
      docSnap.data().messages[docSnap.data().messages.length - 1].senderId ===
      currentUser.uid;

    if (checkSenderOfTheLastMessage) {
      return null;
    } else {
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [msgId + ".lastMessage.receiverHasRead"]: true,
      });
      await updateDoc(doc(db, "userChats", selectedUser.uid), {
        [msgId + ".lastMessage.receiverHasRead"]: true,
      });
    }

    // messageRead(selectedChat);
  };

  const handleEnterKey = (e: any) => {
    if (e.key === "Enter") {
      if (text === "") {
        return alert("field can't be empty");
      } else{
        handleSend()
      }
    }
  };

  const handleSend = async () => {
    
    if (text === "") {
      return alert("field can't be empty");
    }

    try {
      setText("");
      await updateDoc(doc(db, "chats", msgId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [msgId + ".lastMessage"]: {
          text,
          receiverId: selectedUser.uid,
          receiverHasRead: false,
        },
        [msgId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", selectedUser.uid), {
        [msgId + ".lastMessage"]: {
          text,
          receiverId: selectedUser.uid,
          receiverHasRead: false,
        },
        [msgId + ".date"]: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="input">
      <input
        onKeyDown={handleEnterKey}
        onClick={handleSelect}
        type="text"
        placeholder="Type something ....."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
