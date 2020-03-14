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
  * [Co hooki oznaczają dla popularnych API, takich jak connect() z Reduxa lub React Router?](#what-do-hooks-mean-for-popular-apis-like-redux-connect-and-react-router)
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
  * [Jak zaimplementować getDerivedStateFromProps?](#how-do-i-implement-getderivedstatefromprops)
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
  * [Jak w leniwy sposób tworzyć "ciężkie" komponenty?](#how-to-create-expensive-objects-lazily)
  * [Czy hooki są wolne z powodu tworzenia funkcji podczas renderowania?](#are-hooks-slow-because-of-creating-functions-in-render)
  * [Jak unikać przekazywania funkcji zwrotnych w dół?](#how-to-avoid-passing-callbacks-down)
  * [Jak odczytywać często zmieniającą się wartość z useCallback?](#how-to-read-an-often-changing-value-from-usecallback)
* **[Pod maską](#under-the-hood)**
  * [Jak React łączy wywołania hooków z komponentami?](#how-does-react-associate-hook-calls-with-components)
  * [Jaki jest stan patentu dla hooków?](#what-is-the-prior-art-for-hooks)

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

Ze względu na to, że hooki pojawiły się całkiem niedawno, niektóre biblioteki firm trzecich mogą być z nimi niekompatybilne.

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
import ReactDOM from 'react-dom';
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
    ReactDOM.render(<Counter />, container);
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

Działanie referencji jest takie samo, jak użycie zmiennych instancji w klasie. Jeśli nie korzystasz z [leniwej inicjalizacji](#how-to-create-expensive-objects-lazily), unikaj używania referencji podczas renderowania  -- może to prowadzić do niepożądanych zachowań. Zamiast tego modyfikuj referencje wewnątrz efektów lub procedur obsługi zdarzeń.

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

Na tę chwilę musisz to robić ręcznie [przy pomocy referencji](#is-there-something-like-instance-variables):

```js{6,8}
function Counter() {
  const [count, setCount] = useState(0);

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

Prawdopodobnie [w ogóle nie potrzebujesz tej funkcjonalności](/blog/2018/06/07/you-probably-dont-need-derived-state.html). W rzadkich przypadkach, w których naprawdę będziesz tego potrzebować (na przykład implementacja komponentu `<Transition>`), możesz zaktualizować stan w trakcie renderowania. React uruchomi ponownie komponent z zaktualizowanym stanem natychmiast po pierwszym renderowaniu, więc nie wpłynie to znacząco na wydajność.

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

### Czy istnieje coś takiego jak forceUpdate? {#is-there-something-like-forceupdate}

Zarówno `useState`, jak i `useReducer` [wycofują się z aktualizacji](/docs/hooks-reference.html#bailing-out-of-a-state-update), jeżeli kolejna wartość jest taka sama jak poprzednia. Zmiana stanu bez użycia `setState`, a następnie wywołanie `setState` nie skutkuje ponownym renderowaniem komponentu.

Zazwyczaj nie powinno się modyfikować lokalnego stanu w Reakcie. Możesz jednak inkrementować licznik, aby wymusić ponowne renderowanie, nawet jeśli stan się nie zmienił:

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

Kiedy określasz [tablicę zależności](/docs/hooks-reference.html#conditionally-firing-an-effect), ostatni argument dla `useEffect`, `useMemo`, `useCallback`, lub `useImperativeHandle` powinien zawierać wszystkie wartości biorące udział w przepływie danych, włączając w to właściwości, stan i wszystkie ich pochodne.

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

**Zalecanym sposobem naprawienia tego, jest przeniesienie funkcji do _wnętrza_ efektu**. Dzięki temu łatwo będziemy w stanie dostrzec stan lub właściwości, których używa efekt, i upewnić się, że wszystkie z nich zostały zadeklarowane:

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

Pozwala to również na obsłużenie asynchronicznych odpowiedzi stosując zmienną lokalną wewnątrz efektu:

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

Przenieśliśmy funkcję do wnętrza efektu, dlatego też nie musi się znajdować w tablicy zależności.

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

Pusty zbiór zależności, `[]`, oznacza, że efekt ten zostanie uruchomiony tylko jeden raz podczas montowania komponentu, a nie przy każdym ponownym renderowaniu. Problem polega na tym, iż wartość zmienne `count` wewnątrz funkcji zwrotnej przekazanej do `setInterval` nie będzie się zmieniać. Dzieje się dlatego, że stworzyliśmy dla niej "domknięcie", w którym `count` ma wartość `0`, ponieważ z taką wartością uruchomiono ten efekt. Co sekundę funkcja zwrotna będzie wywoływała `setCount(0 + 1)`, przez co wartość licznika nigdy nie przekroczy 1.

Podanie `[count]` jako lista zależności mogłoby naprawić ten błąd, jednak spowodowałoby to resetowanie się interwału przy każdej zmianie stanu. W konsekwencji, każdy `setInterval` miałby jedną szansę na wykonanie, zanim zostałby wyczyszczony (zachowanie podobne do `setTimeout`). Raczej nie o to nam chodzi. Aby temu zapobiec, możemy skorzystać z [funkcyjnego wariantu aktualizacji poprzez `setState`](/docs/hooks-reference.html#functional-updates). Pozwoli to nam określić, *jak* stan powinien się zmienić, bez odnoszenia się do konkretnego *aktualnego* stanu:

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
  // Trzymaj ostatnie właściwości w referencji.
  const latestProps = useRef(props);
  useEffect(() => {
    latestProps.current = props;
  });

  useEffect(() => {
    function tick() {
      // Odczytaj ostatnie właściwości w dowolnym momencie
      console.log(latestProps.current);
    }

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []); // Ten efekt nigdy nie uruchomi się ponownie
}
```

Rób tak tylko gdy nie znajdziesz lepszej alternatywy, ponieważ poleganie na mutacjach negatywnie wpływa na przewidywalność zachowania się komponentów. Jeśli znasz jakiś wzorzec, którego nie da się w prosty sposób wyrazić za pomocą hooków, [zgłoś to](https://github.com/facebook/react/issues/new), załączając przykład działającego kodu, a postaramy się pomóc.

### Jak zaimplementować `shouldComponentUpdate`? {#how-do-i-implement-shouldcomponentupdate}

Możesz opakować komponent funkcyjny za pomocą `React.memo`, aby zastosować płytkie porównanie jego właściwości:

```js
const Button = React.memo((props) => {
  // twój komponent
});
```

Nie jest to hook, bo nie komponuje się jak hooki. `React.memo` jest odpowiednikiem klasy `PureComponent`, jednak ogranicza się do porównywania wyłącznie właściwości. (Możesz także jako drugi argument przekazać funkcję porównującą poprzednie i aktualne właściwości. Jeśli zwróci `true`, aktualizacja komponentu zostanie pominięta.)

`React.memo` nie porównuje stanu komponentu, ponieważ nie ma jednego jedynego obiektu stanu, jak to ma miejsce w komponentach klasowych. Możesz jednak sprawić, by potomkowie również byli "czystymi" komponentami (ang. *pure components*), a nawet [zoptymalizować poszczególnych potomków za pomocą `useMemo`](/docs/hooks-faq.html#how-to-memoize-calculations).

### Jak memoizować obliczenia? {#how-to-memoize-calculations}

The [`useMemo`](/docs/hooks-reference.html#usememo) Hook lets you cache calculations between multiple renders by "remembering" the previous computation:

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

This code calls `computeExpensiveValue(a, b)`. But if the dependencies `[a, b]` haven't changed since the last value, `useMemo` skips calling it a second time and simply reuses the last value it returned.

Remember that the function passed to `useMemo` runs during rendering. Don't do anything there that you wouldn't normally do while rendering. For example, side effects belong in `useEffect`, not `useMemo`.

**You may rely on `useMemo` as a performance optimization, not as a semantic guarantee.** In the future, React may choose to "forget" some previously memoized values and recalculate them on next render, e.g. to free memory for offscreen components. Write your code so that it still works without `useMemo` — and then add it to optimize performance. (For rare cases when a value must *never* be recomputed, you can [lazily initialize](#how-to-create-expensive-objects-lazily) a ref.)

Conveniently, `useMemo` also lets you skip an expensive re-render of a child:

```js
function Parent({ a, b }) {
  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Only re-rendered if `b` changes:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  )
}
```

Note that this approach won't work in a loop because Hook calls [can't](/docs/hooks-rules.html) be placed inside loops. But you can extract a separate component for the list item, and call `useMemo` there.

### How to create expensive objects lazily? {#how-to-create-expensive-objects-lazily}

`useMemo` lets you [memoize an expensive calculation](#how-to-memoize-calculations) if the dependencies are the same. However, it only serves as a hint, and doesn't *guarantee* the computation won't re-run. But sometimes you need to be sure an object is only created once.

**The first common use case is when creating the initial state is expensive:**

```js
function Table(props) {
  // ⚠️ createRows() is called on every render
  const [rows, setRows] = useState(createRows(props.count));
  // ...
}
```

To avoid re-creating the ignored initial state, we can pass a **function** to `useState`:

```js
function Table(props) {
  // ✅ createRows() is only called once
  const [rows, setRows] = useState(() => createRows(props.count));
  // ...
}
```

React will only call this function during the first render. See the [`useState` API reference](/docs/hooks-reference.html#usestate).

**You might also occasionally want to avoid re-creating the `useRef()` initial value.** For example, maybe you want to ensure some imperative class instance only gets created once:

```js
function Image(props) {
  // ⚠️ IntersectionObserver is created on every render
  const ref = useRef(new IntersectionObserver(onIntersect));
  // ...
}
```

`useRef` **does not** accept a special function overload like `useState`. Instead, you can write your own function that creates and sets it lazily:

```js
function Image(props) {
  const ref = useRef(null);

  // ✅ IntersectionObserver is created lazily once
  function getObserver() {
    if (ref.current === null) {
      ref.current = new IntersectionObserver(onIntersect);
    }
    return ref.current;
  }

  // When you need it, call getObserver()
  // ...
}
```

This avoids creating an expensive object until it's truly needed for the first time. If you use Flow or TypeScript, you can also give `getObserver()` a non-nullable type for convenience.


### Are Hooks slow because of creating functions in render? {#are-hooks-slow-because-of-creating-functions-in-render}

No. In modern browsers, the raw performance of closures compared to classes doesn't differ significantly except in extreme scenarios.

In addition, consider that the design of Hooks is more efficient in a couple ways:

* Hooks avoid a lot of the overhead that classes require, like the cost of creating class instances and binding event handlers in the constructor.

* **Idiomatic code using Hooks doesn't need the deep component tree nesting** that is prevalent in codebases that use higher-order components, render props, and context. With smaller component trees, React has less work to do.

Traditionally, performance concerns around inline functions in React have been related to how passing new callbacks on each render breaks `shouldComponentUpdate` optimizations in child components. Hooks approach this problem from three sides.

* The [`useCallback`](/docs/hooks-reference.html#usecallback) Hook lets you keep the same callback reference between re-renders so that `shouldComponentUpdate` continues to work:

    ```js{2}
    // Will not change unless `a` or `b` changes
    const memoizedCallback = useCallback(() => {
      doSomething(a, b);
    }, [a, b]);
    ```

* The [`useMemo`](/docs/hooks-faq.html#how-to-memoize-calculations) Hook makes it easier to control when individual children update, reducing the need for pure components.

* Finally, the [`useReducer`](/docs/hooks-reference.html#usereducer) Hook reduces the need to pass callbacks deeply, as explained below.

### How to avoid passing callbacks down? {#how-to-avoid-passing-callbacks-down}

We've found that most people don't enjoy manually passing callbacks through every level of a component tree. Even though it is more explicit, it can feel like a lot of "plumbing".

In large component trees, an alternative we recommend is to pass down a `dispatch` function from [`useReducer`](/docs/hooks-reference.html#usereducer) via context:

```js{4,5}
const TodosDispatch = React.createContext(null);

function TodosApp() {
  // Note: `dispatch` won't change between re-renders
  const [todos, dispatch] = useReducer(todosReducer);

  return (
    <TodosDispatch.Provider value={dispatch}>
      <DeepTree todos={todos} />
    </TodosDispatch.Provider>
  );
}
```

Any child in the tree inside `TodosApp` can use the `dispatch` function to pass actions up to `TodosApp`:

```js{2,3}
function DeepChild(props) {
  // If we want to perform an action, we can get dispatch from context.
  const dispatch = useContext(TodosDispatch);

  function handleClick() {
    dispatch({ type: 'add', text: 'hello' });
  }

  return (
    <button onClick={handleClick}>Add todo</button>
  );
}
```

This is both more convenient from the maintenance perspective (no need to keep forwarding callbacks), and avoids the callback problem altogether. Passing `dispatch` down like this is the recommended pattern for deep updates.

Note that you can still choose whether to pass the application *state* down as props (more explicit) or as context (more convenient for very deep updates). If you use context to pass down the state too, use two different context types -- the `dispatch` context never changes, so components that read it don't need to rerender unless they also need the application state.

### How to read an often-changing value from `useCallback`? {#how-to-read-an-often-changing-value-from-usecallback}

>Note
>
>We recommend to [pass `dispatch` down in context](#how-to-avoid-passing-callbacks-down) rather than individual callbacks in props. The approach below is only mentioned here for completeness and as an escape hatch.
>
>Also note that this pattern might cause problems in the [concurrent mode](/blog/2018/03/27/update-on-async-rendering.html). We plan to provide more ergonomic alternatives in the future, but the safest solution right now is to always invalidate the callback if some value it depends on changes.

In some rare cases you might need to memoize a callback with [`useCallback`](/docs/hooks-reference.html#usecallback) but the memoization doesn't work very well because the inner function has to be re-created too often. If the function you're memoizing is an event handler and isn't used during rendering, you can use [ref as an instance variable](#is-there-something-like-instance-variables), and save the last committed value into it manually:

```js{6,10}
function Form() {
  const [text, updateText] = useState('');
  const textRef = useRef();

  useEffect(() => {
    textRef.current = text; // Write it to the ref
  });

  const handleSubmit = useCallback(() => {
    const currentText = textRef.current; // Read it from the ref
    alert(currentText);
  }, [textRef]); // Don't recreate handleSubmit like [text] would do

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}
```

This is a rather convoluted pattern but it shows that you can do this escape hatch optimization if you need it. It's more bearable if you extract it to a custom Hook:

```js{4,16}
function Form() {
  const [text, updateText] = useState('');
  // Will be memoized even if `text` changes:
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
    throw new Error('Cannot call an event handler while rendering.');
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

In either case, we **don't recommend this pattern** and only show it here for completeness. Instead, it is preferable to [avoid passing callbacks deep down](#how-to-avoid-passing-callbacks-down).


## Under the Hood {#under-the-hood}

### How does React associate Hook calls with components? {#how-does-react-associate-hook-calls-with-components}

React keeps track of the currently rendering component. Thanks to the [Rules of Hooks](/docs/hooks-rules.html), we know that Hooks are only called from React components (or custom Hooks -- which are also only called from React components).

There is an internal list of "memory cells" associated with each component. They're just JavaScript objects where we can put some data. When you call a Hook like `useState()`, it reads the current cell (or initializes it during the first render), and then moves the pointer to the next one. This is how multiple `useState()` calls each get independent local state.

### What is the prior art for Hooks? {#what-is-the-prior-art-for-hooks}

Hooks synthesize ideas from several different sources:

* Our old experiments with functional APIs in the [react-future](https://github.com/reactjs/react-future/tree/master/07%20-%20Returning%20State) repository.
* React community's experiments with render prop APIs, including [Ryan Florence](https://github.com/ryanflorence)'s [Reactions Component](https://github.com/reactions/component).
* [Dominic Gannaway](https://github.com/trueadm)'s [`adopt` keyword](https://gist.github.com/trueadm/17beb64288e30192f3aa29cad0218067) proposal as a sugar syntax for render props.
* State variables and state cells in [DisplayScript](http://displayscript.org/introduction.html).
* [Reducer components](https://reasonml.github.io/reason-react/docs/en/state-actions-reducer.html) in ReasonReact.
* [Subscriptions](http://reactivex.io/rxjs/class/es6/Subscription.js~Subscription.html) in Rx.
* [Algebraic effects](https://github.com/ocamllabs/ocaml-effects-tutorial#2-effectful-computations-in-a-pure-setting) in Multicore OCaml.

[Sebastian Markbåge](https://github.com/sebmarkbage) came up with the original design for Hooks, later refined by [Andrew Clark](https://github.com/acdlite), [Sophie Alpert](https://github.com/sophiebits), [Dominic Gannaway](https://github.com/trueadm), and other members of the React team.
