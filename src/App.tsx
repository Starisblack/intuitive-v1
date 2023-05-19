import { Redirect, Route } from "react-router-dom";
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/Auth/Login/Login";
import Chat from "./pages/Chat/Chat";
import Users from "./pages/Users/Users";
import Profile from "./pages/Profile/Profile";
import SinglePost from "./pages/Post/SinglePost/SinglePost";
import SingleUserProfileView from "./pages/Users/SingleUserProfileView/SingleUserProfileView";
import Register from "./pages/Auth/Register/Register";
import CreatePost from "./pages/Post/CreatePost/CreatePost";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import { useAppSelector } from "./store/store";
import { isAuth } from "./reducers/authReducers";
import { people, home, chatbubbles, person } from "ionicons/icons";
import ChatScreeen from "./pages/Chat/ChatScreeen/ChatScreeen";

setupIonicReact();

const App: React.FC = () => {

  const auth = useAppSelector(isAuth)

  let navTabs = (
    <IonTabBar
      style={{ border: "none", height: "0" }}
      slot="bottom"
    ></IonTabBar>
  );


  if (auth) {
    navTabs = (
      <IonTabBar slot="bottom">
      
        <IonTabButton tab="tab1" href="/home">
          <IonIcon aria-hidden="true" icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/chat">
          <IonIcon aria-hidden="true" icon={chatbubbles} />
          <IonLabel>Chat</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/users">
          <IonIcon aria-hidden="true" icon={people} />
          <IonLabel>Users</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab4" href="/profile">
          <IonIcon aria-hidden="true" icon={person} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    );
  }

  return (
    <IonApp>
    
        <IonReactRouter>
        <IonTabs>
        
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/forgotpassword">
              <ForgotPassword />
            </Route>
            <Route exact path="/chat">
              <Chat />
            </Route>
            <Route exact path="/chat-screen">
              <ChatScreeen />
            </Route>
            <Route exact path="/users">
              <Users />
            </Route>
            <Route exact path="/profile">
                <Profile />
            </Route>

            <Route exact path="/user/:id">
              <SingleUserProfileView />
            </Route>

            <Route exact path="/post/:id">
              <SinglePost />
            </Route>

            <Route exact path="/create-post">
              <CreatePost />
            </Route>
          </IonRouterOutlet>
          {navTabs}
          </IonTabs>
          
        </IonReactRouter>
      
    </IonApp>
  );
};

export default App;
