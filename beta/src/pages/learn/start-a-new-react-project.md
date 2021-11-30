---
title: Tworzenie nowego projektu reactowego
---

<Intro>

Jeśli dopiero uczysz się Reacta lub planujesz dodać go do istniejącego projektu, możesz zacząć od [dodania Reacta do dowolnej strony HTML za pomocą tagu `script`](/learn/add-react-to-a-website). Jeśli natomiast twój projekt będzie wymagał wielu komponentów i plików, warto zastanowić się nad jedną z poniższych opcji!

</Intro>

## Wybierz własną przygodę {/_choose-your-own-adventure_/}

React jest biblioteką, która pozwala zorganizować kod UI poprzez jego podział na tak zwane komponenty. React nie zajmuje się routingiem czy zarządzaniem danymi - jeśli są ci potrzebne, rozważ użycie bibliotek zewnętrznych lub napisanie własnego rozwiązania. Oznacza to jednak, że projekt reactowy można wystartować na kilka sposobów:

- Z **minimalną konfiguracją i zestawem narzędzi,** dodając samodzielnie kolejne funkcjonalności do projektu w razie potrzeby.
- Z jednym z **dogmatycznych frameworków** posiadających większość potrzebnych rzeczy.

Bez względu na to, czy dopiero zaczynasz, planujesz stworzyć coś wielkiego czy chcesz skonstruować swój własny zestaw narzędzi, ten poradnik nakieruje cię na właściwą drogę.

## Start z zestawem narzędzi reactowych {/_getting-started-with-a-react-toolchain_/}

Jeśli dopiero zaczynasz przygodę z Reactem, polecamy skorzystać z [Create React App](https://create-react-app.dev/), najpopularniejszego skryptu do eksperymentowania z Reactem i jednocześnie świetnego narzędzia do budowania nowych single-page applications (_pol._ jednostronnicowych aplikacji) działających po stronie klienta. Create React App jest otwartym zestawem narzędzi skonfigurowanych wprost pod Reacta. Zestawy narzędzi pomagają między innymi w:

- Skalowaniu aplikacji na wiele plików i komponentów
- Używaniu bibliotek zewnętrznych z npm
- Wczesnym wyłapywaniu częstych pomyłek
- Rozwijaniu styli CSS i kodu JS z podglądem na żywo
- Optymalizowaniu zbudowanej paczki pod produkcję

Aby rozpocząć pracę z Create React App, wystarczy jedna linijka kodu w konsoli! (**Upewnij się, że masz zainstalowany [Node.js](https://nodejs.org/)!**)

<TerminalBlock>

npx create-react-app my-app

</TerminalBlock>

Teraz możesz uruchomić swoją aplikację za pomocą:

<TerminalBlock>

cd my-app
npm start

</TerminalBlock>

Po więcej informacji [sięgnij do oficjalnego poradnika](https://create-react-app.dev/docs/getting-started).

> Create React App nie obsługuje logiki backendowej ani baz danych; tworzy jedynie frontendowy potok budujący (_ang._ build pipeline). Oznacza to, że możesz go używać z dowolnym backendem. Jeśli jednak szukasz dodatkowych funkcjonalności, jak routing czy server-side logic (_pol._ logika po stronie serwera), czytaj dalej!

### Inne opcje {/_other-options_/}

Create React App jest świetny na początek przygody z Reactem, lecz jeśli zależy ci na lżejszym i szybszym zestawie narzędzi, wypróbuj jednego z poniższych:

- [Vite](https://vitejs.dev/guide/)
- [Parcel](https://parceljs.org/)
- [Snowpack](https://www.snowpack.dev/tutorials/react)

## Budowanie przy pomocy Reacta i frameworku {/_building-with-react-and-a-framework_/}

Jeśli planujesz rozpocząć większy projekt produkcyjny, zacznij od [Next.js](https://nextjs.org/). Next.js to popularny, lekki framework do tworzenia aplikacji statycznych i renderowanych po stronie serwera, zbudowanych przy użyciu Reacta. Wraz z nim otrzymasz takie funkcjonalności jak: routing, stylowanie czy renderowanie po stronie serwera, co znacznie przyspieszy początkową fazę projektu.

Więcej informacji o tym, jak [zacząć projekt z Next.js](https://nextjs.org/docs/getting-started) znajdziesz w oficjalnym poradniku.

### Inne opcje {/_other-options-1_/}

- [Gatsby](https://www.gatsbyjs.org/) pozwala na generowanie statycznych stron internetowych napisanych z użyciem Reacta i GraphQL.
- [Razzle](https://razzlejs.org/) jest frameworkiem renderującym po stronie serwera, który nie wymaga żadnej konfiguracji, a mimo to jest bardziej elastyczny niż Next.js.

## Własny zestaw narzędzi {/_custom-toolchains_/}

Być może jednak interesuje cię stworzenie i skonfigurowanie własnego zestawu narzędzi. Taki zestaw do budowania w JavaScripcie zwykle składa się z:

- **Menadżera pakietów** — pozwala instalować, aktualizować i zarządzać zewnętrznymi bibliotekami. Najpopularniejsze są [Yarn](https://yarnpkg.com/) oraz [npm](https://www.npmjs.com/).
- **Bundlera** (_pol._ skrypt pakujący) — pozwala pisać modularny kod i spakować go do małych pakietów w celu zoptymalizowania czasu ładowania aplikacji. Najpopularniejsze przykłady to: [Webpack](https://webpack.js.org/), [Snowpack](https://www.snowpack.dev/) oraz [Parcel](https://parceljs.org/).
- **Kompilator** — pozwala pisać nowoczesny kod JavaScript, który będzie działał w starszych przeglądarkach. Dobrym przykładem jest [Babel](https://babeljs.io/).

W większych projektach przydaje się także narzędzie do zarządzania wieloma paczkami w ramach jednego repozytorium. Dobrym przykładem takiego narzędzia jest [Nx](https://nx.dev/react).

Jeśli mimo wszystko chcesz stworzyć swój własny zestaw narzędzi javascriptowych od zera, [przeczytaj ten artykuł](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658), w którym autor odtwarza część funkcjonalności Create React App.
