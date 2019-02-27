---
id: hooks-overview
title: Hooki w pigułce
permalink: docs/hooks-overview.html
next: hooks-state.html
prev: hooks-intro.html
---

*Hooki* są nowym dodatkiem w Reakcie 16.8. Pozwalają one używać stanu i innych funkcjonalności Reacta, bez użycia klas.

Hooki są [kompatybilne wstecznie](/docs/hooks-intro.html#no-breaking-changes). Ten rozdział zawiera przegląd wiedzy o Hookach i przeznaczony jest dla doświadczonych użytkowników Reacta. Naprawdę szybki przegląd. Jeżeli poczujesz się zagubiony, szukaj żółtych ramek, takich jak ta poniżej:


>Szczegółowe wyjaśnienie
>
>Przeczytaj podrozdział ["Motywacja"](/docs/hooks-intro.html#motivation), aby dowiedzieć się dlaczego dodaliśmy Hooki

**↑↑↑ Każdy podrozdział zakończony jest taką żółtą ramką.** Zawierają one linki do szczegółowych objaśnień.

## 📌 Hook Stanu {#state-hook}

Ten przykład renderuje licznik. Kiedy wciskasz przycisk, zwiększa on wartość w stanie.

```js{1,4,5}
import React, { useState } from 'react';

function Example() {
  // Zadeklaruj nową zmienną stanu, którą nazwiemy "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Nacisnąłeś {count} razy</p>
      <button onClick={() => setCount(count + 1)}>
        Naciśnij mnie
      </button>
    </div>
  );
}
```

W tym przykładzie `useState` jest *Hookiem* (za chwilę wyjaśnimy, co to znaczy). Wywołujemy go z wewnątrz komponentu funkcyjnego, aby wzbogacić go o lokalny stan. React zachowa ten stan pomiędzy kolejnymi renderowaniami. `useState` zwraca parę: *aktualną* wartość stanu i funkcję, która pozwala go aktualizować. Następnie możesz wywołać te funkcję w procedurze obsługi zdarzenia albo z innego miejsca. Działa to mniej więcej tak samo, jak `this.setState` w komponencie klasowym. Z tą różnicą, że nie scala on starych i nowych wartości. (Szerzej omawiamy te różnice w rozdziale ["Używanie Hooka Stanu"](/docs/hooks-state.html).)

Jedynym argumentem funkcji `useState` jest stan początkowy. W przykładzie powyżej jest to `0`, ponieważ nasz licznik startuje od zera. Zauważ, że w przeciwieństwie to `this.state` stan nie musi być obiektem. Nic jednak nie stoi na przeszkodzie, by nim był. Wartość argumentu ze stanem początkowym jest wykorzystywana tylko przy pierwszym renderze.

#### Deklaracja kilku zmiennych stanu {#declaring-multiple-state-variables}

Możesz użyć Hooka Stanu kilka razy w tym samym komponencie:

```js
function ExampleWithManyStates() {
  // Zadeklaruj kilka zmiennych stanu!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}
```

Dzięki składni [przypisania destrukturyzującego tablic](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Operatory/Destructuring_assignment#Destrukturyzacja_tablic) możemy nadać różne nazwy zmiennym stanu, które zadeklarowaliśmy wywołując funkcję `useState`. Nazwy te nie są częścią interfejsu API `useState`. Zamiast tego React zakłada, że jeżeli wywołujesz funckję `useState` wielokrotnie, za każdym razem (przy każdym renderze) robisz to w tej samej kolejności. W dalszej części tego rozdziału omówimy jak to działa i dlaczego jest to przydatne.

#### Ale czym jest Hook? {#but-what-is-a-hook}

Hooki są to funkcje, które pozwalają "zahaczyć się" w mechanizmy stanu i cyklu życia Reacta, z wewnątrz komponentów funkcyjnych. Hooki nie działają w klasach -- zamiast tego pozwalają korzystać z Reacta bez klas. ([Nie zalecamy](/docs/hooks-intro.html#gradual-adoption-strategy) przepisywania istniejących komponentów z dnia na dzień, ale jeżeli masz ochotę, możesz zacząć korzystać z Hooków w nowych komponentach.)

React dostarcza kilka wbudowanych Hooków, między innymi `useState`. Ale możesz też stworzyć własne Hooki, by współdzielić zachowanie związane ze stanem pomiędzy komponentami. Najpierw rzućmy jednak okiem na wbudowane Hooki.

>Szczegółowe wyjaśnienie
>
>Hookowi Stanu poświęciliśmy cały rozdział: ["Używanie Hooka Stanu"](/docs/hooks-state.html).

## ⚡️ Hook Efektu {#effect-hook}

Najprawdopodobniej pobierałeś już dane, obsługiwałeś subskrypcje lub ręcznie modyfikowałeś drzewo DOM z wewnątrz komponentów reactowych. Tego typu operacje nazywamy ["efektami ubocznymi"](https://www.wikiwand.com/pl/Skutek_uboczny_(informatyka)) (ang. *side effects*), ponieważ mogą one wpływać na inne komponenty i nie mogą zostać przeprowadzone podczas renderowania.

Hook Efektu `useEffect` daje możliwość przeprowadzania "efektów ubocznych" z wewnątrz komponentu funkcyjnego. Pełni on taką samą funkcję, jak `componentDidMount`, `componentDidUpdate` i `componentWillUnmount` w komponentach klasowych, ale uproszczoną do jednego interfejsu API. (Różnice między nimi pokażemy na przykładach w rozdziale ["Używanie Hooka Efektu"](/docs/hooks-effect.html).)

Na przykład, ten komponent ustawia tytuł dokumentu HTML po tym, jak React zaktualizuje drzewo DOM:

```js{1,6-10}
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Podobnie jak componentDidMount i componentDidUpdate:
  useEffect(() => {
    // Zaktualizuj tytuł dokumentu, korzystając z interfejsu API przeglądarki
    document.title = `Nacisnąłeś ${count} razy`;
  });

  return (
    <div>
      <p>Nacisnąłeś {count} razy</p>
      <button onClick={() => setCount(count + 1)}>
        Naciśnij mnie
      </button>
    </div>
  );
}
```

Kiedy wywołujesz funkcję `useEffect`, mówisz Reactowi, żeby uruchomił twój "efekt", gdy zakończy spłukiwanie (ang. *flush*) kolejki zmian do drzewa DOM. Efekty są zadeklarowane wewnątrz komponentu, więc mają dostęp do jego właściwości (ang. *props*) i stanu. Domyślnie React uruchomi wszystkie efekty po każdym renderowaniu -- *włącznie* z pierwszym. (Różnice między tym, a metodami cyklu życia komponentów klasowych omówimy w rozdziale [["Używanie Hooka Efektu"](/docs/hooks-effect.html).)

Efekty mogą też określać w jaki sposób należy po nich "posprzątać", poprzez zwrócenie funkcji. Na przykład, ten komponent używa efektu, aby zasubskrybować się do informacji o dostępności znajomego. A następnie sprząta po sobie, anulując subskrypcję.

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

W tym przykładzie React anuluje subskrypcję naszego `ChatAPI`, w momencie, gdy komponent zostaje odmontowany. Zrobi to też przed każdym kolejnym uruchomieniem efektu (które następuje przy każdym przerenderowaniu komponentu). (Jeśli chcesz, możesz [powiedzieć Reactowi żeby tego nie robił](/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects), jeśli wartość `props.friend.id`, którą przekazaliśmy do `ChatAPI` się nie zmieniła.)

Podobnie jak z `useState`, możesz użyć więcej niż jednego efektu w swoim komponencie:

```js{3,8}
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Nacisnąłeś ${count} razy`;
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

Hooki pozwalają ci organizować kod wewnątrz komponentu, bazując na powiązanych ze sobą fragmentach (takich jak dodawanie i anulowanie subskrypcji). Nie wymuszają sztucznego podziału, jak metody cyklu życia (ang. *lifecycle methods*).

>Szczegółowe wyjaśnienie
>
>Możesz dowiedzieć się więcej o `useEffect` w rozdziale: ["Używanie Hooka Efektu"](/docs/hooks-effect.html).

## ✌️ Zasady korzystania z Hooków {#rules-of-hooks}

Hooki są funkcjami JavaScriptowymi, ale narzucają dwie dodatkowe zasady:

* Wywołuj Hooki tylko **z najwyższego poziomu kodu**. Nie wywołuj Hooków z wewnątrz pętli, warunków czy zagnieżdżonych funkcji
* Wywołuj Hooki tylko **z wewnątrz reactowych komponentów funkcyjnych**. Nie wywołuj Hooków z wewnątrz zwykłych JavaScriptowych funkcji. (Jest jeszcze tylko jedno miejsce, z którego możesz wywoływać Hooki -- twoje własne Hooki. Za chwilę dowiemy się więcej.)

Zapewniliśmy [wtyczkę do lintera](https://www.npmjs.com/package/eslint-plugin-react-hooks), która automatycznie wymusza te zasady. Rozumiemy, że zasady te mogą z początku wydawać się ograniczające i zagmatwane, ale są one niezbędne żeby Hooki działały prawidłowo.

>Szczegółowe wyjaśnienie
>
>Możesz dowiedzieć się więcej o tych zasadach w rozdziale: ["Zasady korzystania z Hooków"](/docs/hooks-rules.html).

## 💡 Tworzenie własnych Hooków {#building-your-own-hooks}

Czasami zdarza się, że chcemy ponownie wykorzystać pewną logikę związaną ze stanem pomiędzy komponentami. Tradycyjnie, mieliśmy do dyspozycji dwa popularne rozwiązania tego problemu: [komponenty wyższego rzędu (ang. *higher-order components*)](/docs/higher-order-components.html) i [właściwości renderujące (ang. *render props*)](/docs/render-props.html). Własne Hooki rozwiązują ten problem, bez dodawania kolejnych komponentów do drzewa.

W jednym z poprzednich podrozdziałów pokazaliśmy komponent `FriendStatus`, który wykorzystuje Hooki `useState` i `useEffect` aby zasubskrybować się do informacji o dostępności znajomego. Załóżmy, że chcieli byśmy wykorzystać te logikę w innym komponencie.

Na początek wydzielmy te logikę do własnego Hooka o nazwie `useFriendStatus`:

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

Przyjmuje on zmienną `friendID` jako argument i zwraca informację o tym, czy nasz znajomy jest dostępny.

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

Stan obu tych komponentów jest w pełni niezależny. Hooki są metodą na współdzielenie *logiki związanej ze stanem*, nie zaś samego stanu. Tak naprawdę, to każde *wywołanie* Hooka tworzy kompletnie wyizolowany stan -- możesz więc użyć tego samego, własnego Hooka kilkukrotnie w jednym komponencie.

Własne Hooki są bardziej konwencją niż wbudowanym mechanizmem. Jeżeli nazwa funkcji zaczyna się od "`use`" i wywołuje ona inne Hooki, mówimy że mamy do czynienia z własnym Hookiem. Na tej konwencji nazewnictwa `useSomething` bazuje nasza wtyczka do lintera i pozwala jej to znaleźć błędy w kodzie korzystającym z Hooków.

Możesz pisać własne Hooki, które obejmują szereg różnych przypadków - od obsługi animacji, deklaratywnych subskrypcji, liczników, po wiele innych, o których nie pomyśleliśmy. Nie możemy doczekać się, żeby zobaczyć, na jakie pomysły wykorzystania własnych Hooków wpadnie społeczność Reacta.

>Szczegółowe wyjaśnienie
>
>Możesz dowiedzieć się więcej o własnych Hookach w rozdziale ["Budowanie własnych Hooków"](/docs/hooks-custom.html).

## 🔌 Inne Hooki {#other-hooks}

Istnieje kilka mniej popularnych, wbudowanych Hooków, które mogą ci się spodobać. Na przykład [`useContext`](/docs/hooks-reference.html#usecontext) pozwala zasubskrybować się do zmian kontekstu (ang. *context*), bez wprowadzania zagnieżdżania:

```js{2,3}
function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  // ...
}
```

Z kolei [`useReducer`](/docs/hooks-reference.html#usereducer) pozwala na zarządzanie lokalny stanem skomplikowanych komponentów przy użyciu reduktora (ang. *reducer*):

```js{2}
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);
  // ...
```

>Szczegółowe wyjaśnienie
>
>Więcej informacji o wszystkich wbudowanych Hookach znajdziesz w rozdziale: ["Hooki - interfejs API"](/docs/hooks-reference.html).

## Kolejne kroki {#next-steps}

Uff, to był wyczerpująco szybki przegląd! Jeżeli coś z tego, co przeczytałeś nie miału sensu albo chciałbyś po prostu dowiedzieć się więcej, możesz czytać kolejne rozdziały, zaczynając od ["Hook Stanu"](/docs/hooks-state.html).

Możesz też zerknąć na rozdziały ["Hooki - interfejs API"](/docs/hooks-reference.html) i ["Hooki - FAQ"](/docs/hooks-faq.html).

I na koniec, nie zapomnij o rozdziale ["Wprowadzenie do Hooków"](/docs/hooks-intro.html), w którym wyjaśniliśmy, dlaczego dodaliśmy Hooki i jak zacząć z nich korzystać równolegle z istniejącym kodem - bez przepisywania aplikacji.
