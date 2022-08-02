import styled from "styled-components";

export const Container = styled.section`
    margin: 20px;
    @media(min-width:900px){
        margin: 80px 30px 20px 0;
    }
`;

export const SubContainer = styled.div`
    max-width:1250px;
    width:100%;
    display:grid;
    grid-template-columns: 1fr;
    row-gap:1rem;
    column-gap:2rem;
    grid-template-areas:
    'banner'
    'aside'
    'main';
    @media(min-width:1300px){
        grid-template-columns: 1fr 3fr;
        grid-template-areas:
        'banner banner'
        'aside main';
        row-gap:1.25rem;
        column-gap:2.5rem;
    }
`

export const Form = styled.form`
    grid-area:banner;
`;

export const BannerContainer = styled.header`
    background: ${({background}) => background ? `url(${background})` : 'var(--color-primary)'};
    background-size:cover;
    background-position: center center;
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 43px 43px 13px 13px;
    display:grid;
    overflow:hidden;
    &::before{
        background:rgba(9, 114, 140, 0.8);
        content:'';
        display:block;
        grid-area: 1 / 1 / 2 / 2;
        justify-self:stretch;
    }
`;

export const MainContainer = styled.section`
    grid-area: main;
`;

export const FlexContainer = styled.div`
    grid-area: 1 / 1 / 2 / 2;
    display:flex;
    justify-content:space-between;
    flex-direction:column;
    align-items:end;
    gap:10px;
    padding: 40px 0px 0px;
    div:nth-child(1){
        padding: 0px 25px 0px 25px;
        width:100%;
    }
    div:nth-child(2){
        padding: 0px 25px 0px 25px;
        display:flex;
        margin-bottom:1.2rem;
    }

    div:nth-child(2):empty{
        margin-bottom:2.4rem;
    }

    @media(min-width:700px){
        flex-direction:row;
        gap:40px;
        padding: 120px 0px 20px;
    }

    @media(min-width:1300px){
        div:nth-child(1){
            padding: 0px 0px 0px 100px;
        }
        div:nth-child(2){
            padding: 0px 100px 0px 0px;
        }
    }
`;

export const Title = styled.input`
    overflow-wrap: break-word;
    width:100%;
    display:block;
    background:none;
    border:none;
    color:var(--color-white);
    font-weight:700;
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    text-shadow: 0px 3px 6px #00000063;
    &:focus{
        outline:none;
    }
`;

export const Description = styled.textarea`
    text-shadow: 0px 3px 6px #00000063;
    overflow-wrap:break-word;
    resize:none;
    height:max-content;
    margin-top:10px;
    font-size: clamp(.8rem, 2vw, 1.3rem);
    width:100%;
    display:block;
    background:none;
    border:none;
    color:var(--color-white);
    font-weight:700;
    &:focus{
        outline:none;
    }
`;

export const InputFile = styled.input`
    display:none;
`;

export const Button = styled.button`
    background:none;
    border:none;
    margin-right:6px;
    padding:7px;
    cursor:pointer;
    img{
        width:29px;
        height:29px;
    }
`;

export const Label = styled.label`
    padding:7px;
    display:block;
    cursor:pointer;
`;

export const AsideContainer = styled.aside`
    grid-area: aside;
    background:var(--color-white);
    box-shadow: 0px 3px 6px #00000066;
    padding: 1.9rem 1rem;
    border-radius:13px;
    display:grid;
    grid-template-columns:1fr;
    gap:1rem;
    align-items:center;
    height:max-content;
    @media(min-width:370px){
        grid-template-columns:1fr 1fr;
    }
    @media(min-width:1300px){
        padding:0 .4rem;
        grid-template-columns:1fr;
        gap:4.3rem;
        min-height:26.5rem;
    }
`;

export const DateContainer = styled.div`
    text-align:center;
    color:var(--color-primary-dark);
    width:100%;
    h2{
        margin-top:2px;
    }
    p{
        margin-top:4px;
    }
    input{
        margin-top:4px;
    }
    @media(min-width:1300px){
        margin-top:60px;
    }
`;

export const ButtonsContainer = styled.div`
    justify-self:center;
    display:grid;
    grid-template-columns:1fr;
    align-items:center;
    gap:1rem;
    width:100%;
    max-width:9rem;
    text-align:center;
    @media(min-width:1300px){
        margin-bottom:160px;
    }
    button, a{
        box-shadow: 0px 3px 6px #00000029;
        border-radius:13px;
        background:#0E8E8C;
        border:none;
        color:var(--color-white);
        padding:.4rem 0;
        font-size:.65rem;
        width:100%;
        display:flex;
        align-items:center;
        justify-content:center;
        transition:transform .2s ease;
        cursor:pointer;
        text-transform:uppercase;
        font-weight:500;
        gap:.3rem;
        &:active{
            transform:scale(0.97);
        }
        img{
            width:.8rem;
            height:auto;
            display:block;
        }
        &:disabled{
            opacity:0.7;
        }
    }
`;