<script>
    import { onMount } from "svelte";
    import { pb, currentPublicUser } from "./lib/pocketbase";
    import { timeAgo } from "./lib/csf";
    import { push, pop } from "svelte-spa-router";
    import Comment from "./Comment.svelte";

    onMount(async () => {
        post = await pb.collection("posts").getOne(params.id, {
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

        const commentListCount = await pb.collection("comments").getList(1, 1, {
            filter: `post="${post.id}"`,
        });
        commentCount = commentListCount.totalItems;
    });

    export let params = {};
    let post = undefined;
    let comments = [];
    let commentCount = 0;
    let newCommentText = "";

    let createComment = async () => {
        const comment = await pb.collection("comments").create({
            text: newCommentText,
            post: post.id,
            user: $currentPublicUser.id,
        });

        newCommentText = "";
        comments = [...comments, comment];
    };

    function onBack() {
        pop();
    }

    function setUser(u) {
        // TODO: borked navigation
        push(`/user/${u}`);
    }
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
                <div class="column is-narrow">{commentCount} comments</div>
                <div class="column is-narrow">
                    Posted {timeAgo(post.created)}
                </div>
            </div>
        </div>
        <div class="column">
            <span
                class="tag is-primary mt-2"
                on:click={() => setUser(post.expand.user?.username)}
            >
                {post.expand.user?.username ?? " "}
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
