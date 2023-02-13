---
id: hooks-state
title: Używanie hooka stanu
permalink: docs/hooks-state.html
next: hooks-effect.html
prev: hooks-overview.html
---

<<<<<<< HEAD
*Hooki* są nowym dodatkiem w Reakcie 16.8. Pozwalają one na wykorzystanie stanu i innych funkcjonalności Reacta, bez użycia klas.
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [State: A Component's Memory](https://beta.reactjs.org/learn/state-a-components-memory)
> - [`useState`](https://beta.reactjs.org/reference/react/useState)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

*Hooks* are a new addition in React 16.8. They let you use state and other React features without writing a class.
>>>>>>> 47adefd30c46f486428d8231a68e639d62f02c9e

We [wstępie](/docs/hooks-intro.html) przedstawiliśmy hooki za pomocą następującego przykładu:

```js{4-5}
import React, { useState } from 'react';

function Example() {
  // Zadeklaruj nową zmienną stanu, którą nazwiemy „count”
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Kliknięto {count} razy</p>
      <button onClick={() => setCount(count + 1)}>
        Kliknij mnie
      </button>
    </div>
  );
}
```

Naszą naukę o hookach rozpoczniemy, porównując ten kod z jego przykładowym odpowiednikiem w klasie.

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
        <p>Kliknięto {this.state.count} razy</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Kliknij mnie
        </button>
      </div>
    );
  }
}
```

Stan inicjalizowany jest wartością `{ count: 0 }`, a następnie, kiedy użytkownik naciska przycisk, inkrementujemy właściwość `state.count`, wywołując metodę `this.setState()`. W dalszej części tego rozdziału będziemy posiłkować się fragmentami kodu z tego przykładu.

>Uwaga
>
>Być może zastanawiasz się, dlaczego pokazujemy tutaj licznik zamiast bardziej „życiowego” przykładu. Pozwoli nam to skupić się na samym interfejsie API, póki stawiamy nasze pierwsze kroki z hookami.

## Hooki i komponenty funkcyjne {#hooks-and-function-components}

Przypomnijmy, reactowe komponenty funkcyjne wyglądają następująco:

```js
const Example = (props) => {
  // Tutaj możesz korzystać z hooków!
  return <div />;
}
```

albo tak:

```js
function Example(props) {
  // Tutaj możesz korzystać z hooków!
  return <div />;
}
```

Być może spotkałeś się z nazwą „komponenty bezstanowe”. Jako że właśnie przedstawiamy sposób na korzystanie ze stanu wewnątrz takich komponentów, wolimy nazywać je „komponentami funkcyjnymi”. 

Hooki **nie** działają w klasach. Ale możesz używać ich zamiast klas.

## Czym jest hook? {#whats-a-hook}

Nasz nowy przykład rozpoczniemy importując hook `useState` z Reacta:

```js{1}
import React, { useState } from 'react';

function Example() {
  // ...
}
```

**Czym jest hook?** Hook jest specjalną funkcją, która pozwala „zahaczyć się” w wewnętrzne mechanizmy Reacta. Na przykład `useState` jest hookiem, który pozwala korzystać ze stanu w komponencie funkcyjnym. W kolejnych rozdziałach poznamy inne hooki.

**Kiedy powinno się korzystać z hooków?** Jeśli po stworzeniu komponentu funkcyjnego zorientujesz się, że potrzebujesz przechować kilka wartości w stanie, dotychczas musiałeś zamienić taki komponent na klasę. Teraz możesz skorzystać z hooka z wewnątrz istniejącego komponentu funkcyjnego. Zobaczmy jak to działa!

>Uwaga
>
>Istnieje kilka specjalnych zasad, które mówią o tym kiedy możesz, a kiedy nie możesz używać hooków w komponencie. Więcej szczegółów poznamy w rozdziale pt. [„Zasady korzystania z hooków”](/docs/hooks-rules.html).

## Zadeklarowanie zmiennej stanu {#declaring-a-state-variable}

W klasie inicjalizujemy stan `count` z wartością `0`, poprzez ustawienie właściwości `this.state` na `{ count: 0 }` w konstruktorze.

```js{4-6}
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
```

W komponencie funkcyjnym nie mamy dostępu do `this`, więc nie możemy przypisywać, ani odczytać wartości właściwości `this.state`. Zamiast tego wywołamy hook `useState` bezpośrednio z wewnątrz naszego komponentu:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Zadeklaruj nową zmienną stanu, którą nazwiemy „count”
  const [count, setCount] = useState(0);
```

**Co w zasadzie robi wywołanie `useState`?** Deklaruje ono „zmienną stanu”. Nasza zmienna nazywa się `count`, ale możemy nazwać ją, jak tylko chcemy, na przykład `banan`. Jest to sposób na „przechowanie” wartości pomiędzy wywołaniami funkcji -- `useState` jest nowym sposobem, na wykorzystanie dokładnie tych samych możliwości, jakie daje `this.state` w klasach. Zwykle zmienne „znikają” kiedy funkcja kończy działanie, ale zmienne stanu są przechowywane przez Reacta.

**Co przekazujemy do `useState` jako argumenty?** Jedynym argumentem, jaki przyjmuje hook `useState()` jest początkowa wartość stanu. W przeciwieństwie do klas stan nie musi być obiektem. Możemy przechowywać liczbę lub ciąg znaków, jeżeli to wszystko, czego potrzebujemy. W naszym przykładzie chcemy przechować jedynie wartość liczbową, ile razy użytkownik nacisnął przycisk. Dlatego też przekazujemy `0` jako stan początkowy naszej zmiennej. (Jeżeli chcielibyśmy przechować kolejną wartość w stanie, wywołalibyśmy `useState()` po raz drugi.)

**Co zwraca wywołanie `useState`?** Zwraca ono parę wartości: aktualną wartość stanu i funkcję, która pozwala go aktualizować. Dlatego stosujemy zapis `const [count, setCount] = useState()`. Jest to podobne do właściwości `this.state.count` i metody `this.setState` w klasie, z tą różnicą, że tutaj dostajesz je w parze. Jeżeli nie znasz składni, której użyliśmy, wrócimy do tego [przy końcu tego rozdziału](/docs/hooks-state.html#tip-what-do-square-brackets-mean).

Teraz, kiedy wiemy już, co robi hook `useState`, nasz przykład powinien nabrać większego sensu:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Zadeklaruj nową zmienną stanu, którą nazwiemy „count”
  const [count, setCount] = useState(0);
```

Deklarujemy zmienną stanu, którą nazwaliśmy `count` i ustawiamy jej wartość na `0`. React będzie pamiętał jej aktualną wartość pomiędzy kolejnymi renderowaniami i dostarczy najnowszą wartość do naszej funkcji. Jeżeli chcemy zaktualizować obecną wartość `count`, możemy wywołać funkcję `setCount`.

>Uwaga
>
>Być może zastanawiasz się -- dlaczego funkcja `useState` (pol. *używaj stanu*) nie nazywa się `createState` (pol. *stwórz stan*)?
> 
>Nazwa „Create” (pol. *tworzyć*) nie byłaby zbyt trafna, ponieważ stan tworzony jest tylko wtedy, gdy komponent renderowany jest za pierwszym razem. Podczas kolejnych renderowań `useState` zwraca  aktualny stan. Gdyby nie to, nie mogłoby być mowy o żadnym „stanie” (ang. *state*)! Istnieje też powód, dla którego nazwa hooka *zawsze* rozpoczyna się od `use`. Więcej na ten temat dowiemy się w rozdziale pt. [„Zasady korzystania z hooków”](/docs/hooks-rules.html).

## Odczytywanie wartości stanu {#reading-state}

Jeśli chcemy wyświetlić aktualną wartość stanu licznika w klasie, odczytamy wartość właściwości `this.state.count`:

```js
  <p>Kliknięto {this.state.count} razy</p>
```

Wewnątrz funkcji, możemy użyć bezpośrednio zmiennej `count`:


```js
  <p>Kliknięto {count} razy</p>
```

## Aktualizowanie wartości stanu {#updating-state}

Aby zaktualizować wartość stanu `count` w klasie, musimy wywołać metodę `this.setState()`:

```js{1}
  <button onClick={() => this.setState({ count: this.state.count + 1 })}>
    Kliknij mnie
  </button>
```

Wewnątrz funkcji mamy już zadeklarowane zmienne `setCount` i `count`, więc nie potrzebujemy `this`:

```js{1}
  <button onClick={() => setCount(count + 1)}>
    Kliknij mnie
  </button>
```

## Podsumowanie {#recap}

Teraz **podsumujmy linijka po linijce to, czego się nauczyliśmy** i sprawdźmy naszą wiedzę.

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
 8:        <p>Kliknięto {count} razy</p>
 9:        <button onClick={() => setCount(count + 1)}>
10:         Kliknij mnie
11:        </button>
12:      </div>
13:    );
14:  }
```

* **Linia 1:** Importujemy hooka `useState` z biblioteki React. Pozwala nam to na używanie lokalnego stanu w komponencie funkcyjnym.
* **Linia 4:** Wewnątrz komponentu `Example`, poprzez wywołanie hooka `useState`, deklarujemy nową zmienną stanu. Wywołanie zwraca parę wartości, którym nadajemy nazwy. Naszą zmienną nazywamy `count` (pol. *licznik*), ponieważ przechowuje ona liczbę naciśnięć przycisku. Inicjalizujemy ją z domyślną wartością, poprzez przekazanie `0` jako jedynego argumentu do funkcji `useState`. Jako druga zwrócona jest funkcja, która pozwala aktualizować wartość `count`, więc nazwiemy ją `setCount` (pol. *ustawić licznik*).
* **Linia 9:** Kiedy użytkownik naciska przycisk wywołujemy funkcję `setCount` z nową wartością. React wyrenderuje ponownie komponent `Example`, przekazując do niego nową wartość zmiennej `count`.

Z początku wszystkie te informacje mogą wydawać się trudne do „przetrawienia”. Nie spiesz się! Jeżeli zgubisz się gdzieś czytając wyjaśnienie, spójrz na kod jeszcze raz i spróbuj go przeczytać ponownie od góry do dołu. Obiecujemy, kiedy spróbujesz „zapomnieć”, jak działa stan w klasach i spojrzysz na kod świeżym okiem, nabierze to sensu.

### Wskazówka: Co oznaczają nawiasy kwadratowe? {#tip-what-do-square-brackets-mean}

Być może zauważyłeś nawiasy kwadratowe, kiedy deklarowaliśmy zmienną stanu:

```js
  const [count, setCount] = useState(0);
```

Nazwy po lewej nie są częścią interfejsu API Reacta. Możesz nadać własne nazwy zmiennym stanu:

```js
  const [fruit, setFruit] = useState('banan');
```

Ta składnia JavaScriptu nazwana jest [przypisaniem destrukturyzującym tablic](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Operatory/Destructuring_assignment#Destrukturyzacja_tablic). Oznacza to, że tworzymy dwie zmienne `fruit` i `setFruit` -- gdzie `fruit` jest pierwszą wartością zwróconą przez `useState`, a `setFruit` drugą. Jest to odpowiednik następującego kodu:

```js
  var fruitStateVariable = useState('banan'); // Zwraca parę
  var fruit = fruitStateVariable[0]; // Pierwszy element pary
  var setFruit = fruitStateVariable[1]; // Drugi element pary
```

Kiedy deklarujemy zmienną stanu, korzystając z funkcji `useState`, zwraca ona parę -- dwuelementową tablicę. Pierwszym elementem jest aktualna wartość, a drugim funkcja, która pozwala go aktualizować. Używanie zapisu `[0]` i `[1]` do uzyskiwania dostępu do nich jest nieco mylące, ponieważ mają one określone znaczenie. Dlatego używamy składni przypisania destrukturyzującego.

>Uwaga
>
>Być może zastanawiasz się, skąd React wie, któremu konkretnie komponentowi odpowiada każde wywołanie `useState`, jeśli nie przekazujemy Reactowi obiektu `this` ani nic podobnego. Na [to pytanie](/docs/hooks-faq.html#how-does-react-associate-hook-calls-with-components) (i wiele innych) odpowiemy w rozdziale pt. „Hooki - FAQ”.

### Wskazówka: Używanie kilku zmiennych stanu {#tip-using-multiple-state-variables}

Deklarowanie zmiennych stanu jako pary `[something, setSomething]` jest przydatne także dlatego, że pozwala ci na używanie *różnych* nazw, dla różnych zmiennych stanu, jeśli chcemy korzystać z więcej niż jednej:

```js
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banan');
  const [todos, setTodos] = useState([{ text: 'Nauczyć się hooków' }]);
```

W powyższym komponencie, mamy lokalne zmienne `age`, `fruit` i `todos` i możemy każdą z nich zaktualizować z osobna.

```js
  function handleOrangeClick() {
    // Similar to this.setState({ fruit: 'orange' })
    setFruit('orange');
  }
```

**Nie musisz** używać kilku zmiennych stanu. Zmienne stanu mogą równie dobrze przechowywać obiekty i tablice, więc wciąż możesz grupować powiązane dane. Jednakże, w przeciwieństwie do metody `this.setState` w klasie, aktualizowanie zmiennej stanu zawsze *nadpisuje* jej wartość, zamiast scalać stare i nowe wartości.

W rozdziale pt. [„Hooki - FAQ”](/docs/hooks-faq.html#should-i-use-one-or-many-state-variables) wypisaliśmy zalecenia dotyczące podziału niezależnych zmiennych stanu.

## Kolejne kroki {#next-steps}

Ten rozdział poświęciliśmy jednemu z hooków dostarczanych przez Reacta -- `useState`. Czasami będziemy też nazywać go „hookiem stanu”. Pozwala on nam dodać lokalny stan do reactowych komponentów funkcyjnych, co zrobiliśmy po raz pierwszy w historii!

Dowiedzieliśmy się też troszeczkę o tym, czym w zasadzie są hooki. Hooki to funkcje, które pozwalają „zahaczyć się” w wewnętrzne mechanizmy Reacta z wewnątrz komponentów funkcyjnych. Ich nazwy muszą zaczynać się od `use` i istnieje szereg innych hooków, których jeszcze nie poznaliśmy.

**Zapoznajmy się więc z [kolejnym hookiem: `useEffect`.](/docs/hooks-effect.html)** Pozwala on na przeprowadzanie „efektów ubocznych” (ang. *side effects*) w komponentach i jest podobony do metod cyklu życia w klasach.
