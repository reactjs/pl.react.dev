---
id: shallow-renderer
title: Shallow Renderer
permalink: docs/shallow-renderer.html
layout: docs
category: Reference
---

**Importowanie**

```javascript
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6
var ShallowRenderer = require('react-test-renderer/shallow'); // ES5 z zainstalowanym npm
```

## Ogólne informacje {#overview}

Podczas pisania testów jednostkowych dla kodu reactowego przydatne może okazać się renderowanie płytkie (ang. *shallow rendering*). Pozwala ono na wyrenderowanie komponentu "jeden poziom w głąb" i wykonanie asercji na zwróconym drzewie, bez obaw o efekty uboczne komponentów potomnych, które wcale nie są tworzone i renderowane. Proces ten nie wymaga obecności drzewa DOM.

Załóżmy, że mamy do czynienia z następującym komponentem:

```javascript
function MyComponent() {
  return (
    <div>
      <span className="heading">Tytuł</span>
      <Subcomponent foo="bar" />
    </div>
  );
}
```

Można dla niego napisać taki oto test:

```javascript
import ShallowRenderer from 'react-test-renderer/shallow';

// w teście:
const renderer = new ShallowRenderer();
renderer.render(<MyComponent />);
const result = renderer.getRenderOutput();

expect(result.type).toBe('div');
expect(result.props.children).toEqual([
  <span className="heading">Tytuł</span>,
  <Subcomponent foo="bar" />
]);
```

Testowanie płytkie posiada obecnie pewne ograniczenia, jak choćby brak wsparcia dla referencji (ang. *refs*) komponentów.

> Uwaga:
>
> Zalecamy również zapoznanie się z [interefejsem API do płytkiego renderowania](https://airbnb.io/enzyme/docs/api/shallow.html) biblioteki Enzyme. Dostarcza ona tę samą funkcjonalność, jednak ma wygodniejszy i bardziej wysokopoziomowy interfejs.

## Dokumentacja {#reference}

### `shallowRenderer.render()` {#shallowrendererrender}

`shallowRenderer` jest "miejscem", w którym można wyrenderować testowany komponent i otrzymać zwracaną przez niego strukturę.

`shallowRenderer.render()` w działaniu przypomina [`root.render()`](/docs/react-dom-client.html#createroot), jednak nie wymaga obecności drzewa DOM, a ponadto renderuje tylko jeden poziom struktury. Oznacza to, iż doskonale nadaje się do testowania komponentów w izolacji, bez brania pod uwagę implementacji komponentów potomnych.

### `shallowRenderer.getRenderOutput()` {#shallowrenderergetrenderoutput}

Po wywołaniu `shallowRenderer.render()` należy użyć `shallowRenderer.getRenderOutput()`, aby otrzymać płasko wyrenderowaną strukturę.

Można na niej wykonywać dowolne asercje.
