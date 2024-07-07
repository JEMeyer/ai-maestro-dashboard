import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    define: {
      "import.meta.env.VITE_AUTHENTIK_URL": JSON.stringify(
        "VITE_AUTHENTIK_URL_PLACEHOLDER"
      ),
      "import.meta.env.VITE_AUTHENTIK_CLIENT_ID": JSON.stringify(
        "VITE_AUTHENTIK_CLIENT_ID_PLACEHOLDER"
      ),
      "import.meta.env.VITE_AUTHENTIK_CLIENT_SECRET": JSON.stringify(
        "VITE_AUTHENTIK_CLIENT_SECRET_PLACEHOLDER"
      ),
      "import.meta.env.VITE_API_BASE_URL": JSON.stringify(
        "VITE_API_BASE_URL_PLACEHOLDER"
      ),
    },
  },
});
