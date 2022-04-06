import { useEffect, useState } from 'react';
import { AnswerContainer, AnswerHead, AnswerScore } from "./FormPanel.styles";

const Answer = ({answer, index, answersSum, answers = 0}) => {

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        if(answersSum === 0) return;
        setPercentage((answers / answersSum).toFixed(4) * 100);
    }, [answersSum, answers])

    return(
        <AnswerContainer>
            <AnswerHead>
                <div>{alphabet[index]}</div>
                <p>{answer}</p>
            </AnswerHead>
            <AnswerScore>
                <svg viewBox='0 0 40 40'>
                    <circle cx='20' cy='20' r='15.91549430918954' fill='var(--colorWhite)'></circle>
                    <circle cx='20' cy='20' r='15.91549430918954' fill='transparent' strokeWidth='4' stroke='var(--colorDarkerWhite)'></circle>
                    <circle cx='20' cy='20' r='15.91549430918954' fill='transparent' strokeWidth='4' strokeDashoffset='25' stroke='var(--darkerSecondary)'
                        strokeDasharray={`${percentage} ${100 - percentage}`}
                    ></circle>
                </svg>
                <p>{percentage.toFixed(2)}%</p>
                <p>{answers} People</p>
            </AnswerScore>
        </AnswerContainer>
    )
}

export default Answer;