---
id: javascript-environment-requirements
title: Wymagania środowiska JavaScript
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

<<<<<<< HEAD
React 16 opiera się na typach kolekcji [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) i [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). Jeżeli wspierasz starsze przeglądarki oraz urzadzenia, które mogą jeszcze nie udostępniać ich w sposób natywny (np. IE < 11) lub które posiadają niezgodności implementacyjne (np. IE 11), rozważ dodanie globalnej łatki do swojej aplikacji, korzystając z [core-js](https://github.com/zloirock/core-js) lub [babel-polyfill](https://babeljs.io/docs/usage/polyfill/).
=======
React 16 depends on the collection types [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). If you support older browsers and devices which may not yet provide these natively (e.g. IE < 11) or which have non-compliant implementations (e.g. IE 11), consider including a global polyfill in your bundled application, such as [core-js](https://github.com/zloirock/core-js).
>>>>>>> 957276e1e92bb48e5bb6b1c17fd0e7a559de0748

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
