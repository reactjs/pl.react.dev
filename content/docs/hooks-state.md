---
id: hooks-state
title: Używanie Hooka Stanu
permalink: docs/hooks-state.html
next: hooks-effect.html
prev: hooks-overview.html
---

*Hooki* są nowym dodatkiem w Reakcie 16.8. Pozwalają one używać stanu i innych funkcjonalności Reacta, bez użycia klas.

W [poprzednim rozdziale](/docs/hooks-intro.html) przedstawiliśmy Hooki następującym przykładem:

```js{4-5}
import React, { useState } from 'react';

function Example() {
  // Zadeklaruj nową zmienną stanu, którą nazwiemy "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Naciśnięto {count} razy</p>
      <button onClick={() => setCount(count + 1)}>
        Naciśnij mnie
      </button>
    </div>
  );
}
```

Naszą naukę o Hookach rozpoczniemy, porównując ten kod z jego przykładowym odpowiednikiem w klasie.

## Odpowiednik w klasie {#equivalent-class-example}

Jeżeli używałeś już klas w Reakcie, ten kod powinien wyglądać znajomo:

```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>Naciśnięto {this.state.count} razy</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Naciśnij mnie
        </button>
      </div>
    );
  }
}
```

Stan inicjalizowany jest wartością `{ count: 0 }`, a następnie, kiedy użytownik naciska przycisk, inkrementujemy właściwość `state.count` , wywołując metodę `this.setState()`. W dalszej części tego rozdziału będziemy posiłkować się fragmentami kodu z tego przykładu.

>Uwaga
>
>Być może zastanawiasz się, dlaczego pokazujemy tutaj licznik zamiast bardziej "życiowego" przykładu. Pozwoli nam to skupić się na samym interfejsie API, póki stawiamy nasze pierwsze kroki z Hookami.

## Hooki i komponenty funkcyjne {#hooks-and-function-components}

Przypomnijmy, reactowe komponenty funkcyjne wyglądają następująco:

```js
const Example = (props) => {
  // Tutaj możesz korzystać z Hooków!
  return <div />;
}
```

albo tak:

```js
function Example(props) {
  // Tutaj możesz korzystać z Hooków!
  return <div />;
}
```

Być może spotkałeś się z nazwą "komponenty bezstanowe". Jako że właśnie przedstawiamy sposób na korzystanie ze stanu z wewnątrz takich kompoonentów, wolimy nazywać je "komponentami funkcyjnymi". 

Hooki **nie** działają w klasach. Ale możesz używać ich zamiast klas.

## Czym jest Hook? {#whats-a-hook}

Nasz nowy przykład rozpoczniemy importując Hook `useState` z Reacta:

```js{1}
import React, { useState } from 'react';

function Example() {
  // ...
}
```

**Czym jest Hook?** Hook jest specjalną funkcją, która pozwala  "zahaczyć się" w wewnętrzne mechanizmy Reacta. Na przykład `useState` jest Hookiem, który pozwala korzystać ze stanu w komponencie funkcyjnym. W kolejnych rozdziałach poznamy inne Hooki.

**Kiedy powinno się korzystać z Hooków?** Jeśli po stworzeniu komponentu funkcyjnego zorientujesz się, że potrzebujesz przechować kilka wartości w stanie, dotychczas musiałeś zamienić taki komponent na klasę. Teraz możesz skorzystać z Hooka z wewnątrz istniejącego komponentu funkcyjnego. Zobaczmy jak to działa!

>Uwaga
>
> Istnieje kilka specjalnych zasad, które mówią o tym kiedy możesz, a kiedy nie możesz używać Hooków w komponencie. Więcej szczegółów poznamy w rozdziale pt. ["Zasady korzystania z Hooków"](/docs/hooks-rules.html).

## Zadeklarowanie zmiennej stanu {#declaring-a-state-variable}

W klasie inicjalizujemy stan `count` wartością `0`, poprzez ustawienie właściwości `this.state` na `{ count: 0 }` w konstruktorze.

```js{4-6}
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
```

W komponencie funkcyjnym nie mamy dostępu do `this`, więc nie możemmy przypisywać, ani czytać wartości właściwości `this.state`. Zamiast tego wywołamy hook `useState` bezpośrednio z wewnątrz naszego komponentu:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Zadeklaruj nową zmienną stanu, którą nazwiemy "count"
  const [count, setCount] = useState(0);
```

**Co w zasadzie robi wywołanie `useState`?** Deklaruje ono "zmienną stanu". Nasza zmienna nazywa się `count`, ale możemy nazwać ją, jak tylko chcemy, na przykład `banana`. Jest to sposób na "przechowanie" wartości pomiędzy wywołanami funkcji -- `useState` jest nowym sposobem, na wykorzystanie dokładnie tych samych możliwości, jakie daje `this.state` w klasach. Zwykle zmienne "znikają" kiedy funkcja kończy działanie, ale zmienne stanu są przechowywane przez Reacta.

**Co przekazujemy do `useState` jako argumenty?** Jedynym argumentem, jaki przyjmuje Hook `useState()` jest początkowa wartość stanu. W przeciwieństwie do klas stan nie musi być obiektem. Możemy przechowywać liczbę lub ciąg znaków, jeżeli to wszystko, czego potrzebujemy. W naszym przykładzie chcemy przechować jedynie wartość liczbową, ile razy użytkownik nacisnął przycisk. Dlatego też przekazujemy `0` jako stan początkowy naszej zmiennej. (Jeżeli chcieli byśmy przechować kolejną wartość w stanie, wywołalibyśmy `useState()` drugi raz.)

**Co zwraca wywołanie `useState`?** Zwraca ono parę wartości: aktualną wartość stanu i funkcję, która pozwala go aktualizować. Dlatego stosujemy zapis `const [count, setCount] = useState()`. Jest to podobne do właściwości `this.state.count` i metody `this.setState` w klasie, z tą różnicą, że tutaj dostajesz je w parze. Jeżeli nie znasz składni, której użyliśmy, wrócimy do tego [przy końcu tego rozdziału](/docs/hooks-state.html#tip-what-do-square-brackets-mean).

Teraz, kiedy wiemy już, co robi Hook `useState`, nasz przykład powinien nabrać większego sensu:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Zadeklaruj nową zmienną stanu, którą nazwiemy "count"
  const [count, setCount] = useState(0);
```

Deklarujemy zmienną stanu, którą nazwaliśmy `count` i ustawiamy jej wartość na `0`. React będzie pamiętał jej aktualną wartość pomiędzy kolejnymi renderowaniami i dostarczy najnowszą wartość do naszej funkcji. Jeżeli chcemy zaktualizować obecną wartość `count`, możemy wywołać funkcję `setCount`.

>Uwaga
>
> Być może zastanawiasz się -- dlaczego funkcja `useState` (*pol. używaj stanu*) nie nazywa się `createState` (*pol. stwórz stan*)?
> 
> Nazwa "Create" (*pol. stwórz*) nie była by zbyt trafna, ponieważ stan tworzony jest tylko wtedy, gdy komponent renderowany jest za pierwszym razem. Podczas kolejnych renderowań `useState` zwraca  aktualny stan. Gdyby nie to, nie mogło by być mowy o żadnym "stanie" (*ang. state*)! Istnieje też powód, dla którego nazwa Hooka *zawsze* rozpoczyna się od `use`. Więcej na ten temat dowiemy się w rozdziale pt. ["Zasady korzystania z Hooków"](/docs/hooks-rules.html).

## Reading State {#reading-state}

When we want to display the current count in a class, we read `this.state.count`:

```js
  <p>You clicked {this.state.count} times</p>
```

In a function, we can use `count` directly:


```js
  <p>You clicked {count} times</p>
```

## Updating State {#updating-state}

In a class, we need to call `this.setState()` to update the `count` state:

```js{1}
  <button onClick={() => this.setState({ count: this.state.count + 1 })}>
    Click me
  </button>
```

In a function, we already have `setCount` and `count` as variables so we don't need `this`:

```js{1}
  <button onClick={() => setCount(count + 1)}>
    Click me
  </button>
```

## Recap {#recap}

Let's now **recap what we learned line by line** and check our understanding.

<!--
  I'm not proud of this line markup. Please somebody fix this.
  But if GitHub got away with it for years we can cheat.
-->
```js{1,4,9}
 1:  import React, { useState } from 'react';
 2:
 3:  function Example() {
 4:    const [count, setCount] = useState(0);
 5:
 6:    return (
 7:      <div>
 8:        <p>You clicked {count} times</p>
 9:        <button onClick={() => setCount(count + 1)}>
10:         Click me
11:        </button>
12:      </div>
13:    );
14:  }
```

* **Line 1:** We import the `useState` Hook from React. It lets us keep local state in a function component.
* **Line 4:** Inside the `Example` component, we declare a new state variable by calling the `useState` Hook. It returns a pair of values, to which we give names. We're calling our variable `count` because it holds the number of button clicks. We initialize it to zero by passing `0` as the only `useState` argument. The second returned item is itself a function. It lets us update the `count` so we'll name it `setCount`.
* **Line 9:** When the user clicks, we call `setCount` with a new value. React will then re-render the `Example` component, passing the new `count` value to it.

This might seem like a lot to take in at first. Don't rush it! If you're lost in the explanation, look at the code above again and try to read it from top to bottom. We promise that once you try to "forget" how state works in classes, and look at this code with fresh eyes, it will make sense.

### Tip: What Do Square Brackets Mean? {#tip-what-do-square-brackets-mean}

You might have noticed the square brackets when we declare a state variable:

```js
  const [count, setCount] = useState(0);
```

The names on the left aren't a part of the React API. You can name your own state variables:

```js
  const [fruit, setFruit] = useState('banana');
```

This JavaScript syntax is called ["array destructuring"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring). It means that we're making two new variables `fruit` and `setFruit`, where `fruit` is set to the first value returned by `useState`, and `setFruit` is the second. It is equivalent to this code:

```js
  var fruitStateVariable = useState('banana'); // Returns a pair
  var fruit = fruitStateVariable[0]; // First item in a pair
  var setFruit = fruitStateVariable[1]; // Second item in a pair
```

When we declare a state variable with `useState`, it returns a pair — an array with two items. The first item is the current value, and the second is a function that lets us update it. Using `[0]` and `[1]` to access them is a bit confusing because they have a specific meaning. This is why we use array destructuring instead.

>Note
>
>You might be curious how React knows which component `useState` corresponds to since we're not passing anything like `this` back to React. We'll answer [this question](/docs/hooks-faq.html#how-does-react-associate-hook-calls-with-components) and many others in the FAQ section.

### Tip: Using Multiple State Variables {#tip-using-multiple-state-variables}

Declaring state variables as a pair of `[something, setSomething]` is also handy because it lets us give *different* names to different state variables if we want to use more than one:

```js
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
```

In the above component, we have `age`, `fruit`, and `todos` as local variables, and we can update them individually:

```js
  function handleOrangeClick() {
    // Similar to this.setState({ fruit: 'orange' })
    setFruit('orange');
  }
```

You **don't have to** use many state variables. State variables can hold objects and arrays just fine, so you can still group related data together. However, unlike `this.setState` in a class, updating a state variable always *replaces* it instead of merging it.

We provide more recommendations on splitting independent state variables [in the FAQ](/docs/hooks-faq.html#should-i-use-one-or-many-state-variables).

## Next Steps {#next-steps}

On this page we've learned about one of the Hooks provided by React, called `useState`. We're also sometimes going to refer to it as the "State Hook". It lets us add local state to React function components -- which we did for the first time ever!

We also learned a little bit more about what Hooks are. Hooks are functions that let you "hook into" React features from function components. Their names always start with `use`, and there are more Hooks we haven't seen yet.

**Now let's continue by [learning the next Hook: `useEffect`.](/docs/hooks-effect.html)** It lets you perform side effects in components, and is similar to lifecycle methods in classes.
