---
title: Obsługa zdarzeń
---

<Intro>

React pozwala nam dodać *procedury obsługi zdarzeń* (ang. _event handlers_) do naszego JSX-a. Procedury obsługi zdarzeń to twoje własne funkcje, które zostaną wywołane w odpowiedzi na interakcje takie jak klikanie, najeżdżanie kursorem, zaznaczanie pól tekstowych itp.

</Intro>

<YouWillLearn>

* Na jakie sposoby można pisać procedury obsługi zdarzeń
* Jak przekazać logikę obsługi zdarzeń z komponentu rodzica
* Jak zdarzenia są przekazywane i jak je powstrzymać

</YouWillLearn>

## Dodawanie procedur obsługi zdarzeń {/*adding-event-handlers*/}

Aby dodać procedurę obsługi zdarzeń, najpierw zdefiniuj funkcję, a następnie [przekaż ją jako właściwość (ang. _prop_)](/learn/passing-props-to-a-component) do odpowiedniego elementu JSX. Na przykład, oto przycisk, który jeszcze nic nie robi:

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

Możesz sprawić, by po kliknięciu przez użytkownika przycisk pokazywał wiadomość, wykonując trzy kroki:

1. Zadeklaruj funkcję `handleClick` *wewnątrz* swojego komponentu `Button`.
2. Zaimplementuj logikę wewnątrz tej funkcji (użyj `alert` by pokazać wiadomość).
3. Dodaj `onClick={handleClick}` do JSX-a `<button>`.

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

Zdefiniowana funkcja `handleClick`, która jest potem [przekazana jako właściwość](/learn/passing-props-to-a-component) do `<button>`, jest **procedurą obsługi zdarzeń.** Funkcje takie jak ta:

* Są zwykle definiowane *wewnątrz* komponentów
* Mają nazwy zaczynające się od `handle`, po których następuje nazwa zdarzenia.

Zgodnie z konwencją, nazwy funkcji obsługujących zdarzenia zazwyczaj zaczynają się od `handle`, po którym następuje nazwa zdarzenia. Często zobaczysz składnię taką jak `onClick={handleClick}`, `onMouseEnter={handleMouseEnter}` i podobne.

Możesz też zdefiniować procedurę obsługi zdarzeń w miejscu wywołania w JSX:

```jsx
<button onClick={function handleClick() {
  alert('Nacisnąłeś mnie!');
}}>
```

Lub zwięźlej, używając funkcji strzałkowej:

```jsx
<button onClick={() => {
  alert('Nacisnąłeś mnie!');
}}>
```

Wszystkie te sposoby dadzą ten sam rezultat. Ten sposób definiowania jest wygodny dla krótkich funkcji.

<Pitfall>

Funkcje przekazywane do procedury obsługi zdarzeń muszą być przekazywane, nie wywoływane. Przykład:

| przekazanie funkcji (prawidłowo) | wywołanie funkcji (nieprawidłowo)  |
| -------------------------------- | ---------------------------------- |
| `<button onClick={handleClick}>` | `<button onClick={handleClick()}>` |

Różnica jest subtelna. W pierwszym przykładzie funkcja `handleClick` jest przekazywana do procedury `onClick`. To mówi Reactowi, aby ją zapamiętał i wywołał tylko wtedy, gdy użytkownik naciśnie przycisk.

W drugim przykładzie `()` na końcu `handleClick()` *natychmiast* wykonuje funkcję podczas [renderowania](/learn/render-and-commit), bez żadnych kliknięć. Dzieje się tak, ponieważ JavaScript wewnątrz [JSX-owych nawiasów `{` i `}`](/learn/javascript-in-jsx-with-curly-braces) wykonuje się od razu.

Gdy piszesz kod w jednej linii, ta sama pułapka czeka na ciebie w innej formie:

| przekazanie funkcji (prawidłowo)        | wywołanie funkcji (nieprawidłowo) |
| --------------------------------------- | --------------------------------- |
| `<button onClick={() => alert('...')}>` | `<button onClick={alert('...')}>` |


Przekazywanie kodu w linii, tak jak w poniższym przykładzie, nie uruchomi się na kliknięcie - wywoła się za każdym razem, gdy komponent się wyrenderuje:

```jsx
// Ten alert wyskoczy, gdy komponent się renderuje, a nie gdy został naciśnięty!
<button onClick={alert('Nacisnąłeś mnie!')}>
```

Jeśli chcesz stworzyć własną procedurę obsługi zdarzeń w linii, otocz ją anonimową funkcją w taki sposób:

```jsx
<button onClick={() => alert('Nacisnąłeś mnie!')}>
```

Zamiast wywoływać kod wewnątrz przy każdym renderowaniu, stworzy to funkcję do wywołania później.

W obu przypadkach to co chcesz przekazać, jest funkcją:

* `<button onClick={handleClick}>` przekazuje funkcję `handleClick`.
* `<button onClick={() => alert('...')}>` przekazuje funkcję `() => alert('...')`.

[Przeczytaj więcej o funkcjach strzałkowych.](https://javascript.info/arrow-functions-basics)

</Pitfall>

### Odczytywanie właściwości w procedurach obsługi zdarzeń {/*reading-props-in-event-handlers*/}

Ponieważ procedury obsługi zdarzeń są deklarowane wewnątrz komponentu, mają dostęp do jego właściwości. Oto przycisk, który po kliknięciu pokaże alert z właściwością `message`:

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
        Dodaj obraz
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

### Przekazywanie procedur obsługi zdarzeń jako właściwości {/*passing-event-handlers-as-props*/}

<<<<<<< HEAD
Często będziesz chcieć, aby komponent nadrzędny zdefiniował dziecku procedurę obsługi zdarzeń. Przyjrzyj się przyciskom: w zależności od tego, gdzie użyjesz komponentu `Button`, możesz chcieć wykonać inną funkcję - być może jeden odtwarza film, a drugi dodaje obrazek?
=======
Often you'll want the parent component to specify a child's event handler. Consider buttons: depending on where you're using a `Button` component, you might want to execute a different function—perhaps one plays a movie and another uploads an image.
>>>>>>> 152a471aa9ac2f6f0f3e64c04f39da790d40cf61

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

Tutaj komponent `Toolbar` renderuje `PlayButton` i `UploadButton`:

- `PlayButton` przekazuje `handlePlayClick` jako właściwość `onClick` do wnętrza `Button`.
- `UploadButton` przekazuje `() => alert('Dodawanie!')` jako właściwość `onClick` do wnętrza `Button`.

W końcu twój komponent `Button` akceptuje właściwość zwaną `onClick`. Przekazuje ją bezpośrednio do wbudowanego w przeglądarkę `<button>` z `onClick={onClick}`. Ten wycinek mówi Reactowi, aby wywołał ją na kliknięcie.

Jeśli używasz [systemu projektowania (ang. _design system_)](https://uxdesign.cc/everything-you-need-to-know-about-design-systems-54b109851969), często komponenty, takie jak przyciski, posiadają style, ale nie definiują zachowania. Zamiast tego, komponenty typu `PlayButton` czy `UploadButton` będą przekazywały w dół procedury obsługi zdarzeń.

### Nazywanie właściwości procedur obsługi zdarzeń {/*naming-event-handler-props*/}

Komponenty wbudowane, takie jak `<button>` i `<div>` wspierają jedynie [nazwy zdarzeń przeglądarki](/reference/react-dom/components/common#common-props) jak `onClick`. Jednak, gdy budujesz własne komponenty, możesz nazywać ich właściwości procedur obsługi jakkolwiek chcesz.

Według konwencji, właściwości procedur obsługi zdarzeń  powinny zaczynać się od `on` i dużej litery tuż po nim.

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
        Odtwórz film
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

W tym przykładzie `<button onClick={onSmash}>` pokazuje, że przeglądarkowy `<button>` (lowercase) nadal potrzebuje właściwości `onClick`, ale jej nazwa otrzymana przez twój własny komponent `Button` może być jaka chcesz!

Gdy twój komponent wspiera wiele różnych interakcji, możesz nazwać właściwości procedur obsługi zdarzeń zgodnie z pojęciami typowymi dla twojej aplikacji. Na przykład, ten komponent `Toolbar` otrzymuje procedury `onPlayMovie` i `onUploadImage`:

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
        Odtwórz film
      </Button>
      <Button onClick={onUploadImage}>
        Dodaj zdjęcie
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

<<<<<<< HEAD
Zwróć uwagę na to, że komponent `App` nie musi wiedzieć *co* `Toolbar` zrobi z `onPlayMovie` lub `onUploadImage`. To szczegół w implementacji `Toolbar`. Tutaj, `Toolbar` przekazuje je niżej jako procedury `onClick` do swoich komponentów `Button`, ale później mogą również zostać wywołane skrótem klawiszowym. Nazywanie właściwości po interakcjach specyficznych dla aplikacji np. `onPlayMovie` pozwala ci wygodnie zmieniać, w jaki sposób będą później użyte.
  
<Note>
  
Upewnij się, że używasz poprawnego tagu HTML dla swoich procedur obsługi zdarzeń. Na przykład, by obsłużyć kliknięcia używaj [`<button onClick={handleClick}>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) zamiast `<div onClick={handleClick}>`. Wykorzystując przeglądarkowy `<button>` możesz używać wbudowanych w nią zachowań takich jak nawigacja klawiaturą. Jeśli nie lubisz domyślnego stylu przycisku, a wolisz by wyglądał bardziej jak link lub inny element interfejsu, możesz to osiągnąć używając CSS. [Więcej o pisaniu HTMLa dostępnego dla wszystkich](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)
=======
Notice how the `App` component does not need to know *what* `Toolbar` will do with `onPlayMovie` or `onUploadImage`. That's an implementation detail of the `Toolbar`. Here, `Toolbar` passes them down as `onClick` handlers to its `Button`s, but it could later also trigger them on a keyboard shortcut. Naming props after app-specific interactions like `onPlayMovie` gives you the flexibility to change how they're used later.

<Note>

Make sure that you use the appropriate HTML tags for your event handlers. For example, to handle clicks, use [`<button onClick={handleClick}>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) instead of `<div onClick={handleClick}>`. Using a real browser `<button>` enables built-in browser behaviors like keyboard navigation. If you don't like the default browser styling of a button and want to make it look more like a link or a different UI element, you can achieve it with CSS. [Learn more about writing accessible markup.](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)
>>>>>>> 152a471aa9ac2f6f0f3e64c04f39da790d40cf61

</Note>

## Propagacja zdarzeń {/*event-propagation*/}

Procedury obsługi zdarzeń wyłapią również zdarzenia pochodzące z dowolnego komponentu potomnego. Mówimy wtedy, że zdarzenie "bąbelkuje" (ang. _bubbles_) lub "propaguje" (ang. _propagates_) w górę drzewa: zaczyna się to tam, gdzie zdarzenie miało miejsce, a potem idzie w górę.

Ten `<div>` zawiera dwa przyciski. Zarówno element `<div>`, jak i każdy z przycisków mają swoją własną obsługę `onClick`. Jak myślisz, która z nich zostanie uruchomiona, gdy naciśniesz przycisk?

<Sandpack>

```js
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('Naciśnięto na pasek zadań!');
    }}>
      <button onClick={() => alert('Odtwarzanie!')}>
        Odtwórz film
      </button>
      <button onClick={() => alert('Dodawanie!')}>
        Dodaj zdjęcie
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

Naciskając na którykolwiek z przycisków, `onClick` przypisany do nich uruchomi się jako pierwszy. Następnie wykona się `onClick` z nadrzędnego elementu `<div>`, zatem pojawią się dwie wiadomości. Jeśli naciśniesz wprost na pasek, jedynie `onClick` elementu `<div>` zostanie uruchomiony.

<Pitfall>

W Reakcie przekazywane jest każde zdarzenie poza `onScroll`, które działa tylko na przypisanym do niego tagu JSX

</Pitfall>

### Powstrzymywanie propagacji {/*stopping-propagation*/}

Procedury obsługi zdarzeń otrzymują jako jedyny argument **obiekt zdarzenia** (ang. _event object_). Zwyczajowo nazywany jest `e`, co pochodzi od angielskiego "event". Możesz go użyć do odczytu informacji o zdarzeniu.

Poza tym, taki obiekt pozwala zatrzymać propagację. Jeśli chcesz powstrzymać zdarzenie od dotarcia do komponentu nadrzędnego, musisz wywołać `e.stopPropagation()` jak w tym komponencie `Button`:

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
      alert('Naciśnięto pasek zadań!');
    }}>
      <Button onClick={() => alert('Odtwarzanie!')}>
        Odtwórz film
      </Button>
      <Button onClick={() => alert('Dodawanie!')}>
        Dodaj zdjęcie
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

Gdy naciskasz przycisk:

<<<<<<< HEAD
1. React wywołuje procedurę `onClick` przekazaną do `<button>`. 
2. Ta procedura, zdefiniowana w `Button`, wykonuje następujące czynności:
   * Wywołuje `e.stopPropagation()`, powstrzymując zdarzenie przed przekazaniem dalej.
   * Wywołuje funkcję `onClick`, która jest właściwością przekazaną z komponentu `Toolbar`.
3. Ta funkcja, zdefiniowana w komponencie `Toolbar`, wyświetla swój własny alert.
4. Ponieważ zatrzymaliśmy przekazanie, procedura `onClick` nadrzędnego elementu `<div>` *nie* uruchamia się.
=======
1. React calls the `onClick` handler passed to `<button>`.
2. That handler, defined in `Button`, does the following:
   * Calls `e.stopPropagation()`, preventing the event from bubbling further.
   * Calls the `onClick` function, which is a prop passed from the `Toolbar` component.
3. That function, defined in the `Toolbar` component, displays the button's own alert.
4. Since the propagation was stopped, the parent `<div>`'s `onClick` handler does *not* run.
>>>>>>> 152a471aa9ac2f6f0f3e64c04f39da790d40cf61

Jako wynik `e.stopPropagation()`, kliknięcie przycisków pokazuje teraz pojedynczy alert (z `<button>`), zamiast 2 (z `<button>` i nadrzędnego `<div>`a). Naciśnięcie przycisku, to nie to samo co naciśnięcie otaczającego go paska zadań, zatem powstrzymanie przekazania ma sens dla tego interfejsu.

<DeepDive>

#### Przechwytywanie zdarzeń {/*capture-phase-events*/}

W niewielu przypadkach możesz musieć przechwycić wszystkie zdarzenia elementów podrzędnych, *nawet jeśli nie są przekazywane*. Na przykład, możesz chcieć zapisać każde kliknięcie w danych analitycznych, bez względu na logikę przekazywań. Możesz to zrobić dodając `Capture` do końca nazwy zdarzenia:

```js
<div onClickCapture={() => { /* to jest uruchamiane najpierw */ }}>
  <button onClick={e => e.stopPropagation()} />
  <button onClick={e => e.stopPropagation()} />
</div>
```

<<<<<<< HEAD
Każde zdarzenie jest propagowane w trzech fazach:

1. Podróżuje w dół, wywołując wszystkie procedury `onClickCapture`.
2. Uruchamia procedurę `onClick` naciśniętego elementu. 
3. Podróżuje w górę, wywołując wszystkie procedury `onClick`.
=======
Each event propagates in three phases:

1. It travels down, calling all `onClickCapture` handlers.
2. It runs the clicked element's `onClick` handler.
3. It travels upwards, calling all `onClick` handlers.
>>>>>>> 152a471aa9ac2f6f0f3e64c04f39da790d40cf61

Przechwytywanie zdarzeń przydaje się przy tworzeniu np. routerów czy analityki, ale prawdopodobnie nie znajdziesz dla tego szerszego zastosowania w kodzie aplikacji.

</DeepDive>

### Przekazywanie procedur obsługi jako alternatywa dla propagacji {/*passing-handlers-as-alternative-to-propagation*/}

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

Możesz również dodać więcej kodu do tej procedury, przed wywołaniem nadrzędnego `onClick`. Ten wzór pokazuje *alternatywę* dla propagacji. Pozwala ona komponentowi potomnemu zająć się zdarzeniem, podczas gdy ten nadrzędny może określić jakieś dodatkowe zachowanie. W przeciwieństwie do propagacji nie jest to automatyczne, ale plusem tego wzoru jest możliwość prostego podążania za całym ciągiem kodu, który wykonuje się jako wynik jakiegoś zdarzenia

Jeśli używając propagacji jest ci ciężko prześledzić, które procedury są wykonywane i dlaczego, spróbuj tego podejścia.

### Powstrzymywanie domyślnego zachowania {/*preventing-default-behavior*/}

Niektóre zdarzenia przeglądarki mają domyślne zachowanie powiązane z nimi. Na przykład zdarzenie wysłania formularza, które następuje, gdy naciśnięty zostanie przycisk w jego wnętrzu, domyślnie przeładuje całą stronę:

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

Możesz wywołać `e.preventDefault()` z tego obiektu zdarzenia, aby powstrzymać domyślne zachowanie formularza:

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

Nie myl `e.stopPropagation()` i `e.preventDefault()`. Oba są użyteczne, ale niepowiązane:

* [`e.stopPropagation()`](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation) powstrzymuje procedury obsługi zdarzeń przypisane do tagów wyżej przed uruchomieniem.
* [`e.preventDefault()` ](https://developer.mozilla.org/docs/Web/API/Event/preventDefault) powstrzymuje domyślne zachowanie przeglądarki dla paru zdarzeń, które je posiadają.

## Czy procedury obsługi zdarzeń mogą mieć efekty uboczne? {/*can-event-handlers-have-side-effects*/}

Oczywiście! Procedury obsługi zdarzeń to idealne miejsce na efekty uboczne.

W przeciwieństwie do funkcji renderujących, procedury obsługi zdarzeń nie muszą być [czyste](/learn/keeping-components-pure), więc jest to świetne miejsce by coś *zmienić* - na przykład, wartość pola tekstowego w odpowiedzi na wpisywanie lub listę po naciśnięciu przycisku. Jednakże, aby cokolwiek pozmieniać, musisz wpierw jakoś to przechować. W Reakcie używa się do tego [stanu, czyli pamięci komponentu](/learn/state-a-components-memory). Wszystkiego o tym nauczysz się na następnej stronie.

<Recap>

* Możesz obsługiwać zdarzenia przekazując funkcję jako właściwość do elementu takiego jak `<button>`.
* Procedury obsługi zdarzeń trzeba przekazać, **a nie wywołać!** Pisz `onClick={handleClick}`, nie `onClick={handleClick()}`.
* Możesz zdefiniować procedurę obsługi zdarzeń osobno lub w linii.
* Procedury obsługi zdarzeń są zdefiniowane wewnątrz komponentu, więc mają dostęp do jego właściwości.
* Możesz stworzyć procedurę obsługi w komponencie nadrzędnym i przekazać ją do podrzędnego.
* Możesz definiować właściwości dla procedur obsługi zdarzeń z nazwami nawiązującymi do aplikacji.
* Zdarzenia przekazywane są do góry. Wywołaj `e.stopPropagation()`, na pierwszym argumencie, by temu zapobiec.
* Zdarzenia mogą mieć niechciane domyślne zachowania. Wywołaj `e.preventDefault()`, by temu zapobiec.
* Wywoływanie procedury obsługi zdarzeń przekazanej przez właściwość od razu w procedurze podrzędnej jest dobrą alternatywą dla propagacji.

</Recap>



<Challenges>

#### Napraw procedurę obsługi zdarzeń {/*fix-an-event-handler*/}

Naciśnięcie tego przycisku powinno zmieniać tło strony między białym a czarnym. Jednak, gdy go klikniesz to nic się nie dzieje. Napraw błąd (Nie przejmuj się logiką wewnątrz `handleClick` - ta część jest w porządku)

<Sandpack>

```js {expectedErrors: {'react-compiler': [5, 7]}}
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
      Przełącz światło
    </button>
  );
}
```

</Sandpack>

<Solution>

Problem polega na tym, że `<button onClick={handleClick()}>` _wywołuje_ funkcję `handleClick` zamiast ją _przekazywać_ podczas renderowania. Usunięcie `()`, aby przycisk został w formie `<button onClick={handleClick}>` naprawi błąd:

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

Ewentualnie, możesz opakować wywołanie funkcji w inną funkcję w taki sposób `<button onClick={() => handleClick()}>`:

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

#### Podłączanie zdarzeń {/*wire-up-the-events*/}

Komponent `ColorSwitch` renderuje przycisk. Powinien on zmieniać kolor strony. Podłącz go do procedury `onChangeColor`, którą otrzymuje od rodzica tak, aby kliknięcie przycisku faktycznie to zrobiło.

Gdy już to zrobisz zauważ, że kliknięcie przycisku inkrementuje również licznik kliknięć strony. Twój kolega, który napisał komponent nadrzędny uważa, że `onChangeColor` nie inkrementuje żadnych liczników. Co innego może się dziać? Napraw to tak, aby kliknięcie przycisku zmieniło *jedynie* kolor i _nie_ zinkrementowało licznika.

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
      <h2>Liczba kliknięć na stronie: {clicks}</h2>
    </div>
  );
}
```

</Sandpack>

<Solution>

Najpierw, musisz dodać procedurę obsługi zdarzeń np. w taki sposób: `<button onClick={onChangeColor}>`.

Jednak to wprowadza problem zmiany licznika. Jeśli, jak twierdzi twój kolega, `onChangeColor` go nie zmienia, to problem musi leżeć w przekazywaniu zdarzeń w górę i któraś z nadrzędnych procedur to robi. Aby rozwiązać ten problem, musisz powstrzymać przekazywanie. Nie zapomnij tylko, że nadal musisz wywołać `onChangeColor`.

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
      <h2>Liczba kliknięć na stronie: {clicks}</h2>
    </div>
  );
}
```

</Sandpack>

</Solution>

</Challenges>
