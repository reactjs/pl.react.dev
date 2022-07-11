---
id: hooks-faq
title: Hooki - FAQ
permalink: docs/hooks-faq.html
prev: hooks-reference.html
---

*Hooki* są nowym dodatkiem do Reacta w wersji 16.8. Pozwalają na użycie stanu i innych funkcji Reacta bez konieczności pisania klas.

Ta strona odpowiada na najczęściej zadawane pytania odnośnie [hooków](/docs/hooks-overview.html).

<!--
  if you ever need to regenerate this, this snippet in the devtools console might help:

  $$('.anchor').map(a =>
    `${' '.repeat(2 * +a.parentNode.nodeName.slice(1))}` +
    `[${a.parentNode.textContent}](${a.getAttribute('href')})`
  ).join('\n')
-->

* **[Strategia wdrażania](#adoption-strategy)**
  * [Które wersje Reacta wspierają hooki?](#which-versions-of-react-include-hooks)
  * [Czy muszę przepisać wszystkie komponenty klasowe?](#do-i-need-to-rewrite-all-my-class-components)
  * [Co mogę zrobić z hookami, czego nie można było zrobić z klasami?](#what-can-i-do-with-hooks-that-i-couldnt-with-classes)
  * [Jaka część mojej wiedzy o Reakcie jest nadal aktualna?](#how-much-of-my-react-knowledge-stays-relevant)
  * [Czy lepiej używać hooków, klas, czy może mieszać obydwa sposoby?](#should-i-use-hooks-classes-or-a-mix-of-both)
  * [Czy hooki obejmują wszystkie przypadki użycia, które są dostępne dla klas?](#do-hooks-cover-all-use-cases-for-classes)
  * [Czy hooki zastępują "właściwości renderujące" i komponenty wyższego rzędu?](#do-hooks-replace-render-props-and-higher-order-components)
  * [Co hooki oznaczają dla popularnych API, takich jak `connect()` z Reduxa lub React Router?](#what-do-hooks-mean-for-popular-apis-like-redux-connect-and-react-router)
  * [Czy hooki współpracują ze statycznym typowaniem?](#do-hooks-work-with-static-typing)
  * [Jak testować komponenty, które używają hooków?](#how-to-test-components-that-use-hooks)
  * [Co dokładnie narzucają reguły lintera?](#what-exactly-do-the-lint-rules-enforce)
* **[Od klas do hooków](#from-classes-to-hooks)**
  * [Jak wyglądają metody cyklu życia w odniesieniu do hooków?](#how-do-lifecycle-methods-correspond-to-hooks)
  * [Jak mogę pobrać dane wykorzystując hooki?](#how-can-i-do-data-fetching-with-hooks)
  * [Czy istnieje coś podobnego do zmiennych instancji?](#is-there-something-like-instance-variables)
  * [Lepiej używać jednej czy wielu zmiennych stanu?](#should-i-use-one-or-many-state-variables)
  * [Czy mogę uruchomić efekt tylko podczas aktualizacji komponentu?](#can-i-run-an-effect-only-on-updates)
  * [Jak dostać poprzednie właściwości lub stan?](#how-to-get-the-previous-props-or-state)
  * [Dlaczego widzę nieaktualne właściwości lub stan wewnątrz mojej funkcji?](#why-am-i-seeing-stale-props-or-state-inside-my-function)
  * [Jak zaimplementować `getDerivedStateFromProps`?](#how-do-i-implement-getderivedstatefromprops)
  * [Czy istnieje coś takiego jak forceUpdate?](#is-there-something-like-forceupdate)
  * [Czy mogę stworzyć referencję do komponentu funkcyjnego?](#can-i-make-a-ref-to-a-function-component)
  * [Jak mogę zmierzyć węzeł DOM?](#how-can-i-measure-a-dom-node)
  * [Co oznacza `const [thing, setThing] = useState()`?](#what-does-const-thing-setthing--usestate-mean)
* **[Optymalizacja wydajności](#performance-optimizations)**
  * [Czy mogę pominąć efekt podczas aktualizacji komponentu?](#can-i-skip-an-effect-on-updates)
  * [Czy bezpiecznie jest pomijać funkcje w liście zależności?](#is-it-safe-to-omit-functions-from-the-list-of-dependencies)
  * [Co zrobić, gdy zależności mojego efektu zmieniają się zbyt często?](#what-can-i-do-if-my-effect-dependencies-change-too-often)
  * [Jak zaimplementować `shouldComponentUpdate`?](#how-do-i-implement-shouldcomponentupdate)
  * [Jak memoizować obliczenia?](#how-to-memoize-calculations)
  * [Jak w leniwy sposób tworzyć "ciężkie" obiekty?](#how-to-create-expensive-objects-lazily)
  * [Czy hooki są wolne z powodu tworzenia funkcji podczas renderowania?](#are-hooks-slow-because-of-creating-functions-in-render)
  * [Jak unikać przekazywania funkcji zwrotnych w dół?](#how-to-avoid-passing-callbacks-down)
  * [Jak odczytywać często zmieniającą się wartość z `useCallback`?](#how-to-read-an-often-changing-value-from-usecallback)
* **[Pod maską](#under-the-hood)**
  * [Jak React łączy wywołania hooków z komponentami?](#how-does-react-associate-hook-calls-with-components)
  * [Skąd wziął się pomysł na stworzenie hooków?](#what-is-the-prior-art-for-hooks)

## Strategia wdrażania {#adoption-strategy}

### Które wersje Reacta wspierają hooki? {#which-versions-of-react-include-hooks}

Zaczynając od wersji 16.8.0, React zawiera stabilną implementację hooków dla:

* React DOM
* React Native
* React DOM Server
* React Test Renderer
* React Shallow Renderer

Zauważ, że **aby włączyć hooki, wszystkie paczki Reacta muszą mieć wersję 16.8.0 lub wyższą**. Hooki nie zadziałają, jeżeli zapomnisz zaktualizować, na przykład, React DOM.

[React Native wspiera hooki od wersji 0.59](https://reactnative.dev/blog/2019/03/12/releasing-react-native-059).

### Czy muszę przepisać wszystkie komponenty klasowe? {#do-i-need-to-rewrite-all-my-class-components}

Nie. [Nie ma planów](/docs/hooks-intro.html#gradual-adoption-strategy) na usunięcie klas z Reacta -- wszyscy musimy stale dostarczać nasze produkty i nie możemy sobie pozwolić na ich przepisywanie. Zachęcamy do wypróbowania hooków w nowym kodzie.

### Co mogę zrobić z hookami, czego nie można było zrobić z klasami? {#what-can-i-do-with-hooks-that-i-couldnt-with-classes}

Hooki oferują nowy, potężny i ekspresyjny sposób na wielokrotne używanie funkcjonalności w komponentach. Rozdział pt. ["Tworzenie własnych hooków"](/docs/hooks-custom.html) zawiera szybki wgląd w to, co można za ich pomocą zrobić. [Ten artykuł](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889), napisany przez jednego z głównych członków zespołu Reacta, zawiera bardziej szczegółowe informacje o nowych możliwościach, które pojawiły się wraz z hookami.

### Jaka część mojej wiedzy o Reakcie jest nadal aktualna? {#how-much-of-my-react-knowledge-stays-relevant}

Hooki są bardziej bezpośrednim sposobem na użycie dobrze już znanych funkcjonalności Reacta, takich jak na przykład: stan, cykl życia (ang. *lifecycle*), kontekst i referencje (ang. *refs*). Nie zmieniają podstaw działania Reacta, dlatego też twoja wiedza na temat komponentów, właściwości (ang. *props*) i przepływu danych z góry w dół pozostaje ciągle aktualna.

Hooki, same w sobie, posiadają pewną krzywą uczenia się. Jeżeli brakuje czegoś w tej dokumentacji, [zgłoś problem](https://github.com/reactjs/reactjs.org/issues/new), a my postaramy się pomóc.

### Czy lepiej używać hooków, klas, czy może mieszać obydwa sposoby? {#should-i-use-hooks-classes-or-a-mix-of-both}

Zachęcamy do wypróbowania hooków w nowych komponentach. Upewnij się, że wszyscy z twojego zespołu wiedzą, jak ich używać i są zapoznani z tą dokumentacją. Nie zalecamy przepisywania istniejących klas na hooki, chyba że z jakiegoś powodu i tak mieliście to w planach (na przykład w celu naprawy istniejących błędów).

Nie możesz używać hooków *wewnątrz* komponentów klasowych, jednakże bez obaw możesz mieszać komponenty klasowe i funkcyjne z hookami w tym samym drzewie. To, czy komponent jest klasowy, czy funkcyjny i używa hooków, jest detalem implementacyjnym tego komponentu. W dłuższej perspektywie oczekujemy, że hooki będą głównym sposobem pisania komponentów reactowych.

### Czy hooki obejmują wszystkie przypadki użycia, które są dostępne dla klas? {#do-hooks-cover-all-use-cases-for-classes}

Naszym celem dla hooków jest zapewnienie wszystkich przypadków użycia klas, tak szybko jak to tylko możliwe. Brakuje jeszcze odpowiedników dla kilku rzadziej używanych metod cyklu życia komponentu, takich jak `getSnapshotBeforeUpdate`, `getDerivedStateFromError` i `componentDidCatch`, ale zamierzamy je wkrótce dodać.

### Czy hooki zastępują "właściwości renderujące" i komponenty wyższego rzędu? {#do-hooks-replace-render-props-and-higher-order-components}

Zazwyczaj właściwości renderujace i komponenty wyższego rzędu renderują tylko pojedynczy komponent potomny. Sądzimy, że hooki są prostszym sposobem na obsługę tego przypadku użycia. Nadal jest miejsce dla obu wzorców (dla przykładu, wirtualny komponent do obsługi suwaka może mieć właściwość `renderItem`, a prezentacyjny komponent kontenera może mieć swoją własną strukturę DOM). Jednak w większości przypadków hooki w zupełności wystarczą, a przy okazji pomogą zmniejszyć liczbę zagnieżdżeń w drzewie.

### Co hooki oznaczają dla popularnych API, takich jak Redux connect() i React Router?{#what-do-hooks-mean-for-popular-apis-like-redux-connect-and-react-router}

Możesz używać tych samych API, co do tej pory - będą nadal działać.

React Redux od wersji v7.1.0 [posiada wsparcie dla API hooków](https://react-redux.js.org/api/hooks) i udostępnia takie funkcje, jak `useDispatch` czy `useSelector`.

React Router [wspiera hooki](https://reacttraining.com/react-router/web/api/Hooks) od wersji 5.1.

W przyszłości być może także inne biblioteki zaczną wspierać hooki.

### Czy hooki współpracują ze statycznym typowaniem? {#do-hooks-work-with-static-typing}

Hooki zostały zaprojektowane z myślą o statycznym typowaniu. Dzięki temu, że są funkcjami, łatwiej jest je poprawnie otypować, w odróżnieniu od wzorców takich jak komponenty wyższego rzędu. Najnowsze definicje Reacta dla Flow i TypeScriptu wspierają hooki.

Co ważne, przy pomocy bardziej restrykcyjnych typów możesz ograniczyć API Reacta we własnych hookach. React dostarcza podstawowe elementy, ale możesz je łączyć na różne sposoby, odmienne od tych, które zawarliśmy w standardzie.

### Jak testować komponenty, które używają hooków? {#how-to-test-components-that-use-hooks}

Z punktu widzenia Reacta komponent wykorzystujący hooki jest zwyczajnym komponentem. Jeżeli twoje narzędzie do testów nie opiera się na wewnętrznej implementacji Reacta, to testowanie komponentów, które używają hooków, nie powinno różnić się od tego, co robisz zazwyczaj.

>Uwaga
>
>W rozdziale pt. ["Testy: Przykłady i dobre praktyki"](/docs/testing-recipes.html) znajdziesz wiele przykładów gotowych do użycia.

Dla przykładu, załóżmy, że mamy komponent licznika:

```js
function Example() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Kliknięto ${count} razy`;
  });
  return (
    <div>
      <p>Kliknięto {count} razy</p>
      <button onClick={() => setCount(count + 1)}>
        Kliknij mnie
      </button>
    </div>
  );
}
```

Przetestujemy go używając React DOM. Aby upewnić się, że zachowanie komponentu odzwierciedla to w przeglądarce, opakujemy kod renderujący i aktualizujący w funkcję [`ReactTestUtils.act()`](/docs/test-utils.html#act):

```js{3,20-22,29-31}
import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import Counter from './Counter';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('potrafi wyrenderować i zaktualizować licznik', () => {
  // Testuje pierwsze renderowanie i efekt
  act(() => {
    ReactDOM.createRoot(container).render(<Counter />);
  });
  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('Kliknięto 0 razy');
  expect(document.title).toBe('Kliknięto 0 razy');

  // Testuje drugie renderowanie i efekt
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(label.textContent).toBe('Kliknięto 1 razy');
  expect(document.title).toBe('Kliknięto 1 razy');
});
```

Wywołanie funkcji `act()` opróżni bufor efektów znajdujących się wewnątrz.

Jeżeli musisz przetestować własny hook, możesz stworzyć komponent w teście i wywołać ten hook w ciele jego funkcji. Następnie możesz napisać test do stworzonego w ten sposób komponentu.

Aby zmniejszyć powtarzalność kodu, zalecamy użyć biblioteki [`react-testing-library`](https://git.io/react-testing-library). Została ona zaprojektowana tak, aby zachęcać do pisania testów używających komponentów w sposób podobny do zachowania docelowych użytkowników aplikacji.

Po więcej informacji zajrzyj do rozdziału pt. ["Testy: Przykłady i dobre praktyki](/docs/testing-recipes.html).

### Co dokładnie narzucają [reguły lintera](https://www.npmjs.com/package/eslint-plugin-react-hooks)? {#what-exactly-do-the-lint-rules-enforce}

Stworzyliśmy [wtyczkę do ESLinta](https://www.npmjs.com/package/eslint-plugin-react-hooks), która zmusza do przestrzegania [zasad hooków](/docs/hooks-rules.html) w celu uniknięcia potencjalnych błędów. Zakładają one, że każda funkcja zaczynająca się od "`use`" i zaraz po tym wielkiej litery jest hookiem. Zdajemy sobie sprawę, że ta heurystyka nie jest idealna i może wywołać wiele fałszywych alarmów. Ale bez wprowadzenia wspólnej dla całego ekosystemu konwencji, nie ma możliwości, aby hooki działały poprawnie -- dłuższe nazwy zniechęcą ludzi do używania hooków lub do przestrzegania tej konwencji.

W szczególności, reguły te wymuszają, aby:

* Wywołania hooków znajdowały się wewnątrz funkcji pisanej stylem `PascalCase` (zakładają, że jest to komponent) lub innej funkcji `useSomething` (zakładają, że jest to własny hook).
* Hooki przy każdym renderowaniu są wywoływane w tej samej kolejności.

Jest jeszcze kilka innych heurystyk i mogą się one z czasem zmienić, gdy dostroimy reguły tak, aby zbalansować wyszukiwanie błędów i zmniejszyć liczbę fałszywych alarmów.

## Od klas do hooków {#from-classes-to-hooks}

### Jak wyglądają metody cyklu życia w odniesieniu do hooków? {#how-do-lifecycle-methods-correspond-to-hooks}

* `constructor`: Komponenty funkcyjne nie potrzebują konstruktora. Stan jest inicjalizowany poprzez wywołanie [`useState`](/docs/hooks-reference.html#usestate). Jeżeli obliczenie stanu początkowego jest kosztowne obliczeniowo, możesz do `useState` przekazać funkcję.

* `getDerivedStateFromProps`: Zamiast tego zaplanuj aktualizację [podczas renderowania](#how-do-i-implement-getderivedstatefromprops).

* `shouldComponentUpdate`: Spójrz na `React.memo` [poniżej](#how-do-i-implement-shouldcomponentupdate).

* `render`: Jest to ciało komponentu funkcyjnego.

* `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`: Hook [`useEffect`](/docs/hooks-reference.html#useeffect) może z powodzeniem zastąpić wszelkie kombinacje tych metod (włączając w to [mniej](#can-i-skip-an-effect-on-updates) [znane](#can-i-run-an-effect-only-on-updates) przypadki).

* `getSnapshotBeforeUpdate`, `componentDidCatch` i `getDerivedStateFromError`: W tej chwili nie istnieje hook odzwierciedlający działanie tych metod, ale zostanie wkrótce dodany.

### Jak mogę pobrać dane wykorzystując hooki? {#how-can-i-do-data-fetching-with-hooks}

Tutaj znajdziesz [małe demo](https://codesandbox.io/s/jvvkoo8pq3), które w tym pomoże. Aby dowiedzieć się więcej, przeczytaj artykuł [o pobieraniu danych z wykorzystaniem hooków](https://www.robinwieruch.de/react-hooks-fetch-data/).

### Czy istnieje coś podobnego do zmiennych instancji? {#is-there-something-like-instance-variables}

Tak! Hook [`useRef()`](/docs/hooks-reference.html#useref) nie służy tylko do przechowywania referencji DOM. Obiekt "ref" jest generycznym kontenerem, którego właściwość `current` jest zmienna i może przechowywać każdą wartość, tak samo jak właściwości instancji w klasach.

Możesz do niej coś zapisać z wnętrza `useEffect`:

```js{2,8}
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  // ...
}
```

Jeżeli chcielibyśmy po prostu ustawić interwał, nie potrzebowalibyśmy referencji (`id` mogłoby być lokalne dla efektu), jednakże jest to użyteczne w przypadku, gdy chcielibyśmy wyczyścić interwał z wnętrza procedury obsługi zdarzenia:

```js{3}
  // ...
  function handleCancelClick() {
    clearInterval(intervalRef.current);
  }
  // ...
```

Działanie referencji jest takie samo jak użycie zmiennych instancji w klasie. Jeśli nie korzystasz z [leniwej inicjalizacji](#how-to-create-expensive-objects-lazily), unikaj używania referencji podczas renderowania  -- może to prowadzić do niepożądanych zachowań. Zamiast tego modyfikuj referencje wewnątrz efektów lub procedur obsługi zdarzeń.

### Lepiej używać jednej czy wielu zmiennych stanu? {#should-i-use-one-or-many-state-variables}

Jeżeli na co dzień piszesz komponenty klasowe, kuszące może okazać się wywoływanie `useState()` jednokrotnie i umieszczanie całego stanu wewnątrz pojedynczego obiektu. Jeżeli chcesz, możesz tak robić. Poniżej znajdziesz przykład komponentu, który śledzi ruchy kursora. Jego pozycja i stan są trzymane w lokalnym stanie:

```js
function Box() {
  const [state, setState] = useState({ left: 0, top: 0, width: 100, height: 100 });
  // ...
}
```

Teraz przyjmimy, że chcemy napisać logikę, która zmienia `left` i `top`, kiedy użytkownik ruszy myszką. Zauważ, że musimy ręcznie scalać te pola z poprzednim obiektem stanu:

```js{4,5}
  // ...
  useEffect(() => {
    function handleWindowMouseMove(e) {
      // Rozszczepienie "...state" zapewnia, że nie "stracimy" szerokości i wysokości
      setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
    }
    // Uwaga: ta implementacja jest dość uproszczona
    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, []);
  // ...
```

Gdy aktualizujemy zmienną stanu, *zamieniamy* jej wartość. Różni się to od `this.setState` w klasach, które *scala* zaktualizowane pola do obiektu stanu.

Jeżeli tęsknisz za automatycznym scalaniem, możesz napisać własny hook `useLegacyState`, który scala aktualizacje obiektu stanu. Jednak **zalecamy podzielenie stanu na wiele zmiennych stanu, bazując na tym, które wartości mają tendencję do zmieniania się jednocześnie.**

Dla przykładu, możemy podzielić stan naszego komponentu na obiekty `position` oraz `size` i zawsze nadpisywać wartość `position`, bez konieczności scalania stanu z poprzednim:

```js{2,7}
function Box() {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [size, setSize] = useState({ width: 100, height: 100 });

  useEffect(() => {
    function handleWindowMouseMove(e) {
      setPosition({ left: e.pageX, top: e.pageY });
    }
    // ...
```

Oddzielanie niezależnych zmiennych stanu ma także inną zaletę. Pozwala w przyszłości łatwo wyodrębnić powiązaną logikę do własnego hooka, na przykład:

```js{2,7}
function Box() {
  const position = useWindowPosition();
  const [size, setSize] = useState({ width: 100, height: 100 });
  // ...
}

function useWindowPosition() {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  useEffect(() => {
    // ...
  }, []);
  return position;
}
```

Zauważ, jak mogliśmy przenieść wywołanie `useState` dla zmiennej stanu `position` i powiązany z nią efekt do własnego hooka, bez konieczności zmiany jego kodu. Jeżeli cały stan znajdowałby się w pojedynczym obiekcie, wyodrębnienie go byłoby trudniejsze.

Zarówno umieszczanie całego stanu wewnątrz pojedynczego wywołania `useState`, jak i wywoływanie `useState` dla każdego pola, będzie działać. Komponenty będą najbardziej czytelne, jeżeli osiągniesz równowagę pomiędzy tymi dwoma skrajnościami i pogrupujesz powiązane ze sobą zmienne stany. Jeżeli logika stanu stanie się zbyt złożona, zalecamy [użycie reduktora](/docs/hooks-reference.html#usereducer) lub napisanie własnego hooka.

### Czy mogę uruchomić efekt tylko podczas aktualizacji komponentu? {#can-i-run-an-effect-only-on-updates}

Jest to rzadki przypadek. Jeżeli masz taką potrzebę, możesz [użyć zmiennej referencji](#is-there-something-like-instance-variables), aby przechować wartość logiczną, określającą czy jest to pierwsze, czy kolejne renderowanie, a następnie sprawdzać tę flagę w efekcie. (Jeżeli okaże się, że robisz to często, możesz w tym celu stworzyć własnego hooka.)

### Jak dostać poprzednie właściwości lub stan? {#how-to-get-the-previous-props-or-state}

<<<<<<< HEAD
Na tę chwilę musisz to robić ręcznie [przy pomocy referencji](#is-there-something-like-instance-variables):
=======
There are two cases in which you might want to get previous props or state.
>>>>>>> f67fa22cc1faee261f9e22449d90323e26174e8e

Sometimes, you need previous props to **clean up an effect.** For example, you might have an effect that subscribes to a socket based on the `userId` prop. If the `userId` prop changes, you want to unsubscribe from the _previous_ `userId` and subscribe to the _next_ one. You don't need to do anything special for this to work:

<<<<<<< HEAD
  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = count;
  });
  const prevCount = prevCountRef.current;

  return <h1>Teraz: {count}, poprzednio: {prevCount}</h1>;
}
```

Może to wydawać się trochę zawiłe, ale wystarczy wyodrębnić tę logikę do osobnego hooka:

```js{3,7}
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return <h1>Teraz: {count}, poprzednio: {prevCount}</h1>;
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```

Zauważ, że powyższa funkcja zadziała poprawnie dla właściwości, zmiennej stanu oraz każdej innej wyliczanej wartości.

```js{5}
function Counter() {
  const [count, setCount] = useState(0);

  const calculation = count + 100;
  const prevCalculation = usePrevious(calculation);
  // ...
```

Ponieważ jest to powszechny przypadek użycia, bardzo prawdopodobne, że w przyszłości React sam będzie dostarczał implementację hooka `usePrevious`.

Spójrz również na [rekomendowany wzorzec dla stanu pochodnego](#how-do-i-implement-getderivedstatefromprops).
=======
```js
useEffect(() => {
  ChatAPI.subscribeToSocket(props.userId);
  return () => ChatAPI.unsubscribeFromSocket(props.userId);
}, [props.userId]);
```

In the above example, if `userId` changes from `3` to `4`, `ChatAPI.unsubscribeFromSocket(3)` will run first, and then `ChatAPI.subscribeToSocket(4)` will run. There is no need to get "previous" `userId` because the cleanup function will capture it in a closure.

Other times, you might need to **adjust state based on a change in props or other state**. This is rarely needed and is usually a sign you have some duplicate or redundant state. However, in the rare case that you need this pattern, you can [store previous state or props in state and update them during rendering](#how-do-i-implement-getderivedstatefromprops).

We have previously suggested a custom Hook called `usePrevious` to hold the previous value. However, we've found that most use cases fall into the two patterns described above. If your use case is different, you can [hold a value in a ref](#is-there-something-like-instance-variables) and manually update it when needed. Avoid reading and updating refs during rendering because this makes your component's behavior difficult to predict and understand.
>>>>>>> f67fa22cc1faee261f9e22449d90323e26174e8e

### Dlaczego widzę nieaktualne właściwości lub stan wewnątrz mojej funkcji? {#why-am-i-seeing-stale-props-or-state-inside-my-function}

Każda funkcja wewnątrz komponentu, włączając w to procedury obsługi zdarzeń i efekty, "widzą" właściwości i stan z chwili renderowania, w którym zostały stworzone. Dla przykładu rozważ poniższy kod:

```js
function Example() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert('Kliknięto: ' + count);
    }, 3000);
  }

  return (
    <div>
      <p>Kliknięto {count} razy</p>
      <button onClick={() => setCount(count + 1)}>
        Naciśnij mnie
      </button>
      <button onClick={handleAlertClick}>
        Pokaż okno ostrzegawcze
      </button>
    </div>
  );
}
```

Jeżeli najpierw klikniesz "Pokaż okno ostrzegawcze", a następnie zwiększysz licznik, okno ostrzegawcze wyświetli wartość zmiennej `count` **z momentu kliknięcia na przycisk "Pokaż okno ostrzegawcze"**. Zapobiega to błędom powodowanym przez kod zakładający, że właściwości i stan nie zmienią się w czasie.

Jeżeli celowo chcesz odczytać *najświeższy* stan z wnętrza asynchronicznej funkcji zwrotnej, możesz go przechowywać, zmieniać i odczytywać korzystając z [referencji](/docs/hooks-faq.html#is-there-something-like-instance-variables).

Ostatecznie, inną możliwą przyczyną tego, że widzisz nieaktualne właściwości lub stan, może być użycie "tablicy zależności" do optymalizacji, ale niepoprawne sprecyzowanie wszystkich zależności. Dla przykładu, jeżeli efekt otrzymuje `[]` jako drugi argument, ale wewnątrz odczytuje `someProp`, efekt będzie stale "widział" początkową wartość `someProp`. Rozwiązaniem jest usunięcie tablicy zależności lub naprawienie jej. Tutaj znajdziesz informacje, [jak poradzić sobie z funkcjami](#is-it-safe-to-omit-functions-from-the-list-of-dependencies), a tutaj [inne powszechne sposoby na uruchamianie efektów rzadziej i bez błędów w zależnościach](#what-can-i-do-if-my-effect-dependencies-change-too-often).

>Uwaga
>
>Stworzyliśmy regułę [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) dla ESLinta i dodaliśmy ją do paczki [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation). Wtyczka ostrzega, gdy zależności są sprecyzowane niepoprawnie i zaleca poprawienie kodu.

### Jak zaimplementować `getDerivedStateFromProps`? {#how-do-i-implement-getderivedstatefromprops}

Prawdopodobnie [w ogóle nie potrzebujesz tej funkcjonalności](/blog/2018/06/07/you-probably-dont-need-derived-state.html). W rzadkich przypadkach, w których naprawdę będziesz tego potrzebować (na przykład implementacja komponentu `<Transition>`), możesz zaktualizować stan w trakcie renderowania. React wywoła ponownie komponent z zaktualizowanym stanem natychmiast po pierwszym renderowaniu, więc nie wpłynie to znacząco na wydajność.

W poniższym kodzie przechowujemy poprzednią wartość właściwości `row` w zmiennej stanowej, dzięki czemu możemy wykonać porównanie:

```js
function ScrollView({row}) {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [prevRow, setPrevRow] = useState(null);

  if (row !== prevRow) {
    // Wiersz zmienił się od ostatniego renderowania. Zaktualizuj isScrollingDown.
    setIsScrollingDown(prevRow !== null && row > prevRow);
    setPrevRow(row);
  }

  return `Przewijanie w dół: ${isScrollingDown}`;
}
```

Na pierwszy rzut oka może to wyglądać dziwnie, ale aktualizacja podczas renderowania jest dokładnie tym samym, czym w założeniu metoda `getDerivedStateFromProps` była od zawsze.

### Czy istnieje coś takiego jak `forceUpdate`? {#is-there-something-like-forceupdate}

Zarówno `useState`, jak i `useReducer` [wycofują się z aktualizacji](/docs/hooks-reference.html#bailing-out-of-a-state-update), jeżeli kolejna wartość jest taka sama jak poprzednia. Zmiana stanu bez użycia `setState`, a następnie wywołanie `setState` nie skutkuje ponownym renderowaniem komponentu.

Zazwyczaj nie powinno się bezpośrednio modyfikować lokalnego stanu w Reakcie. Możesz jednak inkrementować licznik, aby wymusić ponowne renderowanie, nawet jeśli stan się nie zmienił:

```js
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  function handleClick() {
    forceUpdate();
  }
```

Jeżeli to możliwe, staraj się unikać tego wzorca.

### Czy mogę stworzyć referencję do komponentu funkcyjnego? {#can-i-make-a-ref-to-a-function-component}

Nie powinno się tego robić zbyt często, jednak możesz upublicznić niektóre imperatywne metody dla komponentu rodzica używając hooka [`useImperativeHandle`](/docs/hooks-reference.html#useimperativehandle).

### Jak mogę zmierzyć węzeł DOM? {#how-can-i-measure-a-dom-node}

Aby zmierzyć pozycję lub rozmiar węzła DOM, możesz użyć [referencji z funkcją zwrotną](/docs/refs-and-the-dom.html#callback-refs). React wywoła funkcję zwrotną, gdy referencja zostanie przypisana do innego węzła. Tutaj znajdziesz [prosty przykład](https://codesandbox.io/s/l7m0v5x4v9):

```js{4-8,12}
function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <h1 ref={measuredRef}>Witaj, świecie</h1>
      <h2>Powyższy nagłówek ma {Math.round(height)} pikseli wysokości</h2>
    </>
  );
}
```

W tym przykładzie nie zdecydowaliśmy się użyć `useRef`, ponieważ obiekt referencji nie powiadamia nas o *zmianach* jego aktualnej wartości. Użycie referencji z funkcją zwrotną daje pewność, że [nawet jeśli komponent potomny wyświetli mierzony węzeł później](https://codesandbox.io/s/818zzk8m78) (np. w odpowiedzi na przyciśnięcie przycisku), komponent nadrzędny zostanie o tym powiadomiony i może zaktualizować swój pomiar.

Zauważ, że przekazaliśmy `[]` jako tablicę zależności do `useCallback`. Gwarantuje to nam niezmienialność funkcji zwrotnej pomiedzy ponownymi renderowaniami oraz że React nie wywoła jej bez potrzeby.

W tym przykładzie funkcja zwrotna referencji zostanie wywołana tylko w momencie zamontowania i odmontowania komponentu. Dzieje się tak dlatego, że komponent `<h1>` jest obecny w każdym renderowaniu. Jeśli chcesz otrzymywać powiadomienie przy każdej zmianie rozmiaru komponentu, proponujemy skorzystać z [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) lub hooka z jakiejś biblioteki zewnętrznej opartej na tym mechanizmie.

W razie konieczności można [wyodrębnić tę logikę](https://codesandbox.io/s/m5o42082xy) do osobnego hooka i używać wielokrotnie:

```js{2}
function MeasureExample() {
  const [rect, ref] = useClientRect();
  return (
    <>
      <h1 ref={ref}>Witaj, świecie</h1>
      {rect !== null &&
        <h2>Powyższy nagłówek ma {Math.round(rect.height)} pikseli wysokości</h2>
      }
    </>
  );
}

function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}
```


### Co oznacza `const [thing, setThing] = useState()`? {#what-does-const-thing-setthing--usestate-mean}

Jeżeli nie rozpoznajesz tej składni, sprawdź [wyjaśnienie](/docs/hooks-state.html#tip-what-do-square-brackets-mean) w dokumentacji hooka stanu.


## Optymalizacja wydajności {#performance-optimizations}

### Czy mogę pominąć efekt podczas aktualizacji komponentu? {#can-i-skip-an-effect-on-updates}

Tak. Zapoznaj się z [warunkowym uruchamianiem efektów](/docs/hooks-reference.html#conditionally-firing-an-effect). Pamiętaj jednak, że pomijanie aktualizacji często [prowadzi do błędów](/docs/hooks-effect.html#explanation-why-effects-run-on-each-update), z tego też powodu nie jest to domyślnie działanie.

### Czy bezpiecznie jest pomijać funkcje w liście zależności? {#is-it-safe-to-omit-functions-from-the-list-of-dependencies}

Ogólnie rzecz biorąc, nie.

```js{3,8}
function Example({ someProp }) {
  function doSomething() {
    console.log(someProp);
  }

  useEffect(() => {
    doSomething();
  }, []); // 🔴 Niebezpieczne (wywołuje `doSomething`, które używa `someProp`)
}
```

Trudno jest pamiętać, które właściwości lub stan są używane przez funkcje poza efektem. Dlatego też **zazwyczaj lepiej jest deklarować funkcje *wewnątrz* efektu.** Dzięki temu łatwo można zauważyć, od których wartości komponentu zależy efekt:

```js{4,8}
function Example({ someProp }) {
  useEffect(() => {
    function doSomething() {
      console.log(someProp);
    }

    doSomething();
  }, [someProp]); // ✅ OK (efekt używa wyłącznie `someProp`)
}
```

Jeżeli po zmianach efekt nadal nie używa wartości z zakresu komponentu, można bezpiecznie użyć `[]`:

```js{7}
useEffect(() => {
  function doSomething() {
    console.log('Cześć!');
  }

  doSomething();
}, []); // ✅ OK, ponieważ *żadne* wartości z zakresu komponentu nie są używane wewnątrz efektu
```

W zależności od przypadku użycia, istnieje kilka dodatkowych opcji, które opisaliśmy poniżej.

>Uwaga
>
>Stworzyliśmy regułę [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) (pol. *wyczerpujące zależności*), będącą częścią paczki [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation). Pomaga w znalezieniu komponentów, które nie obsługują aktualizacji w konsekwentny sposób.

Spójrzmy, dlaczego ma to znaczenie.

Kiedy określasz [tablicę zależności](/docs/hooks-reference.html#conditionally-firing-an-effect), ostatni argument dla `useEffect`, `useLayoutEffect`, `useMemo`, `useCallback`, lub `useImperativeHandle` powinien zawierać wszystkie wartości biorące udział w przepływie danych, włączając w to właściwości, stan i wszystkie ich pochodne.

Jedynym **bezpiecznym** przypadkiem pominięcia argumentu w tablicy zależności jest przekazanie funkcji, która w swoim wnętrzu nie ma odniesień do właściwości, stanu lub wartości z nich dziedziczących. Poniższy przykład zawiera błąd:

```js{5,12}
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  async function fetchProduct() {
    const response = await fetch('http://myapi/product/' + productId); // Używa właściwości productId
    const json = await response.json();
    setProduct(json);
  }

  useEffect(() => {
    fetchProduct();
  }, []); // 🔴 Błąd, ponieważ `fetchProduct` używa `productId`
  // ...
}
```

**Zalecanym sposobem naprawienia tego, jest przeniesienie funkcji do _wnętrza_ efektu**. Dzięki temu łatwiej będzie nam dostrzec stan lub właściwości, których używa efekt, i upewnić się, że wszystkie z nich zostały zadeklarowane:

```js{5-10,13}
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Po przeniesienu funkcji do wnętrza efektu, możemy łatwo dostrzec, których wartości używa.
    async function fetchProduct() {
      const response = await fetch('http://myapi/product/' + productId);
      const json = await response.json();
      setProduct(json);
    }

    fetchProduct();
  }, [productId]); // ✅ Poprawnie, ponieważ efekt używa wyłącznie productId
  // ...
}
```

Pozwala to również na obsłużenie asynchronicznych odpowiedzi, stosując zmienną lokalną wewnątrz efektu:

```js{2,6,10}
  useEffect(() => {
    let ignore = false;
    async function fetchProduct() {
      const response = await fetch('http://myapi/product/' + productId);
      const json = await response.json();
      if (!ignore) setProduct(json);
    }

    fetchProduct();
    return () => { ignore = true };
  }, [productId]);
```

Przenieśliśmy funkcję do wnętrza efektu, dlatego też nie musi ona znajdować się w tablicy zależności.

>Wskazówka
>
>Aby dowiedzieć się więcej o pobieraniu danych za pomocą hooków, sprawdź [ten przykład](https://codesandbox.io/s/jvvkoo8pq3) i [ten artykuł](https://www.robinwieruch.de/react-hooks-fetch-data/).

**Jeżeli z jakichś przyczyn _nie_ możesz przenieść funkcji do wnętrza efektu, istnieje kilka innych opcji:**

* **Możesz spróbować przenieść funkcję poza swój komponent**. W tym przypadku funkcja nie będzie odnosić się do żadnych właściwości czy stanu, dlatego też nie będzie potrzeby dodawania jej do tablicy zależności.
* Jeżeli funkcja, którą wywołujesz, wykonuje jedynie obliczenia i można ją bezpiecznie wywołać podczas renderowania, możesz zechcieć **wywołać ją poza efektem** i uzależnić efekt od zwróconej przez nią wartości.
* W ostateczności, możesz **dodać funkcję do zależności efektu poprzez _opakowanie jej definicji_**, korzystając z hooka [`useCallback`](/docs/hooks-reference.html#usecallback). Zapewnia to niezmienność podczas renderowania, dopóki nie zmieni się również *jej własna* tablica zależności:

```js{2-5}
function ProductPage({ productId }) {
  // ✅ Opakowanie za pomocą useCallback, aby uniknąć zmian przy każdym renderowaniu
  const fetchProduct = useCallback(() => {
    // ... Korzysta z productId ...
  }, [productId]); // ✅ Zdefiniowane zostały wszystkie zależności useCallback

  return <ProductDetails fetchProduct={fetchProduct} />;
}

function ProductDetails({ fetchProduct }) {
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]); // ✅ Zdefiniowane zostały wszystkie zależności useEffect
  // ...
}
```

Zauważ, że w powyższym przykładzie **musieliśmy** przekazać funkcję do tablicy zależności. Dzięki temu zmiana właściwości `productId` w `ProductPage` będzie automatycznie uruchamiała ponowne pobranie danych w komponencie `ProductDetails`.

### Co zrobić, gdy zależności mojego efektu zmieniają się zbyt często? {#what-can-i-do-if-my-effect-dependencies-change-too-often}

Czasem twój efekt może korzystać ze stanu, który zmienia się zbyt często. Może cię kusić usunięcie go z listy zależności, jednak zwykle prowadzi to do błędów.:

```js{6,9}
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // Ten efekt zależy od wartości `count`
    }, 1000);
    return () => clearInterval(id);
  }, []); // 🔴 Błąd: Zmienna `count` nie została wymieniona w zależnościach

  return <h1>{count}</h1>;
}
```

Pusty zbiór zależności, `[]`, oznacza, że efekt ten zostanie uruchomiony tylko jeden raz podczas montowania komponentu, ale już nie przy kolejnych renderowaniach. Problem polega na tym, iż wartość zmiennej `count` wewnątrz funkcji zwrotnej przekazanej do `setInterval` nie będzie się zmieniać. Dzieje się dlatego, że stworzyliśmy dla niej domknięcie (ang. *closure*), w którym `count` ma wartość `0`, ponieważ z taką wartością uruchomiono ten efekt. Co sekundę funkcja zwrotna będzie wywoływała `setCount(0 + 1)`, przez co wartość licznika nigdy nie przekroczy 1.

Podanie `[count]` jako listy zależności mogłoby naprawić ten błąd, jednak spowodowałoby to resetowanie się interwału przy każdej zmianie stanu. W konsekwencji, każdy `setInterval` miałby jedną szansę na wykonanie, zanim zostałby wyczyszczony (zachowanie podobne do `setTimeout`). Raczej nie o to nam chodzi. Aby temu zapobiec, możemy skorzystać z [funkcyjnego wariantu aktualizacji poprzez `setState`](/docs/hooks-reference.html#functional-updates). Pozwoli to nam określić, *jak* stan powinien się zmienić, bez odnoszenia się do konkretnego *aktualnego* stanu:

```js{6,9}
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1); // ✅ Nie zależy od zewnętrznej zmiennej `count`
    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ Nasz efekt nie korzysta z żadnych zmiennych z zakresu komponentu

  return <h1>{count}</h1>;
}
```

(Stałość referencyjna funkcji `setCount` jest zagwarantowana przez Reacta, więc można ją pominąć na liście zależności.)

Teraz funkcja zwrotna przekazana do `setInterval` wywoływana jest co sekundę, lecz za każdym razem wywołanie `setCount` wewnątrz korzysta z aktualnej wartości licznika `count` (nazwanej lokalnie jako `c`).

W bardziej zawiłych przypadkach (np. gdy jeden stan zależy od drugiego), spróbuj przenieść logikę zmiany stanu poza efekt przy pomocy [hooka `useReducer`](/docs/hooks-reference.html#usereducer). [W tym artykule](https://adamrackis.dev/state-and-use-reducer/) pokazano przykład jego zastosowania. **Tożsamość funkcji `dispatch` zwróconej przez `useReducer` jest zawsze stabilna** — nawet jeśli reduktor jest deklarowany wewnątrz komponentu i odczytuje jego właściwości.

Ostatecznie, jeśli zechcesz skorzystać z czegoś w rodzaju klasowego `this`, możesz [użyć referencji](/docs/hooks-faq.html#is-there-something-like-instance-variables) do przechowania mutowalnej zmiennej. Wtedy możliwe będzie jej nadpisywanie i odczytywanie w dowolnym momencie. Na przykład:

```js{2-6,10-11,16}
function Example(props) {
  // Trzymamy ostatnie właściwości w referencji.
  const latestProps = useRef(props);
  useEffect(() => {
    latestProps.current = props;
  });

  useEffect(() => {
    function tick() {
      // Odczytujemy ostatnie właściwości w dowolnym momencie
      console.log(latestProps.current);
    }

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []); // Ten efekt nigdy nie uruchomi się ponownie
}
```

Rób tak tylko, gdy nie znajdziesz lepszej alternatywy, ponieważ poleganie na mutacjach negatywnie wpływa na przewidywalność zachowania się komponentów. Jeśli znasz jakiś wzorzec, którego nie da się w prosty sposób wyrazić za pomocą hooków, [zgłoś to nam](https://github.com/facebook/react/issues/new), załączając przykład działającego kodu, a my postaramy się pomóc.

### Jak zaimplementować `shouldComponentUpdate`? {#how-do-i-implement-shouldcomponentupdate}

Możesz opakować komponent funkcyjny za pomocą `React.memo`, aby zastosować płytkie porównanie jego właściwości:

```js
const Button = React.memo((props) => {
  // twój komponent
});
```

Nie jest to hook, bo nie komponuje się jak hooki. `React.memo` jest odpowiednikiem klasy `PureComponent`, jednak ogranicza się do porównywania wyłącznie właściwości. (Możesz także jako drugi argument przekazać funkcję porównującą poprzednie i aktualne właściwości. Jeśli zwróci `true`, aktualizacja komponentu zostanie pominięta.)

`React.memo` nie porównuje stanu komponentu, ponieważ komponenty funkcyjne nie mają jednego jedynego obiektu stanu, jak to ma miejsce w komponentach klasowych. Możesz jednak sprawić, by komponenty potomne również były "czystymi" komponentami (ang. *pure components*), a nawet [zoptymalizować poszczególnych potomków za pomocą `useMemo`](/docs/hooks-faq.html#how-to-memoize-calculations).

### Jak memoizować obliczenia? {#how-to-memoize-calculations}

Za pomocą hooka [`useMemo`](/docs/hooks-reference.html#usememo) możesz zapamiętać wynik obliczeń pomiędzy kolejnymi renderowaniami:

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

Powyższy kod wywołuje funkcję `computeExpensiveValue(a, b)`, która wykonuje kosztowne obliczenia. Jeśli jednak zależności `[a, b]` nie zmieniły się od ostatniego razu, `useMemo` pominie kolejne wywołanie funkcji i zamiast tego zwróci ostatni wynik.

Pamiętaj, że funkcja przekazana do `useMemo` wywoływana jest podczas renderowania. Nie rób w niej niczego, czego normalnie nie robisz podczas renderowania. Oznacza to, że, na przykład, efekty uboczne należy umieszczać w `useEffect`, a nie w `useMemo`.

**Traktuj użycie `useMemo` jako optymalizację szybkości programu, a nie "gwarancję semantyczną" (ang. *semantic guarantee*).** W przyszłości React być może będzie "zapominał" niektóre zapisane wyniki i przeliczał je dopiero przy następnym renderowaniu, np. aby zwolnić pamięć przydzieloną dla komponentów, których nie widać na ekranie. Pisz swój kod tak, aby działał bez użycia `useMemo` — a dopiero później dodawaj ten hook w celach optymalizacyjnych. (W sporadycznych przypadkach, w których wynik *nigdy* nie powinien być przeliczany na nowo, zalecamy skorzystać z [leniwie inicjalizowanej referencji](#how-to-create-expensive-objects-lazily).)

Co więcej, `useMemo` pozwala także pominąć kosztowne renderowania komponentów potomnych:

```js
function Parent({ a, b }) {
  // Ponownie renderowany tylko wtedy, gdy zmieni się `a`:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Ponownie renderowany tylko wtedy, gdy zmieni się `b`:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  )
}
```

Pamiętaj jednak, że to podejście nie zadziała w pętli, ponieważ [hooków nie można wywoływać w pętlach](/docs/hooks-rules.html). Możesz jednak wydzielić osobny komponent renderujący element listy, a następnie wywołać w nim `useMemo`.

### Jak w leniwy sposób tworzyć "ciężkie" obiekty? {#how-to-create-expensive-objects-lazily}

`useMemo` pozwala na [memoizację kosztownych obliczeń](#how-to-memoize-calculations), pod warunkiem, że ich zależności są takie same. Jest to jednak tylko wskazówka i nie *gwarantuje*, że obliczenia nie zostaną uruchomione ponownie. Czasem jednak chcesz mieć pewność, że obiekt zostanie stworzony dokładnie raz.

**Pierwszy z częstych przypadków dotyczy kosztownego tworzenia stanu początkowego:**

```js
function Table(props) {
  // ⚠️ Funkcja createRows() będzie wywoływana przy każdym renderowaniu
  const [rows, setRows] = useState(createRows(props.count));
  // ...
}
```

Aby uniknąć ponownego tworzenia i tak ignorowanego stanu początkowego, możemy do `useState` przekazać **funkcję inicjalizującą**:

```js
function Table(props) {
  // ✅ Funkcja createRows() będzie wywołana tylko raz
  const [rows, setRows] = useState(() => createRows(props.count));
  // ...
}
```

React wywoła funkcję tylko przy pierwszym renderowaniu. Po więcej informacji zajrzyj do [dokumentacji API hooka `useState`](/docs/hooks-reference.html#usestate).

**Czasem możesz chcieć uniknąć wielokrotnego tworzenia wartości początkowej dla hooka `useRef()`.** Na przykład, jeśli chcesz mieć pewność, że zostanie utworzona tylko jedna instancja danej klasy:

```js
function Image(props) {
  // ⚠️ Instancja klasy IntersectionObserver będzie tworzona przy każdym renderowaniu
  const ref = useRef(new IntersectionObserver(onIntersect));
  // ...
}
```

Hook `useRef` **nie przyjmuje** alternatywnego argumentu w postaci funkcji, jak ma to miejsce w `useState`. Zamiast tego możesz napisać własną funkcję, która tworzy i ustawia wartość referencji w sposób leniwy:

```js
function Image(props) {
  const ref = useRef(null);

  // ✅ Instancja klasy IntersectionObserver zostanie stworzona leniwie tylko raz
  function getObserver() {
    if (ref.current === null) {
      ref.current = new IntersectionObserver(onIntersect);
    }
    return ref.current;
  }

  // W razie potrzeby możesz wywołać getObserver()
  // ...
}
```

Pozwala to uniknąć tworzenia kosztownych obiektów do czasu, aż faktycznie będą potrzebne. Jeśli używasz Flow lub TypeScriptu, możesz dla pewności dodatkowo nadać funkcji `getObserver()` typ nie dopuszczający wartości `null` (ang. *non-nullable type*).


### Czy hooki są wolne z powodu tworzenia funkcji podczas renderowania? {#are-hooks-slow-because-of-creating-functions-in-render}

Nie. We współczesnych przeglądarkach wydajność domknięć w porównaniu z zastosowaniem klas nie różni się znacząco, za wyjątkiem sytuacji ekstremalnych.

Ponadto, warto zwrócić uwagę, że sposób działania hooków jest bardziej wydajny pod kilkoma względami:

* Hooki unikają sporej części narzutu, jaki wprowadzają klasy - jak choćby koszt tworzenia instancji klasy czy dowiązywanie procedur obsługi zdarzeń w konstruktorze.

* **Kod idiomatyczny używający hooków nie wymaga głębokiego zagnieżdżania drzewa komponentów**, co ma miejsce w kodzie korzystającym z komponentów wyższego rzędu (ang. *higher-order components*), właściwości renderujących (ang. *render props*) i kontekstu. W mniejszych drzewach komponentów React ma mniej do roboty.

Tradycyjnie już, obawy dotyczące wydajności dla *funkcji inline* w Reakcie były związane z sytuacjami, w których przekazywanie każdorazowo nowych funkcji zwrotnych do komponentów potomnych niwelowało optymalizację zapewnioną przez `shouldComponentUpdate` w potomkach. Hooki rozwiązują ten problem na trzy sposoby.

* Hook [`useCallback`](/docs/hooks-reference.html#usecallback) pozwala na przechowywanie tej samej referencji do funkcji zwrotnej pomiędzy kolejnymi renderowaniami, dzięki czemu metoda `shouldComponentUpdate` może działać poprawnie:

    ```js{2}
    // Nie zmieni się, dopóki nie zmienią się `a` lub `b`
    const memoizedCallback = useCallback(() => {
      doSomething(a, b);
    }, [a, b]);
    ```

* Hook [`useMemo`](/docs/hooks-faq.html#how-to-memoize-calculations) ułatwia kontrolowanie tego, kiedy aktualizowane są poszczególne komponenty potomne, zmniejszając potrzebę stosowania czystych komponentów (ang. *pure components*).

* Wreszcie hook [`useReducer`](/docs/hooks-reference.html#usereducer) zmniejsza potrzebę przekazywania funkcji zwrotnych do dalekich potomków, co wyjaśniono poniżej.

### Jak unikać przekazywania funkcji zwrotnych w dół? {#how-to-avoid-passing-callbacks-down}

Z naszych obserwacji wynika, że programiści nie lubią ręcznego przekazywania funkcji zwrotnych w dół przez kilka poziomów drzewa komponentów. Nawet jeśli kod w ten sposób staje się bardziej bezpośredni, możemy odnieść wrażenie, że zbyt dużo czasu poświęcamy "hydraulice" programu.

W dużych drzewach komponentów sugerujemy przekazywać funkcję `dispatch`, zwróconą przez hooka [`useReducer`](/docs/hooks-reference.html#usereducer), poprzez kontekst:

```js{4,5}
const TodosDispatch = React.createContext(null);

function TodosApp() {
  // Uwaga: `dispatch` nie zmieni się pomiędzy renderowaniami
  const [todos, dispatch] = useReducer(todosReducer);

  return (
    <TodosDispatch.Provider value={dispatch}>
      <DeepTree todos={todos} />
    </TodosDispatch.Provider>
  );
}
```

Dowolny komponent poddrzewa wewnątrz `TodosApp` może użyć funkcji `dispatch`, aby uruchomić akcję z `TodosApp`:

```js{2,3}
function DeepChild(props) {
  // Jeśli chcemy wykonać jakąś akcję, możemy wyciągnąć funkcję `dispatch` z kontekstu.
  const dispatch = useContext(TodosDispatch);

  function handleClick() {
    dispatch({ type: 'add', text: 'zrobić pranie' });
  }

  return (
    <button onClick={handleClick}>Dodaj zadanie</button>
  );
}
```

Jest to wygodne zarówno z perspektywy utrzymania kodu (nie trzeba przekazywać funkcji zwrotnych w nieskończoność), jak i ogólnie uniknięcia problemów z tego typu funkcjami. Sugerujemy zatem wykonywać wszelkie "odległe" aktualizacje za pomocą przekazanej w dół funkcji `dispatch`.

Pamiętaj, że nadal możesz wybrać pomiędzy przekazywaniem *stanu* aplikacji w dół za pomocą właściwości (bardziej "wprost") lub za pomocą kontekstu (wygodniejsze w przypadku "odległych" aktualizacji). Jeśli chcesz użyć kontekstu także do przekazania stanu, sugerujemy skorzystać z dwóch niezależnych kontekstów. Kontekst przekazujący `dispatch` nigdy się nie zmienia, dzięki czemu używające go komponenty nie muszą być ponownie renderowane, o ile same w jawny sposób nie poproszą o stan.

### Jak odczytywać często zmieniającą się wartość wewnątrz `useCallback`? {#how-to-read-an-often-changing-value-from-usecallback}

>Uwaga
>
>Zalecamy [przekazywać w dół funkcję `dispatch` za pomocą kontekstu](#how-to-avoid-passing-callbacks-down), a nie poszczególne funkcje zwrotne za pomocą właściwości. Poniższy sposób został tu umieszczony tylko jako uzupełnienie i "furtka awaryjna".

W rzadkich przypadkach pojawia się potrzeba memoizowania funkcji zwrotnej za pomocą hooka [`useCallback`](/docs/hooks-reference.html#usecallback), lecz nie przynosi to żadnej korzyści, ponieważ wewnętrzna funkcja i tak tworzona jest zbyt często. Jeśli memoizowana funkcja jest procedurą obsługi zdarzeń i nie jest wywoływana podczas renderowania, można stworzyć [referencję do zmiennej](#is-there-something-like-instance-variables) i ręcznie aktualizować jej wartość:

```js{6,10}
function Form() {
  const [text, updateText] = useState('');
  const textRef = useRef();

  useEffect(() => {
    textRef.current = text; // Nadpisz wartość referencji
  });

  const handleSubmit = useCallback(() => {
    const currentText = textRef.current; // Odczytaj wartość referencji
    alert(currentText);
  }, [textRef]); // Nie twórz ponownie `handleSubmit`, jak byłoby przy `[text]`

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}
```

Metoda ta może wydawać się mocno zagmatwana, lecz pokazuje, że można, w razie potrzeby, skorzystać z tego typu optymalizacji. Łatwiej z niej korzystać po wydzieleniu logiki do osobnego hooka:

```js{4,16}
function Form() {
  const [text, updateText] = useState('');
  // Podlega memoizacji, nawet gdy zmienia się `text`:
  const handleSubmit = useEventCallback(() => {
    alert(text);
  }, [text]);

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}

function useEventCallback(fn, dependencies) {
  const ref = useRef(() => {
    throw new Error('Niedozwolone wywołanie procedury obsługi zdarzeń podczas renderowania.');
  });

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback(() => {
    const fn = ref.current;
    return fn();
  }, [ref]);
}
```

Tak czy inaczej, **nie zalecamy korzystania z tego sposobu**, a pokazujemy go tylko dla kompletności dokumentacji. Zamiast tego lepiej jest [unikać przekazywania funkcji zwrotnych głęboko w dół](#how-to-avoid-passing-callbacks-down).


## Pod maską {#under-the-hood}

### Jak React łączy wywołania hooków z komponentami? {#how-does-react-associate-hook-calls-with-components}

React sprawuje kontrolę nad aktualnie renderowanym komponentem. Dzięki [zasadom korzystania z hooków](/docs/hooks-rules.html) wiemy, że hooki mogą być wywoływane tylko z wnętrza komponentów reactowych (lub własnych hooków -- które również można wywoływać tylko w komponentach reactowych).

Do każdego komponentu przypisana jest wewnętrzna lista "komórek pamięci". Są to zwykłe obiekty javascriptowe, w których przechowujemy jakieś dane. Kiedy wywołujesz hook, np. `useState()`, odczytuje on aktualną zawartość komórki (lub tworzy nową podczas pierwszego renderowania), a następnie przesuwa "wskaźnik" na kolejną komórkę. To dzięki temu każde z kilku wywołań `useState()` może zarządzać niezależną porcją lokalnego stanu.

### Skąd wziął się pomysł na stworzenie hooków? {#what-is-the-prior-art-for-hooks}

Hooki łączą pomysły z wielu różnych źródeł:

* Nasze stare eksperymenty z funkcyjnymi API w repozytorium [react-future](https://github.com/reactjs/react-future/tree/master/07%20-%20Returning%20State).
* Eksperymenty społeczności reactowej z interfejsami dla właściwości renderujących, wliczając w to [Reactions Component](https://github.com/reactions/component) autorstwa [Ryana Florence'a](https://github.com/ryanflorence).
* Propozycję [Dominica Gannawaya](https://github.com/trueadm) dotyczącą wprowadzenia [słowa kluczowego `adopt`](https://gist.github.com/trueadm/17beb64288e30192f3aa29cad0218067) jako nowej składni dla właściwości renderujących.
* Zmienne stanu i komórki stanu w języku [DisplayScript](http://displayscript.org/introduction.html).
* [Komponenty redukujące](https://reasonml.github.io/reason-react/docs/en/state-actions-reducer.html) w ReasonReact.
* [Subskrypcje](http://reactivex.io/rxjs/class/es6/Subscription.js~Subscription.html) w Rx.
* [Efekty algebraiczne](https://github.com/ocamllabs/ocaml-effects-tutorial#2-effectful-computations-in-a-pure-setting) w Multicore OCaml.

[Sebastian Markbåge](https://github.com/sebmarkbage) wymyślił pierwowzór hooków, który później został udoskonalony przez [Andrewa Clarka](https://github.com/acdlite), [Sophie Alpert](https://github.com/sophiebits), [Dominica Gannawaya](https://github.com/trueadm) i innych członków zespołu Reacta.
