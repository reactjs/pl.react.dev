---
id: composition-vs-inheritance
title: Kompozycja a dziedziczenie
permalink: docs/composition-vs-inheritance.html
redirect_from:
  - "docs/multiple-components.html"
prev: lifting-state-up.html
next: thinking-in-react.html
---

<div class="scary">

> These docs are old and won't be updated. Go to [react.dev](https://react.dev/) for the new React docs.

</div>

React posiada potężny model kompozycyjny, z którego zalecamy korzystać zamiast dziedziczenia, aby komponentów można było używać wielokrotnie.

W tej sekcji rozważymy kilka problemów, przy okazji których początkujący użytkownicy Reacta sięgają po dziedziczenie, a następnie pokażemy, jak rozwiązać je za pomocą kompozycji.

## Zawieranie {#containment}

Niektóre komponenty nie wiedzą z góry, co będzie ich "dziećmi". Najczęściej dotyczy to komponentów takich jak `Sidebar` czy `Dialog`, które reprezentują "pojemniki" ogólnego użytku.

Zalecamy, aby komponenty tego typu korzystały ze specjalnego atrybutu `children` i przekazywały go bezpośrednio do renderowanej struktury:

```js{4}
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

Pozwala to innym komponentom przekazywać dowolnych potomków poprzez zagnieżdżanie elementów JSX-owych:

```js{4-9}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Witaj
      </h1>
      <p className="Dialog-message">
        Dziękujemy za wizytę na naszym statku kosmicznym!
      </p>
    </FancyBorder>
  );
}
```

**[Przetestuj kod na CodePen](https://codepen.io/gaearon/pen/ozqNOV?editors=0010)**

Wszystko, co znajdzie się w JSX-owym znaczniku `<FancyBorder>` zostanie przekazane do komponentu `FancyBorder` poprzez atrybut `children`. Jako że `FancyBorder` renderuje `{props.children}` wewnątrz elementu `<div>`, właśnie w takim elemencie pojawią się ostatecznie przekazane komponenty.

Mimo że zdarza się to rzadziej, czasami trzeba wstawić do komponentu wiele takich "dziur". W takich przypadkach można wymyślić własną konwencję i używać jej zamiast `children`:

```js{5,8,18,21}
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/gwZOJp?editors=0010)

Elementy reactowe, takie jak `<Contacts />` czy `<Chat />`, są zwykłymi obiektami, dlatego możesz przekazywać je poprzez atrybuty jak każdą inną wartość. To podejście może przypominać koncepcję "slotów" z innych bibliotek, lecz w Reakcie nie ma żadnych ograniczeń co do typu wartości przekazywanych w atrybutach.

## Specjalizacja {#specialization}

Czasami wyobrażamy sobie, że niektóre komponenty są "specjalnymi przypadkami użycia" innych komponentów. Na przykład, można by powiedzieć, że `WelcomeDialog` jest specjalnym przypadkiem komponentu `Dialog`.

W Reakcie taką relację również można osiągnąć poprzez kompozycję, gdzie "wyspecjalizowany" komponent renderuje inny, bardziej ogólny komponent i konfiguruje go za pomocą odpowiednich atrybutów:

```js{5,8,16-18}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Witaj"
      message="Dziękujemy za wizytę na naszym statku kosmicznym!" />
  );
}
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/kkEaOZ?editors=0010)

Kompozycja działa równie dobrze z komponentami klasowymi:

```js{10,27-31}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Program Eksploracji Marsa"
              message="Jak powinniśmy się do Ciebie zwracać?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Zapisz mnie!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Witaj na pokładzie, ${this.state.login}!`);
  }
}
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/gwZbYa?editors=0010)

## A co z dziedziczeniem? {#so-what-about-inheritance}

W Facebooku korzystamy z Reacta w tysiącach komponentów i nie znaleźliśmy jak dotąd żadnego przypadku użycia, w którym lepszym rozwiązaniem byłoby stworzenie hierarchii dziedziczenia.

Atrybuty i kompozycja dają wystarczającą dowolność w dostosowaniu zarówno wyglądu, jak i zachowania komponentu, w sposób jawny i bezpieczny. Pamiętaj, że komponenty mogą przyjmować atrybuty dowolnego rodzaju: typy podstawowe, elementy reactowe czy funkcje.

Jeśli planujesz wielokrotnie używać w różnych komponentach funkcjonalności niezwiązanej z renderowaniem, sugerujemy wydzielić ją do osobnego modułu javascriptowego. Wtedy komponenty będą mogły ją zaimportować bez rozszerzania, bez względu na to, czy to funkcja, obiekt czy klasa.
