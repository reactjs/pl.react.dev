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
Następujące metody mogą zostać użyte zarówno na serwerze, jak i w przeglądarce:
=======
These methods are only available in the **environments with [Node.js Streams](https://nodejs.dev/learn/nodejs-streams):**

- [`renderToPipeableStream()`](#rendertopipeablestream)
- [`renderToNodeStream()`](#rendertonodestream) (Deprecated)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

These methods are only available in the **environments with [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)** (this includes browsers, Deno, and some modern edge runtimes):

- [`renderToReadableStream()`](#rendertoreadablestream)

The following methods can be used in the environments that don't support streams:
>>>>>>> 84ad3308338e2bb819f4f24fa8e9dfeeffaa970b

- [`renderToString()`](#rendertostring)
- [`renderToStaticMarkup()`](#rendertostaticmarkup)

<<<<<<< HEAD
Kolejne metody zależą od pakietu (`stream`), który **dostępny jest tylko na serwerze**, i nie zadziałają w przeglądarce.

- [`renderToPipeableStream()`](#rendertopipeablestream)
- [`renderToReadableStream()`](#rendertoreadablestream)
- [`renderToNodeStream()`](#rendertonodestream) (Przestażałe)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## Dokumentacja {#reference}

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

Renderuje reactowy element do jego początkowego kodu HTML, zwracając go w formie ciągu znaków. Możesz użyć tej metody, aby wygenerować kod HTML po stronie serwera, a następnie wysłać znaczniki jako odpowiedzi na pierwsze żądanie, aby przyspieszyć ładowanie strony i umożliwić wyszukiwarkom indeksowanie jej w celach SEO.

Jeśli wywołasz metodę [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) na węźle, który zawiera już znaczniki wyrenderowane po stronie serwera, React zachowa je i dołączy jedynie procedury obsługi zdarzeń. Poprawi to wydajność i wrażenia przy pierwszym ładowaniu strony.

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

Działa analogicznie do [`renderToString`](#rendertostring) z tą różnicą, że nie tworzy dodatkowych atrybutów DOM, takich jak `data-reactroot` (używanych wewnętrznie przez Reacta). Przydaje się, jeśli chcesz używać Reacta jako prostego generatora statycznych stron, gdzie usunięcie dodatkowych atrybutów pozwoli zaoszczędzić kilka bajtów.

Jeżeli planujesz używać Reacta po stronie klienta w celu dodania znacznikom interaktywności, nie używaj tej metody. Zamiast niej użyj [`renderToString`](#rendertostring) na serwerze i [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) po stronie klienta.

* * *

=======
## Reference {#reference}

>>>>>>> 84ad3308338e2bb819f4f24fa8e9dfeeffaa970b
### `renderToPipeableStream()` {#rendertopipeablestream}

```javascript
ReactDOMServer.renderToPipeableStream(element, options)
```

Render a React element to its initial HTML. Returns a stream with a `pipe(res)` method to pipe the output and `abort()` to abort the request. Fully supports Suspense and streaming of HTML with "delayed" content blocks "popping in" via inline `<script>` tags later. [Read more](https://github.com/reactwg/react-18/discussions/37)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

```javascript
let didError = false;
const stream = renderToPipeableStream(
  <App />,
  {
    onShellReady() {
      // The content above all Suspense boundaries is ready.
      // If something errored before we started streaming, we set the error code appropriately.
      res.statusCode = didError ? 500 : 200;
      res.setHeader('Content-type', 'text/html');
      stream.pipe(res);
    },
    onShellError(error) {
      // Something errored before we could complete the shell so we emit an alternative shell.
      res.statusCode = 500;
      res.send(
        '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
      );
    },
    onAllReady() {
      // If you don't want streaming, use this instead of onShellReady.
      // This will fire after the entire page content is ready.
      // You can use this for crawlers or static generation.

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

See the [full list of options](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-dom/src/server/ReactDOMFizzServerNode.js#L36-L46).

> Note:
>
> This is a Node.js-specific API. Environments with [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API), like Deno and modern edge runtimes, should use [`renderToReadableStream`](#rendertoreadablestream) instead.
>

* * *

### `renderToReadableStream()` {#rendertoreadablestream}

```javascript
ReactDOMServer.renderToReadableStream(element, options);
```

Streams a React element to its initial HTML. Returns a Promise that resolves to a [Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream). Fully supports Suspense and streaming of HTML. [Read more](https://github.com/reactwg/react-18/discussions/127)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

```javascript
let controller = new AbortController();
let didError = false;
try {
  let stream = await renderToReadableStream(
    <html>
      <body>Success</body>
    </html>,
    {
      signal: controller.signal,
      onError(error) {
        didError = true;
        console.error(error);
      }
    }
  );
  
  // This is to wait for all Suspense boundaries to be ready. You can uncomment
  // this line if you want to buffer the entire HTML instead of streaming it.
  // You can use this for crawlers or static generation:

  // await stream.allReady;

  return new Response(stream, {
    status: didError ? 500 : 200,
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

See the [full list of options](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-dom/src/server/ReactDOMFizzServerBrowser.js#L27-L35).

> Note:
>
> This API depends on [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API). For Node.js, use [`renderToPipeableStream`](#rendertopipeablestream) instead.
>

* * *

<<<<<<< HEAD
### `renderToNodeStream()` {#rendertonodestream} (Przestażałe)
=======
### `renderToNodeStream()`  (Deprecated) {#rendertonodestream}
>>>>>>> 84ad3308338e2bb819f4f24fa8e9dfeeffaa970b

```javascript
ReactDOMServer.renderToNodeStream(element)
```

<<<<<<< HEAD
Renderuje reactowy element do jego początkowego kodu HTML. Zwraca [strumień do odczytu](https://nodejs.org/api/stream.html#stream_readable_streams), który na wyjściu zwróci ciąg znaków HTML. Zwrócony przez strumień kod HTML jest identyczny z tym, co zwróciłaby funkcja [`ReactDOMServer.renderToString`](#rendertostring). Możesz użyć tej metody, aby wygenerować kod HTML po stronie serwera, a następnie wysłać znaczniki jako odpowiedź na pierwsze żądanie, co pozwoli przyspieszyć ładowanie strony i umożliwić wyszukiwarkom indeksowanie jej w celach SEO.
=======
Render a React element to its initial HTML. Returns a [Node.js Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) that outputs an HTML string. The HTML output by this stream is exactly equal to what [`ReactDOMServer.renderToString`](#rendertostring) would return. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes.
>>>>>>> 84ad3308338e2bb819f4f24fa8e9dfeeffaa970b

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
<<<<<<< HEAD
> Strumień zwrócony przez tę metodę zwróci strumień bajtów zakodowany w utf-8. Jeśli potrzebujesz strumienia z innym kodowaniem, skorzystaj na przykład z paczki [iconv-lite](https://www.npmjs.com/package/iconv-lite), która dostarcza strumienie transformujące do transkodowania tekstu.
=======
> The stream returned from this method will return a byte stream encoded in utf-8. If you need a stream in another encoding, take a look at a project like [iconv-lite](https://www.npmjs.com/package/iconv-lite), which provides transform streams for transcoding text.

* * *

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

Render a React element to its initial HTML. React will return an HTML string. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes.

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

> Note
>
> This API has limited Suspense support and does not support streaming.
>
> On the server, it is recommended to use either [`renderToPipeableStream`](#rendertopipeablestream) (for Node.js) or [`renderToReadableStream`](#rendertoreadablestream) (for Web Streams) instead.

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

Similar to [`renderToString`](#rendertostring), except this doesn't create extra DOM attributes that React uses internally, such as `data-reactroot`. This is useful if you want to use React as a simple static page generator, as stripping away the extra attributes can save some bytes.

If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToString`](#rendertostring) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 84ad3308338e2bb819f4f24fa8e9dfeeffaa970b
