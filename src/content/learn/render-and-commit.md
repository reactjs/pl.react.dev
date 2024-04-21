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

## Step 2: React renders your components {/*step-2-react-renders-your-components*/}

After you trigger a render, React calls your components to figure out what to display on screen. **"Rendering" is React calling your components.**

* **On initial render,** React will call the root component.
* **For subsequent renders,** React will call the function component whose state update triggered the render.

This process is recursive: if the updated component returns some other component, React will render _that_ component next, and if that component also returns something, it will render _that_ component next, and so on. The process will continue until there are no more nested components and React knows exactly what should be displayed on screen.

In the following example, React will call `Gallery()` and  `Image()` several times:

<Sandpack>

```js src/Gallery.js active
export default function Gallery() {
  return (
    <section>
      <h1>Inspiring Sculptures</h1>
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
      alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
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

* **During the initial render,** React will [create the DOM nodes](https://developer.mozilla.org/docs/Web/API/Document/createElement) for `<section>`, `<h1>`, and three `<img>` tags. 
* **During a re-render,** React will calculate which of their properties, if any, have changed since the previous render. It won't do anything with that information until the next step, the commit phase.

<Pitfall>

Rendering must always be a [pure calculation](/learn/keeping-components-pure):

* **Same inputs, same output.** Given the same inputs, a component should always return the same JSX. (When someone orders a salad with tomatoes, they should not receive a salad with onions!)
* **It minds its own business.** It should not change any objects or variables that existed before rendering. (One order should not change anyone else's order.)

Otherwise, you can encounter confusing bugs and unpredictable behavior as your codebase grows in complexity. When developing in "Strict Mode", React calls each component's function twice, which can help surface mistakes caused by impure functions.

</Pitfall>

<DeepDive>

#### Optimizing performance {/*optimizing-performance*/}

The default behavior of rendering all components nested within the updated component is not optimal for performance if the updated component is very high in the tree. If you run into a performance issue, there are several opt-in ways to solve it described in the [Performance](https://reactjs.org/docs/optimizing-performance.html) section. **Don't optimize prematurely!**

</DeepDive>

## Step 3: React commits changes to the DOM {/*step-3-react-commits-changes-to-the-dom*/}

After rendering (calling) your components, React will modify the DOM. 

* **For the initial render,** React will use the [`appendChild()`](https://developer.mozilla.org/docs/Web/API/Node/appendChild) DOM API to put all the DOM nodes it has created on screen. 
* **For re-renders,** React will apply the minimal necessary operations (calculated while rendering!) to make the DOM match the latest rendering output.

**React only changes the DOM nodes if there's a difference between renders.** For example, here is a component that re-renders with different props passed from its parent every second. Notice how you can add some text into the `<input>`, updating its `value`, but the text doesn't disappear when the component re-renders:

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

This works because during this last step, React only updates the content of `<h1>` with the new `time`. It sees that the `<input>` appears in the JSX in the same place as last time, so React doesn't touch the `<input>`—or its `value`!
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

