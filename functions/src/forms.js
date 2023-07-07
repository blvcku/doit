const functions = require('firebase-functions');
const admin = require('firebase-admin');

const bucket = admin.storage().bucket();
const formsRef = admin.firestore().collection('forms');
const firestore = admin.firestore();

exports.onAnswerCreate = functions.firestore
    .document('forms/{formID}/answers/{answerID}')
    .onCreate(async (snap, context) => {
        try {
            const formID = context.params.formID;
            const answer = snap.data();
            for (const [questionID, { answers, input }] of Object.entries(
                answer.answers,
            )) {
                const answersSumRef = formsRef
                    .doc(formID)
                    .collection('questions')
                    .doc(questionID)
                    .collection('answersSum')
                    .doc('answersSum');
                const answersSnap = await answersSumRef.get();
                let { answersSum, inputs } = answersSnap.data();
                for (const answer of answers) {
                    answersSum[answer]++;
                }
                if (input) inputs.push(input);
                await answersSumRef.update({
                    answersSum: answersSum,
                    inputs: inputs,
                });
            }
            await formsRef.doc(formID).update({
                inProgress: admin.firestore.FieldValue.increment(-1),
                tookPart: admin.firestore.FieldValue.increment(1),
            });
            return;
        } catch (error) {
            throw error;
        }
    });

exports.onFormDelete = functions.firestore
    .document('forms/{formID}')
    .onDelete(async (snap, context) => {
        try {
            await bucket.deleteFiles({ prefix: `forms/${snap.id}` });
            return;
        } catch (error) {
            throw error;
        }
    });

exports.deleteForm = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth.uid) return Promise.reject('unauthorized');
        const formRef = formsRef.doc(data.formID);
        const form = await formRef.get();
        const { authorID } = form.data();
        if (authorID !== context.auth.uid)
            return Promise.reject('unauthorized');
        await firestore.recursiveDelete(formRef);
        return;
    } catch (error) {
        throw error;
    }
});

exports.moveQuestionFile = functions.https.onCall(async (data, context) => {
    try {
        if (!context.auth.uid) return Promise.reject('unauthorized');
        const form = await formsRef.doc(data.formID).get();
        const { authorID } = form.data();
        if (authorID !== context.auth.uid)
            return Promise.reject('unauthorized');
        const file = bucket.file(
            `temp/forms/${data.formID}/${data.questionID}/file`,
        );
        await file.move(`forms/${data.formID}/${data.questionID}/file`);
        return;
    } catch (error) {
        throw error;
    }
});
