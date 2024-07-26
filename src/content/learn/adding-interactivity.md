---
title: Dodawanie interaktywności
---

<Intro>

Niektóre elementy na ekranie aktualizują się w odpowiedzi na interakcje użytkownika. Na przykład kliknięcie w galerię obrazów zmienia aktywny obraz. W Reakcie dane, które zmieniają się w czasie, nazywane są *stanem* (ang. _state_).  Możesz dodać stan do każdego komponentu i aktualizować go w razie potrzeby. W tym rozdziale nauczysz się, jak pisać komponenty obsługujące interakcje, aktualizujące swój stan i wyświetlające różne wyniki w czasie.

</Intro>

<YouWillLearn isChapter={true}>

* [Jak obsługiwać zdarzenia inicjowane przez użytkownika](/learn/responding-to-events)
* [Jak sprawić, aby komponenty "pamiętały" informacje za pomocą stanu](/learn/state-a-components-memory)
* [Jak React aktualizuje interfejs użytkownika w dwóch fazach](/learn/render-and-commit)
* [Dlaczego stan nie aktualizuje się od razu po jego zmianie](/learn/state-as-a-snapshot)
* [Jak kolejkować wiele aktualizacji stanu](/learn/queueing-a-series-of-state-updates)
* [Jak zaktualizować obiekt w stanie](/learn/updating-objects-in-state)
* [Jak zaktualizować tablicę w stanie](/learn/updating-arrays-in-state)

</YouWillLearn>

## Reagowanie na zdarzenia {/*responding-to-events*/}

React pozwala na dodawanie *procedur obsługi zdarzeń* (ang. _event handlers_) do twojej składni JSX. Procedury obsługi zdarzeń to twoje własne funkcje, które zostaną wywołane w odpowiedzi na interakcje użytkownika, takie jak kliknięcia, najechanie kursorem, skupienie na elementach formularza i inne.

Wbudowane komponenty, takie jak `<button>`, obsługują jedynie wbudowane zdarzenia przeglądarki, takie jak `onClick`. Jednakże możesz też tworzyć własne komponenty i nadawać ich właściwościom obsługującym zdarzenia dowolne nazwy specyficzne dla twojej aplikacji.

<Sandpack>

```js
export default function App() {
  return (
    <Toolbar
      onPlayMovie={() => alert('Odtwarzanie!')}
      onUploadImage={() => alert('Wgrywanie!')}
    />
  );
}

function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}>
        Odtwórz film
      </Button>
      <Button onClick={onUploadImage}>
        Wgraj obraz
      </Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>

<LearnMore path="/learn/responding-to-events">

Przeczytaj **[Reagowanie na zdarzenia](/learn/responding-to-events)**, aby dowiedzieć się, jak dodawać procedury obsługi zdarzeń.

</LearnMore>

## Stan - pamięć komponentu {/*state-a-components-memory*/}

Komponenty często muszą zmieniać to, co jest wyświetlane na ekranie w wyniku interakcji. Wpisywanie w formularzu powinno aktualizować jego pole, kliknięcie "następny" w kolejce obrazów powinno zmieniać wyświetlany obraz, kliknięcie "kup" powinno umieścić produkt w koszyku. Komponenty muszą "pamiętać" różne rzeczy: bieżącą wartość pola, bieżący obraz, zawartość koszyka. W Reakcie tego rodzaju pamięć specyficzna dla komponentu nazywana jest *stanem*.

Możesz dodać stan do komponentu za pomocą hooka [`useState`](/reference/react/useState). *Hooki* to specjalne funkcje, które pozwalają twoim komponentom korzystać z funkcjonalności Reacta (stan jest jedną z tych funkcjonalności). Hook `useState` pozwala zadeklarować zmienną stanu. Przyjmuje on stan początkowy i zwraca parę wartości: bieżący stan oraz funkcję ustawiającą stan, która pozwala na jego aktualizację.

```js
const [index, setIndex] = useState(0);
const [showMore, setShowMore] = useState(false);
```

Oto jak galeria obrazów wykorzystuje i aktualizuje stan po kliknięciu:

<Sandpack>

```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const hasNext = index < sculptureList.length - 1;

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Następny
      </button>
      <h2>
        <i>{sculpture.name} </i>
        autorstwa {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Ukryj' : 'Pokaż'} detale
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img
        src={sculpture.url}
        alt={sculpture.alt}
      />
    </>
  );
}
```

```js src/data.js
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Chociaż Colvin jest głównie znana z abstrakcyjnych tematów nawiązujących do symboli prekolumbijskich, ta gigantyczna rzeźba, hołd dla neurochirurgii, jest jednym z jej najbardziej rozpoznawalnych dzieł sztuki publicznej.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'Brązowy posąg dwóch skrzyżowanych rąk delikatnie trzymających ludzki mózg w opuszkach palców.'
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'Ten ogromny (75 stóp lub 23 m) srebrny kwiat znajduje się w Buenos Aires. Jest zaprojektowany w taki sposób, aby się poruszać, zamykając swoje płatki wieczorem lub podczas silnych wiatrów, a otwierając je rano.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'Gigantyczna metalowa rzeźba kwiatu z refleksyjnymi płatkami przypominającymi lustro i mocnymi pręcikami.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson był znany ze swojego zainteresowania równością, sprawiedliwością społeczną, a także istotnymi i duchownymi cechami ludzkości. Ta ogromna (7 stóp lub 2,13 m) rzeźba z brązu przedstawia to, co opisał jako "symboliczną czarną obecność nasyconą poczuciem uniwersalnej ludzkości".',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'Rzeźba przedstawiająca ludzką głowę wydaje się być zawsze obecna i poważna. Promieniuje spokojem i harmonią.'
}, {
  name: 'Moai',
  artist: 'nieznanego',
  description: 'Na Wyspie Wielkanocnej znajduje się 1000 moai, czyli monumentalnych posągów stworzonych przez wczesnych ludzi Rapa Nui, które niektórzy uważają za przedstawienia deifikowanych przodków.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Trzy monumentalne kamienne popiersia z głowami, które są nieproporcjonalnie duże, o smutnych twarzach.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'Nany to tryumfujące stworzenia, symbole kobiecości i macierzyństwa. Początkowo, Saint Phalle używała tkanin i znalezionych przedmiotów do tworzenia Nan, a później wprowadziła poliester, aby uzyskać bardziej żywy efekt.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'Duża mozaikowa rzeźba cudacznej, tańczącej kobiecej figury w kolorowym kostiumie, emanująca radością.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'Ta abstrakcyjna rzeźba z brązu jest częścią serii "The Family of Man" znajdującej się w Yorkshire Sculpture Park. Hepworth zdecydowała się nie tworzyć dosłownych reprezentacji świata, lecz opracowała abstrakcyjne formy inspirowane ludźmi i krajobrazami.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'Wysoka rzeźba składająca się z trzech elementów ułożonych jeden na drugim, przypominająca ludzką postać.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: 'Pochodzący z rodziny czterech pokoleń rzeźbiarzy w drewnie, prace Fakeye’a łączyły tradycyjne i współczesne motywy yoruba.',
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'Skrupulatna rzeźba w drewnie przedstawiająca wojownika z skoncentrowaną twarzą na koniu ozdobionym wzorami.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: 'Szapocznikow jest znana ze swoich rzeźb przedstawiających fragmenty ciała jako metaforę kruchości i nietrwałości młodości oraz piękna. Ta rzeźba przedstawia dwa bardzo realistyczne, duże brzuchy ułożone jeden na drugim, każdy o wysokości około pięciu stóp (1,5 m).',
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'Rzeźba przypomina kaskadę fałd, znacznie różniącą się od brzuchów w klasycznych rzeźbach.'
}, {
  name: 'Terakotowa Armia',
  artist: 'nieznanego',
  description: 'Terakotowa Armia to zbiór rzeźb z terakoty przedstawiających armię Qin Shi Huanga, pierwszego cesarza Chin. Armia składała się z ponad 8 000 żołnierzy, 130 wozów z 520 końmi oraz 150 koni kawaleryjskich.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 rzeźb z terakoty przedstawiających poważnych wojowników, każdy z unikalnym wyrazem twarzy i zbroją.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson była znana z pozyskiwania przedmiotów z odpadów Nowego Jorku, które później łączyła w monumentalne konstrukcje. W tej pracy wykorzystała różne części, takie jak noga łóżka, kij do żonglowania i fragment siedzenia, przybijając i klejąc je do pudełek, które odzwierciedlają wpływ geometrycznej abstrakcji kubizmu.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'Czarna matowa rzeźba, gdzie poszczególne elementy są początkowo nie do rozróżnienia.'
}, {
  name: 'Aureola',
  artist: 'Ranjani Shettar',
  description: 'Shettar łączy tradycję z nowoczesnością, naturę z przemysłem. Jej sztuka koncentruje się na relacji między człowiekiem a naturą. Jej prace opisywane są jako porywające zarówno w sensie abstrakcyjnym, jak i figuratywnym, nieważkie i jako „doskonała synteza nieoczywistych materiałów”.',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'Jasna rzeźba przypominająca drut, zamocowana na betonowej ścianie i opadająca na podłogę. Wydaje się lekka.'
}, {
  name: 'Hippos',
  artist: 'Ogród Zoologiczny w Taipei',
  description: 'Ogród Zoologiczny w Taipei zlecił stworzenie Placu Hipopotamów z zanurzoną w wodzie grupą bawiących się hipopotamów.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'Grupa rzeźb z brązu przedstawiająca hipopotamy wychodzące z chodnika, jakby pływały.'
}];
```

```css
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
 margin-top: 5px;
 font-weight: normal;
 font-size: 100%;
}
img { width: 120px; height: 120px; }
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

<LearnMore path="/learn/state-a-components-memory">

Przeczytaj **[Stan - Pamięć komponentu](/learn/state-a-components-memory)**, aby dowiedzieć się, jak zapamiętywać wartość i aktualizować ją podczas interakcji.

</LearnMore>

## Renderowanie i aktualizowanie {/*render-and-commit*/}

Zanim twoje komponenty zostaną wyświetlone na ekranie, muszą zostać wyrenderowane przez Reacta. Zrozumienie kroków w tym procesie pomoże ci zrozumieć, jak wykonuje się twój kod i wyjaśnić jego działanie.

Wyobraź sobie, że twoje komponenty to kucharze w kuchni, którzy przygotowują smaczne dania z dostępnych składników. W tej sytuacji React jest kelnerem, który przyjmuje zamówienia od klientów i przynosi im zamówione potrawy. Ten proces zgłaszania i obsługi interfejsu użytkownika składa się z trzech kroków:

1. **Wywołanie (ang. _triggering_)** renderowania (przekazanie zamówienia od gościa do kuchni)
2. **Renderowanie (ang. _rendering_)** komponentu (przygotowanie zamówienia w kuchni)
3. **Aktualizowanie (ang. _committing_)** drzewa DOM (umieszczenie zamówienia na stole)

<IllustrationBlock sequential>
  <Illustration caption="Wywołanie" alt="React jako kelner w restauracji, pobierający zamówienia od użytkowników i dostarczający je do Kuchni Komponentów." src="/images/docs/illustrations/i_render-and-commit1.png" />
  <Illustration caption="Renderowanie" alt="Kucharz komponentu Card przekazuje Reactowi świeży komponent Card." src="/images/docs/illustrations/i_render-and-commit2.png" />
  <Illustration caption="Aktualizowanie" alt="React dostarcza komponent Card użytkownikowi do jego stołu." src="/images/docs/illustrations/i_render-and-commit3.png" />
</IllustrationBlock>

<LearnMore path="/learn/render-and-commit">

Przeczytaj **[Renderowanie i aktualizowanie](/learn/render-and-commit)**, aby dowiedzieć się o cyklu życia aktualizacji interfejsu użytkownika.

</LearnMore>

## Stan jako migawka {/*state-as-a-snapshot*/}

W przeciwieństwie do zwykłych zmiennych javascriptowych, stan w Reakcie zachowuje się bardziej jak migawka. Ustawienie stanu nie zmienia już istniejącej zmiennej stanu, lecz wywołuje przerenderowanie. Może to być na początki zaskakujące!

```js
console.log(count);  // 0
setCount(count + 1); // Żądanie ponownego renderowania z wartością 1
console.log(count);  // Nadal 0!
```

To zachowanie pomaga unikać subtelnych błędów. Oto mała aplikacja do czatu. Spróbuj zgadnąć, co się stanie, jeśli najpierw naciśniesz "Wyślij", a *potem* zmienisz odbiorcę na Boba. Czyje imię pojawi się w `alert` pięć sekund później?

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [to, setTo] = useState('Alice');
  const [message, setMessage] = useState('Cześć');

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      alert(`Wysłano wiadomość "${message}" do użytkownika ${to}`);
    }, 5000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        To:{' '}
        <select
          value={to}
          onChange={e => setTo(e.target.value)}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </label>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Wyślij</button>
    </form>
  );
}
```

```css
label, textarea { margin-bottom: 10px; display: block; }
```

</Sandpack>


<LearnMore path="/learn/state-as-a-snapshot">

Przeczytaj **[Stan jako migawka](/learn/state-as-a-snapshot)**, aby dowiedzieć się, dlaczego stan wydaje się być "ustalony" i niezmienny wewnątrz funkcji obsługujących zdarzenia.

</LearnMore>

## Kolejkowanie serii aktualizacji stanu {/*queueing-a-series-of-state-updates*/}

Ten komponent zawiera błąd: kliknięcie "+3" zwiększa wynik tylko raz.

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [score, setScore] = useState(0);

  function increment() {
    setScore(score + 1);
  }

  return (
    <>
      <button onClick={() => increment()}>+1</button>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <h1>Wynik: {score}</h1>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
```

</Sandpack>

**[Stan jako migawka](/learn/state-as-a-snapshot)** wyjaśnia, dlaczego tak się dzieje. Ustawienie stanu tworzy żądanie nowego przerenderowania, ale nie zmienia tego stanu w już działającym kodzie. Dlatego `score` nadal wynosi `0` tuż po wywołaniu `setScore(score + 1)`.

```js
console.log(score);  // 0
setScore(score + 1); // setScore(0 + 1);
console.log(score);  // 0
setScore(score + 1); // setScore(0 + 1);
console.log(score);  // 0
setScore(score + 1); // setScore(0 + 1);
console.log(score);  // 0
```

Możesz naprawić to, przekazując *funkcję aktualizującą* (ang. _updater function_) podczas ustawiania stanu. Zauważ, jak zastąpienie `setScore(score + 1)` przez `setScore(s => s + 1)` naprawia przycisk "+3". Dzięki temu możesz kolejkować wiele aktualizacji stanu.

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [score, setScore] = useState(0);

  function increment() {
    setScore(s => s + 1);
  }

  return (
    <>
      <button onClick={() => increment()}>+1</button>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <h1>Wynik: {score}</h1>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
```

</Sandpack>

<LearnMore path="/learn/queueing-a-series-of-state-updates">

Przeczytaj **[Kolejkowanie serii aktualizacji stanu](/learn/queueing-a-series-of-state-updates)**, aby dowiedzieć się, jak kolejkować sekwencję aktualizacji stanu.

</LearnMore>

## Aktualizowanie obiektów w stanie {/*updating-objects-in-state*/}

Stan może przechowywać dowolne wartości javascriptowe, w tym obiekty. Nie powinno się jednak bezpośrednio zmieniać obiektów i tablic, które przechowuje się w stanie Reacta. Zamiast tego, gdy chcesz zaktualizować obiekt lub tablicę, musisz stworzyć nowy obiekt (lub skopiować istniejący), a następnie zaktualizować stan, aby używał tej kopii.

Zazwyczaj używa się składni rozproszenia (ang. _spread syntax_) `...`, aby skopiować obiekty i tablice, które chcesz zmienić. Na przykład, aktualizacja zagnieżdżonego obiektu może wyglądać tak:

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
        Imię:
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
        Obraz:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' autorstawa '}
        {person.name}
        <br />
        (położone w mieście {person.artwork.city})
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

Jeśli kopiowanie obiektów w kodzie staje się uciążliwe, możesz użyć biblioteki takiej jak [Immer](https://github.com/immerjs/use-immer), aby zmniejszyć ilość powtarzającego się kodu:

<Sandpack>

```js
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
      <label>
        Imię:
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
        Obraz:
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
        (położone w mieście {person.artwork.city})
      </p>
      <img
        src={person.artwork.image}
        alt={person.artwork.title}
      />
    </>
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

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
img { width: 200px; height: 200px; }
```

</Sandpack>

<LearnMore path="/learn/updating-objects-in-state">

Przeczytaj **[Aktualizowanie obiektów w stanie](/learn/updating-objects-in-state)**, aby dowiedzieć się, jak poprawnie aktualizować obiekty.

</LearnMore>

## Aktualizowanie tablic w stanie {/*updating-arrays-in-state*/}

Arrays are another type of mutable JavaScript objects you can store in state and should treat as read-only. Just like with objects, when you want to update an array stored in state, you need to create a new one (or make a copy of an existing one), and then set state to use the new array:

<Sandpack>

```js
import { useState } from 'react';

const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [list, setList] = useState(
    initialList
  );

  function handleToggle(artworkId, nextSeen) {
    setList(list.map(artwork => {
      if (artwork.id === artworkId) {
        return { ...artwork, seen: nextSeen };
      } else {
        return artwork;
      }
    }));
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
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

</Sandpack>

If copying arrays in code gets tedious, you can use a library like [Immer](https://github.com/immerjs/use-immer) to reduce repetitive code:

<Sandpack>

```js
import { useState } from 'react';
import { useImmer } from 'use-immer';

const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
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
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
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

<LearnMore path="/learn/updating-arrays-in-state">

Read **[Aktualizowanie tablic w stanie](/learn/updating-arrays-in-state)** to learn how to update arrays correctly.

</LearnMore>

## What's next? {/*whats-next*/}

Head over to [Responding to Events](/learn/responding-to-events) to start reading this chapter page by page!

Or, if you're already familiar with these topics, why not read about [Managing State](/learn/managing-state)?
