---
title: "Wbudowane hooki reactowe"
---

<Intro>

*Hooki* pozwalają na używanie różnych funkcjonalności reactowych wewnątrz komponentów. Możesz skorzystać z tych wbudowanych lub stworzyć własne poprzez ich połączenie. Poniżej znajdziesz listę wszystkich hooków dostępnych w Reakcie.

</Intro>

---

## Hooki stanu {/*state-hooks*/}

*Stan* pozwala komponentowi ["pamiętać" informacje, np. dane wprowadzone przez użytkownika](/learn/state-a-components-memory). Przykładowo, komponent formularza może przechowywać w stanie wartości pól formularza, a komponent galerii zdjęć może pamiętać pozycję aktualnie zaznaczonego elementu.

Aby dodać stan do komponentu, użyj jednego z tych hooków:

* [`useState`](/reference/react/useState) deklaruje zmienną stanu, którą można zmieniać bezpośrednio.
* [`useReducer`](/reference/react/useReducer) deklaruje zmienną stanu wraz z logiką jej aktualizacji zawartą w [funkcji redukującej (*ang.* reducer function)](/learn/extracting-state-logic-into-a-reducer).

```js
function ImageGallery() {
  const [index, setIndex] = useState(0);
  // ...
```

---

## Hooki kontekstu {/*context-hooks*/}

*Kontekst* pozwala komponentowi [odbierać informacje od odległych rodziców bez przekazywania ich bezpośrednio za pomocą właściwości](/learn/passing-props-to-a-component). Przykładowo, komponent główny aplikacji może przekazać aktualny motyw kolorystyczny wszystkim komponentom w drzewie poniżej, bez względu na to, jak głęboko są zagnieżdżone.

* [`useContext`](/reference/react/useContext) odczytuje wartości z kontekstu i subskrybuje się na wszelkie ich zmiany.

```js
function Button() {
  const theme = useContext(ThemeContext);
  // ...
```

---

## Hooki referencji {/*ref-hooks*/}

*Referencje* pozwalają komponentowi [trzymać informacje, które nie są potrzebne do renderowania](/learn/referencing-values-with-refs), jak np. węzeł DOM lub ID opóźnienia (*ang.* timeout). W przeciwieństwie do stanu, zmiana wartości referencji nie powoduje ponownego przerenderowania komponentu. Referencje są niejako "ukrytą furtką", pozwalającą wyjść poza paradygmaty Reacta. Przydają się, gdy potrzebujesz skorzystać z systemów nie-reactowych, jak choćby API wbudowane w przeglądarkę.

* [`useRef`](/reference/react/useRef) deklaruje referencję. Możesz w niej trzymać dowolną wartość, lecz zwykle używa się jej do przechowywania węzła DOM.
* [`useImperativeHandle`](/reference/react/useImperativeHandle) pozwala dostosować referencję wystawianą przez twój komponent. Rzadko używany.

```js
function Form() {
  const inputRef = useRef(null);
  // ...
```

---

## Hooki efektu {/*effect-hooks*/}

*Efekty* pozwalają komponentowi [połączyć się i zsynchronizować z zewnętrznymi systemami](/learn/synchronizing-with-effects). Mowa tu o sieci, DOM przeglądarki, animacjach, widgetach napisanych przy użyciu innej biblioteki czy innego kodu nie-reactowego.

* [`useEffect`](/reference/react/useEffect) łączy komponent z systemem zewnętrznym.

```js
function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
  // ...
```

Efekty są "ukrytą furtką", pozwalającą wyjść poza paradygmaty Reacta. Nie używaj ich do organizowania przepływu danych w aplikacji. Jeśli nie wchodzisz w interakcję z systemem zewnętrznym, [możesz wcale nie potrzebować efektu.](/learn/you-might-not-need-an-effect)

Istnieją dwa rzadko używane wariacje hooka `useEffect`, różniące się momentem wywołania:

* [`useLayoutEffect`](/reference/react/useLayoutEffect) jest wywoływany zanim przeglądarka wykona ponowne rysowanie treści strony. Można w nim mierzyć elementy układu strony.
* [`useInsertionEffect`](/reference/react/useInsertionEffect) jest wywoływany zanim React wprowadzi zmiany do DOM. Biblioteki mogą za jego pomocą wstrzyknąć dynamiczne style CSS.

---

## Hooki wydajnościowe {/*performance-hooks*/}

Powszechnie stosowanym zabiegiem, mającym na celu optymalizację wydajności renderowania, jest pominięcie zbędnej pracy. Na przykład, możesz poinstruować Reacta, aby użył poprzednio obliczonej wartości lub aby nie renderował ponownie komponentu, jeśli dane nie zmieniły się od ostatniego renderowania.

Aby pominąć obliczenia i niepotrzebne renderowania, użyj jednego z poniższych hooków:

- [`useMemo`](/reference/react/useMemo) pozwala zapamiętać wynik kosztownych obliczeń.
- [`useCallback`](/reference/react/useCallback) pozwala zapamiętać definicję funkcji przed przekazaniem jej do zoptymalizowanego komponentu.

```js
function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
}
```

Czasami nie można pominąć ponownego renderowania, ponieważ ekran mimo wszystko musi zostać zaktualizowany. W takim przypadku możesz poprawić wydajność poprzez rozdzielenie blokujących aktualizacji, które muszą być synchroniczne (np. wpisywanie przez użytkownika tekstu do pola) od nieblokujących, które nie muszą blokować interfejsu (np. aktualizacja wykresu).

Aby spriorytetyzować renderowanie, użyj jednego z tych hooków.

- [`useTransition`](/reference/react/useTransition) pozwala oznaczyć zmianę stanu jako nieblokującą, co umożliwia innym zmianom na przerwanie jej.
- [`useDeferredValue`](/reference/react/useDeferredValue) pozwala opóźnić aktualizację niekrytycznej części interfejsu na rzecz innych.

---

## Hooki zasobów {/*resource-hooks*/}

Do *zasobów* można dostać się z poziomu komponentu bez konieczności tworzenia dla nich stanu lokalnego. Na przykład, komponent może odczytywać wiadomość z Obietnicy (*ang.* Promise) albo informacje o stylu z kontekstu. 

Aby odczytać wartość z zasobu, użyj tego Hooka:

- [`use`](/reference/react/use) pozwala na odczytanie wartości zasobu, takiego jak [Obietnica (*ang.* Promise)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) lub [kontekst](/learn/passing-data-deeply-with-context).

```js
function MessageComponent({ messagePromise }) {
  const message = use(messagePromise);
  const theme = use(ThemeContext);
  // ...
}
```

---

## Inne hooki {/*other-hooks*/}

Te hooki przydają się zwykle tylko autorom bibliotek i nieczęsto spotyka się je w kodzie aplikacyjnym.

- [`useDebugValue`](/reference/react/useDebugValue) pozwala zmienić etykietę twojego własnego hooka, którą wyświetlają React DevTools.
- [`useId`](/reference/react/useId) pozwala komponentowi przypisać do siebie unikalny identyfikator. Zwykle używane w połączeniu z API dostępności (*ang.* accessibility).
- [`useSyncExternalStore`](/reference/react/useSyncExternalStore) pozwala komponentowi na zasubskrybowanie się do magazynu zewnętrznego.

---

## Twoje własne hooki {/*your-own-hooks*/}

Możesz także [zdefiniować swoje własne hooki](/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook-from-a-component) jako funkcje javascriptowe.
