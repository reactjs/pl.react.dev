---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

Pakiet `react-dom` udostępnia metody specyficzne dla DOM, które mogą być używane na najwyższym poziomie aplikacji i, w razie potrzeby, jako "wyjście awaryjne" poza model Reacta.

```js
import * as ReactDOM from 'react-dom';
```

If you use ES5 with npm, you can write:

```js
var ReactDOM = require('react-dom');
```

Pakiet `react-dom` dostarcza również moduły właściwe dla aplikacji klienckich i serwerowych:
- [`react-dom/client`](/docs/react-dom-client.html)
- [`react-dom/server`](/docs/react-dom-server.html)

## Informacje ogólne {#overview}

Pakiet `react-dom` eksportuje:
- [`createPortal()`](#createportal)
- [`flushSync()`](#flushsync)

These `react-dom` methods are also exported, but are considered legacy:
- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`findDOMNode()`](#finddomnode)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)

> Note: 
> 
> Both `render` and `hydrate` have been replaced with new [client methods](/docs/react-dom-client.html) in React 18. These methods will warn that your app will behave as if it's running React 17 (learn more [here](https://reactjs.org/link/switch-to-createroot)).

### Wsparcie dla przeglądarek {#browser-support}

React wspiera wszystkie popularne przeglądarki, jednak dla starszych wersji [wymagane są niektóre łatki](/docs/javascript-environment-requirements.html) (ang. _polyfills_).

> Uwaga
>
> Nie wspieramy starszych przeglądarek, które nie obsługują metod ze standardu ES5 lub mikrozadań, takich jak Internet Explorer. Twoja aplikacja może zadziałać na nich, jeśli użyjesz odpowiednich łatek, jak na przykład [es5-shim i es5-sham](https://github.com/es-shims/es5-shim). Pamiętaj jednak, że pójście tą drogą skazuje cię na całkowitą samodzielność.

## Dokumentacja {#reference}

### `createPortal()` {#createportal}

```javascript
createPortal(child, container)
```

Tworzy portal. Portale umożliwiają [renderowanie elementów do węzła DOM istniejącego poza hierarchią danego komponentu](/docs/portals.html) .

### `flushSync()` {#flushsync}

```javascript
flushSync(callback)
```

Wymusza synchroniczne wykonanie wszelkich aktualizacji zawartych wewnątrz przekazanej funkcji. Metoda ta jest przydatna, gdy chcemy mieć natychmiastowy dostęp do wyników tych aktualizacji.

```javascript
// Spraw, żeby ta zmiana stanu była synchroniczna.
flushSync(() => {
  setCount(count + 1);
});
// W tym miejscu stan jest już zaktualizowany.
```

> Uwaga:
> 
> `flushSync` może mieć znaczący wpływ na wydajność aplikacji. Używaj z rozwagą.
> 
> `flushSync` może wymusić na granicach zawieszenia (ang. *Suspense boundaries*), aby wyświetliły swój komponent zastępczy (ang. *fallback*).
> 
> `flushSync` przed zakończeniem swojego działania może wymusić wywołanie efektów i sychroniczne zaaplikowanie wszelkich zmian z nimi związanych.
> 
> `flushSync` może również wymusić aktualizacje spoza przekazanej funkcji. Na przykład, jeśli aktualnie przetwarzane są jakieś aktualizacje z kliknięcia na ekranie, React może również je wymusić zanim przejdzie do aktualizacji z przekazanej funkcji.

## Przestarzałe funkcjonalności {#legacy-reference}
### `render()` {#render}
```javascript
render(element, container[, callback])
```

> Uwaga:
>
> W wersji React 18, `render` zostało zastąpione przez `createRoot`. Aby dowiedzieć się więcej, przeczytaj sekcję o [createRoot](/docs/react-dom-client.html#createroot).

Renderuje element reactowy do podanego kontenera w drzewie DOM i zwraca [referencję](/docs/more-about-refs.html) do komponentu (lub zwraca `null` dla [komponentów bezstanowych](/docs/components-and-props.html#function-and-class-components)).

Jeśli element reactowy był już wcześniej renderowany do kontenera `container`, zostanie on automatycznie zaktualizowany przez Reacta, który odpowiednio zmodyfikuje DOM tak, aby odzwierciedlić najnowszą wersję komponentu.

Jeśli w argumencie `callback` przekażesz funkcję zwrotną, zostanie ona wywołana po wyrenderowaniu lub zaktualizowaniu komponentu.

> Uwaga:
>
> `render()` kontroluje zawartość podanego węzła kontenera. Po pierwszym wywołaniu zastępowane są wszystkie elementy DOM wewnątrz niego. Każde kolejne wywołania, z pomocą reactowego algorytmu różnicującego, efektywnie aktualizują drzewo.
>
> `render()` nie modyfikuje węzła kontenera (jedynie jego elementy potomne). Możliwe jest wstawienie komponentu do istniejącego węzła DOM bez nadpisywania istniejących elementów podrzędnych.
>
> `render()` obecnie zwraca referencję do instancji klasy `ReactComponent`, będącej korzeniem drzewa. Jednak używanie tej referencji jest uznawane za przestarzałą praktykę
> i należy jej unikać, ponieważ przyszłe wersje Reacta mogą w niektórych przypadkach renderować komponenty asynchronicznie. Jeśli potrzebujesz referencji do instancji korzenia, sugerujemy przekazanie do niego
> [referencyjnej funkcji zwrotnej](/docs/refs-and-the-dom.html#callback-refs).
>
<<<<<<< HEAD
> Używanie `render()` do hydratacji (ang. _hydrating_) kontenera renderowanego po stronie serwera jest przestarzałą praktyką i zostanie uniemożliwione w Reakcie 17. Zamiast tego użyj funkcji [`hydrate()`](#hydrate).
=======
> Using `render()` to hydrate a server-rendered container is deprecated. Use [`hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) instead.
>>>>>>> 37cf98d075de3133b5ae69fe80fbecb6a742530a

---

### `hydrate()` {#hydrate}

```javascript
hydrate(element, container[, callback])
```

> Uwaga:
>
> W Reakcie 18 funkcja `hydrate` została zastąpiona przez `hydrateRoot`. Aby dowiedzieć się więcej, przeczytaj sekcję o [hydrateRoot](/docs/react-dom-client.html#hydrateroot).

Działa podobnie do funkcji [`render()`](#render), ale służy do odtworzenia kontenera, którego struktura HTML została wyrenderowana przez [`ReactDOMServer`](/docs/react-dom-server.html). React podejmie próbę dołączenia detektorów zdarzeń do istniejących elementów.

React oczekuje, że renderowana treść będzie identyczna między serwerem a klientem. Potrafi, co prawda, poprawić różnice w treści tekstu, ale należy traktować niedopasowania jako błędy i zawsze je naprawiać. W trybie deweloperskim React ostrzega przed niedopasowaniem podczas procesu odtwarzania struktury. Nie ma gwarancji, że różnice w atrybutach zostaną odpowiednio poprawione w przypadku niedopasowania. Jest to ważne ze względu na wydajność, ponieważ w większości aplikacji niedopasowania są rzadkie, a zatem sprawdzenie wszystkich znaczników byłoby zbyt kosztowne obliczeniowo.

Jeśli któryś z atrybutów elementu lub treść tekstu intencjonalnie różnią się między serwerem a klientem (jak w przypadku znacznika czasu), możesz wyłączyć ostrzeżenie, dodając do elementu atrybut `suppressHydrationWarning={true}`. Działa to tylko na tym konkretnym elemencie i jest swego rodzaju "wyjściem awaryjnym". Nie nadużywaj go. O ile nie jest to treść tekstowa, React nie będzie próbował na siłę nanosić poprawek, więc wartość może pozostać niespójna do momentu jej kolejnej aktualizacji.

Jeśli potrzebujesz celowo renderować coś innego po stronie serwera i klienta, możesz wykonać renderowanie dwuprzebiegowe. Komponenty, które renderują coś innego po stronie klienta, mogą bazować na zmiennej stanu, np. `this.state.isClient`, którą można ustawić na `true` w metodzie `componentDidMount()`. W ten sposób początkowe renderowania zwróci tę samą zawartość co serwer, unikając niedopasowania. Jednak zaraz po odtworzeniu struktury w sposób synchroniczny nastąpi dodatkowe renderowanie. Zauważ, że to podejście spowolni działanie komponentów, ponieważ będą musiały być renderowane dwukrotnie - dlatego używaj go z rozwagą.

Pamiętaj, aby zwrócić uwagę na tzw. "user experience" użytkowników z wolnym połączeniem internetowym. Kod javascriptowy może załadować się znacznie później niż nastąpi pierwsze renderowanie kodu HTML. Z tego powodu, jeśli wyrenderujesz coś innego podczas przebiegu po stronie klienta, strona może się "przycinać". Możliwe, że w tej sytuacji pomoże wyrenderowanie "powłoki" (ang. _shell_) aplikacji po stronie serwera, a w kliencie wyświetlenie jedynie dodatkowych widgetów. Aby dowiedzieć się, jak to zrobić, nie napotykając problemów związanych z niedopasowaniem znaczników, zapoznaj się z wyjaśnieniem zawartym w poprzednim akapicie.

---

### `unmountComponentAtNode()` {#unmountcomponentatnode}

```javascript
unmountComponentAtNode(container);
```

> Uwaga:
>
> W Reakcie 18 funkcja `unmountComponentAtNode` została zastąpiona przez `root.unmount()`. Aby dowiedzieć się więcej, przeczytaj sekcję o [createRoot](/docs/react-dom-client.html#createroot).

Usuwa zamontowany komponent z drzewa DOM, usuwając jego stan i procedury obsługi zdarzeń. Jeśli we wskazanym kontenerze nie zamontowano jeszcze żadnego elementu, wywoływanie tej funkcji nie daje żadnego efektu. Zwraca `true`, jeśli komponent został odmontowany lub `false`, jeśli kontener był pusty.

---

### `findDOMNode()` {#finddomnode}

> Uwaga:
>
> `findDOMNode` jest swego rodzaju "wyjściem awaryjnym", za pomocą którego możemy uzyskać dostęp do szukanego węzła DOM. Odradzamy korzystania z tej funkcji, ponieważ zaburza ona abstrakcję struktury komponentów. [Została wycofana w `StrictMode`.](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)

```javascript
findDOMNode(component)
```

Jeśli wskazany komponent został zamontowany w drzewie DOM, funkcja zwróci odpowiadający mu natywny element DOM. Przydaje się do odczytywania wartości z drzewa DOM, np. danych z pól formularza lub wymiarów interfejsu. **W większości przypadków wystarczy jednak "podpiąć" się do węzła DOM za pomocą właściwości `ref`, całkowicie unikając stosowania funkcji `findDOMNode`.**

Jeśli komponent renderuje `null` lub `false`, `findDOMNode` zwróci `null`. Jeśli renderuje ciąg znaków, `findDOMNode` zwróci tekst danego węzła DOM. Od Reakta w wersji 16 w górę komponenty mogą również zwracać tzw. fragmenty, zawierające kilku potomków. W takim przypadku `findDOMNode` zwróci węzeł DOM odpowiadający pierwszemu niepustemu potomkowi.

> Uwaga:
>
> `findDOMNode` działa tylko na zamontowanych komponentach (czyli takich, które zostały umieszczone w drzewie DOM). Jeśli spróbujesz wywołać tę funkcję na niezamontowanym komponencie (np. jeśli wywołasz `findDOMNode()` w metodzie `render` komponentu, który jeszcze nie został utworzony), zostanie zgłoszony wyjątek.
>
> `findDOMNode` nie może być używane w komponentach funkcyjnych.

* * *
