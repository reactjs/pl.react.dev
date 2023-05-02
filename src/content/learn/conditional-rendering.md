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

Jeśli właściwość `isPacked` jest ustawiona na `true`, ten kod **zwróci odmienne drzewo JSX**. Wraz z tą zmianą, niektóre z elementów zostaną wyrenderowane wraz z znacznikiem ✔.

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

Spróbuj edytować kod i sprawdź, co zostanie zwrócone w obu przypadkach oraz jak zmieni się wynik!

Zwróć uwagę, jak tworzysz logikę rozgałęzień za pomocą javascriptowych instrukcji `if` oraz `return`. W Reakcie kontrola przepływu (taka jak warunki) jest obsługiwana przez JavaScript.

### Warunkowe zwracanie niczego z użyciem `null` {/*conditionally-returning-nothing-with-null*/}

W pewnych sytuacjach nie będziesz chcieć niczego renderować. Dla przykładu, załóżmy, że w ogóle nie chcesz wyświetlać spakowanych przedmiotów. Komponent jednak musi coś zwrócić. W takim przypadku możesz zwrócić `null`.

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

W praktyce, zwykle komponenty nie zwracają `null`, ponieważ może to okazać się zaskakujące dla dewelopera, który próbuje wyrenderować dany komponent. Częściej zdarza się, że warunkowo wyświetlamy bądź nie komponent w kodzie JSX-owym rodzica. Oto jak to zrobić!

## Warunkowe wyświetlanie JSX-a {/*conditionally-including-jsx*/}

W poprzednim przykładzie nasz kod decydował, które (jeśli którekolwiek) drzewo JSX-owe zostanie zwrócone przez komponent. Być może widzisz pewne powtórzenia w wyniku renderowania:

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

W tym przypadku powielenia nie są szkodliwe, jednak mogą one utrudniać utrzymanie kodu. Co w sytuacji, gdybyśmy chcieli zmienić `className`? Wówczas musielibyśmy to zrobić w dwóch miejscach w kodzie. W takich sytuacjach można warunkowo dołączyć JSX, aby kod był bardziej [DRY](https://pl.wikipedia.org/wiki/DRY).

### Operator warunkowy (`? :`) {/*conditional-ternary-operator--*/}

JavaScript posiada zwartą składnię do tworzenia wyrażenia warunkowego -- [operator warunkowy](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Operators/Conditional_Operator), zwany także "operatorem ternarnym" (trójargumentowym).

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

<DeepDive>

#### Czy te dwa przykłady są w pełni równoważne? {/*are-these-two-examples-fully-equivalent*/}

Jeśli wywodzisz się z programowania obiektowego, możesz założyć, że dwa powyższe przykłady są nieco inne, ponieważ jeden z nich może tworzyć dwie różne "instancje" `<li>`. Jednak elementy JSX nie są "instancjami", ponieważ nie przechowują żadnego stanu wewnętrznego oraz nie są prawdziwymi węzłami DOM. Tak więc te dwa przykłady *są* w pełni równoważne. Rozdział pt. [Zachowywanie i resetowanie stanu](/learn/preserving-and-resetting-state) zawiera szczegółowe informacje o tym, jak to działa.

</DeepDive>

Załóżmy, że mamy zadanie umieścić tekst ukończonego elementu w innym znaczniku HTML, na przykład `<del>`, aby uzyskać efekt przekreślenia. Możesz dodać więcej nowych linii i nawiasów, aby było łatwiej zagnieżdżać więcej JSX w każdym z przypadków:

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

Ten sposób sprawdza się przy prostych warunkach, używaj go jednak z umiarem. Jeśli twój komponent robi się nieczytelny, ponieważ posiada zbyt dużą liczbę warunków, rozważ wyodrębnienie komponentów podrzędnych, aby go uporządkować. W Reakcie znaczniki są częścią twojego kodu, więc możesz używać narzędzi takich jak zmienne oraz funkcje do porządkowania złożonych wyrażeń.

### Operator logiczny AND (`&&`) {/*logical-and-operator-*/}

Kolejnym powszechnie stosowanym skrótem, z którym możesz się zetknąć, jest [javascriptowy operator logiczny AND (`&&`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#:~:text=The%20logical%20AND%20(%20%26%26%20)%20operator,it%20returns%20a%20Boolean%20value.). Wewnątrz komponentów reactowych często wykorzystujemy go, gdy chcemy wyrenderować JSX przy spełnieniu warunku **lub gdy nie chcemy nic renderować przy niespełnionym warunku.** Przy pomocy operatora `&&` możesz warunkowo wyrenderować "ptaszek" (✔) tylko wtedy, kiedy właściwość `isPacked` jest ustawiona na `true`.

```js
return (
  <li className="item">
    {name} {isPacked && '✔'}
  </li>
);
```

Możesz to wyrażenie przeczytać jako: *“jeśli `isPacked`, wtedy (`&&`) wyrenderuj "ptaszek" ✔; w przeciwnym razie nic nie renderuj.”*

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

[Wyrażenie && w JavaScripcie](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) zwraca wartość z prawej strony operatora (w naszym przypadku "ptaszek" ✔), jeśli po lewej stronie warunek został spełniony (ma wartość `true`). Jeśli jednak warunek ma wartość `false`, całe wyrażenie staje się `false` i nie zostaje spełnione. React traktuje `false` jako "dziurę" w drzewie JSX, podobnie jak `null` czy `undefined` i nie renderuje niczego w tym miejscu.

<Pitfall>

**Nie umieszczaj liczb po lewej stronie znacznika `&&`.**

Aby sprawdzić warunek, JavaScript automatycznie konwertuje lewą stronę na wartość logiczną. Jeśli jednak lewa strona wyrażenia ma wartość `0`, całe wyrażenie otrzyma tę wartość (`0`), a React z radością wyrenderuje `0`, zamiast niczego nie renderować.

Na przykład, powszechnym błędem jest pisanie kodu `messageCount && <p>New messages</p>`. Łatwo założyć, że nic nie zostanie wyrenderowane, kiedy `messageCount` ma wartość `0`, jednak tak naprawdę wyrenderowane zostanie samo `0`!

Aby to naprawić, zastosuj wartość logiczną po lewej stronie: `messageCount > 0 && <p>New messages</p>`.

</Pitfall>

### Warunkowe przypisywanie JSX-a do zmiennej {/*conditionally-assigning-jsx-to-a-variable*/}

Jeśli skróty przeszkadzają w pisaniu zwykłego kodu, spróbuj użyć warunku `if` oraz zmiennej. Możesz ponownie przypisać wartości do zmiennej, zdefiniowanej za pomocą [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), zacznij więc od podania domyślnej wartości, którą chcesz wyświetlić:

```js
let itemContent = name;
```

Użyj warunku `if`, aby przypisać ponownie wyrażenie JSX-owe do `itemContent`, jeśli `isPacked` posiada wartość `true`:

```js
if (isPacked) {
  itemContent = name + " ✔";
}
```

[Używanie nawiasów klamrowych otwiera "okno na świat JavaScriptu".](/learn/javascript-in-jsx-with-curly-braces#using-curly-braces-a-window-into-the-javascript-world) Umieść zmienną wewnątrz nawiasów klamrowych w zwróconym drzewie JSX, zagnieżdżając uprzednio przeliczone wyrażenie wewnątrz JSX:

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

Tak jak poprzednio, ten sposób działa nie tylko dla tekstu, ale także dla dowolnego kodu JSX:

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

Jeśli znasz dobrze JavaScriptu, ta różnorodność sposobów może początkowo wydawać się przytłaczająca. Jednak ich nauka pomoże ci czytać i pisać dowolny kod javascriptowy -- nie tylko komponenty reactowe! Na początku wybierz jeden preferowany sposób, a następnie zapoznaj się ponownie z tymi notatkami, jeśli zapomnisz zasady działania pozostałych.

<Recap>

* W Reakcie kontrolujesz logikę rozgałęzień za pomocą JavaScriptu.
* Możesz zwrócić wyrażenie JSX-owe warunkowo, używając do tego instrukcji `if`.
* Możesz warunkowo zapisać część kodu JSX w zmiennej, a następnie dołączyć go do innego kodu JSX, używając nawiasów klamrowych.
* W JSX `{warunek ? <A /> : <B />}` oznacza: *"jeśli `warunek` jest prawdziwy, wyrenderuj `<A />`, w przeciwnym razie wyrenderuj `<B />`"*.
* W JSX `{warunek && <A />}` oznacza: *"jeśli `warunek` jest prawdziwy, wyrenderuj `<A />`, w przeciwnym razie nic nie renderuj"*.
* Skrótowy zapis jest dość powszechny, ale nie musisz go używać, jeśli wolisz zwykłe `if`.

</Recap>



<Challenges>

#### Wyświetl znacznik dla niespakowanych przedmiotów za pomocą `? :` {/*show-an-icon-for-incomplete-items-with--*/}

Użyj operatora warunkowego (`warunek ? a : b`), aby wyświetlić ❌, jeśli `isPacked` nie ma wartości `true`.

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

</Solution>

#### Wyświetl priorytet przedmiotu za pomocą `&&` {/*show-the-item-importance-with-*/}

W tym przykładzie, każdy element `Item` otrzymuje właściwość `importance`, która określa jego priorytet. Użyj operatora `&&`, aby wyświetlić "_(Priorytet: X)_" kursywą, ale tylko dla przedmiotów, które otrzymały wartość inną niż 0. Twoja lista przedmiotów powinna wyglądać w następujący sposób:

* Skafander kosmiczny _(Priorytet: 9)_
* Hełm ze złotym liściem
* Zdjęcie Tam _(Priorytet: 6)_

Nie zapomnij dodać spacji pomiędzy tymi dwoma wartościami!

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
      <h1>Lista rzeczy do spakowania Sally Ride</h1>
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
          name="Zdjęcie Tam" 
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
        <i>(Priorytet: {importance})</i>
      }
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Lista rzeczy do spakowania Sally Ride</h1>
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
          name="Zdjęcie Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

Zwróć uwagę, że należy tu napisać `importance > 0 && ...`, zamiast `importance && ...`. W ten sposób jeśli `importance` ma wartość `0`, `0` nie zostanie wyrenderowane!

W tym rozwiązaniu dwa oddzielne warunki zostały użyte w celu wstawienia spacji między nazwą przedmiotu a wartością priorytetu. Alternatywnie, można użyć fragmentu, na początku którego wstawiłoby się spację: `importance > 0 && <> <i>...</i></>` lub można również wstawić spację wewnątrz `<i>`:  `importance > 0 && <i> ...</i>`.


</Solution>

#### Zamień szereg warunków `? :` na `if` ze zmiennymi {/*refactor-a-series-of---to-if-and-variables*/}

Komponent `Drink` korzysta kilkukrotnie z operatora warunkowego `? :`, aby wyświetlić różne informacje w zależności od tego, czy właściwość `name` ma wartość `"herbata"` lub `"kawa"`. Problem w tym, że informacje o każdym z napojów składają się z kilku warunków. Zmodyfikuj poniższy kod, aby użyć pojedynczej instrukcji `if` zamiast trzech warunków `? :`.

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
        <dd>{name === 'herbata' ? '4000+ lat' : '1000+ lat'}</dd>
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

Kiedy już uporasz się z modyfikacją kodu i użyciem instrukcji `if`, pomyśl, czy można jeszcze bardziej uprościć ten kod?

<Solution>

Można to zrobić na wiele sposobów, oto jeden z nich:

<Sandpack>

```js
function Drink({ name }) {
  let part, caffeine, age;
  if (name === 'herbata') {
    part = 'liść';
    caffeine = '15–70 mg/filiżanka';
    age = '4000+ lat';
  } else if (name === 'kawa') {
    part = 'ziarno';
    caffeine = '80–185 mg/filiżanka';
    age = '1000+ lat';
  }
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Część rośliny</dt>
        <dd>{part}</dd>
        <dt>Zawartość kofeiny</dt>
        <dd>{caffeine}</dd>
        <dt>Wiek</dt>
        <dd>{age}</dd>
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
  tea: {
    part: 'liść',
    caffeine: '15–70 mg/filiżanka',
    age: '4000+ lat'
  },
  coffee: {
    part: 'ziarno',
    caffeine: '80–185 mg/filiżanka',
    age: '1000+ lat'
  }
};

function Drink({ name }) {
  const info = drinks[name];
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Część rośliny</dt>
        <dd>{info.part}</dd>
        <dt>Zawartość kofeiny</dt>
        <dd>{info.caffeine}</dd>
        <dt>Wiek</dt>
        <dd>{info.age}</dd>
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

