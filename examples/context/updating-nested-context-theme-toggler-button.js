import {ThemeContext} from './theme-context';

function ThemeTogglerButton() {
  // highlight-range{1-2,5}
  // Przycisk odczytuje z kontekstu nie tylko aktualny motyw,
  // ale także funkcję `toggleTheme` (przełącz motyw)
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button
          onClick={toggleTheme}
          style={{backgroundColor: theme.background}}>
          Przełącz motyw
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeTogglerButton;
