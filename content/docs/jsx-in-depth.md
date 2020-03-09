---
id: jsx-in-depth
title: JSX w szczegółach
permalink: docs/jsx-in-depth.html
redirect_from:
  - "docs/jsx-spread.html"
  - "docs/jsx-gotchas.html"
  - "tips/if-else-in-JSX.html"
  - "tips/self-closing-tag.html"
  - "tips/maximum-number-of-jsx-root-nodes.html"
  - "tips/children-props-type.html"
  - "docs/jsx-in-depth-zh-CN.html"
  - "docs/jsx-in-depth-ko-KR.html"
---

Zasadniczo, JSX dostarcza lukier składniowy dla funkcji `React.createElement(component, props, ...children)`. Kod JSX:

```js
<MyButton color="blue" shadowSize={2}>
  Kliknij mnie
</MyButton>
```

jest kompilowany do:

```js
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Kliknij mnie'
)
```

Jeżeli element nie posiada zagnieżdżonych tagów, możesz użyć tagu samozamykającego się. Wtedy kod:

```js
<div className="sidebar" />
```

jest kompilowany do:

```js
React.createElement(
  'div',
  {className: 'sidebar'}
)
```

Aby przetestować, jak JSX jest zamieniany na JavaScript, możesz wypróbować [kompilator Babel online](babel://jsx-simple-example).

## Określanie typu elementu {#specifying-the-react-element-type}

Pierwsza część tagu JSX określa typ elementu reactowego.

Wielka litera w tagu JSX oznacza, że jest on komponentem reactowym. Takie tagi są bezpośrednio kompilowane na referencję do zmiennej, więc jeżeli używasz w swoim kodzie JSX wyrażenia `<Foo />`, to `Foo` musi znajdować się w zakresie.

### React musi znajdować się w zakresie {#react-must-be-in-scope}

Jako że JSX kompilowany jest do wywołania `React.createElement`, biblioteka `React` musi być w zakresie, w którym znajduje się twój kod JSX.

W przykładzie poniżej oba importy są konieczne, nawet jeżeli `React` i `CustomButton` nie mają żadnych bezpośrednich odniesień z kodu JavaScript:

```js{1,2,5}
import React from 'react';
import CustomButton from './CustomButton';

function WarningButton() {
  // return React.createElement(CustomButton, {color: 'red'}, null);
  return <CustomButton color="red" />;
}
```

Jeżeli nie używasz rozwiązania budującego paczkę z kodem JavaScript i ładujesz Reacta za pomocą tagu `<script>`, jest on dostępny jako globalna zmienna `React`.

### Używanie notacji kropkowej w JSX {#using-dot-notation-for-jsx-type}

Możesz odnosić się do reactowych komponentów za pomocą notacji kropkowej. Jest to wygodne rozwiązanie w sytuacji, gdy z jednego modułu eksportujesz wiele komponentów. Przykładowo, jeżeli `MyComponents.DatePicker` jest komponentem, możesz użyć go bezpośrednio w JSX w następujący sposób:

```js{10}
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Wyobraź sobie, że jest tutaj kalendarz w kolorze {props.color}.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

### Komponenty zdefiniowane przez użytkownika muszą być pisane wielką literą {#user-defined-components-must-be-capitalized}

Jeżeli nazwa elementu zaczyna się od małej litery, oznacza to odniesienie do wbudowanego komponentu, takiego jak na przykład: `<div>` lub `<span>`, i skutkuje przekazaniem ciągu znaków `'div'` lub `'span'` do funkcji `React.createElement`. Nazwy typów, które zaczynają się od wielkiej litery, na przykład: `<Foo />`, są kompilowane do wywołania `React.createElement(Foo)` i odnoszą się do komponentów zdefiniowanych lub zaimportowanych do twoich plików zawierających kod JavaScript.

Rekomendujemy używanie wielkich liter w nazwach komponentów. Jeżeli twój komponent ma nazwę rozpoczynającą się od małej litery, przypisz ją do zmiennej, której nazwa zaczyna się od wielkiej litery, zanim użyjesz go w JSX.

Na przykład, poniższy kod nie zachowa się tak, jak można by tego oczekiwać:

```js{3,4,10,11}
import React from 'react';

// Źle! To jest komponent i jego nazwa powinna zaczynać się wielką literą:
function hello(props) {
  // Dobrze! To użycie <div> jest w porządku, bo jest on poprawnym, wbudowanym tagiem HTML:
  return <div>Witaj, {props.toWhat}</div>;
}

function HelloWorld() {
  // Źle! React traktuje <hello /> jak element wbudowany HTML, bo jego nazwa nie zaczyna się od wielkiej litery:
  return <hello toWhat="Świecie" />;
}
```

Aby to naprawić, zmienimy nazwę z `hello` na `Hello`, a w miejscu użycia napiszemy `<Hello />`:

```js{3,4,10,11}
import React from 'react';

// Dobrze! To jest komponent, więc powinien mieć nazwę pisaną wielką literą:
function Hello(props) {
  // Dobrze! To użycie <div> jest w porządku, bo div jest poprawnym elementem HTML:
  return <div>Witaj, {props.toWhat}</div>;
}

function HelloWorld() {
  // Dobrze! React traktuje <Hello /> jak komponent, bo jego nazwa zaczyna się od wielkiej litery:
  return <Hello toWhat="Świecie" />;
}
```

### Określanie typu w trakcie działania kodu {#choosing-the-type-at-runtime}

Używanie wyrażeń jako elementów w Reakcie jest zabronione. Aby użyć wyrażenia do wskazania komponentu, należy przypisać je do zmiennej o nazwie pisanej z wielkiej litery. To rozwiązanie jest użyteczne w przypadku wyświetlania komponentu w zależności od przekazanego atrybutu:

```js{10,11}
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Źle! Komponent w JSX nie może być wyrażeniem.
  return <components[props.storyType] story={props.story} />;
}
```

Aby to naprawić, przypisujemy najpierw wyrażenie do zmiennej z nazwą zaczynającą się od wielkiej litery:

```js{10-12}
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Dobrze! Komponenty w JSX mogą być przypisywane i przechowywane w zmiennych pisanych wielką literą.
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

## Właściwości w JSX {#props-in-jsx}

Istnieje kilka sposobów na przekazanie właściwości (ang. *props*) w JSX.

### Wyrażenie javascriptowe jako właściwość {#javascript-expressions-as-props}

Możesz przekazać dowolne wyrażenie javascriptowe jako właściwość, jeżeli otoczysz je klamrami `{}`. Przykładowo:

```js
<MyComponent foo={1 + 2 + 3 + 4} />
```

Dla komponentu `MyComponent`, wartość `props.foo` będzie równa `10`, ponieważ wyrażenie `1 + 2 + 3 + 4` zostanie wykonane.

`if` i `for` nie są wyrażeniami w JavaScripcie. Z tego powodu nie mogą być bezpośrednio przekazywane jako właściwość. Zamiast tego, można użyć ich do warunkowego przypisania wartości wyrażenia do zmiennej i zmienną przekazać jako właściwość. Na przykład tak, jak poniżej:

```js{3-7}
function NumberDescriber(props) {
  let description;
  if (props.number % 2 == 0) {
    description = <strong>parzystą</strong>;
  } else {
    description = <i>nieparzystą</i>;
  }
  return <div>{props.number} jest liczbą {description}</div>;
}
```

Możesz dowiedzieć się więcej na temat [warunkowego renderowania](/docs/conditional-rendering.html) i [pętli](/docs/lists-and-keys.html) na odpowiednich stronach.

### Literały tekstowe {#string-literals}

Literały tekstowe można przekazywać jako wartość właściwości. Poniższe przykłady są równoważne:

```js
<MyComponent message="hello world" />

<MyComponent message={'hello world'} />
```

Gdy przekazujesz literał tekstowy, w jego treści zakodowywany jest HTML. Dlatego poniższe wyrażenia będą miały ten sam wynik:

```js
<MyComponent message="&lt;3" />

<MyComponent message={'<3'} />
```

Zwykle jednak konsekwencje tego zachowania nie są istotne, ale zostały wspomniane dla kompletności dokumentacji.

### Przekazane właściwości domyślnie mają wartość "true" {#props-default-to-true}

Gdy przekażesz atrybut bez jawnego podawania wartości, domyślnie przyjmie on wartość `true`. Poniższe wyrażenia JSX są równoważne:

```js
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

Nie rekomendujemy jednak przekazywania wartości `true` w jawny sposób, bo może być to pomylone ze [skrótowym zapisem definicji obiektu w ES6](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015) `{foo}`, który jest równoznaczny z `{foo: foo}`, a nie `{foo: true}`. To zachowanie w składni JSX zostało zaimplementowane, żeby odwzorować sposób działania atrybutów HTML.

### Właściwości rozszczepione (ang. *spread*) {#spread-attributes}

Jeżeli zmienna `props` jest obiektem, a chcesz przekazać ją w JSX, możesz użyć operatora rozszczepienia (`...`). Poniższe implementacje komponentów są równoznaczne:

```js{7}
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```

Możesz również wybrać poszczególne atrybuty, których będzie potrzebował twój komponent, a pozostałe przekazać do jego dzieci używając operatora rozszczepienia.

```js{2}
const Button = props => {
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className} {...other} />;
};

const App = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log("kliknięto!")}>
        Witaj, świecie!
      </Button>
    </div>
  );
};
```

W powyższym przykładzie właściwość `kind` jest używana w komponencie i nie jest przekazywana do elementu DOM `<button>`.
Wszystkie pozostałe właściwości są przekazywane poprzez rozszczepiony obiekt `...other`, co powoduje, że komponent jest elastyczny pod względem przyjmowanych właściwości. W tym przykładzie przekazane zostały atrybuty: `onClick` i `children`.

Operator rozszczepienia może być bardzo pomocny, lecz używając go, łatwo jest stracić kontrolę nad przekazywanymi właściwościami. Może się zdarzyć, że przekażesz niepoprawny atrybut HTML lub nadmiarową właściwość do komponentu, który wcale go nie potrzebuje. Dlatego zalecamy ostrożność w używaniu tego rozwiązania.

## Elementy potomne w JSX {#children-in-jsx}

W JSX, jeżeli wyrażenie posiada zarówno tag otwierający, jak i zamykający, to jego elementy potomne są przekazywane jako specjalna właściwość: `props.children`. Istnieje kilka sposobów na przekazanie właściwości `children`:

### Literały tekstowe {#string-literals-1}

Możesz umieścić łańcuch znaków pomiędzy tagiem otwierającym a zamykającym. Wtedy wartość `props.children` będzie równa przekazanemu łańcuchowi znaków. Jest to szczególnie przydatne w użyciu z niektórymi wbudowanymi elementami HTML. Na przykład:

```js
<MyComponent>Witaj, świecie!</MyComponent>
```

Powyższy kod jest poprawnym wyrażeniem JSX, a wartość `props.children` w komponencie `MyComponent` będzie równa przekazanemu łańcuchowi znaków `"Witaj, świecie!". HTML zostanie odkodowany, więc możesz pisać w JSX tak, jak w zwykłym HTML-u:

```html
<div>To jest poprawny kod HTML &mdash; ale też JSX.</div>
```

JSX usuwa białe znaki na początku i końcu linii, a także: puste linie, puste linie przylegające do elementów, puste linie wewnątrz łańcuchów znaków. Białe znaki w łańcuchach znaków są zamieniane na pojedyncze spacje. Z tego powodu wszystkie poniższe przykłady są renderowane w ten sam sposób:

```js
<div>Witaj, świecie</div>

<div>
  Hello World
</div>

<div>
  Hello
  World
</div>

<div>

  Hello World
</div>
```

### Elementy potomne w JSX {#jsx-children}

W JSX możesz przekazywać więcej niż jeden element jako potomny. Przydaje się to przy wyświetlaniu zagnieżdżonych komponentów:

```js
<MyContainer>
  <MyFirstComponent />
  <MySecondComponent />
</MyContainer>
```

Przekazywane elementy mogą być różnego typu, a więc możesz używać łańcuchów znaków wraz z innymi rodzajami elementów potomnych. Jest to kolejne podobieńswo do HTML-a. Poniższy kod jest zarówno poprawnym JSX, jak i HTML:

```html
<div>
  Oto lista:
  <ul>
    <li>Element 1</li>
    <li>Element 2</li>
  </ul>
</div>
```

Komponenty mogą również zwracać tablicę elementów::

```js
render() {
  // Nie ma potrzeby otaczać elementów listy dodatkowym elementem JSX!
  return [
    // Pamiętaj o kluczach :)
    <li key="A">Pierwszy</li>,
    <li key="B">Drugi</li>,
    <li key="C">Trzeci</li>,
  ];
}
```

### Wyrażenia javascriptowe jako komponenty potomne {#javascript-expressions-as-children}

Możesz przekazać dowolne wyrażenie javascriptowe, obejmując je klamrami `{}`. Poniższe wyrażenia są równoważne:

```js
<MyComponent>foo</MyComponent>

<MyComponent>{'foo'}</MyComponent>
```

To rozwiązanie jest często przydatne przy renderowaniu list. Na przykład, poniższy kod renderuje listę elementów HTML:

```js{2,9}
function Item(props) {
  return <li>{props.message}</li>;
}

function TodoList() {
  const todos = ['dokończyć dokumentację', 'wystawić PR-a', 'namówić Dana na review'];
  return (
    <ul>
      {todos.map((message) => <Item key={message} message={message} />)}
    </ul>
  );
}
```

Wyrażenia javascriptowe można również używać razem z innymi typami danych:

```js{2}
function Hello(props) {
  return <div>Cześć, {props.addressee}!</div>;
}
```

### Funkcje jako komponenty potomne {#functions-as-children}

Zwykle wyrażenia javascriptowe przekazywane w JSX są przekształcane na łańcuchy znaków, elementy reactowe lub listy tych rzeczy. Jednakże właściwość `props.children` działa jak każda inna i może przekazać dowolny rodzaj danych, nie tylko takie, które React wie, jak wyświetlić. Na przykład, twój komponent może przyjmować poprzez `props.children` funkcję zwrotną:

```js{4,13}
// Wywołuje potomną funkcję zwrotną numTimes, aby powtórzyć wyświetlenie elementów
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>To jest {index}. element listy</div>}
    </Repeat>
  );
}
```

Elementy potomne przekazane do własnych komponentów mogą mieć dowolny typ, pod warunkiem, że React będzie w stanie zamienić je na zrozumiały dla siebie typ danych przed wyświetleniem. To podejście nie jest zbyt popularne w składni JSX, ale można w ten sposób rozszerzać jej możliwości.

### Wartości logiczne, Null, i Undefined są ignorowane {#booleans-null-and-undefined-are-ignored}

`false`, `null`, `undefined` i `true` są poprawnymi potomkami, ale nie są renderowane. Wszystkie poniższe wyrażenia JSX będą miały ten sam efekt:

```js
<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>
```

Może się to okazać przydatne przy warunkowym renderowaniu elementów. Na przykład, poniższy kod wyrenderuje komponent `<Header />` tylko, gdy wartość zmiennej `showHeader` jest równa `true`:

```js{2}
<div>
  {showHeader && <Header />}
  <Content />
</div>
```

Warto pamiętać o tym, że niektóre [fałszopodobne wartości (ang. *falsy values*)](https://developer.mozilla.org/en-US/docs/Glossary/Falsy), takie jak `0`, będą renderowane przez Reacta. Przykładowo, poniższy kod nie zachowa się tak, jak można by na pierwszy rzut oka pomyśleć, ponieważ gdy atrybut `props.messages` będzie pustą tablicą, wyświetlona zostanie wartość `0`:

```js{2}
<div>
  {props.messages.length &&
    <MessageList messages={props.messages} />
  }
</div>
```

Aby to naprawić, należy upewnić się, że wyrażenie przed `&&` zawsze jest wartością logiczną:

```js{2}
<div>
  {props.messages.length > 0 &&
    <MessageList messages={props.messages} />
  }
</div>
```

Jeżeli chcesz, aby wartość taka jak: `false`, `true`, `null` lub `undefined` została wyświetlona, w pierwszej kolejności należy [przekonwertować ją na łańcuch znaków](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#String_conversion):

```js{2}
<div>
  Moja javascriptowa zmienna to {String(myVariable)}.
</div>
```
