import styled from "styled-components";
import backgroundImage from '../../images/background.png';

export const Container = styled.main`
    width:100%;
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background-image: url(${backgroundImage});
    background-size: cover;
    padding:1rem;
`;

export const Wrapper = styled.div`
    box-shadow: 0px 3px 6px #00000040;
    background:var(--colorWhite);
    opacity:0.9;
    padding:110px 30px 60px;
    max-width:600px;
    width:100%;
    border-radius:15px;
    margin: 50px 0;

    @media(min-width:600px){
        padding:110px 80px 60px;
    }

    h1{
        font-weight:500;
        color: var(--colorSecondary);
        font-size:2rem;
        text-align:center;
    }
`;

export const Form = styled.form`
    display:flex;
    flex-direction:column;
    position:relative;
    label{
        margin-top:70px;
        color: var(--colorSecondary);
        font-weight:700;
        font-size:1rem;
    }
    input{
        width:100%;
        color: var(--colorSecondary);
        border:2px solid var(--colorSecondary);
        border-radius:10px;
        padding: 16px 22px;
        font-size:1rem;
        margin-top:10px;

        &::placeholder{
            color: var(--colorSecondary);
        }

        &:focus{
            outline:none;
        }
    }
`;

export const Paragraph = styled.p`
    font-size:.8rem;
    margin-top:30px;
    color: var(--colorSecondary);
    a{
        color: var(--colorSecondary);
        font-weight:700;
        text-decoration:none;
    }
`;

export const SubmitButton = styled.button`
    width:max-content;
    align-self:center;
    margin-top:30px;
    font-size:1rem;
    padding: 10px 35px;
    font-weight:700;
    background:${({loading}) => loading ? 'var(--colorMain)' : 'var(--colorSecondary)'};
    border:none;
    color:var(--colorWhite);
    border-radius:10px;
    transition: transform .3s ease;
    cursor:pointer;

    &:active{
        transform:scale(0.95);
    }

`;

export const SignUpForm = styled(Form)`
    label{
        margin-top:30px;
        color: var(--colorSecondary);
        font-weight:700;
        font-size:1rem;
    }
`;

export const SuccessMessage = styled.div`
    font-size: .7rem;
    color: #018c5c;
    margin-top:5px;
    position:absolute;
    width:100%;
    bottom: -2rem;
    text-align:center;
    @media (min-width:330px){
        bottom:-1.3rem;
    }
`;