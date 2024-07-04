<script lang="ts">
  import { onMount } from 'svelte';
  import { initAuth, login, logout, isAuthenticated, user, loading } from './auth';
  import Router from 'svelte-spa-router';
  import routes from './routes';

  let isAuthenticatedValue: boolean | undefined;
  let userValue: import('@auth0/auth0-spa-js').User | undefined;
  let loadingValue: boolean | undefined;

  $: isAuthenticated.subscribe(value => isAuthenticatedValue = value);
  $: user.subscribe(value => userValue = value);
  $: loading.subscribe(value => loadingValue = value);

  onMount(() => {
    initAuth();
  });
</script>

<style>
  .nav {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    background-color: #f8f9fa;
  }
</style>

<div class="nav">
  <div>
    <a href="/">Home</a>
    {#if isAuthenticatedValue}
      <a href="/protected">Protected</a>
    {/if}
  </div>
  <div>
    {#if loadingValue}
      <span>Loading...</span>
    {:else}
      {#if isAuthenticatedValue}
        <span>{userValue?.name}</span>
        <button on:click={logout}>Logout</button>
      {:else}
        <a href="/login">Login</a>
      {/if}
    {/if}
  </div>
</div>

<Router {routes} />
