---
title: Invalid ARIA Prop Warning
layout: single
permalink: warnings/invalid-aria-prop.html
---

Ostrzeżenie `invalid-aria-prop` pojawi się, gdy spróbujesz wyrenderować element DOM z właściwością `aria-*`, która nie istnieje w [specyfikacji](https://www.w3.org/TR/wai-aria-1.1/#states_and_properties) Accessible Rich Internet Application (ARIA) stworzonej przez Web Accessibility Initiative (WAI).

1. Jeśli wydaje ci się, że używasz poprawnej właściwości, sprawdź, czy nie ma w niej literówki. Najczęściej błędy zdarzają się w nazwach typu `aria-labelledby` czy `aria-activedescendant`.

<<<<<<< HEAD
2. Być może React jeszcze nie rozpoznaje użytej przez ciebie właściwości. Zostanie to najprawdopodobniej naprawione w przyszłej wersji.
=======
2. If you wrote `aria-role`, you may have meant `role`.

3. Otherwise, if you're on the latest version of React DOM and verified that you're using a valid property name listed in the ARIA specification, please [report a bug](https://github.com/facebook/react/issues/new/choose).
>>>>>>> ea9e9ab2817c8b7eff5ff60e8fe9b649fd747606
