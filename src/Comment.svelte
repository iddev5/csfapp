<div class="columns">
    <p class="column is-{indent}"></p>
    <p class="column">
        {comment?.text ?? " "}
    </p>
    <div class="">
        <button class="button is-link is-small" on:click|preventDefault="{() => replyTo=true}">
            Reply
        </button>
    </div>
</div>

{#if replyTo != false} 
    <form on:submit|preventDefault="{createComment}">
        <textarea bind:value="{newCommentText}" />
        <button type="submit">Comment</button>
    </form>
{/if}
<!--{comment?.expand.user.username}-->

{#each subcomments as comment}
    <svelte:self {comment} indent={indent+1}/>
{/each}

<script>
    import { pb, currentPublicUser } from './lib/pocketbase';
    import { onMount } from 'svelte';

    export let comment = undefined;
    export let indent = 0;
    let subcomments = [];
    let newCommentText = "";
    let replyTo = false;

    onMount(async () => {
        const commentList = await pb.collection('comments').getList(1, 50, {
            filter: `post="${comment.post}" && parent="${comment.id}"`,
            expand: 'user', 
            '$autoCancel': false 
        });
        subcomments = commentList.items;
    });

    const createComment = async () => {
        const subcomment = await pb.collection('comments')
            .create({
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
