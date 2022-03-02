import { useState, useEffect } from 'react';
import ArrowIcon from '../../../images/arrowwhite.svg';
import { db } from '../../../firebase';

import { QuestionContainer, QuestionWrapper, AnswersContainer, ExpandButton, OtherAnswersContainer } from "./FormPanel.styles";
import Answer from "./Answer";

const Question = ({title, formID, id, answers, inputField}) => {

    const [expanded, setExpanded] = useState(false);
    const [usersAnswers, setUsersAnswers] = useState({});
    const [inputAnswers, setInputAnswers] = useState([]);
    const [answersSum, setAnswersSum] = useState(0);

    const handleToggleExpanded = e => {
        e.preventDefault();
        setExpanded(prev => !prev);
    }

    useEffect(() => {
        const unsubscribe = db.collection('forms')
            .doc(formID)
            .collection('questions')
            .doc(id)
            .collection('answersSum')
            .doc('answersSum')
            .onSnapshot(answersSum => {
                const data = answersSum.data();
                setInputAnswers(data.inputs);
                setUsersAnswers(data.answersSum);
            })
        return unsubscribe;
    }, [id, formID]);

    useEffect(() => {
        let sum = 0;
        for(const [, value] of Object.entries(usersAnswers)){
            sum += value
        }
        setAnswersSum(sum);
    }, [usersAnswers]);

    return(
        <QuestionContainer>
            <QuestionWrapper>
                <h3>{title}</h3>
                <AnswersContainer>
                    {answers.map((answer, index) => (
                        <Answer answers={usersAnswers[answer]} answersSum={answersSum} key={index} index={index} answer={answer} />
                    ))}
                </AnswersContainer>
                {inputField && (
                    <>
                        <h4>Other Answers:</h4>
                        <ExpandButton onClick={handleToggleExpanded} expanded={expanded}>
                            <img src={ArrowIcon} alt='expand' />
                        </ExpandButton>
                        {expanded && (
                            <OtherAnswersContainer>
                                {inputAnswers.map((answer, index) => (
                                    <li key={index}>
                                        <p>{answer}</p>
                                    </li>
                                ))}
                            </OtherAnswersContainer>
                        )}
                    </>
                )}
            </QuestionWrapper>
        </QuestionContainer>
    )
}

export default Question;