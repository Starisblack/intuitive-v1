import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Chat.css';
import { useAppDispatch } from '../../store/store';
import { useHistory } from 'react-router';
import { logoutAsync } from '../../reducers/authReducers';

const Chat: React.FC = () => {

// const dispatch = useAppDispatch()
const history = useHistory();

// const signOutHandler = async () => {
//      await dispatch(logoutAsync())
//      history.push("/login")
// }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Chat</IonTitle>
          </IonToolbar>
        </IonHeader>
         {/* <IonButton onClick={signOutHandler}>logout</IonButton> */}
      </IonContent>
    </IonPage>
  );
};

export default Chat;
