import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Home.css";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import db from "../firebase-config";
import TopicTabs from "../components/TopicTabs/TopicTabs";
import SearchBar from "../components/SearchBar/SearchBar";
import "./Home.css";
import Spinner from "../components/Spinner";
import { useAppSelector } from "../store/store";
import { isAuth } from "../reducers/authReducers";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { add} from "ionicons/icons";

const Home: React.FC = () => {
  const history = useHistory();
  const [posts, setPosts] = useState<any>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const auth = useAppSelector(isAuth);


  useEffect(() => {
    window.scrollTo(0, 0);
  
    if (!auth) {
      history.push("/login");
    }

    setLoading(true);
   

    try {
      const getAllPosts = () => {
        const q = query(collection(db, "posts"), orderBy("created", "desc"));

        onSnapshot(q, (querySnapshot) => {
          setPosts(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );

          setLoading(false);
        });
      };
      getAllPosts();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [history, auth]);
 
  const searchInput = (e: any) => {
    let userInput = e.target.value;
    setUserInput(userInput);
  };

  const searchHandler = (posts: any) => {
    return posts.filter((post: any) =>
      post.title.toLowerCase().includes(userInput.toLowerCase())
    );
  };


   

  if (!posts) return <IonSpinner name="circles"></IonSpinner>;

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar className="ion-padding">
        
        <IonButtons slot="primary">
        <Link to="/create-post">
          <IonButton fill="outline">
             Create Post
            <IonIcon slot="end" icon={add}></IonIcon>
          </IonButton>
          </Link>
        </IonButtons>
        
        <IonTitle>Home</IonTitle>
      </IonToolbar>
      </IonHeader>
      {loading ? (
        <Spinner />
      ) : (
        <IonContent className="home-page">
          <div className="home-content-container">
            <SearchBar placeHolder="search posts" onChange={searchInput} />
            <div style={{ marginTop: "30px" }}>
              <TopicTabs posts={searchHandler(posts)} />
            </div>
          </div>
        </IonContent>
      )}
    </IonPage>
  );
};

export default Home;
