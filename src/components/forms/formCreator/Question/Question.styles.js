import styled from "styled-components";

export const QuestionContainer = styled.li`
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    background: var(--colorWhite);
    display:grid;
    grid-template-columns: 1fr;
    padding: 1rem 2rem;
    column-gap: 5rem;
    row-gap:1.5rem;
    align-items:start;
    ${({error}) => error && 'border: 1px solid #DB382C;'}
    @media(min-width:360px){
        padding: 1.5rem 2.5rem;
    }
    @media(min-width:960px){
        padding: 2.5rem 4rem;
    }
    @media(min-width:1350px){
        grid-template-columns: 2fr 1fr;
        grid-template-rows: 3.5rem 2rem 1fr;
    }
    margin-bottom:2.5rem;
`;

export const ButtonsContainer = styled.div`
    display:grid;
    grid-template-columns:1fr;
    margin:auto;
    gap:.7rem;
    width:max-content;
    button{
        width:max-content;
        font-weight:500;
        color:var(--colorWhite);
        box-shadow: 0px 3px 6px #0000004F;
        border-radius: 13px;
        border:none;
        background:var(--darkerSecondary);
        font-size:.6rem;
        display:flex;
        align-items:center;
        gap:.3rem;
        padding: .45rem 1.25rem;
        cursor:pointer;
        margin:auto;
        img{
            width:.9rem;
            height:.9rem;
        }
        transition: transform .3s ease;
        &:active{
            transform:scale(0.95);
        }
    }
    label{
        font-weight:500;
        cursor:pointer;
    }
    input{
        width:.9rem;
        height:.9rem;
        appearance:none;
        pointer-events:none;
        position:relative;
        cursor:pointer;
        overflow:hidden;
        border:2px solid var(--colorWhite);
        &::before{
            box-shadow: inset 1em 1em var(--colorWhite);
            content:'';
            position:absolute;
            width:75%;
            height:75%;
            left:.08rem;
            top:.09rem;
            clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        }
        &::after{
            width:100%;
            height:100%;
            content:'';
            position:absolute;
            left:0;
            top:0;
            transition:transform .2s ease;
            background:var(--darkerSecondary);
        }
        &:checked::after{
            transform:translateX(100%);
        }
    }
    @media(min-width:350px){
        grid-template-columns:1fr 1fr;
        button:nth-child(3){
            grid-column: span 2;
            justify-self:center;
        }
    }
    @media(min-width:520px){
        display:flex;
    }
`;

export const QuestionLabel = styled.label`
    color:var(--darkerSecondary);
    font-weight:800;
    div{
        position:relative;
    }
    input{
        display:block;
        box-shadow: 0px 3px 6px #00000029;
        border-radius:13px;
        border: 1px solid var(--darkerSecondary);
        width:100%;
        font-size: .8rem;
        font-weight:500;
        padding: .5rem 2.4rem .5rem 1rem;
        margin-top:.3rem;
        outline:none;
        color:#676767;
    }
    button{
        position:absolute;
        right:.7rem;
        top:50%;
        transform:translateY(-50%);
        background:none;
        border:none;
        cursor:pointer;
        img{
            display:block;
            width:1.2rem;
            height:1.2rem;
        }
    }
`;

export const FileContainer = styled.div`
    grid-row: span 3;
    order:1;
    label{
        cursor:pointer;
        background:var(--darkerSecondary);
        color:var(--colorWhite);
        font-weight:500;
        display:flex;
        align-items:center;
        width:max-content;
        padding: .5rem 1.9rem;
        gap: .4rem;
        border-radius:13px;
        margin:auto;
        box-shadow: 0px 3px 6px #0000004F;
        input{
            display:none;
        }
        img{
            width:1.3rem;
            height:1.3rem;
        }
        transition: transform .3s ease;
        &:active{
            transform:scale(0.95);
        }
    }
    div{
        max-width:250px;
        margin:auto;
        margin-top:1.3rem;
        overflow:hidden;
        outline-offset:-1px;
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
            max-width:100%;
            height:auto;
            object-fit:contain;
            object-position:center center;
            cursor:pointer;
            max-height:200px;
        }
        video{
            display:block;
            width:100%;
            height:auto;
            max-height:200px;
        }
        audio{
            width:100%;
            display:block;
        }
    }
    @media(min-width:1350px){
        order:0;
    }
`;

export const AnswersContainer = styled.ul`
    list-style:none;
    @media(min-width:520px){
        grid-template-columns:1fr 1fr;
        display:grid;
        column-gap:1.3rem;
    }
    &:empty{
        height:4rem;
        position:relative;
        &::before{
            content:'Add Answer';
            color:#676767;
            position:absolute;
            font-weight:400;
            font-size:.8rem;
            top:50%;
            left:50%;
            transform:translate(-50%, -50%);
        }
    }
`;

export const Answer = styled.li`
    margin-bottom:15px;
    position:relative;
    display:flex;
    align-items:center;
    gap:5px;
    input{
        border-radius:10px;
        border: 1px solid #707070;
        font-size:.9rem;
        padding: .3rem 2rem .3rem .7rem;
        outline:none;
        color:#676767;
        width:100%;
        background: var(--colorWhite);
    }
    button{
        position:absolute;
        right:10px;
        top:50%;
        transform:translateY(-50%);
        background:none;
        border:none;
        cursor:pointer;
        img{
            display:block;
            width:1rem;
            height:1rem;
        }
    }
    div{
        color:var(--colorWhite);
        background:var(--darkerSecondary);
        max-width:1.1rem;
        width:100%;
        height:1.1rem;
        box-sizing:content-box;
        border-radius:50%;
        font-size:.6rem;
        display:grid;
        place-items:center;
    }
`;