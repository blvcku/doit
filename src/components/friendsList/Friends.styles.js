import styled from "styled-components";

export const Container = styled.div`
    margin: 20px;
    @media(min-width:900px){
        margin: 80px 30px 20px 0;
    }
`;

export const Wrapper = styled.div`
    max-width:1250px;
    width:100%;
`;

export const Nav = styled.nav`
    display:grid;
    grid-template-columns: 1fr;
    gap:10px;
    @media(min-width:400px){
        grid-template-columns: 1fr 1fr;
        gap:15px;
    }
    @media(min-width:1300px){
        grid-template-columns: 2fr 1fr 1fr;
    }
    a{
        padding:25px 0 18px;
        box-shadow: 0px 3px 6px #00000029;
        text-align:center;
        border-radius:13px;
        border:2px solid var(--colorSecondary);
        text-decoration:none;
        color: var(--colorSecondary);
        font-weight:500;
        svg{
            width:30px;
            height:30px;
            fill: var(--colorSecondary);
        }
    }
    form{
        box-shadow: 0px 3px 6px #00000066;
        background:var(--colorSecondary);
        display:flex;
        justify-content:center;
        align-items:center;
        padding: 40px 20px;
        gap:5px;
        border-radius: 30px 30px 13px 13px;
        button{
            padding:5px;
            background:none;
            border:none;
            cursor:pointer;
            img{
                display:block;
            }
        }
        input{
            width:100%;
            font-size:.7rem;
            border-radius:20px;
            border:none;
            background:var(--colorDarkerWhite);
            padding: 7px 0px 7px 20px;
            outline:none;
            color: #676767;
        }
        @media(min-width:300px){
            padding: 40px 50px;
        }
        @media(min-width:400px){
            grid-column: span 2;
        }
        @media(min-width:500px){
            padding:40px 100px;
        }
        @media(min-width:1300px){
            border-radius: 43px 13px 13px 13px;
            grid-column: auto;
        }
    }
`;

export const Section = styled.section`
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    background:var(--colorWhite);
    margin-top:15px;
    padding:15px 25px;
    @media(min-width:1300px){
        margin-top:30px;
        padding: 40px 90px;
    }

    h2{
        color: var(--colorSecondary);
        font-size:1.1rem;
    }
`;

export const OverflowContainer = styled.div`
    overflow:hidden;
    margin-top:25px;
    width:100%;
`;

export const FlexContainer = styled.div`
    display:flex;
    width:100%;
`;

export const GridContainer = styled.ul`
    flex-shrink:0;
    display:grid;
    width:100%;
    list-style:none;
    grid-template-columns: 1fr;
    row-gap:35px;
    column-gap: 18px;
    @media(min-width:500px){
        grid-template-columns: 1fr 1fr;
    }
    @media(min-width:1400px){
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

export const FriendContainer = styled.li`
    border: 2px solid var(--colorThird);
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 13px;
    background:var(--colorWhite);
    text-align:center;
    padding-top:20px;
    padding-bottom:25px;
    p{
        font-size:.9rem;
        color:#676767;
        margin-top:12px;
    }
    div{
        margin-top:30px;
    }
`;

export const ImageContainer = styled.div`
    max-width:120px;
    width:100%;
    height:auto;
    margin-top:0px!important;
    display:grid;
    position:relative;
    inset:0;
    margin:auto;
    img{
        outline: 1px solid var(--colorSecondary);
        object-fit:cover;
        height:100%;
        width:100%;
        border-radius:50%;
        grid-area: 1 / 1 / 2 / 2;
    }
    &::before{
        padding-bottom:100%;
        content:'';
        display:block;
        grid-area: 1 / 1 / 2 / 2;
    }
`;

export const SmallButton = styled.button`
    box-shadow: 0px 3px 6px #00000029;
    background:#DB382C;
    border:none;
    border-radius:12px;
    padding:4px 10px;
    cursor:pointer;
    margin-left:8px;
    img{
        width:17px;
        height:17px;
    }
`;

export const Button = styled.button`
    box-shadow: 0px 3px 6px #00000029;
`;