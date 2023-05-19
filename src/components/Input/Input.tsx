import React, {useState } from "react";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import db from "../../firebase-config";
import { v4 as uuid } from "uuid";
import { useAppSelector } from "../../store/store";
import { user } from "../../reducers/authReducers";
import { chatId, userSelected } from "../../reducers/chatReducers";
const Input = () => {
  const [text, setText] = useState("");
  const currentUser = useAppSelector(user);
  const selectedUser = useAppSelector(userSelected);
  const msgId = useAppSelector(chatId);
  //   const { currentUser } = useContext(AuthContext);
  //   const { data } = useContext(ChatContext);
  const handleSend = async () => {
    if (text === "") {
      alert("field can't be empty");
    }

    try {
      await updateDoc(doc(db, "chats", msgId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.id,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [msgId + ".lastMessage"]: {
          text,
        },
        [msgId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", selectedUser.uid), {
        [msgId + ".lastMessage"]: {
          text,
        },
        [msgId + ".date"]: serverTimestamp(),
      });

      setText("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="input">
      <input
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
