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

Zwraca zmienną przechowującą lokalny stan i funkcję pozwalającą go zaktualizować.

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
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
    </>
  );
}
```

Przyciski „+” i „-” wykorzystują formę funkcyjną, ponieważ zaktualizowana wartość bazuje na poprzedniej. Z kolei przycisk „Zresetuj” używa normalnej formy, ponieważ zawsze przywraca początkową wartość.

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

W ciele głównej funkcji komponentu (określanej jako _faza renderowania_ Reacta) nie jest dozwolone mutowanie danych, tworzenie subskrypcji, liczników, logowanie i inne efekty uboczne. Robiąc tak należy spodziewać się mylących błędów i niespójności w interfejsie użytkownika.

Zamiast tego użyj `useEffect`. Funkcja przekazana do `useEffect` zostanie uruchomiona po tym, jak  zmiany zostaną wyświetlone się na ekranie. Traktuj efekty jako furtkę pomiędzy czysto funkcyjnym światem Reacta, a imperatywnym światem.

Domyślnie efekty są uruchamiane po każdym wyrenderowaniu komponentu, ale możesz sprawić, że uruchomią się [tylko jeżeli zmienią się jakieś wartości](#conditionally-firing-an-effect).

#### Czyszczenie po efekcie {#cleaning-up-an-effect}

Często efekty tworzą zasoby, np. subskrypcja lub ID licznika, które muszą być uprzątnięte, zanim komponent opuści ekran. Aby to uczynić funkcja przekazywana do `useEffect` może zwracać funkcję czyszczącą. Na przykład aby stworzyć subskrypcję:

```js
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Uprzątnij subskrypcję
    subscription.unsubscribe();
  };
});
```

The clean-up function runs before the component is removed from the UI to prevent memory leaks. Additionally, if a component renders multiple times (as they typically do), the **previous effect is cleaned up before executing the next effect**. In our example, this means a new subscription is created on every update. To avoid firing an effect on every update, refer to the next section.

#### Timing of effects {#timing-of-effects}

Unlike `componentDidMount` and `componentDidUpdate`, the function passed to `useEffect` fires **after** layout and paint, during a deferred event. This makes it suitable for the many common side effects, like setting up subscriptions and event handlers, because most types of work shouldn't block the browser from updating the screen.

However, not all effects can be deferred. For example, a DOM mutation that is visible to the user must fire synchronously before the next paint so that the user does not perceive a visual inconsistency. (The distinction is conceptually similar to passive versus active event listeners.) For these types of effects, React provides one additional Hook called [`useLayoutEffect`](#uselayouteffect). It has the same signature as `useEffect`, and only differs in when it is fired.

Although `useEffect` is deferred until after the browser has painted, it's guaranteed to fire before any new renders. React will always flush a previous render's effects before starting a new update.

#### Conditionally firing an effect {#conditionally-firing-an-effect}

The default behavior for effects is to fire the effect after every completed render. That way an effect is always recreated if one of its dependencies changes.

However, this may be overkill in some cases, like the subscription example from the previous section. We don't need to create a new subscription on every update, only if the `source` props has changed.

To implement this, pass a second argument to `useEffect` that is the array of values that the effect depends on. Our updated example now looks like this:

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

Now the subscription will only be recreated when `props.source` changes.

>Uwaga
>
>Jeśli korzystasz tej techniki optymalizacji, upewnij się, że przekazywana tablica zawiera **wszystkie wartości z zasięgu komponentu (takie jak właściwości (ang. *props*) i stan), które zmieniają się w czasie i które są używane przez efekt.** W przeciwnym razie twój kod odwoła się do starych wartości z poprzednich renderowań. Przeczytaj też, [jak radzić sobie z funkcjami](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) i [co robić, gdy tablica zmienia się zbyt często](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often).
>
>Jeśli chcesz przeprowadzić efekt i posprzątać po nim tylko raz (podczas montowania i odmontowania), możesz przekazać pustą tablicę (`[]`) jako drugi argument. Dzięki temu React wie, że twój efekt nie zależy od *jakichkolwiek* wartości właściwości lub stanu, więc nigdy nie musi być ponownie uruchamiany. Nie jest to traktowane jako przypadek specjalny -- wynika to bezpośrednio z tego, jak zawsze działa tablica wejść.
>
>Jeśli przekażesz pustą tablicę (`[]`) właściwości i stan wewnątrz efektu zawsze przyjmą swoje początkowe wartości. Pomimo że przekazywanie `[]` jest bliższe temu, co znamy z metod `componentDidMount` i `componentWillUnmount`, zwykle istnieją [lepsze](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) [rozwiązania](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often) pomagające uniknąć zbyt częstego powtarzania efektów. Nie zapominaj też, że React opóźni wywołanie `useEffect` do momentu, aż przeglądarka nie skończy rysować widoku, więc dodatkowa praca tutaj nie jest dużym problemem.
>
>Polecamy użycie reguły [`exhaustive-deps`](https://github.com/facebook/react/issues/14920), będącej częścią naszego pakietu [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation). Ostrzega ona, gdy zależności są niepoprawnie zdefiniowane i sugeruje poprawki.

The array of dependencies is not passed as arguments to the effect function. Conceptually, though, that's what they represent: every value referenced inside the effect function should also appear in the dependencies array. In the future, a sufficiently advanced compiler could create this array automatically.

### `useContext` {#usecontext}

```js
const value = useContext(MyContext);
```

Przyjmuje obiekt kontekstu (wartość zwróconą przez `React.createContext`) i zwraca jego aktualną wartość. Wartość kontekstu jest określana przez właściwość (ang. *prop*) `value` najbliższego rodzica `<MyContext.Provider>` wywołującego komponentu.

Kiedy najbliższy rodzic `<MyContext.Provider>` zostanie zaktualizowany, ten hook wywoła ponowne renderowanie komponentu z najnowszym kontekstem `value` przekazanym dostawcy (ang. *provider*) `MyContext`.

Pamiętaj, że argument przekazany do `useContest` musi być *samym obiektem kontekstu*:

 * **Poprawnie:** `useContext(MyContext)`
 * **Niepoprawnie:** `useContext(MyContext.Consumer)`
 * **Niepoprawnie:** `useContext(MyContext.Provider)`

Komponent wywołujący `useContext` będzie zawsze ponownie renderowany jeśli zmieni się wartość kontekstu. Jeżeli ponowne renderowanie danego komponentu jest kosztowne, możesz [zoptymalizować to zachowanie](https://github.com/facebook/react/issues/15156#issuecomment-474590693), używając techniki zapamiętywania (ang. *memoization*).

>Podpowiedź
>
>Jeśli znasz już interfejs API kontekstu -- `useContext(MyContext)` jest odpowiednikiem klasowego `static contextType = MyContext` lub też `<MyContext.Consumer>`.
>
>`useContext(MyContext)` pozwala tylko na *czytanie* kontekstu i nasłuchiwanie jego zmian. Wciąż wymagane jest aby w drzewie, ponad komponentem, znalazł się `<MyContext.Provider>` by mógł  *dostarczyć* (ang. *provide*) wartość tego kontekstu.

## Zaawansowane hooki {#additional-hooks}

Poniższe hooki są albo są wariantami   tych podstawowych, z poprzedniego podrozdziału, albo są stosowane tylko w określonych skrajnych wypadkach. Nie stresuj się na myśl o nauce o nich.

### `useReducer` {#usereducer}

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

Alternatywa dla hooka [`useState`](#usestate). Przyjmuje reduktor (ang *reducer*), będący funkcją o sygnaturze `(stan, akcja) => nowyStan`, a zwraca aktualny stan w parze z metodą `dispatch`. (Jeżeli znasz bibliotekę Redux, wiesz już, jak to działa.)

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

function Counter({initialState}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Licznik: {state.count}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
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
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
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

You might be familiar with refs primarily as a way to [access the DOM](/docs/refs-and-the-dom.html). If you pass a ref object to React with `<div ref={myRef} />`, React will set its `.current` property to the corresponding DOM node whenever that node changes.

However, `useRef()` is useful for more than the `ref` attribute. It's [handy for keeping any mutable value around](/docs/hooks-faq.html#is-there-something-like-instance-variables) similar to how you'd use instance fields in classes.

This works because `useRef()` creates a plain JavaScript object. The only difference between `useRef()` and creating a `{current: ...}` object yourself is that `useRef` will give you the same ref object on every render.

Keep in mind that `useRef` *doesn't* notify you when its content changes. Mutating the `.current` property doesn't cause a re-render. If you want to run some code when React attaches or detaches a ref to a DOM node, you may want to use a [callback ref](/docs/hooks-faq.html#how-can-i-measure-a-dom-node) instead.


### `useImperativeHandle` {#useimperativehandle}

```js
useImperativeHandle(ref, createHandle, [deps])
```

`useImperativeHandle` customizes the instance value that is exposed to parent components when using `ref`. As always, imperative code using refs should be avoided in most cases. `useImperativeHandle` should be used with `forwardRef`:

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

In this example, a parent component that renders `<FancyInput ref={fancyInputRef} />` would be able to call `fancyInputRef.current.focus()`.

### `useLayoutEffect` {#uselayouteffect}

The signature is identical to `useEffect`, but it fires synchronously after all DOM mutations. Use this to read layout from the DOM and synchronously re-render. Updates scheduled inside `useLayoutEffect` will be flushed synchronously, before the browser has a chance to paint.

Prefer the standard `useEffect` when possible to avoid blocking visual updates.

> Podpowiedź
>
> If you're migrating code from a class component, note `useLayoutEffect` fires in the same phase as `componentDidMount` and `componentDidUpdate`. However, **we recommend starting with `useEffect` first** and only trying `useLayoutEffect` if that causes a problem.
>
>If you use server rendering, keep in mind that *neither* `useLayoutEffect` nor `useEffect` can run until the JavaScript is downloaded. This is why React warns when a server-rendered component contains `useLayoutEffect`. To fix this, either move that logic to `useEffect` (if it isn't necessary for the first render), or delay showing that component until after the client renders (if the HTML looks broken until `useLayoutEffect` runs).
>
>To exclude a component that needs layout effects from the server-rendered HTML, render it conditionally with `showChild && <Child />` and defer showing it with `useEffect(() => { setShowChild(true); }, [])`. This way, the UI doesn't appear broken before hydration.

### `useDebugValue` {#usedebugvalue}

```js
useDebugValue(value)
```

`useDebugValue` can be used to display a label for custom hooks in React DevTools.

For example, consider the `useFriendStatus` custom Hook described in ["Building Your Own Hooks"](/docs/hooks-custom.html):

```js{6-8}
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  // Show a label in DevTools next to this Hook
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}
```

> Podpowiedź
>
> We don't recommend adding debug values to every custom Hook. It's most valuable for custom Hooks that are part of shared libraries.

#### Defer formatting debug values {#defer-formatting-debug-values}

In some cases formatting a value for display might be an expensive operation. It's also unnecessary unless a Hook is actually inspected.

For this reason `useDebugValue` accepts a formatting function as an optional second parameter. This function is only called if the Hooks are inspected. It receives the debug value as a parameter and should return a formatted display value.

For example a custom Hook that returned a `Date` value could avoid calling the `toDateString` function unnecessarily by passing the following formatter:

```js
useDebugValue(date, date => date.toDateString());
```
