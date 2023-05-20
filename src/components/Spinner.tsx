import { IonSpinner } from "@ionic/react";

const Spinner = () => {
  return <div
    style={{
      height: "70vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <IonSpinner name="circles"></IonSpinner>
  </div>;
};

export default Spinner;
