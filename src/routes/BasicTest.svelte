<script>
    console.log('BasicTest component is being loaded'); // Initial log

    import { onMount } from 'svelte';

    onMount(() => {
      console.log('BasicTest onMount is being executed'); // Log inside onMount
    });
  </script>

  <p>BasicTest Component Loaded</p>
