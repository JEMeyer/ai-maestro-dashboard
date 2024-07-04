<script lang="ts">
  import { isAuthenticated, loading } from '../auth';
  import { onDestroy } from 'svelte';

  let isAuthenticatedValue: boolean = false;
  let loadingValue: boolean = false;

  const unsubscribeIsAuthenticated = isAuthenticated.subscribe(value => isAuthenticatedValue = value);
  const unsubscribeLoading = loading.subscribe(value => loadingValue = value);

  if (!loadingValue && !isAuthenticatedValue) {
    window.location.href = '/';
  }

  onDestroy(() => {
    unsubscribeIsAuthenticated();
    unsubscribeLoading();
  });
</script>

{#if loadingValue}
  <p>Loading...</p>
{:else}
  <h1>Protected Page</h1>
  <p>This is a protected page. You must be logged in to see this content.</p>
{/if}
