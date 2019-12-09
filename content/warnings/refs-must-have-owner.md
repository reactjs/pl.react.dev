---
title: Refs Must Have Owner Warning
layout: single
permalink: warnings/refs-must-have-owner.html
---

Jesteś tu najprawdopodobniej z powodu jednego z dwóch błędów:

*React 16.0.0+*
> Warning:
>
> Element ref was specified as a string (myRefName) but no owner was set. You may have multiple copies of React loaded. (details: https://fb.me/react-refs-must-have-owner).

*wcześniejsze wersje Reacta*
> Warning:
>
> addComponentAsRefTo(...): Only a ReactOwner can have refs. You might be adding a ref to a component that was not created inside a component's `render` method, or you have multiple copies of React loaded.

Zazwyczaj oznacza to jedną z trzech rzeczy:

- Usiłujesz dodać referencję (`ref`) do komponentu funkcyjnego.
- Próbujesz dodać referencję do elementu, który jest tworzony poza metodą `render` komponentu.
- Masz załadowanych kilka (konfliktujących) wersji Reacta (np. z powodu źle skonfigurowanych zależności npm).

## Referencje do komponentów funkcyjnych {#refs-on-function-components}

Jeśli `<Foo>` jest komponentem funkcyjnym, nie możesz tworzyć do niego referencji:

```js
// nie zadziała, jeśli Foo jest funkcją!
<Foo ref={foo} />
```

Jeśli musisz dodać referencję do komponentu, zamień go najpierw na klasę lub rozważ, [czy na pewno potrzebujesz referencji](/docs/refs-and-the-dom.html#when-to-use-refs).

## Referencje tekstowe poza metodą render {#strings-refs-outside-the-render-method}

Oznacza to najczęściej, że próbujesz dodać referencję do komponentu, który nie ma "właściciela" 
(czyli nie został stworzony wewnątrz metody `render` innego komponentu). Na przykład to nie zadziała:

```js
// Nie działa!
ReactDOM.render(<App ref="app" />, el);
```

Spróbuj wyrenderować komponent wewnątrz jakiegoś komponentu-rodzica, który będzie przechowywać referencję.
Możesz też użyć funkcji zwrotnej (ang. *callback*):

```js
let app;
ReactDOM.render(
  <App ref={inst => {
    app = inst;
  }} />,
  el
);
```

Zanim zdecydujesz się na takie rozwiązanie, upewnij się, [czy na pewno potrzebujesz referencji](/docs/refs-and-the-dom.html#when-to-use-refs).

## Wiele kopii Reacta {#multiple-copies-of-react}

Bower dobrze radzi sobie z usuwaniem zduplikowanych zależności, ale npm już nie.
Jeśli nie robisz nic (szczególnego) z referencjami, jest spora szansa, że problem nie leży postronie Twoich referencji,
a raczej w tym, że w Twoim projekcie znalazła się więcej niż jedna instancja Reacta. Czasem zaciągając zewnętrzny moduł z npm otrzymasz dodatkową kopię Reacta w bibliotece zależności. 
Może to powodować problemy.

Jeśli używasz npm... `npm ls` albo `npm ls react` mogą rzucić trochę światła na problem.
