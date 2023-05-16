import { useIonToast } from "@ionic/react";

function Toast() {
  const [present] = useIonToast();

  const presentToast = (
    msg: string,
    duration: number,
    position: "top" | "middle" | "bottom"
  ) => {
    present({
      message: msg,
      duration: duration,
      position: position,
    });
  };

  return presentToast;
}

export default Toast;
