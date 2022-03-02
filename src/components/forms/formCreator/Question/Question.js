import { useEffect } from 'react';
import PlusIcon from '../../../../images/formCreator/addwhite.svg';
import MinusIcon from '../../../../images/formCreator/minus.svg';

import useError from '../../../../hooks/useError';
import useFileType from '../../../../hooks/useFileType';

import { QuestionContainer, QuestionLabel, ButtonsContainer, FileContainer, AnswersContainer, Answer } from "./Question.styles";

const Question = ({title, multipleAnswers, answers, file, index, inputField, error, setQuestions, questions}) => {

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const { dispatchError } = useError();
    const { setFile, fileElement } = useFileType();

    const handleAction = (e, type, answerIndex) => {
        e.preventDefault();
        const tempQuestions = [...questions];
        switch(type){
            case 'changeQuestionTitle':
                tempQuestions[index].title = e.target.value;
                break;
            case 'toggleInputField':
                tempQuestions[index].inputField = !tempQuestions[index].inputField;
                break;
            case 'toggleMultipleAnswers':
                tempQuestions[index].multipleAnswers = !tempQuestions[index].multipleAnswers;
                break;
            case 'addAnswer':
                if(answers.length >= 8) return dispatchError({type: 'forms/max-answers'});
                tempQuestions[index].answers.push('');
                break;
            case 'deleteAnswer':
                tempQuestions[index].answers.splice(answerIndex, 1);
                break;
            case 'changeAnswerContent':
                tempQuestions[index].answers[answerIndex] = e.target.value;
                break;
            default:
                break;
        }
        setQuestions(tempQuestions);
    }

    const changeFile = e => {
        e.preventDefault();
        dispatchError({type: 'reset'});
        const file = e.target.files[0];
        if(!file.type.startsWith('audio') && !file.type.startsWith('video') && !file.type.startsWith('image')) return dispatchError({type: 'forms/wrong-file-type'});
        const reader = new FileReader();
        reader.onloadend = async e => {
            try{
                const tempQuestions = [...questions];
                tempQuestions[index].file = {file: e.target.result, name: file.name, type: file.type};
                setQuestions(tempQuestions);
            }
            catch(error){
                console.error(error);
            }
        }
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        setFile(file);
    }, [file, setFile]);

    return(
        <QuestionContainer error={error === index}>
            <QuestionLabel>
                Form Question:
                <input maxLength='200' value={title} onChange={e => handleAction(e, 'changeQuestionTitle')} type='text' name='question' placeholder="Question" />
            </QuestionLabel>
            <FileContainer type={file && file.type} >
                <label>
                    <img src={PlusIcon} alt='Add' />
                    Add File
                    <input onChange={changeFile} type='file' name='file' />
                </label>
                {file && (
                    <div>
                        {fileElement}
                    </div>
                )}
            </FileContainer>
            <ButtonsContainer>
                <button onClick={e => handleAction(e, 'addAnswer')} type='button'>
                    <img src={PlusIcon} alt='Add' />
                    Add Answer
                </button>
                <button onClick={e => handleAction(e, 'toggleInputField')} type='button'>
                    <input checked={inputField} type='checkbox' name='inputfield' />
                    <label htmlFor='inputfield'>Input Field</label>
                </button>
                <button onClick={e => handleAction(e, 'toggleMultipleAnswers')} type='button'>
                    <input checked={multipleAnswers} type='checkbox' name='multipleanswers' />
                    <label htmlFor='multipleanswers'>Multiple Answers</label>
                </button>
            </ButtonsContainer>
            <AnswersContainer>
                {answers.map((answer, answerIndex) => (
                    <Answer key={answerIndex}>
                        <div>{alphabet[answerIndex]}</div>
                        <input maxLength='100' value={answer} onChange={e => handleAction(e, 'changeAnswerContent', answerIndex)} type='text' name='answer' placeholder='Answer' />
                        <button onClick={e => handleAction(e, 'deleteAnswer', answerIndex)} type='button'>
                            <img src={MinusIcon} alt='delete' />
                        </button>
                    </Answer>
                ))}
            </AnswersContainer>             
        </QuestionContainer>
    )
}

export default Question;