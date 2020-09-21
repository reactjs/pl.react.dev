---
id: context
title: Kontekst
permalink: docs/context.html
---

Kontekst umożliwia przekazywanie danych wewnątrz drzewa komponentów bez konieczności przekazywania ich przez właściwości każdego komponentu pośredniego.

W typowej aplikacji reactowej dane przekazywane są z góry w dół (od rodzica do dziecka) poprzez właściwości. Może się to jednak okazać zbyt uciążliwe w przypadku niektórych danych (np. preferencje językowe, schemat UI czy paleta kolorów), z których korzystają komponenty na wielu poziomach struktury. Konteksty umożliwiają współdzielenie pewnych wartości przez takie komponenty bez konieczności przekazywania ich jako właściwości na każdym poziomie drzewa.

- [Kiedy należy użyć kontekstu?](#when-to-use-context)
- [Zanim użyjesz kontekstu](#before-you-use-context)
- [Interfejs API](#api)
  - [React.createContext](#reactcreatecontext)
  - [Context.Provider](#contextprovider)
  - [Class.contextType](#classcontexttype)
  - [Context.Consumer](#contextconsumer)
  - [Context.displayName](#contextdisplayname)
- [Przykłady](#examples)
  - [Kontekst dynamiczny](#dynamic-context)
  - [Aktualizacja kontekstu z komponentu zagnieżdżonego](#updating-context-from-a-nested-component)
  - [Odczyt z kilku kontekstów jednocześnie](#consuming-multiple-contexts)
- [Zastrzeżenia](#caveats)
- [Przestarzały interfejs API](#legacy-api)

## Kiedy należy użyć kontekstu? {#when-to-use-context}

Konteksty zaprojektowano do współdzielenia danych, które można uznać za "globalne" dla drzewa komponentów, takich jak informacje o zalogowanym użytkowniku, schemat kolorów czy preferowany język. W poniższym przykładzie wartość `theme`, potrzebną do ostylowania przycisku, przekazujemy ręcznie:

`embed:context/motivation-problem.js`

Z pomocą kontekstu moglibyśmy uniknąć przekazywania jej na każdym poziomie struktury:

`embed:context/motivation-solution.js`

## Zanim użyjesz kontekstu {#before-you-use-context}

Zwykle kontekstu używa się w sytuacjach, w których pewne dane muszą być dostępne dla *wielu* komponentów na różnych poziomach zagnieżdżenia. Korzystaj jednak z tego mechanizmu z rozwagą, ponieważ utrudnia on wielokrotne używanie komponentów zależnych.

**Jeśli twoim celem jest wyłącznie uniknięcie przekazywania wartości przez kilka poziomów drzewa, zwykle łatwiejszym i lepszym rozwiązaniem okazuje się [kompozycja komponentów](/docs/composition-vs-inheritance.html).**

Rozważmy komponent `Page`, który musi przekazać właściwości `user` oraz `avatarSize` kilka poziomów w dół, tak aby głęboko zagnieżdżone komponenty `Link` i `Avatar` mogły je odczytać:

```js
<Page user={user} avatarSize={avatarSize} />
// ... który renderuje...
<PageLayout user={user} avatarSize={avatarSize} />
// ... który renderuje...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... który renderuje...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>
```

Przekazywanie tych wartości przez tyle poziomów, tylko po to by mógł je odczytać `Avatar`, wydaje się lekką przesadą. Dodatkowo, gdyby `Avatar` w pewnym momencie zaczął wymagać jeszcze jednej wartości z góry, należałoby ją również przekazać przez te wszystkie poziomy.

Jednym z rozwiązań tego problemu **bez używania kontekstów** jest [przekazanie w dół samego komponentu `Avatar`](/docs/composition-vs-inheritance.html#containment), dzięki czemu komponenty pośrednie nie muszą niczego wiedzieć o właściwościach `user` czy `avatarSize`:

```js
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// Teraz mamy:
<Page user={user} avatarSize={avatarSize} />
// ... który renderuje...
<PageLayout userLink={...} />
// ... który renderuje...
<NavigationBar userLink={...} />
// ... który renderuje...
{props.userLink}
```

Dzięki takiej zmianie tylko komponent `Page`, znajdujący się najwyżej w hierarchii, musi wiedzieć o tym, że `Link` i `Avatar` zależą od wartości `user` i `avatarSize`.

Takie "odwrócenie sterowania" (ang. *inversion of control*) sprawia, że kod staje się czytelniejszy poprzez zmniejszenie liczby wartości przeplecionych przez strukturę aplikacji, jak również daje większą kontrolę komponentom znajdującym się wysoko w hierarchii. Należy jednak pamiętać, że to podejście nie zawsze jest najlepszym rozwiązaniem. Przeniesienie złożoności w górę hierarchii sprawia, że komponenty na górze stają się bardziej złożone, a także wymusza często nadmierną elastyczność na komponentach poniżej.

Warto zwrócić uwagę, że dany komponent nie jest ograniczony do posiadania tylko jednego potomka. Poprzez właściwości do komponentu możemy przekazać wielu potomków naraz lub stworzyć kilka oddzielnych "slotów" dla poszczególnych potomków, [jak opisano to w tym rozdziale](/docs/composition-vs-inheritance.html#containment):

```js
function Page(props) {
  const user = props.user;
  const content = <Feed user={user} />;
  const topBar = (
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    </NavigationBar>
  );
  return (
    <PageLayout
      topBar={topBar}
      content={content}
    />
  );
}
```

Takie podejście jest wystarczające w większości przypadków, gdy pojawia się konieczność oddzielenia potomka od jego bezpośrednich przodków. Można pójść jeszcze o krok dalej i skorzystać z wzorca [właściwości renderujących (ang. *render props*)](/docs/render-props.html), jeśli chcemy, by potomek przed wyrenderowaniem mógł skomunikować się z rodzicem.

Czasami jednak te same dane muszą być dostępne dla wielu komponentów w drzewie, na wielu różnych poziomach struktury. Konteksty pozwalają na "rozgłoszenie" (ang. *broadcast*) zarówno samych danych, jak i wszelkich ich modyfikacji, do komponentów znajdujących się poniżej w hierarchii. Używanie kontekstów, zamiast pozostałych wzorców, zwykle sprawdza się przy zarządzaniu aktualnym językiem lub motywem, a także przy przechowywaniu danych we wspólnej pamięci podręcznej.

## Interfejs API {#api}

### `React.createContext` {#reactcreatecontext}

```js
const MyContext = React.createContext(defaultValue);
```

Tworzy obiekt kontekstu. Gdy React renderuje komponent, który zasubskrybował się do tego kontekstu, będzie przekazywać mu aktualną wartość z najbliższego "dostawcy" (`Provider`) powyżej w drzewie.

Argument `defaultValue` jest używany **tylko** gdy komponent odczytujący z kontekstu nie ma nad sobą żadnego dostawcy. Przydaje się to podczas testowania komponentów w izolacji, ponieważ nie ma konieczności opakowywania ich w sztucznych dostawców. Uwaga: przekazanie dostawcy wartości `undefined` nie spowoduje, że zasubskrybowane komponenty otrzymają wartość z argumentu `defaultValue`.

### `Context.Provider` {#contextprovider}

```js
<MyContext.Provider value={/* jakaś wartość */}>
```

Każdy obiekt kontekstu posiada własny komponent dostawcy (ang. *provider*), który pozwala komponentom odczytującym na zasubskrybowanie się na zmiany w tym kontekście.

Wartość przekazana we właściwości `value` będzie trafiała do "konsumentów" (ang. *consumer*) tego kontekstu znajdujących się poniżej w drzewie. Jeden dostawca może być połączony z wieloma konsumentami. Zagnieżdżanie dostawców jeden pod drugim powoduje nadpisanie wartości kontekstu w danym poddrzewie.

Wszyscy konsumenci znajdujący się poniżej dostawcy będą ponownie renderowani przy każdej zmianie właściwości `value`. Propagacja od dostawcy do jego podległych konsumentów (wliczając w to [`.contextType`](#classcontexttype) i [`useContext`](/docs/hooks-reference.html#usecontext)) nie jest brana pod uwagę przez metodę `shouldComponentUpdate`, a co za tym idzie, konsumenci będą renderowani ponownie nawet jeśli ich przodkowie nie zostali przerenderowani.

Zmiany są wykrywane poprzez porównanie starej i nowej wartości przy użyciu algorytmu podobnego do [`Object.is`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description). 

> Uwaga
>
> Sposób, w jaki wykrywane są zmiany, może powodować problemy przy przekazywaniu do `value` obiektów (zob. ["Zastrzeżenia"](#caveats)).

### `Class.contextType` {#classcontexttype}

```js
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* wykonaj akcję podczas montowania z użyciem aktualnej wartości z MyContext */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* wyrenderuj coś przy użyciu aktualnej wartości z MyContext */
  }
}
MyClass.contextType = MyContext;
```

Do właściwości `contextType` w komponencie klasowym można przypisać obiekt kontekstu utworzony przy pomocy funkcji [`React.createContext()`](#reactcreatecontext). Dzięki temu wartość najbliższego kontekstu tego typu jest dostępna pod zmienną `this.context`. Możesz odwoływać się do tej wartości w każdej z metod cyklu życia komponentu, łącznie z metodą renderującą.

> Uwaga:
>
> Za pomocą tego interfejsu można zasubskrybować się tylko do jednego kontekstu. Jeśli chcesz połączyć się z wieloma kontekstami, zajrzyj do sekcji pt. ["Odczyt z kilku kontekstów jednocześnie"](#consuming-multiple-contexts).
>
> Jeśli korzystasz z eksperymentalnej [składni publicznych pól klasy](https://babeljs.io/docs/plugins/transform-class-properties/), do inicjalizacji `contextType` możesz użyć pola statycznego, oznaczonego przez **static**.


```js
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* wyrenderuj coś na podstawie aktualnej wartości */
  }
}
```

### `Context.Consumer` {#contextconsumer}

```js
<MyContext.Consumer>
  {value => /* wyrenderuj coś na podstawie wartości z kontekstu */}
</MyContext.Consumer>
```

Komponent reactowy, który subskrybuje się na zmiany w kontekście. Pozwala na nasłuchiwanie zmian z wnętrza [komponentu funkcyjnego](/docs/components-and-props.html#function-and-class-components).

Jego [potomkiem musi być funkcja](/docs/render-props.html#using-props-other-than-render). Funkcja ta otrzymuje aktualną wartość z kontekstu i zwraca węzeł reactowy. Argument `value` przekazany do tej funkcji będzie równy właściwości `value` najbliższego dostawcy tego kontekstu powyżej w drzewie. Jeśli ponad komponentem nie ma żadnego dostawcy, zostanie użyta wartość `defaultValue` przekazana do `createContext()`.
 
> Uwaga
>
> Aby dowiedzieć się więcej na temat wzorca "funkcji przekazanej jako potomek", zajrzyj do rozdziału o [właściwościach renderujących](/docs/render-props.html).

### `Context.displayName` {#contextdisplayname}

Obiekt kontekstu przyjmuje atrybut tekstowy `displayName`. Jest on używany przez React DevTools do wyświetlenia nazwy kontekstu.

Na przykład, poniższy komponent wyświetli się w narzędziach deweloperskich jako "MyDisplayName":

```js{2}
const MyContext = React.createContext(/* jakaś wartość */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" w DevTools
<MyContext.Consumer> // "MyDisplayName.Consumer" w DevTools
```

## Przykłady {#examples}

### Kontekst dynamiczny {#dynamic-context}

Bardziej złożony przykład korzystający z dynamicznej wartości dla motywu:

**theme-context.js**
`embed:context/theme-detailed-theme-context.js`

**themed-button.js**
`embed:context/theme-detailed-themed-button.js`

**app.js**
`embed:context/theme-detailed-app.js`

### Aktualizacja kontekstu z komponentu zagnieżdżonego {#updating-context-from-a-nested-component}

Często pojawia się potrzeba zaktualizowania kontekstu z komponentu znajdującego się gdzieś głęboko w drzewie. W takim wypadku należy przez kontekst przekazać funkcję, za pomocą której konsumenci będą mogli go aktualizować:

**theme-context.js**
`embed:context/updating-nested-context-context.js`

**theme-toggler-button.js**
`embed:context/updating-nested-context-theme-toggler-button.js`

**app.js**
`embed:context/updating-nested-context-app.js`

### Odczyt z kilku kontekstów jednocześnie {#consuming-multiple-contexts}

Aby zapewnić szybkość ponownego renderowania kontekstu, React musi stworzyć w drzewie osobny węzeł dla każdego konsumenta. 

`embed:context/multiple-contexts.js`

Jeśli często używasz dwóch lub więcej wartości z różnych kontekstów, sugerujemy stworzyć oddzielny komponent z właściwością renderującą (ang. *render prop*), który dostarcza je wszystkie.

## Zastrzeżenia {#caveats}

Kontekst podczas decydowania, co należy ponownie wyrenderować, sprawdza tożsamość referencji. Z tego powodu w niektórych przypadkach ponowne wyrenderowanie rodzica dostawcy kontekstu może skutkować niechcianym powtórnym wyrenderowaniem wszystkich konsumentów danego kontekstu. W poniższym przykładzie dzieje się tak, ponieważ obiekt przekazywany do właściwości `value` dla dostawcy kontekstu jest za każdym razem tworzony na nowo:

`embed:context/reference-caveats-problem.js`

Aby temu zapobiec, wystarczy przenieść tę wartość do stanu rodzica:

`embed:context/reference-caveats-solution.js`

## Przestarzały interfejs API {#legacy-api}

> Uwaga
>
> React poprzednio był wyposażony w eksperymentalny interfejs API dla kontekstów. Mimo iż jest on przestarzały, będzie wspierany we wszystkich wersjach 16.x, jednak aplikacje powinny dążyć do migracji na nową wersję. Przestarzały interfejs zostanie usunięty w kolejnej głównej wersji Reacta. Aby dowiedzieć się więcej na ten temat, [przeczytaj dokumentację przestarzałego kontekstu](/docs/legacy-context.html).
 
