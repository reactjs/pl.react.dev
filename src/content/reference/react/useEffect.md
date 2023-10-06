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

* `setup`: funkcja z logiką efektu (inaczej nazywana *funkcją konfiguracyjną*). Funkcja ta może również opcjonalnie zwracać *funkcję czyszczącą* (ang. *cleanup function*). Gdy komponent zostaje dodany do drzewa DOM, React uruchamia funkcję konfiguracyjną. Po każdym ponownym renderowaniu, gdy zmienią się zależności, React najpierw uruchamia funkcję czyszczącą (jeśli została zdefiniowana) z poprzednimi wartościami, a następnie uruchamia funkcję konfiguracyjną z nowymi wartościami. Gdy komponent zostanie usunięty z drzewa DOM, React uruchamia funkcję czyszczącą.

* **opcjonalnie** `dependencies`: lista wszystkich reaktywnych wartości użytych w kodzie funkcji konfiguracyjnej. Wartościami reaktywnymi są między innymi właściwości, stany oraz wszystkie zmienne i funkcje zadeklarowane bezpośrednio w ciele twojego komponentu. Jeśli twój linter jest [skonfigurowany pod Reacta](/learn/editor-setup#linting), będzie on sprawdzał, czy każda wartość reaktywna jest poprawnie dodana do zależności. Lista zależności musi mieć stałą liczbę elementów i być zapisana w miejscu wywołania, jak np. `[dep1, dep2, dep3]`. React porównuje każdą zależność ze swoją poprzednią wartością, używając porównania [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is). Jeśli pominiesz ten parametr, efekt zostanie uruchomiony ponownie po każdym renderowaniu komponentu. [Zobacz różnicę między przekazywaniem tablicy zależności, pustej tablicy a brakiem zależności w ogóle.](#examples-dependencies)

#### Zwracana wartość {/*returns*/}

`useEffect` zwraca `undefined`.

#### Zastrzeżenia {/*caveats*/}

* `useEffect` jest hookiem, więc można go wywoływać tylko **na głównym poziomie komponentu** lub w innych hookach. Nie można go wywoływać wewnątrz pętli czy instrukcji warunkowej. Jeśli tego potrzebujesz, wyodrębnij nowy komponent i przenieś do niego stan.

* Jeśli **nie próbujesz synchronizować się z jakimś zewnętrznym systemem,** [prawdopodobnie nie potrzebujesz efektu.](/learn/you-might-not-need-an-effect)

* W trybie rygorystycznym (ang. *Strict Mode*), React **w środowisku developerskim wywoła dodatkowo funkcję konfiguracyjną i funkcję czyszczącą** jeszcze przed pierwszym właściwym wywołaniem tej pierwszej. Jest to rodzaj testu obciążeniowego, który pozwala upewnić się, że logika funkcji czyszczącej "odzwierciedla" logikę funkcji konfiguracyjnej i że zatrzymuje lub cofa to, co ona robi. Jeśli to powoduje problemy, [zaimplementuj funkcję czyszczącą.](/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)

* Jeśli niektóre z twoich zależności to obiekty lub funkcje zdefiniowane wewnątrz komponentu, istnieje ryzyko, że **spowodują, że efekt będzie wykonywał się częściej niż jest to potrzebne.** Aby to naprawić, usuń zbędne zależności od [obiektów](#removing-unnecessary-object-dependencies) i [funkcji](#removing-unnecessary-function-dependencies). Możesz również [wydzielić aktualizacje stanu](#updating-state-based-on-previous-state-from-an-effect) oraz [logikę niereaktywną](#reading-the-latest-props-and-state-from-an-effect) poza efekt.

* Jeśli twój efekt nie został wywołany przez interakcję (np. kliknięcie), React zazwyczaj pozwoli przeglądarce **najpierw odświeżyć ekran przed uruchomieniem twojego efektu.** Jeśli efekt ten wykonuje jakieś operacje związane z wyświetlaniem (np. ustawianie pozycji dymka (ang. *tooltip*)) i opóźnienie jest zauważalne (np. występuje migotanie), zastąp `useEffect` przez [`useLayoutEffect`.](/reference/react/useLayoutEffect)

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

W tym przykładzie, systemem zewnętrznym jest samo drzewo DOM w przeglądarce. Zazwyczaj nasłuchiwacze zdarzeń (ang. *event listener*) tworzy się za pomocą JSX, ale w ten sposób nie da się nasłuchiwać globalnego obiektu [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window). Efekt pozwala połączyć się z obiektem `window` i nasłuchiwać jego zdarzeń. Aby śledzić pozycję kursora (lub palca) i aktualizować czerwony punkt, aby ten poruszał się razem z nim, należy nasłuchiwać zdarzenia `pointermove`.

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

W tym przykładzie nie jest potrzebna funkcja czyszcząca, ponieważ klasa `MapWidget` steruje tylko węzłem DOM, który został do niej przekazany. Po usunięciu reactowego komponentu `Map` z drzewa, zarówno węzeł DOM, jak i instancja klasy `MapWidget` zostaną automatycznie posprzątane przez javascriptowy program czyszczenia pamięci (ang. *garbage collector*).

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

- **Jeśli używasz [frameworka](/learn/start-a-new-react-project#production-grade-react-frameworks), wykorzystaj jego wbudowany mechanizm pobierania danych.** Współczesne frameworki reactowe mają zintegrowane mechanizmy pobierania danych, które są wydajne i rozwiązują powyższe problemy.
- **W przeciwnym razie, rozważ użycie lub zbudowanie pamięci podręcznej po stronie klienta.** Popularne rozwiązania open source obejmują [React Query](https://react-query.tanstack.com/), [useSWR](https://swr.vercel.app/) oraz [React Router 6.4+.](https://beta.reactrouter.com/en/main/start/overview) Możesz także zbudować swoje własne rozwiązanie, w którym byłyby użyte efekty, ale także byłaby logika do unikania zduplikowanych zapytań, buforowania odpowiedzi i unikania kaskad żądań sieciowych (poprzez wstępne wczytywanie danych lub przeniesienie wymagań dot. danych do ścieżek).

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

**Kiedy zależności nie pasują do kodu, istnieje duże ryzyko wprowadzenia błędów.** Uciszając lintera, "oszukujesz" Reacta co do wartości, od których zależy twój efekt. [Zamiast tego, udowodnij, że są one zbędne.](/learn/removing-effect-dependencies#removing-unnecessary-dependencies)

</Pitfall>

<Recipes titleText="Przykłady przekazywania reaktywnych zależności" titleId="examples-dependencies">

#### Przekazywanie tablicy zależności {/*passing-a-dependency-array*/}

Jeśli określisz zależności, twój efekt zostanie uruchomiony **po początkowym renderowaniu _oraz_ po ponownym renderowaniu z zmienionymi zależnościami.**

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
        URL serwera:{' '}
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
        URL serwera:{' '}
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
      setCount(c => c + 1); // ✅ Przekaż funkcję aktualizującą
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


### Usuwanie niepotrzebnych zależności od obiektów {/*removing-unnecessary-object-dependencies*/}

Jeśli twój efekt zależy od obiektu lub funkcji utworzonej podczas renderowania, może być uruchamiany zbyt często. Na przykład, ten efekt łączy się ponownie po każdym renderowaniu, ponieważ obiekt `options` jest [inny w każdym renderowaniu:](/learn/removing-effect-dependencies#does-some-reactive-value-change-unintentionally)

```js {6-9,12,15}
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  const options = { // 🚩 Ten obiekt jest tworzony od początku przy każdym renderowaniu
    serverUrl: serverUrl,
    roomId: roomId
  };

  useEffect(() => {
    const connection = createConnection(options); // Jest on użyty w efekcie
    connection.connect();
    return () => connection.disconnect();
  }, [options]); // 🚩 W rezultacie, ta zależność bedzie inna w każdym renderowaniu
  // ...
```

Unikaj używania obiektu utworzonego podczas renderowania jako zależności. Zamiast tego, stwórz obiekt wewnątrz efektu:

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
      <h1>Witaj w pokoju: {roomId}</h1>
      <input value={message} onChange={e => setMessage(e.target.value)} />
    </>
  );
}

export default function App() {
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
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}
```

```js chat.js
export function createConnection({ serverUrl, roomId }) {
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

Teraz, kiedy tworzysz obiekt `options` wewnątrz efektu, sam efekt zależy już tylko od ciągu znaków `roomId`.

Dzięki tej poprawce, pisanie w polu tekstowym nie powoduje ponownego łączenia się z czatem. W przeciwieństwie do obiektu, który jest tworzony na nowo, ciąg znaków taki jak `roomId` nie zmienia się, chyba że zostanie ustawiony na inną wartość. [Dowiedz się więcej o usuwaniu zależności.](/learn/removing-effect-dependencies)

---

### Usuwanie niepotrzebnych zależności od funkcji {/*removing-unnecessary-function-dependencies*/}

Jeśli twój efekt zależy od obiektu lub funkcji utworzonej podczas renderowania, może być uruchamiany zbyt często. Na przykład, ten efekt łączy się ponownie po każdym renderowaniu, ponieważ funkcja `createOptions` jest [inna w każdym renderowaniu:](/learn/removing-effect-dependencies#does-some-reactive-value-change-unintentionally)

```js {4-9,12,16}
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  function createOptions() { // 🚩 Ta funkcja jest tworzona od początku przy każdym renderowaniu
    return {
      serverUrl: serverUrl,
      roomId: roomId
    };
  }

  useEffect(() => {
    const options = createOptions(); // Jest ona użyta w efekcie
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // 🚩 W rezultacie, ta zależność bedzie inna w każdym renderowaniu
  // ...
```

Samo w sobie, tworzenie funkcji od nowa przy każdym renderowaniu nie stanowi problemu. Nie musisz tego optymalizować. Jednakże, jeśli używasz jej jako zależności w swoim efekcie, spowoduje to ponowne uruchomienie efektu po każdym renderowaniu.

Unikaj używania funkcji utworzonej podczas renderowania jako zależności. Zamiast tego, zadeklaruj ją wewnątrz efektu:

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
      <h1>Witaj w pokoju: {roomId}</h1>
      <input value={message} onChange={e => setMessage(e.target.value)} />
    </>
  );
}

export default function App() {
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
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}
```

```js chat.js
export function createConnection({ serverUrl, roomId }) {
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

Teraz, kiedy definiujesz funkcję `createOptions` wewnątrz efektu, sam efekt zależy już tylko od ciągu znaków `roomId`. Dzięki tej poprawce, pisanie w polu tekstowym nie powoduje ponownego łączenia się z czatem. W przeciwieństwie do funkcji, która jest tworzona na nowo, ciąg znaków taki jak `roomId` nie zmienia się, chyba że zostanie ustawiony na inną wartość. [Dowiedz się więcej o usuwaniu zależności.](/learn/removing-effect-dependencies)

---

### Odczytywanie najnowszych właściwości i stanu z efektu {/*reading-the-latest-props-and-state-from-an-effect*/}

<Wip>

Ta sekcja opisuje **eksperymentalne API, które nie zostało jeszcze wydane** w stabilnej wersji Reacta.

</Wip>

Standardowo, gdy w efekcie czytasz wartość reaktywną, musisz ją dodać jako zależność. To zapewnia, że twój efekt "reaguje" na każdą zmianę tej wartości. Jest to oczekiwane zachowanie dla większości zależności.

**Jednakże czasami będziesz chcieć odczytać w efekcie *najnowsze* właściwości i stan bez "reagowania" na nie.** Na przykład, wyobraź sobie, że chcesz zapisać do logów liczbę produktów w koszyku zakupowym dla każdej wizyty na stronie:

```js {3}
function Page({ url, shoppingCart }) {
  useEffect(() => {
    logVisit(url, shoppingCart.length);
  }, [url, shoppingCart]); // ✅ Wszystkie zależności zadeklarowane
  // ...
}
```

**A co jeśli chcesz zalogować nową wizytę na stronie po każdej zmianie `url`, ale *nie chcesz* tego robić, jeśli zmienia się tylko `shoppingCart`?** Nie możesz wykluczyć `shoppingCart` z zależności bez naruszania [zasad reaktywności.](#specifying-reactive-dependencies) Jednakże możesz określić, że *nie chcesz*, aby pewien fragment kodu "reagował" na zmiany, chociaż jest wywoływany wewnątrz efektu. [Zadeklaruj *zdarzenie efektu*](/learn/separating-events-from-effects#declaring-an-effect-event) za pomocą hooka [`useEffectEvent`](/reference/react/experimental_useEffectEvent) i przenieś kod odczytujący `shoppingCart` do jego wnętrza:

```js {2-4,7,8}
function Page({ url, shoppingCart }) {
  const onVisit = useEffectEvent(visitedUrl => {
    logVisit(visitedUrl, shoppingCart.length)
  });

  useEffect(() => {
    onVisit(url);
  }, [url]); // ✅ Wszystkie zależności zadeklarowane
  // ...
}
```

**Zdarzenia efektu nie są reaktywne i muszą być zawsze pominięte w zależnościach efektu.** Dzięki temu możesz umieścić kod niereaktywny (gdzie możesz odczytać najnowszą wartość niektórych właściwości i stanu) w ich wnętrzu. Czytając `shoppingCart` wewnątrz `onVisit`, zapewnisz, że `shoppingCart` nie uruchomi ponownie twojego efektu.

[Dowiedz się więcej o tym, jak zdarzenia efektu pozwalają oddzielić kod reaktywny od niereaktywnego.](/learn/separating-events-from-effects#reading-latest-props-and-state-with-effect-events)


---

### Wyświetlanie różnych treści na serwerze i kliencie {/*displaying-different-content-on-the-server-and-the-client*/}

Jeśli twoja aplikacja korzysta z renderowania na serwerze (zarówno [bezpośrednio](/reference/react-dom/server) lub za pomocą [frameworka](/learn/start-a-new-react-project#production-grade-react-frameworks)), twój komponent będzie renderowany w dwóch różnych środowiskach. Na serwerze zostanie on wyrenderowany, aby wygenerować początkowy kod HTML. Na kliencie React uruchomi kod renderowania ponownie, aby mógł podpiąć do tego kodu HTML funkcje obsługujące zdarzenia. Dlatego, aby [hydratacja](/reference/react-dom/client/hydrateRoot#hydrating-server-rendered-html) działała, wynik początkowego renderowania musi być identyczny na kliencie i na serwerze.

W rzadkich przypadkach może zajść potrzeba, aby wyświetlić inną treść na kliencie. Na przykład, jeśli twoja aplikacja odczytuje pewne dane z [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), to nie jest to możliwe do wykonania na serwerze. Oto jak można to zrealizować:

```js
function MyComponent() {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  if (didMount) {
    // ... zwróć JSX używany tylko po stronie klienta ...
  }  else {
    // ... zwróć początkowy kod JSX ...
  }
}
```

Podczas ładowania aplikacji użytkownik zobaczy początkowy wynik renderowania. Następnie, gdy aplikacja zostanie załadowana i ulegnie hydratacji, twój efekt zostanie uruchomiony i ustawi `didMount` na `true`, co spowoduje przerenderowanie. Następnie zostanie wyświetlony wynik renderowania tylko dla klienta. Efekty nie są uruchamiane na serwerze, dlatego też `didMount` było ustawione na `false` podczas początkowego renderowania na serwerze.

Stosuj ten wzorzec z rozwagą. Pamiętaj, że użytkownicy z wolnym połączeniem będą widzieć początkową zawartość przez pewien czas - potencjalnie przez wiele sekund - dlatego nie chcemy nagłych zmian w wyglądzie twojego komponentu. W wielu przypadkach można uniknąć konieczności korzystania z tego rozwiązania, wyświetlając warunkowo inne elementy za pomocą CSS.

---

## Znane problemy {/*troubleshooting*/}

### Mój efekt jest uruchamiany podwójnie, gdy komponent jest montowany {/*my-effect-runs-twice-when-the-component-mounts*/}

Kiedy tryb rygorystyczny jest włączony, w trybie deweloperskim React uruchamia dodatkowo funkcje konfiguracyjną i czyszczącą przed właściwym uruchomieniem funkcji konfiguracyjnej.

Jest to test obciążeniowy, który sprawdza, czy logika twojego efektu jest poprawnie zaimplementowana. Jeśli to powoduje widoczne problemy, oznacza to, że brakuje pewnej logiki w funkcji czyszczącej. Funkcja ta powinna zatrzymać lub cofać to, co robi funkcja konfiguracyjna. Ogólna zasada jest taka, że użytkownik nie powinien być w stanie rozróżnić między tym, czy konfiguracja został wywołana tylko raz (jak na produkcji), czy też w sekwencji konfiguracja → czyszczenie → konfiguracja (jak w trybie deweloperskim).

Dowiedz się więcej o tym, [jak to pomaga znajdować błędy](/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed) oraz [jak naprawić logikę swojego efektu.](/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)

---

### Mój efekt uruchamia się po każdym przerenderowaniu {/*my-effect-runs-after-every-re-render*/}

Sprawdź najpierw, czy przypadkiem nie zapomniano o podaniu tablicy zależności:

```js {3}
useEffect(() => {
  // ...
}); // 🚩 Brak tablicy zależności: efekt uruchamia się po każdym renderowaniu!
```

Jeśli tablica zależności jest podana, ale twój efekt nadal wywołuje się w pętli, może to być spowodowane tym, że jedna z twoich zależności zmienia się przy każdym przerenderowaniu.

Możesz sprawdzić czy to jest ten problem, dodając wypisywanie zależności do konsoli:

```js {5}
  useEffect(() => {
    // ..
  }, [serverUrl, roomId]);

  console.log([serverUrl, roomId]);
```

Następnie możesz kliknąć prawym przyciskiem myszy na tablicach z różnych przerenderowań w konsoli i wybrać "Zapisz jako zmienną globalną" (ang. *Store as Global Variable*) dla obu z nich. Zakładając, że pierwsza została zapisana jako `temp1`, a druga jako `temp2`, możesz użyć konsoli przeglądarki, aby sprawdzić, czy każda zależność w obu tablicach jest taka sama:

```js
Object.is(temp1[0], temp2[0]); // Czy pierwsza zależność jest taka sama w obu tablicach?
Object.is(temp1[1], temp2[1]); // Czy druga zależność jest taka sama w obu tablicach?
Object.is(temp1[2], temp2[2]); // ... i tak dalej dla każdej zależności ...
```

Kiedy znajdziesz zależność, która zmienia się przy każdym przerenderowaniu, zazwyczaj da się to naprawić jednym z poniższych sposobów:

- [Aktualizacja stanu na podstawie poprzedniego stanu z efektu](#updating-state-based-on-previous-state-from-an-effect)
- [Usunięcie zbędnych zależności od obiektów](#removing-unnecessary-object-dependencies)
- [Usunięcie zbędnych zależności od funkcji](#removing-unnecessary-function-dependencies)
- [Odczytywanie najnowszych właściwości i stanu z efektu](#reading-the-latest-props-and-state-from-an-effect)

Ostatecznym rozwiązaniem (jeśli powyższe metody nie pomogły) jest opakowanie tworzenia obiektu w [`useMemo`](/reference/react/useMemo#memoizing-a-dependency-of-another-hook) lub [`useCallback`](/reference/react/useCallback#preventing-an-effect-from-firing-too-often) (dla funkcji).

---

### Mój efekt wpada w nieskończoną pętlę {/*my-effect-keeps-re-running-in-an-infinite-cycle*/}

Jeżeli twój efekt wpada w nieskończoną pętlę, te dwa warunki muszą być spełnione:

- Twój efekt aktualizuje jakiś stan.
- Ten stan prowadzi do przerenderowania, co powoduje zmiany w zależnościach efektu.

Zanim ruszysz do naprawiania problemu, zastanów się, czy twój efekt nie łączy się z jakimś zewnętrznym systemem (takim jak drzewo DOM, sieć, widżet itp.). Dlaczego twój efekt musi ustawiać stan? Czy synchronizuje się on z tym zewnętrznym systemem? Czy próbujesz za jego pomocą zarządzać przepływem danych w twojej aplikacji?

Jeśli nie ma żadnego zewnętrznego systemu, zastanów się, czy [całkowite usunięcie efektu](/learn/you-might-not-need-an-effect) nie uprościłoby twojej logiki.

Jeśli rzeczywiście synchronizujesz się z jakimś zewnętrznym systemem, zastanów się, dlaczego i pod jakim warunkiem twój efekt powinien aktualizować stan. Czy zmieniło się coś, co wpływa na to jak powinien wyglądać twój komponent? Jeśli musisz śledzić jakieś dane, które nie są używane do renderowania, może bardziej odpowiednie będzie użycie [referencji](/reference/react/useRef#referencing-a-value-with-a-ref) (która nie powoduje przerenderowania). Upewnij się, że twój efekt nie aktualizuje stanu (i nie powoduje ponownych renderowań) częściej niż to konieczne.

Kończąc, jeśli twój efekt aktualizuje stan w odpowiednim momencie, ale wciąż występuje zapętlenie, oznacza to, że ta aktualizacja stanu prowadzi do zmiany jednej z zależności efektu. [Przeczytaj, jak debugować zmiany w zależnościach.](/reference/react/useEffect#my-effect-runs-after-every-re-render)

---

### Moja funkcja czyszcząca jest uruchamiana nawet, gdy mój komponent nie jest odmontowywany {/*my-cleanup-logic-runs-even-though-my-component-didnt-unmount*/}

Funkcja czyszcząca uruchamia się nie tylko podczas odmontowywania, ale również przed każdym przerenderowaniem ze zmienionymi zależnościami. Dodatkowo, w trybie deweloperskim, React [uruchamia funkcję konfiguracyjną oraz czyszczącą dodatkowy raz, tuż po zamontowaniu komponentu.](#my-effect-runs-twice-when-the-component-mounts)

Jeśli masz kod czyszczący bez odpowiadającego mu kodu konfigurującego, zazwyczaj oznacza to, że kod ten może powodować problemy:

```js {2-5}
useEffect(() => {
  // 🔴 Unikaj: Logika czyszczenia bez odpowiadającej jej logiki konfiguracyjnej.
  return () => {
    doSomething();
  };
}, []);
```

Twoja logika czyszcząca powinna być "symetryczna" względem logiki konfiguracyjnej i powinna zatrzymać lub cofać to, co zrobiła funkcja konfiguracyjna:

```js {2-3,5}
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [serverUrl, roomId]);
```

[Dowiedz się, jak cykl życia efektu różni się od cyklu życia komponentu.](/learn/lifecycle-of-reactive-effects#the-lifecycle-of-an-effect)

---

### Mój efekt robi coś wizualnego i widzę migotanie przed jego uruchomieniem {/*my-effect-does-something-visual-and-i-see-a-flicker-before-it-runs*/}

Jeśli Twój efekt musi wstrzymać przeglądarkę przed [pokazaniem zawartości na ekranie,](/learn/render-and-commit#epilogue-browser-paint) zastąp `useEffect` z pomocą [`useLayoutEffect`](/reference/react/useLayoutEffect). Pamiętaj, że **to nie będzie konieczne w przypadku zdecydowanej większości efektów.** Będziesz tego potrzebować tylko wtedy, gdy konieczne jest uruchomienie efektu przed tym jak przeglądarka zacznie wyświetlać zawartość, na przykład do pomiaru i pozycjonowania dymka podpowiedzi zanim użytkownik go zobaczy.
