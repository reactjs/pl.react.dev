---
title: useState
---

<Intro>

`useState` jest hookiem reactowym, który pozwala na dodanie do komponentu [zmiennej stanu](/learn/state-a-components-memory).

```js
const [state, setState] = useState(initialState)
```

</Intro>

<InlineToc />

---

## Dokumentacja {/*reference*/}

### `useState(initialState)` {/*usestate*/}

Wywołaj `useState` na głównym poziomie komponentu, aby zadeklarować [zmienną stanu](/learn/state-a-components-memory).

```js
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(28);
  const [name, setName] = useState('Taylor');
  const [todos, setTodos] = useState(() => createTodos());
  // ...
```

Przyjęło się nazywać stan `[something, setSomething]`, używając przy tym składni [destrukturyzacji tablicy](https://javascript.info/destructuring-assignment).

[Więcej przykładów znajdziesz powyżej.](#examples-basic)

#### Parametry {/*parameters*/}

* `initialState`: Wartość, jaką stan ma otrzymać na początku. Może być dowolnego typu, jednak dla funkcji przewidziane jest specjalne zachowanie. Ten argument jest ignorowany po pierwszym renderowaniu komponentu.
  * Jeśli jako argument `initialState` przekażesz funkcję, będzie ona traktowana jako _funkcja inicjalizująca_. Musi być "czysta", nie może przyjmować żadnych argumentów i powinna zwracać wartość dla zmiennej stanu. React wywoła twoją funkcję inicjalizującą podczas tworzenia komponentu i przypisze zwróconą przez nią wartość jako stan początkowy. [Zobacz przykład powyżej.](#avoiding-recreating-the-initial-state)

#### Zwracana wartość {/*returns*/}

`useState` zwraca tablicę o dokładnie dwóch elementach:

1. Aktualna wartość stanu. Podczas pierwszego renderowania będzie taka sama jak przekazany do hooka argument `initialState`.
2. [Funkcja `set`](#setstate), która umożliwia zaktualizowanie stanu do innej wartości i wymusza przerenderowanie komponentu.

#### Zastrzeżenia {/*caveats*/}

* `useState` jest hookiem, więc można go wywoływać tylko **na głównym poziomie komponentu** lub innego hooka. Nie można go wywołać w pętli lub instrukcji warunkowej. Jeśli masz sytuację, która wymaga pętli lub warunku, stwórz nowy komponent i przenieś do niego ten stan.
* W Trybie Restrykcyjnym (ang. *Strict Mode*) React **wywoła twoją funkcję inicjalizującą dwukrotnie**, aby [pomóc ci w zlokalizowaniu niechcianych "nieczystości"](#my-initializer-or-updater-function-runs-twice). To zachowanie tyczy się tylko środowiska deweloperskiego i nie wpływa na produkcję. Jeśli twoja funkcja inicjalizująca jest "czysta" (a powinna być), nie wpłynie to w żaden sposób na logikę twojego komponentu. Wynik z jednego z wywołań tej funkcji zostanie zwyczajnie zignorowany.

---

### Funkcja `set`, np. `setSomething(nextState)` {/*setstate*/}

Funkcja `set` zwracana przez `useState` pozwala na zaktualizowanie stanu do innej wartości i wymusza przerenderowanie komponentu. Nową wartość stanu można przekazać bezpośrednio lub można przekazać funkcję, która wyliczy nowy stan na podstawie poprzedniego:

```js
const [name, setName] = useState('Edward');
const [age, setAge] = useState(42);

function handleClick() {
  setName('Taylor');
  setAge(a => a + 1);
  // ...
```

#### Parametry {/*setstate-parameters*/}
Note that if you call a `set` function while rendering, it must be inside a condition like `prevCount !== count`, and there must be a call like `setPrevCount(count)` inside of the condition. Otherwise, your component would re-render in a loop until it crashes. Also, you can only update the state of the *currently rendering* component like this. Calling the `set` function of *another* component during rendering is an error. Finally, your `set` call should still [update state without mutation](#updating-objects-and-arrays-in-state) -- this doesn't mean you can break other rules of [pure functions.](/learn/keeping-components-pure)

* `nextState`: Wartość, na jaką chcesz zmienić stan. Może być dowolnego typu, jednak dla funkcji przewidziane jest specjalne zachowanie.
  * Jeśli jako argument `nextState` przekażesz funkcję, będzie ona traktowana jako _funkcja aktualizująca_. Musi być "czysta", powinna przyjmować poprzedni stan jako swój jedyny argument i powinna zwracać następną wartość stanu. React umieści twoją funkcję aktualizującą w kolejce i przerenderuje komponent. Podczas kolejnego renderowania React obliczy nowy stan, aplikując kolejno wszystkie zakolejkowane funkcje aktualizujące na poprzednim stanie. [Zobacz przykład powyżej.](#updating-state-based-on-the-previous-state)

#### Zwracana wartość {/*setstate-returns*/}

Funkcje `set` nie zwracają żadnej wartości.

#### Zastrzeżenia {/*setstate-caveats*/}

* Funkcja `set` **aktualizuje zmienną stanu tylko dla *następnego* renderowania**. Jeśli spróbujesz odczytać wartość stanu tuż po wywołaniu funkcji `set`, [otrzymasz starą wartość](#ive-updated-the-state-but-logging-gives-me-the-old-value), która istniała przed wywołaniem.

* Jeśli nowa wartość i aktualny stan są identyczne (na podstawie porównania [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)), React **nie wymusi ponownego renderowania komponentu i jego potomków.** Jest to pewna forma optymalizacji. Mimo że czasem React nadal może wywołać twój komponent ponownie przed pominięciem potomków, nie powinno to wpłynąć na logikę działania komponentu.

* React [grupuje aktualizacje stanu](/learn/queueing-a-series-of-state-updates). Aktualizuje on ekran **po zakończeniu działania wszystkich procedur obsługi zdarzeń** i po tym, jak te procedury wywoją odpowiednie funkcje `set`. Zapobiega to wielokrotnemu renderowaniu komponentu podczas pojedynczego zdarzenia. W rzadkich sytuacjach, kiedy chcesz wymusić wcześniejsze zaktualizowanie ekranu, np. aby odczytać coś z DOM, możesz użyć funkcji [`flushSync`](/apis/react-dom/flushsync).

<<<<<<< HEAD
* Wywołanie funkcji `set` *podczas renderowania* jest dozwolone tylko w ramach aktualnie renderowanego komponentu. React zignoruje wynik aktualnego renderowania i natychmiast spróbuje wyrenderować go ponownie z nowym stanem. Ten wzorzec jest rzadko stosowany, jednak możesz go użyć, aby **zapisać dane z poprzedniego renderowania**. [Zobacz przykład powyżej.](#storing-information-from-previous-renders)
=======
* The `set` function has a stable identity, so you will often see it omitted from effect dependencies, but including it will not cause the effect to fire. If the linter lets you omit a dependency without errors, it is safe to do. [Learn more about removing Effect dependencies.](/learn/removing-effect-dependencies#move-dynamic-objects-and-functions-inside-your-effect)

* Calling the `set` function *during rendering* is only allowed from within the currently rendering component. React will discard its output and immediately attempt to render it again with the new state. This pattern is rarely needed, but you can use it to **store information from the previous renders**. [See an example below.](#storing-information-from-previous-renders)
>>>>>>> c003ac4eb130fca70b88cf3a1b80ce5f76c51ae3

* W Trybie Restrykcyjnym (ang. *Strict Mode*) React **wywoła twoją funkcję aktualizującą dwukrotnie**, aby [pomóc ci w zlokalizowaniu niechcianych "nieczystości"](#my-initializer-or-updater-function-runs-twice). To zachowanie tyczy się tylko środowiska deweloperskiego i nie wpływa na produkcję. Jeśli twoja funkcja aktualizująca jest "czysta" (a powinna być), nie wpłynie to w żaden sposób na logikę twojego komponentu. Wynik z jednego z wywołań tej funkcji zostanie zwyczajnie zignorowany.

---

## Sposób użycia {/*usage*/}

### Dodawanie stanu do komponentu {/*adding-state-to-a-component*/}

Wywołaj `useState` na głównym poziomie komponentu, aby zadeklarować jedną lub więcej [zmiennych stanu](/learn/state-a-components-memory).

```js [[1, 4, "age"], [2, 4, "setAge"], [3, 4, "42"], [1, 5, "name"], [2, 5, "setName"], [3, 5, "'Taylor'"]]
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(42);
  const [name, setName] = useState('Taylor');
  // ...
```

Przyjęło się, że zmienne stanu nazywamy `[something, setSomething]`, korzystając przy tym z [destrukturyzacji tablicy](https://javascript.info/destructuring-assignment).

`useState` zwraca tablicę o dokładnie dwóch elementach:

1. <CodeStep step={1}>Aktualny stan</CodeStep> naszej zmiennej stanu, pierwotnie ustawiony na <CodeStep step={3}>stan początkowy</CodeStep> przekazany jako argument.
2. <CodeStep step={2}>Funkcja `set`</CodeStep>, która pozwala zmienić wartość stanu na dowolną inną w odpowiedzi na jakąś interakcję.

Aby zaktualizować to, co jest wyświetlane na ekranie, wywołaj funkcję `set`, przekazując nowy stan jako argument:

```js [[2, 2, "setName"]]
function handleClick() {
  setName('Robin');
}
```

React zapisze nowy stan, wyrenderuje ponownie twój komponent już z nową wartością, a na koniec zaktualizuje UI.

<Pitfall>

Wywoływanie funkcji `set` [**nie zmienia** stanu w trakcie działania kodu](#ive-updated-the-state-but-logging-gives-me-the-old-value):

```js {3}
function handleClick() {
  setName('Robin');
  console.log(name); // Nadal "Taylor"!
}
```

Wpływa to tylko na to, co `useState` zwróci przy *następnym* renderowaniu.

</Pitfall>

<Recipes titleText="Podstawowe przykłady użycia useState" titleId="examples-basic">

#### Licznik (liczba) {/*counter-number*/}

W tym przykładzie zmienna stanu `count` przechowuje liczbę. Klikanie na przycisk zwiększa tę wartość.

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Wciśnięto mnie {count} razy
    </button>
  );
}
```

</Sandpack>

<Solution />

#### Pole tekstowe (tekst) {/*text-field-string*/}

W tym przykładzie zmienna stanu `text` przechowuje napis. Po wpisaniu czegoś do pola, `handleChange` odczytuje ostatnią wartość pola tekstowego z elementu DOM, a następnie wywołuje `setText` w celu ustawienia nowego stanu. Pozwala to na wyświetlenie aktualnego tekstu poniżej pola.

<Sandpack>

```js
import { useState } from 'react';

export default function MyInput() {
  const [text, setText] = useState('cześć');

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <>
      <input value={text} onChange={handleChange} />
      <p>Wpisano: {text}</p>
      <button onClick={() => setText('cześć')}>
        Resetuj
      </button>
    </>
  );
}
```

</Sandpack>

<Solution />

#### Pole wyboru (wartość logiczna) {/*checkbox-boolean*/}

W tym przykładzie zmienna stanu `liked` przechowuje wartość logiczną. Kiedy klikniesz na pole wyboru, `setLiked` zaktualizuje wartość `liked` na postawie tego, czy pole jest zaznaczone, czy nie. Zmienna `liked` jest wykorzystywana do wyrenderowanie tekstu pod polem.

<Sandpack>

```js
import { useState } from 'react';

export default function MyCheckbox() {
  const [liked, setLiked] = useState(true);

  function handleChange(e) {
    setLiked(e.target.checked);
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={liked}
          onChange={handleChange}
        />
        Lubię to
      </label>
      <p>{liked ? 'Lubisz to' : 'Nie lubisz tego'}.</p>
    </>
  );
}
```

</Sandpack>

<Solution />

#### Formularz (dwie zmienne) {/*form-two-variables*/}

W komponencie możesz zadeklarować więcej niż jedną zmienną stanu. Każda z nich jest niezależna od pozostałych.

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);

  return (
    <>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => setAge(age + 1)}>
        Zwiększ wiek
      </button>
      <p>Cześć, {name}. Masz {age} lat.</p>
    </>
  );
}
```

```css
button { display: block; margin-top: 10px; }
```

</Sandpack>

<Solution />

</Recipes>

---

### Aktualizowanie stanu w oparciu o poprzedni stan {/*updating-state-based-on-the-previous-state*/}

Załóżmy, że wartość `age` jest obecnie równa `42`. Poniższa procedura obsługi zdarzenia wywołuje `setAge(age + 1)` trzykrotnie:

```js
function handleClick() {
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
}
```

Mimo to po jednym kliknięciu wartość `age` będzie równa `43`, a nie `45`! Dzieje się tak, ponieważ wywoływanie funkcji `set` [nie aktualizuje](/learn/state-as-a-snapshot) zmiennej stanu `age` w trakcie wywoływania kodu. Tak więc każde `setAge(age + 1)` tak naprawdę jest tym samym, co `setAge(43)`.

Aby rozwiązać ten problem **możesz przekazać do `setAge` *funkcję aktualizującą** zamiast samej wartości:

```js [[1, 2, "a", 0], [2, 2, "a + 1"], [1, 3, "a", 0], [2, 3, "a + 1"], [1, 4, "a", 0], [2, 4, "a + 1"]]
function handleClick() {
  setAge(a => a + 1); // setAge(42 => 43)
  setAge(a => a + 1); // setAge(43 => 44)
  setAge(a => a + 1); // setAge(44 => 45)
}
```

W tym przykładzie `a => a + 1` jest twoją funkcją aktualizującą. Otrzymuje ona <CodeStep step={1}>aktualny stan</CodeStep> i oblicza na jego podstawie <CodeStep step={2}>następny stan</CodeStep>.

React umieszcza funkcje aktualizujące w [kolejce](/learn/queueing-a-series-of-state-updates). Następnie, podczas kolejnego renderowania, wywołuje je w takiej samej kolejności:

1. `a => a + 1` otrzyma aktualny stan równy `42` i zwróci następny stan jako `43`.
1. `a => a + 1` otrzyma aktualny stan równy `43` i zwróci następny stan jako `44`.
1. `a => a + 1` otrzyma aktualny stan równy `44` i zwróci następny stan jako `45`.

W tym przypadku nie mamy więcej zakolejkowanych zmian, więc React na koniec zapisze wartość `45` jako aktualny stan.

Przyjęło się, żeby nazywać argument odpowiadający za poprzedni stan używając pierwszej litery nazwy zmiennej stanu, na przykład `a` dla `age`. Możesz jednak nazwać go dowolnie, np. `prevAge`.

React może [wywołać twoje funkcje aktualizujące dwukrotnie](#my-initializer-or-updater-function-runs-twice) w środowisku deweloperskim, aby upewnić się, że są one ["czyste"](/learn/keeping-components-pure).

<DeepDive>

#### Czy zawsze powinno się używać funkcji aktualizującej? {/*is-using-an-updater-always-preferred*/}

W internecie można natknąć się na porady, które radzą zawsze pisać `setAge(a => a + 1)`, jeśli następna wartość stanu zależy od poprzedniej. Nie ma w tym nic złego, ale też nie jest to wymagane.

W większości przypadków nie ma różnicy między tymi dwoma podejściami. React zawsze upewnia się, że przy wszelkich intencjonalnych akcjach użytkownika, np. kliknięciach, zmienna stanu `age` zostanie zaktualizowana jeszcze przed kolejnym kliknięciem. Oznacza to, że nie ma ryzyka, iż procedura obsługi kliknięcia otrzyma "starą" wartość `age`.

Jeśli jednak wykonujesz kilka aktualizacji stanu przy okazji jednego zdarzenia, funkcje aktualizujące mogą okazać się pomocne. Pomagają one również w sytuacjach, kiedy dostęp do zmiennej stanu jest utrudniony (może się tak zdarzyć po wdrożeniu różnych strategii optymalizujących renderowanie).

Jeśli lubisz spójność w kodzie, możesz zawsze używać funkcji aktualizującej, kiedy nowy stan zależy od poprzedniego. Jeśli jednak nowy stan zależy od poprzedniej wartości *innej* zmiennej stanu, warto zastanowić się nad połączeniem ich w jeden obiekt i [użyciem reduktora (ang. *reducer*)](/learn/extracting-state-logic-into-a-reducer).

</DeepDive>

<Recipes titleText="Różnica między użyciem funkcji aktualizującej a przekazaniem nowego stanu bezpośrednio" titleId="examples-updater">

#### Przekazywanie funkcji aktualizującej {/*passing-the-updater-function*/}

W tym przykładzie przekazujemy funkcję aktualizującą, więc przycisk "+3" zadziała.

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [age, setAge] = useState(42);

  function increment() {
    setAge(a => a + 1);
  }

  return (
    <>
      <h1>Twój wiek: {age}</h1>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <button onClick={() => {
        increment();
      }}>+1</button>
    </>
  );
}
```

```css
button { display: block; margin: 10px; font-size: 20px; }
h1 { display: block; margin: 10px; }
```

</Sandpack>

<Solution />

#### Przekazywanie nowego stanu bezpośrednio {/*passing-the-next-state-directly*/}

W tym przykładzie **nie przekazujemy** funkcji aktualizującej, przez co przycisk "+3" **nie działa jak powinien**.

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [age, setAge] = useState(42);

  function increment() {
    setAge(age + 1);
  }

  return (
    <>
      <h1>Twój wiek: {age}</h1>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <button onClick={() => {
        increment();
      }}>+1</button>
    </>
  );
}
```

```css
button { display: block; margin: 10px; font-size: 20px; }
h1 { display: block; margin: 10px; }
```

</Sandpack>

<Solution />

</Recipes>

---

### Aktualizowanie obiektów i tablic przechowywanych w stanie {/*updating-objects-and-arrays-in-state*/}

W zmiennej stanu możesz przechowywać obiekty i tablice. W Reakcie stan jest "tylko do odczytu", więc podczas aktualizacji takich zmiennych **musisz je *zastąpić* zamiast *modyfikować* (*mutować*)**. Dla przykładu, jeśli w stanie trzymasz obiekt `form`, nie aktualizuj go w ten sposób:

```js
// 🚩 Nie modyfikuj obiektu przechowywanego w stanie:
form.firstName = 'Taylor';
```

Zamiast tego zastąp cały obiekt poprzez stworzenie całkiem nowego:

```js
// ✅ Zastąp stan nowym obiektem
setForm({
  ...form,
  firstName: 'Taylor'
});
```

Aby dowiedzieć się więcej na ten temat, przeczytaj rozdziały pt. [Aktualizowanie obiektów w stanie](/learn/updating-objects-in-state) i [Aktualizowanie tablic w stanie](/learn/updating-arrays-in-state).

<Recipes titleText="Przykłady obiektów i tablic przechowywanych w stanie" titleId="examples-objects">

#### Formularz (obiekt) {/*form-object*/}

W tym przykładzie zmienna stanu `form` przechowuje obiekt. Każda kontrolka formularza ma przypisaną procedurę obsługi zmiany wartości, która wywołuje `setForm` z nowym stanem całego formularza. Składnia `{ ...form }` daje nam pewność, że obiekt w stanie zostanie zastąpiony, a nie tylko zmodyfikowany.

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [form, setForm] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com',
  });

  return (
    <>
      <label>
        Imię:
        <input
          value={form.firstName}
          onChange={e => {
            setForm({
              ...form,
              firstName: e.target.value
            });
          }}
        />
      </label>
      <label>
        Nazwisko:
        <input
          value={form.lastName}
          onChange={e => {
            setForm({
              ...form,
              lastName: e.target.value
            });
          }}
        />
      </label>
      <label>
        E-mail:
        <input
          value={form.email}
          onChange={e => {
            setForm({
              ...form,
              email: e.target.value
            });
          }}
        />
      </label>
      <p>
        {form.firstName}{' '}
        {form.lastName}{' '}
        ({form.email})
      </p>
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; }
```

</Sandpack>

<Solution />

#### Formularz (zagnieżdżony obiekt) {/*form-nested-object*/}

W tym przykładzie stan jest nieco bardziej zagnieżdżony. Kiedy aktualizujesz zagnieżdżony stan, musisz stworzyć kopię tego obiektu, jak również wszystkich obiektów wyżej, które go "zawierają". Przeczytaj rozdział pt. [Aktualizowanie zagnieżdżonych obiektów](/learn/updating-objects-in-state#updating-a-nested-object), aby dowiedzieć się więcej.

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

  return (
    <>
      <label>
        Imię i nazwisko:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Tytuł:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        Miasto:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Zdjęcie:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' autorstwa '}
        {person.name}
        <br />
        (mieszka w {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
img { width: 200px; height: 200px; }
```

</Sandpack>

<Solution />

#### Lista (tablica) {/*list-array*/}

W tym przykładzie zmienna stanu `todos` przechowuje tablicę. Każda procedura obsługi kliknięcia na przyciskach wywołuje `setTodos` z następną wersją tej tablicy. Składnia `[...todos]`, `todos.map()` oraz `todos.filter()` daje nam pewność, że tablica w stanie zostanie zastąpiona, a nie tylko zmodyfikowana.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Kupić mleko', done: true },
  { id: 1, title: 'Zjeść bigos', done: false },
  { id: 2, title: 'Zaparzyć herbatę', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(initialTodos);

  function handleAddTodo(title) {
    setTodos([
      ...todos,
      {
        id: nextId++,
        title: title,
        done: false
      }
    ]);
  }

  function handleChangeTodo(nextTodo) {
    setTodos(todos.map(t => {
      if (t.id === nextTodo.id) {
        return nextTodo;
      } else {
        return t;
      }
    }));
  }

  function handleDeleteTodo(todoId) {
    setTodos(
      todos.filter(t => t.id !== todoId)
    );
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

```js src/AddTodo.js
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Dodaj zadanie"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>Dodaj</button>
    </>
  )
}
```

```js src/TaskList.js
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Zapisz
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          Edytuj
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        Usuń
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
```

</Sandpack>

<Solution />

#### Pisanie zwięzłej logiki aktualizującej za pomocą Immera {/*writing-concise-update-logic-with-immer*/}

Jeśli aktualizowanie tablic i obiektów bez modyfikacji wydaje ci się żmudne, możesz użyć biblioteki takiej jak [Immer](https://github.com/immerjs/use-immer) i zmniejszyć ilość powtarzalnego kodu. Immer umożliwia pisanie zwięzłego kodu, który wygląda jak modyfikacja obiektów, ale w rzeczywistości wykonuje on niemutujące aktualizacje:

<Sandpack>

```js
import { useState } from 'react';
import { useImmer } from 'use-immer';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Wielkie brzuchy', seen: false },
  { id: 1, title: 'Krajobraz powierzchni księżyca', seen: false },
  { id: 2, title: 'Terakotowa armia', seen: true },
];

export default function BucketList() {
  const [list, updateList] = useImmer(initialList);

  function handleToggle(artworkId, nextSeen) {
    updateList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  return (
    <>
      <h1>Obowiązkowa sztuka</h1>
      <h2>Lista obrazów, które muszę zobaczyć:</h2>
      <ItemList
        artworks={list}
        onToggle={handleToggle} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

```json package.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

</Sandpack>

<Solution />

</Recipes>

---

### Unikanie ponownego tworzenia stanu początkowego {/*avoiding-recreating-the-initial-state*/}

React zapisuje stan początkowy tylko jeden raz, a przy kolejnych renderowaniach zwyczajnie go ignoruje.

```js
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos());
  // ...
```

Mimo że wynik funkcji `createInitialTodos()` jest używany tylko podczas pierwszego renderowania, i tak jest ona wywoływana przy każdym kolejnym renderowaniu. Czasami może być to problem, jeśli podczas działania tworzy ona dużą tablicę lub wykonuje kosztowne obliczenia.

Można sobie z tym poradzić **przekazując do `useState` funkcję _inicjalizującą_**:

```js
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  // ...
```

Zwróć uwagę, że przekazaliśmy tutaj `createInitialTodos`, która *jest funkcją*, a nie `createInitialTodos()`, które jest wynikiem jej wywołania. Jeśli do `useState` przekażesz jakąś funkcję, React wywoła ją tylko podczas inicjalizacji.

React może [wywołać twoją funkcję inicjalizującą dwukrotnie](#my-initializer-or-updater-function-runs-twice) w środowisku deweloperskim, aby sprawdzić, czy jest ona ["czysta"](/learn/keeping-components-pure).

<Recipes titleText="Różnica między przekazaniem funkcji inicjalizującej a przekazaniem stanu początkowego bezpośrednio" titleId="examples-initializer">

#### Przekazywanie funkcji inicjalizującej {/*passing-the-initializer-function*/}

W tym przykładzie przekazujemy funkcję inicjalizującą, więc `createInitialTodos` jest wywoływana tylko podczas inicjalizacji. Nie wywołuje się podczas kolejnych renderowań, np. po wpisaniu tekstu do pola formularza.

<Sandpack>

```js
import { useState } from 'react';

function createInitialTodos() {
  const initialTodos = [];
  for (let i = 0; i < 50; i++) {
    initialTodos.push({
      id: i,
      text: 'Item ' + (i + 1)
    });
  }
  return initialTodos;
}

export default function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  const [text, setText] = useState('');

  return (
    <>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        setTodos([{
          id: todos.length,
          text: text
        }, ...todos]);
      }}>Dodaj</button>
      <ul>
        {todos.map(item => (
          <li key={item.id}>
            {item.text}
          </li>
        ))}
      </ul>
    </>
  );
}
```

</Sandpack>

<Solution />

#### Przekazywanie wartości początkowej bezpośrednio {/*passing-the-initial-state-directly*/}

W tym przykładzie **nie przekazujemy** funkcji inicjalizującej, więc funkcja `createInitialTodos` jest wywoływana przy każdym renderowaniu, np. kiedy wpiszemy coś w pole formularza. Nie robi to żadnej różnicy w tym, co zostanie wyświetlone na ekranie, jednak taki kod jest mnie efektywny.

<Sandpack>

```js
import { useState } from 'react';

function createInitialTodos() {
  const initialTodos = [];
  for (let i = 0; i < 50; i++) {
    initialTodos.push({
      id: i,
      text: 'Zadanie ' + (i + 1)
    });
  }
  return initialTodos;
}

export default function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos());
  const [text, setText] = useState('');

  return (
    <>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        setTodos([{
          id: todos.length,
          text: text
        }, ...todos]);
      }}>Dodaj</button>
      <ul>
        {todos.map(item => (
          <li key={item.id}>
            {item.text}
          </li>
        ))}
      </ul>
    </>
  );
}
```

</Sandpack>

<Solution />

</Recipes>

---

### Resetowanie stanu za pomocą właściwości `key` {/*resetting-state-with-a-key*/}

W większości przypadków z właściwością `key` spotkasz się tylko przy okazji [renderowania list](/learn/rendering-lists). Czasami jednak służy ona do czegoś innego.

**Przekazując inną wartość `key` do komponentu możesz zresetować jego stan.** W poniższym przykładzie przycisk resetujący ustawia zmienną stanu `version`, którą możemy przekazać jako właściwość `key` do `Form`. Kiedy zmieni się `key`, React stworzy komponent `Form` od nowa (razem ze wszystkimi potomkami), dzięki czemu ich stan zostanie zresetowany.

Aby dowiedzieć się więcej, przeczytaj rozdział pt. [Zachowywanie i resetowanie stanu](/learn/preserving-and-resetting-state).

<Sandpack>

```js src/App.js
import { useState } from 'react';

export default function App() {
  const [version, setVersion] = useState(0);

  function handleReset() {
    setVersion(version + 1);
  }

  return (
    <>
      <button onClick={handleReset}>Resetuj</button>
      <Form key={version} />
    </>
  );
}

function Form() {
  const [name, setName] = useState('Taylor');

  return (
    <>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <p>Cześć, {name}.</p>
    </>
  );
}
```

```css
button { display: block; margin-bottom: 20px; }
```

</Sandpack>

---

### Przechowywanie informacji z poprzednich renderowań {/*storing-information-from-previous-renders*/}

Stan zazwyczaj aktualizujemy w procedurach obsługi zdarzeń (ang. *event handlers*). W rzadkich przypadkach możemy chcieć zmienić stan w odpowiedzi na renderowanie - na przykład, żeby zmienić stan przy zmianie właściwości.

Zwykle jednak nie ma potrzeby tak robić:

* **Jeśli wartość może zostać obliczona w całości na podstawie aktualnych właściwości i innej zmiennej stanu, [należy całkowicie pozbyć się tego nadmiarowego stanu](/learn/choosing-the-state-structure#avoid-redundant-state).** Jeśli martwisz się o zbyt częste przeliczanie wartości, skorzystaj z [hooka `useMemo`](/reference/react/useMemo).
* Jeśli chcesz zresetować stan całego poddrzewa komponentu, [przekaż mu inną wartość `key`.](#resetting-state-with-a-key)
* Jeśli tylko możesz, aktualizuj stan w procedurach obsługi zdarzeń.

Są jednak sytuację, w których żadna z powyższych reguł nie ma zastosowania. Można wtedy aktualizować stan na podstawie wartości, które już zostały wyrenderowane, wywołując funkcję `set` w trakcie renderowania komponentu.

Oto przykład. Komponent `CountLabel` wyświetla wartość przekazanej do niego właściwości `count`:

```js src/CountLabel.js
export default function CountLabel({ count }) {
  return <h1>{count}</h1>
}
```

Załóżmy, że chcesz wyświetlić informację, czy licznik został *zwiększony, czy zmniejszony* od ostatniej zmiany. Właściwość `count` nie mówi ci tego w żaden sposób - musisz zatem jakoś śledzić jej poprzednią wartość. W takiej sytuacji należy dodać kolejne zmienne stanu: jedną `prevCount` do śledzenia wartości oraz drugą `trend` do przechowywania informacji o kierunku tej zmiany. Teraz wystarczy porównać `prevCount` z `count` i jeśli nie są równe, zaktualizować zarówno `prevCount`, jak i `trend`. Dzięki temu możliwe będzie wyświetlenie obydwu wartości oraz określenie, *jak zmieniły się one od ostatniego renderowania*.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import CountLabel from './CountLabel.js';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Zwiększ
      </button>
      <button onClick={() => setCount(count - 1)}>
        Zmniejsz
      </button>
      <CountLabel count={count} />
    </>
  );
}
```

```js src/CountLabel.js active
import { useState } from 'react';

export default function CountLabel({ count }) {
  const [prevCount, setPrevCount] = useState(count);
  const [trend, setTrend] = useState(null);
  if (prevCount !== count) {
    setPrevCount(count);
    setTrend(count > prevCount ? 'zwiększa się' : 'zmniejsza się');
  }
  return (
    <>
      <h1>{count}</h1>
      {trend && <p>Licznik {trend}</p>}
    </>
  );
}
```

```css
button { margin-bottom: 10px; }
```

</Sandpack>

Zwróć uwagę, że jeśli wywołujesz funkcję `set` podczas renderowania, musi się to odbywać w warunku `prevCount !== count`, w którym to również wywołujesz `setPrevCount(count)`. W przeciwnym wypadku komponent renderowałby się ponownie w nieskończoność, co doprowadziłoby do zawieszenia aplikacji. Pamiętaj, że możesz w ten sposób aktualizować stan tylko *aktualnie renderowanego* komponentu. Wywoływanie funkcji `set` pochodzącej z *innego* komponentu podczas renderowania byłoby błędem. I wreszcie, pamiętaj, że wywołanie funkcji `set` powinno [aktualizować stan bez jego mutowania](#updating-objects-and-arrays-in-state) -- to, że obsługujemy tu przypadek specjalny, nie oznacza, że możemy łamać inne zasady [czystych funkcji](/learn/keeping-components-pure).

Powyższy schemat działania może wydawać się trudny do zrozumienia i generalnie lepiej go unikać. Mimo wszystko jest on lepszy niż aktualizowanie stanu w efekcie. Kiedy wywołujesz funkcję `set` podczas renderowania, React wyrenderuje go ponownie tuż po tym, jak zwróci on coś za pomocą instrukcji `return`, ale jeszcze przed wyrenderowaniem potomków. Dzięki temu komponenty potomne nie będą renderowały się dwa razy. Pozostała część funkcji komponentu nadal będzie wywołana (a wynik zostanie "wyrzucony do kosza"), dlatego jeśli taki warunek znajduje się pod wywołaniami hooków, możesz dopisać do niego `return;`, aby zakończyć renderowanie wcześniej.

---

## Znane problemy {/*troubleshooting*/}

### Aktualizuję wartość stanu, ale w konsoli wyświetla mi się stan poprzedni {/*ive-updated-the-state-but-logging-gives-me-the-old-value*/}

Wywołanie funkcji `set` **nie powoduje zmiany stanu w trakcie wykonywania kodu**:

```js {4,5,8}
function handleClick() {
  console.log(count);  // 0

  setCount(count + 1); // Zażądaj przerenderowania z wartością 1
  console.log(count);  // Nadal 0!

  setTimeout(() => {
    console.log(count); // Również 0!
  }, 5000);
}
```

Dzieje się tak dlatego, że [stan zachowuje się jak migawka aparatu (ang. *snapshot*)](/learn/state-as-a-snapshot). Aktualizacja stanu wysyła żądanie przerenderowania komponentu z nową wartością, lecz nie wpływa na zmienną javascriptową `count` w aktualnie wykoływanym fragmencie kodu.

Jeśli potrzebujesz od razu skorzystać z nowej wartości stanu, przed przekazaniem jej do funkcji `set` zapisz ją do zmiennej lokalnej:

```js
const nextCount = count + 1;
setCount(nextCount);

console.log(count);     // 0
console.log(nextCount); // 1
```

---

### Aktualizuję wartość stanu, ale ekran się nie odświeża {/*ive-updated-the-state-but-the-screen-doesnt-update*/}

React **zignoruje aktualizację stanu, jeśli nowa wartość jest identyczna z poprzednim stanem** (na podstawie porównania [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)). Zwykle przyczyną jest bezpośrednia mutacja obiektu lub tablicy przechowywanych w stanie:

```js
obj.x = 10;  // 🚩 Źle: mutacja istniejącego obiektu
setObj(obj); // 🚩 Nic się nie dzieje
```

Zmutowaliśmy istniejący obiekt `obj`, a następnie przekazaliśmy go do `setObj`, dlatego React zignorował tę aktualizację. Aby naprawić ten błąd, należy zawsze [_zastępować_ obiekty i tablice przechowywane w stanie, zamiast je _mutować_](#updating-objects-and-arrays-in-state):

```js
// ✅ Dobrze: tworzymy nowy obiekt
setObj({
  ...obj,
  x: 10
});
```

---

### Dostaję błąd: "Too many re-renders" {/*im-getting-an-error-too-many-re-renders*/}

Możesz natknąć się na błąd o treści: `Too many re-renders. React limits the number of renders to prevent an infinite loop.` (pol. *Zbyt wiele ponownych renderowań. React ogranicza liczbę renderowań, aby zapobiec nieskończonej pętli.*). Zwykle oznacza to, że aktualizujemy stan bezwarunkowo *podczas renderowania*, więc komponent wchodzi w pętlę: renderuje, ustawia stan (co wymusza ponowne wyrenderowanie), renderuje, ustawia stan (co wymusza ponowne wyrenderowanie) itd. Bardzo często przyczyną jest błąd w definicji procedury obsługi zdarzenia:

```js {1-2}
// 🚩 Źle: wywołuje procedurę obsługi zdarzenia podczas renderowania
return <button onClick={handleClick()}>Kliknij mnie</button>

// ✅ Dobrze: przekazuje procedurę obsługi zdarzenia
return <button onClick={handleClick}>Kliknij mnie</button>

// ✅ Dobrze: przekazuje funkcję "inline"
return <button onClick={(e) => handleClick(e)}>Kliknij mnie</button>
```

Jeśli nie możesz namierzyć przyczyny tego błędu, kliknij na strzałkę obok treści błędu i przejrzyj stos JavaScriptu w celu znalezienia trefnego wywołania funkcji `set`.

---

### Moja funkcja inicjalizująca lub aktualizująca jest uruchamiana dwa razy {/*my-initializer-or-updater-function-runs-twice*/}

W [Trybie Restrykcyjnym (ang. *Strict Mode*)](/reference/react/StrictMode) React wywołuje niektóre funkcje dwukrotnie:

```js {2,5-6,11-12}
function TodoList() {
  // Ta funkcja komponentu będzie wywoływana dwukrotnie przy każdym renderowaniu.

  const [todos, setTodos] = useState(() => {
    // Ta funkcja inicjalizująca zostanie wywołana dwukrotnie podczas tworzenia komponentu.
    return createTodos();
  });

  function handleClick() {
    setTodos(prevTodos => {
      // Ta funkcja aktualizująca zostanie wywołana dwukrotnie przy każdym kliknięciu.
      return [...prevTodos, createTodo()];
    });
  }
  // ...
```

To zachowanie jest celowe i nie powinno popsuć działania aplikacji.

Takie zachowanie, wystepujące **tylko w środowisku deweloperskim**, pozwala na [sprawdzenie "czystości" komponentów](/learn/keeping-components-pure). React wykorzysta wynik z jednego z wywołań tych funkcji, a zignoruje drugi. Dopóki twój komponent oraz funkcje inicjalizujące i aktualizujące są czyste, nic nie powinno się popsuć. Jeśli jednak któraś z nich nie jest czysta, taki mechanizm pomoże ci ją znaleźć i naprawić.

Dla przykładu, poniższa nieczysta funkcja aktualizująca mutuje tablicę przechowywaną w stanie:

```js {2,3}
setTodos(prevTodos => {
  // 🚩 Błąd: mutacja stanu
  prevTodos.push(createTodo());
});
```

Z racji tego, że React wywołuje funkcje aktualizujące dwukrotnie, zauważysz, że zadanie zostanie dodane do listy TODO dwa razy, co będzie wskazywało na błąd. W tym przykładzie możemy to naprawić [zastępując tablicę zamiast ją mutować](#updating-objects-and-arrays-in-state):

```js {2,3}
setTodos(prevTodos => {
  // ✅ Dobrze: zastępujemy nowym stanem
  return [...prevTodos, createTodo()];
});
```

Teraz, kiedy nasza funkcja aktualizująca jest czysta, wywołanie jej dwukrotnie nie spowoduje żadnych różnic w działaniu komponentu. To w taki sposób React pomaga ci znajdować błędy. **Tylko komponent oraz funkcje initializujące i aktualizujące muszą być czyste.** Procedury obsługi zdarzeń nie muszą być czyste, a React nigdy nie wywoła ich dwukrotnie.

Aby dowiedzieć się więcej, przeczytaj rozdział pt. [Czyste komponenty](/learn/keeping-components-pure).

---

### Próbuję zapisać w stanie funkcję, ale zamiast tego moja funkcja jest wywoływana {/*im-trying-to-set-state-to-a-function-but-it-gets-called-instead*/}

Nie możesz przypisać funkcji do stanu w taki sposób:

```js
const [fn, setFn] = useState(someFunction);

function handleClick() {
  setFn(someOtherFunction);
}
```

Ponieważ przekazujesz funkcję, React zakłada, że `someFunction` jest [funkcją inicjalizującą](#avoiding-recreating-the-initial-state) i że `someOtherFunction` jest [funkcją aktualizującą](#updating-state-based-on-the-previous-state), więc próbuje je wywołać i zapisać wynik ich działania. Aby faktycznie *zapisać* funkcję, w obydwóch przypadkach musisz poprzedzić je `() =>`. Tylko wtedy React zapisze przekazywane przez ciebie funkcje.

```js {1,4}
const [fn, setFn] = useState(() => someFunction);

function handleClick() {
  setFn(() => someOtherFunction);
}
```
