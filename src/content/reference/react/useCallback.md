---
title: useCallback
---

<Intro>

`useCallback` jest hookiem reactowym, który pozwala na zapamiętywanie (ang. cache) definicji funkcji pomiędzy przerenderowaniami.

```js
const cachedFn = useCallback(fn, dependencies)
```

</Intro>

<InlineToc />

---

## Dokumentacja {/*reference*/}

### `useCallback(fn, dependencies)` {/*usecallback*/}

Wywołaj `useCallback` na głównym poziomie komponentu, aby zapamiętać definicje funkcji pomiędzy przerenderowaniami:

```js {4,9}
import { useCallback } from 'react';

export default function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);
```

[Więcej przykładów znajdziesz poniżej.](#usage)

#### Parametry {/*parameters*/}

* `fn`: Funkcja, którą chcesz zapamiętać. Może przyjąć dowolne argumenty i zwrócić dowolne wartości. React zwróci (nie wywoła!) twoją funkcję z powrotem w pierwszym renderowaniu. Przy kolejnych renderowaniach, React zwróci ci tę samą funkcję ponownie jeśli lista zależności `dependencies` nie zmieni się od ostatniego renderowania. W przeciwnym razie zwróci ci funkcję, którą przekazałeś podczas obecnego renderowania i zachowa ją do ponownego użycia potem. React nie wywoła twojej funkcji. Funkcja ta zostanie ci zwrócona, abyś mógł sam wybrać gdzie i kiedy ma być wywołana.

* `dependencies`: Lista wszystkich reaktywnych (?) wartości użytych w kodzie funkcji `fn`. Reaktywne wartości to właściwości, stan i wszystkie inne zmienne i funkcje zadeklarowane bezpośrednio wewnątrz ciała (?) komponentu. Jeżeli twój linter jest [skonfigurowany dla Reacta](/learn/editor-setup#linting), sprawdzi on czy każda reaktywna wartość jest poprawnie wskazana jako zależność. Lista zależności musi mieć stałą liczbę elementów i byś zapisana wprost (?) jak np. `[dep1, dep2, dep3]`. React porówna każdą zależność z jej poprzednią wartością używając algorytmu porównania [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).

#### Zwracan wartość {/*returns*/}

Podczas pierwszego renderowania, `useCallback` zwróci funkcję `fn` którą przekazałeś.

Podczas kolejnych renderowań, zwróci on już zapamiętaną funkcję `fn` z poprzedniego renderowania (jeśli zależności nie uległy zmianie) albo zwróci funkcję `fn`, którą przekazałeś podczas tego renderowania.

#### Zastrzeżenia {/*caveats*/}

* `useCallback` jest hookiem, więc można go wywoływać tylko **na głównym poziomie komponentu** lub innego hooka. Nie można go wywołać w pętli lub instrukcji warunkowej. Jeśli masz sytuację, która wymaga pętli lub warunku, stwórz nowy komponent i przenieś do niego ten stan.
* React **nie odrzuci zapamiętanej funkcji chyba że istnieje konkretny powód ku temu.** Na przykład, w środowisku developerskim React odrzuca zapamiętaną funkcję gdy komponent jest edytowany. Zarówno w środowisku developerskim jak i w produkcji React odrzuci zapamiętaną funkcję jeśli twój komponent zostaje zawieszony podczas pierwszego montowania (?). W przyszłości, React może dodać więcej funkcjonalności, które skorzystają z odrzucania zapamiętanej funkcji - na przykład, jeśli React doda w przyszłości wsparcie dla zwirtualizowanych list, będzie to  miało sens aby odrzucić zapamiętane funkcje dla elementów, które wyszły poza widoczny obszar (?) zwirtualizowanej tablicy. To powinno sprostać twoim oczekiwaniom jeżeli polegasz na `useCallback` jako optymalizacji wydajności. W innym przypadku, [zmienna stanu](/reference/react/useState#im-trying-to-set-state-to-a-function-but-it-gets-called-instead) lub [referencja](/reference/react/useRef#avoiding-recreating-the-ref-contents) może być lepsza.

---

## Sposób użycia {/*usage*/}

### Pomijanie przerenderowywania komponentów {/*skipping-re-rendering-of-components*/}

Gdy optymalizujesz wydajność renderowania, czasem zachodzi potrzeba zapamiętania funkcji, którą przekazujesz do potomków komponentów. Spójrzmy najpierw na składnię jak to zrobić, a potem w jakich przypadkach jest to przydatne.

Aby zapamiętać funkcję pomiędzy renderowaniami twojego komponentu, zawrzyj jej definicję w hooku `useCallback`:

```js [[3, 4, "handleSubmit"], [2, 9, "[productId, referrer]"]]
import { useCallback } from 'react';

function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);
  // ...
```

Musisz przekazać dwie rzeczy do `useCallback`:

1. Definicję funkcji, którą chcesz zapamiętać pomiędzy przerenderowaniami.
2. <CodeStep step={2}>Listę zależności</CodeStep> zawierającą wszystkie wartości wewnątrz komponentu, które są użyte w twojej funkcji.

Przy pierwszym renderowaniu, <CodeStep step={3}>zwrócona funkcja</CodeStep> otrzymana z `useCallback` będzie tą samą, którą przekazałeś.

Przy następnych renderowaniach, React porówna <CodeStep step={2}>zależności</CodeStep> z zależnościami, które przekazałeś w poprzednim renderowaniu. Jeśli żadna z zależności nie uległa zmianie (porównując z użyciem [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)), `useCallback` zwróci tę samą funkcję co poprzednio. W innym wypadku, `useCallback` zwróci funkcję, którą przekazałeś w *tym* renderowaniu.

Innymi słowy, `useCallback` zapamięta funkcję pomiędzy przerenderowaniami dopóki zależności się nie zmienią.

**Posłużmy się przykładem aby zobaczyć kiedy to może być przydatne.**

Załóżmy, że przekazujesz funkcję `handleSubmit` w dół z `ProductPage` do komponentu `ShippingForm`:

```js {5}
function ProductPage({ productId, referrer, theme }) {
  // ...
  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
```

You've noticed that toggling the `theme` prop freezes the app for a moment, but if you remove `<ShippingForm />` from your JSX, it feels fast. This tells you that it's worth trying to optimize the `ShippingForm` component.
Zauważyłeś, że zmienianie właściwości `theme` zatrzymuje na chwilę aplikację, ale gdy usuniesz `<ShippingForm />` from twojego JSX, zauważysz, że znów działa szybko. To pokazuje, że warto jest spróbować zoptymalizować komponent `ShippingForm`.

**By default, when a component re-renders, React re-renders all of its children recursively.** This is why, when `ProductPage` re-renders with a different `theme`, the `ShippingForm` component *also* re-renders. This is fine for components that don't require much calculation to re-render. But if you verified a re-render is slow, you can tell `ShippingForm` to skip re-rendering when its props are the same as on last render by wrapping it in [`memo`:](/reference/react/memo)
**Domyślnie, kiedy komponent się przerenderowuje, React przerenderowuje rekurencyjnie wszystkie jego elementy potomne.** To dlatego gdy `ProductPage` przerenderowu 

**Domyślnie, gdy komponent zostaje ponownie przerenderowany, React przerenderowuje rekursywnie wszystkie jego elementy potomne.** Dlatego też, gdy `ProductPage` zostaje przerenderowany z innym `theme`, komponent `ShippingForm` *również* zostaje przerenderowany. To jest w porządku dla komponentów, które nie wymagają dużo obliczeń do przerenderowania. Ale jeśli sprawdziłeś, że przerenderowanie trwa długo, można wskazać komponentowi `ShippingForm`, aby pominął przerenderowanie, gdy jego właściwości są takie same jak podczas ostatniego przerenderowywania, owijając (?) go w [`memo`:](/reference/react/memo)

```js {3,5}
import { memo } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  // ...
});
```

**Po dokonaniu tej zmiany, komponent `ShippingForm` pominie przerenderowanie, jeśli wszystkie jego właściwości są *takie same* jak podczas ostatniego renderowania.** To jest moment, w którym istotne staje się zapamitywanie (?) funkcji! Załóżmy, że zdefiniowałeś funkcję `handleSubmit` bez użycia hooka `useCallback`:

```js {2,3,8,12-13}
function ProductPage({ productId, referrer, theme }) {
  function handleSubmit(orderDetails) {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }
  
  return (
    <div className={theme}>
      {/* ... więc właściwości ShippingForm nigdy nie będą takie same i komponent ten przerenderuje się za każdym razem */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

**W języku JavaScript, `function () {}` lub `() => {}` zawsze tworzy _inną_ funkcję,** podobnie jak literał obiektu `{}` zawsze tworzy nowy obiekt. Zazwyczaj nie byłoby to problemem, ale oznacza to, że właściwości komponentu `ShippingForm` nigdy nie będą takie same, i optymalizacja [`memo`](/reference/react/memo) nie zadziała. Tutaj przydaje się `useCallback`:

```js {2,3,8,12-13}
function ProductPage({ productId, referrer, theme }) {
  // Powiedz Reactowi, aby zapamiętał Twoją funkcję między przerenderowaniami...
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]); // ... dopóki te zależności się nie zmienią...

  return (
    <div className={theme}>
      {/* ...ShippingForm otrzyma te same elementy potomne i może pominąć przerenderowanie */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

**Owrapowanie (?) `handleSubmit` w `useCallback` zapewnia, że to jest ta *sama* funkcja między przerenderowaniami** (aż do zmiany zależności). Nie *musisz* opakowywać funkcji w `useCallback`, chyba że robisz to z jakiegoś konkretnego powodu. W tym przykładzie powodem jest to, że przekazujesz ją do komponentu owrapowanego (?) w [`memo`,](/reference/react/memo) co pozwala na pominięcie przerenderowania. Istnieją inne powody, dla których możesz potrzebować `useCallback`, opisane dalej na tej stronie.

<Note>

**Powinieneś polegać na `useCallback` tylko jako optymalizacji wydajnościowej.** Jeśli twój kod nie działa bez niego, najpierw znajdź prawdziwą przyczynę problemu i napraw ją. Następnie możesz ponownie dodać `useCallback`.

</Note>

<DeepDive>

#### Jaki jest związek między useCallback a useMemo? {/*how-is-usecallback-related-to-usememo*/}

Często zobaczysz [`useMemo`](/reference/react/useMemo) obok `useCallback`. Oba są przydatne, gdy próbujesz zoptymalizować komponent potomny. Pozwalają one na [memoizację](https://pl.wikipedia.org/wiki/Memoization) (lub inaczej mówiąc, buforowanie (?)) tego, co przekazujesz w dół:

```js {6-8,10-15,19}
import { useMemo, useCallback } from 'react';

function ProductPage({ productId, referrer }) {
  const product = useData('/product/' + productId);

  const requirements = useMemo(() => { // Wywołuje twoją funkcję i zapamiętuje jej wynik
    return computeRequirements(product);
  }, [product]);

  const handleSubmit = useCallback((orderDetails) => { // Zapamiętuje samą twoją funkcję
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);

  return (
    <div className={theme}>
      <ShippingForm requirements={requirements} onSubmit={handleSubmit} />
    </div>
  );
}
```

Różnica polega na tym *co* pozwalają ci buforować (?):

* **[`useMemo`](/reference/react/useMemo) buforuje (?) *wynik* wywołania Twojej funkcji.** W tym przykładzie buforuje wynik wywołania `computeRequirements(product)`, aby nie zmieniał się, chyba że zmieni się `product`. Pozwala to przekazywać obiekt `requirements` w dół bez niepotrzebnego ponownego przerenderowania `ShippingForm`. Gdy będzie to konieczne, React wywoła funkcję, którą przekazałeś podczas renderowania, aby obliczyć wynik.
* **`useCallback` buforuje *samą funkcję*.** W przeciwieństwie do `useMemo`, nie wywołuje dostarczonej funkcji. Zamiast tego buforuje funkcję, którą podałeś, tak aby `handleSubmit` *sam* nie zmieniał się, chyba że zmieni się `productId` lub `referrer`. Pozwala to przekazywać funkcję `handleSubmit` w dół bez niepotrzebnego ponownego przerenderowania `ShippingForm`. Twój kod nie zostanie uruchomiony, dopóki użytkownik nie prześle formularza.

Jeśli już jesteś zaznajomiony z [`useMemo`,](/reference/react/useMemo) pomocne może być myślenie o `useCallback` w ten sposób:

```js
// Uproszczona implementacja (wewnątrz Reacta)
function useCallback(fn, dependencies) {
  return useMemo(() => fn, dependencies);
}
```

[Przeczytaj więcej o różnicy między `useMemo` a `useCallback`.](/reference/react/useMemo#memoizing-a-function)

</DeepDive>

<DeepDive>

#### Should you add useCallback everywhere? {/*should-you-add-usecallback-everywhere*/}

If your app is like this site, and most interactions are coarse (like replacing a page or an entire section), memoization is usually unnecessary. On the other hand, if your app is more like a drawing editor, and most interactions are granular (like moving shapes), then you might find memoization very helpful. 

Caching a function with `useCallback`  is only valuable in a few cases:

- You pass it as a prop to a component wrapped in [`memo`.](/reference/react/memo) You want to skip re-rendering if the value hasn't changed. Memoization lets your component re-render only if dependencies changed.
- The function you're passing is later used as a dependency of some Hook. For example, another function wrapped in `useCallback` depends on it, or you depend on this function from [`useEffect.`](/reference/react/useEffect)

There is no benefit to wrapping a function in `useCallback` in other cases. There is no significant harm to doing that either, so some teams choose to not think about individual cases, and memoize as much as possible. The downside is that code becomes less readable. Also, not all memoization is effective: a single value that's "always new" is enough to break memoization for an entire component.

Note that `useCallback` does not prevent *creating* the function. You're always creating a function (and that's fine!), but React ignores it and gives you back a cached function if nothing changed.

**In practice, you can make a lot of memoization unnecessary by following a few principles:**

1. When a component visually wraps other components, let it [accept JSX as children.](/learn/passing-props-to-a-component#passing-jsx-as-children) Then, if the wrapper component updates its own state, React knows that its children don't need to re-render.
1. Prefer local state and don't [lift state up](/learn/sharing-state-between-components) any further than necessary. Don't keep transient state like forms and whether an item is hovered at the top of your tree or in a global state library.
1. Keep your [rendering logic pure.](/learn/keeping-components-pure) If re-rendering a component causes a problem or produces some noticeable visual artifact, it's a bug in your component! Fix the bug instead of adding memoization.
1. Avoid [unnecessary Effects that update state.](/learn/you-might-not-need-an-effect) Most performance problems in React apps are caused by chains of updates originating from Effects that cause your components to render over and over.
1. Try to [remove unnecessary dependencies from your Effects.](/learn/removing-effect-dependencies) For example, instead of memoization, it's often simpler to move some object or a function inside an Effect or outside the component.

If a specific interaction still feels laggy, [use the React Developer Tools profiler](https://legacy.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) to see which components benefit the most from memoization, and add memoization where needed. These principles make your components easier to debug and understand, so it's good to follow them in any case. In long term, we're researching [doing memoization automatically](https://www.youtube.com/watch?v=lGEMwh32soc) to solve this once and for all.

</DeepDive>

<Recipes titleText="The difference between useCallback and declaring a function directly" titleId="examples-rerendering">

#### Skipping re-rendering with `useCallback` and `memo` {/*skipping-re-rendering-with-usecallback-and-memo*/}

In this example, the `ShippingForm` component is **artificially slowed down** so that you can see what happens when a React component you're rendering is genuinely slow. Try incrementing the counter and toggling the theme.

Incrementing the counter feels slow because it forces the slowed down `ShippingForm` to re-render. That's expected because the counter has changed, and so you need to reflect the user's new choice on the screen.

Next, try toggling the theme. **Thanks to `useCallback` together with [`memo`](/reference/react/memo), it’s fast despite the artificial slowdown!** `ShippingForm` skipped re-rendering because the `handleSubmit` function has not changed. The `handleSubmit` function has not changed because both `productId` and `referrer` (your `useCallback` dependencies) haven't changed since last render.

<Sandpack>

```js App.js
import { useState } from 'react';
import ProductPage from './ProductPage.js';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <hr />
      <ProductPage
        referrerId="wizard_of_oz"
        productId={123}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```

```js ProductPage.js active
import { useCallback } from 'react';
import ShippingForm from './ShippingForm.js';

export default function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);

  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}

function post(url, data) {
  // Imagine this sends a request...
  console.log('POST /' + url);
  console.log(data);
}
```

```js ShippingForm.js
import { memo, useState } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  const [count, setCount] = useState(1);

  console.log('[ARTIFICIALLY SLOW] Rendering <ShippingForm />');
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Do nothing for 500 ms to emulate extremely slow code
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderDetails = {
      ...Object.fromEntries(formData),
      count
    };
    onSubmit(orderDetails);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p><b>Note: <code>ShippingForm</code> is artificially slowed down!</b></p>
      <label>
        Number of items:
        <button type="button" onClick={() => setCount(count - 1)}>–</button>
        {count}
        <button type="button" onClick={() => setCount(count + 1)}>+</button>
      </label>
      <label>
        Street:
        <input name="street" />
      </label>
      <label>
        City:
        <input name="city" />
      </label>
      <label>
        Postal code:
        <input name="zipCode" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
});

export default ShippingForm;
```

```css
label {
  display: block; margin-top: 10px;
}

input {
  margin-left: 5px;
}

button[type="button"] {
  margin: 5px;
}

.dark {
  background-color: black;
  color: white;
}

.light {
  background-color: white;
  color: black;
}
```

</Sandpack>

<Solution />

#### Always re-rendering a component {/*always-re-rendering-a-component*/}

In this example, the `ShippingForm` implementation is also **artificially slowed down** so that you can see what happens when some React component you're rendering is genuinely slow. Try incrementing the counter and toggling the theme.

Unlike in the previous example, toggling the theme is also slow now! This is because **there is no `useCallback` call in this version,** so `handleSubmit` is always a new function, and the slowed down `ShippingForm` component can't skip re-rendering.

<Sandpack>

```js App.js
import { useState } from 'react';
import ProductPage from './ProductPage.js';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <hr />
      <ProductPage
        referrerId="wizard_of_oz"
        productId={123}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```

```js ProductPage.js active
import ShippingForm from './ShippingForm.js';

export default function ProductPage({ productId, referrer, theme }) {
  function handleSubmit(orderDetails) {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }

  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}

function post(url, data) {
  // Imagine this sends a request...
  console.log('POST /' + url);
  console.log(data);
}
```

```js ShippingForm.js
import { memo, useState } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  const [count, setCount] = useState(1);

  console.log('[ARTIFICIALLY SLOW] Rendering <ShippingForm />');
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Do nothing for 500 ms to emulate extremely slow code
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderDetails = {
      ...Object.fromEntries(formData),
      count
    };
    onSubmit(orderDetails);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p><b>Note: <code>ShippingForm</code> is artificially slowed down!</b></p>
      <label>
        Number of items:
        <button type="button" onClick={() => setCount(count - 1)}>–</button>
        {count}
        <button type="button" onClick={() => setCount(count + 1)}>+</button>
      </label>
      <label>
        Street:
        <input name="street" />
      </label>
      <label>
        City:
        <input name="city" />
      </label>
      <label>
        Postal code:
        <input name="zipCode" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
});

export default ShippingForm;
```

```css
label {
  display: block; margin-top: 10px;
}

input {
  margin-left: 5px;
}

button[type="button"] {
  margin: 5px;
}

.dark {
  background-color: black;
  color: white;
}

.light {
  background-color: white;
  color: black;
}
```

</Sandpack>


However, here is the same code **with the artificial slowdown removed.** Does the lack of `useCallback` feel noticeable or not?

<Sandpack>

```js App.js
import { useState } from 'react';
import ProductPage from './ProductPage.js';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <hr />
      <ProductPage
        referrerId="wizard_of_oz"
        productId={123}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```

```js ProductPage.js active
import ShippingForm from './ShippingForm.js';

export default function ProductPage({ productId, referrer, theme }) {
  function handleSubmit(orderDetails) {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }

  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}

function post(url, data) {
  // Imagine this sends a request...
  console.log('POST /' + url);
  console.log(data);
}
```

```js ShippingForm.js
import { memo, useState } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  const [count, setCount] = useState(1);

  console.log('Rendering <ShippingForm />');

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderDetails = {
      ...Object.fromEntries(formData),
      count
    };
    onSubmit(orderDetails);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Number of items:
        <button type="button" onClick={() => setCount(count - 1)}>–</button>
        {count}
        <button type="button" onClick={() => setCount(count + 1)}>+</button>
      </label>
      <label>
        Street:
        <input name="street" />
      </label>
      <label>
        City:
        <input name="city" />
      </label>
      <label>
        Postal code:
        <input name="zipCode" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
});

export default ShippingForm;
```

```css
label {
  display: block; margin-top: 10px;
}

input {
  margin-left: 5px;
}

button[type="button"] {
  margin: 5px;
}

.dark {
  background-color: black;
  color: white;
}

.light {
  background-color: white;
  color: black;
}
```

</Sandpack>


Quite often, code without memoization works fine. If your interactions are fast enough, you don't need memoization.

Keep in mind that you need to run React in production mode, disable [React Developer Tools](/learn/react-developer-tools), and use devices similar to the ones your app's users have in order to get a realistic sense of what's actually slowing down your app.

<Solution />

</Recipes>

---

### Updating state from a memoized callback {/*updating-state-from-a-memoized-callback*/}

Sometimes, you might need to update state based on previous state from a memoized callback.

This `handleAddTodo` function specifies `todos` as a dependency because it computes the next todos from it:

```js {6,7}
function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos([...todos, newTodo]);
  }, [todos]);
  // ...
```

You'll usually want memoized functions to have as few dependencies as possible. When you read some state only to calculate the next state, you can remove that dependency by passing an [updater function](/reference/react/useState#updating-state-based-on-the-previous-state) instead:

```js {6,7}
function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos(todos => [...todos, newTodo]);
  }, []); // ✅ No need for the todos dependency
  // ...
```

Here, instead of making `todos` a dependency and reading it inside, you pass an instruction about *how* to update the state (`todos => [...todos, newTodo]`) to React. [Read more about updater functions.](/reference/react/useState#updating-state-based-on-the-previous-state)

---

### Preventing an Effect from firing too often {/*preventing-an-effect-from-firing-too-often*/}

Sometimes, you might want to call a function from inside an [Effect:](/learn/synchronizing-with-effects)

```js {4-9,12}
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  function createOptions() {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };
  }

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection();
    connection.connect();
    // ...
```

This creates a problem. [Every reactive value must be declared as a dependency of your Effect.](/learn/lifecycle-of-reactive-effects#react-verifies-that-you-specified-every-reactive-value-as-a-dependency) However, if you declare `createOptions` as a dependency, it will cause your Effect to constantly reconnect to the chat room:


```js {6}
  useEffect(() => {
    const options = createOptions();
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // 🔴 Problem: This dependency changes on every render
  // ...
```

To solve this, you can wrap the function you need to call from an Effect into `useCallback`:

```js {4-9,16}
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  const createOptions = useCallback(() => {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };
  }, [roomId]); // ✅ Only changes when roomId changes

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // ✅ Only changes when createOptions changes
  // ...
```

This ensures that the `createOptions` function is the same between re-renders if the `roomId` is the same. **However, it's even better to remove the need for a function dependency.** Move your function *inside* the Effect:

```js {5-10,16}
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    function createOptions() { // ✅ No need for useCallback or function dependencies!
      return {
        serverUrl: 'https://localhost:1234',
        roomId: roomId
      };
    }

    const options = createOptions();
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ Only changes when roomId changes
  // ...
```

Now your code is simpler and doesn't need `useCallback`. [Learn more about removing Effect dependencies.](/learn/removing-effect-dependencies#move-dynamic-objects-and-functions-inside-your-effect)

---

### Optimizing a custom Hook {/*optimizing-a-custom-hook*/}

If you're writing a [custom Hook,](/learn/reusing-logic-with-custom-hooks) it's recommended to wrap any functions that it returns into `useCallback`:

```js {4-6,8-10}
function useRouter() {
  const { dispatch } = useContext(RouterStateContext);

  const navigate = useCallback((url) => {
    dispatch({ type: 'navigate', url });
  }, [dispatch]);

  const goBack = useCallback(() => {
    dispatch({ type: 'back' });
  }, [dispatch]);

  return {
    navigate,
    goBack,
  };
}
```

This ensures that the consumers of your Hook can optimize their own code when needed.

---

## Troubleshooting {/*troubleshooting*/}

### Every time my component renders, `useCallback` returns a different function {/*every-time-my-component-renders-usecallback-returns-a-different-function*/}

Make sure you've specified the dependency array as a second argument!

If you forget the dependency array, `useCallback` will return a new function every time:

```js {7}
function ProductPage({ productId, referrer }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }); // 🔴 Returns a new function every time: no dependency array
  // ...
```

This is the corrected version passing the dependency array as a second argument:

```js {7}
function ProductPage({ productId, referrer }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]); // ✅ Does not return a new function unnecessarily
  // ...
```

If this doesn't help, then the problem is that at least one of your dependencies is different from the previous render. You can debug this problem by manually logging your dependencies to the console:

```js {5}
  const handleSubmit = useCallback((orderDetails) => {
    // ..
  }, [productId, referrer]);

  console.log([productId, referrer]);
```

You can then right-click on the arrays from different re-renders in the console and select "Store as a global variable" for both of them. Assuming the first one got saved as `temp1` and the second one got saved as `temp2`, you can then use the browser console to check whether each dependency in both arrays is the same:

```js
Object.is(temp1[0], temp2[0]); // Is the first dependency the same between the arrays?
Object.is(temp1[1], temp2[1]); // Is the second dependency the same between the arrays?
Object.is(temp1[2], temp2[2]); // ... and so on for every dependency ...
```

When you find which dependency is breaking memoization, either find a way to remove it, or [memoize it as well.](/reference/react/useMemo#memoizing-a-dependency-of-another-hook)

---

### I need to call `useCallback` for each list item in a loop, but it's not allowed {/*i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed*/}

Suppose the `Chart` component is wrapped in [`memo`](/reference/react/memo). You want to skip re-rendering every `Chart` in the list when the `ReportList` component re-renders. However, you can't call `useCallback` in a loop:

```js {5-14}
function ReportList({ items }) {
  return (
    <article>
      {items.map(item => {
        // 🔴 You can't call useCallback in a loop like this:
        const handleClick = useCallback(() => {
          sendReport(item)
        }, [item]);

        return (
          <figure key={item.id}>
            <Chart onClick={handleClick} />
          </figure>
        );
      })}
    </article>
  );
}
```

Instead, extract a component for an individual item, and put `useCallback` there:

```js {5,12-21}
function ReportList({ items }) {
  return (
    <article>
      {items.map(item =>
        <Report key={item.id} item={item} />
      )}
    </article>
  );
}

function Report({ item }) {
  // ✅ Call useCallback at the top level:
  const handleClick = useCallback(() => {
    sendReport(item)
  }, [item]);

  return (
    <figure>
      <Chart onClick={handleClick} />
    </figure>
  );
}
```

Alternatively, you could remove `useCallback` in the last snippet and instead wrap `Report` itself in [`memo`.](/reference/react/memo) If the `item` prop does not change, `Report` will skip re-rendering, so `Chart` will skip re-rendering too:

```js {5,6-8,15}
function ReportList({ items }) {
  // ...
}

const Report = memo(function Report({ item }) {
  function handleClick() {
    sendReport(item);
  }

  return (
    <figure>
      <Chart onClick={handleClick} />
    </figure>
  );
});
```
