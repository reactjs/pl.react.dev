---
id: typechecking-with-proptypes
title: Typechecking With PropTypes
permalink: docs/typechecking-with-proptypes.html
redirect_from:
  - "docs/react-api.html#typechecking-with-proptypes"
---

> Uwaga:
>
> Z wersją React v15.5 `React.PropTypes` zostało przeniesione do innej paczki. Zamiast importować z paczki Reacta, używaj [biblioteki `prop-types`](https://www.npmjs.com/package/prop-types).
>
> Dla ułatwienia migracji przygotowaliśmy [skrypt codemod](/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes).

Wraz ze wzrostem twojej aplikacji możesz wyłapywać więcej błędów, korzystając ze sprawdzania typów. Dla niektórych aplikacji możesz korzystać z rozszerzeń JavaScriptu do sprawdzenia typów w całej aplikacji, takich jak [Flow](https://flow.org/) lub [TypeScript](https://www.typescriptlang.org/). Nawet jeśli z nich nie korzystasz, możesz skorzystać ze sprawdzania typów wbudowanego w Reacta. By rozpocząć sprawdzanie typów właściwości w komponencie, możesz dodać do komponentu specjalną właściwość `propTypes`.

```javascript
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Witaj, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```
`PropTypes` eksportuje walidatory, które mogą być używane do sprawdzania poprawności danych wejściowych. W tym przypadku wykorzystujemy `PropTypes.string`. Kiedy wartość przekazanej właściwości będzie nieprawidłowego typu, zostanie wyświetlone ostrzeżenie w konsoli javascriptowej. Ze względu na wydajność, `propTypes` są sprawdzane tylko w trybie deweloperskim.

### PropTypes {#proptypes}

Oto przykład dokumentujący różne dostarczone walidatory:

```javascript
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // Możesz zadeklarować, że właściwość będzie określonego typu javascriptowego. 
  // Domyślnie, wszystkie są opcjonalne
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Wszystko, co może być wyrenderowane: liczby, łańcuchy znaków, elementy lub tablice
  // (lub fragmenty) zawierające te typy.
  optionalNode: PropTypes.node,

  // Element reactowy.
  optionalElement: PropTypes.element,

  // Typ komponenetu reactowego (np. MyComponent).
  optionalElementType: PropTypes.elementType,
  
  // Możesz także zadeklarować właściwość, która będzie instancją klasy.
  // Wykorzystujemy do tego operator instanceof z JavaScriptu.
  optionalMessage: PropTypes.instanceOf(Message),

  // Możesz się upewnić, czy właściwość jest ograniczona do określonych wartości
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // Atrybut może też mieć wiele typów
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // Tablica zawierająca elementy określonego typu
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // Obiekt zawierający wartości określonego typu
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // Obiekt zawierający jedne określonych pól
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),
  
  // Obiekt, który zawiera tylko wskazane pola
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),   

  // Możesz dodać do każdego z powyższych `isRequired,
  // aby sprawdzić czy podany atrybut został zdefiniowany.
  requiredFunc: PropTypes.func.isRequired,

  // Wartość dowolnego typu danych.
  requiredAny: PropTypes.any.isRequired,

  // Możesz też utworzyć niestandardowy walidator. Powinien on zwracać obiek `Error`
  // jeśli sprawdzenie zakończy się niepowodzeniem. Nie powinien wywoływać `console.warning ani
  // rzucać wyjątku, ponieważ nie będzie działał wewnątrz `oneOfType`.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Niepoprawny atrybut `' + propName + '` przekazany do ' +
        ' `' + componentName + '`. Walidacja nieprawidłowa.'
      );
    }
  },

  // Możesz także przekazać niestandardowy walidator do `arrayOf` i `objectOf`.
  // Powinien on zwracać obiek `Error` jeśli sprawdzenie zakończy się niepowodzeniem.
  // Walidator będzie wywołany dla każdego klucza w tablicy lub obiekcie.
  // Pierwsze dwa argumenty walidatora to walidowana tablica lub obiekt oraz klucz bieżącego elementu.
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Niepoprawny atrybut `' + propFullName + '` przekazany do ' +
        ' `' + componentName + '`. Walidacja nieprawidłowa.'
      );
    }
  })
};
```

### Wymaganie Pojedynczego Dziecka {#requiring-single-child}

Wykorzystując `PropTypes.element` możesz sprawdzić czy tylko pojedyncze dziecko jest przekazane do komponentu jako dzieci.

```javascript
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // Musi być dokłądnie jeden element lub zostanie wyświetlone ostrzeżenie.
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};
```

### Domyślne wartości atrybutów {#default-prop-values}

Możesz zdefiniować domyślne wartości atrybutów przez przypisanie specjalnej właściwości `defaultProps`:

```javascript
class Greeting extends React.Component {
  render() {
    return (
      <h1>Witaj, {this.props.name}</h1>
    );
  }
}

// Definiuje domyślne wartości atrybutu:
Greeting.defaultProps = {
  name: 'Obcy'
};

// Renderuje "Witaj, Obcy":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```

Jeśli używasz transformator Babela [transform-class-properties](https://babeljs.io/docs/plugins/transform-class-properties/), możesz zadeklarować `defaultProps` jako statyczną właściwość klasy komponentu Reacta. Ta składnia jeszcze nie została ukończona i będzie wymagać etapu kompilacji do działania w przeglądarce. Aby uzyskać więcej informacji, zobacz [class fields proposal](https://github.com/tc39/proposal-class-fields).

```javascript
class Greeting extends React.Component {
  static defaultProps = {
    name: 'obcy'
  }

  render() {
    return (
      <div>Witaj, {this.props.name}</div>
    )
  }
}
```
Właściwość `defaultProps` zostanie wykorzystana, aby zapewnić wartość dla `this.props.name`, jeśli nie zostanie ona określona przez komponent nadrzędny. Sprawdzanie typu `propTypes` następuje po rozwiązaniu` defaultProps`, więc sprawdzanie typu będzie miało zastosowanie także do `defaultProps`.
