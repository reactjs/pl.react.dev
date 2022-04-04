---
id: cdn-links
title: Linki do CDN-ów
permalink: docs/cdn-links.html
prev: create-a-new-react-app.html
next: release-channels.html
---

Zarówno React, jak i ReactDOM są dostępne przez CDN.

```html
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```

Powyższe wersje przeznaczone są do uruchamiania na serwerach deweloperskich, nie nadają się natomiast na środowiska produkcyjne. Zminifikowane i zoptymalizowane wersje produkcyjne Reacta są dostępne pod adresem:

```html
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
```

<<<<<<< HEAD
Aby załadować określoną wersję paczki `react` i `react-dom`, zastąp `17` odpowiednim numerem wersji.
=======
To load a specific version of `react` and `react-dom`, replace `18` with the version number.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

### Dlaczego atrybut `crossorigin`? {#why-the-crossorigin-attribute}

Jeśli korzystasz z Reacta z CDN, sugerujemy dodać atrybut [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) ustawiony na:

```html
<script crossorigin src="..."></script>
```

Zalecamy również sprawdzenie, czy CDN, z którego korzystasz, zwraca nagłówek HTTP `Access-Control-Allow-Origin: *`:

![Access-Control-Allow-Origin: *](../images/docs/cdn-cors-header.png)

Umożliwia to lepszą [obsługę błędów](/blog/2017/07/26/error-handling-in-react-16.html) w Reakcie 16 i późniejszych wersjach.