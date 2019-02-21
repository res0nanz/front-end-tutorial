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
  color: ${props => props.theme2.fg};
  border: 2px solid ${props => props.theme2.fg};
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
        <ThemeProvider theme={theme}> { /* props.theme.main = "mediumseagreen" */ }
          <Button>Themed</Button>
        </ThemeProvider>
        <br />
        <ThemeProvider theme2={theme2}>
          <div>
            <Button2>Default Theme</Button2>
            <ThemeProvider theme2={invertTheme}> { /* theme2を貰った上で入れ替え */ }
              <Button2>Inverted Theme</Button2>
            </ThemeProvider>
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
