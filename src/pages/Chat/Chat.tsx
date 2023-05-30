import {
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Chat.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useHistory } from "react-router";
import { user } from "../../reducers/authReducers";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../../firebase-config";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import ChatPanel from "../../components/ChatPanel/ChatPanel";
import { changeUser, sendNotification } from "../../reducers/chatReducers";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import Spinner from "../../components/Spinner";

const Chat: React.FC = () => {
  const history = useHistory();

  const [chats, setChats] = useState<any>();
  const currentUser = useAppSelector(user);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }

    try {
      const getChats = () => {
        setLoading(true);

        onSnapshot(doc(db, "userChats", currentUser?.uid), (doc) => {
          setChats(doc.data());
          setLoading(false);
        });
      };
      currentUser && getChats();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [currentUser, history]);

  useEffect(() => {
    const notifyArray: any = [];
    const notifications =
      chats &&
      Object.entries(chats).map((chat: any) => {
        if (
          chat[1].lastMessage?.receiverId === currentUser?.uid &&
          chat[1].lastMessage?.receiverHasRead === false
        ) {
          notifyArray.push("true");
        }
      });

    Promise.all(notifications).then(() => {
      dispatch(sendNotification(notifyArray.length));
    });
  }, [chats]);

  const handleSelect = async (selectedChat: any) => {
    messageRead(selectedChat);
    dispatch(
      changeUser({ user: selectedChat.userInfo, currentUser: currentUser })
    );
    history.push("/chat-screen");
  };

  const messageRead = async (chat: any) => {
    const selectedUserId = chat.userInfo.uid;

    const msgId =
      currentUser.uid > selectedUserId
        ? currentUser.uid + selectedUserId
        : selectedUserId + currentUser.uid;

    if (typeof chat.lastMessage === "undefined") {
      return;
    } else {
      if (clickedChatWhereNotSender(chat.lastMessage)) {
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [msgId + ".lastMessage.receiverHasRead"]: true,
        });
        await updateDoc(doc(db, "userChats", selectedUserId), {
          [msgId + ".lastMessage.receiverHasRead"]: true,
        });
      } else {
        console.log("false");
      }
    }
  };

  const clickedChatWhereNotSender = (chatIndex: any) =>
    chatIndex.receiverId === currentUser.uid;

    const text = {
      fontWeight: 800,
  };

  return (
    <IonPage>
      <IonHeader className="mobileOnly">
        <IonToolbar>
          <IonTitle>Chats</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ChatPanel
          loading={loading}
          handleSelect={handleSelect}
          chats={chats}
        />
        {loading ? <Spinner /> : (
          <List
            className="mobileOnly"
            sx={{width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
          >
            {chats && Object.entries(chats)
                ?.sort((a: any, b: any) => b[1].date - a[1].date)
                .map((chat: any) => {
                  let checkUnreadMessage =
                    chat[1].lastMessage?.receiverId === currentUser?.uid &&
                    chat[1].lastMessage?.receiverHasRead === false;
            
                  return (
                    <ListItem
                      sx={{ backgroundColor: checkUnreadMessage ? "#E4EFE7" : null }}
                      onClick={() => handleSelect(chat[1])}
                      key={chat[0]}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <img src={chat[1].userInfo.profileImg} alt="" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={chat[1].userInfo.displayName}
                        secondary={chat[1].lastMessage?.text.length >= 33 ? chat[1].lastMessage?.text.substring(0, 36) + "..." :  chat[1].lastMessage?.text }
                        secondaryTypographyProps={ checkUnreadMessage ? {style: text } : {}}
                      />
                      {typeof chat[1].lastMessage?.receiverHasRead ===
                      "undefined"
                        ? null
                        : checkUnreadMessage && (
                            <CircleNotificationsIcon color="success" />
                          )}
                    </ListItem>
                  );
                })
            }
          </List>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Chat;
