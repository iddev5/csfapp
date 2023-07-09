<script>
    import { pb, currentUser } from "./lib/pocketbase";
    import { avatar } from "./lib/csf";
    import { push } from "svelte-spa-router";
</script>

<svelte:body
    on:click={() => {
        document.getElementById("dropdown").classList.remove("is-active");
    }}
/>

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
                            <div class="dropdown is-right" id="dropdown">
                                <div class="dropdown-trigger">
                                    <button
                                        class="button is-danger"
                                        aria-haspopup="true"
                                        aria-controls="dropdown-menu"
                                        on:click|stopPropagation={() => {
                                            const menu =
                                                document.getElementById(
                                                    "dropdown"
                                                );
                                            menu.classList.toggle("is-active");
                                        }}
                                    >
                                        <figure class="image is-32x32">
                                            <img
                                                src={avatar($currentUser)}
                                                class="is-rounded"
                                                alt="avatar"
                                            />
                                        </figure>
                                    </button>
                                </div>
                                <div
                                    class="dropdown-menu"
                                    id="dropdown-menu"
                                    role="menu"
                                >
                                    <div class="dropdown-content">
                                        <a
                                            href="#/user/{$currentUser.username}"
                                            class="dropdown-item"
                                        >
                                            Profile
                                        </a>
                                        <hr class="dropdown-divider" />
                                        <a
                                            href="#/settings"
                                            class="dropdown-item"
                                        >
                                            Settings
                                        </a>
                                    </div>
                                </div>
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
