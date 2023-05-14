import React, {FC, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditProfile from '../pages/Profile/EditProfile/EditProfile';
import { IonLoading } from '@ionic/react';
import { Redirect, useHistory } from 'react-router';

type PopUpProps = {
    children?: any,
    openPopUp?: any,
    id:any
    handleClose?: any
    userDetail: any
}

const PopUp: FC<PopUpProps> = ({id, openPopUp, handleClose, userDetail}) => {
  
  const [loading, setLoading] = useState(false);
  const history = useHistory()


   const redirect = () => {
     <Redirect  to="/profile" />
    //  history.push("/profile")
   }


  return (
    <div>
        <IonLoading
        cssClass="my-custom-class"
        isOpen={loading}
        onDidDismiss={() =>  redirect()}
        message={"Updating..."}
      />
     {!loading && <Dialog open={openPopUp} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
         <EditProfile id={id} setLoading={setLoading} handleClose={handleClose} userDetail={userDetail}  />
        </DialogContent>
      </Dialog>}
    </div>
  );
}

export default PopUp;