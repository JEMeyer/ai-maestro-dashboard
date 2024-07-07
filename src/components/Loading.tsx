import React from "react";
import { ClipLoader } from "react-spinners";

const Loading: React.FC = () => {
  return (
    <div style={styles.container}>
      <ClipLoader color="#36d7b7" size={50} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
  },
};

export default Loading;
