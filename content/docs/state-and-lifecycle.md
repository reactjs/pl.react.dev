---
id: state-and-lifecycle
title: Stan i cykl życia
permalink: docs/state-and-lifecycle.html
redirect_from:
  - "docs/interactivity-and-dynamic-uis.html"
prev: components-and-props.html
next: handling-events.html
---

W tym poradniku wprowadzimy pojęcie stanu (ang. *state*) i cyklu życia (ang. *lifecycle*) komponentu reactowego. Więcej informacji na ten temat znajdziesz w [szczegółowej dokumentacji API komponentów](/docs/react-component.html).

Wróćmy do przykładu tykającego zegara z [jednej z poprzednich lekcji](/docs/rendering-elements.html#updating-the-rendered-element). W sekcji ["Renderowanie elementów"](/docs/rendering-elements.html#rendering-an-element-into-the-dom) nauczyliśmy się tylko jednego sposobu aktualizowania interfejsu aplikacji. Aby zmienić wynik renderowania, wywołujemy funkcję `root.render()`:

```js{10}
const root = ReactDOM.createRoot(document.getElementById('root'));
  
function tick() {
  const element = (
    <div>
      <h1>Witaj, świecie!</h1>
      <h2>Aktualny czas: {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);
}

setInterval(tick, 1000);
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/gwoJZk?editors=0010)

W tym rozdziale dowiemy się, jak sprawić, by komponent `Clock` był w pełni hermetyczny i zdatny do wielokrotnego użytku. Wyposażymy go we własny timer, który będzie aktualizował się co sekundę.

Zacznijmy od wyizolowania kodu, który odpowiada za wygląd zegara:

```js{5-8,13}
const root = ReactDOM.createRoot(document.getElementById('root'));

function Clock(props) {
  return (
    <div>
      <h1>Witaj, świecie!</h1>
      <h2>Aktualny czas: {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  root.render(<Clock date={new Date()} />);
}

setInterval(tick, 1000);
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/dpdoYR?editors=0010)

Brakuje jeszcze fragmentu, który spełniałby kluczowe założenie: inicjalizacja timera i aktualizowanie UI co sekundę powinny być zaimplementowane w komponencie `Clock`.

Idealnie byłoby móc napisać tylko tyle i oczekiwać, że `Clock` zajmie się resztą:

```js{2}
root.render(<Clock />);
```

Aby tak się stało, musimy dodać do komponentu "stan".

Stan przypomina trochę atrybuty (ang. *props*), jednak jest prywatny i w pełni kontrolowany przez dany komponent.

## Przekształcanie funkcji w klasę {#converting-a-function-to-a-class}

Proces przekształcania komponentu funkcyjnego (takiego jak nasz `Clock`) w klasę można opisać w pięciu krokach:

1. Stwórz [klasę zgodną ze standardem ES6](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Classes) o tej samej nazwie i odziedzicz po klasie `React.Component` przy pomocy słowa kluczowego `extend`.

2. Dodaj pustą metodę o nazwie `render()`.

3. Przenieś ciało funkcji do ciała metody `render()`.

4. W `render()` zamień wszystkie `props` na `this.props`.

5. Usuń starą deklarację funkcji.

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Witaj, świecie!</h1>
        <h2>Aktualny czas: {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/zKRGpo?editors=0010)

Komponent `Clock` przestał już być funkcją i od teraz jest klasą.

Metoda `render` zostanie automatycznie wywołana przy każdej zmianie. Dopóki będziemy renderować `<Clock />` do tego samego węzła drzewa DOM, dopóty używana będzie jedna i ta sama instancja klasy `Clock`. Pozwala to na skorzystanie z dodatkowych funkcjonalności, takich jak lokalny stan czy metody cyklu życia komponentu.

## Dodawanie lokalnego stanu do klasy {#adding-local-state-to-a-class}

Przenieśmy teraz `date` z atrybutów do stanu w trzech krokach:

1) Zamień wystąpienia `this.props.date` na `this.state.date` w ciele metody `render()`:

```js{6}
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Witaj, świecie!</h1>
        <h2>Aktualny czas: {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2) Dodaj [konstruktor klasy](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Classes#Konstruktor) i zainicjalizuj w nim pole `this.state`:

```js{4}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Witaj, świecie!</h1>
        <h2>Aktualny czas: {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Zwróć uwagę na argument `props` przekazywany do konstruktora bazowego za pomocą specjalnej funkcji `super()`:

```js{2}
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```

Komponenty klasowe zawsze powinny przekazywać `props` do konstruktora bazowego.

3) Usuń atrybut `date` z elementu `<Clock />`:

```js{2}
root.render(<Clock />);
```

Timer dodamy do komponentu nieco później.

W rezultacie powinniśmy otrzymać następujący kod:

```js{2-5,11,18}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Witaj, świecie!</h1>
        <h2>Aktualny czas: {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/KgQpJd?editors=0010)

Teraz sprawimy, by komponent `Clock` uruchomił własny timer i aktualizował go co sekundę.

## Dodawanie metod cyklu życia do klasy {#adding-lifecycle-methods-to-a-class}

W aplikacjach o wielu komponentach istotne jest zwalnianie zasobów przy niszczeniu każdego z komponentów.

Chcielibyśmy [uruchamiać timer](https://developer.mozilla.org/pl/docs/Web/API/Window/setInterval) przy każdym pierwszym wyrenderowaniu komponentu `Clock` do drzewa DOM. W Reakcie taki moment w cyklu życia komponentu nazywamy "montowaniem" (ang. *mounting*).

Chcemy również [resetować timer](https://developer.mozilla.org/pl/docs/Web/API/Window/clearInterval) za każdym razem, gdy DOM wygenerowany przez `Clock` jest usuwany z dokumentu. W Reakcie taki moment nazywamy to "odmontowaniem" (ang. *unmounting*) komponentu.

W klasie możemy zadeklarować specjalne metody, które będą uruchamiały kod w momencie montowania i odmontowywania komponentu:

```js{7-9,11-13}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Witaj, świecie!</h1>
        <h2>Aktualny czas: {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Takie metody nazywamy "metodami cyklu życia".

Metoda `componentDidMount()` uruchamiana jest po wyrenderowaniu komponentu do drzewa DOM. To dobre miejsce na inicjalizację timera:

```js{2-5}
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

Zwróć uwagę, że identyfikator timera zapisujemy bezpośrednio do `this` (`this.timerID`).

Mimo że `this.props` jest ustawiane przez Reacta, a `this.state` jest specjalnym polem, to nic nie stoi na przeszkodzie, aby stworzyć dodatkowe pola, w których chcielibyśmy przechowywać wartości niezwiązane bezpośrednio z przepływem danych (jak nasz identyfikator timera).

Zatrzymaniem timera zajmie się metoda cyklu życia zwana `componentWillUnmount()`:

```js{2}
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

Na koniec zaimplementujemy metodę o nazwie `tick()`, którą komponent `Clock` będzie wywoływał co sekundę.

Użyjemy w niej `this.setState()`, aby zaplanować aktualizację lokalnego stanu komponentu:

```js{18-22}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Witaj, świecie!</h1>
        <h2>Aktualny czas: {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/amqdNA?editors=0010)

Teraz timer powinien już tykać co sekundę.

Podsumujmy, co dzieje się w powyższym kodzie i w jakiej kolejności wywoływane są metody:

1) Kiedy element `<Clock />` przekazywany jest do funkcji `root.render()`, React wywołuje konstruktor komponentu `Clock`. Jako że `Clock` będzie wyświetlać aktualny czas, musi on zainicjalizować `this.state` obiektem zawierającym aktualną datę. Później ten stan będzie aktualizowany.

2) Następnie React wywołuje metodę `render()` komponentu `Clock`. W ten sposób uzyskuje informację, co powinno zostać wyświetlone na stronie. Gdy otrzyma odpowiedź, odpowiednio aktualizuje drzewo DOM.

3) Po wyrenderowaniu komponentu `Clock` do drzewa DOM, React wywołuje metodę cyklu życia o nazwie `componentDidMount()`. W jej ciele komponent `Clock` prosi przeglądarkę o zainicjalizowanie nowego timera, który będzie wywoływać metodę `tick()` co sekundę.

4) Co sekundę przeglądarka wywołuje metodę `tick()`. W jej ciele komponent `Clock` żąda aktualizacji UI poprzez wywołanie metody `setState()`, przekazując jako argument obiekt z aktualnym czasem. Dzięki wywołaniu `setState()` React wie, że zmienił się stan i że może ponownie wywołać metodę `render()`, by dowiedzieć się, co powinno zostać wyświetlone na ekranie. Tym razem wartość zmiennej `this.state.date` w ciele metody `render()` będzie inna, odpowiadająca nowemu czasowi - co React odzwierciedli w drzewie DOM.

5) Jeśli kiedykolwiek komponent `Clock` zostanie usunięty z drzewa DOM, React wywoła na nim metodę cyklu życia o nazwie `componentWillUnmount()`, zatrzymując tym samym timer.

## Poprawne używanie stanu {#using-state-correctly}

Są trzy rzeczy, które musisz wiedzieć o `setState()`.

### Nie modyfikuj stanu bezpośrednio {#do-not-modify-state-directly}

Na przykład, poniższy kod nie spowoduje ponownego wyrenderowania komponentu:

```js
// Źle
this.state.comment = 'Witam';
```

Zamiast tego używaj `setState()`:

```js
// Dobrze
this.setState({comment: 'Witam'});
```

Jedynym miejscem, w którym wolno Ci użyć `this.state` jest konstruktor klasy.

### Aktualizacje stanu mogą dziać się asynchroniczne {#state-updates-may-be-asynchronous}

React może zgrupować kilka wywołań metody `setState()` w jedną paczkę w celu zwiększenia wydajności aplikacji.

Z racji tego, że zmienne `this.props` i `this.state` mogą być aktualizowane asynchronicznie, nie powinno się polegać na ich wartościach przy obliczaniu nowego stanu.

Na przykład, poniższy kod może nadpisać `counter` błędną wartością:

```js
// Źle
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

Aby temu zaradzić, wystarczy użyć alternatywnej wersji metody `setState()`, która jako argument przyjmuje funkcję zamiast obiektu. Funkcja ta otrzyma dwa argumenty: aktualny stan oraz aktualne atrybuty komponentu.

```js
// Dobrze
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

W powyższym kodzie użyliśmy [funkcji strzałkowej](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Functions/Funkcje_strzalkowe), lecz równie dobrze moglibyśmy użyć zwykłej funkcji:

```js
// Dobrze
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### Aktualizowany stan jest scalany {#state-updates-are-merged}

Gdy wywołujesz `setState()`, React scala (ang. *merge*) przekazany obiekt z aktualnym stanem komponentu.

Na przykład, gdyby komponent przechowywał w stanie kilka niezależnych zmiennych:

```js{4,5}
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

można byłoby je zaktualizować niezależnie za pomocą osobnych wywołań metody `setState()`:

```js{4,10}
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

Scalanie jest płytkie (ang. *shallow*), tzn. `this.setState({comments})` nie zmieni `this.state.posts`, lecz całkowicie nadpisze wartość `this.state.comments`.

## Dane płyną z góry na dół {#the-data-flows-down}

Ani komponenty-rodzice, ani ich dzieci nie wiedzą, czy jakiś komponent posiada stan, czy też nie. Nie powinny się również przejmować tym, czy jest on funkcyjny, czy klasowy.

Właśnie z tego powodu stan jest nazywany lokalnym lub enkapsulowanym. Nie mają do niego dostępu żadne komponenty poza tym, który go posiada i modyfikuje.

Komponent może zdecydować się na przekazanie swojego stanu w dół struktury poprzez atrybuty jego komponentów potomnych:

```js
<FormattedDate date={this.state.date} />
```

Komponent `FormattedDate` otrzyma `date` jako atrybut i nie będzie w stanie rozróżnić, czy pochodzi on ze stanu lub jednego z atrybutów komponentu `Clock`, czy też został przekazany bezpośrednio przez wartość:

```js
function FormattedDate(props) {
  return <h2>Aktualny czas: {props.date.toLocaleTimeString()}.</h2>;
}
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/zKRqNB?editors=0010)

Taki przepływ danych nazywany jest powszechnie jednokierunkowym (ang. *unidirectional*) lub "z góry na dół" (ang. *top-down*). Stan jest zawsze własnością konkretnego komponentu i wszelkie dane lub części UI, powstałe w oparciu o niego, mogą wpłynąć jedynie na komponenty znajdujące się "poniżej" w drzewie.

Wyobraź sobie, że drzewo komponentów to wodospad atrybutów, a stan każdego z komponentów to dodatkowe źródło wody, które go zasila, jednocześnie spadając w dół wraz z resztą wody.

Aby pokazać, że wszystkie komponenty są odizolowane od reszty, stwórzmy komponent `App`, który renderuje trzy elementy `<Clock>`:

```js{4-6}
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/vXdGmd?editors=0010)

Każdy `Clock` tworzy swój własny timer i aktualizuje go niezależnie od pozostałych.

W aplikacjach reactowych to, czy komponent ma stan, czy nie, jest tylko jego szczegółem implementacyjnym, który z czasem może ulec zmianie. Możesz dowolnie używać bezstanowych komponentów (ang. *stateless components*) wewnątrz tych ze stanem (ang. *stateful components*), i vice versa.
