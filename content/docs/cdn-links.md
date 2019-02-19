---
id: cdn-links
title: Linki CDN
permalink: docs/cdn-links.html
prev: create-a-new-react-app.html
next: hello-world.html
---

Zarówno React, jak i ReactDOM są dostępne przez CDN.

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

Powyższe wersje są przeznaczone tylko do programowania, nie nadają się na środowiska produkcyjne. Zminifikowane i zoptymalizowane wersje produkcyjne React są dostępne pod adresem:

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

Aby załadować określoną wersje 'react' i 'react-dom', zastąp '16' na numer wersji.

### Dlaczego atrybut 'crossorigin' ? {#why-the-crossorigin-attribute}

Jeśli korzystasz z Reacta z CDN, sugerujemy zachować atrybut ['crossorigin'](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) ustawiony na:

```html
<script crossorigin src="..."></script>
```

Rekomendujemy również sprawdzenie, czy CDN, z którego korzystasz, ustawia 'Access-Control-Allow-Origin: *' w nagłówku HTTP:

![Access-Control-Allow-Origin: *](../images/docs/cdn-cors-header.png)

Umożliwi to lepsza [obsługę błędów](/blog/2017/07/26/error-handling-in-react-16.html) w React 16 i późniejszych wersjach.