import { initAuth0 } from "./authService";
import App from "./App.svelte";

const target = document.getElementById("app");

if (target) {
  initAuth0()
    .then(() => {
      new App({
        target,
      });
    })
    .catch((err) => {
      console.error("Failed to initialize Auth0", err);
    });
} else {
  console.error("Target element not found");
}
