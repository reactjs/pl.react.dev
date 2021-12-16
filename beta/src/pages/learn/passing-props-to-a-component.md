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

</Challenges>