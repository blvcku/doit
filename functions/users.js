const functions = require("firebase-functions");
const admin = require('firebase-admin');

const { sendVerificationMail } = require('./sendgrid');
const usersRef = admin.firestore().collection('users');
const formsRef = admin.firestore().collection('forms');
const postsRef = admin.firestore().collection('posts');
const projectsRef = admin.firestore().collection('projects');
const tasksRef = admin.firestore().collection('tasks');
const firestore = admin.firestore();
const bucket = admin.storage().bucket();

exports.deleteUserAccount = functions.https.onCall(async (data, context) => {
    try{
        if(!context.auth.uid) return Promise.reject('unauthorized');
        await formsRef.where('authorID', '==', context.auth.uid).get().then(forms => {
            forms.forEach(async form => await firestore.recursiveDelete(formsRef.doc(form.id)));
        });
        await projectsRef.where('authorID', '==', context.auth.uid).get().then(projects => {
            projects.forEach(async project => await firestore.recursiveDelete(projectsRef.doc(project.id)));
        });
        await projectsRef.where('members', 'array-contains', context.auth.uid).get().then(projects => {
            projects.forEach(async project => await projectsRef.doc(project.id).update({
                    members: admin.firestore.FieldValue.arrayRemove(context.auth.uid)
                })
            );
        });
        await usersRef.where('friends', 'array-contains', context.auth.uid).get().then(friends => {
            friends.forEach(async friend => await usersRef.doc(friend.id).update({
                    friends: admin.firestore.FieldValue.arrayRemove(context.auth.uid)
                })
            );
        });
        await usersRef.where('invites', 'array-contains', context.auth.uid).get().then(invites => {
            invites.forEach(async invite => await usersRef.doc(invite.id).update({
                    invites: admin.firestore.FieldValue.arrayRemove(context.auth.uid)
                })
            );
        });
        await usersRef.where('requests', 'array-contains', context.auth.uid).get().then(requests => {
            requests.forEach(async request => await usersRef.doc(request.id).update({
                    requests: admin.firestore.FieldValue.arrayRemove(context.auth.uid)
                })
            );
        });
        await postsRef.where('authorID', '==', context.auth.uid).get().then(posts => {
            posts.forEach(async post => await firestore.recursiveDelete(postsRef.doc(post.id)))
        });
        await usersRef.doc(context.auth.uid).delete();
        await bucket.deleteFiles({ prefix: `users/${context.auth.uid}` });
        return await admin.auth().deleteUser(context.auth.uid);
    }
    catch(error){
        throw error;
    }
});

exports.updateUser = functions.firestore.document('users/{userID}').onUpdate(async (change, context) => {
    try{
        const after = change.after.data();
        if(after.photoURL){
            await tasksRef.where('performer.uid', '==', after.uid).get().then(tasks => {
                tasks.forEach(task => tasksRef.doc(task.id).update({
                    'performer.displayName': after.displayName,
                    'performer.photoURL': after.photoURL
                }))
            });
            await postsRef.where('authorID', '==', after.uid).get().then(posts => {
                posts.forEach(post => postsRef.doc(post.id).update({
                    'author.displayName': after.displayName,
                    'author.photoURL': after.photoURL
                }))
            });
        }
        else{
            await tasksRef.where('performer.uid', '==', after.uid).get().then(tasks => {
                tasks.forEach(task => tasksRef.doc(task.id).update({
                    'performer.displayName': after.displayName
                }))
            });
            await postsRef.where('authorID', '==', after.uid).get().then(posts => {
                posts.forEach(post => postsRef.doc(post.id).update({
                    'author.displayName': after.displayName
                }))
            });
        }
        return;
    }
    catch(error){
        throw error;
    }
});

exports.newUserSignUp = functions.auth.user().onCreate(async user => {
    try{
        const [username] = user.email.split('@');
        const updatedUsername = username.slice(0, 20);
        await usersRef.doc(user.uid).set({
            uid: user.uid,
            displayName: updatedUsername,
            friends: [],
            requests: [],
            invites: [] 
        });
        await sendVerificationMail(user.uid);
        return;
    }
    catch(error){
        throw error;
    }
});

exports.getUserData = functions.https.onCall(async (data, context) => {
    try{
        if(!context.auth.uid) return Promise.reject('unauthorized');
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
        if(!context.auth.uid) return Promise.reject('unauthorized');
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