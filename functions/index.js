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
        const base64EncodedImageString = data.file.split(',')[1];
        const imageBuffer = new Buffer.from(base64EncodedImageString, 'base64');
        const file = bucket.file(`projects/${data.id}/banner`);
        await file.save(imageBuffer, {
            contentType: `${data.filetype}`,
            metadata: {
                metadata: {
                    owner: context.auth.uid  
                }               
            }
        });
        return;
    }
    catch(error){
        throw error;
    }
});

exports.changeTaskFile = functions.https.onCall(async (data,context) => {
    try{
        if(!context.auth.uid) return Promise.reject('unauthorized');
        const task = await tasksRef.doc(data.id).get();
        const { authorID } = task.data();
        if(authorID !== context.auth.uid) return Promise.reject('unauthorized');
        const base64EncodedString = data.file.split(',')[1];
        const buffer = new Buffer.from(base64EncodedString, 'base64');
        const file = bucket.file(`tasks/${data.id}/file`);
        await file.save(buffer, {
            contentType: `${data.filetype}`,
            metadata: {
                metadata: {
                    owner: context.auth.uid
                }
            }
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

exports.setStepStatus = functions.https.onCall(async (data, context) => {
    try{
        if(!context.auth.uid) return Promise.reject('unauthorized');
        const task = await tasksRef.doc(data.id).get();
        const { steps, performer: {uid} } = task.data();
        if(uid !== context.auth.uid) return Promise.reject('unauthorized');
        steps[data.index].checked = !steps[data.index].checked;
        await tasksRef.doc(data.id).update({
            steps: steps
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
            friends: [],
            requests: [],
            invites: [] 
        });
        return;
    }
    catch(error){
        throw error;
    }
});

exports.updateUser = functions.firestore.document('users/{userID}').onUpdate(async (change, context) => {
    try{
        const after = change.after.data();
        await tasksRef.where('performer.uid', '==', after.uid).get().then(tasks => {
            tasks.forEach(task => tasksRef.doc(task.id).update({
                'performer.displayName': after.displayName,
                'performer.photoURL': after.photoURL
            }))
        });
        return;
    }
    catch(error){
        throw error;
    }
});

exports.deleteTasks = functions.firestore.document('projects/{projectID}').onDelete(async (snap, context) => {
    try{
        await tasksRef.where('projectID', '==', snap.id).get().then(tasks => {
            tasks.forEach(task => tasksRef.doc(task.id).delete());
        })
        return;
    }
    catch(error){
        throw error;
    }
})

exports.getFriendsData = functions.https.onCall(async (data, context) => {
    try{
        if(!context.auth.uid){
            return Promise.reject('unauthorized');
        }
        const friends = [];
        for(const invite of data.invites){
            const inviterData = await admin.auth().getUser(invite);
            friends.push({
                uid: inviterData.uid,
                displayName: inviterData.displayName,
                photoURL: inviterData.photoURL,
                status: 'invite'
            })
        }
        for(const friend of data.friends){
            const friendData = await admin.auth().getUser(friend);
            friends.push({
                uid: friendData.uid,
                displayName: friendData.displayName,
                photoURL: friendData.photoURL,
                status: 'friend'
            });
        };
        for(const request of data.requests){
            const requestData = await admin.auth().getUser(request);
            friends.push({
                uid: requestData.uid,
                displayName: requestData.displayName,
                photoURL: requestData.photoURL,
                status: 'request'
            });
        }

        return friends;
    }   
    catch(error){
        throw error;
    }
});

exports.deleteFriend = functions.https.onCall(async (data, context) => {
    try{
        if(!context.auth.uid){
            return Promise.reject('unauthorized');
        }
        const user = await usersRef.doc(context.auth.uid).get();
        const userData = user.data();
        if(userData.friends.includes(data.friend)){
            await usersRef.doc(context.auth.uid).update({
                friends: admin.firestore.FieldValue.arrayRemove(data.friend)
            });
            await usersRef.doc(data.friend).update({
                friends: admin.firestore.FieldValue.arrayRemove(context.auth.uid)
            });
        }
        return;
    }
    catch(error){
        throw error;
    }
})

exports.requestFriend = functions.https.onCall(async (data, context) => {
    try{
        if(!context.auth.uid){
            return Promise.reject('unauthorized');
        }
        await usersRef.doc(context.auth.uid).update({
            requests: admin.firestore.FieldValue.arrayUnion(data.requestedFriend)
        });
        await usersRef.doc(data.requestedFriend).update({
            invites: admin.firestore.FieldValue.arrayUnion(context.auth.uid)
        });
        return;
    }   
    catch(error){
        throw error;
    } 
})

exports.deleteRequest = functions.https.onCall(async (data,context) => {
    try{
        if(!context.auth.uid){
            return Promise.reject('unauthorized');
        }
        const user = await usersRef.doc(context.auth.uid).get();
        const userData = user.data();
        if(userData.requests.includes(data.requestedFriend)){
            await usersRef.doc(context.auth.uid).update({
                requests: admin.firestore.FieldValue.arrayRemove(data.requestedFriend)
            });
            await usersRef.doc(data.requestedFriend).update({
                invites: admin.firestore.FieldValue.arrayRemove(context.auth.uid)
            });
        }
        return;
    }
    catch(error){
        throw error;
    }
})

exports.declineInvite = functions.https.onCall(async (data, context) => {
    try{
        if(!context.auth.uid){
            return Promise.reject('unauthorized');
        }
        const user = await usersRef.doc(context.auth.uid).get();
        const userData = user.data();
        if(userData.invites.includes(data.invite)){
            await usersRef.doc(context.auth.uid).update({
                invites: admin.firestore.FieldValue.arrayRemove(data.invite)
            });
            await usersRef.doc(data.invite).update({
                requests: admin.firestore.FieldValue.arrayRemove(context.auth.uid)
            });
        }
        return;
    }
    catch(error){
        throw error;
    }
})

exports.acceptInvite = functions.https.onCall(async (data, context) => {
    try{
        if(!context.auth.uid){
            return Promise.reject('unauthorized');
        }
        const user = await usersRef.doc(context.auth.uid).get();
        const userData = user.data();
        if(userData.invites.includes(data.invite)){
            await usersRef.doc(context.auth.uid).update({
                invites: admin.firestore.FieldValue.arrayRemove(data.invite),
                friends: admin.firestore.FieldValue.arrayUnion(data.invite)
            });
            await usersRef.doc(data.invite).update({
                requests: admin.firestore.FieldValue.arrayRemove(context.auth.uid),
                friends: admin.firestore.FieldValue.arrayUnion(context.auth.uid)
            });
        }
        return;
    }
    catch(error){
        throw error;
    }
})

exports.getProjectInvites = functions.https.onCall(async (data, context) => {
    try{
        if(!context.auth.uid){
            return Promise.reject('unauthorized');
        }
        const projects = await projectsRef.where('invites', 'array-contains', context.auth.uid).get();
        const projectInvites = [];
        projects.forEach(project => {
            const { title, photoURL = undefined } = project.data();
            projectInvites.push({
                title: title,
                id: project.id,
                photoURL: photoURL
            })
        })
        return projectInvites;
    }
    catch(error){
        throw error;
    }
});

exports.acceptProjectInvitation = functions.https.onCall(async (data, context) => {
    try{
        if(!context.auth.uid){
            return Promise.reject('unauthorized');
        }
        const project = await projectsRef.doc(data.projectID).get();
        const { invites = [] } = project.data();
        if(invites.includes(context.auth.uid)){
            await projectsRef.doc(data.projectID).update({
                invites: admin.firestore.FieldValue.arrayRemove(context.auth.uid),
                members: admin.firestore.FieldValue.arrayUnion(context.auth.uid)
            });
        }
        return;
    }
    catch(error){
        throw error;
    }
});

exports.declineProjectInvitation = functions.https.onCall(async (data, context) => {
    try{
        if(!context.auth.uid){
            return Promise.reject('unauthorized');
        }
        await projectsRef.doc(data.projectID).update({
            invites: admin.firestore.FieldValue.arrayRemove(context.auth.uid)
        });
    }
    catch(error){
        throw error;
    }
})