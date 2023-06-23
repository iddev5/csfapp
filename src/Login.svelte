<script>
    import { pb } from "./lib/pocketbase";

    export let toSignIn = false;
    export let onCancel;
    let username = "";
    let email = "";
    let password = "";
    let passwordConfirm = "";

    const login = async () => {
        await pb.collection("users").authWithPassword(username, password);
    };

    const signIn = async () => {
        const user = await pb.collection("users").create({
            username,
            password,
            passwordConfirm,
            email,
        });

        await login();

        await pb.collection("publicusers").create({
            username,
            user: user.id,
        });

        username = "";
        email = "";
        password = "";
        passwordConfirm = "";
        toSignIn = false;
    };
</script>

{#if toSignIn != false}
    <div class="column is-4 is-offset-4">
        <form class="container box p-6 m-6" on:submit|preventDefault>
            <div class="field">
                <label class="label">Username</label>
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        bind:value={username}
                        placeholder="Username"
                    />
                </div>
            </div>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        bind:value={email}
                        placeholder="Email"
                    />
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        bind:value={password}
                        placeholder="Password"
                    />
                </div>
            </div>
            <div class="field">
                <label class="label">Confirm Password</label>
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        bind:value={passwordConfirm}
                        placeholder="Confirm Password"
                    />
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link" on:click={signIn}
                        >Sign In</button
                    >
                </div>
                <div class="control">
                    <button class="button is-link is-light" on:click={onCancel}
                        >Cancel</button
                    >
                </div>
            </div>
        </form>
    </div>
{:else}
    <div class="column is-4 is-offset-4">
        <form class="container box p-6 m-6" on:submit|preventDefault>
            <div class="field">
                <label class="label">Username</label>
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        bind:value={username}
                        placeholder="Username"
                    />
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        bind:value={password}
                        placeholder="Password"
                    />
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link" on:click={login}
                        >Login</button
                    >
                </div>
                <div class="control">
                    <button class="button is-link is-light" on:click={onCancel}
                        >Cancel</button
                    >
                </div>
            </div>
        </form>
    </div>
{/if}
