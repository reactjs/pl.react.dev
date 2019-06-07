---
id: test-utils
title: Narzędzia do testowania
permalink: docs/test-utils.html
layout: docs
category: Reference
---

**Importowanie**

```javascript
import ReactTestUtils from 'react-dom/test-utils'; // ES6
var ReactTestUtils = require('react-dom/test-utils'); // ES5 z zainstalowanym npm
```

## Ogólne informacje {#overview}

`ReactTestUtils` pozwala na łatwiejsze testowanie komponentów reactowych przy pomocy dowolnego frameworka. W Facebooku korzystamy do tego celu z biblioteki [Jest](https://facebook.github.io/jest/), która sprawia, że pisanie testów jest mniej kłopotliwe. Do nauki podstaw Jesta polecamy [samouczek dla Reacta](https://jestjs.io/docs/tutorial-react), znajdujący się na oficjalnej stronie biblioteki.

> Uwaga:
>
<<<<<<< HEAD
> Zalecamy korzystanie z biblioteki [`react-testing-library`](https://git.io/react-testing-library). Została ona stworzona w celu propagowania idei pisania testów, które używają komponentów podobnie jak potencjalny użytkownik aplikacji.
=======
> We recommend using [React Testing Library](https://testing-library.com/react) which is designed to enable and encourage writing tests that use your components as the end users do.
>>>>>>> 2d9c2785dd9bd1d2876dd2c5b1e3bc233b115f3e
>
> Jako alternatywę, firma Airbnb opublikowała narzędzie do testowania o nazwie [Enzyme](https://airbnb.io/enzyme/), które pozwala na łatwe pisanie asercji, a także manipulowanie i przechodzenie drzewa zwróconego przez komponenty reactowe.

 - [`act()`](#act)
 - [`mockComponent()`](#mockcomponent)
 - [`isElement()`](#iselement)
 - [`isElementOfType()`](#iselementoftype)
 - [`isDOMComponent()`](#isdomcomponent)
 - [`isCompositeComponent()`](#iscompositecomponent)
 - [`isCompositeComponentWithType()`](#iscompositecomponentwithtype)
 - [`findAllInRenderedTree()`](#findallinrenderedtree)
 - [`scryRenderedDOMComponentsWithClass()`](#scryrendereddomcomponentswithclass)
 - [`findRenderedDOMComponentWithClass()`](#findrendereddomcomponentwithclass)
 - [`scryRenderedDOMComponentsWithTag()`](#scryrendereddomcomponentswithtag)
 - [`findRenderedDOMComponentWithTag()`](#findrendereddomcomponentwithtag)
 - [`scryRenderedComponentsWithType()`](#scryrenderedcomponentswithtype)
 - [`findRenderedComponentWithType()`](#findrenderedcomponentwithtype)
 - [`renderIntoDocument()`](#renderintodocument)
 - [`Simulate`](#simulate)

## Dokumentacja {#reference}

### `act()` {#act}

Aby przygotować dany komponent do testowania, należy renderujący i aktualizujący go kod "opakować" w wywołanie funkcji `act()`. Dzięki temu test zostanie uruchomiony w taki sposób, aby jak najwierniej odtworzyć zachowanie Reacta w przeglądarce.

>Uwaga
>
>Biblioteka `react-test-renderer` również udostępnia funkcję `act`, która działa w podobny sposób.

Dla przykładu, załóżmy, że napisaliśmy następujący komponent `Counter` (pol. *licznik*):

```js
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.title = `Kliknięto ${this.state.count} razy`;
  }
  componentDidUpdate() {
    document.title = `Kliknięto ${this.state.count} razy`;
  }
  handleClick() {
    this.setState(state => ({
      count: state.count + 1,
    }));
  }
  render() {
    return (
      <div>
        <p>Kliknięto {this.state.count} razy</p>
        <button onClick={this.handleClick}>
          Kliknij mnie
        </button>
      </div>
    );
  }
}
```

W taki oto sposób moglibyśmy go przetestować:

```js{3,20-22,29-31}
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Counter from './Counter';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('potrafi wyrenderować i aktualizować licznik', () => {
  // Testuje pierwsze renderowanie i metodę cyklu życia "componentDidMount"
  act(() => {
    ReactDOM.render(<Counter />, container);
  });
  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('Kliknięto 0 razy');
  expect(document.title).toBe('Kliknięto 0 razy');

  // Testuje drugie renderowanie i metodę cyklu życia "componentDidUpdate"
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(label.textContent).toBe('Kliknięto 1 razy');
  expect(document.title).toBe('Kliknięto 1 razy');
});
```

Zwróć uwagę, że przesyłanie zdarzeń DOM działa tylko wtedy, gdy kontener jest umieszczony w `document`. Aby uniknąć powtarzania szablonowego kodu, możesz użyć biblioteki pomocniczej, jak na przykład [`react-testing-library`](https://github.com/kentcdodds/react-testing-library).

* * *

### `mockComponent()` {#mockcomponent}

```javascript
mockComponent(
  componentClass,
  [mockTagName]
)
```

Jeśli przekażesz do tej funkcji atrapę komponentu (ang. *mocked component*), zostanie ona wzbogacona o przydatne funkcje, które pozwolą na traktowanie jej jak sztucznego komponentu reactowego. Zamiast wyrenderować się zgodnie z implementacją, komponent stanie się zwykłym elementem `<div>` (lub innym, jeśli podamy wartość w parametrze `mockTagName`) renderującym przekazanych potomków.

> Uwaga:
>
> Funkcja `mockComponent()` jest przestarzała. Zamiast niej zalecamy używanie ["płytkiego renderowania"](/docs/shallow-renderer.html) (ang. *shallow rendering*) lub funkcji [`jest.mock()`](https://facebook.github.io/jest/docs/en/tutorial-react-native.html#mock-native-modules-using-jestmock).

* * *

### `isElement()` {#iselement}

```javascript
isElement(element)
```

Zwraca `true`, jeśli argument `element` jest elementem reactowym.

* * *

### `isElementOfType()` {#iselementoftype}

```javascript
isElementOfType(
  element,
  componentClass
)
```

Zwraca `true`, jeśli argument `element` jest elementem reactowym o klasie podanej jako `componentClass`.

* * *

### `isDOMComponent()` {#isdomcomponent}

```javascript
isDOMComponent(instance)
```

Zwraca `true`, jeśli argument `instance` jest standardowym komponentem DOM (np. `<div>` lub `<span>`).

* * *

### `isCompositeComponent()` {#iscompositecomponent}

```javascript
isCompositeComponent(instance)
```

Zwraca `true`, jeśli argument `instance` jest komponentem użytkownika, typu klasowego lub funkcyjnego.

* * *

### `isCompositeComponentWithType()` {#iscompositecomponentwithtype}

```javascript
isCompositeComponentWithType(
  instance,
  componentClass
)
```

Zwraca `true`, jeśli argument `instance` jest komponentem o klasie podanej jako `componentClass`.

* * *

### `findAllInRenderedTree()` {#findallinrenderedtree}

```javascript
findAllInRenderedTree(
  tree,
  test
)
```

Przeszukuje wszystkie komponenty w drzewie `tree` i zwraca te, dla których wywołanie funkcji `test(komponent)` daje `true`. Funkcja ta sama w sobie nie jest zbyt użyteczna, jednak jest podstawą dla innych narzędzi do testowania.

* * *

### `scryRenderedDOMComponentsWithClass()` {#scryrendereddomcomponentswithclass}

```javascript
scryRenderedDOMComponentsWithClass(
  tree,
  className
)
```

Wyszukuje wszystkie elementy DOM w wyrenderowanym drzewie, których nazwa klasy CSS odpowiada wartości argumentu `className`.

* * *

### `findRenderedDOMComponentWithClass()` {#findrendereddomcomponentwithclass}

```javascript
findRenderedDOMComponentWithClass(
  tree,
  className
)
```

Podobna w działaniu do [`scryRenderedDOMComponentsWithClass()`](#scryrendereddomcomponentswithclass), lecz oczekuje dokładnie jednego wyniku. W przypadku znalezienia innej liczby elementów rzuca wyjątek.

* * *

### `scryRenderedDOMComponentsWithTag()` {#scryrendereddomcomponentswithtag}

```javascript
scryRenderedDOMComponentsWithTag(
  tree,
  tagName
)
```

Wyszukuje wszystkie elementy DOM w wyrenderowanym drzewie, których nazwa znacznika pasuje do wartości argumentu `tagName`.

* * *

### `findRenderedDOMComponentWithTag()` {#findrendereddomcomponentwithtag}

```javascript
findRenderedDOMComponentWithTag(
  tree,
  tagName
)
```

Podobna w działaniu do [`scryRenderedDOMComponentsWithTag()`](#scryrendereddomcomponentswithtag), lecz oczekuje dokładnie jednego wyniku. W przypadku znalezienia innej liczby elementów rzuca wyjątek.

* * *

### `scryRenderedComponentsWithType()` {#scryrenderedcomponentswithtype}

```javascript
scryRenderedComponentsWithType(
  tree,
  componentClass
)
```

Wyszukuje wszystkie instancje komponentów, których typ jest równy argumentowi `componentClass`.

* * *

### `findRenderedComponentWithType()` {#findrenderedcomponentwithtype}

```javascript
findRenderedComponentWithType(
  tree,
  componentClass
)
```

Podobna w działaniu do [`scryRenderedComponentsWithType()`](#scryrenderedcomponentswithtype), lecz oczekuje dokładnie jednego wyniku. W przypadku znalezienia innej liczby elementów rzuca wyjątek.

***

### `renderIntoDocument()` {#renderintodocument}

```javascript
renderIntoDocument(element)
```

Renderuje element reactowy do stworzonego w locie węzła drzewa DOM. **Ta funkcja działa tylko na drzewie DOM w ramach dokumentu.** Daje ten sam rezultat, co:

```js
const domContainer = document.createElement('div');
ReactDOM.render(element, domContainer);
```

> Uwaga:
>
> **Zanim** zaimportujesz bibliotekę React w kodzie, w globalnym zakresie muszą być dostępne zmienne `window`, `window.document` oraz `window.document.createElement`. W przeciwnym wypadku React będzie "myślał", że nie ma dostępu do drzewa DOM, co spowoduje wyłączenie niektórych funkcji, np. `setState`.

* * *

## Inne narzędzia {#other-utilities}

### `Simulate` {#simulate}

```javascript
Simulate.{eventName}(
  element,
  [eventData]
)
```

Symuluje przesłanie zdarzenia do węzła DOM, opcjonalnie dodając do niego dane zawarte w argumencie `eventData`.

Obiekt `Simulate` posiada odpowiednie metody [dla każdego ze zdarzeń obsługiwanego przez Reacta](/docs/events.html#supported-events).

**Kliknięcie w element**

```javascript
// <button ref={(node) => this.button = node}>...</button>
const node = this.button;
ReactTestUtils.Simulate.click(node);
```

**Zmiana wartości pola i wciśnięcie klawisza ENTER.**

```javascript
// <input ref={(node) => this.textInput = node} />
const node = this.textInput;
node.value = 'żyrafa';
ReactTestUtils.Simulate.change(node);
ReactTestUtils.Simulate.keyDown(node, {key: "Enter", keyCode: 13, which: 13});
```

> Uwaga
>
> Wszelkie właściwości dla zdarzenia (np. `keyCode`, `which` itp.) należy przekazać jawnie, ponieważ React nie dodaje ich automatycznie.

* * *
