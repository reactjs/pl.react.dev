---
id: javascript-environment-requirements
title: Wymagania środowiska JavaScript
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

<<<<<<< HEAD
React 16 opiera się na typach kolekcji [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) i [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). Jeżeli wspierasz starsze przeglądarki oraz urzadzenia, które mogą jeszcze nie udostępniać ich w sposób natywny (np. IE < 11) lub które posiadają niezgodności implementacyjne (np. IE 11), rozważ dodanie globalnej łatki do swojej aplikacji, korzystając z [core-js](https://github.com/zloirock/core-js).

Środowisko, w którym zastosowano łatki dla Reacta 16 korzystając z core-js, może wyglądać tak:
=======
React 18 supports all modern browsers (Edge, Firefox, Chrome, Safari, etc).

If you support older browsers and devices such as Internet Explorer which do not provide modern browser features natively or have non-compliant implementations, consider including a global polyfill in your bundled application.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

Here is a list of the modern features React 18 uses:
- [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Witaj, świecie!</h1>,
  document.getElementById('root')
);
```

React jest zależny od funkcji `requestAnimationFrame` (nawet w środowiskach testowych).
Możesz ją dodać, korzystając z pakietu [raf](https://www.npmjs.com/package/raf):

```js
import 'raf/polyfill';
```
=======
The correct polyfill for these features depend on your environment. For many users, you can configure your [Browserlist](https://github.com/browserslist/browserslist) settings. For others, you may need to import polyfills like [`core-js`](https://github.com/zloirock/core-js) directly.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1
