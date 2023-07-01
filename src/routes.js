import Home from "./Home.svelte";
import Post from "./Post.svelte";
import UserProfile from "./UserProfile.svelte";
import Login from "./Login.svelte";

export const routes = {
    "/": Home,
    "/post/:id": Post,
    "/user/:username": UserProfile,
    "/signin": Login,
    "/signup": Login,
};
