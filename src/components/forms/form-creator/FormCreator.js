import { useState, useRef, useEffect } from 'react';
import { useRouteMatch, Switch, Route, useHistory } from "react-router-dom";
import { db, functions, storage, fb } from '../../../firebase';
import useError from '../../../hooks/useError';
import useAuth from '../../../hooks/useAuth';
import useTitle from '../../../hooks/useTitle';
import { Container, Form, Header, CustomNavLink, Section } from "./FormCreator.styles";
import AddToForm from './add-to-form/AddToForm';
import QuestionsList from './QuestionsList'

const FormCreator = () => {

    const { dispatchError } = useError();
    const { currentUser: {uid} } = useAuth();
    const { setTitle } = useTitle();
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState(null);
    const titleRef = useRef();
    const { path } = useRouteMatch();
    const history = useHistory();
    const [form, setForm] = useState({title: 'Form Title', 
    status: 'public', 
    members: [] 
    });
    const [questions, setQuestions] = useState([{title: '', multipleAnswers: false, answers: [], file: null, inputField: false}]);

    const handleTitleChange = (e) => {
        e.preventDefault();
        setForm(prev => ({...prev, title: e.target.value}));
    }

    useEffect(() => {
        titleRef.current.focus();
    }, [])

    useEffect(() => {
        setTitle(form.title || 'DOIT');
    }, [setTitle, form.title]);

    const validateData = () => {
        if(!form.title.trim()){
            dispatchError({type: 'forms/title-empty'});
            return false;
        }
        for(const [index, {inputField, answers, title}] of questions.entries()){
            if(!title){
                setError(index);
                dispatchError({type: 'forms/question-empty'});
                return false;
            }
            if(!inputField){
                if(!answers.length){
                    setError(index);
                    dispatchError({type: 'forms/no-answers'});
                    return false;
                }
                for(const answer of answers){
                    if(!answer){
                        setError(index);
                        dispatchError({type: 'forms/answer-empty'});
                        return false;
                    }
                }
            }
        }
        return true;
    }

    const createForm = async e => {
        e.preventDefault();
        dispatchError({type: 'reset'})
        setError(null);
        try{
            //validating data
            if(!validateData()) return;
            setIsCreating(true);
            const formRef = db.collection('forms').doc();
            const { id: formID } = formRef;
            const host = window.location.origin;
            const formLink = `${host}/forms/${formID}`;
            // Creating QRCode
            const { url: QRCode } = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${formLink}`);
            // Creating form
            await formRef.set({
                title: form.title.trim(),
                status: form.status,
                members: form.members,
                authorID: uid,
                createdAt: fb.firestore.FieldValue.serverTimestamp(),
                QRCode: QRCode,
                link: formLink,
                paused: false,
                tookPart: 0,
                inProgress: form.status === 'private' ? form.members.length : 0
            });
            const batch = db.batch();
            const moveQuestionFile = functions.httpsCallable('moveQuestionFile');
            // Creating questions
            for(const [order, { title, answers, multipleAnswers, file, inputField }] of questions.entries()){
                const questionRef = db.collection('forms').doc(formID).collection('questions').doc();
                const { id: questionID } = questionRef;
                let url = null;
                if(file && file.url){
                    await storage.ref(`temp/forms/${formID}/${questionID}/file`).putString(file.url, 'data_url', {customMetadata: {'owner': uid} });
                    await moveQuestionFile({formID: formID, questionID: questionID});
                    url = await storage.ref(`forms/${formID}/${questionID}/file`).getDownloadURL();  
                }
                batch.set(questionRef, {
                    title: title.trim(),
                    multipleAnswers: multipleAnswers,
                    file:{
                        url: url,
                        type: url && file.type,
                        name: url && file.name
                    },
                    answers: answers,
                    order: order,
                    inputField: inputField
                });
                const answersSumRef = questionRef.collection('answersSum').doc('answersSum');
                let answersSum = {};
                answers.forEach(answer => {
                    answersSum = {...answersSum, [answer]: 0}
                })
                batch.set(answersSumRef, {
                    inputs: [],
                    answersSum: answersSum
                });
            }
            await batch.commit();
            return history.push(`/dashboard/forms/${formID}`);
        }
        catch(error){
            dispatchError({type: 'forms/failed-to-create'});
            console.log(error)
        }
        setIsCreating(false);
    }

    return(
        <Container>
            <Form onSubmit={createForm}>
                <Header>
                    <input maxLength='20' spellCheck={false} ref={titleRef} type='text' name='title' value={form.title} onChange={handleTitleChange} />
                </Header>
                <CustomNavLink activeClassName='active' to={`${path}/add`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.355 34.355">
                        <path id="Path_87" data-name="Path 87" d="M21.178,8.294a4.294,4.294,0,1,1-4.294,4.294,4.307,4.307,0,0,1,4.294-4.294m0,21.472c5.8,0,12.454,2.77,12.883,4.294H8.294c.494-1.546,7.107-4.294,12.883-4.294M21.178,4a8.589,8.589,0,1,0,8.589,8.589A8.587,8.587,0,0,0,21.178,4Zm0,21.472C15.445,25.472,4,28.349,4,34.061v4.294H38.355V34.061C38.355,28.349,26.911,25.472,21.178,25.472Z" transform="translate(-4 -4)"/>
                    </svg>
                    Add to form
                </CustomNavLink>
                <Section>
                    <Switch>
                        <Route path={`${path}/add`} render={() => <AddToForm status={form.status} setForm={setForm} members={form.members} />} />
                        <Route path={path} render={() => <QuestionsList error={error} isCreating={isCreating} questions={questions} setQuestions={setQuestions} />} />
                    </Switch>
                </Section>
            </Form>
        </Container>
    )
}

export default FormCreator;