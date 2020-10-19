---
id: code-splitting
title: Dzielenie kodu
permalink: docs/code-splitting.html
---

## Pakowanie {#bundling}

<<<<<<< HEAD
Większość reactowych aplikacji będzie "dołączała" swoje pliki poprzez narzędzia takie jak
[Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/) czy [Browserify](http://browserify.org/).
Pakowanie to proces śledzenia zaimportowanych plików i łączenia ich w pojedynczy plik tzw. "bundle" (pol. *paczka*).
Taka paczka może zostać umieszczona na stronie w celu załadowania całej aplikacji naraz.
=======
Most React apps will have their files "bundled" using tools like [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/) or [Browserify](http://browserify.org/). Bundling is the process of following imported files and merging them into a single file: a "bundle". This bundle can then be included on a webpage to load an entire app at once.
>>>>>>> 4e6cee1f82737aa915afd87de0cd4a8393de3fc8

#### Przykład {#example}

**Kod aplikacji:**

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

**Paczka:**

```js
function add(a, b) {
  return a + b;
}

console.log(add(16, 26)); // 42
```

> Uwaga:
>
> Twoje paczki prawdopodobnie będą się znacząco różnić. 

<<<<<<< HEAD
Jeśli używasz [Create React App](https://create-react-app.dev/), 
[Next.js](https://nextjs.org/), [Gatsby](https://www.gatsbyjs.org/) 
lub innego podobnego narzędzia, Webpack powinien być już skonfigurowany i gotowy do użytku.

Jeśli nie, musisz skonfigurować Webpacka samodzielnie. 
Przykłady znajdziesz w 
[przewodniku po instalacji](https://webpack.js.org/guides/installation/) oraz
w sekcji pt. ["Podstawowe informacje"](https://webpack.js.org/guides/getting-started/) zawartych w dokumentacji
Webpacka.
=======
If you're using [Create React App](https://create-react-app.dev/), [Next.js](https://nextjs.org/), [Gatsby](https://www.gatsbyjs.org/), or a similar tool, you will have a Webpack setup out of the box to bundle your app.

If you aren't, you'll need to setup bundling yourself. For example, see the [Installation](https://webpack.js.org/guides/installation/) and [Getting Started](https://webpack.js.org/guides/getting-started/) guides on the Webpack docs.
>>>>>>> 4e6cee1f82737aa915afd87de0cd4a8393de3fc8

## Dzielenie kodu {#code-splitting}

<<<<<<< HEAD
Tworzenie paczek jest świetne, ale wraz ze wzrostem objętości kodu twojej aplikacji, rośnie również objętość paczek.
Zwłaszcza gdy dołączasz do projektu duże, zewnętrzne biblioteki.
Musisz pilnować, aby twój pakiet nie był zbyt duży, ponieważ wtedy aplikacja 
będzie się długo ładowała.

Aby uniknąć problemu zbyt dużego pakietu, warto już na początku o tym pomyśleć 
i rozpocząć "dzielenie" swojej paczki.
 [Dzielenie kodu](https://webpack.js.org/guides/code-splitting/) to funkcja 
wspierana przez narzędzia takie jak [Webpack](https://webpack.js.org/guides/code-splitting/), [Rollup](https://rollupjs.org/guide/en/#code-splitting) oraz Browserify (przez
[factor-bundle](https://github.com/browserify/factor-bundle)), które mogą tworzyć 
wiele pakietów doładowywanych dynamicznie w czasie wykonania kodu aplikacji.

Dzielenie kodu twojej aplikacji ułatwi ci użycie "leniwego ładowania" do wczytywania jedynie tych zasobów które są aktualnie wymagane przez 
użytkownika zasobów, co może znacznie poprawić wydajność twojej aplikacji.
Mimo że nie zmniejszysz w ten sposób sumarycznej ilości kodu, unikniesz ładowania
funkcjonalności zbędnych dla użytkownika w danym momencie, co przełoży się na mniejszą ilość kodu do pobrania na starcie aplikacji.

## `import()` {#import}

Najlepszym sposobem na wprowadzenie podziału kodu do twojej aplikacji jest użycie dynamicznego wariantu funkcji
`import()`.
=======
Bundling is great, but as your app grows, your bundle will grow too. Especially if you are including large third-party libraries. You need to keep an eye on the code you are including in your bundle so that you don't accidentally make it so large that your app takes a long time to load.

To avoid winding up with a large bundle, it's good to get ahead of the problem and start "splitting" your bundle. Code-Splitting is a feature
supported by bundlers like [Webpack](https://webpack.js.org/guides/code-splitting/), [Rollup](https://rollupjs.org/guide/en/#code-splitting) and Browserify (via [factor-bundle](https://github.com/browserify/factor-bundle)) which can create multiple bundles that can be dynamically loaded at runtime.

Code-splitting your app can help you "lazy-load" just the things that are currently needed by the user, which can dramatically improve the performance of your app. While you haven't reduced the overall amount of code in your app, you've avoided loading code that the user may never need, and reduced the amount of code needed during the initial load.

## `import()` {#import}

The best way to introduce code-splitting into your app is through the dynamic `import()` syntax.
>>>>>>> 4e6cee1f82737aa915afd87de0cd4a8393de3fc8

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

<<<<<<< HEAD
Gdy Webpack natknie się na taką składnię, automatycznie zacznie dzielić kod w twojej aplikacji.
Jeśli używasz Create React App, posiadasz już gotową konfigurację i możesz natychmiast
[zacząć z niej korzystać](https://create-react-app.dev/docs/code-splitting/).
Jest ona również obsługiwana domyślnie przez [Next.js](https://nextjs.org/docs/advanced-features/dynamic-import).

Jeśli konfigurujesz Webpacka samodzielnie, zalecamy przeczytać
[przewodnik po dzieleniu kodu](https://webpack.js.org/guides/code-splitting/). 
Twoja konfiguracja Webpacka powinna wyglądać podobnie [do tej](https://gist.github.com/gaearon/ca6e803f5c604d37468b0091d9959269).

Kiedy używasz [Babela](https://babeljs.io/), musisz się upewnić, że jest on w stanie sparsować
składnię dynamicznego importu, ale jej nie przekształca w żaden sposób. W tym celu skorzystaj z pluginu [@babel/plugin-syntax-dynamic-import](https://classic.yarnpkg.com/en/package/@babel/plugin-syntax-dynamic-import).
=======
When Webpack comes across this syntax, it automatically starts code-splitting your app. If you're using Create React App, this is already configured for you and you can [start using it](https://create-react-app.dev/docs/code-splitting/) immediately. It's also supported out of the box in [Next.js](https://nextjs.org/docs/advanced-features/dynamic-import).

If you're setting up Webpack yourself, you'll probably want to read Webpack's [guide on code splitting](https://webpack.js.org/guides/code-splitting/). Your Webpack config should look vaguely [like this](https://gist.github.com/gaearon/ca6e803f5c604d37468b0091d9959269).

When using [Babel](https://babeljs.io/), you'll need to make sure that Babel can parse the dynamic import syntax but is not transforming it. For that you will need [@babel/plugin-syntax-dynamic-import](https://classic.yarnpkg.com/en/package/@babel/plugin-syntax-dynamic-import).
>>>>>>> 4e6cee1f82737aa915afd87de0cd4a8393de3fc8

## `React.lazy` {#reactlazy}

> Uwaga:
>
> `React.lazy` i `Suspense` nie są jeszcze dostępne dla renderowania po stronie serwera.
> Jeśli chcesz dzielić kod dla aplikacji renderowanej na serwerze, sugerujemy skorzystać 
> z pakietu [Loadable Components](https://github.com/gregberge/loadable-components).  
> Ma on przystępną [instrukcję dzielenia pakietów przy renderowaniu po stronie serwera](https://loadable-components.com/docs/server-side-rendering/).

Funkcja `React.lazy` pozwala renderować dynamicznie importowane komponenty jak zwykłe komponenty.

**Przed:**

```js
import OtherComponent from './OtherComponent';
```

**Po:**

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

Powyższy kod automatycznie załaduje paczkę zawierającą `OtherComponent` podczas pierwszego renderowania komponentu.

`React.lazy` jako argument przyjmuje funkcję, która wywołuje dynamiczny `import()`.
Musi ona zwrócić obiekt (`Promise`) (pol. *obietnicę*), która rozwiązuje się do modułu z eksportem domyślnym (`default`) zawierającym
komponent reactowy.

"Leniwy" komponent powinien zostać wyrenderowany wewnątrz `Suspense`, dzięki któremu na czas ładowania możemy wyświetlić komponent zastępczy (np. wskaźnik ładowania).

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Wczytywanie...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

Właściwość `fallback` tego komponentu akceptuje dowolny element reactowy, który będzie wyświetlany
 w trakcie oczekiwania na załadowanie komponentu. Możesz umieścić komponent `Suspense` 
 w dowolnym miejscu nad "leniwym" (ang. *lazy*) komponentem. Możesz nawet opakować kilka "leniwych" komponentów
 w jeden komponent `Suspense`.

```js
import React, { Suspense } from 'react';

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

Jeśli inny moduł nie wczyta się poprawnie (na przykład z powodu awarii sieci), spowoduje to błąd. 
Możesz go obsłużyć aby zapewnić użytkownikowi lepsze doświadczenie, a także aby określić sposób obsługi błędu za pomocą 
[granicy błędu](/docs/error-boundaries.html). Taką granicę błędu możesz umieścić w dowolnym
miejscu ponad "leniwymi" komponentami i, na przykład, aby wyświetlić stan błędu, gdy połączenie z siecią zostanie zerwane.

```js
import React, { Suspense } from 'react';
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

## Podział kodu na podstawie ścieżki URL {#route-based-code-splitting}

<<<<<<< HEAD
Decyzja o tym, w których miejscach podzielić kod aplikacji, może okazać się kłopotliwa.
Zależy ci na miejscach, że wybierasz miejsca, które równomiernie podzielą twoje pakiety,
ale nie chcesz zepsuć doświadczeń użytkownika.

Dobrym punktem startowym są ścieżki (ang. *routes*) w aplikacji. Większość ludzi korzystających z Internetu przyzwyczajona jest,
że przejście pomiędzy stronami zajmuje trochę czasu. Dodatkowo, zazwyczaj podczas takiego przejścia spora część ekranu jest renderowana ponownie
Można więc założyć, że użytkownik nie będzie wykonywał żadnych akcji na interfejsie podczas ładowania.

Oto przykład skonfigurowania dzielenia kodu aplikacji opartego na ścieżkach, przy użyciu 
biblioteki [React Router](https://reacttraining.com/react-router/) wraz z funkcją `React.lazy`.
=======
Deciding where in your app to introduce code splitting can be a bit tricky. You want to make sure you choose places that will split bundles evenly, but won't disrupt the user experience.

A good place to start is with routes. Most people on the web are used to page transitions taking some amount of time to load. You also tend to be re-rendering the entire page at once so your users are unlikely to be interacting with other elements on the page at the same time.

Here's an example of how to setup route-based code splitting into your app using libraries like [React Router](https://reacttraining.com/react-router/) with `React.lazy`.
>>>>>>> 4e6cee1f82737aa915afd87de0cd4a8393de3fc8

```js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Wczytywanie...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

## Eksporty nazwane {#named-exports}

`React.lazy` obecnie obsługuje tylko domyślne eksporty. Jeśli moduł, który chcesz zaimportować,
używa nazwanych eksportów, możesz utworzyć moduł pośredni, który ponownie eksportuje je jako
domyślny eksport. Gwarantuje to działanie mechanizmu "tree-shaking" (pol. *potrząsanie drzewem*), a także zapobiega pobieraniu nieużywanych komponentów.

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
