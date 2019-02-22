import React, { Component } from 'react';
import styled, {ThemeProvider} from 'styled-components';

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;

Button.defaultProps = {
  theme: {
    main: "palevioletred"
  }
}
const theme = {
  main: "mediumseagreen"
};

// ================================

const Button2 = styled.button`
  color: ${props => props.theme.fg};
  border: 2px solid ${props => props.theme.fg};
  background: ${props => props.theme.bg};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

const theme2 = {
  fg: "palevioletred",
  bg: "white"
};

const invertTheme = ({ fg, bg }) => ({
  fg: bg,
  bg: fg
});


class App extends Component {
  render() {
    return (
      <div className="App">
        <Button>Normal</Button>
        { /* props.theme.main = "mediumseagreen" */}
        <ThemeProvider theme={theme}>
          <Button>Themed</Button>
        </ThemeProvider>
        <hr />
        <ThemeProvider theme={theme2}>
          <div>
            <Button2>Default Theme</Button2>
            { /* theme2を(themeとして)貰った上で入れ替え */}
            <ThemeProvider theme={invertTheme}>
              <Button2>Inverted Theme</Button2>
            </ThemeProvider>
          </div>
          </ThemeProvider>
        <hr />
        <div>
          { /* 直接渡すことも可能 */ }
          <Button theme={{ main: "royalblue" }}>Ad hoc theme</Button>
          <ThemeProvider theme={theme}>
            <div>
              <Button>Themed</Button>
              <Button theme={{ main: "darkorange" }}>Overidden</Button>
            </div>
          </ThemeProvider>
        </div>
      </div>
    );
  }
}

export default App;
