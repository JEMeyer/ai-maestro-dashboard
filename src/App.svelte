<script lang="ts">
  import Router from 'svelte-spa-router';
  import Home from './routes/Home.svelte';
  import Login from './routes/Login.svelte';
  import Callback from './routes/Callback.svelte';
  import BasicTest from './routes/BasicTest.svelte'

  const routes = {
    '/': Home,
    '/login': Login,
    '/callback': Callback,
    '/gpu-locks': BasicTest
  };
</script>

<Router {routes} />
