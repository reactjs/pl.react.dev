---
id: strict-mode
title: Tryb Rygorystyczny
permalink: docs/strict-mode.html
---

`StrictMode` jest narzędziem podkreślającym potencjalne problemy w aplikacji. Tak samo jak `Fragment`, `StrictMode` nie renderuje żadnego widocznego UI. Służy natomiast do aktywacji dodatkowych sprawdzeń i ostrzeżeń dla swoich potomków.

> Uwaga:
>
> Sprawdzenia dla trybu rygorystycznego są uruchamiane wyłącznie w trybie developmentu; _nie mają one wpływu na build produkcyjny_.

Możesz uruchomić tryb rygorystyczny dla jakiejkolwiek części swojej aplikacji. Dla przykładu:
`embed:strict-mode/enabling-strict-mode.js`

W powyższym przykładzie, sprawdzenia trybu rygorystycznego *nie* zostaną uruchomione dla komponentów `Header` i `Footer`. Jednakże, sprawdzenia zostaną uruchomione dla `ComponentOne` i `ComponentTwo`, oraz wszystkich ich potomków.

`StrictMode` aktualnie pomaga w:
* [Identyfikacji komponentów używających niebezpiecznych metod życia komponentu](#identifying-unsafe-lifecycles)
* [Ostrzeganiu o przestarzałym użyciu łańcucha w API referencji](#warning-about-legacy-string-ref-api-usage)
* [Ostrzeganiu o użyciu przestarzałego findDOMNode](#warning-about-deprecated-finddomnode-usage)
* [Wykrywaniu nieoczekiwanych efektów ubocznych](#detecting-unexpected-side-effects)
* [Wykrywaniu użycia przestrzałego context API](#detecting-legacy-context-api)

Dodatkowe funkcjonalności zostaną dodane w przyszłych wydaniach Reacta.

### Identyfikacja niebezpiecznych metod życia komponentu {#identifying-unsafe-lifecycles}

Tak jak zostało to wytłumaczone [w tym poście](/blog/2018/03/27/update-on-async-rendering.html), niektóre stare metody życia komponentu, nie są bezpiecznie dla asynchronicznych aplikacji Reacta. Jednakże, jeżeli twoja aplikacji używa bibliotek firm trzecich, upewnienie się że nie używa ona niebezpiecznych metod życia komponentu może być trudne. Na szczęście, tryb rygorystyczny może z tym pomóc!

Gdy tryb rygorystyczny jest włączony, React tworzy listę wszystkich komponentów klasowych, które używają niebezpiecznych metod życia komponentu i loguje komunikaty ostrzegawcze z informacją o tych komponentach, w ten sposób:

![](../images/blog/strict-mode-unsafe-lifecycles-warning.png)

Rozwiązanie _teraz_ problemów zidentyfikowanych przez tryb rygorystyczny, ułatwi użycie asynchronicznego renderowania w przyszłych wydaniach Reacta.

### Ostrzeganie o przestarzałym użyciu łańcucha w API referencji {#warning-about-legacy-string-ref-api-usage}

Poprzednio, React dawał dwie możliwości do zarządznia referencjami: przestarzałe referencje łańcuchowe i pętle zwrotną. Pomimo że referencja łańcuchowa była z tych dwóch wygodniejsza, miała [kilka wad](https://github.com/facebook/react/issues/1373), dlatego też naszą oficjalną rekomendacją było [używanie formy pętli zwrotnej](/docs/refs-and-the-dom.html#legacy-api-string-refs).

React 16.3 wprowadził trzecią opcję, która oferuję wygodę jak w przypadku łańcucha referencji, bez żadnych wad:
`embed:16-3-release-blog-post/create-ref-example.js`

Odkąd referencje obiektowe zostały główie dodane jako zamiennik za referencje łańcuchowe, tryb rygorystyczny ostrzega w przypadku użyciu referencji łańcuchowych.

> **Uwaga:**
>
> Referencje w formie pętli zwrotnej nadal będą wspierane wraz z nowym `createRef` API.
>
> Nie musisz zamieniać referencji pętli zwrotnej w swoich komponentów. Są one nieco bardziej elastyczne, więc pozostaną jako zaawansowana funkcjonalność.

[Dowiedz się więcej o nowym `createRef` API tutaj.](/docs/refs-and-the-dom.html)

### Ostrzeganie o użyciu przestarzałego findDOMNode {#warning-about-deprecated-finddomnode-usage}

React wspierał `findDOMNode`, w celu wyszukania węzła powiązanego z daną instancją klasy w drzewie DOM. Zazwyczaj nie potrzebujesz tego ponieważ możesz [podczepić referencję bezpośrednio do węzła DOM](/docs/refs-and-the-dom.html#creating-refs).

`findDOMNode` mógł również być użyty na komponencie klasy, jednak było to złamanie poziomów abstrakcji poprzez pozwolenie rodzicowi aby wymagał wyrenderowania się pewnego dziecka. Tworzyło to ryzyko podczas refactoringu, ponieważ nie można było zmienić implementacji komponentu podczas gdy rodzic mógłby korzystać z jego węzłów DOM. `findDOMNode` zawsze zwraca pierwsze dziecko, ale w przypadku użycia Fragmentów, jest możliwe że komponent wyrenderuje wiele wezłów DOM. `findDOMNode` pozwala na jednorazowy odczyt. To oznacza że zwraca odpowiedź, kiedy o to poprosisz. Jeżeli komponent dziecka renderuje inny węzeł, nie ma możliwości aby obsłużyć tę zmianę. Innymi słowy `findDOMNode` działa wyłącznie gdy komponenty zwracają zawsze pojedynczy węzeł DOM, który nigdy się nie zmienia.

Zamiast tego, możesz jawnie przekazać referencję do komponentu, którą następnie możesz przekazać do DOM przy użyciu [przekierowania referencji](/docs/forwarding-refs.html#forwarding-refs-to-dom-components).

Możesz również, dodać opakowujący węzeł DOM do swojego komponentu i bezpośrednio do niego dowiązać referencję.

```javascript{4,7}
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }
  render() {
    return <div ref={this.wrapper}>{this.props.children}</div>;
  }
}
```

> Uwaga:
>
> W CSS, atrybut [`display: contents`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#display_contents) może zostać użyty jeżeli nie chcesz aby węzeł nie był częścią szablonu.

### Wykrywanie nieoczekiwanych efektów ubocznych {#detecting-unexpected-side-effects}

Zasadniczo, React działa w dwóch fazach:
* Faza **renderowania** określa jakie zmiany mają zostać zrobione w np. DOM. Podczas tej fazy, React wywołuje `render` i porównuje jego wynik z poprzednim wywołaniem `render`.
* Faza **aktualizacji** jest gdy React aplikuje zmiany. (W przypadku React DOM, następuje to gdy React dodaje, aktualizuje i usuwa węzły DOM.) Podczas tej fazy, React wywołuje również metody życia komponentu tj. `componentDidMount` czy `componentDidUpdate`.

Faza aktualizacji jest zazwyczaj bardzo szybka, jednak renderowanie może być powolne. Z tego powodu, nadchodzący tryb asynchroniczny(który nie jest jeszcze domyślnie włączony), rozbija pracę związaną z renderowaniem na części, zatrzymując i wznawiając pracę, aby uniknąć blokowania przeglądarki. To oznacza że React, może wywołąć metody cyklu życia fazy renderowania więc niż raz przed aktualizacją lub może je wywołać nawet bez aktualizacji (z powodu błędu lub przerwania o większym priorytecie).

Cykl życia fazy renderowania odnosi się do poniższych metod z komponentu klasowego:
* `constructor`
* `componentWillMount`
* `componentWillReceiveProps`
* `componentWillUpdate`
* `getDerivedStateFromProps`
* `shouldComponentUpdate`
* `render`
* `setState` funkcje aktualizaujące (pierwszy argument)

Ponieważ powyższe metody mogą być wywołane więcej niż raz, ważne jest aby nie zawierały efektów ubocznych (ang *side-effects*). Zignorowanie tej zasady może prowadzić do różnych problemów, włączając w to wycieki pamięci i niepoprawny stan aplikacji. Niestety, może być ciężko wykryć problemy tego typu ponieważ są one często [niedeterministyczne](https://pl.wikipedia.org/wiki/Algorytm_deterministyczny).

Tryb rygorystyczny nie może automatycznie wykrywać efektów ubocznych ale może pomóc w ich zauważeniu, poprzez zrobienie ich trochę bardziej deterministycznymi. Jest to wykonane poprzez celowe podwójne wywołanie poniższych metod:

* Metoda `constructor` komponentu klasowego
* Metoda `render` 
* `setState` funkcje aktualizujące (pierwszy argument)
* Statyczna metoda cyklu życia `getDerivedStateFromProps`

> Uwaga:
>
> Ma to zastosowanie tylko w trybie developmentu. _Metody życia komponentu nie będą podwójnie wywoływane w trybie produkcyjnym._

Dla przykładu, rozważ poniższy kod:
`embed:strict-mode/side-effects-in-constructor.js`

Na pierwszy rzut oka, kod nie wydaje się problematyczny. Ale jeżeli `SharedApplicationState.recordEvent` nie jest [idempotentna](https://pl.wikipedia.org/wiki/Idempotentno%C5%9B%C4%87#Informatyka), to stworzenie wielu instancji tego komponentu może prowadzić do niepoprawnego stanu aplikacji. Ten subtelny błąd może się nie ukazać podczas developmentu lub może występować sporadycznie i zostać przeoczony.

Przez celowe podwójne wywołanie metod tj. konstruktor komponentu, tryb rygorystyczny powoduje że wzorce tego typu są łatwiejsze do zauważenia.

### Wykrywanie przestarzałego kontekst API {#detecting-legacy-context-api}

Przestarzałe API kontekstowe jest podatne na błędy i może zostać usunięte w przyszłych wersjach. Nadal będzie działać dla wszystkich wydań 16.x ale będzie wyświetlać poniższy komunikat ostrzegawczy w trybie rygorystycznym:

![](../images/blog/warn-legacy-context-in-strict-mode.png)

Przeczytaj [dokumentację nowego API kontekstu](/docs/context.html) w celu pomocy w migracji do nowej wersji.
