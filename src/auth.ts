import {
  Auth0Client,
  createAuth0Client,
  User,
  type Auth0ClientOptions,
} from "@auth0/auth0-spa-js";
import { writable } from "svelte/store";

let auth0Client: Auth0Client;
const isAuthenticated = writable(false);
const user = writable<User | undefined>(undefined);
const loading = writable(true);

async function initAuth(): Promise<void> {
  const clientOptions: Auth0ClientOptions = {
    domain: import.meta.env.VITE_AUTH0_DOMAIN as string,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID as string,
    authorizationParams: {
      redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI as string,
    },
  };

  auth0Client = await createAuth0Client(clientOptions);

  try {
    if (
      window.location.search.includes("code=") &&
      window.location.search.includes("state=")
    ) {
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  } catch (error) {
    console.error(error);
  }

  isAuthenticated.set(await auth0Client.isAuthenticated());

  if (await auth0Client.isAuthenticated()) {
    user.set(await auth0Client.getUser());
  }

  loading.set(false);
}

async function login(): Promise<void> {
  await auth0Client.loginWithRedirect({
    authorizationParams: {
      redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI as string,
    },
  });
}

async function logout(): Promise<void> {
  auth0Client.logout({
    logoutParams: {
      returnTo: import.meta.env.VITE_AUTH0_REDIRECT_URI as string,
    },
  });
}

export { initAuth, login, logout, isAuthenticated, user, loading };
