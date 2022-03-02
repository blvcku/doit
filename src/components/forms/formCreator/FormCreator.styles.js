import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.section`
    @media(min-width:900px){
        margin:85px 20px 2rem 0px;
    }
    margin:20px;
`;

export const Form = styled.form`
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
    input{
        font-size: clamp(1.4rem, 3vw, 2.35rem);
        font-weight:500;
        text-align:center;
        color:var(--colorWhite);
        width:100%;
        outline:none;
        padding: 0 10px;
        max-width:90%;
        white-space: nowrap;
        overflow:hidden;
        background:none;
        border:none;
    }
    @media(min-width:520px){
        border-radius: 43px 13px 13px 13px;
        margin-bottom: 0;
        padding:24px 5px;
    }
`;

export const QuestionsListContainer = styled.ul`
    list-style:none;
`;

export const CustomNavLink = styled(NavLink)`
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
    background:var(--colorWhite);
    p{
        font-size:1rem;
        color:var(--darkerSecondary);
        font-weight:400;
    }
    svg{
        width:30px;
        height:30px;
        fill:var(--darkerSecondary);
    }
    @media(min-width:520px){
        margin-bottom:0;
        padding:0;
    }
`;

export const Section = styled.section`
    grid-column:span 2;
`;

export const ButtonsContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:3rem;
    align-items:center;
    margin-top:4rem;
`;

export const CreateButton = styled.button`
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 13px;
    background: var(--darkerSecondary);
    border:none;
    padding:12px 60px;
    cursor:pointer;
    display:block;
    width:max-content;
    position:relative;
    p{
        font-size:1rem;
        color:var(--colorWhite);
        font-weight:500;
        ${({isCreating}) => isCreating && `visibility: hidden`};
    }

    svg{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        fill:var(--colorWhite);
        display:none;
        ${({isCreating}) => isCreating && `display:block`}; 
    }
`;

export const AddQuestionButton = styled.button`
    background: var(--colorWhite);
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    border:none;
    display:flex;
    flex-direction:column;
    text-align:center;
    align-items:center;
    width:max-content;
    font-size:.8rem;
    color:var(--darkerSecondary);
    padding: 1.1rem 3rem;
    font-weight:800;
    gap:6px;
    cursor:pointer;
    img{
        width:2rem;
        height:2rem;
    }
    @media(min-width:320px){
        padding: 1.1rem 5rem;
    }
`;

export const AssignPeopleContainer = styled.div`
    box-shadow: 0px 3px 6px #00000066;
    border-radius: 13px;
    background:var(--colorWhite);
    position:relative;
    text-align:center;
    overflow:hidden;
    padding:3rem 1rem 2rem;
    h2{
        color:var(--darkerSecondary);
        text-transform:uppercase;
        font-weight:800;
        font-size: 1.3rem;
        margin-bottom:.5rem;
    }
    &::before{
        position:absolute;
        content:'';
        width:100%;
        height:100%;
        z-index:3;
        top:0;
        left:0;
        pointer-events:none;
        background:var(--colorWhite);
    }
    ${({status}) => status === 'public' ? `
        &::before{
            opacity:1;
        }
    ` : `
        &::before{
            opacity:0;
            transition:opacity .5s ease .3s;
        }
    `}
`;

export const CloseButton = styled.button`
    cursor:pointer;
    position:absolute;
    left: 1rem;
    top: .55rem;
    background:none;
    border:none;
    z-index:4;
    img{
        width:3rem;
        height:3rem;
    }
`;

export const StatusContainer = styled.div`
    transition: all .5s ease;
    z-index:4;
    position:relative;
    ${({status}) => status === 'public' ? `
    @media(min-width:320px){
        transform:translateY(10rem) scale(1.5);
    }
    transform:translateY(10rem) scale(1.3);
    ` : `

    `}
    h3{
        display: ${({status}) => status === 'public' ? 'block' : 'none'};
        font-weight:800;
        color:var(--darkerSecondary);
        text-transform:uppercase;
        margin-bottom: .3rem;
        position:absolute;
        left:50%;
        transform:translateX(-50%);
        top:-1.7rem;
    }
`;

export const StatusButton = styled.button`
    cursor:pointer;
    color: ${({selected}) => selected ? 'var(--colorWhite)' : 'var(--darkerSecondary)'};
    background:${({selected}) => selected ? 'var(--darkerSecondary)' : 'var(--colorWhite)'};
    border:1px solid var(--darkerSecondary);
    text-transform:uppercase;
    padding: .25rem 1.4rem;
    border-radius:13px;
    box-shadow: 0px 3px 6px #00000029;
    font-weight:500;
    margin: 0 .25rem;
    font-size:.6rem;
`;

export const FriendsList = styled.ul`
    display:grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 3.75rem;
    margin:auto;
    max-width:800px;
    column-gap: 2rem;
    margin-top:1rem;
    overflow:auto;
    height:24.5rem;
    padding:.1rem;
    position:relative;
    @media(min-width:520px){
        grid-template-columns: 1fr 1fr;
    }
    &:empty{
        &::before{
            content:'No friends';
            color:#676767;
            font-size:.9rem;
            position:absolute;
            left:50%;
            top:30%;
            transform:translateX(-50%);
        }
    }
`;