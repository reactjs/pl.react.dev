---
title: React Element Factories and JSX Warning
layout: single
permalink: warnings/legacy-factories.html
---

Jesteś tu najprawdopodobniej z tego powodu, że wywołujesz w kodzie komponent jak zwykłą funkcję. Poniższy kod jest uznawany za przestarzały:

```javascript
var MyComponent = require('MyComponent');

function render() {
  return MyComponent({ foo: 'bar' });  // OSTRZEŻENIE
}
```

## JSX {#jsx}

Nie można już w ten sposób wywoływać komponentów reactowych. Zamiast tego [użyj składni JSX](/docs/jsx-in-depth.html).

```javascript
var React = require('react');
var MyComponent = require('MyComponent');

function render() {
  return <MyComponent foo="bar" />;
}
```

## Bez JSX {#without-jsx}

Jeśli nie chcesz (lub nie możesz) skorzystać ze składni JSX, przed wywołaniem komponentu opakuj go w fabrykę (ang. *factory*):

```javascript
var React = require('react');
var MyComponent = React.createFactory(require('MyComponent'));

function render() {
  return MyComponent({ foo: 'bar' });
}
```

Ten sposób umożliwia łatwą aktualizację kodu, w którym jest pełno wywołań funkcyjnych.

## Dynamiczne komponenty bez JSX {#dynamic-components-without-jsx}

Jeśli otrzymujesz klasę komponentu z dynamicznego źródła, tworzenie fabryki i jej wywoływanie może okazać się zbyteczne. Zamiast tego stwórz komponent bezpośrednio:

```javascript
var React = require('react');

function render(MyComponent) {
  return React.createElement(MyComponent, { foo: 'bar' });
}
```

## Więcej szczegółów {#in-depth}

[Przeczytaj o tym, DLACZEGO wprowadziliśmy taką zmianę.](https://gist.github.com/sebmarkbage/d7bce729f38730399d28)
