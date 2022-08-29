---
title: Invalid ARIA Prop Warning
layout: single
permalink: warnings/invalid-aria-prop.html
---

Ostrzeżenie `invalid-aria-prop` pojawi się, gdy spróbujesz wyrenderować element DOM z właściwością `aria-*`, która nie istnieje w [specyfikacji](https://www.w3.org/TR/wai-aria-1.1/#states_and_properties) Accessible Rich Internet Application (ARIA) stworzonej przez Web Accessibility Initiative (WAI).

1. Jeśli wydaje ci się, że używasz poprawnej właściwości, sprawdź, czy nie ma w niej literówki. Najczęściej błędy zdarzają się w nazwach typu `aria-labelledby` czy `aria-activedescendant`.

2. Jeśli używasz `aria-role`, być może chodziło ci o `role`.

3. W innym przypadku, jeśli używasz najnowszej wersji React DOM i masz pewność, że używasz poprawnej nazwy właściwości wymienionej w specyfikacji ARIA, [zgłoś nam błąd](https://github.com/facebook/react/issues/new/choose).
