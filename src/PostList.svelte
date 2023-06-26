<script>
    import { pb, currentPublicUser } from "./lib/pocketbase";
    import { currentPostId, currentUserName } from "./lib/csf";

    export let posts;

    function onOpenPost(p) {
        currentPostId.set(p.id);
    }

    function setUser(u) {
        currentUserName.set(u);
    }

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

    const sortPosts = (post_list) => {
        post_list.sort((a, b) => b.votes - a.votes);
    };
</script>

{#each posts as p, i}
    <div class="columns">
        <div class="column is-narrow">
            <p class="title is-large">{i + 1}</p>
        </div>
        <div class="column is-narrow">
            <span class="icon-text">
                <span class="icon" on:click={upvote(p)}>
                    <ion-icon name="arrow-up-outline" />
                </span>
                <span>{p.votes || 0}</span>
            </span>
        </div>
        <div class="column is-narrow">
            <p on:click={() => onOpenPost(p)}>
                {p.title}
            </p>
            <p>
                (<a href={p.content}> {new URL(p.content).hostname}</a>)
            </p>
        </div>
        <div class="column">
            <span
                class="tag is-primary"
                on:click={() => setUser(p.expand.user.username)}
                >{p.expand.user.username}
            </span>
        </div>
    </div>
{/each}
