import Home from "./routes/Home.svelte";
import Protected from "./routes/Protected.svelte";
import NotFound from "./routes/NotFound.svelte";
import Login from "./routes/Login.svelte";
import Callback from "./routes/Callback.svelte";

const routes: { [key: string]: any } = {
  "/": Home,
  "/login": Login,
  "/callback": Callback,
  "/protected": Protected,
  "*": NotFound,
};

export default routes;
