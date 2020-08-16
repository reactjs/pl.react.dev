---
id: create-fragment
title: Fragmenty z kluczami
permalink: docs/create-fragment.html
layout: docs
category: Add-Ons
---

> Uwaga:
>
> Punkt wejścia `React.addons` jest przestarzały od wersji Reacta 15.5. Mamy teraz natywne wsparcie dla fragmentów, o których możesz przeczytać [tutaj](/docs/fragments.html).

## Importowanie {#importing}

```javascript
import createFragment from 'react-addons-create-fragment'; // ES6
var createFragment = require('react-addons-create-fragment'); // ES5 z npm
```

## Informacje ogólne {#overview}

W większości przypadków możesz użyć właściwości `key`, aby określić klucze w elementach zwracanych z metody `render`. Problem pojawia się jednak w sytuacji, gdy masz dwa zestawy komponentów potomnych, które musisz zamienić miejscami. Nie ma sposobu, aby umieścić klucz na każdym zestawie bez dodania elementu opakowującego.

Przykładowo, masz następujący komponent:

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

Gdy zmienisz wartość właściwości `swapped` na inną, komponenty potomne odmontują się i ponownie zamontują, ponieważ żadna z grup potomków nie ma ustawionego klucza.

Aby rozwiązać ten problem, możesz użyć dodatku `createFragment`, dzięki któremu możesz przekazać klucze do zestawów komponentów potomnych.

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

Klucze przekazanego obiektu (czyli `left` i `right`) są używane jako klucze dla całej grupy potomków, a kolejność kluczy obiektu jest używana do określenia kolejności renderowanych grup. Dzięki tej zmianie, obydwa zestawy elementów zostaną odpowiednio uporządkowane w DOM bez odmontowywania.

Wartość zwracaną funkcji `createFragment` należy traktować jako obiekt nieprzezroczysty; możesz użyć funkcji [`React.Children`](/docs/react-api.html#react.children) do iterowania fragmentu, ale nie zaglądaj bezpośrednio do niego. Zauważ również, że polegamy tu na silniku JavaScript zachowującym kolejność wyliczania obiektów, która nie jest gwarantowana przez specyfikację, ale jest implementowana przez wszystkie główne przeglądarki i maszyny wirtualne dla obiektów z kluczami nienumerycznymi.
