---
title: Don't Call PropTypes Warning
layout: single
permalink: warnings/dont-call-proptypes.html
---

> Uwaga:
>
> Z wersją React v15.5 `React.PropTypes` zostało przeniesione do innej paczki. Zamiast importować z paczki Reacta, używaj [biblioteki `prop-types`](https://www.npmjs.com/package/prop-types).
>
> Dla ułatwienia migracji przygotowaliśmy [skrypt codemod](/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes).

W przyszłych wersjach Reacta kod, który implementuje funkcje walidujące PropTypes będzie wycinany na produkcji. Gdy to nastąpi, każdy kod wywoujący te funkcje bezpośrednio będzie powodował błąd (o ile także nie zostanie wycięty na produkcji).

### Nadal można deklarować Proptypes w tradycyjny sposób {#declaring-proptypes-is-still-fine}

Typowe użycie PropTypes wciąż jest wspierane:

```javascript
Button.propTypes = {
  highlighted: PropTypes.bool
};
```

Tutaj nic się nie zmienia.

### Nie wywołuj PropTypes bezpośrednio {#dont-call-proptypes-directly}

Używanie PropTypes w jakikolwiek inny sposób, niż do opisywania komponentów, nie będzie już wspierane:

```javascript
var apiShape = PropTypes.shape({
  body: PropTypes.object,
  statusCode: PropTypes.number.isRequired
}).isRequired;

// Brak wsparcia!
var error = apiShape(json, 'response');
```

Jeżeli logika twojej aplikacji jest uzależniona od użycia PropTypes w taki sposób, zachęcamy do stworzenia forka PropTypes lub użycia jednego z już istniejących (np. któregoś z [tych](https://github.com/aackerman/PropTypes) [dwóch](https://github.com/developit/proptypes)).

Jeśli zignorujesz to ostrzeżenie, po aktualizacji Reacta do wersji 16 możesz spodziewać się krytycznych błędów na środowisku produkcyjnym.

### Ostrzeżenie pojawia się, mimo że nie wywołujesz PropTypes bezpośrednio {#if-you-dont-call-proptypes-directly-but-still-get-the-warning}

Przyjrzyj się stosowi wywołań, który wyświetla się wraz z ostrzeżeniem. Znajdziesz w nim nazwę komponentu odpowiedzialnego za bezpośrednie wywołanie PropTypes.
Prawdopodobnie problem jest spowodowany przez zewnętrzną bibiliotekę, która opakowuje PropTypes. Przykładowo:

```js
Button.propTypes = {
  highlighted: ThirdPartyPropTypes.deprecated(
    PropTypes.bool,
    'Use `active` prop instead'
  )
}
```

Taki wzorzec sam w sobie jest w porządku, lecz powoduje on fałszywe ostrzeżenie, ponieważ React "myśli", że PropTypes wywoływane jest bezpośrednio.
W następnej sekcji przeczytasz, jak uporać się z takim ostrzeżeniem będąc autorem biblioteki, w której pojawia się implementacja czegoś podobnego do `ThirdPartyPropTypes`. Jeśli ostrzeżenie pochodzi z biblioteki, której nie jesteś autorem, możesz zgłosić błąd jej autorom.

### Jak poprawić fałszywe ostrzeżenie w zewnętrznych PropTypes {#fixing-the-false-positive-in-third-party-proptypes}

Jeśli jesteś autorem biblioteki operującej na PropTypes i pozwalasz użytkownikom na opakowywanie istniejących PropTypes, mogą oni natknąć się na ostrzeżenia pochodzące z twojej biblioteki.
Dzieje się tak, gdyż React nie widzi ostatniego, „ukrytego” parametru, [który jest przekazywany](https://github.com/facebook/react/pull/7132) po to, by wykryć bezpośrednie użycie PropTypes.

Oto, jak temu zaradzić. Jako przykładu użyjemy `deprecated` z [react-bootstrap/react-prop-types](https://github.com/react-bootstrap/react-prop-types/blob/0d1cd3a49a93e513325e3258b28a82ce7d38e690/src/deprecated.js). 
Obecna implementacja przekazuje tylko `props`, `propName` i `componentName`:

```javascript
export default function deprecated(propType, explanation) {
  return function validate(props, propName, componentName) {
    if (props[propName] != null) {
      const message = `"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`;
      if (!warned[message]) {
        warning(false, message);
        warned[message] = true;
      }
    }

    return propType(props, propName, componentName);
  };
}
```

Aby pozbyć się błędnego ostrzeżenia, upewnij się, że przekazujesz **wszystkie** argumenty do opakowanego PropType. Łatwo to zrobić przy pomocy notacji ES6 `…rest`:

```javascript
export default function deprecated(propType, explanation) {
  return function validate(props, propName, componentName, ...rest) { // dodajemy ...rest tutaj
    if (props[propName] != null) {
      const message = `"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`;
      if (!warned[message]) {
        warning(false, message);
        warned[message] = true;
      }
    }

    return propType(props, propName, componentName, ...rest); // i tutaj
  };
}
```

To uciszy ostrzeżenie.
