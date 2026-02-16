---
title: useCallback
---

<Intro>

`useCallback` jest hookiem reactowym, który pozwala na zapamiętywanie (*ang.* cache, memoize) definicji funkcji pomiędzy renderowaniami.

```js
const cachedFn = useCallback(fn, dependencies)
```

</Intro>

<Note>

[React Compiler](/learn/react-compiler) automatically memoizes values and functions, reducing the need for manual `useCallback` calls. You can use the compiler to handle memoization automatically.

</Note>

<InlineToc />

---

## Dokumentacja {/*reference*/}

### `useCallback(fn, dependencies)` {/*usecallback*/}

Wywołaj `useCallback` na głównym poziomie komponentu, aby zapamiętać definicje funkcji pomiędzy renderowaniami:

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

* `fn`: Funkcja, którą chcesz zapamiętać. Może przyjąć dowolne argumenty i zwrócić dowolne wartości. React zwróci (nie wywoła!) twoją funkcję z powrotem w pierwszym renderowaniu. Przy kolejnych renderowaniach, React zwróci ci tę samą funkcję ponownie, jeśli lista zależności `dependencies` nie zmieni się od ostatniego renderowania. W przeciwnym razie zwróci ci funkcję, którą przekazano podczas obecnego renderowania i zachowa ją do ponownego użycia. React nie wywoła twojej funkcji. Funkcja ta zostanie ci zwrócona, aby można było samodzielnie wybrać, gdzie i kiedy ma zostać wywołana.

* `dependencies`: Lista wszystkich reaktywnych wartości użytych w kodzie funkcji `fn`. Reaktywne wartości to właściwości, stan i wszystkie inne zmienne i funkcje zadeklarowane bezpośrednio wewnątrz ciała komponentu. Jeżeli twój linter jest [skonfigurowany pod Reacta](/learn/editor-setup#linting), sprawdzi on, czy każda reaktywna wartość jest poprawnie wskazana jako zależność. Lista zależności musi mieć stałą liczbę elementów i być zapisana w miejscu wywołania, jak np. `[dep1, dep2, dep3]`. React porówna każdą zależność z jej poprzednią wartością używając algorytmu porównania [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).

#### Zwracana wartość {/*returns*/}

Podczas pierwszego renderowania `useCallback` zwróci funkcję `fn`, która została mu przekazana.

<<<<<<< HEAD
Podczas kolejnych renderowań zwróci on już zapamiętaną funkcję `fn` z poprzedniego renderowania (jeśli zależności nie uległy zmianie) albo zwróci funkcję `fn`, którą przekazano podczas tego renderowania.
=======
During subsequent renders, it will either return an already stored `fn` function from the last render (if the dependencies haven't changed), or return the `fn` function you have passed during this render.
>>>>>>> 55a317d40781a0054a05a9f6c443ae0bd71f7d7e

#### Zastrzeżenia {/*caveats*/}

* `useCallback` jest hookiem, więc można go wywoływać tylko **na głównym poziomie komponentu** lub innego hooka. Nie można go wywołać w pętli lub instrukcji warunkowej. Jeśli masz sytuację, która wymaga pętli lub warunku, stwórz nowy komponent i przenieś do niego stan.
* React **nie odrzuci zapamiętanej funkcji, chyba że istnieje konkretny powód ku temu.** Na przykład, w środowisku deweloperskim React odrzuca zapamiętaną funkcję, gdy komponent jest edytowany. Zarówno w środowisku deweloperskim jak i w produkcji React odrzuci zapamiętaną funkcję, jeśli twój komponent zostaje zawieszony (*ang.* suspended) podczas pierwszego montowania. W przyszłości React może dodać więcej funkcjonalności, które skorzystają z odrzucania zapamiętanej funkcji - na przykład, jeśli React doda w przyszłości wsparcie dla zwirtualizowanych list, uzasadnione będzie odrzucanie zapamiętanych funkcji dla elementów, które wyszły poza widoczny obszar zwirtualizowanej tabeli. Jeśli korzystasz z `useCallback` w celu zoptymalizowania wydajności, powyższe cechy powinny sprostać twoim oczekiwaniom. W innym przypadku lepsza może okazać się [zmienna stanu](/reference/react/useState#im-trying-to-set-state-to-a-function-but-it-gets-called-instead) lub [referencja](/reference/react/useRef#avoiding-recreating-the-ref-contents).

---

## Sposób użycia {/*usage*/}

### Pomijanie przerenderowywania komponentów {/*skipping-re-rendering-of-components*/}

Gdy optymalizujesz wydajność renderowania, czasem zachodzi potrzeba zapamiętania funkcji, którą przekazujesz do komponentów podrzędnych. Spójrzmy najpierw na składnię, a następnie na listę przypadków, w których może się to przydać.

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

Do `useCallback` musisz przekazać dwie rzeczy:

1. Definicję funkcji, którą chcesz zapamiętać pomiędzy renderowaniami.
2. <CodeStep step={2}>Listę zależności</CodeStep> zawierającą wszystkie wartości wewnątrz komponentu, które są użyte w twojej funkcji.

Przy pierwszym renderowaniu <CodeStep step={3}>zwrócona funkcja</CodeStep> otrzymana z `useCallback` będzie tą samą, którą przekazano do hooka.

Przy następnych renderowaniach React porówna <CodeStep step={2}>zależności</CodeStep> z tymi, które przekazano w poprzednim renderowaniu. Jeśli żadna z zależności nie uległa zmianie (porównując z użyciem [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)), `useCallback` zwróci tę samą funkcję co poprzednio. W innym wypadku, `useCallback` zwróci funkcję, którą przekazano w *tym* renderowaniu.

Innymi słowy, `useCallback` będzie pamiętać funkcję pomiędzy renderowaniami, dopóki nie zmienią się zależności.

**Posłużmy się przykładem, aby zobaczyć, kiedy może się to okazać przydatne.**

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

Twoją uwagę przykuł fakt, iż przełączanie właściwości `theme` blokuje na chwilę aplikację, ale gdy usuniesz `<ShippingForm />` z kodu JSX, zauważasz, że znów działa płynnie. To pokazuje, że warto jest spróbować zoptymalizować komponent `ShippingForm`.

**Domyślnie, gdy komponent jest ponownie renderowywany, React także renderuje rekursywnie wszystkich jego potomków.** Dlatego też, gdy `ProductPage` zostaje wyrenderowany z inną wartością `theme`, komponent `ShippingForm` *również* zostaje przerenderowany. Jest to akceptowalne dla komponentów, które nie wymagają dużo obliczeń do wyrenderowania. Ale jeśli z obserwacji wynika, że ponowne wyrenderowanie trwa długo, można wskazać komponentowi `ShippingForm`, aby pominął renderowanie, gdy jego właściwości są takie same jak podczas ostatniego renderowania, poprzez opakowanie go w [`memo`:](/reference/react/memo)

```js {3,5}
import { memo } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  // ...
});
```

**Po dokonaniu tej zmiany komponent `ShippingForm` pominie ponowne renderowanie, jeśli wszystkie jego właściwości są *takie same* jak podczas ostatniego renderowania.** To jest moment, w którym istotne staje się zapamiętywanie funkcji! Załóżmy, że zdefiniowaliśmy funkcję `handleSubmit` bez użycia hooka `useCallback`:

```js {2,3,8,12-13}
function ProductPage({ productId, referrer, theme }) {
  // Za każdym razem, gdy zmienia się theme, będzie to inna funkcja...
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

**W języku JavaScript `function () {}` lub `() => {}` zawsze tworzy _inną_ funkcję,** podobnie jak literał obiektu `{}` zawsze tworzy nowy obiekt. Zazwyczaj nie byłoby to problemem, ale oznacza to, że właściwości komponentu `ShippingForm` nigdy nie będą takie same i optymalizacja [`memo`](/reference/react/memo) nie zadziała. Tu z pomocą przychodzi `useCallback`:

```js {2,3,8,12-13}
function ProductPage({ productId, referrer, theme }) {
  // Powiedz Reactowi, aby zapamiętał twoją funkcję między renderowaniami...
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]); // ... dopóki te zależności się nie zmienią...

  return (
    <div className={theme}>
      {/* ...ShippingForm otrzyma tych samych potomków i może pominąć przerenderowanie */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

**Opakowanie `handleSubmit` w `useCallback` zapewnia, że między kolejnymi renderowaniami będzie to ta *sama* funkcja** (aż do zmiany zależności). Nie *musisz* opakowywać funkcji w `useCallback`, chyba że robisz to z jakiegoś konkretnego powodu. W tym przykładzie powodem jest przekazywanie jej do komponentu opakowanego w [`memo`](/reference/react/memo), co pozwala na pominięcie zbędnego renderowania. Inne powody, dla których możesz potrzebować `useCallback`, opisane dalej na tej stronie.

<Note>

**Korzystaj z `useCallback` tylko do optymalizacji wydajnościowej.** Jeśli twój kod nie działa bez niego, najpierw znajdź prawdziwą przyczynę problemu i napraw ją. Następnie możesz ponownie dodać `useCallback`.

</Note>

<DeepDive>

#### Jaki jest związek między useCallback a useMemo? {/*how-is-usecallback-related-to-usememo*/}

Często zobaczysz [`useMemo`](/reference/react/useMemo) obok `useCallback`. Oba są przydatne, gdy próbujesz zoptymalizować komponent potomny. Pozwalają one na [memoizację](https://en.wikipedia.org/wiki/Memoization) (lub inaczej mówiąc, zapamiętywanie) tego, co przekazujesz w dół:

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

Różnica polega na tym, *co* pozwalają ci zapamiętać:

* **[`useMemo`](/reference/react/useMemo) zapamiętuje *wynik* wywołania twojej funkcji.** W tym przykładzie jest to wynik wywołania `computeRequirements(product)`, aby nie zmieniał się, chyba że zmieni się `product`. Pozwala to przekazywać obiekt `requirements` w dół bez niepotrzebnego ponownego renderowania komponentu `ShippingForm`. Gdy będzie to konieczne, React wywoła funkcję, którą przekazano podczas renderowania, aby obliczyć wynik.
* **`useCallback` zapamiętuje *samą funkcję*.** W przeciwieństwie do `useMemo`, nie wywołuje dostarczonej funkcji. Zamiast tego zapamiętuje funkcję, którą mu podamy, tak aby `handleSubmit` *sam* nie zmieniał się, chyba że zmieni się `productId` lub `referrer`. Pozwala to przekazywać funkcję `handleSubmit` w dół bez niepotrzebnego ponownego renderowania komponentu `ShippingForm`. Twój kod nie zostanie uruchomiony, dopóki użytkownik nie prześle formularza.

Jeśli już rozumiesz zasadę działania [`useMemo`,](/reference/react/useMemo), pomocne może być myślenie o `useCallback` w ten sposób:

<<<<<<< HEAD
```js
// Uproszczona implementacja (wewnątrz Reacta)
=======
```js {expectedErrors: {'react-compiler': [3]}}
// Simplified implementation (inside React)
>>>>>>> 55a317d40781a0054a05a9f6c443ae0bd71f7d7e
function useCallback(fn, dependencies) {
  return useMemo(() => fn, dependencies);
}
```

[Przeczytaj więcej o różnicy między `useMemo` a `useCallback`.](/reference/react/useMemo#memoizing-a-function)

</DeepDive>

<DeepDive>

#### Czy należy używać useCallback wszędzie? {/*should-you-add-usecallback-everywhere*/}

<<<<<<< HEAD
Jeśli twoja aplikacja jest podobna do tej strony i większość interakcji jest prostych (takich jak zastępowanie strony lub całej sekcji), to zazwyczaj zapamiętywanie nie jest konieczne. Z drugiej strony, jeśli twoja aplikacja przypomina edytor rysunków i większość interakcji jest dość szczegółowa (takie jak przesuwanie kształtów), to możliwe, że zapamiętywanie będzie bardzo pomocne.

Zapamiętywanie funkcji za pomocą `useCallback` daje wyraźne korzyści tylko w kilku przypadkach:
=======
If your app is like this site, and most interactions are coarse (like replacing a page or an entire section), memoization is usually unnecessary. On the other hand, if your app is more like a drawing editor, and most interactions are granular (like moving shapes), then you might find memoization very helpful.

Caching a function with `useCallback` is only valuable in a few cases:
>>>>>>> 55a317d40781a0054a05a9f6c443ae0bd71f7d7e

- Przekazujesz ją jako właściwość do potomka, który jest owinięty w [`memo`.](/reference/react/memo) Chcesz pominąć przerenderowanie, jeśli wartość się nie zmieniła. Zapamiętywanie pozwala komponentowi przerenderować się tylko wtedy, gdy zmienią się zależności.
- Funkcja, którą przekazujesz, jest później używana jako zależność jakiegoś Hooka. Na przykład inna funkcja owinięta w `useCallback` zależy od niej lub ty zależysz od tej funkcji w hooku [`useEffect.`](/reference/react/useEffect)

W innych przypadkach nie ma korzyści z owijania funkcji w `useCallback`. Nie ma to również znaczącego wpływu na działanie, więc niektóre zespoły wybierają, by nie zastanawiać się nad indywidualnymi przypadkami i stosować zapamiętywanie tak często, jak to możliwe. Wadą tego podejścia jest jednak to, że kod staje się mniej czytelny. Dodatkowo, nie zawsze zapamiętywanie jest skuteczne: pojedyncza wartość, która "zawsze jest nowa", może wystarczyć, aby zepsuć zapamiętywanie dla całego komponentu.

Należy zaznaczyć, że `useCallback` nie zapobiega *tworzeniu* funkcji. Zawsze tworzysz funkcję (i nie ma w tym nic złego!), ale React ją ignoruje i zwraca zapamiętaną funkcję, jeśli nic się nie zmieniło.

**W praktyce możesz uniknąć wielu przypadków zapamiętywania, stosując kilka zasad:**

<<<<<<< HEAD
1. Gdy komponent wizualnie zawiera inne komponenty, pozwól mu [przyjmować JSX jako komponenty potomne.](/learn/passing-props-to-a-component#passing-jsx-as-children) Wtedy, jeśli komponent opakowujący zaktualizuje swój własny stan, React będzie wiedzieć, że jego komponenty potomne nie muszą być ponownie wyrenderowane.
1. Preferuj stan lokalny i nie [wynoś stanu wyżej](/learn/sharing-state-between-components) niż to jest konieczne. Nie przechowuj chwilowego stanu, takiego jak formularze czy informacji o tym, czy element został najechany kursorem, na samej górze drzewa komponentów lub w bibliotece globalnego stanu.
1. Utrzymuj swoją [logikę renderowania w czystości.](/learn/keeping-components-pure) Jeśli przerenderowanie komponentu powoduje problem lub widoczne wizualne artefakty, błąd tkwi w twoim komponencie! Napraw go, zamiast dodawać memoizację.
1. Unikaj [niepotrzebnych efektów, które aktualizują stan.](/learn/you-might-not-need-an-effect) Większość problemów wydajnościowych w aplikacjach reactowych wynika z serii aktualizacji, które mają swoje źródło w efektach i prowadzą do wielokrotnego przerenderowania komponentów.
1. Postaraj się [usunąć niepotrzebne zależności z efektów.](/learn/removing-effect-dependencies) Na przykład, zamiast zapamiętywania, często prostsze jest przeniesienie jakiegoś obiektu lub funkcji do efektu lub na zewnątrz komponentu.
=======
1. When a component visually wraps other components, let it [accept JSX as children.](/learn/passing-props-to-a-component#passing-jsx-as-children) Then, if the wrapper component updates its own state, React knows that its children don't need to re-render.
2. Prefer local state and don't [lift state up](/learn/sharing-state-between-components) any further than necessary. Don't keep transient state like forms and whether an item is hovered at the top of your tree or in a global state library.
3. Keep your [rendering logic pure.](/learn/keeping-components-pure) If re-rendering a component causes a problem or produces some noticeable visual artifact, it's a bug in your component! Fix the bug instead of adding memoization.
4. Avoid [unnecessary Effects that update state.](/learn/you-might-not-need-an-effect) Most performance problems in React apps are caused by chains of updates originating from Effects that cause your components to render over and over.
5. Try to [remove unnecessary dependencies from your Effects.](/learn/removing-effect-dependencies) For example, instead of memoization, it's often simpler to move some object or a function inside an Effect or outside the component.
>>>>>>> 55a317d40781a0054a05a9f6c443ae0bd71f7d7e

Jeśli jakaś interakcja wciąż działa opornie, [użyj narzędzi do profilowania w narzędziach deweloperskich Reacta](https://legacy.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html), aby zobaczyć, które komponenty najwięcej zyskują na zapamiętywaniu i dodaj zapamiętywanie tam, gdzie jest to potrzebne. Te zasady sprawiają, że twoje komponenty będą łatwiejsze do debugowania i zrozumienia, więc warto się nimi kierować w każdym przypadku. Długoterminowo pracujemy nad [automatycznym zapamiętywaniem](https://www.youtube.com/watch?v=lGEMwh32soc), aby rozwiązać ten problem raz na zawsze.

</DeepDive>

<Recipes titleText="Różnica między `useCallback` a bezpośrednim deklarowaniem funkcji" titleId="examples-rerendering">

#### Zapobieganie ponownego renderowania za pomocą `useCallback` i `memo` {/*skipping-re-rendering-with-usecallback-and-memo*/}

W tym przykładzie komponent `ShippingForm` jest **sztucznie spowolniony**, abyśmy mogli zobaczyć, co się dzieje, gdy renderowany komponent jest naprawdę wolny. Spróbuj zwiększyć licznik i przełączyć motyw.

Zwiększanie licznika wydaje się wolne, ponieważ wymusza przerenderowanie spowolnionego komponentu `ShippingForm`. Jest to oczekiwane, ponieważ licznik się zmienił, więc musisz odzwierciedlić nowy wybór użytkownika na ekranie.

Następnie spróbuj przełączyć motyw. **Dzięki `useCallback` razem z [`memo`](/reference/react/memo), jest to szybkie pomimo sztucznego spowolnienia!** `ShippingForm` pominął przerenderowanie, ponieważ funkcja `handleSubmit` nie zmieniła się. Funkcja `handleSubmit` nie zmieniła się, ponieważ ani `productId`, ani `referrer` (twoje zależności w `useCallback`) nie zmieniły się od ostatniego renderowania.

<Sandpack>

```js src/App.js
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
        Ciemny motyw
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

```js src/ProductPage.js active
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
  // Załóżmy, że to wysyła zapytanie...
  console.log('POST /' + url);
  console.log(data);
}
```

```js {expectedErrors: {'react-compiler': [7, 8]}} src/ShippingForm.js
import { memo, useState } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  const [count, setCount] = useState(1);

  console.log('[SZTUCZNE SPOWOLNIENIE] Renderowanie <ShippingForm />');
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Nic nie rób przez 500 ms, aby symulować bardzo wolny kod
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
      <p><b>Uwaga: komponent <code>ShippingForm</code> jest sztucznie spowolniony!</b></p>
      <label>
        Liczba elementów:
        <button type="button" onClick={() => setCount(count - 1)}>–</button>
        {count}
        <button type="button" onClick={() => setCount(count + 1)}>+</button>
      </label>
      <label>
        Ulica:
        <input name="street" />
      </label>
      <label>
        Miasto:
        <input name="city" />
      </label>
      <label>
        Kod pocztowy:
        <input name="zipCode" />
      </label>
      <button type="submit">Wyślij</button>
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

#### Ciągłe przerenderowywanie komponentu {/*always-re-rendering-a-component*/}

W tym przykładzie implementacja komponentu `ShippingForm` jest również **sztucznie spowolniona**, abyśmy mogli zobaczyć, co się dzieje, gdy renderowany komponent reactowy jest naprawdę wolny. Spróbuj zwiększyć licznik i przełączyć motyw.

W przeciwieństwie do poprzedniego przykładu, przełączanie motywu jest teraz również wolne! To dlatego, że **w tej wersji nie ma wywołania `useCallback`,** więc `handleSubmit` jest zawsze nową funkcją, przez co spowolniony komponent `ShippingForm` nie może pominąć przerenderowania.

<Sandpack>

```js src/App.js
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
        Ciemny motyw
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

```js src/ProductPage.js active
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
  // Załóżmy, że to wysyła zapytanie...
  console.log('POST /' + url);
  console.log(data);
}
```

```js {expectedErrors: {'react-compiler': [7, 8]}} src/ShippingForm.js
import { memo, useState } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  const [count, setCount] = useState(1);

  console.log('[SZTUCZNE SPOWOLNIENIE] Renderowanie <ShippingForm />');
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Nic nie rób przez 500 ms, aby symulować bardzo wolny kod
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
      <p><b>Uwaga: komponent <code>ShippingForm</code> jest sztucznie spowolniony!</b></p>
      <label>
        Liczba elementów:
        <button type="button" onClick={() => setCount(count - 1)}>–</button>
        {count}
        <button type="button" onClick={() => setCount(count + 1)}>+</button>
      </label>
      <label>
        Ulica:
        <input name="street" />
      </label>
      <label>
        Miasto:
        <input name="city" />
      </label>
      <label>
        Kod pocztowy:
        <input name="zipCode" />
      </label>
      <button type="submit">Wyślij</button>
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


Natomiast tutaj mamy ten sam kod **bez sztucznego spowolnienia.** Czy brak `useCallback` jest tu zauważalny?

<Sandpack>

```js src/App.js
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
        Ciemny motyw
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

```js src/ProductPage.js active
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
  // Załóżmy, że to wysyła zapytanie...
  console.log('POST /' + url);
  console.log(data);
}
```

```js src/ShippingForm.js
import { memo, useState } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  const [count, setCount] = useState(1);

  console.log('Renderowanie komponentu <ShippingForm />');

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
        Liczba elementów:
        <button type="button" onClick={() => setCount(count - 1)}>–</button>
        {count}
        <button type="button" onClick={() => setCount(count + 1)}>+</button>
      </label>
      <label>
        Ulica:
        <input name="street" />
      </label>
      <label>
        Miasto:
        <input name="city" />
      </label>
      <label>
        Kod pocztowy:
        <input name="zipCode" />
      </label>
      <button type="submit">Wyślij</button>
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


Dość często kod bez zapamiętywania działa dobrze. Jeśli twoje interakcje są wystarczająco szybkie, nie potrzebujesz zapamiętywania.

Pamiętaj, że musisz uruchomić React w trybie produkcyjnym, wyłączyć [Narzędzia Deweloperskie Reacta](/learn/react-developer-tools) oraz używać urządzeń podobnych do tych, które mają użytkownicy twojej aplikacji, aby uzyskać realistyczne odczucie, co tak naprawdę spowalnia twoją aplikację.

<Solution />

</Recipes>

---

### Aktualizacja stanu z zapamiętanej funkcji zwrotnej (ang. *callback*) {/*updating-state-from-a-memoized-callback*/}

Czasami może być konieczne zaktualizowanie stanu na podstawie poprzedniego stanu z zapamiętanej funkcji zwrotnej.

Funkcja `handleAddTodo` posiada `todos` jako zależność, ponieważ oblicza następne zadania na jej podstawie:

```js {6,7}
function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos([...todos, newTodo]);
  }, [todos]);
  // ...
```

Zazwyczaj powinniśmy dążyć do tego, aby zapamiętane funkcje miały jak najmniej zależności. Gdy odczytujesz pewien stan tylko po to, aby obliczyć jego następną wartość, możesz usunąć tę zależność, przekazując zamiast tego [funkcję aktualizującą](/reference/react/useState#updating-state-based-on-the-previous-state):

```js {6,7}
function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos(todos => [...todos, newTodo]);
  }, []); // ✅ Nie ma potrzeby, aby todos było zależnością
  // ...
```

W tym przypadku zamiast robienia z `todos` zależność i odczytywania go wewnątrz funkcji, przekazujesz do Reacta instrukcję, jak *aktualizować* stan (`todos => [...todos, newTodo]`). [Dowiedz się więcej o funkcjach aktualizujących.](/reference/react/useState#updating-state-based-on-the-previous-state)

---

### Zapobieganie zbyt częstemu wyzwalaniu efektu {/*preventing-an-effect-from-firing-too-often*/}

Czasami możesz zechcieć wywołać funkcję wewnątrz [efektu:](/learn/synchronizing-with-effects)

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
    const connection = createConnection(options);
    connection.connect();
    // ...
```

To powoduje pewien problem. [Każda reaktywna wartość musi być zadeklarowana jako zależność twojego efektu.](/learn/lifecycle-of-reactive-effects#react-verifies-that-you-specified-every-reactive-value-as-a-dependency) Jednak jeśli zadeklarujesz `createOptions` jako zależność, spowoduje to, że twój efekt będzie ciągle ponawiał łączenie się z pokojem czatowym:


```js {6}
  useEffect(() => {
    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // 🔴 Problem: Ta zależność zmienia się z każdym renderowaniem
  // ...
```

Aby to rozwiązać, możesz opakować funkcję wywoływaną z efektu za pomocą `useCallback`:

```js {4-9,16}
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  const createOptions = useCallback(() => {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };
  }, [roomId]); // ✅ Zmienia się tylko wtedy, gdy zmienia się roomId

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // ✅ Zmienia się tylko wtedy, gdy zmienia się createOptions
  // ...
```

Taka zmiana zapewnia, że funkcja `createOptions` pozostaje taka sama między renderowaniami, jeśli `roomId` jest taki sam. **Jednakże jeszcze lepiej jest usunąć potrzebę używania funkcji jako zależności.** Przenieś swoją funkcję do *wnętrza* efektu:

```js {5-10,16}
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    function createOptions() { // ✅ Nie ma potrzeby użycia useCallback ani zależności od funkcji!
      return {
        serverUrl: 'https://localhost:1234',
        roomId: roomId
      };
    }

    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ Zmienia się tylko wtedy, gdy zmienia się roomId
  // ...
```

Teraz twój kod jest prostszy i nie wymaga użycia `useCallback`. [Dowiedz się więcej o usuwaniu zależności efektu.](/learn/removing-effect-dependencies#move-dynamic-objects-and-functions-inside-your-effect)

---

### Optymalizacja własnego hooka {/*optimizing-a-custom-hook*/}

Jeśli piszesz [własny hook,](/learn/reusing-logic-with-custom-hooks) zaleca się, aby owijać dowolne funkcje, które zwraca, za pomocą `useCallback`:

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

To zapewnia, że konsumenci twojego hooka mogą zoptymalizować swój własny kod, gdy jest to potrzebne.

---

## Znane problemy {/*troubleshooting*/}

### Za każdym razem, gdy mój komponent renderuje się, `useCallback` zwraca inną funkcję {/*every-time-my-component-renders-usecallback-returns-a-different-function*/}

Upewnij się, że podajesz tablicę zależności jako drugi argument!

Jeśli zapomnisz o tablicy zależności, `useCallback` będzie zwracać nową funkcję za każdym razem:

```js {7}
function ProductPage({ productId, referrer }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }); // 🔴 Zwraca nową funkcję za każdym razem: brak tablicy zależności
  // ...
```

To jest poprawiona wersja, w której przekazujesz tablicę zależności jako drugi argument:

```js {7}
function ProductPage({ productId, referrer }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]); // ✅ Nie zwraca niepotrzebnie nowej funkcji
  // ...
```

Jeśli to nie pomaga, problem może wynikać z tego, że przynajmniej jedna z twoich zależności zmieniła się od poprzedniego renderowania. Możesz rozwiązać ten problem dodając ręcznie logowanie twoich zależności do konsoli:

```js {5}
  const handleSubmit = useCallback((orderDetails) => {
    // ..
  }, [productId, referrer]);

  console.log([productId, referrer]);
```

Następnie w konsoli kliknij prawym przyciskiem myszy na tablicach z różnych przerenderowań i wybierz "Zachowaj jako zmienną globalną" (ang. *Save as global variable*) dla obu z nich. Zakładając, że pierwsza została zapisana jako `temp1`, a druga jako `temp2`, możesz następnie użyć konsoli przeglądarki, aby sprawdzić, czy każda zależność w obu tablicach jest taka sama:

```js
Object.is(temp1[0], temp2[0]); // Czy pierwsza zależność jest taka sama między tablicami?
Object.is(temp1[1], temp2[1]); // Czy druga zależność jest taka sama między tablicami?
Object.is(temp1[2], temp2[2]); // ... i tak dalej dla każdej zależności ...
```

Kiedy znajdziesz zależność psującą memoizację, znajdź sposób, aby ją usunąć albo [również ją zapamiętaj.](/reference/react/useMemo#memoizing-a-dependency-of-another-hook)

---

### Muszę użyć `useCallback` dla każdego elementu listy w pętli, ale nie jest to dozwolone {/*i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed*/}

Załóżmy, że komponent `Chart` jest owinięty w [`memo`](/reference/react/memo). Chcesz uniknąć przerenderowania każdego komponentu `Chart` na liście, gdy komponent `ReportList` zostanie ponownie przerenderowany. Jednak nie możesz wywołać `useCallback` w pętli:

```js {expectedErrors: {'react-compiler': [6]}} {5-14}
function ReportList({ items }) {
  return (
    <article>
      {items.map(item => {
        // 🔴 Nie możesz wywołać useCallback w pętli w ten sposób:
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

Zamiast tego wyodrębnij komponent dla pojedynczego elementu i umieść w nim `useCallback`:

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
  // ✅ Wywołaj useCallback na najwyższym poziomie:
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

Ewentualnie możesz usunąć `useCallback` z ostatniego fragmentu kodu i zamiast tego owinąć sam komponent `Report` w [`memo`.](/reference/react/memo) Jeśli właściwość `item` się nie zmienia, komponent `Report` pominie przerenderowanie, a zatem komponent `Chart` również pominie przerenderowanie:

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
