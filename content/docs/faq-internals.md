---
id: faq-internals
title: Wirtualny DOM i organizacja wewnętrzna
permalink: docs/faq-internals.html
layout: docs
category: FAQ
---

### Czym jest wirtualny model DOM? {#what-is-the-virtual-dom}

Wirtualny model DOM (VDOM) to koncepcja programistyczna, w której idealna lub inaczej „wirtualna” reprezentacja interfejsu użytkownika jest przechowywana w pamięci i synchronizowana z „prawdziwym” modelem DOM przez bibliotekę taką jak ReactDOM. Ten proces nazywa się [uzgodnieniem (ang. *reconciliation*)](/docs/reconciliation.html)

Podejście to pozwala na użycie deklaratywnego interfejsu API Reacta: Poinformuj Reacta, w jakim stanie ma być interfejs użytkownika, a React upewni się, że model DOM pasuje do tego stanu. React ukrywa pod warstwą abstrakcji: manipulację atrybutami, obsługę zdarzeń i ręczną aktualizację modelu DOM, których w innym przypadku musiałbyś użyć do zbudowania aplikacji.

Ponieważ „wirtualny model DOM” jest bardziej wzorcem niż konkretną technologią, ludzie, mówiąc o nim, mają na myśli różne rzeczy. W świecie Reacta termin „wirtualny model DOM” jest zwykle kojarzony z [elementami reactowymi](/docs/rendering-elements.html), ponieważ są to obiekty reprezentujące interfejs użytkownika. React wykorzystuje jednak również wewnętrzne obiekty zwane „włóknami” (ang. *fibers*) do przechowywania dodatkowych informacji o drzewie komponentów. Można je również uznać za część implementacji „wirtualnego modelu DOM” w React.

### Czy model Shadow DOM jest tym samym co wirtualny model DOM? {#is-the-shadow-dom-the-same-as-the-virtual-dom}

Nie, oba modele różnią się między sobą. Model Shadow DOM, to technologia przeglądarki zaprojektowana przede wszystkim do określania zakresu zmiennych i stylów CSS w komponentach sieciowych (ang. *web components*). Wirtualny DOM to koncepcja implementowana przez javascriptowe biblioteki, które bazują na API przeglądarki.

### Czym jest "React Fiber"? {#what-is-react-fiber}

"Fiber" to nazwa nowego silnika uzgadniania (ang. *reconciliation engine) w React 16. Jego głównym celem jest umożliwienie przyrostowego renderowania wirtualnego modelu DOM. [Dowiedz się więcej](https://github.com/acdlite/react-fiber-architecture).
