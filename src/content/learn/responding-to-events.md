---
title: Obsługa zdarzeń
---

<Intro>

React pozwala nam dodać *procedury obsługi zdarzeń* (ang. _event handlers_) do naszego JSX. Procedury obsługi zdarzeń to twoje własne funkcje, które zostaną wywołane w odpowiedzi na interakcje tj. klikanie, najeżdżanie, wybieranie pól tekstowych itp.

</Intro>

<YouWillLearn>

* Różnych sposobów pisania procedur obsługi zdarzeń
* Jak przekazać logikę obsługi zdarzeń z komponentu rodzica
* Jak zdarzenia są przekazywane i jak je powstrzymać

</YouWillLearn>

## Dodawanie procedur obsługi zdarzeń {/*adding-event-handlers*/}

Aby dodać procedurę obsługi zdarzeń, najpierw zdefiniujesz funkcję a następnie [przekażesz ją jako właściwość (ang. prop)](/learn/passing-props-to-a-component) do odpowiedniejgo tagu JSX. Na przykład, oto przycisk, który jeszcze nic nie robi:

<Sandpack>

```js
export default function Button() {
  return (
    <button>
      Nic nie robię!
    </button>
  );
}
```

</Sandpack>

Możesz sprawić, aby pokazywał wiadomość po kliknięciu go przez użytkownika, w tych trzech krokach: 

1. Zadeklaruj funkcję `handleClick` *wewnątrz* twojego komponentu `Button`.
2. Zaimplementuj logikę wewnątrz tej funkcji (użyj `alert` by pokazać wiadomość).
3. Dodaj `onClick={handleClick}` do JSXa `<button>`.

<Sandpack>

```js
export default function Button() {
  function handleClick() {
    alert('Nacisnąłeś mnie!');
  }

  return (
    <button onClick={handleClick}>
      Naciśnij mnie!
    </button>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>

Zdefiniowałeś funkcję `handleClick` a potem [przekazałeś ją jako właściwość](/learn/passing-props-to-a-component) do `<button>`.  `handleClick` jest **procedurą obsługi zdarzeń.** Takie funkcje:

* Są zwykle definiowane *wewnątrz* komponentów
* Mają nazwy zaczynające się od `handle`, po których następuje nazwa zdarzenia.

Często zauważysz `onClick={handleClick}`, `onMouseEnter={handleMouseEnter}` itp.

Zamiast tego, możesz zdefiniować procedurę obsługi zdarzeń w lini z JSX:

```jsx
<button onClick={function handleClick() {
  alert('Nacisnąłeś mnie!');
}}>
```

Lub, zwięźlej, używając funkcji strzałkowej:

```jsx
<button onClick={() => {
  alert('Nacisnąłeś mnie!');
}}>
```
Każdy z tych styli jest sobie równy. Wewnątrzliniowe procedury są wygodne dla krótkich funkcji

<Pitfall>

Funkcje przekazywane do procedury obsługi zdarzeń, nie wywołane. Na przykład:

| przekazanie funkcji (prawidłowo)     | wywołanie funkcji (nieprawidłowo)     |
| -------------------------------- | ---------------------------------- |
| `<button onClick={handleClick}>` | `<button onClick={handleClick()}>` |

Różnica jest subtelna. W pierwszym przykładzie, funckja `handleClick` jest przekazywana do procedury `onClick`. To nakazuje Reactowi ją zapamiętać i wywołać tylko wtedy, gdy użytkownik naciśnie przycisk.

W drugim przykładzie,  `()` na końcu `handleClick()` *natychmiast* wykonuje funkcję podczas [renderowania](/learn/render-and-commit), bez żadnych kliknięć. Dzieje się tak, ponieważ JavaScript wewnątrz [JSXowych `{` i `}`](/learn/javascript-in-jsx-with-curly-braces) wykonuje się od razu.

Gdy piszesz kod w jednej lini, ta sama pułapka czeka na ciebie w innej formie:

| przekazanie funkcji (correct)            | wywołanie funkcji (nieprawidłowo)    |
| --------------------------------------- | --------------------------------- |
| `<button onClick={() => alert('...')}>` | `<button onClick={alert('...')}>` |


Przekazywanie kodu w lini, tak jak w powyższym przykładzie, nie uruchomi się na kliknięcie - wywoła się za każdym razem gdy komponent się wyrenderuje:

```jsx
// Ten alert wyskoczy gdy komponent się generuje, a nie gdy został naciśnięty!
<button onClick={alert('Nacisnąłeś mnie!')}>
```

Jeśli chcesz stworzyć własną procedurę obsługi zdarzeń w lini, otocz ją anonimową funkcją w taki sposób:

```jsx
<button onClick={() => alert('Nacisnąłeś mnie!')}>
```

Zamiast wywoływać kodw wewnątrz z każdym renderowaniem, to tworzy funkcję do wywołania później.

W obu przypadkach, to co chcesz przekazać jest funkcją:

* `<button onClick={handleClick}>` prezkazuje funkcję `handleClick`.
* `<button onClick={() => alert('...')}>` prezkazuje funkcję `() => alert('...')`.

[Więcej o funkcjach strzałkowych.](https://javascript.info/arrow-functions-basics)

</Pitfall>

### Odczytywanie właściwości w procedurach obsługi zdarzeń {/*reading-props-in-event-handlers*/}

Ponieważ procedury są deklarowane wewnątrz komponentu, mają dostęp do jego właściwości, Oto przycisk, który po kliknięciu pokaże alert z właściwością `message`:
<Sandpack>

```js
function AlertButton({ message, children }) {
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <AlertButton message="Odtwarzanie!">
        Odtwórz film
      </AlertButton>
      <AlertButton message="Dodawanie!">
        Dodaj film
      </AlertButton>
    </div>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>

To pozwala tym dwóm przyciskom pokazywać różne wiadomości. Spróbuj je zmienić.

### Przekazywabnie procedur obsługi zdarzeń jako właściwości {/*passing-event-handlers-as-props*/}

Często będziesz chciał, aby komponent-rodzic zdefiniował dziecku procedurę obsługi zdarzeń. Przyjrzyj się przyciskom: w zależności od tego, gdzie użyjesz komponentu `Button`, możesz chcieć wykonać inną funkcję - być może jeden odtwarza film, a drugi wrzuca obrazek.

Aby to zrobić, przekaż właściwość, którą komponent otrzymał od rodzica, jako procedura obsługi w taki sposób:

<Sandpack>

```js
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

function PlayButton({ movieName }) {
  function handlePlayClick() {
    alert(`Odtwarzanie ${movieName}!`);
  }

  return (
    <Button onClick={handlePlayClick}>
      Odtwórz "{movieName}"
    </Button>
  );
}

function UploadButton() {
  return (
    <Button onClick={() => alert('Dodawanie!')}>
      Dodaj obraz
    </Button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <PlayButton movieName="Kiki's Delivery Service" />
      <UploadButton />
    </div>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>

Tutaj, komponent `Toolbar` renderuje `PlayBytton` i `UploadButton`:

- `PlayButton` przekazuje `handlePlayClick` jako właściwość `onClick` do `Button` wewnątrz.
- `UploadButton` przekazuje `() => alert('Dodawanie!')` jako właściwość `onClick` do `Button` wewnątrz.

W końcu, twój komponent `Button` akceptuje właściwość zwaną `onClick`. Przekazjue ją bezpośrednio do wbudowanego w przeglądarkę `<button>` z `onClick={onClicl}`. To mówi Reactowi, aby wywołał przekazaną funkcję na kliknięcie.

Jeśli używasz [systemów projektu](https://uxdesign.cc/everything-you-need-to-know-about-design-systems-54b109851969), często komponenty tj. przyciski posiadają style, ale nie definiują zachowania. Zamiast tego, komponenty tj. `PlayButton` czy `UploadButton` będą przekazywały w dół procedury obsługi zdarzeń.

### Nazywanie właściwości procedur obsługi zdarzeń {/*naming-event-handler-props*/}

Komponenty wbudowane tj. `<button>` i `<div>` wspierają jedynie [nazwy zdarzeń z przeglądarki](/reference/react-dom/components/common#common-props) jak `onClick`. Jednak, gdy budujesz własne komponenty, możesz nazywać ich właściwości procedur obsługi jakkolwiek chcesz.

Według konwencji, właściwości procedur obsługi zdarzeń powinny zaczynać się od `on` i wielkiej litery tuż za nim.

Na przykład, właściwość `onClick` komponentu `Button` mogłaby być nazwana `onSmash`:

<Sandpack>

```js
function Button({ onSmash, children }) {
  return (
    <button onClick={onSmash}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div>
      <Button onSmash={() => alert('Odtwarzanie!')}>
        Odtwórz film!
      </Button>
      <Button onSmash={() => alert('Dodawanie!')}>
        Dodaj zdjęcie
      </Button>
    </div>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>

W tym przykładzie, `<button onClick={onSmash}>` pokazuje że przeglądarkowy `<button>` (lowercase) nadal potrzebuje właściwości `onClick`, ale jej nazwa received otrzymana przez twój własny komponent `Button` może być jaka chcesz!

Gdy twój komponent wspiera wiele interakcji, możesz nazwać właściwości procedur obsługi zdarzeń dla elementów typowych w twojej aplikacji. Na przykład, ten komponent `Toolbar` otrzymuje procedury `onPlayMovie` i `onUploadImage`:

<Sandpack>

```js
export default function App() {
  return (
    <Toolbar
      onPlayMovie={() => alert('Odtwarzanie!')}
      onUploadImage={() => alert('Dodawanie!')}
    />
  );
}

function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}>
        Odtwórz Film!
      </Button>
      <Button onClick={onUploadImage}>
        Dodaj Obraz!
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

Zwróć uwagę na to, że komponent `App` nie musi wiedzień *co* `Toolbar` zrobi z `onPlayMovie` lub `onUploadImage`. To szczegół w implementacji `Toolbar`. Tutaj, `Toolbar` przekazuje je niżej jako procedury `onClick` do swoich `Button`ów, ale później mogą również zostać wywołane skrótem klawiszowym. Nazywanie właściwości po interakcjach specyficznych dla aplikacji tj. `onPlayMovie` pozwala ci wygodnie zmieniać jak będą później użyte.
  
<Note>
  
Upewnij się, że używasz poprawnego tagu HTML dla swoich procedur obsługi zdarzeń. Np. By obsłużyć kliknięcia używaj [`<button onClick={handleClick}>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) zamiast `<div onClick={handleClick}>`. Wykorzystując przeglądarkowy `<button>` możesz używać wbudowanych w nią zachowań tj. nawigacja klawiaturą. Jeśli nie lubisz domyślnego stylu przycisku, a wolisz by wyglądał bardziej jak link lub inny element interfejsu, możesz to osiągnąć CSSem. [Więcej o pisaniu HTMLa dostępnego dla wszystkich](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)

</Note>

## Przekazywanie (propagacja) zdarzeń {/*event-propagation*/}

Procedury obsługi zdarzeń wyłapią również zdarzenia z któregokolwiek komponentu potomnego. Mówimy wtedy, że zdarzenie "bąbelkuje" (ang. "bubbles") lub "jest przekazywane" (ang. "propagates") w górę drzewa: Zaczyna się to tam, gdzie zdarzenie miało miejsce, a potem idzie w górę.

Ten `<div>` zawiera dwa przyciski. Oba elementy `<div>` i każdy przycisk mają swoją własną obsługę `onClick`. Jak myślisz, która z nich zostanie uruchomiona gdy naciśniesz przycisk?

<Sandpack>

```js
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('Nasisnąłeś na pasek zadań!');
    }}>
      <button onClick={() => alert('Odtwarzanie!')}>
        Odtwórz Film!
      </button>
      <button onClick={() => alert('Dodawanie!')}>
        Dodaj Obraz!
      </button>
    </div>
  );
}
```

```css
.Toolbar {
  background: #aaa;
  padding: 5px;
}
button { margin: 5px; }
```

</Sandpack>

Naciskając na którykowliek z przycisków, ich `onClick` uruchomi się jako pierwszy. Następnie wykona się `onClick` z nadrzędnego `<div>`a. Zatem pojawią się 2 wiadomości. Jeśli naciśniesz stricte na pasek, jedynie `onClick` `<div>`a zostanie uruchomiony

<Pitfall>

W Reakcie przekazywane jest każde zdarzenie, poza `onScroll`, które działa tylko na przypisanym do niego tagu JSX

</Pitfall>

### Powstrzymywanie przekazywania {/*stopping-propagation*/}

Procedury obsługi zdarzeń otrzymują jako jedyny argument **obiekt zdarzenia** (ang. _event object_). Z definicji nazywany jest `e`, co pochodzi od angielskiego "event". Możesz go użyć do odczytu informacji o zdarzeniu

Poza tym, taki obiekt pozwala zatrzymać przekazanie. Jeśli chcesz powstrzymać zdarzenie od dotarcia do komponentu nadrzędnego, musisz wywołać `e.stopPropagation()` jak w tym komponencie `Button`:

<Sandpack>

```js
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('Nacisnąłeś pasek zadań!');
    }}>
      <Button onClick={() => alert('Odtwarzanie!')}>
        Odtwórz film!
      </Button>
      <Button onClick={() => alert('Dodawanie!')}>
        Dodaj zdjęcie!
      </Button>
    </div>
  );
}
```

```css
.Toolbar {
  background: #aaa;
  padding: 5px;
}
button { margin: 5px; }
```

</Sandpack>

Gdy naciśniesz przycisk:

1. React wywołuje procedurę `onClick` przekazaną do `<button>`. 
2. Ta procedura, zdefiniowana w `Button`, wykonuje następujące czynności:
   * Wywołuje `e.stopPropagation()`, powstrzumując obiekt przed przekazaniem dalej .
   * Wywołuje funkcję `onClick`, która jest właściwością otrzymaną z komponentu `Toolbar`.
3. Ta funkcja, zdefiniowana w komponencie `Toolbar`, wyświetla swój własny alert.
4. Ponieważ zatrzymaliśmy przekazanie, procedura `onClick` nadrzędnego `<div>`a *nie* uruchamia się.

Jako wynik `e.stopPropagation()`, kliknięcie na przyciski pokazuje teraz pojedynczy alert (z `<button>`), zamiast 2 (z `<button>` i nadrzędnego `<div>`a). Naciśnięcie przycisku, to nie to samo co naciśnięcie otaczającego go paska zadań, zatem powstrzymanie przekazania ma sens dla tego interfejsu.

<DeepDive>

#### Przechwytywanie zdarzeń {/*capture-phase-events*/}

W niewielu przypadkach, możesz musieć przechwycić wyszstkie zdarzenia elementów podrzędnych, *nawet jeśli nie są przekazywane*. Na przykład, możesz chcieć zapisać każde kliknięcie w danych analitycznych, bez wzglądu na logikę przekazywań. możesz to zrobić dodając `Capture` do końca nazwy zdarzenia:

```js
<div onClickCapture={() => { /* to działa pierwsze */ }}>
  <button onClick={e => e.stopPropagation()} />
  <button onClick={e => e.stopPropagation()} />
</div>
```

Każde zdarzenie jest przekazywane w trzech fazach:

1. Podróżuje w dół, wywołując wszystkie procedury `onClickCapture`.
2. Uruchamia  procedurę `onClick` naciśniętego elementu. 
3. Podróżuje w górę, wywołując wszystkie procedury `onClick`.

Przechwytywanie zdarzeń przydaje się przy tworzeniu np. routerów czy analityki, ale prawdopodobnie nie znajdzie zastosowania w kodzie aplikacji

</DeepDive>

### Przekazywanie procedur obsługi jako alternatywa dla porpagacji {/*passing-handlers-as-alternative-to-propagation*/}

Zauważ, jak ta procedura uruchamia linię kodu, _a potem_ wywołuje właściwość `onClick` przekazaną przez rodzica:

```js {4,5}
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}
```

Możesz również dodać więcej kody do tej procedury, przed wywołaniem nadrzędnego `onClick`. Ten wzór pokazuje *alternatywę* dla propagacji. Pozwala ona komponentowi potomnemu zająć się zdarzeniem, podczas gdy ten nadrzędny może określić jakieś dodatkowe zachowanie. W przeciwieństwie do propagacji, nie jest to automatyczne. Ale plusem tego wzoru jest możliwość czystego podążania za całym ciągiem kody, który wykonuje się jako wynik jakiegoś zdarzenia

Jeśli używając propagacji jest ci ciężko wyśledzić które procedury są wykonywane i dlaczego, spróbuj tego podejścia.

### Powstrzymywanie domyślnego zachowania {/*preventing-default-behavior*/}

Niektóre zdarzenia przeglądarki mają domyślne zachowanie powiązane z nim. Np. zdarzenie wysłania formularze, które następuje gdy naciśnięty zostanie przycisk w jego wnętrzu, domyślnie przeładuje całą stronę:

<Sandpack>

```js
export default function Signup() {
  return (
    <form onSubmit={() => alert('Wysyłanie!')}>
      <input />
      <button>Wyślij</button>
    </form>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

Możesz wywołać `e.preventDefault()` z tego obiektu zdarzenia, aby powstrzymać domyślne zachowanie:

<Sandpack>

```js
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('Wysyłanie!');
    }}>
      <input />
      <button>Wyślij!</button>
    </form>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

Nie myl `e.stopPropagation()` i `e.preventDefault()`. Oba są użyteczne, ale nie powiązane:

* [`e.stopPropagation()`](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation) zatrzymuje procedury obsługi zdarzeń przypisane do tagów wyżej przed uruchomieniem.
* [`e.preventDefault()` ](https://developer.mozilla.org/docs/Web/API/Event/preventDefault) powstrzymuje domyślne zachowanie przeglądarki dla paru zdarzeń, które je posiadają.

## Czy procedury obsługi zdarzeń mają efekty uboczne? {/*can-event-handlers-have-side-effects*/}

Oczywiście! Procedury obsługi zdarzeń to najlepsze miejsce na efekty uboczne.

W przeciwieństwie do funkcji renderujących, procedury obsługi zdarzeń nie muszą być [czyste](/learn/keeping-components-pure), więc jest to śwetne miejsce by coś *zmienić* - na przykład, zmień wartość input'a w odpowiedzi na wpisywanie, lub zmień listę po naciśnięciu przycisku. Jednakże, aby cokolwiek pozmieniać, musisz wpierw jakoś to przechować. W Reakcie, używa się do tego [stanu, pamięci komponentu](/learn/state-a-components-memory) Wszystkiego o tym nauczysz się na następnej stronie.

<Recap>

* Możesz obsługiwać zdarzenia przekacując funkcję jako właściwość do elementu tj. `<button>`.
* Procedury obsłsgi zdarzeń trzeba przekazać, **a nie wywołać!** `onClick={handleClick}`, nie `onClick={handleClick()}`.
* Możesz zdefiniować procedurę obsługi zdarzeń osobno, lub w lini.
* Procedury obsługi zdarzeń są wewnątrz komponentu, więc mają dostęp do jego właściwości.
* Możesz stworzyć procedurę obsługi w komponencie nadrzędnym i przekazać ją do podrzędnego.
* Możesz definiować właściwości dla procedur obsługi zdarzeń z nazwami nawiązującymi do aplikacji.
* Zdarzenia przekazywane są do góry. Wywołaj `e.stopPropagation()`, na pierwszym argumencie by temu zapobiec.
* Zdarzenia mogą mieć niechciane domyślne zachowania. Wywołaj `e.preventDefault()` by temu zapobiec.
* Wywoływanie procedury obsługi zdarzeń dokładnie z procedury podrzędnej, jest dobrą alternatywą dla przekazywania.

</Recap>



<Challenges>

#### Fix an event handler {/*fix-an-event-handler*/}

Clicking this button is supposed to switch the page background between white and black. However, nothing happens when you click it. Fix the problem. (Don't worry about the logic inside `handleClick`—that part is fine.)

<Sandpack>

```js
export default function LightSwitch() {
  function handleClick() {
    let bodyStyle = document.body.style;
    if (bodyStyle.backgroundColor === 'black') {
      bodyStyle.backgroundColor = 'white';
    } else {
      bodyStyle.backgroundColor = 'black';
    }
  }

  return (
    <button onClick={handleClick()}>
      Toggle the lights
    </button>
  );
}
```

</Sandpack>

<Solution>

Problemem jest to, że `<button onClick={handleClick()}>` _wywołuje_ funkcję `handleClick` zamiast ją _przekazywać_ podczas renderowania. Usunięcie `()` takie że przycisk zostanie w formie `<button onClick={handleClick}>` naprawi bład:

<Sandpack>

```js
export default function LightSwitch() {
  function handleClick() {
    let bodyStyle = document.body.style;
    if (bodyStyle.backgroundColor === 'black') {
      bodyStyle.backgroundColor = 'white';
    } else {
      bodyStyle.backgroundColor = 'black';
    }
  }

  return (
    <button onClick={handleClick}>
      Przełącz światła
    </button>
  );
}
```

</Sandpack>

Ewentualnie, możesz owinąć wywołanie funkcji w inną funkcję, w taki sposób `<button onClick={() => handleClick()}>`:

<Sandpack>

```js
export default function LightSwitch() {
  function handleClick() {
    let bodyStyle = document.body.style;
    if (bodyStyle.backgroundColor === 'black') {
      bodyStyle.backgroundColor = 'white';
    } else {
      bodyStyle.backgroundColor = 'black';
    }
  }

  return (
    <button onClick={() => handleClick()}>
      Przełącz światła
    </button>
  );
}
```

</Sandpack>

</Solution>

#### Podpinanie zdarzeń {/*wire-up-the-events*/}

Ten komponent `ColorSwitch` renderuje przycisk. Powinien zmieniać kolor strony. Podłącz go do procedury `onChangeColor`, którą otrzymuje od rodzica tak, że kliknięcie w przycisk faktycznie zmieni kolor

Gdy już to zrobisz, zauważ że kliknięcie przycisku inkrementuje również licznik kliknięć strony. Twój kolega, który napisał komponent nadrzędny uważa, że `onChangeColor` nie inkrementuje żadnych liczników. Co innego może się dziać? Napraw to tak, że kliknięcie przycisku zmieni *jedynie* kolor i _nie_ zinkrementuje licznika.

<Sandpack>

```js src/ColorSwitch.js active
export default function ColorSwitch({
  onChangeColor
}) {
  return (
    <button>
      Zmień kolor
    </button>
  );
}
```

```js src/App.js hidden
import { useState } from 'react';
import ColorSwitch from './ColorSwitch.js';

export default function App() {
  const [clicks, setClicks] = useState(0);

  function handleClickOutside() {
    setClicks(c => c + 1);
  }

  function getRandomLightColor() {
    let r = 150 + Math.round(100 * Math.random());
    let g = 150 + Math.round(100 * Math.random());
    let b = 150 + Math.round(100 * Math.random());
    return `rgb(${r}, ${g}, ${b})`;
  }

  function handleChangeColor() {
    let bodyStyle = document.body.style;
    bodyStyle.backgroundColor = getRandomLightColor();
  }

  return (
    <div style={{ width: '100%', height: '100%' }} onClick={handleClickOutside}>
      <ColorSwitch onChangeColor={handleChangeColor} />
      <br />
      <br />
      <h2>Kliknięć na stronie: {clicks}</h2>
    </div>
  );
}
```

</Sandpack>

<Solution>

Najpierw, musisz dodać procedurę obsługi zdarzeń, w sposób np. taki `<button onClick={onChangeColor}>`.

Jednak to wprowadza problem zmiany licznika. Jeśli, jak twierdzi twój kolega, `onChangeColor` nie robi tego, to problem musi leżeć w przekazywaniu zdarzeń w górę i któraś z nadrzędnych procedur to robi. Aby rozwiązać ten problem, musisz powstrzymać przekazywanie. Nie zapomnij tylko, że nadal musisz wywołać `onChangeColor`.

<Sandpack>

```js src/ColorSwitch.js active
export default function ColorSwitch({
  onChangeColor
}) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onChangeColor();
    }}>
      Zmień kolor
    </button>
  );
}
```

```js src/App.js hidden
import { useState } from 'react';
import ColorSwitch from './ColorSwitch.js';

export default function App() {
  const [clicks, setClicks] = useState(0);

  function handleClickOutside() {
    setClicks(c => c + 1);
  }

  function getRandomLightColor() {
    let r = 150 + Math.round(100 * Math.random());
    let g = 150 + Math.round(100 * Math.random());
    let b = 150 + Math.round(100 * Math.random());
    return `rgb(${r}, ${g}, ${b})`;
  }

  function handleChangeColor() {
    let bodyStyle = document.body.style;
    bodyStyle.backgroundColor = getRandomLightColor();
  }

  return (
    <div style={{ width: '100%', height: '100%' }} onClick={handleClickOutside}>
      <ColorSwitch onChangeColor={handleChangeColor} />
      <br />
      <br />
      <h2>Kliknięć na stronie: {clicks}</h2>
    </div>
  );
}
```

</Sandpack>

</Solution>

</Challenges>
