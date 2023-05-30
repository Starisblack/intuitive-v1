import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./ChatScreeen.css";
import { useAppSelector } from "../../../store/store";
import { chatId, userSelected } from "../../../reducers/chatReducers";
import Messages from "../Messages/Messages";
import Input from "../../../components/Input/Input";
import "./ChatScreeen.css";

const ChatScreeen = () => {
  const user = useAppSelector(userSelected);
  const msgId = useAppSelector(chatId)

  return (
    <IonPage className="chat-screen-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="light" defaultHref="#"></IonBackButton>
          </IonButtons>
          <IonTitle style={{ color: "white" }}>
            {" "}
            {user?.displayName ? user.displayName : user.fName}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="chat-screen">
        <Messages />
      </IonContent>

      <IonFooter>
      <Input />
      </IonFooter>
    </IonPage>
  );
};

export default ChatScreeen;
