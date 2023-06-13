import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { FC, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import db from "../firebase-config";

type ChatCardProps = {
  checkUnreadMessage: boolean;
  handleSelect: any;
  chat: any;
};

const ChatCard: FC<ChatCardProps> = ({
  checkUnreadMessage,
  handleSelect,
  chat,
}) => {

  const [user, setUser] = useState<any>();
  
  useEffect(() => {
  
    const getUserDetails = async () => {
      const userRef = doc(db, "users", chat[1].userInfo.uid);
      onSnapshot(userRef, (doc) => {
        const userData: any = doc.data();
        setUser(userData);
      });
    };

    getUserDetails()
  }, [chat]);


  const text = {
    fontWeight: 800,
  };

  return (
    <ListItem
      sx={{ backgroundColor: checkUnreadMessage ? "#E4EFE7" : null }}
      onClick={() => handleSelect(chat[1], user.profileImg)}
      key={chat[0]}
    >
      <ListItemAvatar>
        <Avatar>
          <img src={user?.profileImg} alt="" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={chat[1].userInfo.displayName}
        secondary={
          chat[1].lastMessage?.text.length >= 33
            ? chat[1].lastMessage?.text.substring(0, 36) + "..."
            : chat[1].lastMessage?.text
        }
        secondaryTypographyProps={checkUnreadMessage ? { style: text } : {}}
      />
      {typeof chat[1].lastMessage?.receiverHasRead === "undefined"
        ? null
        : checkUnreadMessage && <CircleNotificationsIcon color="success" />}
    </ListItem>
  );
};

export default ChatCard;
