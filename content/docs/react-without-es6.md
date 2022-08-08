---
id: react-without-es6
title: React bez ES6
permalink: docs/react-without-es6.html
---

Komponenty reactowe mogą być javascriptowymi klasami:

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Witaj, {this.props.name}</h1>;
  }
}
```

Jeśli jednak jeszcze nie używasz składni ES6, możesz skorzystać z modułu `create-react-class`:


```javascript
var createReactClass = require('create-react-class');
var Greeting = createReactClass({
  render: function() {
    return <h1>Witaj, {this.props.name}</h1>;
  }
});
```

Interfejs API klas ES6 jest podobny do tego w `createReactClass()`, jednak istnieje między nimi kilka różnic.

## Deklarowanie domyślnych wartości dla właściwości {#declaring-default-props}

W przypadku klas ES6 wartości dla `defaultProps` są definiowane na komponencie:

```javascript
class Greeting extends React.Component {
  // ...
}

Greeting.defaultProps = {
  name: 'Maria'
};
```

Jeśli jednak korzystasz z `createReactClass()`, musisz zadeklarować w tym celu funkcję `getDefaultProps()` jako metodę przekazywanego obiektu:

```javascript
var Greeting = createReactClass({
  getDefaultProps: function() {
    return {
      name: 'Maria'
    };
  },

  // ...

});
```

## Ustawianie stanu początkowego {#setting-the-initial-state}

W klasach ES6 definicja stanu początkowego następuje po przypisaniu w konstruktorze wartości do `this.state`:

```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }
  // ...
}
```

W `createReactClass()` musisz przekazać osobną metodę `getInitialState`, która zwróci stan początkowy komponentu:

```javascript
var Counter = createReactClass({
  getInitialState: function() {
    return {count: this.props.initialCount};
  },
  // ...
});
```

## Automatyczne wiązanie {#autobinding}

W komponentach reactowych napisanych przy użyciu klas ES6, metody podlegają tym samym zasadom, co metody w zwykłych klasach ES6. Oznacza to, że nie dowiązują one automatycznie `this` do instancji. Musisz jawnie wywołać `.bind(this)` w konstruktorze:

```javascript
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Witaj!'};
    // Ta linia jest istotna!
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert(this.state.message);
  }

  render() {
    // Ponieważ metoda `this.handleClick` jest dowiązana,
    // możemy jej użyć jako procedurę obsługi zdarzeń.
    return (
      <button onClick={this.handleClick}>
        Przywitaj się
      </button>
    );
  }
}
```

W przypadku `createReactClass()` nie jest to wymagane, gdyż funkcja ta automatycznie dowiązuje wszystkie metody:

```javascript
var SayHello = createReactClass({
  getInitialState: function() {
    return {message: 'Witaj!'};
  },

  handleClick: function() {
    alert(this.state.message);
  },

  render: function() {
    return (
      <button onClick={this.handleClick}>
        Przywitaj się
      </button>
    );
  }
});
```

Oznacza to, że korzystanie z klas ES6 wiąże się pisaniem więcej powtarzalnego kodu dla procedur obsługi zdarzeń, jednak na korzyść przemawia znacznie lepsza wydajność w dużych aplikacjach.

<<<<<<< HEAD
Jeśli nie podoba ci się ten nadmiarowy kod, możesz włączyć w Babelu **eksperymentalną** składnię [właściwości klas (ang. *class properties*)](https://babeljs.io/docs/plugins/transform-class-properties/):
=======
If the boilerplate code is too unattractive to you, you may use [ES2022 Class Properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_instance_fields) syntax:
>>>>>>> 4808a469fa782cead9802619b0341b27b342e2d3


```javascript
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Witaj!'};
  }
<<<<<<< HEAD
  // UWAGA: ten zapis jest jeszcze w fazie eksperymentalnej!
  // Użycie funkcji strzałkowej powoduje automatycznie dowiązanie:
=======
  
  // Using an arrow here binds the method:
>>>>>>> 4808a469fa782cead9802619b0341b27b342e2d3
  handleClick = () => {
    alert(this.state.message);
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        Przywitaj się
      </button>
    );
  }
}
```

<<<<<<< HEAD
Pamiętaj jednak, że powyższa składnia jest **eksperymentalna**, co oznacza, że może się zmienić lub zostać odrzucona i nie dodana do języka JavaScript.

Jeśli wolisz pewniejsze rozwiązania, masz kilka opcji:
=======
You also have a few other options:
>>>>>>> 4808a469fa782cead9802619b0341b27b342e2d3

* Dowiązuj metody w konstruktorze.
* Używaj funkcji strzałkowych, np. `onClick={(e) => this.handleClick(e)}`.
* Skorzystaj z `createReactClass`.

## Mixiny {#mixins}

>**Uwaga:**
>
>Standard ES6 nie wspiera mixinów, dlatego domyślnie React nie będzie działał z mixinami użytymi w klasach ES6.
>
>**Z naszych obserwacji wynika też, że używanie ich często powoduje problemy, [dlatego odradzamy korzystania z nich w nowym kodzie](/blog/2016/07/13/mixins-considered-harmful.html).**
>
>Ten rozdział istnieje tylko dla zapewnienia kompletności dokumentacji.

Niekiedy różne komponenty mogą współdzielić te same funkcjonalności. Nazywa się je także [problemami przekrojowymi](https://en.wikipedia.org/wiki/Cross-cutting_concern). `createReactClass` pozwala na zastosowanie w tym celu przestarzałego systemu `mixinów`.

Jednym z częstych przykładów jest komponent, które chce aktualizować swój stan w równych odstępach czasu. Łatwo jest skorzystać z funkcji `setInterval()`, lecz należy pamiętać o anulowaniu interwału, gdy już nie jest potrzebny, aby zwolnić pamięć. React dostarcza [metody cyklu życia](/docs/react-component.html#the-component-lifecycle), które informują o tym, kiedy komponent jest tworzony lub niszczony. Stwórzmy prosty mixin, korzystający z tych metod, udostępniający prostą funkcję `setInterval()`, która będzie automatycznie po sobie "sprzątała", gdy komponent ulegnie zniszczeniu.

```javascript
var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

var createReactClass = require('create-react-class');

var TickTock = createReactClass({
  mixins: [SetIntervalMixin], // Użyj mixinu
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000); // Wywołaj metodę z mixinu
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function() {
    return (
      <p>
        React jest już uruchomiony {this.state.seconds} sekund.
      </p>
    );
  }
});

const root = ReactDOM.createRoot(document.getElementById('example'));
root.render(<TickTock />);
```

Jeśli komponent używa kilku mixinów i niektóre z nich definiują te same metody cyklu życia (tj. kilka z nich chce posprzątać przed zniszczeniem komponentu), React gwarantuje, że wszystkie zostaną wywołane. Metody zdefiniowane w mixinach są uruchamiane zgodnie z kolejnością ich dodania, a na koniec uruchamiana jest metoda samego komponentu.
