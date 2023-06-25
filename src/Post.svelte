<script>
    import { onMount } from "svelte";
    import { pb, currentPublicUser } from "./lib/pocketbase";
    import { timeAgo } from "./lib/csf";
    import Comment from "./Comment.svelte";

    export let id;
    export let onBack;

    onMount(async () => {
        post = await pb.collection("posts").getOne(id, {
            expand: "user",
            fields: "id,title,content,user,created",
        });
        post.expand = {
            user: await pb.collection("publicusers").getOne(post.user),
        };

        const commentList = await pb.collection("comments").getList(1, 50, {
            filter: `post="${post.id}" && parent=null`,
            expand: "user",
        });
        comments = commentList.items;
    });

    let post = undefined;
    let comments = [];
    let newCommentText = "";

    let createComment = async () => {
        const comment = await pb.collection("comments").create({
            text: newCommentText,
            post: id,
            user: $currentPublicUser.id,
        });

        newCommentText = "";
        comments = [...comments, comment];
    };
</script>

{#if post}
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
        <div class="column is-narrow">
            <h4 class="title is-3">
                {post.title}
            </h4>
            <div class="columns">
                <div class="column is-narrow">
                    <p>
                        (<a href={post.content}>
                            {new URL(post.content).hostname}</a
                        >)
                    </p>
                </div>
                <!-- TODO: correct comments count -->
                <div class="column is-narrow">{comments.length} comments</div>
                <div class="column is-narrow">
                    Posted {timeAgo(post.created)}
                </div>
            </div>
        </div>
        <div class="column">
            <span class="tag is-primary mt-2">
                <!-- TODO: clickable -->
                <a>{post.expand.user?.username ?? " "}</a>
            </span>
        </div>
    </div>

    <form class="columns" on:submit|preventDefault={createComment}>
        <div class="field column">
            <label class="label">Comment</label>
            <div class="control">
                <textarea class="textarea" bind:value={newCommentText} />
            </div>
        </div>
        <div class="field column">
            <div class="control mt-5 pt-2">
                <button class="button is-link is-light" type="submit"
                    >Comment</button
                >
            </div>
        </div>
    </form>
{/if}

{#each comments as comment}
    <Comment {comment} />
{/each}
