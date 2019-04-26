---
id: react-dom-server
title: ReactDOMServer
layout: docs
category: Reference
permalink: docs/react-dom-server.html
---

Obiekt `ReactDOMServer` pozwala na renderowanie komponentów do statycznych znaczników. Zazwyczaj jest używany na serwerze Node'owym:

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

Kolejne metody zależą od pakietu (`stream`), który **dostępny jest tylko na serwerze**, i nie zadziałają w przeglądarce.

- [`renderToNodeStream()`](#rendertonodestream)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## Dokumentacja {#reference}

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

Renderuje reactowy element do jego początkowego kodu HTML, zwracając go w formie ciągu znaków. Możesz użyć tej metody, aby wygenerować kod HTML po stronie serwera, a następnie wysłać znaczniki jako odpowiedzi na pierwsze żądanie, aby przyspieszyć ładowanie strony i umożliwić wyszukiwarkom indeksowanie jej w celach SEO.

Jeśli wywołasz metodę [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) na węźle, który zawiera już znaczniki wyrenderowane po stronie serwera, React zachowa je i dołączy jedynie procedury obsługi zdarzeń. Poprawi to wydajność i wrażenia przy pierwszym ładowaniu strony.

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

Działa analogicznie do [`renderToString`](#rendertostring) z tą różnicą, że nie tworzy dodatkowych atrybutów DOM, takich jak `data-reactroot` (używanych wewnętrznie przez Reacta). Przydaje się, jeśli chcesz używać Reacta jako prostego generatora statycznych stron, gdzie usunięcie dodatkowych atrybutów pozwoli zaoszczędzić kilka bajtów.

Jeżeli planujesz używać Reacta po stronie klienta w celu dodania znacznikom interaktywności, nie używaj tej metody. Zamiast niej użyj [`renderToString`](#rendertostring) na serwerze i [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) po stronie klienta.

* * *

### `renderToNodeStream()` {#rendertonodestream}

```javascript
ReactDOMServer.renderToNodeStream(element)
```

Renderuje reactowy element do jego początkowego kodu HTML. Zwraca [strumień do odczytu](https://nodejs.org/api/stream.html#stream_readable_streams), który na wyjściu zwróci ciąg znaków HTML. Zwrócony przez strumień kod HTML jest identyczny z tym, co zwróciłaby funkcja [`ReactDOMServer.renderToString`](#rendertostring). Możesz użyć tej metody, aby wygenerować kod HTML po stronie serwera, a następnie wysłać znaczniki jako odpowiedź na pierwsze żądanie, co pozwoli przyspieszyć ładowanie strony i umożliwić wyszukiwarkom indeksowanie jej w celach SEO.

Jeśli wywołasz metodę [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) na węźle, który zawiera już znaczniki wyrenderowane po stronie serwera, React zachowa je i dołączy jedynie procedury obsługi zdarzeń. Poprawi to wydajność i wrażenia przy pierwszym ładowaniu strony.

> Uwaga:
>
> Do użycia tylko po stronie serwera. Ten interfejs API nie jest dostępny w przeglądarce.
>
> Strumień zwrócony przez tę metodę zwróci strumień bajtów zakodowany w utf-8. Jeśli potrzebujesz strumienia z innym kodowaniem, skorzystaj na przykład z paczki [iconv-lite](https://www.npmjs.com/package/iconv-lite), która dostarcza strumienie transformujące do transkodowania tekstu.

* * *

### `renderToStaticNodeStream()` {#rendertostaticnodestream}

```javascript
ReactDOMServer.renderToStaticNodeStream(element)
```

Działa analogicznie do [`renderToNodeStream`](#rendertonodestream), z tą różnicą, że nie tworzy dodatkowych atrybutów DOM, takich jak` data-reactroot` (używanych wewnętrznie przez Reacta). Przydaje się, jeśli chcesz używać Reacta jako prostego generatora statycznych stron, gdzie usunięcie dodatkowych atrybutów pozwoli zaoszczędzić kilka bajtów.

Zwrócony przez strumień kod HTML jest identyczny z tym, co zwróciłoby [`ReactDOMServer.renderToStaticMarkup`](#rendertostaticmarkup).

Jeżeli planujesz używać Reacta po stronie klienta aby dodać znacznikom interaktywności nie używaj tej metody. Zamiast tego użyj [`renderToNodeStream`](#rendertonodestream) na serwerze i [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) po stronie klienta.

> Uwaga:
>
> Do użycia tylko po stronie serwera. Ten interfejs API nie jest dostępny w przeglądarce.
>
> Strumień zwrócony z tej metody zwróci strumień bajtów zakodowany w utf-8. Jeśli potrzebujesz strumienia w innym kodowaniu, sprawdź projekt taki jak [iconv-lite](https://www.npmjs.com/package/iconv-lite), który dostarcza strumienie transformacji do transkodowania tekstu.
