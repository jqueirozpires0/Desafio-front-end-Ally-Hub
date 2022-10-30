import { createGlobalStyle } from "styled-components";
import { darkTheme } from "./styles";


export default createGlobalStyle`
    body{
        background: ${(props => props.theme.colors.background)};
        color: ${(props => props.theme.colors.text)};
        background-color: ${(props => props.theme.colors.backgroundColor)};
    }
    .card-icon{
        background: ${(props => props.theme.colors.background)};
        color: white !important;
    }
    form{
        background: ${(props => props.theme === darkTheme ? props.theme.colors.background : props.theme.colors.backgroundColor)};
        background-image: url("https://allyhub.co/images/Pattern_new.png");
    }
    input {
        color: ${(props => props.theme.colors.text)};
    }
    input::placeholder {
        color: ${(props => props.theme.colors.text)};
    }
    input:focus {
        box-shadow: 0 0 0 0;
        outline: 0;
    }
    button {
        color: ${(props => props.theme.colors.buttonColor)};
        background: ${(props => props.theme === darkTheme ? props.theme.colors.background : props.theme.colors.backgroundColor)};
    }
    button:hover {
        color: white;
        background: ${(props => props.theme.colors.buttonColor)};
    }
    .footer{
        background: ${(props => props.theme === darkTheme ? props.theme.colors.background : props.theme.colors.backgroundColor)};
        background-image: url("https://allyhub.co/images/Pattern_new.png");
        background-position: center top 10px;
    }

`;