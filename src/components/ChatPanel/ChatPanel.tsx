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
import Message from "../../pages/Chat/Messages/Message/Message";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { changeUser, userSelected } from "../../reducers/chatReducers";
import { user } from "../../reducers/authReducers";
import { useHistory } from "react-router";
import Messages from "../../pages/Chat/Messages/Messages";
import Input from "../Input/Input";

type ChatPanelProps = {
  chats: any;
  handleSelect: any;
  loading: boolean;
};
const ChatPanel: FC<ChatPanelProps> = ({ chats, loading }) => {
  const selectedUser = useAppSelector(userSelected);
  const currentUser = useAppSelector(user);
  const dispatch = useAppDispatch();

  const handleSelect = (selectedUser: any) => {
    dispatch(changeUser({ user: selectedUser, currentUser: currentUser }));
  };

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
                      onClick={() => handleSelect(chat[1].userInfo)}
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
           <Messages />
         
        </IonContent>
        <IonFooter>
          <Input />
        </IonFooter>
      </div>
    </IonSplitPane>
  );
};
export default ChatPanel;
