---
title: 'Odwoływanie się do wartości za pomocą referencji'
---

<Intro>

Gdy chcesz, aby komponent "zapamiętał" pewne informacje, ale nie chcesz, aby te informacje [wywoływały ponowne renderowania](/learn/render-and-commit), możesz użyć *referencji*.

</Intro>

<YouWillLearn>

- Jak dodać referencję do komponentu
- Jak zaktualizować wartość referencji
- Czym referencje różnią się od stanu
- Jak bezpiecznie używać referencji

</YouWillLearn>

## Dodawanie referencji do komponentu {/*adding-a-ref-to-your-component*/}

Możesz dodać referencję do swojego komponentu, importując hook `useRef` z Reacta:

```js
import { useRef } from 'react';
```

We wnętrzu swojego komponentu wywołaj hook `useRef`, przekazując jako jedyny argument początkową wartość, do której chcesz się odwoływać. Na przykład, oto referencja do wartości `0`:

```js
const ref = useRef(0);
```

`useRef` zwraca obiekt o następującej strukturze:

```js
{ 
  current: 0 // Wartość, którą przekazałeś do useRef
}
```

<Illustration src="/images/docs/illustrations/i_ref.png" alt="Strzałka z napisem 'current' włożona do kieszeni z napisem 'ref'" />

Możesz uzyskać dostęp do bieżącej wartości tej referencji przez właściwość `ref.current`. Ta wartość jest celowo mutowalna, co oznacza, że możesz zarówno ją odczytywać, jak i zapisywać. To jak tajna kieszeń twojego komponentu, której React nie śledzi. (To właśnie sprawia, że jest to "wyjście awaryjne" z jednokierunkowego przepływu danych Reacta - więcej na ten temat poniżej!)

Tutaj, przycisk będzie inkrementować `ref.current` przy każdym kliknięciu:

<Sandpack>

```js
import { useRef } from 'react';

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('Kliknąłeś ' + ref.current + ' razy!');
  }

  return (
    <button onClick={handleClick}>
      Kliknij mnie!
    </button>
  );
}
```

</Sandpack>

Referencja wskazuje na liczbę, ale podobnie jak [stan](/learn/state-a-components-memory), możesz wskazać na cokolwiek: ciąg znaków, obiekt, a nawet funkcję. W przeciwieństwie do stanu, referencja to zwykły obiekt JavaScript z właściwością `current`, którą możesz odczytać i modyfikować.

Zwróć uwagę, że **komponent nie renderuje się ponownie przy każdej inkrementacji.** Podobnie jak stan, referencje są przechowywane przez Reacta między przerenderowaniami. Jednak ustawienie stanu powoduje ponowne renderowanie komponentu, a zmiana referencji - nie!

## Przykład: budowanie stoperu {/*example-building-a-stopwatch*/}

Możesz połączyć referencje i stan w jednym komponencie. Na przykład, zbudujmy stoper, który użytkownik może uruchomić lub zatrzymać, naciskając przycisk. Aby wyświetlić, ile czasu minęło od momentu naciśnięcia przycisku "Start", musisz śledzić, kiedy przycisk Start został naciśnięty i jaki jest bieżący czas. **Te informacje są używane do renderowania, dlatego będziesz przechowywać je w stanie:**

```js
const [startTime, setStartTime] = useState(null);
const [now, setNow] = useState(null);
```

Kiedy użytkownik naciśnie "Start", użyjesz metody [`setInterval`](https://developer.mozilla.org/docs/Web/API/setInterval), aby aktualizować czas co 10 milisekund:

<Sandpack>

```js
import { useState } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);

  function handleStart() {
    // Rozpoczęcie odliczania.
    setStartTime(Date.now());
    setNow(Date.now());

    setInterval(() => {
      // Zaktualizowanie bieżącego czasu co 10 ms.
      setNow(Date.now());
    }, 10);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Minęło: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        Start
      </button>
    </>
  );
}
```

</Sandpack>

Kiedy przycisk "Stop" zostanie naciśnięty, musisz anulować istniejący interwał, aby przestał aktualizować zmienną stanu now. Możesz to zrobić, wywołując metodę [`clearInterval`](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval), ale musisz przekazać mu identyfikator interwału, który został wcześniej zwrócony przez wywołanie metody `setInterval` po naciśnięciu przycisku Start. Musisz przechować identyfikator interwału w jakimś miejscu. **Ponieważ identyfikator interwału nie jest używany do renderowania, możesz przechować go w referencji:**

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Minęło: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        Start
      </button>
      <button onClick={handleStop}>
        Stop
      </button>
    </>
  );
}
```

</Sandpack>

Jeśli dana informacja jest wykorzystywana podczas renderowania, przechowuj ją w stanie. Kiedy informacja jest potrzebna tylko przez obsługiwacze zdarzeń i jej zmiana nie wymaga ponownego renderowania, użycie referencji może być bardziej wydajne.

## Różnice między referencjami a stanem {/*differences-between-refs-and-state*/}

Możesz pomyśleć, że referencje wydają się mniej "rygorystyczne" niż stan – na przykład pozwalają na mutowanie wartości bez konieczności używania funkcji do ustawiania stanu. Jednak w większości przypadków będziesz chciał używać stanu. Referencje to "wyjście awaryjne", które rzadko będziesz wykorzystywać. Oto porównanie stanu i referencji:

| refs                                                                                        | state                                                                                                                                                   |
|---------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| `useRef(initialValue)` zwraca `{ current: initialValue }`                                   | `useState(initialValue)` zwraca bieżącą wartość zmiennej stanu oraz funkcję ustawiającą stan (`[value, setValue]`)                                      |
| Nie wywołuje ponownego renderowania, gdy go zmienisz.                                       | Wywołuje ponowne renderowanie, gdy go zmienisz.                                                                                                         |
| "Mutowalny" - możesz modyfikować i aktualizować wartość current poza procesem renderowania. | "Niemutowalny" - musisz używać funkcji ustawiającej stan, aby modyfikować zmienne stanu i zainicjować kolejne renderowanie.                             |
| Nie powinieneś odczytywać (ani zapisywać) wartości `current` podczas renderowania.          | Możesz odczytać stan w dowolnym momencie. Jednak każde renderowanie ma swoją własną [migawkę](/learn/state-as-a-snapshot) stanu, która nie zmienia się. | 

Oto przycisk licznika zaimplementowany za pomocą stanu:

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Kliknąłeś {count} razy
    </button>
  );
}
```

</Sandpack>

Ponieważ wartość `count` jest wyświetlana, ma sens użycie zmiennej stanu do jej przechowywania. Kiedy wartość licznika jest ustawiana za pomocą `setCount()`, React ponownie renderuje komponent, a ekran jest aktualizowany, aby odzwierciedlić nową wartość licznika.

Gdybyś próbował zaimplementować to za pomocą referencji, React nigdy nie przerenderowałby ponownie komponentu, więc nigdy nie zobaczyłbyś zmiany licznika! Zobacz, że kliknięcie tego przycisku **nie aktualizuje jego tekstu**:

<Sandpack>

```js
import { useRef } from 'react';

export default function Counter() {
  let countRef = useRef(0);

  function handleClick() {
    // To nie przerenderowuje komponentu!
    countRef.current = countRef.current + 1;
  }

  return (
    <button onClick={handleClick}>
      Kliknąłeś {countRef.current} razy
    </button>
  );
}
```

</Sandpack>

Dlatego odczytywanie `ref.current` podczas renderowania prowadzi do niepewnego kodu. Jeśli tego potrzebujesz, użyj stanu zamiast referencji.

<DeepDive>

#### Jak działa useRef wewnątrz?? {/*how-does-use-ref-work-inside*/}

Chociaż zarówno `useState`, jak i `useRef` są udostępniane przez React, w zasadzie `useRef` mogłoby być zaimplementowane na bazie `useState`. Możesz sobie wyobrazić, że wewnątrz Reacta, `useRef` jest zaimplementowane w ten sposób:

```js
// Wewnątrz Reacta
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue });
  return ref;
}
```

Podczas pierwszego renderowania, `useRef` zwraca `{ current: initialValue }`. Ten obiekt jest przechowywany przez Reacta, więc podczas następnego renderowania zostanie zwrócony ten sam obiekt. Zauważ, że w tym przykładzie funkcja ustawiająca stan nie jest używana. Jest to zbędne, ponieważ `useRef` zawsze musi zwracać ten sam obiekt!

React zapewnia wbudowaną wersję `useRef`, ponieważ jest to na tyle powszechne w praktyce. Możesz jednak traktować to jako zwykłą zmienną stanu bez funkcji ustawiającej. Jeśli znasz programowanie obiektowe, referencje mogą przypominać ci pola instancji, ale zamiast `this.something` napiszesz `somethingRef.current`.

</DeepDive>

## Kiedy używać referencji {/*when-to-use-refs*/}

Zwykle będziesz używać referencji, gdy twój komponent będzie musiał "wyjść poza" React i komunikować się z zewnętrznymi API, często z API przeglądarki, które nie wpływa na wygląd komponentu. Oto kilka rzadkich przypadków użycia:

- Przechowywanie [identyfikatorów timeoutów](https://developer.mozilla.org/docs/Web/API/setTimeout)
- Przechowywanie i manipulowanie [elementami DOM](https://developer.mozilla.org/docs/Web/API/Element), co omówimy na [następnej stronie](/learn/manipulating-the-dom-with-refs)
- Przechowywanie obiektów, które nie wpływają na obliczanie JSX.

Jeśli twój komponent musi przechować wartość, która nie wpływa na logikę renderowania, użyj referencji.

## Najlepsze praktyki dotyczące referencji {/*best-practices-for-refs*/}

Stosowanie się do tych zasad sprawi, że twoje komponenty będą bardziej przewidywalne:

- **Traktuj referencje jako wyjście awaryjne.** Referencje przydają się podczas pracy z systemami zewnętrznymi lub API przeglądarki. Jeśli większość logiki aplikacji i przepływu danych opiera się na referencjach, warto przemyśleć swoje podejście.
- **Nie odczytuj ani nie zapisuj `ref.current` podczas renderowania.** Jeśli jakaś informacja jest potrzebna podczas renderowania, użyj [stanu](/learn/state-a-components-memory). Ponieważ React nie wie, kiedy `ref.current` się zmienia, nawet odczytanie go podczas renderowania sprawia, że zachowanie komponentu staje się trudne do przewidzenia. (Jedynym wyjątkiem od tej zasady jest kod taki jak `if (!ref.current) ref.current = new Thing()`, który ustawia referencję tylko raz podczas pierwszego renderowania.)

Ograniczenia stanu w React nie dotyczą referencji. Na przykład, stan działa jak [migawka dla każdego renderowania](/learn/state-as-a-snapshot) i nie [aktualizuje się synchronicznie.](/learn/queueing-a-series-of-state-updates) Jednak gdy zmieniasz bieżącą wartość referencji, zmiana następuje natychmiastowo:

```js
ref.current = 5;
console.log(ref.current); // 5
```

Dzieje się tak, ponieważ **referencja sama w sobie jest zwykłym obiektem JavaScript**, więc tak też się zachowuje.

Nie musisz również martwić się o [unikanie mutacji](/learn/updating-objects-in-state) podczas pracy z referencją. Dopóki obiekt, który mutujesz, nie jest używany do renderowania, React nie interesuje się tym, co robisz z referencją lub jej zawartością.

## Referencje i DOM {/*refs-and-the-dom*/}

Referencję możesz przypisać do dowolnej wartości. Jednak najczęstszym przypadkiem użycia referencji jest dostęp do elementu DOM. Jest to na przykład przydatne, jeśli chcesz programowo ustawić fokus na polu wejściowym. Jeśli przekażesz referencję do atrybutu `ref` w JSX, jak na przykład `<div ref={myRef}>`, React umieści odpowiadający element DOM w `myRef.current`. Gdy element zostanie usunięty z DOM, React zaktualizuje `myRef.current`, ustawiając go na `null`. Możesz przeczytać więcej na ten temat w rozdziale [Manipulowanie DOM przy użyciu referencji](/learn/manipulating-the-dom-with-refs).

<Recap>

- Referencje to "wyjście awaryjne" do przechowywania wartości, które nie są używane do renderowania. Nie będziesz ich potrzebować zbyt często.
- Referencja to zwykły obiekt JavaScript z pojedynczą właściwością o nazwie `current`, którą możesz odczytać lub ustawić.
- Możesz uzyskać referencję od Reacta, wywołując hook `useRef`.
- Podobnie jak stan, referencje pozwalają przechowywać informacje między przerenderowaniami komponentu.
- W przeciwieństwie do stanu, ustawienie wartości `current` referencji nie powoduje ponownego przerenderowania.
- Nie odczytuj ani nie zapisuj `ref.current` podczas renderowania. To sprawia, że działanie komponentu staje się trudne do przewidzenia.

</Recap>



<Challenges>

#### Napraw uszkodzone pole wprowadzania czatu {/*fix-a-broken-chat-input*/}

Wpisz wiadomość i kliknij "Wyślij". Zauważysz, że pojawi się opóźnienie trzech sekund, zanim zobaczysz komunikat "Wysłano!". W tym czasie możesz zobaczyć przycisk "Cofnij". Kliknij go. Przycisk "Cofnij" ma zatrzymać wyświetlanie komunikatu "Wysłano!". Robi to poprzez wywołanie metody [`clearTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout) dla identyfikatora timeout zapisanego podczas `handleSend`. Jednak nawet po kliknięciu "Cofnij" komunikat "Wysłano!" nadal się pojawia. Znajdź przyczynę, dlaczego to nie działa, i napraw to.

<Hint>

Zwykłe zmienne, takie jak `let timeoutID`, nie "przetrwają" między przerenderowaniami, ponieważ każdy render uruchamia Twój komponent (i inicjalizuje jego zmienne) od nowa. Czy powinieneś przechować identyfikator timeoutu gdzie indziej?

</Hint>

<Sandpack>

```js
import { useState } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  let timeoutID = null;

  function handleSend() {
    setIsSending(true);
    timeoutID = setTimeout(() => {
      alert('Wysłano!');
      setIsSending(false);
    }, 3000);
  }

  function handleUndo() {
    setIsSending(false);
    clearTimeout(timeoutID);
  }

  return (
    <>
      <input
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        disabled={isSending}
        onClick={handleSend}>
        {isSending ? 'Wysyłanie...' : 'Wyślij'}
      </button>
      {isSending &&
        <button onClick={handleUndo}>
          Cofnij 
        </button>
      }
    </>
  );
}
```

</Sandpack>

<Solution>

Kiedy Twój komponent jest renderowany ponownie (na przykład, gdy ustawisz stan), wszystkie zmienne lokalne są inicjalizowane od nowa. Dlatego nie możesz przechować identyfikatora timeoutu w zmiennej lokalnej, takiej jak `timeoutID`, i oczekiwać, że inna funkcja obsługująca zdarzenie "zobaczy" ją w przyszłości. Zamiast tego, przechowaj go w referencji, którą React zachowa między przerenderowaniami.

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const timeoutRef = useRef(null);

  function handleSend() {
    setIsSending(true);
    timeoutRef.current = setTimeout(() => {
      alert('Wysłano!');
      setIsSending(false);
    }, 3000);
  }

  function handleUndo() {
    setIsSending(false);
    clearTimeout(timeoutRef.current);
  }

  return (
    <>
      <input
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        disabled={isSending}
        onClick={handleSend}>
        {isSending ? 'Wysyłanie...' : 'Wyślij'}
      </button>
      {isSending &&
        <button onClick={handleUndo}>
          Cofnij
        </button>
      }
    </>
  );
}
```

</Sandpack>

</Solution>


#### Napraw komponent, który nie renderuje się ponownie {/*fix-a-component-failing-to-re-render*/}

Ten przycisk powinien przełączać się między wyświetlaniem "Włącz" a "Wyłącz". Jednak zawsze wyświetla "Wyłącz". Co jest nie tak w tym kodzie? Napraw go.

<Sandpack>

```js
import { useRef } from 'react';

export default function Toggle() {
  const isOnRef = useRef(false);

  return (
    <button onClick={() => {
      isOnRef.current = !isOnRef.current;
    }}>
      {isOnRef.current ? 'Włącz' : 'Wyłącz'}
    </button>
  );
}
```

</Sandpack>

<Solution>

W tym przykładzie bieżąca wartość referencji jest używana do obliczenia wyniku renderowania: `{isOnRef.current ? 'Włącz' : 'Wyłącz'}`. Oznacza to, że ta informacja nie powinna być przechowywana w referencji, ale powinna zostać umieszczona w stanie. Aby to naprawić, należy usunąć referencję i zamiast niej użyć stanu:

<Sandpack>

```js
import { useState } from 'react';

export default function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => {
      setIsOn(!isOn);
    }}>
      {isOn ? 'Włacz' : 'Wyłącz'}
    </button>
  );
}
```

</Sandpack>

</Solution>

#### Napraw debouncing {/*fix-debouncing*/}

W tym przykładzie wszystkie procedury obsługi kliknięć przycisków są ["debouncowane".](https://redd.one/blog/debounce-vs-throttle) Aby zobaczyć, co to oznacza, naciśnij jeden z przycisków. Zauważ, że komunikat pojawi się sekundę później. Jeśli naciśniesz przycisk podczas oczekiwania na komunikat, licznik zostanie zresetowany. Dlatego, jeśli będziesz szybko klikać ten sam przycisk wiele razy, komunikat nie pojawi się, dopóki nie przestaniesz klikać przez sekundę. Debouncing pozwala opóźnić wykonanie jakiejś akcji, dopóki użytkownik nie "przestanie robić rzeczy".

Ten przykład działa, ale nie do końca zgodnie z zamierzeniami. Przyciski są niezależne. Aby zobaczyć problem, kliknij jeden z przycisków, a następnie natychmiast kliknij inny przycisk. Można się spodziewać, że po opóźnieniu pojawią się komunikaty obu przycisków. Pojawia się jednak tylko komunikat ostatniego przycisku. Wiadomość pierwszego przycisku zostaje utracona.

Dlaczego przyciski przeszkadzają sobie nawzajem? Znajdź i rozwiąż problem.

<Hint>

Ostatnia zmienna timeout ID jest współdzielona pomiędzy wszystkimi komponentami `DebouncedButton`. Dlatego kliknięcie jednego przycisku resetuje timeout innego przycisku. Czy można przechowywać osobne timeout ID dla każdego przycisku?

</Hint>

<Sandpack>

```js
let timeoutID;

function DebouncedButton({ onClick, children }) {
  return (
    <button onClick={() => {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        onClick();
      }, 1000);
    }}>
      {children}
    </button>
  );
}

export default function Dashboard() {
  return (
    <>
      <DebouncedButton
        onClick={() => alert('Statek kosmiczny wystartował!')}
      >
        Wystartuj statek kosmiczny
      </DebouncedButton>
      <DebouncedButton
        onClick={() => alert('Zupa się ugotowała!')}
      >
        Ugotuj zupę
      </DebouncedButton>
      <DebouncedButton
        onClick={() => alert('Kołysanka zaśpiewana!')}
      >
        Zaśpiewaj kołysankę
      </DebouncedButton>
    </>
  )
}
```

```css
button { display: block; margin: 10px; }
```

</Sandpack>

<Solution>

Zmienna taka jak `timeoutID` jest współdzielona między wszystkimi komponentami. Dlatego kliknięcie drugiego przycisku resetuje oczekujący timeout pierwszego przycisku. Aby to naprawić, można przechować timeout w referencji. Każdy przycisk będzie miał swoją własną referencję, dzięki czemu nie będą one ze sobą kolidować. Zauważ, że szybkie kliknięcie dwóch przycisków spowoduje wyświetlenie obu komunikatów.

<Sandpack>

```js
import { useRef } from 'react';

function DebouncedButton({ onClick, children }) {
  const timeoutRef = useRef(null);
  return (
    <button onClick={() => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onClick();
      }, 1000);
    }}>
      {children}
    </button>
  );
}

export default function Dashboard() {
  return (
    <>
      <DebouncedButton
        onClick={() => alert('Statek kosmiczny wystartował!')}
      >
        Wystartuj statek kosmiczny
      </DebouncedButton>
      <DebouncedButton
        onClick={() => alert('Zupa się ugotowała!')}
      >
        Ugotuj zupę
      </DebouncedButton>
      <DebouncedButton
        onClick={() => alert('Kołysanka zaśpiewana!')}
      >
        Zaśpiewaj kołysankę
      </DebouncedButton>
    </>
  )
}
```

```css
button { display: block; margin: 10px; }
```

</Sandpack>

</Solution>

#### Odczytaj najnowszą wartość stanu {/*read-the-latest-state*/}

W tym przykładzie, po naciśnięciu przycisku "Wyślij", występuje niewielkie opóźnienie przed wyświetleniem wiadomości. Wpisz "Cześć", naciśnij Wyślij, a następnie szybko edytuj dane wejściowe ponownie. Pomimo edycji, alert nadal będzie pokazywał "Cześć" (które było wartością stanu w [momencie](/learn/state-as-a-snapshot#state-over-time), kiedy przycisk został kliknięty).

Zazwyczaj takie zachowanie jest pożądane w aplikacji. Mogą jednak wystąpić sporadyczne przypadki, w których chcesz, aby jakiś asynchroniczny kod odczytał *najnowszą* wersję jakiegoś stanu. Czy potrafisz wymyślić sposób, aby alert pokazywał *aktualny* tekst wprowadzony w polu, a nie to, który był w momencie kliknięcia?

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function Chat() {
  const [text, setText] = useState('');

  function handleSend() {
    setTimeout(() => {
      alert('Wysyłanie: ' + text);
    }, 3000);
  }

  return (
    <>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        onClick={handleSend}>
        Wyślij
      </button>
    </>
  );
}
```

</Sandpack>

<Solution>

Stan działa [jak migawka](/learn/state-as-a-snapshot), więc nie można odczytać najnowszego stanu z operacji asynchronicznej, takiej jak np. timeout. Można jednak przechowywać najnowszy tekst wejściowy w referencji. Referencja jest mutowalna, więc można odczytać właściwość `current` w dowolnym momencie. Ponieważ bieżący tekst jest również używany do renderowania, w tym przykładzie będziesz potrzebował *zarówno* zmiennej stanu (do renderowania), *i* ref (aby odczytać go w timeoucie). Będziesz musiał ręcznie zaktualizować bieżącą wartość referencji.


<Sandpack>

```js
import { useState, useRef } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  const textRef = useRef(text);

  function handleChange(e) {
    setText(e.target.value);
    textRef.current = e.target.value;
  }

  function handleSend() {
    setTimeout(() => {
      alert('Wysyłanie: ' + textRef.current);
    }, 3000);
  }

  return (
    <>
      <input
        value={text}
        onChange={handleChange}
      />
      <button
        onClick={handleSend}>
        Wyślij
      </button>
    </>
  );
}
```

</Sandpack>

</Solution>

</Challenges>
