const admin = require('firebase-admin');
const functions = require("firebase-functions");

admin.initializeApp({
    storageBucket: functions.config().app.bucket
});

const users = require('./src/users');
exports.deleteUserAccount = users.deleteUserAccount;
exports.getUserData = users.getUserData;
exports.getUsersData = users.getUsersData;
exports.newUserSignUp = users.newUserSignUp;
exports.updateUser = users.updateUser;
exports.updateEmail = users.updateEmail;

const algolia = require('./src/algolia');
exports.addPostToIndex = algolia.addPostToIndex;
exports.updatePostIndex = algolia.updatePostIndex;
exports.deletePostIndex = algolia.deletePostIndex;
exports.addUserToIndex = algolia.addUserToIndex;
exports.updateUserIndex = algolia.updateUserIndex;
exports.deleteUserIndex = algolia.deleteUserIndex;

const friends = require('./src/friends');
exports.getFriendsData = friends.getFriendsData;
exports.deleteFriend = friends.deleteFriend;
exports.requestFriend = friends.requestFriend;
exports.deleteRequest = friends.deleteRequest;
exports.declineInvite = friends.declineInvite;
exports.acceptInvite = friends.acceptInvite;

const projects = require('./src/projects');
exports.changeProjectPhoto = projects.changeProjectPhoto;
exports.moveTaskFile = projects.moveTaskFile;
exports.setTaskStatus = projects.setTaskStatus;
exports.setStepStatus = projects.setStepStatus;
exports.onTaskDelete = projects.onTaskDelete;
exports.onProjectDelete = projects.onProjectDelete;
exports.getProjectInvites = projects.getProjectInvites;
exports.acceptProjectInvitation = projects.acceptProjectInvitation;
exports.declineProjectInvitation = projects.declineProjectInvitation;
exports.deleteProject = projects.deleteProject;
exports.moveMessageFile = projects.moveMessageFile;
exports.leaveProject = projects.leaveProject;

const forms = require('./src/forms');
exports.onAnswerCreate = forms.onAnswerCreate;
exports.deleteForm = forms.deleteForm;
exports.moveQuestionFile = forms.moveQuestionFile;
exports.onFormDelete = forms.onFormDelete;

const posts = require('./src/posts');
exports.movePostFile = posts.movePostFile;
exports.deletePost = posts.deletePost;
exports.onPostDelete = posts.onPostDelete;

const sendgrid = require('./src/sendgrid');
exports.sendPostMessage = sendgrid.sendPostMessage;
exports.sendTaskMail = sendgrid.sendTaskMail;
exports.sendPasswordResetMail = sendgrid.sendPasswordResetMail;
exports.sendVerifyEmail = sendgrid.sendVerfiyEmail;
