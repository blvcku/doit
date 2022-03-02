import AddIcon from '../../../images/formCreator/add.svg';

import useError from '../../../hooks/useError';

import { QuestionsListContainer, CreateButton, AddQuestionButton, ButtonsContainer } from "./FormCreator.styles";
import Question from './Question/Question';

const QuestionsList = ({questions, setQuestions, isCreating, error}) => {

    const { dispatchError } = useError();

    const addQuestion = e => {
        e.preventDefault();
        dispatchError({type: 'reset'});
        if(questions.length >= 20) return dispatchError({type: 'forms/max-questions'});
        setQuestions(prev => ([...prev, {title: '', multipleAnswers: false, answers: [], file: null, inputField: false}]));
    }

    return(
        <>
            <QuestionsListContainer>
                {questions.map(({title, multipleAnswers, answers, file, inputField}, index) => (
                    <Question
                        key={index}
                        title={title}
                        multipleAnswers={multipleAnswers}
                        answers={answers}
                        file={file}
                        index={index}
                        inputField={inputField}
                        error={error}
                        setQuestions={setQuestions}
                        questions={questions}
                    />
                ))}
            </QuestionsListContainer>
            <ButtonsContainer>
                <AddQuestionButton onClick={addQuestion} type='button'>
                    <img src={AddIcon} alt='Add' />
                    Add Form Question
                </AddQuestionButton>
                <CreateButton isCreating={isCreating} disabled={isCreating} type='submit'>
                    <p>Create</p>
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
                </CreateButton>
            </ButtonsContainer>
        </>
    )
}

export default QuestionsList;