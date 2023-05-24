import React, { FC, useContext, useEffect, useRef } from "react";
import { useAppSelector } from "../../../../store/store";
import { user } from "../../../../reducers/authReducers";
import { userSelected } from "../../../../reducers/chatReducers";
import "./Message.css"


type MessageProps = {
    message: any
}
const Message: FC <MessageProps> = ({ message }) => {
 
    const currentUser = useAppSelector(user)
    const selectedUser = useAppSelector(userSelected)
  const ref = useRef<any>();
  
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser?.id && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser?.id
              ? currentUser.profileImg
              : selectedUser.profileImg
          }
          alt=""
        />
        <span></span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>

      </div>
    </div>
  );
};

export default Message;
