---
title: "Wbudowane API reactowe"
---

<Intro>

Poza [hookami](/reference/react) i [komponentami](/reference/react/components), paczka `react` eksportuje także kilka innych API, które przydają się przy definiowaniu komponentów. Poniżej znajdziesz listę wszystkich aktualnych API Reacta.

</Intro>

---

* [`createContext`](/reference/react/createContext) pozwala zdefiniować i przekazać kontekst do komponentów potomnych. Używane w parze z [`useContext`.](/reference/react/useContext)
* [`forwardRef`](/reference/react/forwardRef) umożliwia komponentowi na wystawienie do rodzica jakiegoś węzła DOM, służącego za referencję. Używane w parze z [`useRef`.](/reference/react/useRef)
* [`lazy`](/reference/react/lazy) pozwala opóźnić załadowanie kodu komponentu do czasu jego pierwszego wyrenderowania.
* [`memo`](/reference/react/memo) pozwala pominąć renderowanie komponentu, jeśli jego właściwości się nie zmieniły. Używane w parze z [`useMemo`](/reference/react/useMemo) i [`useCallback`.](/reference/react/useCallback)
* [`startTransition`](/reference/react/startTransition) pozwala oznaczyć zmianę stanu jako mało pilną. Podobne do [`useTransition`.](/reference/react/useTransition)
* [`act`](/reference/react/act) pozwala upewnić się, że wszystkie aktualizacje podczas renderowania i interakcji w testach zostały przetworzone, zanim uruchomione zostaną asercje.

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
