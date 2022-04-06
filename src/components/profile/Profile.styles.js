import styled from "styled-components";

export const Container = styled.section`
    margin: 20px 20px 20px 20px;
    @media(min-width:900px){
        margin: 80px 30px 20px 0;
    }
`;

export const GridContainer = styled.div`
    display:grid;
    gap:30px;
    @media(min-width:1300px){
        max-width:1250px;
        width:100%;
        grid-template-columns: 5fr 4fr;
        grid-template-rows: 260px 90px 380px;
    }
    form:nth-child(2){
        @media(min-width:1300px){
            grid-row: span 2;
        }
    }
    form:nth-child(3){
        order:-1;
        @media(min-width:1300px){
            grid-row: span 2;
            order: 0;
        }
    }
    aside{
        order:-1;
    }
`;

export const Aside = styled.aside`
    background: var(--colorSecondary);
    border-radius: 43px 43px 13px 13px;
    box-shadow: 0px 3px 6px #00000066;
    display:grid;
    place-items:center;
    text-align:center;
    img{
        width:45px;
        height:45px;
        @media(min-width:360px){
            width:60px;
            height:60px;
        }
    }
    h1{
        color: var(--colorWhite);
        font-size:1.6rem;
        @media(min-width:360px){
            font-size:2rem;
        }
    }
    @media(max-width:1300px){
        padding: 60px 0;
    }
`;

export const Form = styled.form`
    background: var(--colorWhite);
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    text-align:center;
    padding:45px 0px;
    position:relative;
    overflow:hidden;
    h3{
        color: var(--colorSecondary);
        font-size:1.2rem;
        font-weight:700;
        padding: 0px 15px;
        @media(min-width:360px){
            font-size:1.4rem;
        }
    }
`;

export const InputsWrapper = styled.div`
    position:relative;
    display:grid;
    grid-template-columns: 1fr;
    max-width: 430px;
    width:100%;
    margin:auto;
    margin-top:30px;
    padding: 0px 15px;
    inset:0;
    text-align:start;
    row-gap:7px;
    align-items:center;
    label{
        font-weight:500;
        color:var(--colorSecondary);
        font-size:1.1rem;
        margin-top:10px;
        @media(min-width:400px){
            margin-top:0px;
        }
    }
    input{
        font-size:.8rem;
        border:none;
        padding: 8px 15px;
        border-radius:13px;
        background: #D1F8FD;
        font-weight:500;
        outline:none;
        color: #676767;
    }
    @media(min-width:290px){
        padding: 0px 30px;
    }
    @media(min-width:400px){
        grid-template-columns: 120px 1fr;
        row-gap:40px;
        margin-top:60px;
    }
`;

export const ButtonsContainer = styled.div`
    max-width:220px;
    margin:auto;
    margin-top:25px;
    padding:0 1rem;
    button:nth-child(2){
        margin-top:15px;
    }
    button{
        display:block;
        width:100%;
        margin-top:0px;
        padding: 9px 0px;
    }
`;

export const Button = styled.button`
    background: #0E8E8C;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 12px;
    font-size:.7rem;
    color: var(--colorWhite);
    border:none;
    padding: 9px 50px;
    margin-top:35px;
    cursor:pointer;
    font-weight:400;
    @media(min-width:400px){
        margin-top:50px;
    }
    transition: transform .3s ease;
    &:active{
        transform:scale(0.95);
    }
`;

export const SuccesMessage = styled.p`
    position:absolute;
    left:50%;
    bottom:-30px;
    transform:translateX(-50%);
    font-size: .7rem;
    color: #018c5c;
    width:100%;
    padding: 0 5px;
    text-align:center;
    @media(min-width:400px){
        bottom:-40px;
    }
`;

export const Figure = styled.figure`
    margin-top:20px;
    img{
        object-fit:cover;
        width:150px;
        height:150px;
        aspect-ratio: 1/1;
        outline: 2px solid var(--colorSecondary);
        border-radius:50%;
        @media(min-width:400px){
            width:200px;
            height:200px;
        }
    }
    figcaption{
        font-size:1.1rem;
        font-weight:700;
        color: var(--colorSecondary);
        margin-top:6px;
        word-break:break-word;
        @media(min-width:310px){
            font-size:1.35rem;
        }
        @media(min-width:400px){
            font-size:1.9rem;
        }
        @media(min-width:1500px){
            font-size:2.1rem;
        }
        padding: 0px 10px;
    }
`;

export const Label = styled.label`
    font-size: .9rem;
    font-weight:500;
    text-decoration: underline;
    color: var(--colorSecondary);
    cursor:pointer;
    display:block;
    margin-top:3px;
`;