<script lang="ts">
    import { superForm } from 'sveltekit-superforms';
    import type { PageData } from './$types';
    import { page } from '$app/stores';
    import Form from '$lib/components/form.svelte';

    let editMode = true;
    let { data }: { data: PageData } = $props();

    const { form: medForm, errors, enhance, constraints } = superForm(data.form, {
        invalidateAll: 'force',
    });
</script>

{#if $page.data.session}
<Form {medForm} {errors} {enhance} {constraints} {editMode}/>
{/if}
