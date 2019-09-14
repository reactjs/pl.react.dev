// highlight-range{1-4}
// Kontekst pozwala na przekazywanie wartości głęboko do drzewa komponentów
// z pominięciem komponentów pośrednich.
// Stwórzmy kontekst dla aktualnie wybranego motywu (nadając mu domyślną wartość "light" - jasny).
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // highlight-range{1-3,5}
    // Użyj "dostawcy" (Provider), aby ustawić motyw dla tego poddrzewa aplikacji.
    // Każdy komponent będzie mógł go odczytać, nie ważne jak głęboko w drzewie się znajduje.
    // W tym przykładzie ustawiamy motyw na "dark" - ciemny.
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// highlight-range{1,2}
// Komponent pośredni nie musi już jawnie przekazywać tego ustawienia
// w dół hierarchii.
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // highlight-range{1-3,6}
  // Przypisz wartość do `contextType`, aby odczytać aktualne ustawienie motywu z kontekstu.
  // React znajdzie najbliższego dostawcę (Provider) motywu i użyje jego wartości.
  // W tym przykładzie aktualny motyw będzie ciemny ("dark").
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
