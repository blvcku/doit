const functions = require("firebase-functions");
const algoliasearch = require('algoliasearch');

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;
const algoliaClient = algoliasearch(APP_ID, ADMIN_KEY);

const usersIndex = algoliaClient.initIndex('users');
const postsIndex = algoliaClient.initIndex('posts');

exports.addPostToIndex = functions.firestore.document('/posts/{postID}').onCreate(async (snap, context) => {
    try{
        const data = snap.data();
        const objectID = snap.id;
        return await postsIndex.saveObject({...data, objectID});
    }
    catch(error){
        throw error;
    }
});

exports.updatePostIndex = functions.firestore.document('/posts/{postID}').onUpdate(async (change, context) => {
    try{
        const newData = change.after.data();
        const objectID = change.after.id;
        return await postsIndex.saveObject({...newData, objectID});
    }
    catch(error){
        throw error;
    }
});

exports.deletePostIndex = functions.firestore.document('/posts/{postID}').onDelete(async (snap, context) => {
    try{
        return await postsIndex.deleteObject(snap.id);
    }
    catch(error){
        throw error;
    }
});

exports.addUserToIndex = functions.firestore.document('users/{userID}').onCreate(async (snap, context) => {
    try{
        const data = snap.data();
        const objectID = snap.id;
        return await usersIndex.saveObject({...data, objectID});
    }
    catch(error){
        throw error;
    }
});

exports.updateUserIndex = functions.firestore.document('users/{userID}').onUpdate(async (change, context) => {
    try{
        const newData = change.after.data();
        const objectID = change.after.id;
        return await usersIndex.saveObject({...newData, objectID});
    }
    catch(error){
        throw error;
    }
});

exports.deleteUserIndex = functions.firestore.document('users/{userID}').onDelete(async (snap, context) => {
    try{
        return await usersIndex.deleteObject(snap.id);
    }
    catch(error){
        throw error;
    }
})