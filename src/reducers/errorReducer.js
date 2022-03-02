const errorReducer = (state, action) => {
    switch(action.type){
        case 'reset':
            return state = '';
        case 'auth/email-already-exists':
            return state = 'This email address is already being used.';
        case 'auth/email-already-in-use':
            return state = 'This email address is already being used.';
        case 'auth/invalid-password':
            return state = 'Invalid email or password.';
        case 'auth/wrong-password':
            return state = 'Invalid email or password.';
        case 'auth/user-not-found':
            switch(action.cat){
                case 'resetpassword':
                    return state = 'The account with the given email address does not exist.';
                default:
                    return state = 'Invalid email or password.';
            }
        case 'auth/passwords-not-match':
            return state = 'Passwords do not match.';
        case 'auth/invalid-email':
            return state = 'Given email address is not valid.';
        case 'auth/password-too-short':
            return state = 'Your password is too short. Minimum 6 characters.';
        case 'auth/username-too-short':
            return state = 'Your username is too short. Minimum 6 characters.';
        case 'auth/failed-to-log-out':
            return state = 'Failed to log out. Try again later.';
        case 'auth/requires-recent-login':
            return state = 'Log in again to change profile settings.';
        case 'update/wrong-image-type':
            return state = 'Unaccepted file type. JPEG or PNG only.';
        case 'update/change-image-failed':
            return state = 'Failed to change your profile picture. Try again later.';
        case 'projects/create':
            return state = 'Failed to create project. Try again later.';
        case 'projects/edit':
            return state = 'Failed to edit your project. Try again later.';
        case 'projects/delete':
            return state = 'Failed to delete your project. Try again later.';
        case 'projects/title-too-short':
            return state = 'Title cannot be empty.';
        case 'projects/description-too-short':
            return state = 'Description cannot be empty.';
        case 'projects/change-image-failed':
            return state = 'Failed to change project image. Try again later.';
        case 'projects/task-delete':
            return state = 'Failed to delete task. Try again later.'
        case 'projects/task-title-too-short':
            return state = 'Task title cannot be empty.';
        case 'projects/task-description-too-short':
            return state = 'Task description cannot be empty.';
        case 'projects/task-update':
            return state = 'Failed to edit task. Try again later.';
        case 'projects/task-create':
            return state = 'Failed to create task. Try again later.';
        case 'projects/task-status':
            return state = 'Failed to change task status. Try again later.';
        case 'projects/task-file':
            return state = 'Failed to upload file. Try again later';
        case 'projects/accept-invite':
            return state = 'Failed to accept project invitation. Try again later.';
        case 'projects/decline-invite':
            return state = 'Failed to decline project invitation. Try again later.';
        case 'projects/delete-member':
            return state = 'Failed to delete member. Try again later';
        case 'projects/delete-invite':
            return state = 'Failed to cancel project invitation. Try again later.';
        case 'projects/invite':
            return state = 'Failed to send project invitation. Try again later.';
        case 'projects/max-steps':
            return state = 'No more steps can be added.';
        case 'projects/step-empty':
            return state = 'Step cannot be empty.';
        case 'projects/step-failed':
            return state = 'Failed to change step status. Try again later.';
        case 'friends/delete':
            return state = 'Failed to delete user from friend list. Try again later.';
        case 'friends/request':
            return state = 'Failed to send friend request. Try again later.';
        case 'friends/request-delete':
            return state = 'Failed to delete friend request. Try again later.';
        case 'friends/invite-decline':
            return state = 'Failed to decline friend request. Try again later';
        case 'friends/accept':
            return state = 'Failed to accept friend request. Try again later.';
        case 'forms/title-empty':
            return state = 'Form title cannot be empty.';
        case 'forms/question-empty':
            return state = 'Question cannot be empty.';
        case 'forms/no-answers':
            return state = 'Question has no answers. Add one to create form.';
        case 'forms/max-questions':
            return state = 'No more questions can be added.';
        case 'forms/answer-empty':
            return state = 'Answer cannot be empty.';
        case 'forms/max-answers':
            return state = 'No more answers can be added.';
        case 'forms/wrong-file-type':
            return state = 'Unaccepted file type.';
        case 'forms/failed-to-create':
            return state = 'Failed to create form. Try again later.';
        case 'forms/answer-every-question':
            return state = 'Answer every question to submit form.';
        case 'forms/failed-to-submit':
            return state = 'Failed to submit form. Try again later.';
        case 'forms/failed-to-pause':
            return state = 'Failed to pause/unpause form. Try again later.';
        case 'posts/wrong-file-type':
            return state = 'Unaccepted file type.';
        case 'posts/failed-to-create':
            return state = 'Failed to create post. Try again later.';
        case 'posts/title-empty':
            return state = 'Post title cannot be empty.';
        case 'posts/description-empty':
            return state = 'Post description cannot be empty.';
        case 'posts/failed-to-delete':
            return state = 'Failed to delete post. Try again later.';
        case 'posts/failed-to-edit':
            return state = 'Failed to edit post. Try again later.';
        case 'posts/message-empty':
            return state = 'Contact message cannot be empty.';
        case 'posts/failed-to-send-message':
            return state = 'Failed to send message. Try again later.';
        case 'posts/already-sent-message':
            return state = 'You have already sent a message to this person.';
        default:
            return state = 'Something went wrong. Try again later.';
    }
}

export default errorReducer;