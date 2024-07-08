import { useAppState } from "../hooks/useAppState";
import Loading from "./Loading";

interface LoadingWrapperProps {
  children: React.ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const { isBusy } = useAppState();

  return (
    <>
      {children}
      {isBusy && (
        <div className="loading-overlay">
          <Loading />
        </div>
      )}
    </>
  );
};

export default LoadingWrapper;
