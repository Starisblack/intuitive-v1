import { IonContent, IonHeader, IonMenu, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';

function ChatPanel() {
  return (
    <IonSplitPane when="md" contentId="main">
      <IonMenu contentId="main">
        <IonHeader>
          <IonToolbar color="tertiary">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">Menu Content</IonContent>
      </IonMenu>

      <div className="ion-page" id="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Main View</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">Main View Content</IonContent>
      </div>
    </IonSplitPane>
  );
}
export default ChatPanel;