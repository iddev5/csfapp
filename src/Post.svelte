<button class="" on:click="{onBack}">Back</button>
{#if post}
    <div class="columns">
        <div class="column">
            <h4 class="title is-4">
                {post.title}
            </h4>
        </div>
        <div class="column">
            <span class="tag is-primary">
                {post.expand.user?.username ?? " "}
            </span>
        </div>
    </div>
    <a href="{post.content}">Link</a>
    
    <form on:submit|preventDefault="{createComment}">
        <textarea bind:value="{newCommentText}" />
        <button type="submit">Comment</button>
    </form>
{/if}

{#each comments as comment}
    <Comment comment={comment} />
{/each}

<script>
    import { onMount } from 'svelte';
    import { pb, currentPublicUser } from './lib/pocketbase';
    import Comment from './Comment.svelte';

    export let id;
    export let onBack;

    onMount(async () => {
        post = await pb.collection("posts").getOne(id, {
            expand: 'user',
            fields: 'id,title,content,user'
        });
        post.expand = { user: await pb.collection('publicusers').getOne(post.user) };

        const commentList = await pb.collection('comments')
            .getList(1, 50, {
                filter: `post="${post.id}" && parent=null`,
                expand: 'user'
            });
        comments = commentList.items;
    });

    let post = undefined;
    let comments = [];
    let newCommentText = "";

    let createComment = async () => {
        const comment = await pb.collection('comments')
            .create({
                text: newCommentText,
                post: id,
                user: $currentPublicUser.id,
            });

        newCommentText = "";
        comments = [...comments, comment];
    };
</script>
