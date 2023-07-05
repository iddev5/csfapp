<script>
    import { pb } from "./lib/pocketbase";
    import { avatar, timeAgo } from "./lib/csf";
    import { onMount } from "svelte";
    import { push, pop } from "svelte-spa-router";
    import PostList from "./PostList.svelte";

    export let params = {};
    let id = undefined;
    let user = undefined;
    let posts = [];
    let activity = [];

    function onBack() {
        pop();
    }

    function setPost(p) {
        push(`/post/${p}`);
    }

    onMount(async () => {
        user = await pb
            .collection("publicusers")
            .getFirstListItem(`username="${params.username}"`, {});
        id = user.id;

        const postList = await pb.collection("posts").getList(1, 10, {
            filter: `user="${id}"`,
            sort: "-created",
        });
        postList.items.map(
            (post) => (post.expand = { user: { username: params.username } })
        );
        posts = postList.items;

        const voteList = await pb.collection("votes").getList(1, 10, {
            filter: `user="${id}"`,
            sort: "-created",
            expand: "post",
        });
        activity = voteList.items;

        const commentList = await pb.collection("comments").getList(1, 10, {
            filter: `user="${id}"`,
            sort: "-created",
            expand: "post",
        });
        activity = activity.concat(commentList.items);
        activity.sort((a, b) => {
            return new Date(b.created) - new Date(a.created);
        });
        activity = activity;
    });
</script>

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
    {#if user}
        <div class="column is-narrow">
            <figure class="image is-48x48">
                <img src={avatar(user)} alt="avatar" />
            </figure>
        </div>
        <div class="column">
            <p class="title is-large">{user.username}</p>
        </div>
    {/if}
</div>

<div class="columns">
    <div class="column">
        <p class="title is-large">Posts</p>
        <PostList {posts} />
    </div>
    <div class="column">
        <p class="title is-large">Activity</p>
        {#each activity as act}
            {#if act.collectionName === "votes"}
                <div class="columns">
                    <div class="column is-narrow">
                        <p>
                            {user.username} voted post
                        </p>
                    </div>
                    <div class="column is-narrow">
                        <span
                            class="tag is-primary"
                            on:click={() => setPost(act.expand.post.id)}
                        >
                            {act.expand.post.title}</span
                        >
                    </div>
                    <div class="column is-narrow">
                        <p>{timeAgo(act.created)}</p>
                    </div>
                </div>
            {:else}
                <div class="columns">
                    <div class="column is-narrow">
                        <p>{user.username} commented on post</p>
                    </div>
                    <div class="column is-narrow">
                        <span
                            class="tag is-primary"
                            on:click={() => setPost(act.expand.post.id)}
                            >{act.expand.post.title}</span
                        >
                    </div>
                    <div class="column is-narrow">
                        <p>{timeAgo(act.created)}</p>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
</div>
