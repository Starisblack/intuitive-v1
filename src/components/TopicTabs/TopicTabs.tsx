import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./TopicTabs.css";
import PostCard from "../PostCard/PostCard";
import { IonCol, IonGrid, IonRow } from "@ionic/react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  posts?: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, posts, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type TopicTabsProps = {
  posts: any;
};
const TopicTabs: React.FC<TopicTabsProps> = ({ posts}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const filterPosts = (category: string) => {
    return (
      <>
        {posts
          .filter((post: any) => post.category === category)
          .map((post: any) => {
            return (
              <IonCol key={post.id} size="12" size-sm="6" size-lg="4">
                <PostCard
                  title={post.title}
                  content={post.content}
                  imgURL={post.postMedia.imgURL}
                  videoURL={post.postMedia.videoURL}
                  link={"post/" + post.id}
                />
              </IonCol>
            );
          })}
      </>
    );
  };

  return (
    <Box sx={{ width: "100%" }} className="topic-tab-container">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          variant="scrollable"
          scrollButtons="auto"
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Health" {...a11yProps(1)} />
          <Tab label="Life" {...a11yProps(2)} />
          <Tab label="Family" {...a11yProps(3)} />
          <Tab label="Marriage" {...a11yProps(4)} />
          <Tab label="Career" {...a11yProps(5)} />
          <Tab label="Others" {...a11yProps(6)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <IonGrid className="listing-container">
          <IonRow>
            {posts.map((post: any) => {
              return (
                <IonCol key={post.id} size="12" size-sm="6" size-lg="4">
                  <PostCard
                    title={post.title}
                    content={post.content}
                    imgURL={post.postMedia.imgURL}
                    videoURL={post.postMedia.videoURL}
                    link={"post/" + post.id}
                  />
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <IonGrid className="listing-container">
          <IonRow>{filterPosts("Health")}</IonRow>
        </IonGrid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <IonGrid className="listing-container">
          <IonRow>{filterPosts("Life")}</IonRow>
        </IonGrid>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <IonGrid className="listing-container">
          <IonRow>{filterPosts("Family")}</IonRow>
        </IonGrid>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <IonGrid className="listing-container">
          <IonRow>{filterPosts("Marriage")}</IonRow>
        </IonGrid>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <IonGrid className="listing-container">
          <IonRow>{filterPosts("Career")}</IonRow>
        </IonGrid>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <IonGrid className="listing-container">
          <IonRow>{filterPosts("Others")}</IonRow>
        </IonGrid>
      </TabPanel>
    </Box>
  );
};

export default TopicTabs;
