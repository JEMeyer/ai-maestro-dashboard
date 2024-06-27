import App from "./App.svelte";

const target = document.getElementById("app");

let app;

if (target) {
  app = new App({
    target,
  });
} else {
  console.error("Target element not found");
}

export default app;
