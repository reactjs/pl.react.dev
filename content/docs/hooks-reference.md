---
id: hooks-reference
title: Hooki - interfejs API
permalink: docs/hooks-reference.html
prev: hooks-custom.html
next: hooks-faq.html
---

*Hooki* są nowym dodatkiem w Reakcie 16.8. Pozwalają one używać stanu i innych funkcjonalności Reacta, bez użycia klas.

Ten rozdział opisuje interfejs API hooków wbudowanych w Reacta.

Jeżeli pierwszy raz stykasz się z hookami, możesz najpierw sprawdzić rozdział pt. [„Hooki w pigułce”](/docs/hooks-overview.html). W rozdziale z [najczęściej zadawanymi pytaniami](/docs/hooks-faq.html) możesz znaleźć inne przydatne informacje.

- [Podstawowe hooki](#basic-hooks)
  - [`useState`](#usestate)
  - [`useEffect`](#useeffect)
  - [`useContext`](#usecontext)
- [Zaawansowane hooki](#additional-hooks)
  - [`useReducer`](#usereducer)
  - [`useCallback`](#usecallback)
  - [`useMemo`](#usememo)
  - [`useRef`](#useref)
  - [`useImperativeHandle`](#useimperativehandle)
  - [`useLayoutEffect`](#uselayouteffect)
  - [`useDebugValue`](#usedebugvalue)

## Podstawowe hooki {#basic-hooks}

### `useState` {#usestate}

```js
const [state, setState] = useState(initialState);
```

Zwraca zmienną przechowującą lokalny stan i funkcję do jego aktualizacji.

Podczas pierwszego renderowania zwrócona wartość stanu (`state`) jest taka sama, jak wartość przekazana jako pierwszy argument (`initialState`).

Funkcja `setState` jest używana do aktualizacji stanu. Przyjmuje ona nową wartość stanu i kolejkuje ponowne renderowanie komponentu.

```js
setState(newState);
```

Podczas kolejnych ponownych renderowań pierwszą wartością zwracaną przez `useState` będzie zawsze najnowszy, zaktualizowany stan.

>Uwaga
>
>React daje gwarancje, że funkcja `setState` jest tożsamościowa i że nie zmienia się podczas kolejnych renderowań. Dlatego też można ją bezpiecznie pominąć na liście zależności `useEffect` i `useCallback`.

#### Aktualizacje funkcyjne {#functional-updates}

Jeżeli nowy stan wyliczany jest z poprzedniego, możesz przekazać funkcję jako argument do `setState`. Funkcja otrzymuje poprzednią wartość stanu, a zwraca nową, zaktualizowaną wartość. Oto przykład komponentu licznika, który wykorzystuje obie formy `setState`:

```js
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Licznik: {count}
      <button onClick={() => setCount(initialCount)}>Zresetuj</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```

Przyciski „+” i „-” wykorzystują formę funkcyjną, ponieważ zaktualizowana wartość bazuje na poprzedniej. Z kolei przycisk „Zresetuj” używa normalnej formy, ponieważ zawsze przywraca początkową wartość.

Jeśli twoja funkcja aktualizująca zwróci wartość identyczną jak aktualna, nie spowoduje to ponownego wyrenderowania.

> Uwaga
>
> W przeciwieństwie do metody `setState` znanej z komponentów klasowych, funkcja `useState` nie scala automatycznie obiektów reprezentujących aktualizację. Możesz powielić to zachowanie, łącząc formę aktualizacji funkcyjnej ze składnią operatora rozszczepienia (ang. *spread operator*) obiektu:
>
> ```js
> setState(prevState => {
>   // Object.assign również zadziała
>   return {...prevState, ...updatedValues};
> });
> ```
>
> Inną opcją jest hook `useReducer`, który jest bardziej odpowiedni do zarządzania obiektami stanów, zawierającymi wiele pod-wartości.

#### Leniwa inicjalizacja stanu {#lazy-initial-state}

Argument `initialState` jest wartością stanu używaną podczas pierwszego rendera. W kolejnych renderowaniach jest on pomijany. Jeśli początkowy stan jest wynikiem kosztownych obliczeń, możesz zamiast tego przekazać funkcję, która zostanie wykonana tylko przy pierwszym renderowaniu:

```js
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

#### Wycofanie się z aktualizacji stanu {#bailing-out-of-a-state-update}

Jeżeli zaktualizujesz hook stanu do takiej samej wartości, jaka jest aktualnie przechowywana w stanie, React „wymiga się”, nie aktualizując potomków i nie uruchamiając efektów. (React używa [algorytmu porównywania `Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description).)

Pamiętaj, że React może nadal wymagać wyrenderowania tego konkretnego komponentu, zanim wymiga się od dalszych zmian. Nie powinno to być problemem, ponieważ React nie będzie niepotrzebnie wchodził „głębiej” w drzewo. Jeśli wykonujesz kosztowne obliczenia podczas renderowania, możesz je zoptymalizować za pomocą `useMemo`.

### `useEffect` {#useeffect}

```js
useEffect(didUpdate);
```

Przyjmuje funkcję zawierającą imperatywny kod, mogący zawierać efekty uboczne.

W ciele głównej funkcji komponentu (określanej jako _faza renderowania_ Reacta) nie jest dozwolone mutowanie danych, tworzenie subskrypcji, timerów, logowanie i inne efekty uboczne. Robiąc tak należy spodziewać się mylących błędów i niespójności w interfejsie użytkownika.

Zamiast tego użyj `useEffect`. Funkcja przekazana do `useEffect` zostanie uruchomiona po tym, jak  zmiany zostaną wyświetlone się na ekranie. Traktuj efekty jako furtkę pomiędzy czysto funkcyjnym światem Reacta, a imperatywnym światem.

Domyślnie efekty są uruchamiane po każdym wyrenderowaniu komponentu, ale możesz sprawić, że uruchomią się [tylko jeżeli zmienią się jakieś wartości](#conditionally-firing-an-effect).

#### Czyszczenie po efekcie {#cleaning-up-an-effect}

Często efekty tworzą zasoby (np. subskrypcję czy ID timera), które należy uprzątnąć zanim komponent opuści ekran. Aby to uczynić funkcja przekazywana do `useEffect` może zwracać funkcję czyszczącą. Na przykład przy tworzeniu subskrypcji:

```js
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Uprzątnij subskrypcję
    subscription.unsubscribe();
  };
});
```

Aby zapobiec wyciekom pamięci, funkcja czyszcząca wywoływana jest zanim komponent zostanie usunięty z interfejsu użytkownika. Dodatkowo jeśli komponent jest renderowany kilkukrotnie (co zwykle ma miejsce), **poprzedni efekt jest czyszczony przed wywołaniem kolejnego efektu**. W naszym przykładzie oznacza to, że nowa subskrypcja tworzona jest przy każdej aktualizacji. W kolejnym podrozdziale opisujemy, jak uniknąć wywoływania efektów przy każdej aktualizacji.

#### Harmonogram efektów {#timing-of-effects}

W przeciwieństwie do metod `componentDidMount` i `componentDidUpdate` funkcja przekazana do  `useEffect` wywoływana zostanie **po tym** jak skomponowany i namalowany zostanie układ strony. Sprawia to, że nadaje się ona do obsługi wielu typowych efektów ubocznych, takich jak tworzenie subskrypcji czy obsługa zdarzeń. Większość tego typu operacji nie powinna powstrzymywać przeglądarki przed odświeżeniem widoku.

Jednakże nie wszystkie efekty mogą zostać odroczone. Na przykład manipulacja drzewem DOM, widoczna dla użytkownika, musi zostać wywołana synchronicznie przed każdym malowaniem, tak aby użytkownik nie dostrzegł wizualnej niespójności. (Rozróżnienie to w swej koncepcji podobne jest do pasywnych i aktywnych obserwatorów zdarzeń (ang. *event listeners*).) Dla tego typu efektów React przewiduje dodatkowy hook, nazwany [`useLayoutEffect`](#uselayouteffect). Ma on tę samą sygnaturę co `useEffect`, różnie się jedynie tym, kiedy jest wywoływany.

Pomimo, że wywołanie `useEffect` jest odraczane do czasu, kiedy przeglądarka zakończy malowanie, jest zagwarantowane, że zostanie wykonane przed każdym nowym renderem. React opróżni bufor efektów z poprzednich renderów, zanim rozpocznie nową aktualizację.

#### Warunkowe uruchamianie efektów {#conditionally-firing-an-effect}

Domyślnym zachowaniem efektów jest ich uruchamianie po każdym pomyślnym renderze. W ten sposób efekt jest zawsze tworzony na nowo, jeśli zmieni się jedna z jego zależności.

<<<<<<< HEAD
Jednakże w pewnych przypadkach może się to okazać zabójcze - choćby w przykładzie subskrypcji z poprzedniego podrozdziału. Nie ma potrzeby tworzyć nowej subskrypcji przy każdej aktualizacji, a jedynie wtedy gdy zmieni się właściwość `source`.
=======
However, this may be overkill in some cases, like the subscription example from the previous section. We don't need to create a new subscription on every update, only if the `source` prop has changed.
>>>>>>> 335d64336234bcb7ba527ff94919a07da27f8549

Aby zaimplementować takie zachowanie należy przekazać do `useEffect` drugi argument, będący tablicą wartości, od których zależy efekt. Nasz zaktualizowany przykład wygląda następująco:

```js
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);
```

Teraz subskrypcja zostanie stworzona ponownie tylko wtedy, gdy zmieni się właściwość `props.source`.

>Uwaga
>
>Jeśli korzystasz z tej techniki optymalizacji, upewnij się, że przekazywana tablica zawiera **wszystkie wartości z zasięgu komponentu (takie jak właściwości (ang. *props*) i stan), które zmieniają się w czasie i które są używane przez efekt.** W przeciwnym razie twój kod odwoła się do starych wartości z poprzednich renderowań. Przeczytaj też, [jak radzić sobie z funkcjami](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) i [co robić, gdy tablica zmienia się zbyt często](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often).
>
>Jeśli chcesz przeprowadzić efekt i posprzątać po nim tylko raz (podczas montowania i odmontowania), możesz przekazać pustą tablicę (`[]`) jako drugi argument. Dzięki temu React wie, że twój efekt nie zależy od *jakichkolwiek* wartości właściwości lub stanu, więc nigdy nie musi być ponownie uruchamiany. Nie jest to traktowane jako przypadek specjalny -- wynika to bezpośrednio z tego, jak zawsze działa tablica wejść.
>
>Jeśli przekażesz pustą tablicę (`[]`) właściwości i stan wewnątrz efektu zawsze przyjmą swoje początkowe wartości. Pomimo że przekazywanie `[]` jest bliższe temu, co znamy z metod `componentDidMount` i `componentWillUnmount`, zwykle istnieją [lepsze](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) [rozwiązania](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often) pomagające uniknąć zbyt częstego powtarzania efektów. Nie zapominaj też, że React opóźni wywołanie `useEffect` do momentu, aż przeglądarka nie skończy rysować widoku, więc dodatkowa praca tutaj nie jest dużym problemem.
>
>Polecamy użycie reguły [`exhaustive-deps`](https://github.com/facebook/react/issues/14920), będącej częścią naszego pakietu [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation). Ostrzega ona, gdy zależności są niepoprawnie zdefiniowane i sugeruje poprawki.

Tablica zależności nie jest przekazywana jako argumenty do funkcji efektu. Koncepcyjnie jednak to właśnie przedstawiają: każda wartość, do której odwołuje się funkcja efektu, powinna również pojawić się w tablicy zależności. W przyszłości dostatecznie zaawansowany kompilator mógłby automatycznie tworzyć tę tablicę.

### `useContext` {#usecontext}

```js
const value = useContext(MyContext);
```

Przyjmuje obiekt kontekstu (wartość zwróconą przez `React.createContext`) i zwraca jego aktualną wartość. Wartość kontekstu jest określana przez właściwość (ang. *prop*) `value` najbliższego rodzica `<MyContext.Provider>` wywołującego komponentu.

Kiedy najbliższy rodzic `<MyContext.Provider>` zostanie zaktualizowany, ten hook wywoła ponowne renderowanie komponentu z najnowszą wartością kontekstową `value` przekazaną dostawcy (ang. *provider*) `MyContext`. Nawet jeśli któryś z rodziców korzysta z funkcji [`React.memo`](/docs/react-api.html#reactmemo) lub metody [`shouldComponentUpdate`](/docs/react-component.html#shouldcomponentupdate), nastąpi ponowne wyrenderowanie poddrzewa, począwszy od komponentu korzystającego z `useContext`.

Pamiętaj, że argument przekazany do `useContext` musi być *samym obiektem kontekstu*:

 * **Poprawnie:** `useContext(MyContext)`
 * **Niepoprawnie:** `useContext(MyContext.Consumer)`
 * **Niepoprawnie:** `useContext(MyContext.Provider)`

Komponent wywołujący `useContext` będzie zawsze ponownie renderowany jeśli zmieni się wartość kontekstu. Jeżeli ponowne renderowanie danego komponentu jest kosztowne, możesz [zoptymalizować to zachowanie](https://github.com/facebook/react/issues/15156#issuecomment-474590693), używając techniki zapamiętywania (ang. *memoization*).

>Podpowiedź
>
>Jeśli znasz już interfejs API kontekstu -- `useContext(MyContext)` jest odpowiednikiem klasowego `static contextType = MyContext` lub też `<MyContext.Consumer>`.
>
>`useContext(MyContext)` pozwala tylko na *czytanie* kontekstu i nasłuchiwanie jego zmian. Wciąż wymagane jest aby w drzewie, ponad komponentem, znalazł się `<MyContext.Provider>` by mógł  *dostarczyć* (ang. *provide*) wartość tego kontekstu.

**W całości z użyciem Context.Provider wygląda to tak:**
```js{31-36}
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      Mam style z motywu kontekstowego!
    </button>
  );
}
```

Ten przykład został przygotowany pod hooki w oparciu o kod z rozdziału pt. [Zaawansowany poradnik dot. kontekstów](/docs/context.html), w którym znajdziesz więcej informacji o tym, kiedy i jak używać kontekstów.


## Zaawansowane hooki {#additional-hooks}

Poniższe hooki są albo są wariantami   tych podstawowych, z poprzedniego podrozdziału, albo są stosowane tylko w określonych skrajnych wypadkach. Nie stresuj się na myśl o nauce o nich.

### `useReducer` {#usereducer}

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

Alternatywa dla hooka [`useState`](#usestate). Przyjmuje reduktor (ang. *reducer*), będący funkcją o sygnaturze `(stan, akcja) => nowyStan`, a zwraca aktualny stan w parze z metodą `dispatch`. (Jeżeli znasz bibliotekę Redux, wiesz już, jak to działa.)

`useReducer` sprawdza się lepiej od `useState` tam, gdzie występuje skomplikowana logika związana ze stanem, obejmująca wiele pod-wartości lub gdy następny stan zależy od poprzedniego. `useReducer` pozwala też zoptymalizować wydajność komponentów uruchamiających głębokie aktualizacje, ponieważ zamiast przekazywać funkcje zwrotne (ang. *callback*), [możesz przekazać funkcję `dispatch` w dół drzewa](/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down).

Oto przykład licznika z podrozdziału [`useState`](#usestate) przepisany z użyciem reduktora:

```js
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Licznik: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

>Uwaga
>
>React daje gwarancje, że funkcja `dispatch` jest tożsamościowa i że nie zmienia się podczas kolejnych renderowań. Dlatego też można ją bezpiecznie pominąć na liście zależności `useEffect` i `useCallback`.

#### Określanie stanu początkowego {#specifying-the-initial-state}

Istnieją dwa sposoby na inicjalizację stanu `useReducer`. W zależności od potrzeb, możesz wybrać jeden z nich. Najprostszym sposobem jest przekazanie początkowego stanu, jako drugi argument:

```js{3}
  const [state, dispatch] = useReducer(
    reducer,
    {count: initialCount}
  );
```

>Uwaga
>
>React nie używa spopularyzowanej przez Reduxa konwencji argumentu `state = initialState`. Może się zdarzyć, że początkowa wartość zależy od właściwości (ang. *props*), a więc jest ona określana przy wywoływaniu hooka. Nie zalecamy, ale jeśli naprawdę musisz, możesz wywołać `useReducer(reducer, undefined, reducer)`, aby zasymulować zachowanie Reduxa.

#### Leniwa inicjalizacja {#lazy-initialization}

Możesz też leniwe zainicjalizować stan początkowy. Aby to zrobić, musisz przekazać funkcję inicjalizującą `init`, jako trzeci argument. Początkowy stan zostanie ustawiony na wynik wywołania `init(initialArg)`.

Pozwala to na wyodrębnić logikę dotyczącą obliczania stanu początkowego poza reduktor. Jest to też przydatne do późniejszego resetowania stanu, w odpowiedzi na akcję:

```js{1-3,11-12,19,24}
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Licznik: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Zresetuj
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

#### Wycofanie się z posłania akcji {#bailing-out-of-a-dispatch}

Jeżeli reduktor zwróci tę samą wartość, jaką aktualnie przyjmuje stan, React „wymiga się” od  aktualizacji potomków i uruchomienia efektów. (React używa [algorytmu porównywania `Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description).)

Pamiętaj, że React może nadal wymagać wyrenderowania tego konkretnego komponentu, zanim wymiga się od dalszych zmian. Nie powinno to być problemem, ponieważ React nie będzie niepotrzebnie wchodził „głębiej” w drzewo. Jeśli wykonujesz kosztowne obliczenia podczas renderowania, możesz je zoptymalizować za pomocą `useMemo`.

### `useCallback` {#usecallback}

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

Zwraca [zapamiętaną](https://en.wikipedia.org/wiki/Memoization) (ang *memoized*) funkcję zwrotną (ang. *callback*).

Przekaż funkcję zwrotną i tablicę zależności. `useCallback` zwróci zapamiętaną wersję funkcji, która zmieni się tylko wtedy, gdy zmieni się któraś z zależności. Jest to przydatne podczas przekazywania funkcji zwrotnych do zoptymalizowanych komponentów podrzędnych, które opierają się na równości referencji, aby zapobiec niepotrzebnym renderowaniom (np. `shouldComponentUpdate`).

`useCallback(fn, deps)` jest równoważne `useMemo(() => fn, deps)`.

> Uwaga
>
> Tablica zależności nie jest przekazywana jako argumenty do funkcji zwrotnej. Koncepcyjnie jednak to właśnie przedstawiają: każda wartość, do której odwołuje się funkcja zwrotna, powinna również pojawić się w tablicy zależności. W przyszłości dostatecznie zaawansowany kompilator mógłby automatycznie tworzyć tę tablicę.
>
> Polecamy użycie reguły [`exhaustive-deps`](https://github.com/facebook/react/issues/14920), będącej częścią naszego pakietu [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation). Ostrzega ona, gdy zależności są niepoprawnie zdefiniowane i sugeruje poprawki.

### `useMemo` {#usememo}

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

Zwraca [zapamiętaną](https://en.wikipedia.org/wiki/Memoization) (ang *memoized*) wartość.

Przekaż funkcję tworzącą i tablicę zależności. `useMemo` obliczy ponownie zapamiętaną wartość tylko wtedy, gdy zmieni się któraś z zależności. Ta optymalizacja pozwala uniknąć kosztownych obliczeń przy każdym renderowaniu.

Pamiętaj, że funkcja przekazana do `useMemo` uruchamiana jest podczas renderowania. Nie należy w niej robić niczego, czego normalnie nie robiono by podczas renderowania. Na przykład wszelkie efekty uboczne przynależą do `useEffect`, a nie `useMemo`.

Jeśli nie zostanie przekazana żadna tablica, nowa wartość będzie obliczana przy każdym renderowaniu.

**Możesz traktować `useMemo` jako metodę optymalizacji wydajności, nie jako semantyczną gwarancję.** W przyszłości React może zdecydować się „zapomnieć” niektóre z wcześniej zapamiętanych wartości i ponownie obliczyć je przy następnym renderowaniu, np. aby zwolnić pamięć dla komponentów znajdujących się poza ekranem. Pisz swój kod tak, aby działał bez użycia hooka `useMemo`, a następnie dodaj go aby zoptymalizować wydajność.

> Uwaga
>
> Tablica zależności nie jest przekazywana jako argumenty do funkcji zwrotnej. Koncepcyjnie jednak to właśnie przedstawiają: każda wartość, do której odwołuje się funkcja zwrotna, powinna również pojawić się w tablicy zależności. W przyszłości dostatecznie zaawansowany kompilator mógłby automatycznie tworzyć tę tablicę.
>
> Polecamy użycie reguły [`exhaustive-deps`](https://github.com/facebook/react/issues/14920), będącej częścią naszego pakietu [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation). Ostrzega ona, gdy zależności są niepoprawnie zdefiniowane i sugeruje poprawki.

### `useRef` {#useref}

```js
const refContainer = useRef(initialValue);
```

`useRef` zwraca mutowalny (ang. *mutable*) obiekt, którego właściwość `.current` jest inicjalizowana wartością przekazaną jako argument (`initialValue`). Zwrócony obiekt będzie trwał przez cały cykl życia komponentu.

Częstym przypadkiem użycia jest imperatywny dostęp do potomka:

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` wskazuje na zamontowany element kontrolki formularza
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Ustaw skupienie na kontrolce formularza</button>
    </>
  );
}
```

Zasadniczo `useRef` jest jak „pudełko”, które może przechowywać mutowalną wartość w swojej właściwości `.current`.

Być może znasz już referencje (ang. *ref*) jako sposób na [dostęp do drzewa DOM](/docs/refs-and-the-dom.html). Jeśli przekażesz obiekt referencji do Reacta, korzystając ze składni `<div ref={myRef} />`, React ustawi jego właściwość `.current` na odpowiedni węzeł drzewa DOM przy każdej zmianie tego węzła.

Jednakże hook `useRef()` jest przydatny nie tylko jako atrybut `ref`. Jest też [przydatną metodą na przechowywanie mutowalnej wartości](/docs/hooks-faq.html#is-there-something-like-instance-variables), podobną do właściwości instancji w przypadku komponentów klasowych.

Sposób ten zadziała ponieważ `useRef` tworzy czysty javascriptowy obiekt. Jedyną różnicą pomiędzy wywołaniem `useRef()`, a samodzielnym tworzeniem obiektu `{current: ...}` jest to, że `useRef` zwróci referencję tego samego obiektu przy każdym renderowaniu.

Miej na uwadze fakt, że `useRef` *nie* informuje o tym, że jego wartość się zmieniła. Zmiana (mutowanie) właściwości `.current` nie spowoduje ponownego renderowania. Jeżeli chcesz uruchomić jakiś kod, w momencie gdy React dopina i odpina referencje do węzła DOM, możesz zamiast tego użyć [funkcji zwrotnej](/docs/hooks-faq.html#how-can-i-measure-a-dom-node).


### `useImperativeHandle` {#useimperativehandle}

```js
useImperativeHandle(ref, createHandle, [deps])
```

`useImperativeHandle` dostosowuje wartość instancji, jaka przekazywana jest komponentom przodków, kiedy używają właściwości `ref`. Jak zwykle zalecamy aby w większości przypadków unikać imperatywnego kodu korzystającego z referencji. `useImperativeHandle` powinien być użyty w parze z `forwardRef`:

```js
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

W tym przykładzie komponent rodzica, który renderuje `<FancyInput ref={inputRef} />` będzie w stanie wywołać `inputRef.current.focus()`.

### `useLayoutEffect` {#uselayouteffect}

Sygnatura funkcji jest taka sama, jak `useEffect`, ale jest ona wywoływana jest synchronicznie po nałożeniu zmian na drzewo DOM. Użyj tego hooka aby odczytać układ (ang. *layout*) z drzewa DOM i synchronicznie wyrenderować komponent ponownie. Bufor `useLayoutEffect` zostanie opróżniony synchronicznie, zanim przeglądarka będzie miała szansę na malowanie.

Kiedy to tylko możliwe używaj `useEffect` aby uniknąć blokujących aktualizacji wizualnych.

> Podpowiedź
>
> Jeżeli przeprowadzasz migrację kodu z komponentu klasowego musisz wiedzieć, że `useLayoutEffect` uruchamiany jest w tych samych fazach, co `componentDidMount` i `componentDidUpdate`. Jednakże **zalecamy zacząć od `useEffect`** i używać `useLayoutEffect` tylko, jeżeli tamta metoda spowoduje jakieś problemy.
>
>Jeżeli używasz renderowania po stronie serwera pamiętaj, że *ani* `useLayoutEffect`, *ani* `useEffect` nie może działać dopóki kod JavaScript nie zostanie pobrany. Dlatego React ostrzega jeżeli komponent renderowany po stronie serwera zawiera `useLayoutEffect`. Aby to naprawić możesz albo przenieść logikę korzystającą z `useEffect` (jeżeli nie jest niezbędna przy pierwszym renderze), albo opóźnić wyświetlanie tego komponentu do czasu renderowania po stronie klienta (jeżeli kod HTML wygląda na popsuty przed uruchomieniem `useLayoutEffect`).
>
>Aby wyłączyć komponent, który korzysta z tego rodzaju efektów z wyrenderowanego po stronie serwera kodu HTML, wyrenderuj go warunkowo, korzystając z zapisu `showChild && <Child />` i opóźnij jego wyświetlanie przy użyciu `useEffect(() => { setShowChild(true); }, [])`. W ten sposób interfejs użytkownika nie będzie wyglądał na zepsuty przed odtworzeniem (ang. *hydration*).

### `useDebugValue` {#usedebugvalue}

```js
useDebugValue(value)
```

`useDebugValue` może zostać użyty do wyświetlania etykiet dla własnych hooków w narzędziu React DevTools.

Rozważ na przykład własny hook `useFriendStatus` opisywany w rozdziale ["Tworzenie własnych hooków"](/docs/hooks-custom.html):

```js{6-8}
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  // Wyświetl etykietę w narzędziu DevTools obok tego hooka
  // np. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}
```

> Podpowiedź
>
> Nie zalecamy dodawania „debugowych” wartości każdemu własnemu hookowi. Jest to najbardziej przydatne w przypadku hooków będących częścią współdzielonych bibliotek.

#### Odroczenie formatowania „debugowych” wartości {#defer-formatting-debug-values}

W pewnych przypadkach formatowanie wartości może być kosztowną operacją. Jest też zbędne, dopóki hook nie jest rzeczywiście sprawdzany w narzędziach deweloperskich.

Dlatego też `useDebugValue` przyjmuje opcjonalnie jako drugi argument funkcję formatującą. Funkcja ta jest wywoływana tylko wtedy, gdy hooki są sprawdzane w narzędziach deweloperskich. Przyjmuje jako argument „debugową” wartość, a powinna zwrócić sformatowaną wartość. 

Na przykład własny hook zwracający obiekt `Date` mógłby uniknąć niepotrzebnego wywołania funkcji `toDateString` poprzez przekazanie następującej funkcji formatującej:

```js
useDebugValue(date, date => date.toDateString());
```
