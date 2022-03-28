---
title: Invalid ARIA Prop Warning
layout: single
permalink: warnings/invalid-aria-prop.html
---

Ostrzeżenie `invalid-aria-prop` pojawi się, gdy spróbujesz wyrenderować element DOM z właściwością `aria-*`, która nie istnieje w [specyfikacji](https://www.w3.org/TR/wai-aria-1.1/#states_and_properties) Accessible Rich Internet Application (ARIA) stworzonej przez Web Accessibility Initiative (WAI).

1. Jeśli wydaje ci się, że używasz poprawnej właściwości, sprawdź, czy nie ma w niej literówki. Najczęściej błędy zdarzają się w nazwach typu `aria-labelledby` czy `aria-activedescendant`.

<<<<<<< HEAD
2. Być może React jeszcze nie rozpoznaje użytej przez ciebie właściwości. Zostanie to najprawdopodobniej naprawione w przyszłej wersji. Obecnie jednak React usuwa wszystkie nieznane właściwości, więc użycie ich w aplikacji nie spowoduje ich wyrenderowania.
=======
2. React does not yet recognize the attribute you specified. This will likely be fixed in a future version of React.
>>>>>>> 5e9d673c6bc1530c901548c0b51af3ad3f91d594
