import { useState, useEffect } from 'react';
import { useParams, Redirect, useHistory } from "react-router-dom";
import { db } from '../firebase';

import useAuth from '../hooks/useAuth';
import useError from '../hooks/useError';

import { FormBanner, FormContainer, FormMain, FormSubmit, QuestionsList } from '../components/forms/form/Form.styles';
import Question from '../components/forms/form/Question';

const Form = () => {

    const history = useHistory();
    const { dispatchError } = useError();
    const { currentUser = null } = useAuth();
    const { id } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({});
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = db.collection('forms').doc(id).onSnapshot(form => {
            setForm({...form.data(), id: form.id});
            setLoading(false);
        }, error => setLoading(false));

        return unsubscribe;
    }, [id]);

    useEffect(() => {
        const unsubscribe = db.collection('forms').doc(id).collection('questions').orderBy('order').onSnapshot(questions => {
            const questionsArray = [];
            questions.forEach(question => {
                const data = question.data();
                const { id } = question;
                questionsArray.push({...data, id: id});
            });
            setQuestions(questionsArray);
        });
        return unsubscribe;
    }, [id]);

    const handleSubmitForm = async e => {
        e.preventDefault();
        dispatchError({type: 'reset'});
        setError(null);
        setIsSubmitting(true);
        const form = e.target;
        let answers = {};
        for(const [questionIndex, {multipleAnswers, inputField, id}] of questions.entries()){
            let answer = {input: null, answers: []};
            if(multipleAnswers){
                const checkboxAnswers = form.elements[`answer${questionIndex}`];
                let isAnyChecked = false;
                checkboxAnswers.forEach(({checked, value}) => {
                    if(checked){
                        isAnyChecked = true;
                        answer.answers.push(value);
                    }
                })
                if(!isAnyChecked){
                    setError(questionIndex);
                    setIsSubmitting(false);
                    return dispatchError({type: 'forms/answer-every-question'});
                }
            }
            else{
                const { value } = form.elements[`answer${questionIndex}`];
                if(!value){
                    setError(questionIndex);
                    setIsSubmitting(false);
                    return dispatchError({type: 'forms/answer-every-question'});
                }
                answer.answers.push(value);
            }
            if(inputField){
                const { value } = form.elements[`answer${questionIndex}input`];
                if(value.trim()){
                    answer = {...answer, input: value.trim()};
                }
            }
            answers = {...answers, [id]: answer};
        }
        try{
            if(currentUser){
                await db.collection('forms').doc(id).collection('answers').doc(currentUser.uid).set({
                    authorID: currentUser.uid,
                    answers: answers
                });
            }
            else{
                await db.collection('forms').doc(id).collection('answers').add({
                    authorID: null,
                    answers: answers
                });
            }
            return history.push('/forms/success');
        }
        catch(error){
            dispatchError({type: 'forms/failed-to-submit'});
        }
        setIsSubmitting(false);
    }

    return(
        <>
            {!loading ? (
                form.title ? (
                    <FormContainer>
                        <FormBanner>
                            <h1>{form.title}</h1>
                        </FormBanner>
                        <FormMain>
                            <form noValidate onSubmit={handleSubmitForm}>
                                <QuestionsList>
                                    {questions.map(({title, answers, fileURL, fileType, id, multipleAnswers, inputField}, index) => (
                                        <Question inputField={inputField} index={index} key={id} multipleAnswers={multipleAnswers} title={title} answers={answers} fileURL={fileURL} fileType={fileType} error={error} />
                                    ))}
                                </QuestionsList>
                                <FormSubmit disabled={isSubmitting} isSubmitting={isSubmitting} type='submit'>
                                    <p>Submit Form</p>
                                    <svg version="1.1" width="40px" height="40px" viewBox="0 0 50 50" >
                                        <path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                                            <animateTransform
                                            attributeName="transform"
                                            type="rotate"
                                            from="0 25 25"
                                            to="360 25 25"
                                            dur="0.6s"
                                            repeatCount="indefinite"/>
                                        </path>
                                    </svg>
                                </FormSubmit>
                            </form>
                        </FormMain>
                    </FormContainer>
                ) : (
                    <Redirect to='/' />
                )
            ) : (
                null
            )}
        </>
    )
}

export default Form;