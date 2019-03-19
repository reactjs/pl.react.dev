---
id: react-component
title: React.Component
layout: docs
category: Reference
permalink: docs/react-component.html
redirect_from:
  - "docs/component-api.html"
  - "docs/component-specs.html"
  - "docs/component-specs-ko-KR.html"
  - "docs/component-specs-zh-CN.html"
  - "tips/UNSAFE_componentWillReceiveProps-not-triggered-after-mounting.html"
  - "tips/dom-event-listeners.html"
  - "tips/initial-ajax.html"
  - "tips/use-react-with-other-libraries.html"
---

Ta strona zawiera szegółowe odniesienie do definicji klasy reactowego komponentu. Zakłada ona, że znasz fundamentalne zagadnienia Reacta, takie jak [Komponenty i właściwości](/docs/components-and-props.html), i [Stan i cykl życia](/docs/state-and-lifecycle.html). Jeśli nie, przeczytaj je najpierw.

## Ogólne informacje {#overview}

React pozwala na zdefiniowanie komponentów jako klasy lub funkcje. Komponenty zdefiniowane jako klasy obecnie zapewniają więcej funkcjonalności, które szczegółowo opiszemy na tej stronie. Aby komponent mógł być zdefiniowany jako klasa, musi on dziedziczyć po klasie `React.Component`:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Cześć, {this.props.name}</h1>;
  }
}
```

Jedyna metoda, która *musi* być zdefiniowana w klasie dziedziczącej po `React.Component` nazywa się [`render()`](#render). Wszystkie inne metody opisane na tej stronie są opcjonalne.

**Mocno odradadzamy tworzenie własnych klas bazowych komponentów.** W Reactowych komponentach [wielokrotne użycie kodu jest osiągane przede wszystkim przez kompozycję, a nie dziedziczenie](/docs/composition-vs-inheritance.html).

>Uwaga:
>
>React nie zmusza cię do stosowania składni klasy ze standardu ES6. Jeśli wolisz jej uniknąć, możesz zamiast niej użyć modułu `create-react-class` lub podobnej niestandardowej abstrakcji. Aby dowiedzieć się więcej, zobacz rozdział [React bez ES6](/docs/react-without-es6.html).

### Cykl życia komponentu {#the-component-lifecycle}

Każdy komponent ma kilka "metod cyklu życia", które możesz nadpisać, aby uruchomić kod w szczególnych momentach programu. **Możesz użyć [tego diagramu cyklu życia](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) jako ściągawki.** Na liście poniżej, często używane metody cyklu życia zostały **pogrubione**. Reszta z nich istnieje dla stosunkowo rzadkich przypadków użycia.

#### Montowanie {#mounting}

Podczas, gdy instancja komponentu zostaje stworzona i włożona do drzewa DOM, w podanej kolejności wywołwane są poniższe metody:

- [**`constructor()`**](#constructor)
- [`static getDerivedStateFromProps()`](#static-getderivedstatefromprops)
- [**`render()`**](#render)
- [**`componentDidMount()`**](#componentdidmount)

>Uwaga:
>
>Te metody są uznawane za spadek (ang. *legacy*) i powinno się [ich unikać](/blog/2018/03/27/update-on-async-rendering.html) w nowym kodzie:
>
>- [`UNSAFE_componentWillMount()`](#unsafe_componentwillmount)

#### Aktualizacja {#updating}

Aktualizacja może być spowodowana zmianami we właściwościach lub stanie komponentu. Kiedy komponent zostaje ponownie zrenderowany, w podanej kolejności wywołane zostają poniższe metody:

- [`static getDerivedStateFromProps()`](#static-getderivedstatefromprops)
- [`shouldComponentUpdate()`](#shouldcomponentupdate)
- [**`render()`**](#render)
- [`getSnapshotBeforeUpdate()`](#getsnapshotbeforeupdate)
- [**`componentDidUpdate()`**](#componentdidupdate)

>Uwaga:
>
>Te metody są uznawane za spadek i powinno się [ich unikać](/blog/2018/03/27/update-on-async-rendering.html) w nowym kodzie:
>
>- [`UNSAFE_componentWillUpdate()`](#unsafe_componentwillupdate)
>- [`UNSAFE_componentWillReceiveProps()`](#unsafe_componentwillreceiveprops)

#### Odmontowywanie {#unmounting}

Kiedy komponent zostaje usunięty z drzewa DOM, wywołana zostaje poniższa metoda:

- [**`componentWillUnmount()`**](#componentwillunmount)

#### Obsługa wyjątków {#error-handling}

Poniższe metody zostają wywołane w razie wystąpienia wyjątku podczas renderowania, w metodzie cyklu życia, lub w konstruktorze dowolnych komponentów potomnych.

- [`static getDerivedStateFromError()`](#static-getderivedstatefromerror)
- [`componentDidCatch()`](#componentdidcatch)

### Inne API {#other-apis}

Każdy komponent zapewnia też kilka innych API:

  - [`setState()`](#setstate)
  - [`forceUpdate()`](#forceupdate)

### Właściwości klasy {#class-properties}

  - [`defaultProps`](#defaultprops)
  - [`displayName`](#displayname)

### Właściwości instancji {#instance-properties}

  - [`props`](#props)
  - [`state`](#state)

* * *

## Dokumentacja {#reference}

### Powszechnie używane metody cyklu życia {#commonly-used-lifecycle-methods}

Metody opisane w tym rozdziale pokrywają zdecydowaną większość przypadków użycia, na które natkniesz się tworząc reactowe komponenty. **Dla odniesienia wizualnego, zobacz [ten diagram cyklu życia](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/).**

### `render()` {#render}

```javascript
render()
```

Metoda `render()` jest jedyną metodą wymaganą w komponencie klasowym.

Wywołana, powinna sprawdzić `this.props` i `this.state` oraz zwrócić jeden z poniższych typów:

- **Reactowe elementy.** Zwykle tworzone poprzez [JSX](/docs/introducing-jsx.html). Na przykład, `<div />` i `<MyComponent />` są reactowymi elementami, które instruują Reacta, aby, odpowiednio, zrenderował węzeł drzewa DOM, lub inny zdefiniowany przez użytkownika komponent.
- **Tablice i fragmenty.** Pozwalają na zwrócenie wielu elementów z metody render. Po więcej szczegółów odwiedź dokumentację [fragmentów](/docs/fragments.html).
- **Portale**. Pozwalają na zrenderowanie elementów potomnych w innym poddrzewie DOM. Po więcej szczegółów odwiedź dokumentację [portali](/docs/portals.html).
- **Łańcuchy znaków i liczby.** Zostają zrenderowane jako węzły tekstowe w drzewie DOM.
- **Typ logiczny lub `null`**. Nie renderuje nic. (Istnieje głównie, aby wspierać wzorzec `return test && <Child />`, gdzie `test` jest wartością logiczną.)

Funkcja `render()` powinna być czysta, to znaczy, że nie modyfikuje stanu komponentu, zwraca ten sam wynik przy każdym wywołaniu, i nie wchodzi w bezpośrednią interakcję z przeglądarką.

Jeśli potrzebujesz wejść w interakcję z przeglądarką, zamiast tego wykonaj swoje instrukcje w `componentDidMount()` lub innych metodach cyklu życia. Utrzymywanie funkcji `render()` w czystości sprawia, że łatwiej jest myśleć o komponentach.

> Uwaga
>
> Funkcja `render()` nie zostanie wywołana, jeśli [`shouldComponentUpdate()`](#shouldcomponentupdate) zwróci `false`.

* * *

### `constructor()` {#constructor}

```javascript
constructor(props)
```

**Jeśli nie inicjalizujesz stanu i nie wiążesz (ang. *bind*) metod, nie ma potrzeby, abyś implementował konstruktor w swoim reactowym komponencie.**

Konstruktor reactowego komponentu jest wywoływany przed jego zamontowaniem. Kiedy implementujesz konstruktor w klasie dziedziczącej po klasie `React.Component`, powinieneś wywołać metodę `super(props)` przed jakąkolwiek inną instrukcją. W innym wypadku, `this.props` będzie miało  w konstruktorze wartość `undefined`, co może prowadzić do błędów.

Zazwyczaj, konstruktory są używane tylko w dwóch celach:

* Inicjalizacji [stanu lokalnego](/docs/state-and-lifecycle.html) przez przypisanie obiektu do `this.state`.
* Związania [metody obsługującej zdarzenia](/docs/handling-events.html) z instancją komponentu.

**Nie powinieneś wywoływać metody `setState()`** w funkcji `constructor()`. Zamiast tego, jeśli potrzebujesz użyć w komponencie stanu lokalnego, **przydziel początkowy stan do `this.state`** bezpośrednio w konstruktorze:

```js
constructor(props) {
  super(props);
  // Nie wywołuj tutaj this.setState()!
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```

Konstruktor jest jedynym miejscem, w którym powinieneś przypisywać `this.state` bezpośrednio. Natomiast we wszystkich innych metodach powinieneś używać `this.setState()`.

Unikaj wprowadzania efektów ubocznych lub subskrypcji w konstruktorze. Używaj zamiast tego `componentDidMount()` dla tych przypadków użycia.

>Uwaga
>
>**Unikaj kopiowania właściwości do stanu! Jest to częsty błąd:**
>
>```js
>constructor(props) {
>  super(props);
>  // Nie rób tego!
>  this.state = { color: props.color };
>}
>```
>
>Problem w tym, że jest to jednocześnie niepotrzebne (zamiast tego możesz użyć  `this.props.color` bezpośrednio), i jest przyczyną błędów (aktualizacje właściwości `color` nie będą odzwierciedlane w stanie).
>
>**Używaj tego wzorca tylko jeśli chcesz celowo ignorować aktualizacje właściwości.** W tym wypadku, bedzie miała sens zmiana nazwy właściwości na `initialColor` (ang. *początkowy kolor*) lub `defaultColor` (ang. *domyślny kolor*). Możesz wtedy zmusić komponent do "zresetowania" swojego wewnętrznego stanu przez [zmianę jego właściwości `key`](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) w razie potrzeby.
>
>Przeczytaj nasz [wpis na blogu na temat unikania stanu pochodnego](/blog/2018/06/07/you-probably-dont-need-derived-state.html), aby dowiedzieć się co należy zrobić, jeśli wydaje ci się, że potrzebujesz stanu zależnego od właściwości.


* * *

### `componentDidMount()` {#componentdidmount}

```javascript
componentDidMount()
```

Metoda `componentDidMount()` jest wywołowana bezpośrednio po zamontowaniu komponentu (po jego włożeniu do drzewa). Inicjalizacja, która wymaga węzłów drzewa DOM powinna się tam znaleźć. Jeśli potrzebujesz załadować dane ze zdalnego zasobu, jest to dobre miejsce do wykonania zapytania sieciowego.

Ta metoda jest dobrym miejscem na przygotowanie dowolnych subskrypcji. Jeśli to zrobisz, nie zapomnij ich zakończyć w metodzie `componentWillUnmount()`.

**Możesz wywołać metodę `setState()` od razu** w `componentDidMount()`. Spowoduje to dodatkowe renderowanie, ale zostanie ono wykonane zanim przeglądarka zaktualizuje ekran. Jest to gwarancją, że pomimo, iż metoda `render()` będzie w tym przypadku wywołana dwa razy, użytkownik nie zobaczy pośredniego stanu. Używaj tego wzorca uważnie, ponieważ często powoduje on problemy z wydajnością. W większości przypadków, powinieneś zamiast tego mieć możliwość przypisania stanu początkowego w konstruktorze. Może to być natomiast konieczne w przypadkach takich jak okna modalne i okienka podpowiedzi, kiedy przed zrenderowaniem czegoś trzeba zmierzyć węzeł drzewa DOM.

* * *

### `componentDidUpdate()` {#componentdidupdate}

```javascript
componentDidUpdate(prevProps, prevState, snapshot)
```

Metoda `componentDidUpdate()` jest wywoływana bezpośrednio po wystąpieniu aktualizacji. Nie jest ona wywoływana po początkowym zrenderowaniu.

Używaj tego jako okazji do operacji na drzewie DOM kiedy komponent został zaktualizowany. Jest to także dobre miejsce na wykonywanie zapytań sieciowych tak długo jak porównujesz obecne właściwości z poprzednimi (na przykład, zapytanie może być niepotrzebne jeśli właściwości się nie zmieniły).

```js
componentDidUpdate(prevProps) {
  // Typowy sposób użycia (nie zapomnij porównać właściwości):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

**Możesz wywołać metodę `setState()` od razu** w `componentDidUpdate()`, ale weź pod uwagę, że **musi ona być owinięta instrukcją warunkową** jak w przykładzie powyżej, albo spowodujesz nieskończoną pętlę. Spowodowałoby to również dodatkowe renderowanie które, pomimo że niedostrzegalne dla użytkownika, może negatywnie wpłynąć na wydajność komponentu. Jeśli próbujesz "odzwierciedlić" pewien stan z właściwością pochodzącą z góry, rozważ zamiast tego użycie tej właściwości bezpośrednio. Dowiedz się więcej o tym [dlaczego kopiowanie właściwości do stanu powoduje błędy](/blog/2018/06/07/you-probably-dont-need-derived-state.html).

Jeśli twój komponent ma zaimplementowaną metodę cyklu życia `getSnapshotBeforeUpdate()` (co jest rzadkie), wartość którą ona zwróci, będzie przekazana jako trzeci parametr ("zrzut" (ang.*snapshot*)) do metody `componentDidUpdate()`. W innym wypadku ten parametr będzie miał wartość `undefined`.

> Uwaga
>
> Metoda `componentDidUpdate()` nie będzie wywołana jeśli [`shouldComponentUpdate()`](#shouldcomponentupdate) zwróci `false`.

* * *

### `componentWillUnmount()` {#componentwillunmount}

```javascript
componentWillUnmount()
```

`componentWillUnmount()` is invoked immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in `componentDidMount()`.

You **should not call `setState()`** in `componentWillUnmount()` because the component will never be re-rendered. Once a component instance is unmounted, it will never be mounted again.

* * *

### Rarely Used Lifecycle Methods {#rarely-used-lifecycle-methods}

The methods in this section correspond to uncommon use cases. They're handy once in a while, but most of your components probably don't need any of them. **You can see most of the methods below on [this lifecycle diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) if you click the "Show less common lifecycles" checkbox at the top of it.**


### `shouldComponentUpdate()` {#shouldcomponentupdate}

```javascript
shouldComponentUpdate(nextProps, nextState)
```

Use `shouldComponentUpdate()` to let React know if a component's output is not affected by the current change in state or props. The default behavior is to re-render on every state change, and in the vast majority of cases you should rely on the default behavior.

`shouldComponentUpdate()` is invoked before rendering when new props or state are being received. Defaults to `true`. This method is not called for the initial render or when `forceUpdate()` is used.

This method only exists as a **[performance optimization](/docs/optimizing-performance.html).** Do not rely on it to "prevent" a rendering, as this can lead to bugs. **Consider using the built-in [`PureComponent`](/docs/react-api.html#reactpurecomponent)** instead of writing `shouldComponentUpdate()` by hand. `PureComponent` performs a shallow comparison of props and state, and reduces the chance that you'll skip a necessary update.

If you are confident you want to write it by hand, you may compare `this.props` with `nextProps` and `this.state` with `nextState` and return `false` to tell React the update can be skipped. Note that returning `false` does not prevent child components from re-rendering when *their* state changes.

We do not recommend doing deep equality checks or using `JSON.stringify()` in `shouldComponentUpdate()`. It is very inefficient and will harm performance.

Currently, if `shouldComponentUpdate()` returns `false`, then [`UNSAFE_componentWillUpdate()`](#unsafe_componentwillupdate), [`render()`](#render), and [`componentDidUpdate()`](#componentdidupdate) will not be invoked. In the future React may treat `shouldComponentUpdate()` as a hint rather than a strict directive, and returning `false` may still result in a re-rendering of the component.

* * *

### `static getDerivedStateFromProps()` {#static-getderivedstatefromprops}

```js
static getDerivedStateFromProps(props, state)
```

`getDerivedStateFromProps` is invoked right before calling the render method, both on the initial mount and on subsequent updates. It should return an object to update the state, or null to update nothing.

This method exists for [rare use cases](/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state) where the state depends on changes in props over time. For example, it might be handy for implementing a `<Transition>` component that compares its previous and next children to decide which of them to animate in and out.

Deriving state leads to verbose code and makes your components difficult to think about.  
[Make sure you're familiar with simpler alternatives:](/blog/2018/06/07/you-probably-dont-need-derived-state.html)

* If you need to **perform a side effect** (for example, data fetching or an animation) in response to a change in props, use [`componentDidUpdate`](#componentdidupdate) lifecycle instead.

* If you want to **re-compute some data only when a prop changes**, [use a memoization helper instead](/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization).

* If you want to **"reset" some state when a prop changes**, consider either making a component [fully controlled](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) or [fully uncontrolled with a `key`](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) instead.

This method doesn't have access to the component instance. If you'd like, you can reuse some code between `getDerivedStateFromProps()` and the other class methods by extracting pure functions of the component props and state outside the class definition.

Note that this method is fired on *every* render, regardless of the cause. This is in contrast to `UNSAFE_componentWillReceiveProps`, which only fires when the parent causes a re-render and not as a result of a local `setState`.

* * *

### `getSnapshotBeforeUpdate()` {#getsnapshotbeforeupdate}

```javascript
getSnapshotBeforeUpdate(prevProps, prevState)
```

`getSnapshotBeforeUpdate()` is invoked right before the most recently rendered output is committed to e.g. the DOM. It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed. Any value returned by this lifecycle will be passed as a parameter to `componentDidUpdate()`.

This use case is not common, but it may occur in UIs like a chat thread that need to handle scroll position in a special way.

A snapshot value (or `null`) should be returned.

For example:

`embed:react-component-reference/get-snapshot-before-update.js`

In the above examples, it is important to read the `scrollHeight` property in `getSnapshotBeforeUpdate` because there may be delays between "render" phase lifecycles (like `render`) and "commit" phase lifecycles (like `getSnapshotBeforeUpdate` and `componentDidUpdate`).

* * *

### Error boundaries {#error-boundaries}

[Error boundaries](/docs/error-boundaries.html) are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

A class component becomes an error boundary if it defines either (or both) of the lifecycle methods `static getDerivedStateFromError()` or `componentDidCatch()`. Updating state from these lifecycles lets you capture an unhandled JavaScript error in the below tree and display a fallback UI.

Only use error boundaries for recovering from unexpected exceptions; **don't try to use them for control flow.**

For more details, see [*Error Handling in React 16*](/blog/2017/07/26/error-handling-in-react-16.html).

> Note
> 
> Error boundaries only catch errors in the components **below** them in the tree. An error boundary can’t catch an error within itself.

### `static getDerivedStateFromError()` {#static-getderivedstatefromerror}
```javascript
static getDerivedStateFromError(error)
```

This lifecycle is invoked after an error has been thrown by a descendant component.
It receives the error that was thrown as a parameter and should return a value to update state.

```js{7-10,13-16}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```

> Note
>
> `getDerivedStateFromError()` is called during the "render" phase, so side-effects are not permitted.
For those use cases, use `componentDidCatch()` instead.

* * *

### `componentDidCatch()` {#componentdidcatch}

```javascript
componentDidCatch(error, info)
```

This lifecycle is invoked after an error has been thrown by a descendant component.
It receives two parameters:

1. `error` - The error that was thrown.
2. `info` - An object with a `componentStack` key containing [information about which component threw the error](/docs/error-boundaries.html#component-stack-traces).


`componentDidCatch()` is called during the "commit" phase, so side-effects are permitted.
It should be used for things like logging errors:

```js{12-19}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    logComponentStackToMyService(info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```

> Note
> 
> In the event of an error, you can render a fallback UI with `componentDidCatch()` by calling `setState`, but this will be deprecated in a future release.
> Use `static getDerivedStateFromError()` to handle fallback rendering instead.

* * *

### Legacy Lifecycle Methods {#legacy-lifecycle-methods}

The lifecycle methods below are marked as "legacy". They still work, but we don't recommend using them in the new code. You can learn more about migrating away from legacy lifecycle methods in [this blog post](/blog/2018/03/27/update-on-async-rendering.html).

### `UNSAFE_componentWillMount()` {#unsafe_componentwillmount}

```javascript
UNSAFE_componentWillMount()
```

> Note
>
> This lifecycle was previously named `componentWillMount`. That name will continue to work until version 17. Use the [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) to automatically update your components.

`UNSAFE_componentWillMount()` is invoked just before mounting occurs. It is called before `render()`, therefore calling `setState()` synchronously in this method will not trigger an extra rendering. Generally, we recommend using the `constructor()` instead for initializing state.

Avoid introducing any side-effects or subscriptions in this method. For those use cases, use `componentDidMount()` instead.

This is the only lifecycle method called on server rendering.

* * *

### `UNSAFE_componentWillReceiveProps()` {#unsafe_componentwillreceiveprops}

```javascript
UNSAFE_componentWillReceiveProps(nextProps)
```

> Note
>
> This lifecycle was previously named `componentWillReceiveProps`. That name will continue to work until version 17. Use the [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) to automatically update your components.

> Note:
>
> Using this lifecycle method often leads to bugs and inconsistencies
>
> * If you need to **perform a side effect** (for example, data fetching or an animation) in response to a change in props, use [`componentDidUpdate`](#componentdidupdate) lifecycle instead.
> * If you used `componentWillReceiveProps` for **re-computing some data only when a prop changes**, [use a memoization helper instead](/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization).
> * If you used `componentWillReceiveProps` to **"reset" some state when a prop changes**, consider either making a component [fully controlled](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) or [fully uncontrolled with a `key`](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) instead.
>
> For other use cases, [follow the recommendations in this blog post about derived state](/blog/2018/06/07/you-probably-dont-need-derived-state.html).

`UNSAFE_componentWillReceiveProps()` is invoked before a mounted component receives new props. If you need to update the state in response to prop changes (for example, to reset it), you may compare `this.props` and `nextProps` and perform state transitions using `this.setState()` in this method.

Note that if a parent component causes your component to re-render, this method will be called even if props have not changed. Make sure to compare the current and next values if you only want to handle changes.

React doesn't call `UNSAFE_componentWillReceiveProps()` with initial props during [mounting](#mounting). It only calls this method if some of component's props may update. Calling `this.setState()` generally doesn't trigger `UNSAFE_componentWillReceiveProps()`.

* * *

### `UNSAFE_componentWillUpdate()` {#unsafe_componentwillupdate}

```javascript
UNSAFE_componentWillUpdate(nextProps, nextState)
```

> Note
>
> This lifecycle was previously named `componentWillUpdate`. That name will continue to work until version 17. Use the [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) to automatically update your components.

`UNSAFE_componentWillUpdate()` is invoked just before rendering when new props or state are being received. Use this as an opportunity to perform preparation before an update occurs. This method is not called for the initial render.

Note that you cannot call `this.setState()` here; nor should you do anything else (e.g. dispatch a Redux action) that would trigger an update to a React component before `UNSAFE_componentWillUpdate()` returns.

Typically, this method can be replaced by `componentDidUpdate()`. If you were reading from the DOM in this method (e.g. to save a scroll position), you can move that logic to `getSnapshotBeforeUpdate()`.

> Note
>
> `UNSAFE_componentWillUpdate()` will not be invoked if [`shouldComponentUpdate()`](#shouldcomponentupdate) returns false.

* * *

## Other APIs {#other-apis-1}

Unlike the lifecycle methods above (which React calls for you), the methods below are the methods *you* can call from your components.

There are just two of them: `setState()` and `forceUpdate()`.

### `setState()` {#setstate}

```javascript
setState(updater[, callback])
```

`setState()` enqueues changes to the component state and tells React that this component and its children need to be re-rendered with the updated state. This is the primary method you use to update the user interface in response to event handlers and server responses.

Think of `setState()` as a *request* rather than an immediate command to update the component. For better perceived performance, React may delay it, and then update several components in a single pass. React does not guarantee that the state changes are applied immediately.

`setState()` does not always immediately update the component. It may batch or defer the update until later. This makes reading `this.state` right after calling `setState()` a potential pitfall. Instead, use `componentDidUpdate` or a `setState` callback (`setState(updater, callback)`), either of which are guaranteed to fire after the update has been applied. If you need to set the state based on the previous state, read about the `updater` argument below.

`setState()` will always lead to a re-render unless `shouldComponentUpdate()` returns `false`. If mutable objects are being used and conditional rendering logic cannot be implemented in `shouldComponentUpdate()`, calling `setState()` only when the new state differs from the previous state will avoid unnecessary re-renders.

The first argument is an `updater` function with the signature:

```javascript
(state, props) => stateChange
```

`state` is a reference to the component state at the time the change is being applied. It should not be directly mutated. Instead, changes should be represented by building a new object based on the input from `state` and `props`. For instance, suppose we wanted to increment a value in state by `props.step`:

```javascript
this.setState((state, props) => {
  return {counter: state.counter + props.step};
});
```

Both `state` and `props` received by the updater function are guaranteed to be up-to-date. The output of the updater is shallowly merged with `state`.

The second parameter to `setState()` is an optional callback function that will be executed once `setState` is completed and the component is re-rendered. Generally we recommend using `componentDidUpdate()` for such logic instead.

You may optionally pass an object as the first argument to `setState()` instead of a function:

```javascript
setState(stateChange[, callback])
```

This performs a shallow merge of `stateChange` into the new state, e.g., to adjust a shopping cart item quantity:

```javascript
this.setState({quantity: 2})
```

This form of `setState()` is also asynchronous, and multiple calls during the same cycle may be batched together. For example, if you attempt to increment an item quantity more than once in the same cycle, that will result in the equivalent of:

```javaScript
Object.assign(
  previousState,
  {quantity: state.quantity + 1},
  {quantity: state.quantity + 1},
  ...
)
```

Subsequent calls will override values from previous calls in the same cycle, so the quantity will only be incremented once. If the next state depends on the current state, we recommend using the updater function form, instead:

```js
this.setState((state) => {
  return {quantity: state.quantity + 1};
});
```

For more detail, see:

* [State and Lifecycle guide](/docs/state-and-lifecycle.html)
* [In depth: When and why are `setState()` calls batched?](https://stackoverflow.com/a/48610973/458193)
* [In depth: Why isn't `this.state` updated immediately?](https://github.com/facebook/react/issues/11527#issuecomment-360199710)

* * *

### `forceUpdate()` {#forceupdate}

```javascript
component.forceUpdate(callback)
```

By default, when your component's state or props change, your component will re-render. If your `render()` method depends on some other data, you can tell React that the component needs re-rendering by calling `forceUpdate()`.

Calling `forceUpdate()` will cause `render()` to be called on the component, skipping `shouldComponentUpdate()`. This will trigger the normal lifecycle methods for child components, including the `shouldComponentUpdate()` method of each child. React will still only update the DOM if the markup changes.

Normally you should try to avoid all uses of `forceUpdate()` and only read from `this.props` and `this.state` in `render()`.

* * *

## Class Properties {#class-properties-1}

### `defaultProps` {#defaultprops}

`defaultProps` can be defined as a property on the component class itself, to set the default props for the class. This is used for undefined props, but not for null props. For example:

```js
class CustomButton extends React.Component {
  // ...
}

CustomButton.defaultProps = {
  color: 'blue'
};
```

If `props.color` is not provided, it will be set by default to `'blue'`:

```js
  render() {
    return <CustomButton /> ; // props.color will be set to blue
  }
```

If `props.color` is set to null, it will remain null:

```js
  render() {
    return <CustomButton color={null} /> ; // props.color will remain null
  }
```

* * *

### `displayName` {#displayname}

The `displayName` string is used in debugging messages. Usually, you don't need to set it explicitly because it's inferred from the name of the function or class that defines the component. You might want to set it explicitly if you want to display a different name for debugging purposes or when you create a higher-order component, see [Wrap the Display Name for Easy Debugging](/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging) for details.

* * *

## Instance Properties {#instance-properties-1}

### `props` {#props}

`this.props` contains the props that were defined by the caller of this component. See [Components and Props](/docs/components-and-props.html) for an introduction to props.

In particular, `this.props.children` is a special prop, typically defined by the child tags in the JSX expression rather than in the tag itself.

### `state` {#state}

The state contains data specific to this component that may change over time. The state is user-defined, and it should be a plain JavaScript object.

If some value isn't used for rendering or data flow (for example, a timer ID), you don't have to put it in the state. Such values can be defined as fields on the component instance.

See [State and Lifecycle](/docs/state-and-lifecycle.html) for more information about the state.

Never mutate `this.state` directly, as calling `setState()` afterwards may replace the mutation you made. Treat `this.state` as if it were immutable.
