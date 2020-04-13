---
id: testing
title: Ogólne informacje
permalink: docs/testing.html
redirect_from:
  - "community/testing.html"
next: testing-recipes.html
---

Komponenty reactowe można testować podobnie jak pozostały kod javascriptowy.

Istnieje kilka sposobów na przetestowanie komponentów reactowych. W dużym uproszczeniu, dzielą się one na dwie kategorie:

* **Renderowanie drzew komponentów** w uproszczonym środowisku testowym oraz sprawdzanie wyniku renderowania.
* **Uruchamianie pełnej aplikacji** w realistycznym środowisku przeglądarkowym (znane również jako testy "end-to-end").

<<<<<<< HEAD
Ten rozdział dokumentacji skupia się na strategiach testowania w pierwszy sposób. Mimo iż pełne testy "end-to-end" często zapobiegają regresji w kluczowych ścieżkach aplikacji, nie przywiązują one zbyt dużej uwagi do komponentów reactowych. Z tego powodu pominęliśmy je w tej sekcji.
=======
This documentation section focuses on testing strategies for the first case. While full end-to-end tests can be very useful to prevent regressions to important workflows, such tests are not concerned with React components in particular, and are out of the scope of this section.
>>>>>>> b3c7f041586b71b31f556403426fcd7cab342535

### Kompromisy {#tradeoffs}

Podczas wybierania narzędzia testującego warto zastanowić się na kilkoma decyzjami:

* **Szybkość iteracji czy realistyczne środowisko:** Niektóre narzędzia oferują szybkie sprzężenie zwrotne pomiędzy wprowadzeniem zmiany a otrzymaniem wyniku, lecz nie odwzorowują dokładnie zachowania przeglądarki. Inne z kolei używają realistycznego środowiska przeglądarkowego, lecz zmniejszają szybkość iteracji i działają topornie na serwerach CI (ang. *Continuous Integration*).
* **Ile powinniśmy zamockować:** W przypadku komponentów, granica pomiędzy testami "jednostkowymi" a "integracyjnymi" może się zacierać. Kiedy testujesz formularz, czy testy powinny także sprawdzić działanie znajdujących się w nim przycisków? Czy może przycisk powinien mieć dedykowany zestaw testowy? Czy zmiany w kodzie przycisku powinny wpływać na testy formularza?

Do każdego zespołu i każdego produktu pasują inne odpowiedzi na powyższe pytania.

### Zalecane narzędzia {#tools}

**[Jest](https://facebook.github.io/jest/)** to javascriptowy "test runner" (pol. *narzędzie uruchamiające testy*), które pozwala uzyskać dostęp do DOM dzięki paczce [`jsdom`](/docs/testing-environments.html#mocking-a-rendering-surface). Mimo iż `jsdom` tylko w przybliżeniu działa jak prawdziwa przeglądarka, zwykle wystarcza do przetestowania komponentów reactowych. Biblioteka Jest gwarantuje szybką iterowalność połączoną z praktycznymi funkcjonalnościami, jak mockowanie [modułów](/docs/testing-environments.html#mocking-modules) czy [timerów](/docs/testing-environments.html#mocking-timers). Dzięki temu masz większą kontrolę nad tym, jak wykonywany jest twój kod.

**[React Testing Library](https://testing-library.com/react)** jest zestawem funkcji pomocniczych, które pozwalają nad testowanie komponentów reactowych bez polegania na ich szczegółach implementacyjnych (ang. *implementation details*). Takie podejście sprawia, że refactoring kodu staje się niezwykle prosty, a także "popycha" cię w kierunku dobrych praktyk dotyczących dostępności (ang. *accessibility*). Mimo iż ta biblioteka nie umożliwia "płytkiego" renderowania (ang. *shallow rendering*) komponentów bez ich potomków, doskonale sprawdza się w połączeniu z Jestem i jego funkcjonalnością [mockowania modułów](/docs/testing-recipes.html#mocking-modules).

### Dowiedz się więcej {#learn-more}

Ten rozdział został podzielony na dwie części:

- [Przykłady i dobre praktyki](/docs/testing-recipes.html): Wzorce często spotykane przy testowaniu komponentów reactowych.
- [Środowiska](/docs/testing-environments.html): Na co należy zwrócić uwagę podczas zestawiania środowiska testującego dla komponentów reactowych.
