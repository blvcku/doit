const errorReducer = (state, action) => {
    switch(action.type){
        case 'reset':
            return state = {error: ''};
        case 'auth/email-already-exists':
            return state = {error: 'This email address is already being used.'};
        case 'auth/email-already-in-use':
            return state = {error: 'This email address is already being used.'};
        case 'auth/invalid-password':
            return state = {error: 'Invalid email or password.'};
        case 'auth/wrong-password':
            return state = {error: 'Invalid email or password.'};
        case 'auth/user-not-found':
            return state = {error: 'Invalid email or password.'};
        case 'auth/resetpassword-failed':
            return state = {error: 'The account with the given email address does not exist.'};
        case 'auth/passwords-not-match':
            return state = {error: 'Passwords do not match.'};
        case 'auth/invalid-email':
            return state = {error: 'Given email address is not valid.'};
        case 'auth/password-too-short':
            return state = {error: 'Your password is too short. Minimum 6 characters.'};
        case 'auth/username-too-short':
            return state = {error: 'Your username is too short. Minimum 6 characters.'};
        case 'auth/failed-to-log-out':
            return state = {error: 'Failed to log out. Relogin or try again later.'};
        case 'auth/requires-recent-login':
            return state = {error: 'Log in again to change profile settings.'};
        case 'auth/failed-to-send-mail':
            return state = {error: 'Failed to send verification mail. Relogin or try again later.'};
        case 'update/wrong-image-type':
            return state = {error: 'Unaccepted file type. JPEG or PNG only.'};
        case 'update/change-image-failed':
            return state = {error: 'Failed to change your profile picture. Relogin or try again later.'};
        case 'projects/create':
            return state = {error: 'Failed to create project. Relogin or try again later.'};
        case 'projects/edit':
            return state = {error: 'Failed to edit your project. Relogin or try again later.'};
        case 'projects/delete':
            return state = {error: 'Failed to delete your project. Relogin or try again later.'};
        case 'projects/leave':
            return state = {error: 'Failed to leave project. Relogin or try again later.'};
        case 'projects/title-too-short':
            return state = {error: 'Title cannot be empty.'};
        case 'projects/description-too-short':
            return state = {error: 'Description cannot be empty.'};
        case 'projects/change-image-failed':
            return state = {error: 'Failed to change project image. Relogin or try again later.'};
        case 'projects/task-delete':
            return state = {error: 'Failed to delete task. Relogin or try again later.'};
        case 'projects/task-title-too-short':
            return state = {error: 'Task title cannot be empty.'};
        case 'projects/task-description-too-short':
            return state = {error: 'Task description cannot be empty.'};
        case 'projects/task-update':
            return state = {error: 'Failed to edit task. Relogin or try again later.'};
        case 'projects/task-create':
            return state = {error: 'Failed to create task. Relogin or try again later.'};
        case 'projects/task-status':
            return state = {error: 'Failed to change task status. Relogin or try again later.'};
        case 'projects/task-file':
            return state = {error: 'Failed to upload file. Relogin or try again later.'};
        case 'projects/accept-invite':
            return state = {error: 'Failed to accept project invitation. Relogin or try again later.'};
        case 'projects/decline-invite':
            return state = {error: 'Failed to decline project invitation. Relogin or try again later.'};
        case 'projects/delete-member':
            return state = {error: 'Failed to delete member. Relogin or try again later.'};
        case 'projects/delete-invite':
            return state = {error: 'Failed to cancel project invitation. Relogin or try again later.'};
        case 'projects/invite':
            return state = {error: 'Failed to send project invitation. Relogin or try again later.'};
        case 'projects/max-steps':
            return state = {error: 'No more steps can be added.'};
        case 'projects/step-empty':
            return state = {error: 'Step cannot be empty.'};
        case 'projects/step-failed':
            return state = {error: 'Failed to change step status. Relogin or try again later.'};
        case 'projects/failed-send-message':
            return state = {error: 'Failed to send message. Relogin or try again later.'};
        case 'projects/message-wrong-file-type':
            return state = {error: 'Unaccepted file type.'};
        case 'friends/delete':
            return state = {error: 'Failed to delete user from friend list. Relogin or try again later.'};
        case 'friends/request':
            return state = {error: 'Failed to send friend request. Relogin or try again later.'};
        case 'friends/request-delete':
            return state = {error: 'Failed to delete friend request. Relogin or try again later.'};
        case 'friends/invite-decline':
            return state = {error: 'Failed to decline friend request. Relogin or try again later.'};
        case 'friends/accept':
            return state = {error: 'Failed to accept friend request. Relogin or try again later.'};
        case 'forms/title-empty':
            return state = {error: 'Form title cannot be empty.'};
        case 'forms/question-empty':
            return state = {error: 'Question cannot be empty.'};
        case 'forms/no-answers':
            return state = {error: 'Question has no answers. Add one to create form.'};
        case 'forms/max-questions':
            return state = {error: 'No more questions can be added.'};
        case 'forms/answer-empty':
            return state = {error: 'Answer cannot be empty.'};
        case 'forms/max-answers':
            return state = {error: 'No more answers can be added.'};
        case 'forms/wrong-file-type':
            return state = {error: 'Unaccepted file type.'};
        case 'forms/failed-to-create':
            return state = {error: 'Failed to create form. Relogin or try again later.'};
        case 'forms/answer-every-question':
            return state = {error: 'Answer every question to submit form.'};
        case 'forms/failed-to-submit':
            return state = {error: 'Failed to submit form. Relogin or try again later.'};
        case 'forms/failed-to-pause':
            return state = {error: 'Failed to pause/unpause form. Relogin or try again later.'};
        case 'forms/failed-to-delete':
            return state = {error: 'Failed to delete form. Relogin or try again later.'};
        case 'posts/wrong-file-type':
            return state = {error: 'Unaccepted file type.'};
        case 'posts/failed-to-create':
            return state = {error: 'Failed to create post. Relogin or try again later.'};
        case 'posts/title-empty':
            return state = {error: 'Post title cannot be empty.'};
        case 'posts/description-empty':
            return state = {error: 'Post description cannot be empty.'};
        case 'posts/failed-to-delete':
            return state = {error: 'Failed to delete post. Relogin or try again later.'};
        case 'posts/failed-to-edit':
            return state = {error: 'Failed to edit post. Relogin or try again later.'};
        case 'posts/message-empty':
            return state = {error: 'Contact message cannot be empty.'};
        case 'posts/failed-to-send-message':
            return state = {error: 'Failed to send message. Relogin or try again later.'};
        case 'posts/already-sent-message':
            return state = {error: 'You have already sent a message to this person.'};
        default:
            return state = {error: 'Something went wrong. Relogin or try again later.'};
    }
}

export default errorReducer;