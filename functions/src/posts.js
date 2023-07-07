const functions = require('firebase-functions');
const admin = require('firebase-admin');

const bucket = admin.storage().bucket();
const postsRef = admin.firestore().collection('posts');

exports.movePostFile = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth.uid) return Promise.reject('unauthorized');
        const post = await postsRef.doc(data.postID).get();
        const { authorID } = post.data();
        if (authorID !== context.auth.uid)
            return Promise.reject('unauthorized');
        const file = bucket.file(`temp/posts/${data.postID}/file`);
        await file.move(`posts/${data.postID}/file`);
        return;
    } catch (error) {
        throw error;
    }
});

exports.deletePost = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth.uid) return Promise.reject('unauthorized');
        const post = await postsRef.doc(data.id).get();
        const { authorID } = post.data();
        if (authorID !== context.auth.uid)
            return Promise.reject('unauthorized');
        await postsRef.doc(data.id).delete();
        return;
    } catch (error) {
        throw error;
    }
});

exports.onPostDelete = functions.firestore
    .document('posts/{postID}')
    .onDelete(async (snap, context) => {
        try {
            await bucket.deleteFiles({ prefix: `forms/${snap.id}` });
            return;
        } catch (error) {
            throw error;
        }
    });
