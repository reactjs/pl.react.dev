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
  Click me
</MyButton>
```

jest kompilowany do:

```js
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click me'
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
  {className: 'sidebar'},
  null
)
```

Aby przetestować jak JSX jest zamieniany na JavaScript, możesz wypróbować [kompilator Babel online](babel://jsx-simple-example).

## Określanie typu elementu {#specifying-the-react-element-type}

Pierwsza część tagu JSX określa typ elementu Reactowego.

Wielka litera w tagu JSX oznacza, że jest on komponentem Reacta. Takie tagi są bezpośrednio kompilowane na referencję do zmiennej, więc jeżeli używasz w swoim kodzie JSX wyrażenia `<Foo />`, to `Foo` musi znajdować się w zakresie.

### React musi znajdować się w zakresie {#react-must-be-in-scope}

Jako, że JSX kompiluje się do wywołania `React.createElement`, biblioteka `React` musi być w zakresie, w którym znajduje się Twój kod JSX.

W przykładzie poniżej, oba importy są konieczne nawet jeżeli `React` i `CustomButton` nie mają żadnych bezpośrednich odniesień z kodu JavaScript:

```js{1,2,5}
import React from 'react';
import CustomButton from './CustomButton';

function WarningButton() {
  // return React.createElement(CustomButton, {color: 'red'}, null);
  return <CustomButton color="red" />;
}
```

Jeżeli nie używasz rozwiązania budującego paczkę z kodem JavaScript i ładujesz Reacta za pomocą tagu `<script>`, jest on dostępny w globalnym zakresie pod etykietą `React`.

### Używanie notacji kropkowej w JSX {#using-dot-notation-for-jsx-type}

Możesz odnosić się do Reactowych komponentów za pomocą notacji kropki. Jest to wygodne rozwiązanie w sytuacji, gdy z jednego modułu eksportujesz wiele komponentów. Przykładowo, jeżeli `MyComponents.DatePicker` jest komponentem, możesz użyć go bezpośrednio w JSX w następujący sposób:

```js{10}
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

### Komponenty zdefiniowane przez użytkownika muszą być pisane z wielkiej litery {#user-defined-components-must-be-capitalized}

Jeżeli nazwa elementu zaczyna się od małej litery, oznacza to odniesienie do wbudowanego komponentu takiego jak na przykład: `<div>` lub `<span>` i skutkuje przekazaniem ciągu znaków `'div'` lub `'span'` do funkcji `React.createElement`. Nazwy typów, które zaczynają się od wielkiej litery, na przykład: `<Foo />` są kompilowane do wywołania `React.createElement(Foo)` i odnoszą się do komponentów zdefiniowanych lub zaimportowanych do Twoich plików zawierających kod JavaScript.

Rekomendujemy używanie wielkich liter w nazwach komponentów. Jeżeli Twój komponent ma nazwę rozpoczynającą się od małej litery, przypisz ją do zmiennej, której nazwa zaczyna się od wielkiej litery zanim użyjesz go w JSX.

Na przykład, poniższy kod nie zachowa się tak jak można oczekiwać:

```js{3,4,10,11}
import React from 'react';

// Źle! To jest komponent i jego nazwa powinna zaczynać się z wielkiej litery:
function hello(props) {
  // Poprawne! To użycie <div> jest poprawne, bo jest on poprawnym, wbudowanym tagiem HTML:
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // Źle! React traktuje <hello /> jak element wbudowany HTML, bo jego nazwa nie zaczyna się od wielkiej litery:
  return <hello toWhat="World" />;
}
```

Aby to naprawić zmienimy nazwę z `hello` na `Hello` i użycie na `<Hello />`:

```js{3,4,10,11}
import React from 'react';

// Poprawne! To jest komponent więc powinien mieć nazwę pisaną z wielkiej litery:
function Hello(props) {
  // Poprawne! To użycie <div> jest poprawne, bo div jest poprawnym elementem HTML:
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // Poprawne! React traktuje <Hello /> jak komponent, bo jego nazwa jest pisana z wielkiej litery:
  return <Hello toWhat="World" />;
}
```

### Określanie typu podczas uruchomienia kodu {#choosing-the-type-at-runtime}

Używanie wyrażeń jako elementów w React jest zabronione. Aby użyć wyrażenia do wskazania komponentu należy przypisać je do zmiennej o nazwie pisanej z wielkiej litery. To rozwiązanie jest użyteczne w przypadku wyświetlania komponentu w zależności od przekazanego atrybutu:

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

Aby to naprawić przypisujemy najpierw wyrażenie do zmiennej z nazwą zaczynającą się z wielkiej litery:

```js{10-12}
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Poprawnie! Komponenty w JSX mogą być przypisane i przechowywane w zmiennych pisanych z wielkiej litery.
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

## Atrybuty w JSX {#props-in-jsx}

Istnieje kilka sposobów na przekazanie atrybutów (ang. props) w JSX.

### Wyrażenie JavaScript jako atrybut {#javascript-expressions-as-props}

Możesz przekazać dowolne wyrażenie JavaScript jako atrybut jeżeli otoczysz je za pomocą `{}`. Przykładowo:

```js
<MyComponent foo={1 + 2 + 3 + 4} />
```

Dla komponentu `MyComponent`, wartość `props.foo` będzie równa `10`, ponieważ wyrażenie `1 + 2 + 3 + 4` zostanie zinterpretowane.

`if` i `for` nie są wyrażeniami w JavaScript. Z tego powodu, nie mogą być bezpośrednio przekazane jako atrybut. Zamiast tego, można użyć ich do warunkowego przypisania wartości wyrażenia do zmiennej i zmienną przekazać jako atrybut. Na przykład tak jak poniżej:

```js{3-7}
function NumberDescriber(props) {
  let description;
  if (props.number % 2 == 0) {
    description = <strong>even</strong>;
  } else {
    description = <i>odd</i>;
  }
  return <div>{props.number} is an {description} number</div>;
}
```

Możesz dowiedzieć się więcej na temat [warunkowego renderowania](/docs/conditional-rendering.html) i [pętli](/docs/lists-and-keys.html) na odpowiednich stronach.

### Literały łańcuchów znaków {#string-literals}

Literały łańcuchów znaków można przekazywać jako wartość atrybutu. Poniższe przykłady są równoważne:

```js
<MyComponent message="hello world" />

<MyComponent message={'hello world'} />
```

Gdy przekazujesz literał łańcucha znaków, jego wartość jest odkodowana z HTML'a. Dlatego poniższe wyrażenia będą miały ten sam wynik:

```js
<MyComponent message="&lt;3" />

<MyComponent message={'<3'} />
```

Zazwyczaj, to zachowanie nie jest istotne i zostało wspomniane tylko dla kompletności dokumentacji.

### Atrybuty domyślnie mają wartość "true" {#props-default-to-true}

Gdy przekażesz atrybut bez jawnego podawania wartości, domyślnie przyjmie on wartość `true`. Poniższe wyrażenia JSX są równoważne:

```js
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

Nie rekomendujemy jednak przekazywania wartości `true` w jawny sposób, bo może być to pomylone ze [skrótowym zapisem definicji obiektu w ES6](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015) `{foo}`, który jest równoznaczny z `{foo: foo}`, a nie `{foo: true}`. To zachowanie JSX zostało zaimplementowane żeby odwzorować sposób działania HTML.

### Atrybuty rozszczepione {#spread-attributes}

Jeżeli atrybuty komponentu (ang. `props`) są obiektem, możesz przekazać je wszystkie w JSX za pomocą operatora rozszczepienia (`...`). Poniższe implementacje komponentów są równoznaczne:

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
      <Button kind="primary" onClick={() => console.log("clicked!")}>
        Hello World!
      </Button>
    </div>
  );
};
```

W powyższym przykładzie atrybut `kind` jest używany w komponencie i nie jest przekazywany do elementu `<button>` i DOM.
Wszystkie pozozstałe atrybuty są przekazywane poprzez rozszczepiony obiekt `...other` co powoduje, że komponent jest elastyczny pod względem przyjmowanych atrybutów. W tym przykładzie przekazane zostały autrybuty: `onClick` i `children`.

Operator rozszczepienia może być bardzo pomocny, lecz używając go, łatwo jest stracić kontrolę nad przekazywanymi atrybutami. Może się zdarzyć, że przekażesz niepoprawny atrybut HTML lub nadmiarowy atrybut, do komponentu, który wcale go nie potrzebuje. Dlatego rekomendujemy ostrożność w użyciu tego rozwiązania.

## Elementy potomne w JSX {#children-in-jsx}

W JSX, jeżeli wyrażenie posiada zarówno tag otwierający jak i zamykający, to jego elementy potomne są przekazywane jako specjalny atrybut: `props.children`. Istnieje kilka sposobów żeby przekazać atrybut `children`:

### Literały łańcuchów znaków {#string-literals-1}

Możesz umieścić łańcuch znaków pomiędzy tagiem otwierającym, a zamykającym. Wtedy wartość `props.children` będzie równa przekazanemu łańcuchowi znaków. Jest to szczególnie przydatne w użyciu z niektórymi wbudowanymi elementami HTML. Na przykład:

```js
<MyComponent>Hello world!</MyComponent>
```

Powyższy kod jest poprawnym wyrażeniem JSX, a wartość `props.children` w komponencie `MyComponent` będzie równa przekazanemu łańcuchowi znaków `"Hello world!". HTML jest odkodowywany więc możesz pisać w JSX tak jak zwykły HTML:

```html
<div>This is valid HTML &amp; JSX at the same time.</div>
```

JSX usuwa białe znaki na początku i końcu linii, a także: puste linie, puste linie przylegające do elementów, puste linie wewnątrz łańcuchów znaków. Białe znaki w łańcuchach znaków są zamieniane na pojedyncze spacje. Z tego powodu wszystkie poniższe przykłady są renderowane w ten sam sposób:

```js
<div>Hello World</div>

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

Możesz przekazywać więcej niż jeden element jako potomny w JSX. Jest to użyteczne podczas wyświetlania zagnieżdżonych komponentów:

```js
<MyContainer>
  <MyFirstComponent />
  <MySecondComponent />
</MyContainer>
```

Przekazywane elementy mogą być różnego typu, a więc możesz używać łańcuchów znaków wraz z innymi rodzajami elementów potomnych. Jest to kolejne podobieńswo do HTML. Poniższy kod jest zarówno poprawnym JSX jak i HTML:

```html
<div>
  Here is a list:
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>
```

Komponenty mogą również zwracać tablicę elementów::

```js
render() {
  // Nie ma potrzeby otaczać elementów listy dodatkowym elementem JSX!
  return [
    // Pamiętaj o kluczach :)
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}
```

### Wyrażenia JavaScript jako komponenty potomne {#javascript-expressions-as-children}

Możesz przekazać dowolne wyrażenie JavaScript obejmując je `{}`. Poniższe wyrażenia są równoważne:

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
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>
      {todos.map((message) => <Item key={message} message={message} />)}
    </ul>
  );
}
```

Wyrażenia JavaScript mogą być również używane obok innych typów danych:

```js{2}
function Hello(props) {
  return <div>Hello {props.addressee}!</div>;
}
```

### Funkcje jako komponenty potomne {#functions-as-children}

Wyrażenia JavaScript przekazywane w JSX są rozwiązywane do łańcuchów znaków, elementu Reacta lub listy tych rzeczy. Jednakże `props.children` działa jak każdy inny atrybut i może przekazać dowolny rodzaj danych, nie tylko takie, które React wie jak wyświetlić. Na przykład, twój komponent może przyjmować funkcję zwrotną jako `props.children`:

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
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```

Elementy potomne przekazane do własnych komponentów mogą mieć dowolny typ jeżeli tylko React będzie w stanie zamienić je na zrozumiały dla siebie typ danych przed wyświetleniem. Nie jest to popularny sposób wykorzystania JSX ale można w ten sposób rozszerzać jego możliwości.

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

Warunkowe renderowanie elementów przez Reacta może być użyteczne. Na przykład, poniższy kod wyrenderuje komponent `<Header />` tylko, gdy wartość zmiennej `showHeader` jest równa `true`:

```js{2}
<div>
  {showHeader && <Header />}
  <Content />
</div>
```

Warto pamiętać, o tym, że niektóre [fałszywie prawdziwe wartości (ang. falsy values)](https://developer.mozilla.org/en-US/docs/Glossary/Falsy), takie jak `0` będą renderowane przez Reacta. Na przykład, poniższy kod, nie zachowa się tak jak można by na pierwszy rzut oka pomyśleć, ponieważ gdy atrybut `props.messages` będzie pustą tablicą, wartość `0` zostanie wyświetlona:

```js{2}
<div>
  {props.messages.length &&
    <MessageList messages={props.messages} />
  }
</div>
```

Aby to naprawić należy upewnić się, że wyrażenie przed `&&` zawsze jest wartością logiczną:

```js{2}
<div>
  {props.messages.length > 0 &&
    <MessageList messages={props.messages} />
  }
</div>
```

Jeżeli chcesz, aby wartość taka jak: `false`, `true`, `null`, lub `undefined` została wyświetlona, w pierwszej kolejności należy [skonwertować ją na łańcuch znaków](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#String_conversion):

```js{2}
<div>
  My JavaScript variable is {String(myVariable)}.
</div>
```
