import { useState, useEffect } from 'react';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { db } from '../../services/firebase';
import useAuth from '../../contexts/auth-context/useAuth';
import useError from '../../contexts/error-context/useError';
import useTitle from '../../hooks/useTitle';
import {
    FormContainer,
    FormContentContainer,
    FormElement,
    FormHeaderContainer,
    FormQuestionsContainer,
    FormTitle,
} from './Form.styles';
import FormQuestion from './components/form-question/FormQuestion';
import FormButton from './components/form-button/FormButton';

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
    useTitle(form.title);

    useEffect(() => {
        const unsubscribe = db
            .collection('forms')
            .doc(id)
            .onSnapshot(
                (form) => {
                    setForm({ ...form.data(), id: form.id });
                    setLoading(false);
                },
                (error) => setLoading(false),
            );

        return unsubscribe;
    }, [id]);

    useEffect(() => {
        const unsubscribe = db
            .collection('forms')
            .doc(id)
            .collection('questions')
            .orderBy('order')
            .onSnapshot((questions) => {
                const questionsArray = [];
                questions.forEach((question) => {
                    const data = question.data();
                    const { id } = question;
                    questionsArray.push({ ...data, id: id });
                });
                setQuestions(questionsArray);
            });
        return unsubscribe;
    }, [id]);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        dispatchError({ type: 'reset' });
        setError(null);
        setIsSubmitting(true);
        const form = e.target;
        let userAnswers = {};
        for (const [
            questionIndex,
            { multipleAnswers, inputField, id, answers },
        ] of questions.entries()) {
            const answer = { input: null, answers: [] };
            if (inputField) {
                const { value } = form.elements[`answer${questionIndex}input`];
                if (value.trim()) {
                    answer.input = value.trim();
                }
                answer.input = value.trim();
            }
            if (answers.length > 0) {
                if (multipleAnswers) {
                    const checkboxAnswers =
                        form.elements[`answer${questionIndex}`];
                    checkboxAnswers.forEach(({ checked, value }) => {
                        if (checked) {
                            answer.answers.push(value);
                        }
                    });
                } else {
                    const { value } = form.elements[`answer${questionIndex}`];
                    if (value) {
                        answer.answers.push(value);
                    }
                }
            }
            if (!answer.input && !answer.answers.length) {
                setError(questionIndex);
                setIsSubmitting(false);
                return dispatchError({ type: 'forms/answer-every-question' });
            }
            userAnswers = { ...userAnswers, [id]: answer };
        }
        try {
            if (currentUser) {
                await db
                    .collection('forms')
                    .doc(id)
                    .collection('answers')
                    .doc(currentUser.uid)
                    .set({
                        authorID: currentUser.uid,
                        answers: userAnswers,
                    });
            } else {
                await db.collection('forms').doc(id).collection('answers').add({
                    authorID: null,
                    answers: userAnswers,
                });
            }
            return history.push('/forms/success');
        } catch (error) {
            dispatchError({ type: 'forms/failed-to-submit' });
        }
        setIsSubmitting(false);
    };

    return (
        <>
            {!loading ? (
                form.title ? (
                    <FormContainer>
                        <FormHeaderContainer>
                            <FormTitle>{form.title}</FormTitle>
                        </FormHeaderContainer>
                        <FormContentContainer>
                            <FormElement noValidate onSubmit={handleSubmitForm}>
                                <FormQuestionsContainer>
                                    {questions.map(({ id, ...rest }, index) => (
                                        <FormQuestion
                                            index={index}
                                            key={id}
                                            {...rest}
                                            error={error}
                                        />
                                    ))}
                                </FormQuestionsContainer>
                                <FormButton
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Submit Form
                                </FormButton>
                            </FormElement>
                        </FormContentContainer>
                    </FormContainer>
                ) : (
                    <Redirect to="/" />
                )
            ) : null}
        </>
    );
};

export default Form;
