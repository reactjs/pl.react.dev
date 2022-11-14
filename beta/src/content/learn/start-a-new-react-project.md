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

<<<<<<< HEAD
### Popularne alternatywy {/*popular-alternatives*/}
=======
### Popular alternatives {/*toolkit-popular-alternatives*/}
>>>>>>> 3bba430b5959c2263c73f0d05d46e2c99c972b1c

* [Vite](https://vitejs.dev/guide/)
* [Parcel](https://parceljs.org/getting-started/webapp/)

## Budowanie przy pomocy kompletnego frameworku {/*building-with-a-full-featured-framework*/}

Jeśli planujesz **rozpocząć projekt produkcyjny**, zacznij od [Next.js](https://nextjs.org/). Next.js to popularny, lekki framework do tworzenia aplikacji statycznych i renderowanych po stronie serwera, zbudowanych przy użyciu Reacta. Wraz z nim otrzymasz takie funkcjonalności jak: routing, stylowanie czy renderowanie po stronie serwera, co znacznie przyspieszy początkową fazę projektu.

Więcej informacji o tym, [jak zacząć projekt z Next.js](https://nextjs.org/docs/getting-started) znajdziesz w oficjalnym poradniku.

<<<<<<< HEAD
### Popularne alternatywy {/*popular-alternatives*/}
=======
### Popular alternatives {/*framework-popular-alternatives*/}
>>>>>>> 3bba430b5959c2263c73f0d05d46e2c99c972b1c

* [Gatsby](https://www.gatsbyjs.org/)
* [Remix](https://remix.run/)
* [Razzle](https://razzlejs.org/)

## Własny zestaw narzędzi {/*custom-toolchains*/}

Być może jednak interesuje cię stworzenie i skonfigurowanie własnego zestawu narzędzi. Taki zestaw zwykle składa się z:

* **Menadżera pakietów** — pozwala instalować, aktualizować i zarządzać zewnętrznymi bibliotekami. Najpopularniejsze z nich to: [npm](https://www.npmjs.com/) (wbudowany w Node.js), [Yarn](https://yarnpkg.com/) oraz [pnpm](https://pnpm.io/).
* **Kompilatora** — pozwala skompilować nowoczesną składnię (np. JSX lub typy), tak, aby rozumiały ją przeglądarki. Popularne kompilatory: [Babel](https://babeljs.io/), [TypeScript](https://www.typescriptlang.org/), [swc](https://swc.rs/).
* **Bundlera** (_pol._ skrypt pakujący) — pozwala pisać modularny kod i spakować go do małych pakietów w celu zoptymalizowania czasu ładowania aplikacji. Najpopularniejsze przykłady to: [webpack](https://webpack.js.org/), [Parcel](https://parceljs.org/), [esbuild](https://esbuild.github.io/) oraz [swc](https://swc.rs/).
* **Minifikatora** — sprawia, że kod jest bardziej zwięzły, przez co ładuje się szybciej. Popularne minifikatory to: [Terser](https://terser.org/), [swc](https://swc.rs/).
* **Serwera** — obsługuje żądania, jednocześnie renderując komponenty do HTML-a. Popularne serwery: [Express](https://expressjs.com/).
* **Lintera** — sprawdza kod pod kątem częstych błędów. Popularne lintery: [ESLint](https://eslint.org/).
* **Narzędzia do testów** — pozwala uruchomić testy i sprawdzić poprawność działania kodu. Popularne narzędzia do testów: [Jest](https://jestjs.io/).

Jeśli jednak wolisz samodzielnie skonfigurować zestaw narzędzi dla JavaScriptu, [zajrzyj do tego artykułu](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658), w którym odtwarzana jest część funkcjonalności Create React App. Frameworki zwykle dodatkowo dostarczają rozwiązania dla routingu i pobierania danych. W większych projektach do zarządzania wieloma paczkami w ramach jednego repozytorium przydatny może okazać się [Nx](https://nx.dev/react) lub [Turborepo](https://turborepo.org/).
