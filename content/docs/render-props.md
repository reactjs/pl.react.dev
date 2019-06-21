---
id: render-props
title: Właściwość Renderująca
permalink: docs/render-props.html
---

Określenie ["właściwość renderująca"](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) odnosi się do techniki współdzielenia kodu pomiędzy komponentami Reacta, przy użyciu właściwości której wartością jest funkcja.

Komponent z renderowaną właściwością, przyjmuje funkcję która zwraca element Reacta a następnie wywołuje ją, nie implementując jednocześnie logiki do wyrenderowania tego komponentu.

```jsx
<DataProvider render={data => (
  <h1>Cześć {data.target}</h1>
)}/>
```

Biblioteki które używają właściwości renderujących to m.in. [React Router](https://reacttraining.com/react-router/web/api/Route/render-func) i [Downshift](https://github.com/paypal/downshift).

W tym dokumencie, przedyskutujemy dlaczego renderowanie właściwości jest przydatne i jak napisać je samemu.

## Użycie Właściwości Renderującej do Zagadnień-przecinających(ang. *Cross-Cutting Concerns*) {#use-render-props-for-cross-cutting-concerns}

Komponenty są podstawową jednostką reużywalności kodu w Reakcie, jednak nie zawsze oczywistością jest jak współdzielić stan lub zachowanie enkapsulowane przez jeden komponent, podczas gdy inne komponenty mogą potrzebować tego samego stanu.

Dla przykładu, poniższy komponent śledzi pozycje myszki w aplikacji webowej:

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
        <p>Aktualna pozycja myszki to ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}
```

Podczas gdy kursor przemieszcza się po ekranie, komponent wyświetla jego koordynaty (x, y) wewnątrz `<p>`.

Pytanie brzmi: Jak użyć ponownie tego zachowania w innym komponencie? Innymi słowy, jeżeli inny komponent potrzebuje wiedzieć o pozycji kursora, czy możemy enkapsulować to zachowanie tak abyśmy mogli łatwo współdzielić z tym komponentem ?

Odkąd komponenty są podstawową jednostką reużywalności w Reakcie, spróbujmy zrefaktoryzować trochę kod, aby użyć komponentu `<Mouse>` który enkapsuluje zachowanie które musimy użyć gdzieś indziej.

```js
// Komponent <Mouse> enkapsuluje zachowanie którego potrzebujemy...
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

Teraz komponent `<Mouse>` enkapsuluje wszystkie zachowania związane z nasłuchiwaniem na zdarzenia `mousemove` i przechowuje pozycję kursora (x, y), jednak nie jest jeszcze w pełni reużywalny.

Dla przykładu, powiedzmy że mamy komponent `<Cat>` który renderuje obrazek kota goniącego myszkę na ekranie. Moglibyśmy użyć właściwości `<Cat mouse={{ x, y }}>` aby przekazać komponentowi koordynaty kursora, tak aby wiedział gdzie umieścić obrazek kota.

Początkowo, możesz chcieć wyrenderować komponent `<Cat>` *wewnątrz metody `render` komponentu `<Mouse>`*, w ten sposób:

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
          Moglibyśmy w tym miejscu po prostu zamienić <p> na <Cat> ... ale później
          musielibyśmy stworzyć oddzielny komponent <MouseWithSomethingElse>
          za każdym razem gdy chcielibyśmy go użyć, dlatego też <MouseWithCat>
          nie jest jeszcze naprawdę reużywalny.
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

To podejście zadziałałoby w naszym specyficznym przypadku, ale nie osiągneliśmy prawdziwego celu, jakim jest enkapsulacja zachowania w taki sposób aby było ono reużywalne. Teraz, za każdym razem gdy potrzebowalibyśmy pozycji myszki dla innego przypadku, musimy stworzyć nowy komponent (innymi słowy kolejny `<MouseWithCat>`) który wyrenderuje coś konkretnie dla przypadku użycia.

To miejsce w którym renderowanie właściwości przychodzi z odsieczą. Zamiast na trwało zakodować (ang. *hard-coding*) `<Cat>` wewnątrz komponentu `<Mouse>` i zmieniać w ten sposób to co zostało wyrenderowane, możemy dostarczyć do komponentu `<Mouse>` właściwość będącą funkcją dynamiczne określającą co powinno zostać wyrenderowane.

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
          użyj właściwości `render` aby dynamicznie określić co wyrenderować.
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

Teraz, zamiast faktycznie klonować komponent `<Mouse>` i trwale zakodowywać coś innego w jego metodzie `render` aby rozwiązać specyficzny przypadek użycia, dostarczamy właściwość `render`, którą komponent `<Mouse>` może użyć do dynamicznego określenia co ma zostać wyrenderowane.

Bardziej konkretnie, **właściwość renderująca jest funkcją której komponent używa aby wiedzieć co wyrenderować.**

Ta technika powoduje że zachowanie które chcemy współdzielić staje się niezwykle przenośne. Aby dostać to zachowanie, wyrenderuj komponent `<Mouse>` wraz z właściwością `render`, która mówi co ma zostać wyrenderowane z aktualną pozycją (x, y) kursora.

Jedną interesującą rzeczą o której warto wspomnieć podczas opisywania właściwości renderujących jest to że możesz zaimplementować większość [komponentów wyższego rzędu(ang. *higher-order components*)](/docs/higher-order-components.html) (HOC) używając zwykłego komponentu z właściwością renderującą. Dla przykładu, jeżeli preferujesz wykorzystać komponent wyższego rzędu `withMouse` zamiast komponentu `<Mouse>`, możesz z łatwością go stworzyć używając `<Mouse>` z właściwością renderującą:

```js
// Jeżeli z jakiegoś powodu naprawdę chcesz HOC, możesz go łatwo
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

Użycie właściwości renderującej powoduje że jest możliwe użycie obu wzorców.

## Używanie Właściwości innych niż `render` {#using-props-other-than-render}

Ważne jest aby pamiętać że pomimo iż wzorzec jest nazywany "właściowość renderująca(ang. *render props*)" to nie musisz *używać właściowści o nazwanej `render` aby go stosować*. W zasadzie, [*każda* właściwość która jest funkcją, której komponent używa aby wiedzieć co wyrenderować jest technicznie "właściwością renderującą"](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce).

Pomimo że powyższe przykłady używają `render`, moglibyśmy po prostu użyć właściwości `children`!

```js
<Mouse children={mouse => (
  <p>Pozycja myszki to {mouse.x}, {mouse.y}</p>
)}/>
```

Pamiętaj że właściwość `children` nie musi być nazwana na liście "atrybutów" twojego elementu JSX. Zamiast tego, możesz ją umieścić bezpośrednio *wewnątrz* elementu!

```js
<Mouse>
  {mouse => (
    <p>Pozycja myszki to {mouse.x}, {mouse.y}</p>
  )}
</Mouse>
```

Możesz zauważyć wykorzystanie tej techniki w [react-motion](https://github.com/chenglou/react-motion) API.

Odkąd ta technika jest trochę niecodzienna, podczas projektowania swojego API, prawdopodobnie będziesz chciał jawnie określić w swoich `propTypes` że `children` powinien być funkcją.

```js
Mouse.propTypes = {
  children: PropTypes.func.isRequired
};
```

## Ostrzeżenia {#caveats}

### Bądź ostrożny podczas używania Właściwości Renderujących z React.PureComponent {#be-careful-when-using-render-props-with-reactpurecomponent}

Jeżeli stworzysz funkcję wewnątrz metody `render`, użycie właściowości renderującej może anulować korzyści płynące z użycia [`React.PureComponent`](/docs/react-api.html#reactpurecomponent). Dzieje się tak ponieważ płytkie porównanie dla nowych właściwości zawsze będzie zwracać wartość `false`, a w tym przypadku każde wywołanie `render` będzie generować nową wartość dla właściwości renderującej.

Dla przykładu, kontynując z komponentem `<Mouse>`, jeżeli `Mouse` rozszerzałaby `React.PureComponent` zamiast `React.Component`, nasz przykład wyglądałby tak:

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

W tym przykładzie, za każdym razem gdy `<MouseTracker>` jest renderowany, generowana jest nowa funkcja jako wartość dla właściwości `<Mouse render>`, a zatem neguje efekt  `<Mouse>` rozszerzającej w pierwszej kolejności `React.PureComponent`!

Aby obejść ten problem, możesz zdefiniować właściowść jako metodę instancji, w ten sposób:

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

W przypadkach gdy nie możesz zdefiniować właściwości statycznej (na przykład, dlatego że musisz domknąć właściwości komponentu i/lub jego stan), `<Mouse>` powinien rozszerzać  `React.Component`.
