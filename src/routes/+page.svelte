<script lang="ts">
    import { page } from '$app/stores';
    import Table from '$lib/components/table.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    const meds = data.meds;
</script>

<div class="flex flex-col items-center justify-center">
{#if $page.data.session}
    <a class="btn btn-primary" href="/dashboard/add_med">Add Medicine</a>
    <Table {meds} />
{:else}
    <div class="card bg-primary text-primary-content w-96">
      <div class="card-body">
        <h2 class="card-title">Card title!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
      </div>
    </div>
{/if}
</div>
