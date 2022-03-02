import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root{
        --colorWhite: #F3FEFF;
        --colorDarkerWhite: #E4F3F5;
        --colorMain: #23ACA8;
        --colorSecondary: #09728C;
        --darkerSecondary: #155883;
        --colorThird: #0e8e8c;
    }
    *{
        box-sizing: border-box;
        font-family: 'Rubik', sans-serif;
        font-weight: 400;
        margin: 0;
        padding: 0;
    }
    body{
        max-width:1920px;
        margin:auto;
        inset:0;
        background-color: var(--colorDarkerWhite);
        h1,h2{
            font-weight: 700;
        }
        b{
            font-weight:700;
        }
        img{
            font-size:.7rem;
        }
        a{
            text-decoration:none;
        }
    }
    html{
        font-size:16px;
    }

    .active{
        background: #70cfca;
    }
    .activeFriends svg{
        fill:var(--colorWhite)!important;
    }
    .activeFriends{
        color:var(--colorWhite)!important;
        background: var(--colorSecondary)!important;
    }
    .activeForm{
        background: var(--darkerSecondary)!important;
    }
    .activeForm p{
        color:var(--colorWhite)!important;
    }
    .activeForm svg{
        fill:var(--colorWhite)!important;
    }
    .activePosts{
        background:var(--colorSecondary)!important;
    }
    .activePosts svg{
        fill:var(--colorWhite)!important;
    }
    .activePosts p{
        color:var(--colorWhite)!important;
    }
    
    @media (min-width: 600px){
        html{
            font-size:17px
        }
    }
    @media (min-width: 768px){
        html{
            font-size:18px
        }
    }
    @media (min-width: 992px){
        html{
            font-size:19px
        }
    }
    @media (min-width: 1200px){
        html{
            font-size:20px
        }
    }
`;

export default GlobalStyle;