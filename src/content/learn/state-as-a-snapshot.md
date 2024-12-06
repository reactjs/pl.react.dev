---
title: Stan jako migawka
---

<Intro>

Zmienne stanu mogą wyglądać jak zwykłe zmienne javascriptowe, które można odczytywać i zapisywać. Jednak stan zachowuje się bardziej jak migawka. Ustawienie go nie zmienia zmiennej stanu, którą już masz, ale zamiast tego wyzwala ponowne renderowanie.

</Intro>

<YouWillLearn>

* Jak ustawienie stanu wyzwala ponowne renderowanie
* Kiedy i jak stan się aktualizuje
* Dlaczego stan nie aktualizuje się natychmiast po jego ustawieniu
* Jak procedury obsługi zdarzeń uzyskują dostęp do "migawki" stanu

</YouWillLearn>

## Ustawianie stanu wyzwala ponowne renderowanie {/*setting-state-triggers-renders*/}

Możesz myśleć, że twój interfejs użytkownika zmienia się bezpośrednio w odpowiedzi na zdarzenia użytkownika, takie jak kliknięcie. W Reakcie działa to nieco inaczej. Na poprzedniej stronie mogliśmy zobaczyć, że [ustawienie stanu wysyła żądanie ponownego renderowania](/learn/render-and-commit#step-1-trigger-a-render) do Reacta. Oznacza to, że aby interfejs zareagował na zdarzenie, musisz *zaktualizować stan*.

Gdy naciśniesz "Wyślij" w poniższym przykładzie, wywołanie `setIsSent(true)` informuje Reacta, aby ponownie wyrenderował interfejs użytkownika:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Cześć!');
  if (isSent) {
    return <h1>Twoja wiadomość jest w drodze!</h1>
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setIsSent(true);
      sendMessage(message);
    }}>
      <textarea
        placeholder="Wiadomość"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Wyślij</button>
    </form>
  );
}

function sendMessage(message) {
  // ...
}
```

```css
label, textarea { margin-bottom: 10px; display: block; }
```

</Sandpack>

Oto co dzieje się, gdy klikniesz przycisk:

1. Wykonuje się procedura obsługi zdarzenia `onSubmit`.
2. Wywołanie `setIsSent(true)` ustawia `isSent` na `true` i dodaje do kolejki nowe renderowanie.
3. React ponownie renderuje komponent zgodnie z nową wartością `isSent`.

Przyjrzyjmy się bliżej związkowi między stanem a renderowaniem.

## Renderowanie tworzy migawkę danego momentu {/*rendering-takes-a-snapshot-in-time*/}

["Renderowanie"](/learn/render-and-commit#step-2-react-renders-your-components) oznacza, że React wywołuje twój komponent, który jest funkcją. Zwracany przez tę funkcję JSX jest jak migawka interfejsu użytkownika w danym momencie. Jego właściwości, procedury obsługi zdarzeń i zmienne lokalne zostały obliczone **na podstawie stanu w momencie renderowania.**

W przeciwieństwie do fotografii czy klatki filmu, zwracana przez ciebie "migawka" interfejsu użytkownika jest interaktywna. Zawiera logikę, taką jak procedury obsługi zdarzeń, które określają, co się stanie w odpowiedzi na dane wejściowe. React aktualizuje ekran, aby dopasować go do tej migawki i podłącza procedury obsługi zdarzeń. W rezultacie naciśnięcie przycisku uruchomi procedurę obsługi kliknięcia z twojego JSX.

Kiedy React ponownie renderuje komponent:

1. React ponownie wywołuje twoją funkcję.
2. Twoja funkcja zwraca nową migawkę JSX.
3. React następnie aktualizuje ekran, aby dopasować go do migawki zwróconej przez twoją funkcję.

<IllustrationBlock sequential>
  <Illustration caption="React wykonuje funkcję" src="/images/docs/illustrations/i_render1.png" />
  <Illustration caption="Oblicza migawkę" src="/images/docs/illustrations/i_render2.png" />
  <Illustration caption="Aktualizuje drzewo DOM" src="/images/docs/illustrations/i_render3.png" />
</IllustrationBlock>

Będąc pamięcią komponentu, stan nie jest jak zwykła zmienna, która znika po zakończeniu działania funkcji. Stan, tak naprawdę, "żyje" w samym Reakcie (jakby był na półce!) poza twoją funkcją. Kiedy React wywołuje twój komponent, przekazuje ci migawkę stanu dla tego konkretnego renderowania. Twój komponent zwraca migawkę interfejsu użytkownika ze świeżym zestawem właściwości i procedur obsługi zdarzeń w swoim JSX, gdzie wszystko jest obliczone **przy użyciu wartości stanu z tego renderowania!**

<IllustrationBlock sequential>
  <Illustration caption="Informujesz Reacta o konieczności aktualizacji stanu" src="/images/docs/illustrations/i_state-snapshot1.png" />
  <Illustration caption="React aktualizuje wartość stanu" src="/images/docs/illustrations/i_state-snapshot2.png" />
  <Illustration caption="React przekazuje migawkę wartości stanu do komponentu" src="/images/docs/illustrations/i_state-snapshot3.png" />
</IllustrationBlock>

Oto mały eksperyment, pokazujący jak to działa. W tym przykładzie można by się spodziewać, że kliknięcie przycisku "+3" zwiększy licznik trzykrotnie, ponieważ wywołuje on `setNumber(number + 1)` trzy razy.

Zobacz, co się stanie po kliknięciu przycisku "+3":

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

Zauważ, że `number` zwiększa się tylko o jeden za każdym kliknięciem!

**Ustawienie stanu zmienia go dopiero w *następnym* renderowaniu.** Podczas pierwszego renderowania `number` miał wartość `0`. Dlatego w procedurze obsługi `onClick` dla *tego renderowania* wartość `number` nadal wynosi `0`, nawet po wywołaniu `setNumber(number + 1)`:

```js
<button onClick={() => {
  setNumber(number + 1);
  setNumber(number + 1);
  setNumber(number + 1);
}}>+3</button>
```

Oto co procedura obsługi kliknięcia tego przycisku każe zrobić Reactowi:

1. `setNumber(number + 1)`: `number` wynosi `0`, więc to inaczej `setNumber(0 + 1)`.
    - React przygotowuje się do zmiany `number` na `1` przy następnym renderowaniu.
2. `setNumber(number + 1)`: `number` wynosi `0`, więc to inaczej `setNumber(0 + 1)`.
    - React przygotowuje się do zmiany `number` na `1` przy następnym renderowaniu.
3. `setNumber(number + 1)`: `number` wynosi `0`, więc to inaczej `setNumber(0 + 1)`.
    - React przygotowuje się do zmiany `number` na `1` przy następnym renderowaniu.

Mimo że wywołano `setNumber(number + 1)` trzy razy, w procedurze obsługi zdarzeń *tego renderowania* `number` zawsze wynosi `0`, więc trzy razy ustawiono stan na `1`. Dlatego po zakończeniu działania procedury obsługi zdarzeń, React ponownie renderuje komponent z `number` równym `1`, a nie `3`.

Możesz to sobie również zwizualizować, podstawiając w myślach wartości zmiennych stanu w swoim kodzie. Ponieważ zmienna stanu `number` ma wartość `0` dla *tego renderowania*, jego procedura obsługi zdarzeń wygląda tak:

```js
<button onClick={() => {
  setNumber(0 + 1);
  setNumber(0 + 1);
  setNumber(0 + 1);
}}>+3</button>
```
Dla następnego renderowania `number` wynosi `1`, więc procedura obsługi kliknięcia *tego renderowania* wygląda tak:

```js
<button onClick={() => {
  setNumber(1 + 1);
  setNumber(1 + 1);
  setNumber(1 + 1);
}}>+3</button>
```

Dlatego ponowne kliknięcie przycisku ustawi licznik na `2`, następnie na `3` przy kolejnym kliknięciu i tak dalej.

## Stan w czasie {/*state-over-time*/}

To było ciekawe. Spróbuj teraz zgadnąć, co wyświetli alert po kliknięciu tego przycisku:

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        alert(number);
      }}>+5</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

Jeśli zastosujesz metodę podstawiania wspomnianą wcześniej, możesz zgadnąć, że alert pokaże "0":

```js
setNumber(0 + 5);
alert(0);
```

A co, jeśli dodasz timer do alertu, tak aby wyświetlił się dopiero _po_ ponownym wyrenderowaniu komponentu? Pokaże on "0" czy "5"? Zgadnij!

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

Zaskoczenie? Jeśli zastosujesz metodę podstawiania, zobaczysz "migawkę" stanu przekazaną do alertu.

```js
setNumber(0 + 5);
setTimeout(() => {
  alert(0);
}, 3000);
```

Stan przechowywany w Reakcie może zmienić się do czasu wyświetlenia alertu, ale alert ten został zaplanowany przy użyciu migawki stanu z momentu interakcji użytkownika!

**Wartość zmiennej stanu nigdy nie zmienia się w obrębie pojedynczego renderowania,** nawet jeśli kod jej procedury obsługi zdarzeń jest asynchroniczny. Wewnątrz metody `onClick` *tego renderowania*, wartość zmiennej `number` nadal wynosi `0`, nawet po wywołaniu `setNumber(number + 5)`. Jej wartość została "utrwalona" w momencie, gdy React "zrobił migawkę" interfejsu użytkownika poprzez wywołanie twojego komponentu.

Oto przykład pokazujący, jak to sprawia, że procedury obsługi zdarzeń są mniej podatne na błędy związane z czasem wykonania. Poniżej znajduje się formularz, który wysyła wiadomość z pięciosekundowym opóźnieniem. Wyobraź sobie taki scenariusz:

1. Naciskasz przycisk "Wyślij", aby wysłać wiadomość "Cześć" do Alice.
2. Zanim upłynie pięciosekundowe opóźnienie, zmieniasz wartość pola "Do" na "Bob".

Jak myślisz, co wyświetli `alert`? Czy pokaże "Powiedziałeś/aś Cześć do Alice"? A może "Powiedziałeś/aś Cześć do Boba"? Spróbuj zgadnąć na podstawie tego, czego udało się ci dowiedzieć, a następnie sprawdź:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [to, setTo] = useState('Alice');
  const [message, setMessage] = useState('Cześć');

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      alert(`Powiedziałeś/aś ${message} do ${to}`);
    }, 5000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Do:{' '}
        <select
          value={to}
          onChange={e => setTo(e.target.value)}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </label>
      <textarea
        placeholder="Wiadomość"
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

**React zachowuje wartości stanu jako "utrwalone" w procedurach obsługi zdarzeń dla danego renderowania.** Nie musisz się martwić, czy stan zmienił się podczas wykonywania kodu.

A co, jeśli chcesz odczytać najnowszy stan przed ponownym renderowaniem? Wtedy będziesz potrzebować [funkcji aktualizującej stan](/learn/queueing-a-series-of-state-updates), którą omówimy na następnej stronie!

<Recap>

* Ustawienie stanu żąda nowego renderowania.
* React przechowuje stan poza komponentem, jakby na półce.
* Kiedy wywołujesz `useState`, React daje ci migawkę stanu *dla tego renderowania*.
* Zmienne i procedury obsługi zdarzeń nie są w stanie "przetrwać" ponownego renderowania. Każde renderowanie ma własne procedury obsługi.
* Każde renderowanie (i funkcje wewnątrz niego) zawsze "widzą" migawkę stanu, którą React przekazał *temu* renderowaniu.
* Możesz w myślach podstawiać stan w procedurach obsługi zdarzeń, podobnie jak myślisz o wyrenderowanym JSX.
* Procedury obsługi zdarzeń utworzone w przeszłości mają wartości stanu z renderowania, w którym zostały utworzone.

</Recap>



<Challenges>

#### Zaimplementuj światła uliczne {/*implement-a-traffic-light*/}

Oto komponent świateł na przejściu dla pieszych, który przełącza się po naciśnięciu przycisku:

<Sandpack>

```js
import { useState } from 'react';

export default function TrafficLight() {
  const [walk, setWalk] = useState(true);

  function handleClick() {
    setWalk(!walk);
  }

  return (
    <>
      <button onClick={handleClick}>
        Zmień na {walk ? 'Stój' : 'Idź'}
      </button>
      <h1 style={{
        color: walk ? 'darkgreen' : 'darkred'
      }}>
        {walk ? 'Idź' : 'Stój'}
      </h1>
    </>
  );
}
```

```css
h1 { margin-top: 20px; }
```

</Sandpack>

Dodaj `alert` do procedury obsługi kliknięcia. Kiedy światło jest zielone i wyświetla "Idź", kliknięcie przycisku powinno pokazać "Następnie będzie Stój". Kiedy światło jest czerwone i wyświetla "Stój", kliknięcie przycisku powinno pokazać "Następnie będzie Idź".

Czy ma znaczenie, czy umieścisz `alert` przed czy po wywołaniu `setWalk`?

<Solution>

Twój `alert` powinien wyglądać tak:

<Sandpack>

```js
import { useState } from 'react';

export default function TrafficLight() {
  const [walk, setWalk] = useState(true);

  function handleClick() {
    setWalk(!walk);
    alert(walk ? 'Następnie będzie Stój' : 'Następnie będzie Idź');
  }

  return (
    <>
      <button onClick={handleClick}>
        Zmień na {walk ? 'Stój' : 'Idź'}
      </button>
      <h1 style={{
        color: walk ? 'darkgreen' : 'darkred'
      }}>
        {walk ? 'Idź' : 'Stój'}
      </h1>
    </>
  );
}
```

```css
h1 { margin-top: 20px; }
```

</Sandpack>

Nie ma znaczenia, czy umieścisz alert przed czy po wywołaniu `setWalk`. Wartość `walk` dla tego renderowania jest utrwalona. Wywołanie `setWalk` zmieni ją tylko dla *następnego* renderowania, ale nie wpłynie na procedurę obsługi zdarzeń z poprzedniego renderowania.

Ta linia może początkowo wydawać się nieintuicyjna:

```js
alert(walk ? 'Następnie będzie Stój' : 'Następnie będzie Idź');
```

Ale ma ona sens, jeśli przeczytasz ją tak: "Jeśli sygnalizator pokazuje 'Idź', komunikat powinien brzmieć 'Następnie będzie Stój'". Zmienna `walk` wewnątrz procedury obsługi zdarzeń odpowiada wartości `walk` z tego renderowania i nie zmienia się.

Możesz to zweryfikować, stosując metodę podstawiania. Kiedy `walk` ma wartość `true`, otrzymujesz:

```js
<button onClick={() => {
  setWalk(false);
  alert('Następnie będzie Stój');
}}>
  Zmień na Stój
</button>
<h1 style={{color: 'darkgreen'}}>
  Idź
</h1>
```

Więc kliknięcie "Zmień na Stój" dodaje do kolejki renderowanie z `walk` ustawionym na `false` i wyświetla alert "Następnie będzie Stój".

</Solution>

</Challenges>


[def]: /learn/queueing-a-series-of-state-updates