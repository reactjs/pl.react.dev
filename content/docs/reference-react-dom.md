---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

Jeśli załadujesz Reacta za pomocą znacznika `<script>`, wspomniane w tym rozdziale główne interfejsy API będą dostępne poprzez globalną zmienną `ReactDOM`. Jeśli używasz ES6 z npm, wczytaj je za pomocą `import ReactDOM from 'react-dom'`. Jeśli używasz ES5 z npm, możesz napisać `var ReactDOM = require('react-dom')`.

## Informacje ogólne {#overview}

Pakiet "react-dom" udostępnia metody specyficzne dla DOM, które mogą być używane na najwyższym poziomie aplikacji i, w razie potrzeby, jako "wyjście awaryjne" poza model Reacta. Jednak w przypadku większości komponentów użycie tej biblioteki nie będzie konieczne.

- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)
- [`findDOMNode()`](#finddomnode)
- [`createPortal()`](#createportal)

### Wsparcie dla przeglądarek {#browser-support}

React wspiera wszystkie popularne przeglądarki, w tym Internet Explorer 9 i nowsze wersje, chociaż w starszych przeglądarkach, takich jak IE 9 i IE 10, [wymagane są niektóre łatki](/docs/javascript-environment-requirements.html) (ang. *polyfills*).

> Uwaga
>
>Nie wspieramy starszych przeglądarek, które nie obsługują metod ze standardu ES5, lecz aplikacja może zadziałać na nich, jeśli użyjesz odpowiednich łatek, jak na przykład [es5-shim i es5-sham](https://github.com/es-shims/es5-shim). Pamiętaj jednak, że pójście tą drogą skazuje cię na całkowitą samodzielność.

* * *

## Dokumentacja {#reference}

### `render()` {#render}

```javascript
ReactDOM.render(element, container[, callback])
```

Renderuje element reactowy do drzewa DOM, do kontenera podanego w argumencie `container`, i zwraca [referencję](/docs/more-about-refs.html) do komponentu (lub `null` dla [komponentów bezstanowych](/docs/components-and-props.html#functional-and-class-components)).

Jeśli element reactowy był już wcześniej renderowany do kontenera `container`, zostanie on automatycznie zaktualizowany przez Reacta, który odpowiednio zmodyfikuje DOM tak, aby odzwierciedlić najnowszą wersję komponentu.

Jeśli w argumencie `callback` przekażesz funkcję zwrotną, zostanie ona wywołana po wyrenderowaniu lub zaktualizowaniu komponentu.

> Uwaga:
>
>`ReactDOM.render()` kontroluje zawartość podanego węzła kontenera. Po pierwszym wywołaniu zastępowane są wszystkie elementy DOM wewnątrz niego. Każde kolejne wywołania, z pomocą reactowego algorytmu różnicującego, efektywnie aktualizują drzewo.
>
>`ReactDOM.render()` nie modyfikuje węzła kontenera (jedynie jego elementy potomne). Możliwe jest wstawienie komponentu do istniejącego węzła DOM bez nadpisywania istniejących elementów podrzędnych.
>
> `ReactDOM.render()` obecnie zwraca referencję do instancji klasy `ReactComponent`, będącej korzeniem drzewa. Jednak używanie tej referencji jest uznawane za przestarzałą praktykę
> i należy jej unikać, ponieważ przyszłe wersje Reacta mogą w niektórych przypadkach renderować komponenty asynchronicznie. Jeśli potrzebujesz referencji do instancji korzenia, sugerujemy przekazanie do niego
> [referencyjnej funkcji zwrotnej](/docs/more-about-refs.html#the-ref-callback-attribute).
>
> Używanie `ReactDOM.render()` do odtworzenia (ang. *hydrating*) kontenera renderowanego po stronie serwer jest przestarzałą praktyką i zostanie uniemożliwione w Reakcie 17. Zamiast tego użyj funkcji [`hydrate()`](#hydrate).

* * *

### `hydrate()` {#hydrate}

```javascript
ReactDOM.hydrate(element, container[, callback])
```

Działa podobnie do funkcji [`render()`](#render), ale służy do odtworzenia kontenera, którego struktura HTML została wyrenderowana przez [`ReactDOMServer`](/docs/react-dom-server.html). React podejmie próbę dołączenia detektorów zdarzeń do istniejących elementów.

React oczekuje, że renderowana treść będzie identyczna między serwerem a klientem. Potrafi, co prawda, poprawić różnice w treści tekstu, ale należy traktować niedopasowania jako błędy i zawsze je naprawiać. W trybie deweloperskim React ostrzega przed niedopasowaniem podczas procesu odtwarzania struktury. Nie ma gwarancji, że różnice w atrybutach zostaną odpowiednio poprawione w przypadku niedopasowania. Jest to ważne ze względu na wydajność, ponieważ w większości aplikacji niedopasowania są rzadkie, a zatem sprawdzenie wszystkich znaczników byłoby zbyt kosztowne obliczeniowo.

Jeśli któryś z atrybutów elementu lub treść tekstu intencjonalnie różnią się między serwerem a klientem (jak w przypadku znacznika czasu), możesz wyłączyć ostrzeżenie, dodając do elementu atrybut `suppressHydrationWarning={true}`. Działa to tylko na tym konkretnym elemencie i jest swego rodzaju "wyjściem awaryjnym". Nie nadużywaj go. O ile nie jest to treść tekstowa, React nie będzie próbował na siłę nanosić poprawek, więc wartość może pozostać niespójna do momentu jej kolejnej aktualizacji.

Jeśli potrzebujesz celowo renderować coś innego po stronie serwera i klienta, możesz wykonać renderowanie dwuprzebiegowe. Komponenty, które renderują coś innego po stronie klienta, mogą bazować na zmiennej stanu, np. `this.state.isClient`, którą można ustawić na `true` w metodzie `componentDidMount()`. W ten sposób początkowe renderowania zwróci tę samą zawartość co serwer, unikając niedopasowania. Jednak zaraz po odtworzeniu struktury w sposób synchroniczny nastąpi dodatkowe renderowanie. Zauważ, że to podejście spowolni działanie komponentów, ponieważ będą musiały być renderowane dwukrotnie - dlatego używaj go z rozwagą.

Pamiętaj, aby zwrócić uwagę na tzw. "user experience" użytkowników z wolnym połączeniem internetowym. Kod javascriptowy może załadować się znacznie później niż nastąpi pierwsze renderowanie kodu HTML. Z tego powodu, jeśli wyrenderujesz coś innego podczas przebiegu po stronie klienta, strona może się "przycinać". Możliwe, że w tej sytuacji pomoże wyrenderowanie "powłoki" (ang. *shell*) aplikacji po stronie serwera, a w kliencie wyświetlenie jedynie dodatkowych widgetów. Aby dowiedzieć się, jak to zrobić, nie napotykając problemów związanych z niedopasowaniem znaczników, zapoznaj się z wyjaśnieniem zawartym w poprzednim akapicie.

* * *

### `unmountComponentAtNode()` {#unmountcomponentatnode}

```javascript
ReactDOM.unmountComponentAtNode(container)
```

Usuwa zamontowany komponent z drzewa DOM, usuwając jego stan i procedury obsługi zdarzeń. Jeśli we wskazanym kontenerze nie zamontowano jeszcze żadnego elementu, wywoływanie tej funkcji nie daje żadnego efektu. Zwraca `true`, jeśli komponent został odmontowany lub `false`, jeśli kontener był pusty.

* * *

### `findDOMNode()` {#finddomnode}

> Uwaga:
>
> `findDOMNode` jest swego rodzaju "wyjściem awaryjnym", za pomocą którego możemy uzyskać dostęp do szukanego węzła DOM. Odradzamy korzystania z tej funkcji, ponieważ zaburza ona abstrakcję struktury komponentów. [Została wycofana w `StrictMode`.](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)

```javascript
ReactDOM.findDOMNode(component)
```
Jeśli wskazany komponent został zamontowany w drzewie DOM, funkcja zwróci odpowiadający mu natywny element DOM. Przydaje się do odczytywania wartości z drzewa DOM, np. danych z pól formularza lub wymiarów interfejsu. **W większości przypadków wystarczy jednak "podpiąć" się do węzła DOM za pomocą właściwości `ref`, całkowicie unikając stosowania funkcji `findDOMNode`.**

Jeśli komponent renderuje `null` lub `false`, `findDOMNode` zwróci `null`. Jeśli renderuje ciąg znaków, `findDOMNode` zwróci tekst danego węzła DOM. Od Reakta w wersji 16 w górę komponenty mogą również zwracać tzw. fragmenty, zawierające kilku potomków. W takim przypadku `findDOMNode` zwróci węzeł DOM odpowiadający pierwszemu niepustemu potomkowi.

> Uwaga:
>
> `findDOMNode` działa tylko na zamontowanych komponentach (czyli takich, które zostały umieszczone w drzewie DOM). Jeśli spróbujesz wywołać tę funkcję na niezamontowanym komponencie (np. jeśli wywołasz `findDOMNode()` w metodzie `render` komponentu, który jeszcze nie został utworzony), zostanie zgłoszony wyjątek.
>
> `findDOMNode` nie może być używane w komponentach funkcyjnych.

* * *

### `createPortal()` {#createportal}

```javascript
ReactDOM.createPortal(child, container)
```

Tworzy portal. Portale pozwalają na [renderowanie do węzła DOM potomków znajdujących się poza hierarchią danego komponentu](/docs/portals.html).
