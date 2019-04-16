---
id: glossary
title: Słownik terminów reactowych
layout: docs
category: Reference
permalink: docs/glossary.html

---

## Aplikacja jednostronicowa {#single-page-application}

Aplikacja jednostronicowa to taka, która wczytuje pojedynczą stronę HTML i wszystkie zasoby (takie jak JavaScript czy CSS) potrzebne do uruchomienia aplikacji. Wszelkie interakcje ze stroną i poszczególnymi podstronami nie wymagają ponownego łączenia z serwerem, co oznacza, że strona nie jest przeładowywana.

Pomimo tego, że aplikacje jednostronicowe można tworzyć za pomocą Reacta, nie jest on do tego konieczny. React może posłużyć do wzbogacania niewielkich fragmentów istniejących stron o dodatkową interaktywność. Napisany kod reactowy może z powodzeniem działać razem z kodem wygenerowanym po stronie serwera np. w PHP, lub innymi bibliotekami klienckimi. Prawdę mówiąc, właśnie w ten sposób React jest używany w Facebooku.

## ES6, ES2015, ES2016 itp. {#es6-es2015-es2016-etc}

Skróty te odnoszą się do najnowszych wersji standardu specyfikacji języka ECMAScript, którego implementacją jest język JavaScript. Wersja ES6 (znana również jako ES2015) zawiera wiele dodatkowych mechanizmów, jak np. funkcje strzałkowe, klasy, literały szablonowe, a także wyrażenia `let` oraz `const`. Po więcej informacji na temat poszczególnych wersji sięgnij do [Wikipedii](https://en.wikipedia.org/wiki/ECMAScript#Versions).

## Kompilatory {#compilers}

Kompilator javascriptowy wczytuje kod javascriptowy, przekształca go i zwraca go w innym formacie. Najczęściej stosuje się go przekształcania składni ES6 w kod zrozumiały dla starszych przeglądarek. [Babel](https://babeljs.io/) jest najbardziej powszechnym kompilatorem używanym wraz z Reactem.

## Bundlery {#bundlers}

Bundlery wczytują kod JavaScript i CSS, napisany w formie odrębnych modułów (często liczonych w setkach) i łączą je w kilka plików zoptymalizowanych pod przeglądarki. W środowisku reactowym do najczęściej używanych bundlerów zaliczane są [Webpack](https://webpack.js.org/) oraz [Browserify](http://browserify.org/).

## Menedżery pakietów {#package-managers}

Menedżery pakietów to narzędzia pozwalające zarządzać zależnościami projektu. W aplikacjach reactowych najczęściej używane są [npm](https://www.npmjs.com/) oraz [Yarn](https://yarnpkg.com/), przy czym obydwa są klientami tego samego rejestru pakietów npm.

## CDN {#cdn}

CDN to skrót od Content Delivery Network (pol. *sieć dostarczania zawartości*). CDN-y dostarczają statyczną zawartość przechowywaną w pamięci podręcznej poprzez sieć serwerów rozproszonych po całej kuli ziemskiej.

## JSX {#jsx}

JSX jest rozszerzeniem składni JavaScript. Przypomina języki szablonów, jednak posiada pełną moc JavaScriptu. Kod napisany w JSX jest kompilowany do wywołań funkcji `React.createElement()`, które zwracają obiekty javascriptowe zwane "elementami reactowymi". Aby dowiedzieć się więcej, przeczytaj [wstęp do składni JSX](/docs/introducing-jsx.html) lub [szczegółowy samouczek](/docs/jsx-in-depth.html).

React DOM do nazywania właściwości używa konwencji camelCase zamiast nazw atrybutów HTML. Na przykład, `tabindex` jest zapisywany w składni JSX jako `tabIndex`. Z kolei atrybut `class` piszemy jako `className` ze względu na fakt, iż `class` jest w JavaScripcie zarezerwowanym słowem kluczowym:

```js
const name = 'Klementyna';
ReactDOM.render(
  <h1 className="hello">Mam na imię {name}!</h1>,
  document.getElementById('root')
);
```  

## [Elementy](/docs/rendering-elements.html) {#elements}

Elementy reactowe są częściami składowymi aplikacji pisanych za pomocą Reacta. Nietrudno pomylić je z szerzej znanym pojęciem "komponentów". Element opisuje to, co zostanie wyświetlone na ekranie. Elementy reactowe są niezmienne (ang. *immutable*).

```js
const element = <h1>Witaj, świecie</h1>;
```

Zazwyczaj jednak elementów nie używa się bezpośrednio jako wartości, lecz zwraca w komponentach.

## [Komponenty](/docs/components-and-props.html) {#components}

Komponenty reactowe są niewielkimi kawałkami kodu, często wielokrotnego użytku, które zwracają element reactowy, który ma zostać wyrenderowany na stronie. Najprostszym wariantem reactowego komponentu jest javascriptowa funkcja, która zwraca element reactowy.:

```js
function Welcome(props) {
  return <h1>Witaj, {props.name}</h1>;
}
```

Komponenty mogą także być klasami ze standardu ES6:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Witaj, {this.props.name}</h1>;
  }
}
```

Komponenty można podzielić na unikalne fragmenty funkcjonalności, a następnie używać wewnątrz innych komponentów. Komponenty mogą zwracać inne komponenty, ale także tablice, napisy czy liczby. Należy kierować się zasadą, że jeśli jakiś fragment interfejsu użytkownika jest używany wielokrotnie (np. przycisk, panel, awatar) lub sam w sobie jest dość złożony (np. aplikacja, news, komentarz), staje się odpowiednim kandydatem do bycia komponentem wielokrotnego użytku. Nazwy komponentów powinny zaczynać się od wielkiej litery (`<Wrapper/>`, a **nie** `<wrapper/>`). Po więcej informacji sięgnij do [dokumentacji dotyczącej renderowania komponentów](/docs/components-and-props.html#rendering-a-component). 

### [`props`](/docs/components-and-props.html) {#props}

`props` (od ang. *properties* = pol. *właściwości*) są danymi wejściowymi dla reactowych komponentów. Przekazuje się je z komponentów nadrzędnych do ich potomków.

Pamiętaj, że właściwości `props` są tylko do odczytu. Nie należy ich w jakikolwiek sposób modyfikować:

```js
// Źle!
props.number = 42;
```

Jeśli potrzebujesz zmienić którąś wartość w odpowiedzi na akcję użytkownika lub zapytanie do serwera, skorzystaj ze `stanu`.

### `props.children` {#propschildren}

Właściwość `props.children` jest dostępna w każdym komponencie. Zawiera wszystko, co znajdzie się między znacznikiem otwierającym i zamykającym danego komponentu, na przykład:

```js
<Welcome>Witaj, świecie!</Welcome>
```

Napis `Witaj, świecie!` znajdzie się we właściwości `props.children` komponentu `Welcome`:

```js
function Welcome(props) {
  return <p>{props.children}</p>;
}
```

W przypadku komponentów zdefiniowanych jako klasy należy skorzystać z `this.props.children`:

```js
class Welcome extends React.Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}
```

### [`state`](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) {#state}

A component needs `state` when some data associated with it changes over time. For example, a `Checkbox` component might need `isChecked` in its state, and a `NewsFeed` component might want to keep track of `fetchedPosts` in its state.

The most important difference between `state` and `props` is that `props` are passed from a parent component, but `state` is managed by the component itself. A component cannot change its `props`, but it can change its `state`.

For each particular piece of changing data, there should be just one component that "owns" it in its state. Don't try to synchronize states of two different components. Instead, [lift it up](/docs/lifting-state-up.html) to their closest shared ancestor, and pass it down as props to both of them.

## [Lifecycle Methods](/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class) {#lifecycle-methods}

Lifecycle methods are custom functionality that gets executed during the different phases of a component. There are methods available when the component gets created and inserted into the DOM ([mounting](/docs/react-component.html#mounting)), when the component updates, and when the component gets unmounted or removed from the DOM.

 ## [Controlled](/docs/forms.html#controlled-components) vs. [Uncontrolled Components](/docs/uncontrolled-components.html)

React has two different approaches to dealing with form inputs. 

An input form element whose value is controlled by React is called a *controlled component*. When a user enters data into a controlled component a change event handler is triggered and your code decides whether the input is valid (by re-rendering with the updated value). If you do not re-render then the form element will remain unchanged.

An *uncontrolled component* works like form elements do outside of React. When a user inputs data into a form field (an input box, dropdown, etc) the updated information is reflected without React needing to do anything. However, this also means that you can't force the field to have a certain value.

In most cases you should use controlled components.

## [Keys](/docs/lists-and-keys.html) {#keys}

A "key" is a special string attribute you need to include when creating arrays of elements. Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside an array to give the elements a stable identity.

Keys only need to be unique among sibling elements in the same array. They don't need to be unique across the whole application or even a single component.

Don't pass something like `Math.random()` to keys. It is important that keys have a "stable identity" across re-renders so that React can determine when items are added, removed, or re-ordered. Ideally, keys should correspond to unique and stable identifiers coming from your data, such as `post.id`.

## [Refs](/docs/refs-and-the-dom.html) {#refs}

React supports a special attribute that you can attach to any component. The `ref` attribute can be an object created by [`React.createRef()` function](/docs/react-api.html#reactcreateref) or a callback function, or a string (in legacy API). When the `ref` attribute is a callback function, the function receives the underlying DOM element or class instance (depending on the type of element) as its argument. This allows you to have direct access to the DOM element or component instance.

Use refs sparingly. If you find yourself often using refs to "make things happen" in your app, consider getting more familiar with [top-down data flow](/docs/lifting-state-up.html).

## [Events](/docs/handling-events.html) {#events}

Handling events with React elements has some syntactic differences:

* React event handlers are named using camelCase, rather than lowercase.
* With JSX you pass a function as the event handler, rather than a string.

## [Reconciliation](/docs/reconciliation.html) {#reconciliation}

When a component's props or state change, React decides whether an actual DOM update is necessary by comparing the newly returned element with the previously rendered one. When they are not equal, React will update the DOM. This process is called "reconciliation".
