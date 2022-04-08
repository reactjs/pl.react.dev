---
id: javascript-environment-requirements
title: Wymagania środowiska JavaScript
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

React 18 wspiera wszystkie nowoczesne przeglądarki (Edge, Firefox, Chrome, Safari itd.).

Jeśli twoja aplikacja wspiera starsze urządzenia i przeglądarki, np. Internet Explorer, które nie dostarczają natywnie funkcjonalności nowoczesnych przeglądarek lub mają niekompatybilne implementacje, rozważ dodanie do swojej paczki globalnych łatek.

Here is a list of the modern features React 18 uses:
- [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

Wybór łatek zależy od twojego środowiska. Dla wielu użytkowników wystarcza skonfigurowanie [Browserlist](https://github.com/browserslist/browserslist). Inni z kolei muszą importować łatki bezpośrednio np. z [`core-js`](https://github.com/zloirock/core-js).
