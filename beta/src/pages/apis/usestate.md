---
title: useState
---

<Intro>

`useState` jest hookiem reactowym, który pozwala na dodanie do komponentu [zmiennej stanu](/learn/state-a-components-memory).

```js
const [state, setState] = useState(initialState)
```

</Intro>

- [Sposób użycia](#usage)
  - [Dodawanie stanu do komponentu](#adding-state-to-a-component)
  - [Aktualizowanie stanu w oparciu o poprzedni stan](#updating-state-based-on-the-previous-state)
  - [Aktualizowanie obiektów i tablic przechowywanych w stanie](#updating-objects-and-arrays-in-state)
  - [Unikanie ponownego tworzenia stanu początkowego](#avoiding-recreating-the-initial-state)
  - [Resetowanie stanu za pomocą właściwości `key`](#resetting-state-with-a-key)
  - [Przechowywanie informacji z poprzednich renderowań](#storing-information-from-previous-renders)
- [Dokumentacja](#reference)
  - [`useState(initialState)`](#usestate)
  - [Funkcje `set`, np. `setSomething(nextState)`](#setstate)
- [Znane problemy](#troubleshooting)
  - [Aktualizuję wartość stanu, ale wyświetla mi w konsoli stan poprzedni](#ive-updated-the-state-but-logging-gives-me-the-old-value)
  - [Aktualizuję wartość stanu, ale ekran się nie odświeża](#ive-updated-the-state-but-the-screen-doesnt-update)
  - [Dostaję błąd: "Too many re-renders"](#im-getting-an-error-too-many-re-renders)
  - [Moja funkcja inicjalizująca lub aktualizująca jest uruchamiana dwa razy](#my-initializer-or-updater-function-runs-twice)
  - [Próbuję przypisać funkcję do stanu, ale zamiast tego moja funkcja jest wywoływana](#im-trying-to-set-state-to-a-function-but-it-gets-called-instead)

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

Przyjęło się, że zmienne stanu nazywamy `[something, setSomething]`, korzystając przy tym z [destrukturyzacji tablicy](/learn/a-javascript-refresher#array-destructuring).

`useState` zwraca tablicę o dokładnie dwóch elementach:

1. <CodeStep step={1}>Aktualny stan</CodeStep> naszej zmiennej stanu, początkowo ustawiony na <CodeStep step={3}>stan początkowy</CodeStep> przekazany jako argument.
2. <CodeStep step={2}>Funkcja `set`</CodeStep>, która pozwala zmienić wartość stanu na dowolną inną w odpowiedzi na jakąś interakcję.

Aby zaktualizować to, co jest wyświetlane na ekranie, wywołaj funkcje `set`, przekazując nowy stan jako argument:

```js [[2, 2, "setName"]]
function handleClick() {
  setName('Robin');
}
```

React zapisze nowy stan, wyrenderuje ponownie twój komponent już z nową wartością, a na koniec zaktualizuje UI.

<Gotcha>

Wywołwanie funkcji `set` [**nie zmienia** stanu w trakcie działania kodu](#ive-updated-the-state-but-logging-gives-me-the-old-value):

```js {3}
function handleClick() {
  setName('Robin');
  console.log(name); // Nadal "Taylor"!
}
```

Wpływa to jedynie na to, co `useState` zwróci przy *następnym* renderowaniu.

</Gotcha>

<Recipes titleText="Podstawowe przykłady użycia useState" titleId="examples-basic">

### Licznik (liczba) {/*counter-number*/}

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

### Pole tekstowe (tekst) {/*text-field-string*/}

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

### Pole wyboru (wartość logiczna) {/*checkbox-boolean*/}

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
      <p>Ty {liked ? 'też to lubisz' : 'tego nie lubisz'}.</p>
    </>
  );
}
```

</Sandpack>

<Solution />

### Formularz (dwie zmienne) {/*form-two-variables*/}

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

Załóżmy, że wartość `age` jest obecnie równa `42`. Ta procedura obsługi zdarzenia wywołuje `setAge(age + 1)` trzykrotnie:

```js
function handleClick() {
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
}
```

Mimo to po jednym kliknięciu wartość `age` będzie równa `43`, a nie `45`! Dzieje się tak, dlatego że wywoływanie funkcji `set` [nie aktualizuje](/learn/state-as-a-snapshot) zmiennej stanu `age` w trakcie wywoływania kodu. Tak więc każde `setAge(age + 1)` tak naprawdę jest tym samym, co `setAge(43)`.

Aby rozwiązać ten problem **możesz przekazać do `setAge` *funkcję aktualizującą** zamiast samej wartości:

```js [[1, 2, "a", 0], [2, 2, "a + 1"], [1, 3, "a", 0], [2, 3, "a + 1"], [1, 4, "a", 0], [2, 4, "a + 1"]]
function handleClick() {
  setAge(a => a + 1); // setAge(42 => 43)
  setAge(a => a + 1); // setAge(43 => 44)
  setAge(a => a + 1); // setAge(44 => 45)
}
```

W tym przykładzie `a => a + 1` jest twoją funkcją aktualizującą. Otrzymuje ona <CodeStep step={1}>aktualny stan</CodeStep> i oblicza na jego podstawie <CodeStep step={2}>następny stan</CodeStep>.

React umieszcza funkcje aktualizujące w [kolejce](/learn/queueing-a-series-of-state-updates). Nastepnie, podczas kolejnego renderowania, wywołuje je w takiej samej kolejności:

1. `a => a + 1` otrzyma aktualny stan równy `42` i zwróci następny stan jako `43`.
1. `a => a + 1` otrzyma aktualny stan równy `43` i zwróci następny stan jako `44`.
1. `a => a + 1` otrzyma aktualny stan równy `44` i zwróci następny stan jako `45`.

W tym przypadku nie mamy więcej zakolejkowanych zmian, więc React na koniec zapisze wartość `45` jako aktualny stan.

Przyjęło się, żeby nazywać argument odpowiadający za poprzedni stan używając pierwszej litery nazwy zmiennej stanu, na przykład `a` dla `age`. Możesz jednak nazwać go dowolnie, np. `prevAge`.

React może [wywołać twoje funkcje aktualizujące dwukrotnie](#my-initializer-or-updater-function-runs-twice) w środowisku deweloperskim, aby upewnić się, że są one ["czyste"](/learn/keeping-components-pure).

<DeepDive title="Czy zawsze powinno się używać funkcji aktualizującej?">

W internecie można się natknąć na zalecenia, które mówią, żeby zawsze pisać `setAge(a => a + 1)`, jeśli następna wartość stanu zależy od poprzedniej. Nie ma w tym nic złego, ale też nie jest to wymagane.

W większości przypadków nie ma różnicy między tymi dwoma podejściami. React zawsze upewnia się, że przy wszelkich intencjonalnych akcjach użytkownika, np. kliknięciach, zmienna stanu `age` zostanie zaktualizowana jeszcze przed kolejnym kliknięciem. Oznacza to, że nie ma ryzyka, iż procedura obsługi kliknięcia otrzyma "starą" wartość `age`.

Jeśli jednak wykonujesz kilka aktualizacji stanu przy okazji jednego zdarzenia, funkcje aktualizujące mogą okazać się pomocne. Pomagają one również w sytuacjach, kiedy dostęp do zmiennej stanu jest utrudniony (może się tak zdarzyć przy okazji optymalizacji renderowania).

Jeśli lubisz spójność w kodzie, możesz zawsze używać funkcji aktualizującej, kiedy nowy stan zależy od poprzedniego. Jeśli jednak nowy stan zależy od poprzedniej wartości *innej* zmiennej stanu, warto zastanowić się nad połączeniem ich w jeden obiekt i [użyciem reduktora (ang. *reducer*)](/learn/extracting-state-logic-into-a-reducer).

</DeepDive>

<Recipes titleText="Różnica między użyciem funkcji aktualizującej a przekazaniem nowego stanu bezpośrednio" titleId="examples-updater">

### Przekazywanie funkcji aktualizującej {/*passing-the-updater-function*/}

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

### Przekazywanie nowego stanu bezpośrednio {/*passing-the-next-state-directly*/}

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

W zmiennej stanu możesz przechowywać obiekty i tablice. W Reakcie stan jest "tylko do odczytu", więc podczas aktualizacji takich zmiennych **musisz je *zastąpić* zamiast *modyfikować***. Dla przykładu, jeśli w stanie trzymasz obiekt `form`, nie aktualizuj go w ten sposób:

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

### Formularz (obiekt) {/*form-object*/}

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

### Formularz (zagnieżdżony obiekt) {/*form-nested-object*/}

W tym przykładzie stan jest nieco bardziej zagnieżdżony. Kiedy aktualizujesz zagnieżdżony stan, musisz stworzyć kopię tego obiektu, jak również wszystkich obiektów wyżej "zawierających" go. Przeczytaj rozdział pt. [Aktualizowanie zagnieżdżonych obiektów](/learn/updating-objects-in-state#updating-a-nested-object), aby dowiedzieć się więcej.

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

### Lista (tablica) {/*list-array*/}

W tym przykładzie zmienna stanu `todos` przechowuje tablicę. Każda procedura obsługi kliknięcia na przyciskach wywołuje `setTodos` z następną wersją tej tablicy. Składnia `[...todos]`, `todos.map()` oraz `todos.filter()` dają nam pewność, że tablica w stanie zostanie zastąpiona, a nie tylko zmodyfikowana.

<Sandpack>

```js App.js
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

```js AddTodo.js
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

```js TaskList.js
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

### Pisanie zwięzłej logiki aktualizującej za pomocą Immera {/*writing-concise-update-logic-with-immer*/}

Jeśli aktualizowanie tablic i obiektów bez modyfikacji wydaje ci się żmudne, możesz użyć biblioteki takiej jak [Immer](https://github.com/immerjs/use-immer), aby zmniejszyć ilość powtarzalnego kodu. Immer umożliwia pisanie zwięzłego kodu, który wygląda jak modyfikacja obiektów, ale w rzeczywistości wykonuje on niemutowalne aktualizacje:

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

React zapisuje stan początkowy tylko jeden raz, a przy kolejnych renderowania go zwyczajnie ignoruje.

```js
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos());
  // ...
```

Mimo że wynik funkcji `createInitialTodos()` jest używany tylko podczas pierwszego renderowania, i tak jest ona wywoływana przy każdym kolejnym renderowaniu. Czasami może być to problem, jeśli tworzy ona dużą tablicę lub wykonuje kosztowne obliczenia.

Można sobie z tym poradzić **przekazując do `useState` funkcję _inicjalizującą_**:

```js
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  // ...
```

Zwróć uwagę, że przekazaliśmy tutaj `createInitialTodos`, która *jest funkcją*, a nie `createInitialTodos()`, która jest wynikiem jej wywołania. Jeśli do `useState` przekażesz jakąś funkcję, React wywoła ją tylko podczas inicjalizacji.

React może [wywołać twoją funkcję inicjalizującą dwukrotnie](#my-initializer-or-updater-function-runs-twice) w środowisku deweloperskim, aby sprawdzić, czy jest ona ["czysta"](/learn/keeping-components-pure).

<Recipes titleText="Różnica między przekazaniem funkcji inicjalizującej a przekazaniem stanu początkowego bezpośrednio" titleId="examples-initializer">

### Przekazywanie funkcji inicjalizującej {/*passing-the-initializer-function*/}

W tym przykładzie przekazujemy funkcję inicjalizującą, więc `createInitialTodos` jest wywoływana tylko podczas inicjalizacji. Nie wywołuje się podczas kolejnych renderować, np. po wpisaniu tekstu do pola formularza.

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

### Przekazywanie wartości początkowej bezpośrednio {/*passing-the-initial-state-directly*/}

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

Aby dowiedzieć się więcej, przeczytaj rozdział pt. [Utrzymywanie i resetowanie stanu](/learn/preserving-and-resetting-state).

<Sandpack>

```js App.js
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

Usually, you will update state in event handlers. However, in rare cases you might want to adjust state in response to rendering -- for example, you might want to change a state variable when a prop changes.

In most cases, you don't need this:

* **If the value you need can be computed entirely from the current props or other state, [remove that redundant state altogether](/learn/choosing-the-state-structure#avoid-redundant-state).** If you're worried about recomputing too often, the [`useMemo` Hook](/apis/usememo) can help.
* If you want to reset the entire component tree's state, [pass a different `key` to your component.](#resetting-state-with-a-key)
* If you can, update all the relevant state in the event handlers.

In the rare case that none of these apply, there is a pattern you can use to update state based on the values that have been rendered so far, by calling a `set` function while your component is rendering.

Here's an example. This `CountLabel` component displays the `count` prop passed to it:

```js CountLabel.js
export default function CountLabel({ count }) {
  return <h1>{count}</h1>
}
```

Say you want to show whether the counter has *increased or decreased* since the last change. The `count` prop doesn't tell you this -- you need to keep track of its previous value. Add the `prevCount` state variable to track it. Add another state variable called `trend` to hold whether the count has increased or decreased. Compare `prevCount` with `count`, and if they're not equal, update both `prevCount` and `trend`. Now you can show both the current count prop and *how it has changed since the last render*.

<Sandpack>

```js App.js
import { useState } from 'react';
import CountLabel from './CountLabel.js';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <CountLabel count={count} />
    </>
  );
}
```

```js CountLabel.js active
import { useState } from 'react';

export default function CountLabel({ count }) {
  const [prevCount, setPrevCount] = useState(count);
  const [trend, setTrend] = useState(null);
  if (prevCount !== count) {
    setPrevCount(count);
    setTrend(count > prevCount ? 'increasing' : 'decreasing');
  }
  return (
    <>
      <h1>{count}</h1>
      {trend && <p>The count is {trend}</p>}
    </>
  );
}
```

```css
button { margin-bottom: 10px; }
```

</Sandpack>

Note that if you call a `set` function while rendering, it must be inside a condition like `prevCount !== count`, and there must be a call like `setPrevCount(count)` inside of the condition. Otherwise, your component would re-render in a loop until it crashes. Also, you can only update the state of the *currently rendering* component like this. Calling the `set` function of *another* component during rendering is an error. Finally, your `set` call should still [update state without mutation](#updating-objects-and-arrays-in-state) -- this special case doesn't mean you can break other rules of [pure functions](/learn/keeping-components-pure).

This pattern can be hard to understand and is usually best avoided. However, it's better than updating state in an effect. When you call the `set` function during render, React will re-render that component immediately after your component exits with a `return` statement, and before rendering the children. This way, children don't need to render twice. The rest of your component function will still execute (and the result will be thrown away), but if your condition is below all the calls to Hooks, you may add `return null` inside it to restart rendering earlier.

---

## Dokumentacja {/*reference*/}

### `useState(initialState)` {/*usestate*/}

Call `useState` at the top level of your component to declare a [state variable](/learn/state-a-components-memory).

```js
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(28);
  const [name, setName] = useState('Taylor');
  const [todos, setTodos] = useState(() => createTodos());
  // ...
```

The convention is to name state variables like `[something, setSomething]` using [array destructuring](/learn/a-javascript-refresher#array-destructuring).

[See more examples above.](#examples-basic)

#### Parameters {/*parameters*/}

* `initialState`: The value you want the state to be initially. It can be a value of any type, but there is a special behavior for functions. This argument is ignored after the initial render.
  * If you pass a function as `initialState`, it will be treated as an _initializer function_. It should be pure, should take no arguments, and should return a value of any type. React will call your initializer function when initializing the component, and store its return value as the initial state. [See an example above.](#avoiding-recreating-the-initial-state)

#### Returns {/*returns*/}

`useState` returns an array with exactly two values:

1. The current state. During the first render, it will match the `initialState` you have passed.
2. The [`set` function](#setstate) that lets you update the state to a different value and trigger a re-render.

#### Caveats {/*caveats*/}

* `useState` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can't call it inside loops or conditions. If you need that, extract a new component and move the state into it.
* In Strict Mode, React will **call your initializer function twice** in order to [help you find accidental impurities](#my-initializer-or-updater-function-runs-twice). This is development-only behavior and does not affect production. If your initializer function is pure (as it should be), this should not affect the logic of your component. The result from one of the calls will be ignored.

---

### Funkcje `set`, np. `setSomething(nextState)` {/*setstate*/}

The `set` function returned by `useState` lets you update the state to a different value and trigger a re-render. You can pass the next state directly, or a function that calculates it from the previous state:

```js
const [name, setName] = useState('Edward');

function handleClick() {
  setName('Taylor');
  setAge(a => a + 1);
  // ...
```

#### Parameters {/*setstate-parameters*/}

* `nextState`: The value that you want the state to be. It can be a value of any type, but there is a special behavior for functions.
  * If you pass a function as `nextState`, it will be treated as an _updater function_. It must be pure, should take the pending state as its only argument, and should return the next state. React will put your updater function in a queue and re-render your component. During the next render, React will calculate the next state by applying all of the queued updaters to the previous state. [See an example above.](#updating-state-based-on-the-previous-state)

#### Returns {/*setstate-returns*/}

`set` functions do not have a return value.

#### Caveats {/*setstate-caveats*/}

* The `set` function **only updates the state variable for the *next* render**. If you read the state variable after calling the `set` function, [you will still get the old value](#ive-updated-the-state-but-logging-gives-me-the-old-value) that was on the screen before your call.

* If the new value you provide is identical to the current `state`, as determined by an [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison, React will **skip re-rendering the component and its children.** This is an optimization. Although in some cases React may still need to call your component before skipping the children, it shouldn't affect your code.

* React [batches state updates](/learn/queueing-a-series-of-state-updates). It updates the screen **after all the event handlers have run** and have called their `set` functions. This prevents multiple re-renders during a single event. In the rare case that you need to force React to update the screen earlier, for example to access the DOM, you can use [`flushSync`](/apis/flushsync).

* Calling the `set` function *during rendering* is only allowed from within the currently rendering component. React will discard its output and immediately attempt to render it again with the new state. This pattern is rarely needed, but you can use it to **store information from the previous renders**. [See an example above.](#storing-information-from-previous-renders)

* In Strict Mode, React will **call your updater function twice** in order to [help you find accidental impurities](#my-initializer-or-updater-function-runs-twice). This is development-only behavior and does not affect production. If your updater function is pure (as it should be), this should not affect the logic of your component. The result from one of the calls will be ignored.

---

## Znane problemy {/*troubleshooting*/}

### Aktualizuję wartość stanu, ale wyświetla mi w konsoli stan poprzedni {/*ive-updated-the-state-but-logging-gives-me-the-old-value*/}

Calling the `set` function **does not change state in the running code**:

```js {4,5,8}
function handleClick() {
  console.log(count);  // 0

  setCount(count + 1); // Request a re-render with 1
  console.log(count);  // Still 0!

  setTimeout(() => {
    console.log(count); // Also 0!
  }, 5000);
}
```

This is because [states behaves like a snapshot](/learn/state-as-a-snapshot). Updating state requests another render with the new state value, but does not affect the `count` JavaScript variable in your already-running event handler.

If you need to use the next state, you can save it in a variable before passing it to the `set` function:

```js
const nextCount = count + 1;
setCount(nextCount);

console.log(count);     // 0
console.log(nextCount); // 1
```

---

### Aktualizuję wartość stanu, ale ekran się nie odświeża {/*ive-updated-the-state-but-the-screen-doesnt-update*/}

React will **ignore your update if the next state is equal to the previous state,** as determined by an [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. This usually happens when you change an object or an array in state directly:

```js
obj.x = 10;  // 🚩 Wrong: mutating existing object
setObj(obj); // 🚩 Doesn't do anything
```

You mutated an existing `obj` object and passed it back to `setObj`, so React ignored the update. To fix this, you need to ensure that you're always [_replacing_ objects and arrays in state instead of _mutating_ them](#updating-objects-and-arrays-in-state):

```js
// ✅ Correct: creating a new object
setObj({
  ...obj,
  x: 10
});
```

---

### Dostaję błąd: "Too many re-renders" {/*im-getting-an-error-too-many-re-renders*/}

You might get an error that says: `Too many re-renders. React limits the number of renders to prevent an infinite loop.` Typically, this means that you're unconditionally setting state *during render*, so your component enters a loop: render, set state (which causes a render), render, set state (which causes a render), and so on. Very often, this is caused by a mistake in specifying an event handler:

```js {1-2}
// 🚩 Wrong: calls the handler during render
return <button onClick={handleClick()}>Click me</button>

// ✅ Correct: passes down the event handler
return <button onClick={handleClick}>Click me</button>

// ✅ Correct: passes down an inline function
return <button onClick={(e) => handleClick(e)}>Click me</button>
```

If you can't find the cause of this error, click on the arrow next to the error in the console and look through the JavaScript stack to find the specific `set` function call responsible for the error.

---

### Moja funkcja inicjalizująca lub aktualizująca jest uruchamiana dwa razy {/*my-initializer-or-updater-function-runs-twice*/}

In [Strict Mode](/apis/strictmode), React will call some of your functions twice instead of once:

```js {2,5-6,11-12}
function TodoList() {
  // This component function will run twice for every render.

  const [todos, setTodos] = useState(() => {
    // This initializer function will run twice during initialization.
    return createTodos();
  });

  function handleClick() {
    setTodos(prevTodos => {
      // This updater function will run twice for every click.
      return [...prevTodos, createTodo()];
    });
  }
  // ...
```

This is expected and shouldn't break your code.

This **development-only** behavior helps you [keep components pure](/learn/keeping-components-pure). React uses the result of one of the calls, and ignores the result of the other call. As long as your component, initializer, and updater functions are pure, this shouldn't affect your logic. However, if they are accidentally impure, this helps you notice the mistakes and fix it.

For example, this impure updater function mutates an array in state:

```js {2,3}
setTodos(prevTodos => {
  // 🚩 Mistake: mutating state
  prevTodos.push(createTodo());
});
```

Because React calls your updater function twice, you'll see the todo was added twice, so you'll know that there is a mistake. In this example, you can fix the mistake by [replacing the array instead of mutating it](#updating-objects-and-arrays-in-state):

```js {2,3}
setTodos(prevTodos => {
  // ✅ Correct: replacing with new state
  return [...prevTodos, createTodo()];
});
```

Now that this updater function is pure, calling it an extra time doesn't make a difference in behavior. This is why React calling it twice helps you find mistakes. **Only component, initializer, and updater functions need to be pure.** Event handlers don't need to be pure, so React will never call your event handlers twice.

Read [keeping components pure](/learn/keeping-components-pure) to learn more.

---

### Próbuję przypisać funkcję do stanu, ale zamiast tego moja funkcja jest wywoływana {/*im-trying-to-set-state-to-a-function-but-it-gets-called-instead*/}

You can't put a function into state like this:

```js
const [fn, setFn] = useState(someFunction);

function handleClick() {
  setFn(someOtherFunction);
}
```

Because you're passing a function, React assumes that `someFunction` is an [initializer function](#avoiding-recreating-the-initial-state), and that `someOtherFunction` is an [updater function](#updating-state-based-on-the-previous-state), so it tries to call them and store the result. To actually *store* a function, you have to put `() =>` before them in both cases. Then React will store the functions you pass.

```js {1,4}
const [fn, setFn] = useState(() => someFunction);

function handleClick() {
  setFn(() => someOtherFunction);
}
```