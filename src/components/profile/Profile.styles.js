import styled from "styled-components";

export const Container = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
`;

export const Wrapper = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
    max-width:1280px;
    width:100%;
    background-color:white;
    box-shadow: 
    0 14px 28px rgba(0,0,0,0.25), 
	0 10px 10px rgba(0,0,0,0.22);
`;

export const Heading = styled.h1`
    margin: 20px 0;
    align-self:center;
`;

export const Form = styled.form`
    padding: 20px;
    max-width:900px;
    width:100%;
    margin-bottom: 40px;
    position:relative;
`;

export const SubHeading = styled.h2`
    color: ${({isEditing}) => isEditing ? '' : 'var(--colorMuted)'};
    margin-bottom:60px;
    position:relative;
    overflow:hidden;
    transition: color 1s ease;

    &::before{
        content: '';
        position:absolute;
        width:${({children}) => children.length+1}ch;
        bottom: -1px;
        left:0;
        height: 2px;
        background-color: black;
        transition: transform .8s ease;
        transform: ${({isEditing}) => isEditing ? 'translateX(0)' : 'translateX(-100%)'};
`

export const EditGroup = styled.div`
    display:flex;
    flex-direction:column;
    gap:30px;
    width:100%;
    padding: 0 40px;
    justify-content:space-between;
    align-items:center;
    
    @media (min-width:830px){
        flex-direction:row;
    }
`

export const PictureWrapper = styled.div`
    max-width:140px;
    width:100%;
    height:140px;

    img{
        height:100%;
        width:140px;
        border-radius:50%;
        outline:3px solid var(--colorMuted);
        outline-offset:-1px;
        overflow:hidden;
    }

    @media (min-width:270px){
        max-width:150px;
        height:150px;

        img{
            width:150px;
        }
    }

    @media (min-width:330px){
        max-width:200px;
        height:200px;

        img{
            width:200px;
        }
    }
`;

export const StyledButton = styled.button`
    width: max-content;
    font-size: var(--fontMed);
    background-color: var(--colorBlue);
    border:none;
    color: var(--colorWhite);
    font-weight: 400;
    padding: 10px 20px;
    cursor: pointer;
    border-radius:10px;

    &:disabled{
        background-color: var(--colorLightBlue);
    }

    &:active{
        transform: scale(0.97);
    }

    span{
        margin-left:10px;
    }

    @media (min-width:830px){
        margin-right:200px;
    }
`;

export const LogoutButton = styled(StyledButton)`
    padding: 10px 40px;
    margin:0;
`;

export const LogoutButtonWrapper = styled.div`
    padding: 20px;
    max-width:900px;
    width:100%;
    margin-bottom: 50px;
    display:flex;
    justify-content:center;
`;

export const InputWrapper = styled.div`
    display:flex;
    flex-direction:column;
    flex-grow: 1;
    max-width:350px;
    width:100%;

    label{
        transition:color .8s ease;
        font-weight:700;
        color: ${({isEditing}) => isEditing ? 'black' : 'var(--colorMuted)'};
    }

    input{
        transition:.8s ease;
        font-size: .8rem;
        margin: 8px 0 40px;
        padding-left:5px;
        border:none;
        border-bottom: 1px solid black;
    }

    input:focus{
        outline:none;
    }

    input:disabled{
        border-color: var(--colorMuted);
        color: var(--colorMuted);
        background: transparent;
    }

    input::placeholder{
        color: var(--colorMuted);
    }
`;