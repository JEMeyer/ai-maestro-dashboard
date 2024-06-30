<script lang="ts">
  import { onMount } from 'svelte';
  import { getAuth0Client } from '../authService';
  import type { SvelteComponent } from 'svelte';

  export let component: typeof SvelteComponent;
  let isAuthenticated = false;

  onMount(async () => {
    const auth0 = getAuth0Client();
    isAuthenticated = await auth0.isAuthenticated();
    if (!isAuthenticated) {
      window.location.replace('/login');
    }
  });
</script>

{#if isAuthenticated}
  <svelte:component this={component} />
{/if}
