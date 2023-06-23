<script>
    import { pb } from "./lib/pocketbase";
    import { onMount } from "svelte";

    export let id;
    export let onBack;
    let user = undefined;

    onMount(async () => {
        user = await pb.collection("publicusers").getOne(id);
    });
</script>

{#if user}
    <div class="columns">
        <div class="column is-narrow">
            <div class="button" on:click={onBack}>
                <span class="icon-text">
                    <span class="icon">
                        <ion-icon name="chevron-back-outline" />
                    </span>
                    <span>Back</span>
                </span>
            </div>
        </div>
        <div class="column">
            <p class="title is-large">{user.username}</p>
        </div>
    </div>
{/if}
