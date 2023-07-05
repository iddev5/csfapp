<script>
    import { onMount } from "svelte";
    import {
        pb,
        currentUser,
        currentPublicUser,
        getCurrentPublicUser,
    } from "./lib/pocketbase";
    import PostList from "./PostList.svelte";

    onMount(async () => {
        currentPublicUser.set(await getCurrentPublicUser());

        let post_list = [];
        const list = await pb.collection("posts").getList(1, 50, {
            expand: "user",
            $autoCancel: false,
        });
        post_list = list.items;

        const votes = await pb.collection("votes").getFullList({
            filter: post_list.map((p) => `post="${p.id}"`).join("||"),
            field: "post",
            $autoCancel: false,
        });

        const post_votes = {};
        // Collect all votes
        votes.map((v) => (post_votes[v.post] = (post_votes[v.post] ?? 0) + 1));
        // Update votes of all posts
        post_list.map((p) => (p.votes = post_votes[p.id] ?? 0));
        // Sort the posts according to decreasing votes
        sortPosts(post_list);
        posts = post_list;
    });

    const sortPosts = (post_list) => {
        post_list.sort((a, b) => b.votes - a.votes);
    };

    let posts = [];
    let newPost = false;
    let newPostTitle = "";
    let newPostUrl = "";

    let createPost = async () => {
        const post = await pb.collection("posts").create({
            title: newPostTitle,
            content: newPostUrl,
            user: $currentPublicUser.id,
        });
        post.expand = { user: $currentPublicUser };

        createPostCancel();

        // No need to sort, new posts should be at the bottom with 0 votes
        // and a post cannot have negative votes.
        posts = [...posts, post];
    };

    let createPostCancel = () => {
        newPost = false;
        newPostTitle = "";
        newPostUrl = "";
    };

    const upvote = async (post) => {
        const vote = await pb.collection("votes").getFullList({
            filter: `user="${$currentPublicUser.id}"&&post="${post.id}"`,
            fields: "id",
        });

        if (vote.length == 0) {
            await pb.collection("votes").create({
                user: $currentPublicUser.id,
                post: post.id,
            });

            post.votes = post.votes + 1;
            sortPosts(posts);
            posts = posts;
        }
    };
</script>

{#if $currentUser}
    <div class="modal" class:is-active={newPost}>
        <div class="modal-background" />
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Create new post...</p>
                <button
                    class="delete"
                    aria-label="close"
                    on:click={() => (newPost = false)}
                />
            </header>
            <section class="modal-card-body">
                <form on:submit|preventDefault>
                    <div class="field">
                        <label class="label">Title</label>
                        <div class="control">
                            <input
                                class="input"
                                placeholder="Title"
                                type="text"
                                bind:value={newPostTitle}
                            />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Link</label>
                        <div class="control">
                            <input
                                class="input"
                                placeholder="Link"
                                type="text"
                                bind:value={newPostUrl}
                            />
                        </div>
                    </div>
                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-link" on:click={createPost}
                                >Create Post</button
                            >
                        </div>
                        <div class="control">
                            <button
                                class="button is-link is-light"
                                on:click={createPostCancel}>Cancel</button
                            >
                        </div>
                    </div>
                </form>
            </section>
        </div>
    </div>

    <div class="button is-primary" on:click={() => (newPost = true)}>
        New Post
    </div>
{/if}

<PostList {posts} />
