---
id: react-api
title: Główne API Reacta
layout: docs
category: Reference
permalink: docs/react-api.html
redirect_from:
  - "docs/reference.html"
  - "docs/clone-with-props.html"
  - "docs/top-level-api.html"
  - "docs/top-level-api-ja-JP.html"
  - "docs/top-level-api-ko-KR.html"
  - "docs/top-level-api-zh-CN.html"
---

Obiekt `React` jest punktem wejściowym do biblioteki React. Jeśli załadujesz ją używając tagu `<script>`, główny interfejs API będzie dostępny w zmiennej globalnej `React`. Jeśli używasz standardu ES6, możesz skorzystać ze składni `import React from 'react'`. Jeśli używasz starszego standardu ES5, użyj składni `var React = require('react')`.

## Ogólne informacje {#overview}

### Komponenty {#components}

Komponenty reaktowe pozwalają podzielić interfejs użytkownika na niezależne, enkapsulowane elementy, z których możesz korzystać w wielu miejscach. Komponenty w Reakcie mogą być definiowane poprzez dziedziczenie po klasie `React.Component` lub `React.PureComponent`.

 - [`React.Component`](#reactcomponent)
 - [`React.PureComponent`](#reactpurecomponent)

Jeśli nie używasz standardu ES6 do definiowania klas, możesz skorzystać z modułu `create-react-class`. W innym rozdziale opisaliśmy sposób na [korzystanie z Reacta bez ES6](/docs/react-without-es6.html).

Komponenty reactowe można również zdefiniować jako funkcje, a następnie otoczyć:

- [`React.memo`](#reactmemo)

### Tworzenie elementów reactowych {#creating-react-elements}

Do opisania wyglądu interfejsu użytkownika polecamy [korzystanie ze składni JSX](/docs/introducing-jsx.html). W JSX elementy są tylko wygodniejszymi odpowiednikami wywołania metody [`React.createElement()`](#createelement). Jeśli korzystasz z JSX, prawdopodobnie nigdy nie przyjdzie ci korzystać z tych metody bezpośrednio.

- [`createElement()`](#createelement)
- [`createFactory()`](#createfactory)

Aby dowiedzieć się więcej na ten temat, zajrzyj do rozdziału pt. ["React bez JSX"](/docs/react-without-jsx.html).

### Przekształcanie elementów {#transforming-elements}

`React` udostępnia kilka API do manipulowania elementami:

- [`cloneElement()`](#cloneelement)
- [`isValidElement()`](#isvalidelement)
- [`React.Children`](#reactchildren)

### Fragmenty {#fragments}

`React` pozwala także renderować wiele komponentów bez konieczności używania komponentu opakowującego.

- [`React.Fragment`](#reactfragment)

### Referencje (ang. *refs*) {#refs}

- [`React.createRef`](#reactcreateref)
- [`React.forwardRef`](#reactforwardref)

### Suspense {#suspense}

`Suspense` pozwala komponentowi "poczekać" na konkretne zdarzenie przez wyrenderowaniem. Obecnie `Suspense` obsługuje tylko jeden przypadek użycia: [dynamiczne ładowanie komponentów przy użyciu `React.lazy`](/docs/code-splitting.html#reactlazy). W przyszłości będzie wspierał także inne przypadki użycia, jak na przykład pobieranie danych.

- [`React.lazy`](#reactlazy)
- [`React.Suspense`](#reactsuspense)

### Tranzycje {#transitions}

*Tranzycje* są nową funkcjonalnością współbieżną dodaną w Reakcie 18. Pozwalają oznaczyć aktualizacje stanu jako tranzycje, informując tym samym Reacta, że mogą one zostać przerwane i nie wymagają wyświetlenia komponentu zastępczego Suspense dla widocznej już treści.

- [`React.startTransition`](#starttransition)
- [`React.useTransition`](/docs/hooks-reference.html#usetransition)

### Hooki {#hooks}

*Hooki* są nowym dodatkiem w Reakcie 16.8. Pozwalają one używać stanu i innych funkcjonalności Reacta bez użycia klas. Hooki mają [dedykowany rozdział w dokumentacji](/docs/hooks-intro.html) oraz osobny interfejs API:

- [Podstawowe hooki](/docs/hooks-reference.html#basic-hooks)
  - [`useState`](/docs/hooks-reference.html#usestate)
  - [`useEffect`](/docs/hooks-reference.html#useeffect)
  - [`useContext`](/docs/hooks-reference.html#usecontext)
- [Dodatkowe hooki](/docs/hooks-reference.html#additional-hooks)
  - [`useReducer`](/docs/hooks-reference.html#usereducer)
  - [`useCallback`](/docs/hooks-reference.html#usecallback)
  - [`useMemo`](/docs/hooks-reference.html#usememo)
  - [`useRef`](/docs/hooks-reference.html#useref)
  - [`useImperativeHandle`](/docs/hooks-reference.html#useimperativehandle)
  - [`useLayoutEffect`](/docs/hooks-reference.html#uselayouteffect)
  - [`useDebugValue`](/docs/hooks-reference.html#usedebugvalue)
  - [`useDeferredValue`](/docs/hooks-reference.html#usedeferredvalue)
  - [`useTransition`](/docs/hooks-reference.html#usetransition)
  - [`useId`](/docs/hooks-reference.html#useid)
- [Library Hooks](/docs/hooks-reference.html#library-hooks)
  - [`useSyncExternalStore`](/docs/hooks-reference.html#usesyncexternalstore)
  - [`useInsertionEffect`](/docs/hooks-reference.html#useinsertioneffect)

* * *

## Dokumentacja {#reference}

### `React.Component` {#reactcomponent}

<<<<<<< HEAD
`React.Component` to klasa bazowa dla komponentów reaktowych, definiowanych przez użycie [klasy ze standardu ES6](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes):
=======
> Try the new React documentation for [`Component`](https://beta.reactjs.org/reference/react/Component).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.Component` is the base class for React components when they are defined using [ES6 classes](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes):
>>>>>>> 19aa5b4852c3905757edb16dd62f7e7506231210

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Witaj, {this.props.name}</h1>;
  }
}
```

Lista metod i właściwości związanych z klasą `React.Component` znajduje się w [dokumentacji API dla React.Component](/docs/react-component.html).

* * *

### `React.PureComponent` {#reactpurecomponent}

<<<<<<< HEAD
Klasa `React.PureComponent` jest podobna do [`React.Component`](#reactcomponent). Różnica między nimi jest taka, że [`React.Component`](#reactcomponent) nie posiada implementacji metody [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate), natomiast `React.PureComponent` implementuje ją z użyciem płytkiego porównania właściwości (*ang. props*) i stanu.
=======
> Try the new React documentation for [`PureComponent`](https://beta.reactjs.org/reference/react/PureComponent).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.PureComponent` is similar to [`React.Component`](#reactcomponent). The difference between them is that [`React.Component`](#reactcomponent) doesn't implement [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate), but `React.PureComponent` implements it with a shallow prop and state comparison.
>>>>>>> 19aa5b4852c3905757edb16dd62f7e7506231210

Jeśli metoda `render()` danego komponentu wyświetla ten sam rezultat przy tych samych właściwościach i stanie, możesz przekształcić go na `React.PureComponent`, by poprawić wydajność.

> Uwaga
>
> Metoda `shouldComponentUpdate()` klasy `React.PureComponent` wykonuje jedynie płytkie porównanie obiektów. Jeśli zawierają one skomplikowaną strukturę danych, może to wprowadzić nieprawidłowości podczas zmian na głębszych poziomach struktury. Korzystaj z `PureComponent` tylko, jeśli spodziewasz się prostej struktury właściwości i stanu, lub użyj [`forceUpdate()`](/docs/react-component.html#forceupdate), jeśli wiesz, że dane umieszczone głęboko w strukturze uległy zmianie. Możesz także zastanowić się nad skorzystaniem z [niezmiennych obiektów (ang. *immutable objects*)](https://immutable-js.com/), by ułatwić szybkie porównanie zagnieżdżonych danych.
>
> Dodatkowo, `shouldComponentUpdate()` klasy `React.PureComponent` pomija aktualizację właściwości dla całego poddrzewa komponentu. Upewnij się, że wszystkie komponenty potomne również korzystają z tego rozwiązania.

* * *

### `React.memo` {#reactmemo}

> Try the new React documentation for [`memo`](https://beta.reactjs.org/reference/react/memo).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
const MyComponent = React.memo(function MyComponent(props) {
  /* renderuj korzystając z właściwości */
});
```

`React.memo` jest [komponentem wyższego rzędu (ang. *higher-order component*)](/docs/higher-order-components.html).

Jeśli twój komponent przy takich samych właściwościach zawsze renderuje tę samą strukturę, możesz opakować go w `React.memo` w celu poprawy wydajności. Oznacza to, że React pominie renderowanie tego komponentu i użyje jego ostatnio wyrenderowanej wersji.

`React.memo` reaguje tylko na zmiany we właściwościach. Jeśli twój komponent funkcyjny opakowany w `React.memo` używa hooków [`useState`](/docs/hooks-state.html), [`useReducer`](/docs/hooks-reference.html#usereducer) lub [`useContext`](/docs/hooks-reference.html#usecontext), nadal będzie się aktualizował przy zmianie stanu komponentu lub kontekstu.

Domyślnie, komponent wykona jedynie płytkie porównanie obiektów przekazanych we właściwościach. Jeśli chcesz zastosować własny mechanizm porównujący, możesz przekazać odpowiednią funkcję jako drugi argument.

```javascript
function MyComponent(props) {
  /* renderuj korzystając z właściwości */
}
function areEqual(prevProps, nextProps) {
  /*
  zwróć true, jeśli przekazując nextProps, komponent zwróciłby
  taki sam rezultat, jak po przekazaniu prevProps;
  w innym przypadku zwróć false
  */
}
export default React.memo(MyComponent, areEqual);
```

Ta metoda wykorzystywana jest jedynie do **[optymalizacji wydajności](/docs/optimizing-performance.html).** Nie powinno się używać jej do "zapobiegania" renderowaniu, ponieważ może to doprowadzić do większej ilości błędów.

> Uwaga
>
> W odróżnieniu od metody [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) w komponencie klasowym, funkcja `areEqual` zwraca `true`, jeśli właściwości są jednakowe, lub `false`, jeśli nie są. Jest to odwrócona logika metody `shouldComponentUpdate`.

* * *

### `createElement()` {#createelement}

> Try the new React documentation for [`createElement`](https://beta.reactjs.org/reference/react/createElement).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```

Tworzy i zwraca nowy [element reactowy](/docs/rendering-elements.html) danego typu. Argument `type` może być zarówno nazwą znacznika HTML (np. `'div'` lub `'span'`), [komponentem reaktowym](/docs/components-and-props.html) (klasą lub funkcją), jak i [fragmentem reaktowym](#reactfragment).

Kod pisany w [JSX](/docs/introducing-jsx.html) jest konwertowany do wywołań funkcji `React.createElement()`. Jeśli korzystasz z JSX, w większości przypadków nie będziesz bezpośrednio wywoływać `React.createElement()`. Przeczytaj rozdział pt. ["React bez JSX"](/docs/react-without-jsx.html), aby dowiedzieć się więcej.

* * *

### `cloneElement()` {#cloneelement}

> Try the new React documentation for [`cloneElement`](https://beta.reactjs.org/reference/react/cloneElement).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```
React.cloneElement(
  element,
  [config],
  [...children]
)
```

Zacznij od sklonowania i zwrócenia elementu reactowego przy pomocy argumentu `element`. `config` powinien zawierać wszystkie nowe właściwości, `key` lub `ref`. Nowo utworzony element będzie posiadał pierwotne właściwości scalone płytko z nowymi. Nowe elementy potomne zastąpią obecne. `key` oraz `ref` z pierwotnego elementu zostaną zachowane, jeśli nie przekażesz ich w `config`.

Wywołanie `React.cloneElement()` jest niemal równoznaczne z napisaniem:

```js
<element.type {...element.props} {...props}>{children}</element.type>
```

Jednakże zachowuje on także wszystkie referencje `ref`. Oznacza to, że jeśli jeden z komponentów potomnych posiada `ref`, nie zostanie on przypadkowo zabrany z jednego z przodków. Nowy element będzie posiadał ten sam `ref` co przed klonowaniem. Nowy `ref` lub `key` zastąpią poprzednie, jeśli je przekażesz.

Powyższy interfejs API zastąpił przestarzałą funkcję `React.addons.cloneWithProps()`.

* * *

### `createFactory()` {#createfactory}

> Try the new React documentation for [`createFactory`](https://beta.reactjs.org/reference/react/createFactory).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
React.createFactory(type)
```

Zwraca funkcję, która tworzy reaktowy element danego typu. Tak jak [`React.createElement()`](#createElement), argument `type` może być zarówno nazwą znacznika HTML (np. `'div'` lub `'span'`), [komponentem reactowym](/docs/components-and-props.html) (klasą lub funkcją) lub [fragmentem reactowym](#reactfragment).

Ta funkcja pomocnicza jest uznawana za przestarzałą i radzimy korzystać z JSX lub bezpośrednio z `React.createElement()`.

Jeśli korzystasz z JSX, nie ma potrzeby korzystania z `React.createFactory()`. Przeczytaj rozdział pt. [React bez JSX](/docs/react-without-jsx.html), aby dowiedzieć się więcej.

* * *

### `isValidElement()` {#isvalidelement}

> Try the new React documentation for [`isValidElement`](https://beta.reactjs.org/reference/react/isValidElement).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
React.isValidElement(object)
```

Weryfikuje, czy obiekt jest elementem reactowym. Zwraca `true` lub `false`.

* * *

### `React.Children` {#reactchildren}

<<<<<<< HEAD
`React.Children` udostępnia narzędzia do obsługi struktury danych przekazanej w `this.props.children`.
=======
> Try the new React documentation for [`Children`](https://beta.reactjs.org/reference/react/Children).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.Children` provides utilities for dealing with the `this.props.children` opaque data structure.
>>>>>>> 19aa5b4852c3905757edb16dd62f7e7506231210

#### `React.Children.map` {#reactchildrenmap}

```javascript
React.Children.map(children, function[(thisArg)])
```

Wywołuje funkcję na każdym bezpośrednim komponencie potomnych zawartym w `children`, z `this` ustawionym na `thisArg`. Jeśli `children` jest tablicą, funkcja zostanie wywołana na każdym elemencie tej tablicy. Jeśli potomek jest wartością `null` lub `undefined`, metoda ta zamiast tablicy zwróci `null` lub `undefined`

> Uwaga
>
> Jeśli `children` jest typu `Fragment`, zostanie potraktowany jako pojedynczy potomek, nie jak tablica.

#### `React.Children.forEach` {#reactchildrenforeach}

```javascript
React.Children.forEach(children, function[(thisArg)])
```

Działa tak samo jak [`React.Children.map()`](#reactchildrenmap), ale nie zwraca tablicy.

#### `React.Children.count` {#reactchildrencount}

```javascript
React.Children.count(children)
```

Zwraca liczbę komponentów w `children`, równą liczbie potencjalnych wywołań funkcji zwrotnej (ang. *callback*) przekazanej do `map` lub `forEach`.

#### `React.Children.only` {#reactchildrenonly}

```javascript
React.Children.only(children)
```

Weryfikuje, czy `children` ma tylko jednego potomka (element reactowy), i zwraca go. W innym przypadku metoda rzuci wyjątkiem.

> Uwaga:
>
>`React.Children.only()` nie akceptuje wartości zwracanej przez [`React.Children.map()`](#reactchildrenmap), ponieważ jest to tablica, a nie element reactowy.

#### `React.Children.toArray` {#reactchildrentoarray}

```javascript
React.Children.toArray(children)
```

Zwraca strukturę z `children` jako płaską tablicę, z kluczem przypisanym do każdego z potomków. Przydatne, jeśli chcemy manipulować grupą potomków w metodzie renderującej, zwłaszcza jeśli chcemy zmienić ich kolejność lub podzielić przed przekazaniem dalej.

> Uwaga:
>
> `React.Children.toArray()` zmienia klucze, by zachować semantyczną poprawność zagłębionych tablic podczas przygotowywania płaskiej struktury. Oznacza to, że `toArray` doda prefiks do nazwy każdego klucza, tak by każdy element należał do odpowiedniego zakresu.

* * *

### `React.Fragment` {#reactfragment}

<<<<<<< HEAD
Komponent `React.Fragment` pozwala zwrócić wiele elementów w metodzie `render()` bez opakowywania ich w dodatkowy element DOM:
=======
> Try the new React documentation for [`Fragment`](https://beta.reactjs.org/reference/react/Fragment).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

The `React.Fragment` component lets you return multiple elements in a `render()` method without creating an additional DOM element:
>>>>>>> 19aa5b4852c3905757edb16dd62f7e7506231210

```javascript
render() {
  return (
    <React.Fragment>
      Jakiś tekst.
      <h2>Nagłówek</h2>
    </React.Fragment>
  );
}
```

Możesz także skorzystać ze skróconego zapisu `<></>`. Po więcej informacji zajrzyj do wpisu na blogu - [React v16.2.0: Improved Support for Fragments](/blog/2017/11/28/react-v16.2.0-fragment-support.html).


### `React.createRef` {#reactcreateref}

<<<<<<< HEAD
`React.createRef` tworzy [referencję](/docs/refs-and-the-dom.html), którą możesz przypiąć do dowolnego elementu reactowego poprzez właściwość `ref`.
=======
> Try the new React documentation for [`createRef`](https://beta.reactjs.org/reference/react/createRef).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.createRef` creates a [ref](/docs/refs-and-the-dom.html) that can be attached to React elements via the ref attribute.
>>>>>>> 19aa5b4852c3905757edb16dd62f7e7506231210
`embed:16-3-release-blog-post/create-ref-example.js`

### `React.forwardRef` {#reactforwardref}

<<<<<<< HEAD
`React.forwardRef` tworzy komponent reactowy, który przekazuje właściwość [`ref`](/docs/refs-and-the-dom.html) do kolejnego komponentu w dół drzewa. Ta technika nie jest zbyt popularna, ale przydatna w dwóch konkretnych przypadkach:
=======
> Try the new React documentation for [`forwardRef`](https://beta.reactjs.org/reference/react/forwardRef).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.forwardRef` creates a React component that forwards the [ref](/docs/refs-and-the-dom.html) attribute it receives to another component below in the tree. This technique is not very common but is particularly useful in two scenarios:
>>>>>>> 19aa5b4852c3905757edb16dd62f7e7506231210

* [Przekazywanie referencji do komponentów DOM](/docs/forwarding-refs.html#forwarding-refs-to-dom-components)
* [Przekazywanie referencji w komponentach wyższego rzędu](/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components)

`React.forwardRef` przyjmuje funkcję renderującą jako argument. React wywoła tę funkcję, przekazując `props` oraz `ref` jako argumenty. Funkcja ta powinna zwrócić węzeł reactowy (ang. *React node*).

`embed:reference-react-forward-ref.js`

W powyższym przykładzie React przekazuje `ref` poprzez `<FancyButton ref={ref}>` jako drugi argument funkcji renderującej wewnątrz `React.forwardRef`. Funkcja renderująca przekaże `ref` do elementu `<button ref={ref}>`.

W rezultacie, po tym, jak referencja zostanie przypięta przez Reacta, `ref.current` będzie wskazywał bezpośrednio na element `<button>`.

Aby dowiedzieć się więcej, przeczytaj rozdział poświęcony [przekazywaniu referencji](/docs/forwarding-refs.html).

### `React.lazy` {#reactlazy}

<<<<<<< HEAD
`React.lazy()` pozwala definiować komponenty, które są ładowane dynamicznie. Zmniejsza się w ten sposób rozmiar paczki, ponieważ wyodrębnione zostają komponenty, które nie są używane podczas wstępnego renderowania.
=======
> Try the new React documentation for [`lazy`](https://beta.reactjs.org/reference/react/lazy).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.lazy()` lets you define a component that is loaded dynamically. This helps reduce the bundle size to delay loading components that aren't used during the initial render.
>>>>>>> 19aa5b4852c3905757edb16dd62f7e7506231210

W naszej [dokumentacji poświęconej rozdzielaniu kodu](/docs/code-splitting.html#reactlazy) zamieściliśmy więcej informacji na ten temat. [Ten artykuł](https://medium.com/@pomber/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d) również może okazać się pomocny w wyjaśnieniu zasad działania tej metody.

```js
// Ten komponent jest ładowany dynamicznie
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

Pamiętaj, że renderowanie "leniwych komponentów" (ang. *lazy components*) wymaga użycia komponentu `<React.Suspense>` na wyższym poziomie drzewa. W ten sposób definiuje się wskaźnik ładowania.

### `React.Suspense` {#reactsuspense}

<<<<<<< HEAD
`React.Suspense` pozwala zdefiniować wskaźnik ładowania, w razie gdyby któryś z komponentów poniżej nie był jeszcze gotowy do wyrenderowania. W przyszłości planujemy dodanie do `Suspense` obsługi większej liczby scenariuszy, jak np. pobieranie danych. Możesz poczytać o tym więcej w [naszym planie działania](/blog/2018/11/27/react-16-roadmap.html).
=======
> Try the new React documentation for [`Suspense`](https://beta.reactjs.org/reference/react/Suspense).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.Suspense` lets you specify the loading indicator in case some components in the tree below it are not yet ready to render. In the future we plan to let `Suspense` handle more scenarios such as data fetching. You can read about this in [our roadmap](/blog/2018/11/27/react-16-roadmap.html).
>>>>>>> 19aa5b4852c3905757edb16dd62f7e7506231210

Obecnie **jedynym** przypadkiem użycia `<React.Suspense>` jest dynamiczne ładowanie komponentów.

```js
// Ten komponent jest ładowany dynamicznie
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // Wyświetla <Spinner> dopóki OtherComponent nie zostanie załadowany
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

W naszej [dokumentacji poświęconej rozdzielaniu kodu](/docs/code-splitting.html#reactlazy) zamieściliśmy więcej informacji na ten temat. Zwróć uwagę na to, że komponenty `lazy` mogą być zawarte w drzewie wiele poziomów poniżej `Suspense`. Dobrą praktyką jest umieszczanie `<Suspense>` w miejscu, w którym powinien pojawić się wskaźnik ładowania, natomiast `lazy()` w miejscu, w którym chcesz rozdzielić kod.

> Uwaga
>
> Jeśli jakaś treść jest już wyświetlona na ekranie, przełączenie na wskaźnik aktywności może być dezorientujące dla użytkownika. Czasami lepiej jest wyświetlić "stary" interfejs, podczas gdy nowy jest jeszcze przygotowywany. Aby to zrobić, możesz użyć nowego API [`startTransition`](#starttransition) oraz [`useTransition`](/docs/hooks-reference.html#usetransition), oznaczając w ten sposób niektóre aktualizacje jako "tranzycje" i unikając niepotrzebnego mrugania ekranu.

#### `React.Suspense` w renderowaniu po stronie serwera {#reactsuspense-in-server-side-rendering}
Podczas renderowania po stronie serwera granice zawieszenia (ang. *Suspense boundaries*) pozwalają wysłać aplikację w mniejszych kawałkach poprzez zawieszanie (ang. *suspending*) komponentów.
Kiedy komponent jest zawieszony, React każe najbliższej granicy Suspense wyrenderować swój komponent zastępczy. Jeśli komponent się odwiesi przed wysłaniem kodu do klienta, komponent zastępczy jest wyrzucany, a w jego miejsce trafia właściwa zawartość.

<<<<<<< HEAD
#### `React.Suspense` podczas hydratacji {#reactsuspense-during-hydration}
Granice zawieszenia (ang. *Suspense boundaries*) są zależne od tego, czy ich granice nadrzędne ulegną hydratacji przed nimi, lecz nie muszą czekać na swoje "rodzeństwo", czyli granice na tym samym poziomie. W przypadku wystąpienia jakiegoś zdarzenia na którejś z granic przed jej całkowitą hydratacją, otrzyma ona wyższy priorytet niż pozostałe. [Czytaj więcej.](https://github.com/reactwg/react-18/discussions/130)
=======
#### `React.Suspense` during hydration {#reactsuspense-during-hydration}
Suspense boundaries depend on their parent boundaries being hydrated before they can hydrate, but they can hydrate independently from sibling boundaries. Events on a boundary before it is hydrated will cause the boundary to hydrate at a higher priority than neighboring boundaries. [Read more](https://github.com/reactwg/react-18/discussions/130)
>>>>>>> 19aa5b4852c3905757edb16dd62f7e7506231210

### `React.startTransition` {#starttransition}

> Try the new React documentation for [`startTransition`](https://beta.reactjs.org/reference/react/startTransition).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```js
React.startTransition(callback)
```
`React.startTransition` pozwala oznaczyć aktualizacje stanu wewnątrz jakiejś funkcji jako "tranzycję". Tej funkcji należy używać w miejscach, gdzie nie można skorzystać z [`React.useTransition`](/docs/hooks-reference.html#usetransition).

> Uwaga:
>
> Aktualizacje w tranzycjach ustępują pierwszeństwa bardziej pilnym aktualizacjom, jak np. kliknięciom na ekranie.
>
> Aktualizacje w tranzycji nie powodują wyświetlenia komponentu zastępczego (ang. *fallback*) przy ponownym zawieszeniu, dzięki czemu użytkownik może kontynuować interację ze "starym" interfejsem, dopóki nie zakończy się tranzycja.
>
> `React.startTransition` nie zwraca flagi `isPending`. Aby śledzić status tranzycji, użyj hooka [`React.useTransition`](/docs/hooks-reference.html#usetransition).
