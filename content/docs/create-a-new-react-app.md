---
id: create-a-new-react-app
title: Stwórz nową aplikację w Reakcie
permalink: docs/create-a-new-react-app.html
redirect_from:
  - "docs/add-react-to-a-new-app.html"
prev: add-react-to-a-website.html
next: cdn-links.html
---

Najwygodniej będzie ci się pracowało jeśli zastosujesz zintegrowany zestaw narzędzi (ang. toolchain). Użycie go pozwoli ci też zapewnić dobre doświadczenie użytkownikom twojej aplikacji.

Poniżej przedstawiamy kilka popularnych zestawów narzędziowych używanych w Reakcie. Pomagają one w zadaniach typu:

* Zwiększanie skali projektu do wielu plików i komponentów.
* Stosowanie dodatkowych bibliotek dostępnych w npm.
* Wczesne wykrywanie często popełnianych błędów.
* Ciągła, automatyczna edycja CSS i JS w trakcie tworzenia aplikacji.
* Optymalizacja kodu przed oddaniem aplikacji do użytku.

Zestawy narzędziowe, które tutaj podajemy umożliwiają szybkie rozpoczęcie pracy and aplikacją i **nie wymagają żadnej wstępnej konfiguracji**

## Stosowanie zestawu narzędziowego nie jest konieczne {#you-might-not-need-a-toolchain}

Jeśli powyższe zadania nie przysparzają ci żadnych problemów lub jeśli nie wiesz jeszcze jak stosować narzędzia JavaScript, możesz [dodać React jako zwykły znacznik `<script>` do strony HTML](/docs/add-react-to-a-website.html), ewentualnie [z użyciem JSX](/docs/add-react-to-a-website.html#optional-try-react-with-jsx).

Jest to **najprostszy sposób zintegrowania Reacta z istniejącą już stroną internetową**. Zestaw narzędziowy możesz zawsze dodać do swojej aplikacji jeśli zajdzie taka potrzeba.

## Zalecane zestawy narzędziowe {#recommended-toolchains}

Zespół Reacta rekomenduje następujące rozwiązania:

- Jeśli **uczysz się Reacta** lub jeśli **tworzysz nową aplikację [jednostronicową](/docs/glossary.html#single-page-application),** skorzystaj z [Create React App](#create-react-app).
- Jeśli tworzysz **stronę internetową renderowaną na serwerze z użyciem Node.js,** spróbuj zastosować [Next.js](#nextjs).
- Jeśli tworzysz **stronę statyczną, która ma głównie wyświetlać określone treści,** spróbuj zastosować [Gatsby](#gatsby).
- Jeśli tworzysz **bibliotekę kompnentów** lub **integrujesz z istniejącą bazą kodu,** spróbuj zastosować [bardziej uniwersalne zestwy narzędziowe](#more-flexible-toolchains).


### Create React App {#create-react-app}

[Create React App](http://github.com/facebookincubator/create-react-app) zapewnia bardzo dogodne środowisko pracy sprzyjające **nauce Reacta**. Jest to najlepszy sposób, aby zacząć tworzyć **nową [jednostronicową](/docs/glossary.html#single-page-application) aplikację** w Reakcie.

Środowisko pracy stworzone przez Create React App nie tylko umożliwi ci stosowanie najnowszych funkcjonalności JavaScript, lecz także zoptymalizuje twój kod przed oddaniem go do użytku i ogólnie znacznie usprawni twoją pracę. Aby móc skorzystać z tego rozwiązania na swoim komputerze, będziesz potrzebował Node >=6 oraz npm >=5.2. W celu stworzenia projektu zastosuj następujące komendy:

```bash
npx create-react-app my-app
cd my-app
npm start
```

>Wskazówka
> `npx` w pierwszej linijce powyżej to nie błąd w druku, to [narzędzie uruchamiające pakiety zawarte w npm 5.2+](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

Create React App nie obsługuje ani logiki backendu ani baz danych; tworzy jedynie front-endowy potok budowania (ang. build pipeline). Dzięki temu możesz go używać z dowolnie wybranym przez siebie backendem. Create React App zawiera [Babel](http://babeljs.io/) i [webpack](https://webpack.js.org/), ale nie musisz nic o nich wiedzieć, aby z powodzeniem używać tego zestawu narzędzi.

Kiedy uznasz, że twoja aplikacja jest gotowa do oddania do użytku, zastosuj komendę `npm run build`. Dzięki temu uzyskasz zoptymalizowaną wersję swojej aplikacji. Znajdziesz ją w folderze `build`. Więcej informacji na temat Create React App znajdziesz w [pliku README](https://github.com/facebookincubator/create-react-app#create-react-app-) oraz w tym [Przewodniku użytkownika](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#table-of-contents).

### Next.js {#nextjs}

[Next.js](https://nextjs.org/) jest popularnym, lekkim frameworkiem służącym do budowy aplikacji reactowych **statycznych oraz renderowanych po stronie serwera**. Zestaw ten zawiera **rozwiązania stylizujące  i mechanizmy routingu**. Ponadto, Next.js domyślnie zakłada, że stosujesz [Node.js](https://nodejs.org/) jako środowisko serwera.

Zapoznaj się z zestawem narzędziowym Next.js poprzez [oficjalny przewodnik](https://nextjs.org/learn/).

### Gatsby {#gatsby}

[Gatsby](https://www.gatsbyjs.org/) is the best way to create **static websites** with React. It lets you use React components, but outputs pre-rendered HTML and CSS to guarantee the fastest load time.

Learn Gatsby from [its official guide](https://www.gatsbyjs.org/docs/) and a [gallery of starter kits](https://www.gatsbyjs.org/docs/gatsby-starters/).

### More Flexible Toolchains {#more-flexible-toolchains}

The following toolchains offer more flexiblity and choice. We recommend them to more experienced users:

- **[Neutrino](https://neutrinojs.org/)** combines the power of [webpack](https://webpack.js.org/) with the simplicity of presets, and includes a preset for [React apps](https://neutrinojs.org/packages/react/) and [React components](https://neutrinojs.org/packages/react-components/).

- **[nwb](https://github.com/insin/nwb)** is particularly great for [publishing React components for npm](https://github.com/insin/nwb/blob/master/docs/guides/ReactComponents.md#developing-react-components-and-libraries-with-nwb). It [can be used](https://github.com/insin/nwb/blob/master/docs/guides/ReactApps.md#developing-react-apps-with-nwb) for creating React apps, too. 

- **[Parcel](https://parceljs.org/)** is a fast, zero configuration web application bundler that [works with React](https://parceljs.org/recipes.html#react).

- **[Razzle](https://github.com/jaredpalmer/razzle)** is a server-rendering framework that doesn't require any configuration, but offers more flexibility than Next.js.

## Creating a Toolchain from Scratch {#creating-a-toolchain-from-scratch}

A JavaScript build toolchain typically consists of:

* A **package manager**, such as [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/). It lets you take advantage of a vast ecosystem of third-party packages, and easily install or update them.

* A **bundler**, such as [webpack](https://webpack.js.org/) or [Parcel](https://parceljs.org/). It lets you write modular code and bundle it together into small packages to optimize load time.

* A **compiler** such as [Babel](http://babeljs.io/). It lets you write modern JavaScript code that still works in older browsers.

If you prefer to set up your own JavaScript toolchain from scratch, [check out this guide](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658) that re-creates some of the Create React App functionality.

Don't forget to ensure your custom toolchain [is correctly set up for production](/docs/optimizing-performance.html#use-the-production-build).
