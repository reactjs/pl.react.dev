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

Komponenty pozwalają podzielić interfejs użytkownika na niezależne, pozwalające na ponowne użycie części i myśleć o każdej z nich osobno. Ta strona wprowadza do pojęcia komponentów. W osobnym rozdziale opisaliśmy [szczegółową dokumentację API komponentów](/docs/react-component.html).

Koncepcyjnie, komponenty są jak javascriptowe funkcje. Przyjmują one arbitralne wartości na wejściu (nazywane "właściwościami" (ang. *props*)) i zwracają reactowe elementy opisujące, co powinno się pojawić na ekranie.

## Komponenty funkcyjne i klasowe {#function-and-class-components}

Najprostszym sposobem na zdefiniowanie komponentu jest napisanie javascriptowej funkcji:

```js
function Welcome(props) {
  return <h1>Cześć, {props.name}</h1>;
}
```

Ta funkcja jest poprawnym reactowym komponentem, ponieważ przyjmuje pojedynczy argument "props" (który oznacza "właściwości" (z ang. *properties*)), będący obiektem z danymi, i zwraca reactowy element. Takie komponenty nazywamy "komponentami funkcyjnymi", gdyż są one dosłownie javascriptowymi funkcjami.

Do zdefiniowania komponentu możesz również użyć [klasy ze standardu ES6](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Classes):

```js
class Welcome extends React.Component {
  render() {
    return <h1>Cześć, {this.props.name}</h1>;
  }
}
```

Obydwa powyższe komponenty są równoważne z punktu widzenia Reacta.

Klasy mają kilka dodatkowych cech, które omówimy w [kolejnych rozdziałach](/docs/state-and-lifecycle.html). Na ten czas bedziemy używać komponentów funkcyjnych dla ich zwięzłości.

## Renderowanie komponentu {#rendering-a-component}

Poprzednio napotykaliśmy reactowe elementy, które reprezentowały znaczniki DOM:

```js
const element = <div />;
```

Elementy mogą również reprezentować komponenty zdefiniowane przez użytkownika:

```js
const element = <Welcome name="Sara" />;
```

Kiedy React widzi element reprezentujący komponent zdefiniowany przez użytkownika, przekazuje do niego JSX-owe atrybuty jako jeden obiekt. Obiekt ten nazywamy "właściwościami" komponentu.

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
>Aby dowiedzieć się więcej o uzasadnieniu tej konwencji, przeczytaj [dogłębną analizę JSX](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized).

## Kompozycja komponentów {#composing-components}

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

## Wyciąganie komponentów {#extracting-components}

Nie bój się dzielenia komponentów na mniejsce komponenty.

Na przykład rozważ ten komponent `Commment`:

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

Przyjmuje on `autora` (ang. *author*) - obiekt, `text` - string i `datę` (ang. *date*) jako właściwości, oraz opisuje komentarz na stronie mediów społecznościowych.

Zmiana tego komponentu może być zawiła z powodu całego tego zagnieżdżenia, a ponowne użycie jego indywidulnych części jest trudne. Wyciągnijmy z niego kilka komponentów.

Najpierw, wyciągniemy `Avatar`:

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

`Avatar` nie musi wiedzieć, że jest renderowany w środku komponentu `Comment`. Dlatego też daliśmy jego właściwości bardziej ogólną nazwę: `użytkownik` (ang. *user*) zamiast `autor`.

Polecamy nazywać właściwości z punktu widzenia komponentu, a nie kontekstu, w którym jest używany.

Możemy teraz dodać do komponentu `Comment` drobne uproszczenie:

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

Następnie wyciągniemy komponent `UserInfo`, który renderuje `Avatar` obok nazwy użytkownika:

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

[](codepen://components-and-props/extracting-components-continued)

Wyciąganie komponentów może z początku wydawać się żmudnym zajęciem, ale posiadanie palety pozwalających na ponowne użycie komponentów jest opłacalne w większych aplikacjach. Dobrą praktyczną zasadą jest, że jeśli część twojego interfejsu użytkownika jest używana wiele razy (`Button`, `Panel`, `Avatar`) lub jest jest ona dostatecznie skomplikowana sama w sobie (`App`, `FeedStory`, `Comment`), jest ona dobrym kandydatem do stania się komponentem wielokrotnego użytku.

## Właściwości są tylko do odczytu {#props-are-read-only}

Bez względu na to, czy zadeklarujesz komponent [jako funkcja czy klasa](#function-and-class-components), nie może on nigdy modyfikować swoich właściwości. Rozważ tą funkcję `sum`:

```js
function sum(a, b) {
  return a + b;
}
```

Funkcje tego typu nazywane są ["czystymi"](https://en.wikipedia.org/wiki/Pure_function), dlatego że nie próbują one zmieniać swoich wartości wejściowych i zawsze zwracają ten sam wynik dla tych samych wartości wejściowych.

W przeciwieństwie do poprzedniej, ta funkcja nie jest czysta, bo zmienia swoją wartość wejściową.

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React jest bardzo elastyczny, ale ma jedną ścisłą zasadę:

**Wszytkie komponenty muszą zachowywać się jak czyste funkcje w odniesieniu do ich właściwości.**

Oczywiście, interfejsy użytkownika aplikacji są dynamiczne i zmieniają się w czasie. W [kolejnym rozdziale](/docs/state-and-lifecycle.html), wprowadzimy nowe pojęcie "stanu". Stan pozwala reactowym komponentom na zmianę swojego wyniku w czasie w odpowiedzi na akcje użytkownika, żądania sieciowe i wszystko inne, bez naruszania tej zasady.
