<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchInitialData, subscribeToRedisChannel } from '../utils/redisClient';

    let data: { [key: string]: string } = {};
    let loading = true;

    const initializeData = async () => {
      const initialData = await fetchInitialData();
      data = initialData;
      loading = false;
    };

    onMount(() => {
      initializeData();

      subscribeToRedisChannel('gpu-lock-changes', (message: string) => {
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
