import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';
// import {connectFunctionsEmulator} from 'firebase/functions';
// import {connectFirestoreEmulator} from 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const fb = firebase;
export const functions = firebase.functions(app);
// connectFunctionsEmulator(functions, 'localhost', 5001);
// connectFirestoreEmulator(db, 'localhost', 8080);
export default app;


//shared functions
export const deleteFriend = async (uid) => {
    try{
        const deleteFunction = functions.httpsCallable('deleteFriend');
        await deleteFunction({friend: uid})
    }
    catch(error){
        Promise.reject(error);
    }
};

export const requestFriend = async (uid) => {
    try{
        const requestFriendFunction = functions.httpsCallable('requestFriend');
        await requestFriendFunction({requestedFriend: uid});
    }
    catch(error){
        Promise.reject(error);
    }
};

export const deleteRequest = async (uid) => {
    try{
        const deleteRequestFunction = functions.httpsCallable('deleteRequest');
        await deleteRequestFunction({requestedFriend: uid});
    }
    catch(error){
        Promise.reject(error);
    }
};

export const declineInvite = async (uid) => {
    try{
        const declineInviteFunction = functions.httpsCallable('declineInvite');
        await declineInviteFunction({invite: uid});
    }
    catch(error){
        Promise.reject(error);
    }
};

export const acceptInvite = async (uid) => {
    try{
        const acceptInviteFunction = functions.httpsCallable('acceptInvite');
        await acceptInviteFunction({invite: uid});
    }
    catch(error){
        Promise.reject(error);
    }
};