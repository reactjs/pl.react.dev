---
title: Opisywanie UI
---

<Intro>

React jest biblioteką javascriptową służącą do renderowania interfejsu użytkownika (UI). UI jest zbudowany z małych części, np. przyciski, tekst czy obrazki. React pozwala zgrupować je w *komponenty*, które można zagnieżdżać i używać ich wielokrotnie. Zarówno na stronach internetowych, jak i w aplikacjach mobilnych, wszystko, co znajduje się na ekranie, można rozbić na osobne komponenty. W tym rozdziale nauczysz się tworzyć, modyfikować i wyświetlać warunkowo komponenty reactowe.

</Intro>

<YouWillLearn isChapter={true}>

* [Jak napisać swój pierwszy komponent](/learn/your-first-component)
* [Kiedy i jak tworzyć wielokomponentowe pliki](/learn/importing-and-exporting-components)
* [Jak dodać znaczniki do JavaScriptu za pomocą JSX](/learn/writing-markup-with-jsx)
* [Jak używać nawiasów klamrowych w JSX w celu dostania się do funkcjonalności javascriptowej z poziomu komponentu](/learn/javascript-in-jsx-with-curly-braces)
* [Jak skonfigurować komponenty za pomocą właściwości](/learn/passing-props-to-a-component)
* [Jak wyrenderować komponenty warunkowo](/learn/conditional-rendering)
* [Jak wyrenderować wiele komponentów jednocześnie](/learn/rendering-lists)
* [Jak unikać trudnych w zwalczaniu błędów poprzez tworzenie czystych komponentów](/learn/keeping-components-pure)

</YouWillLearn>

## Twój pierwszy komponent {/*your-first-component*/}

Aplikacje reactowe buduje się z odizolowanych od siebie kawałków UI zwanych *komponentami*. Komponent reactowy jest funkcją javascriptową, którą można "okrasić" znacznikami. Komponentem może być pojedynczy przycisk, ale także cała strona. Oto przykład komponentu o nazwie `Gallery`, renderującego komponenty `Profile`:

<Sandpack>

```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Niesamowici naukowcy</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

<LearnMore path="/learn/your-first-component">

Aby dowiedzieć się, jak deklarować i używać komponentów reactowych, przeczytaj rozdział pt. **[Twój pierwszy komponent](/learn/your-first-component)**.

</LearnMore>

## Importowanie i eksportowanie komponentów {/*importing-and-exporting-components*/}

W jednym pliku możesz zadeklarować wiele komponentów naraz, lecz duże pliki są trudne w czytaniu i utrzymaniu. Aby poradzić sobie z tym problemem, możesz *wyeksportować* komponent z jednego pliku, a następnie *zaimportować* go w innym:


<Sandpack>

```js App.js hidden
import Gallery from './Gallery.js';

export default function App() {
  return (
    <Gallery />
  );
}
```

```js Gallery.js active
import Profile from './Profile.js';

export default function Gallery() {
  return (
    <section>
      <h1>Niesamowici naukowcy</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```js Profile.js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}
```

```css
img { margin: 0 10px 10px 0; }
```

</Sandpack>

<LearnMore path="/learn/importing-and-exporting-components">

Aby dowiedzieć się więcej o wydzielaniu komponentów do osobnych plików, przeczytaj rozdział pt. **[Importowanie i eksportowanie komponentów](/learn/importing-and-exporting-components)**.

</LearnMore>

## Dodawanie znaczników w JSX {/*writing-markup-with-jsx*/}

Każdy komponent reactowy jest funkcją javascriptową, która może zawierać w sobie kod znaczników renderowany do przeglądarki. Komponenty reactowe używają rozszerzenia składni zwanego JSX w celu przedstawienia tego kodu znaczników. JSX wygląda bardzo podobnie do HTML-a, jednak jest nieco bardziej restrykcyjny i potrafi wyświetlać dynamiczne dane.

Jeśli tak po prostu wkleimy istniejący kod HTML do komponentu reactowego, nie zawsze będzie on działał:

<Sandpack>

```js
export default function TodoList() {
  return (
    // Nie do końca to zadziała!
    <h1>Lista zadań Hedy Lamarr</h1>
    <img
      src="https://i.imgur.com/yXOvdOSs.jpg"
      alt="Hedy Lamarr"
      class="photo"
    >
    <ul>
      <li>Wynaleźć nową sygnalizację świetlną
      <li>Przećwiczyć scenę do filmu
      <li>Usprawnić technologię rozpraszania widma
    </ul>
  );
}
```

```css
img { height: 90px; }
```

</Sandpack>

Jeśli posiadasz już kod HTML, możesz go przekształcić automatycznie za pomocą [konwertera](https://transform.tools/html-to-jsx):

<Sandpack>

```js
export default function TodoList() {
  return (
    <>
      <h1>Lista zadań Hedy Lamarr</h1>
      <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        className="photo"
      />
      <ul>
        <li>Wynaleźć nową sygnalizację świetlną</li>
        <li>Przećwiczyć scenę do filmu</li>
        <li>Usprawnić technologię rozpraszania widma</li>
      </ul>
    </>
  );
}
```

```css
img { height: 90px; }
```

</Sandpack>

<LearnMore path="/learn/writing-markup-with-jsx">

Aby dowiedzieć się jak poprawnie pisać kod JSX-owy, przeczytaj rozdział pt. **[Pisanie kodu w JSX](/learn/writing-markup-with-jsx)**.

</LearnMore>

## JavaScript w JSX a nawiasy klamrowe {/*javascript-in-jsx-with-curly-braces*/}

JSX pozwala na pisanie kodu podobnego do HTML-a wewnątrz pliku javascriptowego, umożliwiając trzymanie logiki renderowania i treści jednym miejscu. Czasem jednak zachodzi potrzeba, by w kodzie znaczników dodać nieco logiki javascriptowej lub odnieść się do dynamicznej własności. W takiej sytuacji możemy użyć nawiasów klamrowych, otwierając tym samym okno do świata JavaScriptu:

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name} - lista zadań</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Usprawnić wideotelefon</li>
        <li>Przygotować wykłady o aeronautyce</li>
        <li>Opracować silnik napędzany alkoholem</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

<LearnMore path="/learn/javascript-in-jsx-with-curly-braces">

Aby dowiedzieć się więcej na temat dostępu do danych javascriptowych z poziomu kodu JSX, przeczytaj rozdział pt. **[JavaScript w JSX a nawiasy klamrowe](/learn/javascript-in-jsx-with-curly-braces)**.

</LearnMore>

## Przekazywanie wartości do komponentu {/*passing-props-to-a-component*/}

Komponenty reactowe komunikują się ze sobą za pomocą *właściwości* (ang. *props*). Każdy komponent-rodzic może przekazać informacje do swoich potomków właśnie poprzez właściwości. Właściwości mogą kojarzyć ci się z atrybutami HTML-owymi, jednak przez właściwości możesz przekazać dowolną wartość javascriptową, nawet obiekty, tablice, funkcje czy sam kod JSX!

<Sandpack>

```js
import { getImageUrl } from './utils.js'

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

```

```js utils.js
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.card {
  width: fit-content;
  margin: 5px;
  padding: 5px;
  font-size: 20px;
  text-align: center;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.avatar {
  margin: 20px;
  border-radius: 50%;
}
```

</Sandpack>

<LearnMore path="/learn/passing-props-to-a-component">

Aby dowiedzieć się, jak przekazywać i odczytywać właściwości, przeczytaj rozdział pt. **[Przekazywanie wartości do komponentu](/learn/passing-props-to-a-component)**.

</LearnMore>

## Renderowanie warunkowe {/*conditional-rendering*/}

Twoje komponenty często będą musiały wyświetlać różne rzeczy w zależności od okoliczności. W Reakcie możesz wyrenderować kod JSX-owy warunkowo używając składni javascriptowej: instrukcji `if` oraz operatorów `&&` i `? :`.

W tym przykładzie użyliśmy operatora `&&` do warunkowego wyrenderowania tzw. "ptaszka":

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✔'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Lista rzeczy do spakowania Sally Ride</h1>
      <ul>
        <Item
          isPacked={true}
          name="Skafander kosmiczny"
        />
        <Item
          isPacked={true}
          name="Hełm ze złotym liściem"
        />
        <Item
          isPacked={false}
          name="Zdjęcie Tam"
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

<LearnMore path="/learn/conditional-rendering">

Aby poznać różne sposoby renderowania warunkowego, przeczytaj rozdział pt. **[Renderowanie warunkowe](/learn/conditional-rendering)**.

</LearnMore>

## Renderowanie list {/*rendering-lists*/}

Na pewno często zdarzy ci się wyświetlić kilka podobnych komponentów na podstawie jakiejś kolekcji danych. W Reakcie możesz użyć javascriptowych funkcji `filter()` i `map()`, aby przekształcić tablicę danych w tablicę komponentów.

Dla każdego elementu tablicy musisz określić `key` (pol. *klucz*). Zwykle używa się w tym celu ID pobranego z bazy. Klucze umożliwiają Reactowi śledzenie pozycji każdego z elementów listy w sytuacji, gdy ulega ona zmianie.

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
        znany(-a) za {person.accomplishment}
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

```js data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'matematyczka',
  accomplishment: 'obliczenia dot. lotów kosmicznych',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemik',
  accomplishment: 'odkrycie dziury ozonowej na Arktyce',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'fizyk',
  accomplishment: 'teoria elektromagnetyzmu',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemik',
  accomplishment: 'pionier w dziedzinie leków kortyzonowych, sterydowych i tabletek antykoncepcyjnych',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrofizyk',
  accomplishment: 'sposób liczenia masy białych karłów (gwiazd)',
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
  grid-template-columns: 1fr 1fr;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
h1 { font-size: 22px; }
h2 { font-size: 20px; }
```

</Sandpack>

<LearnMore path="/learn/rendering-lists">

Aby dowiedzieć się jak wyrenderować listę komponentów i jak wybrać odpowiednie klucze, przeczytaj rozdział pt. **[Renderowanie list](/learn/rendering-lists)**.

</LearnMore>

## Czyste komponenty {/*keeping-components-pure*/}

W JavaScripcie niektóre funkcje są *czyste*. Czysta funkcja:

* **Zajmuje się tylko swoimi sprawami.** Nie zmienia żadnych obiektów ani zmiennych, które istniały przed jej wywołaniem.
* **To samo wejście, to samo wyjście.** Dla takich samych danych wejściowych czysta funkcja zawsze zwraca ten sam wynik.

Pisząc komponenty w formie czystych funkcji możesz ustrzec się przed masą kłopotliwych błędów i nieprzewidywalnych zachowań w razie rozrostu projektu. Poniżej przedstawiliśmy przykład komponentu nieczystego:

<Sandpack>

```js
let guest = 0;

function Cup() {
  // Źle: zmienia istniejącą wcześniej zmienną!
  guest = guest + 1;
  return <h2>Herbatka dla gościa #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
```

</Sandpack>

Możesz przekształcić ten komponent w czysty przekazując mu właściwość zamiast modyfikować istniejącą już zmienną:

<Sandpack>

```js
function Cup({ guest }) {
  return <h2>Herbatka dla gościa #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
```

</Sandpack>

<LearnMore path="/learn/keeping-components-pure">

Aby dowiedzieć się jak pisać czyste funkcje o łatwym do przewidzenia wyniku działania, przeczytaj rozdział pt. **[Czyste komponenty](/learn/keeping-components-pure)**.

</LearnMore>

## Co dalej? {/*whats-next*/}

Zacznij od rozdziału pt. [Twój pierwszy komponent](/learn/your-first-component)!

Albo, jeśli znasz już ten temat od podszewki, może chcesz dowiedzieć się, jak [dodać interaktywność](/learn/adding-interactivity) w aplikacji?
