---
id: hooks-custom
title: Tworzenie własnych hooków
permalink: docs/hooks-custom.html
next: hooks-reference.html
prev: hooks-rules.html
---

*Hooki* są nowym dodatkiem w Reakcie 16.8. Pozwalają one na wykorzystanie stanu i innych funkcjonalności Reacta, bez użycia klas.

Tworzenie własnych hooków pozwala wydzielić logikę z komponentów do funkcji.

Podczas nauki o [używaniu hooka efektów](/docs/hooks-effect.html#example-using-hooks-1), poznaliśmy poniższy komponent z aplikacji czatu, który wyświetla wiadomość, informującą o tym, czy znajomy jest dostępny, czy nie:

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

Załóżmy, że nasza aplikacja posiada też listę kontaktów i chcemy wyświetlić imiona dostępnych użytkowników w kolorze zielonym. Moglibyśmy skopiować i wkleić powyższą logikę do naszego komponentu `FriendListItem`, ale nie byłoby to idealne rozwiązanie:

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

 W tradycyjnym podejściu mieliśmy do dyspozycji dwa popularne rozwiązania tego problemu: [komponenty wyższego rzędu (ang. *higher-order components*)](/docs/higher-order-components.html) i [właściwości renderujące (ang. *render props*)](/docs/render-props.html). Przyjrzyjmy się teraz, jak hooki rozwiązują wiele z podobnych problemów, bez konieczności dodawania kolejnych komponentów do drzewa.

## Wyodrębnianie logiki własnego hooka {#extracting-a-custom-hook}

Kiedy chcemy współdzielić logikę pomiędzy dwoma javascriptowymi funkcjami, wyodrębnimy ją do trzeciej funkcji. Zarówno komponenty, jak i hooki są funkcjami, więc zadziała to także dla nich!

**Własny hook to javascriptowa funkcja, której nazwa zaczyna się od `use` i która może wywoływać inne hooki.** Poniższy przykład `useFriendStatus` to nasz pierwszy własny hook:

```js{3}
import React, { useState, useEffect } from 'react';

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

Wewnątrz nie znajdziemy nic nowego -- logika została skopiowana z komponentów wyżej. Pamiętaj żeby, tak jak w komponentach, wywoływać inne hooki tylko z najwyższego poziomu kodu twoich własnych hooków.

W przeciwieństwie do reactowych komponentów, własny hook nie ma narzuconego określonego kształtu. Sami decydujemy, jakie przyjmuje argumenty i jaką, jeśli jakąkolwiek, wartość powinien zwracać. Innymi słowy zachowuje się jak zwykła funkcja. Jego nazwa powinna zawsze zaczynać się od `use`, aby można było już na pierwszy rzut oka zauważyć, czy stosuje on do [zasad korzystania z hooków](/docs/hooks-rules.html).

Celem naszego hooka `useFriendStatus` jest zasubskrybowanie się do statusu dostępności znajomego.  Dlatego przyjmuje on wartość `friendID` jako argument i zwraca informację czy znajomy jest dostępny:

```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  return isOnline;
}
```

Teraz przyjrzymy się, jak możemy używać własnych hooków.

## Używanie własnych hooków {#using-a-custom-hook}

Przypomnijmy, że naszym celem było usunięcie powielonej logiki z komponentów `FriendStatus` i `FriendListItem`. Oba oczekują informacji o tym czy nasz znajomy jest dostępny.

Teraz, kiedy już wyodrębniliśmy tę logikę do hooka `useFriendStatus`, możemy jej *po prostu użyć:*

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

**Czy ten kod jest równoważny oryginalnym przykładom?** Tak, działą on dokładnie w ten sam sposób. Jeśli przyjrzysz się dokładniej, zauważysz, że nie dokonaliśmy żadnej zmiany w zachowaniu. Wszystko co zrobiliśmy, to wyodrębnienie wspólnego kodu z dwóch funkcji do jednej, osobnej funkcji. **Własne hooki są konwencją, która wynika naturalnie ze sposobu, w jaki zostały zaprojektowane hooki. Nie są one osobną funkcjonalnością Reacta.**

**Czy nazwy moich własnych hooków muszą zaczynać się od „`use`”?** Bardzo prosimy. Ta konwencja jest bardzo ważna.  Bez niej nie moglibyśmy automatycznie sprawdzać, czy zostały naruszone [zasady korzystania z hooków](/docs/hooks-rules.html), ponieważ nie bylibyśmy w stanie stwierdzić, czy w danej funkcji znajdują się wywołania hooków.

**Czy dwa komponenty, korzystające z tego samego hooka, współdzielą stan?** Nie. Własne hooki to mechanizm pozwalający na współdzielenie *logiki związanej ze stanem* (takiej jak tworzenie subskrypcji i zapamiętywanie bieżącej wartości), ale za każdym razem, kiedy używasz własnego hooka cały stan i efekty wewnątrz niego są całkowicie odizolowane.

**W jaki sposób własny hook otrzymuje odizolowany stan?** Każde *wywołanie* hooka tworzy odizolowany stan. Ponieważ wywołujemy `useFriendStatus` bezpośrednio, z punktu widzenia Reacta nasze komponenty wywołują po prostu funkcje `useState` i `useEffect`. A jak [dowiedzieliśmy się](/docs/hooks-state.html#tip-using-multiple-state-variables) już [wcześniej](/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns), możemy w jednym komponencie wywoływać funkcje `useState` i `useEffect` wielokrotnie i będą one całkowicie niezależne.

### Porada: Przekazywanie informacji pomiędzy hookami {#tip-pass-information-between-hooks}

Jako że hooki to funkcje, możemy pomiędzy nimi przekazywać informacje.

Aby to zilustrować, użyjemy innego komponentu z naszego hipotetycznego przykładu czatu. Jest to rozwijane pole wyboru odbiorcy wiadomości, które wyświetla też, czy aktualnie wybrany znajomy jest dostępny:

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

We keep the currently chosen friend ID in the `recipientID` state variable, and update it if the user chooses a different friend in the `<select>` picker.

Because the `useState` Hook call gives us the latest value of the `recipientID` state variable, we can pass it to our custom `useFriendStatus` Hook as an argument:

```js
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);
```

This lets us know whether the *currently selected* friend is online. If we pick a different friend and update the `recipientID` state variable, our `useFriendStatus` Hook will unsubscribe from the previously selected friend, and subscribe to the status of the newly selected one.

## `useYourImagination()` {#useyourimagination}

Custom Hooks offer the flexibility of sharing logic that wasn't possible in React components before. You can write custom Hooks that cover a wide range of use cases like form handling, animation, declarative subscriptions, timers, and probably many more we haven't considered. What's more, you can build Hooks that are just as easy to use as React's built-in features.

Try to resist adding abstraction too early. Now that function components can do more, it's likely that the average function component in your codebase will become longer. This is normal -- don't feel like you *have to* immediately split it into Hooks. But we also encourage you to start spotting cases where a custom Hook could hide complex logic behind a simple interface, or help untangle a messy component.

For example, maybe you have a complex component that contains a lot of local state that is managed in an ad-hoc way. `useState` doesn't make centralizing the update logic any easier so might you prefer to write it as a [Redux](https://redux.js.org/) reducer:

```js
function todosReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, {
        text: action.text,
        completed: false
      }];
    // ... other actions ...
    default:
      return state;
  }
}
```

Reducers are very convenient to test in isolation, and scale to express complex update logic. You can further break them apart into smaller reducers if necessary. However, you might also enjoy the benefits of using React local state, or might not want to install another library.

So what if we could write a `useReducer` Hook that lets us manage the *local* state of our component with a reducer? A simplified version of it might look like this:

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

Now we could use it in our component, and let the reducer drive its state management:

```js{2}
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: 'add', text });
  }

  // ...
}
```

The need to manage local state with a reducer in a complex component is common enough that we've built the `useReducer` Hook right into React. You'll find it together with other built-in Hooks in the [Hooks API reference](/docs/hooks-reference.html).
