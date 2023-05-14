import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Auth/Login/Login';
import BottomTabs from './components/BottomTabs/BottomTabs';
import Chat from './pages/Chat/Chat';
import Users from './pages/Users/Users';
import Profile from './pages/Profile/Profile';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <div>
    <IonReactRouter>
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
        <Route exact path="/chat">
          <Chat />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
      </IonRouterOutlet>
      <BottomTabs />
    </IonReactRouter>

 
    </div>
  </IonApp>
);

export default App;
