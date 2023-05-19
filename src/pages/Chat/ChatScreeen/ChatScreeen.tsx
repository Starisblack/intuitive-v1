import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./ChatScreeen.css";
import { useAppSelector } from "../../../store/store";
import { userSelected } from "../../../reducers/chatReducers";
import Messages from "../Messages/Messages";
import Input from "../../../components/Input/Input";
import "./ChatScreeen.css"


const ChatScreeen = () => {
  const user = useAppSelector(userSelected);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chats Screen</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <ChatPanel /> */}
        <div className="chats">
          <div className="chatInfo">
            <span>{user?.displayName}</span>
          </div>
          <Messages />
          <Input />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ChatScreeen;
