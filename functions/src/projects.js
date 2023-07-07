const functions = require('firebase-functions');
const admin = require('firebase-admin');

const projectsRef = admin.firestore().collection('projects');
const tasksRef = admin.firestore().collection('tasks');
const bucket = admin.storage().bucket();
const firestore = admin.firestore();

exports.changeProjectPhoto = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth.uid) return Promise.reject('unauthorized');
        const project = await projectsRef.doc(data.id).get();
        const { authorID } = project.data();
        if (authorID !== context.auth.uid)
            return Promise.reject('unauthorized');
        const base64EncodedImageString = data.file.split(',')[1];
        const imageBuffer = new Buffer.from(base64EncodedImageString, 'base64');
        const file = bucket.file(`projects/${data.id}/banner`);
        await file.save(imageBuffer, {
            contentType: `${data.filetype}`,
            metadata: {
                metadata: {
                    owner: context.auth.uid,
                },
            },
        });
        return;
    } catch (error) {
        throw error;
    }
});

exports.moveTaskFile = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth.uid) return Promise.reject('unauthorized');
        const task = await tasksRef.doc(data.taskID).get();
        const { authorID } = task.data();
        if (authorID !== context.auth.uid)
            return Promise.reject('unauthorized');
        const file = bucket.file(`temp/tasks/${data.taskID}/file`);
        await file.move(`tasks/${data.taskID}/file`);
        return;
    } catch (error) {
        throw error;
    }
});

exports.setTaskStatus = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth.uid) return Promise.reject('unauthorized');
        const task = await tasksRef.doc(data.id).get();
        const {
            projectID,
            performer: { uid },
        } = task.data();
        if (uid !== context.auth.uid) {
            const project = await projectsRef.doc(projectID).get();
            const { authorID } = project.data();
            if (authorID !== context.auth.uid)
                return Promise.reject('unauthorized');
        }
        await tasksRef.doc(data.id).update({
            status: data.status,
        });
        return;
    } catch (error) {
        throw error;
    }
});

exports.setStepStatus = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth.uid) return Promise.reject('unauthorized');
        const task = await tasksRef.doc(data.id).get();
        const {
            steps,
            performer: { uid },
        } = task.data();
        if (uid !== context.auth.uid) return Promise.reject('unauthorized');
        steps[data.index].checked = !steps[data.index].checked;
        await tasksRef.doc(data.id).update({
            steps: steps,
        });
        return;
    } catch (error) {
        throw error;
    }
});

exports.onProjectDelete = functions.firestore
    .document('projects/{projectID}')
    .onDelete(async (snap, context) => {
        try {
            await tasksRef
                .where('projectID', '==', snap.id)
                .get()
                .then((tasks) => {
                    tasks.forEach((task) => tasksRef.doc(task.id).delete());
                });
            await bucket.deleteFiles({ prefix: `projects/${snap.id}` });
            return;
        } catch (error) {
            throw error;
        }
    });

exports.onTaskDelete = functions.firestore
    .document('tasks/{taskID}')
    .onDelete(async (snap, context) => {
        try {
            await bucket.deleteFiles({ prefix: `tasks/${snap.id}` });
            return;
        } catch (error) {
            throw error;
        }
    });

exports.getProjectInvites = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth.uid) return Promise.reject('unauthorized');
        const projects = await projectsRef
            .where('invites', 'array-contains', context.auth.uid)
            .get();
        const projectInvites = [];
        projects.forEach((project) => {
            const { title, photoURL = undefined } = project.data();
            projectInvites.push({
                invite: true,
                title: title,
                id: project.id,
                photoURL: photoURL,
            });
        });
        return projectInvites;
    } catch (error) {
        throw error;
    }
});

exports.acceptProjectInvitation = functions.https.onCall(
    async (data, context) => {
        try {
            if (!context.auth.uid) return Promise.reject('unauthorized');
            const project = await projectsRef.doc(data.projectID).get();
            const { invites = [] } = project.data();
            if (invites.includes(context.auth.uid)) {
                await projectsRef.doc(data.projectID).update({
                    invites: admin.firestore.FieldValue.arrayRemove(
                        context.auth.uid,
                    ),
                    members: admin.firestore.FieldValue.arrayUnion(
                        context.auth.uid,
                    ),
                });
            }
            return;
        } catch (error) {
            throw error;
        }
    },
);

exports.declineProjectInvitation = functions.https.onCall(
    async (data, context) => {
        try {
            if (!context.auth.uid) return Promise.reject('unauthorized');
            await projectsRef.doc(data.projectID).update({
                invites: admin.firestore.FieldValue.arrayRemove(
                    context.auth.uid,
                ),
            });
        } catch (error) {
            throw error;
        }
    },
);

exports.deleteProject = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth.uid) return Promise.reject('unauthorized');
        const projectRef = projectsRef.doc(data.id);
        const project = await projectRef.get();
        const { authorID } = project.data();
        if (authorID !== context.auth.uid)
            return Promise.reject('unauthorized');
        await firestore.recursiveDelete(projectRef);
        return;
    } catch (error) {
        throw error;
    }
});

exports.moveMessageFile = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth.uid) return Promise.reject('unauthorized');
        const project = await projectsRef.doc(data.projectID).get();
        const { members } = project.data();
        if (!members.includes(context.auth.uid))
            return Promise.reject('unauthorized');
        const file = bucket.file(
            `temp/projects/${data.projectID}/messages/${data.fileID}`,
        );
        await file.move(`projects/${data.projectID}/messages/${data.fileID}`);
        return;
    } catch (error) {
        throw error;
    }
});

exports.leaveProject = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth.uid) return Promise.reject('unauthorized');
        await projectsRef.doc(data.projectID).update({
            members: admin.firestore.FieldValue.arrayRemove(context.auth.uid),
        });
        return;
    } catch (error) {
        throw error;
    }
});
