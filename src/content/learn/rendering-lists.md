---
title: Renderowanie list
---

<Intro>

Często będziesz potrzebować wyświetlać wiele podobnych komponentów na podstawie kolekcji danych. Możesz użyć [javascriptowych metod tablic](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array#), aby manipulować tablicą danych. Będziesz tu korzystać z [`filter()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) i [`map()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map) w połączeniu z Reactem, aby przefiltrować i przekształcić tablicę danych w tablicę komponentów.

</Intro>

<YouWillLearn>

* Jak renderować komponenty z tablicy za pomocą javascriptowej funkcji `map()`.
* Jak renderować tylko konkretne komponenty za pomocą javascriptowej funkcji `filter()`.
* Kiedy i dlaczego stosować klucze (ang. _keys_) w Reakcie.

</YouWillLearn>

## Renderowanie list z tablic {/*rendering-data-from-arrays*/}

Załóżmy, że posiadasz pewną listę treści.

```js
<ul>
  <li>Creola Katherine Johnson: matematyczka</li>
  <li>Mario José Molina-Pasquel Henríquez: chemik</li>
  <li>Mohammad Abdus Salam: fizyk</li>
  <li>Percy Lavon Julian: chemik</li>
  <li>Subrahmanyan Chandrasekhar: astrofizyk</li>
</ul>
```

Jedyna różnica między elementami tej listy to ich treść, ich dane. Często będziesz chcieć pokazać kilka instancji tego samego komponentu, używając różnych danych podczas tworzenia interfejsów: od list komentarzy do galerii obrazków profilowych. W takich sytuacjach możesz przechowywać te dane w obiektach i tablicach JavaScript oraz używać metod takich jak [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) i [`filter()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), aby renderować na ich podstawie listy komponentów.

Oto krótki przykład, jak generować listę elementów z tablicy:

1. **Przenieś** dane do tablicy:

```js
const people = [
  'Creola Katherine Johnson: matematyczka',
  'Mario José Molina-Pasquel Henríquez: chemik',
  'Mohammad Abdus Salam: fizyk',
  'Percy Lavon Julian: chemik',
  'Subrahmanyan Chandrasekhar: astrofizyk'
];
```

2. **Zmapuj** elementy tablicy `people` na nową tablicę węzłów JSX, `listItems`:

```js
const listItems = people.map(person => <li>{person}</li>);
```

3. **Zwróć** tablicę `listItems` z twojego komponentu, opakowaną w element `<ul>`:

```js
return <ul>{listItems}</ul>;
```

Oto rezultat:

<Sandpack>

```js
const people = [
  'Creola Katherine Johnson: matematyczka',
  'Mario José Molina-Pasquel Henríquez: chemik',
  'Mohammad Abdus Salam: fizyk',
  'Percy Lavon Julian: chemik',
  'Subrahmanyan Chandrasekhar: astrofizyk'
];

export default function List() {
  const listItems = people.map(person =>
    <li>{person}</li>
  );
  return <ul>{listItems}</ul>;
}
```

```css
li { margin-bottom: 10px; }
```

</Sandpack>

Zauważ, że powyższy sandbox wyświetla błąd w konsoli:

<ConsoleBlock level="error">

Warning: Each child in a list should have a unique "key" prop.

</ConsoleBlock>

Później na tej stronie, dowiesz się jak naprawić ten błąd. Zanim do tego przejdziemy, nadajmy trochę struktury twoim danym.

## Filtrowanie tablicy elementów {/*filtering-arrays-of-items*/}

Dane te można jeszcze bardziej ustrukturyzować.

```js
const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'matematyczka',
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemik',
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'fizyk',
}, {
  name: 'Percy Lavon Julian',
  profession: 'chemik',
}, {
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrofizyk',
}];
```

Załóżmy, że chcesz mieć możliwość pokazywania tylko tych osób, których zawód to `'chemik'`. Możesz skorzystać z javascriptowej metody `filter()`, aby zwrócić tylko takie osoby. Metoda ta przyjmuje tablicę, poddaje jej elementy "testowi" (funkcji, która zwraca `true` lub `false`) i zwraca nową tablicę tylko tych elementów, które zdały test (zwróciły `true`).

Chcąc uzyskać tylko te elementy, gdzie `profession` jest ustawione na `'chemik'`, odpowiednia funkcja "testu" powinna wyglądać tak: `(person) => person.profession === 'chemik'`. Oto sposób jak to wszystko połączyć w całość:

1. **Utwórz** nową tablicę zawierającą tylko osoby o zawodzie `'chemik'` i nazwij ją `chemists`. Wywołaj metodę `filter()` na tablicy `people`, filtrując według warunku `person.profession === 'chemik'` i przypisz jej rezultat do nowo utworzonej tablicy:

```js
const chemists = people.filter(person =>
  person.profession === 'chemik'
);
```

2. Teraz **zmapuj** tablicę `chemists`:

```js {1,13}
const listItems = chemists.map(person =>
  <li>
     <img
       src={getImageUrl(person)}
       alt={person.name}
     />
     <p>
       <b>{person.name}:</b>
       {' ' + person.profession + ' '}
       {person.accomplishment}.
     </p>
  </li>
);
```

3. Wreszcie **zwróć** `listItems` z twojego komponentu:

```js
return <ul>{listItems}</ul>;
```

<Sandpack>

```js App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemik'
  );
  const listItems = chemists.map(person =>
    <li>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        {person.accomplishment}.
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}
```

```js data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'matematyczka',
  accomplishment: 'znana z obliczeń związanych z lotami kosmicznymi',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemik',
  accomplishment: 'znany z odkrycia dziury ozonowej nad Arktyką',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'fizyk',
  accomplishment: 'znany z prac nad teorią elektromagnetyzmu',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemik',
  accomplishment: 'znany z pionierskich prac nad lekami na bazie kortyzonu, steroidami i pigułkami antykoncepcyjnymi',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrofizyk',
  accomplishment: 'znany z obliczeń masy białych karłów',
  imageId: 'lrWQx8l'
}];
```

```js utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li { 
  margin-bottom: 10px; 
  display: grid; 
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

<Pitfall>

Funkcje strzałkowe (ang. _arrow function_) niejawnie zwracają wyrażenie znajdujące się zaraz po `=>`, więc nie musisz użyć instrukcji `return`:

```js
const listItems = chemists.map(person =>
  <li>...</li> // Niejawne zwrócenie!
);
```

Natomiast **musisz wprost napisać `return`, jeśli po twoim `=>` znajduje się nawias klamrowy!**

```js
const listItems = chemists.map(person => { // Nawias klamrowy
  return <li>...</li>;
});
```

Funkcje strzałkowe zawierające `=> {` są określane jako posiadające ["ciało blokowe"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#function_body). Pozwalają one na napisanie więcej niż jednej linii kodu, ale *zawsze musisz* samodzielnie napisać instrukcję `return`. Jeśli to przeoczysz, nic nie zostanie zwrócone!

</Pitfall>

## Zachowanie kolejności elementów listy za pomocą `key` (ang. _klucz_) {/*keeping-list-items-in-order-with-key*/}

Zauważ, że wszystkie powyższe piaskownice wyświetlają błąd w konsoli:

<ConsoleBlock level="error">

Warning: Each child in a list should have a unique "key" prop.

</ConsoleBlock>

Każdemu elementowi tablicy musisz przypisać klucz `key`, czyli łańcuch znaków lub liczbę, która jednoznacznie identyfikuje go wśród innych elementów w tej tablicy:

```js
<li key={person.id}>...</li>
```

<Note>

Elementy JSX bezpośrednio wewnątrz wywołania `map()` muszą zawsze mieć przypisane klucze!

</Note>

Klucze `key` pozwalają Reactowi zrozumieć, który komponent odpowiada któremu elementowi tablicy, dzięki czemu może je później dopasować. Jest to istotne, jeśli elementy tablicy mogą być przemieszczane (np. w wyniku sortowania), dodawane lub usuwane. Dobrze dobrany klucz `key` pomaga Reactowi wywnioskować, co dokładnie się stało, i dokonać odpowiednich aktualizacji drzewa DOM.

Zamiast generować klucze dynamicznie, powinno się dołączać je do danych:

<Sandpack>

```js App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}</b>
          {' ' + person.profession + ' '}
          {person.accomplishment}.
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}
```

```js data.js active
export const people = [{
  id: 0, // Użyte w JSX jako klucz
  name: 'Creola Katherine Johnson',
  profession: 'matematyczka',
  accomplishment: 'znana z obliczeń związanych z lotami kosmicznymi',
  imageId: 'MK3eW3A'
}, {
  id: 1, // Użyte w JSX jako klucz
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemik',
  accomplishment: 'znany z odkrycia dziury ozonowej nad Arktyką',
  imageId: 'mynHUSa'
}, {
  id: 2, // Użyte w JSX jako klucz
  name: 'Mohammad Abdus Salam',
  profession: 'fizyk',
  accomplishment: 'znany z prac nad teorią elektromagnetyzmu',
  imageId: 'bE7W1ji'
}, {
  id: 3, // Użyte w JSX jako klucz
  name: 'Percy Lavon Julian',
  profession: 'chemik',
  accomplishment: 'znany z pionierskich prac nad lekami na bazie kortyzonu, steroidami i pigułkami antykoncepcyjnymi',
  imageId: 'IOjWm71'
}, {
  id: 4, // Użyte w JSX jako klucz
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrofizyk',
  accomplishment: 'znany z obliczeń masy białych karłów',
  imageId: 'lrWQx8l'
}];
```

```js utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li { 
  margin-bottom: 10px; 
  display: grid; 
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

<DeepDive>

#### Wyświetlanie kilku węzłów drzewa DOM dla każdego elementu listy {/*displaying-several-dom-nodes-for-each-list-item*/}

Co zrobić, gdy każdy element musi renderować nie jeden, ale kilka węzłów drzewa DOM?

Krótka składnia [`<>...</>` Fragment](/reference/react/Fragment) nie pozwala na przekazanie klucza, więc musisz albo zgrupować je w pojedynczy `<div>`, albo użyć nieco dłuższej i [bardziej jawnej składni `<Fragment>`:](/reference/react/Fragment#rendering-a-list-of-fragments)

```js
import { Fragment } from 'react';

// ...

const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
```

Fragmenty nie pojawiają się w drzewie DOM, więc użycie ich spowoduje uzyskanie płaskiej listy elementów `<h1>`, `<p>`, `<h1>`, `<p>` i tak dalej.

</DeepDive>

### Skąd wziąć klucze `key` {/*where-to-get-your-key*/}

Różne źródła danych dostarczają różnych kluczy:

* **Dane z bazy danych:** Jeśli twoje dane pochodzą z bazy danych, możesz używać kluczy lub ID z tej bazy danych, które z natury są unikalne.
* **Lokalnie generowane dane:** Jeśli twoje dane są generowane i przechowywane lokalnie (np. notatki w aplikacji do robienia notatek), użyj licznika przyrostowego [`crypto.randomUUID()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) lub paczki takiej jak [`uuid`](https://www.npmjs.com/package/uuid) podczas tworzenia elementów.
### Zasady kluczy {/*rules-of-keys*/}

* **Klucze muszą być unikalne między rodzeństwem.** Jednakże, używanie tych samych kluczy dla węzłów JSX w _różnych_ tablicach jest jak najbardziej w porządku.
* **Klucze nie mogą się zmieniać,** bo to przeczy ich celowi! Nie generuj ich podczas renderowania.

### Dlaczego React potrzebuje kluczy? {/*why-does-react-need-keys*/}

Wyobraź sobie, że pliki na twoim pulpicie nie mają nazw. Zamiast tego trzeba odwoływać się do nich przez ich kolejność - pierwszy plik, drugi plik i tak dalej. Można się do tego przyzwyczaić, ale gdyby usunąć plik, zaczęłoby być to kłopotliwe. Drugi plik stałby się pierwszym plikiem, trzeci plik byłby drugim plikiem i tak dalej.

Nazwy plików w folderze i klucze JSX w tablicy pełnią podobną rolę. Pozwalają nam jednoznacznie identyfikować element pośród swojego rodzeństwa. Dobrze dobrany klucz dostarcza więcej informacji niż pozycja w tablicy. Nawet jeśli _pozycja_ zmieni się ze względu na ponowne sortowanie, klucz pozwala Reactowi identyfikować element przez cały cykl jego życia.

<Pitfall>

Możesz skusić się, aby użyć indeksu elementu w tablicy jako jego klucza. W rzeczywistości to właśnie jego użyje React, jeśli w ogóle nie określisz klucza. Jednak kolejność renderowania elementów będzie się zmieniać w miarę czasu, gdy jakiś element zostanie dodany, usunięty lub jeśli tablica zostanie posortowana. Indeks jako klucz często prowadzi do mało oczywistych i mylących błędów.

Podobnie nie generuj kluczy dynamicznie, na przykład za pomocą `key={Math.random()}`. Spowoduje to, że klucze nigdy nie będą się zgadzać między renderowaniami, co poskutkuje za każdym razem tworzeniem od nowa wszystkich komponentów i drzewa DOM. Nie tylko będzie to wolne, ale również sprawi, że utracisz wszystkie dane wprowadzone przez użytkownika wewnątrz elementów listy. Zamiast tego użyj stałego identyfikatora opartego na danych.

Zauważ, że twoje komponenty nie otrzymają `key` przez właściwości. Jest on używany jedynie jako wskazówka dla samego Reacta. Jeśli twój komponent potrzebuje identyfikatora, musisz przekazać go jako oddzielną właściwość: `<Profile key={id} userId={id} />`.

</Pitfall>

<Recap>

Na tej stronie nauczyliśmy cię:

* Jak przenieść dane z komponentów do struktur danych, takich jak tablice i obiekty.
* Jak generować zbiory podobnych komponentów za pomocą javascriptowej funkcji `map()`.
* Jak tworzyć tablice przefiltrowanych elementów za pomocą javascriptowej funkcji `filter()`.
* Jak i dlaczego ustawiać klucz `key` dla każdego komponentu w kolekcji, aby React mógł śledzić każdy z nich, nawet jeśli zmienią się ich pozycja lub dane.

</Recap>



<Challenges>

#### Splitting a list in two {/*splitting-a-list-in-two*/}

This example shows a list of all people.

Change it to show two separate lists one after another: **Chemists** and **Everyone Else.** Like previously, you can determine whether a person is a chemist by checking if `person.profession === 'chemist'`.

<Sandpack>

```js App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return (
    <article>
      <h1>Scientists</h1>
      <ul>{listItems}</ul>
    </article>
  );
}
```

```js data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

<Solution>

You could use `filter()` twice, creating two separate arrays, and then `map` over both of them:

<Sandpack>

```js App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
  const everyoneElse = people.filter(person =>
    person.profession !== 'chemist'
  );
  return (
    <article>
      <h1>Scientists</h1>
      <h2>Chemists</h2>
      <ul>
        {chemists.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
      <h2>Everyone Else</h2>
      <ul>
        {everyoneElse.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
    </article>
  );
}
```

```js data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

In this solution, the `map` calls are placed directly inline into the parent `<ul>` elements, but you could introduce variables for them if you find that more readable.

There is still a bit duplication between the rendered lists. You can go further and extract the repetitive parts into a `<ListSection>` component:

<Sandpack>

```js App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

function ListSection({ title, people }) {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {people.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
    </>
  );
}

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
  const everyoneElse = people.filter(person =>
    person.profession !== 'chemist'
  );
  return (
    <article>
      <h1>Scientists</h1>
      <ListSection
        title="Chemists"
        people={chemists}
      />
      <ListSection
        title="Everyone Else"
        people={everyoneElse}
      />
    </article>
  );
}
```

```js data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

A very attentive reader might notice that with two `filter` calls, we check each person's profession twice. Checking a property is very fast, so in this example it's fine. If your logic was more expensive than that, you could replace the `filter` calls with a loop that manually constructs the arrays and checks each person once.

In fact, if `people` never change, you could move this code out of your component. From React's perspective, all that matters is that you give it an array of JSX nodes in the end. It doesn't care how you produce that array:

<Sandpack>

```js App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

let chemists = [];
let everyoneElse = [];
people.forEach(person => {
  if (person.profession === 'chemist') {
    chemists.push(person);
  } else {
    everyoneElse.push(person);
  }
});

function ListSection({ title, people }) {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {people.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
    </>
  );
}

export default function List() {
  return (
    <article>
      <h1>Scientists</h1>
      <ListSection
        title="Chemists"
        people={chemists}
      />
      <ListSection
        title="Everyone Else"
        people={everyoneElse}
      />
    </article>
  );
}
```

```js data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

</Solution>

#### Nested lists in one component {/*nested-lists-in-one-component*/}

Make a list of recipes from this array! For each recipe in the array, display its name as an `<h2>` and list its ingredients in a `<ul>`.

<Hint>

This will require nesting two different `map` calls.

</Hint>

<Sandpack>

```js App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
    </div>
  );
}
```

```js data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
```

</Sandpack>

<Solution>

Here is one way you could go about it:

<Sandpack>

```js App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <ul>
            {recipe.ingredients.map(ingredient =>
              <li key={ingredient}>
                {ingredient}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
```

```js data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
```

</Sandpack>

Each of the `recipes` already includes an `id` field, so that's what the outer loop uses for its `key`. There is no ID you could use to loop over ingredients. However, it's reasonable to assume that the same ingredient won't be listed twice within the same recipe, so its name can serve as a `key`. Alternatively, you could change the data structure to add IDs, or use index as a `key` (with the caveat that you can't safely reorder ingredients).

</Solution>

#### Extracting a list item component {/*extracting-a-list-item-component*/}

This `RecipeList` component contains two nested `map` calls. To simplify it, extract a `Recipe` component from it which will accept `id`, `name`, and `ingredients` props. Where do you place the outer `key` and why?

<Sandpack>

```js App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <ul>
            {recipe.ingredients.map(ingredient =>
              <li key={ingredient}>
                {ingredient}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
```

```js data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
```

</Sandpack>

<Solution>

You can copy-paste the JSX from the outer `map` into a new `Recipe` component and return that JSX. Then you can change `recipe.name` to `name`, `recipe.id` to `id`, and so on, and pass them as props to the `Recipe`:

<Sandpack>

```js
import { recipes } from './data.js';

function Recipe({ id, name, ingredients }) {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {ingredients.map(ingredient =>
          <li key={ingredient}>
            {ingredient}
          </li>
        )}
      </ul>
    </div>
  );
}

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <Recipe {...recipe} key={recipe.id} />
      )}
    </div>
  );
}
```

```js data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
```

</Sandpack>

Here, `<Recipe {...recipe} key={recipe.id} />` is a syntax shortcut saying "pass all properties of the `recipe` object as props to the `Recipe` component". You could also write each prop explicitly: `<Recipe id={recipe.id} name={recipe.name} ingredients={recipe.ingredients} key={recipe.id} />`.

**Note that the `key` is specified on the `<Recipe>` itself rather than on the root `<div>` returned from `Recipe`.** This is because this `key` is needed directly within the context of the surrounding array. Previously, you had an array of `<div>`s so each of them needed a `key`, but now you have an array of `<Recipe>`s. In other words, when you extract a component, don't forget to leave the `key` outside the JSX you copy and paste.

</Solution>

#### List with a separator {/*list-with-a-separator*/}

This example renders a famous haiku by Tachibana Hokushi, with each line wrapped in a `<p>` tag. Your job is to insert an `<hr />` separator between each paragraph. Your resulting structure should look like this:

```js
<article>
  <p>I write, erase, rewrite</p>
  <hr />
  <p>Erase again, and then</p>
  <hr />
  <p>A poppy blooms.</p>
</article>
```

A haiku only contains three lines, but your solution should work with any number of lines. Note that `<hr />` elements only appear *between* the `<p>` elements, not in the beginning or the end!

<Sandpack>

```js
const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  return (
    <article>
      {poem.lines.map((line, index) =>
        <p key={index}>
          {line}
        </p>
      )}
    </article>
  );
}
```

```css
body {
  text-align: center;
}
p {
  font-family: Georgia, serif;
  font-size: 20px;
  font-style: italic;
}
hr {
  margin: 0 120px 0 120px;
  border: 1px dashed #45c3d8;
}
```

</Sandpack>

(This is a rare case where index as a key is acceptable because a poem's lines will never reorder.)

<Hint>

You'll either need to convert `map` to a manual loop, or use a fragment.

</Hint>

<Solution>

You can write a manual loop, inserting `<hr />` and `<p>...</p>` into the output array as you go:

<Sandpack>

```js
const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  let output = [];

  // Fill the output array
  poem.lines.forEach((line, i) => {
    output.push(
      <hr key={i + '-separator'} />
    );
    output.push(
      <p key={i + '-text'}>
        {line}
      </p>
    );
  });
  // Remove the first <hr />
  output.shift();

  return (
    <article>
      {output}
    </article>
  );
}
```

```css
body {
  text-align: center;
}
p {
  font-family: Georgia, serif;
  font-size: 20px;
  font-style: italic;
}
hr {
  margin: 0 120px 0 120px;
  border: 1px dashed #45c3d8;
}
```

</Sandpack>

Using the original line index as a `key` doesn't work anymore because each separator and paragraph are now in the same array. However, you can give each of them a distinct key using a suffix, e.g. `key={i + '-text'}`.

Alternatively, you could render a collection of fragments which contain `<hr />` and `<p>...</p>`. However, the `<>...</>` shorthand syntax doesn't support passing keys, so you'd have to write `<Fragment>` explicitly:

<Sandpack>

```js
import { Fragment } from 'react';

const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  return (
    <article>
      {poem.lines.map((line, i) =>
        <Fragment key={i}>
          {i > 0 && <hr />}
          <p>{line}</p>
        </Fragment>
      )}
    </article>
  );
}
```

```css
body {
  text-align: center;
}
p {
  font-family: Georgia, serif;
  font-size: 20px;
  font-style: italic;
}
hr {
  margin: 0 120px 0 120px;
  border: 1px dashed #45c3d8;
}
```

</Sandpack>

Remember, fragments (often written as `<> </>`) let you group JSX nodes without adding extra `<div>`s!

</Solution>

</Challenges>
