---
id: hooks-state
title: Używanie hooka efektu
permalink: docs/hooks-effect.html
next: hooks-rules.html
prev: hooks-intro.html
---

*Hooki* są nowym dodatkiem w Reakcie 16.8. Pozwalają one używać stanu i innych funkcjonalności Reacta, bez użycia klas.

*Hook efektu* pozwala na przeprowadzanie efektów ubocznych w komponentach funkcyjnych:

```js{1,6-10}
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Podobnie do metod componentDidMount i componentDidUpdate:
  useEffect(() => {
    // Zaktualizuj tytuł dokumentu korzystając z interfejsu API przeglądarki
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

Ten fragment kodu oparty jest o [przykład licznika z poprzedniego rozdziału](/docs/hook-state.html), ale dodaliśmy do niego nową funkcjonalność: ustawiamy tytuł dokumentu na niestandardową wiadomość zawierającą liczbę kliknięć.

Pobieranie danych, ustawianie subskrypcji czy ręczna ingerencja w drzewo DOM z wewnątrz komponentów - to wszystko przykłady efektów ubocznych. Nie zależnie od tego, czy nazywane "efektami ubocznymi" (lub po prostu "efektami") najprawdopodobniej przeprowadzałaś(-eś) je wcześniej.

>Wskazówka
>
>Jeżeli znasz metody cyklu życia (ang. *lifecycle methods*) Reacta, możesz myśleć o hooku `useEffect`, jako o połączeniu metod `componentDidMount`, `componentDidUpdate` i `componentWillUnmount`.

W komponentach reactowych występują powszechnie dwa rodzaje efektów ubocznych: te po których należy "posprzątać" i te po których nie. Przyjrzyjmy się uważniej temu podziałowi.

## Efekty bez sprzątania {#effects-without-cleanup}

Czasami chcemy **uruchomić jakiś dodatkowy kod, po tym, jak React zaktualizuje drzewo DOM.** Zapytania sieciowe, ręczna mutacja drzewa DOM czy logowanie to powszechne przykłady efektów, które nie wymagają sprzątania. Mówimy tak ponieważ możemy je uruchomić i od razu o nich zapomnieć. Porównajmy teraz, jak klasy i hooki pozwalają na przeprowadzanie takich efektów ubocznych.

### Przykład wykorzystujący klasy {#example-using-classes}

W klasowych komponentach reactowych metoda `render` nie powinna powodować żadnych efektów ubocznych. Działo by się to zbyt wcześniej -- zwykle chcemy przeprowadzać efekty *po tym*, jak React zaktualizuje drzewo DOM.

Dlatego też w reactowych klasach umieszczamy efekty uboczne w metodach `componentDidMount` i `componentDidUpdate`. Wracając do naszego przykładu, oto reactowy komponent klasowy licznika, który aktualizuje tytuł dokumentu po tym, jak React zaktualizuje drzewo DOM:

```js{9-15}
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `Naciśnięto ${this.state.count} razy`;
  }

  componentDidUpdate() {
    document.title = `Naciśnięto ${this.state.count} razy`;
  }

  render() {
    return (
      <div>
        <p>Naciśnięto {this.state.count} razy</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Naciśnij mnie
        </button>
      </div>
    );
  }
}
```

Zauważ, że **musieliśmy powtórzyć ten sam kod w dwóch metodach cyklu życia.**

Dzieje się tak dlatego, że w wielu przypadkach chcemy przeprowadzić ten sam efekt uboczny, niezależnie od tego czy komponent właśnie został zamontowany, czy został zaktualizowany. Koncepcja jest taka, żeby działo się to po każdym renderze. Ale reactowe komponenty klasowe nie mają takiej metody. Moglibyśmy wydzielić osobną metodę, ale wciąż musielibyśmy wywoływać ją z dwóch miejsc.

Teraz sprawdźmy, jak osiągnąć to samo, korzystając z hooka `useEffect`.

### Przykład wykorzystujący hooki {#example-using-hooks}

Widzieliśmy już ten przykład na górze tego rozdziału, ale spójrzmy raz jeszcze:

```js{1,6-8}
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
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

**Co robi wywołanie `useEffect`?** Poprzez użycie tego hooka mówisz Reactowi, że twój komponent musi wykonać jakąś czynność, po jego wyrenderowaniu. React zapamięta funkcję, którą przekazano do hooka (będziemy odnosić się do niej, jako naszego "efektu"), a potem wywoła ją, gdy już zaktualizuje drzewo DOM. W tym efekcie aktualizujemy tytuł dokumentu, ale mogli byśmy także pobrać dane z serwera lub wywołać inne, imperatywne API.

**Dlaczego funkcja `useEffect` jest wywoływana wewnątrz komponentu?** Umiejscowienie `useEffect` wewnątrz komponentu daje nam dostęp do zmiennej stanu `count` (oraz wszystkich właściwości (ang. *props*)) z wewnątrz efektu. Nie potrzebujemy specjalnego interfejsu API aby przeczytać te zmienne -- znajdują się one w zasięgu funkcji. Hooki wykorzystują javascriptowe domknięcia (ang. *closure*) i unikają wprowadzania nowych, specyficznych dla Reacta interfejsów API -- JavaScript dostarcza przecież gotowe rozwiązanie.

**Czy `useEffect` działa przy każdym renderze?** Tak! Domyślnie działa on zarówno przy pierwszym wyrenderowaniu komponentu, *jak i* każdej kolejnej jego aktualizacji. (W dalszej części dowiemy się [jak dostosować to zachowanie](#tip-optimizing-performance-by-skipping-effects).) Zamiast myśleć w kategoriach "montowania" i "aktualizacji", być może łatwiej będzie ci zrozumieć, że efekty wykonywane są "po wyrenderowaniu". React daje ci gwarancje, że drzewo DOM będzie zaktualizowane, zanim wywoła efekty.

### Szczegółowe wyjaśnienie {#detailed-explanation}

Teraz, kiedy wiemy już więcej o efektach, te linijki powinny nabrać sensu:

```js
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Naciśnięto ${count} razy`;
  });
```

Deklarujemy zmienną stanu `count` a następnie mówimy Reactowi że będziemy potrzebowali użyć efektu. Przekazujemy funkcję do hooka `useEffect`. Funkcja, którą przekazujemy *jest* naszym efektem. Wewnątrz naszego efektu ustawiamy tytuł dokumentu, korzystając interfejsu API przeglądarki `document.title`. Możemy przeczytać ostatnią wartość zmiennej `count` z wewnątrz efektu, ponieważ znajduje się ona w zasięgu naszej funkcji. Kiedy React będzie renderował nasz komponent, zapamięta on efekt, który użyliśmy, a następnie wywoła wszystkie efekty, kiedy już zaktualizuje drzewo DOM. Dzieje się to przy każdym wyrenderowaniu, włączając pierwsze.

Doświadczeni programiści języka JavaScript mogli zauważyć, że funkcja, którą przekazujemy do `useEffect` będzie inna przy każdym renderze. Jest to celowe działanie. Po prawdzie, to tylko dzięki temu możemy przeczytać wartość zmiennej `count` z wewnątrz efektu, nie martwiąc się, że będzie ona nieaktualna. Za każdym razem, kiedy ponownie renderujemy komponent, planujemy wykonanie _innego_ efektu, który zastąpi poprzedni. W pewnym sensie sprawia to, że efekty zachowują się jak część wyniku renderowania -- każdy efekt "należy" do konkretnego renderowania. W dalszej [części tego rozdziału](#explanation-why-effects-run-on-each-update) przyjrzymy się dokładniej, dlaczego jest to przydatne.

>Wskazówka
>
>W przeciwieństwie do metod `componentDidMount` i `componentDidUpdate` efekty zaplanowane przy użyciu `useEffect` nie blokują przeglądarki przed odświeżeniem ekranu. Sprawia to wrażenie, że twoja aplikacja działa płynniej. Większość efektów nie musi działać synchronicznie. W sporadycznych przypadkach, gdy muszą to robić (na przykład pomiar układu strony (ang. *layout*)) istnieje osobny hook -- [`useLayoutEffect`](/docs/hooks-reference.html#uselayouteffect), z identycznym do `useEffect` interfejsem API.

## Efekty ze sprzątaniem {#effects-with-cleanup}

Wcześniej omówiliśmy, jak wyrazić efekty uboczne, które nie potrzebują po sobie "posprzątać". Jednakże istnieją efekty, które muszą. Na przykład **możemy chcieć ustawić subskrypcję** do jakiegoś zewnętrznego źródła danych. W tym przypadku, ważnym jest by po sobie posprzątać, aby uniknąć potencjalnego wycieku pamięci! Porównajmy, jak możemy to zrobić z klasami, a jak z hookami.

### Przykład wykorzystujący klasy {#example-using-classes-1}

W klasowych komponentach reactowych zwykle ustawiasz subskrypcję w metodzie `componentDidMount`, a następnie sprzątasz po sobie w metodzie `componentWillUnmount`. Załóżmy, że mamy moduł `ChatAPI`, który pozwala nam zasubskrybować się do statusu dostępności znajomego. Tak moglibyśmy zasubskrybować się i wyświetlać status znajomego przy użyciu klasy:

```js{8-26}
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Ładowanie...';
    }
    return this.state.isOnline ? 'Dostępny' : 'Niedostępny';
  }
}
```

Notice how `componentDidMount` and `componentWillUnmount` need to mirror each other. Lifecycle methods force us to split this logic even though conceptually code in both of them is related to the same effect.

>Note
>
>Eagle-eyed readers may notice that this example also needs a `componentDidUpdate` method to be fully correct. We'll ignore this for now but will come back to it in a [later section](#explanation-why-effects-run-on-each-update) of this page.

### Example Using Hooks {#example-using-hooks-1}

Let's see how we could write this component with Hooks.

You might be thinking that we'd need a separate effect to perform the cleanup. But code for adding and removing a subscription is so tightly related that `useEffect` is designed to keep it together. If your effect returns a function, React will run it when it is time to clean up:

```js{10-16}
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

**Why did we return a function from our effect?** This is the optional cleanup mechanism for effects. Every effect may return a function that cleans up after it. This lets us keep the logic for adding and removing subscriptions close to each other. They're part of the same effect!

**When exactly does React clean up an effect?** React performs the cleanup when the component unmounts. However, as we learned earlier, effects run for every render and not just once. This is why React *also* cleans up effects from the previous render before running the effects next time. We'll discuss [why this helps avoid bugs](#explanation-why-effects-run-on-each-update) and [how to opt out of this behavior in case it creates performance issues](#tip-optimizing-performance-by-skipping-effects) later below.

>Note
>
>We don't have to return a named function from the effect. We called it `cleanup` here to clarify its purpose, but you could return an arrow function or call it something different.

## Recap {#recap}

We've learned that `useEffect` lets us express different kinds of side effects after a component renders. Some effects might require cleanup so they return a function:

```js
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

Other effects might not have a cleanup phase, and don't return anything.

```js
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
```

The Effect Hook unifies both use cases with a single API.

-------------

**If you feel like you have a decent grasp on how the Effect Hook works, or if you feel overwhelmed, you can jump to the [next page about Rules of Hooks](/docs/hooks-rules.html) now.**

-------------

## Tips for Using Effects {#tips-for-using-effects}

We'll continue this page with an in-depth look at some aspects of `useEffect` that experienced React users will likely be curious about. Don't feel obligated to dig into them now. You can always come back to this page to learn more details about the Effect Hook.

### Tip: Use Multiple Effects to Separate Concerns {#tip-use-multiple-effects-to-separate-concerns}

One of the problems we outlined in the [Motivation](/docs/hooks-intro.html#complex-components-become-hard-to-understand) for Hooks is that class lifecycle methods often contain unrelated logic, but related logic gets broken up into several methods. Here is a component that combines the counter and the friend status indicator logic from the previous examples:

```js
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  // ...
```

Note how the logic that sets `document.title` is split between `componentDidMount` and `componentDidUpdate`. The subscription logic is also spread between `componentDidMount` and `componentWillUnmount`. And `componentDidMount` contains code for both tasks.

So, how can Hooks solve this problem? Just like [you can use the *State* Hook more than once](/docs/hooks-state.html#tip-using-multiple-state-variables), you can also use several effects. This lets us separate unrelated logic into different effects:

```js{3,8}
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
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
}
```

**Hooks lets us split the code based on what it is doing** rather than a lifecycle method name. React will apply *every* effect used by the component, in the order they were specified.

### Explanation: Why Effects Run on Each Update {#explanation-why-effects-run-on-each-update}

If you're used to classes, you might be wondering why the effect cleanup phase happens after every re-render, and not just once during unmounting. Let's look at a practical example to see why this design helps us create components with fewer bugs.

[Earlier on this page](#example-using-classes-1), we introduced an example `FriendStatus` component that displays whether a friend is online or not. Our class reads `friend.id` from `this.props`, subscribes to the friend status after the component mounts, and unsubscribes during unmounting:

```js
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```

**But what happens if the `friend` prop changes** while the component is on the screen? Our component would continue displaying the online status of a different friend. This is a bug. We would also cause a memory leak or crash when unmounting since the unsubscribe call would use the wrong friend ID.

In a class component, we would need to add `componentDidUpdate` to handle this case:

```js{8-19}
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate(prevProps) {
    // Unsubscribe from the previous friend.id
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // Subscribe to the next friend.id
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```

Forgetting to handle `componentDidUpdate` properly is a common source of bugs in React applications.

Now consider the version of this component that uses Hooks:

```js
function FriendStatus(props) {
  // ...
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

It doesn't suffer from this bug. (But we also didn't make any changes to it.)

There is no special code for handling updates because `useEffect` handles them *by default*. It cleans up the previous effects before applying the next effects. To illustrate this, here is a sequence of subscribe and unsubscribe calls that this component could produce over time:

```js
// Mount with { friend: { id: 100 } } props
ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // Run first effect

// Update with { friend: { id: 200 } } props
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // Clean up previous effect
ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // Run next effect

// Update with { friend: { id: 300 } } props
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // Clean up previous effect
ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // Run next effect

// Unmount
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // Clean up last effect
```

This behavior ensures consistency by default and prevents bugs that are common in class components due to missing update logic.

### Tip: Optimizing Performance by Skipping Effects {#tip-optimizing-performance-by-skipping-effects}

In some cases, cleaning up or applying the effect after every render might create a performance problem. In class components, we can solve this by writing an extra comparison with `prevProps` or `prevState` inside `componentDidUpdate`:

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

This requirement is common enough that it is built into the `useEffect` Hook API. You can tell React to *skip* applying an effect if certain values haven't changed between re-renders. To do so, pass an array as an optional second argument to `useEffect`:

```js{3}
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
```

In the example above, we pass `[count]` as the second argument. What does this mean? If the `count` is `5`, and then our component re-renders with `count` still equal to `5`, React will compare `[5]` from the previous render and `[5]` from the next render. Because all items in the array are the same (`5 === 5`), React would skip the effect. That's our optimization.

When we render with `count` updated to `6`, React will compare the items in the `[5]` array from the previous render to items in the `[6]` array from the next render. This time, React will re-apply the effect because `5 !== 6`. If there are multiple items in the array, React will re-run the effect even if just one of them is different.

This also works for effects that have a cleanup phase:

```js{6}
useEffect(() => {
  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // Only re-subscribe if props.friend.id changes
```

In the future, the second argument might get added automatically by a build-time transformation.

>Note
>
>If you use this optimization, make sure the array includes **any values from the outer scope that change over time and that are used by the effect**. Otherwise, your code will reference stale values from previous renders. We'll also discuss other optimization options in the [Hooks API reference](/docs/hooks-reference.html).
>
>If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array (`[]`) as a second argument. This tells React that your effect doesn't depend on *any* values from props or state, so it never needs to re-run. This isn't handled as a special case -- it follows directly from how the inputs array always works. While passing `[]` is closer to the familiar `componentDidMount` and `componentWillUnmount` mental model, we suggest not making it a habit because it often leads to bugs, [as discussed above](#explanation-why-effects-run-on-each-update). Don't forget that React defers running `useEffect` until after the browser has painted, so doing extra work is less of a problem.

## Next Steps {#next-steps}

Congratulations! This was a long page, but hopefully by the end most of your questions about effects were answered. You've learned both the State Hook and the Effect Hook, and there is a *lot* you can do with both of them combined. They cover most of the use cases for classes -- and where they don't, you might find the [additional Hooks](/docs/hooks-reference.html) helpful.

We're also starting to see how Hooks solve problems outlined in [Motivation](/docs/hooks-intro.html#motivation). We've seen how effect cleanup avoids duplication in `componentDidUpdate` and `componentWillUnmount`, brings related code closer together, and helps us avoid bugs. We've also seen how we can separate effects by their purpose, which is something we couldn't do in classes at all.

At this point you might be questioning how Hooks work. How can React know which `useState` call corresponds to which state variable between re-renders? How does React "match up" previous and next effects on every update? **On the next page we will learn about the [Rules of Hooks](/docs/hooks-rules.html) -- they're essential to making Hooks work.**
