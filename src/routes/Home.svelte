<script lang="ts">
  import { onMount } from 'svelte';
  import { subscribeToChannel, getKeyValuePairsByPattern } from '../utils/signalRService';

  let data: { [key: string]: string } = {};
  let loading = true;

  const initializeData = async () => {
    try {
      const initialData = await getKeyValuePairsByPattern('gpu-lock:*');
      const formattedData = Object.entries(initialData).reduce((acc, [key, value]) => {
        const gpuId = key.split(':').pop(); // Extract the number after the ':'
        if (gpuId) {
          acc[gpuId] = value;
        }
        return acc;
      }, {} as { [key: string]: string });
      data = formattedData;
    } catch (err) {
      console.error("Failed to initialize data:", err);
    } finally {
      loading = false;
    }
  };

  onMount(() => {
    initializeData();

    subscribeToChannel('gpu-lock-changes', (message: string) => {
      const parsedMessage = JSON.parse(message);
      console.log('Received event data:', parsedMessage);
      data = { ...data, ...parsedMessage };
    });
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
    <h1 class="title">GPU Lock Dashboard</h1>
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
