import styled from "styled-components";

export const Container = styled.section`
    @media(min-width:900px){
        margin:85px 20px 0px 0px;
    }
    margin:25px 20px;
    @media(min-width:2100px){
        & > div{
            max-width:1250px;
        }
    }
`;

export const FormsContainer = styled.ul`
    display:grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 250px));
    justify-content:center;
    list-style:none;
    margin-top:15px;
    margin-bottom:40px;
    margin-left:20px;
    margin-right:20px;
    gap:60px;
    @media(min-width:500px){
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
    @media(min-width:900px){
        justify-content:start;
        margin-left:10px;
        margin-top:30px;
        gap:100px;
    }
    @media(min-width:1020px){
        grid-template-columns: repeat(auto-fill, minmax(220px, 250px));
    }
    @media(min-width:1330px){
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    }
`;

export const Form = styled.li`
    background: var(--color-primary-dark);
    box-shadow: 2px 3px 6px #00403F82;
    border-radius:30px;
    display:grid;
    overflow:hidden;
    height:max-content;
    position:relative;

    &::before{
        content:'';
        display:block;
        padding-bottom:100%;
        grid-area: 1 / 1 / 2 / 2;
    }
    a{
        grid-area: 1 / 1 / 2 / 2;
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        text-decoration:none;
        border-radius:30px;
        &:focus-visible{
            outline-offset:-3px;
            outline:2px solid black;
        }
    }
    p{
        color:var(--color-white);
        font-weight:400;
        text-overflow: ellipsis;
        word-break:break-word;
        padding:0px 10px;
        text-align:center;
        text-shadow: 0px 3px 6px #00000063;
        margin-top:5px;
        font-size:.85rem;
    }
    p:nth-child(1){
        font-weight:700;
        margin:0;
        font-size:1rem;
    }
    img{
        max-width:3.5rem;
        width:100%;
        height:auto;
        aspect-ratio: 1/1;
        margin-bottom:1.1rem;
    }
    div{
        position:absolute;
        bottom:.8rem;
    }
`;

export const CreateForm = styled(Form)`
    p{
        margin-top:10px;
        color:var(--color-white);
        font-weight:700;
        font-size:1rem;
    }
    img{
        margin:0;
    }
`;

export const SearchBar = styled.form`
    background: var(--color-primary-dark);
    max-width:450px;
    width:100%;
    box-shadow: 0px 3px 6px #00000033;
    border-radius:25px;
    display:flex;
    gap:8px;
    padding: 14px 18px;
    input{
        width:100%;
        max-width:300px;
        font-size:.7rem;
        border-radius:20px;
        border:none;
        background:var(--color-white-dark);
        padding: 7px 0px 7px 20px;
        color: #676767;
    }
    input:focus{
        outline:none;
    }
`;
