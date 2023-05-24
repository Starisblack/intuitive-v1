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
import { userSelected } from "../../../reducers/chatReducers";
import Messages from "../Messages/Messages";
import Input from "../../../components/Input/Input";
import "./ChatScreeen.css";
import { useEffect, useState } from "react";

const ChatScreeen = () => {
  const user = useAppSelector(userSelected);


 
  return (
    <IonPage className="chat-screen-page">
        <IonToolbar >
          <IonButtons slot="start">
            <IonBackButton color="light" defaultHref="#"></IonBackButton>
          </IonButtons>
          <IonTitle style={{ color: "white" }}>
            {" "}
            {user?.displayName ? user.displayName : user.fName}
          </IonTitle>
        </IonToolbar>
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

