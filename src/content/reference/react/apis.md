---
title: "Wbudowane API reactowe"
---

<Intro>

<<<<<<< HEAD
Poza [hookami](/reference/react) i [komponentami](/reference/react/components), paczka `react` eksportuje także kilka innych API, które przydają się przy definiowaniu komponentów. Poniżej znajdziesz listę wszystkich aktualnych API Reacta.
=======
In addition to [Hooks](/reference/react/hooks) and [Components](/reference/react/components), the `react` package exports a few other APIs that are useful for defining components. This page lists all the remaining modern React APIs.
>>>>>>> 6be2b020a0cabf2fd6dbff5c42c399b8ac323bca

</Intro>

---

<<<<<<< HEAD
* [`createContext`](/reference/react/createContext) pozwala zdefiniować i przekazać kontekst do komponentów potomnych. Używane w parze z [`useContext`.](/reference/react/useContext)
* [`forwardRef`](/reference/react/forwardRef) umożliwia komponentowi na wystawienie do rodzica jakiegoś węzła DOM, służącego za referencję. Używane w parze z [`useRef`.](/reference/react/useRef)
* [`lazy`](/reference/react/lazy) pozwala opóźnić załadowanie kodu komponentu do czasu jego pierwszego wyrenderowania.
* [`memo`](/reference/react/memo) pozwala pominąć renderowanie komponentu, jeśli jego właściwości się nie zmieniły. Używane w parze z [`useMemo`](/reference/react/useMemo) i [`useCallback`.](/reference/react/useCallback)
* [`startTransition`](/reference/react/startTransition) pozwala oznaczyć zmianę stanu jako mało pilną. Podobne do [`useTransition`.](/reference/react/useTransition)
* [`act`](/reference/react/act) pozwala upewnić się, że wszystkie aktualizacje podczas renderowania i interakcji w testach zostały przetworzone, zanim uruchomione zostaną asercje.
=======
* [`createContext`](/reference/react/createContext) lets you define and provide context to the child components. Used with [`useContext`.](/reference/react/useContext)
* [`lazy`](/reference/react/lazy) lets you defer loading a component's code until it's rendered for the first time.
* [`memo`](/reference/react/memo) lets your component skip re-renders with same props. Used with [`useMemo`](/reference/react/useMemo) and [`useCallback`.](/reference/react/useCallback)
* [`startTransition`](/reference/react/startTransition) lets you mark a state update as non-urgent. Similar to [`useTransition`.](/reference/react/useTransition)
* [`act`](/reference/react/act) lets you wrap renders and interactions in tests to ensure updates have processed before making assertions.
>>>>>>> 6be2b020a0cabf2fd6dbff5c42c399b8ac323bca

---

## API zasobów {/*resource-apis*/}

Do *zasobów* można dostać się z poziomu komponentu bez konieczności tworzenia dla nich stanu lokalnego. Na przykład, komponent może odczytywać wiadomość z Obietnicy (*ang.* Promise) albo informacje o stylu z kontekstu. 

Aby odczytać wartość z zasobu, użyj tego Hooka:

- [`use`](/reference/react/use) pozwala na odczytanie wartości zasobu, takiego jak [Obietnica (*ang.* Promise)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) lub [kontekst](/learn/passing-data-deeply-with-context).

```js
function MessageComponent({ messagePromise }) {
  const message = use(messagePromise);
  const theme = use(ThemeContext);
  // ...
}
```
