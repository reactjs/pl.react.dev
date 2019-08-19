---
id: test-renderer
title: Test Renderer
permalink: docs/test-renderer.html
layout: docs
category: Reference
---

**Importowanie**

```javascript
import TestRenderer from 'react-test-renderer'; // ES6
const TestRenderer = require('react-test-renderer'); // ES5 z zainstalowanym npm
```

## Ogólne informacje {#overview}

Paczka ta udostępnia narzędzie, które renderuje komponenty reactowe do czysto javascriptowych obiektów, bez użycia drzewa DOM czy natywnego środowiska mobilnego.

Istotą tej paczki jest łatwość wygenerowania "migawki" (ang. *snapshot*) hierarchii widoków (podobnej do drzewa DOM), wyrenderowanej przez komponent z React DOM lub React Native bez pomocy przeglądarki czy [jsdom](https://github.com/tmpvar/jsdom).

Przykład:

```javascript
import TestRenderer from 'react-test-renderer';

function Link(props) {
  return <a href={props.page}>{props.children}</a>;
}

const testRenderer = TestRenderer.create(
  <Link page="https://www.facebook.com/">Facebook</Link>
);

console.log(testRenderer.toJSON());
// { type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ] }
```

Przy pomocy funkcjonalności biblioteki Jest do generowania snapshotów można automatycznie zapisać do pliku kopię drzewa w formacie JSON, a w teście sprawdzać, czy się ono nie zmieniło [(Więcej informacji na ten temat)](https://jestjs.io/docs/en/snapshot-testing).

Zwrócone drzewo można również przeszukiwać w celu znalezienia konkretnych węzłów i sprawdzenia ich właściwości.

```javascript
import TestRenderer from 'react-test-renderer';

function MyComponent() {
  return (
    <div>
      <SubComponent foo="bar" />
      <p className="my">Cześć</p>
    </div>
  )
}

function SubComponent() {
  return (
    <p className="sub">Potomek</p>
  );
}

const testRenderer = TestRenderer.create(<MyComponent />);
const testInstance = testRenderer.root;

expect(testInstance.findByType(SubComponent).props.foo).toBe('bar');
expect(testInstance.findByProps({className: "sub"}).children).toEqual(['Potomek']);
```

### TestRenderer {#testrenderer}

* [`TestRenderer.create()`](#testrenderercreate)
* [`TestRenderer.act()`](#testrendereract)

### Instancja TestRenderer {#testrenderer-instance}

* [`testRenderer.toJSON()`](#testrenderertojson)
* [`testRenderer.toTree()`](#testrenderertotree)
* [`testRenderer.update()`](#testrendererupdate)
* [`testRenderer.unmount()`](#testrendererunmount)
* [`testRenderer.getInstance()`](#testrenderergetinstance)
* [`testRenderer.root`](#testrendererroot)

### TestInstance {#testinstance}

* [`testInstance.find()`](#testinstancefind)
* [`testInstance.findByType()`](#testinstancefindbytype)
* [`testInstance.findByProps()`](#testinstancefindbyprops)
* [`testInstance.findAll()`](#testinstancefindall)
* [`testInstance.findAllByType()`](#testinstancefindallbytype)
* [`testInstance.findAllByProps()`](#testinstancefindallbyprops)
* [`testInstance.instance`](#testinstanceinstance)
* [`testInstance.type`](#testinstancetype)
* [`testInstance.props`](#testinstanceprops)
* [`testInstance.parent`](#testinstanceparent)
* [`testInstance.children`](#testinstancechildren)

## Dokumentacja {#reference}

### `TestRenderer.create()` {#testrenderercreate}

```javascript
TestRenderer.create(element, options);
```

<<<<<<< HEAD
Tworzy instancję `TestRenderer` przy użyciu przekazanego elementu reactowego. Nie korzysta z prawdziwego drzewa DOM, lecz renderuje całe drzewo komponentów do pamięci, aby można było wykonać na nim asercje. Zwracana instancja posiada następujące metody i właściwości:
=======
Create a `TestRenderer` instance with the passed React element. It doesn't use the real DOM, but it still fully renders the component tree into memory so you can make assertions about it. Returns a [TestRenderer instance](#testrenderer-instance).

### `TestRenderer.act()` {#testrendereract}

```javascript
TestRenderer.act(callback);
```

Similar to the [`act()` helper from `react-dom/test-utils`](/docs/test-utils.html#act), `TestRenderer.act` prepares a component for assertions. Use this version of `act()` to wrap calls to `TestRenderer.create` and `testRenderer.update`.

```javascript
import {create, act} from 'react-test-renderer';
import App from './app.js'; // The component being tested

// render the component
let root; 
act(() => {
  root = create(<App value={1}/>)
});

// make assertions on root 
expect(root.toJSON()).toMatchSnapshot();

// update with some different props
act(() => {
  root = root.update(<App value={2}/>);
})

// make assertions on root 
expect(root.toJSON()).toMatchSnapshot();
```
>>>>>>> de497e250340ff597ce4964279369f16315b8b4b

### `testRenderer.toJSON()` {#testrenderertojson}

```javascript
testRenderer.toJSON()
```

Zwraca obiekt reprezentujący wyrenderowane drzewo. W drzewie znajdą się wyłącznie węzły specyficzne dla platformy, np. `<div>` lub `<View>`, wraz ze swoimi właściwościami. Nie zostaną wyrenderowane natomiast żadne niestandardowe komponenty użytkownika. Funkcja przydaje się przy [testowaniu za pomocą snapshotów](https://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest).

### `testRenderer.toTree()` {#testrenderertotree}

```javascript
testRenderer.toTree()
```

Zwraca obiekt reprezentujący wyrenderowane drzewo. W przeciwieństwie do `toJSON()`, ta reprezentacja jest bardziej szczegółowa i zawiera również niestandardowe komponenty użytkownika. Prawdopodobnie ta funkcja nigdy ci się nie przyda, chyba że piszesz w oparciu o tę paczkę własną bibliotekę do testów.

### `testRenderer.update()` {#testrendererupdate}

```javascript
testRenderer.update(element)
```

Przy użyciu nowego elementu głównego ponownie renderuje drzewo przechowywane w pamięci. Symuluje aktualizację przeprowadzaną przez Reacta na korzeniu drzewa. Jeśli nowy element ma ten sam typ i klucz, co poprzedni, drzewo zostanie zaktualizowane; w przeciwnym wypadku drzewo zostanie odmontowane i zamontowane ponownie.

### `testRenderer.unmount()` {#testrendererunmount}

```javascript
testRenderer.unmount()
```

Odmontowuje drzewo przechowywane w pamięci, wywołując odpowiednie zdarzenia z cyklu życia komponentów.

### `testRenderer.getInstance()` {#testrenderergetinstance}

```javascript
testRenderer.getInstance()
```

Zwraca instancję korzenia drzewa, jeśli takowy istnieje. Nie zadziała, jeśli komponent główny jest funkcją, ponieważ funkcje nie mają własnych instancji.

### `testRenderer.root` {#testrendererroot}

```javascript
testRenderer.root
```

Zwraca "instancję testową" korzenia drzewa. Przydatne do wykonywania asercji na poszczególnych węzłach drzewa, a także do wyszukiwania innych "instancji testowych" w poddrzewach.

### `testInstance.find()` {#testinstancefind}

```javascript
testInstance.find(test)
```

Wyszukuje w poddrzewie dokładnie jedną instancję testową, dla której wywołanie `test(testInstance)` zwróci `true`. Jeśli funkcja `test(testInstance)` nie zwróci `true` dla dokładnie jednej instancji, rzucony zostanie wyjątek.

### `testInstance.findByType()` {#testinstancefindbytype}

```javascript
testInstance.findByType(type)
```

Wyszukuje w poddrzewie dokładnie jedną instancję testową o podanym typie `type`. Jeśli funkcja znajdzie inną liczbę instancji, rzucony zostanie wyjątek.

### `testInstance.findByProps()` {#testinstancefindbyprops}

```javascript
testInstance.findByProps(props)
```

Wyszukuje w poddrzewie dokładnie jedną instancję testową o podanych właściwościach `props`. Jeśli funkcja znajdzie inną liczbę instancji, rzucony zostanie wyjątek.

### `testInstance.findAll()` {#testinstancefindall}

```javascript
testInstance.findAll(test)
```

Wyszukuje w poddrzewie wszystkie instancje testowe, dla których funkcja `test(testInstance)` zwraca `true`.

### `testInstance.findAllByType()` {#testinstancefindallbytype}

```javascript
testInstance.findAllByType(type)
```

Wyszukuje w poddrzewie wszystkie instancje testowe o podanym typie `type`.

### `testInstance.findAllByProps()` {#testinstancefindallbyprops}

```javascript
testInstance.findAllByProps(props)
```

Wyszukuje w poddrzewie wszystkie instancje testowe o podanych właściwościach `props`.

### `testInstance.instance` {#testinstanceinstance}

```javascript
testInstance.instance
```

Zwraca instancję komponentu powiązanego z daną instancją testową. Działa tylko dla komponentów klasowych, ponieważ funkcyjne nie mają instancji. Wynik jest referencją odpowiadającą `this` w danym komponencie.

### `testInstance.type` {#testinstancetype}

```javascript
testInstance.type
```

Zwraca typ komponentu powiązanego z daną instancją testową. Przykładowo, typem komponentu `<Button />` jest `Button`.

### `testInstance.props` {#testinstanceprops}

```javascript
testInstance.props
```

Zwraca atrybuty powiązane z daną instancją testową. Przykładowo, właściwościami komponentu `<Button size="small" />` są: `{size: 'small'}`.

### `testInstance.parent` {#testinstanceparent}

```javascript
testInstance.parent
```

Zwraca instancję rodzica dla danej instancji testowej.

### `testInstance.children` {#testinstancechildren}

```javascript
testInstance.children
```

Zwraca instancje potomków dla danej "instancji testowej".

## Pomysły {#ideas}

Do metody `TestRenderer.create` jako argument można przekazać funkcję `createNodeMock`, która pozwala na tworzenie własnych atrap referencji (ang. *mock refs*).
`createNodeMock` jako argument przyjmuje element, a zwraca obiekt będący atrapą referencji.
Przydaje się to w testach komponentów, które korzystają z referencji (ang. *refs*) do innych komponentów.

```javascript
import TestRenderer from 'react-test-renderer';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.input = null;
  }
  componentDidMount() {
    this.input.focus();
  }
  render() {
    return <input type="text" ref={el => this.input = el} />
  }
}

let focused = false;
TestRenderer.create(
  <MyComponent />,
  {
    createNodeMock: (element) => {
      if (element.type === 'input') {
        // atrapa funkcji "focus"
        return {
          focus: () => {
            focused = true;
          }
        };
      }
      return null;
    }
  }
);
expect(focused).toBe(true);
```
