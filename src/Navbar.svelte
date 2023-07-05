<script>
    import { pb, currentUser } from "./lib/pocketbase";
    import { push } from "svelte-spa-router";
</script>

<nav
    class="navbar is-danger is-fixed-top pr-6"
    role="navigation"
    aria-label="main-navigation"
>
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
                                class="button is-link is-light"
                                on:click={() => pb.authStore.clear()}
                            >
                                Sign Out
                            </div>
                            <div class="button is-danger">
                                <figure class="image is-32x32">
                                    <img
                                        src="https://api.dicebear.com/5.3/shapes/svg?seed={$currentUser.username}"
                                        class="is-rounded"
                                        alt="avatar"
                                    />
                                </figure>
                            </div>
                        </div>
                    {:else}
                        <div class="buttons">
                            <div
                                class="button is-link"
                                on:click={() => push("/signin")}
                            >
                                Sign In
                            </div>
                            <div
                                class="button is-link is-light"
                                on:click={() => push("/signup")}
                            >
                                Sign Up
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</nav>
