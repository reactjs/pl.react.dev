---
id: typechecking-with-proptypes
title: Sprawdzenie typów z wykorzystaniem PropTypes
permalink: docs/typechecking-with-proptypes.html
redirect_from:
  - "docs/react-api.html#typechecking-with-proptypes"
---

> Uwaga:
>
> Z wersją Reacta v15.5 `React.PropTypes` zostało przeniesione do innej paczki. Zamiast importować z paczki Reacta, używaj [biblioteki `prop-types`](https://www.npmjs.com/package/prop-types).
>
> Dla ułatwienia migracji przygotowaliśmy [skrypt codemod](/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes).

Wraz ze wzrostem rozmiaru twojej aplikacji, dzięki sprawdzaniu typów możesz wyłapać więcej błędów. W niektórych aplikacjach możesz korzystać z rozszerzeń JavaScriptu do sprawdzenia typów w całej aplikacji, takich jak [Flow](https://flow.org/) lub [TypeScript](https://www.typescriptlang.org/). Nawet jeśli z nich nie korzystasz, możesz skorzystać z mechanizmu sprawdzania typów wbudowanego w Reacta. Aby rozpocząć sprawdzanie typów właściwości w komponencie, możesz dodać do komponentu specjalną właściwość `propTypes`.

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

W powyższym przykładzie użyliśmy komponentu klasowego, jednak podobna zasada obowiązuje w przypadku komponentów funkcyjnych oraz komponentów tworzonych przy pomocy [`React.memo`](/docs/react-api.html#reactmemo) lub [`React.forwardRef`](/docs/react-api.html#reactforwardref).

`PropTypes` eksportuje walidatory, które mogą być używane do sprawdzania poprawności danych wejściowych. W tym przypadku wykorzystujemy `PropTypes.string`. Kiedy wartość przekazanej właściwości będzie nieprawidłowego typu, zostanie wyświetlone ostrzeżenie w konsoli javascriptowej. Ze względu na wydajność, `propTypes` są sprawdzane tylko w trybie deweloperskim.

### PropTypes {#proptypes}

Oto przykład dokumentujący różne dostarczone walidatory:

```javascript
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // Możesz zadeklarować, że właściwość będzie określonego typu javascriptowego. 
  // Domyślnie, wszystkie są opcjonalne.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Wszystko, co może być wyrenderowane: liczby, łańcuchy znaków, elementy czy tablice
  // (lub fragmenty) zawierające te typy.
  optionalNode: PropTypes.node,

  // Element reactowy.
  optionalElement: PropTypes.element,

  // Typ komponenetu reactowego (np. MyComponent).
  optionalElementType: PropTypes.elementType,
<<<<<<< HEAD
  
  // Możesz także zadeklarować właściwość, która będzie instancją klasy.
  // Wykorzystujemy do tego operator instanceof z JavaScriptu.
=======

  // You can also declare that a prop is an instance of a class. This uses
  // JS's instanceof operator.
>>>>>>> 5e437a10ed4e89cd5eaf990ce4f43e0857592b53
  optionalMessage: PropTypes.instanceOf(Message),

  // Możesz upewnić się, czy właściwość jest ograniczona do określonych wartości.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // Właściwość może mieć też wiele typów.
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // Tablica zawierająca elementy określonego typu.
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // Obiekt zawierający wartości określonego typu.
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // Obiekt zawierający określone pola.
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),
<<<<<<< HEAD
  
  // Obiekt zawierający tylko wskazane pola.
=======

  // An object with warnings on extra properties
>>>>>>> 5e437a10ed4e89cd5eaf990ce4f43e0857592b53
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),   

  // Możesz dodać do każdego z powyższych `isRequired`,
  // aby sprawdzić, czy podana właściwość została zdefiniowana.
  requiredFunc: PropTypes.func.isRequired,

  // Wymagana wartość dowolnego typu danych.
  requiredAny: PropTypes.any.isRequired,

  // Możesz też utworzyć niestandardowy walidator. Powinien on zwracać obiekt `Error`,
  // jeśli sprawdzenie zakończy się niepowodzeniem. Nie powinien wywoływać `console.warn`
  // ani rzucać wyjątku, ponieważ nie będzie działał on wewnątrz `oneOfType`.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Niepoprawna właściwość `' + propName + '` przekazana do ' +
        ' `' + componentName + '`. Walidacja zakończona niepowodzeniem.'
      );
    }
  },

  // Możesz także przekazać niestandardowy walidator do `arrayOf` i `objectOf`.
  // Powinien on zwracać obiekt `Error`, jeśli sprawdzenie zakończy się niepowodzeniem.
  // Walidator będzie wywoływany dla każdego klucza w tablicy lub obiekcie.
  // Pierwsze dwa argumenty walidatora to walidowana tablica lub obiekt oraz klucz bieżącego elementu.
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Niepoprawna właściwość `' + propFullName + '` przekazana do ' +
        ' `' + componentName + '`. Walidacja zakończona niepowodzeniem.'
      );
    }
  })
};
```

### Wymaganie dokładnie jednego potomka {#requiring-single-child}

Wykorzystując `PropTypes.element` możesz sprawdzić, czy do komponentu przekazano dokładnie jednego potomka.

```javascript
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // Musi zawierać dokładnie jeden element. W przeciwnym wypadku zostanie wyświetlone ostrzeżenie.
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

### Domyślne wartości właściwości {#default-prop-values}

Możesz zdefiniować domyślne wartości dla właściwości przez przypisanie specjalnej właściwości `defaultProps`:

```javascript
class Greeting extends React.Component {
  render() {
    return (
      <h1>Witaj, {this.props.name}</h1>
    );
  }
}

// Definiuje domyślne wartości dla właściwości:
Greeting.defaultProps = {
  name: 'obcy'
};

// Renderuje "Witaj, obcy":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```

Jeśli używasz babelowego transformatora [transform-class-properties](https://babeljs.io/docs/plugins/transform-class-properties/), możesz zadeklarować `defaultProps` jako statyczną właściwość klasy komponentu reactowego. Ta składnia jeszcze nie została ukończona i do działania w przeglądarce będzie wymagać etapu kompilacji. Aby uzyskać więcej informacji, zobacz ["class fields proposal"](https://github.com/tc39/proposal-class-fields).

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
<<<<<<< HEAD
Właściwość `defaultProps` posłuży do zapewnienia wartości dla `this.props.name`, jeśli nie zostanie ona określona przez komponent nadrzędny. Sprawdzanie typu `propTypes` następuje po rozwiązaniu `defaultProps`, więc sprawdzanie typu będzie miało zastosowanie także do `defaultProps`.
=======

The `defaultProps` will be used to ensure that `this.props.name` will have a value if it was not specified by the parent component. The `propTypes` typechecking happens after `defaultProps` are resolved, so typechecking will also apply to the `defaultProps`.

### Function Components

If you are using function components in your regular development, you may want to make some small changes to allow PropTypes to be proper applied.

Let's say you have a component like this:

```javascript
export default function HelloWorldComponent({ name }) {
  return (
    <div>Hello, {name}</div>
  )
}
```

To add PropTypes, you may want to declare the component in a separate function before exporting, like this:

```javascript
function HelloWorldComponent({ name }) {
  return (
    <div>Hello, {name}</div>
  )
}

export default HelloWorldComponent
```

Then, you can add PropTypes directly to the `HelloWorldComponent`:

```javascript
import PropTypes from 'prop-types'

function HelloWorldComponent({ name }) {
  return (
    <div>Hello, {name}</div>
  )
}

HelloWorldComponent.propTypes = {
  name: PropTypes.string
}

export default HelloWorldComponent
```
>>>>>>> 5e437a10ed4e89cd5eaf990ce4f43e0857592b53
