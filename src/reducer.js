export default function(state = {}, action) {

    if (action.type === "GET_USER") {
        state = {
            ...state,
            user: action.user
        };
    }

    if (action.type === "UPDATE_BIO") {
        state = {
            ...state,
            user: {
                ...state.user,
                bio: action.bio
            }
        };
    }

    if (action.type === "SET_USER_IMAGE") {
        state = {
            ...state,
            user: {
                ...state.user,
                url: action.url
            }
        };
    }

    if (action.type === "RECEIVE_FRIENDS") {
        state = {
            ...state,
            friends: action.friends
        };
    }

    if (action.type === "ACCEPT_FRIENDSHIP") {
        state = {
            ...state,
            friends: state.friends.map(friend => {
                if (friend.id == action.otherUserId) {
                    return {
                        ...friend,
                        accepted: true
                    };
                }
                return friend;
            })
        };
    }

    if (action.type === "END_FRIENDSHIP") {
        state = {
            ... state,
            friends: state.friends.filter(friend => friend.id != action.otherUserId)
        };
    }

    if (action.type === "CHAT_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.chatMessages
        };
    }

    if (action.type === "CHAT_MESSAGE") {
        state = {
            ...state,
            chatMessages: [
                ...state.chatMessages,
                action.chatMessage
            ]
        };
    }

    if (action.type === "USERS_ONLINE") {
        state = {
            ...state,
            usersOnline: action.users
        };
    }

    if (action.type === "USER_IS_ONLINE") {
        state = {
            ...state,
            usersOnline: [
                ...state.usersOnline,
                action.user
            ]
        };
    }

    if (action.type === "USER_IS_OFFLINE") {
        state = {
            ...state,
            usersOnline: state.usersOnline.filter(user => user.id != action.user.id)
        };
    }

    if (action.type === "PRIVATE_MESSAGES") {
        state = {
            ...state,
            privateMessages: action.privateMessages
        };
    }

    if (action.type === "PRIVATE_MESSAGE") {
        state = {
            ...state,
            privateMessages: [
                ...state.privateMessages,
                action.privateMessage
            ]
        };
    }

    if (action.type === "RECEIVE_FORUMS") {
        state = {
            ...state,
            forums: action.forums
        };
    }

    if (action.type === "RECEIVE_THREADS_BY_FORUM_ID") {
        state = {
            ...state,
            threads: action.threads
        };
    }

    if (action.type === "CLEAR_THREADS") {
        state = {
            ...state,
            threads: action.threads
        };
    }

    if (action.type === "CLEAR_POSTS") {
        state = {
            ...state,
            posts: action.posts
        };
    }

    if (action.type === "RECEIVE_POSTS_BY_THREAD_ID") {
        state = {
            ...state,
            posts: action.posts
        };
    }

    if (action.type === "NEW_POST") {
        state = {
            ...state,
            posts: [
                ...state.posts,
                action.post
            ]
        };
    }

    if (action.type === "TOP_TEN_THREADS") {
        state = {
            ...state,
            topTenThreads: action.threads
        };
    }

    return state;
}
