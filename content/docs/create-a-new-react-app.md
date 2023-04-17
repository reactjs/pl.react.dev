---
id: create-a-new-react-app
title: Stwórz nową aplikację w Reakcie
permalink: docs/create-a-new-react-app.html
redirect_from:
  - "docs/add-react-to-a-new-app.html"
prev: add-react-to-a-website.html
next: cdn-links.html
---

<div class="scary">

>
> These docs are old and won't be updated. Go to [react.dev](https://react.dev/) for the new React docs.
>
> See [Start a New React Project](https://react.dev/learn/start-a-new-react-project) for the recommended ways to create an app.

</div>

Najwygodniej będzie ci się pracowało, jeśli zastosujesz zintegrowany zestaw narzędzi (ang. *toolchain*). Użycie go pozwoli ci też zapewnić dobre doświadczenie użytkownikom twojej aplikacji.

Poniżej przedstawiamy kilka popularnych zestawów narzędziowych używanych w Reakcie. Pomagają one w zadaniach typu:

* zwiększanie skali projektu do wielu plików i komponentów;
* stosowanie dodatkowych bibliotek dostępnych w npm;
* wczesne wykrywanie często popełnianych błędów;
* ciągła, edycja CSS i JS w trakcie tworzenia aplikacji bez konieczności odświeżania strony w przeglądarce;
* optymalizacja zbudowanego kodu przed wdrożeniem go do środowiska produkcyjnego.

Zestawy narzędziowe, które tutaj podajemy, umożliwiają szybkie rozpoczęcie pracy nad aplikacją i **nie wymagają żadnej wstępnej konfiguracji**

## Stosowanie zestawu narzędziowego nie jest konieczne {#you-might-not-need-a-toolchain}

Jeśli powyższe zadania nie przysparzają ci żadnych problemów lub jeśli nie wiesz jeszcze, jak stosować narzędzia JavaScript, możesz [dodać React jako zwykły znacznik `<script>` do strony HTML](/docs/add-react-to-a-website.html), ewentualnie [z użyciem JSX](/docs/add-react-to-a-website.html#optional-try-react-with-jsx).

Jest to **najprostszy sposób zintegrowania Reacta z istniejącą już stroną internetową**. Zestaw narzędziowy możesz zawsze dodać do swojej aplikacji, gdy pojawi się taka potrzeba.

## Zalecane zestawy narzędziowe {#recommended-toolchains}

Zespół Reacta rekomenduje następujące rozwiązania:

- Jeśli **uczysz się Reacta** lub jeśli **tworzysz nową aplikację [jednostronicową](/docs/glossary.html#single-page-application),** skorzystaj z [Create React App](#create-react-app).
- Jeśli tworzysz **stronę internetową renderowaną na serwerze z użyciem Node.js,** spróbuj zastosować [Next.js](#nextjs).
- Jeśli tworzysz **stronę statyczną, która ma głównie wyświetlać określone treści,** spróbuj zastosować [Gatsby](#gatsby).
- Jeśli tworzysz **bibliotekę komponentów** lub **dokonujesz integracji z istniejącą bazą kodu,** spróbuj zastosować [bardziej elastyczne zestawy narzędziowe](#more-flexible-toolchains).


### Create React App {#create-react-app}

[Create React App](http://github.com/facebookincubator/create-react-app) zapewnia bardzo dogodne środowisko pracy sprzyjające **nauce Reacta**. Jest to najlepszy sposób, aby zacząć tworzyć **nową [jednostronicową](/docs/glossary.html#single-page-application) aplikację** w Reakcie.

Środowisko pracy stworzone przez Create React App nie tylko umożliwi ci stosowanie najnowszych funkcjonalności języka JavaScript, lecz także zoptymalizuje twój kod przed oddaniem go do użytku i ogólnie znacznie usprawni twoją pracę. Aby móc skorzystać z tego rozwiązania na swoim komputerze, będziesz potrzebować [Node >= 14.0.0 and npm >= 5.6](https://nodejs.org/en/). Stworzenie projektu umożliwią ci następujące komendy:

```bash
npx create-react-app moja-aplikacja
cd moja-aplikacja
npm start
```

>Wskazówka
>
> `npx` w pierwszej linijce powyżej to nie literówka, to [narzędzie uruchamiające pakiety zawarte w npm 5.2+](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

Create React App nie obsługuje ani logiki backendu ani baz danych; tworzy jedynie frontendowy potok budowania (ang. *build pipeline*). Dzięki temu możesz go używać z dowolnie wybranym przez siebie backendem. Create React App zawiera narzędzia takie jak [Babel](http://babeljs.io/) i [webpack](https://webpack.js.org/), ale nie musisz nic o nich wiedzieć, aby z powodzeniem używać ich w swoich projektach.

Kiedy uznasz, że twoja aplikacja jest gotowa do wdrożenia do środowiska produkcyjnego, zastosuj komendę `npm run build`. Dzięki temu uzyskasz zoptymalizowaną wersję swojej aplikacji. Znajdziesz ją w folderze `build`. Więcej informacji na temat Create React App znajdziesz w [pliku README](https://github.com/facebookincubator/create-react-app#create-react-app--) oraz w tym [Przewodniku użytkownika](https://facebook.github.io/create-react-app/).

### Next.js {#nextjs}

[Next.js](https://nextjs.org/) jest popularnym, lekkim frameworkiem służącym do budowy aplikacji reactowych **statycznych oraz renderowanych po stronie serwera**. Zestaw ten zawiera **rozwiązania ułatwiające dodawanie stylu  i mechanizmy routingu**. Ponadto, Next.js domyślnie zakłada, że stosujesz [Node.js](https://nodejs.org/) jako środowisko serwerowe.

Zapoznaj się z zestawem narzędziowym Next.js poprzez [oficjalny przewodnik](https://nextjs.org/learn/).

### Gatsby {#gatsby}

[Gatsby](https://www.gatsbyjs.org/) to najlepsze narzędzie do tworzenia **stron statycznych** korzystających z Reacta. Pozwala ono na tworzenie struktury aplikacji przy użyciu komponentów reactowych, lecz jako wynik końcowy generuje wstępnie wyrenderowane pliki HTML i CSS, co zapewnienia maksymalną szybkość ładowania strony.

Zapoznaj się z Gatsbym poprzez [oficjalny przewodnik](https://www.gatsbyjs.org/docs/) oraz [galerię zestawów startowych](https://www.gatsbyjs.org/docs/gatsby-starters/).

### Bardziej elastyczne zestawy narzędziowe {#more-flexible-toolchains}

Podane niżej zestawy narzędziowe są stosunkowo bardziej elastyczne i dają większą dowolność konfiguracji. Polecamy je bardziej doświadczonym użytkownikom:

- **[Neutrino](https://neutrinojs.org/)** łączy w sobie siłę [webpacka](https://webpack.js.org/) z prostotą ustawień domyślnych. Zestaw ten zawiera ustawienia domyślne dla [aplikacji reactowych](https://neutrinojs.org/packages/react/) i [komponentów reactowych](https://neutrinojs.org/packages/react-components/).

- **[Nx](https://nx.dev/react)** jest zestawem narzędzi do programistów full-stackowych, z wbudowanym wsparciem dla Reacta, Next.js, [Expressa](https://expressjs.com/) i wielu innych.

- **[Parcel](https://parceljs.org/)** jest szybkim bundlerem aplikacji webowych, [współgrającym z Reactem](https://parceljs.org/recipes/react/).

- **[Razzle](https://github.com/jaredpalmer/razzle)** jest frameworkiem umożliwiającym renderowanie po stronie serwera bez konieczności konfiguracji, ale zarazem dającym większy wybór niż Next.js.

## Tworzenie zestawu narzędziowego od podstaw {#creating-a-toolchain-from-scratch}

W skład javascriptowych narzędzi do budowania aplikacji wchodzą zazwyczaj następujące elementy:

* **Menadżer pakietów** np. [Yarn](https://yarnpkg.com/) lub [npm](https://www.npmjs.com/). Umożliwia on korzystanie z ogromnego ekosystemu dodatkowych pakietów. Pozwala łatwo je instalować i aktualizować.

* **Bundler** np. [webpack](https://webpack.js.org/) lub [Parcel](https://parceljs.org/). Umożliwia on pisanie kodu modularnego i pakowania go w małe pakiety, aby zoptymalizować czas ładowania.

* **Kompilator** np. [Babel](http://babeljs.io/). Pozwala on na stosowanie nowych wersji JavaScriptu przy zachowaniu kompatybilności ze starszymi przeglądarkami.

Jeśli chcesz stworzyć swój własny zestaw narzędziowy od podstaw, zajrzyj do [tego przewodnika](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658). Dowiesz się z niego, jak odtworzyć niektóre z funkcjonalności Create React App.

Pamiętaj, aby upewnić się, że twój własny zestaw narzędziowy [jest przystosowany do wdrożeń produkcyjnych](/docs/optimizing-performance.html#use-the-production-build).
