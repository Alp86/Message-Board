import * as io from 'socket.io-client';

import {
    chatMessages, chatMessage, usersOnline, userIsOnline, userIsOffline,
    receiveFriends, privateMessage, privateMessages, receiveForums, receiveThreadsByForumId,
    receivePostsByThreadId, receiveTopTenThreads
} from './actions';

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on(
            'chatMessages',
            msgs => {
                console.log("chatMessages received:", msgs);
                store.dispatch(
                    chatMessages(msgs)
                );
            }
        );

        socket.on(
            'chatMessage',
            msg => {
                console.log("new chatMessage received:", msg);
                store.dispatch(
                    chatMessage(msg)
                );
            }
        );

        socket.on(
            'usersOnline',
            users => {
                console.log("users online:", users);
                store.dispatch(
                    usersOnline(users)
                );
            }
        );

        socket.on(
            'userIsOnline',
            user => {
                // console.log("user is online");
                console.log(`${user.first} ${user.last} is online:`, user);
                store.dispatch(
                    userIsOnline(user)
                );
            }
        );

        socket.on(
            'userIsOffline',
            user => {
                console.log("user is offline:", user);
                store.dispatch(
                    userIsOffline(user)
                );
            }
        );

        socket.on(
            'friendRequestUpdate',
            () => {
                store.dispatch(
                    receiveFriends()
                );
            }
        );

        socket.on(
            'privateMessage',
            msg => {
                store.dispatch(
                    privateMessage(msg)
                );
            }
        );

        socket.on(
            'privateMessages',
            msgs => {
                store.dispatch(
                    privateMessages(msgs)
                );
            }
        );

        socket.on(
            'forumsDashboard',
            forumsObj => {
                store.dispatch(
                    receiveForums(forumsObj)
                );
            }
        );

        socket.on(
            'receiveThreadsByForumId',
            threadsObj => {
                store.dispatch(
                    receiveThreadsByForumId(threadsObj)
                );
            }
        );

        socket.on(
            'receivePostsByThreadId',
            postsObj => {
                store.dispatch(
                    receivePostsByThreadId(postsObj)
                );
            }
        );

        socket.on(
            'receiveTopTenThreads',
            threadsObj => {
                store.dispatch(
                    receiveTopTenThreads(threadsObj)
                );
            }
        );
    }
};
