<script lang="ts">
    import { signIn, signOut } from '@auth/sveltekit/client';
    import { page } from '$app/stores';
</script>

<div class="navbar bg-base-100">
    <div class="flex-1">
      <a href="/" class="btn btn-ghost normal-case text-xl">Medicine Dosage Tracker</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        {#if $page.data.session}
        <li><button on:click={() => signOut()}>Logout</button></li>
        {:else}
        <li><button on:click={() => signIn("github")}>Login</button></li>
        {/if}
      </ul>
    </div>
</div>
