import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root{
        --fontSuperBig: 2.2rem;
        --fontBig: 1.5rem;
        --fontMed: 1rem;
        --fontSmall: 0.7rem;
        --colorBlue: hsl(249, 87%, 66%);
        --colorLightBlue: hsl(249, 82%, 78%);
        --colorWhite: #F3FEFF;
        --colorMuted: hsl(0, 0%, 60%);
        --colorRed: hsl(0, 89%, 41%);
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
        h1{
            font-size: var(--fontSuperBig);
            font-weight: 700;
            margin:0;
        }
        h2{
            font-size: var(--fontBig);
            font-weight: 700;
            margin: 0;
        }
        h3{
            font-size: var(--fontMed);
            font-weight: 400;
            margin:0;
        }
        b{
            font-weight:700;
        }
        a{
            color: var(--colorLightBlue);
        }
    }
    html{
        font-size:16px;
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