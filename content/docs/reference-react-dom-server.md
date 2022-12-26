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
import * as ReactDOMServer from 'react-dom/server';
// CommonJS
var ReactDOMServer = require('react-dom/server');
```

## Ogólne informacje {#overview}

<<<<<<< HEAD
Następujące metody mogą zostać użyte tylko w **środowiskach obsługujących [strumienie Node.js (ang. *Node.js Streams*)](https://nodejs.dev/learn/nodejs-streams):**
=======
These methods are only available in the **environments with [Node.js Streams](https://nodejs.org/api/stream.html):**
>>>>>>> 4b68508440a985598571f78f60637b6dccdd5a1a

- [`renderToPipeableStream()`](#rendertopipeablestream)
- [`renderToNodeStream()`](#rendertonodestream) (przestarzałe)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

Następujące metody mogą być użyte tylko w **środowiskach obsługujących [strumienie webowe (ang. *Web Streams*)](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)** (m.in. przeglądarki, Deno, niektóre nowoczesne wersje Edge):

- [`renderToReadableStream()`](#rendertoreadablestream)

Następujące metody mogą być użyte w środowiskach, które nie obsługują strumieni:

- [`renderToString()`](#rendertostring)
- [`renderToStaticMarkup()`](#rendertostaticmarkup)

## Dokumentacja {#reference}

### `renderToPipeableStream()` {#rendertopipeablestream}

```javascript
ReactDOMServer.renderToPipeableStream(element, options)
```

Renderuje reactowy element do jego początkowego kodu HTML. Zwraca strumień z metodą `pipe(res)` do przekierowania wyniku oraz `abort()` do przerwania żądania. Posiada pełne wsparcie dla zawieszeń (ang. *Suspense*) i strumieniowania kodu HTML o "opóźnionych" blokach treści "wskakujących" jako znaczniki `<script>`. [Czytaj więcej na ten temat](https://github.com/reactwg/react-18/discussions/37)

Jeśli wywołasz metodę [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) na węźle, który zawiera już znaczniki wyrenderowane po stronie serwera, React zachowa je i dołączy jedynie procedury obsługi zdarzeń. Poprawi to wydajność i wrażenia przy pierwszym ładowaniu strony.

```javascript
let didError = false;
const stream = renderToPipeableStream(
  <App />,
  {
    onShellReady() {
      // Treść ponad wszystkimi granicami zawieszeń (ang. *Suspense boundaries*) jest gotowa.
      // Jeśli coś się "wykrzaczyło" przed początkiem strumieniowania, ustawiamy odpowiedni kod błędu.
      res.statusCode = didError ? 500 : 200;
      res.setHeader('Content-type', 'text/html');
      stream.pipe(res);
    },
    onShellError(error) {
      // Coś się "wykrzaczyło", zanim zakończyliśmy powłokę, więc wysyłamy alternatywną powłokę.
      res.statusCode = 500;
      res.send(
        '<!doctype html><p>Ładowanie...</p><script src="clientrender.js"></script>'
      );
    },
    onAllReady() {
      // Jeśli nie potrzebujesz strumieniowania, skorzystaj z tej metody zamiast onShellReady.
      // Zostanie ona wywołana po wygenerowaniu treści całej strony.
      // Można jej użyć w celu dostarczenia treści dla wyszukiwarek lub dla wygenerowania statycznej treści.

      // res.statusCode = didError ? 500 : 200;
      // res.setHeader('Content-type', 'text/html');
      // stream.pipe(res);
    },
    onError(err) {
      didError = true;
      console.error(err);
    },
  }
);
```

Zobacz [pełną listę opcji](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-dom/src/server/ReactDOMFizzServerNode.js#L36-L46).

> Uwaga:
>
> To jest funkcjonalność specyficzna dla Node.js. Środowiska z obsługą [strumieni webowych (ang. *Web Streams*)](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API), jak np. Deno czy współczesne wersje Edge, powinny korzystać z [`renderToReadableStream`](#rendertoreadablestream).
>

* * *

### `renderToReadableStream()` {#rendertoreadablestream}

```javascript
ReactDOMServer.renderToReadableStream(element, options);
```

Strumieniuje reactowy element do jego początkowego kodu HTML. Zwraca obietnicę (ang. *Promise*), która zwraca [strumień do odczytu (ang. *Readable Stream*)](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream). Posiada pełne wsparcie dla zawieszania (ang. *Suspense*) oraz strumieniowania HTML. [Czytaj więcej na ten temat](https://github.com/reactwg/react-18/discussions/127)

Jeśli wywołasz metodę [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) na węźle, który zawiera już znaczniki wyrenderowane po stronie serwera, React zachowa je i dołączy jedynie procedury obsługi zdarzeń. Poprawi to wydajność i wrażenia przy pierwszym ładowaniu strony.

```javascript
let controller = new AbortController();
let didError = false;
try {
  let stream = await renderToReadableStream(
    <html>
      <body>Sukces</body>
    </html>,
    {
      signal: controller.signal,
      onError(error) {
        didError = true;
        console.error(error);
      }
    }
  );
  
  // Można w ten sposób poczekać na zakończenie wszystkich zawieszeń (ang. *Suspense*). Możesz
  // odkomentować tę linię, jeśli chcesz zbuforować cały kod HTML, zamiast go strumieniować.
  // Możesz także użyć tego do przystosowania aplikacji dla wyszukiwarek lub do wygenerowania statycznej treści:

  // await stream.allReady;

  return new Response(stream, {
    status: didError ? 500 : 200,
    headers: {'Content-Type': 'text/html'},
  });
} catch (error) {
  return new Response(
    '<!doctype html><p>Ładowanie...</p><script src="clientrender.js"></script>',
    {
      status: 500,
      headers: {'Content-Type': 'text/html'},
    }
  );
}
```

Zobacz [pełną listę opcji](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-dom/src/server/ReactDOMFizzServerBrowser.js#L27-L35).

> Uwaga:
>
> Ta funkcjonalność jest zależna od [strumienni web (ang. *Web Streams*)](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API). W Node.js użyj [`renderToPipeableStream`](#rendertopipeablestream).
>

* * *

### `renderToNodeStream()` (przestarzałe) {#rendertonodestream}

```javascript
ReactDOMServer.renderToNodeStream(element)
```

Renderuje reactowy element do jego początkowego kodu HTML. Zwraca [strumień Node.js do odczytu](https://nodejs.org/api/stream.html#stream_readable_streams), który na wyjściu zwróci ciąg znaków HTML. Zwrócony przez strumień kod HTML jest identyczny z tym, który zwróciłaby funkcja [`ReactDOMServer.renderToString`](#rendertostring). Możesz użyć tej metody, aby wygenerować kod HTML po stronie serwera, a następnie wysłać znaczniki jako odpowiedź na pierwsze żądanie, co pozwoli przyspieszyć ładowanie strony i umożliwić wyszukiwarkom indeksowanie jej w celach SEO.

Jeśli wywołasz metodę [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) na węźle, który zawiera już znaczniki wyrenderowane po stronie serwera, React zachowa je i dołączy jedynie procedury obsługi zdarzeń. Poprawi to wydajność i wrażenia przy pierwszym ładowaniu strony.

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

Kod HTML zwrócony przez strumień jest identyczny z tym, jaki zwróciłaby funkcja [`ReactDOMServer.renderToStaticMarkup`](#rendertostaticmarkup).

Jeżeli planujesz używać Reacta po stronie klienta w celu dodania znacznikom interaktywności, nie używaj tej metody. Zamiast niej użyj [`renderToNodeStream`](#rendertonodestream) na serwerze i [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) po stronie klienta.

> Uwaga:
>
> Do użycia tylko po stronie serwera. Ten interfejs API nie jest dostępny w przeglądarce.
>
> Strumień zwrócony przez tę metodę zwróci strumień bajtów zakodowany w utf-8. Jeśli potrzebujesz strumienia z innym kodowaniem, skorzystaj na przykład z paczki [iconv-lite](https://www.npmjs.com/package/iconv-lite), która dostarcza strumienie transformujące do transkodowania tekstu.

* * *

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

Renderuje element reactowy do jego początkowego kodu HTML. Zwraca kod HTML w formie tekstowej. Możesz użyć tej metody, aby wygenerować kod HTML po stronie serwera, a następnie wysłać znaczniki jako odpowiedź na pierwsze żądanie, co pozwoli przyspieszyć ładowanie strony i umożliwić wyszukiwarkom indeksowanie jej w celach SEO.

Jeśli wywołasz [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) na węźle, który zawiera już taki kod wyrenderowany po stronie serwera, React zachowa go i jedynie doda do niego procedury obsługi zdarzeń, zapewniając szybkie wstępne ładowanie stronie.

> Uwaga
>
> Ta funkcjonalność na ograniczone wsparcie dla zawieszeń (ang. *Suspense*) i nie obsługuje strumieniowania.
>
> Sugerujemy po stronie serwera korzystać z [`renderToPipeableStream`](#rendertopipeablestream) (dla Node.js) lub [`renderToReadableStream`](#rendertoreadablestream) (dla Web Streams) instead.

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

Działa podobnie do [`renderToString`](#rendertostring), lecz nie tworzy dodatkowych atrybutów DOM, których React potrzebuje do działania, np. `data-reactroot`. Przydaje się, jeśli chcesz użyć Reacta jako prostego generowania statycznych stron, ponieważ usunięcie ich pozwala zaoszczędzić kilka cennych bajtów.

Jeśli planujesz używać Reacta po stronie klienta, aby dodać aplikacji nieco interakcyjności, nie używaj tej metody. Zamiast niej skorzystaj z [`renderToString`](#rendertostring) po stronie serwera, a następnie [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) po stronie klienta.
