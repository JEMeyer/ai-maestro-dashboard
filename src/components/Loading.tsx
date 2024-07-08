import { ClipLoader } from "react-spinners";
import React from "react";

const Loading: React.FC = () => {
  return (
    <div style={styles.container}>
      <ClipLoader color="#36d7b7" size={100} />
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
