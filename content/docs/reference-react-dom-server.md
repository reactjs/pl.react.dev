---
id: react-dom-server
title: ReactDOMServer
layout: docs
category: Reference
permalink: docs/react-dom-server.html
---

Obiekt `ReactDOMServer` pozwala na renderowanie komponentów do statycznych znaczników. Zazwyczaj jest używany na serwerze Node:

```js
// ES modules
import ReactDOMServer from 'react-dom/server';
// CommonJS
var ReactDOMServer = require('react-dom/server');
```

## Ogólne informacje {#overview}

Następujące metody mogą zostać użyte zarówno na serwerze, jak i w przeglądarce:

- [`renderToString()`](#rendertostring)
- [`renderToStaticMarkup()`](#rendertostaticmarkup)

Kolejne metody zależą od pakietu (`stream`), który **jest dostępny tylko na serwerze** i nie zadziałają w przeglądarce.

- [`renderToNodeStream()`](#rendertonodestream)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## Dokumentacja {#reference}

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

Renderuje reactowy element do jego początkowego kodu HTML. React zwróci ciąg znaków HTML. Możesz użyć tej metody do wygenerowania kodu HTML po stronie serwera, a następnie odesłania znaczników, jako odpowiedzi na początkowe zapytanie, aby przyśpieszyć ładowanie strony i umożliwić wyszukiwarkom indeksowania stron w celach SEO.

Jeśli wywołasz metodę [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) na węźle, który zawiera już znaczniki wyrenderowane po stronie serwera, React zachowa je i dołączy jedynie procedury obsługi zdarzeń. Co poprawi wydajność i wrażenia z pierwszego ładowania.

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

Działa analogicznie do [`renderToString`](#rendertostring), z tą różnicą, że nie tworzy dodatkowych atrybutów DOM, których React używa wewnętrznie, takich jak` data-reactroot`. Jest to przydatne jeżeli chcesz używać Reacta, jako prostego generatora statycznych stron, gdzie usunięcie dodatkowych atrybutów pozwoli zaoszczędzić kilka bajtów.

Jeżeli planujesz używać Reacta po stronie klienta aby dodać znacznikom interaktywności nie używaj tej metody. Zamiast tego użyj [`renderToString`](#rendertostring) na serwerze i [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) po stronie klienta.

* * *

### `renderToNodeStream()` {#rendertonodestream}

```javascript
ReactDOMServer.renderToNodeStream(element)
```

Renderuje reactowy element do jego początkowego kodu HTML. Zwraca [strumień do odczytu](https://nodejs.org/api/stream.html#stream_readable_streams), który na wyjściu zwróci ciąg znaków HTML. Zwrócony przez strumień kod HTML jest identyczny do tego, co zwróciłoby [`ReactDOMServer.renderToString`](#rendertostring). Możesz użyć tej metody do wygenerowania kodu HTML po stronie serwera, a następnie odesłania znaczników, jako odpowiedzi na początkowe zapytanie, aby przyśpieszyć ładowanie strony i umożliwić wyszukiwarkom indeksowania stron w celach SEO.

Jeśli wywołasz metodę [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) na węźle, który zawiera już znaczniki wyrenderowane po stronie serwera, React zachowa je i dołączy jedynie procedury obsługi zdarzeń. Co poprawi wydajność i wrażenia z pierwszego ładowania.

> Uwaga:
>
> Do użycia tylko po stronie serwera. Ten interfejs API nie jest dostępny w przeglądarce.
>
> Strumień zwrócony z tej metody zwróci strumień bajtów zakodowany w utf-8. Jeśli potrzebujesz strumienia w innym kodowaniu, sprawdź projekt taki jak [iconv-lite](https://www.npmjs.com/package/iconv-lite), który dostarcza strumienie transformacji do transkodowania tekstu.

* * *

### `renderToStaticNodeStream()` {#rendertostaticnodestream}

```javascript
ReactDOMServer.renderToStaticNodeStream(element)
```

Działa analogicznie do [`renderToNodeStream`](#rendertonodestream), z tą różnicą, że nie tworzy dodatkowych atrybutów DOM, których React używa wewnętrznie, takich jak` data-reactroot`. Jest to przydatne jeżeli chcesz używać Reacta, jako prostego generatora statycznych stron, gdzie usunięcie dodatkowych atrybutów pozwoli zaoszczędzić kilka bajtów.

Zwrócony przez strumień kod HTML jest identyczny do tego, co zwróciłoby [`ReactDOMServer.renderToStaticMarkup`](#rendertostaticmarkup).

Jeżeli planujesz używać Reacta po stronie klienta aby dodać znacznikom interaktywności nie używaj tej metody. Zamiast tego użyj [`renderToNodeStream`](#rendertonodestream) na serwerze i [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) po stronie klienta.

> Uwaga:
>
> Do użycia tylko po stronie serwera. Ten interfejs API nie jest dostępny w przeglądarce.
>
> Strumień zwrócony z tej metody zwróci strumień bajtów zakodowany w utf-8. Jeśli potrzebujesz strumienia w innym kodowaniu, sprawdź projekt taki jak [iconv-lite](https://www.npmjs.com/package/iconv-lite), który dostarcza strumienie transformacji do transkodowania tekstu.
