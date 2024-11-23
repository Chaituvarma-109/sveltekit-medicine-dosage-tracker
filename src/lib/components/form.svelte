<script lang="ts">
    let { medForm, errors, enhance, constraints, editMode } = $props();
</script>

<form use:enhance method="post" action="?/add" class="flex flex-col gap-5 justify-center items-center">
    <label for="medicine_name">Medicine Name</label>
    <input class="input input-bordered w-full max-w-xs" type="text" name="medicine_name" bind:value={$medForm.medicine_name} {...$constraints.medicine_name} />
    {#if $errors.medicine_name}
        <small>{$errors.medicine_name}</small>
    {/if}

    <label for="quantity">Quantity</label>
    <input class="input input-bordered w-full max-w-xs" type="number" name="quantity" bind:value={$medForm.quantity} {...$constraints.quantity} />
    {#if $errors.quantity}
        <small>{$errors.quantity}</small>
    {/if}

    <label for="dosage">Dosage</label>
    <select class="select select-bordered w-full max-w-xs" name="dosage" bind:value={$medForm.dosage} {...$constraints.dosage}>
        <option value="mg">Mg</option>
        <option value="ml">Ml</option>
    </select>
    {#if $errors.dosage}
        <small>{$errors.dosage}</small>
    {/if}

    <label for="start_date">Start Date</label>
    <input class="input input-bordered w-full max-w-xs" type="date" name="start_date" bind:value={$medForm.start_date} {...$constraints.start_date} />
    {#if $errors.start_date}
        <small>{$errors.start_date}</small>
    {/if}

    <label for="end_date">End Date</label>
    <input class="input input-bordered w-full max-w-xs" type="date" name="end_date" bind:value={$medForm.end_date} {...$constraints.end_date} />
    {#if $errors.end_date}
        <small>{$errors.end_date}</small>
    {/if}

    <label for="time">Time</label>
    <input class="input input-bordered w-full max-w-xs" type="time" name="time" step="1" bind:value={$medForm.time} {...$constraints.time} />
    {#if $errors.time}
        <small>{$errors.time}</small>
    {/if}

    <label for="frequency">Frequency</label>
    <input class="input input-bordered w-full max-w-xs" type="number" name="frequency" bind:value={$medForm.frequency} {...$constraints.frequency} />
    {#if $errors.frequency}
        <small>{$errors.frequency}</small>
    {/if}

    {#if editMode}
        <button formaction="?/edit" class="btn btn-primary" type="submit">Edit Medicine</button>
    {:else}
        <button class="btn btn-primary" type="submit">Add Medicine</button>
    {/if}
</form>
