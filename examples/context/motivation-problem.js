class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  // highlight-range{1-4,7}
  // Komponent `Toolbar` musi odbierać dodatkową właściwość "theme"
  // i przekazywać ją w dół do `ThemedButton`. Gdyby każdy przycisk w aplikacji
  // wymagał dostępu do tej wartości, mogłoby to okazać się uciążliwe,
  // ponieważ należałoby przekazywać ją przez wszystkie poziomy struktury.
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}
