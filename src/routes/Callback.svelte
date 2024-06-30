<script lang="ts">
    import { onMount } from 'svelte';
    import { getAuth0Client } from '../authService';

    onMount(async () => {
      const auth0 = getAuth0Client();
      try {
        await auth0.handleRedirectCallback();
        console.log('Handled redirect callback'); // Add this line
        window.location.replace('/');
      } catch (err) {
        console.error('Error handling redirect callback:', err); // Add this line
      }
    });
  </script>

  <p>Handling callback...</p>
