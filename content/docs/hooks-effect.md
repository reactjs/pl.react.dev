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

Pobieranie danych, tworzenie subskrypcji czy ręczna ingerencja w drzewo DOM z wewnątrz komponentów - to wszystko przykłady efektów ubocznych. Nie zależnie od tego, czy nazywane „efektami ubocznymi” (lub po prostu „efektami”) najprawdopodobniej przeprowadzałaś(-eś) je wcześniej.

>Wskazówka
>
>Jeżeli znasz metody cyklu życia (ang. *lifecycle methods*) Reacta, możesz myśleć o hooku `useEffect`, jako o połączeniu metod `componentDidMount`, `componentDidUpdate` i `componentWillUnmount`.

W komponentach reactowych występują powszechnie dwa rodzaje efektów ubocznych: te po których należy „posprzątać” i te po których nie. Przyjrzyjmy się uważniej temu podziałowi.

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

**Co robi wywołanie `useEffect`?** Poprzez użycie tego hooka mówisz Reactowi, że twój komponent musi wykonać jakąś czynność, po jego wyrenderowaniu. React zapamięta funkcję, którą przekazano do hooka (będziemy odnosić się do niej, jako naszego „efektu”), a potem wywoła ją, gdy już zaktualizuje drzewo DOM. W tym efekcie aktualizujemy tytuł dokumentu, ale mogli byśmy także pobrać dane z serwera lub wywołać inne, imperatywne API.

**Dlaczego funkcja `useEffect` jest wywoływana wewnątrz komponentu?** Umiejscowienie `useEffect` wewnątrz komponentu daje nam dostęp do zmiennej stanu `count` (oraz wszystkich właściwości (ang. *props*)) z wewnątrz efektu. Nie potrzebujemy specjalnego interfejsu API aby przeczytać te zmienne -- znajdują się one w zasięgu funkcji. Hooki wykorzystują javascriptowe domknięcia (ang. *closure*) i unikają wprowadzania nowych, specyficznych dla Reacta interfejsów API -- JavaScript dostarcza przecież gotowe rozwiązanie.

**Czy `useEffect` działa przy każdym renderze?** Tak! Domyślnie działa on zarówno przy pierwszym wyrenderowaniu komponentu, *jak i* każdej kolejnej jego aktualizacji. (W dalszej części dowiemy się [jak dostosować to zachowanie](#tip-optimizing-performance-by-skipping-effects).) Zamiast myśleć w kategoriach „montowania” i „aktualizacji”, być może łatwiej będzie ci zrozumieć, że efekty wykonywane są „po wyrenderowaniu”. React daje ci gwarancje, że drzewo DOM będzie zaktualizowane, zanim wywoła efekty.

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

Doświadczeni programiści języka JavaScript mogli zauważyć, że funkcja, którą przekazujemy do `useEffect` będzie inna przy każdym renderze. Jest to celowe działanie. Po prawdzie, to tylko dzięki temu możemy przeczytać wartość zmiennej `count` z wewnątrz efektu, nie martwiąc się, że będzie ona nieaktualna. Za każdym razem, kiedy ponownie renderujemy komponent, planujemy wykonanie _innego_ efektu, który zastąpi poprzedni. W pewnym sensie sprawia to, że efekty zachowują się jak część wyniku renderowania -- każdy efekt „należy” do konkretnego renderowania. W dalszej [części tego rozdziału](#explanation-why-effects-run-on-each-update) przyjrzymy się dokładniej, dlaczego jest to przydatne.

>Wskazówka
>
>W przeciwieństwie do metod `componentDidMount` i `componentDidUpdate` efekty zaplanowane przy użyciu `useEffect` nie blokują przeglądarki przed odświeżeniem ekranu. Sprawia to wrażenie, że twoja aplikacja działa płynniej. Większość efektów nie musi działać synchronicznie. W sporadycznych przypadkach, gdy muszą to robić (na przykład pomiar układu strony (ang. *layout*)) istnieje osobny hook -- [`useLayoutEffect`](/docs/hooks-reference.html#uselayouteffect), z identycznym do `useEffect` interfejsem API.

## Efekty ze sprzątaniem {#effects-with-cleanup}

Wcześniej omówiliśmy, jak wyrazić efekty uboczne, które nie potrzebują po sobie „posprzątać”. Jednakże istnieją efekty, które muszą. Na przykład **możemy chcieć utworzyć subskrypcję** do jakiegoś zewnętrznego źródła danych. W tym przypadku, ważnym jest by po sobie posprzątać, aby uniknąć potencjalnego wycieku pamięci! Porównajmy, jak możemy to zrobić z klasami, a jak z hookami.

### Przykład wykorzystujący klasy {#example-using-classes-1}

W klasowych komponentach reactowych zwykle ustawiasz subskrypcję w metodzie `componentDidMount`, a następnie sprzątasz po sobie w metodzie `componentWillUnmount`. Załóżmy, że mamy moduł `ChatAPI`, który pozwala nam utworzyć subskrypcję do statusu dostępności znajomego. Tak moglibyśmy zasubskrybować się i wyświetlać status znajomego przy użyciu klasy:

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

Być może zastanawiasz się, czy będziemy potrzebować osobnego efektu, aby posprzątać po sobie. Jednakże kod do tworzenia i anulowania subskrypcji jest tak ściśle ze sobą powiązany, że `useEffect` został zaprojektowany tak, aby utrzymać go razem. Jeśli efekt zwróci funkcję, React uruchomi ją, gdy nadejdzie pora na sprzątanie:

```js{6-16}
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

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

**Dlaczego zwróciliśmy funkcję z naszego efektu?** Jest to opcjonalny mechanizm sprzątania po efektach. Każdy efekt może zwrócić funkcję, która określa w jaki sposób ma posprzątać po sobie. Pozwala nam to na trzymanie logiki dotyczącej tworzenia i usuwania subskrypcji w jednym miejscu. Są one częścią tego samego efektu!

**Kiedy dokładnie React sprząta po naszym efekcie?** React sprząta kiedy komponent jest odmontowywany. Jednakże, jak dowiedzieliśmy się wcześniej, efekty są wywoływane nie raz, ale przy każdym wyrenderowaniu komponentu. Dlatego React *również* sprząta po efektach poprzedniego renderowania, zanim wywoła kolejne efekty. Wyjaśnimy [dlaczego pomaga to uniknąć błędów](#explanation-why-effects-run-on-each-update) i [jak zrezygnować z tego zachowania w przypadku problemów z wydajnością](#tip-optimizing-performance-by-skipping-effects) w dalszej części tego rozdziału.

>Uwaga
>
>Nie musisz nazywać funkcji zwracanej z efektów. My nazwaliśmy ją `cleanup` (pol. *sprzątać*) aby lepiej wyjaśnić jej zamysł. Możesz po prostu zwrócić funkcję strzałkową (ang. *arrow function*) albo nazwać funkcję inaczej.

## Podsumowanie {#recap}

Nauczyliśmy się że hook `useEffect` pozwala nam wyrazić różnego rodzaju efekty uboczne po wyrenderowaniu komponentu. Niektóre efekty mogą wymagać sprzątania, zwracają  więc funkcję:

```js
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

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

**Jeżeli czujesz, że masz już przyzwoitą wiedzę na temat hooka efektów albo jeśli czujesz się przytłoczony nadmiarem wiedzy, możesz od razu przejść do kolejnego rozdziału pt. [„Zasady korzystania z Hooków”](/docs/hooks-rules.html).**

-------------

## Porady dotyczące używania efektów {#tips-for-using-effects}

W dalszej części tego rozdziału przyjrzymy się głębiej niektórym aspektom hooka `useEffect`, które najprawdopodobniej interesują doświadczonych użytkowników Reacta. Nie czuj się zobowiązany do zgłębiania ich teraz. Zawsze możesz wrócić do tego rozdziału, aby dowiedzieć się więcej o hooku efektów.

### Poarada: Użyj wielu efektów, oddzielić troski {#tip-use-multiple-effects-to-separate-concerns}

Jednym z problemów, który przedstawiliśmy we wprowadzeniu do hooków, w podrozdziale pt. [„Motywacja”](/docs/hooks-intro.html#complex-components-become-hard-to-understand) jest to, że metody cyklu życia w klasach zazwyczaj zawierają niepowiązaną ze sobą logikę, a z kolei wzajemnie powiązana logika jest podzielona na kilka metod. Oto przykład komponentu, który zawiera w sobie zarówno logikę licznika, jak i statusu dostępności znajomego z poprzednich przykładów:


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

Zauważ, jako logika ustawiania właściwości `document.title` jest podzielona na metody `componentDidMount` i `componentDidUpdate`. Logika tworzenia subskrypcji jest również rozrzucona pomiędzy `componentDidMount` i `componentWillUnmount`. A metoda `componentDidMount` zawiera kod obu tych zadań.

Jak hooki rozwiązują ten problem? Tak samo, [jak możesz używać hooka *stanu* więcej niż raz](/docs/hooks-state.html#tip-using-multiple-state-variables), tak możesz też używać wielu efektów. Pozwala to na wydzielenie niepowiązanej logiki na osobne efekty:

```js{3,8}
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Kliknięto ${count} times`;
  });

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
  // ...
}
```

**Hoki pozwalają na dzielenie kodu ze względu na to, za co on odpowiada**, a nie ze względu na nazwę metody cyklu życia. React przeprowadzi *każdy* efekt użyty w komponencie, w kolejności, w jakiej został dodany.

### Wyjaśnienie: Dlaczego efekty działają przy każdej aktualizacji {#explanation-why-effects-run-on-each-update}

Jeżeli przywykłeś do klas, pewnie zastanawiasz się, dlaczego faza sprzątania po efektach następuje przy każdym kolejnym renderze, a nie tylko raz, podczas odmontowywania. Spójrzmy na praktyczny przykład, aby lepiej zrozumieć dlaczego taka konstrukcja pozwala nam tworzyć komponenty z mniejszą ilością błędów.

[Wcześniej w tym rozdziale](#example-using-classes-1) pokazaliśmy przykład komponentu `FriendStatus`, który wyświetla status dostępności znajomego. Nasza klasa czyta właściwość `friend.id` z właściwości `this.props`, tworzy subskrypcję gdy komponent zostanie zamontowany, a usuwa gdy odmontowywany.

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

**Ale co wydarzy się, jeżeli właściwość `friend` zmieni się**, podczas gdy komponent cały czas jest na ekranie? Nasz komponent wciąż będzie wyświetlał status dostępności znajomego, ale nie tego, co trzeba. To błąd. Spowodowalibyśmy też wyciek pamięci lub inną katastrofę przy odmontowywaniu, jako że usuwamy subskrypcję ze złym ID znajomego.

W komponencie klasowym, powinniśmy dodać metodę `componentDidUpdate` aby obsłużyć ten przypadek:

```js{8-19}
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate(prevProps) {
    // Usuń subskypcję dla poprzedniej wartości friend.id
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // Zestaw subskrypcję dla nowej wartości friend.id
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

Pomięcie poprawnej obsługi metody `componentDidUpdate` jest częstym źródłem błędów w aplikacjach reactowych.

A teraz rozważ wersję tego komponentu, która korzysta z hooków:

```js
function FriendStatus(props) {
  // ...
  useEffect(() => {
    // ...
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

Nie cierpi on z powodu tego błędu. (Ale nie wprowadziliśmy też w nim żadnych zmian).

Nie ma żadnego specjalnego kodu, na obsługę aktualizacji ponieważ hook `useEffect` obsługuje je *domyślnie*. Czyści on poprzednie efekty zanim przeprowadzi następne. Aby to lepiej zilustrować pokażemy sekwencję tworzenia i usuwania subskrypcji, jakie wywoła ten komponent w określonym czasie:

```js
// Zamontowany z właściwościami { friend: { id: 100 } }
ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // Wywołaj pierwszy efekt

// Aktualizacja właściwości do { friend: { id: 200 } }
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // Wyczyść poprzedni efekt
ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // Przeprowadź kolejny efekt

// Aktualizacja właściwości do { friend: { id: 300 } }
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // Wyczyść poprzedni efekt
ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // Przeprowadź kolejny efekt

// Odmontowanie
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // Posprzątaj ostatni efekt
```

Takie zachowanie zapewnia spójność i zapobiega występowaniu błędów typowych dla komponentów klasowych z powodu braku logiki dla aktualizacji.

### Porada: Optymalizacja wydajności przez pomijanie efektów {#tip-optimizing-performance-by-skipping-effects}

W niektórych przypadkach sprzątanie i przeprowadzanie efektów przy każdym renderze może stworzyć problemy z wydajnością. W komponentach klasowych możemy rozwiązać ten problem, dokładając dodatkowe porównanie wartości `prevProps` i `prevState` wewnątrz metody `componentDidUpdate`:

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `Kliknięto ${this.state.count} razy`;
  }
}
```

To wymaganie jest na tyle powszechne, że zostało wbudowane w interfejs API hooka `useEffect`. Możesz powiedzieć Reactowi, aby pominął zastosowanie efektu, jeśli pewne wartości nie zmieniły się między kolejnymi renderowaniami. Aby to zrobić, przekaż tablicę jako opcjonalny drugi argument do funkcji `useEffect`: 

```js{3}
useEffect(() => {
  document.title = `Klknięto ${count} razy`;
}, [count]); // Uruchom ponownie efekt, tylko jeśli zmieni się wartość count
```

W powyższym przykładzie przekazujemy `[count]` jako drugi argument. Co to oznacza? Jeśli `count` ma wartość `5`, a nasz komponent jest ponownie renderowany z `count` wciąż równym `5`, React porówna `[5]` z poprzedniego renderowania i `[5]` z kolejnego renderowania. Ponieważ wszystkie elementy w tablicy są takie same (`5 === 5`), React pominie efekt. Oto nasza optymalizacja.

Kiedy renderujemy z wartością `count` zaktualizowaną do `6`, React porówna elementy tablicy `[5]` z poprzedniego renderowania do elementów w tablicy `[6]` z kolejnego renderowania. Tym razem React ponownie zastosuje efekt, ponieważ `5 !== 6`. Jeśli w tablicy jest wiele elementów, React ponownie uruchomi efekt, nawet jeśli tylko jeden z nich jest inny.

Działa to również w przypadku efektów z fazą czyszczenia:

```js{10}
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // Zasubskrybuj ponownie tylko wtedy, jeśli zmieni się wartość props.friend.id
```

W przyszłości drugi argument może zostać automatycznie dodawany w czasie kompilacji.

>Uwaga
>
>If you use this optimization, make sure the array includes **all values from the component scope (such as props and state) that change over time and that are used by the effect**. Otherwise, your code will reference stale values from previous renders. Learn more about [how to deal with functions](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) and [what to do when the array changes too often](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often).
>
>If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array (`[]`) as a second argument. This tells React that your effect doesn't depend on *any* values from props or state, so it never needs to re-run. This isn't handled as a special case -- it follows directly from how the inputs array always works.
>
>If you pass an empty array (`[]`), the props and state inside the effect will always have their initial values. While passing `[]` as the second argument is closer to the familiar `componentDidMount` and `componentWillUnmount` mental model, there are usually [better](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) [solutions](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often) to avoid re-running effects too often. Also, don't forget that React defers running `useEffect` until after the browser has painted, so doing extra work is less of a problem.
>
>We recommend using the [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) rule as part of our [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) package. It warns when dependencies are specified incorrectly and suggests a fix.

## Kolejne kroki {#next-steps}

Gratulacje! To był długi rozdział, ale miejmy nadzieję, że odpowiedzieliśmy na większość pytań dotyczących efektów ubocznych. Poznaliśmy już informację zarówno o hooku stanu, jak i hooku efektów, a dzięki ich połączeniu, możesz zrobić *wiele*. Obejmują one większość przypadków użycia dla klas -- a tam gdzie nie, mogą okazać się pomocne [dodatkowe Haki](/docs/hooks-reference.html).

Zaczynamy również zauważać, jak hooki rozwiązują problemy opisane w podrozdziale pt. [„Motywacja”](/docs/hooks-intro.html#motivation). Widzieliśmy, jak sprzątanie po efektach pozwala uniknąć duplikacji w metodach `componentDidUpdate` i `componentWillUnmount`, przybliża wzajemnie powiązany kod do siebie i pomaga uniknąć błędów. Widzieliśmy również, w jaki sposób możemy podzielić efekty w zależności od ich celu, co nie było wcześniej w ogóle możliwe (w klasach).

W tym momencie mogłoby paść pytanie, jak działają haki. Skąd React może wiedzieć, które wywołanie `useState` odpowiada, którym zmiennym stanu między kolejnymi renderowaniami? W jaki sposób React „dopasowuje” poprzednie i następne efekty przy każdej aktualizacji? **W następnym rozdziale dowiemy się o [zasadach korzystania z hooków](/docs/hooks-rules.html) -- są one niezbędne do ich poprawnego działania.**
