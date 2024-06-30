<!-- src/routes/Home.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { getAuth0Client } from '../authService';
  import type { User } from '@auth0/auth0-spa-js';

  let user: User | undefined;

  onMount(async () => {
    const auth0 = getAuth0Client();
    user = await auth0.getUser();
    console.log('User information loaded', user);
  });
</script>

{#if user}
  <div>
    <h1>Welcome, {user.name}!</h1>
    <p>Email: {user.email}</p>
    <a href="/gpu-locks">Go to GPU Lock Dashboard</a>
  </div>
{:else}
  <p>Loading user information...</p>
{/if}
