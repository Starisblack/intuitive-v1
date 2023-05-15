import React, { FC } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import "./UserListCard.css"
import { Link } from "react-router-dom";

type UserListCardProps = {
  data: any;
};
const UserListCard: FC<UserListCardProps> = ({ data }) => {
  return (
    <>
      {data && (
        <List
          sx={{
            width: "100%",
            alignItems: "center",
            maxWidth: 360,
            bgcolor: "background.paper",
            margin: "auto",
          }}
        >
          {data?.map((user: any) => {
            return (
              <>
               <Link className="user-link" to={"/user/" + user.id} key={user.id}>
                <ListItem  alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={user?.profileImg} />
                  </ListItemAvatar>
                  <ListItemText primary={user.fName + " " + user.lName} />
                </ListItem>
                </Link>
              </>
            );
          })}
        </List>
      )}
    </>
  );
};

export default UserListCard;
