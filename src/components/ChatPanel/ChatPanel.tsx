import {
  IonContent,
  IonFooter,
  IonHeader,
  IonMenu,
  IonSpinner,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { changeUser, chatId, userSelected } from "../../reducers/chatReducers";
import { user } from "../../reducers/authReducers";
import Messages from "../../pages/Chat/Messages/Messages";
import Input from "../Input/Input";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../firebase-config";

type ChatPanelProps = {
  chats: any;
  handleSelect: any;
  loading: boolean;
};
const ChatPanel: FC<ChatPanelProps> = ({ chats, loading }) => {
  const selectedUser = useAppSelector(userSelected);
  const currentUser = useAppSelector(user);
  const dispatch = useAppDispatch();
  const msgId = useAppSelector(chatId);

  // const handleSelect = (selectedUser: any) => {
  //   messageRead(chat)
  //   dispatch(changeUser({ user: selectedUser, currentUser: currentUser }));
  // };

  const handleSelect = async (selectedChat: any) => {
    messageRead(selectedChat);
    dispatch(
      changeUser({ user: selectedChat.userInfo, currentUser: currentUser })
    );
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

  return (
    <IonSplitPane className="desktopOnly" when="md" contentId="main">
      <IonMenu contentId="main">
        <IonHeader>
          <IonToolbar color="tertiary">
            <IonTitle>Chats</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {chats && (
            <List
              sx={{ width: 444, maxWidth: "100%", bgcolor: "background.paper" }}
            >
              {loading ? (
                <IonSpinner> </IonSpinner>
              ) : (
                Object.entries(chats)
                  ?.sort((a: any, b: any) => b[1].date - a[1].date)
                  .map((chat: any) => (
                    <ListItem
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
                        secondary={chat[1].lastMessage?.text}
                      />
                      {typeof chat[1].lastMessage?.receiverHasRead ===
                      "undefined"
                        ? null
                        : chat[1].lastMessage?.receiverId ===
                            currentUser?.uid &&
                          chat[1].lastMessage?.receiverHasRead === false && (
                            <CircleNotificationsIcon color="success" />
                          )}
                    </ListItem>
                  ))
              )}
            </List>
          )}
        </IonContent>
      </IonMenu>

      <div className="ion-page" id="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle style={{ color: "white" }}>
              {" "}
              {selectedUser?.displayName
                ? selectedUser?.displayName
                : selectedUser?.fName}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="chat-screen">
          {msgId === "null" ? (
            <div
              style={{
                display: "flex",
                height: "70vh",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <h2>Start a Conversation </h2>{" "}
            </div>
          ) : (
            <Messages />
          )}
        </IonContent>
        <IonFooter>{msgId !== "null" && <Input />}</IonFooter>
      </div>
    </IonSplitPane>
  );
};
export default ChatPanel;
