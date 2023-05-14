import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import db from "../firebase-config";
import TopicTabs from "../components/TopicTabs/TopicTabs";
import SearchBar from "../components/SearchBar/SearchBar";
import "./Home.css"


const Home: React.FC = () => {
  const [userDetail, setUserDetail] = useState<any>();
  const [posts, setPosts] = useState<any>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {

    window.scrollTo(0, 0);

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
    }
  }, []);


 const searchInput = (e: any) => {
   let userInput = e.target.value;
   setUserInput(userInput);
 };


 const searchHandler = (posts: any) => {
   return posts.filter((post: any) =>
     post.title.toLowerCase().includes(userInput.toLowerCase())
   );
 };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <div className="home-content-container">
            <SearchBar onChange={searchInput}/>
            <div style={{ marginTop: "30px" }}>
              <TopicTabs posts={searchHandler(posts)} />
            </div>

          </div>
          
      </IonContent>
    </IonPage>
  );
};

export default Home;
