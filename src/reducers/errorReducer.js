const errorReducer = (state, action) => {
    switch(action.type){
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
        case 'auth/failed-to-log-out':
            return state = 'Failed to log out. Try again later.';
        case 'auth/requires-recent-login':
            return state = 'Log in again to change profile settings.';
        case 'update/wrong-image-type':
            return state = 'Unaccepted file type. JPEG or PNG only.';
        case 'update/change-image-failed':
            return state = 'Failed to change your profile picture. Try again later.';
        case 'projects/failed':
            return state = 'Failed to create project. Try again later.';
        case 'projects/edit':
            return state = 'Failed to edit your project. Try again later.';
        case 'projects/delete':
            return state = 'Failed to delete your project. Try again later.';
        case 'projects/title-too-long':
            return state = 'Title too long. Maximum 20 characters.';
        case 'projects/title-too-short':
            return state = 'Title too short. Maximum 6 characters.';
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
        case 'reset':
            return state = '';
        default:
            return state = 'Something went wrong. Try again later.';
    }
}

export default errorReducer;