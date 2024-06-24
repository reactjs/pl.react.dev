---
title: "Wbudowane API reactowe"
---

<Intro>

Poza [hookami](/reference/react) i [komponentami](/reference/react/components), paczka `react` eksportuje także kilka innych API, które przydają się przy definiowaniu komponentów. Poniżej znajdziesz listę wszystkich aktualnych API Reacta.

</Intro>

---

<<<<<<< HEAD
* [`createContext`](/reference/react/createContext) pozwala zdefiniować i przekazać kontekst do komponentów potomnych. Używane w parze z [`useContext`.](/reference/react/useContext)
* [`forwardRef`](/reference/react/forwardRef) umożliwia komponentowi na wystawienie do rodzica jakiegoś węzła DOM, służącego za referencję. Używane w parze z [`useRef`.](/reference/react/useRef)
* [`lazy`](/reference/react/lazy) pozwala opóźnić załadowanie kodu komponentu do czasu jego pierwszego wyrenderowania.
* [`memo`](/reference/react/memo) pozwala pominąć renderowanie komponentu, jeśli jego właściwości się nie zmieniły. Używane w parze z [`useMemo`](/reference/react/useMemo) i [`useCallback`.](/reference/react/useCallback)
* [`startTransition`](/reference/react/startTransition) pozwala oznaczyć zmianę stanu jako mało pilną. Podobne do [`useTransition`.](/reference/react/useTransition)
=======
* [`createContext`](/reference/react/createContext) lets you define and provide context to the child components. Used with [`useContext`.](/reference/react/useContext)
* [`forwardRef`](/reference/react/forwardRef) lets your component expose a DOM node as a ref to the parent. Used with [`useRef`.](/reference/react/useRef)
* [`lazy`](/reference/react/lazy) lets you defer loading a component's code until it's rendered for the first time.
* [`memo`](/reference/react/memo) lets your component skip re-renders with same props. Used with [`useMemo`](/reference/react/useMemo) and [`useCallback`.](/reference/react/useCallback)
* [`startTransition`](/reference/react/startTransition) lets you mark a state update as non-urgent. Similar to [`useTransition`.](/reference/react/useTransition)
* [`act`](/reference/react/act) lets you wrap renders and interactions in tests to ensure updates have processed before making assertions.

---

## Resource APIs {/*resource-apis*/}

*Resources* can be accessed by a component without having them as part of their state. For example, a component can read a message from a Promise or read styling information from a context.

To read a value from a resource, use this API:

* [`use`](/reference/react/use) lets you read the value of a resource like a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or [context](/learn/passing-data-deeply-with-context).
```js
function MessageComponent({ messagePromise }) {
  const message = use(messagePromise);
  const theme = use(ThemeContext);
  // ...
}
```
>>>>>>> 169d5c1820cd1514429bfac2a923e51dd782d37e
