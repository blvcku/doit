import { useEffect } from 'react';
import useFileType from '../../../../hooks/useFileType';
import {
    QuestionContainer,
    QuestionWrapper,
    FileContainer,
    AnswerContainer,
    InputFieldLabel,
} from './FormQuestion.styles';

const Question = ({
    title,
    file,
    answers,
    multipleAnswers,
    index,
    inputField,
    error,
}) => {
    const { setFile, FileElement } = useFileType();

    useEffect(() => {
        setFile(file);
    }, [file, setFile]);

    return (
        <QuestionContainer error={error === index}>
            <QuestionWrapper>
                <h2>{title}</h2>
                {file && file.url && (
                    <FileContainer type={file && file.type}>
                        {FileElement}
                    </FileContainer>
                )}
                <ul>
                    {answers.map((answer, answerIndex) => (
                        <AnswerContainer key={answerIndex}>
                            <input
                                type={multipleAnswers ? 'checkbox' : 'radio'}
                                name={`answer${index}`}
                                value={answer}
                            />
                            <label htmlFor="answer">{answer}</label>
                        </AnswerContainer>
                    ))}
                </ul>
                {inputField && (
                    <InputFieldLabel>
                        Other:
                        <input
                            maxLength="400"
                            type="text"
                            name={`answer${index}input`}
                            placeholder="Write your answer..."
                        />
                    </InputFieldLabel>
                )}
            </QuestionWrapper>
        </QuestionContainer>
    );
};

export default Question;
