---
title: Invalid ARIA Prop Warning
---

<<<<<<< HEAD:content/warnings/invalid-aria-prop.md
Ostrzeżenie `invalid-aria-prop` pojawi się, gdy spróbujesz wyrenderować element DOM z właściwością `aria-*`, która nie istnieje w [specyfikacji](https://www.w3.org/TR/wai-aria-1.1/#states_and_properties) Accessible Rich Internet Application (ARIA) stworzonej przez Web Accessibility Initiative (WAI).
=======
This warning will fire if you attempt to render a DOM element with an `aria-*` prop that does not exist in the Web Accessibility Initiative (WAI) Accessible Rich Internet Application (ARIA) [specification](https://www.w3.org/TR/wai-aria-1.1/#states_and_properties).
>>>>>>> e5fd79cdbb296b87cab7dff17c3b7feee5dba96b:src/content/warnings/invalid-aria-prop.md

1. Jeśli wydaje ci się, że używasz poprawnej właściwości, sprawdź, czy nie ma w niej literówki. Najczęściej błędy zdarzają się w nazwach typu `aria-labelledby` czy `aria-activedescendant`.

2. Jeśli używasz `aria-role`, być może chodziło ci o `role`.

3. W innym przypadku, jeśli używasz najnowszej wersji React DOM i masz pewność, że używasz poprawnej nazwy właściwości wymienionej w specyfikacji ARIA, [zgłoś nam błąd](https://github.com/facebook/react/issues/new/choose).
