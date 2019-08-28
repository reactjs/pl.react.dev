---
id: testing-environments
title: Środowiska testujące
permalink: docs/testing-environments.html
prev: testing-recipes.html
---

<!-- Ten dokument został napisany dla osób zaznajomionych z JavaScriptem, którzy także prawdopodobnie pisali już w nim testy. Służy on za punkt odniesienia w kwestii różnic między środowiskami testującymi komponenty reactowe i tego, jak poszczególne różnice wpływają na tworzone testy. W rozdziale tym faworyzujemy komponenty webowe renderowane przez react-dom, ale dodajemy też informacje dotyczące innych silników renderujących. -->

W tym rozdziale opisujemy czynniki wpływające na środowisko testujące i nasze rekomendacje dla niektórych scenariuszy.

### Narzędzia uruchamiające testy (ang. *test runners*) {#test-runners}

Narzędzia uruchamiające testy, jak np. [Jest](https://jestjs.io/), [mocha](https://mochajs.org/) czy [ava](https://github.com/avajs/ava), pozwalają tworzyć zestawy testowe przy użyciu samego JavaScriptu, a także uruchamiać je jako część procesu tworzenia oprogramowania. Dodatkowo, testy mogą być uruchamiane w ramach procesu "ciągłej integracji" (ang. *Continuous Integration*, CI).

- Jest ma wysoką kompatybilność z projektami reactowymi i obsługuje wiele przydatnych funkcjonalności, jak [mockowanie modułów](#mocking-modules) czy [sztuczne timery](#mocking-timers). Dobrze współpracuje również z [`jsdom`](#mocking-a-rendering-surface). **Jeśli używasz Create React App, [domyślnie masz już dostęp do Jesta](https://facebook.github.io/create-react-app/docs/running-tests) z odpowiednią konfiguracją.**
- Biblioteki takie jak [mocha](https://mochajs.org/#running-mocha-in-the-browser) świetnie spisują się w środowiskach przeglądarkowych, dzięki czemu mogą okazać się pomocne w przypadku niektórych testów.
- Testy kompleksowe end-to-end, stosowane w przypadku dłuższych ścieżek rozciągających się na wiele stron aplikacji, wymagają [innej konfiguracji](#end-to-end-tests-aka-e2e-tests).

### Mockowanie warstwy renderującej {#mocking-a-rendering-surface}

Testy często uruchamiane są w środowiskach niemających dostępu do prawdziwej warstwy renderującej, np. przeglądarki. Zalecamy więc symulowanie zachowań przeglądarki za pomocą [`jsdom`](https://github.com/jsdom/jsdom), niewielkiej implementacji przeglądarki działającej na Node.js.

W większości przypadków `jsdom` zachowuje się jak prawdziwa przeglądarka, lecz nie posiada niektórych funkcjonalności, jak np. [generowanie układu strony czy nawigacja](https://github.com/jsdom/jsdom#unimplemented-parts-of-the-web-platform). Mimo tego paczka z powodzeniem sprawdza się dla większości komponentów pisanych pod przeglądarkę; działa szybciej niż uruchamianie przeglądarki dla każdego testu z osobna. Ponadto, uruchamia ona testy w tym samym procesie, umożliwiając pisanie kodu sprawdzającego wyrenderowane drzewo DOM.

Podobnie jak prawdziwa przeglądarka, `jsdom` pozwala na modelowanie interakcji użytkownika; testy mogą wywoływać zdarzenia na węzłach DOM, a następnie obserwować i sprawdzać wyniki tych akcji [<small>(przykład)</small>](/docs/testing-recipes.html#events).

Przy takiej konfiguracji można śmiało napisać większość testów dla UI: Jest jako narzędzie uruchamiające testy, jsdom służący do renderowania, interakcje użytkownika określone jako sekwencje zdarzeń przeglądarkowych - a to wszystko "spięte" za pomocą funkcji pomocniczej `act()` [<small>(przykład)</small>](/docs/testing-recipes.html). Spora część testów samego Reacta jest napisana przy użyciu powyższej kombinacji.

Jeśli piszesz bibliotekę, która testuje głównie zachowania characterystyczne dla przeglądarki, a w dodatku wymaga natywnych mechanizmów przeglądarki, jak generowanie układu strony, zalecamy skorzystanie z frameworka [mocha](https://mochajs.org/).

W środowisku, które _uniemożliwia_ symulowanie modelu DOM (np. podczas testowania komponentów napisanych w React Native na Node.js), możesz skorzystać z [narzędzi do symulowania zdarzeń](https://reactjs.org/docs/test-utils.html#simulate) do symulowania interakcji z elementami. Alternatywnie możesz skorzystać z funkcji `fireEvent` dostarczonej przez [`@testing-library/react-native`](https://testing-library.com/docs/native-testing-library).

Frameworki jak [Cypress](https://www.cypress.io/), [puppeteer](https://github.com/GoogleChrome/puppeteer) czy [webdriver](https://www.seleniumhq.org/projects/webdriver/) służą do uruchamiania testów [end-to-end](#end-to-end-tests-aka-e2e-tests).

### Mockowanie funkcji {#mocking-functions}

Podczas pisania testów czasami chcemy podmienić części naszego kodu, które nie posiadają odpowiedników w używanym przez nas środowisku (np. sprawdzanie statusu `navigator.onLine` w Node.js). Testy mogą również śledzić niektóre funkcje i obserwować, jak pozostałe części kodu wchodzą z nimi w interakcje. Pomocna okazuje się wtedy możliwość wybiórczego zastąpienia niektórych funkcji wersjami odpowiednimi dla testów.

Szczególnie przydatne okazuje się to przy pobieraniu danych. Zazwyczaj lepiej w testach używać "sztucznych" danych, aby uniknąć spowolnień czy niestabilności z powodu odwołań do prawdziwego API [<small>(przykład)</small>](/docs/testing-recipes.html#data-fetching). Dzięki takiemu zabiegowi testy są przewidywalne. Biblioteki typu [Jest](https://jestjs.io/) czy [sinon](https://sinonjs.org/) wspierają mockowanie funkcji. W przypadku testów end-to-end, mockowanie sieci może okazać się trudniejsze, choć w przypadku tych testów często konieczne jest testowanie prawdziwego API.

### Mockowanie modułów {#mocking-modules}

Niektóre komponenty mają zależności w modułach, które mogą nie działać w środowisku testowym lub które zwyczajnie nie są istotne z punktu widzenia naszych testów. Warto wtedy zastąpić te moduły czymś odpowiednim dla danego przypadku [<small>(przykład)</small>](/docs/testing-recipes.html#mocking-modules).

W Node.js [mockowanie modułów](https://jestjs.io/docs/en/manual-mocks) jest wspierane np. przez bibliotekę Jest. Można to również osiągnąć z pomocą paczki [`mock-require`](https://www.npmjs.com/package/mock-require).

### Mockowanie timerów {#mocking-timers}

Komponenty mogą korzystać z funkcji opartych na czasie, np. `setTimeout`, `setInterval` czy `Date.now`. W środowisku testowym warto zamieniać tego typu funkcje na ich zastępniki, które pozwalają ręcznie "sterować czasem". Testy korzystające z timerów nadal będą wykonywać się w odpowiedniej kolejności, ale zdecydowanie szybciej [<small>(przykład)</small>](/docs/testing-recipes.html#timers). Większość frameworków, również [Jest](https://jestjs.io/docs/en/timer-mocks), [sinon](https://sinonjs.org/releases/v7.3.2/fake-timers/) oraz [lolex](https://github.com/sinonjs/lolex), pozwalają na mockowanie timerów w testach.

Niekiedy jednak zależy ci na skorzystaniu z prawdziwych timerów, na przykład, gdy testujesz animację lub interakcję z endpointem, który zależy od czasu (np. ogranicza częstość odpytywania API). Biblioteki zawierające sztuczne timery pozwalają na łatwe włączanie i wyłączanie tego mechanizmu dla każdego zestawu testowego lub pojedynczego testu. Dzięki temu możesz zdecydować, jak poszczególne testy mają być uruchamiane.

### Testy end-to-end {#end-to-end-tests-aka-e2e-tests}

Testy end-to-end są efektywne przy testowaniu dłuższych sekwencji interakcji, zwłaszcza jeśli są one krytyczne dla twojego produktu (np. płatność czy rejestracja). W takich przypadkach konieczne jest przetestowanie, jak przeglądarka renderuje całą aplikację, jak pobiera dane z API, korzysta z sesji i ciasteczek czy nawiguje pomiędzy poszczególnymi stronami. Możesz w nich sprawdzać nie tylko stan drzewa DOM, lecz także sterujące nim dane (np. weryfikując, czy dane zostały zapisane w bazie danych).

Do takich scenariuszy możesz skorzystać z frameworka [Cypress](https://www.cypress.io/) lub biblioteki [puppeteer](https://github.com/GoogleChrome/puppeteer), które pozwalają nawigować pomiędzy stronami i sprawdzać rezultaty nie tylko w samej przeglądarce, ale potencjalnie również na backendzie.
