---
id: integrating-with-other-libraries
title: Integracja z innymi bibliotekami
permalink: docs/integrating-with-other-libraries.html
---

<div class="scary">

> These docs are old and won't be updated. Go to [react.dev](https://react.dev/) for the new React docs.
> 
> These new documentation pages teach modern React:
>
> - [`useSyncExternalStore`: Subscribing to an external store 
](https://react.dev/reference/react/useSyncExternalStore#subscribing-to-an-external-store)
> - [`createPortal`: Rendering React components into non-React DOM nodes 
](https://react.dev/reference/react-dom/createPortal#rendering-react-components-into-non-react-dom-nodes)

</div>

Reacta można używać w dowolnej aplikacji webowej. Można go osadzić w innej aplikacji, a także, przy odrobinie wysiłku, inną aplikację można osadzić w kodzie reactowym. W tym poradniku przeanalizujemy kilka powszechnych sytuacji dotyczących integracji z [jQuery](https://jquery.com/) i [Backbonem](https://backbonejs.org/). Mimo wszystko te same metody mogą zadziałać przy integracji komponentów z dowolnym kodem.

## Integracja z wtyczkami manipulującymi DOM-em {#integrating-with-dom-manipulation-plugins}

React nie wie nic o zmianach w modelu DOM, które wprowadzono poza Reactem. Decyduje, co należy zaktualizować, bazując na własnej, wewnętrznej reprezentacji. Dlatego jeśli węzły DOM zostaną zmienione przez inną bibliotekę, React wpada w zakłopotanie i nie wie, co robić.

Nie oznacza to jednak, że łączenie Reacta z innymi sposobami manipulacji modelu DOM jest niemożliwe czy jakoś szczególnie trudne. Trzeba tylko mieć pewność, że się rozumie, co które z nich robi.

Najprostszym sposobem na uniknięcie konfliktów jest powstrzymanie Reacta przed aktualizowaniem komponentu. Można to zrobić renderując elementy, których React nie ma potrzeby aktualizować, jak np. pusty `<div />`.

### Jak podejść do problemu? {#how-to-approach-the-problem}

Aby lepiej to zobrazować, stwórzmy szkic kodu opakowującego generyczny plugin do jQuery.

Dodamy [referencję](/docs/refs-and-the-dom.html) (`ref`) do korzenia drzewa DOM. Dostęp do niej otrzymamy wewnątrz metody `componentDidMount`, gdzie będziemy mogli przekazać ją dalej do wtyczki.

Aby powstrzymać Reacta przed ingerowaniem w model DOM po zamontowaniu komponentu, w metodzie `render()` zwrócimy pusty znacznik `<div />`. Taki element `<div />` nie ma żadnych właściwości ani potomków, dlatego React nie ma powodu, żeby go aktualizować, pozwalając tym samym wtyczce na zarządzanie tą częścią drzewa DOM:

```js{3,4,8,12}
class SomePlugin extends React.Component {
  componentDidMount() {
    this.$el = $(this.el);
    this.$el.somePlugin();
  }

  componentWillUnmount() {
    this.$el.somePlugin('destroy');
  }

  render() {
    return <div ref={el => this.el = el} />;
  }
}
```

Zwróć uwagę, że zdefiniowaliśmy dwie [metody cyklu życia](/docs/react-component.html#the-component-lifecycle): `componentDidMount` i `componentWillUnmount`. Wiele wtyczek do jQuery podpina detektory zdarzeń (ang. _event listeners_) do modelu DOM, dlatego trzeba pamiętać o ich odpięciu w `componentWillUnmount`. Jeśli wtyczka nie udostępnia metody czyszczącej, prawdopodobnie trzeba stworzyć ją samodzielnie, pamiętając, aby odpiąć wszystkie detektory zdarzeń dodane przez wtyczkę i zapobiec tym samym wyciekom pamięci.

### Integracja z wtyczką Chosen do jQuery {#integrating-with-jquery-chosen-plugin}

Aby lepiej zobrazować powyższe koncepcje, napiszmy kawałek kodu opakowującego wtyczkę [Chosen](https://harvesthq.github.io/chosen/), która rozszerza możliwości pól `<select>`.

> **Uwaga:**
>
> Nawet jeśli tak się da, nie znaczy, że jest to najlepsze podejście w przypadku aplikacji reactowych. Zachęcamy do korzystania bezpośrednio z komponentów reactowych, jeśli jest taka możliwość. Są one łatwiejsze w użyciu, a także dają większą kontrolę nad zachowaniem i wyglądem interfejsu użytkownika.

Najpierw przyjrzyjmy się, co wtyczka Chosen robi z modelem DOM.

Jeśli wywołasz ją na węźle DOM z elementem `<select>`, odczyta ona oryginalne atrybuty tego elementu, ukryje go za pomocą odpowiedniego stylu CSS, a następnie wstawi za nim dodatkowy węzeł DOM z własną reprezentacją wizualną pola wyboru. Na koniec powiadomi nas o wykonaniu pracy za pomocą odpowiednich zdarzeń biblioteki jQuery.

Załóżmy, że interesuje nas komponent opakowujący `<Chosen>` o takim API:

```js
function Example() {
  return (
    <Chosen onChange={value => console.log(value)}>
      <option>waniliowe</option>
      <option>czekoladowe</option>
      <option>truskawkowe</option>
    </Chosen>
  );
}
```

Dla uproszczenia zaimplementujemy go jako [komponent niekontrolowany](/docs/uncontrolled-components.html).

Najpierw stwórzmy pusty komponent z metodą `render()`, która zwraca `<select>` opakowany w `<div>`:

```js{4,5}
class Chosen extends React.Component {
  render() {
    return (
      <div>
        <select className="Chosen-select" ref={el => this.el = el}>
          {this.props.children}
        </select>
      </div>
    );
  }
}
```

Zwróć uwagę, że wstawiliśmy dodatkowy element `<div>`, który opakowuje `<select>`. Musimy tak zrobić, ponieważ Chosen doda własny element DOM zaraz za `<select>`. Mimo to, z perspektywy Reacta, ten `<div>` ma zawsze tylko jednego potomka. Dzięki temu zmiany wprowadzane przez Reacta nie będą konfliktowały z dodatkowym elementem wstawionym przez wtyczkę Chosen. Pamiętaj, że jeśli w jakikolwiek sposób modyfikujesz DOM poza Reactem, musisz upewnić się, że React nie ma powodu do zmian tych węzłów DOM.

Teraz zaimplementujemy metody cyklu życia. Zainicjalizujemy wtyczkę Chosen, przekazując jej referencję do węzła `<select>` wewnątrz metody `componentDidMount`, a po wszystkim posprzątamy w `componentWillUnmount`.

```js{2,3,7}
componentDidMount() {
  this.$el = $(this.el);
  this.$el.chosen();
}

componentWillUnmount() {
  this.$el.chosen('destroy');
}
```

[**Wypróbuj kod na CodePen**](https://codepen.io/gaearon/pen/qmqeQx?editors=0010)

Pole `this.el` nie ma żadnego specjalnego znaczenia dla Reacta. Mimo to kod działa, ponieważ wcześniej, w metodzie `render()`, przypisaliśmy do pola referencję wewnątrz `ref`.

```js
<select className="Chosen-select" ref={el => this.el = el}>
```

Powyższy kod wystarczy, aby wyrenderować nasz komponent, jednak dodatkowo chcielibyśmy również być informowani o zmianie wartości pola. Możemy to osiągnąć nasłuchując na zdarzenia `change` wywoływane na elemencie `<select>` zarządzanym przez Chosen.

Nie przekazujemy `this.props.onChange` bezpośrednio do Chosen, ponieważ właściwości komponentu, włącznie z procedurami obsługi zdarzeń, mogą się zmieniać w czasie. Zamiast tego zadeklarujemy metodę `handleChange()`, która wywołuje `this.props.onChange`, i za pomocą jQuery zasubskrybujemy ją na zdarzenie `change`:

```js{5,6,10,14-16}
componentDidMount() {
  this.$el = $(this.el);
  this.$el.chosen();

  this.handleChange = this.handleChange.bind(this);
  this.$el.on('change', this.handleChange);
}

componentWillUnmount() {
  this.$el.off('change', this.handleChange);
  this.$el.chosen('destroy');
}

handleChange(e) {
  this.props.onChange(e.target.value);
}
```

[**Wypróbuj kod na CodePen**](https://codepen.io/gaearon/pen/bWgbeE?editors=0010)

Pozostała jeszcze jedna kwestia. W świecie Reacta właściwości są zmienne w czasie. Na przykład, komponent `<Chosen>` może otrzymać innych potomków po zmianie stanu komponentu nadrzędnego. Oznacza to, że w miejscach integracji koniecznie trzeba ręcznie aktualizować DOM w odpowiedzi na zmiany właściwości, ponieważ w tych miejscach React nie zrobi tego za nas.

Dokumentacja wtyczki Chosen sugeruje korzystać z interfejsu `trigger()` biblioteki jQuery do powiadamiania o zmianach na oryginalnym elemencie DOM. Każmy więc Reactowi zająć się aktualizowaniem `this.props.children` wewnątrz `<select>`, a ponadto dodajmy metodę cyklu życia `componentDidUpdate()`, która powiadomi Chosen o zmianach w liście potomków:

```js{2,3}
componentDidUpdate(prevProps) {
  if (prevProps.children !== this.props.children) {
    this.$el.trigger("chosen:updated");
  }
}
```

W ten sposób powiadomimy wtyczkę Chosen, że musi zaktualizować swoje elementy DOM, gdy zmienią się potomkowie elementu `<select>` zarządzanego przez Reacta.

Kompletna implementacja komponentu `Chosen` wygląda następująco:

```js
class Chosen extends React.Component {
  componentDidMount() {
    this.$el = $(this.el);
    this.$el.chosen();

    this.handleChange = this.handleChange.bind(this);
    this.$el.on('change', this.handleChange);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.$el.trigger("chosen:updated");
    }
  }

  componentWillUnmount() {
    this.$el.off('change', this.handleChange);
    this.$el.chosen('destroy');
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div>
        <select className="Chosen-select" ref={el => this.el = el}>
          {this.props.children}
        </select>
      </div>
    );
  }
}
```

[**Wypróbuj kod na CodePen**](https://codepen.io/gaearon/pen/xdgKOz?editors=0010)

## Integracja z innymi bibliotekami do obsługi widoków {#integrating-with-other-view-libraries}

Osadzenie Reacta wewnątrz innych aplikacji jest możliwe dzięki elastyczności funkcji [`createRoot()`](/docs/react-dom-client.html#createRoot).

Mimo że Reacta zwykle używa się na starcie aplikacji do załadowania jednego głównego komponentu do DOM, funkcję `createRoot()` można wywołać wielokrotnie w niezależnych fragmentach interfejsu, niezależnie od tego, czy są małe jak przycisk, czy dużych jak cała aplikacja.

Prawdę mówiąc, właśnie w taki sposób używamy Reacta na Facebooku. To podejście pozwala nam pisać aplikacje kawałek po kawałku i łączyć je z istniejącymi szablonami wygenerowanymi po stronie serwera czy z innym kodem klienckim.

### Zastąpienie renderowania opartego na ciągu znaków {#replacing-string-based-rendering-with-react}

Popularnym wzorcem w starszych aplikacjach webowych było opisywanie fragmentów drzewa DOM za pomocą ciągu znaków, a następnie wstawianie ich do modelu na przykład tak: `$el.html(htmlString)`. Tego typu miejsca w kodzie są idealnymi kandydatami na wprowadzenie Reacta. Wystarczy przepisać owe fragmenty na komponenty reactowe.

Wobec tego taki kod napisany w jQuery...

```js
$('#container').html('<button id="btn">Przywitaj się</button>');
$('#btn').click(function() {
  alert('Cześć!');
});
```

...mógłby zostać zastąpiony komponentem reactowym:

```js
function Button() {
  return <button id="btn">Przywitaj się</button>;
}

$('#btn').click(function() {
  alert('Cześć!');
});
```

Od tego momentu możesz zacząć przenosić coraz więcej logiki do samego komponentu i stosować coraz więcej praktyk reactowych. Przykładowo, w komponentach zwykle nie stosuje się identyfikatorów, ponieważ komponenty mogą być renderowane wielokrotnie. Zamiast tego możemy skorzystać z [reactowego systemu zdarzeń](/docs/handling-events.html) i podpiąć detektor zdarzeń bezpośrednio na reactowym elemencie `<button>`:

```js{2,6,9}
function Button(props) {
  return <button onClick={props.onClick}>Przywitaj się</button>;
}

function HelloButton() {
  function handleClick() {
    alert('Cześć!');
  }
  return <Button onClick={handleClick} />;
}
```

[**Wypróbuj kod na CodePen**](https://codepen.io/gaearon/pen/RVKbvW?editors=1010)

Możesz napisać tyle odizolowanych od siebie komponentów, ile tylko zechcesz, a także renderować je do różnych kontenerów w drzewie DOM za pomocą funkcji `ReactDOM.createRoot()`. Stopniowo gdy będziesz przekształcać coraz więcej kodu aplikacji, niektóre z tych komponentów uda się połączyć w większe komponenty, a wywołania funkcji `ReactDOM.createRoot()` będzie można przenieść w górę hierarchii.

### Osadzanie kodu reactowego w widokach backbone'owych {#embedding-react-in-a-backbone-view}

Widoki biblioteki [Backbone](https://backbonejs.org/) (ang. _Backbone Views_), aby wygenerować zawartość dla swoich elementów DOM, zwykle korzystają z HTML-owych ciągów znaków lub funkcji generujących ciągi znaków. Również i ten proces można zastąpić renderowaniem komponentów reactowych.

W poniższym kodzie tworzymy widok backbone'owy o nazwie `ParagraphView`. Nadpisujemy w nim backbone'ową funkcję `render()`, w której do elementu DOM dostarczonego przez Backbone'a (`this.el`) renderujemy komponent reactowy `<Paragraph>`. Tutaj również korzystamy z funkcji [`ReactDOM.createRoot()`](/docs/react-dom-client.html#createroot):

```js{7,11,15}
function Paragraph(props) {
  return <p>{props.text}</p>;
}

const ParagraphView = Backbone.View.extend({
  initialize(options) {
    this.reactRoot = ReactDOM.createRoot(this.el);
  },
  render() {
    const text = this.model.get('text');
    this.reactRoot.render(<Paragraph text={text} />);
    return this;
  },
  remove() {
    this.reactRoot.unmount();
    Backbone.View.prototype.remove.call(this);
  }
});
```

[**Wypróbuj kod na CodePen**](https://codepen.io/gaearon/pen/gWgOYL?editors=0010)

Musimy również pamiętać o wywołaniu funkcji `root.unmount()` w metodzie `remove`, dzięki której React podczas odmontowywania usunie detektory zdarzeń i inne zasoby powiązane z drzewem komponentów.

Kiedy komponent jest usuwany _z wewnątrz_ drzewa Reacta, takie czyszczenie jest wykonywane automatycznie. Jednak ponieważ w tym przypadku ręcznie usuwamy całe drzewo, musimy jawnie wywołać tę metodę.

## Integracja z warstwami modeli {#integrating-with-model-layers}

Mimo iż ogólnie radzimy korzystać z jednokierunkowego przepływu danych, jak w przypadku [stanu reactowego](/docs/lifting-state-up.html), [Fluksa](https://facebook.github.io/flux/) czy [Reduksa](https://redux.js.org/), komponenty reactowe mogą zależeć od warstwy modelowej dostarczonej przez inne frameworki czy biblioteki.

### Korzystanie z modeli backbone'owych w komponentach reactowych {#using-backbone-models-in-react-components}

Najprostszym sposobem na skorzystanie z [backbone'owych](https://backbonejs.org/) modeli i kolekcji (ang. _Backbone Models and Collections_) wewnątrz komponentów reactowych jest nasłuchiwanie na różne zdarzenia i ręczne wymuszanie aktualizacji.

Komponenty odpowiedzialne za renderowanie modeli mogą nasłuchiwać na zdarzenia `'change'`, podczas gdy komponenty odpowiedzialne za renderowanie kolekcji mogą nasłuchiwać na zdarzenia `'add'` i `'remove'`. W obydwóch przypadkach należy wywołać metodę [`this.forceUpdate()`](/docs/react-component.html#forceupdate) w celu ponownego wyrenderowania komponentu z nowymi danymi.

W poniższym przykładzie komponent `List` renderuje kolekcję backbone'ową, a poszczególne elementy tej listy renderowane są przy użyciu komponentu `Item`.

```js{1,7-9,12,16,24,30-32,35,39,46}
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.forceUpdate();
  }

  componentDidMount() {
    this.props.model.on('change', this.handleChange);
  }

  componentWillUnmount() {
    this.props.model.off('change', this.handleChange);
  }

  render() {
    return <li>{this.props.model.get('text')}</li>;
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.forceUpdate();
  }

  componentDidMount() {
    this.props.collection.on('add', 'remove', this.handleChange);
  }

  componentWillUnmount() {
    this.props.collection.off('add', 'remove', this.handleChange);
  }

  render() {
    return (
      <ul>
        {this.props.collection.map(model => (
          <Item key={model.cid} model={model} />
        ))}
      </ul>
    );
  }
}
```

[**Wypróbuj kod na CodePen**](https://codepen.io/gaearon/pen/GmrREm?editors=0010)

### Pozyskiwanie danych z modeli backbone'owych {#extracting-data-from-backbone-models}

Powyższe podejście wymaga, aby twoje komponenty reactowe były świadome użycia w aplikacji modeli i kolekcji backbone'owych. Jeśli jednak masz w planach późniejszą migrację na inne rozwiązanie do zarządzania danymi, warto skupić wiedzę o Backbonie w jak najmniejszej liczbie miejsc w kodzie.

Można to zrobić obsługując wszelkie zmiany w jednym miejscu aplikacji i zapisując je w prostej formie. Można też używać [komponentu wyższego rzędu](/docs/higher-order-components.html), który pobiera wszystkie atrybuty modelu backbone'owego do stanu i przekazuje je do opakowywanego komponentu.

Dzięki temu tylko komponenty wyższego rzędu muszą umieć korzystać z modeli backbone'owych, natomiast pozostała część aplikacji może działać bez tej wiedzy.

W poniższym przykładzie stworzymy kopię atrybutów modelu i dodamy ją do wewnętrznego stanu komponentu. Zasubskrybujemy się także na zdarzenie `change` (i usuniemy detektor przy odmontowywaniu) i podczas zmiany danych będziemy uzupełniać stan na podstawie aktualnych danych z modelu. Wreszcie upewnimy się, że każda zmiana właściwości `model` spowoduje usunięcie subskrypcji ze starego modelu i podpięcie się na zmiany nowego.

Zwróć uwagę, że ten przykład nie uwzględnia wszystkich sposobów interakcji z Backbonem, jednak powinien wystarczyć do zobrazowania sposobu, w jaki należy stworzyć docelowy mechanizm:

```js{1,5,10,14,16,17,22,26,32}
function connectToBackboneModel(WrappedComponent) {
  return class BackboneComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = Object.assign({}, props.model.attributes);
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
      this.props.model.on('change', this.handleChange);
    }

    componentWillReceiveProps(nextProps) {
      this.setState(Object.assign({}, nextProps.model.attributes));
      if (nextProps.model !== this.props.model) {
        this.props.model.off('change', this.handleChange);
        nextProps.model.on('change', this.handleChange);
      }
    }

    componentWillUnmount() {
      this.props.model.off('change', this.handleChange);
    }

    handleChange(model) {
      this.setState(model.changedAttributes());
    }

    render() {
      const propsExceptModel = Object.assign({}, this.props);
      delete propsExceptModel.model;
      return <WrappedComponent {...propsExceptModel} {...this.state} />;
    }
  }
}
```

Aby pokazać sposób użycia powyższego kodu, połączymy komponent reactowy `NameInput` z modelem backbone'owym i będziemy aktualizować jego atrybut `firstName` przy każdej zmianie wartości pola formularza:

```js{4,6,11,15,19-21}
function NameInput(props) {
  return (
    <p>
      <input value={props.firstName} onChange={props.handleChange} />
      <br />
      Nazywam się {props.firstName}.
    </p>
  );
}

const BackboneNameInput = connectToBackboneModel(NameInput);

function Example(props) {
  function handleChange(e) {
    props.model.set('firstName', e.target.value);
  }

  return (
    <BackboneNameInput
      model={props.model}
      handleChange={handleChange}
    />
  );
}

const model = new Backbone.Model({ firstName: 'Staszek' });
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Example model={model} />);
```

[**Wypróbuj kod na CodePen**](https://codepen.io/gaearon/pen/PmWwwa?editors=0010)

Ta technika nie jest ograniczona tylko do Backbone'a. Z Reactem możesz używać dowolnej biblioteki modelowej. Wystarczy zasubskrybować się na zmiany w metodach cyklu życia komponentu i, ewentualnie, kopiować dane do lokalnego stanu reactowego.
