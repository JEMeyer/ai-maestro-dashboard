<script lang="ts">
  import { onMount } from 'svelte';
  import { getAuth0Client } from '../authService';

  onMount(async () => {
    const auth0 = getAuth0Client();
    await auth0.loginWithRedirect();
  });
</script>

<p>Redirecting to login...</p>
