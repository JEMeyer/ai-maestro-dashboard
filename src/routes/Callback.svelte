<!-- src/routes/Callback.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { loading, initAuth } from '../auth';

  onMount(async () => {
    await initAuth();
    window.location.href = '/';
  });
</script>

<p>Processing login...</p>
