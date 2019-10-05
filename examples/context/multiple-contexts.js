// Kontekst motywu, domyślnie ustawiony na jasny ("light")
const ThemeContext = React.createContext('light');

// Kontekst zalogowanego użytkownika
const UserContext = React.createContext({
  name: 'Gość',
});

class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;

    // Główny komponent aplikacji, który dostarcza wartości dla kontekstów
    // highlight-range{2-3,5-6}
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}

// Komponent może odczytywać wartości z wielu kontekstów jednocześnie
function Content() {
  // highlight-range{2-10}
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
