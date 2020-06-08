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

Komponenty pozwalają podzielić interfejs użytkownika na niezależne, pozwalające na ponowne użycie części i myśleć o każdej z nich osobno. Ta strona zawiera wprowadzenie do idei komponentów. W osobnym rozdziale opisaliśmy [szczegółową dokumentację API komponentów](/docs/react-component.html).

Koncepcyjnie, komponenty są jak javascriptowe funkcje. Przyjmują one arbitralne wartości na wejściu (nazywane "właściwościami" (ang. *props*)) i zwracają reactowe elementy opisujące, co powinno się pojawić na ekranie.

## Komponenty funkcyjne i klasowe {#function-and-class-components}

Najprostszym sposobem na zdefiniowanie komponentu jest napisanie javascriptowej funkcji:

```js
function Welcome(props) {
  return <h1>Cześć, {props.name}</h1>;
}
```

Ta funkcja jest poprawnym reactowym komponentem, ponieważ przyjmuje pojedynczy argument "props" (który oznacza "właściwości", z ang. *properties*), będący obiektem z danymi, i zwraca reactowy element. Takie komponenty nazywamy "komponentami funkcyjnymi", gdyż są one dosłownie javascriptowymi funkcjami.

Do zdefiniowania komponentu możesz również użyć [klasy ze standardu ES6](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Classes):

```js
class Welcome extends React.Component {
  render() {
    return <h1>Cześć, {this.props.name}</h1>;
  }
}
```

Obydwa powyższe komponenty są równoważne z punktu widzenia Reacta.

Komponenty funkcyjne i klasowe mają kilka dodatkowych cech, które omówimy w [kolejnych rozdziałach](/docs/state-and-lifecycle.html).

## Renderowanie komponentu {#rendering-a-component}

Poprzednio napotykaliśmy reactowe elementy, które reprezentowały znaczniki DOM:

```js
const element = <div />;
```

Elementy mogą również reprezentować komponenty zdefiniowane przez użytkownika:

```js
const element = <Welcome name="Sara" />;
```

Kiedy React widzi element reprezentujący komponent zdefiniowany przez użytkownika, przekazuje do niego JSX-owe atrybuty i potomków jako jeden obiekt. Obiekt ten nazywamy "właściwościami" komponentu.

Dla przykładu, poniższy kod renderuje na stronie napis "Cześć, Sara":

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

[Przetestuj kod na CodePen](codepen://components-and-props/rendering-a-component)

Podsumujmy, co dzieje się w tym przykładzie:

1. Wywołujemy `ReactDOM.render()` z elementem `<Welcome name="Sara" />`.
2. React wywołuje komponent `Welcome` z właściwościami `{name: 'Sara'}`.
3. Nasz komponent `Welcome` jako wynik zwraca element `<h1>Cześć, Sara</h1>`.
4. React DOM w optymalny sposób aktualizuje drzewo DOM, aby odpowiadało elementowi `<h1>Cześć, Sara</h1>`.

>**Wskazówka:** Zawsze zaczynaj nazwy komponentów od dużej litery.
>
>React traktuje komponenty zaczynające się od małej litery jako tagi drzewa DOM. Na przykład, `<div />` reprezentuje HTML-owy znacznik 'div', ale już `<Welcome />` reprezentuje komponent i wymaga, aby `Welcome` było w zasięgu (ang. *scope*).
>
>Aby dowiedzieć się więcej o uzasadnieniu tej konwencji, przeczytaj [dogłębną analizę składni JSX](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized).

## Kompozycja komponentów {#composing-components}

Komponenty przy zwracaniu wyniku mogą mogą odwoływać się do innych komponentów. Pozwala to używać tej samej abstrakcji komponentu na dowolnym poziomie szczegółowości. Przycisk, formularz, okno dialogowe, ekran - w aplikacjach reactowych tego typu składniki są zwykle reprezentowane przez dedykowane komponenty.

Możemy dla przykładu stworzyć komponent `App`, który wielokrotnie renderuje komponent `Welcome`:

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

[Przetestuj kod na CodePen](codepen://components-and-props/composing-components)

Nowe aplikacje reactowe na samej górze drzewa zazwyczaj renderują pojedynczy komponent `App`. Jeśli jednak musisz zintegrować Reacta z istniejącą aplikacją, możesz zacząć od samego dołu, dodając niewielkie komponenty (np. `Button`) i stopniowo przepisywać całą strukturę aż do samej góry.

## Wyodrębnianie komponentów {#extracting-components}

Nie bój się dzielenia komponentów na mniejsze części.

Rozważ poniższy komponent `Comment`:

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

[Przetestuj kod na CodePen](codepen://components-and-props/extracting-components)

Przyjmuje on obiekt `author`, napis `text` i datę `date` jako właściwości i zwraca strukturę opisującą komentarz na portalu mediów społecznościowych.

Zmiana tego komponentu czy ponowne użycie jego poszczególnych części może okazać się skomplikowane z powodu całego tego zagnieżdżenia. Rozbijmy go zatem na kilka mniejszych komponentów.

Najpierw wydzielmy komponent `Avatar`:

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

`Avatar` nie musi wiedzieć, że jest renderowany wewnątrz komponentu `Comment`. Dlatego też daliśmy jego właściwości bardziej ogólną nazwę `user` zamiast `author`.

Zalecamy nadawanie nazw właściwościom z punktu widzenia komponentu, a nie kontekstu, w którym jest używany.

Możemy teraz uprościć nieco komponent `Comment`:

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

Następnie wydzielmy komponent `UserInfo`, który wyrenderuje `Avatar` obok nazwy użytkownika:

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

To pozwala nam uprościć `Comment` jeszcze bardziej:

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

[Przetestuj kod na CodePen](codepen://components-and-props/extracting-components-continued)

<<<<<<< HEAD
Wyodrębnianie komponentów może z początku wydawać się żmudnym zajęciem, ale posiadanie palety pozwalających na ponowne użycie komponentów jest opłacalne w większych aplikacjach. Dobrą praktyczną zasadą jest, że jeśli część twojego interfejsu użytkownika jest używana wielokrotnie (np. `Button`, `Panel`, `Avatar`) lub jest ona dostatecznie skomplikowana sama w sobie (np. `App`, `FeedStory`, `Comment`), jest ona dobrym kandydatem do stania się komponentem wielokrotnego użytku.
=======
Extracting components might seem like grunt work at first, but having a palette of reusable components pays off in larger apps. A good rule of thumb is that if a part of your UI is used several times (`Button`, `Panel`, `Avatar`), or is complex enough on its own (`App`, `FeedStory`, `Comment`), it is a good candidate to be extracted to a separate component.
>>>>>>> c9b990070fc35d31b56957263e1ea9fe2fe67b40

## Właściwości są tylko do odczytu {#props-are-read-only}

Bez względu na to, czy zadeklarujesz komponent [jako funkcję czy klasę](#function-and-class-components), nie może on nigdy modyfikować swoich właściwości. Rozważ następującą funkcję `sum`:

```js
function sum(a, b) {
  return a + b;
}
```

Funkcje tego typu nazywane są ["czystymi"](https://en.wikipedia.org/wiki/Pure_function) (ang. *pure function*), dlatego że nie próbują one zmieniać swoich argumentów i zawsze zwracają ten sam wynik dla tych samych argumentów.

W przeciwieństwie do poprzedniej funkcji, ta poniżej nie jest "czysta", ponieważ zmienia swój argument.

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React jest bardzo elastyczny, ale ma jedną ścisłą zasadę:

**Wszytkie komponenty muszą zachowywać się jak czyste funkcje w odniesieniu do ich właściwości.**

Rzecz jasna, interfejsy użytkownika w aplikacjach są zwykle dynamiczne, zmieniają się w czasie. W [kolejnym rozdziale](/docs/state-and-lifecycle.html) wprowadzimy nowe pojęcie "stanu". Stan pozwala komponentom reactowym na zmianę swojego wyniku w czasie, w odpowiedzi na akcje użytkownika, żądania sieciowe itp. bez naruszania powyższej zasady.
