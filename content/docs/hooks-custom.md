---
id: hooks-custom
title: Tworzenie własnych hooków
permalink: docs/hooks-custom.html
next: hooks-reference.html
prev: hooks-rules.html
---

<<<<<<< HEAD
*Hooki* są nowym dodatkiem w Reakcie 16.8. Pozwalają one na wykorzystanie stanu i innych funkcjonalności Reacta, bez użycia klas.
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Reusing Logic with Custom Hooks](https://beta.reactjs.org/learn/reusing-logic-with-custom-hooks)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

*Hooks* are a new addition in React 16.8. They let you use state and other React features without writing a class.
>>>>>>> 47adefd30c46f486428d8231a68e639d62f02c9e

Tworzenie własnych hooków pozwala wydzielić logikę z komponentów do funkcji.

Podczas nauki o [używaniu hooka efektów](/docs/hooks-effect.html#example-using-hooks-1) poznaliśmy przedstawiony poniżej komponent aplikacji czatu. Komponent ten wyświetla wiadomość informującą o tym, czy znajomy jest dostępny, czy nie:

```js{4-15}
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

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

Załóżmy, że nasza aplikacja posiada też listę kontaktów i chcemy wyświetlać imiona dostępnych użytkowników w kolorze zielonym. Moglibyśmy skopiować i wkleić powyższą logikę do naszego komponentu `FriendListItem`, ale nie byłoby to idealne rozwiązanie:

```js{4-15}
import React, { useState, useEffect } from 'react';

function FriendListItem(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

Zamiast tego chcielibyśmy współdzielić logikę pomiędzy komponentami `FriendStatus` i `FriendListItem`.

 W tradycyjnym podejściu mieliśmy do dyspozycji dwa popularne rozwiązania tego problemu: [komponenty wyższego rzędu (ang. *higher-order components*)](/docs/higher-order-components.html) i [właściwości renderujące (ang. *render props*)](/docs/render-props.html). Przyjrzyjmy się teraz, jak hooki rozwiązują wiele z tych samych problemów, nie zmuszając przy tym do dodawania kolejnych komponentów do drzewa.

## Wyodrębnianie logiki własnego hooka {#extracting-a-custom-hook}

Kiedy chcemy współdzielić logikę pomiędzy dwoma javascriptowymi funkcjami, wyodrębniamy ją do trzeciej funkcji. Zarówno komponenty, jak i hooki są funkcjami, więc zadziała to także dla nich!

**Własny hook to po prostu javascriptowa funkcja, której nazwa zaczyna się od `use` i która może wywoływać inne hooki.** Poniższy przykład `useFriendStatus` to nasz pierwszy własny hook:

```js{3}
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

Wewnątrz nie znajdziemy nic nowego -- logika została skopiowana z komponentów powyżej. Pamiętaj żeby, tak jak w komponentach, wywoływać inne hooki tylko z najwyższego poziomu kodu twoich własnych hooków.

W przeciwieństwie do reactowych komponentów, własny hook nie ma narzuconego określonego kształtu. Sami decydujemy, jakie przyjmuje argumenty i jaką, jeśli jakąkolwiek, wartość zwróci. Innymi słowy, zachowuje się jak zwykła funkcja. Jego nazwa powinna zawsze zaczynać się od `use`, aby można było już na pierwszy rzut oka stwierdzić, czy mają dla niego zastosowanie [zasady korzystania z hooków](/docs/hooks-rules.html).

Celem naszego hooka `useFriendStatus` jest zasubskrybowanie się do statusu dostępności znajomego.  Dlatego przyjmuje on wartość `friendID` jako argument i zwraca informację, czy znajomy jest dostępny:

```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  return isOnline;
}
```

Teraz przyjrzymy się, jak możemy używać własnych hooków.

## Używanie własnych hooków {#using-a-custom-hook}

Przypomnijmy, że naszym celem było usunięcie powielonej logiki z komponentów `FriendStatus` i `FriendListItem`. Oba oczekują informacji o tym, czy nasz znajomy jest dostępny.

Teraz, kiedy już wyodrębniliśmy tę logikę do hooka `useFriendStatus`, możemy go *po prostu użyć:*

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

**Czy ten kod jest równoważny oryginalnym przykładom?** Tak, działa on dokładnie w ten sam sposób. Jeśli przyjrzysz się uważniej, zauważysz, że nie dokonaliśmy żadnej zmiany w zachowaniu. Wszystko co zrobiliśmy, to wyodrębnienie wspólnego kodu z dwóch funkcji do jednej, osobnej funkcji. **Własne hooki są konwencją, która wynika naturalnie ze sposobu, w jaki zostały zaprojektowane hooki. Nie są one osobną funkcjonalnością Reacta.**

**Czy nazwy moich własnych hooków muszą zaczynać się od „`use`”?** Bardzo prosimy. Ta konwencja jest bardzo ważna. Bez niej nie moglibyśmy automatycznie sprawdzać, czy zostały naruszone [zasady korzystania z hooków](/docs/hooks-rules.html), ponieważ nie bylibyśmy w stanie stwierdzić, czy w danej funkcji znajdują się wywołania hooków.

**Czy dwa komponenty, korzystające z tego samego hooka, współdzielą stan?** Nie. Własne hooki to mechanizm pozwalający na współdzielenie *logiki związanej ze stanem* (takiej jak tworzenie subskrypcji i zapamiętywanie bieżącej wartości), ale za każdym razem, kiedy używasz własnego hooka, cały stan i efekty wewnątrz niego są całkowicie odizolowane od siebie nawzajem.

**W jaki sposób własny hook otrzymuje odizolowany stan?** Każde *wywołanie* hooka tworzy odizolowany stan. Ponieważ wywołujemy `useFriendStatus` bezpośrednio, z punktu widzenia Reacta nasze komponenty wywołują po prostu funkcje `useState` i `useEffect`. A jak [dowiedzieliśmy się](/docs/hooks-state.html#tip-using-multiple-state-variables) już [wcześniej](/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns), możemy w jednym komponencie wielokrotnie wywoływać funkcje `useState` oraz `useEffect` i będą one całkowicie niezależne.

### Porada: Przekazywanie informacji pomiędzy hookami {#tip-pass-information-between-hooks}

Jako że hooki to funkcje, możemy pomiędzy nimi przekazywać informacje.

Aby to zilustrować, użyjemy kolejnego komponentu z naszego hipotetycznego przykładu czatu. Jest to rozwijane pole wyboru odbiorcy wiadomości, które wyświetla też, czy aktualnie wybrany znajomy jest dostępny:

```js{8-9,13}
const friendList = [
  { id: 1, name: 'Phoebe' },
  { id: 2, name: 'Rachel' },
  { id: 3, name: 'Ross' },
];

function ChatRecipientPicker() {
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);

  return (
    <>
      <Circle color={isRecipientOnline ? 'green' : 'red'} />
      <select
        value={recipientID}
        onChange={e => setRecipientID(Number(e.target.value))}
      >
        {friendList.map(friend => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
    </>
  );
}
```

Przechowujemy aktualnie wybrany identyfikator znajomego w zmiennej stanu `recipientID` i aktualizujemy ją, gdy użytkownik wybierze innego znajomego z rozwijanego pola wyboru `<select>`.

Jako że wywołanie hooka `useState` zwraca najnowszą wartość zmiennej stanu `recipientID`, możemy przekazać ją do naszego własnego hooka `useFriendStatus` jako argument:

```js
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);
```

Dzięki temu wiemy, czy *aktualnie wybrany* znajomy jest dostępny. Jeżeli wybierzemy innego znajomego, a tym samym zaktualizujemy zmienną stanu `recipientID`, nasz hook `useFriendStatus` anuluje subskrypcję dla poprzednio wybranego znajomego i zasubskrybuje się do statusu nowo wybranego.

## Użyj wyobraźni {#useyourimagination}

Własne hooki dają możliwość współdzielenia logiki w sposób, w jaki dotychczas nie było to możliwe w reactowych komponentach. Możesz pisać własne hooki, które obejmują szereg różnych przypadków użycia - od obsługi formularzy, animacji, deklaratywnych subskrypcji, liczników, po wiele innych, których jeszcze nie wymyślono. Co więcej, możesz tworzyć hooki, które są równie łatwe w użyciu, jak wbudowane funkcje Reacta.

Spróbuj jednak powstrzymać się od zbyt wczesnego wprowadzania abstrakcji. Teraz, kiedy komponenty funkcyjne mogą znacznie więcej, twój kod źródłowy takich komponentów najprawdopodobniej zacznie „puchnąć”. To normalne, nie *zmuszaj się* od razu do dzielenia go na hooki. Ale zachęcamy też do tego, aby zacząć rozglądać się za przypadkami, gdzie własny hook mógłby ukryć skomplikowaną logikę za prostym interfejsem albo pomóc uprzątnąć zagmatwany komponent.

Załóżmy na przykład, że masz w swoim kodzie skomplikowany komponent z dużą ilością zmiennych stanu, zarządzanych w sposób doraźny. Hook `useState` nie jest wcale rozwiązaniem na łatwą centralizację tej logiki. Pewnie lepiej byłoby ci napisać [reduxowy](https://redux.js.org/) reduktor (ang. *reducer*):

```js
function todosReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, {
        text: action.text,
        completed: false
      }];
    // ... inne akcje ...
    default:
      return state;
  }
}
```

Reduktory są bardzo wygodne do testowania w izolacji i skalowania w celu wyrażenia skomplikowanej logiki aktualizacji. W razie potrzeby możesz je rozbić na mniejsze reduktory. Tym niemniej, być może wolisz korzystać z zalet lokalnego stanu Reacta albo po prostu nie chcesz instalować kolejnej biblioteki.

A co jeśli moglibyśmy napisać hook `useReducer`, który pozwala na zarządzanie *lokalnym* stanem komponentu przy użyciu reduktora? Jego uproszczona wersja mogłaby wyglądać następująco:

```js
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
```

Teraz możemy go użyć w naszym komponencie i pozwolić reduktorowi na zarządzanie jego stanem:

```js{2}
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: 'add', text });
  }

  // ...
}
```

Potrzeba zarządzania lokalnym stanem złożonego komponentu za pomocą reduktora jest na tyle powszechna, że wbudowaliśmy hook `useReducer` bezpośrednio w Reacta. Jego opis, wraz z innymi wbudowanymi hookami, znajdziesz w rozdziale pt. [„Hooki - interfejs API”](/docs/hooks-reference.html).
