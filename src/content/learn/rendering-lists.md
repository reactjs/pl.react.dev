---
title: Renderowanie list
---

<Intro>

Często zdarzy ci się wyświetlać wiele podobnych komponentów na podstawie kolekcji danych. Możesz użyć [javascriptowych metod tablicowych](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array#), aby manipulować tablicą danych. Będziesz tu korzystać z [`filter()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) i [`map()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map) w połączeniu z Reactem, aby przefiltrować i przekształcić tablicę danych w tablicę komponentów.

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

Jedyna różnica między elementami tej listy to ich treść, ich dane. Często będziesz chcieć pokazać kilka instancji tego samego komponentu, używając różnych danych podczas tworzenia interfejsów: od list komentarzy do galerii obrazków profilowych. W takich sytuacjach możesz przechowywać te dane w obiektach i tablicach javascriptowych oraz używać metod, takich jak [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) i [`filter()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), aby renderować na ich podstawie listy komponentów.

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

Poniżej na tej stronie dowiesz się, jak naprawić ten błąd. Zanim do tego przejdziemy, nadajmy trochę struktury twoim danym.

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
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemik',
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrofizyk',
}];
```

Załóżmy, że chcesz mieć możliwość pokazywania tylko tych osób, których zawód to `'chemik'`. Możesz skorzystać z javascriptowej metody `filter()`, aby zwrócić tylko takie osoby. Metoda ta przyjmuje tablicę, poddaje jej elementy "testowi" (funkcji, która zwraca `true` lub `false`) i zwraca nową tablicę tylko tych elementów, które zdały test (zwróciły `true`).

Chcąc uzyskać tylko te elementy, gdzie `profession` jest ustawione na `'chemik'`, odpowiednia funkcja "testu" powinna wyglądać tak: `(person) => person.profession === 'chemik'`. Oto sposób na to, jak to wszystko połączyć w całość:

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

```js src/App.js
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

```js src/data.js
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

```js src/utils.js
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

Funkcje strzałkowe (ang. _arrow function_) niejawnie zwracają wyrażenie znajdujące się zaraz po `=>`, więc nie musisz używać instrukcji `return`:

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

Zauważ, że wszystkie powyższe sandboxy wyświetlają błąd w konsoli:

<ConsoleBlock level="error">

Warning: Each child in a list should have a unique "key" prop.

</ConsoleBlock>

Każdemu elementowi tablicy musisz przypisać klucz `key`, czyli łańcuch znaków lub liczbę, która jednoznacznie identyfikuje go wśród innych elementów w tej tablicy:

```js
<li key={person.id}>...</li>
```

<Note>

Elementy JSX bezpośrednio wewnątrz wywołania funkcji `map()` muszą zawsze mieć przypisane klucze!

</Note>

Klucze `key` pozwalają Reactowi zrozumieć, który komponent odpowiada któremu elementowi tablicy, dzięki czemu może je później dopasować. Jest to istotne, jeśli elementy tablicy mogą być przemieszczane (np. w wyniku sortowania), dodawane lub usuwane. Dobrze dobrany klucz `key` pomaga Reactowi wywnioskować, co dokładnie się stało, i dokonać odpowiednich aktualizacji drzewa DOM.

Zamiast generować klucze dynamicznie, powinno się dołączać je do danych:

<Sandpack>

```js src/App.js
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

```js src/data.js active
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

```js src/utils.js
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

* **Klucze muszą być unikalne między rodzeństwem.** Jednakże używanie tych samych kluczy dla węzłów JSX w _różnych_ tablicach jest jak najbardziej w porządku.
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

#### Dzielenie listy na dwie {/*splitting-a-list-in-two*/}

Ten przykład wyświetla listę wszystkich osób.

Zmień go tak, aby pokazywał dwie oddzielne listy jedna po drugiej: **Chemia** i **Wszyscy Inni.** Tak jak wcześniej, możesz określić, czy osoba jest związana z chemią, sprawdzając warunek `person.profession === 'chemist'`.

<Sandpack>

```js src/App.js
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
        {person.accomplishment}.
      </p>
    </li>
  );
  return (
    <article>
      <h1>Naukowcy</h1>
      <ul>{listItems}</ul>
    </article>
  );
}
```

```js src/data.js
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

```js src/utils.js
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

Możesz użyć funkcji `filter()` dwukrotnie, tworząc dwie osobne tablice, a następnie użyć funkcji `map()` dla obu z nich:

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemik'
  );
  const everyoneElse = people.filter(person =>
    person.profession !== 'chemik'
  );
  return (
    <article>
      <h1>Naukowcy</h1>
      <h2>Chemicy</h2>
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
              {person.accomplishment}.
            </p>
          </li>
        )}
      </ul>
      <h2>Wszyscy inni</h2>
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
              {person.accomplishment}.
            </p>
          </li>
        )}
      </ul>
    </article>
  );
}
```

```js src/data.js
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

```js src/utils.js
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

W rozwiązaniu tym, wywołania funkcji `map()` są umieszczone bezpośrednio wewnątrz elementów nadrzędnych `<ul>`, ale możesz przenieść je do zmiennych, aby zwiększyć czytelność.

Nadal zachodzi tu duplikacja kodu między listami. Możesz pójść dalej i wyodrębnić jego powtarzające się części do komponentu `<ListSection>`:

<Sandpack>

```js src/App.js
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
              {person.accomplishment}.
            </p>
          </li>
        )}
      </ul>
    </>
  );
}

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemik'
  );
  const everyoneElse = people.filter(person =>
    person.profession !== 'chemik'
  );
  return (
    <article>
      <h1>Naukowcy</h1>
      <ListSection
        title="Chemicy"
        people={chemists}
      />
      <ListSection
        title="Wszyscy inni"
        people={everyoneElse}
      />
    </article>
  );
}
```

```js src/data.js
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

```js src/utils.js
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

Bardzo uważny czytelnik może zauważyć, że przy dwóch wywołaniach funkcji `filter()`, zawód każdej osoby jest sprawdzany dwukrotnie. W tym przykładzie, sprawdzanie właściwości jest bardzo szybkie, więc jest to akceptowalne rozwiązanie. Jeśli jednak twoja logika byłaby bardziej kosztowna, można by zastąpić wywołania funkcji `filter()` pętlą, która ręcznie konstruuje tablice i sprawdza każdą osobę tylko raz.

W zasadzie, jeśli tablica `people` nigdy się nie zmienia, możesz przenieść ten kod poza komponent. Z punktu widzenia Reacta, ważne jest tylko to, aby ostatecznie dostarczyć mu tablicę węzłów JSX. Nie ma to znaczenia, w jaki sposób generujesz tę tablicę:

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

let chemists = [];
let everyoneElse = [];
people.forEach(person => {
  if (person.profession === 'chemik') {
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
              {person.accomplishment}.
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
      <h1>Naukowcy</h1>
      <ListSection
        title="Chemicy"
        people={chemists}
      />
      <ListSection
        title="Wszyscy inni"
        people={everyoneElse}
      />
    </article>
  );
}
```

```js src/data.js
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

```js src/utils.js
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

#### Listy zagnieżdżone w jednym komponencie {/*nested-lists-in-one-component*/}

Stwórz listę przepisów z tej tablicy! Dla każdego przepisu z tablicy wyświetl jego nazwę jako `<h2>` i wypisz składniki w `<ul>`.

<Hint>

Będzie to wymagało zagnieżdżenia dwóch różnych wywołań funkcji `map()`.

</Hint>

<Sandpack>

```js src/App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Przepisy</h1>
    </div>
  );
}
```

```js src/data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Sałatka grecka',
  ingredients: ['pomidory', 'ogórek', 'cebula', 'oliwki', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Pizza hawajska',
  ingredients: ['ciasto na pizze', 'sos do pizzy', 'mozzarella', 'szynka', 'ananas']
}, {
  id: 'hummus',
  name: 'Humus',
  ingredients: ['ciecierzyca', 'oliwa z oliwek', 'ząbki czosnku', 'cytryna', 'tahini']
}];
```

</Sandpack>

<Solution>

Oto jedna z możliwości, jak można to zrealizować:

<Sandpack>

```js src/App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Przepisy</h1>
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

```js src/data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Sałatka grecka',
  ingredients: ['pomidory', 'ogórek', 'cebula', 'oliwki', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Pizza hawajska',
  ingredients: ['ciasto na pizze', 'sos do pizzy', 'mozzarella', 'szynka', 'ananas']
}, {
  id: 'hummus',
  name: 'Humus',
  ingredients: ['ciecierzyca', 'oliwa z oliwek', 'ząbki czosnku', 'cytryna', 'tahini']
}];
```

</Sandpack>

Każdy z przepisów zawiera już pole `id`, więc właśnie to pole jest używane jako `key` w zewnętrznej pętli. Brak jest jednak identyfikatora, którego można by użyć do iteracji po składnikach. Niemniej jednak, można założyć, że ten sam składnik nie będzie wymieniony dwukrotnie w ramach tego samego przepisu, więc jego nazwa może posłużyć jako `key`. Ewentualnie, można by zmienić strukturę danych, dodając identyfikatory lub użyć indeksu jako `key` (z zastrzeżeniem, że nie można bezpiecznie zmieniać kolejności składników).

</Solution>

#### Wyodrębnianie komponentu elementu listy {/*extracting-a-list-item-component*/}

Komponent `RecipeList` zawiera dwa zagnieżdżone wywołania funkcji `map()`. Aby to uprościć, wyodrębnij komponent `Recipe`, który będzie przyjmować właściwości `id`, `name` oraz `ingredients`. Gdzie umieścisz zewnętrzny klucz `key` i dlaczego?

<Sandpack>

```js src/App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Przepisy</h1>
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

```js src/data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Sałatka grecka',
  ingredients: ['pomidory', 'ogórek', 'cebula', 'oliwki', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Pizza hawajska',
  ingredients: ['ciasto na pizze', 'sos do pizzy', 'mozzarella', 'szynka', 'ananas']
}, {
  id: 'hummus',
  name: 'Humus',
  ingredients: ['ciecierzyca', 'oliwa z oliwek', 'ząbki czosnku', 'cytryna', 'tahini']
}];
```

</Sandpack>

<Solution>

Możesz przenieść JSX z zewnętrznego wywołania funkcji `map()` do nowego komponentu `Recipe` i zwrócić ten JSX. Następnie możesz zmienić `recipe.name` na `name`, `recipe.id` na `id` itd., a następnie przekazać je jako właściwości do komponentu `Recipe`:

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
      <h1>Przepisy</h1>
      {recipes.map(recipe =>
        <Recipe {...recipe} key={recipe.id} />
      )}
    </div>
  );
}
```

```js src/data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Sałatka grecka',
  ingredients: ['pomidory', 'ogórek', 'cebula', 'oliwki', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Pizza hawajska',
  ingredients: ['ciasto na pizze', 'sos do pizzy', 'mozzarella', 'szynka', 'ananas']
}, {
  id: 'hummus',
  name: 'Humus',
  ingredients: ['ciecierzyca', 'oliwa z oliwek', 'ząbki czosnku', 'cytryna', 'tahini']
}];
```

</Sandpack>

Użyta tutaj składnia `<Recipe {...recipe} key={recipe.id} />` to skrócony zapis, mówiący "przekaż wszystkie właściwości obiektu `recipe` jako właściwości do komponentu `Recipe`". Możesz także przekazać każdą właściwość jawnie: `<Recipe id={recipe.id} name={recipe.name} ingredients={recipe.ingredients} key={recipe.id} />`.

**Zauważ, że klucz `key` jest określony bezpośrednio dla  `<Recipe>`, a nie dla najwyższego elementu `<div>`, który jest zwracany przez `Recipe`.** To dlatego, że `key` jest potrzebny bezpośrednio w kontekście otaczającej tablicy. Wcześniej mieliśmy tablicę elementów `<div>`, więc każdy z nich potrzebował `key`, ale teraz mamy tablicę komponentów `<Recipe>`. Innymi słowy, podczas wyodrębniania komponentu, nie zapomnij umieścić `key` poza kodem JSX, który przenosisz.

</Solution>

#### Lista z separatorem {/*list-with-a-separator*/}

W tym przykładzie renderowany jest znany haiku autorstwa Tachibana Hokushi, z każdą linią umieszczoną w tagu `<p>`. Twoim zadaniem jest wstawienie separatora `<hr />` między każdym akapitem. Ostateczna struktura powinna wyglądać tak:

```js
<article>
  <p>Piszę, wymazuję, przepisuję</p>
  <hr />
  <p>Znowu wymazuję, a wtedy</p>
  <hr />
  <p>Mak zakwita.</p>
</article>
```

Haiku zawiera tylko trzy linie, ale twoje rozwiązanie powinno działać dla dowolnej liczby linii. Zauważ, że elementy `<hr />` pojawiają się tylko *pomiędzy* elementami `<p>` , nie na początku czy na końcu!

<Sandpack>

```js
const poem = {
  lines: [
    'Piszę, wymazuję, przepisuję',
    'Znowu wymazuję, a wtedy',
    'Mak zakwita.'
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

To rzadki przypadek, w którym indeks użyty jako klucz jest akceptowalny, ponieważ linie wiersza nigdy nie zmienią kolejności.

<Hint>

Będziesz musieć albo przekształcić wywołanie funkcji `map()` w pętlę manualną, albo użyć Fragmentu.

</Hint>

<Solution>

Możesz napisać pętlę manualną, dodając `<hr />` i `<p>...</p>` do tablicy wynikowej w miarę postępu:

<Sandpack>

```js
const poem = {
  lines: [
    'Piszę, wymazuję, przepisuję',
    'Znowu wymazuję, a wtedy',
    'Mak zakwita.'
  ]
};

export default function Poem() {
  let output = [];

  // Uzupełnij tablicę wynikową
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
  // Usuń pierwszy element <hr />
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

Wykorzystanie oryginalnego indeksu linii jako `key` już nie zadziała, ponieważ każdy separator i akapit znajdują się teraz w tej samej tablicy. Niemniej jednak możesz nadać każdemu z nich odrębny klucz, dodając sufiks, np. `key={i + '-text'}`.

Ewentualnie, możesz wyrenderować kolekcję Fragmentów, które zawierają `<hr />` i `<p>...</p>`. Jednak skrócona składnia `<>...</>` nie wspiera przekazywania kluczy, więc musisz użyć składni `<Fragment>`:

<Sandpack>

```js
import { Fragment } from 'react';

const poem = {
  lines: [
    'Piszę, wymazuję, przepisuję',
    'Znowu wymazuję, a wtedy',
    'Mak zakwita.'
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

Pamiętaj, że Fragmenty (często zapisywane jako `<> </>`) pozwalają grupować węzły JSX bez dodawania elementów `<div>`!

</Solution>

</Challenges>
