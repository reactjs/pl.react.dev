---
id: create-fragment
title: Kluczowane fragmenty
permalink: docs/create-fragment.html
layout: docs
category: Add-Ons
---

> Uwaga:
>
> Punkt wejścia `React.addons` jest przestarzały od wersji React 15.5. Mamy teraz wsparcie pierwszej klasy dla fragmentów, o których możesz przeczytać [tutaj](/docs/fragments.html).

## Importowanie {#importing}

```javascript
import createFragment from 'react-addons-create-fragment'; // ES6
var createFragment = require('react-addons-create-fragment'); // ES5 z npm
```

## Przegląd {#overview}

W większości przypadków, możesz użyć prop `key` aby określić klucze w elementach, które zwracasz z `render`. Jednakże, załamuje się to w jednej sytuacji: jeśli masz dwa zestawy dzieci, które musisz zmienić, nie ma sposobu, aby umieścić klucz na każdym zestawie bez dodania elementu wrappera.

To znaczy, jeśli masz komponent taki jak:

```js
function Swapper(props) {
  let children;
  if (props.swapped) {
    children = [props.rightChildren, props.leftChildren];
  } else {
    children = [props.leftChildren, props.rightChildren];
  }
  return <div>{children}</div>;
}
```

Dzieci odmontują się i ponownie zamontują, gdy zmienisz prop `swapped`, ponieważ nie ma żadnych kluczy zaznaczonych na dwóch zestawach dzieci.

Aby rozwiązać ten problem, możesz użyć dodatku `createFragment`, aby przekazać klucze do zestawów dzieci.

#### `Array<ReactNode> createFragment(object children)` {#arrayreactnode-createfragmentobject-children}

Zamiast tworzyć tablice, piszemy:

```javascript
import createFragment from 'react-addons-create-fragment';

function Swapper(props) {
  let children;
  if (props.swapped) {
    children = createFragment({
      right: props.rightChildren,
      left: props.leftChildren
    });
  } else {
    children = createFragment({
      left: props.leftChildren,
      right: props.rightChildren
    });
  }
  return <div>{children}</div>;
}
```

Klucze przekazanego obiektu (czyli `left` i `right`) są używane jako klucze dla całego zestawu dzieci, a kolejność kluczy obiektu jest używana do określenia kolejności renderowanych elementów podrzędnych. Dzięki tej zmianie dwa zestawy elementów podrzędnych zostaną odpowiednio uporządkowane w DOM bez odmontowywania.

Wartość zwracaną `createFragment` należy traktować jako obiekt nieprzezroczysty; możesz użyć helperów [`React.Children`](/docs/react-api.html#react.children) aby zapętlić fragment, ale nie powinien mieć do niego bezpośredniego dostępu. Zauważ również, że polegamy na silniku JavaScript zachowującym tutaj kolejność wyliczania obiektów, która nie jest gwarantowana przez specyfikację, ale jest implementowana przez wszystkie główne przeglądarki i maszyny wirtualne dla obiektów z kluczami nienumerycznymi.
