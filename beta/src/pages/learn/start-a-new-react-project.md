---
title: Tworzenie nowego projektu reactowego
---

<Intro>

<<<<<<< HEAD
Jeśli dopiero uczysz się Reacta lub planujesz dodać go do istniejącego projektu, możesz zacząć od [dodania Reacta do dowolnej strony HTML za pomocą tagu `script`](/learn/add-react-to-a-website). Jeśli natomiast twój projekt będzie wymagał wielu komponentów i plików, warto zastanowić się nad jedną z poniższych opcji!

</Intro>

## Wybierz własną przygodę {/*choose-your-own-adventure*/}

React jest biblioteką, która pozwala zorganizować kod UI poprzez jego podział na tak zwane komponenty. React nie zajmuje się routingiem czy zarządzaniem danymi - jeśli są ci potrzebne, rozważ użycie bibliotek zewnętrznych lub napisanie własnego rozwiązania. Oznacza to jednak, że projekt reactowy można wystartować na kilka sposobów:

- Z **minimalną konfiguracją i zestawem narzędzi,** dodając samodzielnie kolejne funkcjonalności do projektu w razie potrzeby.
- Z jednym z **dogmatycznych frameworków** posiadających większość potrzebnych rzeczy.

Bez względu na to, czy dopiero zaczynasz, planujesz stworzyć coś wielkiego czy chcesz skonstruować swój własny zestaw narzędzi, ten poradnik nakieruje cię na właściwą drogę.

## Start z zestawem narzędzi reactowych {/*getting-started-with-a-react-toolchain*/}

Jeśli dopiero zaczynasz przygodę z Reactem, polecamy skorzystać z [Create React App](https://create-react-app.dev/), najpopularniejszego skryptu do eksperymentowania z Reactem i jednocześnie świetnego narzędzia do budowania nowych single-page applications (_pol._ jednostronnicowych aplikacji) działających po stronie klienta. Create React App jest otwartym zestawem narzędzi skonfigurowanych wprost pod Reacta. Zestawy narzędzi pomagają między innymi w:

- Skalowaniu aplikacji na wiele plików i komponentów
- Używaniu bibliotek zewnętrznych z npm
- Wczesnym wyłapywaniu częstych pomyłek
- Rozwijaniu styli CSS i kodu JS z podglądem na żywo
- Optymalizowaniu zbudowanej paczki pod produkcję

Aby rozpocząć pracę z Create React App, wystarczy jedna linijka kodu w konsoli! (**Upewnij się, że masz zainstalowany [Node.js](https://nodejs.org/)!**)
=======
If you're starting a new project, we recommend to use a toolchain or a framework. These tools provide a comfortable development environment but require a local Node.js installation.

</Intro>

<YouWillLearn>

* How toolchains are different from frameworks
* How to start a project with a minimal toolchain
* How to start a project with a fully-featured framework
* What's inside popular toolchains and frameworks

</YouWillLearn>

## Choose your own adventure {/*choose-your-own-adventure*/}

React is a library that lets you organize UI code by breaking it apart into pieces called components. React doesn't take care of routing or data management. This means there are several ways to start a new React project:

* [Start with an **HTML file and a script tag**.](/learn/add-react-to-a-website) This doesn't require Node.js setup but offers limited features.
* Start with a **minimal toolchain,** adding more features to your project as you go. (Great for learning!)
* Start with an **opinionated framework** that has common features like data fetching and routing built-in.

## Getting started with a minimal toolchain {/*getting-started-with-a-minimal-toolchain*/}

If you're **learning React,** we recommend [Create React App](https://create-react-app.dev/). It is the most popular way to try out React and build a new single-page, client-side application. It's made for React but isn't opinionated about routing or data fetching.

First, install [Node.js](https://nodejs.org/en/). Then open your terminal and run this line to create a project:
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985

<TerminalBlock>

npx create-react-app my-app

</TerminalBlock>

Teraz możesz uruchomić swoją aplikację za pomocą:

<TerminalBlock>

cd my-app
npm start

</TerminalBlock>

Po więcej informacji [sięgnij do oficjalnego poradnika](https://create-react-app.dev/docs/getting-started).

<<<<<<< HEAD
> Create React App nie obsługuje logiki backendowej ani baz danych; tworzy jedynie frontendowy potok budujący (_ang._ build pipeline). Oznacza to, że możesz go używać z dowolnym backendem. Jeśli jednak szukasz dodatkowych funkcjonalności, jak routing czy server-side logic (_pol._ logika po stronie serwera), czytaj dalej!

### Inne opcje {/*other-options*/}

Create React App jest świetny na początek przygody z Reactem, lecz jeśli zależy ci na lżejszym i szybszym zestawie narzędzi, wypróbuj jednego z poniższych:

- [Vite](https://vitejs.dev/guide/)
- [Parcel](https://parceljs.org/)
- [Snowpack](https://www.snowpack.dev/tutorials/react)

## Budowanie przy pomocy Reacta i frameworku {/*building-with-react-and-a-framework*/}

Jeśli planujesz rozpocząć większy projekt produkcyjny, zacznij od [Next.js](https://nextjs.org/). Next.js to popularny, lekki framework do tworzenia aplikacji statycznych i renderowanych po stronie serwera, zbudowanych przy użyciu Reacta. Wraz z nim otrzymasz takie funkcjonalności jak: routing, stylowanie czy renderowanie po stronie serwera, co znacznie przyspieszy początkową fazę projektu.

Więcej informacji o tym, jak [zacząć projekt z Next.js](https://nextjs.org/docs/getting-started) znajdziesz w oficjalnym poradniku.

### Inne opcje {/*other-options-1*/}

- [Gatsby](https://www.gatsbyjs.org/) pozwala na generowanie statycznych stron internetowych napisanych z użyciem Reacta i GraphQL.
- [Razzle](https://razzlejs.org/) jest frameworkiem renderującym po stronie serwera, który nie wymaga żadnej konfiguracji, a mimo to jest bardziej elastyczny niż Next.js.
=======
> Create React App doesn't handle backend logic or databases. You can use it with any backend. When you build a project, you'll get a folder with static HTML, CSS and JS. Because Create React App can't take advantage of the server, it doesn't provide the best performance. If you're looking for faster loading times and built-in features like routing and server-side logic, we recommend using a framework instead.

### Popular alternatives {/*popular-alternatives*/}

* [Vite](https://vitejs.dev/guide/)
* [Parcel](https://parceljs.org/)

## Building with a full-featured framework {/*building-with-a-full-featured-framework*/}

If you're looking to **start a production-ready project,** [Next.js](https://nextjs.org/) is a great place to start. Next.js is a popular, lightweight framework for static and server‑rendered applications built with React. It comes pre-packaged with features like routing, styling, and server-side rendering, getting your project up and running quickly. 

The [Next.js Foundations](https://nextjs.org/learn/foundations/about-nextjs) tutorial is a great introduction to building with React and Next.js.

### Popular alternatives {/*popular-alternatives*/}

* [Gatsby](https://www.gatsbyjs.org/)
* [Remix](https://remix.run/)
* [Razzle](https://razzlejs.org/)
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985

## Własny zestaw narzędzi {/*custom-toolchains*/}

<<<<<<< HEAD
Być może jednak interesuje cię stworzenie i skonfigurowanie własnego zestawu narzędzi. Taki zestaw do budowania w JavaScripcie zwykle składa się z:

- **Menadżera pakietów** — pozwala instalować, aktualizować i zarządzać zewnętrznymi bibliotekami. Najpopularniejsze są [Yarn](https://yarnpkg.com/) oraz [npm](https://www.npmjs.com/).
- **Bundlera** (_pol._ skrypt pakujący) — pozwala pisać modularny kod i spakować go do małych pakietów w celu zoptymalizowania czasu ładowania aplikacji. Najpopularniejsze przykłady to: [Webpack](https://webpack.js.org/), [Snowpack](https://www.snowpack.dev/) oraz [Parcel](https://parceljs.org/).
- **Kompilator** — pozwala pisać nowoczesny kod JavaScript, który będzie działał w starszych przeglądarkach. Dobrym przykładem jest [Babel](https://babeljs.io/).

W większych projektach przydaje się także narzędzie do zarządzania wieloma paczkami w ramach jednego repozytorium. Dobrym przykładem takiego narzędzia jest [Nx](https://nx.dev/react).

Jeśli mimo wszystko chcesz stworzyć swój własny zestaw narzędzi javascriptowych od zera, [przeczytaj ten artykuł](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658), w którym autor odtwarza część funkcjonalności Create React App.
=======
You may prefer to create and configure your own toolchain. A toolchain typically consists of:

* A **package manager** lets you install, update, and manage third-party packages. Popular package managers: [npm](https://www.npmjs.com/) (built into Node.js), [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/).
* A **compiler** lets you compile modern language features and additional syntax like JSX or type annotations for the browsers. Popular compilers: [Babel](https://babeljs.io/), [TypeScript](http://typescript.org/), [swc](https://swc.rs/).
* A **bundler** lets you write modular code and bundle it together into small packages to optimize load time. Popular bundlers: [webpack](https://webpack.js.org/), [Parcel](https://parceljs.org/), [esbuild](https://esbuild.github.io/), [swc](https://swc.rs/).
* A **minifier** makes your code more compact so that it loads faster. Popular minifiers: [Terser](https://terser.org/), [swc](https://swc.rs/).
* A **server** handles server requests so that you can render components to HTML. Popular servers: [Express](https://expressjs.com/).
* A **linter** checks your code for common mistakes. Popular linters: [ESLint](https://eslint.org/).
* A **test runner** lets you run tests against your code. Popular test runners: [Jest](https://jestjs.io/).

If you prefer to set up your own JavaScript toolchain from scratch, [check out this guide](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658) that re-creates some of the Create React App functionality. A framework will usually also provide a routing and a data fetching solution. In a larger project, you might also want to manage multiple packages in a single repository with a tool like [Nx](https://nx.dev/react).

>>>>>>> 26a870e1c6e232062b760d37620d85802750e985
