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
