---
id: react-api
title: API Reacta
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

`React` jest podstawowym elementem biblioteki reaktowej. Jeśli załadujesz go używając tagu `<script>`, główne API `Reacta` będą dostępne globalnie. Jeśli używasz standardu ES6, możesz korzystać ze składni `import React from 'react'`. Jeśli używasz starszego standardu ES5, powinieneś użyć składni `var React = require('react')`.

## Przegląd {#overview}

### Komponenty {#components}

Komponenty reaktowe pozwalają podzielić interfejs użytkownika na niezależne, enkapsulowane elementy, z których możesz korzystać w wielu miejscach. Komponenty w Reakcie mogą być definiowane dziedziczeniem po klasie `React.Component` lub `React.PureComponent`.

 - [`React.Component`](#reactcomponent)
 - [`React.PureComponent`](#reactpurecomponent)

Jeśli nie korzystasz z klas ES6, możesz skorzystać z modułu `create-react-class`. O korzystaniu z Reacta bez ES6, możesz [przeczytać tutaj](/docs/react-without-es6.html).

Komponenty reaktowe mogą być też definiowane jako funkcje, które mogą być otaczane:

- [`React.memo`](#reactmemo)

### Tworzenie elementów reaktowych {#creating-react-elements}

Polecamy [korzystanie z JSX](/docs/introducing-jsx.html), by opisać wygląd elementów interfejsu użytkownika. Każdy element JSX-owy to wygodniejsza reprezentacja wywołania metody [`React.createElement()`](#createelement). Jeśli korzystasz z JSX, prawdopodobnie nie będziesz musiał korzystać z tej metody.

- [`createElement()`](#createelement)
- [`createFactory()`](#createfactory)

Po więcej informacji zobacz [React bez JSX](/docs/react-without-jsx.html).

### Przekształcanie elementów {#transforming-elements}

`React` udostępnia kilka różnych API do manipulowania elementami:

- [`cloneElement()`](#cloneelement)
- [`isValidElement()`](#isvalidelement)
- [`React.Children`](#reactchildren)

### Fragmenty {#fragments}

`React` pozwala także renderować wiele komponentów, bez komponentu otaczającego przy użyciu:

- [`React.Fragment`](#reactfragment)

### Odniesienia *(ang. Refs)* {#refs}

- [`React.createRef`](#reactcreateref)
- [`React.forwardRef`](#reactforwardref)

### Suspens *(ang. Suspense)* {#suspense}

`Suspense` pozwala komponentowi poczekać na konkretne zdarzenie przez wyrenderowaniem się. W tej chwili `Suspense` wspiera jedynie jeden przypadek użycia: [dynamiczne ładowanie komponentów przy użyciu `React.lazy`](/docs/code-splitting.html#reactlazy). W przyszłości będzie wspierał także inne przypadki użycia jak na przykład pobieranie danych zewnętrznych.

- [`React.lazy`](#reactlazy)
- [`React.Suspense`](#reactsuspense)

### Hooki {#hooks}

*Hooki* są nowym dodatkiem do Reacta 16.8. Pozwalają Ci na korzystanie ze stanu oraz innych cech Reacta bez używania klas. Hooki mają [dedykowany rozdział w dokumentacji](/docs/hooks-intro.html) oraz osobne API:

- [Podstawowe Hooki](/docs/hooks-reference.html#basic-hooks)
  - [`useState`](/docs/hooks-reference.html#usestate)
  - [`useEffect`](/docs/hooks-reference.html#useeffect)
  - [`useContext`](/docs/hooks-reference.html#usecontext)
- [Dodatkowe Hooki](/docs/hooks-reference.html#additional-hooks)
  - [`useReducer`](/docs/hooks-reference.html#usereducer)
  - [`useCallback`](/docs/hooks-reference.html#usecallback)
  - [`useMemo`](/docs/hooks-reference.html#usememo)
  - [`useRef`](/docs/hooks-reference.html#useref)
  - [`useImperativeHandle`](/docs/hooks-reference.html#useimperativehandle)
  - [`useLayoutEffect`](/docs/hooks-reference.html#uselayouteffect)
  - [`useDebugValue`](/docs/hooks-reference.html#usedebugvalue)

* * *

## Odwołania {#reference}

### `React.Component` {#reactcomponent}

`React.Component` to podstawowy rodzaj komponentu reaktowego zdefiniowanego przez [klasy ES6](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes):

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Witaj, {this.props.name}</h1>;
  }
}
```

Zobacz listę metod i atrybutów w odniesieniu do `React.Component` w [API React.Component](/docs/react-component.html).

* * *

### `React.PureComponent` {#reactpurecomponent}

`React.PureComponent` jest podobny do [`React.Component`](#reactcomponent). Różnica między nimi jest taka, że [`React.Component`](#reactcomponent) nie implementuje automatycznie [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate), natomiast `React.PureComponent` implementuje go z płytkim porównaniem atrybutów i stanu.

Jeśli metoda `render()` danego komponentu renderuje ten sam rezultat przy tych samych atrybutach i stanie, możesz przekształcić go na `React.PureComponent`, by poprawić wydajność.

> Uwaga
>
> Metoda `shouldComponentUpdate()` klasy `React.PureComponent` wykonuje jedynie płytkie porównanie obiektów. Jeśli zawierają one skomplikowaną strukturę danych, może to wprowadzić nieprawidłowości podczas zmian na głębszych poziomach struktury. Korzystaj z `PureComponent` tylko, jeśli spodziewasz się prostej struktury atrybutów i stanu, lub użyj [`forceUpdate()`](/docs/react-component.html#forceupdate), jeśli wiesz, że dane umieszczone w strukturze głęboko uległy zmianie. Możesz także zastanowić się nad skorzystaniem z [niezmiennych obiektów (ang. immutable objects)](https://facebook.github.io/immutable-js/), by ułatwić szybkie porównanie zagnieżdżonych danych.
>
> Dodatkowo, `shouldComponentUpdate()` klasy `React.PureComponent` pomija aktualizację atrybutów dla całego poddrzewa komponentu. Upewnij się, że wszystkie dzieci również korzystają z tego rozwiązania.

* * *

### `React.memo` {#reactmemo}

```javascript
const MyComponent = React.memo(function MyComponent(props) {
  /* renderuj korzystając z atrybutów */
});
```

`React.memo` jest [komponentem wyższego rzędu](/docs/higher-order-components.html). Jego działanie jest podobne do [`React.PureComponent`](reactpurecomponent), jednak stosowany jest tylko do komponentów funkcyjnych.

Jeśli twój komponent funkcyjny renderuje ten sam rezultat, dostając te same atrybuty, możesz opakować go w `React.memo` by poprawić wydajność. Oznacza to, że React pominie renderowanie tego komponentu i użyje jego ostatnio zrenderowaną wersję.

Domyślnie, komponent wykona jedynie płytkie porównanie obiektów w atrybutach. Jeśli chcesz kontrolować renderowanie komponentu, możesz dostarczyć własną funkcję do porównywania jako drugi argument.

```javascript
function MyComponent(props) {
  /* renderuj korzystając z atrybutów */
}
function areEqual(prevProps, nextProps) {
  /*
  zwróć true jeśli przekazując nextProps do rendera zwróciłoby
  taki sam rezultat jak podczas przekazania prevProps,
  w innym przypadku zwróć false
  */
}
export default React.memo(MyComponent, areEqual);
```

Ta metoda wykorzystywana jest jedynie do **[optymalizacji wydajnośći](/docs/optimizing-performance.html).** Nie powinieneś polegać na niej do "zapobiegania" renderowaniu. Może to jedynie doprowadzić do większej ilości błędów.

> Uwaga
>
> W odróżnieniu od metody [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) w komponencie klasowym, funkcja `areEqual` zwraca `true` jeśli atrybuty są jednakowe lub `false` jeśli nie są. Jest to odwrócona logika metody `shouldComponentUpdate`.
* * *

### `createElement()` {#createelement}

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```

Tworzy i zwraca nowy [element reaktowy](/docs/rendering-elements.html) danego typu. Argument `type` może być zarówno nazwą tagu HTML-owego (np. `'div'` lub `'span'`), typem [komponentu reaktowego](/docs/components-and-props.html) (klasa lub funkcja) jak i typem [fragmentu reaktowego](#reactfragment).

Kod pisany w [JSX](/docs/introducing-jsx.html) jest konwertowany do `React.createElement()`. Jeśli korzystasz z JSX, w większości przypadków nie będziesz bezpośrednio wywoływał `React.createElement()`. Zobacz [React bez JSX](/docs/react-without-jsx.html), by dowiedzieć się więcej.

* * *

### `cloneElement()` {#cloneelement}

```
React.cloneElement(
  element,
  [props],
  [...children]
)
```

Zacznij od sklonowania i zwrócenia elementu reaktowego, przy pomocy `element`. Nowo utworzony element będzie posiadał początkowe atrybuty połączone płytkim porównaniem z nowymi atrybutami. Nowe dzieci zastąpią obecne. `key` oraz `ref` z oryginalnego elementu zostaną zachowane.

`React.cloneElement()` jest niemal identyczny z:

```js
<element.type {...element.props} {...props}>{children}</element.type>
```

Jednakże zachowuje on także wszystkie `ref`. Oznacza to, że jeśli jedno z dzieci posiada `ref`, nie zostanie ono przypadkowo zabrane z jednego z przodków. Nowy element będzie posiadał ten sam `ref`.

API to zostało przygotowane w zastępstwie za przestarzałe `React.addons.cloneWithProps()`.

* * *

### `createFactory()` {#createfactory}

```javascript
React.createFactory(type)
```

Zwraca funkcję, która tworzy reaktowy element danego typu. Tak jak [`React.createElement()`](#createElement), argument `type`, może być zarówno nazwą tagu HTML-owego (np. `'div'` lub `'span'`), typem [komponentu reaktowego](/docs/components-and-props.html) (klasa lub funkcja) lub typem [fragmentu reaktowego](#reactfragment).

Ta funkcja pomocnicza jest uznawana za przestarzałą i radzimy korzystać z JSX lub bezpośrednio z `React.createElement()`.

Jeśli korzystasz z JSX, nie ma potrzeby korzystania z `React.createFactory()`. Zobacz [React bez JSX](/docs/react-without-jsx.html), by dowiedzieć się więcej.

* * *

### `isValidElement()` {#isvalidelement}

```javascript
React.isValidElement(object)
```

Weryfikuje czy obiekt jest elementem reaktowym. Zwraca `true` lub `false`.

* * *

### `React.Children` {#reactchildren}

`React.Children` udostępnia narzędzia do obsługi struktury danych z `this.props.children`.

#### `React.Children.map` {#reactchildrenmap}

```javascript
React.Children.map(children, function[(thisArg)])
```

Wywołuje funkcję na każdym bezpośrednim dziecku, zawartym w `children` z `this` ustawionym na `thisArg`. Jeśli `children` jest tablicą, funkcja zostanie wywołana na każdym dziecku zawartym w tej tablicy.

> Uwaga
>
> Jeśli `children` jest `Fragmentem`, zostanie potraktowana jako pojedyncze dziecko, nie jak tablica.

#### `React.Children.forEach` {#reactchildrenforeach}

```javascript
React.Children.forEach(children, function[(thisArg)])
```

Działa tak samo jak [`React.Children.map()`](#reactchildrenmap), ale nie zwraca tablicy.

#### `React.Children.count` {#reactchildrencount}

```javascript
React.Children.count(children)
```

Zwraca liczbę komponentów w `children` równą ilości razy, jakie byłby wywołany callback przekazany do `map` lub `forEach`.

#### `React.Children.only` {#reactchildrenonly}

```javascript
React.Children.only(children)
```

Weryfikuje czy `children` ma tylko jedno dziecko (element reaktowy) i zwraca je. W innym przypadku metoda zwróci błąd.

> Uwaga
>
>`React.Children.only()` nie akceptuje wartości zwracanej przez [`React.Children.map()`](#reactchildrenmap), ponieważ jest to tablica, a nie element reaktowy

#### `React.Children.toArray` {#reactchildrentoarray}

```javascript
React.Children.toArray(children)
```

Zwraca strukturę danych z `children` jako płaską tablicę z kluczem przypisanym do każdego z dzieci. Jest to przydatne, jeśli chcemy manipulować grupą dzieci w metodzie renderowania. Szczególnie jeśli chcemy zmienić kolejność lub podzielić `this.props.children`, zanim przekażemy je dalej.

> Uwaga
>
> `React.Children.toArray()` zmienia klucze, by zachować semantyczną poprawność zagłębionych tablic podczas przygotowywania płaskiej struktury. Oznacza to, że `toArray` rozpocznie nazwę każdego klucza, tak by każdy element należał do odpowiedniego zakresu.

* * *

### `React.Fragment` {#reactfragment}

Komponent `React.Fragment` pozwala zwrócić wiele elementów w metodzie `render()` bez opakowywania ich w dodatkowy element DOM:

```javascript
render() {
  return (
    <React.Fragment>
      Jakiś tekst.
      <h2>Nagłowek</h2>
    </React.Fragment>
  );
}
```

Możesz także skorzystać ze skróconego zapisu `<></>`. Po więcej informacji zajrzyj do wpisu na blogu - [React v16.2.0: Improved Support for Fragments](/blog/2017/11/28/react-v16.2.0-fragment-support.html).


### `React.createRef` {#reactcreateref}

`React.createRef` tworzy [referencję](/docs/refs-and-the-dom.html), którą możesz przypiąć do dowolnego elementu reaktowego poprzez atrybut ref.
`embed:16-3-release-blog-post/create-ref-example.js`

### `React.forwardRef` {#reactforwardref}

`React.forwardRef` tworzy komponent reaktowy, który przekazuje atrybut [ref](/docs/refs-and-the-dom.html) do kolejnego komponentu w dół drzewa. Ta technika nie jest zbyt popularna, ale przydatna w dwóch konkretnych przypadkach:

* [Przekazywanie referencji komponentom DOM](/docs/forwarding-refs.html#forwarding-refs-to-dom-components)
* [Przekazywanie referencji komponentom wyższego rzędu](/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components)

`React.forwardRef` przyjmuje funkcję renderującą jako argument. React wywoła tę funkcję biorąc `props` oraz `ref` jako dwa argumenty. Funkcja ta powinna zwrócić węzeł reaktowy.

`embed:reference-react-forward-ref.js`

W powyższym przykładzie, React przekazuje `ref` będąc dla `<FancyButton ref={ref}>` drugim argumentem do funkcji renderującej wewnątrz `React.forwardRef`. Funkcja renderująca przekaże `ref` do elementu `<button ref={ref}>`.

W rezultacie po tym, jak referencja zostanie przypięta przez Reacta, `ref.current` będzie wskazywał bezpośrednio na element `<button>`.

Po więcej informacji zobacz [przekazywanie referencji](/docs/forwarding-refs.html).

### `React.lazy` {#reactlazy}

`React.lazy()` pozwala Ci zdefiniować komponenty, które są ładowane dynamicznie. Pozwala to zredukować rozmiar paczki, poprzez wyodrębnienie komponentów, które nie są używane podczas inicjalizacji renderowania.

W naszej [dokumentacji poświęconej rozdzielaniu kodu](/docs/code-splitting.html#reactlazy) zamieściliśmy więcej informacji na ten temat. [Ten artykuł](https://medium.com/@pomber/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d) również może okazać się pomocny w wyjaśnieniu szczegółów działania tej metody.

```js
// Ten komponent jest ładowany dynamicznie
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

Pamiętaj, że renderowanie leniwych komponentów (ang. *lazy*) wymaga użycia komponentu `<React.Suspense>` wyżej w drzewie renderowania. W ten sposób definiujesz wskaźnik ładowania.

> **Uwaga**
>
> Używanie `React.lazy` z dynamicznymi importami wymaga, by w środowisku JS dostępne były Promisy. Będzie to wymagało użycia polyfilli dla przeglądarek IE11 i starszych.

### `React.Suspense` {#reactsuspense}

`React.Suspense` pozwala zdefiniować wskaźnik ładowania w razie, gdy któryś z komponentów poniżej nie jest jeszcze gotowy do renderowania. W tej chwili jedynym przypadkiem użycia `<React.Suspense>` jest dynamiczne ładowanie komponentów.

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

W naszej [dokumentacji poświęconej rozdzielaniu kodu](/docs/code-splitting.html#reactlazy) zamieściliśmy więcej informacji na ten temat. Zwróć uwagę na to, że komponenty `lazy` mogą być zawarte głęboko poniżej `Suspense`. Nie musisz otaczać każdego elementu w `<Suspense>`, jednak musisz użyć `lazy()` dla każdego komponentu, którego chcesz użyć.

Mimo, że nie jest to obecnie wspierane, w planach jest wykorzystanie `Suspense` przy pobieraniu danych. Więcej możesz się dowiedzieć z [naszej roadmapy](/blog/2018/11/27/react-16-roadmap.html).

>Uwaga
>
>`React.lazy()` oraz `<React.Suspense>` nie są jeszcze wspierane przez `ReactDOMServer`. Ograniczenie to zostanie wyeliminowane w przyszłości.
