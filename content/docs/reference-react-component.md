---
id: react-component
title: React.Component
layout: docs
category: Reference
permalink: docs/react-component.html
redirect_from:
  - "docs/component-api.html"
  - "docs/component-specs.html"
  - "docs/component-specs-ko-KR.html"
  - "docs/component-specs-zh-CN.html"
  - "tips/UNSAFE_componentWillReceiveProps-not-triggered-after-mounting.html"
  - "tips/dom-event-listeners.html"
  - "tips/initial-ajax.html"
  - "tips/use-react-with-other-libraries.html"
---

<<<<<<< HEAD
Ta strona zawiera szegółowe odniesienie do definicji klasy reactowego komponentu. Zakłada ona, że znasz fundamentalne zagadnienia Reacta, takie jak [komponenty i właściwości](/docs/components-and-props.html), i [stan i cykl życia](/docs/state-and-lifecycle.html). Jeśli nie, zapoznaj się najpierw z nimi.
=======
> Try the new React documentation for [`Component`](https://beta.reactjs.org/reference/react/Component).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

This page contains a detailed API reference for the React component class definition. It assumes you're familiar with fundamental React concepts, such as [Components and Props](/docs/components-and-props.html), as well as [State and Lifecycle](/docs/state-and-lifecycle.html). If you're not, read them first.
>>>>>>> ba290ad4e432f47a2a2f88d067dacaaa161b5200

## Ogólne informacje {#overview}

React pozwala na zdefiniowanie komponentów jako klasy lub funkcje. Komponenty zdefiniowane jako klasy obecnie zapewniają więcej funkcjonalności, które szczegółowo opiszemy na tej stronie. Aby komponent mógł być zdefiniowany jako klasa, musi on dziedziczyć po klasie `React.Component`:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Cześć, {this.props.name}</h1>;
  }
}
```

Jedyna metoda, która *musi* być zdefiniowana w klasie dziedziczącej po `React.Component` nazywa się [`render()`](#render). Wszystkie inne metody opisane na tej stronie są opcjonalne.

**Stanowczo odradadzamy tworzenie własnych klas bazowych komponentów.** W Reactowych komponentach [wielokrotne użycie kodu jest osiągane przede wszystkim przez kompozycję, a nie dziedziczenie](/docs/composition-vs-inheritance.html).

>Uwaga:
>
>React nie zmusza cię do stosowania składni klasy ze standardu ES6. Jeśli wolisz jej uniknąć, możesz zamiast niej użyć modułu `create-react-class` lub podobnej niestandardowej abstrakcji. Aby dowiedzieć się więcej, zobacz rozdział [React bez ES6](/docs/react-without-es6.html).

### Cykl życia komponentu {#the-component-lifecycle}

Każdy komponent ma kilka "metod cyklu życia", które możesz nadpisać, aby uruchomić kod w szczególnych momentach programu. **Możesz użyć [tego diagramu cyklu życia](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) jako ściągawki.** Na liście poniżej, często używane metody cyklu życia zostały **pogrubione**. Reszta z nich istnieje dla stosunkowo rzadkich przypadków użycia.

#### Montowanie {#mounting}

Podczas, gdy instancja komponentu zostaje stworzona i włożona do drzewa DOM, w podanej kolejności wywołwane są poniższe metody:

- [**`constructor()`**](#constructor)
- [`static getDerivedStateFromProps()`](#static-getderivedstatefromprops)
- [**`render()`**](#render)
- [**`componentDidMount()`**](#componentdidmount)

>Uwaga:
>
>Ta metoda jest uznawana za przestarzałą (ang. *legacy*) i powinno się [jej unikać](/blog/2018/03/27/update-on-async-rendering.html) w nowym kodzie:
>
>- [`UNSAFE_componentWillMount()`](#unsafe_componentwillmount)

#### Aktualizacja {#updating}

Aktualizacja może być spowodowana zmianami we właściwościach lub stanie komponentu. Kiedy komponent zostaje ponownie wyrenderowany, w podanej kolejności wywołane zostają poniższe metody:

- [`static getDerivedStateFromProps()`](#static-getderivedstatefromprops)
- [`shouldComponentUpdate()`](#shouldcomponentupdate)
- [**`render()`**](#render)
- [`getSnapshotBeforeUpdate()`](#getsnapshotbeforeupdate)
- [**`componentDidUpdate()`**](#componentdidupdate)

>Uwaga:
>
>Te metody są uznawane za przestarzałe i powinno się [ich unikać](/blog/2018/03/27/update-on-async-rendering.html) w nowym kodzie:
>
>- [`UNSAFE_componentWillUpdate()`](#unsafe_componentwillupdate)
>- [`UNSAFE_componentWillReceiveProps()`](#unsafe_componentwillreceiveprops)

#### Odmontowywanie {#unmounting}

Kiedy komponent zostaje usunięty z drzewa DOM, wywołana zostaje poniższa metoda:

- [**`componentWillUnmount()`**](#componentwillunmount)

#### Obsługa wyjątków {#error-handling}

Poniższe metody zostają wywołane w razie wystąpienia wyjątku podczas renderowania, w metodzie cyklu życia, lub w konstruktorze dowolnych komponentów potomnych.

- [`static getDerivedStateFromError()`](#static-getderivedstatefromerror)
- [`componentDidCatch()`](#componentdidcatch)

### Inne API {#other-apis}

Każdy komponent zapewnia też kilka innych API:

  - [`setState()`](#setstate)
  - [`forceUpdate()`](#forceupdate)

### Właściwości klasy {#class-properties}

  - [`defaultProps`](#defaultprops)
  - [`displayName`](#displayname)

### Właściwości instancji {#instance-properties}

  - [`props`](#props)
  - [`state`](#state)

* * *

## Dokumentacja {#reference}

### Powszechnie używane metody cyklu życia {#commonly-used-lifecycle-methods}

Metody opisane w tym rozdziale pokrywają zdecydowaną większość przypadków użycia, na które natkniesz się tworząc reactowe komponenty. **Dla wizualnego odniesienia, zobacz [ten diagram cyklu życia](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/).**

### `render()` {#render}

```javascript
render()
```

Metoda `render()` jest jedyną metodą wymaganą w komponencie klasowym.

Wywołana, powinna sprawdzić `this.props` i `this.state` oraz zwrócić jeden z poniższych typów:

<<<<<<< HEAD
- **Reactowe elementy.** Zwykle tworzone poprzez [JSX](/docs/introducing-jsx.html). Na przykład, `<div />` i `<MyComponent />` są reactowymi elementami, które instruują Reacta, aby, odpowiednio, wyrenderował węzeł drzewa DOM, lub inny zdefiniowany przez użytkownika komponent.
- **Tablice i fragmenty.** Pozwalają na zwrócenie wielu elementów z metody render. Po więcej szczegółów odwiedź dokumentację [fragmentów](/docs/fragments.html).
- **Portale**. Pozwalają na wyrenderowanie elementów potomnych w innym poddrzewie DOM. Po więcej szczegółów odwiedź dokumentację [portali](/docs/portals.html).
- **Łańcuchy znaków i liczby.** Zostają wyrenderowane jako węzły tekstowe w drzewie DOM.
- **Typ logiczny lub `null`**. Nie renderuje nic. (Istnieje głównie, aby wspierać wzorzec `return test && <Child />`, gdzie `test` jest wartością logiczną.)
=======
- **React elements.** Typically created via [JSX](/docs/introducing-jsx.html). For example, `<div />` and `<MyComponent />` are React elements that instruct React to render a DOM node, or another user-defined component, respectively.
- **Arrays and fragments.** Let you return multiple elements from render. See the documentation on [fragments](/docs/fragments.html) for more details.
- **Portals**. Let you render children into a different DOM subtree. See the documentation on [portals](/docs/portals.html) for more details.
- **String and numbers.** These are rendered as text nodes in the DOM.
- **Booleans or `null` or `undefined`**. Render nothing. (Mostly exists to support `return test && <Child />` pattern, where `test` is boolean).
>>>>>>> ba290ad4e432f47a2a2f88d067dacaaa161b5200

Funkcja `render()` powinna być czysta, to znaczy, że nie modyfikuje stanu komponentu, zwraca ten sam wynik przy każdym wywołaniu, i nie wchodzi w bezpośrednią interakcję z przeglądarką.

Jeśli potrzebujesz wejść w interakcję z przeglądarką, zamiast tego wykonaj swoje instrukcje w `componentDidMount()` lub innych metodach cyklu życia. Utrzymywanie funkcji `render()` w czystości sprawia, że łatwiej jest myśleć o komponentach.

> Uwaga
>
> Funkcja `render()` nie zostanie wywołana, jeśli [`shouldComponentUpdate()`](#shouldcomponentupdate) zwróci `false`.

* * *

### `constructor()` {#constructor}

```javascript
constructor(props)
```

**Jeśli nie inicjalizujesz stanu i nie wiążesz (ang. *bind*) metod, nie ma potrzeby, abyś implementował konstruktor w swoim reactowym komponencie.**

Konstruktor reactowego komponentu jest wywoływany przed jego zamontowaniem. Kiedy implementujesz konstruktor w klasie dziedziczącej po klasie `React.Component`, powinieneś wywołać metodę `super(props)` przed jakąkolwiek inną instrukcją. W innym wypadku, `this.props` będzie miało  w konstruktorze wartość `undefined`, co może prowadzić do błędów.

Zazwyczaj, konstruktory są używane tylko w dwóch celach:

* Inicjalizacji [stanu lokalnego](/docs/state-and-lifecycle.html) przez przypisanie obiektu do `this.state`.
* Związania [metody obsługującej zdarzenia](/docs/handling-events.html) z instancją komponentu.

**Nie powinieneś wywoływać metody `setState()`** w funkcji `constructor()`. Zamiast tego, jeśli potrzebujesz użyć w komponencie stanu lokalnego, **przydziel początkowy stan do `this.state`** bezpośrednio w konstruktorze:

```js
constructor(props) {
  super(props);
  // Nie wywołuj tutaj this.setState()!
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```

Konstruktor jest jedynym miejscem, w którym powinieneś przypisywać `this.state` bezpośrednio. Natomiast we wszystkich innych metodach powinieneś używać `this.setState()`.

Unikaj wprowadzania efektów ubocznych lub subskrypcji w konstruktorze. Używaj zamiast tego `componentDidMount()` dla tych przypadków użycia.

>Uwaga
>
>**Unikaj kopiowania właściwości do stanu! Jest to częsty błąd:**
>
>```js
>constructor(props) {
>  super(props);
>  // Nie rób tego!
>  this.state = { color: props.color };
>}
>```
>
>Problem w tym, że jest to jednocześnie niepotrzebne (zamiast tego możesz użyć  `this.props.color` bezpośrednio), i jest przyczyną błędów (aktualizacje właściwości `color` nie będą odzwierciedlane w stanie).
>
>**Używaj tego wzorca tylko jeśli chcesz celowo ignorować aktualizacje właściwości.** W tym wypadku, bedzie miała sens zmiana nazwy właściwości na `initialColor` (ang. *początkowy kolor*) lub `defaultColor` (ang. *domyślny kolor*). Możesz wtedy zmusić komponent do "zresetowania" swojego wewnętrznego stanu przez [zmianę jego właściwości `key`](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) w razie potrzeby.
>
>Przeczytaj nasz [wpis na blogu na temat unikania stanu pochodnego](/blog/2018/06/07/you-probably-dont-need-derived-state.html), aby dowiedzieć się co należy zrobić, jeśli wydaje ci się, że potrzebujesz stanu zależnego od właściwości.


* * *

### `componentDidMount()` {#componentdidmount}

```javascript
componentDidMount()
```

Metoda `componentDidMount()` jest wywołowana bezpośrednio po zamontowaniu komponentu (po jego włożeniu do drzewa). Inicjalizacja, która wymaga węzłów drzewa DOM powinna się tam znaleźć. Jeśli potrzebujesz załadować dane ze zdalnego zasobu, jest to dobre miejsce do wykonania zapytania sieciowego.

Ta metoda jest dobrym miejscem na przygotowanie dowolnych subskrypcji. Jeśli to zrobisz, nie zapomnij ich zakończyć w metodzie `componentWillUnmount()`.

**Możesz wywołać metodę `setState()` od razu** w `componentDidMount()`. Spowoduje to dodatkowe renderowanie, ale zostanie ono wykonane zanim przeglądarka zaktualizuje ekran. Jest to gwarancją, że pomimo, iż metoda `render()` będzie w tym przypadku wywołana dwa razy, użytkownik nie zobaczy pośredniego stanu. Używaj tego wzorca uważnie, ponieważ często powoduje on problemy z wydajnością. W większości przypadków, powinieneś zamiast tego mieć możliwość przypisania stanu początkowego w konstruktorze. Może to być natomiast konieczne w przypadkach takich jak okna modalne i okienka podpowiedzi, kiedy przed wyrenderowaniem czegoś trzeba zmierzyć węzeł drzewa DOM.

* * *

### `componentDidUpdate()` {#componentdidupdate}

```javascript
componentDidUpdate(prevProps, prevState, snapshot)
```

Metoda `componentDidUpdate()` jest wywoływana bezpośrednio po wystąpieniu aktualizacji. Nie jest ona wywoływana po początkowym wyrenderowaniu.

Używaj tego jako okazji do operacji na drzewie DOM kiedy komponent został zaktualizowany. Jest to także dobre miejsce na wykonywanie zapytań sieciowych tak długo jak porównujesz obecne właściwości z poprzednimi (na przykład, zapytanie może być niepotrzebne jeśli właściwości się nie zmieniły).

```js
componentDidUpdate(prevProps) {
  // Typowy sposób użycia (nie zapomnij porównać właściwości):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

**Możesz wywołać metodę `setState()` od razu** w `componentDidUpdate()`, ale weź pod uwagę, że **musi ona być owinięta instrukcją warunkową** jak w przykładzie powyżej, albo spowodujesz nieskończoną pętlę. Spowodowałoby to również dodatkowe renderowanie które, pomimo że niedostrzegalne dla użytkownika, może negatywnie wpłynąć na wydajność komponentu. Jeśli próbujesz "odzwierciedlić" pewien stan z właściwością pochodzącą z góry, rozważ zamiast tego użycie tej właściwości bezpośrednio. Dowiedz się więcej o tym [dlaczego kopiowanie właściwości do stanu powoduje błędy](/blog/2018/06/07/you-probably-dont-need-derived-state.html).

Jeśli twój komponent ma zaimplementowaną metodę cyklu życia `getSnapshotBeforeUpdate()` (co jest rzadkie), wartość którą ona zwróci, będzie przekazana jako trzeci parametr ("zrzut" (ang.*snapshot*)) do metody `componentDidUpdate()`. W innym wypadku ten parametr będzie miał wartość `undefined`.

> Uwaga
>
> Metoda `componentDidUpdate()` nie będzie wywołana jeśli [`shouldComponentUpdate()`](#shouldcomponentupdate) zwróci `false`.

* * *

### `componentWillUnmount()` {#componentwillunmount}

```javascript
componentWillUnmount()
```

Metoda `componentWillUnmount()` jest wywoływana zaraz przed odmontowaniem i zniszczeniem komponentu. Przeprowadź potrzebne czyszczenie w tej metodzie, takie jak unieważnienie liczników czasu, anulowanie zapytań sieciowych, lub czyszczenie subskrypcji, które były rozpoczęte w `componentDidMount()`.

**Nie powinieneś wywoływać metody `setState()`** w `componentWillUnmount()`, ponieważ ten komponent nie zostanie ponownie wyrenderowany. Kiedy instancja komponentu zostaje odmonotowana, nigdy nie będzie zamontowana ponownie.

* * *

### Rzadko używane metody cyklu życia {#rarely-used-lifecycle-methods}

Metody zawarte w tej sekcji odpowiadają rzadkim przypadkom użycia. Czasem są przydatne, ale większość twoich komponentów najprawdopodobniej nie będzie ich potrzebowała. **Większość poniższych metod możesz zobaczyć na [tym diagramie cyklu życia](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) po kliknięciu na checkbox "Pokaż rzadziej używane metody" u góry.**


### `shouldComponentUpdate()` {#shouldcomponentupdate}

```javascript
shouldComponentUpdate(nextProps, nextState)
```

Używaj metody `shouldComponentUpdate()`, aby dać znać Reactowi, czy obecna zmiana stanu lub właściwości komponentu nie wpłynęła na jego wynik. Domyślnym zachowaniem, na którym powinieneś polegać w większości przypadków, jest ponowne renderowanie przy każdej zmianie stanu.

Metoda `shouldComponentUpdate()` jest wywoływana przed renderowaniem, gdy otrzymywane są nowe właściwości lub stan. Domylnie wartość zwracana to `true`. Ta metoda nie jest wywoływana przy początkowym renderowaniu lub kiedy została użyta metoda `forceUpdate()`.

Ta metoda istnieje tylko jako **[optymalizacja wydajności](/docs/optimizing-performance.html).** Nie polegaj na niej aby "zapobiegać" renderowaniu, co może prowadzić do błędów. Zamiast pisania `shouldComponentUpdate()` własnoręcznie, **rozważ użycie wbudowanej klasy [`PureComponent`](/docs/react-api.html#reactpurecomponent)**. `PureComponent` przeprowadza płytkie porównanie właściwości i stanu, i obniża szansę na pominięcie niezbędnej aktualizacji.

Jeśli jesteś pewny, że chcesz ją napisać własnoręcznie, możesz porównać `this.props` z `nextProps` i `this.state` z `nextState` oraz zwrócić `false`, aby powiadomić Reacta, że aktualizacja może zostać pominięta. Zauważ, że zwrócenie `false` nie zapobiega ponownemu wyrenderowaniu komponentów potomnych, gdy *ich* stan się zmienia.

Nie zalecamy wykonywania głębokich porównań lub używania `JSON.stringify()` w metodzie `shouldComponentUpdate()`. Jest to bardzo nieefektywne i negatywnie odbije się na wydajności.

Obecnie, jeśli `shouldComponentUpdate()` zwróci `false`, [`UNSAFE_componentWillUpdate()`](#unsafe_componentwillupdate), [`render()`](#render) i [`componentDidUpdate()`](#componentdidupdate) nie zostana wywołane. W przyszłosci React może traktować `shouldComponentUpdate()` jako wskazówkę, a nie jako ścisłą dyrektywę, a zwrócenie `false` może mimo wszytko skutkować ponownym wyrenderowaniem komponentu.

* * *

### `static getDerivedStateFromProps()` {#static-getderivedstatefromprops}

```js
static getDerivedStateFromProps(props, state)
```

Metoda `getDerivedStateFromProps` jest wywoływana zaraz przed wywołaniem metody render, zarówno przy początkowym montowaniu, jak i przy dalszych aktualizacjach. Powinna zwrócić obiekt, aby zaktualizować stan, lub zwrócić `null`, aby nie aktualizować nic.

Ta metoda istnieje dla [rzadkich przypadków użycia](/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state), w których stan zależy od zmian właściwości w czasie. Na przykład, może okazać się przydatnym komponent `<Transition>`, który porównuje swoje obecne komponenty potomne z poprzednimi, aby zdecydować, króre z nich mają pojawić się z animacją, a które zniknąć.

Derywowanie stanu sprawia, że kod jest rozwlekły i trudno myśli się o komponentach.
[Upewnij się, że znasz prostsze alternatywy:](/blog/2018/06/07/you-probably-dont-need-derived-state.html)

* Jeśli potrzebujesz **spowodować efekt uboczny** (na przykład pobranie danych, albo animację) w odpowiedzi na zmianę właściwości, zamiast tego użyj metody cyklu życia [`componentDidUpdate`](#componentdidupdate).

* Jeśli chcesz **ponownie obliczyć pewne dane tylko, kiedy zmieni się właściwość**, [zamiast tego użyj pomocniczych technik memoizacyjnych](/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization).

* Jeśli chcesz **"zresetować" stan przy zmianie właściwości**, rozważ zamiast tego uczynienie komponentu [całkowicie kontrolowanym](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) lub [całkowicie niekontrolowanym z właściwością `key`](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key).

Ta metoda nie ma dostępu do instancji komponentu. Jeśli chcesz, możesz używać ponownie kod pomiędzy `getDerivedStateFromProps()` innymi metodami klasy poprzez wyodrębnienie czystych funkcji właściwości i stanu komponentu poza definicję klasy.

Zauważ, że metoda ta wywoływana jest przy *każdym* renderowaniu, bez względu na przyczynę. Jest to kontrastem dla metody `UNSAFE_componentWillReceiveProps`, która zostaje wywołana tylko, kiedy komponent nadrzędny powoduje ponowne wyrenderowanie, a nie jako wynik lokalnego wywołania metody `setState`.

* * *

### `getSnapshotBeforeUpdate()` {#getsnapshotbeforeupdate}

```javascript
getSnapshotBeforeUpdate(prevProps, prevState)
```

Metoda `getSnapshotBeforeUpdate()` jest wywoływana zaraz przed tym, gdy ostatnio wyrenderowany wynik zostaje zatwierdzony do np. drzewa DOM. Pozwala to twojemu komponentowi na przejęcie pewnych informacji z drzewa DOM (np. pozycje scrolla) przed ich potencjalną zmianą. Każda wartość zwrócona przez metodę cyklu życia zostanie przekazana jako parametr do metody `componentDidUpdate()`.

Ten przypadek użycia nie jest powszechny, ale może wystąpić w interfejsach użytkownika takich jak wątki czatu, które potrzebują możliwości zarządzania pozycją scrolla w specjalny sposób.

Powinna być zwrócona wartość snapshotu (lub `null`).

Dla przykładu:

`embed:react-component-reference/get-snapshot-before-update.js`

W powyższych przykładach, ważne jest odczytanie własności `scrollHeight` w metodzie `getSnapshotBeforeUpdate`, ponieważ mogą wystąpić opóźnienia pomiędzy metodami cyklu życia w fazie "render" (takimi jak `render`), a metodami fazy "commit" (takimi jak `getSnapshotBeforeUpdate` i `componentDidUpdate`).

* * *

### Granice błędu {#error-boundaries}

[Granice błędów](/docs/error-boundaries.html) to reactowe komponenty, które wychwytują javascriptowe wyjątki w dowolnych miejscach swojego drzewa komponentów potomnych, zapisują te wyjątki, i pokazują awaryjny interfejs użytkownika zamiast drzewa komponentów, które rzuciło tym wyjątkiem. Granice błędów wychwytują wyjątki podczas renderowania, w metodach cyklu życia, i w konstruktorach całego drzewa potomnego.

Komponent klasowy staje się granicą błędu, jeśli ma zdefiniowaną jedną z (lub obie) metod cyklu życia `static getDerivedStateFromError()` lub `componentDidCatch()`. Aktualizacja stanu z tych metod pozwala na wychwycenie nieobsłużonego javascriptowego wyjątku w drzewie komponentów potomnych i pokazać rezerwowy interfejs użytkownika.

Używaj granic błędów tylko do rekonwalescencji po nieoczekiwanych wyjątkach; **nie próbuj używać ich do kontrolowania przebiegu programu.**

Po więcej szczegółów, odwiedź [*Obsługa wyjątków w Reakcie 16*](/blog/2017/07/26/error-handling-in-react-16.html).

> Uwaga
>
> Granice błędów wychwytują tylko wyjątki w komponentach z drzewa **pod** nimi. Granica błędów nie może wychwycić wyjątku, który wystąpił w niej samej.

### `static getDerivedStateFromError()` {#static-getderivedstatefromerror}
```javascript
static getDerivedStateFromError(error)
```

Ta metoda cyklu życia jest wywoływana po wyrzuceniu wyjątku przez komponent potomny.
Wyrzucony wyjątek zostaje do niej przekazany jako argument, jej wynikiem powinna być wartość, która pozwoli na zaktualizowanie stanu.

```js{7-10,13-16}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Aktualizacja stanu, aby kolejne wyrenderowanie pokazało awaryjny interfejs użytkownika.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // Możesz wyrenderować dowolny awaryjny interfejs użytkownika
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

> Uwaga
>
> Metoda `getDerivedStateFromError()` jest wywoływana podczas fazy "render", więc nie są w niej dozwolone skutki uboczne.
Zamiast tego, dla tych przypadków użycia użyj metody `componentDidCatch()`.

* * *

### `componentDidCatch()` {#componentdidcatch}

```javascript
componentDidCatch(error, info)
```

Ta metoda cyklu życia jest wywoływana po wyrzuceniu wyjątku przez komponent potomny.
Otrzymuje on dwa argumenty:

1. `error` - Wyjątek, który został wyrzucony.
2. `info` - Obiekt z kluczem `componentStack` zawierający [informację o tym, który komponent wyrzucił ten wyjątek](/docs/error-boundaries.html#component-stack-traces).


Metoda `componentDidCatch()` jest wywoływana w fazie "commit", więc dozwolone są w niej skutki uboczne.
Powinna być używana do czynności takich jak zapisywanie błędów:

```js{12-19}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Aktualizacja stanu, aby kolejne wyrenderowanie pokazało awaryjny interfejs użytkownika.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Przykładowy "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    logComponentStackToMyService(info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // Możesz wyrenderować dowolny awaryjny interfejs użytkownika
      return <h1>Coś poszło nie tak.</h1>;
    }

    return this.props.children;
  }
}
```

Zbudowana paczka deweloperska będzie nieco różnić się od produkcyjnej pod względem sposobu obsługiwania błędów przez `componentDidCatch()`.

W środowisku deweloperskim błędy wędrują aż do `window`, co oznacza, że wszelkie procedury zarejestrowane za pomocą `window.onerror` lub `window.addEventListener('error', callback)` również przechwycą te błędy, które złapie `componentDidCatch()`.

Inaczej jest na produkcji, gdzie błędy nie wędrują aż na samą górę. Oznacza to, że nadrzędne granice błędów otrzymają błąd tylko wtedy, gdy ich potomkowie wcześniej ich nie przechwycą za pomocą `componentDidCatch()`.

> Uwaga
>
> W razie wyjątku, możesz wyrenderować awaryjny interfejs użytkownika za pomocą metody `componentDidCatch()` poprzez wywołanie metody `setState`, ale możliwość ta będzie przestarzała w przyszłych wersjach.
> Do obsługi renderowania awaryjnego używaj zamiast tego metody `static getDerivedStateFromError()`.

* * *

### Przestarzałe metody cyklu życia {#legacy-lifecycle-methods}

Poniższe metody cyklu życia są oznaczone jako "przestarzałe". Wciąż działają, zalecamy jednak nie używać ich w nowym kodzie. Możesz dowiedzieć się więcej o migracji od przestarzałych metod cyklu życia [w tym wpisie na blogu](/blog/2018/03/27/update-on-async-rendering.html).

### `UNSAFE_componentWillMount()` {#unsafe_componentwillmount}

```javascript
UNSAFE_componentWillMount()
```

> Uwaga
>
> Ta metoda cyklu życia była wcześniej nazwana `componentWillMount`. Ta nazwa będzie działać do wersji 17. Użyj [codemoda `rename-unsafe-lifecycles`](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles), aby automatycznie zaktualizować swoje komponenty.

Metoda `UNSAFE_componentWillMount()` jest wywoływana zaraz przed nastąpieniem montowania. Jest wywoływana przed `render()`, zatem synchroniczne wywoływanie `setState()` w tej metodzie nie spowoduje dodatkowego renderowania. Generalnie, zamiast tego do inicjalizacji stanu zalecamy używania konstruktora.

Unikaj wprowadzania skutków ubocznych lub inicjalizowania subskrypcji w tej metodzie. Dla tych przypadków użycia, używaj zamiast tego metody `componentDidMount()`.

Jest to jedyna metoda cyklu życia wywoływana przy renderowaniu na serwerze.

* * *

### `UNSAFE_componentWillReceiveProps()` {#unsafe_componentwillreceiveprops}

```javascript
UNSAFE_componentWillReceiveProps(nextProps)
```

> Uwaga
>
> Ta metoda cyklu życia była wcześniej nazwana `componentWillReceiveProps`. Ta nazwa będzie działać do wersji 17. Użyj [codemoda `rename-unsafe-lifecycles`](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles), aby automatycznie zaktualizować swoje komponenty.

> Uwaga:
>
> Używanie tej metody cyklu życia często prowadzi do błędów i niespójności
>
> * Jeśli potrzebujesz **wykonać efekt uboczny** (na przykład, pobieranie danych lub animację) w odpowiedzi na zmianę właściwości, zamiast tego użyj metody cyklu życia [`componentDidUpdate`](#componentdidupdate).
> * Jeśli używałeś `componentWillReceiveProps` do **ponownego obliczania pewnych danych tylko w przypadku zmiany właściwości**, [zamiast tego użyj pomocniczych technik memoizacyjnych](/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization).
> * Jeśli używałeś `componentWillReceiveProps` do **"resetowania" stanu w przypadku zmiany właściwości**, zamiast tego rozważ uczynienie komponentu [całkowicie kontrolowanym](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) lub [całkowicie niekontrolowanym z właściwością `key`](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key).
>
> Dla innych przypadków użycia, [śledź rekomendacje w tym wpisie na blogu na temat stanu pochodnego](/blog/2018/06/07/you-probably-dont-need-derived-state.html).

Metoda `UNSAFE_componentWillReceiveProps()` jest wywoływana przed tym, jak zamontowany komponent otrzymuje nowe właściwości. Jeśli potrzebujesz zaktualizować stan w odpowiedzi na zmiany właściwości (na przykład, zresetować go), możesz porównać `this.props` i `nextProps` i wykonać przejście stanu w tej metodzie za pomocą `this.setState()`.

Zauważ, że jeśli komponent nadrzędny powoduje ponowne wyrenderowanie twojego komponentu, ta metoda będzie wywołana nawet jeśli właściwości nie uległy zmianie. Jeśli chcesz tylko obsłużyć zmiany, upewnij się, że porównujesz poprzednie i obecne wartości.

React nie wywołuje metody `UNSAFE_componentWillReceiveProps()` z początkowymi właściwościami podczas [montowania](#mounting). Wywołuje ją tylko, kiedy właściwości któregoś z komponentów mogą zostać zaktualizowane. Wywołanie metody `this.setState()` przeważnie nie powoduje wywołania `UNSAFE_componentWillReceiveProps()`.

* * *

### `UNSAFE_componentWillUpdate()` {#unsafe_componentwillupdate}

```javascript
UNSAFE_componentWillUpdate(nextProps, nextState)
```

> Uwaga
>
> Ta metoda cyklu życia była wcześniej nazwana `componentWillUpdate`.  Ta nazwa będzie działać do wersji 17. Użyj [codemoda `rename-unsafe-lifecycles`](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles), aby automatycznie zaktualizować swoje komponenty.

Metoda `UNSAFE_componentWillUpdate()` jest wywoływana zaraz przed renderowaniem, kiedy komponent uzyskuje nowe właściwości lub stan. Używaj tego jako okazji do przygotowania przed nastąpieniem aktualizacji. Ta metoda nie jest wywoływana przy początkowym renderowaniu.

Zauważ, że nie możesz tutaj wywołać `this.setState()`; nie powinieneś też robić niczego innego (np. wysyłania Reduxowych akcji), co spowodowałoby aktualizację reactowego komponentu przed powrotem z metody `UNSAFE_componentWillUpdate()`.

Metoda ta, zazwyczaj może być zastąpiona metodą `componentDidUpdate()`. Jeśli zczytywałeś w tej metodzie informacje z drzewa DOM (np. żeby zapisać pozycje scrolla), możesz przenieść tą logikę do getSnapshotBeforeUpdate().

> Uwaga
>
> Metoda `UNSAFE_componentWillUpdate()` nie będzie wywołana jeśli [`shouldComponentUpdate()`](#shouldcomponentupdate) zwróci `false`.

* * *

## Inne API {#other-apis-1}

W przeciwieństwie do metod cyklu życia powyżej (które wywołuje dla ciebie React), metody poniżej możesz wywołać *ty* ze swoich komponentów.

Są tylko dwie takie metody: `setState()` i `forceUpdate()`.

### `setState()` {#setstate}

```javascript
setState(updater[, callback])
```

`setState()` ustawia w kolejce zmiany stanu komponentu i daje znać Reactowi, że komponent i jego komponenty potomne powinny zostać ponownie wyrenderowane ze zaktualizowanym stanem. Jest to podstawowa metoda używana do aktualizacji interfejsu użytkownika w odpowiedzi na procedury obsługi zdarzeń i odpowiedzi z serwera.

Myśl o metodzie `setState()` bardziej jako o *prośbie* niż o natychmiastowym poleceniu aktualizacji komponentu. Dla lepszej postrzeganej wydajności, React może ją opóźnić, a potem zaktualizować kilka komponentów za jednym zamachem. W rzadkich sytuacjach, kiedy potrzebujesz wymusić synchroniczną aktualizację DOM, możesz opakować ją w [`flushSync`](/docs/react-dom.html#flushsync). Ale pamiętaj, że może na tym ucierpieć wydajność aplikacji.

Metoda `setState()` nie zawsze od razu aktualizuje komponent. Może ona złączyć lub odłożyć aktualizację na później. Sprawia to, że odczytywanie `this.state` zaraz po wywołaniu `setState()` jest potencjalną pułapką. Zamiast tego, użyj metody `componentDidUpdate` lub funkcji zwrotnej (ang. *callback*) `setState` (`setState(updater, callback)`), które są wywoływane po zastosowaniu aktualizacji. Jeśli potrzebujesz zmienić stan w oparciu o poprzedni stan, zapoznaj się z poniższym argumentem `updater`.

`setState()` zawsze powoduje ponowne renderowanie komponentu, chyba że `shouldComponentUpdate()` zwróci `false`. Jeśli przechowujemy mutowalne obiekty, a logiki decydującej o potrzebie ponownego renderowania nie da się zawrzeć w metodzie `shouldComponentUpdate()`, możemy uniknąć zbędnego renderowania wywołując `setState()` tylko wtedy, gdy nowy stan różni się od poprzedniego.

Pierwszym argumentem jest funkcja `updater` posiadająca poniższą sygnaturę:

```javascript
(state, props) => stateChange
```

`state` jest referencją stanu komponentu w momencie, w którym zmiana zostaje zastosowana. Nie powinien on być bezpośrednio zmieniany. Zamiast tego, zmiany powinny być reprezentowane poprzez zbudowanie nowego obiektu na podstawie `state` and `props`. Na przykład załóżmy, że chcemy powiększyć pewną wartość w stanie o `props.step`:

```javascript
this.setState((state, props) => {
  return {counter: state.counter + props.step};
});
```

Zarówno `state`, jak i `props` otrzymywane przez funkcję aktualizującą są aktualne. Wynik aktualizatora zostaje płytko scalony ze stanem.

Drugi parametrem metody `setState()` jest opcjonalna funkcja zwrotna, która zostanie wywołana kiedy `setState` ukończy swój przebieg i komponent zostanie ponownie wyrenderowany. Ogólnie rzecz biorąc, do tego typu logiki zalecamy zamiast tego używać metody `componentDidUpdate()`.

Opcjonalnie, jako pierwszy argument do metody `setState()` zamiast funkcji możesz przekazać obiekt:

```javascript
setState(stateChange[, callback])
```

Powoduje to przeprowadzenie płytkiego scalenia argumentu `stateChange` do nowego stanu, np., w celu dostosowania ilości przedmiotów w koszyku:

```javascript
this.setState({quantity: 2})
```

Ta forma metody `setState()` także jest asynchroniczna, a wywołanie jej wiele razy podczas jednego cyklu może spowodować ich złączenie. Na przykład, jeśli spróbujesz zwiększyć ilość przedmiotów więcej niż jeden raz w tym samym cyklu, rezultatem tego będzie ekwiwalent:

```javaScript
Object.assign(
  previousState,
  {quantity: state.quantity + 1},
  {quantity: state.quantity + 1},
  ...
)
```

Następujące wywołania nadpiszą wartości z poprzednich w tym samym cyklu, więc ilość będzie zwiększona tylko raz. Jeśli kolejny stan zależy od poprzedniego, zamiast tego zalecamy używania formy z funkcją aktualizującą:

```js
this.setState((state) => {
  return {quantity: state.quantity + 1};
});
```

Po więcej szczegółów, odwiedź:

* [Przewodnik po stanie i cyklu życia](/docs/state-and-lifecycle.html)
* [Dogłębnie: Kiedy i dlaczego wywołania `setState()` są łączone?](https://stackoverflow.com/a/48610973/458193)
* [Dogłębnie: Dlaczego this.state nie jest aktualizowany od razu?](https://github.com/facebook/react/issues/11527#issuecomment-360199710)

* * *

### `forceUpdate()` {#forceupdate}

```javascript
component.forceUpdate(callback)
```

Domyślnie, kiedy zmienia się stan lub właściwości twojego komponentu, zrenderuje się on ponownie. Jeśli twoja metoda `render()` polega na innych danych, możesz powiadomić Reacta, że komponent potrzebuje ponownego wyrenderowania, poprzez wywołanie metody `forceUpdate()`.

Wywołanie `forceUpdate()` spowoduje, że na komponencie zostanie wywołana metoda `render()`, z pominięciem metody `shouldComponentUpdate()`. Spowoduje to wywołanie normalnych metod cyklu życia komponentów potomnych, włączając w to metodę `shouldComponentUpdate()` każdego z nich. React wciąż zaktualizuje drzewo DOM tylko w wypadku zmiany znaczników.

Przeważnie powinieneś unikać jakichkolwiek form użycia `forceUpdate()` i odczytywać dane jedynie z `this.props` i `this.state` w metodzie `render()`.

* * *

## Właściwości Klasy {#class-properties-1}

### `defaultProps` {#defaultprops}

`defaultProps` może być zdefiniowana jako własność na samej klasie komponentu, aby ustawić domyślne właściwości dla tej klasy. Jest ona używana dla właściwości równych `undefined`, ale nie `null`. Dla przykładu:

```js
class CustomButton extends React.Component {
  // ...
}

CustomButton.defaultProps = {
  color: 'blue'
};
```

Jeśli `props.color` nie jest podany, zostanie domyślnie ustawiony na `'blue'`:

```js
  render() {
    return <CustomButton /> ; // props.color zostanie ustawiony na blue
  }
```

Jeśli `props.color` zostanie ustawiony jako `null`, pozostanie nim:

```js
  render() {
    return <CustomButton color={null} /> ; // props.color pozostanie równy null
  }
```

* * *

### `displayName` {#displayname}

Napis `displayName` jest używany w komunikatach debugowania. Przeważnie, nie musisz jawnie go definiować, ponieważ jest on wywnioskowany z nazwy funkcji lub klasy, w której zdefiniowany jest ten komponent. Możesz chcieć jawnie go zdefiniować, jeśli chcesz wyświetlić inną nazwę komponentu przy debugowaniu lub kiedy stworzysz komponent wyższego rzędu, po szczegóły odwiedź [Owiń nazwę wyświetlenia dla łatwego debugowania](/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging).

* * *

## Właściwości instancji {#instance-properties-1}

### `props` {#props}

`this.props` zawiera właściwości, które zostały zdefiniowane przez przywołującego tego komponentu. Po wprowadzenie do właściwości, odwiedź [Komponenty i właściwości](/docs/components-and-props.html).

W szczególności, `this.props.children` jest specjalną właściwością, zazwyczaj zdefiniowaną poprzez potomne tagi w wyrażeniu JSX, a nie w samym tagu instancji.

### `state` {#state}

Stan zawiera dane specyficzne dla tego komponentu, które mogą zmieniać się w czasie. Stan jest definiowany przez użytkownika i powinien być zwykłym javascriptowym obiektem.

Jeśli jakaś wartość nie jest używana do renderowania ani przepływu danych (na przykład, ID licznika czasu), nie musisz umieszczać jej w stanie. Wartości tego typu mogą być zdefiniowane jako pola składowe instancji komponentu.

Po informacje na temat stanu, odwiedź [Stan i cykl życia](/docs/state-and-lifecycle.html).

Nigdy nie zmieniaj `this.state` bezpośrednio, gdyż późniejsze wywołanie `setState()` może zastąpić wykonaną przez ciebie zmianę. Traktuj `this.state` jako niezmienny.
