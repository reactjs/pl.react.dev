---
title: Renderowanie i aktualizowanie
---

<Intro>

Zanim twoje komponenty zostaną wyświetlone na ekranie, muszą zostać wyrenderowane przez Reacta. Zrozumienie tego procesu pomoże ci zrozumieć, jak wykonuje się twój kod i wyjaśni jego zachowanie.

</Intro>

<YouWillLearn>

* Czym jest renderowanie w Reakcie
* Kiedy i dlaczego React renderuje komponenty
* Kroki związane z wyświetlaniem komponentów na ekranie
* Dlaczego renderowanie nie zawsze powoduje aktualizację drzewa DOM

</YouWillLearn>

Wyobraź sobie, że twoje komponenty to kucharze w kuchni, którzy przygotowują smaczne dania z dostępnych składników. W tej sytuacji React jest kelnerem, który przyjmuje zamówienia od klientów i przynosi im zamówione potrawy. Ten proces zgłaszania i obsługi interfejsu użytkownika składa się z trzech kroków:

1. **Wywołanie (ang. _triggering_)** renderowania (przekazanie zamówienia od gościa do kuchni)
2. **Renderowanie (ang. _rendering_)** komponentu (przygotowanie zamówienia w kuchni)
3. **Aktualizowanie (ang. _committing_)** drzewa DOM (umieszczenie zamówienia na stole)

<IllustrationBlock sequential>
  <Illustration caption="Wywołanie" alt="React jako kelner w restauracji, pobierający zamówienia od użytkowników i dostarczający je do Kuchni Komponentów." src="/images/docs/illustrations/i_render-and-commit1.png" />
  <Illustration caption="Renderowanie" alt="Kucharz komponentu Card przekazuje Reactowi świeży komponent Card." src="/images/docs/illustrations/i_render-and-commit2.png" />
  <Illustration caption="Aktualizowanie" alt="React dostarcza komponent Card użytkownikowi do jego stołu." src="/images/docs/illustrations/i_render-and-commit3.png" />
</IllustrationBlock>

## Krok 1: Wywołanie renderowania {/*step-1-trigger-a-render*/}

Istnieją dwa powody, dla których komponent może zostać wyrenderowany:

1. To jest **początkowe renderowanie** komponentu.
2. Stan komponentu (lub jednego z jego rodziców) **został zaktualizowany**.

### Początkowe renderowanie {/*initial-render*/}

Przy uruchamianiu swojej aplikacji, musisz wywołać początkowe renderowanie. Frameworki i piaskownice czasem ukrywają ten kod, ale jest on wywoływany poprzez wywołanie funkcji [`createRoot`](/reference/react-dom/client/createRoot) z docelowym węzłem drzewa DOM, a następnie wywołanie na nim metody `render` z twoim komponentem:

<Sandpack>

```js src/index.js active
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```

```js src/Image.js
export default function Image() {
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="Rzeźba 'Floralis Genérica' wykonana przez Eduardo Catalano: ogromny metalowy kwiat z zwierciadlanymi płatkami"
    />
  );
}
```

</Sandpack>

Spróbuj zakomentować wywołanie `root.render()` i zauważ, że komponent znika!

### Przerenderowania po aktualizacji stanu {/*re-renders-when-state-updates*/}

Po początkowym renderowaniu komponentu, możesz wywołać kolejne przerenderowania poprzez aktualizację jego stanu za pomocą [funkcji `set`](/reference/react/useState#setstate). Aktualizacja stanu komponentu automatycznie dodaje renderowanie do kolejki. (Możesz to sobie wyobrazić jako gościa restauracji zamawiającego herbatę, deser i wszelkiego rodzaju rzeczy już po złożeniu pierwszego zamówienia, w zależności od stanu jego pragnienia lub głodu.)

<IllustrationBlock sequential>
  <Illustration caption="Aktualizacja stanu..." alt="React jako kelner w restauracji, serwujący interfejs użytkownika Card użytkownikowi, przedstawionym jako klient z kursorem jako głową. Klient mówi, że chce komponent Card w kolorze różowym, a nie czarnym!" src="/images/docs/illustrations/i_rerender1.png" />
  <Illustration caption="...wywołuje..." alt="React wraca do Kuchni Komponentów i mówi Kucharzowi Komponentu Card, że potrzebuje komponent Card w kolorze różowym." src="/images/docs/illustrations/i_rerender2.png" />
  <Illustration caption="...renderowanie!" alt="Kucharz Komponentu Card dostarcza Reactowi komponent Card w kolorze różowym." src="/images/docs/illustrations/i_rerender3.png" />
</IllustrationBlock>

## Krok 2: React renderuje twoje komponenty {/*step-2-react-renders-your-components*/}

Po wywołaniu renderowania, React wywołuje twoje komponenty, aby ustalić, co wyświetlić na ekranie. **"Renderowanie" oznacza wywołanie twoich komponentów przez Reacta.**

* **Podczas początkowego renderowania,** React wywoła główny komponent.
* **Podczas kolejnych renderowań,** React wywoła funkcję komponentu, którego aktualizacja stanu wywołała renderowanie.

Proces ten jest rekurencyjny: jeśli zaktualizowany komponent zwraca inny komponent, React następnie wyrenderuje _ten_ komponent, a jeśli ten komponent również coś zwraca, wyrenderuje _ten_ komponent, i tak dalej. Proces będzie kontynuowany, aż nie będzie więcej zagnieżdżonych komponentów i React będzie dokładnie wiedział, co powinno być wyświetlane na ekranie.

W poniższym przykładzie React wywoła `Gallery()` i  `Image()` kilkukrotnie:

<Sandpack>

```js src/Gallery.js active
export default function Gallery() {
  return (
    <section>
      <h1>Inspirujące rzeźby</h1>
      <Image />
      <Image />
      <Image />
    </section>
  );
}

function Image() {
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="Rzeźba 'Floralis Genérica' wykonana przez Eduardo Catalano: ogromny metalowy kwiat z zwierciadlanymi płatkami"
    />
  );
}
```

```js src/index.js
import Gallery from './Gallery.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Gallery />);
```

```css
img { margin: 0 10px 10px 0; }
```

</Sandpack>

* **Podczas początkowego renderowania,** React [utworzy węzły DOM](https://developer.mozilla.org/docs/Web/API/Document/createElement) dla znaczników `<section>`, `<h1>` i trzech znaczników `<img>`.
* **Podczas ponownego renderowania,** React obliczy, które z ich właściwości, jeśli jakiekolwiek, zostały zmienione od poprzedniego renderowania. Nic nie zrobi z tą informacją aż do następnego kroku, czyli fazy aktualizacji.

<Pitfall>

Renderowanie zawsze musi być [czystym obliczaniem](/learn/keeping-components-pure):

* **Takie same wejścia, taki sam wynik.** Dla tych samych danych wejściowych, komponent powinien zawsze zwracać ten sam JSX - kiedy ktoś zamawia sałatkę z pomidorami, nie powinien otrzymać sałatki z cebulą!
* **Dbanie o swoje własne sprawy.** Komponent nie powinien zmieniać żadnych obiektów ani zmiennych, które już istniały przed renderowaniem - jedno zamówienie nie powinno móc zmieniać zamówienia kogoś innego.

W przeciwnym razie możesz napotkać trudne do zrozumienia błędy i nieprzewidywalne zachowanie w miarę wzrostu złożoności kodu. Podczas pracy w "trybie rygorystycznym" (ang. _Strict Mode_) React wywołuje funkcję każdego komponentu dwa razy, co może pomóc w wykryciu błędów spowodowanych przez nieczyste funkcje.

</Pitfall>

<DeepDive>

#### Optymalizacja wydajności {/*optimizing-performance*/}

Domyślne zachowanie polegające na renderowaniu wszystkich komponentów zagnieżdżonych w zaktualizowanym komponencie nie jest optymalne pod względem wydajności, jeśli zaktualizowany komponent znajduje się bardzo wysoko w drzewie komponentów. Jeśli napotkasz problemy z wydajnością, istnieje kilka możliwych rozwiązań opisanych w sekcji [Wydajność](https://reactjs.org/docs/optimizing-performance.html). **Nie optymalizuj przedwcześnie!**

</DeepDive>

## Krok 3: React aktualizuje zmiany w drzewie DOM {/*step-3-react-commits-changes-to-the-dom*/}

Po wyrenderowaniu (wywołaniu) twoich komponentów, React zmodyfikuje drzewo DOM.

* **Podczas początkowego renderowania,** React użyje API drzewa DOM o nazwie [`appendChild()`](https://developer.mozilla.org/docs/Web/API/Node/appendChild), aby umieścić na ekranie wszystkie węzły drzewa DOM, które utworzył.
* **Podczas przerenderowań,** React zastosuje minimum niezbędnych operacji (obliczonych podczas renderowania!), aby dopasować drzewo DOM do wyniku najnowszego renderowania.

**React zmienia węzły drzewa DOM tylko wtedy, gdy występuje różnica pomiędzy renderowaniami.** Na przykład, oto komponent, który przerenderowuje się co sekundę z różnymi właściwościami przekazywanymi z jego rodzica. Zauważ, że możesz dodać tekst do elementu `<input>`, aktualizując jego atrybut `value`, ale tekst nie znika, gdy komponent renderuje się ponownie:

<Sandpack>

```js src/Clock.js active
export default function Clock({ time }) {
  return (
    <>
      <h1>{time}</h1>
      <input />
    </>
  );
}
```

```js src/App.js hidden
import { useState, useEffect } from 'react';
import Clock from './Clock.js';

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const time = useTime();
  return (
    <Clock time={time.toLocaleTimeString()} />
  );
}
```

</Sandpack>

To działa, ponieważ podczas ostatniego kroku React aktualizuje tylko zawartość znacznika `<h1>` nową wartością `time`. Widzi on, że znacznik `<input>` pojawia się w JSXie w tym samym miejscu co ostatnim razem, więc React nie zmienia tego znacznika ani jego atrybutu `value`!
## Epilogue: Browser paint {/*epilogue-browser-paint*/}

After rendering is done and React updated the DOM, the browser will repaint the screen. Although this process is known as "browser rendering", we'll refer to it as "painting" to avoid confusion throughout the docs.

<Illustration alt="A browser painting 'still life with card element'." src="/images/docs/illustrations/i_browser-paint.png" />

<Recap>

* Any screen update in a React app happens in three steps:
  1. Trigger
  2. Render
  3. Commit
* You can use Strict Mode to find mistakes in your components
* React does not touch the DOM if the rendering result is the same as last time

</Recap>

