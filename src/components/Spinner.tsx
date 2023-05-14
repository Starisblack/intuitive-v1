import { IonSpinner } from "@ionic/react";

const Spinner = () => {
  return <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <IonSpinner name="circles"></IonSpinner>
  </div>;
};

export default Spinner;
