---
title: Zarządzanie stanem
---

<Intro>

W miarę rozwoju aplikacji często konieczne jest ponowne spojrzenie na strukturę stanu i na to, w jaki sposób dane przepływają pomiędzy komponentami. Zbędny lub zduplikowany stan jest najczęstszym źródłem problemów. W tym rozdziale nauczysz się, jak dobrze ustrukturyzować stan, jak utrzymać logikę zmiany stanu w ryzach i jak współdzielić stan pomiędzy odległymi od siebie komponentami.

</Intro>

<YouWillLearn isChapter={true}>

* [W jaki sposób myśleć o zmianach UI podczas aktualizowania stanu](/learn/reacting-to-input-with-state)
* [Jak dobrze ustrukturyzować stan](/learn/choosing-the-state-structure)
* [Jak "wynieść stan do góry", aby współdzielić go między komponentami](/learn/sharing-state-between-components)
* [Jak kontrolować zachowywanie lub resetowanie stanu](/learn/preserving-and-resetting-state)
* [Jak scalić skomplikowaną logikę stanu w jednej funkcji](/learn/extracting-state-logic-into-a-reducer)
* [Jak przekazać informacje bez "przenoszenia właściwości" (*ang.* prop drilling)](/learn/passing-data-deeply-with-context)
* [Jak skalować zarządzanie stanem wraz z rozrostem aplikacji](/learn/scaling-up-with-reducer-and-context)

</YouWillLearn>

## Reagowanie na dane wejściowe za pomocą stanu {/*reacting-to-input-with-state*/}

W Reakcie nie modyfikuje się UI bezpośrednio za pomocą kodu. Nie używa się komend z stylu "zablokuj przycisk", "odblokuj przycisk", "pokaż komunikat o sukcesie" itp. Zamiast tego opisujemy UI tak, jak ma wyglądać w różnych stanach wizualnych komponentu ("stan początkowy", "stan wpisywania tekstu", "stan powodzenia"), a następnie wywołujemy aktualizacje stanu w odpowiedzi na akcje wykonane przez użytkownika. W podobny sposób o interfejsie myślą designerzy.

Poniżej znajdziesz kod formularza quizowego stworzonego w Reakcie. Zwróć uwagę, jak używa on zmiennej stanu `status` do określenia, czy należy zablokować czy odblokować przycisk wysłania formularza lub czy zamiast tego wyświetlić komunikat.

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>Zgadza się!</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>Quiz o miastach</h2>
      <p>
        W którym mieście znajduje się bilbord, który przekształca powietrze w wodę pitną?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === 'submitting'
        }>
          Wyślij
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
      </form>
    </>
  );
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('Dobra próba, ale zła odpowiedź. Spróbuj ponownie!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}
```

```css
.Error { color: red; }
```

</Sandpack>

<LearnMore path="/learn/reacting-to-input-with-state">

Przeczytaj rozdział pt. **[Reagowanie na akcje za pomocą stanu](/learn/reacting-to-input-with-state)**, aby dowiedzieć się, jak tworzyć interakcje w sposób sterowany stanem.

</LearnMore>

## Dobieranie struktury stanu {/*choosing-the-state-structure*/}

Dobrze ustrukturyzowany stan pozwala odróżnić komponenty, które są czytelne, łatwe do zmiany i debugowania, od takich, które są źródłem ciągłych problemów. Najważniejsza zasada mówi, że nie należy trzymać w stanie danych nadmiarowych lub zduplikowanych. Jeśli komponent zawiera niepotrzebny stan, łatwo jest zapomnieć go zaktualizować i doprowadzić tym samym do błędów.

Na przykład, ten formularz zawiera **nadmiarową** zmienną stanu `fullName`:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
    setFullName(e.target.value + ' ' + lastName);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
    setFullName(firstName + ' ' + e.target.value);
  }

  return (
    <>
      <h2>Rejestracja</h2>
      <label>
        Imię:{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Nazwisko:{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        Bilet zostanie wydany na nazwisko: <b>{fullName}</b>
      </p>
    </>
  );
}
```

```css
label { display: block; margin-bottom: 5px; }
```

</Sandpack>

Możesz pozbyć się tej zmiennej, jednocześnie upraszczając kod, jeśli będziesz generować `fullName` podczas renderowania komponentu:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const fullName = firstName + ' ' + lastName;

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return (
    <>
      <h2>Rejestracja</h2>
      <label>
        Imię:{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Nazwisko:{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        Bilet zostanie wydany na nazwisko: <b>{fullName}</b>
      </p>
    </>
  );
}
```

```css
label { display: block; margin-bottom: 5px; }
```

</Sandpack>

Ta zmiana może wydawać się niewielka, jednak w ten sposób można naprawić wiele błędów w aplikacjach reactowych.

<LearnMore path="/learn/choosing-the-state-structure">

Przeczytaj rozdział pt. **[Dobieranie struktury stanu](/learn/choosing-the-state-structure)**, aby dowiedzieć się, jak projektować kształt stanu, aby uniknąć problemów.

</LearnMore>

## Współdzielenie stanu między komponentami {/*sharing-state-between-components*/}

Zdarzają się sytuacje, kiedy stan dwóch komponentów musi zawsze zmieniać się w tym samym czasie. W tym celu należy usunąć wspólny stan z obydwu komponentów, następnie dodać go do ich wspólnego rodzica, a na koniec przekazać go do komponentów poprzez właściwości. Taki zabieg określa się mianem "wynoszenia stanu w górę" i jest jedną z najczęstszych czynności wykonywanych podczas tworzenia aplikacji reactowych.

W poniższym kodzie w danym momencie tylko jeden z paneli powinien być aktywny. Nie uda się tego osiągnąć trzymając stan w każdym z nich z osobna. To komponent-rodzic powinien przechowywać stan i przekazywać go do potomków poprzez właściwości.

<Sandpack>

```js
import { useState } from 'react';

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel
        title="O mieście"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        Jego populacja wynosi ponad 2 miliony, co sprawia, że Almaty jest największym miastem w Kazachstanie. W latach 1929-1997 był stolicą kraju.
      </Panel>
      <Panel
        title="Etymologia"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        Nazwa pochodzi od <span lang="kk-KZ">алма</span>, kazachskiego słowa oznaczającego "jabłko", i najczęściej tłumaczona jest jako "pełne jabłek". Region otaczający Almaty podobno jest domem pradawnych odmian jabłek, a dziko tu rosnąca <i lang="la">Malus sieversii</i> uważana jest za przodka współczesnej jabłoni domowej.
      </Panel>
    </>
  );
}

function Panel({
  title,
  children,
  isActive,
  onShow
}) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>
          Pokaż
        </button>
      )}
    </section>
  );
}
```

```css
h3, p { margin: 5px 0px; }
.panel {
  padding: 10px;
  border: 1px solid #aaa;
}
```

</Sandpack>

<LearnMore path="/learn/sharing-state-between-components">

Przeczytaj rozdział pt. **[Współdzielenie stanu między komponentami](/learn/sharing-state-between-components)**, aby dowiedzieć się, jak wynosić stan w górę i synchronizować komponenty.

</LearnMore>

## Zachowywanie i resetowanie stanu {/*preserving-and-resetting-state*/}

Kiedy ponownie renderujesz komponent, React musi zdecydować, które części drzewa należy zostawić (i zaktualizować), a które odrzucić lub stworzyć na nowo. W większości przypadków React sam zdecyduje, co należy zrobić. Domyślnie React zachowuje części drzewa, które pokrywają się z poprzednim drzewem komponentów.

Czasami jednak chodzi nam o coś innego. W poniższej aplikacji czatu wpisanie wiadomości, a następnie zmiana adresata, nie powoduje wyczyszczenia pola. Przez to użytkownik mógłby omyłkowo wysłać wiadomość do kogoś innego:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat contact={to} />
    </div>
  )
}

const contacts = [
  { name: 'Taylor', email: 'taylor@mail.com' },
  { name: 'Alice', email: 'alice@mail.com' },
  { name: 'Bob', email: 'bob@mail.com' }
];
```

```js src/ContactList.js
export default function ContactList({
  selectedContact,
  contacts,
  onSelect
}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.email}>
            <button onClick={() => {
              onSelect(contact);
            }}>
              {contact.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js src/Chat.js
import { useState } from 'react';

export default function Chat({ contact }) {
  const [text, setText] = useState('');
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'Napisz do ' + contact.name}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button>Wyślij do {contact.email}</button>
    </section>
  );
}
```

```css
.chat, .contact-list {
  float: left;
  margin-bottom: 20px;
}
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li button {
  width: 100px;
  padding: 10px;
  margin-right: 10px;
}
textarea {
  height: 150px;
}
```

</Sandpack>

React pozwala na zmianę domyślnego zachowania i *wymuszenie* zresetowania stanu komponentu poprzez podanie innej wartości dla `key`, jak w `<Chat key={email} />`. Dzięki temu React rozumie, że jeśli zmienił się adresat wiadomości, to należy wyświetlić *inny* komponent `Chat`, który musi zostać stworzony od nowa z nowymi danymi (i innym UI). Teraz zmiana adresata, zgodnie z oczekiwaniami, powoduje zresetowanie pola z wiadomością - nawet pomimo tego, że renderujemy tu taki sam komponent.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat key={to.email} contact={to} />
    </div>
  )
}

const contacts = [
  { name: 'Taylor', email: 'taylor@mail.com' },
  { name: 'Alice', email: 'alice@mail.com' },
  { name: 'Bob', email: 'bob@mail.com' }
];
```

```js src/ContactList.js
export default function ContactList({
  selectedContact,
  contacts,
  onSelect
}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.email}>
            <button onClick={() => {
              onSelect(contact);
            }}>
              {contact.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js src/Chat.js
import { useState } from 'react';

export default function Chat({ contact }) {
  const [text, setText] = useState('');
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'Napisz do ' + contact.name}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button>Wyślij do {contact.email}</button>
    </section>
  );
}
```

```css
.chat, .contact-list {
  float: left;
  margin-bottom: 20px;
}
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li button {
  width: 100px;
  padding: 10px;
  margin-right: 10px;
}
textarea {
  height: 150px;
}
```

</Sandpack>

<LearnMore path="/learn/preserving-and-resetting-state">

Przeczytaj rozdział pt. **[Zachowywanie i resetowanie stanu](/learn/preserving-and-resetting-state)**, aby nauczyć się cyklu życia stanu i jak nim zarządzać.

</LearnMore>

## Wyodrębnianie logiki stanu do reduktora {/*extracting-state-logic-into-a-reducer*/}

Komponenty o wielu zmianach stanu rozsianych po wielu procedurach obsługi zdarzeń potrafią być przytłaczające. W takich przypadkach można przenieść logikę aktualizowania poza komponent, do pojedynczej funkcji zwanej "reduktorem" (*ang.* reducer). Dzięki temu procedury obsługi zdarzeń stają się zwięzłe, bo jedynie określają "akcje" użytkownika. Na dole pliku funkcja redukująca decyduje, jak aktualizować stan w odpowiedzi na każdą z akcji!

<Sandpack>

```js src/App.js
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <>
      <h1>Plan wycieczki po Pradze</h1>
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Nieprawidłowy typ akcji: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Odwiedzić Muzeum Kafki', done: true },
  { id: 1, text: 'Iść na przedstawienie kukiełkowe', done: false },
  { id: 2, text: 'Zdjęcie Ściany Lennona', done: false }
];
```

```js src/AddTask.js hidden
import { useState } from 'react';

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Dodaj zadanie"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        onAddTask(text);
      }}>Dodaj</button>
    </>
  )
}
```

```js src/TaskList.js hidden
import { useState } from 'react';

export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask
}) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            onChange({
              ...task,
              text: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Zapisz
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
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
        checked={task.done}
        onChange={e => {
          onChange({
            ...task,
            done: e.target.checked
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>
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

<LearnMore path="/learn/extracting-state-logic-into-a-reducer">

Przeczytaj rozdział pt. **[Wyodrębnianie logiki stanu do reduktora](/learn/extracting-state-logic-into-a-reducer)**, aby dowiedzieć się, jak scalić logikę w funkcji redukującej.

</LearnMore>

## Przekazywanie danych wgłąb przez kontekst {/*passing-data-deeply-with-context*/}

Przekazywanie informacji z rodzica do potomka zwykle odbywa się poprzez właściwości (*ang.* props). Jednak takie bezpośrednie przekazywanie danych może okazać się uciążliwe, jeśli musisz przebić się przez kilka poziomów w drzewie lub jeśli kilka komponentów potrzebuje tych samych danych. Kontekst pozwala komponentowi nadrzędnemu udostępnić informacje do dowolnego komponentu w drzewie poniżej (bez względu na to, jak głęboko się on znajduje) bez konieczności przekazywania ich przez właściwości.

W kodzie poniżej komponent `Heading` określa swój poziom zagnieżdżenia nagłówka, "pytając" najbliższego komponentu `Section` o jego poziom zagnieżdżenia. Każdy `Section` okresla swój poziom, pytając najbliższego `Section` i dodając do wartości 1. Każdy komponent `Section` udostępnia informację wszystkim komponentom poniżej, bez konieczności przekazywania ich bezpośrednio. Robi to dzięki kontekstowi.

<Sandpack>

```js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading>Tytuł</Heading>
      <Section>
        <Heading>Nagłówek</Heading>
        <Heading>Nagłówek</Heading>
        <Heading>Nagłówek</Heading>
        <Section>
          <Heading>Nagłówek podrzędny</Heading>
          <Heading>Nagłówek podrzędny</Heading>
          <Heading>Nagłówek podrzędny</Heading>
          <Section>
            <Heading>Nagłówek bardzo podrzędny</Heading>
            <Heading>Nagłówek bardzo podrzędny</Heading>
            <Heading>Nagłówek bardzo podrzędny</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

```js src/Section.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
```

```js src/Heading.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 0:
      throw Error('Heading musi być wyrenderowany wewnątrz Section!');
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Nieprawidłowy poziom zagnieżdżenia: ' + level);
  }
}
```

```js src/LevelContext.js
import { createContext } from 'react';

export const LevelContext = createContext(0);
```

```css
.section {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #aaa;
}
```

</Sandpack>

<LearnMore path="/learn/passing-data-deeply-with-context">

Przeczytaj rozdział pt. **[Przekazywanie danych wgłąb przez kontekst](/learn/passing-data-deeply-with-context)**, aby dowiedzieć się o użyciu kontekstu jako alternatywy do przekazywania przez właściwości.

</LearnMore>

## Skalowanie za pomocą reduktora i kontekstu {/*scaling-up-with-reducer-and-context*/}

Reduktory pozwalają zgrupować logikę zmiany stanu komponentu w jednym miejscu. Kontekst pozwala przekazywać informacje głęboko wgłąb drzewa komponentów. Możesz połączyć obydwa podejścia, aby skutecznie zarządzać stanem skomplikowanego ekranu.

W ten sposób komponent nadrzędny o skomplikowanym stanie zarządza nim za pomocą reduktora. Inne komponenty, nie ważne jak głęboko, mogą odczytywać wartości stanu poprzez kontekst. Mogą również wywoływać akcje, które aktualizują stan.

<Sandpack>

```js src/App.js
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksProvider } from './TasksContext.js';

export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Dzień wolny w Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
```

```js src/TasksContext.js
import { createContext, useContext, useReducer } from 'react';

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider
        value={dispatch}
      >
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Nieprawidłowa akcja: ' + action.type);
    }
  }
}

const initialTasks = [
  { id: 0, text: 'Ścieżka Filozofa', done: true },
  { id: 1, text: 'Zwiedzić świątynię', done: false },
  { id: 2, text: 'Napić się matchy', done: false }
];
```

```js src/AddTask.js
import { useState, useContext } from 'react';
import { useTasksDispatch } from './TasksContext.js';

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch();
  return (
    <>
      <input
        placeholder="Dodaj zadanie"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        });
      }}>Dodaj</button>
    </>
  );
}

let nextId = 3;
```

```js src/TaskList.js
import { useState, useContext } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.js';

export default function TaskList() {
  const tasks = useTasks();
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Zapisz
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
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
        checked={task.done}
        onChange={e => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
      />
      {taskContent}
      <button onClick={() => {
        dispatch({
          type: 'deleted',
          id: task.id
        });
      }}>
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

<LearnMore path="/learn/scaling-up-with-reducer-and-context">

Przeczytaj rozdział pt. **[Skalowanie za pomocą reduktora i kontekstu](/learn/scaling-up-with-reducer-and-context)**, aby dowiedzieć się, jak skaluje się zarządzanie stanem w większych aplikacjach.

</LearnMore>

## Co dalej? {/*whats-next*/}

Przejdź do sekcji pt. [Reagowanie na akcje za pomocą stanu](/learn/reacting-to-input-with-state) i zacznij czytać rozdział strona po stronie!

Ewentualnie, jeśli już znasz te zagadnienia, możesz poczytać o [Ukrytych furtkach](/learn/escape-hatches)?
