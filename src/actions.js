import axios from "./axios";
import { socket } from "./socket";

export async function getUser() {
    console.log("getUser action running");
    const { data } = await axios.get("/user");
    console.log("getUser data:", data);
    return {
        type: "GET_USER",
        user: data
    };
}

export async function updateBio(bio) {
    await axios.post("/updatebio", {bio: bio});
    return {
        type: "UPDATE_BIO",
        bio: bio
    };
}

export async function setUserImage(formData) {
    const { data } = await axios.post("/user-image", formData);
    return {
        type: "SET_USER_IMAGE",
        url: data.url
    };
}

export async function receiveFriends() {
    const { data } = await axios.get("/friends.json");
    return {
        type: "RECEIVE_FRIENDS",
        friends: data
    };
}

export async function acceptFriendRequest(otherUserId) {

    await axios.post(`/accept-friend-request/${otherUserId}`);

    // if otherUserId is online use socket.io to notify otherUserId
    socket.emit("friendRequestUpdate", otherUserId);

    return {
        type: "ACCEPT_FRIENDSHIP",
        otherUserId: otherUserId
    };
}

export async function endFriendship(otherUserId) {
    await axios.post(`/end-friendship/${otherUserId}`);
    socket.emit("friendRequestUpdate", otherUserId);
    return {
        type: "END_FRIENDSHIP",
        otherUserId: otherUserId
    };
}

export function chatMessages(messages) {
    console.log("chatMessages action running");
    console.log("chatMessages data:", messages);
    return {
        type: "CHAT_MESSAGES",
        chatMessages: messages
    };
}

export function chatMessage(messageObj) {
    console.log("chatMessage action running");
    console.log("chatMessageObj:", messageObj);
    return {
        type: "CHAT_MESSAGE",
        chatMessage: messageObj
    };
}

export function privateMessages(messages) {
    console.log("privateMessages action running");
    console.log("privateMessages:", messages);
    return {
        type: "PRIVATE_MESSAGES",
        privateMessages: messages
    };
}

export function privateMessage(messageObj) {
    console.log("privateMessage action running");
    console.log("privateMessage:", messageObj);
    return {
        type: "PRIVATE_MESSAGE",
        privateMessage: messageObj
    };
}

export function usersOnline(users) {
    console.log("usersOnline action running");
    return {
        type: "USERS_ONLINE",
        users: users
    };
}

export function userIsOnline(user) {
    console.log("userIsOnline action running");
    return {
        type: "USER_IS_ONLINE",
        user: user
    };
}

export function userIsOffline(user) {
    console.log("userIsOffline action running");
    return {
        type: "USER_IS_OFFLINE",
        user: user
    };
}

export function imageChange(user) {
    console.log("imageChange running");
    return {
        type: "IMAGE_CHANGE",
        user: user
    };
}

export function receiveForums(forumsObj) {
    console.log("receiveForums running");
    return {
        type: "RECEIVE_FORUMS",
        forums: forumsObj
    };
}

export function receiveThreadsByForumId(threadsObj) {
    console.log("receiveThreadsByForumId running");
    return {
        type: "RECEIVE_THREADS_BY_FORUM_ID",
        threads: threadsObj
    };
}

export function clearThreads() {
    return {
        type: "CLEAR_THREADS",
        threads: []
    };
}

export function clearPosts() {
    return {
        type: "CLEAR_POSTS",
        posts: []
    };
}

export function receivePostsByThreadId(postsObj) {
    console.log("Receiving posts by threadId:", postsObj);
    return {
        type: "RECEIVE_POSTS_BY_THREAD_ID",
        posts: postsObj
    };
}

export async function newPost(post) {
    console.log("newPost running:");
    const { data } = await axios.post("/new-post", post);
    console.log("newPost post:", data);
    return {
        type: "NEW_POST",
        post: data
    };

}
