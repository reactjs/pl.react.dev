---
title: Renderowanie warunkowe
---

<Intro>

Twoje komponenty zazwyczaj będą wyświetlały różne informacje w zależności od różnych warunków. W Reakcie, możesz renderować warunkowo JSX używając syntaxu JavaScript, takiego jak warunek `if`, `&&` oraz operatorów `? :`.


</Intro>

<YouWillLearn>

* Jak zwrócić różny JSX w zależności od warunku
* Jak warunkowo zawrzeć lub wykluczyć część JSX
* Powszechne skróty składni warunkowej, które napotkasz w bazach kodu Reacta

</YouWillLearn>

## Warunkowe zwracanie JSX {/*conditionally-returning-jsx*/}

Załóżmy, że posiadasz komponent `PackingList` renderujący kilka `Item`'ów, który może być oznaczony jako spakowany `isPacked={true}` lub niespakowany `isPacked={false}`:

<Sandpack>

```js
function Item({ name, isPacked }) {
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

Zauważ, że niektóre z komponentów `Item` posiada prop `isPacked` ustawiony na `true` zamiast `false`. Chcesz dodać znacznik ✔ do spakowanych przedmiotów, jeśli `isPacked={true}`.

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

W pewnych sytuacjach nie będziesz chciał niczego renderować. Dla przykładu, załóżmy, że w ogóle nie chcesz pokazywać spakowanych przedmiotów. Komponent jednak musi coś zwrócić. W takim przypadku, możesz zwrócić `null`.

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

W praktyce, zwracanie `null` z komponentu nie jest powszechne, ponieważ może to zaskoczyć programistę, który próbuje go wyrenderować. Częściej zdarza się, że warunkowo dołączysz lub wykluczysz komponent w JSX komponentu nadrzędnego. Oto jak to zrobić!

## Warunkowe dołączanie JSX {/*conditionally-including-jsx*/}

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

Możesz to wyrażenie przeczytać jako *"jeśli `isPacked` ma wartość `true`, wtedy (`?`) wyrenderuj `name + ' ✔'`, w przeciwnym razie (`:`) wyrenderuj `name`."*)

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

Kolejnym powszechnie stosowanym skrótem z którym będziesz miał styczność jest [operator logiczny AND (`&&`) JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#:~:text=The%20logical%20AND%20(%20%26%26%20)%20operator,it%20returns%20a%20Boolean%20value.). Wewnątrz komponentu React, często wykorzystuje się go gdy chcesz wyrenderować JSX, gdy warunek jest spełniony (posiada wartość `true`) **lub gdy nie chcesz nic wyrenderować.** Ze znacznikiem `&&`, możesz warunkowo wyrenderować znacznik ✔ tylko wtedy, jeśli `isPacked` posiada wartość `true`.

```js
return (
  <li className="item">
    {name} {isPacked && '✔'}
  </li>
);
```
Możesz to wyrażenie przeczytać jako *“jeśli `isPacked`, wtedy (`&&`) wyrenderuj znacznik ✔, w przeciwnym razie nic nie renderuj.”*

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

[Wyrażenie && JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) zwraca wartości z prawej strony (w naszym przypadku znacznik ✔), jeśli po lewej stronie warunek został spełniony (posiada wartość `true`). Jeśli jednak warunek posiada wartość `false`, całe wyrażenie staje się `false` i nie zostaje spełnione. React traktuje `false` jako "dziurę" w drzewie JSX, podobnie jak `null` czy `undefined` i nie renderuje niczego w tym miejscu.

<Gotcha>

**Nie umieszczaj liczb po lewej stronie znacznika `&&`.**

Aby sprawdzić warunek, JavaScript automatycznie konwertuje lewą stronę na wartość logiczną. Jeśli jednak lewa strona wyrażenia posiada wartość `0`, całe wyrażenie otrzyma tę wartość (`0`), a React z radością wyrenderuje `0`, zamiast niczego nie wyrenderować.

Na przykład, powszechnym błędem jest pisanie kodu `messageCount && <p>New messages</p>`. Łatwo założyć, że nic nie zostanie wyrenderowane, kiedy `messageCount` posiada wartość `0`, jednak tak naprawde wyrenderowane zostanie samo `0`!

Aby to naprawić, zastosuj wartość logiczną po lewej stronie: `messageCount > 0 && <p>New messages</p>`.

</Gotcha>

### Conditionally assigning JSX to a variable {/*conditionally-assigning-jsx-to-a-variable*/}

When the shortcuts get in the way of writing plain code, try using an `if` statement and a variable. You can reassign variables defined with [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), so start by providing the default content you want to display, the name:

```js
let itemContent = name;
```

Use an `if` statement to reassign a JSX expression to `itemContent` if `isPacked` is `true`:

```js
if (isPacked) {
  itemContent = name + " ✔";
}
```

[Curly braces open the "window into JavaScript".](/learn/javascript-in-jsx-with-curly-braces#using-curly-braces-a-window-into-the-javascript-world) Embed the variable with curly braces in the returned JSX tree, nesting the previously calculated expression inside of JSX:

```js
<li className="item">
  {itemContent}
</li>
```

This style is the most verbose, but it's also the most flexible. Here it is in action:

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
      <h1>Sally Ride's Packing List</h1>
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

Like before, this works not only for text, but for arbitrary JSX too:

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
      <h1>Sally Ride's Packing List</h1>
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

If you're not familiar with JavaScript, this variety of styles might seem overwhelming at first. However, learning them will help you read and write any JavaScript code -- and not just React components! Pick the one you prefer for a start, and then consult this reference again if you forget how the other ones work.

<Recap>

* In React, you control branching logic with JavaScript.
* You can return a JSX expression conditionally with an `if` statement.
* You can conditionally save some JSX to a variable and then include it inside other JSX by using the curly braces.
* In JSX, `{cond ? <A /> : <B />}` means *"if `cond`, render `<A />`, otherwise `<B />`"*.
* In JSX, `{cond && <A />}` means *"if `cond`, render `<A />`, otherwise nothing"*.
* The shortcuts are common, but you don't have to use them if you prefer plain `if`.

</Recap>



<Challenges>

### Show an icon for incomplete items with `? :` {/*show-an-icon-for-incomplete-items-with--*/}

Use the conditional operator (`cond ? a : b`) to render a ❌ if `isPacked` isn’t `true`.

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
      <h1>Sally Ride's Packing List</h1>
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
      <h1>Sally Ride's Packing List</h1>
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

### Show the item importance with `&&` {/*show-the-item-importance-with-*/}

In this example, each `Item` receives a numerical `importance` prop. Use the `&&` operator to render "_(Importance: X)_" in italics, but only for items that have non-zero difficulty. Your item list should end up looking like this:

* Space suit _(Importance: 9)_
* Helmet with a golden leaf
* Photo of Tam _(Importance: 6)_

Don't forget to add a space between the two labels!

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
      <h1>Sally Ride's Packing List</h1>
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

This should do the trick:

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
      <h1>Sally Ride's Packing List</h1>
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

Note that you must write `importance > 0 && ...` rather than `importance && ...` so that if the `importance` is `0`, `0` isn't rendered as the result!

In this solution, two separate conditions are used to insert a space between then name and the importance label. Alternatively, you could use a fragment with a leading space: `importance > 0 && <> <i>...</i></>` or add a space immediately inside the `<i>`:  `importance > 0 && <i> ...</i>`.

</Solution>

### Refactor a series of `? :` to `if` and variables {/*refactor-a-series-of---to-if-and-variables*/}

This `Drink` component uses a series of `? :` conditions to show different information depending on whether the `name` prop is `"tea"` or `"coffee"`. The problem is that the information about each drink is spread across multiple conditions. Refactor this code to use a single `if` statement instead of three `? :` conditions.

<Sandpack>

```js
function Drink({ name }) {
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{name === 'tea' ? 'leaf' : 'bean'}</dd>
        <dt>Caffeine content</dt>
        <dd>{name === 'tea' ? '15–70 mg/cup' : '80–185 mg/cup'}</dd>
        <dt>Age</dt>
        <dd>{name === 'tea' ? '4,000+ years' : '1,000+ years'}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
```

</Sandpack>

Once you've refactored the code to use `if`, do you have further ideas on how to simplify it?

<Solution>

There are multiple ways you could go about this, but here is one starting point:

<Sandpack>

```js
function Drink({ name }) {
  let part, caffeine, age;
  if (name === 'tea') {
    part = 'leaf';
    caffeine = '15–70 mg/cup';
    age = '4,000+ years';
  } else if (name === 'coffee') {
    part = 'bean';
    caffeine = '80–185 mg/cup';
    age = '1,000+ years';
  }
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{part}</dd>
        <dt>Caffeine content</dt>
        <dd>{caffeine}</dd>
        <dt>Age</dt>
        <dd>{age}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
```

</Sandpack>

Here the information about each drink is grouped together instead of being spread across multiple conditions. This makes it easier to add more drinks in the future.

Another solution would be to remove the condition altogether by moving the information into objects:

<Sandpack>

```js
const drinks = {
  tea: {
    part: 'leaf',
    caffeine: '15–70 mg/cup',
    age: '4,000+ years'
  },
  coffee: {
    part: 'bean',
    caffeine: '80–185 mg/cup',
    age: '1,000+ years'
  }
};

function Drink({ name }) {
  const info = drinks[name];
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{info.part}</dd>
        <dt>Caffeine content</dt>
        <dd>{info.caffeine}</dd>
        <dt>Age</dt>
        <dd>{info.age}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
    </div>
  );
}
```

</Sandpack>

</Solution>

</Challenges>