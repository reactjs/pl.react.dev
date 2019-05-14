---
title: Special Props Warning
layout: single
permalink: warnings/special-props.html
---

Większość właściwości (ang. *props*) elementów jest przekazywanych do komponentu. Istnieją jednak dwie specjalne właściwości (`ref` oraz `key`), których używa na wyłączność React, a co za tym idzie, nie trafiają do komponentu.

Na przykład, próba odczytania wartości `this.props.key` w komponencie (w funkcji renderującej lub [propTypes](/docs/typechecking-with-proptypes.html#proptypes)) zakończy się niepowodzeniem. Jeśli potrzebujesz odczytać taką wartość w komponencie potomnym, przekaż ją ponownie pod inną nazwą (np. `<ListItemWrapper key={result.id} id={result.id} />`). Nawet jeśli wydaje się to nadmiarowe, ważne jest, aby oddzielać logikę aplikacji od wskazówek rekoncyliacyjnych (ang. *reconciling hints*).
