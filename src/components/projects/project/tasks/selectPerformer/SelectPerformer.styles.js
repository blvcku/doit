import styled from "styled-components";

export const Container = styled.div`
    position:relative;
    text-align:center;
    padding-bottom:10px;
    h2{
        font-size:1rem;
        color:var(--colorSecondary);
        font-weight:700px;
        margin-bottom:15px;
    }
`;

export const CloseButton = styled.button`
    background:none;
    border:none;
    position:absolute;
    left:-10px;
    top:-20px;
    cursor:pointer;
    padding:5px;
    img{
        width:25px;
        height:25px;
    }
    @media(min-width:670px){
        left:-20px;
    }
`;

export const Wrapper = styled.ul`
    list-style:none;
    display:grid;
    grid-template-columns: 1fr;
    max-width:500px;
    width:100%;
    margin:auto;
    inset:0;
    column-gap: 80px;
    padding:0px 5px 10px;
    max-height:300px;
    min-height:100px;
    overflow:auto;
    @media(min-width:340px){
        padding:0px 20px 10px;
    }
    @media(min-width:750px){
        grid-template-columns: 1fr 1fr;
        max-width:700px;
    }
    @media(min-width:900px){
        grid-template-columns: 1fr;
        max-width:500px;
    }
    @media(min-width:1470px){
        grid-template-columns: 1fr 1fr;
        max-width:700px;
    }
`;