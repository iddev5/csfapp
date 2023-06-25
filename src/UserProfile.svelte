<script>
    import { pb } from "./lib/pocketbase";
    import { timeAgo } from "./lib/csf";
    import { onMount } from "svelte";
    import PostList from "./PostList.svelte";

    export let id;
    export let onBack;
    let user = undefined;
    let posts = [];
    let activity = [];

    onMount(async () => {
        user = await pb.collection("publicusers").getOne(id);
        const postList = await pb.collection("posts").getList(1, 10, {
            filter: `user="${id}"`,
            sort: "-created",
        });
        postList.items.map((post) => (post.expand = { user: id }));
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
        console.log(activity);
        activity = activity;
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

<div class="columns">
    <div class="column">
        <p class="title is-large">Posts</p>
        <PostList {posts} onOpenPost={0} />
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
                        <!-- TODO: clickable -->
                        <span class="tag is-primary"
                            >{act.expand.post.title}</span
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
                        <span class="tag is-primary"
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
