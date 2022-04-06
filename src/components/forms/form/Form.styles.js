import styled from 'styled-components';

export const FormContainer = styled.div`
    max-width:1250px;
    width:100%;
    margin:auto;
    padding: 0 1rem 2rem;
`;

export const FormBanner = styled.header`
    background:var(--darkerSecondary);
    margin-top:2.5rem;
    text-align:center;
    padding: 2rem 1rem;
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 43px 43px 13px 13px;
    h1{
        font-size: clamp(1.4rem, 3vw, 2.35rem);
        font-weight:500;
        color:var(--colorWhite);
    }
`;

export const FormMain = styled.main`
    margin-top:1.3rem;
    text-align:center;
`;

export const FormSubmit = styled.button`
    border:none;
    background:var(--darkerSecondary);
    padding:.7rem 1.75rem;
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    margin-top:3.5rem;
    cursor:pointer;
    position:relative;
    p{
        font-size:1.1rem;
        font-weight:500;
        color:var(--colorWhite);
        ${({isSubmitting}) => isSubmitting && `visibility: hidden`};
    }
    svg{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        fill:var(--colorWhite);
        display:none;
        ${({isSubmitting}) => isSubmitting && `display:block`}; 
    }
`;

export const QuestionsList = styled.ul`
    display:grid;
    gap:2.3rem;
    max-width:750px;
    width:100%;
    margin:auto;
    list-style:none;
`;

export const QuestionContainer = styled.li`
    box-shadow: 0px 3px 6px #00000066;
    border-radius:13px;
    ${({error}) => error ? 'border: 2px solid #DB382C;' : 'border: 1px solid var(--darkerSecondary);'}
    background:var(--colorWhite);
    text-align:start;
    padding: 1.8rem 1rem 1.4rem;
`;

export const QuestionWrapper = styled.div`
    max-width:530px;
    margin:auto;
    h2{
        color:var(--darkerSecondary);
        font-weight:800;
        font-size:1rem;
        margin-bottom:2.3rem;
        position:relative;
        word-break:break-word;
        &::before{
            content:'';
            position:absolute;
            height:1px;
            width:100%;
            background:#676767;
            left:50%;
            transform:translateX(-50%);
            bottom:-1.3rem;
            @media(min-width:600px){
                width:105%;
            }
            @media(min-width:700px){
                width:115%;
            }
        }
    }
    ul{
        list-style:none;
    }
`;

export const FileContainer = styled.div`
    overflow:hidden;
    text-align:center;
    outline-offset:-1px;
    box-shadow: 0px 3px 6px #0000004F;
    margin-bottom:1.3rem;
    max-width:100%;
    ${({type}) => type && type.startsWith('audio') ? `
        border-radius:35px;
        outline:3px solid var(--darkerSecondary);
        width:100%;
    ` : `
        border-radius:13px;
        outline:2px solid var(--darkerSecondary);
        width:fit-content;
    `}
    img{
        display:block;
        width:max-content;
        max-width:100%;
        height:auto;
        object-fit:contain;
        object-position:center center;
        cursor:pointer;
    }
    video{
        display:block;
        width:100%;
        height:auto;
        aspect-ratio:16/9;
    }
    audio{
        width:100%;
        display:block;
    }
`;

export const AnswerContainer = styled.li`
    margin-top:.35rem;
    display:grid;
    grid-template-columns: max-content 1fr;
    align-items:center;
    column-gap:.8rem;
    row-gap: .2rem;
    input[type=text]{
        grid-column: 2 / 2;
        max-width:250px;
        width:100%;
        font-size:.8rem;
        padding: .25rem .8rem;
        border-radius:13px;
        border:1px solid var(--darkerSecondary);
        outline:none;
        background:var(--colorDarkerWhite);
        color:#676767;
        transition:max-width .3s ease;
        &:focus{
            max-width:350px;
        }
    }
    input[type=checkbox], input[type=radio]{
        width:1rem;
        height:1rem;
        appearance:none;
        position:relative;
        cursor:pointer;
        overflow:hidden;
        border:2px solid var(--darkerSecondary);
        display:flex;
        justify-content:center;
        align-items:center;
        padding:2px;
        border-radius:1px;
        &:checked::before{
            background:var(--darkerSecondary);
            content:'';
            width:100%;
            height:100%;
            border-radius:1px;
        }
    }
    input[type=radio]{
        border-radius:50%;
        &:checked::before{
            border-radius:50%;
        }
    }
    input[type=checkbox]:checked+label, input[type=radio]:checked+label{
        font-weight:500;
    }
    label{
        color:#676767;
        font-weight:400;
        font-size:.9rem;
        word-break:break-word;
    }
`;

export const InputFieldLabel = styled.label`
    font-weight:400;
    font-size:.9rem;
    color:#676767;
    margin-top:.7rem;
    display:block;
    input{
        display:block;
        max-width:250px;
        width:100%;
        transition:max-width .3s ease;
        font-size:.75rem;
        background: #eaf4f5;
        border: none;
        border-bottom: 1px solid var(--darkerSecondary);
        outline:none;
        padding: .25rem .5rem;
        border-radius:3px 3px 0px 0px;
        color:#676767;
        margin-top:.2rem;
        &:focus{
            max-width:350px;
        }
    }
`;