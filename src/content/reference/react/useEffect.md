---
title: useEffect
---

<Intro>

`useEffect` to hook reactowy, który pozwala [synchronizować komponent z zewnętrznym systemem.](/learn/synchronizing-with-effects)

```js
useEffect(setup, dependencies?)
```

</Intro>

<InlineToc />

---

## Dokumentacja {/*reference*/}

### `useEffect(setup, dependencies?)` {/*useeffect*/}

Aby zadeklarować efekt, wywołaj `useEffect` na głównym poziomie swojego komponentu:

```js
import { useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [serverUrl, roomId]);
  // ...
}
```

[Zobacz więcej przykładów poniżej](#usage)

#### Parametry {/*parameters*/}

* `setup`: funkcja z logiką efektu. Funkcja `setup` może również opcjonalnie zwracać *funkcję czyszczącą* (ang. *cleanup function*). Gdy komponent zostaje dodany do DOM-u, React uruchamia funkcję `setup`. Po każdym ponownym renderowaniu, gdy zmienią się zależności, React najpierw uruchamia funkcję czyszczącą (jeśli została zdefiniowana) z poprzednimi wartościami, a następnie uruchamia funkcję `setup` z nowymi wartościami. Gdy komponent zostanie usunięty z DOM-u, React uruchamia funkcję czyszczącą.

* **opcjonalnie** `dependencies`: lista wszystkich reaktywnych wartości użytych w kodzie funkcji `setup`. Wartościami reaktywnymi są między innymi właściwości, stany oraz wszystkie zmienne i funkcje zadeklarowane bezpośrednio w ciele twojego komponentu. Jeśli twój linter jest [skonfigurowany pod Reacta](/learn/editor-setup#linting), będzie on sprawdzał, czy każda wartość reaktywna jest poprawnie dodana do zależności. Lista zależności musi mieć stałą liczbę elementów i być zapisana w miejscu wywołania, jak np. `[dep1, dep2, dep3]`. React porównuje każdą zależność ze swoją poprzednią wartością, używając porównania [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is). Jeśli pominiesz ten parametr, efekt zostanie uruchomiony ponownie po każdym renderowaniu komponentu. [Zobacz różnicę między przekazywaniem tablicy zależności, pustej tablicy a brakiem zależności w ogóle.](#examples-dependencies)

#### Zwracana wartość {/*returns*/}

`useEffect` zwraca `undefined`.

#### Zastrzeżenia {/*caveats*/}

* `useEffect` jest hookiem, więc można go wywoływać tylko **na głównym poziomie komponentu** lub w innych hookach. Nie można go wywoływać wewnątrz pętli czy instrukcji warunkowej. Jeśli tego potrzebujesz, wyodrębnij nowy komponent i przenieś do niego stan.

* Jeśli **nie próbujesz synchronizować się z jakimś zewnętrznym systemem,** [prawdopodobnie nie potrzebujesz efektu.](/learn/you-might-not-need-an-effect)

* W Trybie Rygorystycznym (ang. *Strict Mode*), React **w środowisku developerskim wywoła dodatkowo funkcje `setup` i funkcję czyszczącą** jeszcze przed pierwszym właściwym wywołaniem `setup`. Jest to rodzaj testu obciążeniowego, który pozwala upewnić się, że logika funkcji czyszczącej "odzwierciedla" logikę funkcji `setup` i że zatrzymuje lub cofa to, co ona robi. Jeśli to powoduje problemy, [zaimplementuj funkcję czyszczącą.](/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)

* Jeśli niektóre z twoich zależności to obiekty lub funkcje zdefiniowane wewnątrz komponentu, istnieje ryzyko, że **spowodują, że efekt będzie wykonywał się częściej niż jest to potrzebne.** Aby to naprawić, usuń zbędne zależności od [obiektów](#removing-unnecessary-object-dependencies) i [funkcji](#removing-unnecessary-function-dependencies). Możesz również [wydzielić aktualizacje stanu](#updating-state-based-on-previous-state-from-an-effect) oraz [logikę niereaktywną](#reading-the-latest-props-and-state-from-an-effect) poza efekt.

* Jeśli twój efekt nie został wywołany przez interakcję (np. kliknięcie), React pozwoli przeglądarce **najpierw odświeżyć ekran przed uruchomieniem twojego efektu.** Jeśli efekt ten wykonuje jakieś operacje związane z wyświetlaniem (np. ustawianie pozycji dymka (ang. *tooltip*)) i opóźnienie jest zauważalne (np. występuje migotanie), zastąp `useEffect` przez [`useLayoutEffect`.](/reference/react/useLayoutEffect)

* Nawet jeśli twój efekt został wywołany przez interakcję (np. kliknięcie), **przeglądarka może odświeżyć ekran przed przetworzeniem aktualizacji stanu wewnątrz twojego efektu.** Zazwyczaj jest to pożądane zachowanie. Niemniej jednak, jeśli chcesz zablokować przeglądarkę przed odświeżaniem ekranu, musisz zastąpić `useEffect` przez [`useLayoutEffect`.](/reference/react/useLayoutEffect)

* Efekty uruchamiane są **tylko po stronie klienta.** Nie są uruchamiane podczas renderowania po stronie serwera.

---

## Sposób użycia {/*usage*/}

### Łączenie z zewnętrznym systemem {/*connecting-to-an-external-system*/}

Niektóre komponenty, gdy są wyświetlane na stronie, muszą pozostać połączone z siecią, pewnym interfejsem przeglądarki lub zewnętrzną biblioteką. Systemy te nie są kontrolowane przez Reacta, dlatego nazywane są *zewnętrznymi.*

Aby [połączyć swój komponent z zewnętrznym systemem,](/learn/synchronizing-with-effects) wywołaj funkcję `useEffect` na głównym poziomie swojego komponentu:

```js [[1, 8, "const connection = createConnection(serverUrl, roomId);"], [1, 9, "connection.connect();"], [2, 11, "connection.disconnect();"], [3, 13, "[serverUrl, roomId]"]]
import { useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
  	const connection = createConnection(serverUrl, roomId);
    connection.connect();
  	return () => {
      connection.disconnect();
  	};
  }, [serverUrl, roomId]);
  // ...
}
```

Aby użyć `useEffect`, musisz przekazać dwie argumenty:

1. *Funkcję konfiguracyjną* z <CodeStep step={1}>kodem konfiguracyjnym</CodeStep>, który łączy się z tym systemem.
   - Funkcja ta powinna zwracać *funkcję czyszczącą* z <CodeStep step={2}>kodem czyszczącym</CodeStep>, który rozłącza się z tym systemem.
2. <CodeStep step={3}>Tablicę zależności</CodeStep>, zawierającą każdą wartość używaną wewnątrz tych funkcji w twoim komponencie.

**React wywołuje twoje funkcje konfiguracyjną i czyszczącą wtedy, gdy jest to konieczne, co może się zdarzyć wielokrotnie:**

1. Twój <CodeStep step={1}>kod konfiguracyjny</CodeStep> jest wykonywany, gdy twój komponent jest dodawany do strony *(montowany)*.
2. Po każdym renderowaniu twojego komponentu, w którym <CodeStep step={3}>zależności</CodeStep> uległy zmianie:
   - Najpierw jest wykonywany twój <CodeStep step={2}>kod czyszczący</CodeStep> z poprzednimi właściwościami i stanem.
   - Następnie jest wykonywany twój <CodeStep step={1}>kod konfiguracyjny</CodeStep> z nowymi właściwościami i stanem.
3. Twój <CodeStep step={2}>kod czyszczący</CodeStep> jest wykonywany jeszcze raz po usunięciu *(odmontowaniu)* twojego komponentu ze strony.

**Przyjrzyjmy się tej sekwencji z przykładu powyżej.**

Kiedy komponent `ChatRoom` zostanie dodany do strony, połączy się z pokojem czatu przy użyciu początkowych `serverUrl` i `roomId`. Jeśli którakolwiek z zależności `serverUrl` lub `roomId` zmieni się w wyniku przerenderowania (np. jeśli użytkownik wybierze inny pokój czatu z rozwijanej listy), twój efekt *rozłączy się z poprzednim pokojem i połączy się z następnym.* Kiedy komponent `ChatRoom` zostanie usunięty ze strony, twój efekt rozłączy się ostatni raz.

**Aby [pomóc w wykrywaniu błędów,](/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed) w trybie developerskim React wykonuje dodatkowo funkcję <CodeStep step={1}>setup</CodeStep> oraz <CodeStep step={2}>cleanup</CodeStep> przed właściwym wywołaniem <CodeStep step={1}>setup</CodeStep>.** Jest to test obciążeniowy, który sprawdza, czy logika twojego efektu jest poprawnie zaimplementowana. Jeśli to spowoduje widoczne problemy, oznacza to, że brakuje pewnej logiki w funkcji czyszczącej. Funkcja ta powinna zatrzymać lub cofnąć wszystko, co zrobiła funkcja konfiguracyjna. Ogólnie rzecz biorąc, użytkownik nie powinien być w stanie rozróżnić między jednorazowym wywołaniem konfiguracji (jak na produkcji), a sekwencją *konfiguracja* → *czyszczenie* → *konfiguracja* (jak w trybie developerskim). [Zobacz najczęstsze rozwiązania.](/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)

**Postaraj się pisać każdy efekt jako niezależny proces** i **skup się na pojedynczym cyklu konfiguracji i czyszczenia w danym momencie.** Nie ma znaczenia, czy komponent jest montowany, aktualizowany czy odmontowywany. Jeśli logika czyszczenia poprawnie odwzorowuje logikę konfiguracji, twój efekt jest odporny na uruchamianie konfiguracji i czyszczenia tak często, jak to konieczne.

<Note>

Efekt pozwala [utrzymać synchronizację twojego komponentu](/learn/synchronizing-with-effects) z zewnętrznym systemem (np. usługą czatu). *Zewnętrzny system* oznacza tutaj dowolny fragment kodu, który nie jest kontrolowany przez Reacta, taki jak:

* Timer zarządzany za pomocą <CodeStep step={1}>[`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)</CodeStep> i <CodeStep step={2}>[`clearInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval)</CodeStep>.
* Subskrypcja zdarzeń za pomocą <CodeStep step={1}>[`window.addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)</CodeStep> i <CodeStep step={2}>[`window.removeEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)</CodeStep>.
* Zewnętrzna biblioteka animacji z API w stylu <CodeStep step={1}>`animation.start()`</CodeStep> i <CodeStep step={2}>`animation.reset()`</CodeStep>.

**Jeśli nie łączysz się z żadnym zewnętrznym systemem, [prawdopodobnie nie potrzebujesz efektu.](/learn/you-might-not-need-an-effect)**

</Note>

<Recipes titleText="Przykłady łączenia się z systemem zewnętrznym" titleId="examples-connecting">

#### Łączenie się z serwerem czatu {/*connecting-to-a-chat-server*/}

W tym przykładzie komponent `ChatRoom` wykorzystuje efekt do utrzymania połączenia z systemem zewnętrznym zdefiniowanym w pliku `chat.js`. Naciśnij "Otwórz czat", aby pojawił się komponent `ChatRoom`. Ta piaskownica działa w trybie developerskim, więc ma miejsce dodatkowy cykl łączenia i rozłączania, tak jak jest to [wyjaśnione tutaj](/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed). Spróbuj zmieniać `roomId` i `serverUrl` za pomocą rozwijanej listy i pola tekstowego, a zobaczysz, jak efekt ponownie łączy się z czatem. Naciśnij "Zamknij czat", aby zobaczyć jak efekt kończy połączenie ostatni raz.

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId, serverUrl]);

  return (
    <>
      <label>
        URL serwera:{' '}
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <h1>Witaj w pokoju: {roomId}!</h1>
    </>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState('ogólny');
  const [show, setShow] = useState(false);
  return (
    <>
      <label>
        Wybierz pokój czatu:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="ogólny">ogólny</option>
          <option value="podróże">podróże</option>
          <option value="muzyka">muzyka</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? 'Zamknij czat' : 'Otwórz czat'}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  );
}
```

```js chat.js
export function createConnection(serverUrl, roomId) {
  // Rzeczywista implementacja naprawdę połączyłaby się z serwerem
  return {
    connect() {
      console.log('✅ Łączenie z pokojem "' + roomId + '" na ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Rozłączono z pokojem "' + roomId + '" na ' + serverUrl);
    }
  };
}
```

```css
input { display: block; margin-bottom: 20px; }
button { margin-left: 10px; }
```

</Sandpack>

<Solution />

#### Nasłuchiwanie na globalne zdarzenia przeglądarki {/*listening-to-a-global-browser-event*/}

W tym przykładzie, systemem zewnętrznym jest samo drzewo DOM w przeglądarce. Zazwyczaj nasłuchiwacze zdarzeń tworzy się za pomocą JSX, ale w ten sposób nie da się nasłuchiwać globalnego obiektu [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window). Efekt pozwala połączyć się z obiektem `window` i nasłuchiwać jego zdarzeń. Aby śledzić pozycję kursora (lub palca) i aktualizować czerwony punkt, aby ten poruszał się razem z nim, należy nasłuchiwać zdarzenia `pointermove`.

<Sandpack>

```js
import { useState, useEffect } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('pointermove', handleMove);
    return () => {
      window.removeEventListener('pointermove', handleMove);
    };
  }, []);

  return (
    <div style={{
      position: 'absolute',
      backgroundColor: 'pink',
      borderRadius: '50%',
      opacity: 0.6,
      transform: `translate(${position.x}px, ${position.y}px)`,
      pointerEvents: 'none',
      left: -20,
      top: -20,
      width: 40,
      height: 40,
    }} />
  );
}
```

```css
body {
  min-height: 300px;
}
```

</Sandpack>

<Solution />

#### Wywoływanie animacji {/*triggering-an-animation*/}

W tym przykładzie, systemem zewnętrznym jest biblioteka animacji w pliku `animation.js`. Udostępnia ona klasę javascriptową o nazwie `FadeInAnimation`, która przyjmuje jako argument węzeł DOM i udostępnia metody `start()` oraz `stop()` do sterowania animacją. Ten komponent [używa referencji (ang. *ref*)](/learn/manipulating-the-dom-with-refs), aby mieć dostęp do zasadniczego węzła DOM. Gdy komponent staje się widoczny, efekt odczytuje ten węzeł z referencji i automatycznie uruchamia dla niego animację.

<Sandpack>

```js
import { useState, useEffect, useRef } from 'react';
import { FadeInAnimation } from './animation.js';

function Welcome() {
  const ref = useRef(null);

  useEffect(() => {
    const animation = new FadeInAnimation(ref.current);
    animation.start(1000);
    return () => {
      animation.stop();
    };
  }, []);

  return (
    <h1
      ref={ref}
      style={{
        opacity: 0,
        color: 'white',
        padding: 50,
        textAlign: 'center',
        fontSize: 50,
        backgroundImage: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)'
      }}
    >
      Witaj
    </h1>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? 'Usuń' : 'Pokaż'}
      </button>
      <hr />
      {show && <Welcome />}
    </>
  );
}
```

```js animation.js
export class FadeInAnimation {
  constructor(node) {
    this.node = node;
  }
  start(duration) {
    this.duration = duration;
    if (this.duration === 0) {
      // Skocz od razu do końca
      this.onProgress(1);
    } else {
      this.onProgress(0);
      // Rozpocznij animację
      this.startTime = performance.now();
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }
  onFrame() {
    const timePassed = performance.now() - this.startTime;
    const progress = Math.min(timePassed / this.duration, 1);
    this.onProgress(progress);
    if (progress < 1) {
      // Nadal są inne ramki do narysowania
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }
  onProgress(progress) {
    this.node.style.opacity = progress;
  }
  stop() {
    cancelAnimationFrame(this.frameId);
    this.startTime = null;
    this.frameId = null;
    this.duration = 0;
  }
}
```

```css
label, button { display: block; margin-bottom: 20px; }
html, body { min-height: 300px; }
```

</Sandpack>

<Solution />

#### Sterowanie oknem dialogowym (ang. *modal dialog*) {/*controlling-a-modal-dialog*/}

W tym przykładzie, systemem zewnętrznym jest drzewo DOM w przeglądarce. Komponent `ModalDialog` renderuje element [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog). Komponent ten wykorzystuje efekt, aby zsynchronizować właściwość `isOpen` z wywołaniem metod [`showModal()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) oraz [`close()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/close).

<Sandpack>

```js
import { useState } from 'react';
import ModalDialog from './ModalDialog.js';

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>
        Otwórz okno dialogowe
      </button>
      <ModalDialog isOpen={show}>
        Hej!
        <br />
        <button onClick={() => {
          setShow(false);
        }}>Zamknij</button>
      </ModalDialog>
    </>
  );
}
```

```js ModalDialog.js active
import { useEffect, useRef } from 'react';

export default function ModalDialog({ isOpen, children }) {
  const ref = useRef();

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const dialog = ref.current;
    dialog.showModal();
    return () => {
      dialog.close();
    };
  }, [isOpen]);

  return <dialog ref={ref}>{children}</dialog>;
}
```

```css
body {
  min-height: 300px;
}
```

</Sandpack>

<Solution />

#### Śledzenie widoczności elementu {/*tracking-element-visibility*/}

W tym przykładzie, systemem zewnętrznym ponownie jest drzewo DOM w przeglądarce. Komponent `App` wyświetla długą listę, następnie komponent `Box`, a potem kolejną długą listę. Przewiń w dół tej listy. Zauważ, że gdy komponent `Box` pojawia się cały w widocznym obszarze przeglądarki, kolor tła zmienia się na czarny. Aby to zaimplementować, komponent `Box` używa efektu do sterowania [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). To API przeglądarki powiadamia, kiedy element DOM jest widoczny.

<Sandpack>

```js
import Box from './Box.js';

export default function App() {
  return (
    <>
      <LongSection />
      <Box />
      <LongSection />
      <Box />
      <LongSection />
    </>
  );
}

function LongSection() {
  const items = [];
  for (let i = 0; i < 50; i++) {
    items.push(<li key={i}>Element #{i} (przewijaj dalej)</li>);
  }
  return <ul>{items}</ul>
}
```

```js Box.js active
import { useRef, useEffect } from 'react';

export default function Box() {
  const ref = useRef(null);

  useEffect(() => {
    const div = ref.current;
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
      } else {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
      }
    }, {
       threshold: 1.0
    });
    observer.observe(div);
    return () => {
      observer.disconnect();
    }
  }, []);

  return (
    <div ref={ref} style={{
      margin: 20,
      height: 100,
      width: 100,
      border: '2px solid black',
      backgroundColor: 'blue'
    }} />
  );
}
```

</Sandpack>

<Solution />

</Recipes>

---

### Opakowywanie efektów we własne hooki {/*wrapping-effects-in-custom-hooks*/}

Efekty są rodzajem "ukrytej furtki": używamy ich, gdy potrzebujemy "wyjść poza Reacta" i nie ma innego lepszego sposobu w danym przypadku. Jeśli często zdarza ci się ręcznie tworzyć efekty, zwykle oznacza to, że należy wyodrębnić [własne hooki](/learn/reusing-logic-with-custom-hooks), które implementują wspólne zachowania, na których polegają twoje komponenty.

Przykładowo, własny hook `useChatRoom` "ukrywa" logikę efektu za bardziej deklaratywnym interfejsem:

```js {1,11}
function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
}
```

Następnie, możesz go użyć w dowolnym komponencie w taki sposób:

```js {4-7}
function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });
  // ...
```

W ekosystemie Reacta jest wiele świetnych własnych hooków, które można użyć w różnych przypadkach.

[Dowiedz się więcej o opakowywaniu efektów w własne hooki.](/learn/reusing-logic-with-custom-hooks)

<Recipes titleText="Przykłady opakowywania efektów w własne hooki" titleId="examples-custom-hooks">

#### Własny hook `useChatRoom` {/*custom-usechatroom-hook*/}

Ten przykład jest identyczny jak [jeden z wcześniejszych przykładów,](#examples-connecting) ale logika została wyodrębniona do własnego hooka.
<Sandpack>

```js
import { useState } from 'react';
import { useChatRoom } from './useChatRoom.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });

  return (
    <>
      <label>
        URL serwera:{' '}
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <h1>Witaj w pokoju: {roomId}!</h1>
    </>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState('ogólny');
  const [show, setShow] = useState(false);
  return (
    <>
      <label>
        Wybierz pokój czatu:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="ogólny">ogólny</option>
          <option value="podróże">podróże</option>
          <option value="muzyka">muzyka</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? 'Zamknij czat' : 'Otwórz czat'}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  );
}
```

```js useChatRoom.js
import { useEffect } from 'react';
import { createConnection } from './chat.js';

export function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId, serverUrl]);
}
```

```js chat.js
export function createConnection(serverUrl, roomId) {
  // Rzeczywista implementacja naprawdę połączyłaby się z serwerem
  return {
    connect() {
      console.log('✅ Łączenie z pokojem "' + roomId + '" na ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Rozłączono z pokojem "' + roomId + '" na ' + serverUrl);
    }
  };
}
```

```css
input { display: block; margin-bottom: 20px; }
button { margin-left: 10px; }
```

</Sandpack>

<Solution />

#### Własny hook `useWindowListener` {/*custom-usewindowlistener-hook*/}

Ten przykład jest identyczny jak [jeden z wcześniejszych przykładów,](#examples-connecting) ale logika została wyodrębniona do własnego hooka.

<Sandpack>

```js
import { useState } from 'react';
import { useWindowListener } from './useWindowListener.js';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useWindowListener('pointermove', (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  });

  return (
    <div style={{
      position: 'absolute',
      backgroundColor: 'pink',
      borderRadius: '50%',
      opacity: 0.6,
      transform: `translate(${position.x}px, ${position.y}px)`,
      pointerEvents: 'none',
      left: -20,
      top: -20,
      width: 40,
      height: 40,
    }} />
  );
}
```

```js useWindowListener.js
import { useState, useEffect } from 'react';

export function useWindowListener(eventType, listener) {
  useEffect(() => {
    window.addEventListener(eventType, listener);
    return () => {
      window.removeEventListener(eventType, listener);
    };
  }, [eventType, listener]);
}
```

```css
body {
  min-height: 300px;
}
```

</Sandpack>

<Solution />

#### Własny hook `useIntersectionObserver` {/*custom-useintersectionobserver-hook*/}

Ten przykład jest identyczny jak [jeden z wcześniejszych przykładów,](#examples-connecting) ale logika została częściowo wyodrębniona do własnego hooka.

<Sandpack>

```js
import Box from './Box.js';

export default function App() {
  return (
    <>
      <LongSection />
      <Box />
      <LongSection />
      <Box />
      <LongSection />
    </>
  );
}

function LongSection() {
  const items = [];
  for (let i = 0; i < 50; i++) {
    items.push(<li key={i}>Element #{i} (przewijaj dalej)</li>);
  }
  return <ul>{items}</ul>
}
```

```js Box.js active
import { useRef, useEffect } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver.js';

export default function Box() {
  const ref = useRef(null);
  const isIntersecting = useIntersectionObserver(ref);

  useEffect(() => {
   if (isIntersecting) {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
    } else {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    }
  }, [isIntersecting]);

  return (
    <div ref={ref} style={{
      margin: 20,
      height: 100,
      width: 100,
      border: '2px solid black',
      backgroundColor: 'blue'
    }} />
  );
}
```

```js useIntersectionObserver.js
import { useState, useEffect } from 'react';

export function useIntersectionObserver(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const div = ref.current;
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      setIsIntersecting(entry.isIntersecting);
    }, {
       threshold: 1.0
    });
    observer.observe(div);
    return () => {
      observer.disconnect();
    }
  }, [ref]);

  return isIntersecting;
}
```

</Sandpack>

<Solution />

</Recipes>

---

### Sterowanie widżetem niewykorzystującym Reacta {/*controlling-a-non-react-widget*/}

Czasami chcesz, aby zewnętrzny system był zsynchronizowany z jakąś właściwością lub stanem twojego komponentu.

Na przykład, jeśli masz widżet mapy z zewnętrznej biblioteki lub komponent odtwarzacza wideo napisany bez użycia Reacta, możesz wykorzystać efekt, aby wywołać metody, które dostosowują jego stan do aktualnego stanu twojego reactowego komponentu. Ten efekt tworzy instancję klasy `MapWidget` zdefiniowanej w pliku `map-widget.js`. Kiedy zmienisz właściwość `zoomLevel` komponentu `Map`, efekt wywoła metodę `setZoom()` na instancji klasy, aby utrzymać ich synchronizację:

<Sandpack>

```json package.json hidden
{
  "dependencies": {
    "leaflet": "1.9.1",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "remarkable": "2.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

```js App.js
import { useState } from 'react';
import Map from './Map.js';

export default function App() {
  const [zoomLevel, setZoomLevel] = useState(0);
  return (
    <>
      Przybliżenie: {zoomLevel}x
      <button onClick={() => setZoomLevel(zoomLevel + 1)}>+</button>
      <button onClick={() => setZoomLevel(zoomLevel - 1)}>-</button>
      <hr />
      <Map zoomLevel={zoomLevel} />
    </>
  );
}
```

```js Map.js active
import { useRef, useEffect } from 'react';
import { MapWidget } from './map-widget.js';

export default function Map({ zoomLevel }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current === null) {
      mapRef.current = new MapWidget(containerRef.current);
    }

    const map = mapRef.current;
    map.setZoom(zoomLevel);
  }, [zoomLevel]);

  return (
    <div
      style={{ width: 200, height: 200 }}
      ref={containerRef}
    />
  );
}
```

```js map-widget.js
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

export class MapWidget {
  constructor(domNode) {
    this.map = L.map(domNode, {
      zoomControl: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      scrollWheelZoom: false,
      zoomAnimation: false,
      touchZoom: false,
      zoomSnap: 0.1
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
    this.map.setView([0, 0], 0);
  }
  setZoom(level) {
    this.map.setZoom(level);
  }
}
```

```css
button { margin: 5px; }
```

</Sandpack>

W tym przykładzie nie jest potrzebna funkcja czyszcząca, ponieważ klasa `MapWidget` steruje tylko węzłem DOM, który został do niej przekazany. Po usunięciu reactowego komponentu `Map` z drzewa, zarówno węzeł DOM, jak i instancja klasy `MapWidget` zostaną automatycznie posprzątane przez javascriptowy mechanizm czyszczenia pamięci (ang. *garbage collector*).

---

### Pobieranie danych przy użyciu efektów {/*fetching-data-with-effects*/}

Możesz użyć efektu do pobierania danych dla swojego komponentu. Zauważ, że [jeśli korzystasz z frameworka,](/learn/start-a-new-react-project#production-grade-react-frameworks) użycie mechanizmu pobierania danych dostarczonego przez niego będzie o wiele wydajniejsze niż ręczne pisanie efektów.

Jeśli chcesz ręcznie pobierać dane za pomocą efektu, twój kod może wyglądać tak:

```js
import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';

export default function Page() {
  const [person, setPerson] = useState('Alicja');
  const [bio, setBio] = useState(null);

  useEffect(() => {
    let ignore = false;
    setBio(null);
    fetchBio(person).then(result => {
      if (!ignore) {
        setBio(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, [person]);

  // ...
```

Zwróć uwagę na zmienną `ignore`, która jest inicjowana jako `false` i ustawiana na `true` podczas czyszczenia. Zapewnia to, że [twój kod nie będzie podatny na tzw. "hazardy" (ang. *race conditions*):](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect) odpowiedzi z sieci mogą przychodzić w innej kolejności, niż zostały wysłane żądania.

<Sandpack>

```js App.js
import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';

export default function Page() {
  const [person, setPerson] = useState('Alicja');
  const [bio, setBio] = useState(null);
  useEffect(() => {
    let ignore = false;
    setBio(null);
    fetchBio(person).then(result => {
      if (!ignore) {
        setBio(result);
      }
    });
    return () => {
      ignore = true;
    }
  }, [person]);

  return (
    <>
      <select value={person} onChange={e => {
        setPerson(e.target.value);
      }}>
        <option value="Alicja">Alicja</option>
        <option value="Barbara">Barbara</option>
        <option value="Tadeusz">Tadeusz</option>
      </select>
      <hr />
      <p><i>{bio ?? 'Ładowanie...'}</i></p>
    </>
  );
}
```

```js api.js hidden
export async function fetchBio(person) {
  const delay = person === 'Barbara' ? 2000 : 200;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve( person + ' - biografia.');
    }, delay);
  })
}
```

</Sandpack>

Możesz to również przepisać, używając składni [`async` / `await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), ale nadal musisz napisać funkcję czyszczącą:

<Sandpack>

```js App.js
import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';

export default function Page() {
  const [person, setPerson] = useState('Alicja');
  const [bio, setBio] = useState(null);
  useEffect(() => {
    async function startFetching() {
      setBio(null);
      const result = await fetchBio(person);
      if (!ignore) {
        setBio(result);
      }
    }

    let ignore = false;
    startFetching();
    return () => {
      ignore = true;
    }
  }, [person]);

  return (
    <>
      <select value={person} onChange={e => {
        setPerson(e.target.value);
      }}>
        <option value="Alicja">Alicja</option>
        <option value="Barbara">Barbara</option>
        <option value="Tadeusz">Tadeusz</option>
      </select>
      <hr />
      <p><i>{bio ?? 'Ładowanie...'}</i></p>
    </>
  );
}
```

```js api.js hidden
export async function fetchBio(person) {
  const delay = person === 'Barbara' ? 2000 : 200;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(person + ' - biografia.');
    }, delay);
  })
}
```

</Sandpack>

Pisanie kodu do pobierania danych bezpośrednio w efektach staje się powtarzalne i sprawia, że później trudniej jest dodać optymalizacje, takie jak buforowanie (ang. *cache*) lub renderowanie po stronie serwera (ang. *server rendering*). [Łatwiej jest użyć własnych hooków - albo stworzonych przez ciebie, albo utrzymywanych przez społeczność.](/learn/reusing-logic-with-custom-hooks#when-to-use-custom-hooks)

<DeepDive>

#### Jakie są dobre alternatywy dla pobierania danych w efektach? {/*what-are-good-alternatives-to-data-fetching-in-effects*/}

Pisanie wywołań `fetch` wewnątrz efektów to [popularny sposób na pobieranie danych](https://www.robinwieruch.de/react-hooks-fetch-data/), zwłaszcza w aplikacjach działających w pełni po stronie klienta. Jest to jednak podejście wymagające dużej ilości ręcznej pracy i ma istotne wady:

- **Efekty nie są uruchamiane na serwerze.** Oznacza to, że początkowy HTML renderowany po stronie serwera będzie zawierał jedynie stan ładowania bez danych. Komputer klienta musiałby pobrać cały kod JavaScript i wyrenderować aplikację, tylko po to, by odkryć, że teraz musi pobrać dane. To nie jest zbyt wydajne podejście.
- **Bezpośrednie pobieranie danych w efektach sprzyja tworzeniu "kaskad żądań sieciowych" (ang. *network waterfall*).** Renderujesz komponent rodzica, on pobiera pewne dane, renderuje komponenty potomne, a następnie one zaczynają pobierać swoje dane. Jeśli sieć nie jest zbyt szybka, takie podejście jest to znacznie wolniejsze niż równoczesne pobieranie wszystkich danych.
- **Pobieranie bezpośrednio w efektach zazwyczaj oznacza brak wstępnego wczytywania (ang. *preload*) i buforowania danych (ang. *cache*).** Na przykład, jeśli komponent jest odmontowywany, a następnie ponownie montowany, będzie trzeba ponownie pobrać dane.
- **Nie jest to zbyt ergonomiczne.** Pisanie wywołania `fetch` w taki sposób, aby uniknąć błędów takich jak [hazardy](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect), wymaga dość dużej ilości kodu.

Te wady nie dotyczą tylko Reacta. Występują one przy pobieraniu danych podczas montowania komponentu przy użyciu dowolnej biblioteki. Podobnie jak w przypadku routingu, poprawne wykonywanie pobierania danych nie jest proste, dlatego polecamy następujące podejścia:

- **Jeśli używasz [frameworka](/learn/start-a-new-react-project#production-grade-react-frameworks), wykorzystaj wbudowany mechanizm pobierania danych.** Współczesne frameworki reactowe mają zintegrowane mechanizmy pobierania danych, które są wydajne i rozwiązują powyższe problemy.
- **W przeciwnym razie, rozważ użycie lub zbudowanie pamięci podręcznej po stronie klienta.** Popularne rozwiązania open source obejmują [React Query](https://react-query.tanstack.com/), [useSWR](https://swr.vercel.app/) oraz [React Router 6.4+.](https://beta.reactrouter.com/en/main/start/overview) Możesz także zbudować swoje własne rozwiązanie, w którym użytoby efektów, ale także dodano logikę do deduplikacji zapytań, buforowania odpowiedzi i unikania kaskad żądań sieciowych (poprzez wstępne wczytywanie danych lub przeniesienie wymagań dot. danych do ścieżek).

Możesz nadal pobierać dane bezpośrednio w efektach, jeśli żadne z wymienionych podejść nie spełnia twoich potrzeb.

</DeepDive>

---

### Określanie reaktywnych zależności {/*specifying-reactive-dependencies*/}

**Zauważ, że nie możesz dowolnie "wybrać" zależności twojego efektu.** Każda <CodeStep step={2}>reaktywna wartość</CodeStep> użyta w kodzie twojego efektu musi być zadeklarowana jako zależność. Tablica zależności twojego efektu jest określana przez otaczający kod:

```js [[2, 1, "roomId"], [2, 2, "serverUrl"], [2, 5, "serverUrl"], [2, 5, "roomId"], [2, 8, "serverUrl"], [2, 8, "roomId"]]
function ChatRoom({ roomId }) { // To jest wartość reaktywna
  const [serverUrl, setServerUrl] = useState('https://localhost:1234'); // To też jest wartość reaktywna

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // Ten efekt odczytuje te wartości reaktywne
    connection.connect();
    return () => connection.disconnect();
  }, [serverUrl, roomId]); // ✅ Musisz zatem określić je jako zależności twojego efektu
  // ...
}
```

Jeśli zmieni się `serverUrl` lub `roomId`, twój efekt ponownie połączy się z czatem, używając nowych wartości.

**[Wartościami reaktywnymi](/learn/lifecycle-of-reactive-effects#effects-react-to-reactive-values) są właściwości oraz wszystkie zmienne i funkcje zadeklarowane bezpośrednio wewnątrz twojego komponentu.** Ponieważ `roomId` i `serverUrl` są wartościami reaktywnymi, nie możesz ich pomijać w zależnościach. Jeśli spróbujesz je pominąć i [twój linter jest poprawnie skonfigurowany pod Reacta,](/learn/editor-setup#linting) wskaże on to jako błąd, który musisz poprawić:

```js {8}
function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');
  
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []); // 🔴 Reactowy hook useEffect ma brakujące zależności: 'roomId' i 'serverUrl'
  // ...
}
```

**Aby usunąć zależność, musisz "udowodnić" linterowi, że to *nie musi być* zależność.** Na przykład, możesz przenieść `serverUrl` poza swój komponent i tym samym udowodnić, że nie jest wartość reaktywna i nie zmieni się podczas ponownego renderowania:

```js {1,8}
const serverUrl = 'https://localhost:1234'; // To nie jest już wartość reaktywna

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ Wszystkie zależności zadeklarowane
  // ...
}
```

Teraz, kiedy `serverUrl` nie jest już wartością reaktywną (i nie może zmienić się podczas ponownego renderowania), nie musi być zależnością. **Jeśli kod twojego efektu nie używa żadnych wartości reaktywnych, jego tablica zależności powinna być pusta (`[]`):**

```js {1,2,9}
const serverUrl = 'https://localhost:1234'; // To nie jest już wartość reaktywna
const roomId = 'music'; // To nie jest już wartość reaktywna

function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []); // ✅ Wszystkie zależności zadeklarowane
  // ...
}
```

[Efekt z pustymi zależnościami](/learn/lifecycle-of-reactive-effects#what-an-effect-with-empty-dependencies-means) nie zostanie ponownie uruchomiony, gdy zmieni się którakolwiek właściwość lub stan twojego komponentu.

<Pitfall>

W już istniejącym kodzie, możesz mieć pewne efekty, które uciszają lintera w taki sposób:

```js {3-4}
useEffect(() => {
  // ...
  // 🔴 Unikaj uciszania lintera w taki sposób:
  // eslint-ignore-next-line react-hooks/exhaustive-deps
}, []);
```

**Kiedy zależności nie pasują do kodu, istnieje duże ryzyko wprowadzenia błędów.** Uciszająć lintera, "oszukujesz" Reacta co do wartości, od których zależy twój efekt. [Zamiast tego, udowodnij, że są one zbędne.](/learn/removing-effect-dependencies#removing-unnecessary-dependencies)

</Pitfall>

<Recipes titleText="Przykłady przekazywania reaktywnych zaleźności" titleId="examples-dependencies">

#### Przekazywanie tablicy zależności {/*passing-a-dependency-array*/}

Jeśli określisz zależności, twój efekt zostanie uruchomiony **po początkowym wyrenderowaniu _oraz_ po ponownym renderowaniu z zmienionymi zależnościami.**

```js {3}
useEffect(() => {
  // ...
}, [a, b]); // Zostanie uruchomiony ponownie, jeśli a lub b są różne
```

W poniższym przykładzie `serverUrl` i `roomId` to [wartości reaktywne,](/learn/lifecycle-of-reactive-effects#effects-react-to-reactive-values) więc obie muszą być określone jako zależności. W rezultacie wybór innego pokoju z rozwijanej listy lub edycja adresu URL serwera powoduje ponowne połączenie się czatu. Z kolei `message` nie jest używany wewnątrz efektu (przez co nie jest zależnością), więc edycja wiadomości nie spowoduje ponownego połączenia się z czatem.

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [serverUrl, roomId]);

  return (
    <>
      <label>
        URL servera:{' '}
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <h1>Witaj w pokoju: {roomId}!</h1>
      <label>
        Twoja wiadomość:{' '}
        <input value={message} onChange={e => setMessage(e.target.value)} />
      </label>
    </>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  const [roomId, setRoomId] = useState('ogólny');
  return (
    <>
      <label>
        Wybierz pokój czatu:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="ogólny">ogólny</option>
          <option value="podróże">podróże</option>
          <option value="muzyka">muzyka</option>
        </select>
        <button onClick={() => setShow(!show)}>
          {show ? 'Zamknij czat' : 'Otwórz czat'}
        </button>
      </label>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId}/>}
    </>
  );
}
```

```js chat.js
export function createConnection(serverUrl, roomId) {
  // Rzeczywista implementacja naprawdę połączyłaby się z serwerem
  return {
    connect() {
      console.log('✅ Łączenie z pokojem "' + roomId + '" na ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Rozłączono z pokojem "' + roomId + '" na ' + serverUrl);
    }
  };
}
```

```css
input { margin-bottom: 10px; }
button { margin-left: 5px; }
```

</Sandpack>

<Solution />

#### Przekazywanie pustej tablicy zależności {/*passing-an-empty-dependency-array*/}

Jeśli twój efekt naprawdę nie używa żadnych wartości reaktywnych, zostanie on uruchomiony **tylko po początkowym renderowaniu.**

```js {3}
useEffect(() => {
  // ...
}, []); // Nie uruchomi się ponownie (za wyjątkiem pojedynczego razu w trybie deweloperskim)
```

**Nawet w przypadku pustych zależności, efekt i jego funkcja czyszcząca będą [uruchomione dodatkowo jeszcze raz w trybie deweloperskim](/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development), aby pomóc w znajdowaniu błędów.**


W tym przykładzie, zarówno `serverUrl`, jak i `roomId` są niezmienne. Ponieważ są zadeklarowane poza komponentem, nie są wartościami reaktywnymi i dlatego nie są zależnościami. Lista zależności jest pusta, więc efekt nie zostanie uruchomiony po ponownym renderowaniu.

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';
const roomId = 'muzyka';

function ChatRoom() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []);

  return (
    <>
      <h1>Witaj w pokoju: {roomId}</h1>
      <label>
        Twoja wiadomość:{' '}
        <input value={message} onChange={e => setMessage(e.target.value)} />
      </label>
    </>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? 'Zamknij czat' : 'Otwórz czat'}
      </button>
      {show && <hr />}
      {show && <ChatRoom />}
    </>
  );
}
```

```js chat.js
export function createConnection(serverUrl, roomId) {
  // Rzeczywista implementacja naprawdę połączyłaby się z serwerem
  return {
    connect() {
      console.log('✅ Łączenie z pokojem "' + roomId + '" na ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Rozłączono z pokojem "' + roomId + '" na ' + serverUrl);
    }
  };
}
```

</Sandpack>

<Solution />


#### Nieprzekazywanie żadnej tablicy zależności {/*passing-no-dependency-array-at-all*/}

Jeśli w ogóle nie przekażesz tablicy zależności, twój efekt uruchomi się **po każdym pojedynczym (i ponownym) renderowaniu** twojego komponentu.

```js {3}
useEffect(() => {
  // ...
}); // Zawsze uruchamia się ponownie
```

W tym przykładzie, efekt uruchomi się ponownie, gdy zmienisz `serverUrl` i `roomId`, co jest oczekiwane. Jednakże uruchomi się *również* po zmianie `message`, co prawdopodobnie nie jest pożądane. Dlatego właśnie zazwyczaj określa się tablicę zależności.

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }); // Brak jakiekolwiek tablicy zależności

  return (
    <>
      <label>
        URL servera:{' '}
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <h1>Witaj w pokoju: {roomId}</h1>
      <label>
        Twoja wiadomość:{' '}
        <input value={message} onChange={e => setMessage(e.target.value)} />
      </label>
    </>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  const [roomId, setRoomId] = useState('ogólny');
  return (
    <>
      <label>
        Wybierz pokój czatu:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="ogólny">ogólny</option>
          <option value="podróże">podróże</option>
          <option value="muzyka">muzyka</option>
        </select>
        <button onClick={() => setShow(!show)}>
          {show ? 'Zamknij czat' : 'Otwórz czat'}
        </button>
      </label>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId}/>}
    </>
  );
}
```

```js chat.js
export function createConnection(serverUrl, roomId) {
  // Rzeczywista implementacja naprawdę połączyłaby się z serwerem
  return {
    connect() {
      console.log('✅ Łączenie z pokojem "' + roomId + '" na ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Rozłączono z pokojem "' + roomId + '" na ' + serverUrl);
    }
  };
}
```

```css
input { margin-bottom: 10px; }
button { margin-left: 5px; }
```

</Sandpack>

<Solution />

</Recipes>

---

### Aktualizacja stanu w efekcie na podstawie poprzedniego stanu {/*updating-state-based-on-previous-state-from-an-effect*/}

Gdy w efekcie chcesz zaktualizować stan na podstawie poprzedniego stanu, możesz napotkać na pewien problem:

```js {6,9}
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count + 1); // Chcesz zwiększać licznik co sekundę...
    }, 1000)
    return () => clearInterval(intervalId);
  }, [count]); // 🚩 ...ale podanie `count` jako zależności zawsze resetuje interwał.
  // ...
}
```

Ponieważ `count` jest wartością reaktywną, musi być określona na liście zależności. Jednakże to powoduje uruchamianie się czyszczenia i efektu ponownie za każdym razem, gdy zmieni się `count`. Nie jest to idealne rozwiązanie.

Aby to naprawić, [przekaż funkcje aktualizującą `c => c + 1`](/reference/react/useState#updating-state-based-on-the-previous-state) do `setCount`:

<Sandpack>

```js
import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(c => c + 1); // ✅ Przekaź funkcję aktualizującą
    }, 1000);
    return () => clearInterval(intervalId);
  }, []); // ✅ Teraz count nie jest juź zależnością

  return <h1>{count}</h1>;
}
```

```css
label {
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
}

body {
  min-height: 150px;
}
```

</Sandpack>

Teraz, kiedy przekazujesz funkcję `c => c + 1` zamiast `count + 1`, [twój efekt mie musi już zależeć od `count`.](/learn/removing-effect-dependencies#are-you-reading-some-state-to-calculate-the-next-state) W rezultacie tej poprawki, nie ma już potrzeby zatrzymywania i ponownego uruchamiania interwału za każdym razem, gdy zmienia się `count`.

---


### Removing unnecessary object dependencies {/*removing-unnecessary-object-dependencies*/}

If your Effect depends on an object or a function created during rendering, it might run too often. For example, this Effect re-connects after every render because the `options` object is [different for every render:](/learn/removing-effect-dependencies#does-some-reactive-value-change-unintentionally)

```js {6-9,12,15}
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  const options = { // 🚩 This object is created from scratch on every re-render
    serverUrl: serverUrl,
    roomId: roomId
  };

  useEffect(() => {
    const connection = createConnection(options); // It's used inside the Effect
    connection.connect();
    return () => connection.disconnect();
  }, [options]); // 🚩 As a result, these dependencies are always different on a re-render
  // ...
```

Avoid using an object created during rendering as a dependency. Instead, create the object inside the Effect:

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <input value={message} onChange={e => setMessage(e.target.value)} />
    </>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}
```

```js chat.js
export function createConnection({ serverUrl, roomId }) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    }
  };
}
```

```css
input { display: block; margin-bottom: 20px; }
button { margin-left: 10px; }
```

</Sandpack>

Now that you create the `options` object inside the Effect, the Effect itself only depends on the `roomId` string.

With this fix, typing into the input doesn't reconnect the chat. Unlike an object which gets re-created, a string like `roomId` doesn't change unless you set it to another value. [Read more about removing dependencies.](/learn/removing-effect-dependencies)

---

### Removing unnecessary function dependencies {/*removing-unnecessary-function-dependencies*/}

If your Effect depends on an object or a function created during rendering, it might run too often. For example, this Effect re-connects after every render because the `createOptions` function is [different for every render:](/learn/removing-effect-dependencies#does-some-reactive-value-change-unintentionally)

```js {4-9,12,16}
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  function createOptions() { // 🚩 This function is created from scratch on every re-render
    return {
      serverUrl: serverUrl,
      roomId: roomId
    };
  }

  useEffect(() => {
    const options = createOptions(); // It's used inside the Effect
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // 🚩 As a result, these dependencies are always different on a re-render
  // ...
```

By itself, creating a function from scratch on every re-render is not a problem. You don't need to optimize that. However, if you use it as a dependency of your Effect, it will cause your Effect to re-run after every re-render.

Avoid using a function created during rendering as a dependency. Instead, declare it inside the Effect:

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    function createOptions() {
      return {
        serverUrl: serverUrl,
        roomId: roomId
      };
    }

    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <input value={message} onChange={e => setMessage(e.target.value)} />
    </>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}
```

```js chat.js
export function createConnection({ serverUrl, roomId }) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    }
  };
}
```

```css
input { display: block; margin-bottom: 20px; }
button { margin-left: 10px; }
```

</Sandpack>

Now that you define the `createOptions` function inside the Effect, the Effect itself only depends on the `roomId` string. With this fix, typing into the input doesn't reconnect the chat. Unlike a function which gets re-created, a string like `roomId` doesn't change unless you set it to another value. [Read more about removing dependencies.](/learn/removing-effect-dependencies)

---

### Reading the latest props and state from an Effect {/*reading-the-latest-props-and-state-from-an-effect*/}

<Wip>

This section describes an **experimental API that has not yet been released** in a stable version of React.

</Wip>

By default, when you read a reactive value from an Effect, you have to add it as a dependency. This ensures that your Effect "reacts" to every change of that value. For most dependencies, that's the behavior you want.

**However, sometimes you'll want to read the *latest* props and state from an Effect without "reacting" to them.** For example, imagine you want to log the number of the items in the shopping cart for every page visit:

```js {3}
function Page({ url, shoppingCart }) {
  useEffect(() => {
    logVisit(url, shoppingCart.length);
  }, [url, shoppingCart]); // ✅ All dependencies declared
  // ...
}
```

**What if you want to log a new page visit after every `url` change, but *not* if only the `shoppingCart` changes?** You can't exclude `shoppingCart` from dependencies without breaking the [reactivity rules.](#specifying-reactive-dependencies) However, you can express that you *don't want* a piece of code to "react" to changes even though it is called from inside an Effect. [Declare an *Effect Event*](/learn/separating-events-from-effects#declaring-an-effect-event) with the [`useEffectEvent`](/reference/react/experimental_useEffectEvent) Hook, and move the code reading `shoppingCart` inside of it:

```js {2-4,7,8}
function Page({ url, shoppingCart }) {
  const onVisit = useEffectEvent(visitedUrl => {
    logVisit(visitedUrl, shoppingCart.length)
  });

  useEffect(() => {
    onVisit(url);
  }, [url]); // ✅ All dependencies declared
  // ...
}
```

**Effect Events are not reactive and must always be omitted from dependencies of your Effect.** This is what lets you put non-reactive code (where you can read the latest value of some props and state) inside of them. By reading `shoppingCart` inside of `onVisit`, you ensure that `shoppingCart` won't re-run your Effect.

[Read more about how Effect Events let you separate reactive and non-reactive code.](/learn/separating-events-from-effects#reading-latest-props-and-state-with-effect-events)


---

### Displaying different content on the server and the client {/*displaying-different-content-on-the-server-and-the-client*/}

If your app uses server rendering (either [directly](/reference/react-dom/server) or via a [framework](/learn/start-a-new-react-project#production-grade-react-frameworks)), your component will render in two different environments. On the server, it will render to produce the initial HTML. On the client, React will run the rendering code again so that it can attach your event handlers to that HTML. This is why, for [hydration](/reference/react-dom/client/hydrateRoot#hydrating-server-rendered-html) to work, your initial render output must be identical on the client and the server.

In rare cases, you might need to display different content on the client. For example, if your app reads some data from [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), it can't possibly do that on the server. Here is how you could implement this:

```js
function MyComponent() {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  if (didMount) {
    // ... return client-only JSX ...
  }  else {
    // ... return initial JSX ...
  }
}
```

While the app is loading, the user will see the initial render output. Then, when it's loaded and hydrated, your Effect will run and set `didMount` to `true`, triggering a re-render. This will switch to the client-only render output. Effects don't run on the server, so this is why `didMount` was `false` during the initial server render.

Use this pattern sparingly. Keep in mind that users with a slow connection will see the initial content for quite a bit of time--potentially, many seconds--so you don't want to make jarring changes to your component's appearance. In many cases, you can avoid the need for this by conditionally showing different things with CSS.

---

## Troubleshooting {/*troubleshooting*/}

### My Effect runs twice when the component mounts {/*my-effect-runs-twice-when-the-component-mounts*/}

When Strict Mode is on, in development, React runs setup and cleanup one extra time before the actual setup.

This is a stress-test that verifies your Effect’s logic is implemented correctly. If this causes visible issues, your cleanup function is missing some logic. The cleanup function should stop or undo whatever the setup function was doing. The rule of thumb is that the user shouldn’t be able to distinguish between the setup being called once (as in production) and a setup → cleanup → setup sequence (as in development).

Read more about [how this helps find bugs](/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed) and [how to fix your logic.](/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)

---

### My Effect runs after every re-render {/*my-effect-runs-after-every-re-render*/}

First, check that you haven't forgotten to specify the dependency array:

```js {3}
useEffect(() => {
  // ...
}); // 🚩 No dependency array: re-runs after every render!
```

If you've specified the dependency array but your Effect still re-runs in a loop, it's because one of your dependencies is different on every re-render.

You can debug this problem by manually logging your dependencies to the console:

```js {5}
  useEffect(() => {
    // ..
  }, [serverUrl, roomId]);

  console.log([serverUrl, roomId]);
```

You can then right-click on the arrays from different re-renders in the console and select "Store as a global variable" for both of them. Assuming the first one got saved as `temp1` and the second one got saved as `temp2`, you can then use the browser console to check whether each dependency in both arrays is the same:

```js
Object.is(temp1[0], temp2[0]); // Is the first dependency the same between the arrays?
Object.is(temp1[1], temp2[1]); // Is the second dependency the same between the arrays?
Object.is(temp1[2], temp2[2]); // ... and so on for every dependency ...
```

When you find the dependency that is different on every re-render, you can usually fix it in one of these ways:

- [Updating state based on previous state from an Effect](#updating-state-based-on-previous-state-from-an-effect)
- [Removing unnecessary object dependencies](#removing-unnecessary-object-dependencies)
- [Removing unnecessary function dependencies](#removing-unnecessary-function-dependencies)
- [Reading the latest props and state from an Effect](#reading-the-latest-props-and-state-from-an-effect)

As a last resort (if these methods didn't help), wrap its creation with [`useMemo`](/reference/react/useMemo#memoizing-a-dependency-of-another-hook) or [`useCallback`](/reference/react/useCallback#preventing-an-effect-from-firing-too-often) (for functions).

---

### My Effect keeps re-running in an infinite cycle {/*my-effect-keeps-re-running-in-an-infinite-cycle*/}

If your Effect runs in an infinite cycle, these two things must be true:

- Your Effect is updating some state.
- That state leads to a re-render, which causes the Effect's dependencies to change.

Before you start fixing the problem, ask yourself whether your Effect is connecting to some external system (like DOM, network, a third-party widget, and so on). Why does your Effect need to set state? Does it synchronize with that external system? Or are you trying to manage your application's data flow with it?

If there is no external system, consider whether [removing the Effect altogether](/learn/you-might-not-need-an-effect) would simplify your logic.

If you're genuinely synchronizing with some external system, think about why and under what conditions your Effect should update the state. Has something changed that affects your component's visual output? If you need to keep track of some data that isn't used by rendering, a [ref](/reference/react/useRef#referencing-a-value-with-a-ref) (which doesn't trigger re-renders) might be more appropriate. Verify your Effect doesn't update the state (and trigger re-renders) more than needed.

Finally, if your Effect is updating the state at the right time, but there is still a loop, it's because that state update leads to one of the Effect's dependencies changing. [Read how to debug dependency changes.](/reference/react/useEffect#my-effect-runs-after-every-re-render)

---

### My cleanup logic runs even though my component didn't unmount {/*my-cleanup-logic-runs-even-though-my-component-didnt-unmount*/}

The cleanup function runs not only during unmount, but before every re-render with changed dependencies. Additionally, in development, React [runs setup+cleanup one extra time immediately after component mounts.](#my-effect-runs-twice-when-the-component-mounts)

If you have cleanup code without corresponding setup code, it's usually a code smell:

```js {2-5}
useEffect(() => {
  // 🔴 Avoid: Cleanup logic without corresponding setup logic
  return () => {
    doSomething();
  };
}, []);
```

Your cleanup logic should be "symmetrical" to the setup logic, and should stop or undo whatever setup did:

```js {2-3,5}
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [serverUrl, roomId]);
```

[Learn how the Effect lifecycle is different from the component's lifecycle.](/learn/lifecycle-of-reactive-effects#the-lifecycle-of-an-effect)

---

### My Effect does something visual, and I see a flicker before it runs {/*my-effect-does-something-visual-and-i-see-a-flicker-before-it-runs*/}

If your Effect must block the browser from [painting the screen,](/learn/render-and-commit#epilogue-browser-paint) replace `useEffect` with [`useLayoutEffect`](/reference/react/useLayoutEffect). Note that **this shouldn't be needed for the vast majority of Effects.** You'll only need this if it's crucial to run your Effect before the browser paint: for example, to measure and position a tooltip before the user sees it.
