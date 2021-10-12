import React from 'react';

import { InputWrapper, Input, Label } from './InputField.styles';

const InputField = React.forwardRef((props, ref) => (
    <InputWrapper>
        <Input ref={ref} {...props} />
        <Label>{props.placeholder}</Label>
    </InputWrapper>
));

export default InputField;