import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { StyledButton } from './Profile.styles';

const Button = (props) => (
    <StyledButton {...props}>
        {props.children}
        {props.icon ? (
            <span>
                <FontAwesomeIcon size='1x' icon={props.icon} />
            </span>
        ) : null}
    </StyledButton>
)

export default Button;