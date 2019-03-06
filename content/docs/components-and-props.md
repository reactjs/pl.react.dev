---
id: components-and-props
title: Komponenty i właściwości
permalink: docs/components-and-props.html
redirect_from:
  - "docs/reusable-components.html"
  - "docs/reusable-components-zh-CN.html"
  - "docs/transferring-props.html"
  - "docs/transferring-props-it-IT.html"
  - "docs/transferring-props-ja-JP.html"
  - "docs/transferring-props-ko-KR.html"
  - "docs/transferring-props-zh-CN.html"
  - "tips/props-in-getInitialState-as-anti-pattern.html"
  - "tips/communicate-between-components.html"
prev: rendering-elements.html
next: state-and-lifecycle.html
---

Komponenty pozwalają ci podzielić interfejs użytkownika na niezależne, pozwalające na ponowne użycie części i myśleć o każdej z nich osobno. Ta strona dostarcza wprowadzenie do pojęcia komponentów. Możesz znaleźć [szczegółowe odniesienie do API komponentów tutaj](/docs/react-component.html).

Koncepcyjnie, komponenty są jak javascriptowe funkcje. Przyjmują one arbirtalne wkłady (nazywane "właściwościami") i zwracają reactowe elementy opisujące co powinno się pojawić na ekranie.

## Komponenty funkcyjne i klasowe {#function-and-class-components}

Najprostszym sposobem na zdefiniowanie komponentu jest napisanie javascriptowej funkcji:

```js
function Welcome(props) {
  return <h1>Cześć, {props.name}</h1>;
}
```

Ta funkcja jest uzasadnionym reactowym komponentem, bo przyjmuje pojedynczy argument "props" (który oznacza "właściwości" (ang. *properties*)) będący obiektem z danymi i zwraca reactowy element. Nazywamy takie komponenty "komponentami funkcyjnymi", bo są one dosłownie javascriptowymi funkcjami.

Możesz również używać [klasy ES6](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) aby zdefiniować komponent:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Cześć, {this.props.name}</h1>;
  }
}
```

Dwa powyższe komponenty są równoważne z punktu widzenia Reacta.

Klasy mają kilka dodatkowych cech, które przedyskutujemy w [kolejnych rozdziałach](/docs/state-and-lifecycle.html). Na ten czas bedziemy używać komponentów funkcyjnych dla ich zwięzłości.

## Renderowanie komponentu {#rendering-a-component}

Poprzednio, napotykaliśmy reactowe elementy, które reprezentowały tagi drzewa DOM:

```js
const element = <div />;
```

Natomiast elementy mogą również reprezentować komponenty zdefiniowane przez użytkownika:

```js
const element = <Welcome name="Sara" />;
```

Kiedy React widzi element reprezentujący komponent zdefiniowany przez użytkownika, przekazuje on do niego JSX'owe atrybuty jako jeden obiekt. Nazywamy ten obiekt "właściwościami".

Na przykład, ten kod renderuje "Cześć, Sara" na stronie:

```js{1,5}
function Welcome(props) {
  return <h1>Cześć, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://components-and-props/rendering-a-component)

Podsumujmy, co dzieje się w tym przykładzie:

1. Wywołujemy `ReactDOM.render()` z elementem `<Welcome name="Sara" />`.
2. React wywołuje komponent `Welcome` z `{name: 'Sara'}` jako właściwości.
3. Nasz komponent `Welcome` zwraca jako wynik element `<h1>Hello, Sara</h1>`.
4. React DOM wydajnie uaktualinia drzewo DOM, aby równało się `<h1>Hello, Sara</h1>`.

>**Wskazówka:** Zawsze zaczynaj nazwy komponentów od dużej litery.
>
>React traktuje komponenty zaczynające się od małej litery jako tagi drzewa DOM. Na przykład, `<div />` reprezentuje HTML'owy tag div, ale `<Welcome />` reprezentuje komponent i wymaga, aby `Welcome` było w zasięgu.
>
>Aby dowiedzieć się więcej o uzasadnieniu tej konwencji, przeczytaj [JSX dogłębnie](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized).

## Komponowanie Komponentów {#composing-components}

Komponenty mogą odwoływać się do innych komponentów i ich wyników. To pozwala nam na używanie tej samej abstrakcji komponentu na dowolnym poziomie szczegółowości.

Na przykład możemy stworzyć komponent `App`, który renderuje `Welcome` wiele razy:

```js{8-10}
function Welcome(props) {
  return <h1>Cześć, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[](codepen://components-and-props/composing-components)

Zazwyczaj, nowe reactowe aplikacje mają pojedynczy komponent `App` u samej góry. Natomiast, jeśli będziesz integrował Reacta z istniejącą aplikacją, możesz zacząć od dołu z małymi komponentami jak na przykład `Button` i stopniowo wypracować sobie drogę na szczyt hierarchii widoku.

## Extracting Components {#extracting-components}

Don't be afraid to split components into smaller components.

For example, consider this `Comment` component:

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[](codepen://components-and-props/extracting-components)

It accepts `author` (an object), `text` (a string), and `date` (a date) as props, and describes a comment on a social media website.

This component can be tricky to change because of all the nesting, and it is also hard to reuse individual parts of it. Let's extract a few components from it.

First, we will extract `Avatar`:

```js{3-6}
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

The `Avatar` doesn't need to know that it is being rendered inside a `Comment`. This is why we have given its prop a more generic name: `user` rather than `author`.

We recommend naming props from the component's own point of view rather than the context in which it is being used.

We can now simplify `Comment` a tiny bit:

```js{5}
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

Next, we will extract a `UserInfo` component that renders an `Avatar` next to the user's name:

```js{3-8}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

This lets us simplify `Comment` even further:

```js{4}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[](codepen://components-and-props/extracting-components-continued)

Extracting components might seem like grunt work at first, but having a palette of reusable components pays off in larger apps. A good rule of thumb is that if a part of your UI is used several times (`Button`, `Panel`, `Avatar`), or is complex enough on its own (`App`, `FeedStory`, `Comment`), it is a good candidate to be a reusable component.

## Props are Read-Only {#props-are-read-only}

Whether you declare a component [as a function or a class](#function-and-class-components), it must never modify its own props. Consider this `sum` function:

```js
function sum(a, b) {
  return a + b;
}
```

Such functions are called ["pure"](https://en.wikipedia.org/wiki/Pure_function) because they do not attempt to change their inputs, and always return the same result for the same inputs.

In contrast, this function is impure because it changes its own input:

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React is pretty flexible but it has a single strict rule:

**All React components must act like pure functions with respect to their props.**

Of course, application UIs are dynamic and change over time. In the [next section](/docs/state-and-lifecycle.html), we will introduce a new concept of "state". State allows React components to change their output over time in response to user actions, network responses, and anything else, without violating this rule.
