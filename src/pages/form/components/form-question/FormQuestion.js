import { useEffect } from 'react';
import useFileType from '../../../../hooks/useFileType';
import {
    FormQuestionContainer,
    FormQuestionWrapper,
    FormQuestionFileContainer,
    FormQuestionAnswerContainer,
    FormQuestionHeading,
    FormQuestionAnswersContainer,
    FormQuestionTextAnswerLabel,
    FormQuestionInput,
    FormQuestionAnswerLabel,
} from './FormQuestion.styles';

const FormQuestion = ({
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

    const answerInputType = multipleAnswers ? 'checkbox' : 'radio';

    return (
        <FormQuestionContainer error={error === index}>
            <FormQuestionWrapper>
                <FormQuestionHeading>{title}</FormQuestionHeading>
                {file && file.url && (
                    <FormQuestionFileContainer type={file && file.type}>
                        {FileElement}
                    </FormQuestionFileContainer>
                )}
                <FormQuestionAnswersContainer>
                    {answers.map((answer, answerIndex) => (
                        <FormQuestionAnswerContainer key={answerIndex}>
                            <FormQuestionInput
                                type={answerInputType}
                                name={`answer${index}`}
                                value={answer}
                            />
                            <FormQuestionAnswerLabel htmlFor="answer">
                                {answer}
                            </FormQuestionAnswerLabel>
                        </FormQuestionAnswerContainer>
                    ))}
                </FormQuestionAnswersContainer>
                {inputField && (
                    <FormQuestionTextAnswerLabel>
                        Other:
                        <FormQuestionInput
                            maxLength="400"
                            type="text"
                            name={`answer${index}input`}
                            placeholder="Write your answer..."
                        />
                    </FormQuestionTextAnswerLabel>
                )}
            </FormQuestionWrapper>
        </FormQuestionContainer>
    );
};

export default FormQuestion;
