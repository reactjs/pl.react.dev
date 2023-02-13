---
id: hooks-state
title: Używanie hooka efektów
permalink: docs/hooks-effect.html
next: hooks-rules.html
prev: hooks-state.html
---

<<<<<<< HEAD
*Hooki* są nowym dodatkiem w Reakcie 16.8. Pozwalają one używać stanu i innych funkcjonalności Reacta, bez użycia klas.
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Synchronizing with Effects](https://beta.reactjs.org/learn/synchronizing-with-effects)
> - [You Might Not Need an Effect](https://beta.reactjs.org/learn/you-might-not-need-an-effect)
> - [`useEffect`](https://beta.reactjs.org/reference/react/useEffect)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

*Hooks* are a new addition in React 16.8. They let you use state and other React features without writing a class.
>>>>>>> 47adefd30c46f486428d8231a68e639d62f02c9e

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

Ten fragment kodu oparty jest na [przykładzie licznika z poprzedniego rozdziału](/docs/hooks-state.html), ale dodaliśmy do niego nową funkcjonalność: ustawiamy tytuł dokumentu na własną wiadomość, zawierającą liczbę kliknięć.

Pobieranie danych, tworzenie subskrypcji czy ręczna ingerencja w drzewo DOM z wewnątrz komponentów - to wszystko przykłady efektów ubocznych. Niezależnie od tego, czy znasz je pod nazwą „efekty uboczne” (lub po prostu „efekty”), najprawdopodobniej masz je zaszyte gdzieś w swoim kodzie.

>Wskazówka
>
>Jeżeli znasz już metody cyklu życia (ang. *lifecycle methods*) Reacta, możesz myśleć o hooku `useEffect` jako o połączeniu metod `componentDidMount`, `componentDidUpdate` i `componentWillUnmount` w jedną.

W komponentach reactowych występują powszechnie dwa rodzaje efektów ubocznych: te, po których należy „posprzątać” i te, po których nie. Przyjrzyjmy się uważniej temu podziałowi.

## Efekty niewymagające sprzątania {#effects-without-cleanup}

Czasami chcemy **uruchomić jakiś dodatkowy kod po tym, jak React zaktualizuje drzewo DOM.** Zapytania sieciowe, ręczna modyfikacja drzewa DOM czy logowanie to powszechne przykłady efektów, które nie wymagają sprzątania. Mówimy tak, ponieważ możemy je uruchomić i od razu o nich zapomnieć. Porównajmy teraz, jak klasy i hooki pozwalają na przeprowadzanie takich efektów ubocznych.

### Przykład wykorzystujący klasy {#example-using-classes}

W klasowych komponentach reactowych metoda `render` nie powinna wywoływać żadnych efektów ubocznych. Działo by się to bowiem zbyt wcześnie -- zwykle chcemy przeprowadzać efekty już *po tym*, jak React zaktualizuje drzewo DOM.

Dlatego też w reactowych klasach umieszczamy efekty uboczne w specjalnych metodach `componentDidMount` i `componentDidUpdate`. Wracając do naszego przykładu, oto klasowy komponent licznika, który aktualizuje tytuł dokumentu po tym, jak React zaktualizuje drzewo DOM:

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

Dzieje się tak dlatego, że w wielu przypadkach chcemy wywołać ten sam efekt uboczny, niezależnie od tego czy komponent właśnie został zamontowany, czy też zaktualizowany. Koncepcja jest taka, żeby działo się to po każdym wyrenderowaniu komponentu. Ale reactowe komponenty klasowe nie mają takiej metody. Moglibyśmy, co prawda, wydzielić osobną metodę, ale wciąż musielibyśmy wywoływać ją w dwóch miejscach.

Teraz sprawdźmy, jak osiągnąć to samo korzystając z hooka `useEffect`.

### Przykład wykorzystujący hooki {#example-using-hooks}

Widzieliśmy już ten przykład na początku tego rozdziału, ale spójrzmy raz jeszcze:

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

**Co robi wywołanie `useEffect`?** Poprzez użycie tego hooka mówisz Reactowi, że twój komponent musi wykonać jakąś czynność po jego wyrenderowaniu. React zapamięta funkcję, którą przekazano do hooka (będziemy odtąd odnosić się do niej jako naszego „efektu”), a potem wywoła ją, gdy już zaktualizuje drzewo DOM. W tym przypadku aktualizujemy tytuł dokumentu, ale moglibyśmy równie dobrze pobrać dane z serwera lub wywołać inne, imperatywne API.

**Dlaczego funkcja `useEffect` jest wywoływana wewnątrz komponentu?** Umiejscowienie `useEffect` wewnątrz komponentu daje nam dostęp do zmiennej stanu `count` (oraz wszystkich właściwości (ang. *props*)) z wewnątrz efektu. Nie potrzebujemy specjalnego interfejsu API do odczytania tych zmiennych -- znajdują się one w zasięgu funkcji. Hooki wykorzystują javascriptowe domknięcia (ang. *closure*) i unikają wprowadzania nowych, specyficznych dla Reacta interfejsów API -- JavaScript dostarcza przecież gotowe rozwiązanie.

**Czy `useEffect` działa przy każdym renderze?** Tak! Domyślnie działa on zarówno przy pierwszym wyrenderowaniu komponentu *oraz* każdej kolejnej jego aktualizacji. (W dalszej części dowiemy się, [jak dostosować to zachowanie](#tip-optimizing-performance-by-skipping-effects).) Zamiast myśleć w kategoriach „montowania” i „aktualizacji”, być może łatwiej będzie ci zrozumieć, że efekty wykonywane są „po wyrenderowaniu”. React daje ci gwarancję, że drzewo DOM zostanie zaktualizowane zanim wywoła efekty.

### Szczegółowe objaśnienie {#detailed-explanation}

Teraz, kiedy wiemy już więcej o efektach, te linijki kodu powinny nabrać sensu:

```js
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Kliknięto ${count} razy`;
  });
}
```

Deklarujemy zmienną stanu `count`, a następnie mówimy Reactowi, że będziemy chcieli użyć efektu. Zatem do hooka `useEffect` przekazujemy funkcję, która *jest* naszym efektem. Wewnątrz tego efektu ustawiamy tytuł dokumentu, korzystając z interfejsu API przeglądarki (`document.title`). Możemy odczytać ostatnią wartość zmiennej `count` z wewnątrz efektu, ponieważ znajduje się ona w zasięgu naszej funkcji. Kiedy React będzie renderować nasz komponent, zapamięta użyty przez nas efekt, a następnie wywoła go po zaktualizowaniu drzewa DOM. Dzieje się to przy każdym renderowaniu, włączając pierwsze.

Doświadczeni programiści języka JavaScript mogli zauważyć, że funkcja, którą przekazujemy do `useEffect`, będzie inna przy każdym renderze. Jest to celowe działanie. Właściwie to tylko dzięki temu możemy przeczytać wartość zmiennej `count` z wewnątrz efektu, nie martwiąc się, że będzie ona nieaktualna. Za każdym razem, kiedy ponownie renderujemy komponent, planujemy wykonanie _innego_ efektu, który zastąpi poprzedni. W pewnym sensie sprawia to, że efekty zachowują się jak część wyniku renderowania -- każdy efekt „należy” do konkretnego renderowania. W [dalszej części tego rozdziału](#explanation-why-effects-run-on-each-update) przyjrzymy się dokładniej, dlaczego jest to przydatne.

>Wskazówka
>
>W przeciwieństwie do metod `componentDidMount` i `componentDidUpdate`, efekty zaplanowane przy użyciu `useEffect` nie blokują przeglądarki przed odświeżeniem ekranu. Sprawia to wrażenie, że aplikacja działa płynniej. Większość efektów nie musi działać synchronicznie. W sporadycznych przypadkach, gdy muszą to robić (na przykład do pomiaru układu strony (ang. *layout*)), można skorzystać z dedykowanego hooka -- [`useLayoutEffect`](/docs/hooks-reference.html#uselayouteffect), z identycznym do `useEffect` interfejsem API.

## Efekty wymagające sprzątania {#effects-with-cleanup}

Wcześniej omówiliśmy, jak wyrazić efekty uboczne, które nie potrzebują po sobie „posprzątać”. Jednakże istnieją efekty, które muszą to robić. Na przykład, **możemy chcieć utworzyć subskrypcję** do jakiegoś zewnętrznego źródła danych. W tym przypadku ważne jest, aby po sobie posprzątać i uniknąć tym samym potencjalnego wycieku pamięci! Porównajmy, jak możemy to zrobić z klasami, a jak z hookami.

### Przykład wykorzystujący klasy {#example-using-classes-1}

W klasowych komponentach reactowych zwykle tworzy się subskrypcję w metodzie `componentDidMount`, a następnie sprząta w metodzie `componentWillUnmount`. Załóżmy, że mamy moduł `ChatAPI`, który pozwala nam zasubskrybować się na zmianę statusu dostępności znajomego. Tak moglibyśmy zasubskrybować się i wyświetlać status znajomego przy użyciu klasy:

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
>Czytelnicy o sokolim wzroku mogli zauważyć, że powyższy przykład potrzebuje też metody `componentDidUpdate`, aby działać w pełni poprawnie. Na razie pominiemy to zagadnienie, ale wrócimy do niego [w dalszej części tego rozdziału](#explanation-why-effects-run-on-each-update).

### Przykład wykorzystujący hooki {#example-using-hooks-1}

Zobaczmy, jak stworzyć ten sam komponent przy użyciu hooków.

Być może zastanawiasz się, czy będziemy potrzebować jakiegoś osobnego efektu, aby przeprowadzić czyszczenie. Kod do tworzenia i anulowania subskrypcji jest tak ściśle ze sobą powiązany, że `useEffect` został specjalnie zaprojektowany w ten sposób, aby utrzymać go razem. Jeśli efekt zwróci funkcję, React uruchomi ją, gdy nadejdzie pora na sprzątanie:

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

**Dlaczego zwróciliśmy funkcję z naszego efektu?** Jest to opcjonalny mechanizm sprzątania po efektach. Każdy efekt może zwrócić funkcję, która określa sposób, w jaki sposób należy po nim posprzątać. Pozwala nam to na trzymanie logiki dotyczącej tworzenia i usuwania subskrypcji w jednym miejscu. Są one częścią tego samego efektu!

**Kiedy dokładnie React sprząta po naszym efekcie?** Dzieje się to wtedy, gdy komponent jest odmontowywany. Jednakże, jak dowiedzieliśmy się wcześniej, efekty są wywoływane nie raz, ale przy każdym wyrenderowaniu komponentu. Dlatego React *również* sprząta po efektach poprzedniego renderowania, zanim wywoła kolejne efekty. Wyjaśnimy [dlaczego pomaga to uniknąć błędów](#explanation-why-effects-run-on-each-update) i [jak zrezygnować z tego zachowania w przypadku problemów z wydajnością](#tip-optimizing-performance-by-skipping-effects) w dalszej części tego rozdziału.

>Uwaga
>
>Nie musisz nazywać funkcji zwracanej z efektów. My nazwaliśmy ją `cleanup` (pol. *posprzątaj*) aby lepiej wyjaśnić jej zamysł. Możesz po prostu zwrócić funkcję strzałkową (ang. *arrow function*) albo nazwać funkcję inaczej.

## Podsumowanie {#recap}

Nauczyliśmy się, że hook `useEffect` pozwala nam wyrazić różnego rodzaju efekty uboczne po wyrenderowaniu komponentu. Niektóre efekty mogą wymagać sprzątania, dlatego zwracają odpowiednią funkcję:

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

**Jeżeli czujesz, że masz już przyzwoitą wiedzę na temat hooka efektów albo jeśli rozbolała cię głowa od natłoku wiedzy, możesz od razu przejść do kolejnego rozdziału pt. [„Zasady korzystania z Hooków”](/docs/hooks-rules.html).**

-------------

## Porady dotyczące używania efektów {#tips-for-using-effects}

W dalszej części tego rozdziału przyjrzymy się głębiej niektórym aspektom hooka `useEffect`, które najprawdopodobniej zainteresują bardziej doświadczonych użytkowników Reacta. Nie musisz jednak zgłębiać ich wszystkich od razu. Zawsze możesz wrócić do tego rozdziału kiedy indziej i doczytać więcej o hooku efektów.

### Porada: Użyj kilku efektów do odseparowania logiki {#tip-use-multiple-effects-to-separate-concerns}

Jednym z problemów, który przedstawiliśmy we wprowadzeniu do hooków, w podrozdziale pt. [„Motywacja”](/docs/hooks-intro.html#complex-components-become-hard-to-understand) jest to, że metody cyklu życia w klasach zazwyczaj zawierają niepowiązaną ze sobą logikę. Z kolei wzajemnie powiązana logika jest podzielona na kilka metod. Oto przykład komponentu, który łączy w sobie zarówno logikę licznika, jak i statusu dostępności znajomego z poprzednich przykładów:


```js
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `Kliknięto ${this.state.count} razy`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `Kliknięto ${this.state.count} razy`;
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

Zauważ, jak logika ustawiania właściwości `document.title` jest podzielona pomiędzy metody `componentDidMount` i `componentDidUpdate`. Logika tworzenia subskrypcji jest również rozrzucona pomiędzy `componentDidMount` i `componentWillUnmount`. A metoda `componentDidMount` zawiera kod dla obu tych zadań.

Jak hooki rozwiązują ten problem? Podobnie [jak możesz używać hooka *stanu* więcej niż raz](/docs/hooks-state.html#tip-using-multiple-state-variables), możesz też używać wielu efektów. Pozwala to na wydzielenie niepowiązanej logiki na osobne efekty:

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

**Hooki pozwalają na dzielenie kodu na mniejsze fragmenty pod względem ich odpowiedzialności**, a nie ze względu na nazwę metody cyklu życia. React wywoła *każdy* efekt użyty w komponencie w takiej kolejności, w jakiej został dodany.

### Wyjaśnienie: Dlaczego efekty działają przy każdej aktualizacji {#explanation-why-effects-run-on-each-update}

Jeżeli zwykle używasz klas, pewnie zastanawiasz się, dlaczego faza sprzątania po efektach następuje przy każdym kolejnym renderowaniu, a nie tylko raz, podczas odmontowywania komponentu. Spójrzmy na praktyczny przykład, aby lepiej zrozumieć dlaczego taka konstrukcja pozwala nam tworzyć komponenty z mniejszą liczbą błędów.

[Wcześniej w tym rozdziale](#example-using-classes-1) pokazaliśmy przykład komponentu `FriendStatus`, który wyświetla status dostępności znajomego. Nasza klasa czyta wartość `friend.id` z właściwości `this.props` i tworzy subskrypcję, gdy komponent jest montowany, a następnie usuwa ją, gdy jest odmontowywany.

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

**Ale co wydarzy się, jeżeli właściwość `friend` zmieni się**, podczas gdy komponent cały czas widnieje na ekranie? Nasz komponent wciąż będzie wyświetlał status dostępności znajomego, ale nie tego co trzeba. To błąd. Spowodowalibyśmy też wyciek pamięci lub inną katastrofę przy odmontowywaniu, jako że usuwamy subskrypcję z nieprawidłowym ID znajomego.

W komponencie klasowym powinniśmy dodać metodę `componentDidUpdate`, aby obsłużyć ten przypadek:

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
    // Utwórz subskrypcję dla nowej wartości friend.id
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

Pominięcie poprawnej obsługi metody `componentDidUpdate` jest częstym źródłem błędów w aplikacjach reactowych.

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

Nie jest ona podatna na ten błąd. (Ale nie wprowadziliśmy też żadnych zmian.)

Nie ma żadnego specjalnego kodu na obsługę aktualizacji, ponieważ hook `useEffect` obsługuje je *domyślnie*. Czyści on poprzednie efekty, zanim przeprowadzi kolejne. Aby to lepiej zilustrować pokażemy sekwencję tworzenia i usuwania subskrypcji, jakie wywoła ten komponent w określonym czasie:

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

Takie zachowanie zapewnia spójność i zapobiega występowaniu błędów typowych dla komponentów klasowych, spowodowanych brakiem implementacji logiki dla aktualizacji.

### Porada: Optymalizacja wydajności przez pomijanie efektów {#tip-optimizing-performance-by-skipping-effects}

W niektórych przypadkach sprzątanie i przeprowadzanie efektów przy każdym renderze może stworzyć problemy z wydajnością. W komponentach klasowych możemy rozwiązać ten problem, dokładając dodatkowe porównanie wartości `prevProps` i `prevState` wewnątrz metody `componentDidUpdate`:

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `Kliknięto ${this.state.count} razy`;
  }
}
```

To wymaganie jest na tyle powszechne, że zostało wbudowane w interfejs API hooka `useEffect`. Możesz powiedzieć Reactowi, aby pominął przeprowadzanie efektu, jeśli pewne wartości nie zmieniły się między kolejnymi renderowaniami. Aby to zrobić, przekaż tablicę jako opcjonalny drugi argument do funkcji `useEffect`: 

```js{3}
useEffect(() => {
  document.title = `Klknięto ${count} razy`;
}, [count]); // Uruchom ponownie efekt tylko wtedy, gdy zmieni się wartość count
```

W powyższym przykładzie przekazujemy `[count]` jako drugi argument. Co to oznacza? Jeśli `count` ma wartość `5`, a nasz komponent jest ponownie renderowany z `count` wciąż równym `5`, React porówna `[5]` z poprzedniego renderowania i `[5]` z kolejnego renderowania. Ponieważ wszystkie elementy w tablicy są takie same (`5 === 5`), React pominie efekt. Oto nasza optymalizacja.

Kiedy renderujemy z wartością `count` zaktualizowaną do `6`, React porówna elementy tablicy `[5]` z poprzedniego renderowania do elementów w tablicy `[6]` z kolejnego renderowania. Tym razem React ponownie zastosuje efekt, ponieważ `5 !== 6`. Jeśli w tablicy jest wiele elementów, React ponownie uruchomi efekt, nawet jeśli tylko jeden z nich mą inną wartość.

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
}, [props.friend.id]); // Zasubskrybuj ponownie tylko wtedy, gdy zmieni się wartość props.friend.id
```

W przyszłości drugi argument może być automatycznie dodawany przez odpowiednią transformację w kompilatorze.

>Uwaga
>
>Jeśli korzystasz z tej techniki optymalizacji, upewnij się, że przekazywana tablica zawiera **wszystkie wartości z zasięgu komponentu (takie jak właściwości (ang. *props*) i stan), które zmieniają się w czasie i które są używane przez efekt.** W przeciwnym razie twój kod odwoła się do starych wartości z poprzednich renderowań. Przeczytaj też, [jak radzić sobie z funkcjami](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) i [co robić, gdy tablica zmienia się zbyt często](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often).
>
>Jeśli chcesz przeprowadzić efekt i posprzątać po nim tylko raz (podczas montowania i odmontowania), możesz przekazać pustą tablicę (`[]`) jako drugi argument. Dzięki temu React wie, że twój efekt nie zależy od *jakichkolwiek* wartości właściwości lub stanu, więc nigdy nie musi być ponownie uruchamiany. Nie jest to traktowane jako przypadek specjalny -- wynika to bezpośrednio z tego, jak działa tablica zależności.
>
>Jeśli przekażesz pustą tablicę (`[]`) właściwości i stan wewnątrz efektu zawsze przyjmą swoje początkowe wartości. Pomimo że przekazywanie `[]` jest bliższe temu, co znamy z metod `componentDidMount` i `componentWillUnmount`, zwykle istnieją [lepsze](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) [rozwiązania](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often) pomagające uniknąć zbyt częstego powtarzania efektów. Nie zapominaj też, że React opóźni wywołanie `useEffect` do momentu, aż przeglądarka nie skończy rysować widoku, więc dodatkowa praca tutaj nie jest dużym problemem.
>
>Polecamy użycie reguły [`exhaustive-deps`](https://github.com/facebook/react/issues/14920), będącej częścią naszego pakietu [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation). Ostrzega ona, gdy zależności są niepoprawnie zdefiniowane i sugeruje poprawki.

## Kolejne kroki {#next-steps}

Gratulacje! To był długi rozdział, ale miejmy nadzieję, że odpowiedzieliśmy na większość pytań dotyczących efektów ubocznych. Poznaliśmy już informacje zarówno o hooku stanu, jak i hooku efektów, a dzięki ich połączeniu możesz zrobić *naprawdę dużo*. Pokrywają one większość przypadków użycia klas -- a tam, gdzie tak nie jest, pomocne mogą okazać się [dodatkowe hooki](/docs/hooks-reference.html).

Zaczynamy również zauważać, jak hooki rozwiązują problemy opisane w podrozdziale pt. [„Motywacja”](/docs/hooks-intro.html#motivation). Zaobserwowaliśmy, jak sprzątanie po efektach pozwala uniknąć duplikacji kodu w metodach `componentDidUpdate` i `componentWillUnmount`, przybliża wzajemnie powiązany kod i pomaga uniknąć błędów. Zobaczyliśmy również, w jaki sposób możemy podzielić efekty w zależności od ich celu, co w klasach nie było wcześniej w ogóle możliwe.

W tym momencie mogłoby paść pytanie, jak działają hooki. Skąd React może wiedzieć, które wywołanie `useState` odpowiada którym zmiennym stanu pomiędzy kolejnymi renderowaniami? W jaki sposób React „dopasowuje” poprzednie i następne efekty przy każdej aktualizacji? **W następnym rozdziale dowiemy się o [zasadach korzystania z hooków](/docs/hooks-rules.html) -- są one niezbędne do ich poprawnego działania.**
