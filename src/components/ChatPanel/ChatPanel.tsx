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
import Spinner from "../Spinner";
import ChatCard from "../ChatCard";

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

  const handleSelect = async (selectedChat: any, profileImg?: any) => {
    messageRead(selectedChat);
    let selectUserInfo = selectedChat.userInfo;

    if (selectedChat.userInfo.profileImg === "") {
      selectUserInfo.profileImg = profileImg;
    }

    dispatch(changeUser({ user: selectUserInfo, currentUser: currentUser }));
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
    <IonSplitPane className="desktopOnly" when="md" contentId="main">
      <IonMenu contentId="main">
        <IonHeader>
          <IonToolbar color="tertiary">
            <IonTitle>Chats</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {loading ? (
            <Spinner />
          ) : (
            <List
              sx={{ width: 444, maxWidth: "100%", bgcolor: "background.paper" }}
            >
              {chats &&
                Object.entries(chats)
                  ?.sort((a: any, b: any) => b[1].date - a[1].date)
                  .map((chat: any) => {
                    let checkUnreadMessage =
                      chat[1].lastMessage?.receiverId === currentUser?.uid &&
                      chat[1].lastMessage?.receiverHasRead === false;

                    return (
                      <ChatCard
                        chat={chat}
                        checkUnreadMessage={checkUnreadMessage}
                        handleSelect={handleSelect}
                      />
                    );
                  })}
            </List>
          )}
        </IonContent>
      </IonMenu>

      <div className="ion-page" id="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle style={{ color: "black" }}>
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
