---
title: Zachowywanie i resetowanie stanu
---

<Intro>

Stan jest izolowany między komponentami. React śledzi, który stan należy do którego komponentu na podstawie ich miejsca w drzewie interfejsu użytkownika. Możesz kontrolować, kiedy zachować stan, a kiedy go zresetować między renderowaniami.

</Intro>

<YouWillLearn>

* Kiedy React decyduje, aby zachować lub zresetować stan
* Jak zmusić React do zresetowania stanu komponentu
* Jak klucze i typy wpływają na to, czy stan jest zachowany

</YouWillLearn>

## Stan jest powiązany z pozycją w drzewie renderowania {/*state-is-tied-to-a-position-in-the-tree*/}

React buduje [drzewa renderowania](learn/understanding-your-ui-as-a-tree#the-render-tree) dla struktury komponentów w twoim interfejsie użytkownika.

Kiedy dodajesz stan do komponentu, możesz myśleć, że stan "żyje" wewnątrz komponentu. Jednak w rzeczywistości jest on przechowywany wewnątrz Reacta. Kojarzy on każdą część stanu, którą przechowuje, z odpowiednim komponentem na podstawie jego miejsca w drzewie renderowania.

W poniższym przykładzie, jest tylko jeden tag `<Counter />` w składni JSX, ale jest renderowany na dwóch różnych pozycjach:

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  const counter = <Counter />;
  return (
    <div>
      {counter}
      {counter}
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Dodaj jeden
      </button>
    </div>
  );
}
```

```css
label {
  display: block;
  clear: both;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

Oto jak te komponenty wyglądają jako drzewo:

<DiagramGroup>

<Diagram name="preserving_state_tree" height={248} width={395} alt="Diagram drzewa komponentów Reacta. Węzeł główny jest oznaczony jako 'div' i ma dwóch potomków. Każdy z nich jest oznaczony jako 'Counter' i oba zawierają chmurkę stanu oznaczoną 'count' z wartością 0.">

Drzewo Reacta

</Diagram>

</DiagramGroup>

**To są dwa oddzielne liczniki, ponieważ każdy jest renderowany na swojej własnej pozycji w drzewie.** Zazwyczaj nie musisz myśleć o tych pozycjach, aby korzystać z Reacta, ale zrozumienie zasady działania może okazać się przydatne.

W Reakcie, każdy komponent na ekranie ma całkowicie izolowany stan. Na przykład, jeśli renderujesz dwa komponenty `Counter` obok siebie, każdy z nich będzie miał swoje własne, niezależne stany `score` i `hover`.

Spróbuj klikać oba liczniki i zauważ, że nie wpływają one na siebie nawzajem:

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  return (
    <div>
      <Counter />
      <Counter />
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Dodaj jeden
      </button>
    </div>
  );
}
```

```css
.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

Jak widać, gdy jeden licznik jest aktualizowany, tylko stan dla tego komponentu jest aktualizowany:


<DiagramGroup>

<Diagram name="preserving_state_increment" height={248} width={441} alt="Diagram drzewa komponentów Reacta. Węzeł główny jest oznaczony jako 'div' i ma dwóch potomków. Lewa gałąź jest oznaczona jako 'Counter' i zawiera chmurkę stanu oznaczoną 'count' z wartością 0. Prawa gałąź jest oznaczona jako 'Counter' i zawiera chmurkę stanu oznaczoną 'count' z wartością 1. Chmurka stanu prawej gałęzi jest podświetlona na żółto, aby wskazać, że jej wartość została zaktualizowana.">

Aktualizacja stanu

</Diagram>

</DiagramGroup>


React będzie przechowywać stan tak długo, jak długo renderujesz ten sam komponent na tej samej pozycji w drzewie. Aby to zaobserwować, zwiększ oba liczniki, a następnie usuń drugi komponent, odznaczając pole wyboru "Renderuj drugi licznik", a potem dodaj go z powrotem, zaznaczając je ponownie:

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  const [showB, setShowB] = useState(true);
  return (
    <div>
      <Counter />
      {showB && <Counter />} 
      <label>
        <input
          type="checkbox"
          checked={showB}
          onChange={e => {
            setShowB(e.target.checked)
          }}
        />
        Renderuj drugi licznik
      </label>
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Dodaj jeden
      </button>
    </div>
  );
}
```

```css
label {
  display: block;
  clear: both;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

Zauważ, że w momencie, gdy przestajesz renderować drugi licznik, jego stan znika całkowicie. Dzieje się tak, ponieważ kiedy React usuwa komponent, niszczy też jego stan.

<DiagramGroup>

<Diagram name="preserving_state_remove_component" height={253} width={422} alt="Diagram drzewa komponentów Reacta. Węzeł główny jest oznaczony jako 'div' i ma dwóch potomków. Lewa gałąź jest oznaczona jako 'Counter' i zawiera chmurkę stanu oznaczoną 'count' z wartością 0. Prawa gałąź jest nieobecna, a na jej miejscu znajduje się żółty obrazek 'puf', podkreślający usunięcie komponentu z drzewa.">

Usuwanie komponentu

</Diagram>

</DiagramGroup>

Kiedy zaznaczasz pole wyboru "Renderuj drugi licznik", drugi komponent `Counter` i jego stan są inicjalizowane od nowa (`score = 0`) i dodawane do drzewa DOM.

<DiagramGroup>

<Diagram name="preserving_state_add_component" height={258} width={500} alt="Diagram drzewa komponentów Reacta. Węzeł główny jest oznaczony jako 'div' i ma dwóch potomków. Lewa gałąź jest oznaczona jako 'Counter' i zawiera chmurkę stanu oznaczoną 'count' z wartością 0. Prawa gałąź jest oznaczona jako 'Counter' i zawiera chmurkę stanu oznaczoną 'count' z wartością 0. Cała prawa gałąź jest podświetlona na żółto, wskazując, że została właśnie dodana do drzewa.">

Dodawanie komponentu

</Diagram>

</DiagramGroup>

**React zachowuje stan komponentu tak długo, jak jest on renderowany na swojej pozycji w drzewie UI.** Jeśli zostanie on usunięty lub na jego miejsce zostanie wyrenderowany inny komponent, React odrzuci jego stan.

## Ten sam komponent na tej samej pozycji zachowuje stan {/*same-component-at-the-same-position-preserves-state*/}

W tym przykładzie znajdują się dwa różne tagi `<Counter />`:

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <Counter isFancy={true} /> 
      ) : (
        <Counter isFancy={false} /> 
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        Użyj wyszukanego stylu
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Dodaj jeden
      </button>
    </div>
  );
}
```

```css
label {
  display: block;
  clear: both;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.fancy {
  border: 5px solid gold;
  color: #ff6767;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

Gdy zaznaczysz lub odznaczysz pole wyboru, stan licznika nie jest resetowany. Niezależnie od tego, czy `isFancy` jest ustawione na `true`, czy `false`, komponent `<Counter />` jest zawsze pierwszym potomkiem elementu `div` zwracanego z głównego komponentu `App`

<DiagramGroup>

<Diagram name="preserving_state_same_component" height={461} width={600} alt="Diagram z dwoma sekcjami oddzielonymi strzałką przechodzącą między nimi. Każda sekcja zawiera układ komponentów z rodzicem oznaczonym jako 'App', zawierającym chmurkę ze stanem o etykiecie isFancy. Ten komponent ma jednego potomka oznaczonego jako 'div', który prowadzi do chmurki z właściwością isFancy (podświetloną na fioletowo) przekazywaną do jedynego potomka. Ostatni potomek jest oznaczony jako 'Counter' i zawiera chmurkę ze stanem o etykiecie 'count' i wartości 3 w obu diagramach. W lewej sekcji diagramu nic nie jest podświetlone, a wartość stanu isFancy rodzica wynosi false. W prawej sekcji diagramu wartość stanu isFancy rodzica zmieniła się na true i jest podświetlona na żółto, podobnie jak chmurka właściwości poniżej, której wartość isFancy również zmieniła się na true.">

Aktualizacja stanu `App` nie resetuje `Counter`, ponieważ `Counter` pozostaje na tej samej pozycji

</Diagram>

</DiagramGroup>


To ten sam komponent na tej samej pozycji, więc z perspektywy Reacta to jest ten sam licznik.

<Pitfall>

Pamiętaj, że to pozycja w drzewie UI — a nie w kodzie JSX — ma znaczenie dla Reacta! Ten komponent ma dwa wyrażenia `return` z różnymi tagami `<Counter />` wewnątrz i na zewnątrz instrukcji if:

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  if (isFancy) {
    return (
      <div>
        <Counter isFancy={true} />
        <label>
          <input
            type="checkbox"
            checked={isFancy}
            onChange={e => {
              setIsFancy(e.target.checked)
            }}
          />
          Użyj wyszukanego stylu
        </label>
      </div>
    );
  }
  return (
    <div>
      <Counter isFancy={false} />
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        Użyj wyszukanego stylu
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Dodaj jeden
      </button>
    </div>
  );
}
```

```css
label {
  display: block;
  clear: both;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.fancy {
  border: 5px solid gold;
  color: #ff6767;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

Możesz oczekiwać, że stan zostanie zresetowany, gdy zaznaczysz pole wyboru, ale tak się nie stanie! Dzieje się tak, ponieważ **oba tagi `<Counter />` są renderowane na tej samej pozycji.** React nie wie, gdzie umieszczasz warunki w swojej funkcji. Wszystko, co „widzi”, to drzewo, które zwracasz.

W obu przypadkach komponent `App` zwraca element `<div>` z komponentem `<Counter />` jako pierwszym potomkiem. Dla Reacta te dwa liczniki mają ten sam „adres”: pierwszy potomek pierwszego potomka głównego węzła. W taki sposób React łączy je między poprzednimi a kolejnymi renderowaniami, niezależnie od tego, jaką strukturę ma twoja logika.

</Pitfall>

## Różne komponenty na tej samej pozycji resetują stan {/*different-components-at-the-same-position-reset-state*/}

W tym przykładzie zaznaczenie pola wyboru zastąpi komponent `<Counter>` elementem `<p>`:

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <div>
      {isPaused ? (
        <p>Do zobaczenia później!</p> 
      ) : (
        <Counter /> 
      )}
      <label>
        <input
          type="checkbox"
          checked={isPaused}
          onChange={e => {
            setIsPaused(e.target.checked)
          }}
        />
        Zrób przerwę
      </label>
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Dodaj jeden
      </button>
    </div>
  );
}
```

```css
label {
  display: block;
  clear: both;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

Tutaj przełączasz się między _różnymi_ typami komponentów na tej samej pozycji. Początkowo, pierwszy potomek `<div>` zawierał komponent `Counter`. Jednak kiedy zamieniono go na `p`, React usunął komponent `Counter` z drzewa UI i zniszczył jego stan.

<DiagramGroup>

<Diagram name="preserving_state_diff_pt1" height={290} width={753} alt="Diagram z trzema sekcjami, z przejściami między sekcjami za pomocą strzałki. Pierwsza sekcja zawiera komponent Reacta o nazwie 'div' z jednym potomkiem oznaczonym jako 'Counter', który zawiera chmurkę stanu oznaczoną jako 'count' z wartością 3. Środkowa sekcja ma ten sam komponent nadrzędny 'div', ale komponent potomny został teraz usunięty, co zostało zaznaczone żółtym obrazkiem 'puf'. Trzecia sekcja ma znowu ten sam komponent nadrzędny 'div', teraz z nowym potomkiem oznaczonym jako 'p', wyróżnionym na żółto.">

Gdy komponent `Counter` zmienia się na element `p`, `Counter` zostaje usunięty, a `p` zostaje dodany.

</Diagram>

</DiagramGroup>

<DiagramGroup>

<Diagram name="preserving_state_diff_pt2" height={290} width={753} alt="Diagram z trzema sekcjami, z strzałkami przechodzącymi między sekcjami. Pierwsza sekcja zawiera komponent React o nazwie `p`. Środkowa sekcja ma ten sam komponent `div`, ale komponent dziecka został teraz usunięty, co jest wskazane przez żółty obrazek z napisem 'puf'. Trzecia sekcja znowu zawiera ten sam komponent `div`, ale teraz z nowym potomkiem oznaczonym jako `Counter`, które zawiera chmurkę stanu o nazwie `count` z wartością 0, wyróżniony na żółto.">

Kiedy przełączasz z powrotem, `p` jest usuwany, a `Counter` jest dodawany

</Diagram>

</DiagramGroup>

Również **renderowanie innego komponentu na tej samej pozycji resetuje stan całego jego poddrzewa.** Aby zobaczyć, jak to działa, zwiększ licznik, a następnie zaznacz pole wyboru:

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <div>
          <Counter isFancy={true} /> 
        </div>
      ) : (
        <section>
          <Counter isFancy={false} />
        </section>
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        Użyj wyszukanego stylu
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Dodaj jeden
      </button>
    </div>
  );
}
```

```css
label {
  display: block;
  clear: both;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.fancy {
  border: 5px solid gold;
  color: #ff6767;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

Stan licznika zostaje zresetowany, gdy klikniesz pole wyboru. Chociaż renderujesz komponent `Counter`, pierwszy potomek elementu `div` zmienia się z `div` na `section`. Kiedy potomek `div` został usunięty z drzewa DOM, całe drzewo poniżej niego (w tym komponent `Counter` i jego stan) zostało również zniszczone.

<DiagramGroup>

<Diagram name="preserving_state_diff_same_pt1" height={350} width={794} alt="Diagram z trzema sekcjami, pomiędzy którymi znajduje się strzałka wskazująca przejście. Pierwsza sekcja zawiera komponent reactowy o nazwie 'div' z jednym potomkiem o nazwie 'section', który ma jednego potomka o nazwie 'Counter' z chmurką stanu oznaczoną jako 'count' z wartością 3. Środkowa sekcja ma tego samego rodzica 'div', ale komponenty potomne zostały usunięte, co wskazuje żółty obrazek 'puf'. Trzecia sekcja ponownie ma tego samego rodzica 'div', teraz z nowym potomkiem o nazwie 'div', podświetlonym na żółto, również z nowym potomkiem o nazwie 'Counter' z chmurką stanu oznaczoną jako 'count' z wartością 0, wszystko podświetlone na żółto.">

Gdy element `section` zmienia się na `div`, `section` zostaje usunięty, a nowy `div` zostaje dodany.

</Diagram>

</DiagramGroup>

<DiagramGroup>

<Diagram name="preserving_state_diff_same_pt2" height={350} width={794} alt="Diagram z trzema sekcjami, pomiędzy którymi znajduje się strzałka wskazująca przejście. Pierwsza sekcja zawiera komponent reactowy o nazwie 'div' z jednym potomkiem o nazwie 'div', który ma jednego potomka o nazwie 'Counter' z chmurką stanu oznaczoną jako 'count' z wartością 0. Środkowa sekcja ma tego samego rodzica 'div', ale komponenty potomne zostały usunięte, co wskazuje żółty obrazek 'puf'. Trzecia sekcja ponownie ma tego samego rodzica 'div', teraz z nowym potomkiem o nazwie 'section', podświetlonym na żółto, również z nowym potomkiem o nazwie 'Counter' z chmurką stanu oznaczoną jako 'count' z wartością 0, wszystko podświetlone na żółto.">

Gdy następuje odwrotna sytuacja, `div` zostaje usunięty, a nowy element `section` zostaje dodany.

</Diagram>

</DiagramGroup>

Ogólna zasada jest taka, że **jeśli chcesz zachować stan pomiędzy renderowaniami, struktura drzewa musi "pasować"** między jednym a drugim renderowaniem. Jeśli struktura jest inna, stan zostaje zniszczony, ponieważ React usuwa stan, gdy usuwa komponent z drzewa.

<Pitfall>

Oto dlaczego nie powinno się zagnieżdżać definicji funkcji komponentów.

Tutaj funkcja komponentu `MyTextField` jest zdefiniowana *wewnątrz* komponentu `MyComponent`:

<Sandpack>

```js
import { useState } from 'react';

export default function MyComponent() {
  const [counter, setCounter] = useState(0);

  function MyTextField() {
    const [text, setText] = useState('');

    return (
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
    );
  }

  return (
    <>
      <MyTextField />
      <button onClick={() => {
        setCounter(counter + 1)
      }}>Naciśnięto {counter} razy</button>
    </>
  );
}
```

</Sandpack>


Za każdym razem, gdy klikasz przycisk, stan pola wejściowego znika! Dzieje się tak, ponieważ za każdym razem, gdy renderowany jest komponent `MyComponent`, tworzona jest *inna* funkcja `MyTextField`. Renderujesz *inny* komponent na tej samej pozycji, więc React resetuje cały stan poniżej. Prowadzi to do błędów i problemów z wydajnością. Aby uniknąć tego problemu, **zawsze deklaruj funkcje komponentów na najwyższym poziomie i nie zagnieżdżaj ich definicji.**

</Pitfall>

## Resetowanie stanu na tej samej pozycji {/*resetting-state-at-the-same-position*/}

Domyślnie React zachowuje stan komponentu, dopóki pozostaje on na tej samej pozycji. Zazwyczaj jest to dokładnie to, czego oczekujesz, więc to domyślne zachowanie ma sens. Czasami jednak możesz chcieć zresetować stan komponentu. Rozważ poniższą aplikację, która pozwala dwóm graczom śledzić swoje wyniki podczas każdej tury:

<Sandpack>

```js
import { useState } from 'react';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter person="Taylor" />
      ) : (
        <Counter person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Następny gracz!
      </button>
    </div>
  );
}

function Counter({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>Wynik gracza {person}: {score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Dodaj jeden
      </button>
    </div>
  );
}
```

```css
h1 {
  font-size: 18px;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

Obecnie, gdy zmieniasz gracza, wynik jest zachowany. Dwa komponenty licznika `Counter` pojawiają się na tej samej pozycji, więc React widzi je jako *ten sam* komponent `Counter`, w którym zmieniła się właściwość `person`.

Ale w tym przypadku, koncepcyjnie powinny to być dwa osobne liczniki. Mogą pojawiać się w tym samym miejscu w interfejsie użytkownika, ale jeden z nich to licznik dla Taylora, a drugi dla Sarah.

Istnieją dwa sposoby na zresetowanie stanu podczas przełączania się między licznikami:

1. Renderowanie komponentów na różnych pozycjach
2. Nadanie każdemu komponentowi konkretnej tożsamości za pomocą klucza `key`


### Opcja 1: Renderowanie komponentu na różnych pozycjach {/*option-1-rendering-a-component-in-different-positions*/}

Jeśli chcesz, aby te dwa komponenty `Counter` były niezależne, możesz wyrenderować je na dwóch różnych pozycjach:

<Sandpack>

```js
import { useState } from 'react';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA &&
        <Counter person="Taylor" />
      }
      {!isPlayerA &&
        <Counter person="Sarah" />
      }
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Następny gracz!
      </button>
    </div>
  );
}

function Counter({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>Wynik gracza {person}: {score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Dodaj jeden
      </button>
    </div>
  );
}
```

```css
h1 {
  font-size: 18px;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

* Początkowo, `isPlayerA` ma wartość `true`. W związku z tym pierwsza pozycja zawiera komponent `Counter`, a druga jest pusta.
* Kiedy klikniesz przycisk "Następny gracz", pierwsza pozycja się opróżnia, a w drugiej pojawia się komponent `Counter`.

<DiagramGroup>

<Diagram name="preserving_state_diff_position_p1" height={375} width={504} alt="Diagram przedstawiający drzewo komponentów React. Rodzic jest oznaczony jako 'Scoreboard' z chmurką stanu o nazwie isPlayerA i wartością 'true'. Jedyny potomek, umieszczony po lewej stronie, jest oznaczony jako Counter z chmurką stanu o nazwie 'count' i wartością 0. Cały lewy potomek jest podświetlony na żółto, co wskazuje, że został dodany.">

Stan początkowy

</Diagram>

<Diagram name="preserving_state_diff_position_p2" height={375} width={504} alt="Diagram przedstawiający drzewo komponentów React. Rodzic jest oznaczony jako 'Scoreboard' z chmurką stanu o nazwie isPlayerA i wartością 'false'. Chmurka stanu jest podświetlona na żółto, co wskazuje, że jej wartość się zmieniła. Lewy potomek został zastąpiony żółtym obrazkiem 'puf', co oznacza, że został usunięty, a po prawej stronie pojawił się nowy potomek, podświetlony na żółto, co oznacza, że został dodany. Nowy potomek jest oznaczony jako 'Counter' i zawiera chmurkę stanu o nazwie 'count' i wartości 0.">

Kliknięcie "następny"

</Diagram>

<Diagram name="preserving_state_diff_position_p3" height={375} width={504} alt="Diagram przedstawiający drzewo komponentów React. Rodzic jest oznaczony jako 'Scoreboard' z chmurką stanu o nazwie isPlayerA i wartości 'true'. Chmurka stanu jest podświetlona na żółto, co wskazuje, że jej wartość się zmieniła. Po lewej stronie pojawił się nowy potomek, podświetlony na żółto, co oznacza, że został dodany. Nowy potomek jest oznaczony jako 'Counter' i zawiera chmurkę stanu o nazwie 'count' i wartości 0. Prawy potomek został zastąpiony żółtym obrazkiem 'puf', co oznacza, że został usunięty.">

Kliknięcie "następny" ponownie

</Diagram>

</DiagramGroup>

Stan każdego komponentu `Counter` jest niszczony za każdym razem, gdy jest usuwany z drzewa DOM. To dlatego stany te resetują się za każdym razem, gdy klikniesz przycisk.

To rozwiązanie jest wygodne, gdy masz tylko kilka niezależnych komponentów renderowanych w tym samym miejscu. W tym przykładzie są tylko dwa, więc nie ma problemu z renderowaniem obu osobno w składni JSX.

### Opcja 2: Resetowanie stanu za pomocą klucza (ang. _key_) {/*option-2-resetting-state-with-a-key*/}

Istnieje także inny, bardziej ogólny sposób na zresetowanie stanu komponentu.

Przy [renderowaniu list](/learn/rendering-lists#keeping-list-items-in-order-with-key) można zauważyć użycie kluczy. Klucze te nie są tylko dla list! Możesz użyć kluczy, aby pomóc Reactowi rozróżnić dowolne komponenty. Domyślnie React używa kolejności w obrębie rodzica ("pierwszy licznik", "drugi licznik"), aby odróżnić komponenty. Jednak klucze pozwalają powiedzieć Reactowi, że to nie jest tylko *pierwszy* licznik czy *drugi* licznik, ale jakiś konkretny licznik - na przykład *licznik Taylora*. W ten sposób React będzie wiedział, że to licznik *Taylora*, niezależnie od tego, gdzie pojawi się on w drzewie!

W tym przykładzie dwa komponenty `<Counter />` nie dzielą stanu, mimo że pojawiają się w tym samym miejscu w składni JSX:

<Sandpack>

```js
import { useState } from 'react';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter key="Taylor" person="Taylor" />
      ) : (
        <Counter key="Sarah" person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Następny gracz!
      </button>
    </div>
  );
}

function Counter({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>Wynika gracza {person}: {score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Dodaj jeden
      </button>
    </div>
  );
}
```

```css
h1 {
  font-size: 18px;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

Przełączanie między graczami Taylor a Sarah nie zachowuje ich stanu. Dzieje się tak, ponieważ **przypisano im różne klucze `key`**:

```js
{isPlayerA ? (
  <Counter key="Taylor" person="Taylor" />
) : (
  <Counter key="Sarah" person="Sarah" />
)}
```

Określenie klucza `key` mówi Reactowi, aby użył jego samego jako części pozycji, zamiast polegać na kolejności w obrębie rodzica. Dlatego, chociaż renderujesz je w tym samym miejscu w składni JSX, React postrzega je jako dwa różne liczniki, więc nigdy nie będą one dzielić stanu. Za każdym razem, gdy licznik pojawia się na ekranie, jego stan jest tworzony. Za każdym razem, gdy jest usuwany, jego stan jest niszczony. Przełączanie między komponentami resetuje ich stan w kółko.

<Note>

Pamiętaj, że klucze nie są unikalne globalnie. Określają one pozycję tylko *w obrębie rodzica*.

</Note>

### Resetowanie formularza za pomocą klucza {/*resetting-a-form-with-a-key*/}

Resetowanie stanu za pomocą klucza jest szczególnie przydatne podczas pracy z formularzami.

W poniższej aplikacji czatu, komponent `<Chat>` zawiera stan dla pola tekstowego:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat contact={to} />
    </div>
  )
}

const contacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
```

```js src/ContactList.js
export default function ContactList({
  selectedContact,
  contacts,
  onSelect
}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact);
            }}>
              {contact.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js src/Chat.js
import { useState } from 'react';

export default function Chat({ contact }) {
  const [text, setText] = useState('');
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'Czat z ' + contact.name}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button>Wyślij do {contact.email}</button>
    </section>
  );
}
```

```css
.chat, .contact-list {
  float: left;
  margin-bottom: 20px;
}
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li button {
  width: 100px;
  padding: 10px;
  margin-right: 10px;
}
textarea {
  height: 150px;
}
```

</Sandpack>

Spróbuj wpisać coś w polu tekstowym, a następnie wybierz innego odbiorcę, klikając „Alice” lub „Bob”. Zauważ, że stan pola tekstowego jest zachowywany, ponieważ komponent `<Chat>` jest renderowany na tej samej pozycji w drzewie komponentów.

**W wielu aplikacjach może to być pożądane zachowanie, ale nie w aplikacji czatu!** Nie chcesz, aby użytkownik wysłał wiadomość do niewłaściwej osoby z powodu przypadkowego kliknięcia. Aby to naprawić, dodaj klucz `key`:

```js
<Chat key={to.id} contact={to} />
```

To rozwiązanie zapewnia, że kiedy wybierzesz innego odbiorcę, komponent `Chat` zostanie stworzony od nowa, łącznie z całym stanem w drzewie poniżej niego. React również ponownie utworzy elementy drzewa DOM zamiast ponownie ich użyć.

Teraz zmiana odbiorcy zawsze wyczyści pole tekstowe:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat key={to.id} contact={to} />
    </div>
  )
}

const contacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
```

```js src/ContactList.js
export default function ContactList({
  selectedContact,
  contacts,
  onSelect
}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact);
            }}>
              {contact.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js src/Chat.js
import { useState } from 'react';

export default function Chat({ contact }) {
  const [text, setText] = useState('');
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'Czatuj z ' + contact.name}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button>Wyślij do {contact.email}</button>
    </section>
  );
}
```

```css
.chat, .contact-list {
  float: left;
  margin-bottom: 20px;
}
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li button {
  width: 100px;
  padding: 10px;
  margin-right: 10px;
}
textarea {
  height: 150px;
}
```

</Sandpack>

<DeepDive>

#### Zachowywanie stanu dla usuniętych komponentów {/*preserving-state-for-removed-components*/}

W prawdziwej aplikacji czatu, prawdopodobnie chcesz odzyskać stan wprowadzonego tekstu, gdy użytkownik ponownie wybierze poprzedniego odbiorcę. Istnieje kilka sposobów na to, aby stan komponentu, który nie jest już widoczny, pozostał zachowany:

- Możesz renderować _wszystkie_ czaty zamiast tylko aktualnie wybranego i ukryć pozostałe za pomocą stylów CSS. Czat nie zostanie usunięty z drzewa, więc jego lokalny stan będzie zachowany. To rozwiązanie działa świetnie dla prostych interfejsów, ale może stać się powolne, jeśli ukryte drzewa będą duże i będą zawierały dużo węzłów drzewa DOM.
- Możesz [przenieść stan wyżej](/learn/sharing-state-between-components) i przechowywać wiadomości oczekujące dla każdego odbiorcy w komponencie nadrzędnym. Dzięki temu, nawet gdy komponenty podrzędne zostaną usunięte, nie ma to znaczenia, ponieważ to rodzic przechowuje istotne informacje. Jest to najczęściej stosowane rozwiązanie.
- Możesz również użyć innego sposobu zamiast stanu Reacta. Na przykład, być może chcesz, aby wersja robocza wiadomości przetrwała nawet w przypadku omyłkowego zamknięcia strony przez użytkownika. Aby to zaimplementować, komponent `Chat` mógłby inicjalizować swój stan, odczytując go z [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), a także zapisywać tam wersje robocze wiadomości.

Bez względu na to, którą strategię wybierzesz, czat _z Alicją_ jest koncepcyjnie inny niż czat _z Bobem_, więc sensowne jest przypisanie klucza `key` do drzewa `<Chat>` na podstawie aktualnego odbiorcy.

</DeepDive>

<Recap>

- React utrzymuje stan tak długo, jak ten sam komponent jest renderowany w tym samym miejscu.
- Stan nie jest przechowywany w znacznikach JSX. Jest on powiązany z pozycją drzewa, w której umieszczasz ten kod JSX.
- Możesz wymusić zresetowanie stanu poddrzewa, nadając mu inny klucz `key`.
- Nie zagnieżdżaj definicji komponentów, ponieważ przypadkowo zresetujesz stan.

</Recap>



<Challenges>

#### Napraw znikający tekst w polu input {/*fix-disappearing-input-text*/}

W poniższym przykładzie po naciśnięciu przycisku wyświetlana jest wiadomość. Jednak przypadkowe naciśnięcie przycisku resetuje również pole wprowadzania tekstu. Dlaczego tak się dzieje? Napraw to, aby naciśnięcie przycisku nie resetowało tekstu w polu wprowadzania.

<Sandpack>

```js src/App.js
import { useState } from 'react';

export default function App() {
  const [showHint, setShowHint] = useState(false);
  if (showHint) {
    return (
      <div>
        <p><i>Podpowiedź: Twoje ulubione miasto?</i></p>
        <Form />
        <button onClick={() => {
          setShowHint(false);
        }}>Ukryj podpowiedź</button>
      </div>
    );
  }
  return (
    <div>
      <Form />
      <button onClick={() => {
        setShowHint(true);
      }}>Pokaż podpowiedź</button>
    </div>
  );
}

function Form() {
  const [text, setText] = useState('');
  return (
    <textarea
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}
```

```css
textarea { display: block; margin: 10px 0; }
```

</Sandpack>

<Solution>

Problem polega na tym, że komponent `Form` jest renderowany na różnych pozycjach. W gałęzi `if`, komponent ten jest drugim dzieckiem elementu `<div>`, natomiast w gałęzi `else` jest pierwszym dzieckiem. W związku z tym typ komponentu zmienia się na każdej pozycji. Na pierwszej pozycji występuje naprzemiennie `p` i `Form`, podczas gdy na drugiej pozycji `Form` i `button`. React resetuje stan za każdym razem, gdy typ komponentu zmienia się.

Najprostszym rozwiązaniem jest ujednolicenie gałęzi tak, aby `Form` zawsze renderował się w tej samej pozycji:

<Sandpack>

```js src/App.js
import { useState } from 'react';

export default function App() {
  const [showHint, setShowHint] = useState(false);
  return (
    <div>
      {showHint &&
        <p><i>Podpowiedź: Twoje ulubione miasto?</i></p>
      }
      <Form />
      {showHint ? (
        <button onClick={() => {
          setShowHint(false);
        }}>Ukryj podpowiedź</button>
      ) : (
        <button onClick={() => {
          setShowHint(true);
        }}>Pokaż podpowiedź</button>
      )}
    </div>
  );
}

function Form() {
  const [text, setText] = useState('');
  return (
    <textarea
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}
```

```css
textarea { display: block; margin: 10px 0; }
```

</Sandpack>


W praktyce, możesz także dodać `null` przed `<Form />` w gałęzi `else`, aby dopasować strukturę w gałęzi `if`:

<Sandpack>

```js src/App.js
import { useState } from 'react';

export default function App() {
  const [showHint, setShowHint] = useState(false);
  if (showHint) {
    return (
      <div>
        <p><i>Podpowiedź: Twoje ulubione miasto?</i></p>
        <Form />
        <button onClick={() => {
          setShowHint(false);
        }}>Ukryj podpowiedź</button>
      </div>
    );
  }
  return (
    <div>
      {null}
      <Form />
      <button onClick={() => {
        setShowHint(true);
      }}>Pokaż podpowiedź</button>
    </div>
  );
}

function Form() {
  const [text, setText] = useState('');
  return (
    <textarea
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}
```

```css
textarea { display: block; margin: 10px 0; }
```

</Sandpack>

W ten sposób komponent `Form` jest zawsze drugim dzieckiem, więc pozostaje w tej samej pozycji i zachowuje swój stan. Ale to podejście jest znacznie mniej oczywiste i wprowadza ryzyko, że ktoś inny usunie stąd `null`.

</Solution>

#### Zamień dwa pola formularza {/*swap-two-form-fields*/}

Ten formularz pozwala wpisać imię i nazwisko. Ma także pole wyboru kontrolujące, które pole pojawia się jako pierwsze. Kiedy zaznaczysz to pole wyboru, pole „Nazwisko” pojawi się przed polem „Imię”.

To rozwiązanie prawie działa, ale jest w nim błąd. Jeśli wypełnisz pole „Imię” i zaznaczysz pole wyboru, tekst pozostanie w pierwszym polu (które teraz jest występuje jako „Nazwisko”). Napraw to tak, aby tekst z pól również zmieniał się miejscami, gdy zmieniasz kolejność.

<Hint>

Wydaje się, że dla tych pól sama ich pozycja względem rodzica nie wystarcza. Czy istnieje jakiś sposób, aby powiedzieć Reactowi, jak ma dopasować stan między renderowaniami?

</Hint>

<Sandpack>

```js src/App.js
import { useState } from 'react';

export default function App() {
  const [reverse, setReverse] = useState(false);
  let checkbox = (
    <label>
      <input
        type="checkbox"
        checked={reverse}
        onChange={e => setReverse(e.target.checked)}
      />
      Odwróć kolejność
    </label>
  );
  if (reverse) {
    return (
      <>
        <Field label="Nazwisko" /> 
        <Field label="Imię" />
        {checkbox}
      </>
    );
  } else {
    return (
      <>
        <Field label="Imię" /> 
        <Field label="Nazwisko" />
        {checkbox}
      </>
    );    
  }
}

function Field({ label }) {
  const [text, setText] = useState('');
  return (
    <label>
      {label}:{' '}
      <input
        type="text"
        value={text}
        placeholder={label}
        onChange={e => setText(e.target.value)}
      />
    </label>
  );
}
```

```css
label { display: block; margin: 10px 0; }
```

</Sandpack>

<Solution>

Nadaj klucz `key` obu komponentom `<Field>` w obu gałęziach `if` i `else`. Dzięki temu React będzie wiedział, jak "dopasować" odpowiedni stan dla każdego komponentu `<Field>`, nawet jeśli ich kolejność w rodzicu zmieni się:

<Sandpack>

```js src/App.js
import { useState } from 'react';

export default function App() {
  const [reverse, setReverse] = useState(false);
  let checkbox = (
    <label>
      <input
        type="checkbox"
        checked={reverse}
        onChange={e => setReverse(e.target.checked)}
      />
      Odwróć kolejność
    </label>
  );
  if (reverse) {
    return (
      <>
        <Field key="lastName" label="Nazwisko" /> 
        <Field key="firstName" label="Imię" />
        {checkbox}
      </>
    );
  } else {
    return (
      <>
        <Field key="firstName" label="Imię" /> 
        <Field key="lastName" label="Nazwisko" />
        {checkbox}
      </>
    );    
  }
}

function Field({ label }) {
  const [text, setText] = useState('');
  return (
    <label>
      {label}:{' '}
      <input
        type="text"
        value={text}
        placeholder={label}
        onChange={e => setText(e.target.value)}
      />
    </label>
  );
}
```

```css
label { display: block; margin: 10px 0; }
```

</Sandpack>

</Solution>

#### Zresetowanie formularza szczegółów {/*reset-a-detail-form*/}

Oto edytowalna lista kontaktów. Możesz edytować szczegóły wybranego kontaktu, a następnie nacisnąć "Zapisz", aby zaktualizować lub "Resetuj", aby cofnąć swoje zmiany.

Gdy wybierzesz inny kontakt (na przykład Alice), stan się zaktualizuje, ale formularz nadal będzie pokazywał szczegóły poprzedniego kontaktu. Napraw to tak, aby formularz został zresetowany, gdy zmienia się wybrany kontakt.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ContactList from './ContactList.js';
import EditContact from './EditContact.js';

export default function ContactManager() {
  const [
    contacts,
    setContacts
  ] = useState(initialContacts);
  const [
    selectedId,
    setSelectedId
  ] = useState(0);
  const selectedContact = contacts.find(c =>
    c.id === selectedId
  );

  function handleSave(updatedData) {
    const nextContacts = contacts.map(c => {
      if (c.id === updatedData.id) {
        return updatedData;
      } else {
        return c;
      }
    });
    setContacts(nextContacts);
  }

  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={selectedId}
        onSelect={id => setSelectedId(id)}
      />
      <hr />
      <EditContact
        initialData={selectedContact}
        onSave={handleSave}
      />
    </div>
  )
}

const initialContacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
```

```js src/ContactList.js
export default function ContactList({
  contacts,
  selectedId,
  onSelect
}) {
  return (
    <section>
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact.id);
            }}>
              {contact.id === selectedId ?
                <b>{contact.name}</b> :
                contact.name
              }
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js src/EditContact.js
import { useState } from 'react';

export default function EditContact({ initialData, onSave }) {
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  return (
    <section>
      <label>
        Imię:{' '}
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        Email:{' '}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <button onClick={() => {
        const updatedData = {
          id: initialData.id,
          name: name,
          email: email
        };
        onSave(updatedData);
      }}>
        Zapisz
      </button>
      <button onClick={() => {
        setName(initialData.name);
        setEmail(initialData.email);
      }}>
        Resetuj
      </button>
    </section>
  );
}
```

```css
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li { display: inline-block; }
li button {
  padding: 10px;
}
label {
  display: block;
  margin: 10px 0;
}
button {
  margin-right: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

<Solution>

Nadaj klucz `key={selectedId}` komponentowi `EditContact`. W ten sposób, przełączanie się między różnymi kontaktami spowoduje zresetowanie formularza.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ContactList from './ContactList.js';
import EditContact from './EditContact.js';

export default function ContactManager() {
  const [
    contacts,
    setContacts
  ] = useState(initialContacts);
  const [
    selectedId,
    setSelectedId
  ] = useState(0);
  const selectedContact = contacts.find(c =>
    c.id === selectedId
  );

  function handleSave(updatedData) {
    const nextContacts = contacts.map(c => {
      if (c.id === updatedData.id) {
        return updatedData;
      } else {
        return c;
      }
    });
    setContacts(nextContacts);
  }

  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={selectedId}
        onSelect={id => setSelectedId(id)}
      />
      <hr />
      <EditContact
        key={selectedId}
        initialData={selectedContact}
        onSave={handleSave}
      />
    </div>
  )
}

const initialContacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
```

```js src/ContactList.js
export default function ContactList({
  contacts,
  selectedId,
  onSelect
}) {
  return (
    <section>
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact.id);
            }}>
              {contact.id === selectedId ?
                <b>{contact.name}</b> :
                contact.name
              }
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js src/EditContact.js
import { useState } from 'react';

export default function EditContact({ initialData, onSave }) {
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  return (
    <section>
      <label>
        Imię:{' '}
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        Email:{' '}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <button onClick={() => {
        const updatedData = {
          id: initialData.id,
          name: name,
          email: email
        };
        onSave(updatedData);
      }}>
        Zapisz
      </button>
      <button onClick={() => {
        setName(initialData.name);
        setEmail(initialData.email);
      }}>
        Resetuj
      </button>
    </section>
  );
}
```

```css
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li { display: inline-block; }
li button {
  padding: 10px;
}
label {
  display: block;
  margin: 10px 0;
}
button {
  margin-right: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

</Solution>

#### Wyczyść obraz podczas ładowania {/*clear-an-image-while-its-loading*/}

Kiedy naciśniesz "Dalej", przeglądarka zaczyna ładować kolejny obraz. Jednak ponieważ jest on wyświetlany w tym samym tagu `<img>`, domyślnie widać poprzedni obraz do czasu załadowania nowego. Może to być niepożądane zachowanie, jeśli ważne jest, aby tekst zawsze pasował do obrazu. Zmień to tak, aby w momencie naciśnięcia "Dalej" poprzedni obraz natychmiast znikał.

<Hint>

Czy istnieje sposób, aby dać znać Reactowi, żeby tworzył drzewo DOM od nowa zamiast wykorzystywać go ponownie?

</Hint>

<Sandpack>

```js
import { useState } from 'react';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const hasNext = index < images.length - 1;

  function handleClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  let image = images[index];
  return (
    <>
      <button onClick={handleClick}>
        Dalej
      </button>
      <h3>
        Obraz {index + 1} z {images.length}
      </h3>
      <img src={image.src} />
      <p>
        {image.place}
      </p>
    </>
  );
}

let images = [{
  place: 'Penang, Malezja',
  src: 'https://i.imgur.com/FJeJR8M.jpg'
}, {
  place: 'Lizbona, Portugalia',
  src: 'https://i.imgur.com/dB2LRbj.jpg'
}, {
  place: 'Bilbao, Hiszpania',
  src: 'https://i.imgur.com/z08o2TS.jpg'
}, {
  place: 'Valparaíso, Chile',
  src: 'https://i.imgur.com/Y3utgTi.jpg'
}, {
  place: 'Schwyz, Szwajcaria',
  src: 'https://i.imgur.com/JBbMpWY.jpg'
}, {
  place: 'Praga, Czechy',
  src: 'https://i.imgur.com/QwUKKmF.jpg'
}, {
  place: 'Lublana, Słowenia',
  src: 'https://i.imgur.com/3aIiwfm.jpg'
}];
```

```css
img { width: 150px; height: 150px; }
```

</Sandpack>

<Solution>

Możesz dodać klucz `key` do tagu `<img>`. Gdy ten klucz `key` się zmieni, React utworzy od nowa węzeł drzewa DOM dla `<img>`. Spowoduje to krótkie mignięcie podczas ładowania każdego obrazu, więc nie jest to coś, co warto robić dla każdego obrazku w aplikacji. Ma to jednak sens, jeśli chcesz mieć pewność, że obraz zawsze będzie zgodny z tekstem.

<Sandpack>

```js
import { useState } from 'react';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const hasNext = index < images.length - 1;

  function handleClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  let image = images[index];
  return (
    <>
      <button onClick={handleClick}>
        Dalej
      </button>
      <h3>
        Obraz {index + 1} z {images.length}
      </h3>
      <img key={image.src} src={image.src} />
      <p>
        {image.place}
      </p>
    </>
  );
}

let images = [{
  place: 'Penang, Malezja',
  src: 'https://i.imgur.com/FJeJR8M.jpg'
}, {
  place: 'Lizbona, Portugalia',
  src: 'https://i.imgur.com/dB2LRbj.jpg'
}, {
  place: 'Bilbao, Hiszpania',
  src: 'https://i.imgur.com/z08o2TS.jpg'
}, {
  place: 'Valparaíso, Chile',
  src: 'https://i.imgur.com/Y3utgTi.jpg'
}, {
  place: 'Schwyz, Szwajcaria',
  src: 'https://i.imgur.com/JBbMpWY.jpg'
}, {
  place: 'Praga, Czechy',
  src: 'https://i.imgur.com/QwUKKmF.jpg'
}, {
  place: 'Lublana, Słowenia',
  src: 'https://i.imgur.com/3aIiwfm.jpg'
}];
```

```css
img { width: 150px; height: 150px; }
```

</Sandpack>

</Solution>

#### Napraw błędne przypisanie stanu na liście {/*fix-misplaced-state-in-the-list*/}

W tej liście każdy komponent `Contact` ma stan, który określa, czy przycisk "Pokaż email" został dla niego naciśnięty. Naciśnij "Pokaż email" dla Alice, a następnie zaznacz pole wyboru "Wyświetl w odwrotnej kolejności". Zauważ, że to email _Taylora_ jest teraz rozwinięty, a nie email Alice, której kontakt został przeniesiony na dół i jest zwinięty.

Napraw to tak, aby stan rozwinięcia był powiązany z każdym kontaktem, niezależnie od wybranego porządku.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import Contact from './Contact.js';

export default function ContactList() {
  const [reverse, setReverse] = useState(false);

  const displayedContacts = [...contacts];
  if (reverse) {
    displayedContacts.reverse();
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          value={reverse}
          onChange={e => {
            setReverse(e.target.checked)
          }}
        />{' '}
        Wyświetl w odwrotnej kolejności
      </label>
      <ul>
        {displayedContacts.map((contact, i) =>
          <li key={i}>
            <Contact contact={contact} />
          </li>
        )}
      </ul>
    </>
  );
}

const contacts = [
  { id: 0, name: 'Alice', email: 'alice@mail.com' },
  { id: 1, name: 'Bob', email: 'bob@mail.com' },
  { id: 2, name: 'Taylor', email: 'taylor@mail.com' }
];
```

```js src/Contact.js
import { useState } from 'react';

export default function Contact({ contact }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <p><b>{contact.name}</b></p>
      {expanded &&
        <p><i>{contact.email}</i></p>
      }
      <button onClick={() => {
        setExpanded(!expanded);
      }}>
        {expanded ? 'Ukryj' : 'Pokaż'} email
      </button>
    </>
  );
}
```

```css
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  margin-bottom: 20px;
}
label {
  display: block;
  margin: 10px 0;
}
button {
  margin-right: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

<Solution>

Problem polega na tym, że w tym przykładzie użyto indeksu tablicy jako `key`:

```js
{displayedContacts.map((contact, i) =>
  <li key={i}>
```

Jednak tu potrzebujesz, aby stan był powiązany z _każdym konkretnym kontaktem_.

Użycie identyfikatora kontaktu (`contact.id`) jako `key` rozwiązuje ten problem:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import Contact from './Contact.js';

export default function ContactList() {
  const [reverse, setReverse] = useState(false);

  const displayedContacts = [...contacts];
  if (reverse) {
    displayedContacts.reverse();
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          value={reverse}
          onChange={e => {
            setReverse(e.target.checked)
          }}
        />{' '}
        Wyświetl w odwrotnej kolejności
      </label>
      <ul>
        {displayedContacts.map(contact =>
          <li key={contact.id}>
            <Contact contact={contact} />
          </li>
        )}
      </ul>
    </>
  );
}

const contacts = [
  { id: 0, name: 'Alice', email: 'alice@mail.com' },
  { id: 1, name: 'Bob', email: 'bob@mail.com' },
  { id: 2, name: 'Taylor', email: 'taylor@mail.com' }
];
```

```js src/Contact.js
import { useState } from 'react';

export default function Contact({ contact }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <p><b>{contact.name}</b></p>
      {expanded &&
        <p><i>{contact.email}</i></p>
      }
      <button onClick={() => {
        setExpanded(!expanded);
      }}>
        {expanded ? 'Ukryj' : 'Pokaż'} email
      </button>
    </>
  );
}
```

```css
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  margin-bottom: 20px;
}
label {
  display: block;
  margin: 10px 0;
}
button {
  margin-right: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

Teraz stan jest powiązany z pozycją w drzewie. Klucz `key` pozwala określić konkretną pozycje z nazwą zamiast polegać na kolejności.

</Solution>

</Challenges>
