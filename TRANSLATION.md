# Jak tłumaczyć stronę reactjs.org?

Aktualny postęp tłumaczenia: https://github.com/reactjs/pl.reactjs.org/issues/1

## Identyfikatory nagłówków

Wszystkie nagłówki mają swój unikalny identyfikator, na przykład:

```md
## Try React {#try-react}
```

**Nie wolno** tłumaczyć tych identyfikatorów! Są one używane przez nawigację i jeśli je zmienimy, odwołania z innych stron (takie, jak to poniżej) przestaną działać!

```md
Po więcej informacji zajrzyj do [wstępu](/getting-started#try-react).
```

✅ TAK MOŻNA:

```md
## Wypróbuj React {#try-react}
```

❌ ALE TAK JUŻ NIE:

```md
## Wypróbuj React {#wyprobuj-react}
```


## Tekst w blokach kodu

Tekstu w blokach kodu nie tłumaczymy, z wyjątkiem komentarzy. Jeśli chcesz, możesz też przetłumaczyć tekst w stringach, ale uważaj, żeby nie tłumaczyć tych, które mają wpływ na działanie kodu!

Przykład:
```js
// Example
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

✅ TAK MOŻNA:

```js
// Przykład
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

✅ TAK TEŻ MOŻNA:

```js
// Przykład
const element = <h1>Witaj, świecie!</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

❌ TAK NIE MOŻNA:

```js
// Przykład
const element = <h1>Witaj, świecie!</h1>;
// "root" to identyfikator elementu.
// NIE TŁUMACZYĆ!
ReactDOM.render(element, document.getElementById('korzeń'));
```

❌ TAK TYM BARDZIEJ NIE WOLNO:

```js
// Przykład
const element = <h1>Witaj, świecie!</h1>;
ReactDOM.renderuj(element, dokument.znajdzElementPoId('korzeń'));
```

## Linki zewnętrzne

Jeśli link zewnętrzny przenosi do artykułu ze źródła takiego jak [MDN] czy [Wikipedia], a w dodatku istnieje całkiem dobra jakościowo wersja tego artykułu w języku polskim, podmień link na wersję polską.

[MDN]: https://developer.mozilla.org/en-US/
[Wikipedia]: https://en.wikipedia.org/wiki/Main_Page

Przykład:

```md
But if `SharedApplicationState.recordEvent` is not [idempotent](https://en.wikipedia.org/wiki/Idempotence#Computer_science_meaning), then instantiating this component multiple times could lead to invalid application state.
```

✅ OK:

```md
Lecz jeśli `SharedApplicationState.recordEvent` nie będzie [idempotentny](https://pl.wikipedia.org/wiki/Idempotentność), to tworzenie instancji tego komponentu wielokrotnie może spowodować błędy w stanie aplikacji.
```

W przypadku linków, które nie mają odpowiedników (posty ze Stack Overflow, filmiki z YouTube itp.), używaj wersji oryginalnych, angielskich.

# Glosariusz

Oto kilka sugestii dotyczących tłumaczenia terminów powszechnie używanych w tego typu dokumentacji technicznej.

Terminy z (?) przy sugestii są do przegadania. Jeśli wiesz, jakie powinno ich być poprawne tłumaczenie i masz dowód w postaci linku/cytatu z literatury/blogów/poradni językowych, to daj znać [w odpowiednim wątku](https://github.com/reactjs/pl.reactjs.org/issues/3).

| Termin oryginalny | Sugestia (z literatury) |
| ------------------ | ---------- |
| ahead-of-time compilation	| kompilacja z wyprzedzeniem |
| API reference	| dokumentacja API |
| array	| tablica |
| arrow function | funkcja strzałkowa |
| assertion	| asercja |
| boilerplate | kod szablonowy |
| bug | błąd |
| build pipeline | potok budowania |
| bundler | bundler |
| callback | funkcja zwrotna |
| camelCase	| notacja "camelCase" |
| child component | komponent potomny |
| client | klient |
| clients | klienty |
| component state | stan komponentu |
| component wrapping | opakowywanie komponentu |
| concept | zagadnienie |
| controlled component | komponent kontrolowany |
| data | dane |
| debugging	debugowanie |
| destructuring assignment | przypisanie destrukturyzujące |
| Developer Tools | narzędzia programistyczne |
| development server | serwer deweloperski |
| dispatcher | dyspozytor |
| dispatching an event | przesyłanie zdarzenia |
| dummy component | sztuczny komponent |
| event handler | procedura obsługi zdarzenia |
| framework	| framework |
| function component | komponent funkcyjny |
| generic 'box' | "pojemnik" ogólnego użytku |
| glossary | słownik pojęć |
| hands-on tutorial	| praktyczny tutorial |
| higher-order components | komponenty wyższego rzędu |
| hook | hook |
| HTML entities | encje HTML |
| idea | zagadnienie |
| immutable | niezmienny |
| key | klucz |
| lazy initialization | leniwa inicjalizacja |
| library | biblioteka |
| lowercase	| małymi literami |
| minify | minifikacja |
| mocked component | atrapa komponentu |
| opt-in | (stosowane) wedle własnego uznania |
| overview | ogólne informacje |
| polyfill | łatka |
| primitive	| typ podstawowy |
| property | właściwość |
| props	| właściwości |
| react element	| element reactowy |
| read-only	| tylko do odczytu |
| redux store | magazyn (reduxowy) |
| render | renderować |
| reusable components | komponenty wielokrotnego użytku |
| roadmap | plan działania |
| section | podrozdział |
| shallow rendering | renderowanie płytkie |
| SPA | aplikacja jednostronicowa |
| spread operator | operator rozszczepienia |
| string | ciąg znaków |
| tag | znacznik |
| template literals	| literał szablonowy |
| term | pojęcie |
| throws an exception | rzuca wyjątek |
| to assert	| wykonać sprawdzenie |
| Try it on CodePen	| Przetestuj kod na CodePen |
| two-way binding | wiązanie dwukierunkowe |
| UI | UI |
| uncontrolled component | komponent niekontrolowany |
| update | aktualizuje |
| uppercase	| wielkimi literami |
| versioned documentation | dokumentacja wersji |
| wrapper component	| komponent opakowujący |