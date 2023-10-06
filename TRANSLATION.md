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

| Termin oryginalny | Sugestia (z literatury) | Uwagi |
| ------------------ | ---------- | ---------- |
| ahead-of-time compilation	| kompilacja z wyprzedzeniem | Za pierwszym razem z dopiskiem (ang. *ahead-of-time compilation*) |
| API reference	| dokumentacja API | |
| array	| tablica | |
| arrow function | funkcja strzałkowa | Za pierwszym razem z dopiskiem (ang. *arrow function*) |
| assertion	| asercja | |
| boilerplate | kod szablonowy | |
| bug | błąd | |
| build pipeline | potok budowania | Za pierwszym razem z dopiskiem (ang. *build pipeline*) |
| bundler | bundler | |
| callback | funkcja zwrotna | Za pierwszym razem z dopiskiem (ang. *callback*) |
| camelCase	| notacja "camelCase" | Odmiana: camelCasem, ale: camelCase'owi camelCase'a |
| child component | komponent potomny | |
| cleanup function | funkcja czyszcząca | W kontekście `useEffect` |
| client | klient | |
| clients | klienty | Nie: klienci |
| component state | stan komponentu | |
| component wrapping | opakowywanie komponentu | |
| concept | zagadnienie | |
| controlled component | komponent kontrolowany | |
| data | dane | l.poj: wartość |
| debugging	| debugowanie | |
| destructuring assignment | przypisanie destrukturyzujące | |
| Developer Tools | narzędzia programistyczne | |
| development server | serwer deweloperski | |
| dispatcher | dyspozytor | Za pierwszym razem z dopiskiem (ang. *dispatcher*) |
| dispatching an event | przesyłanie zdarzenia | |
| dummy component | sztuczny komponent | |
| effect event | zdarzenie efektu | W kontekście `useEffectEvent` |
| event handler | procedura obsługi zdarzenia | |
| framework	| framework | |
| function component | komponent funkcyjny | |
| generic 'box' | "pojemnik" ogólnego użytku | Mowa o rodzaju komponentów, np. Dialog |
| garbage collector | program czyszczący pamięć | |
| glossary | słownik pojęć | |
| hands-on tutorial	| praktyczny tutorial | |
| higher-order components | komponenty wyższego rzędu | Za pierwszym razem z dopiskiem (ang. *higher-order components*) |
| hook | hook | |
| HTML entities | encje HTML | |
| hydrate | hydratować | Używać sporadycznie, najlepiej tłumaczyć niedosłownie, np. "odtwarzać drzewo komponentów, "ulegać hydratacji" |
| hydration | hydratacja | |
| idea | zagadnienie | |
| immutable | niezmienny | Za pierwszym razem z dopiskiem (ang. *immutable*) |
| key | klucz | |
| lazy initialization | leniwa inicjalizacja | |
| library | biblioteka | |
| lowercase	| małymi literami | Nie piszemy: "z małej litery" |
| minify | minifikacja | |
| minified | zminifikowany | |
| mocked component | atrapa komponentu | Za pierwszym razem z dopiskiem (ang. *mocked component*) |
| opt-in | (stosowane) wedle własnego uznania | |
| overview | ogólne informacje | |
| polyfill | łatka | Za pierwszym razem z dopiskiem (ang. *polyfill*) |
| primitive	| typ podstawowy | |
| property | właściwość | Właściwość obiektu javascriptowego|
| props	| właściwości | Za pierwszym razem z dopiskiem (ang. *props*) |
| react element	| element reactowy | |
| React DevTools | React DevTools | Nazwa rozszerzenia dla przeglądarki |
| read-only	| tylko do odczytu | |
| redux store | magazyn (reduxowy) | Za pierwszym razem z dopiskiem (ang. *store*) |
| render | renderować | rzecz. renderowanie, alternatywa: wyświetlać |
| reusable components | komponenty wielokrotnego użytku | |
| roadmap | plan działania | |
| section | podrozdział | Jeśli w ramach tego samego dokumentu, lub rozdział jeśli chodzi o inną stronę |
| selective hydration | hydratacja selektywna | |
| shallow rendering | renderowanie płytkie | Za pierwszym razem z dopiskiem (ang. *shallow rendering*) |
| SPA | aplikacja jednostronicowa | |
| spread operator | operator rozszczepienia | Za pierwszym razem z dopiskiem (ang. *spread operator*) |
| strict mode | tryb rygorystyczny | |
| string | ciąg znaków | Lub łańcuch znaków lub napis lub literał znakowy |
| tag | znacznik | |
| template literals	| literał szablonowy | |
| term | pojęcie | |
| throws an exception | rzuca wyjątek | |
| time slicing | kwantowanie czasu | |
| to assert	| wykonać sprawdzenie | (w testach) lub po prostu sprawdzać czy testować |
| Try it on CodePen	| Przetestuj kod na CodePen | |
| two-way binding | wiązanie dwukierunkowe | |
| UI | UI | |
| uncontrolled component | komponent niekontrolowany | |
| update | aktualizuje | |
| uppercase	| wielkimi literami | Nie piszemy: "z wielkiej litery" |
| versioned documentation | dokumentacja wersji | Dokumentacja dedykowana dla każdej wersji Reacta |
| wrapper component	| komponent opakowujący | Za pierwszym razem z dopiskiem (ang. *wrapper component*) |

Odmiana przez przypadki (deklinacja):

React

| Przypadek | Przykład |
| ------------------ | ---------- |
| Mianownik (kto? co?) | React |
| Dopełniacz (kogo? czego?) | Reacta |
| Celownik (komu? czemu?) | Reactowi |
| Biernik (kogo? co?) | Reacta |
| Narzędnik ((z) kim? (z) czym?) | Reactem |
| Miejscownik (o kim? o czym?) | Reakcie |
| Wołacz (o?) | React |

JavaScript

| Przypadek | Przykład |
| ------------------ | ---------- |
| Mianownik (kto? co?) | JavaScript |
| Dopełniacz (kogo? czego?) | JavaScriptu |
| Celownik (komu? czemu?) | JavaScriptowi |
| Biernik (kogo? co?) | JavaScriptu |
| Narzędnik ((z) kim? (z) czym?) | JavaScriptem |
| Miejscownik (o kim? o czym?) | JavaScripcie |
| Wołacz (o?) | JavaScript |

Hook

| Przypadek | Przykład |
| ------------------ | ---------- |
| Mianownik (kto? co?) | Hook |
| Dopełniacz (kogo? czego?) | Hooka |
| Celownik (komu? czemu?) | Hookowi |
| Biernik (kogo? co?) | Hooka |
| Narzędnik ((z) kim? (z) czym?) | Hookiem |
| Miejscownik (o kim? o czym?) | Hooku |
| Wołacz (o?) | Hooku |