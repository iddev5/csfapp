<script>
    import { pb, currentPublicUser } from "./lib/pocketbase";
    import { onMount } from "svelte";

    export let comment = undefined;
    export let indent = 0;
    let subcomments = [];
    let newCommentText = "";
    let replyTo = false;

    onMount(async () => {
        const commentList = await pb.collection("comments").getList(1, 50, {
            filter: `post="${comment.post}" && parent="${comment.id}"`,
            expand: "user",
            $autoCancel: false,
        });
        subcomments = commentList.items;
    });

    const createComment = async () => {
        const subcomment = await pb.collection("comments").create({
            text: newCommentText,
            post: comment.post,
            user: $currentPublicUser.id,
            parent: comment.id,
        });

        newCommentText = "";
        replyTo = false;
        subcomments = [...subcomments, subcomment];
    };
</script>

<div class="columns m-2">
    <p class="column is-{indent}" />
    <div class="column is-narrow">
        <figure class="image is-48x48">
            <!-- TODO: use dicebear pkg -->
            <img
                src="https://api.dicebear.com/5.3/shapes/svg?seed={comment
                    .expand.user.username}"
                alt="avatar"
            />
        </figure>
    </div>
    <p class="column is-narrow">
        {comment?.text ?? " "}
    </p>
    <div class="column">
        <span on:click|preventDefault={() => (replyTo = true)}>
            <ion-icon name="arrow-back" />
        </span>
    </div>
</div>

{#if replyTo}
    <div class="columns">
        <div class="column is-{indent}" />
        <div class="column">
            <form class="columns" on:submit|preventDefault>
                <div class="field column">
                    <label class="label">Comment</label>
                    <div class="control">
                        <textarea
                            class="textarea"
                            bind:value={newCommentText}
                        />
                    </div>
                </div>
                <div class="field column is-grouped mt-5 pt-4">
                    <div class="control">
                        <button
                            class="button is-link is-light"
                            type="submit"
                            on:click={createComment}>Comment</button
                        >
                    </div>
                    <div class="control">
                        <button
                            class="button is-link is-light"
                            on:click={() => (replyTo = false)}>Cancel</button
                        >
                    </div>
                </div>
            </form>
        </div>
    </div>
{/if}
<!--{comment?.expand.user.username}-->

{#each subcomments as comment}
    <svelte:self {comment} indent={indent + 1} />
{/each}
