---
id: error-boundaries
title: Granice błędów
permalink: docs/error-boundaries.html
---

W przeszłości, błędy JavaScriptowe w komponentach psuły wewnętrzny state
Reacta i [wywoływały](https://github.com/facebook/react/issues/4026)
[enigmatyczne](https://github.com/facebook/react/issues/6895)
[błędy](https://github.com/facebook/react/issues/8579) w kolejnych
renderach. Były one następstwem wcześniejszego błędu w kodzie aplikacji,
którego React nie był w stanie obsłużyć.


## Przedstawiamy Granice Błędów {#introducing-error-boundaries}

Błąd JavaScriptu w jednej z części interfejsu użytkownika (UI) nie
powinien psuć całej aplikacji. Aby rozwiązać ten problem, React 16
wprowadza koncepcję granic błędów (ang. error boundary).

Granice błędów to komponenty Reactowe, które **wyłapują, logują i
wyświetlają błędy JavaScriptu we wszystkich swoich podrzędnych
komponentach, a także wyświetlają zastępcze fragmenty interfejsu**
zamiast pokazywać te niepoprawnie działające. Granice błędów działają
podczas renderowania, w metodach cyklu życia komponentów, a także w
konstruktorach całego podrzędnego drzewa komponentów.

> Uwaga
>
> Granice błędów **nie obsługują** błędów w:
>
> * Uchwytach zdarzeń (ang. event handlers)
>   ([więcej](#how-about-event-handlers))
> * Asynchronicznym kodzie (np. w metodach: `setTimeout` lub w
>   callbackach `requestAnimationFrame`)
> * Komponentach renderowanych po stronie serwera
> * Błędach rzuconych w samych granicach błędów (a nie w ich podrzędnych
>   komponentach)

Aby komponent klasowy był granicą błędu musi zdefiniować jedną lub obie
metody cyklu życia:
[`static getDerivedStateFromError()`](/docs/react-component.html#static-getderivedstatefromerror)
lub
[`componentDidCatch()`](/docs/react-component.html#componentdidcatch).
Należy używać `static getDerivedStateFromError()` do wyrenderowania
zastępczego UI po rzuceniu błędu, a `componentDidCatch()`, aby zalogować
informacje o błędzie.

```js{7-10,12-15,18-21}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Aktualizacja stanu - w następnym renderze zostanie pokazane UI zastępcze
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // componentDidCatch pozwala zalogować błąd do zewnętrznego serwisu
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // Jeżeli wystąpił błąd wyświetlamy dowolne zastępcze komponenty
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```

Po zdefiniowaniu, granicy błędu można używać jak normalnego komponentu:

```js
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

Error boundaries work like a JavaScript `catch {}` block, but for components. Only class components can be error boundaries. In practice, most of the time you’ll want to declare an error boundary component once and use it throughout your application.

Note that **error boundaries only catch errors in the components below them in the tree**. An error boundary can’t catch an error within itself. If an error boundary fails trying to render the error message, the error will propagate to the closest error boundary above it. This, too, is similar to how catch {} block works in JavaScript.

## Live Demo {#live-demo}

Check out [this example of declaring and using an error boundary](https://codepen.io/gaearon/pen/wqvxGa?editors=0010) with [React 16](/blog/2017/09/26/react-v16.0.html).


## Where to Place Error Boundaries {#where-to-place-error-boundaries}

The granularity of error boundaries is up to you. You may wrap top-level route components to display a “Something went wrong” message to the user, just like server-side frameworks often handle crashes. You may also wrap individual widgets in an error boundary to protect them from crashing the rest of the application.


## New Behavior for Uncaught Errors {#new-behavior-for-uncaught-errors}

This change has an important implication. **As of React 16, errors that were not caught by any error boundary will result in unmounting of the whole React component tree.**

We debated this decision, but in our experience it is worse to leave corrupted UI in place than to completely remove it. For example, in a product like Messenger leaving the broken UI visible could lead to somebody sending a message to the wrong person. Similarly, it is worse for a payments app to display a wrong amount than to render nothing.

This change means that as you migrate to React 16, you will likely uncover existing crashes in your application that have been unnoticed before. Adding error boundaries lets you provide better user experience when something goes wrong.

For example, Facebook Messenger wraps content of the sidebar, the info panel, the conversation log, and the message input into separate error boundaries. If some component in one of these UI areas crashes, the rest of them remain interactive.

We also encourage you to use JS error reporting services (or build your own) so that you can learn about unhandled exceptions as they happen in production, and fix them.


## Component Stack Traces {#component-stack-traces}

React 16 prints all errors that occurred during rendering to the console in development, even if the application accidentally swallows them. In addition to the error message and the JavaScript stack, it also provides component stack traces. Now you can see where exactly in the component tree the failure has happened:

<img src="../images/docs/error-boundaries-stack-trace.png" style="max-width:100%" alt="Error caught by Error Boundary component">

You can also see the filenames and line numbers in the component stack trace. This works by default in [Create React App](https://github.com/facebookincubator/create-react-app) projects:

<img src="../images/docs/error-boundaries-stack-trace-line-numbers.png" style="max-width:100%" alt="Error caught by Error Boundary component with line numbers">

If you don’t use Create React App, you can add [this plugin](https://www.npmjs.com/package/babel-plugin-transform-react-jsx-source) manually to your Babel configuration. Note that it’s intended only for development and **must be disabled in production**.

> Note
>
> Component names displayed in the stack traces depend on the [`Function.name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name) property. If you support older browsers and devices which may not yet provide this natively (e.g. IE 11), consider including a `Function.name` polyfill in your bundled application, such as [`function.name-polyfill`](https://github.com/JamesMGreene/Function.name). Alternatively, you may explicitly set the [`displayName`](/docs/react-component.html#displayname) property on all your components.


## How About try/catch? {#how-about-trycatch}

`try` / `catch` is great but it only works for imperative code:

```js
try {
  showButton();
} catch (error) {
  // ...
}
```

However, React components are declarative and specify *what* should be rendered:

```js
<Button />
```

Error boundaries preserve the declarative nature of React, and behave as you would expect. For example, even if an error occurs in a `componentDidUpdate` method caused by a `setState` somewhere deep in the tree, it will still correctly propagate to the closest error boundary.

## How About Event Handlers? {#how-about-event-handlers}

Error boundaries **do not** catch errors inside event handlers.

React doesn't need error boundaries to recover from errors in event handlers. Unlike the render method and lifecycle methods, the event handlers don't happen during rendering. So if they throw, React still knows what to display on the screen.

If you need to catch an error inside event handler, use the regular JavaScript `try` / `catch` statement:

```js{9-13,17-20}
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    try {
      // Do something that could throw
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error) {
      return <h1>Caught an error.</h1>
    }
    return <div onClick={this.handleClick}>Click Me</div>
  }
}
```

Note that the above example is demonstrating regular JavaScript behavior and doesn't use error boundaries.

## Naming Changes from React 15 {#naming-changes-from-react-15}

React 15 included a very limited support for error boundaries under a different method name: `unstable_handleError`. This method no longer works, and you will need to change it to `componentDidCatch` in your code starting from the first 16 beta release.

For this change, we’ve provided a [codemod](https://github.com/reactjs/react-codemod#error-boundaries) to automatically migrate your code.
