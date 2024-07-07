import { useAuth } from "../hooks/useAuth";
import Loading from "./Loading";
import LoginLogoutButton from "./LoginLogoutButton";

const Login = () => {
  const { isLoading } = useAuth();

  if (isLoading) return <Loading />;
  return (
    <div className="root">
      <h1>Log in with OAuth2</h1>
      <LoginLogoutButton />
    </div>
  );
};

export default Login;
