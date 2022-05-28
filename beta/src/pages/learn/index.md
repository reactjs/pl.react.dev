---
title: Szybki start
---

<Intro>

Witaj w dokumentacji Reacta! Ten rozdział przedstawi ci 80% zagadnień związanych z Reactem, których będziesz używać na co dzień.

</Intro>

<YouWillLearn>

- Jak tworzyć i zagnieżdżać komponenty
- Jak dodać kod znaczników i style
- Jak wyświetlać dane
- Jak renderować warunki i listy
- Jak reagować na zdarzenia i aktualizować interfejs
- Jak dzielić dane między komponentami

</YouWillLearn>

## Tworzenie i zagnieżdżanie komponentów {/*components*/}

Aplikacje reactowe składają się z *komponentów*. Komponent to kawałek UI (interfejsu użytkownika, ang. *user interface*), który ma swoją wyodrębnioną logikę i wygląd. Komponent może być mały, np. przycisk, lub duży, np. cała strona.

Komponenty reactowe to funkcje javascriptowe, które zwracają kod znaczników (ang. *markup*):

```js
function MyButton() {
  return (
    <button>Kliknij mnie</button>
  );
}
```

Teraz gdy już mamy zadeklarowany komponent `MyButton`, możemy go zagnieździć w innym komponencie:

```js {5}
export default function MyApp() {
  return (
    <div>
      <h1>Witaj na mojej stronie</h1>
      <MyButton />
    </div>
  );
}
```

Zauważ, że `<MyButton />` zaczyna się od wielkiej litery. Po tym można poznać, że to komponent reactowy. Komponenty reactowe muszą zaczynać się od wielkie litery, natomiast znaczniki HTML muszą zaczynać się od małej litery.

Przyjrzyj się wynikowi poniższego kodu:

<Sandpack>

```js
function MyButton() {
  return (
    <button>
      Kliknij mnie
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Witaj na mojej stronie</h1>
      <MyButton />
    </div>
  );
}
```

</Sandpack>

Słowa kluczowe `export default` określają główny komponent pliku. Jeśli nie rozumiesz tego zagadnienia, zajrzyj do [MDN](https://developer.mozilla.org/pl/docs/web/javascript/reference/statements/export) oraz [javascript.info](https://javascript.info/import-export) po więcej szczegółów.

## Pisanie kodu znaczników w składni JSX {/*writing-markup-with-jsx*/}

Kod znaczników, który widzieliśmy w poprzedniej sekcji, nazywa się *JSX*. Nie jest on obowiązkowy, jednak większość projektów reactowych korzysta z niego dla wygody. Wszystkie [polecane przez nas narzędzia do programowania w środowisku lokalnym](/learn/installation) domyślnie wspierają składnię JSX.

Składnia JSX jest bardziej restrykcyjna niż HTML. Zawsze trzeba w niej zamykać znaczniki, np. `<br />`. Dodatkowo, twój komponent nie może zwracać kilku znaczników JSX jednocześnie. Jeśli chcesz zwrócić kilka elementów, musisz je opakować we wspólnego rodzica, np. `<div>...</div>` lub pusty fragment `<>...</>`:

```js {3,6}
function AboutPage() {
  return (
    <>
      <h1>O mnie</h1>
      <p>Cześć.<br />Jak się masz?</p>
    </>
  );
}
```

Jeśli masz już sporo kodu HTML i chcesz go przenieść do składni JSX, możesz skorzystać z [konwertera online](https://transform.tools/html-to-jsx).

## Dodawanie styli {/*adding-styles*/}

W Reakcie klase CSS-owe określamy za pomocą właściwości `className`. Działa ona tak samo jak atrybut [`class`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class) w HTML-u:

```js
<img className="avatar" />
```

Deklaracje CSS piszemy w osobnym pliku:

```css
/* W twoim pliku CSS */
.avatar {
  border-radius: 50%;
}
```

React nie wymusza jednego sposobu dodawania plików CSS-owych. W najprostszym przypadku możesz dodać znacznik [`<link>`](https://developer.mozilla.org/pl/docs/Web/HTML/Element/link) do kodu HTML strony. Jeśli korzystasz z jakiegoś narzędzia budującego lub frameworka, zajrzyj do ich dokumentacji, aby dowiedzieć się, jak poprawnie dodać pliki CSS do projektu.

## Wyświetlanie danych {/*displaying-data*/}

Składnia JSX pozwala umieszczać kod znaczników w kodzie javascriptowym. Za pomocą nawiasów klamrowych możesz "przeskoczyć" do JavaScriptu, aby umieścić jakąś zmienną i wyświetlić ją użytkownikowi. Na przykład, poniższy kod wyświetli wartość `user.name`:

```js {3}
return (
  <h1>
    {user.name}
  </h1>
);
```

"Przeskoczyć do JavaScriptu" możesz także w atrybutach komponentów, jednak musisz w tym celu użyć nawiasów klamrowych *zamiast* cudzysłowu. Dla przykładu, `className="avatar"` przekaże tekst `"avatar"` jako nazwę klasy CSS-owej, podczas gdy `src={user.imageUrl}` odczyta wartość zmiennej javascriptowej `user.imageUrl` i przekaże ją przez atrybut `src` attribute:

```js {3,4}
return (
  <img
    className="avatar"
    src={user.imageUrl}
  />
);
```

W nawiasach klamrowych możesz także umieszczać nieco bardziej skomplikowane wyrażenia, na przykład [łączenie tekstów](https://javascript.info/operators#string-concatenation-with-binary):

<Sandpack>

```js
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Zdjęcie ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```

```css
.avatar {
  border-radius: 50%;
}

.large {
  border: 4px solid gold;
}
```

</Sandpack>

W powyższym przykładzie `style={{}}` nie jest specjalną składnią, lecz zwykłym obiektem `{}` umieszczonym w nawiasach klamrowych `style={ }`. Możesz używać atrybutu `style`, gdy twoje style zależą od zmiennych javascriptowych.

## Renderowanie warunkowe {/*conditional-rendering*/}

W Reakcie nie ma specjalnej składni do zapisywania warunków. Zamiast tego możesz zastosować te same techniki, co w normalnym kodzie javascriptowym. Na przykład możesz użyć instrukcji [`if`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Statements/if...else), aby warunkowo dodać kod JSX-owy:

```js
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div>
);
```

Jeśli wolisz bardziej zwięzły kod, możesz użyć [operatora warunkowego `?`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Operators/Conditional_Operator). W przeciwieństwie do `if`, działa on wewnątrz składni JSX:

```js
<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
```

W przypadku gdy nie potrzebujesz gałęzi `else`, możesz zastosować krótszy zapis [operatora logicznego `&&`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#short-circuit_evaluation):

```js
<div>
  {isLoggedIn && <AdminPanel />}
</div>
```

Wszystkie z powyższych metod działają także przy warunkowym określaniu atrybutów. Jeśli nie znasz się jeszcze zbyt dobrze na składni JavaScriptu, możesz zacząć od używania `if...else`.

## Renderowanie list {/*rendering-lists*/}

Aby wyrenderować listę komponentów, możesz użyć [pętli `for`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Statements/for) lub [metodę `map()` dla tablic](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

Dla przykładu, załóżmy, że mamy następującą tablicę produktów:

```js
const products = [
  { title: 'Kapusta', id: 1 },
  { title: 'Czosnek', id: 2 },
  { title: 'Jabłko', id: 3 },
];
```

Wewnątrz twojego komponentu możesz użyć funkcji `map()`, aby przekształcić tablicę produktów w tablicę elementów `<li>`:

```js
const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);

return (
  <ul>{listItems}</ul>
);
```

Zwróć uwagę, że `<li>` ma atrybut klucza - `key`. Każdy element listy powinien posiadać ciąg znaków lub liczbę, które jednoznacznie identyfikują go spośród "rodzeństwa". Zwykle wartość klucza wyciąga się z danych, np. ID rekordu z bazy danych. React korzysta z tych kluczy, aby później lepiej zrozumieć, co się dzieje z interfejsem, gdy dodajesz, usuwasz lub zmieniasz kolejność elementów listy.

<Sandpack>

```js
const products = [
  { title: 'Kapusta', isFruit: false, id: 1 },
  { title: 'Czosnek', isFruit: false, id: 2 },
  { title: 'Jabłko', isFruit: true, id: 3 },
];

export default function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}
```

</Sandpack>

## Reagowanie na zdarzenia {/*responding-to-events*/}

Możesz reagować na zdarzenia, deklarując *procedurę obsługi zdarzeń* wewnątrz komponentu:

```js {2-4,7}
function MyButton() {
  function handleClick() {
    alert('Czuję się kliknięty!');
  }

  return (
    <button onClick={handleClick}>
      Kliknij mnie
    </button>
  );
}
```

Zwróć uwagę, że `onClick={handleClick}` nie ma na końcu nawiasów! Nie _wywołuj_ procedury obsługi zdarzeń: musisz ją jedynie *przekazać*. React wywoła ją za ciebie, gdy użytkownik kliknie na przycisk.

## Aktualizowanie interfejsu {/*updating-the-screen*/}

Często twoje komponenty będą musiały "zapamiętać" jakąś informację i wyświetlić ją na ekranie. Na przykład, być może zechcesz zliczać, ile razy przycisk został kliknięty. Aby to zrobić, dodaj *stan* do komponentu.

Najpierw zaimportuj [`useState`](/apis/usestate) z Reacta:

```js {1,4}
import { useState } from 'react';
```

Teraz możesz zadeklarować *zmienną stanu* w komponencie:

```js
function MyButton() {
  const [count, setCount] = useState(0);
```

Z funkcji `useState` otrzymasz dwie rzeczy: aktualny stan (`count`) i funkcję, która pozwoli ci go zaktualizować (`setCount`). Możesz nadać im dowolne nazwy, jednak zwykle nazywa się je na wzór: `[something, setSomething]`.

Przy pierwszym wyświetleniu przycisku wartość `count` będzie równa `0`, ponieważ przekazaliżmy `0` do `useState()`. Jeśli chcesz zmienić stan, wywołaj funkcję `setCount()` i przekaż do niej nową wartość. Kliknięcie w przycisk spowoduje zwiększenie wartości licznika o 1:

```js {5}
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Kliknięto {count} razy
    </button>
  );
}
```

React wywoła twoją funkcję komponentu ponownie. Tym razem jednak zmienna `count` będzie równa `1`. Później będzie to `2`. I tak dalej.

Jeśli wyrenderujesz ten sam komponent wielokrotnie, każdy z nich otrzyma swój własny stan. Spróbuj kliknąć na każdy z przycisków z osobna:

<Sandpack>

```js
import { useState } from 'react';

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Kliknięto {count} razy
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Liczniki, które aktualizują się niezależnie od siebie</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}
```

```css
button {
  display: block;
  margin-bottom: 5px;
}
```

</Sandpack>

Zwróć uwagę, że każdy z przycisków "pamięta" swoją własną wartość stanu `count` i nie wpływa na inne przyciski.

## Używanie hooków {/*using-hooks*/}

Funkcje o nazwie rozpoczynającej się od `use` nazywamy *hookami*. `useState` to wbudowany hook dostarczony przez Reacta. Inne hooki znajdziesz w [dokumentacji API Reacta](/apis). Możesz także stworzyć swój własny hook i wywołać w nim te istniejące.

Hooki są bardziej restrykcyjne od zwykłych funkcji. Możesz je wywołać tylko na *głównym poziomie* komponentu (lub innego hooka). Jeśli chcesz skorzystać z `useState` w warunku lub pętli, przenieś go do nowego komponentu, a następnie wyrenderuj ten komponent.

## Dzielenie danych między komponentami {/*sharing-data-between-components*/}

W poprzednim przykładzie każdy `MyButton` miał swój własny licznik `count`, a gdy kliknęliśmy na któryś z przycisków, tylko `count` tego przycisku ulegał zmianie:

<DiagramGroup>

<Diagram name="sharing_data_child" height={367} width={407} alt="Diagram przedstawiający drzewo trzech komponentów: jednego rodzica podpisanego MyApp i dwóch potomków podpisanych MyButton. Obydwa komponenty MyButton zawierają licznik z wartością zero.">

Początkowo każdy `MyButton` ma wartość licznika `count` równą `0`.

</Diagram>

<Diagram name="sharing_data_child_clicked" height={367} width={407} alt="Ten sam diagram co poprzednio, jednak wartość licznika pierwszego potomka jest podświetlona, sygnalizując kliknięcie, i ma wartość zwiększoną do jedynki. Drugi komponent MyButton nadal ma wartość zero." >

Pierwszy `MyButton` aktualizuje stan licznika `count` do `1`.

</Diagram>

</DiagramGroup>

Jednakże czasem zachodzi potrzeba, by komponenty *współdzieliły dane i zawsze aktualizowały się jednocześnie*.

Aby sprawić, by obydwa komponenty `MyButton` wyświetlały tę samą wartość licznika `count` i aktualizowały się jednocześnie, musisz przenieść stan z każdego z nich "w górę" do najbliższego rodzica, który je renderuje.

W naszym przykładzie będzie to `MyApp`:

<DiagramGroup>

<Diagram name="sharing_data_parent" height={385} width={410} alt="Diagram przedstawiający drzewo trzech komponentów: jednego rodzica podpisanego jako MyApp i dwóch potomków podpisanych jako MyButton. MyApp zawiera licznik o wartości zero, który przekazywany jest do obydwóch komponentów MyButton, które również pokazują zero." >

Początkowo stan `count` w `MyApp` jest równy `0` i jest przekazywany do obydwóch potomków.

</Diagram>

<Diagram name="sharing_data_parent_clicked" height={385} width={410} alt="Ten sam diagram co poprzednio, jednak wartość licznika komponentów-rodzica MyApp jest podświetlona, sygnalizując kliknięcie, i ma wartość zwiększoną do jedynki. Przepływ danych do obydwóch komponentów potomnych MyButton jest również podświetlony, a wartość licznika każdego z nich jest ustawiona na jedynkę, sugerując fakt, że wartość została przekazana od rodzica." >

Po kliknięciu wartość licznika w `MyApp` zwiększa się do `1`, a nowa wartość przekazywana jest do obydwóch potomków poprzez właściwość.

</Diagram>

</DiagramGroup>

Jeśli teraz klikniesz na którykolwiek z przycisków, wartość licznika `count` w `MyApp` ulegnie zmianie, a co za tym idzie zmienią się liczniki w komponentach `MyButton`. Oto jak możemy opisać tę zależność za pomocą kodu.

Najpierw *przenieś stan do góry* z `MyButton` do `MyApp`:

```js {2,6-10}
function MyButton() {
  // ... przenosimy kod stąd ...
}

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Liczniki, które aktualizują się niezależnie od siebie</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}
```

Teraz *przekaż stan w dół* z `MyApp` do każdego z komponentów `MyButton`. Nie zapomnij także o obsłudze kliknięcia. Możesz przekazać informacje do `MyButton` używając nawiasów klamrowych, tak jak zrobiliśmy to poprzednio na `<img>`:

```js {11-12}
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Liczniki, które zmieniają się jednocześnie</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}
```

Informacja, którą przekazujesz w dół w ten sposób, nazywana jest _właściwością_. Teraz komponent `MyApp` zawiera stan `count` i procedurę obsługi zdarzenia `handleClick`, które *przekazuje w dół jako właściwości* do każdego z przycisków.

Na koniec zmodyfikuj `MyButton` tak, aby *odczytywał* właściwości przekazane mu przez rodzica:

```js {1,3}
function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Kliknięto {count} razy
    </button>
  );
}
```

Kiedy klikasz w przycisk, wywoływana jest procedura z właściwości `onClick`. Właściwość `onClick` dla każdego z przycisków została ustawiona w `MyApp` na `handleClick`, dlatego to `handleClick` jest wywoływana, a co za tym idzie, wywoływany jest kod `setCount(count + 1)`, który zwiększa wartość stanu `count` o jeden. Nowa wartość `count` jest przekazywana przez właściwość do każdego z przycisków, dzięki czemu mogą one ją wyświetlić.

Opisany tu proces nazywa się "wynoszeniem stanu w górę". Przenosząc stan w górę umożliwiamy dzielenie go między komponentami.

<Sandpack>

```js
import {useState} from 'react';

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Kliknięto {count} razy
    </button>
  );
}

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Liczniki, które aktualizują się jednocześnie</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}
```

```css
button {
  display: block;
  margin-bottom: 5px;
}
```

</Sandpack>

## Następne kroki {/*next-steps*/}

Znasz już podstawy pisania kodu reactowego!

Przejdź do rozdziału pt. [Myślenie reactowe](/learn/thinking-in-react), aby poczuć, co w praktyce oznacza tworzenie UI w Reakcie.
