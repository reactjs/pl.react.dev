---
id: hooks-state
title: Używanie hooka efektów
permalink: docs/hooks-effect.html
next: hooks-rules.html
prev: hooks-intro.html
---

*Hooki* są nowym dodatkiem w Reakcie 16.8. Pozwalają one używać stanu i innych funkcjonalności Reacta, bez użycia klas.

*Hook efektów* pozwala na przeprowadzanie efektów ubocznych w komponentach funkcyjnych:

```js{1,6-10}
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Podobnie do metod componentDidMount i componentDidUpdate:
  useEffect(() => {
    // Zaktualizuj tytuł dokumentu korzystając z interfejsu API przeglądarki
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

Ten fragment kodu oparty jest o [przykład licznika z poprzedniego rozdziału](/docs/hook-state.html), ale dodaliśmy do niego nową funkcjonalność: ustawiamy tytuł dokumentu na niestandardową wiadomość zawierającą liczbę kliknięć.

Pobieranie danych, zestawianie subskrypcji czy ręczna ingerencja w drzewo DOM z wewnątrz komponentów - to wszystko przykłady efektów ubocznych. Nie zależnie od tego, czy nazywane "efektami ubocznymi" (lub po prostu "efektami") najprawdopodobniej przeprowadzałaś(-eś) je wcześniej.

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
    document.title = `Kliknięto ${this.state.count} razy`;
  }

  componentDidUpdate() {
    document.title = `Kliknięto ${this.state.count} razy`;
  }

  render() {
    return (
      <div>
        <p>Kliknięto {this.state.count} razy</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Kliknij mnie
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

**Co robi wywołanie `useEffect`?** Poprzez użycie tego hooka mówisz Reactowi, że twój komponent musi wykonać jakąś czynność, po jego wyrenderowaniu. React zapamięta funkcję, którą przekazano do hooka (będziemy odnosić się do niej, jako naszego "efektu"), a potem wywoła ją, gdy już zaktualizuje drzewo DOM. W tym efekcie aktualizujemy tytuł dokumentu, ale mogli byśmy także pobrać dane z serwera lub wywołać inne, imperatywne API.

**Dlaczego funkcja `useEffect` jest wywoływana wewnątrz komponentu?** Umiejscowienie `useEffect` wewnątrz komponentu daje nam dostęp do zmiennej stanu `count` (oraz wszystkich właściwości (ang. *props*)) z wewnątrz efektu. Nie potrzebujemy specjalnego interfejsu API aby przeczytać te zmienne -- znajdują się one w zasięgu funkcji. Hooki wykorzystują javascriptowe domknięcia (ang. *closure*) i unikają wprowadzania nowych, specyficznych dla Reacta interfejsów API -- JavaScript dostarcza przecież gotowe rozwiązanie.

**Czy `useEffect` działa przy każdym renderze?** Tak! Domyślnie działa on zarówno przy pierwszym wyrenderowaniu komponentu, *jak i* każdej kolejnej jego aktualizacji. (W dalszej części dowiemy się [jak dostosować to zachowanie](#tip-optimizing-performance-by-skipping-effects).) Zamiast myśleć w kategoriach "montowania" i "aktualizacji", być może łatwiej będzie ci zrozumieć, że efekty wykonywane są "po wyrenderowaniu". React daje ci gwarancje, że drzewo DOM będzie zaktualizowane, zanim wywoła efekty.

### Szczegółowe wyjaśnienie {#detailed-explanation}

Teraz, kiedy wiemy już więcej o efektach, te linijki powinny nabrać sensu:

```js
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Kliknięto ${count} razy`;
  });
```

Deklarujemy zmienną stanu `count` a następnie mówimy Reactowi że będziemy potrzebowali użyć efektu. Przekazujemy funkcję do hooka `useEffect`. Funkcja, którą przekazujemy *jest* naszym efektem. Wewnątrz naszego efektu ustawiamy tytuł dokumentu, korzystając interfejsu API przeglądarki `document.title`. Możemy przeczytać ostatnią wartość zmiennej `count` z wewnątrz efektu, ponieważ znajduje się ona w zasięgu naszej funkcji. Kiedy React będzie renderował nasz komponent, zapamięta on efekt, który użyliśmy, a następnie wywoła wszystkie efekty, kiedy już zaktualizuje drzewo DOM. Dzieje się to przy każdym wyrenderowaniu, włączając pierwsze.

Doświadczeni programiści języka JavaScript mogli zauważyć, że funkcja, którą przekazujemy do `useEffect` będzie inna przy każdym renderze. Jest to celowe działanie. Po prawdzie, to tylko dzięki temu możemy przeczytać wartość zmiennej `count` z wewnątrz efektu, nie martwiąc się, że będzie ona nieaktualna. Za każdym razem, kiedy ponownie renderujemy komponent, planujemy wykonanie _innego_ efektu, który zastąpi poprzedni. W pewnym sensie sprawia to, że efekty zachowują się jak część wyniku renderowania -- każdy efekt "należy" do konkretnego renderowania. W dalszej [części tego rozdziału](#explanation-why-effects-run-on-each-update) przyjrzymy się dokładniej, dlaczego jest to przydatne.

>Wskazówka
>
>W przeciwieństwie do metod `componentDidMount` i `componentDidUpdate` efekty zaplanowane przy użyciu `useEffect` nie blokują przeglądarki przed odświeżeniem ekranu. Sprawia to wrażenie, że twoja aplikacja działa płynniej. Większość efektów nie musi działać synchronicznie. W sporadycznych przypadkach, gdy muszą to robić (na przykład pomiar układu strony (ang. *layout*)) istnieje osobny hook -- [`useLayoutEffect`](/docs/hooks-reference.html#uselayouteffect), z identycznym do `useEffect` interfejsem API.

## Efekty ze sprzątaniem {#effects-with-cleanup}

Wcześniej omówiliśmy, jak wyrazić efekty uboczne, które nie potrzebują po sobie "posprzątać". Jednakże istnieją efekty, które muszą. Na przykład **możemy chcieć zestawić subskrypcję** do jakiegoś zewnętrznego źródła danych. W tym przypadku, ważnym jest by po sobie posprzątać, aby uniknąć potencjalnego wycieku pamięci! Porównajmy, jak możemy to zrobić z klasami, a jak z hookami.

### Przykład wykorzystujący klasy {#example-using-classes-1}

W klasowych komponentach reactowych zwykle zestawiasz subskrypcję w metodzie `componentDidMount`, a następnie sprzątasz po sobie w metodzie `componentWillUnmount`. Załóżmy, że mamy moduł `ChatAPI`, który pozwala nam zasubskrybować się do statusu dostępności znajomego. Tak moglibyśmy zasubskrybować się i wyświetlać status znajomego przy użyciu klasy:

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

Zauważ, że metoda `componentDidMount` jest lustrzanym odbiciem metody `componentWillUnmount`. Metody cyklu życia zmuszają nas do podziału tej logiki, mimo że koncepcyjnie stanowią one część tego samego efektu.

>Uwaga
>
>Czytelnicy o sokolim wzroku mogli zauważyć, że powyższy przykład potrzebuje też metody `componentDidUpdate`, aby działać w pełni poprawnie. Na razie pominiemy to zagadnienie, ale wrócimy do niego [w dalszej części](#explanation-why-effects-run-on-each-update) tego rozdziału.

### Przykład wykorzystujący hooki {#example-using-hooks-1}

Zobaczmy, jak można stworzyć ten sam komponent przy użyciu hooków.

Być może zastanawiasz się, czy będziemy potrzebować osobnego efektu, aby posprzątać po sobie. Jednakże kod do zestawiania i anulowania subskrypcji jest tak ściśle ze sobą powiązany, że `useEffect` został zaprojektowany tak, aby utrzymać go razem. Jeśli efekt zwróci funkcję, React uruchomi ją, gdy nadejdzie pora na sprzątanie:

```js{10-16}
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Określ sposób sprzątania po tym efekcie:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Ładowanie...';
  }
  return isOnline ? 'Dostępny' : 'Niedostępny';
}
```

**Dlaczego zwróciliśmy funkcję z naszego efektu?** Jest to opcjonalny mechanizm sprzątania po efektach. Każdy efekt może zwrócić funkcję, która określa w jaki sposób ma posprzątać po sobie. Pozwala nam to na trzymanie logiki dotyczącej zestawiania i usuwania subskrypcji w jednym miejscu. Są one częścią tego samego efektu!

**Kiedy dokładnie React sprząta po naszym efekcie?** React sprząta kiedy komponent jest odmontowywany. Jednakże, jak dowiedzieliśmy się wcześniej, efekty są wywoływane nie raz, ale przy każdym wyrenderowaniu komponentu. Dlatego React *również* sprząta po efektach poprzedniego renderowania, zanim wywoła kolejne efekty. Wyjaśnimy [dlaczego pomaga to uniknąć błędów](#explanation-why-effects-run-on-each-update) i [jak zrezygnować z tego zachowania w przypadku problemów z wydajnością](#tip-optimizing-performance-by-skipping-effects) w dalszej części tego rozdziału.

>Uwaga
>
>Nie musisz nazywać funkcji zwracanej z efektów. My nazwaliśmy ją `cleanup` (pol. *sprzątać*) aby lepiej wyjaśnić jej zamysł. Możesz po prostu zwrócić funkcję strzałkową (ang. *arrow function*) albo nazwać funkcję inaczej.

## Podsumowanie {#recap}

Nauczyliśmy się że hook `useEffect` pozwala nam wyrazić różnego rodzaju efekty uboczne po wyrenderowaniu komponentu. Niektóre efekty mogą wymagać sprzątania, zwracają  więc funkcję:

```js
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

Inne efekty mogą nie mieć fazy czyszczenia, nie zwracają więc nic.

```js
  useEffect(() => {
    document.title = `Kliknięto ${count} razy`;
  });
```

Hook efektów łączy oba przypadki użycia w jednym interfejsie API.

-------------

**Jeżeli czujesz, że masz już przyzwoitą wiedzę na temat hooka efektów albo jeśli czujesz się przytłoczony nadmiarem wiedzy, możesz od razu przejść do kolejnego rozdziału pt. ["Zasady korzystania z Hooków"](/docs/hooks-rules.html).**

-------------

## Porady dotyczące używania efektów {#tips-for-using-effects}

W dalszej części tego rozdziału przyjrzymy się głębiej niektórym aspektom hooka `useEffect`, które najprawdpodobinej interesują doświadczonych użytkowników Reacta. Nie czuj się zobowiązany do zgłębiania ich teraz. Zawsze możesz wrócić do tego rozdziału, aby dowiedzieć się więcej o hooku efektów.

### Poarada: Użyj wielu efektów, oddzielić troski {#tip-use-multiple-effects-to-separate-concerns}

Jednym z problemów, który przedstawiliśmy we wprowadzeniu do hooków, w podrozdziale pt. ["Motywacja"](/docs/hooks-intro.html#complex-components-become-hard-to-understand) jest to, że metody cyklu życia w klasach zazwyczaj zawierają niepowiązaną ze sobą logikę, a z kolei wzajemnie powiązana logika jest podzielona na kilka metod. Oto przykład komponentu, który zawiera w sobie zarówno logikę licznika, jak i statusu dostępności znajomego z poprzednich przykładów:


```js
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `Kliknięto ${this.state.count} times`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `Kliknięto ${this.state.count} times`;
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

Zauważ, jako logika ustawiania właściwości `document.title` jest podzielona na metody `componentDidMount` i `componentDidUpdate`. Logika zestawiania subskrypcji jest również rozrzucona pomiędzy `componentDidMount` i `componentWillUnmount`. A metoda `componentDidMount` zawiera kod obu tych zadań.

Jak hooki rozwiązują ten problem? Tak samo, [jak możesz używać hooka *stanu* więcej niż raz](/docs/hooks-state.html#tip-using-multiple-state-variables), tak możesz też używać wielu efektów. Pozwala to na wydzielenie niepowiązanej logiki na osobne efekty:

```js{3,8}
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Kliknięto ${count} times`;
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
