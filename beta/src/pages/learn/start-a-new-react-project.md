---
title: Tworzenie nowego projektu reactowego
---

<Intro>

Jeśli dopiero zaczynasz nowy projekt, sugerujemy użyć któregoś z zestawów narzędzi lub frameworków. Dostarczają one wygodne środowisko programistyczne, lecz wymagają lokalnej instalacji Node.js.

</Intro>

<YouWillLearn>

* Czym różnią się zestawy narzędzi od frameworków
* Jak rozpocząć projekt z minimalnym zestawem narzędzi
* Jak rozpocząć projekt z pełnym zestawem narzędzi
* Z czego składają się popularne zestawy narzędzi i frameworki

</YouWillLearn>

## Wybierz własną przygodę {/*choose-your-own-adventure*/}

React jest biblioteką, która pozwala zorganizować kod UI poprzez jego podział na tak zwane komponenty. React nie zajmuje się routingiem czy zarządzaniem danymi. Oznacza to jednak, że projekt reactowy można rozpocząć na kilka sposobów:

* [Z **plikiem HTML i znacznikiem script**.](/learn/add-react-to-a-website), które nie wymagają instalacji Node.js, lecz oferują ograniczone możliwości.
* Z **minimalną konfiguracją i zestawem narzędzi,** dodając samodzielnie kolejne funkcjonalności do projektu w razie potrzeby. (Świetne do nauki!)
* Z jednym z **dogmatycznych frameworków** posiadających większość potrzebnych rzeczy, jak pobieranie danych czy routing.

## Start z zestawem narzędzi reactowych {/*getting-started-with-a-react-toolchain*/}

Jeśli dopiero **uczysz się Reacta**, polecamy skorzystać z [Create React App](https://create-react-app.dev/), najpopularniejszego skryptu do eksperymentowania z Reactem i jednocześnie świetnego narzędzia do budowania nowych single-page applications (_pol._ jednostronnicowych aplikacji) działających po stronie klienta. To narzędzie stworzone wprost pod Reacta, jednak nie narzuca rozwiązań takich, jak routing czy pobieranie danych.

Zacznij od zainstalowania [Node.js](https://nodejs.org/en/). Następnie otwórz terminal i uruchom następującą komendę, aby utworzyć nowy projekt:

<TerminalBlock>

npx create-react-app my-app

</TerminalBlock>

Teraz możesz uruchomić swoją aplikację za pomocą:

<TerminalBlock>

cd my-app
npm start

</TerminalBlock>

Po więcej informacji [sięgnij do oficjalnego poradnika](https://create-react-app.dev/docs/getting-started).

> Create React App nie obsługuje logiki backendowej ani baz danych. Oznacza to, że możesz go używać z dowolnym backendem. Kiedy budujesz projekt, na wyjściu dostaniesz folder ze statycznymi plikami HTML, CSS i JS. Z racji tego, że Create React App nie ma dostępu do serwera, nie zapewnia najlepszej wydajności. Jeśli szukasz rozwiązań, które dadzą szybsze czasy wczytywania aplikacji czy wbudowane funkcjonalności, jak routing czy logika serwerowa, zalecamy skorzystać z frameworka.

### Popularne alternatywy {/*popular-alternatives*/}

* [Vite](https://vitejs.dev/guide/)
* [Parcel](https://parceljs.org/)

## Budowanie przy pomocy kompletnego frameworku {/*building-with-a-full-featured-framework*/}

Jeśli planujesz **rozpocząć projekt produkcyjny**, zacznij od [Next.js](https://nextjs.org/). Next.js to popularny, lekki framework do tworzenia aplikacji statycznych i renderowanych po stronie serwera, zbudowanych przy użyciu Reacta. Wraz z nim otrzymasz takie funkcjonalności jak: routing, stylowanie czy renderowanie po stronie serwera, co znacznie przyspieszy początkową fazę projektu.

Więcej informacji o tym, [jak zacząć projekt z Next.js](https://nextjs.org/docs/getting-started) znajdziesz w oficjalnym poradniku.

### Popularne alternatywy {/*popular-alternatives*/}

* [Gatsby](https://www.gatsbyjs.org/)
* [Remix](https://remix.run/)
* [Razzle](https://razzlejs.org/)

## Własny zestaw narzędzi {/*custom-toolchains*/}

Być może jednak interesuje cię stworzenie i skonfigurowanie własnego zestawu narzędzi. Taki zestaw zwykle składa się z:

<<<<<<< HEAD
* **Menadżera pakietów** — pozwala instalować, aktualizować i zarządzać zewnętrznymi bibliotekami. Najpopularniejsze z nich to: [npm](https://www.npmjs.com/) (wbudowany w Node.js), [Yarn](https://yarnpkg.com/) oraz [pnpm](https://pnpm.io/).
* **Kompilatora** — pozwala skompilować nowoczesną składnię (np. JSX lub typy), tak, aby rozumiały ją przeglądarki. Popularne kompilatory: [Babel](https://babeljs.io/), [TypeScript](http://typescript.org/), [swc](https://swc.rs/).
* **Bundlera** (_pol._ skrypt pakujący) — pozwala pisać modularny kod i spakować go do małych pakietów w celu zoptymalizowania czasu ładowania aplikacji. Najpopularniejsze przykłady to: [webpack](https://webpack.js.org/), [Parcel](https://parceljs.org/), [esbuild](https://esbuild.github.io/) oraz [swc](https://swc.rs/).
* **Minifikatora** — sprawia, że kod jest bardziej zwięzły, przez co ładuje się szybciej. Popularne minifikatory to: [Terser](https://terser.org/), [swc](https://swc.rs/).
* **Serwera** — obsługuje żądania, jednocześnie renderując komponenty do HTML-a. Popularne serwery: [Express](https://expressjs.com/).
* **Lintera** — sprawdza kod pod kątem częstych błędów. Popularne lintery: [ESLint](https://eslint.org/).
* **Narzędzia do testów** — pozwala uruchomić testy i sprawdzić poprawność działania kodu. Popularne narzędzia do testów: [Jest](https://jestjs.io/).

=======
* A **package manager** lets you install, update, and manage third-party packages. Popular package managers: [npm](https://www.npmjs.com/) (built into Node.js), [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/).
* A **compiler** lets you compile modern language features and additional syntax like JSX or type annotations for the browsers. Popular compilers: [Babel](https://babeljs.io/), [TypeScript](https://www.typescriptlang.org/), [swc](https://swc.rs/).
* A **bundler** lets you write modular code and bundle it together into small packages to optimize load time. Popular bundlers: [webpack](https://webpack.js.org/), [Parcel](https://parceljs.org/), [esbuild](https://esbuild.github.io/), [swc](https://swc.rs/).
* A **minifier** makes your code more compact so that it loads faster. Popular minifiers: [Terser](https://terser.org/), [swc](https://swc.rs/).
* A **server** handles server requests so that you can render components to HTML. Popular servers: [Express](https://expressjs.com/).
* A **linter** checks your code for common mistakes. Popular linters: [ESLint](https://eslint.org/).
* A **test runner** lets you run tests against your code. Popular test runners: [Jest](https://jestjs.io/).

If you prefer to set up your own JavaScript toolchain from scratch, [check out this guide](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658) that re-creates some of the Create React App functionality. A framework will usually also provide a routing and a data fetching solution. In a larger project, you might also want to manage multiple packages in a single repository with a tool like [Nx](https://nx.dev/react) or [Turborepo](https://turborepo.org/).
>>>>>>> df2673d1b6ec0cc6657fd58690bbf30fa1e6e0e6

Jeśli jednak wolisz samodzielnie skonfigurować zestaw narzędzi dla JavaScriptu, [zajrzyj do tego artykułu](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658), w którym odtwarzana jest część funkcjonalności Create React App. Frameworki zwykle dodatkowo dostarczają rozwiązania dla routingu i pobierania danych. W większych projektach do zarządzania wieloma paczkami w ramach jednego repozytorium przydatny może okazać się [Nx](https://nx.dev/react).
