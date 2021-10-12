import styled from "styled-components";

export const InputWrapper = styled.div`
    margin: 1.5rem 0;
    position: relative;
`;

export const Input = styled.input`
    border:none;
    border-bottom: 1px solid black;
    max-width:450px;
    width:100%;

    &::placeholder{
        color: transparent;
    }

    &:focus{
        outline:none;
    }
`;

export const Label = styled.label`
    transition: .2s ease;
    transform: translateY(0);
    display:block;
    position:absolute;
    top: 0;
    color: var(--colorMuted);
    pointer-events:none;

    ${Input}:focus + &, ${Input}:not(:placeholder-shown) + &{
        transform: translateY(-100%);
        font-size: var(--fontSmall);
    }
`;