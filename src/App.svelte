<script>
    import { onMount } from "svelte";
    import { pb, currentUser, currentPublicUser } from "./lib/pocketbase";
    import Post from "./Post.svelte";
    import Login from "./Login.svelte";
    import UserProfile from "./UserProfile.svelte";
    import PostList from "./PostList.svelte";

    let toLogin = false;
    let toSignIn = false;

    onMount(async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        openPost = urlParams.get("post");
        openUser = urlParams.get("user");

        let post_list = [];
        const list = await pb.collection("posts").getList(1, 50, {
            expand: "user",
        });
        post_list = list.items;

        const votes = await pb.collection("votes").getFullList({
            filter: post_list.map((p) => `post="${p.id}"`).join("||"),
            field: "post",
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

    let openPost = null;
    let openUser = null;
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

    pb.authStore.onChange(() => {
        // Is this predictable enough?
        toLogin = false;
        toSignIn = false;
    });
</script>

<nav class="navbar is-danger" role="navigation" aria-label="main-navigation">
    <div class="navbar-menu">
        <div class="navbar-brand">
            <!-- TODO: is-active -->
            <a
                role="button"
                class="navbar-burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbar-main"
            >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
            </a>
        </div>
        <div id="navbar-main" class="navbar-menu">
            <div class="navbar-end">
                <div class="navbar-item">
                    {#if $currentUser}
                        <div class="buttons">
                            <div
                                class="button is-primary"
                                on:click={() => (newPost = true)}
                            >
                                New Post
                            </div>
                            <div
                                class="button is-link is-light"
                                on:click={() => pb.authStore.clear()}
                            >
                                Sign Out
                            </div>
                        </div>
                    {:else}
                        <div class="buttons">
                            <div
                                class="button is-link"
                                on:click={() => (toLogin = true)}
                            >
                                Login
                            </div>
                            <div
                                class="button is-link is-light"
                                on:click={() => (toSignIn = true)}
                            >
                                Sign In
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</nav>

{#if toLogin}
    <Login
        onCancel={() => {
            toLogin = false;
        }}
    />
{:else if toSignIn}
    <Login toSignIn="true" onCancel={() => (toSignIn = false)} />
{/if}

<div class="columns">
    {#if !toSignIn && !toLogin}
        <div class="column is-2">
            <aside class="menu">
                <ul class="menu-list">
                    <li><a>NEWS BOARD</a></li>
                    <li><a>ALL NEWS</a></li>
                    <li><a>TOP OFFERS</a></li>
                    <li><a>TOP GAMES</a></li>
                </ul>
            </aside>
        </div>

        <div class="column">
            {#if $currentUser}
                <!--p>Signed in as {$currentUser.username}</p-->

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
                                        <button
                                            class="button is-link"
                                            on:click={createPost}
                                            >Create Post</button
                                        >
                                    </div>
                                    <div class="control">
                                        <button
                                            class="button is-link is-light"
                                            on:click={createPostCancel}
                                            >Cancel</button
                                        >
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            {/if}

            {#if openPost != null}
                <Post id={openPost} onBack={() => (openPost = null)} />
            {:else if openUser != null}
                <UserProfile id={openUser} onBack={() => (openUser = null)} />
            {:else}
                <PostList {posts} onOpenPost={(p) => (openPost = p.id)} />
            {/if}
        </div>
    {/if}
</div>
