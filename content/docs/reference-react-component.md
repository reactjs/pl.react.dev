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

Ta strona zawiera szegółowe odniesienie do definicji klasy reactowego komponentu. Zakłada ona, że znasz fundamentalne zagadnienia Reacta, takie jak [Komponenty i właściwości](/docs/components-and-props.html), i [Stan i cykl życia](/docs/state-and-lifecycle.html). Jeśli nie, przeczytaj je najpierw.

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

**Mocno odradadzamy tworzenie własnych klas bazowych komponentów.** W Reactowych komponentach [wielokrotne użycie kodu jest osiągane przede wszystkim przez kompozycję, a nie dziedziczenie](/docs/composition-vs-inheritance.html).

>Uwaga:
>
>React nie zmusza cię do stosowania składni klasy ze standardu ES6. Jeśli wolisz jej uniknąć, możesz zamiast niej użyć modułu `create-react-class` lub podobnej niestandardowej abstrakcji. Aby dowiedzieć się więcej, zobacz rozdział [React bez ES6](/docs/react-without-es6.html).

### Cykl życia komponentu {#the-component-lifecycle}

Każdy komponent ma kilka "metod cyklu życia", które możesz nadpisać, aby uruchomić kod w szczególnych momentach programu. **Możesz użyć [tego diagramu cyklu życia](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) jako ściągawki.** Na liście poniżej, często używane metody cyklu życia zostały **pogrubione**. Reszta z nich istnieje dla stosunkowo rzadkich przypadków użycia.

#### Montowanie {#mounting}

Podczas, gdy instancja komponentu zostaje stworzona i włożona do drzewa DOM, w podanej kolejności wywołwane są poniższe metody:

- [**`constructor()`**](#constructor)
- [`static getDerivedStateFromProps()`](#static-getderivedstatefromprops)
- [**`render()`**](#render)
- [**`componentDidMount()`**](#componentdidmount)

>Uwaga:
>
>Te metody są uznawane za przestarzałe (ang. *legacy*) i powinno się [ich unikać](/blog/2018/03/27/update-on-async-rendering.html) w nowym kodzie:
>
>- [`UNSAFE_componentWillMount()`](#unsafe_componentwillmount)

#### Aktualizacja {#updating}

Aktualizacja może być spowodowana zmianami we właściwościach lub stanie komponentu. Kiedy komponent zostaje ponownie zrenderowany, w podanej kolejności wywołane zostają poniższe metody:

- [`static getDerivedStateFromProps()`](#static-getderivedstatefromprops)
- [`shouldComponentUpdate()`](#shouldcomponentupdate)
- [**`render()`**](#render)
- [`getSnapshotBeforeUpdate()`](#getsnapshotbeforeupdate)
- [**`componentDidUpdate()`**](#componentdidupdate)

>Uwaga:
>
>Te metody są uznawane za spadek i powinno się [ich unikać](/blog/2018/03/27/update-on-async-rendering.html) w nowym kodzie:
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

Metody opisane w tym rozdziale pokrywają zdecydowaną większość przypadków użycia, na które natkniesz się tworząc reactowe komponenty. **Dla odniesienia wizualnego, zobacz [ten diagram cyklu życia](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/).**

### `render()` {#render}

```javascript
render()
```

Metoda `render()` jest jedyną metodą wymaganą w komponencie klasowym.

Wywołana, powinna sprawdzić `this.props` i `this.state` oraz zwrócić jeden z poniższych typów:

- **Reactowe elementy.** Zwykle tworzone poprzez [JSX](/docs/introducing-jsx.html). Na przykład, `<div />` i `<MyComponent />` są reactowymi elementami, które instruują Reacta, aby, odpowiednio, zrenderował węzeł drzewa DOM, lub inny zdefiniowany przez użytkownika komponent.
- **Tablice i fragmenty.** Pozwalają na zwrócenie wielu elementów z metody render. Po więcej szczegółów odwiedź dokumentację [fragmentów](/docs/fragments.html).
- **Portale**. Pozwalają na zrenderowanie elementów potomnych w innym poddrzewie DOM. Po więcej szczegółów odwiedź dokumentację [portali](/docs/portals.html).
- **Łańcuchy znaków i liczby.** Zostają zrenderowane jako węzły tekstowe w drzewie DOM.
- **Typ logiczny lub `null`**. Nie renderuje nic. (Istnieje głównie, aby wspierać wzorzec `return test && <Child />`, gdzie `test` jest wartością logiczną.)

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

**Możesz wywołać metodę `setState()` od razu** w `componentDidMount()`. Spowoduje to dodatkowe renderowanie, ale zostanie ono wykonane zanim przeglądarka zaktualizuje ekran. Jest to gwarancją, że pomimo, iż metoda `render()` będzie w tym przypadku wywołana dwa razy, użytkownik nie zobaczy pośredniego stanu. Używaj tego wzorca uważnie, ponieważ często powoduje on problemy z wydajnością. W większości przypadków, powinieneś zamiast tego mieć możliwość przypisania stanu początkowego w konstruktorze. Może to być natomiast konieczne w przypadkach takich jak okna modalne i okienka podpowiedzi, kiedy przed zrenderowaniem czegoś trzeba zmierzyć węzeł drzewa DOM.

* * *

### `componentDidUpdate()` {#componentdidupdate}

```javascript
componentDidUpdate(prevProps, prevState, snapshot)
```

Metoda `componentDidUpdate()` jest wywoływana bezpośrednio po wystąpieniu aktualizacji. Nie jest ona wywoływana po początkowym zrenderowaniu.

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

**Nie powinieneś wywoływać metody `setState()`** w `componentWillUnmount()`, ponieważ ten komponent nie zostanie ponownie zrenderowany. Kiedy instancja komponentu zostaje odmonotowana, nigdy nie będzie zamontowana ponownie.

* * *

### Rzadko używane metody cyklu życia {#rarely-used-lifecycle-methods}

Metody zawarte w tej sekcji odpowiadają rzadkim przypadkom użycia. Czasem są przydatnę, ale większość twoich komponentów najprawdopodobniej nie będzie ich potrzebowała. **Większość poniższych metod możesz zobaczyć na [tym diagramie cyklu życia](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) po kliknięciu na checkbox "Pokaż rzadziej używane metody" u góry.**


### `shouldComponentUpdate()` {#shouldcomponentupdate}

```javascript
shouldComponentUpdate(nextProps, nextState)
```

Używaj metody `shouldComponentUpdate()`, aby dać znać Reactowi, czy obecna zmiana stanu lub właściwości komponentu nie wpłynęła na jego wynik. Domyślnym zachowaniem, na którym powinieneś polegać w większości przypadków, jest ponowne renderowanie przy każdej zmianie stanu.

Metoda `shouldComponentUpdate()` jest wywoływana przed renderowaniem, gdy otrzymywane są nowe właściwości lub stan. Domylnie wartość zwracana to `true`. Ta metoda nie jest wywoływana przy początkowym renderowaniu lub kiedy została użyta metoda `forceUpdate()`.

Ta metoda istnieje tylko jako **[optymalizacja wydajności](/docs/optimizing-performance.html).** Nie polegaj na niej aby "zapobiegać" renderowaniu, co może prowadzić do błędów. Zamiast pisania `shouldComponentUpdate()` własnoręcznie, **rozważ użycie wbudowanej klasy [`PureComponent`](/docs/react-api.html#reactpurecomponent)**. `PureComponent` przeprowadza płytkie porównanie właściwości i stanu, i obniża szansę na pominięcie niezbędnej aktualizacji.

Jeśli jesteś pewny, że chcesz ją napisać własnoręcznie, możesz porównać `this.props` z `nextProps` i `this.state` z `nextState` oraz zwrócić `false`, aby powiadomić Reacta, że aktualizacja może zostać pominięta. Zauważ, że zwrócenie `false` nie zapobiega ponownemu zrenderowaniu komponentów potomnych, gdy *ich* stan się zmienia.

Nie zalecamy wykonywania głębokich porównań lub używania `JSON.stringify()` w metodzie `shouldComponentUpdate()`. Jest to bardzo nieefektywne i negatywnie odbije się na wydajności.

Obecnie, jeśli `shouldComponentUpdate()` zwróci `false`, [`UNSAFE_componentWillUpdate()`](#unsafe_componentwillupdate), [`render()`](#render) i [`componentDidUpdate()`](#componentdidupdate) nie zostana wywołane. W przyszłosci React może traktować `shouldComponentUpdate()` jako wskazówkę, a nie jako ścisłą dyrektywę, a zwrócenie `false` może mimo wszytko skutkować ponownym zrenderowaniem komponentu.

* * *

### `static getDerivedStateFromProps()` {#static-getderivedstatefromprops}

```js
static getDerivedStateFromProps(props, state)
```

Metoda `getDerivedStateFromProps` jest wywoływana zaraz przed wywołaniem metody render, zarówno przy początkowym montowaniu, jak i przy dalszych aktualizacjach. Powinna zwrócić obiekt, aby zaktualizować stan, lub zwrócić null, aby nie aktualizować nic.

Ta metoda istnieje dla [rzadkich przypadków użycia](/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state), w których stan zależy od zmian właściwości w czasie. Na przykład, może okazać się przydatnym komponent `<Transition>`, który porównuje swoje obecne komponenty potomne z poprzednimi, aby zdecydować, króre z nich mają pojawić się z animacją, a które zniknąć.

Derywowanie stanu sprawia, że kod jest rozwlekły i trudno myśli się o komponentach.  
[Upewnij się, że znasz prostsze alternatywy:](/blog/2018/06/07/you-probably-dont-need-derived-state.html)

* Jeśli potrzebujesz **spowodować efekt uboczny** (na przykład pobranie danych, albo animację) w odpowiedzi na zmianę właściwości, zamiast tego użyj metody cyklu życia [`componentDidUpdate`](#componentdidupdate).

* Jeśli chcesz **ponownie obliczyć pewne dane tylko, kiedy zmieni się właściwość**, [zamiast tego użyj pomocniczych technik memoizacyjnych](/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization).

* Jeśli chcesz **"zresetować" stan przy zmianie właściwości**, rozważ zamiast tego uczynienie komponentu [całkowicie kontrolowanym](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) lub [całkowicie niekontrolowanym z właściwością `key`](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key).

Ta metoda nie ma dostępu do instancji komponentu. Jeśli chcesz, możesz używać ponownie kod pomiędzy `getDerivedStateFromProps()` innymi metodami klasy poprzez wyodrębnienie czystych funkcji właściwości i stanu komponentu poza definicję klasy.

Zauważ, że metoda ta wywoływana jest przy *każdym* renderowaniu, bez względu na przyczynę. Jest to kontrastem dla metody `UNSAFE_componentWillReceiveProps`, która zostaje wywołana tylko, kiedy komponent nadrzędny powoduje ponowne zrenderowanie, a nie jako wynik lokalnego wywołania metody `setState`.

* * *

### `getSnapshotBeforeUpdate()` {#getsnapshotbeforeupdate}

```javascript
getSnapshotBeforeUpdate(prevProps, prevState)
```

Metoda `getSnapshotBeforeUpdate()` jest wywoływana zaraz przed tym, gdy ostatnio zrenderowany wynik zostaje zatwierdzony do np. drzewa DOM. Pozwala to twojemu komponentowi na przejęcie pewnych informacji z drzewa DOM (np. pozycje scrolla) przed ich potencjalną zmianą. Każda wartość zwrócona przez metodę cyklu życia zostanie przekazana jako parametr do metody `componentDidUpdate()`.

Ten przypadek użycia nie jest częsty, ale może wystąpić w interfejsach użytkownika takich jak wątki czatu, które potrzebują możliwości zarządzania pozycją scrolla w specjalny sposób.

Powinna być zwrócona wartość snapshotu (lub `null`).

Dla przykładu:

`embed:react-component-reference/get-snapshot-before-update.js`

W powyższych przykładach, ważne jest odczytanie własności `scrollHeight` w metodzie `getSnapshotBeforeUpdate`, ponieważ mogą wystąpić opóźnienia pomiędzy metodami cyklu życia w fazie "render" (takimi jak `render`), a metodami fazy "commit" (takimi jak `getSnapshotBeforeUpdate` i `componentDidUpdate`).

* * *

### Granice błędów {#error-boundaries}

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
    // Aktualizacja stanu, aby kolejne zrenderowanie pokazało awaryjny interfejs użytkownika.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // Możesz zrenderować dowolny spersonalizowany interfejs użytkownika
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
    // Aktualizacja stanu, aby kolejne zrenderowanie pokazało awaryjny interfejs użytkownika.
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
      // Możesz zrenderować dowolny spersonalizowany interfejs użytkownika
      return <h1>Coś poszło nie tak.</h1>;
    }

    return this.props.children; 
  }
}
```

> Uwaga
> 
> W razie wyjątku, możesz zrenderować awaryjny interfejs użytkownika za pomocą metody `componentDidCatch()` poprzez wywołanie metody `setState`, ale możliwość ta będzie przestarzała w przyszłych wersjach.
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

Zauważ, że jeśli komponent nadrzędny powoduje ponowne zrenderowanie twojego komponentu, ta metoda będzie wywołana nawet jeśli właściwości nie uległy zmianie. Jeśli chcesz tylko obsłużyć zmiany, upewnij się, że porównujesz poprzednie i obecne wartości.

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

`setState()` enqueues changes to the component state and tells React that this component and its children need to be re-rendered with the updated state. This is the primary method you use to update the user interface in response to event handlers and server responses.

Think of `setState()` as a *request* rather than an immediate command to update the component. For better perceived performance, React may delay it, and then update several components in a single pass. React does not guarantee that the state changes are applied immediately.

`setState()` does not always immediately update the component. It may batch or defer the update until later. This makes reading `this.state` right after calling `setState()` a potential pitfall. Instead, use `componentDidUpdate` or a `setState` callback (`setState(updater, callback)`), either of which are guaranteed to fire after the update has been applied. If you need to set the state based on the previous state, read about the `updater` argument below.

`setState()` will always lead to a re-render unless `shouldComponentUpdate()` returns `false`. If mutable objects are being used and conditional rendering logic cannot be implemented in `shouldComponentUpdate()`, calling `setState()` only when the new state differs from the previous state will avoid unnecessary re-renders.

The first argument is an `updater` function with the signature:

```javascript
(state, props) => stateChange
```

`state` is a reference to the component state at the time the change is being applied. It should not be directly mutated. Instead, changes should be represented by building a new object based on the input from `state` and `props`. For instance, suppose we wanted to increment a value in state by `props.step`:

```javascript
this.setState((state, props) => {
  return {counter: state.counter + props.step};
});
```

Both `state` and `props` received by the updater function are guaranteed to be up-to-date. The output of the updater is shallowly merged with `state`.

The second parameter to `setState()` is an optional callback function that will be executed once `setState` is completed and the component is re-rendered. Generally we recommend using `componentDidUpdate()` for such logic instead.

You may optionally pass an object as the first argument to `setState()` instead of a function:

```javascript
setState(stateChange[, callback])
```

This performs a shallow merge of `stateChange` into the new state, e.g., to adjust a shopping cart item quantity:

```javascript
this.setState({quantity: 2})
```

This form of `setState()` is also asynchronous, and multiple calls during the same cycle may be batched together. For example, if you attempt to increment an item quantity more than once in the same cycle, that will result in the equivalent of:

```javaScript
Object.assign(
  previousState,
  {quantity: state.quantity + 1},
  {quantity: state.quantity + 1},
  ...
)
```

Subsequent calls will override values from previous calls in the same cycle, so the quantity will only be incremented once. If the next state depends on the current state, we recommend using the updater function form, instead:

```js
this.setState((state) => {
  return {quantity: state.quantity + 1};
});
```

For more detail, see:

* [State and Lifecycle guide](/docs/state-and-lifecycle.html)
* [In depth: When and why are `setState()` calls batched?](https://stackoverflow.com/a/48610973/458193)
* [In depth: Why isn't `this.state` updated immediately?](https://github.com/facebook/react/issues/11527#issuecomment-360199710)

* * *

### `forceUpdate()` {#forceupdate}

```javascript
component.forceUpdate(callback)
```

By default, when your component's state or props change, your component will re-render. If your `render()` method depends on some other data, you can tell React that the component needs re-rendering by calling `forceUpdate()`.

Calling `forceUpdate()` will cause `render()` to be called on the component, skipping `shouldComponentUpdate()`. This will trigger the normal lifecycle methods for child components, including the `shouldComponentUpdate()` method of each child. React will still only update the DOM if the markup changes.

Normally you should try to avoid all uses of `forceUpdate()` and only read from `this.props` and `this.state` in `render()`.

* * *

## Class Properties {#class-properties-1}

### `defaultProps` {#defaultprops}

`defaultProps` can be defined as a property on the component class itself, to set the default props for the class. This is used for undefined props, but not for null props. For example:

```js
class CustomButton extends React.Component {
  // ...
}

CustomButton.defaultProps = {
  color: 'blue'
};
```

If `props.color` is not provided, it will be set by default to `'blue'`:

```js
  render() {
    return <CustomButton /> ; // props.color will be set to blue
  }
```

If `props.color` is set to null, it will remain null:

```js
  render() {
    return <CustomButton color={null} /> ; // props.color will remain null
  }
```

* * *

### `displayName` {#displayname}

The `displayName` string is used in debugging messages. Usually, you don't need to set it explicitly because it's inferred from the name of the function or class that defines the component. You might want to set it explicitly if you want to display a different name for debugging purposes or when you create a higher-order component, see [Wrap the Display Name for Easy Debugging](/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging) for details.

* * *

## Instance Properties {#instance-properties-1}

### `props` {#props}

`this.props` contains the props that were defined by the caller of this component. See [Components and Props](/docs/components-and-props.html) for an introduction to props.

In particular, `this.props.children` is a special prop, typically defined by the child tags in the JSX expression rather than in the tag itself.

### `state` {#state}

The state contains data specific to this component that may change over time. The state is user-defined, and it should be a plain JavaScript object.

If some value isn't used for rendering or data flow (for example, a timer ID), you don't have to put it in the state. Such values can be defined as fields on the component instance.

See [State and Lifecycle](/docs/state-and-lifecycle.html) for more information about the state.

Never mutate `this.state` directly, as calling `setState()` afterwards may replace the mutation you made. Treat `this.state` as if it were immutable.
