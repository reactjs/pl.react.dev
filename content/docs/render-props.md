---
id: render-props
title: Właściwość renderująca
permalink: docs/render-props.html
---

Określenie ["właściwość renderująca"](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) odnosi się do techniki współdzielenia kodu pomiędzy komponentami reactowymi, przy użyciu właściwości, której wartością jest funkcja.

Komponent z właściwością renderującą przyjmuje funkcję, zwracającą element reactowy, a następnie wywołuje ją, nie implementując jednocześnie logiki renderowania tego komponentu.

```jsx
<DataProvider render={data => (
  <h1>Cześć, {data.target}</h1>
)}/>
```

<<<<<<< HEAD
Biblioteki używające właściwości renderujących to m.in. [React Router](https://reacttraining.com/react-router/web/api/Route/render-func) i [Downshift](https://github.com/paypal/downshift).
=======
Libraries that use render props include [React Router](https://reacttraining.com/react-router/web/api/Route/render-func), [Downshift](https://github.com/paypal/downshift) and [Formik](https://github.com/jaredpalmer/formik).
>>>>>>> 519a3aec91a426b0c8c9ae59e292d064df48c66a

W tym dokumencie przedyskutujemy przydatność właściwości renderujących i dowiemy się, jak napisać je samodzielnie.

## Użycie właściwości renderujących przy zagadnieniach przekrojowych (ang. *cross-cutting concerns*) {#use-render-props-for-cross-cutting-concerns}

Komponenty są podstawowym sposobem na wielokrotne używanie funkcjonalności w Reakcie. Nie zawsze jednak jest oczywiste, jak należy współdzielić stan czy zachowanie zawarte w jednym komponencie, tak aby miały do nich dostęp inne komponenty.

Za przykład niech posłuży komponent śledzący pozycję kursora w aplikacji internetowej:

```js
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        <h1>Porusz myszką!</h1>
        <p>Aktualna pozycja kursora to ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}
```

Podczas gdy kursor przemieszcza się po ekranie, komponent wyświetla jego koordynaty (x, y) wewnątrz znacznika `<p>`.

Pytanie brzmi: jak użyć ponownie tego zachowania w innym komponencie? Innymi słowy, jeżeli inny komponent potrzebuje współrzędnych pozycji kursora, czy możemy zaimplementować to zachowanie tak, abyśmy mogli łatwo współdzielić je z tym komponentem?

Ponieważ komponenty są podstawowym sposobem na wielokrotne używanie funkcjonalności w Reakcie, spróbujmy przekształcić trochę powyższy kod tak, aby wykorzystać komponent `<Mouse>` zawierający w sobie zachowanie wymagane przez inny komponent.

```js
// Komponent <Mouse> posiada funkcjonalność, której potrzebujemy...
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/* ...ale jak wyrenderować coś innego niż <p>? */}
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Porusz myszką!</h1>
        <Mouse />
      </div>
    );
  }
}
```

Teraz komponent `<Mouse>` implementuje wszystkie zachowania związane z nasłuchiwaniem na zdarzenie `mousemove` i przechowuje pozycję kursora (x, y), jednak nie jest jeszcze w pełni reużywalny.

Dla przykładu, powiedzmy że mamy komponent `<Cat>`, który renderuje obrazek kota goniącego kursor na ekranie. Moglibyśmy użyć właściwości `<Cat mouse={{ x, y }}>`, aby przekazać komponentowi koordynaty kursora, tak aby wiedział, gdzie umieścić obrazek kota.

Początkowo możesz chcieć wyrenderować komponent `<Cat>` *wewnątrz metody `render` komponentu `<Mouse>`*, na przykład w ten sposób:

```js
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class MouseWithCat extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/*
          Moglibyśmy w tym miejscu po prostu zamienić <p> na <Cat>... ale później
          musielibyśmy stworzyć oddzielny komponent <MouseWithSomethingElse>
          dla każdego przypadku użycia, dlatego też <MouseWithCat>
          nie jest jeszcze w pełni używalny wielokrotnie.
        */}
        <Cat mouse={this.state} />
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Porusz myszką!</h1>
        <MouseWithCat />
      </div>
    );
  }
}
```

To podejście zadziałałoby w naszym specyficznym przypadku, ale nie osiągneliśmy prawdziwego celu, jakim jest hermetyzacja zachowania w taki sposób, aby można było je wykorzystywać wielokrotnie. W takim przypadku, za każdym razem gdy potrzebowalibyśmy inaczej wyświetlić coś na podstawie pozycji kursora, musielibyśmy stworzyć nowy komponent (innymi słowy, kolejny `<MouseWithCat>`), który wyrenderuje coś w odpowiedni sposób.

I tutaj do akcji wkracza właściwość renderująca. Zamiast na stałe osadzać `<Cat>` wewnątrz komponentu `<Mouse>`, jednocześnie zmieniając wyrenderowany przez niego wynik, możemy dostarczyć do komponentu `<Mouse>` właściwość będącą funkcją. Funkcja ta w sposób dynamiczny będzie określać, co powinno zostać wyrenderowane.

```js
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/*
          Zamiast używać statycznej reprezentacji tego co renderuje <Mouse>,
          użyj właściwości `render`, aby dynamicznie określić, co należy wyrenderować.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Porusz myszką!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```

Teraz, zamiast faktycznie klonować komponent `<Mouse>` i na stałe wpisywać coś innego w jego metodzie `render` dla poszczególnych przypadków, dostarczamy właściwość `render`, której komponent `<Mouse>` może użyć do dynamicznego określenia renderowanego wyniku.

Konkretnie rzecz ujmując, **właściwość renderująca jest funkcją, której komponent używa, aby wiedzieć, co ma wyrenderować.**

Ta technika powoduje, że zachowanie, które chcemy współdzielić, staje się niezwykle przenośne. Aby uzyskać zamierzony efekt, wyrenderuj komponent `<Mouse>` wraz z właściwością `render`, która określi, co powinno zostać wyrenderowane biorąc pod uwagę aktualną pozycję (x, y) kursora myszy.

Ciekawostką, o której warto wspomnieć podczas opisywania właściwości renderujących, jest to, że większość [komponentów wyższego rzędu (ang. *higher-order components*, *HOC*)](/docs/higher-order-components.html) można zaimplementować przy użyciu zwykłego komponentu z właściwością renderującą. Dla przykładu, jeżeli wolisz korzystać z komponentu wyższego rzędu `withMouse` zamiast komponentu `<Mouse>`, możesz z łatwością go stworzyć przy użyciu `<Mouse>` z właściwością renderującą:

```js
// Jeżeli z jakiegoś powodu naprawdę potrzebujesz HOC-a, możesz go łatwo
// stworzyć używając zwykłego komponentu z właściwością renderującą!
function withMouse(Component) {
  return class extends React.Component {
    render() {
      return (
        <Mouse render={mouse => (
          <Component {...this.props} mouse={mouse} />
        )}/>
      );
    }
  }
}
```

Użycie właściwości renderującej powoduje, że jest możliwe użycie obu wzorców.

## Używanie właściwości innych niż `render` {#using-props-other-than-render}

Pamiętaj, że pomimo iż wzorzec nosi nazwę "właściwości renderującej" (ang. *render prop*), nie musisz *używać właściwości o nazwie `render`, aby go zastosować*. W zasadzie [*każda* właściwość, która jest funkcją służącą do określenia, co powinno zostać wyrenderowane, jest technicznie rzecz ujmując "właściwością renderującą"](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce).

Pomimo że powyższe przykłady używają nazwy `render`, moglibyśmy po prostu użyć właściwości `children`!

```js
<Mouse children={mouse => (
  <p>Pozycja kursora to {mouse.x}, {mouse.y}</p>
)}/>
```

Pamiętaj, że w JSX właściwości `children` nie musisz przekazywać na liście "atrybutów" twojego elementu. Zamiast tego możesz ją umieścić bezpośrednio *wewnątrz* znacznika!

```js
<Mouse>
  {mouse => (
    <p>Pozycja kursora to {mouse.x}, {mouse.y}</p>
  )}
</Mouse>
```

Powyższa technika stosowana jest w bibliotece [react-motion](https://github.com/chenglou/react-motion).

Jako że ta technika wydaje się trochę niecodzienna, podczas projektowania swojego API prawdopodobnie zechcesz jawnie określić w `propTypes` komponentu, że właściwość `children` powinna być funkcją.

```js
Mouse.propTypes = {
  children: PropTypes.func.isRequired
};
```

## Ostrzeżenia {#caveats}

### Uważaj przy stosowaniu właściwości renderującej dla komponentów dziedziczących po React.PureComponent {#be-careful-when-using-render-props-with-reactpurecomponent}

Jeżeli stworzysz funkcję wewnątrz metody `render`, użycie właściwości renderującej może zniwelować korzyści płynące z użycia [`React.PureComponent`](/docs/react-api.html#reactpurecomponent). Dzieje się tak ponieważ płytkie porównanie (ang. *shallow comparison*) dla nowych właściwości zawsze będzie zwracać wartość `false`, a w tym przypadku każde wywołanie `render` będzie generować nową wartość dla właściwości renderującej.

Dla przykładu, kontynuując z komponentem `<Mouse>`, jeżeli `Mouse` rozszerzałaby klasę `React.PureComponent` zamiast `React.Component`, nasz przykład wyglądałby tak:

```js
class Mouse extends React.PureComponent {
  // Ta sama implementacja co wyżej...
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Porusz myszką!</h1>

        {/*
          Źle! Wartość właściwości `render` będzie
          inna przy każdym wywołaniu metody render.
        */}
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```

W tym przykładzie, za każdym razem gdy `<MouseTracker>` jest renderowany, generowana jest nowa funkcja jako wartość dla właściwości `<Mouse render>`. Zatem w pierwszej kolejności neguje to efekt rozszerzania `React.PureComponent` przez komponent `<Mouse>`!

Aby obejść ten problem, możesz zdefiniować właściwość jako metodę instancji klasy:

```js
class MouseTracker extends React.Component {
  // Zdefiniowana jako metoda instancji, `this.renderTheCat` zawsze
  // odnosi się do *tej samej* funkcji podczas użycia w metodzie render
  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <h1>Porusz myszką!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    );
  }
}
```

W przypadkach gdy nie możesz zdefiniować właściwości statycznej (na przykład, dlatego że musisz domknąć właściwości komponentu i/lub jego stan), `<Mouse>` powinien rozszerzać klasę `React.Component`.
