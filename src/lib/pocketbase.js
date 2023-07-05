import PocketBase from "pocketbase";
import { writable } from "svelte/store";

export const pb = new PocketBase("http://127.0.0.1:8090");
export const currentUser = writable(pb.authStore.model);
export const currentPublicUser = writable(null);

export async function getCurrentPublicUser() {
    if (pb.authStore.model) {
        return await pb
            .collection("publicusers")
            .getFirstListItem(`user="${pb.authStore.model.id}"`);
    } else return undefined;
}

pb.authStore.onChange(async (auth) => {
    console.log("user changed", auth);
    currentUser.set(pb.authStore.model);

    // TODO: it may trigger even before the public user is created
    const publicUser = await getCurrentPublicUser();
    currentPublicUser.set(publicUser);
});
