import { useAuth } from "../hooks/useAuth";
import { useAppState } from "../hooks/useAppState";

const OAuthLogin: React.FC = () => {
  const { handleLogin, handleLogout, user } = useAuth();
  const { setIsBusy } = useAppState();

  return (
    <div>
      {user == null ? (
        <button
          onClick={() => {
            setIsBusy(true);
            handleLogin();
          }}
        >
          Login
        </button>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};
export default OAuthLogin;
