<script>
    import { pb, currentUser } from "./lib/pocketbase";
    import { avatar } from "./lib/csf";

    let username = $currentUser.username;
    let email = $currentUser.email;
</script>

<div class="title">{$currentUser.username}</div>

<div class="columns">
    <div class="column is-offset-4 is-3">
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
        <div class="buttons">
            <div class="button is-link">Update</div>
        </div>
    </div>

    <div class="column">
        <div class="field">
            <div class="file is-boxed is-white is-small">
                <div class="file-label">
                    <input class="file-input" type="file" name="resume" />
                    <span class="file-cta">
                        <figure class="image is-128x128">
                            <img src={avatar($currentUser)} alt="avatar" />
                        </figure>
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>
