import Home from "./Home.svelte";
import Post from "./Post.svelte";
import UserProfile from "./UserProfile.svelte";

export const routes = {
    "/": Home,
    "/post/:id": Post,
    "/user/:username": UserProfile,
};
