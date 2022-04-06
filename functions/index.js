const admin = require('firebase-admin');

admin.initializeApp({
    storageBucket: 'todoapp-5c047.appspot.com'
});

const users = require('./users');
exports.deleteUserAccount = users.deleteUserAccount;
exports.getUserData = users.getUserData;
exports.getUsersData = users.getUsersData;
exports.newUserSignUp = users.newUserSignUp;
exports.updateUser = users.updateUser;
exports.updateEmail = users.updateEmail;

const algolia = require('./algolia');
exports.addPostToIndex = algolia.addPostToIndex;
exports.updatePostIndex = algolia.updatePostIndex;
exports.deletePostIndex = algolia.deletePostIndex;
exports.addUserToIndex = algolia.addUserToIndex;
exports.updateUserIndex = algolia.updateUserIndex;
exports.deleteUserIndex = algolia.deleteUserIndex;

const friends = require('./friends');
exports.getFriendsData = friends.getFriendsData;
exports.deleteFriend = friends.deleteFriend;
exports.requestFriend = friends.requestFriend;
exports.deleteRequest = friends.deleteRequest;
exports.declineInvite = friends.declineInvite;
exports.acceptInvite = friends.acceptInvite;

const projects = require('./projects');
exports.changeProjectPhoto = projects.changeProjectPhoto;
exports.moveTaskFile = projects.moveTaskFile;
exports.setTaskStatus = projects.setTaskStatus;
exports.setStepStatus = projects.setStepStatus;
exports.onProjectDelete = projects.onProjectDelete;
exports.getProjectInvites = projects.getProjectInvites;
exports.acceptProjectInvitation = projects.acceptProjectInvitation;
exports.declineProjectInvitation = projects.declineProjectInvitation;
exports.deleteProject = projects.deleteProject;
exports.moveMessageFile = projects.moveMessageFile;
exports.leaveProject = projects.leaveProject;

const forms = require('./forms');
exports.onAnswerCreate = forms.onAnswerCreate;
exports.deleteForm = forms.deleteForm;
exports.moveQuestionFile = forms.moveQuestionFile;
exports.onFormDelete = forms.onFormDelete;

const posts = require('./posts');
exports.movePostFile = posts.movePostFile;
exports.deletePost = posts.deletePost;
exports.onPostDelete = posts.onPostDelete;

const sendgrid = require('./sendgrid');
exports.sendPostMessage = sendgrid.sendPostMessage;
exports.sendTaskMail = sendgrid.sendTaskMail;
exports.sendPasswordResetMail = sendgrid.sendPasswordResetMail;
exports.sendVerifyEmail = sendgrid.sendVerfiyEmail;
