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

  // Możesz także zadeklarować właściwość, która będzie instancją klasy.
  // Wykorzystujemy do tego operator instanceof z JavaScriptu.
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

  // Obiekt zawierający tylko wskazane pola.
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
const root = ReactDOM.createRoot(document.getElementById('example')); 
root.render(<Greeting />);
```

<<<<<<< HEAD
Jeśli używasz babelowego transformatora [plugin-proposal-class-properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties/) (poprzednio _plugin-transform-class-properties_), możesz zadeklarować `defaultProps` jako statyczną właściwość klasy komponentu reactowego. Ta składnia jeszcze nie została ukończona i do działania w przeglądarce będzie wymagać etapu kompilacji. Aby uzyskać więcej informacji, zobacz ["class fields proposal"](https://github.com/tc39/proposal-class-fields).
=======
Since ES2022 you can also declare `defaultProps` as static property within a React component class. For more information, see the [class public static fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_static_fields). This modern syntax will require a compilation step to work within older browsers. 
>>>>>>> f67fa22cc1faee261f9e22449d90323e26174e8e

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

Właściwość `defaultProps` posłuży do zapewnienia wartości dla `this.props.name`, jeśli nie zostanie ona określona przez komponent nadrzędny. Sprawdzanie typu `propTypes` następuje po rozwiązaniu `defaultProps`, więc sprawdzanie typu będzie miało zastosowanie także do `defaultProps`.

### Komponenty funkcyjne {#function-components}

Jeśli w swojej aplikacji regularnie korzystasz z komponentów funkcyjnych, musisz dokonać małych zmian, aby PropTypes zaczęły działać.

Załóżmy, że masz taki oto komponent:

```javascript
export default function HelloWorldComponent({ name }) {
  return (
    <div>Witaj, {name}</div>
  )
}
```

Aby dodać do niego PropTypes, zadeklaruj go osobno przed wyeksportowaniem:

```javascript
function HelloWorldComponent({ name }) {
  return (
    <div>Witaj, {name}</div>
  )
}

export default HelloWorldComponent
```

Teraz możesz dodać PropTypes bezpośrednio do `HelloWorldComponent`:

```javascript
import PropTypes from 'prop-types'

function HelloWorldComponent({ name }) {
  return (
    <div>Witaj, {name}</div>
  )
}

HelloWorldComponent.propTypes = {
  name: PropTypes.string
}

export default HelloWorldComponent
```
