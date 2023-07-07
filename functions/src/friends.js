const functions = require('firebase-functions');
const admin = require('firebase-admin');

const usersRef = admin.firestore().collection('users');

exports.getFriendsData = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth.uid) {
            return Promise.reject('unauthorized');
        }
        const friends = [];
        for (const invite of data.invites) {
            const inviterData = await admin.auth().getUser(invite);
            friends.push({
                uid: inviterData.uid,
                displayName: inviterData.displayName,
                photoURL: inviterData.photoURL,
                status: 'invite',
            });
        }
        for (const friend of data.friends) {
            const friendData = await admin.auth().getUser(friend);
            friends.push({
                uid: friendData.uid,
                displayName: friendData.displayName,
                photoURL: friendData.photoURL,
                status: 'friend',
            });
        }
        for (const request of data.requests) {
            const requestData = await admin.auth().getUser(request);
            friends.push({
                uid: requestData.uid,
                displayName: requestData.displayName,
                photoURL: requestData.photoURL,
                status: 'request',
            });
        }

        return friends;
    } catch (error) {
        throw error;
    }
});

exports.deleteFriend = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth.uid) {
            return Promise.reject('unauthorized');
        }
        const user = await usersRef.doc(context.auth.uid).get();
        const userData = user.data();
        if (userData.friends.includes(data.friend)) {
            await usersRef.doc(context.auth.uid).update({
                friends: admin.firestore.FieldValue.arrayRemove(data.friend),
            });
            await usersRef.doc(data.friend).update({
                friends: admin.firestore.FieldValue.arrayRemove(
                    context.auth.uid,
                ),
            });
        }
        return;
    } catch (error) {
        throw error;
    }
});

exports.requestFriend = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth.uid) {
            return Promise.reject('unauthorized');
        }
        await usersRef.doc(context.auth.uid).update({
            requests: admin.firestore.FieldValue.arrayUnion(
                data.requestedFriend,
            ),
        });
        await usersRef.doc(data.requestedFriend).update({
            invites: admin.firestore.FieldValue.arrayUnion(context.auth.uid),
        });
        return;
    } catch (error) {
        throw error;
    }
});

exports.deleteRequest = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth.uid) {
            return Promise.reject('unauthorized');
        }
        const user = await usersRef.doc(context.auth.uid).get();
        const userData = user.data();
        if (userData.requests.includes(data.requestedFriend)) {
            await usersRef.doc(context.auth.uid).update({
                requests: admin.firestore.FieldValue.arrayRemove(
                    data.requestedFriend,
                ),
            });
            await usersRef.doc(data.requestedFriend).update({
                invites: admin.firestore.FieldValue.arrayRemove(
                    context.auth.uid,
                ),
            });
        }
        return;
    } catch (error) {
        throw error;
    }
});

exports.declineInvite = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth.uid) {
            return Promise.reject('unauthorized');
        }
        const user = await usersRef.doc(context.auth.uid).get();
        const userData = user.data();
        if (userData.invites.includes(data.invite)) {
            await usersRef.doc(context.auth.uid).update({
                invites: admin.firestore.FieldValue.arrayRemove(data.invite),
            });
            await usersRef.doc(data.invite).update({
                requests: admin.firestore.FieldValue.arrayRemove(
                    context.auth.uid,
                ),
            });
        }
        return;
    } catch (error) {
        throw error;
    }
});

exports.acceptInvite = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth.uid) {
            return Promise.reject('unauthorized');
        }
        const user = await usersRef.doc(context.auth.uid).get();
        const userData = user.data();
        if (userData.invites.includes(data.invite)) {
            await usersRef.doc(context.auth.uid).update({
                invites: admin.firestore.FieldValue.arrayRemove(data.invite),
                friends: admin.firestore.FieldValue.arrayUnion(data.invite),
            });
            await usersRef.doc(data.invite).update({
                requests: admin.firestore.FieldValue.arrayRemove(
                    context.auth.uid,
                ),
                friends: admin.firestore.FieldValue.arrayUnion(
                    context.auth.uid,
                ),
            });
        }
        return;
    } catch (error) {
        throw error;
    }
});
