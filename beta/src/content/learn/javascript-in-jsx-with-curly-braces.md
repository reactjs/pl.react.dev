---
title: JavaScript w JSX a nawiasy klamrowe
---

<Intro>

JSX pozwala na pisanie kodu podobnego do HTML-a wewnątrz pliku javascriptowego, umożliwiając trzymanie logiki renderowania i treści jednym miejscu. Czasem jednak zachodzi potrzeba, by w kodzie znaczników dodać nieco logiki javascriptowej lub odnieść się do dynamicznej własności. W takiej sytuacji możemy użyć nawiasów klamrowych, otwierając tym samym okno do świata JavaScriptu.

</Intro>

<YouWillLearn>

* Jak przekazywać tekst w cudzysłowie
* Jak odwoływać się do zmiennej javascriptowej w JSX za pomocą nawiasów klamrowych
* Jak wywołać funkcję javascriptową w JSX za pomocą nawiasów klamrowych
* Jak używać obiektów javascriptowych w JSX za pomocą nawiasów klamrowych

</YouWillLearn>

## Przekazywanie tekstu w cudzysłowie {/*passing-strings-with-quotes*/}

Kiedy chcemy przekazać do komponentu atrybut tekstowy, umieszczamy wartość w pojedynczym lub podwójnym cudzysłowie:

<Sandpack>

```js
export default function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
  );
}
```

```css
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

W powyższym kodzie wartości `"https://i.imgur.com/7vQD0fPs.jpg"` oraz `"Gregorio Y. Zara"` są przekazywane jako tekst.

Lecz co jeśli wartości dla `src` lub `alt` mają być dynamiczne? Możemy w takiej sytuacji **użyć wartości z JavaScriptu, zastępując parę `"` i `"` nawiasami klamrowymi `{` i `}`**:

<Sandpack>

```js
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
```

```css
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

Zwróć uwagę na różnicę pomiędzy właściwością `className="avatar"`, która określa użycie klasy CSS-owej o nazwie `"avatar"` służącej do zaokrąglenia obrazka, a `src={avatar}`, która przekazuje wartość zmiennej javascriptowej o nazwie `avatar`. Dzieje się tak, ponieważ nawiasy klamrowe pozwalają korzystać z JavaScriptu w samym kodzie znaczników!

## Używanie nawiasów klamrowych: okno na świat JavaScriptu {/*using-curly-braces-a-window-into-the-javascript-world*/}

Składnia JSX to jedynie inny sposób zapisu kodu javascriptowego. Oznacza to, że możemy z powodzeniem używać w niej samego JavaScriptu, pod warunkiem, że otoczymy go nawiasami klamrowymi `{ }`. W poniższym przykładzie najpierw deklarujemy nazwę naukowca, `name`, a następnie osadzamy ją w nawiasach klamrowych wewnątrz znacznika `<h1>`:

<Sandpack>

```js
export default function TodoList() {
  const name = 'Gregorio Y. Zara';
  return (
    <h1>{name} - lista zadań</h1>
  );
}
```

</Sandpack>

Spróbuj zmienić wartość zmiennej `name` z `'Gregorio Y. Zara'` na `'Hedy Lamarr'`. Widzisz, jak zmienia się tytuł listy zadań?

Pomiędzy nawiasami klamrowymi można umieszczać dowolne wyrażenie z języka JavaScript, nawet wywołania funkcji, jak np. `formatDate()`:

<Sandpack>

```js
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>Lista zadań na dzień {formatDate(today)}</h1>
  );
}
```

</Sandpack>

### Gdzie używać nawiasów klamrowych {/*where-to-use-curly-braces*/}

W składni JSX można używać nawiasów klamrowych na dwa sposoby:

1. **Jako treść** bezpośrednio wewnątrz znacznika JSX-owego: `<h1>{name} - lista zadań</h1>` działa, ale `<{tag}>Gregorio Y. Zara - lista zadań</{tag}>` już nie.
2. **Jako atrybuty**, zaraz po znaku `=`: `src={avatar}` przekaże wartość zmiennej `avatar`, ale `src="{avatar}"` już przekaże tekst `{avatar}`.

## Używanie "podwójnych klamerek": CSS i inne obiekty w JSX {/*using-double-curlies-css-and-other-objects-in-jsx*/}

Poza tekstem, liczbami i innymi wyrażeniami javascriptowymi, w JSX można przekazywać także obiekty. W JavaScripcie obiekty same w sobie mają zapis używający klamer, np. `{ name: "Hedy Lamarr", inventions: 5 }`. Z tego powodu, aby przekazać obiekt w JSX-ie, musisz otoczyć go kolejną parą nawiasów klamrowych: `person={{ name: "Hedy Lamarr", inventions: 5 }}`.

Możesz spotkać się z tym zapisem przy okazji stylów CSS użytych bezpośrednio w kodzie JSX. React nie wymaga pisania styli w kodzie (dla większości przypadków wystarczą zwykłe klasy CSS-owe), ale jeśli potrzebujesz przekazać style w kodzie, przekaż obiekt do atrybutu `style`:

<Sandpack>

```js
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>Usprawnić wideotelefon</li>
      <li>Przygotować wykłady o aeronautyce</li>
      <li>Opracować silnik napędzany alkoholem</li>
    </ul>
  );
}
```

```css
body { padding: 0; margin: 0 }
ul { padding: 20px 20px 20px 40px; margin: 0; }
```

</Sandpack>

Spróbuj zmienić wartości `backgroundColor` i `color`.

Aby obiekt javascriptowy w klamrach stał się jeszcze bardziej widoczny, możesz zapisać to tak:

```js {2-5}
<ul style={
  {
    backgroundColor: 'black',
    color: 'pink'
  }
}>
```

Następnym razem, gdy zobaczysz w JSX-ie parę `{{` i `}}`, przypomnij sobie, że to nic więcej jak zwykły obiekt zapisany wewnątrz JSX-owych nawiasów klamrowych!

<Gotcha>

Właściwości atrybutu `style` piszemy camelCasem. Na przykład, kod HTML `<ul style="background-color: black">` wewnątrz komponentu należałoby zapisać jako `<ul style={{ backgroundColor: 'black' }}>`.

</Gotcha>

## Zabawa z obiektami javascriptowymi i klamrami {/*more-fun-with-javascript-objects-and-curly-braces*/}

Możesz przenieść kilka wyrażeń do jednego obiektu, a następnie odwołać się do nich w JSX-ie wewnątrz nawiasów klamrowych:

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name} - lista zadań</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Usprawnić wideotelefon</li>
        <li>Przygotować wykłady o aeronautyce</li>
        <li>Opracować silnik napędzany alkoholem</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

W tym przykładzie obiekt `person` zawiera tekst w polu `name` oraz zagnieżdżony obiekt motywu `theme`:

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};
```

Komponent może używać tych wartości z obiektu `person` w następujący sposób:

```js
<div style={person.theme}>
  <h1>{person.name} - lista zadań</h1>
```

JSX jako język szablonów jest bardzo minimalistyczny, dlatego pozwala na swobodną organizację danych i logiki za pomocą kodu JavaScript.

<Recap>

Teraz wiesz już niemal wszystko na temat składni JSX:

* Atrybuty JSX-owe zapisane w cudzysłowie są przekazywane jako tekst.
* Nawiasy klamrowe pozwalają dodać logikę i zmienne javascriptowe do kodu znaczników.
* Można je stosować w treści znacznika JSX-owego lub bezpośrednio po `=` w atrybutach.
* `{{` i `}}` to nie specjalna składnia - to obiekt javascriptowy opatulony w nawiasy klamrowe z JSX-a.

</Recap>

<Challenges>

<<<<<<< HEAD:beta/src/pages/learn/javascript-in-jsx-with-curly-braces.md
### Napraw błąd {/*fix-the-mistake*/}
=======
#### Fix the mistake {/*fix-the-mistake*/}
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6:beta/src/content/learn/javascript-in-jsx-with-curly-braces.md

Poniższy kod rzuca błędem o treści `Objects are not valid as a React child` (_pol._ Obiekty nie są prawidłowymi potomkami w Reakcie.):

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person} - lista zadań</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Usprawnić wideotelefon</li>
        <li>Przygotować wykłady o aeronautyce</li>
        <li>Opracować silnik napędzany alkoholem</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

Potrafisz znaleźć problem z tym kodem?

<Hint>Przyjrzyj się temu, co jest zapisane w nawiasach klamrowych. Czy na pewno umieściliśmy tam właściwą rzecz?</Hint>

<Solution>

Dzieje się tak, ponieważ powyższy przykład renderuje do znacznika *sam obiekt*, zamiast renderować tekst: kod `<h1>{person} - lista zadań</h1>` próbuje wyrenderować cały obiekt `person`! Umieszczanie całych obiektów w tekście powoduje wystąpienie błędu, ponieważ React nie wie, jak je wyświetlić.

Aby to naprawić, zamień `<h1>{person} - lista zadań</h1>` na `<h1>{person.name} - lista zadań</h1>`:

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name} - lista zadań</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Usprawnić wideotelefon</li>
        <li>Przygotować wykłady o aeronautyce</li>
        <li>Opracować silnik napędzany alkoholem</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

</Solution>

<<<<<<< HEAD:beta/src/pages/learn/javascript-in-jsx-with-curly-braces.md
### Wyciągnij informacje do obiektu {/*extract-information-into-an-object*/}
=======
#### Extract information into an object {/*extract-information-into-an-object*/}
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6:beta/src/content/learn/javascript-in-jsx-with-curly-braces.md

Wyciągnij URL obrazka do obiektu `person`.

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name} - lista zadań</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Usprawnić wideotelefon</li>
        <li>Przygotować wykłady o aeronautyce</li>
        <li>Opracować silnik napędzany alkoholem</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

<Solution>

Przenieś URL obrazka do właściwości o nazwie `person.imageUrl` i użyj jej jako atrybutu dla znacznika `<img>`, umieszczając zmienną w nawiasach klamrowych:

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  imageUrl: "https://i.imgur.com/7vQD0fPs.jpg",
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name} - lista zadań</h1>
      <img
        className="avatar"
        src={person.imageUrl}
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Usprawnić wideotelefon</li>
        <li>Przygotować wykłady o aeronautyce</li>
        <li>Opracować silnik napędzany alkoholem</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

</Solution>

<<<<<<< HEAD:beta/src/pages/learn/javascript-in-jsx-with-curly-braces.md
### Umieść wyrażenie w klamrach {/*write-an-expression-inside-jsx-curly-braces*/}
=======
#### Write an expression inside JSX curly braces {/*write-an-expression-inside-jsx-curly-braces*/}
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6:beta/src/content/learn/javascript-in-jsx-with-curly-braces.md

W poniższym kodzie pełny adres URL obrazka został rozdzielony na cztery części: URL bazowy, `imageId`, `imageSize` oraz rozszerzenie pliku.

Chcielibyśmy teraz, żeby finalny URL obrazka składał się z tych wartości połączonych w jeden tekst: URL bazowy (zawsze `'https://i.imgur.com/'`), `imageId` (`'7vQD0fP'`), `imageSize` (`'s'`) oraz rozszerzenie pliku (zawsze `'.jpg'`). Coś jednak jest nie tak z atrybutem `src` znacznika `<img>`.

Potrafisz to naprawić?

<Sandpack>

```js

const baseUrl = 'https://i.imgur.com/';
const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name} - lista zadań</h1>
      <img
        className="avatar"
        src="{baseUrl}{person.imageId}{person.imageSize}.jpg"
        alt={person.name}
      />
      <ul>
        <li>Usprawnić wideotelefon</li>
        <li>Przygotować wykłady o aeronautyce</li>
        <li>Opracować silnik napędzany alkoholem</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

Aby upewnić się, że twoje rozwiązanie działa poprawnie, spróbuj zmienić wartość `imageSize` na `'b'`. Po zmianie obrazek powinien zmienić swój rozmiar.

<Solution>

Możesz zapisać to jako `src={baseUrl + person.imageId + person.imageSize + '.jpg'}`.

1. `{` rozpoczyna wyrażenie javascriptowe
2. `baseUrl + person.imageId + person.imageSize + '.jpg'` zwraca poprawny URL w formie tekstowej
3. `}` kończy wyrażenie javascriptowe

<Sandpack>

```js
const baseUrl = 'https://i.imgur.com/';
const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name} - lista zadań</h1>
      <img
        className="avatar"
        src={baseUrl + person.imageId + person.imageSize + '.jpg'}
        alt={person.name}
      />
      <ul>
        <li>Usprawnić wideotelefon</li>
        <li>Przygotować wykłady o aeronautyce</li>
        <li>Opracować silnik napędzany alkoholem</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

Możesz również przenieść to wyrażenie do osobnej funkcji, jak np. `getImageUrl` w poniższym przykładzie:

<Sandpack>

```js App.js
import { getImageUrl } from './utils.js'

const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name} - lista zadań</h1>
      <img
        className="avatar"
        src={getImageUrl(person)}
        alt={person.name}
      />
      <ul>
        <li>Usprawnić wideotelefon</li>
        <li>Przygotować wykłady o aeronautyce</li>
        <li>Opracować silnik napędzany alkoholem</li>
      </ul>
    </div>
  );
}
```

```js utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    person.imageSize +
    '.jpg'
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

Zmienne i funkcje pomogą ci utrzymać porządek w znacznikach!

</Solution>

</Challenges>