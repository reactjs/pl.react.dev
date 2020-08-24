---
id: higher-order-components
title: Komponenty wyższego rzędu
permalink: docs/higher-order-components.html
prev: web-components.html
next: render-props.html
---

Komponent wyższego rzędu (ang. *Higher-Order Component*), w skrócie KWR (ang. *HOC*), to zaawansowana technika reactowa stosowana w celu wielokrotnego używania logiki komponentu. KWR-y nie są częścią API Reacta *per se*. Są wzorcem, który wyłonił się z kompozycyjnej natury Reacta.

Konkretnie rzecz ujmując, **komponent wyższego rzędu jest funkcją, która przyjmuje jako argument inny komponent i zwraca nowy komponent.**

```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

Tak jak zwykły komponent przekształca właściwości (ang. *props*) na fragment UI, tak komponent wyższego rzędu przekształca komponent w inny komponent.

KWR-y pojawiają się często w zewnętrznych bibliotekach reactowych, np. [`connect`](https://github.com/reduxjs/react-redux/blob/master/docs/api/connect.md#connect) w Reduksie czy [`createFragmentContainer`](http://facebook.github.io/relay/docs/en/fragment-container.html) w Relayu.

W tym artykule wyjaśnimy, dlaczego komponenty wyższego rzędu są użyteczne oraz jak napisać własny.

## Używaj KWR-ów do problemów przekrojowych {#use-hocs-for-cross-cutting-concerns}

> **Uwaga**
>
> Dawniej do rozwiązywania problemów przekrojowych sugerowaliśmy korzystanie z mixinów. Zdaliśmy sobie jednak sprawę, iż wprowadzają one więcej zamieszania niż pożytku. [Przeczytaj ten artykuł](/blog/2016/07/13/mixins-considered-harmful.html), jeśli chcesz dowiedzieć się, dlaczego odeszliśmy od tego wzorca i w jaki sposób dostosować swoje istniejące komponenty.

Komponenty to podstawowa jednostka wielokrotnie używalnego kodu reactowego. Jednak niektóre wzorce nie pasują idealnie do tradycyjnego zastosowania komponentów.

Dla przykładu, powiedzmy, że mamy komponent `CommentList`, który subskrybuje się do zewnętrznego źródła danych i renderuje listę komentarzy:

```js
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" jest jakimś globalnym źródłem danych
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // Zasubskrybuj się na zmiany
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Usuń subskrypcję
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // Zaktualizuj stan komponentu przy każdej zmianie danych źródłowych
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment.text} key={comment.id} />
        ))}
      </div>
    );
  }
}
```

Później możesz chcieć napisać komponent subskrybujący się na pojedynczy wpis na blogu, w którym zastosujesz podobny wzorzec:

```js
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}
```

Komponenty `CommentList` i `BlogPost` nie są identyczne — wywołują bowiem inne metody `DataSource` i renderują inny fragment interfejsu. Jednak spora część ich implementacji jest taka sama:

- Po zamontowaniu komponentu subskrybują się w `DataSource`.
- Wewnątrz funkcji nasłuchującej wywołują `setState` przy każdej zmianie danych źródłowych.
- Po odmontowaniu komponentu usuwają subskrypcję.

Można sobie wyobrazić, że w większej aplikacji co rusz będziemy pisać podobny kod, który subskrybuje się w `DataSource` i wywołuje `setState`. Chcielibyśmy zbudować warstwę abstrakcji, która pozwoliłaby nam zdefiniować tę logikę w jednym miejscu i współdzielić ją w wielu komponentach. Tu do akcji wkraczają komponenty wyższego rzędu.

Możemy napisać funkcję, tworzącą komponenty takie jak `CommentList` czy `BlogPost`, która subskrybuje się w `DataSource`. Funkcja ta jako jeden z argumentów będzie przyjmować komponent potomny, który otrzyma zasubskrybowane dane poprzez określoną właściwość (ang. *prop*). Nazwijmy tę funkcję `withSubscription`:

```js
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);
```

Pierwszy z argumentów to opakowywany komponent. Drugi, po otrzymaniu `DataSource` i aktualnych właściwości komponentu, wyciąga interesujące nas dane ze źródła.

Gdy `CommentListWithSubscription` i `BlogPostWithSubscription` zostaną wyrenderowane, do `CommentList` i `BlogPost` trafi właściwość `data`, zawierająca aktualne dane ze źródła `DataSource`:

```js
// Ta funkcja przyjmuje jako argument pewien komponent...
function withSubscription(WrappedComponent, selectData) {
  // ...i zwraca inny komponent...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... który zajmuje się podpięciem subskrypcji...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... i renderuje opakowywany komponent z aktualnymi danymi!
      // Zauważ, że dodatkowo przekazujemy tu też pozostałe właściwości
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```

Zwróć uwagę, że KWR nie modyfikuje przekazanego mu komponentu ani nie stosuje dziedziczenia w celu skopiowania jego zachowania. Zamiast tego *wkomponowuje* przekazany komponent poprzez jego *opakowanie* w kontener. KWR jest zatem czystą funkcją (ang. *pure function*), nie mającą żadnych efektów ubocznych.

I to by było na tyle! Opakowany komponent otrzyma wszystkie właściwości kontenera, a dodatkowo `data`, używaną do wyrenderowania interfejsu. Dla KWR-a nie ma znaczenia, w jaki sposób wykorzystywane są dane, a z kolei opakowywany komponent nie przejmuje się tym, skąd te dane pochodzą.

Z racji tego, że `withSubscription` jest zwykłą funkcją, możesz przekazać jej tyle argumentów, ile uważasz za stosowne. Możesz, na przykład, zechcieć definiować nazwę dla właściwości `data`, żeby jeszcze bardziej odizolować KWR od opakowanego komponentu. Możesz też przekazać argument, który steruje metodą `shouldComponentUpdate` lub taki, który konfiguruje w jakiś sposób źródło danych. To wszystko jest możliwe dlatego, że KWR ma pełną kontrolę nad opakowywanym komponentem.

Podobnie jak w przypadku zwykłych komponentów, kontrakt pomiędzy `withSubscription` i opakowywanym komponentem w całości opiera się na właściwościach. Pozwala to na łatwą podmianę jednego KWR-a na inny, pod warunkiem że przekazują one renderowanemu komponentowi takie same właściwości. Może się to okazać przydatne np. w razie potrzeby podmiany biblioteki pobierającej dane.

## Nie modyfikuj opakowywanego komponentu. Użyj kompozycji. {#dont-mutate-the-original-component-use-composition}

Powstrzymaj się przed wszelkimi zmianami prototypu komponentu (innymi słowy, przed jego mutowaniem) wewnątrz KWR-a.

```js
function logProps(InputComponent) {
  InputComponent.prototype.componentDidUpdate = function(prevProps) {
    console.log('Aktualne właściwości: ', this.props);
    console.log('Poprzednie właściwości: ', prevProps);
  };
  // Fakt, że zwracamy tu oryginalny komponent, może świadczyć o tym,
  // że został on w jakiś sposób zmodyfikowany.
  return InputComponent;
}

// EnhancedComponent wypisze na konsolę informację przy każdej zmianie właściwości komponentu
const EnhancedComponent = logProps(InputComponent);
```

Z powyższym kodem jest kilka problemów. Po pierwsze, nie można ponownie użyć opakowywanego komponentu osobno, w innym miejscu aplikacji. Co ważne, jeśli zaaplikujesz kolejny `EnhancedComponent`, który *także* zmienia metodę `componentDidUpdate`, funkcjonalność pierwszego KWR-a zostanie nadpisana! Ponadto, ten KWR nie zadziała poprawnie z komponentami funkcyjnymi, ponieważ nie mają one metod cyklu życia.

KWR-y mutujące są swego rodzaju "dziurawą abstrakcją" - konsument takiego komponentu musi znać jego implementację, aby uniknąć konfliktów z innymi KWR-ami.

Zamiast modyfikować, KWR-y powinny komponować poprzez opakowywanie otrzymanego komponentu w kontener:

```js
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('Aktualne właściwości: ', this.props);
      console.log('Poprzednie właściwości: ', prevProps);
    }
    render() {
      // Opakowuje otrzymany komponent w kontener, bez jego zmieniania. Dobrze!
      return <WrappedComponent {...this.props} />;
    }
  }
}
```

Powyższy KWR ma podobną funkcjonalność co wersja modyfikująca komponent, lecz nie wprowadza dodatkowych "zgrzytów". Działa zarówno z komponentami klasowymi, jak i funkcyjnymi. A ponieważ jest napisany jako czysta funkcja (ang. *pure function*), można go komponować z innymi KWR-ami, czy nawet z nim samym.

Być może udało ci się zauważyć pewne podobieństwa pomiędzy KWR-ami a wzorcem zwanym **komponenty-kontenery**. Komponenty-kontenery wchodzą w skład strategii oddzielającej odpowiedzialności na niskim i wysokim poziomie abstrakcji. Kontenery zarządzają takimi rzeczami jak subskrypcje czy stan, a także przekazują właściwości do komponentów, które z kolei zajmują się renderowaniem interfejsu. KWR-y używają kontenerów w części swojej implementacji. Można by powiedzieć, że KWR-y to takie definicje sparametryzowanych komponentów-kontenerów.

## Konwencja: Przekazuj nieużywane właściwości do opakowywanego komponentu {#convention-pass-unrelated-props-through-to-the-wrapped-component}

KWR-y dodają jakąś funkcjonalność do komponentu. Nie powinny jednak zmieniać zbyt drastycznie jego kontraktu. Oczekuje się, że komponent zwracany przez KWR będzie miał podobny interfejs do oryginalnego.

KWR-y powinny przekazywać dalej właściwości, które nie są przez nie używane. Większość KWR-ów zawiera metodę renderującą podobną do tej poniżej:

```js
render() {
  // Odfiltruj wszelkie dodatkowe właściwości, które są używane przez KWR
  // i nie powinny być przekazywane dalej
  const { extraProp, ...passThroughProps } = this.props;

  // Wstrzyknij właściwości w opakowywany komponent. Zazwyczaj będą to
  // wartości stanu lub metody instancji.
  const injectedProp = someStateOrInstanceMethod;

  // Przekaż właściwości do renderowanego komponentu
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}
```

Powyższa konwencja pomaga upewnić się, że KWR-y są tak elastyczne i uniwersalne, jak to tylko możliwe.

## Konwencja: Maksymalizuj kompozycyjność {#convention-maximizing-composability}

Nie wszystkie KWR-y wyglądają tak samo. Czasami przyjmują tylko jeden argument, będący opakowywanym komponentem:

```js
const NavbarWithRouter = withRouter(Navbar);
```

Zwykle jednak przyjmują także dodatkowe argumenty. W poniższym przykładzie z biblioteki Relay użyto obiektu konfiguracyjnego, który opisuje dane, od których zależy komponent:

```js
const CommentWithRelay = Relay.createContainer(Comment, config);
```

Najczęściej jednak spotyka się KWR-y wyglądające jak ten:

```js
// Funkcja `connect` z biblioteki React Redux
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
```

*Że co?!* Łatwiej będzie przeanalizować ten kod, jeśli rozbijemy go na części.

```js
// `connect` to funkcja, która zwraca inną funkcję
const enhance = connect(commentListSelector, commentListActions);
// Zwracana funkcja jest KWR-em, który zwraca komponent podłączony
// do magazynu Reduksa
const ConnectedComment = enhance(CommentList);
```
Innymi słowy, `connect` jest funkcją wyższego rzędu, która zwraca komponent wyższego rzędu!

Taka forma może wydawać się niejasna czy nawet niepotrzebna, ale ma jedną praktyczną własność. Jednoargumentowe KWR-y, takie jak ten zwrócony przez `connect` w powyższym przykładzie, mają sygnaturę `Component => Component`. Funkcje, których typ wartości zwracanej jest taki sam, jak typ wartości wejściowej, bardzo łatwo dają się komponować.

```js
// Zamiast robić tak...
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))

// ... możesz użyć pomocniczej funkcji komponującej
// compose(f, g, h) daje to samo, co (...args) => f(g(h(...args)))
const enhance = compose(
  // Obydwie poniższe funkcje są jednoargumentowymi KWR-ami
  withRouter,
  connect(commentSelector)
)
const EnhancedComponent = enhance(WrappedComponent)
```

(Ta sama własność pozwala również funkcji `connect`, jak i innym KWR-om napisanym w stylu "funkcji wzbogacających" (ang. *enhancer*), występować w formie dekoratora - eksperymentalnej funkcjonalności proponowanej dla JavaScriptu.)

Funkcja pomocnicza `compose` jest dostarczana przez wiele bibliotek zewnętrznych, wliczając w to `lodash` (jako [`lodash.flowRight`](https://lodash.com/docs/#flowRight)), [`Redux`](https://redux.js.org/api/compose) czy [Ramda](https://ramdajs.com/docs/#compose).

## Konwencja: Opakowuj wyświetlaną nazwę dla łatwiejszego debuggowania {#convention-wrap-the-display-name-for-easy-debugging}

Komponenty-kontenery stworzone przez KWR-y wyglądają w narzędziu [React Developer Tools](https://github.com/facebook/react-devtools) jak zwykłe komponenty. Aby ułatwić sobie debugowanie, możesz zmienić wyświetlaną nazwę na inną, informującą o tym, że jest to wynik działania KWR-a.

Najczęściej stosowaną techniką jest opakowywanie wyświetlanej nazwy (ang. *display name*) renderowanego komponentu. Jeśli więc twój komponent wyższego rzędu nazywa się `withSubscription`, a opakowywany komponent to `CommentList`, użyj nazwy `WithSubscription(CommentList)`:

```js
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {/* ... */}
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```


## Zastrzeżenia {#caveats}

Z komponentami wyższego rzędu wiążą się pewne restrykcje, które mogą nie być oczywiste dla początkujących reactowców.

### Nie używaj KWR-ów wewnątrz metody render {#dont-use-hocs-inside-the-render-method}

Algorytm różnicujący w Reakcie (zwany "rekonsyliacyjnym") korzysta z tożsamości komponentu, aby stwierdzić, czy powinien zaktualizować istniejące poddrzewo, czy też wyrzucić je do kosza i stworzyć nowe. Jeśli komponent zwracany przez funkcję `render` jest identyczny (`===`) jak komponent z poprzedniego renderowania, React aktualizuje drzewo rekurencyjnie, porównując je z tym nowym. Jeśli są różne, poprzednie poddrzewo jest odmontowywane w całości.

W innych przypadkach nie powinno cię to za bardzo obchodzić. Ma to jednak znaczenie dla KWR-ów, ponieważ oznacza to, że nie możesz stworzyć KWR-a wewnątrz metody `render` innego komponentu:

```js
render() {
  // Przy każdym renderowaniu tworzona jest nowa wersja komponentu EnhancedComponent
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // Powoduje to każdorazowe odmontowanie i ponowne zamontowanie całego poddrzewa!
  return <EnhancedComponent />;
}
```

Problemem nie jest tu sama wydajność aplikacji. Ponowne montowanie komponentu powoduje utratę jego stanu i wszystkich jego potomków.

Zamiast tego używaj KWR-ów na zewnątrz definicji komponentu, tak żeby powstały komponent został stworzony tylko raz. Dzięki temu jego tożsamość zostanie zachowana pomiędzy kolejnymi renderowaniami. A zwykle o to właśnie chodzi.

W szczególnych przypadkach, gdy musisz użyć KWR-a dynamicznie, możesz zrobić to wewnątrz metody cyklu życia komponentu lub w jego konstruktorze.

### Pamiętaj o skopiowaniu metod statycznych {#static-methods-must-be-copied-over}

Czasami przydatne okazuje się zdefiniowanie metody statycznej dla komponentu reactowego. Przykładowo, kontenery biblioteki Relay udostępniają statyczną metodę `getFragment`, ułatwiającą komponowanie fragmentów GraphQLowych.

Kiedy używasz KWR-a na komponencie, oryginalny komponent jest opakowywany w komponent-kontener. Oznacza to, że nowy komponent nie otrzyma żadnej z metod statycznych oryginalnego komponentu.

```js
// Definiujemy metodę statyczną
WrappedComponent.staticMethod = function() {/*...*/}
// Używamy KWR-a
const EnhancedComponent = enhance(WrappedComponent);

// Rozszerzony komponent nie posiada metody statycznej
typeof EnhancedComponent.staticMethod === 'undefined' // true
```

Można sobie z tym poradzić kopiując metody do kontenera przed jego zwróceniem:

```js
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  // Musimy wiedzieć, jakie metody trzeba skopiować :(
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}
```

Niestety wymaga to przewidzenia, jakie metody będą musiały być skopiowane. Możesz jednak użyć [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics), aby automatycznie skopiować wszystkie nie-reactowe metody statyczne:

```js
import hoistNonReactStatic from 'hoist-non-react-statics';
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}
```

Innym możliwym rozwiązaniem jest wyeksportowanie statycznej metody komponentu niezależnie od niego.

```js
// Zamiast...
MyComponent.someFunction = someFunction;
export default MyComponent;

// ...wyeksportuj metodę osobno...
export { someFunction };

// ...a w module korzystającym z nich, zaimportuj obydwie rzeczy
import MyComponent, { someFunction } from './MyComponent.js';
```

### Referencje nie są przekazywane {#refs-arent-passed-through}

Mimo że powszechną konwencją jest przekazywanie w KWR-ach wszystkich właściwości w dół do opakowywanego komponentu, nie działa to z referencjami. Dzieje się tak dlatego, że `ref` nie jest zwykłą właściwością — podobnie jak `key`, jest traktowana inaczej przez Reacta. Jeśli dodasz referencję do elementu, którego wynikiem renderowania jest komponent opakowany przez KWR, referencja będzie odnosiła się do instancji najbardziej zewnętrznego komponentu-kontenera, a nie do komponentu opakowywanego.

Rozwiązaniem tego problemu jest użycie interfejsu `React.forwardRef` (wprowadzonego w Reakcie 16.3). [Więcej o tym mechanizmie dowiesz się z rozdziału o przekazywaniu referencji](/docs/forwarding-refs.html).
