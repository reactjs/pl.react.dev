---
id: hooks-overview
title: Hooki w pigułce
permalink: docs/hooks-overview.html
next: hooks-state.html
prev: hooks-intro.html
---

*Hooki* są nowym dodatkiem w Reakcie 16.8. Pozwalają one używać stanu i innych funkcjonalności Reacta, bez użycia klas.

Hooki są [kompatybilne wstecznie](/docs/hooks-intro.html#no-breaking-changes). Ten rozdział zawiera szybki przegląd wiedzy o hookach i przeznaczony jest dla doświadczonych użytkowników Reacta. Jeżeli w którymś momencie się zgubisz, szukaj żółtych ramek, takich jak ta poniżej:

>Szczegółowe wyjaśnienie
>
>Przeczytaj podrozdział pt. [„Motywacja”](/docs/hooks-intro.html#motivation), aby dowiedzieć się, dlaczego dodaliśmy hooki

**↑↑↑ Każdy podrozdział zakończony jest taką żółtą ramką.** Zawierają one linki do szczegółowych objaśnień.

## 📌 Hook stanu {#state-hook}

Ten przykład renderuje licznik. Kiedy wciskasz przycisk, zwiększa on wartość w stanie.

```js{1,4,5}
import React, { useState } from 'react';

function Example() {
  // Zadeklaruj nową zmienną stanu, którą nazwiemy „count”
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Naciśnięto {count} razy</p>
      <button onClick={() => setCount(count + 1)}>
        Naciśnij mnie
      </button>
    </div>
  );
}
```

W tym przykładzie `useState` jest *hookiem* (za chwilę wyjaśnimy, co to znaczy). Wywołujemy go z wewnątrz komponentu funkcyjnego, aby wzbogacić go o lokalny stan. React zachowa ten stan pomiędzy kolejnymi renderowaniami. `useState` zwraca parę: *aktualną* wartość stanu i funkcję, która pozwala go aktualizować. Możesz wywołać tę funkcję w procedurze obsługi zdarzenia albo z innego miejsca. Działa to mniej więcej tak samo, jak `this.setState` w komponencie klasowym, z tą różnicą, że nie scala on starych i nowych wartości. (Szerzej omawiamy te różnice w rozdziale pt. [„Używanie hooka stanu”](/docs/hooks-state.html).)

Jedynym argumentem funkcji `useState` jest stan początkowy. W przykładzie powyżej jest to `0`, ponieważ nasz licznik startuje od zera. Zauważ, że w przeciwieństwie do `this.state`, stan nie musi być obiektem. Nic jednak nie stoi na przeszkodzie, by nim był. Wartość argumentu ze stanem początkowym jest wykorzystywana tylko podczas pierwszego renderowania.

#### Deklaracja kilku zmiennych stanu {#declaring-multiple-state-variables}

Możesz użyć hooka stanu kilka razy w tym samym komponencie:

```js
function ExampleWithManyStates() {
  // Zadeklaruj kilka zmiennych stanu!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}
```

Dzięki składni [przypisania destrukturyzującego tablic](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Operatory/Destructuring_assignment#Destrukturyzacja_tablic) możemy nadać różne nazwy zmiennym stanu, które zadeklarowaliśmy wywołując funkcję `useState`. Nazwy te nie są częścią interfejsu API `useState`. Zamiast tego React zakłada, że jeżeli wywołujesz funkcję `useState` wielokrotnie, za każdym razem (przy każdym renderze) robisz to w tej samej kolejności. W dalszej części tego rozdziału omówimy, jak to działa i dlaczego jest to przydatne.

#### Ale czym jest hook? {#but-what-is-a-hook}

Hooki są to funkcje, które pozwalają „zahaczyć się” w mechanizmy stanu i cyklu życia Reacta, z wewnątrz komponentów funkcyjnych. Hooki nie działają w klasach -- zamiast tego pozwalają korzystać z Reacta bez klas. ([Nie zalecamy](/docs/hooks-intro.html#gradual-adoption-strategy) przepisywania istniejących komponentów z dnia na dzień, ale jeżeli masz ochotę, możesz zacząć korzystać z hooków w nowych komponentach.)

React dostarcza kilka wbudowanych hooków, między innymi `useState`. Ale możesz też stworzyć własne hooki, by współdzielić zachowanie związane ze stanem pomiędzy komponentami. Najpierw rzućmy jednak okiem na wbudowane hooki.

>Szczegółowe wyjaśnienie
>
>Hookowi stanu poświęciliśmy cały rozdział: [„Używanie hooka stanu”](/docs/hooks-state.html).

## ⚡️ Hook efektów {#effect-hook}

Najprawdopodobniej zdarzyło ci się już pobierać dane, obsługiwać subskrypcje lub ręcznie modyfikować drzewo DOM wewnątrz komponentów reactowych. Tego typu operacje nazywamy [„efektami ubocznymi”](https://pl.wikipedia.org/wiki/Skutek_uboczny_(informatyka)) (ang. *side effects*), ponieważ mogą one wpływać na inne komponenty i nie mogą zostać przeprowadzone podczas renderowania.

Hook efektów `useEffect` daje możliwość przeprowadzania „efektów ubocznych” z wewnątrz komponentu funkcyjnego. Pełni on taką samą funkcję, jak `componentDidMount`, `componentDidUpdate` i `componentWillUnmount` w komponentach klasowych, ale uproszczoną do jednego interfejsu API. (Różnice między nimi pokażemy na przykładach w rozdziale pt. [„Używanie hooka efektów”](/docs/hooks-effect.html).)

Na przykład, ten komponent ustawia tytuł dokumentu HTML po tym, jak React zaktualizuje drzewo DOM:

```js{1,6-10}
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Podobnie jak componentDidMount i componentDidUpdate:
  useEffect(() => {
    // Zaktualizuj tytuł dokumentu, korzystając z interfejsu API przeglądarki
    document.title = `Naciśnięto ${count} razy`;
  });

  return (
    <div>
      <p>Naciśnięto {count} razy</p>
      <button onClick={() => setCount(count + 1)}>
        Naciśnij mnie
      </button>
    </div>
  );
}
```

Kiedy wywołujesz funkcję `useEffect`, mówisz Reactowi, żeby uruchomił twój „efekt”, gdy opróżni (ang. *flush*) bufor zmian do drzewa DOM. Efekty są deklarowane wewnątrz komponentu, więc mają dostęp do jego właściwości (ang. *props*) i stanu (ang. *state*). Domyślnie React uruchamia wszystkie efekty po każdym renderowaniu -- *włącznie* z pierwszym. (Różnice między tym a metodami cyklu życia komponentów klasowych omówimy w rozdziale pt. [„Używanie hooka efektów”](/docs/hooks-effect.html).)

Poprzez zwrócenie funkcji, efekty mogą też określać, w jaki sposób należy po nich „posprzątać”. Na przykład, ten komponent używa efektu, aby zasubskrybować się do informacji o dostępności znajomego. A następnie sprząta po sobie, anulując tę subskrypcję.

```js{10-16}
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Ładowanie...';
  }
  return isOnline ? 'Dostępny' : 'Niedostępny';
}
```

W tym przykładzie React anuluje subskrypcję naszego `ChatAPI` w momencie, gdy komponent zostaje odmontowany. Zrobi to też przed każdym kolejnym uruchomieniem efektu (które następuje przy każdym kolejnym renderowaniu komponentu). (Jeśli chcesz, możesz [powiedzieć Reactowi żeby tego nie robił](/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects), jeśli wartość `props.friend.id`, którą przekazaliśmy do `ChatAPI`, nie uległa zmianie.)

Podobnie jak z `useState`, możesz użyć więcej niż jednego efektu w swoim komponencie:

```js{3,8}
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Naciśnięto ${count} razy`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  // ...
```

Hooki pozwalają organizować kod wewnątrz komponentu, bazując na powiązanych ze sobą fragmentach (takich jak dodawanie i anulowanie subskrypcji). Nie wymuszają sztucznego podziału, jak metody cyklu życia (ang. *lifecycle methods*).

>Szczegółowe wyjaśnienie
>
>Możesz dowiedzieć się więcej o `useEffect` w rozdziale pt. [„Używanie hooka efektów”](/docs/hooks-effect.html).

## ✌️ Zasady korzystania z hooków {#rules-of-hooks}

Hooki są funkcjami javascriptowymi, ale narzucają dwie dodatkowe zasady:

* Wywołuj hooki tylko **z najwyższego poziomu kodu**. Nie wywołuj hooków z wewnątrz pętli, warunków czy zagnieżdżonych funkcji.
* Wywołuj hooki tylko **z wewnątrz reactowych komponentów funkcyjnych**. Nie wywołuj hooków z wewnątrz zwykłych javascriptowych funkcji. (Jest jeszcze tylko jedno miejsce, z którego możesz wywoływać hooki -- twoje własne hooki. Za chwilę dowiemy się o tym więcej.)

Stworzyliśmy [wtyczkę do lintera](https://www.npmjs.com/package/eslint-plugin-react-hooks), która automatycznie wymusza te zasady. Rozumiemy, że reguły te mogą z początku wydawać się ograniczające i zagmatwane, ale są one niezbędne do prawidłowego funkcjonowania hooków.

>Szczegółowe wyjaśnienie
>
>Możesz dowiedzieć się więcej o tych zasadach w rozdziale pt. [„Zasady korzystania z hooków”](/docs/hooks-rules.html).

## 💡 Tworzenie własnych hooków {#building-your-own-hooks}

Czasami zdarza się, że chcemy ponownie wykorzystać pewną logikę związaną ze stanem pomiędzy komponentami. W tradycyjnym podejściu mieliśmy do dyspozycji dwa popularne rozwiązania tego problemu: [komponenty wyższego rzędu (ang. *higher-order components*)](/docs/higher-order-components.html) i [właściwości renderujące (ang. *render props*)](/docs/render-props.html). Własne hooki rozwiązują ten problem, bez konieczności dodawania kolejnych komponentów do drzewa.

W jednym z poprzednich podrozdziałów pokazaliśmy komponent `FriendStatus`, który wykorzystuje hooki `useState` i `useEffect`, aby zasubskrybować się do informacji o dostępności znajomego. Załóżmy, że chcielibyśmy wykorzystać tę logikę w innym komponencie.

Na początek wydzielmy tę logikę do własnego hooka o nazwie `useFriendStatus`:

```js{3}
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

Jako argument przyjmuje on zmienną `friendID` i zwraca informację o tym, czy nasz znajomy jest dostępny.

Teraz możemy go użyć w obu naszych komponentach:


```js{2}
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Ładowanie...';
  }
  return isOnline ? 'Dostępny' : 'Niedostępny';
}
```

```js{2}
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

<<<<<<< HEAD
Stan obu tych komponentów jest w pełni niezależny. Hooki są metodą na współdzielenie *logiki związanej ze stanem*, nie zaś samego stanu. Tak naprawdę to każde *wywołanie* hooka tworzy kompletnie wyizolowany stan -- możesz więc użyć tego samego, własnego hooka kilkukrotnie w jednym komponencie.
=======
The state of each component is completely independent. Hooks are a way to reuse *stateful logic*, not state itself. In fact, each *call* to a Hook has a completely isolated state -- so you can even use the same custom Hook twice in one component.
>>>>>>> 63332462bb5afa18ac7a716975b679f4c23cc8a1

Własne hooki są bardziej konwencją niż wbudowanym mechanizmem. Jeżeli nazwa funkcji zaczyna się od „`use`” i wywołuje ona inne hooki, mówimy że mamy do czynienia z własnym hookiem. Na tej konwencji nazewnictwa `useSomething` bazuje nasza wtyczka do lintera i pozwala jej to znaleźć błędy w kodzie korzystającym z hooków.

Możesz pisać własne hooki, które obejmują szereg różnych przypadków - od obsługi animacji, deklaratywnych subskrypcji, liczników, po wiele innych, o których nie pomyśleliśmy. Nie możemy się doczekać, żeby zobaczyć, na jakie pomysły wykorzystania własnych hooków wpadnie społeczność Reacta.

>Szczegółowe wyjaśnienie
>
>Możesz dowiedzieć się więcej o własnych hookach w rozdziale pt. [„Tworzenie własnych hooków”](/docs/hooks-custom.html).

## 🔌 Inne hooki {#other-hooks}

Istnieje kilka mniej popularnych, wbudowanych hooków, które mogą ci się spodobać. Na przykład [`useContext`](/docs/hooks-reference.html#usecontext) pozwala zasubskrybować się do zmian kontekstu (ang. *context*) bez wprowadzania zagnieżdżania:

```js{2,3}
function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  // ...
}
```

Z kolei [`useReducer`](/docs/hooks-reference.html#usereducer) pozwala na zarządzanie lokalnym stanem skomplikowanych komponentów przy użyciu reduktora (ang. *reducer*):

```js{2}
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);
  // ...
```

>Szczegółowe wyjaśnienie
>
>Więcej informacji o wszystkich wbudowanych hookach znajdziesz w rozdziale pt. [„Hooki - interfejs API”](/docs/hooks-reference.html).

## Kolejne kroki {#next-steps}

Uff, to był wyczerpująco szybki przegląd! Jeżeli coś z tego, co napisaliśmy, nie miało dla ciebie sensu lub jeśli chcesz po prostu dowiedzieć się więcej, możesz przeczytać kolejne rozdziały, zaczynając od [„Używanie hooka stanu”](/docs/hooks-state.html).

Możesz też zerknąć na rozdziały pt. [„Hooki - interfejs API”](/docs/hooks-reference.html) i [„Hooki - FAQ”](/docs/hooks-faq.html).

I na koniec: nie zapomnij o rozdziale pt. [„Wprowadzenie do hooków”](/docs/hooks-intro.html), w którym wyjaśniliśmy, dlaczego dodaliśmy hooki i jak zacząć z nich korzystać równolegle z istniejącym kodem -- bez przepisywania aplikacji.
