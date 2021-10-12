import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    display:flex;
    justify-content:center;
    align-items:center;
`;

export const Wrapper = styled.div`
    display:block;
    margin:30px 10px;
    width:100%;

    @media (min-width:920px){
        display:flex;
        margin:100px 300px;
    }
`;

export const ASide = styled.aside`
    width:100%;
    padding:1.5rem;
    background-color: var(--colorBlue);
    color: var(--colorWhite);
    h3{
        font-size: var(--fontMed);
        margin-top:15px;
    }

    @media (min-width:920px){
        width:max-content;
        padding:4rem;
    }
`;

export const Form = styled.form`
    display:flex;
    flex-direction:column;
    padding:1.5rem;
    border: 2px solid var(--colorBlue);
    flex-grow:2;

    @media (min-width:920px){
        min-width:500px;
        padding:4rem;
    }
`;

export const HeadingWrapper = styled.div`
    margin:0 0 20px;
    h1{
        margin-bottom: 15px;
    }
    h3{
        margin-bottom: 50px;
    }
`;

export const SubmitButton = styled.input`
    background-color: var(--colorBlue);
    border:none;
    padding:10px 60px;
    color: var(--colorWhite);
    margin-top:30px;
    margin-bottom:60px;
    border-radius:10px;
    cursor: pointer;
    width:max-content;
    align-self:center;

    &:disabled{
        background-color: var(--colorLightBlue);
    }

    @media (min-width:920px){
        align-self:start;
    }
`;

export const SecondLink = styled.h3`
    font-size: var(--fontSmall);
    margin-top:10px;
`;