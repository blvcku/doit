const functions = require("firebase-functions");
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

const host = functions.config().app.host;
const postsRef = admin.firestore().collection('posts');
const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);
const taskTemplate = functions.config().sendgrid.taskTemplate;
const postMessageTemplate = functions.config().sendgrid.postMessageTemplate;
const verifyEmailTemplate = functions.config().sendgrid.verifyEmailTemplate;
const resetPasswordTemplate = functions.config().sendgrid.resetPasswordTemplate;
const fromEmail = functions.config().sendgrid.fromEmail;

const projectsRef = admin.firestore().collection('projects');

exports.sendPostMessage = functions.firestore.document('posts/{postID}/messages/{messageID}').onCreate(async (snap, context) => {
    try{
        const postID = context.params.postID;
        const { message, author: { email: senderEmail, displayName: senderName } } = snap.data();
        const post = await postsRef.doc(postID).get();
        const { authorID } = post.data();
        const { email, displayName } = await admin.auth().getUser(authorID);
        const messageObject = {
            to: email,
            from: fromEmail,
            templateId: postMessageTemplate,
            dynamicTemplateData:{
                subject: `New message from ${senderName}`,
                user: displayName,
                senderEmail: senderEmail,
                senderName: senderName,
                message: message
            }
        };
        await sgMail.send(messageObject);
        return;
    }
    catch(error){
        throw error;
    }
});

exports.sendTaskMail = functions.firestore.document('tasks/{taskID}').onCreate(async (snap, context) => {
    try{
        const { performer: { uid:userID }, projectID } = snap.data();
        const { email, displayName } = await admin.auth().getUser(userID);
        const project = await projectsRef.doc(projectID).get();
        const { title } = project.data();
        const message = {
            to: email,
            from: fromEmail,
            templateId: taskTemplate,
            dynamicTemplateData:{
                subject: `New task in ${title}`,
                project: title,
                url: `https://${host}/dashboard/projects/${projectID}`,
                user: displayName
            }
        };

        await sgMail.send(message);
        return;
    }
    catch(error){
        throw error;
    }
});

exports.sendVerificationMail = async (uid) => {
    try{
        const { emailVerified, email, displayName } = await admin.auth().getUser(uid);
        if(emailVerified) return;
        const url = await admin.auth().generateEmailVerificationLink(email, {
            url: `https://${host}`
        });
        const message = {
            to: email,
            from: fromEmail,
            templateId: verifyEmailTemplate,
            dynamicTemplateData:{
                subject: 'Verify your email address',
                user: displayName,
                url: url,
            }
        };
        await sgMail.send(message);
        return;
    }
    catch(error){
        throw error;
    }
};

exports.sendVerfiyEmail = functions.https.onCall(async (data, context) => {
    try{
        if(!context.auth.uid) return Promise.reject('unauthorized');
        await this.sendVerificationMail(context.auth.uid);
        return;
    }
    catch(error){
        throw error;
    }
})

exports.sendPasswordResetMail = functions.https.onCall(async (data, context) => {
    try{
        const { email } = data;
        const { displayName } = await admin.auth().getUserByEmail(email);
        const url = await admin.auth().generatePasswordResetLink(email, {
            url: `https://${host}`
        });
        const message = {
            to: email,
            from: fromEmail,
            templateId: resetPasswordTemplate,
            dynamicTemplateData:{
                subject: 'Reset your password',
                user: displayName,
                url: url
            }
        }
        await sgMail.send(message);
        return;
    }
    catch(error){
        throw error;
    }
});