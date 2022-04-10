import styled from 'styled-components';

export const Container = styled.section`
    @media(min-width:900px){
        margin:85px 20px 2rem 0px;
    }
    margin:20px;
`;

export const Wrapper = styled.div`
    max-width:1250px;
    width:100%;
    @media(min-width:520px){
        display:grid;
        grid-template-columns: 3fr 1.2fr;
        column-gap:2rem;
        row-gap:1.5rem;
    }
`;

export const Header = styled.header`
    background:var(--darkerSecondary);
    box-shadow: 0px 3px 6px #00000066;
    border-radius:30px 30px 13px 13px;
    padding:35px 5px;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow:hidden;
    margin-bottom:1rem;
    h2{
        font-size: clamp(1.4rem, 3vw, 2.35rem);
        font-weight:500;
        text-align:center;
        color:var(--colorWhite);
        width:100%;
        padding: 0 10px;
        max-width:90%;
        white-space: nowrap;
        overflow:hidden;
        border:none;
    }
    @media(min-width:520px){
        border-radius: 43px 13px 13px 13px;
        margin-bottom: 0;
        padding:24px 5px;
    }
`;

export const DeleteFormButton = styled.button`
    order:3;
    grid-column: span 2;
    background: #DB382C;
    box-shadow: 0px 3px 6px #00000029;
    font-size:.8rem;
    border:none;
    border-radius:13px;
    color:var(--colorWhite);
    cursor:pointer;
    width:fit-content;
    height:fit-content;
    padding: .4rem 2rem;
    margin:auto;
    @media(min-width:520px){
        grid-column: 4;
        margin:0;
        transform:translateY(-20%);
    }
    &:disabled{
        opacity:0.7;
    }
`;

export const PauseButton = styled.button`
    text-align:center;
    border:2px solid var(--darkerSecondary);
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    text-transform:capitalize;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    gap:5px;
    margin-bottom: 1rem;
    padding: 1.3rem;
    cursor:pointer;
    width:100%;
    background:${({isPaused}) => isPaused ? 'var(--darkerSecondary)' : 'var(--colorWhite)'};
    p{
        font-size:1rem;
        color:${({isPaused}) => isPaused ? 'var(--colorWhite)' : 'var(--darkerSecondary)'};
        font-weight:400;
    }
    img{
        width:30px;
        height:30px;
    }
    @media(min-width:520px){
        margin-bottom:0;
        padding:0;
    }
`;

export const FormInfoContainer = styled.div`
    grid-column: span 2;
    background:var(--colorWhite);
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
`;

export const FormInfoWrapper = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr;
    max-width:960px;
    margin:auto;
    padding:1rem;
    gap:1rem;
    @media(min-width:520px){
        grid-template-rows: .5fr 1fr .3fr;
        padding:2rem 1rem;
    }
    @media(min-width:640px){
        grid-template-columns: repeat(4, 1fr);
        gap:2rem;
    }
    @media(min-width:900px){
        grid-template-columns: 1fr 1fr;
    }
    @media(min-width:1100px){
        grid-template-columns: repeat(4, 1fr);
    }
`;

export const FormInfoFirst = styled.div`
    grid-column:span 2;
    h3{
        font-weight:800;
        color:var(--darkerSecondary);
    }
    @media(min-width:520px){
        grid-column: span 3;
    }
`;

export const FormInfoSecond = styled.div`
    grid-column:span 2;
    h4{
        font-weight:800;
        color:var(--darkerSecondary);
        display:inline;
        white-space:nowrap;
    }
    img{
        width:100%;
        aspect-ratio:1/1;
        display:block;
        max-width:180px;
        margin:auto;
        margin-top:1rem;
    }
    @media(min-width:520px){
        width:max-content;
        grid-row:1/3;
        grid-column:4;
        img{
            max-width:none;
            display:inline;
        }
    }
`;

export const FormScoreContainer = styled.div`
    border-radius:13px;
    border:3px solid var(--darkerSecondary);
    max-width:170px;
    align-self:start;
    justify-self:center;
    width:100%;
    text-align:center;
    padding: 1.35rem 0 1.5rem;
    order:4;
    div{
        background:var(--darkerSecondary);
        width:55%;
        aspect-ratio:1/1;
        height:auto;
        display:grid;
        place-content:center;
        border-radius:50%;
        margin:auto;
        color:var(--colorWhite);
        font-size:${({fontSize}) => `${(1.55 - fontSize).toFixed(2)}rem`};
    }
    p{
        color:var(--darkerSecondary);
        font-weight:500;
        font-size:.8rem;
        margin-top:.8rem;
    }
    @media(min-width:300px){
        div{
            font-size:${({fontSize}) => `${(1.7 - fontSize).toFixed(2)}rem`};
        }
    }
    @media(min-width:520px){
        grid-row: 2/4;
        justify-self:start;
        order:0;
    }
    @media(min-width:950px){
        div{
            font-size:${({fontSize}) => `${(1.8 - fontSize).toFixed(2)}rem`};
        }
    }
`;

export const CopyContainer = styled.div`
    display:flex;
    align-items:center;
    gap:.7rem;
    a{
        white-space:normal;
        word-break:break-all;
        text-decoration:underline;
        font-weight:500;
        color:var(--darkerSecondary);
    }
`;

export const CopyButton = styled.button`
    padding:.1rem;
    background:none;
    border:none;
    cursor:pointer;
    img{
        width:1rem;
        height:1rem;
        display:block;
        margin:auto;
    }
`;

export const QuestionsList = styled.ul`
    list-style:none;
    grid-column: span 2;
    margin-top:.5rem;
    display:flex;
    flex-direction:column;
    gap:2rem;
`;

export const QuestionContainer = styled.li`
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    background:var(--colorWhite);
`;

export const QuestionWrapper = styled.div`
    padding:1rem;
    max-width:960px;
    margin:auto;
    h3{
        color:var(--darkerSecondary);
        font-weight:800;
        font-size:1rem;
        word-break:break-word;
    }
    h4{
        color:var(--darkerSecondary);
        font-weight:500;
        font-size:.8rem;
        display:inline-block;
    }
`;

export const AnswersContainer = styled.ul`
    list-style:none;
    display:grid;
    grid-template-columns:repeat(1, 1fr);
    margin-bottom:.7rem;
    margin-top:1.2rem;
    gap:2rem;
    justify-items:center;
    @media(min-width:360px){
        grid-template-columns:repeat(2, 1fr);
    }
    @media(min-width:750px){
        grid-template-columns:repeat(4, 1fr);
    }
    @media(min-width:900px){
        grid-template-columns:repeat(2, 1fr);
    }
    @media(min-width:1100px){
        grid-template-columns:repeat(4, 1fr);
    }
    &:empty{
        margin-top:1rem;
        margin-bottom:0;
    }
`;

export const AnswerContainer = styled.li`
    display:grid;
    max-width:200px;
`;

export const ExpandButton = styled.button`
    cursor:pointer;
    vertical-align:middle;
    padding:.2rem .35rem;
    margin-left:.4rem;
    border-radius:7px;
    border:none;
    background:var(--darkerSecondary);
    ${({expanded}) => !expanded && 'transform:rotate(180deg);'}
    img{
        display:block;
        width:.65rem;
        height:.65rem;
    }
`;

export const OtherAnswersContainer = styled.ul`
    list-style:none;
    &:empty{
        position:relative;
        height:5rem;
        &::before{
            content:'No Answers';
            color:#676767;
            font-size:.75rem;
            position:absolute;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
        }
    }
    li{
        margin-top:.7rem;
        border:1px solid #676767;
        border-radius:13px;
        padding:.4rem .8rem;
        p{
            font-size:.75rem;
            color:#676767;
            word-break:break-word;
        }
    }
`;

export const AnswerHead = styled.div`
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
        float:left;
        margin-right:.5rem;
    }
    p{
        font-size:.9rem;
        color:#676767;
        word-break:break-word;
        font-weight:500;
    }
`;

export const AnswerScore = styled.div`
    border:2px solid var(--darkerSecondary);
    border-radius:13px;
    padding: 1.35rem 0 1.5rem;
    text-align:center;
    margin-top:.5rem;
    align-self:end;
    svg{
        width:55%;
        aspect-ratio:1/1;
        height:auto;
    }
    p{
        color:var(--darkerSecondary);
        font-weight:800;
    }
    p:nth-child(3){
        font-size:.7rem;
        font-weight:500;
        margin-top:.15rem;
    }
`;
