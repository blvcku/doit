import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display:flex;
    justify-content:center;
    align-items:center;
`;

export const Form = styled.form`
    display:flex;
    flex-direction:column;
    padding:30px;
    border: 1px solid var(--colorBlue);
    max-width:500px;
    width:100%;
    margin: 0 10px;
`;

export const HeadingWrapper = styled.div`
    margin:0 0 20px;
    text-align:center;
`;

export const SubmitButton = styled.input`
    background-color: var(--colorBlue);
    border:none;
    padding:10px 50px;
    color: var(--colorWhite);
    margin-top:20px;
    border-radius:15px;
    cursor: pointer;
    width:max-content;
    align-self:center;
`;

export const SecondLink = styled.h3`
    align-self:center;
    font-size: var(--fontSmall);
`;