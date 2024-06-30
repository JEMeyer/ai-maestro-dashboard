// src/authService.ts
import {
  Auth0Client,
  createAuth0Client,
  type Auth0ClientOptions,
} from "@auth0/auth0-spa-js";

let auth0Client: Auth0Client;

export async function initAuth0() {
  const config: Auth0ClientOptions = {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  };
  auth0Client = await createAuth0Client(config);
  console.log("Auth0 initialized", auth0Client);
}

export function getAuth0Client() {
  return auth0Client;
}
