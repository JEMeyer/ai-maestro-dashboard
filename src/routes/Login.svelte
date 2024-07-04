<!-- src/routes/Login.svelte -->
<script lang="ts">
  import { login } from '../auth';

  // Automatically initiate the login process when the component is loaded
  login();
</script>

<p>Redirecting to login...</p>
