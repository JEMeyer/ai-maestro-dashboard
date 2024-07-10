import { useIsBusy } from "../state/app";
import Loading from "./Loading";

interface LoadingWrapperProps {
  children: React.ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const isBusy = useIsBusy();

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
