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
        case 'auth/username-too-long':
            return state = 'Your username is too long. Maximum 20 characters';
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
        case 'projects/title-too-long':
            return state = 'Title too long. Maximum 20 characters.';
        case 'projects/title-too-short':
            return state = 'Title too short. Minimum 6 characters.';
        case 'projects/description-too-long':
            return state = 'Description too long. Maximum 80 characters.';
        case 'projects/description-too-short':
            return state = 'Description too short. Minimum 6 characters.';
        case 'projects/change-image-failed':
            return state = 'Failed to change project image. Try again later.';
        case 'projects/task-delete':
            return state = 'Failed to delete task. Try again later.'
        case 'projects/task-title-too-long':
            return state = 'Title too long. Maximum 20 characters.';
        case 'projects/task-title-too-short':
            return state = 'Title too short. Minimum 6 characters.';
        case 'projects/task-description-too-long':
            return state = 'Description too long. Maximum 300 characters.';
        case 'projects/task-description-too-short':
            return state = 'Description too short. Minimum 6 characters.';
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
        case 'projects/step-too-long':
            return state = 'Step description too long. Maximum 60 characters';
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
        default:
            return state = 'Something went wrong. Try again later.';
    }
}

export default errorReducer;