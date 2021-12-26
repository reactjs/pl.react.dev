---
title: Renderowanie warunkowe
---

<Intro>

Twoje komponenty zazwyczaj będą wyświetlały różne informacje w zależności od różnych warunków. W Reakcie możesz renderować warunkowo JSX używając składni javascriptowej, takiej jak warunek `if` czy operatory `&&` i `? :`.


</Intro>

<YouWillLearn>

* Jak zwrócić różny kod JSX w zależności od warunku
* Jak warunkowo wyświetlić lub wykluczyć część JSX-a
* Powszechne skróty składni warunkowej, które napotkasz w bazach kodu reactowego

</YouWillLearn>

## Warunkowe zwracanie JSX-a {/*conditionally-returning-jsx*/}

Załóżmy, że masz komponent `PackingList` renderujący kilka przedmiotów `Item`, które mogą być oznaczone jako spakowane `isPacked={true}` lub niespakowane `isPacked={false}`:

<Sandpack>

```js
function Item({ name, isPacked }) {
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Lista rzeczy do spakowania Sally Ride</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Skafander kosmiczny" 
        />
        <Item 
          isPacked={true} 
          name="Hełm ze złotym liściem" 
        />
        <Item 
          isPacked={false} 
          name="Zdjęcie Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

Zauważ, że dla niektórych komponentów `Item` właściwość `isPacked` ustawiono na `true` zamiast `false`. Chcielibyśmy, żeby przy spakowanych przedmiotach, które mają ustawione `isPacked={true}`, wyświetlał się "ptaszek" (✔).

Możesz to zapisać za pomocą [warunku `if`/`else`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Statements/if...else) w ten sposób:

```js
if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
```

Jeśli prop `isPacked` jest ustawiony na `true`, ten kod **zwróci odmienne drzewo JSX**. Wraz z tą zmianą, pewne przedmioty dostaną znacznik ✔.

<Sandpack>

```js
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Lista rzeczy do spakowania Sally</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Skafander kosmiczny" 
        />
        <Item 
          isPacked={true} 
          name="Hełm ze złotym liściem" 
        />
        <Item 
          isPacked={false} 
          name="Zdjęcie Tam'a" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

Spróbuj edytować kod i sprawdź, co zostanie zwrócone w obu przypadkach oraz jak zmieni się wynik!

Zwróć uwagę, jak tworzysz logikę rozgałęzień za pomocą warunków JavaScriptu `if` oraz `return`. W Reakcie, kontrola przepływu (taka jak warunki) jest obsługiwana przez JavaScript.

### Warunkowe zwracanie niczego z użyciem `null` {/*conditionally-returning-nothing-with-null*/}

W pewnych sytuacjach nie będziesz chciał niczego renderować. Dla przykładu, załóżmy, że w ogóle nie chcesz wyświetlać spakowanych przedmiotów. Komponent jednak musi coś zwrócić. W takim przypadku, możesz zwrócić `null`.

```js
if (isPacked) {
  return null;
}
return <li className="item">{name}</li>;
```

Jeśli `isPacked` ma wartość `true`, komponent nic nie zwróci - `null`. W przeciwnym razie zwróci JSX do wyrenderowania.

<Sandpack>

```js
function Item({ name, isPacked }) {
  if (isPacked) {
    return null;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Lista rzeczy do spakowania Sally</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Skafander kosmiczny" 
        />
        <Item 
          isPacked={true} 
          name="Hełm ze złotym liściem" 
        />
        <Item 
          isPacked={false} 
          name="Zdjęcie Tam'a" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

W praktyce, zwracanie `null` z komponentu nie jest powszechne, ponieważ może to zaskoczyć programistę, który próbuje go wyrenderować. Częściej zdarza się, że warunkowo wyświetlisz lub wykluczysz komponent w JSX komponentu nadrzędnego. Oto jak to zrobić!

## Warunkowe wyświetlanie JSX {/*conditionally-including-jsx*/}

W poprzednim przykładzie, kontrolowałeś które (jeśli którekolwiek) drzewo JSX zostanie zwrócone przez komponent. Być może zauważyłeś pewne powielenia w wyniku renderowania:

```js
<li className="item">{name} ✔</li>
```

jest bardzo podobne do:

```js
<li className="item">{name}</li>
```

Oba warunkowe rozgałęzienia zwracają `<li className="item">...</li>`:


```js
if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
```

W tym przypadku powielenia nie są szkodliwe, jednak może to utrudniać utrzymanie kodu. Co w sytuacji, jeśli chciałyś zmienić `className`? Wówczas, musiałbyś to zrobić w dwóch miejscach w kodzie. W takich sytuacjach, mógłbyś warunkowo dołączyć JSX, aby twój kod był bardziej [DRY](https://pl.wikipedia.org/wiki/DRY).

### Operator warunkowy (`? :`) {/*conditional-ternary-operator--*/}

JavaScript posiada zwartą składnię do tworzenia wyrażenia warunkowego -- [operator warunkowy](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

Zamiast poniższego kodu:

```js
if (isPacked) {
  return <li className="item">{name} ✔</li>;
}
return <li className="item">{name}</li>;
```

Możesz napisać w ten sposób:

```js
return (
  <li className="item">
    {isPacked ? name + ' ✔' : name}
  </li>
);
```

Możesz to wyrażenie przeczytać jako: *"jeśli `isPacked` ma wartość `true`, wtedy (`?`) wyrenderuj `name + ' ✔'`, w przeciwnym razie (`:`) wyrenderuj `name`."*)

<DeepDive title="Czy te dwa przykłady są w pełni równoważne?">

Jeśli wywodzisz się z programowania obiektowego, możesz założyć, że dwa powyższe przykłady są nieco inne, ponieważ jeden z nich może tworzyć dwie różne "instancje" `<li>`. Jednak elementy JSX nie są "instancjami", ponieważ nie przechowują żadnego stanu wewnętrznego oraz nie są prawdziwymi węzłami DOM. Tak więc te dwa przykłady *są* w pełni równoważne. [Zachowywanie i Resetowanie Stanu](/learn/preserving-and-resetting-state) zawiera szczegółowe informacje o tym, jak to działa.

</DeepDive>

Załóżmy, że chciałbyś umieścić tekst ukończonego elementu w innym znaczniku HTML, na przykład `<del>`, aby uzyskać efekt przekreślenia. Możesz dodać więcej nowych linii i nawiasów, aby było łatwiej zagnieżdżać więcej JSX w każdym z przypadków:

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {isPacked ? (
        <del>
          {name + ' ✔'}
        </del>
      ) : (
        name
      )}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Lista rzeczy do spakowania Sally</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Skafander kosmiczny" 
        />
        <Item 
          isPacked={true} 
          name="Hełm ze złotym liściem" 
        />
        <Item 
          isPacked={false} 
          name="Zdjęcie Tam'a" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

Ten sposób sprawdza się przy prostch warunkach, używaj go jednak z umiarem. Jeśli twój komponent robi się nieczytelny, ponieważ posiada zbyt dużą ilość znaczników warunkowych, rozważ wyodrębnienie komponentów podrzędnych, aby go uporządkować. W Reakcie, znaczniki są częścią twojego kodu, więc możesz używać narzędzi takich jak zmienne oraz funkcje do porządkowania złożonych wyrażeń.

### Operator logiczny AND (`&&`) {/*logical-and-operator-*/}

Kolejnym powszechnie stosowanym skrótem z którym będziesz miał styczność jest [operator logiczny AND (`&&`) JavaScriptu](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#:~:text=The%20logical%20AND%20(%20%26%26%20)%20operator,it%20returns%20a%20Boolean%20value.). Wewnątrz komponentu React, często wykorzystuje się go gdy chcesz wyrenderować JSX, gdy warunek jest spełniony (posiada wartość `true`) **lub gdy nie chcesz nic wyrenderować.** Ze znacznikiem `&&`, możesz warunkowo wyrenderować znacznik ✔ tylko wtedy, jeśli `isPacked` posiada wartość `true`.

```js
return (
  <li className="item">
    {name} {isPacked && '✔'}
  </li>
);
```
Możesz to wyrażenie przeczytać jako: *“jeśli `isPacked`, wtedy (`&&`) wyrenderuj znacznik ✔, w przeciwnym razie nic nie renderuj.”*

Poniżej przedstawiono przykład:

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✔'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Lista rzeczy do spakowania Sally</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Skafander kosmiczny" 
        />
        <Item 
          isPacked={true} 
          name="Hełm ze złotym liściem" 
        />
        <Item 
          isPacked={false} 
          name="Zdjęcie Tam'a" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

[Wyrażenie && w JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) zwraca wartości z prawej strony (w naszym przypadku znacznik ✔), jeśli po lewej stronie warunek został spełniony (posiada wartość `true`). Jeśli jednak warunek posiada wartość `false`, całe wyrażenie staje się `false` i nie zostaje spełnione. React traktuje `false` jako "dziurę" w drzewie JSX, podobnie jak `null` czy `undefined` i nie renderuje niczego w tym miejscu.

<Gotcha>

**Nie umieszczaj liczb po lewej stronie znacznika `&&`.**

Aby sprawdzić warunek, JavaScript automatycznie konwertuje lewą stronę na wartość logiczną. Jeśli jednak lewa strona wyrażenia posiada wartość `0`, całe wyrażenie otrzyma tę wartość (`0`), a React z radością wyrenderuje `0`, zamiast niczego nie wyrenderować.

Na przykład, powszechnym błędem jest pisanie kodu `messageCount && <p>New messages</p>`. Łatwo założyć, że nic nie zostanie wyrenderowane, kiedy `messageCount` posiada wartość `0`, jednak tak naprawde wyrenderowane zostanie samo `0`!

Aby to naprawić, zastosuj wartość logiczną po lewej stronie: `messageCount > 0 && <p>New messages</p>`.

</Gotcha>

### Warunkowe przypisywanie JSX do zmiennej {/*conditionally-assigning-jsx-to-a-variable*/}

Jeśli skróty przeszkadzają w pisaniu zwykłego kodu, spróbuj użyć warunku `if` oraz zmiennej. Możesz ponownie przypisać wartości do zmiennej, zdefiniowanej za pomocą [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), zacznij więc od podania domyślnej wartości, którą wyświetlić:

```js
let itemContent = name;
```

Użyj warunku `if`, aby przypisać ponownie wyrażenie JSX do `itemContent`, jeśli `isPacked` posiada wartość `true`:

```js
if (isPacked) {
  itemContent = name + " ✔";
}
```

[Używanie nawiasów klamrowych otwiera "okno na świat JavaScriptu".](/learn/javascript-in-jsx-with-curly-braces#using-curly-braces-a-window-into-the-javascript-world) Ulokuj zmienną z nawiasami klamrowymi w zwróconym drzewie JSX, zagnieżdżając uprzednio przeliczone wyrażenie wewnątrz JSX:

```js
<li className="item">
  {itemContent}
</li>
```

Ten sposób jest najbardziej rozwlekły, jednocześnie jednak najbardziej elastyczny. Poniżej przedstawiono przykład:

<Sandpack>

```js
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✔";
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Lista rzeczy do spakowania Sally</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Skafander kosmiczny" 
        />
        <Item 
          isPacked={true} 
          name="Hełm ze złotym liściem" 
        />
        <Item 
          isPacked={false} 
          name="Zdjęcie Tam'a" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

Tak jak poprzednio, ten sposób działa nie tylko dla tekstu, ale także dla dowolnego JSX:

<Sandpack>

```js
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = (
      <del>
        {name + " ✔"}
      </del>
    );
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Lista rzeczy do spakowania Sally</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Skafander kosmiczny" 
        />
        <Item 
          isPacked={true} 
          name="Hełm ze złotym liściem" 
        />
        <Item 
          isPacked={false} 
          name="Zdjęcie Tam'a" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

Jeśli nie jesteś zaznajomiony z JavaScriptem, ta różnorodność sposobów może początkowo wydawać się przytłaczająca. Jednak ich nauka pomoże ci czytać i pisać dowolny kod JavaScript -- nie tylko komponenty Reactowe! Na początku wybierz jeden sposób, który wolisz, a następnie zapoznaj się ponownie z tymi notatkami, jeśli zapomnisz jak działają inne.

<Recap>

* W Reakcie kontrolujesz logikę rozgałęzień za pomocą JavaScriptu.
* Możesz zwrócić wyrażenie JSX warunkowo, używając do tego warunku `if`.
* Możesz warunkowo zapisać część kodu JSX w zmiennej, a następnie dołączyć go do innego kodu JSX, używając nawiasów klamrowych.
* W JSX, `{cond ? <A /> : <B />}` oznacza *"jeśli `cond`, wyrenderuj `<A />`, w przeciwnym razie wyrenderuj `<B />`"*.
* W JSX, `{cond && <A />}` oznacza *"jeśli `cond`, wyrenderuj `<A />`, w przeciwnym razie nic nie renderuj"*.
* Skróty są powszechnie używane, ale nie musisz ich używać, jesli wolisz zwykły `if`.

</Recap>



<Challenges>

### Wyświetl znacznik dla niespakowanych przedmiotów za pomocą `? :` {/*show-an-icon-for-incomplete-items-with--*/}

Użyj operatora warunkowego (`cond ? a : b`), aby wyświetlić ❌, jeśli `isPacked` nie posiada wartości `true`.

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✔'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Lista rzeczy do spakowania Sally</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Skafander kosmiczny" 
        />
        <Item 
          isPacked={true} 
          name="Hełm ze złotym liściem" 
        />
        <Item 
          isPacked={false} 
          name="Zdjęcie Tam'a" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

<Solution>

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked ? '✔' : '❌'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Lista rzeczy do spakowania Sally</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Skafander kosmiczny" 
        />
        <Item 
          isPacked={true} 
          name="Hełm ze złotym liściem" 
        />
        <Item 
          isPacked={false} 
          name="Zdjęcie Tam'a" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

</Solution>

### Wyświetl priorytet przedmiotu za pomocą `&&` {/*show-the-item-importance-with-*/}

W tym przykładzie, każdy `Item` otrzymuje prop `importance`, który określa jego priorytet. Użyj operatora `&&`, aby wyświetlić "_(Importance: X)_" kursywą, ale tylko dla przedmiotów, które posiadają priorytet inny niż 0. Twoja lista przedmiotów powinna wyglądać w następujący sposób:

* Skafander kosmiczny _(Importance: 9)_
* Hełm ze złotym liściem
* Zdjęcie Tam'a _(Importance: 6)_

Nie zapomnij umieścić spacji pomiędzy dwoma wartościami!

<Sandpack>

```js
function Item({ name, importance }) {
  return (
    <li className="item">
      {name}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Lista rzeczy do spakowania Sally</h1>
      <ul>
        <Item 
          importance={9} 
          name="Skafander kosmiczny" 
        />
        <Item 
          importance={0} 
          name="Hełm ze złotym liściem" 
        />
        <Item 
          importance={6} 
          name="Zdjęcie Tam'a" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

<Solution>

To powinno załatwić sprawę:

<Sandpack>

```js
function Item({ name, importance }) {
  return (
    <li className="item">
      {name}
      {importance > 0 && ' '}
      {importance > 0 &&
        <i>(Importance: {importance})</i>
      }
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Lista rzeczy do spakowania Sally</h1>
      <ul>
        <Item 
          importance={9} 
          name="Skafander kosmiczny" 
        />
        <Item 
          importance={0} 
          name="Hełm ze złotym liściem" 
        />
        <Item 
          importance={6} 
          name="Zdjęcie Tam'a" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

Zauważ, że powinieneś napisać `importance > 0 && ...`, zamiast `importance && ...`, w ten sposób jeśli `importance` ma wartość `0`, `0` nie zostanie wyrenderowane!

W tym rozwiązaniu, dwa oddzielne warunki zostały użyte w celu wstawienia spacji między nazwą przedmiotu, a wartością priorytetu. Alternatywnie, mógłbyś użyć fragmentu, na początku którego wstawisz spację: `importance > 0 && <> <i>...</i></>` lub mógłbyś również wstawić spację wewnątrz `<i>`:  `importance > 0 && <i> ...</i>`.


</Solution>

### Zmodyfikuj szereg warunków `? :` na `if` ze zmiennymi {/*refactor-a-series-of---to-if-and-variables*/}

Komponent `Drink` korzysta kilkukrotnie z operatora warunkowego `? :`, aby wyświetlić różne informacje w zależności od tego, czy prop `name` posiada wartość `"herbata"` lub `"kawa"`. Problem w tym, że informacje o każdym z napojów składają się z kilku warunków. Zmodyfikuj poniższy kod, aby użyć pojedyńczej instrukcji `if`, zamiast trzech warunków `? :`.

<Sandpack>

```js
function Drink({ name }) {
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Część rośliny</dt>
        <dd>{name === 'herbata' ? 'liść' : 'ziarno'}</dd>
        <dt>Zawartość kofeiny</dt>
        <dd>{name === 'herbata' ? '15–70 mg/filiżanka' : '80–185 mg/filiżanka'}</dd>
        <dt>Wiek</dt>
        <dd>{name === 'herbata' ? '4,000+ lat' : '1,000+ lat'}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="herbata" />
      <Drink name="kawa" />
    </div>
  );
}
```

</Sandpack>

Jeśli dokonałeś już modyfikacji kodu i użyłeś `if`, czy masz dalsze pomysły, jak bardziej uprościć ten kod?

<Solution>

Można to zrobić na wiele sposobów, oto jeden z nich:

<Sandpack>

```js
function Drink({ name }) {
  let część, kofeina, wiek;
  if (name === 'herbata') {
    część = 'liść';
    kofeina = '15–70 mg/filiżanka';
    wiek = '4,000+ lat';
  } else if (name === 'kawa') {
    część = 'ziarno';
    kofeina = '80–185 mg/filiżanka';
    wiek = '1,000+ lat';
  }
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Część rośliny</dt>
        <dd>{część}</dd>
        <dt>Zawartość kofeiny</dt>
        <dd>{kofeina}</dd>
        <dt>Wiek</dt>
        <dd>{wiek}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="herbata" />
      <Drink name="kawa" />
    </div>
  );
}
```

</Sandpack>

Tutaj informacje o każdym napoju są pogrupowane razem, a nie rozłożone na kilka warunków. Ułatwi to dodawanie kolejnych napojów w przyszłości.

Innym rozwiązaniem byłoby całkowite usunięcie warunku i przeniesienie informacji do obiektów:

<Sandpack>

```js
const drinks = {
  herbata: {
    część: 'liść',
    kofeina: '15–70 mg/filiżanka',
    wiek: '4,000+ lat'
  },
  kawa: {
    część: 'ziarno',
    kofeina: '80–185 mg/filiżanka',
    wiek: '1,000+ lat'
  }
};

function Drink({ name }) {
  const info = drinks[name];
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Część rośliny</dt>
        <dd>{info.część}</dd>
        <dt>Zawartość kofeiny</dt>
        <dd>{info.kofeina}</dd>
        <dt>Wiek</dt>
        <dd>{info.wiek}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="herbata" />
      <Drink name="kawa" />
    </div>
  );
}
```

</Sandpack>

</Solution>

</Challenges>