import css from 'styled-jsx/css';

export default css.global`
body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
  
code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
}

.hidden-text {
    height: 1px;
    width: 1px;
    position: absolute;
    overflow: hidden;
    top: -10px;
}

.centered {
    text-align: center;
}
`