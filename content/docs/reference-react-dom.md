---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

<<<<<<< HEAD
Jeśli załadujesz Reacta za pomocą znacznika `<script>`, wspomniane w tym rozdziale główne interfejsy API będą dostępne poprzez globalną zmienną `ReactDOM`. Jeśli używasz ES6 z npm, wczytaj je za pomocą `import ReactDOM from 'react-dom'`. Jeśli używasz ES5 z npm, możesz napisać `var ReactDOM = require('react-dom')`.
=======
The `react-dom` package provides DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside the React model if you need to.

```js
import * as ReactDOM from 'react-dom';
```

If you use ES5 with npm, you can write:

```js
var ReactDOM = require('react-dom');
```

The `react-dom` package also provides modules specific to client and server apps:
- [`react-dom/client`](/docs/react-dom-client.html)
- [`react-dom/server`](/docs/react-dom-server.html)
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

## Informacje ogólne {#overview}

<<<<<<< HEAD
Pakiet "react-dom" udostępnia metody specyficzne dla DOM, które mogą być używane na najwyższym poziomie aplikacji i, w razie potrzeby, jako "wyjście awaryjne" poza model Reacta. Jednak w przypadku większości komponentów użycie tej biblioteki nie będzie konieczne.
=======
The `react-dom` package exports these methods:
- [`createPortal()`](#createportal)
- [`flushSync()`](#flushsync)
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

These `react-dom` methods are also exported, but are considered legacy:
- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`findDOMNode()`](#finddomnode)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)

> Note: 
> 
> Both `render` and `hydrate` have been replaced with new [client methods](/docs/react-dom-client.html) in React 18. These methods will warn that your app will behave as if it's running React 17 (learn more [here](https://reactjs.org/link/switch-to-createroot)).

### Wsparcie dla przeglądarek {#browser-support}

<<<<<<< HEAD
React wspiera wszystkie popularne przeglądarki, w tym Internet Explorer 9 i nowsze wersje, chociaż w starszych przeglądarkach, takich jak IE 9 i IE 10, [wymagane są niektóre łatki](/docs/javascript-environment-requirements.html) (ang. _polyfills_).
=======
React supports all modern browsers, although [some polyfills are required](/docs/javascript-environment-requirements.html) for older versions.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

> Uwaga
>
<<<<<<< HEAD
> Nie wspieramy starszych przeglądarek, które nie obsługują metod ze standardu ES5, lecz aplikacja może zadziałać na nich, jeśli użyjesz odpowiednich łatek, jak na przykład [es5-shim i es5-sham](https://github.com/es-shims/es5-shim). Pamiętaj jednak, że pójście tą drogą skazuje cię na całkowitą samodzielność.

---
=======
> We do not support older browsers that don't support ES5 methods or microtasks such as Internet Explorer. You may find that your apps do work in older browsers if polyfills such as [es5-shim and es5-sham](https://github.com/es-shims/es5-shim) are included in the page, but you're on your own if you choose to take this path.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

## Dokumentacja {#reference}

### `createPortal()` {#createportal}

```javascript
createPortal(child, container)
```

<<<<<<< HEAD
Renderuje element reactowy do drzewa DOM, do kontenera podanego w argumencie `container`, i zwraca [referencję](/docs/more-about-refs.html) do komponentu (lub `null` dla [komponentów bezstanowych](/docs/components-and-props.html#function-and-class-components)).
=======
Creates a portal. Portals provide a way to [render children into a DOM node that exists outside the hierarchy of the DOM component](/docs/portals.html).

### `flushSync()` {#flushsync}

```javascript
flushSync(callback)
```

Force React to flush any updates inside the provided callback synchronously. This method is useful for being able to read the result of those updates immediately.

> Note:
> 
> `flushSync` can have a significant impact on performance. Use sparingly.
> 
> `flushSync` may force pending Suspense boundaries to show their `fallback` state.
> 
> `flushSync` may also run pending effects and synchronously apply any updates they contain before returning.
> 
> `flushSync` may also flush updates outside the callback when necessary to flush the updates inside the callback. For example, if there are pending updates from a click, React may flush those before flushing the updates inside the callback.

## Legacy Reference {#legacy-reference}
### `render()` {#render}
```javascript
render(element, container[, callback])
```

> Note:
>
> `render` has been replaced with `createRoot` in React 18. See [createRoot](/docs/react-dom-client.html#createroot) for more info.

Render a React element into the DOM in the supplied `container` and return a [reference](/docs/more-about-refs.html) to the component (or returns `null` for [stateless components](/docs/components-and-props.html#function-and-class-components)).
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

Jeśli element reactowy był już wcześniej renderowany do kontenera `container`, zostanie on automatycznie zaktualizowany przez Reacta, który odpowiednio zmodyfikuje DOM tak, aby odzwierciedlić najnowszą wersję komponentu.

Jeśli w argumencie `callback` przekażesz funkcję zwrotną, zostanie ona wywołana po wyrenderowaniu lub zaktualizowaniu komponentu.

> Uwaga:
>
<<<<<<< HEAD
> `ReactDOM.render()` kontroluje zawartość podanego węzła kontenera. Po pierwszym wywołaniu zastępowane są wszystkie elementy DOM wewnątrz niego. Każde kolejne wywołania, z pomocą reactowego algorytmu różnicującego, efektywnie aktualizują drzewo.
>
> `ReactDOM.render()` nie modyfikuje węzła kontenera (jedynie jego elementy potomne). Możliwe jest wstawienie komponentu do istniejącego węzła DOM bez nadpisywania istniejących elementów podrzędnych.
>
> `ReactDOM.render()` obecnie zwraca referencję do instancji klasy `ReactComponent`, będącej korzeniem drzewa. Jednak używanie tej referencji jest uznawane za przestarzałą praktykę
> i należy jej unikać, ponieważ przyszłe wersje Reacta mogą w niektórych przypadkach renderować komponenty asynchronicznie. Jeśli potrzebujesz referencji do instancji korzenia, sugerujemy przekazanie do niego
> [referencyjnej funkcji zwrotnej](/docs/refs-and-the-dom.html#callback-refs).
>
> Używanie `ReactDOM.render()` do odtworzenia (ang. _hydrating_) kontenera renderowanego po stronie serwer jest przestarzałą praktyką i zostanie uniemożliwione w Reakcie 17. Zamiast tego użyj funkcji [`hydrate()`](#hydrate).
=======
> `render()` controls the contents of the container node you pass in. Any existing DOM elements inside are replaced when first called. Later calls use React’s DOM diffing algorithm for efficient updates.
>
> `render()` does not modify the container node (only modifies the children of the container). It may be possible to insert a component to an existing DOM node without overwriting the existing children.
>
> `render()` currently returns a reference to the root `ReactComponent` instance. However, using this return value is legacy
> and should be avoided because future versions of React may render components asynchronously in some cases. If you need a reference to the root `ReactComponent` instance, the preferred solution is to attach a
> [callback ref](/docs/refs-and-the-dom.html#callback-refs) to the root element.
>
> Using `render()` to hydrate a server-rendered container is deprecated. Use [`hydrateRoot()`](#hydrateroot) instead.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

---

### `hydrate()` {#hydrate}

```javascript
hydrate(element, container[, callback])
```

<<<<<<< HEAD
Działa podobnie do funkcji [`render()`](#render), ale służy do odtworzenia kontenera, którego struktura HTML została wyrenderowana przez [`ReactDOMServer`](/docs/react-dom-server.html). React podejmie próbę dołączenia detektorów zdarzeń do istniejących elementów.
=======
> Note:
>
> `hydrate` has been replaced with `hydrateRoot` in React 18. See [hydrateRoot](/docs/react-dom-client.html#hydrateroot) for more info.

Same as [`render()`](#render), but is used to hydrate a container whose HTML contents were rendered by [`ReactDOMServer`](/docs/react-dom-server.html). React will attempt to attach event listeners to the existing markup.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

React oczekuje, że renderowana treść będzie identyczna między serwerem a klientem. Potrafi, co prawda, poprawić różnice w treści tekstu, ale należy traktować niedopasowania jako błędy i zawsze je naprawiać. W trybie deweloperskim React ostrzega przed niedopasowaniem podczas procesu odtwarzania struktury. Nie ma gwarancji, że różnice w atrybutach zostaną odpowiednio poprawione w przypadku niedopasowania. Jest to ważne ze względu na wydajność, ponieważ w większości aplikacji niedopasowania są rzadkie, a zatem sprawdzenie wszystkich znaczników byłoby zbyt kosztowne obliczeniowo.

Jeśli któryś z atrybutów elementu lub treść tekstu intencjonalnie różnią się między serwerem a klientem (jak w przypadku znacznika czasu), możesz wyłączyć ostrzeżenie, dodając do elementu atrybut `suppressHydrationWarning={true}`. Działa to tylko na tym konkretnym elemencie i jest swego rodzaju "wyjściem awaryjnym". Nie nadużywaj go. O ile nie jest to treść tekstowa, React nie będzie próbował na siłę nanosić poprawek, więc wartość może pozostać niespójna do momentu jej kolejnej aktualizacji.

Jeśli potrzebujesz celowo renderować coś innego po stronie serwera i klienta, możesz wykonać renderowanie dwuprzebiegowe. Komponenty, które renderują coś innego po stronie klienta, mogą bazować na zmiennej stanu, np. `this.state.isClient`, którą można ustawić na `true` w metodzie `componentDidMount()`. W ten sposób początkowe renderowania zwróci tę samą zawartość co serwer, unikając niedopasowania. Jednak zaraz po odtworzeniu struktury w sposób synchroniczny nastąpi dodatkowe renderowanie. Zauważ, że to podejście spowolni działanie komponentów, ponieważ będą musiały być renderowane dwukrotnie - dlatego używaj go z rozwagą.

Pamiętaj, aby zwrócić uwagę na tzw. "user experience" użytkowników z wolnym połączeniem internetowym. Kod javascriptowy może załadować się znacznie później niż nastąpi pierwsze renderowanie kodu HTML. Z tego powodu, jeśli wyrenderujesz coś innego podczas przebiegu po stronie klienta, strona może się "przycinać". Możliwe, że w tej sytuacji pomoże wyrenderowanie "powłoki" (ang. _shell_) aplikacji po stronie serwera, a w kliencie wyświetlenie jedynie dodatkowych widgetów. Aby dowiedzieć się, jak to zrobić, nie napotykając problemów związanych z niedopasowaniem znaczników, zapoznaj się z wyjaśnieniem zawartym w poprzednim akapicie.

---

### `unmountComponentAtNode()` {#unmountcomponentatnode}

```javascript
<<<<<<< HEAD
ReactDOM.unmountComponentAtNode(container);
```

Usuwa zamontowany komponent z drzewa DOM, usuwając jego stan i procedury obsługi zdarzeń. Jeśli we wskazanym kontenerze nie zamontowano jeszcze żadnego elementu, wywoływanie tej funkcji nie daje żadnego efektu. Zwraca `true`, jeśli komponent został odmontowany lub `false`, jeśli kontener był pusty.
=======
unmountComponentAtNode(container)
```

> Note:
>
> `unmountComponentAtNode` has been replaced with `root.unmount()` in React 18. See [createRoot](/docs/react-dom-client.html#createroot) for more info.

Remove a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns `true` if a component was unmounted and `false` if there was no component to unmount.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

---

### `findDOMNode()` {#finddomnode}

> Uwaga:
>
> `findDOMNode` jest swego rodzaju "wyjściem awaryjnym", za pomocą którego możemy uzyskać dostęp do szukanego węzła DOM. Odradzamy korzystania z tej funkcji, ponieważ zaburza ona abstrakcję struktury komponentów. [Została wycofana w `StrictMode`.](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)

```javascript
<<<<<<< HEAD
ReactDOM.findDOMNode(component);
=======
findDOMNode(component)
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1
```

Jeśli wskazany komponent został zamontowany w drzewie DOM, funkcja zwróci odpowiadający mu natywny element DOM. Przydaje się do odczytywania wartości z drzewa DOM, np. danych z pól formularza lub wymiarów interfejsu. **W większości przypadków wystarczy jednak "podpiąć" się do węzła DOM za pomocą właściwości `ref`, całkowicie unikając stosowania funkcji `findDOMNode`.**

Jeśli komponent renderuje `null` lub `false`, `findDOMNode` zwróci `null`. Jeśli renderuje ciąg znaków, `findDOMNode` zwróci tekst danego węzła DOM. Od Reakta w wersji 16 w górę komponenty mogą również zwracać tzw. fragmenty, zawierające kilku potomków. W takim przypadku `findDOMNode` zwróci węzeł DOM odpowiadający pierwszemu niepustemu potomkowi.

> Uwaga:
>
> `findDOMNode` działa tylko na zamontowanych komponentach (czyli takich, które zostały umieszczone w drzewie DOM). Jeśli spróbujesz wywołać tę funkcję na niezamontowanym komponencie (np. jeśli wywołasz `findDOMNode()` w metodzie `render` komponentu, który jeszcze nie został utworzony), zostanie zgłoszony wyjątek.
>
> `findDOMNode` nie może być używane w komponentach funkcyjnych.

<<<<<<< HEAD
---

### `createPortal()` {#createportal}

```javascript
ReactDOM.createPortal(child, container);
```

Tworzy portal. Portale pozwalają na [renderowanie do węzła DOM potomków znajdujących się poza hierarchią danego komponentu](/docs/portals.html).
=======
* * *
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1
