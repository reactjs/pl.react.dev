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

- [`renderToPipeableStream()`](#rendertopipeablestream)
- [`renderToReadableStream()`](#rendertoreadablestream)
- [`renderToNodeStream()`](#rendertonodestream) (Deprecated)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## Dokumentacja {#reference}

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

Renderuje reactowy element do jego początkowego kodu HTML, zwracając go w formie ciągu znaków. Możesz użyć tej metody, aby wygenerować kod HTML po stronie serwera, a następnie wysłać znaczniki jako odpowiedzi na pierwsze żądanie, aby przyspieszyć ładowanie strony i umożliwić wyszukiwarkom indeksowanie jej w celach SEO.

<<<<<<< HEAD
Jeśli wywołasz metodę [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) na węźle, który zawiera już znaczniki wyrenderowane po stronie serwera, React zachowa je i dołączy jedynie procedury obsługi zdarzeń. Poprawi to wydajność i wrażenia przy pierwszym ładowaniu strony.
=======
If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

Działa analogicznie do [`renderToString`](#rendertostring) z tą różnicą, że nie tworzy dodatkowych atrybutów DOM, takich jak `data-reactroot` (używanych wewnętrznie przez Reacta). Przydaje się, jeśli chcesz używać Reacta jako prostego generatora statycznych stron, gdzie usunięcie dodatkowych atrybutów pozwoli zaoszczędzić kilka bajtów.

<<<<<<< HEAD
Jeżeli planujesz używać Reacta po stronie klienta w celu dodania znacznikom interaktywności, nie używaj tej metody. Zamiast niej użyj [`renderToString`](#rendertostring) na serwerze i [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) po stronie klienta.
=======
If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToString`](#rendertostring) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

* * *

### `renderToPipeableStream()` {#rendertopipeablestream}

```javascript
ReactDOMServer.renderToPipeableStream(element, options)
```

Render a React element to its initial HTML. Returns a [Control object](https://github.com/facebook/react/blob/3f8990898309c61c817fbf663f5221d9a00d0eaa/packages/react-dom/src/server/ReactDOMFizzServerNode.js#L49-L54) that allows you to pipe the output or abort the request. Fully supports Suspense and streaming of HTML with "delayed" content blocks "popping in" later through javascript execution. [Read more](https://github.com/reactwg/react-18/discussions/37)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

> Note:
>
> This is a Node.js specific API and modern server environments should use renderToReadableStream instead.
>

```
const {pipe, abort} = renderToPipeableStream(
  <App />,
  {
    onAllReady() {
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      pipe(res);
    },
    onShellError(x) {
      res.statusCode = 500;
      res.send(
        '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
      );
    }
  }
);
```

* * *

### `renderToReadableStream()` {#rendertoreadablestream}

```javascript
    ReactDOMServer.renderToReadableStream(element, options);
```

Streams a React element to its initial HTML. Returns a [Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream). Fully supports Suspense and streaming of HTML. [Read more](https://github.com/reactwg/react-18/discussions/127)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

```
let controller = new AbortController();
try {
  let stream = await renderToReadableStream(
    <html>
      <body>Success</body>
    </html>,
    {
      signal: controller.signal,
    }
  );
  
  // This is to wait for all suspense boundaries to be ready. You can uncomment
  // this line if you don't want to stream to the client
  // await stream.allReady;

  return new Response(stream, {
    headers: {'Content-Type': 'text/html'},
  });
} catch (error) {
  return new Response(
    '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>',
    {
      status: 500,
      headers: {'Content-Type': 'text/html'},
    }
  );
}
```
* * *

### `renderToNodeStream()` {#rendertonodestream} (Deprecated)

```javascript
ReactDOMServer.renderToNodeStream(element)
```

Renderuje reactowy element do jego początkowego kodu HTML. Zwraca [strumień do odczytu](https://nodejs.org/api/stream.html#stream_readable_streams), który na wyjściu zwróci ciąg znaków HTML. Zwrócony przez strumień kod HTML jest identyczny z tym, co zwróciłaby funkcja [`ReactDOMServer.renderToString`](#rendertostring). Możesz użyć tej metody, aby wygenerować kod HTML po stronie serwera, a następnie wysłać znaczniki jako odpowiedź na pierwsze żądanie, co pozwoli przyspieszyć ładowanie strony i umożliwić wyszukiwarkom indeksowanie jej w celach SEO.

<<<<<<< HEAD
Jeśli wywołasz metodę [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) na węźle, który zawiera już znaczniki wyrenderowane po stronie serwera, React zachowa je i dołączy jedynie procedury obsługi zdarzeń. Poprawi to wydajność i wrażenia przy pierwszym ładowaniu strony.
=======
If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

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

<<<<<<< HEAD
Jeżeli planujesz używać Reacta po stronie klienta w celu dodania znacznikom interaktywności, nie używaj tej metody. Zamiast niej użyj [`renderToNodeStream`](#rendertonodestream) na serwerze i [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) po stronie klienta.
=======
If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToNodeStream`](#rendertonodestream) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

> Uwaga:
>
> Do użycia tylko po stronie serwera. Ten interfejs API nie jest dostępny w przeglądarce.
>
> Strumień zwrócony przez tę metodę zwróci strumień bajtów zakodowany w utf-8. Jeśli potrzebujesz strumienia z innym kodowaniem, skorzystaj na przykład z paczki [iconv-lite](https://www.npmjs.com/package/iconv-lite), która dostarcza strumienie transformujące do transkodowania tekstu.
