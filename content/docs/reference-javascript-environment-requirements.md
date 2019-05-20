---
id: javascript-environment-requirements
title: Wymagania środowiska JavaScript
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

React 16 opiera się na typach kolekcji [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) i [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). Jeżeli wspierasz starsze przeglądarki oraz urzadzenia, które mogą jeszcze nie udostępniać ich w sposób natywny (np. IE < 11) lub które posiadają niezgodności implementacyjne (np. IE 11), rozważ dodanie globalnej łatki do swojej aplikacji, korzystając z [core-js](https://github.com/zloirock/core-js) lub [babel-polyfill](https://babeljs.io/docs/usage/polyfill/).

Środowisko, w którym zastosowano łatki dla Reacta 16 korzystając z core-js, może wyglądać tak:

```js
import 'core-js/es/map';
import 'core-js/es/set';

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
