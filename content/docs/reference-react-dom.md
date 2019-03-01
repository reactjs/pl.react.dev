---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

Jeśli załadujesz React ze znacznika `<script>`, te interfejsy API najwyższego poziomu są dostępne w globalnym katalogu `ReactDOM`. Jeśli używasz ES6 z npm, możesz napisać `import ReactDOM from 'react-dom'`. Jeśli używasz ES5 z npm, możesz napisać `var ReactDOM = require ('react-dom')`.

## Przegląd {#overview}

Pakiet "react-dom" udostępnia metody specyficzne dla DOM, które mogą być używane na najwyższym poziomie aplikacji i jako kreska ewakuacyjna, aby wyjść poza model React, jeśli zajdzie taka potrzeba. Większość komponentów nie musi używać tego modułu.

- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)
- [`findDOMNode()`](#finddomnode)
- [`createPortal()`](#createportal)

### Obsługa Przeglądarki {#browser-support}

React obsługuje wszystkie popularne przeglądarki, w tym Internet Explorer 9 i nowsze wersje, chociaż [niektóre polyfills są wymagane](/docs/javascript-environment-requirements.html) w starszych przeglądarkach, takich jak IE 9 i IE 10.

> Uwaga
>
>Nie obsługujemy starszych przeglądarek, które nie obsługują metod ES5, ale być może okaże się, że twoje aplikacje działają w starszych przeglądarkach, jeśli używasz takich narzędzi, jak [es5-shim i es5-sham](https://github.com/es-shims/es5-shim) są zawarte na stronie. Jesteś sam, jeśli wybierzesz tę drogę.

* * *

## Odniesienie {#reference}

### `render()` {#render}

```javascript
ReactDOM.render(element, container[, callback])
```

Renderuj element React do DOM w podanym `container` i zwróć [odniesienie](/docs/more-about-refs.html) do komponentu (lub zwróć` null` dla [komponentów bezstanowych](/docs/components-and-props.html#functional-and-class-components)).

Jeśli element React był wcześniej renderowany do `container`, to wykona na nim aktualizację i zmodyfikuje DOM tylko w razie potrzeby, aby odzwierciedlić ostatni element React.

Jeśli dostępne jest opcjonalne wywołanie zwrotne, zostanie ono wykonane po wyrenderowaniu lub zaktualizowaniu komponentu.

> Uwaga:
>
>`ReactDOM.render ()` kontroluje zawartość podanego węzła kontenera. Wszelkie istniejące elementy DOM wewnątrz są wymieniane po pierwszym wywołaniu. Późniejsze wywołania używają algorytmu dyfrakcyjnego DOM React do wydajnych aktualizacji.
>
>`ReactDOM.render ()` nie modyfikuje węzła kontenera (modyfikuje tylko elementy potomne kontenera). Może istnieć możliwość wstawienia komponentu do istniejącego węzła DOM bez nadpisywania istniejących elementów podrzędnych.
>
> `ReactDOM.render ()` obecnie zwraca odwołanie do głównej instancji `ReactComponent`. Jednak użycie tej wartości powrotnej jest starszą wersją
> i należy tego unikać, ponieważ przyszłe wersje React mogą w niektórych przypadkach wyrenderować komponenty asynchronicznie. Jeśli potrzebujesz odniesienia do głównej instancji `ReactComponent`, preferowanym rozwiązaniem jest dołączenie
> [referencyjne wywołanie zwrotne](/docs/more-about-refs.html#the-ref-callback-attribute) do elementu głównego.
>
> Użycie `ReactDOM.render ()` w celu uwodnienia kontenera renderowanego przez serwer jest przestarzałe i zostanie usunięte w React 17. Zamiast tego użyj [`hydrate ()`](#hydrate).

* * *

### `hydrate()` {#hydrate}

```javascript
ReactDOM.hydrate(element, container[, callback])
```

To samo, co [`render ()`](#render), ale służy do uwadniania kontenera, którego treść HTML została wyrenderowana przez [`ReactDOMServer`](/docs/react-dom-server.html). React podejmie próbę dołączenia detektorów zdarzeń do istniejących znaczników.

React oczekuje, że renderowana treść jest identyczna między serwerem a klientem. Może poprawiać różnice w treści tekstu, ale należy traktować niedopasowania jako błędy i naprawiać je. W trybie programowania React ostrzega przed niedopasowaniem podczas nawodnienia. Nie ma gwarancji, że różnice atrybutów zostaną załatane w przypadku niedopasowania. Jest to ważne ze względu na wydajność, ponieważ w większości aplikacji niedopasowania są rzadkie, a zatem sprawdzenie wszystkich znaczników byłoby zbyt drogie.

Jeśli atrybut pojedynczego elementu lub treść tekstu jest nieuchronnie różna między serwerem a klientem (na przykład znacznikiem czasu), możesz wyciszyć ostrzeżenie, dodając do niego element `suppressHydrationWarning={true}`. Działa tylko na jednym poziomie głębokości i ma być lukem ewakuacyjnym. Nie nadużywaj tego. Jeśli nie jest to treść tekstowa, React nadal nie będzie próbował tego poprawiać, więc może pozostać niespójny do przyszłych aktualizacji

Jeśli celowo potrzebujesz renderować coś innego na serwerze i kliencie, możesz wykonać renderowanie dwuprzebiegowe. Komponenty, które renderują coś innego na kliencie, mogą odczytać zmienną stanu, taką jak `this.state.isClient`, którą można ustawić na` true` w `componentDidMount ()`. W ten sposób początkowe przejście renderowania będzie renderować tę samą zawartość co serwer, unikając niedopasowania, ale dodatkowe przejście stanie się synchroniczne zaraz po nawodnieniu. Zauważ, że to podejście spowolni działanie komponentów, ponieważ będą musiały być renderowane dwukrotnie, więc używaj go z rozwagą.

Pamiętaj, aby pamiętać o doświadczeniach użytkowników na wolnych połączeniach. Kod JavaScript może załadować się znacznie później niż początkowy render HTML, więc jeśli renderujesz coś innego w przepustce tylko dla klienta, przejście może być szarpane. Jeśli jednak zostanie dobrze wykonane, może być korzystne renderowanie "powłoki" aplikacji na serwerze i pokazywanie tylko niektórych dodatkowych widżetów na kliencie. Aby dowiedzieć się, jak to zrobić, nie napotykając problemów związanych z niedopasowaniem znaczników, zapoznaj się z wyjaśnieniem w poprzednim akapicie.

* * *

### `unmountComponentAtNode()` {#unmountcomponentatnode}

```javascript
ReactDOM.unmountComponentAtNode(container)
```

Usuń zamontowany komponent React z DOM i wyczyść jego procedury obsługi zdarzeń i stan. Jeśli w kontenerze nie zamontowano żadnego komponentu, wywołanie tej funkcji nic nie da. Zwraca `true`, jeśli komponent został odmontowany i `false`, jeśli nie było komponentu do odmontowania.

* * *

### `findDOMNode()` {#finddomnode}

> Uwaga:
>
> `findDOMNode` to luka ucieczki używana do uzyskania dostępu do podstawowego węzła DOM. W większości przypadków korzystanie z tego luku ewakuacyjnego jest odradzane, ponieważ przenosi abstrakcję składnika. [Został przestarzały w `StrictMode`.](/Docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)

```javascript
ReactDOM.findDOMNode(component)
```
Jeśli komponent ten został zamontowany w DOM, zwraca odpowiedni element DOM przeglądarki rodzimej. Ta metoda jest przydatna do odczytu wartości z DOM, takich jak wartości pól formularza i wykonywanie pomiarów DOM. **W większości przypadków można dołączyć ref do węzła DOM i unikać używania `findDOMNode` w ogóle.**

Kiedy komponent renderuje do `null` lub` false`, `findDOMNode` zwraca` null`. Kiedy komponent renderuje łańcuch, `findDOMNode` zwraca tekst DOM węzeł zawierający tę wartość. Od Reakcji 16 komponent może zwrócić fragment z wieloma potomkami, w którym to przypadku `findDOMNode` zwróci węzeł DOM odpowiadający pierwszemu niepustemu potomkowi.

> Uwaga:
>
> `findDOMNode` działa tylko na zamontowanych komponentach (czyli komponentach, które zostały umieszczone w DOM). Jeśli spróbujesz wywołać to na komponencie, który nie został jeszcze zamontowany (jak wywołanie `findDOMNode ()` w `render ()` na komponencie, który nie został jeszcze utworzony) zostanie zgłoszony wyjątek.
>
> `findDOMNode` nie może być używane w komponentach funkcji.

* * *

### `createPortal()` {#createportal}

```javascript
ReactDOM.createPortal(child, container)
```

Tworzy portal. Portale zapewniają sposób na [renderowanie dzieci do węzła DOM, który istnieje poza hierarchią komponentu DOM](/docs/portals.html).
