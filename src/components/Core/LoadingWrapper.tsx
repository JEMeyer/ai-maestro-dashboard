import styled from "styled-components";
import { useIsBusy } from "../../state/app";
import { ClipLoader } from "react-spinners";

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

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7); // semi-opaque white div
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // ensure the overlay is above other elements
`;

interface LoadingWrapperProps {
  children: React.ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const isBusy = useIsBusy();

  return (
    <>
      {children}
      {isBusy && (
        <LoadingOverlay>
          <Loading />
        </LoadingOverlay>
      )}
    </>
  );
};

export default LoadingWrapper;
