import { useState, useEffect } from 'react';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { db, functions } from '../../../services/firebase';
import PauseIcon from '../../../assets/icons/pause.svg';
import UnpauseIcon from '../../../assets/icons/unpause.svg';
import CopyIcon from '../../../assets/icons/copy.svg';
import useAuth from '../../../contexts/auth-context/useAuth';
import useError from '../../../contexts/error-context/useError';
import useConfirmBox from '../../../contexts/confirm-box-context/useConfirmBox';
import useTitle from '../../../hooks/useTitle';
import {
    Container,
    Wrapper,
    Header,
    PauseButton,
    FormInfoContainer,
    FormInfoWrapper,
    CopyButton,
    FormInfoFirst,
    FormInfoSecond,
    CopyContainer,
    QuestionsList,
    DeleteFormButton,
} from './FormPanel.styles';
import FormScore from './FormScore';
import Question from './Question';

const FormPanel = () => {
    const { id } = useParams();
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(true);
    const {
        currentUser: { uid },
    } = useAuth();
    const { dispatchError } = useError();
    const [questions, setQuestions] = useState([]);
    const { setConfirmInfo } = useConfirmBox();
    const history = useHistory();
    const [deletingForm, setDeletingForm] = useState(false);
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
                const questionsList = [];
                questions.forEach((question) => {
                    questionsList.push({ ...question.data(), id: question.id });
                });
                setQuestions(questionsList);
            });
        return unsubscribe;
    }, [id]);

    useEffect(() => {
        if (uid !== form.authorID) {
            setForm({});
        }
    }, [uid, form.authorID]);

    const handleTogglePaused = async (e) => {
        e.preventDefault();
        dispatchError({ type: 'reset' });
        try {
            await db.collection('forms').doc(id).update({
                paused: !form.paused,
            });
        } catch (error) {
            dispatchError({ type: 'forms/failed-to-pause' });
        }
    };

    const handleCopyLink = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(form.link);
    };

    const handleCopyQRCode = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(form.QRCode);
    };

    const handleDeleteForm = (e) => {
        e.preventDefault();
        setConfirmInfo({ message: 'delete this form', action: deleteForm });
    };

    const deleteForm = async () => {
        dispatchError({ type: 'reset' });
        try {
            setDeletingForm(true);
            const deleteFormFunction = functions.httpsCallable('deleteForm');
            await deleteFormFunction({ formID: id });
            return history.push('/dashboard/forms');
        } catch (error) {
            dispatchError({ type: 'forms/failed-to-delete' });
        }
        setDeletingForm(false);
    };

    return (
        <>
            {!loading ? (
                form.title ? (
                    <Container>
                        <Wrapper>
                            <Header>
                                <h2>{form.title}</h2>
                            </Header>
                            <PauseButton
                                onClick={handleTogglePaused}
                                isPaused={form.paused}
                                type="button"
                            >
                                {form.paused ? (
                                    <>
                                        <img src={UnpauseIcon} alt="" />
                                        <span>Unpause form</span>
                                    </>
                                ) : (
                                    <>
                                        <img src={PauseIcon} alt="" />
                                        <span>Pause form</span>
                                    </>
                                )}
                            </PauseButton>
                            <FormInfoContainer>
                                <FormInfoWrapper>
                                    <FormInfoFirst>
                                        <h3>Form Link:</h3>
                                        <CopyContainer
                                            style={{ marginTop: '.4rem' }}
                                        >
                                            <a href={form.link}>{form.link}</a>
                                            <CopyButton
                                                onClick={handleCopyLink}
                                                type="button"
                                            >
                                                <img
                                                    src={CopyIcon}
                                                    alt="copy link"
                                                />
                                            </CopyButton>
                                        </CopyContainer>
                                    </FormInfoFirst>
                                    <FormInfoSecond>
                                        <CopyContainer>
                                            <h4>Scan QR Code</h4>
                                            <CopyButton
                                                onClick={handleCopyQRCode}
                                                type="button"
                                            >
                                                <img
                                                    src={CopyIcon}
                                                    alt="copy qrcode"
                                                />
                                            </CopyButton>
                                        </CopyContainer>
                                        <img src={form.QRCode} alt="QRCode" />
                                    </FormInfoSecond>
                                    <FormScore
                                        number={form.tookPart}
                                        text="Took part"
                                    />
                                    <FormScore
                                        number={
                                            form.inProgress >= 0
                                                ? form.inProgress
                                                : 0
                                        }
                                        text="In Progress"
                                    />
                                    <DeleteFormButton
                                        disabled={deletingForm}
                                        onClick={handleDeleteForm}
                                        type="button"
                                    >
                                        Delete Form
                                    </DeleteFormButton>
                                </FormInfoWrapper>
                            </FormInfoContainer>
                            <QuestionsList>
                                {questions.map(
                                    ({
                                        id: questionID,
                                        title,
                                        answers,
                                        inputField,
                                    }) => (
                                        <Question
                                            key={questionID}
                                            title={title}
                                            formID={id}
                                            id={questionID}
                                            answers={answers}
                                            inputField={inputField}
                                        />
                                    ),
                                )}
                            </QuestionsList>
                        </Wrapper>
                    </Container>
                ) : (
                    <Redirect to="/" />
                )
            ) : null}
        </>
    );
};

export default FormPanel;
