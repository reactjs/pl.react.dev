---
id: rendering-elements
title: Renderowanie elementów
permalink: docs/rendering-elements.html
redirect_from:
  - "docs/displaying-data.html"
prev: introducing-jsx.html
next: components-and-props.html
---

Elementy to najmniejsze bloki budujące reactowe aplikacje.

Element opisuje, co chcesz zobaczyć na ekranie:

```js
const element = <h1>Hello, world</h1>;
```

W przeciwieństwie do elementów drzewa DOM w przeglądarce, reactowe elementy są zwykłymi obiektami i mają niski koszt stworzenia.

>**Wskazówka:**
>
>Łatwo pomylić elementy z szerzej znaną koncepcją "komponentów". Komponenty przedstawimy w [kolejnym rozdziale](/docs/components-and-props.html). Elementy są tym, z czego komponenty "są zbudowane". Zachęcamy do przeczytania tego rozdziału przed przejściem dalej.

## Renderowanie elementu w drzewie DOM {#rendering-an-element-into-the-dom}

Powiedzmy, że gdzieś w twoim pliku HTML jest `<div>`:

```html
<div id="root"></div>
```

Nazywamy ten węzeł drzewa DOM "korzeniem", bo wszytko, co się w nim znajduje będzie zarządzane przez React DOM.

Aplikacje zbudowane tylko w Reakcie zazwyczaj posiadają pojedynczy węzeł drzewa DOM. Jeśli integrujesz reactową aplikację z już istniejącą aplikacją, możesz mieć tyle odizolowanych "korzeni", ile chcesz.

Aby wyrenderować reactowy element w węźle drzewa DOM, przekaż oba do `ReactDOM.render()`:

`embed:rendering-elements/render-an-element.js`

[](codepen://rendering-elements/render-an-element)

Na stronie wyświetli się "Hello, world".

## Aktualizowanie wyrenderowanego elementu {#updating-the-rendered-element}

Reactowe elementy są [niezmienne](https://en.wikipedia.org/wiki/Immutable_object). Kiedy stworzysz element, nie możesz zmienić jego komponentów potomnych ani właściwości. Element jest jak pojedyncza klatka z filmu: reprezentuje interfejs użytkownika w pewnym punkcie czasu.

Dotychczas z naszą wiedzą, jedynym sposobem aktualizacji interfejsu użytkownika jest stworzenie nowego elementu i przekazanie go do `ReactDOM.render()`.

Rozważ ten przykład tykającego zegara:

`embed:rendering-elements/update-rendered-element.js`

[](codepen://rendering-elements/update-rendered-element)

Przywołuje on `ReactDOM.render()` w każdej sekundzie z funkcji zwrotnej [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval).

>**Wskazówka:**
>
>W praktyce, większość reactowych aplikacji przywołuje `ReactDOM.render()` tylko raz. W kolejnych sekcjach dowiemy się jak taki kod zostaje wyhermetyzowany do [stanowych komponentów](/docs/state-and-lifecycle.html).
>
>Zalecamy, abyś nie pomijał tematów, ponieważ budują one na sobie.

## React uaktualnia tylko to, co potrzebne {#react-only-updates-whats-necessary}

React DOM porównuje element i jego potomków do poprzedniego oraz stosuje aktualizacje drzewa DOM konieczne do doprowadzenia go do pożądanego stanu.

Możesz to sprawdzić przez inspekcję [ostatniego przykładu](codepen://rendering-elements/update-rendered-element) w narzędziach przeglądarki:

![inspektor DOM pokazujący cząstkowe aktualizacje](../images/docs/granular-dom-updates.gif)

Chociaż tworzymy element opisujący cały interfejs użytkownika przy każdym tyknięciu, tylko węzeł tekstowy, którego treść zmieniła się zostaje zaktualizowany przez React DOM.

Według naszego doświadczenia, myślenie o tym, jak powinien wyglądać interfejs użytkownika w danym momencie, a nie jak zmienić go w czasie, eleminuje całą klasę błędów.
