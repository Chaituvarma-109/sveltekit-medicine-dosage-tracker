<script lang="ts">
    import Form from '$lib/components/form.svelte';
    import type { PageData } from './$types'
    import {superForm} from "sveltekit-superforms";
    import { page } from '$app/stores';

    let editMode = false;
    let { data }: { data: PageData } = $props();

    const { form: medForm, errors, enhance, constraints } = superForm(data.form);

</script>

{#if $page.data.session}
<Form {medForm} {errors} {enhance} {constraints} {editMode}/>
{/if}
