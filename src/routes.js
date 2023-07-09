import Home from "./Home.svelte";
import Post from "./Post.svelte";
import UserProfile from "./UserProfile.svelte";
import UserSettings from "./UserSettings.svelte";
import Login from "./Login.svelte";

export const routes = {
    "/": Home,
    "/post/:id": Post,
    "/user/:username": UserProfile,
    "/settings": UserSettings,
    "/signin": Login,
    "/signup": Login,
};
