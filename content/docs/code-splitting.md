---
id: code-splitting
title: Dzielenie kodu
permalink: docs/code-splitting.html
---

## Pakowanie {#bundling}

Większość Reactowych aplikacji będzie "dołączała" swoje pliki przez narzędzia takie jak
[Webpack](https://webpack.js.org/) czy [Browserify](http://browserify.org/).
Pakowanie to proces śledzenia zaimportowanych plików i łączenia je w pojedynczy plik "bundle". 
Tak zbudowany pakiet jest gotowy do umieszczenia na stronie aby załadować całą aplikację.

#### Przykład {#example}

**App:**

```js
// app.js
import { add } from './math.js';

console.log(add(16, 26)); // 42
```

```js
// math.js
export function add(a, b) {
  return a + b;
}
```

**Bundle:**

```js
function add(a, b) {
  return a + b;
}

console.log(add(16, 26)); // 42
```

> Notatka:
>
> Twoje pakiety prawdopodobnie będą wyglądać znacznie inaczej 

Jeśli używasz [Create React App](https://github.com/facebookincubator/create-react-app), 
[Next.js](https://github.com/zeit/next.js/), [Gatsby](https://www.gatsbyjs.org/), 
lub innego podobnego narzędzia, będziesz miał gotową do pakowania konfigurację Webpacka.

Jeśli nie, będziesz potrzebował samodzielnie skonfigurować webpacka. 
Dla przykładu zerknij na przewodnik po 
[Instalacji](https://webpack.js.org/guides/installation/) oraz
[Podstawowe informacje](https://webpack.js.org/guides/getting-started/) zawarte w dokumentacji
Webpacka.

## Dzielenie kodu {#code-splitting}

Pakowanie jest świetne, ale wraz ze wzrostem twojej aplikacji, rośnie również paczka.
Zwłaszcza gdy dołączasz do projektu duże, zewnętrzne biblioteki.
Musisz pilnować, aby twój pakiet nie był zbyt duży, ponieważ wtedy aplikacja 
będzie się długo ładowała.

Aby uniknąć problemu zbyt dużego pakietu, warto już na początku o tym pomyśleć 
i rozpocząć "dzielenie" swojej paczki.
 [Dzielenie kodu](https://webpack.js.org/guides/code-splitting/) to funkcja 
wspierana przez narzędzia takie jak Webpack oraz Browserify (przez
[factor-bundle](https://github.com/browserify/factor-bundle)) które mogą tworzyć 
wiele dynamicznie ładujących się pakietów w czasie wykonania.

Dzielenie kodu ułatwi ci "leniwe ładowanie" tylko aktualnie wymaganych przez 
użytkownika zasobów, co może znacznie poprawić wydajność twojej aplikacji.
Mimo, że sumarycznie nie zmniejszasz ilości kodu, unikasz ładowania 
w danym momencie zbędnych dla użytkownika funkcji, co przekłada się na mniejszą ilość kodu do pobrania.

## `import()` {#import}

Najlepszym sposobem na wprowadzenie podziału kodu do twojej aplikacji jest dynamiczna składnia
`import()`.

**Przed:**

```js
import { add } from './math';

console.log(add(16, 26));
```

**Po:**

```js
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```

> Notatka:
>
> Dynamiczna składnia `import()` to [propozycja](https://github.com/tc39/proposal-dynamic-import) 
> ECMAScript (JavaScript), która aktualnie nie jest częścią standardu językowego. Oczekuje się natomiast,
> że wkrótce zostanie zaakceptowana jako powszechny standard.

Gdy Webpack natknie się na taką składnie, automatycznie zacznie dzielić kod w twojej aplikacji.
Jeśli używasz Create React App, posiadasz już gotową konfigurację i możesz natychmiast
[zacząć z niego korzystać](https://facebook.github.io/create-react-app/docs/code-splitting).
Również gotowo obsługuje to [Next.js](https://github.com/zeit/next.js/#dynamic-import).

Jeśli konfigurujesz Webpacka samodzielnie, prawdopodobnie chcesz przeczytać
[przewodnik po dzieleniu kodu Webpack](https://webpack.js.org/guides/code-splitting/). 
Twoja konfiguracja Webpacka powinna wyglądać podobnie [do tego](https://gist.github.com/gaearon/ca6e803f5c604d37468b0091d9959269).

Kiedy używasz [Babel](https://babeljs.io/), musisz się upewnić, że Babel może analizować dynamiczną
składnie importu, ale jej nie przekształca. Do tego będziesz potrzebować [babel-plugin-syntax-dynamic-import](https://yarnpkg.com/en/package/babel-plugin-syntax-dynamic-import).

## `React.lazy` {#reactlazy}

> Notatka:
>
> `React.lazy` i Suspense nie jest jeszcze dostępne dla renderowania po stronie serwera
> Jeśli chcesz dzielić kod dla aplikacji renderowanej na serwerze zalecamy [Komponenty Ładowalne 
> (Loadable Components)](https://github.com/smooth-code/loadable-components). 
> Mają przyjemny [przewodnik do dzielenia pakietów przy renderowaniu po stronie serwera](https://github.com/smooth-code/loadable-components/blob/master/packages/server/README.md).

Funkcja `React.lazy` pozwala ci dynamicznie renderować importy jako regularne komponenty.

**Przed:**

```js
import OtherComponent from './OtherComponent';

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```

**Po:**

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```

To automatycznie załaduje paczke zawierającą `OtherComponent` kiedy komponent będzie renderowany.

`React.lazy` przyjmuje funkcję, która dynamicznie woła `import()`. 
Musi zwrócić obietnicę (`Promise`) który rozstrzyga moduł z domyślnym (`default`) eksportem zawierający
komponent Reactowy.

### Zawieszenie {#suspense}

Jeśli moduł zawierający `OtherComponent` nie zostanie jeszcze załadowany na czas renderowania
`MyComponent`, musimy wyświetlić zapasową zawartość, dopóki trwa ładowanie - na przykład 
wskaźnik ładowania. Robimy to za pomocą komponentu `Suspense`.

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

Props `fallback` akceptuje wszystkie elementy Reactowe, które chcesz wyświetlić
 w trakcie oczekiwania na załadowanie komponentu. Możesz umieścić komponent `Suspense` 
 w dowolnym miejscu nad "leniwym" komponentem. Możesz nawet zawijać wiele "leniwych komponentów"
 za pomocą jednego komponentu `Suspense`.

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```

### Granice błędów {#error-boundaries}

Jeśli inny moduł się nie doładuje (na przykład z powodu awarii sieci), spowoduje to błąd. 
Możesz je obsługiwać aby zapewnić najlepsze doświadczenia użytkownika i zarządzać ratunkiem z pomocą 
[Granic Błędów](/docs/error-boundaries.html). Po utworzeniu granic możesz ich użyć w dowolnym
miejscu nad "leniwymi" komponentami, aby wyświetlić stan błędu gdy sieć jest niedostępna.

```js
import MyErrorBoundary from './MyErrorBoundary';
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```

## Podział kodu na podstawie szlaku (Route-based) {#route-based-code-splitting}

Decydowanie gdzie w twojej aplikacji użyć podziału kodu może być nieco skomplikowane.
Chcesz mieć pewność, że wybierasz miejsca, które równomiernie podzielą twoje pakiety,
ale nie chcesz naruszyć doświadczeń użytkownika.

Dobrym miejscem do rozpoczęcia są trasy (routes). Większość osób w sieci jest przywyczajona
do przechodzenia między stronami, które wymaga pewnego czasu. Jest także trend ponownego
renderowania całej strony, więc uzytkownicy raczej nie będą wchodzić w inną interakcje
w tym samym czasie.

Oto przykład konfiguracji dzielenia kodu w twojej aplikacji opartej na trasach za pomoca 
bibliotek takich jak [React Router](https://reacttraining.com/react-router/) wraz z `React.lazy`.

```js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

## Eksport nazw {#named-exports}

`React.lazy` obecnie obsługuje tylko domyślne eksporty. Jeśli moduł, który chcesz zaimportowac,
używa nazwanych eksportów, możesz utworzyć moduł pośredni, który ponownie eksportuje je jako
domyślny eksport. Gwarantuje to, utrzymanie działającego drzewa oraz niepobieranie nieuzywanych 
komponentów.

```js
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;
```

```js
// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";
```

```js
// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```
