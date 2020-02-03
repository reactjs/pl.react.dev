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

Wraz ze wzrostem twojej aplikacji, możesz wyłapywać więcej błedów korzystając ze sprawdzania typów. Dla niektórych aplikacji możesz korzystać z rozszerzeń JavaScriptu do sprawdzenia typów w całej aplikacji takich jak [Flow](https://flow.org/) lub [TypeScript](https://www.typescriptlang.org/). Nawet jeśli z nich nie korzystasz, możesz skorzystać ze sprawdzania typów wbudowanego w Reacta. By rozpocząć sprawdzanie typów atrybutów w komponencie, możesz dodać specjalną właściwość `propTypes` dla komponentu.

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
`PropTypes` eksportuje validatory które mogą być być użyre do sprawdzenie poprawności danych wejściowych. W tym przypadku wykorzystujemy `PropTypes.string`. Kiedy wartość przekazana jako atrybut będzie niepoprawnego typu, zostanie wyświetlony ostrzeżenie  w konsoli JavaScriptowej. Ze względu na wydajność, `propTypes` są tylko sprawdzane w trybie deweloperskim.

### PropTypes {#proptypes}

Oto przykład dokumentujący różne dostarczone walidatory:

```javascript
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // Możesz zadeklarować atrybut będzie określonego typu JavaScriptowego. 
  // Domyślnie, wszystkie są opcjonalne
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Anything that can be rendered: numbers, strings, elements or an array
  // (or fragment) containing these types.
  optionalNode: PropTypes.node,

  // A React element.
  optionalElement: PropTypes.element,

  // A React element type (ie. MyComponent).
  optionalElementType: PropTypes.elementType,
  
  // You can also declare that a prop is an instance of a class. This uses
  // JS's instanceof operator.
  optionalMessage: PropTypes.instanceOf(Message),

  // You can ensure that your prop is limited to specific values by treating
  // it as an enum.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // An array of a certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // An object with property values of a certain type
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // An object taking on a particular shape
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),
  
  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),   

  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.
  requiredFunc: PropTypes.func.isRequired,

  // A value of any data type
  requiredAny: PropTypes.any.isRequired,

  // You can also specify a custom validator. It should return an Error
  // object if the validation fails. Don't `console.warn` or throw, as this
  // won't work inside `oneOfType`.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // You can also supply a custom validator to `arrayOf` and `objectOf`.
  // It should return an Error object if the validation fails. The validator
  // will be called for each key in the array or object. The first two
  // arguments of the validator are the array or object itself, and the
  // current item's key.
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

### Wymaganie Pojedyńczego Dziecka {#requiring-single-child}

Wykorzystując `PropTypes.element` możesz sprawdzić czy tylko pojedyńcze dziecko jest przekazane do komponentu jako dzieci.

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

Możesz zdefiniować domyślne wartości atrubutów przez przypisanie specjalnej właściwości `defaultProps`:

```javascript
class Greeting extends React.Component {
  render() {
    return (
      <h1>Witaj, {this.props.name}</h1>
    );
  }
}

// Definiuje domyślne wartości atrubutu:
Greeting.defaultProps = {
  name: 'Obcy'
};

// Renderuje "Witaj, Obcy":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```

Jeśli urzywasz transformator Babela [transform-class-properties](https://babeljs.io/docs/plugins/transform-class-properties/), możesz zadeklarować `defaultProps` jako statyczną właściwość klasy komponentu Reacta. Ta składnia jeszcze nie została ukończona i będzie wymagać etapu kompilacji do działania w przeglądarce. Aby uzyskać więcej informacji, zobacz [class fields proposal](https://github.com/tc39/proposal-class-fields).

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
