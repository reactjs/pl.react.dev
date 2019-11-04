// Upewnij się, że kształt wartości domyślnej przekazanej do `createContext`
// odpowiada kształtowi oczekiwanemu przez konsumentów!
// highlight-range{2-3}
export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});
