<<<<<<< HEAD
---
title: Przekazywanie wartości do komponentu
---

<Intro>

Komponenty reactowe używają **właściwości** (_ang._ props, od "properties") do komunikowania się między sobą. Każdy komponent nadrzędny może przekazać informacje do własnych potomków poprzez właściwości. Właściwości mogą kojarzyć się z atrybutami HTML-owymi, jednak różnica polega na tym, że przez właściwości można przekazywać dowolne wartości javascriptowe, w tym obiekty, tablice czy funkcje.

</Intro>

<YouWillLearn>

* Jak przekazać wartości do komponentu
* Jak odczytać właściwości komponentu
* Jak określić domyślną wartość dla właściwości
* Jak przekazać kod JSX-owy do komponentu
* Jak właściwości zmieniają się w czasie

</YouWillLearn>

## Właściwości, które możesz już znać {/*familiar-props*/}

Właściwości (_ang._ props) to informacje, które przekazujemy znacznikowi JSX-owemu. Na przykład, znacznikowi `<img>` możemy przekazać właściwości `className`, `src`, `alt`, `width` czy `height`:

<Sandpack>

```js
function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return (
    <Avatar />
  );
}
```

```css
body { min-height: 120px; }
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

Właściwości, które możesz przekazać do znacznika `<img>`, są predefiniowane (ReactDOM przestrzega [standardu HTML](https://www.w3.org/TR/html52/semantics-embedded-content.html#the-img-element)). Jednak do *własnych* komponentów, np. `<Avatar>`, możesz przekazać dowolne właściwości!

## Przekazywanie wartości do komponentu {/*passing-props-to-a-component*/}

W poniższym kodzie komponent `Profile` nie przekazuje swojemu potomkowi `Avatar` żadnych wartości:

```js
export default function Profile() {
  return (
    <Avatar />
  );
}
```

Aby dodać do komponentu `Avatar` właściwości, wystarczą dwa kroki.

### Krok 1: Przekaż właściwości do komponentu potomnego {/*step-1-pass-props-to-the-child-component*/}

Najpierw przekażmy do komponentu `Avatar` jakieś wartości. Na przykład, niech będą to `person` (obiekt) oraz `size` (liczba):

```js
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
```

> Jeśli nie wiesz lub nie pamiętasz, o co chodzi z podwójnymi nawiasami klamrowymi za `person=`: [to po prostu obiekt](/learn/javascript-in-jsx-with-curly-braces#using-double-curlies-css-and-other-objects-in-jsx) zapisany wewnątrz JSX-owych klamerek.

Teraz możemy odczytać te wartości wewnątrz komponentu `Avatar`.

### Krok 2: Odczytaj wartości wewnątrz komponentu potomnego {/*step-2-read-props-inside-the-child-component*/}

Aby odczytać te właściwości, wypiszmy ich nazwy oddzielone przecinkiem i zapisane wewnątrz `({` oraz `})` zaraz po słowach `function Avatar`. Dzięki temu będziemy mogli odwołać się do nich jak do zmiennych.

```js
function Avatar({ person, size }) {
  // tutaj można używać person i size
}
```

Teraz wystarczy dodać do komponentu `Avatar` logikę, która używa właściwości `person` i `size` do renderowania - i gotowe!

To, co wyrenderuje `Avatar`, możemy kontrolować na wiele różnych sposobów, przekazując różne wartości dla właściwości. Spróbuj zmienić którąś z nich!

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

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

export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi', 
          imageId: 'YfeOqp2'
        }}
      />
      <Avatar
        size={80}
        person={{
          name: 'Aklilu Lemma', 
          imageId: 'OKS67lh'
        }}
      />
      <Avatar
        size={50}
        person={{ 
          name: 'Lin Lanying',
          imageId: '1bX5QH6'
        }}
      />
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
body { min-height: 120px; }
.avatar { margin: 10px; border-radius: 50%; }
```

</Sandpack>

Właściwości pozwalają myśleć o komponentach nadrzędnych i potomnych jako o bytach niezależnych. Możemy, na przykład, zmienić wartości przekazywane przez właściwości `person` i `size` w `Profile` i nie musimy wiedzieć, jak `Avatar` z nich korzysta. Podobnie możemy zmienić sposób użycia tych wartości w `Avatar` bez patrzenia na kod `Profile`.

Możesz myśleć o właściwościach jak o "pokrętłach", którymi można sterować. Pełnią taką samą rolę co argumenty w funkcjach - tak naprawdę właściwości _są_ jedynym argumentem dla komponentu! Funkcyjne komponenty reactowe przyjmują jeden argument - obiekt `props`:

```js
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

Zwykle jednak nie ma potrzeby korzystać z samego obiektu `props`, dlatego zazwyczaj się je destrukturyzuje na poszczególne właściwości.

<Gotcha>

**Nie zapomnij o parze klamer `{` i `}`** wewnątrz nawiasów okrągłych `(` i `)`:

```js
function Avatar({ person, size }) {
  // ...
}
```

Powyższy zapis nazywamy ["destrukturyzacją"](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Unpacking_fields_from_objects_passed_as_a_function_parameter). Jest on równoważny do odczytu właściwości z parametru funkcji:

```js
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

</Gotcha>

## Określanie domyślnej wartości dla właściwości {/*specifying-a-default-value-for-a-prop*/}

Jeśli chcesz nadać właściwości domyślną wartość, która będzie użyta za każdym razem, gdy nie przekażemy żadnej wartości do komponentu, możesz to zrobić dodając do zapisu destrukturyzującego symbol `=` i podając po nim wartość domyślną:

```js
function Avatar({ person, size = 100 }) {
  // ...
}
```

Teraz gdy wyrenderujemy `<Avatar person={...} />` bez podawania właściwości `size`, zostanie ona ustawiona na wartość `100`.

Wartość domyślna jest używana tylko wtedy, gdy właściwość `size` zostanie pominięta lub otrzyma wartość `size={undefined}`. Jeśli jednak przekażesz `size={null}` lub `size={0}`, domyślna wartość **nie** zostanie użyta.

## Przekazywanie właściwości za pomocą operatora rozwinięcia {/*forwarding-props-with-the-jsx-spread-syntax*/}

Niekiedy przekazywanie właściwości może okazać się bardzo uciążliwe:

```js
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```

Ogólnie rzecz biorąc, nie ma niczego złego w powtarzającym się kodzie - czasami może to nawet pozytywnie wpłynąć na jego czytelność. Z reguły jednak zależy nam na zwięzłości. Niektóre komponenty przekazują potomkom wszystkie swoje właściwości, jak to ma miejsce w przypadku `Profile` i `Avatar` poniżej. Z racji tego, że `Profile` nie korzysta z żadnej z właściwości, warto użyć operatora rozwinięcia (_ang._ spread operator):

```js
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

To sprawi, że wszystkie właściwości komponentu `Profile` trafią do `Avatar` bez konieczności wypisywania każdej z nich.

**Używaj operatora rozwinięcia z umiarem.** Jeśli nagminnie używasz go w niemal każdym komponencie, to coś jest nie tak. Zwykle świadczy to o potrzebie podzielenia komponentów i przekazania potomków jako JSX. Ale o tym za chwilę!

## Przekazywanie potomków jako JSX {/*passing-jsx-as-children*/}

Dość często można spotkać takie oto zagnieżdżenie wbudowanych znaczników przeglądarkowych:

```js
<div>
  <img />
</div>
```

W podobny sposób można także zagnieździć własne komponenty:

```js
<Card>
  <Avatar />
</Card>
```

Kiedy zagnieżdżasz jakiś kod wewnątrz znacznika JSX, komponent nadrzędny do tego kodu otrzyma go jako wartość we właściwości `children`. Dla przykładu, poniższy komponent `Card` otrzyma właściwość `children` ustawioną na `<Avatar />` i wyrenderuje ją wewnątrz kontenera `div`:

<Sandpack>

```js App.js
import Avatar from './Avatar.js';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

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
```

```js Avatar.js
import { getImageUrl } from './utils.js';

export default function Avatar({ person, size }) {
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

Spróbuj zastąpić `<Avatar>` wewnątrz `<Card>` jakimś tekstem, aby zobaczyć na własne oczy, że komponent `Card` może opakowywać dowolną treść. Nie musi on "wiedzieć", co renderuje. Ten wzorzec ma szerokie spektrum zastosowań i z pewnością spotkasz się z nim jeszcze nieraz.

Komponent z właściwością `children` można sobie wyobrazić jako taki z "dziurą", którą komponent nadrzędny może "zapełnić" dowolnym kodem JSX. Dość często stosuje się `children` w komponentach opakowujących coś wizualnie: panelach, siatkach itp. Więcej na ten temat dowiesz się w rozdziale pt. [Wyodrębnianie komponentów układających interfejs](/learn/extracting-layout-components).

<Illustration src="/images/docs/illustrations/i_children-prop.png" alt='Komponent Card w kształcie puzzla z miejscem na elementy "potomne" jak tekst czy Avatar' />

## Jak właściwości zmieniają się w czasie {/*how-props-change-over-time*/}

Komponent `Clock` przedstawiony poniżej otrzymuje od swojego "rodzica" dwie właściwości: `color` oraz `time`. (Celowo pominęliśmy tu kod rodzica, ponieważ korzysta on ze [stanu](/learn/state-a-components-memory), o którym będzie mowa w dalszych rozdziałach.)

Spróbuj zmienić kolor, wybierając opcję z poniższej listy rozwijanej:

<Sandpack>

```js Clock.js active
export default function Clock({ color, time }) {
  return (
    <h1 style={{ color: color }}>
      {time}
    </h1>
  );
}
```

```js App.js hidden
import { useState, useEffect } from 'react';
import Clock from './Clock.js';

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const time = useTime();
  const [color, setColor] = useState('lightcoral');
  return (
    <div>
      <p>
        Pick a color:{' '}
        <select value={color} onChange={e => setColor(e.target.value)}>
          <option value="lightcoral">lightcoral</option>
          <option value="midnightblue">midnightblue</option>
          <option value="rebeccapurple">rebeccapurple</option>
        </select>
      </p>
      <Clock color={color} time={time.toLocaleTimeString()} />
    </div>
  );
}
```

</Sandpack>

Ten przykład pokazuje, że **komponent może otrzymywać wartości właściwości zmienne w czasie.** Właściwości nie są zawsze statyczne! Tutaj wartość dla `time` zmienia się co sekundę, a dla `color` w momencie wybrania opcji z listy rozwijanej. Właściwości odzwierciedlają dane komponentu w określonym momencie, a nie tylko na początku.

Warto jednak pamiętać, że właściwości są [niemutowalne (_ang_. immutable)](https://en.wikipedia.org/wiki/Immutable_object) — określenie to pochodzi z informatyki i oznacza "niezmienność". Kiedy komponent chce zmienić swoje właściwości (na przykład w odpowiedzi na interakcję użytkownika lub nowe dane), musi "poprosić" swojego "rodzica", aby ten przekazał mu _inne wartości_ - czyli nowy obiekt! Wtedy stare właściwości zostaną zapomniane, a niedługo potem silnik JavaScriptu odzyska zajmowaną przez nie pamięć.

**Nie próbuj "zmieniać właściwości".** Kiedy zechcesz zareagować na dane wprowadzone przez użytkownika (jak np. zmiana wybranego koloru), musisz "ustawić stan", o czym nauczysz się w rozdziale pt. [Stan: Pamięć komponentu](/learn/state-a-components-memory).

<Recap>

* Aby przekazać właściwości, dodaj je do kodu JSX, tak jak to robisz z atrybutami w HTML-u.
* Aby odczytać wartości właściwości, użyj destrukturyzacji `function Avatar({ person, size })`.
* Możesz ustawić domyślną wartość, np. `size = 100`, która zostanie użyta, gdy właściwość nie ma wartości lub jest ona ustawiona na `undefined`.
* Możesz przekazać wszystkie właściwości za pomocą operatora rozwinięcia `<Avatar {...props} />`; ale nie nadużywaj tego sposobu!
* Zagnieżdżony kod JSX, jak np. `<Card><Avatar /></Card>`, zostanie przekazany do komponentu `Card` jako właściwość `children`.
* Właściwości są jak niezmienialne "migawki" z danego momentu w czasie: każde renderowanie komponentu dostarcza nową wersję właściwości.
* Nie można zmieniać wartości właściwości. Jeśli potrzebujesz interaktywności, musisz ustawiać stan.

</Recap>



<Challenges>

### Wyodrębnij komponent {/*extract-a-component*/}

Ten komponent `Gallery` zawiera bardzo podobny kod dla dwóch profili. Wyodrębnij z niego komponent `Profile`, aby zmniejszyć powtarzalność w kodzie. Następnie pomyśl, jakie właściwości należy przekazać do `Profile`.

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

export default function Gallery() {
  return (
    <div>
      <h1>Wybitni naukowcy</h1>
      <section className="profile">
        <h2>Maria Skłodowska-Curie</h2>
        <img
          className="avatar"
          src={getImageUrl('szV5sdG')}
          alt="Maria Skłodowska-Curie"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profesja: </b> 
            fizyka i chemia
          </li>
          <li>
            <b>Nagrody: 4 </b> 
            (Nagroda Nobla w dziedzinie fizyki, Nagroda Nobla w dziedzinie chemii, Medal Davy'ego, Medal Matteucciego)
          </li>
          <li>
            <b>Odkrycia: </b>
            polon (pierwiastek)
          </li>
        </ul>
      </section>
      <section className="profile">
        <h2>Katsuko Saruhashi</h2>
        <img
          className="avatar"
          src={getImageUrl('YfeOqp2')}
          alt="Katsuko Saruhashi"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profesja: </b> 
            geochemia
          </li>
          <li>
            <b>Nagrody: 2 </b> 
            (Nagroda Miyake w dziedzinie geochemii, Nagroda Tanaki)
          </li>
          <li>
            <b>Odkrycia: </b>
            metoda pomiaru dwutlenku węgla w wodzie morskiej
          </li>
        </ul>
      </section>
    </div>
  );
}
```

```js utils.js
export function getImageUrl(imageId, size = 's') {
  return (
    'https://i.imgur.com/' +
    imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 5px; border-radius: 50%; min-height: 70px; }
.profile {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}
h1, h2 { margin: 5px; }
h1 { margin-bottom: 10px; }
ul { padding: 0px 10px 0px 20px; }
li { margin: 5px; }
```

</Sandpack>

<Hint>

Zacznij od wyodrębnienia kodu dla jednej z naukowczyń. Następnie znajdź fragmenty, które nie pokrywają się z nim w drugim przykładzie, i przerób kod tak, aby dało się nimi sterować za pomocą właściwości.

</Hint>

<Solution>

W tym rozwiązaniu komponent `Profile` przyjmuje kilka właściwości: `imageId` (tekst), `name` (tekst), `profession` (tekst), `awards` (tablica napisów), `discovery` (tekst) oraz `imageSize` (liczba).

Zwróć uwagę, że właściwość `imageSize` ma wartość domyślną. To dlatego nie podajemy jej w `Gallery`.

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

function Profile({
  imageId,
  name,
  profession,
  awards,
  discovery,
  imageSize = 70
}) {
  return (
    <section className="profile">
      <h2>{name}</h2>
      <img
        className="avatar"
        src={getImageUrl(imageId)}
        alt={name}
        width={imageSize}
        height={imageSize}
      />
      <ul>
        <li><b>Profesja:</b> {profession}</li>
        <li>
          <b>Nagrody: {awards.length} </b>
          ({awards.join(', ')})
        </li>
        <li>
          <b>Odkrycia: </b>
          {discovery}
        </li>
      </ul>
    </section>
  );
}

export default function Gallery() {
  return (
    <div>
      <h1>Wybitni naukowcy</h1>
      <Profile
        imageId="szV5sdG"
        name="Maria Skłodowska-Curie"
        profession="fizyka i chemika"
        discovery="polon (pierwiastek chemiczny)"
        awards={[
          'Nagroda Nobla w dziedzinie fizyki',
          'Nagroda Nobla w dziedzinie chemii',
          'Medal Davy\'ego',
          'Medal Matteucciego'
        ]}
      />
      <Profile
        imageId='YfeOqp2'
        name='Katsuko Saruhashi'
        profession='geochemia'
        discovery="metoda pomiaru dwutlenku węgla w wodzie morskiej"
        awards={[
          'Nagroda Miyake w dziedzinie geochemii',
          'Nagroda Tanaki'
        ]}
      />
    </div>
  );
}
```

```js utils.js
export function getImageUrl(imageId, size = 's') {
  return (
    'https://i.imgur.com/' +
    imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 5px; border-radius: 50%; min-height: 70px; }
.profile {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}
h1, h2 { margin: 5px; }
h1 { margin-bottom: 10px; }
ul { padding: 0px 10px 0px 20px; }
li { margin: 5px; }
```

</Sandpack>

Zwróć uwagę, że nie potrzebujesz mieć osobnej właściwości `awardCount`, jeśli `awards` jest tablicą. Aby poznać liczbę nagród, możesz przecież odczytać wartość `awards.length`. Pamiętaj, że właściwości mogą przyjmować dowolne wartości, nawet tablice!

Inne rozwiązanie, nieco bardziej podobne do poprzednich przykładów na tej stronie, polega na zgrupowaniu wszystkich informacji w jeden obiekt, a następnie przekazaniu go jako jedna właściwość do komponentu:

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

function Profile({ person, imageSize = 70 }) {
  const imageSrc = getImageUrl(person)

  return (
    <section className="profile">
      <h2>{person.name}</h2>
      <img
        className="avatar"
        src={imageSrc}
        alt={person.name}
        width={imageSize}
        height={imageSize}
      />
      <ul>
        <li>
          <b>Profesja:</b> {person.profession}
        </li>
        <li>
          <b>Nagrody: {person.awards.length} </b>
          ({person.awards.join(', ')})
        </li>
        <li>
          <b>Odkrycia: </b>
          {person.discovery}
        </li>
      </ul>
    </section>
  )
}

export default function Gallery() {
  return (
    <div>
      <h1>Wybitni naukowcy</h1>
      <Profile person={{
        imageId: 'szV5sdG',
        name: 'Maria Skłodowska-Curie',
        profession: 'fizyka i chemia',
        discovery: 'polon (pierwiastek chemiczny)',
        awards: [
          'Nagroda Nobla w dziedzinie fizyki',
          'Nagroda Nobla w dziedzinie chemii',
          'Medal Davy\'ego',
          'Medal Matteucciego'
        ],
      }} />
      <Profile person={{
        imageId: 'YfeOqp2',
        name: 'Katsuko Saruhashi',
        profession: 'geochemia',
        discovery: 'metoda pomiaru dwutlenku węgla w wodzie morskiej',
        awards: [
          'Nagroda Miyake w dziedzinie geochemii',
          'Nagroda Tanaki'
        ],
      }} />
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
.avatar { margin: 5px; border-radius: 50%; min-height: 70px; }
.profile {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}
h1, h2 { margin: 5px; }
h1 { margin-bottom: 10px; }
ul { padding: 0px 10px 0px 20px; }
li { margin: 5px; }
```

</Sandpack>

Mimo że składnia tutaj wygląda nieco inaczej, ponieważ opisujemy właściwości obiektu javascriptowego, a nie serię atrybutów JSX-owych, obydwa przykłady są równoważne i możesz używać tego, który ci się bardziej podoba.

</Solution>

### Dostosuj rozmiar obrazka na podstawie właściwości {/*adjust-the-image-size-based-on-a-prop*/}

W kodzie poniżej `Avatar` otrzymuje właściwość numeryczną `size`, która określa szerokość i wysokość dla `<img>`. Właściwość `size` jest w tym przykładzie ustawiona na `40`. Jednakże, jeśli otworzysz obrazek w nowej karcie, zobaczysz, że jest on w rzeczywistości większy (`160` pikseli). Prawdziwy rozmiar obrazka jest określany na podstawie rozmiaru miniatury, o jaką prosisz.

Zmień komponent `Avatar` tak, aby ustawiał rozmiar obrazka na podstawie właściwości `size`. Konkretniej, jeśli `size` jest mniejszy niż `90`, przekaż wartość `'s'` ("small") zamiast `'b'` ("big") do funkcji `getImageUrl`. Sprawdź, czy twoje zmiany działają, renderując awatary z różnymi wartościami `size` i otwierając obrazki w nowej zakładce.

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person, 'b')}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <Avatar
      size={40}
      person={{ 
        name: 'Gregorio Y. Zara', 
        imageId: '7vQD0fP'
      }}
    />
  );
}
```

```js utils.js
export function getImageUrl(person, size) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

<Solution>

Oto możliwe rozwiązanie:

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  let thumbnailSize = 's';
  if (size > 90) {
    thumbnailSize = 'b';
  }
  return (
    <img
      className="avatar"
      src={getImageUrl(person, thumbnailSize)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <>
      <Avatar
        size={40}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
      <Avatar
        size={120}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
    </>
  );
}
```

```js utils.js
export function getImageUrl(person, size) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

Możesz także pokazać nieco ostrzejszą wersję obrazka dla ekranów z wysokim DPI, biorąc pod uwagę wartość [`window.devicePixelRatio`](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio):

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

const ratio = window.devicePixelRatio;

function Avatar({ person, size }) {
  let thumbnailSize = 's';
  if (size * ratio > 90) {
    thumbnailSize = 'b';
  }
  return (
    <img
      className="avatar"
      src={getImageUrl(person, thumbnailSize)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <>
      <Avatar
        size={40}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
      <Avatar
        size={70}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
      <Avatar
        size={120}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
    </>
  );
}
```

```js utils.js
export function getImageUrl(person, size) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

Właściwości pozwalają zamknąć logikę tego typu wewnątrz komponentu `Avatar` (i zmienić ją w razie potrzeb później), tak aby inni, korzystając z niego, nie musieli zastanawiać się, jak te obrazki są pobierane i jak dobierany jest ich rozmiar.

</Solution>

### Przekazywanie kodu JSX do właściwości `children` {/*passing-jsx-in-a-children-prop*/}

Wyodrębnij z poniższego kodu komponent `Card`, a następnie użyj właściwości `children` tak, by przekazać do niego inny kod JSX-owy:

<Sandpack>

```js
export default function Profile() {
  return (
    <div>
      <div className="card">
        <div className="card-content">
          <h1>Zdjęcie</h1>
          <img
            className="avatar"
            src="https://i.imgur.com/OKS67lhm.jpg"
            alt="Aklilu Lemma"
            width={70}
            height={70}
          />
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h1>O postaci</h1>
          <p>Aklilu Lemma był wybitnym etiopskim naukowcem, który wynalazł naturalny sposób leczenia schistosomatozy.</p>
        </div>
      </div>
    </div>
  );
}
```

```css
.card {
  width: fit-content;
  margin: 20px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.card-content {
  text-align: center;
}
.avatar {
  margin: 10px;
  border-radius: 50%;
}
h1 {
  margin: 5px;
  padding: 0;
  font-size: 24px;
}
```

</Sandpack>

<Hint>

Dowolny kod JSX, który napiszesz wewnątrz znacznika, zostanie przekazany do komponentu jako właściwość `children`.

</Hint>

<Solution>

Oto w jaki sposób można użyć komponentu `Card` w obu miejscach:

<Sandpack>

```js
function Card({ children }) {
  return (
    <div className="card">
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <div>
      <Card>
        <h1>Zdjęcie</h1>
        <img
          className="avatar"
          src="https://i.imgur.com/OKS67lhm.jpg"
          alt="Aklilu Lemma"
          width={100}
          height={100}
        />
      </Card>
      <Card>
        <h1>O postaci</h1>
        <p>Aklilu Lemma był wybitnym etiopskim naukowcem, który wynalazł naturalny sposób leczenia schistosomatozy.</p>
      </Card>
    </div>
  );
}
```

```css
.card {
  width: fit-content;
  margin: 20px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.card-content {
  text-align: center;
}
.avatar {
  margin: 10px;
  border-radius: 50%;
}
h1 {
  margin: 5px;
  padding: 0;
  font-size: 24px;
}
```

</Sandpack>

Możesz także stworzyć oddzielną właściwość `title`, jeśli chcesz, aby `Card` zawsze miał tytuł:

<Sandpack>

```js
function Card({ children, title }) {
  return (
    <div className="card">
      <div className="card-content">
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <div>
      <Card title="Zdjęcie">
        <img
          className="avatar"
          src="https://i.imgur.com/OKS67lhm.jpg"
          alt="Aklilu Lemma"
          width={100}
          height={100}
        />
      </Card>
      <Card title="O postaci">
        <p>Aklilu Lemma był wybitnym etiopskim naukowcem, który wynalazł naturalny sposób leczenia schistosomatozy.</p>
      </Card>
    </div>
  );
}
```

```css
.card {
  width: fit-content;
  margin: 20px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.card-content {
  text-align: center;
}
.avatar {
  margin: 10px;
  border-radius: 50%;
}
h1 {
  margin: 5px;
  padding: 0;
  font-size: 24px;
}
```

</Sandpack>

</Solution>

=======
---
title: Passing Props to a Component
---

<Intro>

React components use *props* to communicate with each other. Every parent component can pass some information to its child components by giving them props. Props might remind you of HTML attributes, but you can pass any JavaScript value through them, including objects, arrays, and functions.

</Intro>

<YouWillLearn>

* How to pass props to a component
* How to read props from a component
* How to specify default values for props
* How to pass some JSX to a component
* How props change over time

</YouWillLearn>

## Familiar props {/*familiar-props*/}

Props are the information that you pass to a JSX tag. For example, `className`, `src`, `alt`, `width`, and `height` are some of the props you can pass to an `<img>`:

<Sandpack>

```js
function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return (
    <Avatar />
  );
}
```

```css
body { min-height: 120px; }
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

The props you can pass to an `<img>` tag are predefined (ReactDOM conforms to [the HTML standard](https://www.w3.org/TR/html52/semantics-embedded-content.html#the-img-element)). But you can pass any props to *your own* components, such as `<Avatar>`, to customize them. Here's how!

## Passing props to a component {/*passing-props-to-a-component*/}

In this code, the `Profile` component isn't passing any props to its child component, `Avatar`:

```js
export default function Profile() {
  return (
    <Avatar />
  );
}
```

You can give `Avatar` some props in two steps.

### Step 1: Pass props to the child component {/*step-1-pass-props-to-the-child-component*/}

First, pass some props to `Avatar`. For example, let's pass two props: `person` (an object), and `size` (a number):

```js
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
```

> If double curly braces after `person=` confuse you, remember [they are merely an object](/learn/javascript-in-jsx-with-curly-braces#using-double-curlies-css-and-other-objects-in-jsx) inside the JSX curlies.

Now you can read these props inside the `Avatar` component.

### Step 2: Read props inside the child component {/*step-2-read-props-inside-the-child-component*/}

You can read these props by listing their names `person, size` separated by the commas inside `({` and `})` directly after `function Avatar`. This lets you use them inside the `Avatar` code, like you would with a variable.

```js
function Avatar({ person, size }) {
  // person and size are available here
}
```

Add some logic to `Avatar` that uses the `person` and `size` props for rendering, and you're done.

Now you can configure `Avatar` to render in many different ways with different props. Try tweaking the values!

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

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

export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi', 
          imageId: 'YfeOqp2'
        }}
      />
      <Avatar
        size={80}
        person={{
          name: 'Aklilu Lemma', 
          imageId: 'OKS67lh'
        }}
      />
      <Avatar
        size={50}
        person={{ 
          name: 'Lin Lanying',
          imageId: '1bX5QH6'
        }}
      />
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
body { min-height: 120px; }
.avatar { margin: 10px; border-radius: 50%; }
```

</Sandpack>

Props let you think about parent and child components independently. For example, you can change the `person` or the `size` props inside `Profile` without having to think about how `Avatar` uses them. Similarly, you can change how the `Avatar` uses these props, without looking at the `Profile`.

You can think of props like "knobs" that you can adjust. They serve the same role as arguments serve for functions—in fact, props _are_ the only argument to your component! React component functions accept a single argument, a `props` object:

```js
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

Usually you don't need the whole `props` object itself, so you destructure it into individual props.

<Gotcha>

**Don't miss the pair of `{` and `}` curlies** inside of `(` and `)` when declaring props:

```js
function Avatar({ person, size }) {
  // ...
}
```

This syntax is called ["destructuring"](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Unpacking_fields_from_objects_passed_as_a_function_parameter) and is equivalent to reading properties from a function parameter:

```js
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

</Gotcha>

## Specifying a default value for a prop {/*specifying-a-default-value-for-a-prop*/}

If you want to give a prop a default value to fall back on when no value is specified, you can do it with the destructuring by putting `=` and the default value right after the parameter:

```js
function Avatar({ person, size = 100 }) {
  // ...
}
```

Now, if `<Avatar person={...} />` is rendered with no `size` prop, the `size` will be set to `100`.

The default value is only used if the `size` prop is missing or if you pass `size={undefined}`. But if you pass `size={null}` or `size={0}`, the default value will **not** be used.

## Forwarding props with the JSX spread syntax {/*forwarding-props-with-the-jsx-spread-syntax*/}

Sometimes, passing props gets very repetitive:

```js
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```

There's nothing wrong with repetitive code—it can be more legible. But at times you may value conciseness. Some components forward all of their props to their children, like how this `Profile` does with `Avatar`. Because they don't use any of their props directly, it can make sense to use a more concise "spread" syntax:

```js
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

This forwards all of `Profile`'s props to the `Avatar` without listing each of their names.

**Use spread syntax with restraint.** If you're using it in every other component, something is wrong. Often, it indicates that you should split your components and pass children as JSX. More on that next!

## Passing JSX as children {/*passing-jsx-as-children*/}

It is common to nest built-in browser tags:

```js
<div>
  <img />
</div>
```

Sometimes you'll want to nest your own components the same way:

```js
<Card>
  <Avatar />
</Card>
```

When you nest content inside a JSX tag, the parent component will receive that content in a prop called `children`. For example, the `Card` component below will receive a `children` prop set to `<Avatar />` and render it in a wrapper div:

<Sandpack>

```js App.js
import Avatar from './Avatar.js';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

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
```

```js Avatar.js
import { getImageUrl } from './utils.js';

export default function Avatar({ person, size }) {
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

Try replacing the `<Avatar>` inside `<Card>` with some text to see how the `Card` component can wrap any nested content. It doesn't need to "know" what's being rendered inside of it. You will see this flexible pattern in many places.

You can think of a component with a `children` prop as having a "hole" that can be "filled in" by its parent components with arbitrary JSX. You will often use the `children` prop for visual wrappers: panels, grids, and so on. You can explore this in more detail in [Extracting Layout Components](/learn/extracting-layout-components).

<Illustration src="/images/docs/illustrations/i_children-prop.png" alt='A puzzle-like Card tile with a slot for "children" pieces like text and Avatar' />

## How props change over time {/*how-props-change-over-time*/}

The `Clock` component below receives two props from its parent component: `color` and `time`. (The parent component's code is omitted because it uses [state](/learn/state-a-components-memory), which we won't dive into just yet.)

Try changing the color in the select box below:

<Sandpack>

```js Clock.js active
export default function Clock({ color, time }) {
  return (
    <h1 style={{ color: color }}>
      {time}
    </h1>
  );
}
```

```js App.js hidden
import { useState, useEffect } from 'react';
import Clock from './Clock.js';

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const time = useTime();
  const [color, setColor] = useState('lightcoral');
  return (
    <div>
      <p>
        Pick a color:{' '}
        <select value={color} onChange={e => setColor(e.target.value)}>
          <option value="lightcoral">lightcoral</option>
          <option value="midnightblue">midnightblue</option>
          <option value="rebeccapurple">rebeccapurple</option>
        </select>
      </p>
      <Clock color={color} time={time.toLocaleTimeString()} />
    </div>
  );
}
```

</Sandpack>

This example illustrates that **a component may receive different props over time.** Props are not always static! Here, the `time` prop changes every second, and the `color` prop changes when you select another color. Props reflect a component's data at any point in time, rather than only in the beginning.

However, props are [immutable](https://en.wikipedia.org/wiki/Immutable_object)—a term from computer science meaning "unchangeable." When a component needs to change its props (for example, in response to a user interaction or new data), it will have to "ask" its parent component to pass it _different props_—a new object! Its old props will then be cast aside, and eventually the JavaScript engine will reclaim the memory taken by them.

**Don't try to "change props".** When you need to respond to the user input (like changing the selected color), you will need to "set state", which you can learn about in [State: A Component's Memory](/learn/state-a-components-memory).

<Recap>

* To pass props, add them to the JSX, just like you would with HTML attributes.
* To read props, use the `function Avatar({ person, size })` destructuring syntax.
* You can specify a default value like `size = 100`, which is used for missing and `undefined` props.
* You can forward all props with `<Avatar {...props} />` JSX spread syntax, but don't overuse it!
* Nested JSX like `<Card><Avatar /></Card>` will appear as `Card` component's `children` prop.
* Props are read-only snapshots in time: every render receives a new version of props.
* You can't change props. When you need interactivity, you'll need to set state.

</Recap>



<Challenges>

### Extract a component {/*extract-a-component*/}

This `Gallery` component contains some very similar markup for two profiles. Extract a `Profile` component out of it to reduce the duplication. You'll need to choose what props to pass to it.

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <section className="profile">
        <h2>Maria Skłodowska-Curie</h2>
        <img
          className="avatar"
          src={getImageUrl('szV5sdG')}
          alt="Maria Skłodowska-Curie"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b> 
            physicist and chemist
          </li>
          <li>
            <b>Awards: 4 </b> 
            (Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal)
          </li>
          <li>
            <b>Discovered: </b>
            polonium (element)
          </li>
        </ul>
      </section>
      <section className="profile">
        <h2>Katsuko Saruhashi</h2>
        <img
          className="avatar"
          src={getImageUrl('YfeOqp2')}
          alt="Katsuko Saruhashi"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b> 
            geochemist
          </li>
          <li>
            <b>Awards: 2 </b> 
            (Miyake Prize for geochemistry, Tanaka Prize)
          </li>
          <li>
            <b>Discovered: </b>
            a method for measuring carbon dioxide in seawater
          </li>
        </ul>
      </section>
    </div>
  );
}
```

```js utils.js
export function getImageUrl(imageId, size = 's') {
  return (
    'https://i.imgur.com/' +
    imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 5px; border-radius: 50%; min-height: 70px; }
.profile {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}
h1, h2 { margin: 5px; }
h1 { margin-bottom: 10px; }
ul { padding: 0px 10px 0px 20px; }
li { margin: 5px; }
```

</Sandpack>

<Hint>

Start by extracting the markup for one of the scientists. Then find the pieces that don't match it in the second example, and make them configurable by props.

</Hint>

<Solution>

In this solution, the `Profile` component accepts multiple props: `imageId` (a string), `name` (a string), `profession` (a string), `awards` (an array of strings), `discovery` (a string), and `imageSize` (a number).

Note that the `imageSize` prop has a default value, which is why we don't pass it to the component.

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

function Profile({
  imageId,
  name,
  profession,
  awards,
  discovery,
  imageSize = 70
}) {
  return (
    <section className="profile">
      <h2>{name}</h2>
      <img
        className="avatar"
        src={getImageUrl(imageId)}
        alt={name}
        width={imageSize}
        height={imageSize}
      />
      <ul>
        <li><b>Profession:</b> {profession}</li>
        <li>
          <b>Awards: {awards.length} </b>
          ({awards.join(', ')})
        </li>
        <li>
          <b>Discovered: </b>
          {discovery}
        </li>
      </ul>
    </section>
  );
}

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile
        imageId="szV5sdG"
        name="Maria Skłodowska-Curie"
        profession="physicist and chemist"
        discovery="polonium (chemical element)"
        awards={[
          'Nobel Prize in Physics',
          'Nobel Prize in Chemistry',
          'Davy Medal',
          'Matteucci Medal'
        ]}
      />
      <Profile
        imageId='YfeOqp2'
        name='Katsuko Saruhashi'
        profession='geochemist'
        discovery="a method for measuring carbon dioxide in seawater"
        awards={[
          'Miyake Prize for geochemistry',
          'Tanaka Prize'
        ]}
      />
    </div>
  );
}
```

```js utils.js
export function getImageUrl(imageId, size = 's') {
  return (
    'https://i.imgur.com/' +
    imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 5px; border-radius: 50%; min-height: 70px; }
.profile {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}
h1, h2 { margin: 5px; }
h1 { margin-bottom: 10px; }
ul { padding: 0px 10px 0px 20px; }
li { margin: 5px; }
```

</Sandpack>

Note how you don't need a separate `awardCount` prop if `awards` is an array. Then you can use `awards.length` to count the number of awards. Remember that props can take any values, and that includes arrays too!

Another solution, which is more similar to the earlier examples on this page, is to group all information about a person in a single object, and pass that object as one prop:

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

function Profile({ person, imageSize = 70 }) {
  const imageSrc = getImageUrl(person)

  return (
    <section className="profile">
      <h2>{person.name}</h2>
      <img
        className="avatar"
        src={imageSrc}
        alt={person.name}
        width={imageSize}
        height={imageSize}
      />
      <ul>
        <li>
          <b>Profession:</b> {person.profession}
        </li>
        <li>
          <b>Awards: {person.awards.length} </b>
          ({person.awards.join(', ')})
        </li>
        <li>
          <b>Discovered: </b>
          {person.discovery}
        </li>
      </ul>
    </section>
  )
}

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile person={{
        imageId: 'szV5sdG',
        name: 'Maria Skłodowska-Curie',
        profession: 'physicist and chemist',
        discovery: 'polonium (chemical element)',
        awards: [
          'Nobel Prize in Physics',
          'Nobel Prize in Chemistry',
          'Davy Medal',
          'Matteucci Medal'
        ],
      }} />
      <Profile person={{
        imageId: 'YfeOqp2',
        name: 'Katsuko Saruhashi',
        profession: 'geochemist',
        discovery: 'a method for measuring carbon dioxide in seawater',
        awards: [
          'Miyake Prize for geochemistry',
          'Tanaka Prize'
        ],
      }} />
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
.avatar { margin: 5px; border-radius: 50%; min-height: 70px; }
.profile {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}
h1, h2 { margin: 5px; }
h1 { margin-bottom: 10px; }
ul { padding: 0px 10px 0px 20px; }
li { margin: 5px; }
```

</Sandpack>

Although the syntax looks slightly different because you're describing properties of a JavaScript object rather than a collection of JSX attributes, these examples are mostly equivalent, and you can pick either approach.

</Solution>

### Adjust the image size based on a prop {/*adjust-the-image-size-based-on-a-prop*/}

In this example, `Avatar` receives a numeric `size` prop which determines the `<img>` width and height. The `size` prop is set to `40` in this example. However, if you open the image in a new tab, you'll notice that the image itself is larger (`160` pixels). The real image size is determined by which thumbnail size you're requesting.

Change the `Avatar` component to request the closest image size based on the `size` prop. Specifically, if the `size` is less than `90`, pass `'s'` ("small") rather than `'b'` ("big") to the `getImageUrl` function. Verify that your changes work by rendering avatars with different values of the `size` prop and opening images in a new tab.

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person, 'b')}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <Avatar
      size={40}
      person={{ 
        name: 'Gregorio Y. Zara', 
        imageId: '7vQD0fP'
      }}
    />
  );
}
```

```js utils.js
export function getImageUrl(person, size) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

<Solution>

Here is how you could go about it:

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  let thumbnailSize = 's';
  if (size > 90) {
    thumbnailSize = 'b';
  }
  return (
    <img
      className="avatar"
      src={getImageUrl(person, thumbnailSize)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <>
      <Avatar
        size={40}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
      <Avatar
        size={120}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
    </>
  );
}
```

```js utils.js
export function getImageUrl(person, size) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

You could also show a sharper image for high DPI screens by taking [`window.devicePixelRatio`](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) into account:

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js';

const ratio = window.devicePixelRatio;

function Avatar({ person, size }) {
  let thumbnailSize = 's';
  if (size * ratio > 90) {
    thumbnailSize = 'b';
  }
  return (
    <img
      className="avatar"
      src={getImageUrl(person, thumbnailSize)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <>
      <Avatar
        size={40}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
      <Avatar
        size={70}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
      <Avatar
        size={120}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
    </>
  );
}
```

```js utils.js
export function getImageUrl(person, size) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

Props let you encapsulate logic like this inside the `Avatar` component (and change it later if needed) so that everyone can use the `<Avatar>` component without thinking about how the images are requested and resized.

</Solution>

### Passing JSX in a `children` prop {/*passing-jsx-in-a-children-prop*/}

Extract a `Card` component from the markup below, and use the `children` prop to pass different JSX to it:

<Sandpack>

```js
export default function Profile() {
  return (
    <div>
      <div className="card">
        <div className="card-content">
          <h1>Photo</h1>
          <img
            className="avatar"
            src="https://i.imgur.com/OKS67lhm.jpg"
            alt="Aklilu Lemma"
            width={70}
            height={70}
          />
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h1>About</h1>
          <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
        </div>
      </div>
    </div>
  );
}
```

```css
.card {
  width: fit-content;
  margin: 20px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.card-content {
  text-align: center;
}
.avatar {
  margin: 10px;
  border-radius: 50%;
}
h1 {
  margin: 5px;
  padding: 0;
  font-size: 24px;
}
```

</Sandpack>

<Hint>

Any JSX you put inside of a component's tag will be passed as the `children` prop to that component.

</Hint>

<Solution>

This is how you can use the `Card` component in both places:

<Sandpack>

```js
function Card({ children }) {
  return (
    <div className="card">
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <div>
      <Card>
        <h1>Photo</h1>
        <img
          className="avatar"
          src="https://i.imgur.com/OKS67lhm.jpg"
          alt="Aklilu Lemma"
          width={100}
          height={100}
        />
      </Card>
      <Card>
        <h1>About</h1>
        <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
      </Card>
    </div>
  );
}
```

```css
.card {
  width: fit-content;
  margin: 20px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.card-content {
  text-align: center;
}
.avatar {
  margin: 10px;
  border-radius: 50%;
}
h1 {
  margin: 5px;
  padding: 0;
  font-size: 24px;
}
```

</Sandpack>

You can also make `title` a separate prop if you want every `Card` to always have a title:

<Sandpack>

```js
function Card({ children, title }) {
  return (
    <div className="card">
      <div className="card-content">
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <div>
      <Card title="Photo">
        <img
          className="avatar"
          src="https://i.imgur.com/OKS67lhm.jpg"
          alt="Aklilu Lemma"
          width={100}
          height={100}
        />
      </Card>
      <Card title="About">
        <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
      </Card>
    </div>
  );
}
```

```css
.card {
  width: fit-content;
  margin: 20px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.card-content {
  text-align: center;
}
.avatar {
  margin: 10px;
  border-radius: 50%;
}
h1 {
  margin: 5px;
  padding: 0;
  font-size: 24px;
}
```

</Sandpack>

</Solution>

>>>>>>> 26a870e1c6e232062b760d37620d85802750e985
</Challenges>