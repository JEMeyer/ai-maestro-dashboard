<script>
  import Router from 'svelte-spa-router';
  import Home from './routes/Home.svelte';
  import NotFound from './routes/NotFound.svelte'; // Optional, for 404 handling

  const routes = {
    '/': Home,
    '*': NotFound, // Optional, for 404 handling
  };
</script>

<Router {routes} />
