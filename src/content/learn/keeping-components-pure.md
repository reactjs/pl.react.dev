---
title: Czyste komponenty
---

<Intro>

Niektóre funkcje javascriptowe są *czyste.* Funkcje czyste wykonują tylko obliczenia i nic więcej. Stosując się ściśle do pisania komponentów jako funkcji czystych, można uniknąć całej grupy dezorientujących błędów i nieprzewidywalnego zachowania w miarę jak kod rozwija się. Aby uzyskać te korzyści, musisz jednak przestrzegać kilku zasad.

</Intro>

<YouWillLearn>

* Czym jest czystość i w jaki sposób pomaga uniknąć błędów
* Jak tworzyć czyste komponenty przez trzymanie zmian poza fazą renderowania
* Jak używać trybu rygorystycznego (ang. _Strict Mode_) do znajdowania błędów w komponentach

</YouWillLearn>

## Czystość: Komponenty jako formuły {/*purity-components-as-formulas*/}

W informatyce (zwłaszcza w świecie programowania funkcyjnego), [funkcja czysta](https://wikipedia.org/wiki/Pure_function) ma następujące cechy:

* **Dba o swoje własne sprawy.** Nie zmienia żadnych obiektów ani zmiennych, które istniały przed jej wywołaniem.
* **Takie same dane wejściowe, taki sam wynik.** Dla takich samych danych wejściowych funkcja czysta powinna zawsze zwracać ten sam wynik.

Być może znasz już jeden przykład funkcji czystych: formuły matematyczne.

Rozważ taki wzór: <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math>.

Jeśli <Math><MathI>x</MathI> = 2</Math>, to wtedy <Math><MathI>y</MathI> = 4</Math>. Zawsze. 

Jeśli <Math><MathI>x</MathI> = 3</Math>, to wtedy <Math><MathI>y</MathI> = 6</Math>. Zawsze. 

Jeśli <Math><MathI>x</MathI> = 3</Math>, to <MathI>y</MathI> nie będzie czasami wynosić <Math>9</Math> albo <Math>–1</Math>, albo <Math>2.5</Math> zależnie od pory dnia czy notowań na giełdzie. 

Jeśli <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math> oraz <Math><MathI>x</MathI> = 3</Math>, to <MathI>y</MathI> _zawsze_ będzie wynosić <Math>6</Math>. 

Jeśli zamienilibyśmy to na funkcję javascriptową, wyglądałaby ona tak:

```js
function double(number) {
  return 2 * number;
}
```

W powyższym przykładzie `double` jest **funkcją czystą.** Jeśli przekażesz jej `3`, zawsze zwróci `6`.

React jest zaprojektowany wokół tego konceptu. **React zakłada, że każdy komponent, który piszesz, jest funkcją czystą.** Oznacza to, że komponenty reactowe, które piszesz, zawsze muszą zwracać ten sam JSX dla tych samych danych wejściowych:

<Sandpack>

```js src/App.js
function Recipe({ drinkers }) {
  return (
    <ol>    
      <li>Zagotuj {drinkers} filiżanki wody.</li>
      <li>Dodaj {drinkers} łyżki herbaty i {0.5 * drinkers} łyżkę/łyżki przypraw.</li>
      <li>Dodaj {0.5 * drinkers} filiżankę/filiżanki mleka i cukier dla smaku.</li>
    </ol>
  );
}

export default function App() {
  return (
    <section>
      <h1>Przepis na Herbatę Chai</h1>
      <h2>Dla dwóch osób</h2>
      <Recipe drinkers={2} />
      <h2>Dla większej grupy</h2>
      <Recipe drinkers={4} />
    </section>
  );
}
```

</Sandpack>

Kiedy przekażesz `drinkers={2}` do `Recipe`, zawsze zwróci on JSX zawierający `2 filiżanki wody`.

Jeśli przekażesz `drinkers={4}`, zawsze zwróci on JSX zawierający `4 filiżanki wody`.

Dokładnie tak jak formuła matematyczna.

Możesz myśleć o swoich komponentach jak o przepisach kuchennych: jeśli będziesz stosować się do nich i nie wprowadzisz nowych składników podczas procesu gotowania, otrzymasz ten sam posiłek za każdym razem. To "danie" to JSX, który komponent dostarcza do Reacta na potrzeby [renderowania.](/learn/render-and-commit)

<Illustration src="/images/docs/illustrations/i_puritea-recipe.png" alt="Przepis na herbatę dla x osób: weź x filiżanek wody, dodaj x łyżek herbaty i 0.5x łyżek przypraw oraz 0.5x filiżanek mleka" />

## Skutki uboczne: (nie)zamierzone konsekwencje {/*side-effects-unintended-consequences*/}

Proces renderowania w Reakcie zawsze musi być czysty. Komponenty powinny jedynie *zwracać* swój JSX i nie *zmieniać* żadnych obiektów ani zmiennych, które istniały przed renderowaniem – to sprawiałoby, że komponenty nie są czyste!

Oto komponent, który łamie tę zasadę:
<Sandpack>

```js
let guest = 0;

function Cup() {
  // Źle: zmiana istniejącej zmiennej!
  guest = guest + 1;
  return <h2>Filiżanka herbaty dla gościa #{guest}</h2>;
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

Ten komponent odczytuje i nadpisuje zmienną `guest` zadeklarowaną poza nim. Oznacza to, że **wywołanie tego komponentu wielokrotnie spowoduje wygenerowanie różnego JSX!** Co więcej, jeśli _inne_ komponenty odczytują `guest`, również wygenerują różny JSX, w zależności od momentu renderowania! To nie jest przewidywalne.

Wróćmy do naszej formuły <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math>. Teraz nawet jeśli <Math><MathI>x</MathI> = 2</Math>, nie możemy być pewni, że <Math><MathI>y</MathI> = 4</Math>. Nasze testy mogłyby zakończyć się niepowodzeniem, nasi użytkownicy byliby zdumieni, a samoloty mogłyby spaść z nieba – widzisz, jak mogłoby to prowadzić do niezrozumiałych błędów!

Możesz naprawić ten komponent, [przekazując `guest` jako właściwość](/learn/passing-props-to-a-component):

<Sandpack>

```js
function Cup({ guest }) {
  return <h2>Filiżanka herbaty dla gościa #{guest}</h2>;
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

Teraz twój komponent jest czysty, ponieważ JSX, który zwraca, zależy tylko od właściwości `guest`.

Ogólnie, nie powinno się oczekiwać, że komponenty zostaną wyrenderowane w określonej kolejności. Nie ma znaczenia, czy zostanie wywołane <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math> przed czy po <Math><MathI>y</MathI> = 5<MathI>x</MathI></Math>: obie formuły będą rozwiązywane niezależnie od siebie. W ten sam sposób każdy komponent powinien "myśleć samodzielnie" i nie próbować koordynować się ani zależeć od innych podczas renderowania. Renderowanie przypomina egzamin szkolny: każdy komponent powinien obliczać JSX samodzielnie!

<DeepDive>

#### Wykrywanie nieczystych obliczeń za pomocą trybu rygorystycznego {/*detecting-impure-calculations-with-strict-mode*/}

Choć być może jeszcze nie wszystkie zostały przez ciebie użyte, w Reakcie istnieją trzy rodzaje danych wejściowych, które można odczytywać podczas renderowania: [właściwości](/learn/passing-props-to-a-component), [stan](/learn/state-a-components-memory) i [kontekst.](/learn/passing-data-deeply-with-context) Zawsze powinno się traktować te dane wejściowe tylko jako do odczytu.

Kiedy chce się *zmienić* coś w odpowiedzi na interakcję użytkownika, powinno się [ustawić stan](/learn/state-a-components-memory) zamiast zapisywać do zmiennej. Nigdy nie powinno się zmieniać istniejących zmiennych lub obiektów podczas renderowania komponentu.

React oferuje "tryb rygorystyczny" (ang. _Strict Mode_), w którym, w trybie deweloperskim, wywołuje on funkcję każdego komponentu dwukrotnie. **Poprzez dwukrotne wywołanie, tryb rygorystyczny pomaga znaleźć komponenty, które łamią te zasady.**

Zauważ, że oryginalny przykład wyświetlał "Gość #2", "Gość #4" i "Gość #6" zamiast "Gość #1", "Gość #2" i "Gość #3". Oryginalna funkcja była nieczysta, więc jej dwukrotne wywołanie zepsuło ją. Ale naprawiona, czysta wersja działa nawet wtedy, gdy funkcja jest wywoływana dwukrotnie za każdym razem. **Czyste funkcje tylko obliczają, więc ich dwukrotne wywołanie nic nie zmienia** — tak samo jak dwukrotne wywołanie `double(2)` nie zmienia tego, co jest zwracane, a rozwiązanie równania <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math> dwukrotnie nie zmienia wartości <MathI>y</MathI>. Te same dane wejściowe, te same dane wyjściowe. Zawsze.

Tryb rygorystyczny nie ma wpływu na wersję produkcyjną, więc nie spowolni aplikacji dla użytkowników. Aby wybrać tryb rygorystyczny, musisz owinąć swój główny komponent w `<React.StrictMode>`. Niektóre frameworki robią to domyślnie.

</DeepDive>

### Local mutation: Your component's little secret {/*local-mutation-your-components-little-secret*/}

In the above example, the problem was that the component changed a *preexisting* variable while rendering. This is often called a **"mutation"** to make it sound a bit scarier. Pure functions don't mutate variables outside of the function's scope or objects that were created before the call—that makes them impure!

However, **it's completely fine to change variables and objects that you've *just* created while rendering.** In this example, you create an `[]` array, assign it to a `cups` variable, and then `push` a dozen cups into it:

<Sandpack>

```js
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
```

</Sandpack>

If the `cups` variable or the `[]` array were created outside the `TeaGathering` function, this would be a huge problem! You would be changing a *preexisting* object by pushing items into that array.

However, it's fine because you've created them *during the same render*, inside `TeaGathering`. No code outside of `TeaGathering` will ever know that this happened. This is called **"local mutation"**—it's like your component's little secret.

## Where you _can_ cause side effects {/*where-you-_can_-cause-side-effects*/}

While functional programming relies heavily on purity, at some point, somewhere, _something_ has to change. That's kind of the point of programming! These changes—updating the screen, starting an animation, changing the data—are called **side effects.** They're things that happen _"on the side"_, not during rendering.

In React, **side effects usually belong inside [event handlers.](/learn/responding-to-events)** Event handlers are functions that React runs when you perform some action—for example, when you click a button. Even though event handlers are defined *inside* your component, they don't run *during* rendering! **So event handlers don't need to be pure.**

If you've exhausted all other options and can't find the right event handler for your side effect, you can still attach it to your returned JSX with a [`useEffect`](/reference/react/useEffect) call in your component. This tells React to execute it later, after rendering, when side effects are allowed. **However, this approach should be your last resort.**

When possible, try to express your logic with rendering alone. You'll be surprised how far this can take you!

<DeepDive>

#### Why does React care about purity? {/*why-does-react-care-about-purity*/}

Writing pure functions takes some habit and discipline. But it also unlocks marvelous opportunities:

* Your components could run in a different environment—for example, on the server! Since they return the same result for the same inputs, one component can serve many user requests.
* You can improve performance by [skipping rendering](/reference/react/memo) components whose inputs have not changed. This is safe because pure functions always return the same results, so they are safe to cache.
* If some data changes in the middle of rendering a deep component tree, React can restart rendering without wasting time to finish the outdated render. Purity makes it safe to stop calculating at any time.

Every new React feature we're building takes advantage of purity. From data fetching to animations to performance, keeping components pure unlocks the power of the React paradigm.

</DeepDive>

<Recap>

* A component must be pure, meaning:
  * **It minds its own business.** It should not change any objects or variables that existed before rendering.
  * **Same inputs, same output.** Given the same inputs, a component should always return the same JSX. 
* Rendering can happen at any time, so components should not depend on each others' rendering sequence.
* You should not mutate any of the inputs that your components use for rendering. That includes props, state, and context. To update the screen, ["set" state](/learn/state-a-components-memory) instead of mutating preexisting objects.
* Strive to express your component's logic in the JSX you return. When you need to "change things", you'll usually want to do it in an event handler. As a last resort, you can `useEffect`.
* Writing pure functions takes a bit of practice, but it unlocks the power of React's paradigm.

</Recap>


  
<Challenges>

#### Fix a broken clock {/*fix-a-broken-clock*/}

This component tries to set the `<h1>`'s CSS class to `"night"` during the time from midnight to six hours in the morning, and `"day"` at all other times. However, it doesn't work. Can you fix this component?

You can verify whether your solution works by temporarily changing the computer's timezone. When the current time is between midnight and six in the morning, the clock should have inverted colors!

<Hint>

Rendering is a *calculation*, it shouldn't try to "do" things. Can you express the same idea differently?

</Hint>

<Sandpack>

```js src/Clock.js active
export default function Clock({ time }) {
  let hours = time.getHours();
  if (hours >= 0 && hours <= 6) {
    document.getElementById('time').className = 'night';
  } else {
    document.getElementById('time').className = 'day';
  }
  return (
    <h1 id="time">
      {time.toLocaleTimeString()}
    </h1>
  );
}
```

```js src/App.js hidden
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
  return (
    <Clock time={time} />
  );
}
```

```css
body > * {
  width: 100%;
  height: 100%;
}
.day {
  background: #fff;
  color: #222;
}
.night {
  background: #222;
  color: #fff;
}
```

</Sandpack>

<Solution>

You can fix this component by calculating the `className` and including it in the render output:

<Sandpack>

```js src/Clock.js active
export default function Clock({ time }) {
  let hours = time.getHours();
  let className;
  if (hours >= 0 && hours <= 6) {
    className = 'night';
  } else {
    className = 'day';
  }
  return (
    <h1 className={className}>
      {time.toLocaleTimeString()}
    </h1>
  );
}
```

```js src/App.js hidden
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
  return (
    <Clock time={time} />
  );
}
```

```css
body > * {
  width: 100%;
  height: 100%;
}
.day {
  background: #fff;
  color: #222;
}
.night {
  background: #222;
  color: #fff;
}
```

</Sandpack>

In this example, the side effect (modifying the DOM) was not necessary at all. You only needed to return JSX.

</Solution>

#### Fix a broken profile {/*fix-a-broken-profile*/}

Two `Profile` components are rendered side by side with different data. Press "Collapse" on the first profile, and then "Expand" it. You'll notice that both profiles now show the same person. This is a bug.

Find the cause of the bug and fix it.

<Hint>

The buggy code is in `Profile.js`. Make sure you read it all from top to bottom!

</Hint>

<Sandpack>

```js src/Profile.js
import Panel from './Panel.js';
import { getImageUrl } from './utils.js';

let currentPerson;

export default function Profile({ person }) {
  currentPerson = person;
  return (
    <Panel>
      <Header />
      <Avatar />
    </Panel>
  )
}

function Header() {
  return <h1>{currentPerson.name}</h1>;
}

function Avatar() {
  return (
    <img
      className="avatar"
      src={getImageUrl(currentPerson)}
      alt={currentPerson.name}
      width={50}
      height={50}
    />
  );
}
```

```js src/Panel.js hidden
import { useState } from 'react';

export default function Panel({ children }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="panel">
      <button onClick={() => setOpen(!open)}>
        {open ? 'Collapse' : 'Expand'}
      </button>
      {open && children}
    </section>
  );
}
```

```js src/App.js
import Profile from './Profile.js';

export default function App() {
  return (
    <>
      <Profile person={{
        imageId: 'lrWQx8l',
        name: 'Subrahmanyan Chandrasekhar',
      }} />
      <Profile person={{
        imageId: 'MK3eW3A',
        name: 'Creola Katherine Johnson',
      }} />
    </>
  )
}
```

```js src/utils.js hidden
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
.avatar { margin: 5px; border-radius: 50%; }
.panel {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
  width: 200px;
}
h1 { margin: 5px; font-size: 18px; }
```

</Sandpack>

<Solution>

The problem is that the `Profile` component writes to a preexisting variable called `currentPerson`, and the `Header` and `Avatar` components read from it. This makes *all three of them* impure and difficult to predict.

To fix the bug, remove the `currentPerson` variable. Instead, pass all information from `Profile` to `Header` and `Avatar` via props. You'll need to add a `person` prop to both components and pass it all the way down.

<Sandpack>

```js src/Profile.js active
import Panel from './Panel.js';
import { getImageUrl } from './utils.js';

export default function Profile({ person }) {
  return (
    <Panel>
      <Header person={person} />
      <Avatar person={person} />
    </Panel>
  )
}

function Header({ person }) {
  return <h1>{person.name}</h1>;
}

function Avatar({ person }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={50}
      height={50}
    />
  );
}
```

```js src/Panel.js hidden
import { useState } from 'react';

export default function Panel({ children }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="panel">
      <button onClick={() => setOpen(!open)}>
        {open ? 'Collapse' : 'Expand'}
      </button>
      {open && children}
    </section>
  );
}
```

```js src/App.js
import Profile from './Profile.js';

export default function App() {
  return (
    <>
      <Profile person={{
        imageId: 'lrWQx8l',
        name: 'Subrahmanyan Chandrasekhar',
      }} />
      <Profile person={{
        imageId: 'MK3eW3A',
        name: 'Creola Katherine Johnson',
      }} />
    </>
  );
}
```

```js src/utils.js hidden
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
.avatar { margin: 5px; border-radius: 50%; }
.panel {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
  width: 200px;
}
h1 { margin: 5px; font-size: 18px; }
```

</Sandpack>

Remember that React does not guarantee that component functions will execute in any particular order, so you can't communicate between them by setting variables. All communication must happen through props.

</Solution>

#### Fix a broken story tray {/*fix-a-broken-story-tray*/}

The CEO of your company is asking you to add "stories" to your online clock app, and you can't say no. You've written a `StoryTray` component that accepts a list of `stories`, followed by a "Create Story" placeholder.

You implemented the "Create Story" placeholder by pushing one more fake story at the end of the `stories` array that you receive as a prop. But for some reason, "Create Story" appears more than once. Fix the issue.

<Sandpack>

```js src/StoryTray.js active
export default function StoryTray({ stories }) {
  stories.push({
    id: 'create',
    label: 'Create Story'
  });

  return (
    <ul>
      {stories.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
```

```js src/App.js hidden
import { useState, useEffect } from 'react';
import StoryTray from './StoryTray.js';

let initialStories = [
  {id: 0, label: "Ankit's Story" },
  {id: 1, label: "Taylor's Story" },
];

export default function App() {
  let [stories, setStories] = useState([...initialStories])
  let time = useTime();

  // HACK: Prevent the memory from growing forever while you read docs.
  // We're breaking our own rules here.
  if (stories.length > 100) {
    stories.length = 100;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <h2>It is {time.toLocaleTimeString()} now.</h2>
      <StoryTray stories={stories} />
    </div>
  );
}

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
```

```css
ul {
  margin: 0;
  list-style-type: none;
}

li {
  border: 1px solid #aaa;
  border-radius: 6px;
  float: left;
  margin: 5px;
  margin-bottom: 20px;
  padding: 5px;
  width: 70px;
  height: 100px;
}
```

```js sandbox.config.json hidden
{
  "hardReloadOnChange": true
}
```

</Sandpack>

<Solution>

Notice how whenever the clock updates, "Create Story" is added *twice*. This serves as a hint that we have a mutation during rendering--Strict Mode calls components twice to make these issues more noticeable.

`StoryTray` function is not pure. By calling `push` on the received `stories` array (a prop!), it is mutating an object that was created *before* `StoryTray` started rendering. This makes it buggy and very difficult to predict.

The simplest fix is to not touch the array at all, and render "Create Story" separately:

<Sandpack>

```js src/StoryTray.js active
export default function StoryTray({ stories }) {
  return (
    <ul>
      {stories.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
      <li>Create Story</li>
    </ul>
  );
}
```

```js src/App.js hidden
import { useState, useEffect } from 'react';
import StoryTray from './StoryTray.js';

let initialStories = [
  {id: 0, label: "Ankit's Story" },
  {id: 1, label: "Taylor's Story" },
];

export default function App() {
  let [stories, setStories] = useState([...initialStories])
  let time = useTime();

  // HACK: Prevent the memory from growing forever while you read docs.
  // We're breaking our own rules here.
  if (stories.length > 100) {
    stories.length = 100;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <h2>It is {time.toLocaleTimeString()} now.</h2>
      <StoryTray stories={stories} />
    </div>
  );
}

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
```

```css
ul {
  margin: 0;
  list-style-type: none;
}

li {
  border: 1px solid #aaa;
  border-radius: 6px;
  float: left;
  margin: 5px;
  margin-bottom: 20px;
  padding: 5px;
  width: 70px;
  height: 100px;
}
```

</Sandpack>

Alternatively, you could create a _new_ array (by copying the existing one) before you push an item into it:

<Sandpack>

```js src/StoryTray.js active
export default function StoryTray({ stories }) {
  // Copy the array!
  let storiesToDisplay = stories.slice();

  // Does not affect the original array:
  storiesToDisplay.push({
    id: 'create',
    label: 'Create Story'
  });

  return (
    <ul>
      {storiesToDisplay.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
```

```js src/App.js hidden
import { useState, useEffect } from 'react';
import StoryTray from './StoryTray.js';

let initialStories = [
  {id: 0, label: "Ankit's Story" },
  {id: 1, label: "Taylor's Story" },
];

export default function App() {
  let [stories, setStories] = useState([...initialStories])
  let time = useTime();

  // HACK: Prevent the memory from growing forever while you read docs.
  // We're breaking our own rules here.
  if (stories.length > 100) {
    stories.length = 100;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <h2>It is {time.toLocaleTimeString()} now.</h2>
      <StoryTray stories={stories} />
    </div>
  );
}

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
```

```css
ul {
  margin: 0;
  list-style-type: none;
}

li {
  border: 1px solid #aaa;
  border-radius: 6px;
  float: left;
  margin: 5px;
  margin-bottom: 20px;
  padding: 5px;
  width: 70px;
  height: 100px;
}
```

</Sandpack>

This keeps your mutation local and your rendering function pure. However, you still need to be careful: for example, if you tried to change any of the array's existing items, you'd have to clone those items too.

It is useful to remember which operations on arrays mutate them, and which don't. For example, `push`, `pop`, `reverse`, and `sort` will mutate the original array, but `slice`, `filter`, and `map` will create a new one.

</Solution>

</Challenges>
