import { useEffect } from 'react';

import useFileType from '../../../hooks/useFileType';

import { QuestionContainer, QuestionWrapper, FileContainer, AnswerContainer, InputFieldLabel } from "./Form.styles";

const Question = ({title, fileURL, answers, fileType, multipleAnswers, index, inputField, error}) => {

    const { setFile, fileElement } = useFileType();   

    useEffect(() => {
        setFile({type: fileType, file: fileURL, name: 'file'})
    }, [fileType, fileURL, setFile]);

    return(
        <QuestionContainer error={error === index} >
            <QuestionWrapper>
                <h2>{title}</h2>
                {fileURL && (
                    <FileContainer type={fileType}>
                        {fileElement}
                    </FileContainer>
                )}
                <ul>
                    {answers.map((answer, answerIndex) => (
                        <AnswerContainer key={answerIndex}>
                            <input type={multipleAnswers ? 'checkbox' : 'radio'} name={`answer${index}`} value={answer} />
                            <label htmlFor='answer'>{answer}</label>
                        </AnswerContainer>
                    ))}
                </ul>
                {inputField && (
                    <InputFieldLabel>
                        Other:
                        <input maxLength='400' type='text' name={`answer${index}input`} placeholder='Write your answer...' />
                    </InputFieldLabel>
                )}
            </QuestionWrapper>
        </QuestionContainer>
    )
}

export default Question;