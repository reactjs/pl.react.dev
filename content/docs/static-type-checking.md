---
id: static-type-checking
title: Statyczne sprawdzanie typów
permalink: docs/static-type-checking.html
---

Narzędzia statycznie sprawdzające typy, jak [Flow](https://flow.org/) i [TypeScript](https://www.typescriptlang.org/), identyfikują określone rodzaje problemów jeszcze zanim uruchomisz kod. Usprawniają one również pracę programisty poprzez dodanie przydatnych funkcjonalności, jak np. autouzupełniania. Z tego powodu w większych aplikacjach sugerujemy zastąpienie `PropTypes` narzędziami Flow lub TypeScript.

## Flow {#flow}

[Flow](https://flow.org/) jest narzędziem statycznie sprawdzającym typy w kodzie javascriptowym. Jest rozwijany przez Facebooka i często używany w połączeniu z Reactem. Pozwala opisać zmienne, funkcje i komponenty reactowe za pomocą specjalnej składni, a także wyłapuje zawczasu potencjalne problemy. Aby zapoznać się z jego podstawami, przeczytaj [wstęp do Flow](https://flow.org/en/docs/getting-started/).

Aby móc używać Flow, musisz:

* Dodać Flow do projektu jako zależność.
* Upewnić się, że składnia Flow jest usuwana podczas kompilacji.
* Dodać adnotacje typów i uruchomić Flow w celu ich sprawdzenia.

Wszystkie te kroki opisaliśmy szczegółowo poniżej.

### Dodawanie Flow do projektu {#adding-flow-to-a-project}

Najpierw, będąc w terminalu, przejdź do folderu z projektem, a następnie uruchom następujące polecenie:

Jeśli używasz [Yarna](https://yarnpkg.com/), uruchom:

```bash
yarn add --dev flow-bin
```

Jeśli używasz [npma](https://www.npmjs.com/), uruchom:

```bash
npm install --save-dev flow-bin
```

Powyższa komenda zainstaluje w twoim projekcie najnowszą wersję narzędzia Flow.

Teraz dodaj `flow` do sekcji `"scripts"` wewnątrz pliku `package.json`, aby móc skorzystać z tego skryptu w terminalu:

```js{4}
{
  // ...
  "scripts": {
    "flow": "flow",
    // ...
  },
  // ...
}
```

Na koniec uruchom jedno z następujących poleceń:

Jeśli używasz [Yarna](https://yarnpkg.com/), uruchom:

```bash
yarn run flow init
```

Jeśli używasz [npma](https://www.npmjs.com/), uruchom:

```bash
npm run flow init
```

Powyższe komendy stworzą plik konfiguracyjny dla Flow, który należy umieścić w repozytorium.

### Usuwanie składni Flow podczas kompilacji {#stripping-flow-syntax-from-the-compiled-code}

Flow rozszerza język JavaScript poprzez dodanie specjalnej składni, służącej do deklaracji typów. Niestety przeglądarki nie rozumieją tej składni, dlatego musimy się upewnić, że nie trafi ona do skompilowanego kodu javascriptowego wysyłanego do przeglądarki.

Dokładny zestaw kroków opisujący sposób skonfigurowania tego zależy od narzędzi, którymi kompilujesz swój kod javascriptowy.

#### Create React App {#create-react-app}

Jeśli twój projekt został stworzony przy pomocy [Create React App](https://github.com/facebookincubator/create-react-app) - gratulujemy! Adnotacje dla Flow są już domyślnie usuwane podczas kompilacji, więc nie musisz niczego więcej konfigurować.

#### Babel {#babel}

>Uwaga:
>
>Poniższe instrukcje *nie* dotyczą użytkowników Create React App. Pomimo iż Create React App używa "pod maską" Babela, jest on w tym przypadku już skonfigurowany tak, aby rozumieć Flow. Wykonaj poniższe kroki, jeśli *nie* używasz Create React App.

Jeśli Babel w twoim projekcie został skonfigurowany ręcznie, musisz zainstalować specjalny zestaw narzędzi (ang. *preset*) dla Flow.

Jeśli używasz Yarna, uruchom:

```bash
yarn add --dev @babel/preset-flow
```

Jeśli używasz npma, uruchom:

```bash
npm install --save-dev @babel/preset-flow
```

Następnie dodaj zestaw `flow` do swojej [konfiguracji Babela](https://babeljs.io/docs/usage/babelrc/). Na przykład, jeśli konfiguracja w twoim projekcie jest trzymana w pliku `.babelrc`, mógłby on wyglądać następująco:

```js{3}
{
  "presets": [
    "@babel/preset-flow",
    "react"
  ]
}
```

Pozwoli ci to używać w kodzie składni Flow.

>Uwaga:
>
>Flow nie wymaga użycia zestawu `react`, jednak często są one używane w parze. Flow sam w sobie rozumie składnię JSX.

#### Inne sposoby konfiguracji etapu budowania {#other-build-setups}

Jeśli nie korzystasz ani z Create React App, ani z Babela, możesz użyć paczki [flow-remove-types](https://github.com/flowtype/flow-remove-types), która usunie deklaracje typów.

### Korzystanie z Flow {#running-flow}

Jeśli udało ci się skonfigurować wszystko, co opisaliśmy powyżej, możesz śmiało uruchomić Flow po raz pierwszy.

```bash
yarn flow
```

Jeśli używasz npma, uruchom:

```bash
npm run flow
```

Powinien pojawić się następujący komunikat ("Brak błędów!"):

```
No errors!
✨  Done in 0.17s.
```

### Dodawanie adnotacji w Flow {#adding-flow-type-annotations}

Domyślnie Flow sprawdza tylko te pliki, które zawierają następującą linię:

```js
// @flow
```

Zwykle umieszcza się ją na początku pliku. Spróbuj dodać ją do kilku plików i uruchom `yarn flow` lub `npm run flow`, aby sprawdzić, czy Flow znalazł jakieś błędy.

Istnieje również [pewien sposób](https://flow.org/en/docs/config/options/#toc-all-boolean), by wymusić na Flow sprawdzanie *wszystkich* plików, bez względu na to, czy zawierają powyższą adnotację. W istniejących projektach może to wprowadzić niemałe zamieszanie, jednak sensowne jest ustawienie tej opcji w nowych projektach, w których od początku chcemy mieć zapewnione sprawdzanie typów przez Flow.

Masz już wszystko! Jeśli chcesz dowiedzieć się więcej na temat Flow, przeczytaj:

* [Dokumentacja Flow: Adnotacje typów](https://flow.org/en/docs/types/)
* [Dokumentacja Flow: Edytory](https://flow.org/en/docs/editors/)
* [Dokumentacja Flow: React](https://flow.org/en/docs/react/)
* [Linting w Flow](https://medium.com/flow-type/linting-in-flow-7709d7a7e969)

## TypeScript {#typescript}

[TypeScript](https://www.typescriptlang.org/) jest językiem programowania rozwijanym przez Microsoft. Jest typowanym nadzbiorem języka JavaScript i posiada własny kompilator. Jako język typowany, TypeScript może wyłapywać błędy na etapie budowania, długo zanim aplikacja "ujrzy światło dzienne". [Dowiedz się więcej na temat użycia TypeScriptu w parze z Reactem](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter).

Aby móc używać TypeScriptu, musisz:
* Dodać TypeScript jako zależność twojego projektu
* Skonfigurować opcje kompilatora typescriptowego
* Użyć odpowiednich rozszerzeń nazw plików
* Dodać definicje dla używanych w projekcie bibliotek

Zacznijmy po kolei.

### Używanie TypeScriptu w Create React App {#using-typescript-with-create-react-app}

Create React App domyślnie obsługuje TypeScript.

Aby stworzyć **nowy projekt** mający wsparcie dla TypeScriptu, uruchom:

```bash
npx create-react-app my-app --template typescript
```

Możesz go również [**dodać do istniejącego projektu stworzonego z Create React App**](https://facebook.github.io/create-react-app/docs/adding-typescript).

>Uwaga:
>
>Jeśli używasz Create React App, możesz **pominąć resztę instrukcji**, ponieważ opisują one ręczną konfigurację, której nie muszą przeprowadzać użytkownicy Create React App.


### Dodawanie TypeScriptu do projektu {#adding-typescript-to-a-project}
Wszystko zaczyna się od uruchomienia jednego polecenia w terminalu.

Jeśli używasz [Yarna](https://yarnpkg.com/), uruchom:

```bash
yarn add --dev typescript
```

Jeśli używasz [npma](https://www.npmjs.com/), uruchom:

```bash
npm install --save-dev typescript
```

Gratulacje! Udało ci się zainstalować w projekcie najnowszą wersję TypeScriptu. Dało nam to dostęp do komendy `tsc`. Zanim zaczniesz konfigurowanie, dodaj `tsc` do sekcji `"scripts"` w pliku `package.json`:

```js{4}
{
  // ...
  "scripts": {
    "build": "tsc",
    // ...
  },
  // ...
}
```

### Konfigurowanie kompilatora TypeScriptu {#configuring-the-typescript-compiler}
Kompilator na nic się nie zda, jeśli nie powiemy mu, co ma robić. W TypeScripcie reguły dla kompilatora definiuje się w specjalnym pliku `tsconfig.json`. Aby wygenerować taki plik:

Jeśli używasz [Yarna](https://yarnpkg.com/), uruchom:

```bash
yarn run tsc --init
```

Jeśli używasz [npma](https://www.npmjs.com/), uruchom:

```bash
npx tsc --init
```

Kiedy zajrzysz do nowo wygenerowanego pliku `tsconfig.json`, zobaczysz, jak wiele jest opcji konfiguracji kompilatora. Szczegółowy [opis wszystkich opcji znajdziesz tutaj](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

Spośród licznych opcji interesować nas będzie `rootDir` i `outDir`. Jak można się domyślić, kompilator odczyta pliki typescriptowe i wygeneruje z nich pliki javascriptowe. Jednak chcemy jasno określić, które z nich są plikami źródłowymi, a które wygenerowanym automatycznie kodem.

Zajmiemy się tym w dwóch krokach:
* Najpierw dostosujmy strukturę naszego projektu do poniższego schematu. Umieśćmy wszystkie pliki źródłowe w folderze `src`.

```
├── package.json
├── src
│   └── index.ts
└── tsconfig.json
```

* Następnie skonfigurujmy kompilator tak, by wiedział, gdzie są pliki źródłowe, a gdzie folder docelowy na wygenerowane pliki.

```js{6,7}
// tsconfig.json

{
  "compilerOptions": {
    // ...
    "rootDir": "src",
    "outDir": "build"
    // ...
  },
}
```

Świetnie! Teraz, gdy tylko uruchomimy skrypt budujący, kompilator wygeneruje pliki z kodem javascriptowym do folderu `build`. Projekt [TypeScript React Starter](https://github.com/Microsoft/TypeScript-React-Starter/blob/master/tsconfig.json) zawiera plik `tsconfig.json` z rozsądną konfiguracją początkową dla nowych projektów.

Zwykle nie trzyma się wygenerowanych plików javascriptowych w repozytorium, więc upewnij się, że folder ten dodany jest do listy `.gitignore`.

### Rozszerzenia plików {#file-extensions}
W Reakcie kod komponentów zwykle umieszcza się w plikach `.js`. W TypeScripcie mamy do wyboru dwa rozszerzenia:

`.ts` jest domyślnym rozszerzeniem plików, natomiast `.tsx` służy do oznaczania plików, które zawierają składnię `JSX`.

### Uruchamianie TypeScriptu {#running-typescript}

Jeśli udało ci się wykonać powyższe instrukcje, możesz śmiało uruchomić TypeScript po raz pierwszy.

```bash
yarn build
```

Lub jeśli używasz npma:

```bash
npm run build
```

Jeśli nie wyświetlił się żaden komunikat, to znaczy, że kompilacja przebiegła pomyślnie.

### Definicje typów {#type-definitions}
Aby móc wyświetlać błędy i sugestie dla innych paczek, kompilator polega na plikach z deklaracjami. Plik z deklaracjami dostarcza wszystkie informacje na temat typów w danej bibliotece. Pozwala to na używanie w naszym projekcie bibliotek javascriptowych z rejestru npm.

Istnieją dwa główne miejsca, z których odczytamy typy dla biblioteki:

__Dołączone__ - Niektóre biblioteki dołączają własne typy z deklaracjami. Jest to korzystne dla nas, ponieważ będziemy mogli zacząć korzystać z paczki zaraz po jej zainstalowaniu. Aby upewnić się, że biblioteka posiada dołączone typy, poszukaj w niej pliku `index.d.ts`. Niektóre biblioteki wyszczególniają ten plik w `package.json` pod kluczem `typings` lub `types`.

__[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)__ - DefinitelyTyped to ogromne repozytorium deklaracji typów dla bibliotek, które nie dołączają swoich własnych typów. Deklaracje te są crowd-source'owane i zarządzane przez firmę Microsoft oraz przez kontrybutorów open source'owych. Dla przykładu, React nie posiada własnego pliku z deklaracjami typów. Zamiast tego możemy pobrać go z DefinitelyTyped. Aby to zrobić, wpisz w terminalu następujące polecenie.

```bash
# yarn
yarn add --dev @types/react

# npm
npm i --save-dev @types/react
```

__Deklaracje lokalne__
Czasami paczka, której chcesz użyć, nie posiada własnych typów ani nie ma ich w repozytorium DefinitelyTyped. W takim przypadku możesz stworzyć własny, lokalny plik z deklaracjami `declarations.d.ts` w głównym katalogu projektu. Przykładowa deklaracja może wyglądać tak:

```typescript
declare module 'querystring' {
  export function stringify(val: object): string
  export function parse(val: string): object
}
```

Możesz już zacząć programować! Po więcej informacji o TypeScripcie zajrzyj do poniższych źródeł:

* [Dokumentacja TypeScripta: Typy podstawowe](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
* [Dokumentacja TypeScripta: Migracja z JavaScriptu](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
* [Dokumentacja TypeScripta: React i Webpack](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)

## ReScript {#rescript}

[ReScript](https://rescript-lang.org/) jest typowanym językiem, który kompiluje się do JavaScriptu. Jego głównymi właściwościami są: gwarancja 100% pokrycia typami, [pierwszoklasowe](https://pl.wikipedia.org/wiki/Typ_pierwszoklasowy) (*ang. first-class*) wsparcie dla JSX oraz dedykowane [wiązania dla Reacta](https://rescript-lang.org/docs/react/latest/introduction), które pozwalają na zintegrowanie z istniejącymi projektami napisanymi w JS/TS.

Aby dowiedzieć się więcej na temat integrowania ReScriptu z istniejącym projektem w JS/React, [przeczytaj dokumentację](https://rescript-lang.org/docs/manual/latest/installation#integrate-into-an-existing-js-project).

## Kotlin {#kotlin}

[Kotlin](https://kotlinlang.org/) jest statycznie typowanym językiem rozwijanym przez JetBrains. Docelowe platformy dla niego to JVM, Android, LLVM i [JavaScript](https://kotlinlang.org/docs/reference/js-overview.html). 

JetBrains rozwija i utrzymuje kilka narzędzi dedykowanych dla społeczności Reacta: [API dla React](https://github.com/JetBrains/kotlin-wrappers), jak również [Create React Kotlin App](https://github.com/JetBrains/create-react-kotlin-app). To ostatnie narzędzie pozwala na wystartowanie aplikacji reactowej z Kotlinem bez żadnego konfigurowania projektu.

## Inne języki {#other-languages}

Zauważ, że istnieją jeszcze inne statycznie typowane języki, kompilowane do JavaScriptu i przez to kompatybilne z Reactem. Na przykład [F#/Fable](https://fable.io/) z [elmish-react](https://elmish.github.io/react). Zajrzyj na ich strony internetowe po więcej informacji. Jeśli znasz jeszcze jakieś inne statycznie typowane języki, które współgrają z Reactem, nie wahaj się dodać ich do tej strony!
