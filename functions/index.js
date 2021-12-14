const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

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
