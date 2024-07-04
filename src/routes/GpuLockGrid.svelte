<!-- src/routes/GpuLockGrid.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { subscribeToChannel, getKeyValuePairsByPattern } from '../utils/socketIOService';

  interface Data {
    [key: string]: string;
  }

  let data: Data = {}; // Initialize as an object of type Data
  let loading: boolean = true;
  let isAuthenticated = false;

  const initializeData = async () => {
    try {
      const initialData = await getKeyValuePairsByPattern('gpu-lock:*');
      console.log('Initial data loaded', initialData); // Log initial data
      const formattedData = Object.entries(initialData).reduce((acc, [key, value]) => {
        const gpuId = key.split(':').pop();
        if (gpuId) {
          acc[gpuId] = value;
        }
        return acc;
      }, {} as Data);
      data = formattedData;
    } catch (err) {
      console.error("Failed to initialize data:", err);
    } finally {
      loading = false;
    }
  };

  onMount(async () => {
    isAuthenticated = true;
    console.log('User authenticated:', isAuthenticated); // Log authentication status
    if (!isAuthenticated) {
      window.location.replace('/login');
    } else {
      await initializeData();
      console.log('Data initialized', data); // Log data initialization

      subscribeToChannel('gpu-lock-changes', (message: string) => {
        try {
          const parsedMessage = JSON.parse(message);
          data = { ...data, ...parsedMessage };
          console.log('Received message', parsedMessage); // Log received message
        } catch (err) {
          console.error("Failed to parse message:", err);
        }
      });
    }
  });
</script>

<style>
  .container {
    padding: 20px;
  }
  .title {
    text-align: center;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .status-card {
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  .free {
    background-color: lightgreen;
  }
  .locked {
    background-color: lightcoral;
  }
</style>

{#if loading}
  <div>Loading...</div>
{:else}
  <div class="container">
    <h1 class="title">Protected GPU Lock Dashboard</h1>
    <div class="grid">
      {#each Object.keys(data) as key}
        <div class="status-card {data[key] === '0' ? 'free' : 'locked'}">
          <h2>GPU {key}</h2>
          <p>{data[key] === '0' ? 'Free' : 'Locked'}</p>
        </div>
      {/each}
    </div>
  </div>
{/if}
