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

Komponent potrzebuje własnego stanu (`state`), gdy powiązane z nim dane zmieniają się w czasie. Na przykład, komponent `Checkbox` w zmiennej `isChecked` mógłby śledzić, czy jest zaznaczony, a komponent `NewsFeed` mógłby przechowywać pobrane posty w `fetchedPosts`.

Najistotniejszą różnicą pomiędzy `state` i `props` jest to, że właściwości `props` są dostarczane przez komponent nadrzędny, a stanem `state` zarządza sam komponent. Komponent nie może modyfikować swoich właściwości `props`, ale może zmieniać swój stan `state`.

Dla każdego fragmentu danych zmieniających się w czasie powinien istnieć tylko jeden komponent, które taki stan "posiada" na wyłączność. Nie próbuj synchronizować stanów dwóch komponentów. Zamiast tego [wynieś stan w górę](/docs/lifting-state-up.html) do najbliższego przodka i z niego przekaż stan w dół za pomocą właściwości `props`.

## [Metody cyklu życia](/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class) {#lifecycle-methods}

Metody cyklu życia to specjalne funkcje uruchamiane w trakcie różnych faz życia komponentu. Istnieją takie, które uruchamiane są podczas tworzenia komponentu i wstawiania go do drzewa DOM (tzw. [montowanie](/docs/react-component.html#mounting)), inne gdy komponent jest aktualizowany, a jeszcze inne gdy jest odmontowywany lub usuwany z drzewa DOM.

 ## [Kontrolowane](/docs/forms.html#controlled-components) vs. [niekontrolowane komponenty](/docs/uncontrolled-components.html)

React zapewnia dwa różne podejścia do obsługi pól formularza.

Pole formularza, którego wartością zarządza React, jest nazywane *komponentem kontrolowanym*. Gdy użytkownik wprowadzi do niego dane, wywoływana jest odpowiednia procedura obsługi zdarzenia i to twój kod decyduje, czy wartość jest poprawna (poprzez ponowne wyrenderowanie z nową wartością). Jeśli samodzielnie nie wyrenderujesz ponownie danego pola, nie zmieni się ono na ekranie.

Z kolej *komponent niekontrolowany* działa tak, jak wszystkie pola formularza istniejące poza Reactem. Gdy użytkownik wprowadzi do takiego pola (np. pola tekstowego, pola wyboru itp.), zmiana jego wartości następuje automatycznie, bez konieczności obsługiwania tego w kodzie Reactowym. Oznacza to również, że nie możesz wymusić określonej wartości pola.

W większości przypadków zalecamy korzystanie z komponentów kontrolowanych.

## [Klucze](/docs/lists-and-keys.html) {#keys}

Klucz `key` to specjalny atrybut tekstowy, wymagany przy tworzeniu tablic elementów. Klucze pozwalają Reactowi zidentyfikować, które elementy listy zostały zmienione, dodane bądź usunięte. Służą również do nadania elementom tablicy stabilnego identyfikatora.

Klucze muszą być unikalne tylko pośród "rodzeństwa" z tej samej tablicy, lecz mogą się powtarzać w ramach całej aplikacji czy nawet wewnątrz tego samego komponentu.

Do określania kluczy nie używaj wartości typu `Math.random()`. Ważne jest, by klucze były "stabilnymi identyfikatorami" w kolejnych renderowaniach. Dzięki temu React może wykryć, które elementy zostały dodane, usunięte lub zmieniły kolejność. Najlepiej nadają się do tego unikalne, stabilne identifykatory pochodzące z danych, np. `post.id`.

## [Referencje `ref`](/docs/refs-and-the-dom.html) {#refs}

React wspiera specjalny atrybut, którego można użyć na dowolnym komponencie. Atrybut `ref` może być obiektem utworzonym przy użyciu [`funkcji React.createRef()`](/docs/react-api.html#reactcreateref), dowolną funkcją zwrotną lub ciągiem znaków (w starym API). Gdy `ref` jest funkcją zwrotną, jest ona wywoływana jednym argumentem: elementem DOM odpowiadającym komponentowi lub instancją klasy (w zależności od typu komponentu). Pozwala to na bezpośredni dostęp do API elementu DOM lub instancji klasy.

Z referencji korzystaj sporadycznie. Jeśli zauważysz, że używasz ich dość często do sprawienia, żeby "coś zaczęło działać", sugerujemy zapoznać się z [przepływem danych z góry na dół](/docs/lifting-state-up.html).

## [Zdarzenia](/docs/handling-events.html) {#events}

Obsługa zdarzeń w elementach reactowych ma kilka różnic składniowych:

* Nazwy procedur obsługi zdarzeń używają konwencji camelCase, a nie są pisane małymi literami.
* W składni JSX procedury obsługi zdarzeń przekazuje się jako funkcje, a nie jako ciągi znaków.

## [Rekoncyliacja](/docs/reconciliation.html) {#reconciliation}

When a component's props or state change, React decides whether an actual DOM update is necessary by comparing the newly returned element with the previously rendered one. When they are not equal, React will update the DOM. This process is called "reconciliation".
