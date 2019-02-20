---
id: cdn-links
title: Linki do CDN-ów
permalink: docs/cdn-links.html
prev: create-a-new-react-app.html
next: hello-world.html
---

Zarówno React, jak i ReactDOM są dostępne przez CDN.

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

Powyższe wersje są przeznaczone tylko do programowania, nie nadają się na środowiska produkcyjne. Zminifikowane i zoptymalizowane wersje produkcyjne Reacta są dostępne pod adresem:

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

Aby załadować określoną wersję paczki `react` i `react-dom`, zastąp "16" odpowiednim numerem wersji.

### Dlaczego atrybut `crossorigin`? {#why-the-crossorigin-attribute}

Jeśli korzystasz z Reacta z CDN, sugerujemy dodać atrybut [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) ustawiony na:

```html
<script crossorigin src="..."></script>
```

Zalecamy również sprawdzenie, czy CDN, z którego korzystasz, zwraca nagłówek HTTP `Access-Control-Allow-Origin: *`:

![Access-Control-Allow-Origin: *](../images/docs/cdn-cors-header.png)

Umożliwi to lepsza [obsługę błędów](/blog/2017/07/26/error-handling-in-react-16.html) w React 16 i późniejszych wersjach.