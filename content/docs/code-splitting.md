---
id: code-splitting
title: Dzielenie kodu
permalink: docs/code-splitting.html
---

## Pakowanie {#bundling}

Większość reactowych aplikacji będzie "dołączała" swoje pliki poprzez narzędzia takie jak
[Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/) czy [Browserify](http://browserify.org/).
Pakowanie to proces śledzenia zaimportowanych plików i łączenia ich w pojedynczy plik tzw. "bundle" (pol. *paczka*).
Taka paczka może zostać umieszczona na stronie w celu załadowania całej aplikacji naraz.

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

Jeśli używasz [Create React App](https://github.com/facebookincubator/create-react-app), 
[Next.js](https://github.com/zeit/next.js/), [Gatsby](https://www.gatsbyjs.org/) 
lub innego podobnego narzędzia, Webpack powinien być już skonfigurowany i gotowy do użytku.

Jeśli nie, musisz skonfigurować Webpacka samodzielnie. 
Przykłady znajdziesz w 
[przewodniku po instalacji](https://webpack.js.org/guides/installation/) oraz
w sekcji pt. ["Podstawowe informacje"](https://webpack.js.org/guides/getting-started/) zawartych w dokumentacji
Webpacka.

## Dzielenie kodu {#code-splitting}

Tworzenie paczek jest świetne, ale wraz ze wzrostem objętości kodu twojej aplikacji, rośnie również objętość paczek.
Zwłaszcza gdy dołączasz do projektu duże, zewnętrzne biblioteki.
Musisz pilnować, aby twój pakiet nie był zbyt duży, ponieważ wtedy aplikacja 
będzie się długo ładowała.

Aby uniknąć problemu zbyt dużego pakietu, warto już na początku o tym pomyśleć 
i rozpocząć "dzielenie" swojej paczki.
 [Dzielenie kodu](https://webpack.js.org/guides/code-splitting/) to funkcja 
wspierana przez narzędzia takie jak Webpack oraz Browserify (przez
[factor-bundle](https://github.com/browserify/factor-bundle)), które mogą tworzyć 
wiele pakietów doładowywanych dynamicznie w czasie wykonania kodu aplikacji.

Dzielenie kodu twojej aplikacji ułatwi ci użycie "leniwego ładowania" do wczytywania jedynie tych zasobów które są aktualnie wymagane przez 
użytkownika zasobów, co może znacznie poprawić wydajność twojej aplikacji.
Mimo że nie zmniejszysz w ten sposób sumarycznej ilości kodu, unikniesz ładowania
funkcjonalności zbędnych dla użytkownika w danym momencie, co przełoży się na mniejszą ilość kodu do pobrania na starcie aplikacji.

## `import()` {#import}

Najlepszym sposobem na wprowadzenie podziału kodu do twojej aplikacji jest użycie dynamicznego wariantu funkcji
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

> Uwaga:
>
> Dynamiczny `import()` to [propozycja](https://github.com/tc39/proposal-dynamic-import) 
> dla ECMAScript (JavaScript), która aktualnie nie jest częścią standardu językowego. Oczekuje się jednak,
> że wkrótce zostanie zaakceptowana.

Gdy Webpack natknie się na taką składnię, automatycznie zacznie dzielić kod w twojej aplikacji.
Jeśli używasz Create React App, posiadasz już gotową konfigurację i możesz natychmiast
[zacząć z niej korzystać](https://facebook.github.io/create-react-app/docs/code-splitting).
Jest ona również obsługiwana domyślnie przez [Next.js](https://github.com/zeit/next.js/#dynamic-import).

Jeśli konfigurujesz Webpacka samodzielnie, zalecamy przeczytać
[przewodnik po dzieleniu kodu](https://webpack.js.org/guides/code-splitting/). 
Twoja konfiguracja Webpacka powinna wyglądać podobnie [do tej](https://gist.github.com/gaearon/ca6e803f5c604d37468b0091d9959269).

Kiedy używasz [Babela](https://babeljs.io/), musisz się upewnić, że jest on w stanie sparsować
składnię dynamicznego importu, ale jej nie przekształca w żaden sposób. W tym celu skorzystaj z pluginu [babel-plugin-syntax-dynamic-import](https://yarnpkg.com/en/package/babel-plugin-syntax-dynamic-import).

## `React.lazy` {#reactlazy}

> Uwaga:
>
> `React.lazy` i `Suspense` nie są jeszcze dostępne dla renderowania po stronie serwera.
> Jeśli chcesz dzielić kod dla aplikacji renderowanej na serwerze, sugerujemy skorzystać 
> z pakietu [Loadable Components](https://github.com/smooth-code/loadable-components).  
> Ma on przystępną [instrukcję dzielenia pakietów przy renderowaniu po stronie serwera](https://github.com/smooth-code/loadable-components/blob/master/packages/server/README.md).

Funkcja `React.lazy` pozwala renderować dynamicznie importowane komponenty jak zwykłe komponenty.

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

Powyższy kod automatycznie załaduje paczkę zawierającą `OtherComponent` podczas renderowania komponentu.

`React.lazy` jako argument przyjmuje funkcję, która wywołuje dynamiczny `import()`.
Musi ona zwrócić obiekt (`Promise`) (pol. *obietnicę*), która rozwiązuje się do modułu z eksportem domyślnym (`default`) zawierającym
komponent reactowy.

### Zawieszenie (ang. *Suspense*) {#suspense}

Jeśli moduł zawierający `OtherComponent` nie zostanie załadowany przed renderowaniem komponentu
`MyComponent`, musimy wyświetlić alternatywną zawartość, dopóki trwa ładowanie - na przykład 
wskaźnik ładowania. Robimy to za pomocą komponentu `Suspense`.

```js
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

Decyzja o tym, w których miejscach podzielić kod aplikacji, może okazać się kłopotliwa.
Zależy ci na miejscach, że wybierasz miejsca, które równomiernie podzielą twoje pakiety,
ale nie chcesz zepsuć doświadczeń użytkownika.

Dobrym punktem startowym są ścieżki (ang. *routes*) w aplikacji. Większość ludzi korzystających z Internetu przyzwyczajona jest,
że przejście pomiędzy stronami zajmuje trochę czasu. Dodatkowo, zazwyczaj podczas takiego przejścia spora część ekranu jest renderowana ponownie
Można więc założyć, że użytkownik nie będzie wykonywał żadnych akcji na interfejsie podczas ładowania.

Oto przykład skonfigurowania dzielenia kodu aplikacji opartego na ścieżkach, przy użyciu 
biblioteki [React Router](https://reacttraining.com/react-router/) wraz z funkcją `React.lazy`.

```js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

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
