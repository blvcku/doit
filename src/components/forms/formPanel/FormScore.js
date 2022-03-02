import { useState, useLayoutEffect } from 'react';

import { FormScoreContainer } from './FormPanel.styles';

const FormScore = ({number = 0, text = ''}) => {

    const [fontSize, setFontSize] = useState(0);

    useLayoutEffect(() => {
        const { length } = number.toString();
        if(length > 2){
            const calculatedFontSize = (length - 2) * 0.25;
            setFontSize(calculatedFontSize);
        }
    }, [number])

    return(
        <FormScoreContainer fontSize={fontSize}>
            <div>{number}</div>
            <p>{text}</p>
        </FormScoreContainer>
    )
}

export default FormScore;