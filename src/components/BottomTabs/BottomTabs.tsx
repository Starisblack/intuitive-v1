import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import ForumIcon from "@mui/icons-material/Forum";
import PeopleIcon from "@mui/icons-material/People";
import { useHistory, useLocation } from "react-router";
import { useAppSelector } from "../../store/store";
import { isAuth } from "../../reducers/authReducers";
import "./BottomTabs.css"

export default function LabelBottomNavigation() {
  const location = useLocation();
  const history = useHistory();
  const [value, setValue] = React.useState("home");

  const auth = useAppSelector(isAuth);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    history.push(newValue);
  };

  return (
    <>
      {auth && (
        <BottomNavigation
          showLabels
          sx={{ width: "100%", zIndex: 200, position: "fixed", bottom: 0 }}
          value={location.pathname}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Home"
            value="/home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="Chat"
            value="/chat"
            icon={<ForumIcon />}
          />
          <BottomNavigationAction
            label="Users"
            value="/users"
            icon={<PeopleIcon />}
          />
          <BottomNavigationAction
            label="Profile"
            value="/profile"
            icon={<PersonIcon />}
          />
        </BottomNavigation>
      )}
    </>
  );
}
