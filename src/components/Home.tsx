import { useAppState } from "../hooks/useAppState";
import Loading from "./Loading";
import LoginLogoutButton from "./LoginLogoutButton";

const Home = () => {
  const { isBusy } = useAppState();

  if (isBusy) return <Loading />;

  return (
    <div className="root">
      <h1>Log in with OAuth2</h1>
      <LoginLogoutButton />
    </div>
  );
};

export default Home;
