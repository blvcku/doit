const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp({
    storageBucket: 'todoapp-5c047.appspot.com'
});

const bucket = admin.storage().bucket();
const projectsRef = admin.firestore().collection('projects');
const tasksRef = admin.firestore().collection('tasks');
const usersRef = admin.firestore().collection('users');

exports.getUserData = functions.https.onCall(async (data, context) => {
    try{
        if(!context.auth.uid){
            return Promise.reject('unauthorized');
        }
        const user = await admin.auth().getUser(data.uid);
        return {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
        }
    }
    catch(error){
        throw error;
    }
});

exports.getUsersData = functions.https.onCall(async (data, context) => {
    try{
        if(!context.auth.uid){
            return Promise.reject('unauthorized');
        }
        let users = [];
        for(uid of data.uids){
            const user = await admin.auth().getUser(uid);
            users.push({
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL
            });
        };
        return users;
    }   
    catch(error){
        throw error;
    }
});

exports.changeProjectPhoto = functions.https.onCall(async (data, context) => {
    try{
        if(!context.auth.uid) return Promise.reject('unauthorized');
        const project = await projectsRef.doc(data.id).get();
        const { authorID } = project.data();
        if(authorID !== context.auth.uid) return Promise.reject('unauthorized');
        const base64EncodedImageString = data.file.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = new Buffer.from(base64EncodedImageString, 'base64');
        const file = bucket.file(`projects/${data.id}/banner.jpg`);
        await file.save(imageBuffer, {
            contentType: `${data.filetype}` 
        });
        return;
    }
    catch(error){
        throw error;
    }
});

exports.setTaskStatus = functions.https.onCall(async (data, context) => {
    try{
        if(!context.auth.uid) return Promise.reject('unauthorized');
        const task = await tasksRef.doc(data.id).get();
        const { performer: {uid} } = task.data();
        if(uid !== context.auth.uid) return Promise.reject('unauthorized');
        await tasksRef.doc(data.id).update({
            status: data.status
        });
        return;
    }
    catch(error){
        throw error;
    }
});

exports.newUserSignup = functions.auth.user().onCreate(async user => {
    try{
        const [username] = user.email.split('@');
        await usersRef.doc(user.uid).set({
            uid: user.uid,
            displayName: username, 
        });
        return;
    }
    catch(error){
        throw error;
    }
});
