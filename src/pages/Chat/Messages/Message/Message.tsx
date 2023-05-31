import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../store/store";
import { user } from "../../../../reducers/authReducers";
import { userSelected } from "../../../../reducers/chatReducers";
import "./Message.css";
import * as dayjs from 'dayjs'


type MessageProps = {
  message: any;
};
const Message: FC<MessageProps> = ({ message }) => {
  const currentUser = useAppSelector(user);
  const selectedUser = useAppSelector(userSelected);
  const ref = useRef<any>();
  const [showMore, setShowMore] = useState<boolean>(false);
 

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser?.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser?.uid
              ? currentUser.profileImg
              : selectedUser.profileImg
          }
          alt=""
        />
       
      </div>
      <div className="messageContent">
        {message.text.length >= 400 ? (
          <p>
            <span>{showMore ? message.text  + "  ": message.text.substring(0, 400) + "... "}</span>
            <button
              onClick={() => setShowMore(!showMore)}
              // style={customStyle}
              type="button"
              className="read-more-btn"
            >
              {showMore ? "Read less" : "Read more"}
            </button>
          </p>
        ) : (<div >
          <p>{message.text}</p>
          <span className="message-time">{dayjs.unix(message.date).format("hh:mma")}</span>
          </div>
        )}

        {/* <p>{showMore ? message.text : <>
        `${message.text.substring(0, 400)}`
       
        </>}</p> */}
      </div>
    </div>
  );
};

export default Message;
