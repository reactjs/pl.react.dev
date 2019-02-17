---
id: tutorial
title: "Samouczek: Wstęp do Reacta"
layout: tutorial
sectionid: tutorial
permalink: tutorial/tutorial.html
redirect_from:
  - "docs/tutorial.html"
  - "docs/why-react.html"
  - "docs/tutorial-ja-JP.html"
  - "docs/tutorial-ko-KR.html"
  - "docs/tutorial-zh-CN.html"
---

Ten samouczek nie zakłada jakiejkolwiek znajomości Reacta.

## Zanim zaczniemy się uczyć {#before-we-start-the-tutorial}

W tym samouczku skupimy się na stworzeniu niewielkiej gry. **Być może po tym zdaniu zechcesz go pominąć, bo nie zajmujesz się pisaniem gier - ale daj mu szansę**. Techniki, które tu poznasz, są fundamentem do zbudowania dowolnej aplikacji w Reakcie, a wyćwiczenie ich pozwoli Ci dogłębnie zrozumieć tajniki tej biblioteki.

>Wskazówka
>
>Ten samouczek jest przeznaczony dla osób, które wolą **uczyć się poprzez praktykę**. Jeśli wolisz pouczyć się zagadnień od podstaw, zajrzyj do naszego [poradnika krok po kroku](/docs/hello-world.html). Wiedz jednak, że ten samouczek oraz tamten poradnik nawzajem się uzupełniają.

Samouczek podzieliliśmy na kilka części:

* [Przygotowanie i konfiguracja](#setup-for-the-tutorial) opisuje, **jak rozpocząć**, aby być w stanie wykonywać dalsze kroki.
* [Przegląd](#overview) zawiera informacje o **podstawach** Reacta: komponentach, atrybutach i stanie.
* [Dokończenie gry](#completing-the-game) pokazuje **najczęstsze techniki** programowania w Reakcie.
* [Dodanie wehikułu czasu](#adding-time-travel) pozwala **dogłębnie zrozumieć** mocne strony Reacta.

Nie musisz wcale przechodzić przez wszystkie części samouczka naraz, żeby wynieść z cokolwiek. Spróbuj jednak dojść najdalej jak możesz - nawet jeśli będą to tylko dwa rozdziały.

W trakcie wykonywania poleceń możesz kopiować kod do edytora, ale zalecamy pisać go samodzielnie. Pozwoli Ci to wyrobić pamięć mięśniową i lepiej zrozumieć temat.

### Co będziemy budować? {#what-are-we-building}

W tym samouczku pokażemy, jak przy pomocy Reacta zbudować interaktywną grę w "kółko i krzyżyk".

Na koniec nasz kod będzie wyglądał tak: **[Efekt końcowy](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**. Kod wygląda bez sensu albo nie rozumiesz jego składni? Bez obaw! Celem tego samouczka jest właśnie pomóc Ci zrozumieć Reacta i jego składnie.

Przed dalszą lekturą radzimy uruchomić grę w "kółko i krzyżyk". Jedną z funkcjonalności, znajdującą się na prawo od planszy, jest numerowana lista. Służy ona do wyświetlania historii wszystkich ruchów, jakie wykonano podczas rozgrywki, i jest aktualizowana na bieżąco.

Gdy już zapoznasz się z grą, możesz ją wyłączyć. Naukę rozpoczniemy od prostego szablonu. Naszym następnym krokiem będzie konfiguracja środowiska, aby nadawało się do stworzenia gry.

### Wymagania {#prerequisites}

Zakładamy, że HTML i JavaScript nie są Ci obce, ale nawet jeśli to Twoja pierwsza styczność z tymi językami, to samouczek nie powinien przysporzyć Ci większego problemu. Zakładamy również, że znasz takie pojęcia z programowania obiektowego jak "funkcja", "obiekt" czy "tablica", a także przynajmniej w niewielkim stopniu rozumiesz, czym jest "klasa".

Jeśli potrzebujesz odświeżyć sobie wiedzę o JavaScripcie, zalecamy lekturę [tego poradnika](https://developer.mozilla.org/pl/docs/Web/JavaScript/Ponowne_wprowadzenie_do_JavaScript). Zwróć uwagę, że będziemy tu korzystać z niektórych funkcjonalności standardu ES6 - jednej z ostatnich wersji języka JavaScript - takich jak [funkcje strzałkowe](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Functions/Funkcje_strzalkowe) (ang. *arrow functions*), [klasy](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Classes) oraz wyrażenia [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) i [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const). Możesz skorzystać ze środowiska [Babel REPL](babel://es5-syntax-example), aby sprawdzić, co powstanie w wyniku transpilowania kodu napisanego w standardzie ES6.

## Konfiguracja pod samouczek {#setup-for-the-tutorial}

Istnieją dwa sposoby na ukończenie tego samouczka: możesz pisać kod w przeglądarce lub możesz zestawić lokalne środowisko na swoim komputerze.

### Opcja konfiguracyjna nr 1: Pisanie kodu w przeglądarce {#setup-option-1-write-code-in-the-browser}

To zdecydowanie najszybszy sposób!

Na początek otwórz w nowej karcie **[Szablon startowy](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)**. Twoim oczom powinna ukazać się pusta plansza do gry w "kółko i krzyżyk" oraz panel z kodem reactowym. W tym samouczku będziemy edytować kod w tymże panelu.

Możesz teraz pominąć opcję nr 2 i przejść do rozdziału pt. ["Przegląd"](#overview), w którym przedstawiliśmy ogólne informacje o Reakcie.

### Opcja konfiguracyjna nr 2: Lokalne środowisko programistyczne {#setup-option-2-local-development-environment}

Ten sposób jest całkowicie opcjonalny i nie jest konieczny do ukończenia tego samouczka!

<br>

<details>

<summary><b>Opcjonalne: Instrukcje na temat pisania kodu w wybranym przez siebie edytorze tekstu</b></summary>

Ta konfiguracja wymaga więcej wysiłku, lecz pozwala na ukończenie samouczka przy użyciu wybranego przez siebie edytora. Należy kolejno:

1. Sprawdzić, czy posiada się najnowszą wersję [Node.js](https://nodejs.org/en/).
2. Wykonać [instrukcje instalacji "Create React App"](/docs/create-a-new-react-app.html#create-react-app) w celu zainicjalizowania nowego projektu.

```bash
npx create-react-app moja-aplikacja
```

3. Usunąć wszystkie pliki z folderu `src/` w nowo utworzonym projekcie

> Uwaga:
>
>**Nie usuwaj całego folderu `src`, tylko znajdujące się wewnątrz pliki.** W następnym kroku podmienimy domyślne pliki źródłowe przykładami z samouczka.

```bash
cd moja-aplikacja
cd src

# Jeśli używasz Maca lub Linuxa, wpisz:
rm -f *

# Lub jeśli używasz Windowsa:
del *

# A następnie cofnij się do folderu z projektem
cd ..
```

4. W folderze `src/` dodaj plik o nazwie `index.css` i wstaw do niego [ten kod CSS](https://codepen.io/gaearon/pen/oWWQNa?editors=0100).

5. W folderze `src/` dodaj plik `index.js` i wstaw do niego [ten kod JS](https://codepen.io/gaearon/pen/oWWQNa?editors=0010).

6. Wstaw te trzy linie na początku pliku `index.js` znajdującego się w folderze `/src/`:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
```

Teraz, gdy w folderze z projektem wykonasz polecenie `npm start`, a następnie wpiszesz w przeglądarce adres `http://localhost:3000`, na ekranie powinna pojawić się pusta plansza do gry w "kółko i krzyżyk".

Zalecamy wykonanie [tych instrukcji](https://babeljs.io/docs/editors/) w celu skonfigurowania narzędzia do podświetlania składni w Twoim edytorze tekstu.

</details>

### Pomocy, nie wiem, co robić! {#help-im-stuck}

Jeśli w którymś momencie się zgubisz, przejrzyj [listę źródeł wsparcia od społeczności](/community/support.html). Zwłaszcza [Reactiflux Chat](https://discord.gg/0ZcbPKXt5bZjGY5n) jest znany z szybkiego udzielania pomocy. Jeśli mimo wszystko nie otrzymasz odpowiedzi lub nadal masz z czymś problem, zgłoś nam to, a spróbujemy Ci jakoś pomóc.

## Przegląd {#overview}

Teraz, gdy już masz wszystko skonfigurowane, czas dowiedzieć się czegoś o Reakcie!

### Czym jest React? {#what-is-react}

React jest deklaratywną, skuteczną i elastyczną biblioteką javascriptową do budowania interfejsów użytkownika. Pozwala na zbudowanie skomplikowanego UI przy użyciu małych i odizolowanych od siebie kawałków kodu, zwanych "komponentami".

React rozróżnia kilka rodzajów komponentów, lecz zacznijmy od klas dziedziczących po `React.Component`:

```javascript
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>{this.props.name} - lista zakupów</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// Przykład użycia: <ShoppingList name="Marek" />
```

Do tych śmiesznych znaczników XML-owych wrócimy za chwilę. Komponenty pozwalają wytłumaczyć Reactowi, co chcemy ujrzeć na ekranie. Gdy zmienią się nasze dane, React w sposób efektywny zaktualizuje i ponownie wyrenderuje komponenty.

W powyższym przykładzie `ShoppingList` jest **reactowym komponentem klasowym**. Na wejściu komponent przyjmuje parametry, nazywane "atrybutami" (ang. *props*, skrót od *properties*), i przy pomocy metody `render` zwraca strukturę widoków do wyświetlenia.

Metoda `render` zwraca *opis* tego, co zostanie wyświetlone na ekranie. React bierze ten opis i wyświetla jego wynik końcowy. Precyzyjniej rzecz ujmując, metoda `render` zwraca **element reactowy**, który jest lekką reprezentacją tego, co zostanie wyświetlone na ekranie. Większość programistów reactowych używa specjalnej składni zwanej "JSX", która ułatwia pisanie wspomnianych struktur. Składnia `<div />` jest przekształcana podczas budowania w kod: `React.createElement('div')`. Zatem powyższy przykład jest równoznaczny z:

```javascript
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('ul', /* ... ul children ... */)
);
```

[Zobacz cały kod](babel://tutorial-expanded-version)

Jeśli zżera Cię ciekawość, opis funkcji `createElement()` znajdziesz w [dokumentacji API](/docs/react-api.html#createelement), lecz w tym samouczku nie będziemy jej używać. Zamiast tego skorzystamy ze składni JSX.

Składnia JSX posiada pełną moc JavaScriptu. Między klamry możesz wstawić *dowolny* kod javascriptowy. Każdy element reactowy jest obiektem, który można zapisać do zmiennej i przekazywać dowolnie w swoim programie.

Powyższy komponent `ShoppingList` wyrenderuje jedynie wbudowane komponenty znane z drzewa DOM, jak `<div />` czy `<li />`. Ale równie dobrze możesz wyrenderować w nim inny własny komponent. Na przykład, do całej listy zakupów (ang. *shopping list*) można odwołać się pisząc `<ShoppingList />`. Każdy komponent w Reakcie jest enkapsulowany (ang. *encapsulated*) i może działać niezależnie; pozwala to na budowanie skomplikowanych interfejsów użytkownika przy użyciu prostych komponentów.

## Analizowanie szablonu startowego {#inspecting-the-starter-code}

Jeśli zamierzasz przejść przez ten samouczek **w przeglądarce**, otwórz ten link w nowej karcie: **[Szablon startowy](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)**. Jeśli zamierzasz pracować **lokalnie**, zamiast tego otwórz plik `src/index.js`, znajdujący się w folderze z projektem (jego tworzenie opisywaliśmy w rozdziale pt. ["Konfiguracja pod samouczek"](#setup-option-2-local-development-environment)).

Wspomniany "szablon startowy" będzie bazą dla naszej aplikacji. Dodaliśmy już do niego style CSS, więc teraz wystarczy, że skupisz się na nauce Reacta i implementowaniu gry w "kółko i krzyżyk".

Analizując kod, łatwo zauważyć, że mamy do czynienia z trzema komponentami reactowymi:

* Square (pole)
* Board (plansza)
* Game (gra)

Komponent `Square` (pole) renderuje pojedynczy element `<button>`, a `Board` (plansza) renderuje 9 takich pól. Z kolei komponent `Game` (gra) renderuje planszę wypełnioną symbolami zastępczymi, które zmodyfikujemy w późniejszym etapie. Aplikacja w obecnym stanie nie posiada żadnej interaktywności.

### Przekazywanie danych przez atrybuty {#passing-data-through-props}

Na dobry początek, spróbujmy przekazać jakieś dane z komponentu `Board` do `Square`.

W metodzie `renderSquare` komponentu `Board` przekaż komponentowi `Square` atrybut o nazwie `value`:

```js{3}
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
```

Teraz zmodyfikuj metodę `render` komponentu `Square` tak, by wyświetlała tę wartość. Wystarczy, że zamienisz `{/* TODO */}` na `{this.props.value}`:

```js{5}
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}
```

Przed zmianą:

![React Devtools](../images/tutorial/tictac-empty.png)

Po zmianie: W każdym wyrenderowanym polu powinien być wyświetlany kolejny numer.

![React Devtools](../images/tutorial/tictac-numbers.png)

**[Zobacz dotychczasowy kod](https://codepen.io/gaearon/pen/aWWQOG?editors=0010)**

Gratulacje! Właśnie udało Ci się "przekazać atrybut" z komponentu nadrzędnego `Board` do komponentu potomnego `Square`. Przekazywanie atrybutów to jeden ze sposobów na przepływ danych między rodzicem a dzieckiem w drzewie.

### Tworzenie interaktywnego komponentu {#making-an-interactive-component}

Niech teraz komponent `Square` wypełnia się literą "X" po kliknięciu w niego.
Najpierw dokonaj zmian w elemencie `<button />` zwracanym przez `Square` w metodzie `render()`:

```javascript{4}
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={function() { alert('klik'); }}>
        {this.props.value}
      </button>
    );
  }
}
```

Teraz gdy klikniemy na polu, przeglądarka powinna wyświetlić wiadomość w oknie dialogowym.

>Uwaga
>
>Żeby oszczędzić sobie pisania i zapobiec [mylącemu zachowaniu `this`](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/), od teraz obsługę zdarzeń będziemy zapisywać za pomocą [funkcji strzałkowych](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Functions/Funkcje_strzalkowe) (ang. *arrow functions*):
>
>```javascript{4}
>class Square extends React.Component {
>  render() {
>    return (
>      <button className="square" onClick={() => alert('klik')}>
>        {this.props.value}
>      </button>
>    );
>  }
>}
>```
>
>Zauważ, że za pomocą `onClick={() => alert('klik')}` pod atrybutem `onClick` przekazujemy *funkcję*. Zostanie ona wywołana dopiero po kliknięciu w przycisk. Częstym błędem jest zapominanie o `() =>` i pisanie `onClick={alert('klik')}`, co powoduje wyświetlenie wiadomości w momencie renderowania komponentu.

W następnym kroku sprawimy, by komponent `Square` "pamiętał", że został kliknięty, i wyświetlał literę "X". Do "pamiętania" rzeczy komponenty używają **stanu**.

Komponenty w Reakcie można wyposażyć w stan, przypisując w konstruktorze wartość do właściwości klasy `this.state`. Właściwość `this.state` powinna być traktowana jako prywatna, dostępna tylko dla komponentu, w którym została zdefiniowana. Przypiszmy więc aktualną wartość przycisku do `this.state` i nadpisujmy ją przy kliknięciu.

Najpierw musimy dodać konstruktor do klasy, aby móc zainicjalizować stan:

```javascript{2-7}
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => alert('klik')}>
        {this.props.value}
      </button>
    );
  }
}
```

>Uwaga
>
>W [klasach javascriptowych](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Classes) należy zawsze wywoływać specjalną metodę `super` w konstruktorze klasy potomnej. Dlatego wszystkie komponenty reactowe będące klasą, która mają zdefiniowany konstruktor powinny w nim na początku wywoływać `super(props)`.

Teraz zmienimy kod w metodzie `render` komponentu `Square` tak, aby wyświetlał po kliknięciu wartość aktualnego stanu:

* Zamień `this.props.value` na `this.state.value` wewnątrz znacznika `<button>`.
* Zamień uchwyt zdarzenia `() => alert()` na `() => this.setState({value: 'X'})`.
* Umieść atrybuty `className` i `onClick` w osobnych liniach dla poprawy czytelności kodu.

Po powyższych zmianach znacznik `<button>`, zwracany przez komponent `Square`, powinien wyglądać następująco:

```javascript{12-13,15}
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({value: 'X'})}
      >
        {this.state.value}
      </button>
    );
  }
}
```

Wywołując `this.setState` z wnętrza uchwytu dla zdarzenia `onClick` w metodzie `render`, mówimy Reactowi, aby ponownie wyrenderował element `<button>` po każdym kliknięciu. Po aktualizacji wartość zmiennej `this.state.value` będzie równa `"X"`, dlatego też `X` zostanie wyświetlone na planszy. Kliknięcie na dowolne pole powinno spowodować wyświetlenie w nim litery "X".

Gdy w komponencie wywołujesz `setState`, React automatycznie aktualizuje również wszystkie komponenty poniżej w hierarchii.

**[Zobacz dotychczasowy kod](https://codepen.io/gaearon/pen/VbbVLg?editors=0010)**

### Narzędzia deweloperskie {#developer-tools}

Rozszerzenie o nazwie "React Devtools" dla przeglądarek [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=pl) i [Firefox](https://addons.mozilla.org/pl/firefox/addon/react-devtools/) pozwala na zbadanie drzewa komponentów reactowych za pomocą narzędzi deweloperskich wbudowanych w przeglądarkę.

<img src="../images/tutorial/devtools.png" alt="React Devtools" style="max-width: 100%">

Dzięki temu rozszerzeniu możesz podejrzeć atrybuty i stan dowolnego komponentu w drzewie.

Po zainstalowaniu rozszerzenia wystarczy, że klikniesz prawym przyciskiem myszy na dowolnym elemencie strony i wybierzesz z menu "Zbadaj". W pasku zakładek, jako ostatnia po prawej, powinna pojawić się zakładka "React".

**Jeśli korzystasz z CodePen, potrzebne będą dodatkowe czynności:**

1. Zaloguj się lub zarejestruj i potwierdź swój adres e-mail (wymagane w celach antyspamowych).
2. Kliknij na przycisk "Fork".
3. Kliknij na "Change View" i wybierz "Debug mode".
4. W nowej karcie otworzą się narzędzia deweloperskie z dodatkową zakładką "React".

## Dokończenie gry {#completing-the-game}

Zbudowaliśmy solidne fundamenty pod grę w "kółko i krzyżyk". Zostało nam jeszcze umożliwienie graczom wykonywanie ruchów na przemian ("X" lub "O"), a także określenie sposobu wybierania zwycięzcy.

### Wyciąganie stanu w górę {#lifting-state-up}

W obecnej wersji aplikacji każdy z komponentów `Square` decyduje o własnym stanie. Jednak do rozstrzygnięcia gry potrzebny nam będzie jeden wspólny stan, przechowujący wartości dla wszystkich 9 pól na planszy.

Być może przeszło Ci przez myśl, że to komponent `Board` powinien "pytać" każdy z komponentów `Square` o jego stan. Nawet jeśli jest to możliwe w Reakcie, odradzamy takiego podejścia, ponieważ kod stanie się wtedy bardziej zagmatwany, podatny na błędy i trudny w utrzymaniu. Zamiast tego należy przenieść stan całej planszy do komponentu nadrzędnego - `Board`. Komponent ten będzie mówił każdemu z komponentów `Square`, co mają wyrenderować, poprzez atrybuty - podobnie jak w jednym z poprzednim rozdziałów, gdzie [przekazywaliśmy kolejne numery do komponentów `Square`](#passing-data-through-props).

**Aby móc zebrać dane z wielu komponentów potomnych lub umożliwić dwóm potomkom komunikowanie się ze sobą, należy zadeklarować ich wspólny stan w rodzicu. Taki rodzic może przekazać poszczególne wartości potomkom poprzez atrybuty; dzięki temu potomkowie są zsynchronizowani zarówno ze sobą nawzajem, jak i z rodzicem.**

Wynoszenie stanu w górę struktury jest dość częste podczas refaktoryzacji (ang. *refactoring*) kodu. Wykorzystajmy zatem okazję do wypróbowania tego schematu. Dodajmy konstruktor do komponentu `Board` i ustawmy w nim stan przechowujący tablicę 9 wartości `null`. Każdy z elementów tej tablicy będzie odpowiadał jednemu polu na planszy:

```javascript{2-7}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Następny gracz: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

Gdy później wypełnimy planszę wartościami, tablica będzie wyglądała mniej więcej tak:

```javascript
[
  'O', null, 'X',
  'X', 'X', 'O',
  'O', null, null,
]
```

Aktualnie metoda `renderSquare` komponentu `Board` wygląda następująco:

```javascript
  renderSquare(i) {
    return <Square value={i} />;
  }
```

Na początku tego samouczka [przekazaliśmy atrybut `value`](#passing-data-through-props) z komponentu `Board`, aby wyświetlić liczby od 0 do 8 w poszczególnych polach planszy. W innym rozdziale zastąpiliśmy liczby literą "X", [określaną na podstawie własnego stanu komponentu `Square`](#making-an-interactive-component). To właśnie dlatego `Square` ignoruje atrybut `value` przekazywany z nadrzędnego komponentu `Board`.

Teraz z powrotem wrócimy do mechanizmu przekazywania atrybutów. Zmienimy kod komponentu `Board` tak, aby mówił poszczególnym komponentom `Square`, jaką mają obecnie wartość (`"X"`, `"O"` lub `null`). Zdefiniowaliśmy już tablicę `squares` w konstruktorze komponentu `Board`, więc teraz zostaje nam zmodyfikować metodę `renderSquare` tak, aby odczytywała z niej wartości:

```javascript{2}
  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }
```

**[Zobacz dotychczasowy kod](https://codepen.io/gaearon/pen/gWWQPY?editors=0010)**

Każde pole otrzyma poprzez atrybut `value` odpowiednio: `"X"`, `"O"` lub `null` (jeśli pole jest puste).

Następnie musimy zmienić zachowanie komponentu `Square` po kliknięciu na nim. Teraz to `Board` decyduje, które pola są wypełnione. Musimy zatem określić sposób, w jaki komponent `Square` może aktualizować stan swojego rodzica. Ponieważ stan komponentu jest dla niego czymś prywatnym, nie możemy tak po prostu nadpisać jego wartości z poziomu komponentu `Square`.

Aby zapewnić prywatność stanowi komponentu `Board`, przekażemy do `Square` odpowiednią funkcję poprzez atrybuty. Funkcja ta będzie wywoływana za każdym razem, gdy ktoś kliknie na pole. Zmieńmy więc metodę `renderSquare` w następujący sposób:

```javascript{5}
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
```

>Uwaga
>
>Podzieliliśmy kod zwracanego elementu na kilka linii, aby poprawić czytelność. Dodaliśmy również nawiasy po to, aby JavaScript niepotrzebnie nie wstawił średnika za instrukcją `return`, powodując tym samym błąd.

Przekazujemy teraz z komponentu `Board` do `Square` dwa atrybuty: `value` i `onClick`. Atrybut `onClick` jest funkcją, którą `Square` może wywołać po kliknięciu. Żeby tak się stało, należy:

* Zamienić `this.state.value` na `this.props.value` w metodzie `render` komponentu `Square`
* Zamienić `this.setState()` na `this.props.onClick()` w metodzie `render` komponentu `Square`
* Usunąć konstruktor z klasy `Square`, ponieważ nie będzie ona już przechowywała stanu gry

Po powyższych zmianach kod komponentu `Square` powinien wyglądać następująco:

```javascript{1,2,6,8}
class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}
```

Gdy użytkownik kliknie na pole, zostanie wywołana funkcja `onClick` dostarczona przez komponent `Board`. Dzieje się to dlatego, że:

1. Atrybut `onClick` wbudowanego komponentu DOM `<button>` informuje Reacta, żeby ustawił obserwator (ang. *listener*) na kliknięcie.
2. Gdy użytkownik kliknie na przycisk, React wywoła uchwyt zdarzenia `onClick` zdefiniowany w metodzie `render()` komponentu `Square`.
3. Uchwyt ten wywoła funkcję `this.props.onClick()`, czyli atrybut przekazany przez komponent `Board`.
4. Ponieważ komponent `Board` przekazał swojemu potomkowi atrybut `onClick={() => this.handleClick(i)}`, kliknięcie w `Square` spowoduje w konsekwencji wywołanie `this.handleClick(i)` wewnątrz komponentu `Board`.
5. Nie zdefiniowaliśmy jeszcze metody `handleClick()`, dlatego aplikacja przestanie działać.

>Uwaga
>
>Atrybut `onClick` elementu DOM `<button>` ma dla Reacta specjalne znaczenie, ponieważ jest to wbudowany komponent. W przypadku własny komponentów, jak `Square`, nazwa może być dowolna. Moglibyśmy nazwać inaczej zarówno atrybut `onClick` w `Square`, jak i `handleClick` w `Board`. Przyjęło się jednak określać atrybuty odpowiedzialne za wywołanie zdarzenia jako `on[Event]`, a uchwyty obsługujące zdarzenia jako `handle[Event]`.

Gdy spróbujemy kliknąć na pole planszy, naszym oczom ukaże się błąd, ponieważ nie zdefiniowaliśmy jeszcze metody `handleClick`. Dodajmy ją zatem:

```javascript{9-13}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Następny gracz: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

**[Zobacz dotychczasowy kod](https://codepen.io/gaearon/pen/ybbQJX?editors=0010)**

Po zastosowaniu powyższych zmian znów będziemy mogli klikać w pola planszy. Różnica polega na tym, że teraz stan planszy jest przechowywany w komponencie `Board` zamiast być w każdym z komponentów `Square`. Gdy stan w `Board` ulegnie zmianie, wszystkie `Square` zostaną ponownie wyrenderowane. Przechowywanie stanu wszystkich pól pozwoli nam w przyszłości wyłonić zwycięzcę rozgrywki.

Przenieśliśmy stan z komponentów `Square` do `Board`, przez co każdy `Square` otrzymuje od rodzica swoją wartość i informuje go o kliknięciu. W terminologii reactowej komponenty `Square` są teraz **komponentami kontrolowanymi**. `Board` ma nad nimi pełną kontrolę.

Zauważ, że w metodzie `handleClick` używamy `.slice()` do stworzenia kopii tablicy `squares`, zamiast ją modyfikować bezpośrednio. Odpowiedź dlaczego znajdziesz w następnym podrozdziale.

### Dlaczego niezmienność jest istotna {#why-immutability-is-important}

W poprzednim przykładzie zasugerowaliśmy użycie operatora `.slice()` do stworzenia kopii tablicy `squares`, zamiast ją bezpośrednio modyfikować. Omówimy teraz niezmienność (ang. *immutability*) oraz powód, dla którego warto ją znać.

Ogólnie rzecz biorąc, istnieją dwa sposoby na zmianę danych. Pierwszym z nich jest *mutowanie* (ang. *mutate*) danych poprzez bezpośrednią zmianę ich wartości. Drugim sposobem jest zastąpienie danych ich nową kopią, zawierającą wszystkie potrzebne zmiany.

#### Zmiana danych poprzez mutację {#data-change-with-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// Teraz zmienna player ma wartość: {score: 2, name: 'Jeff'}
```

#### Zmiana danych bez mutacji {#data-change-without-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// Zmienna player nie uległa zmianie, a newPlayer jest nowym obiektem o wartościach {score: 2, name: 'Jeff'}

// Jeśli używasz składni "operatora rozszczepienia" (ang. spread operator), możesz napisać:
// var newPlayer = {...player, score: 2};
```

Rezultat jest podobny, lecz jeśli zdecydujemy się nie mutować (ani nie zmieniać znajdujących się wewnątrz) danych bezpośrednio, zyskamy kilka benefitów opisanych poniżej.

#### Skomplikowane funkcjonalności stają się proste {#complex-features-become-simple}

Niezmienność (ang. *immutability*) sprawia, że skomplikowane funkcjonalności są łatwiejsze w implementacji. W późniejszej części tego samouczka dodamy funkcjonalność "wehikułu czasu", która pozwoli nam przejrzeć historię ruchów gry w "kółko i krzyżyk" i "cofać się w czasie" do wybranego ruchu. Nie jest to jednak coś, co można zaimplementować tylko w grze - możliwość cofania i ponawiania czynności jest dość popularnym wymogiem w aplikacjach. Unikanie bezpośredniej modyfikacji danych pozwoli nam przechowywać poprzednie stany gry nienaruszone i ponownie ich używać.

#### Wykrywanie zmian {#detecting-changes}

Wykrywanie zmian w mutowalnych (ang. *mutable*) obiektach jest trudne, ponieważ są one zmieniane bezpośrednio. Tego typu mechanizm detekcji zmian musi porównać aktualną i poprzednią wersję obiektu na każdym poziomie jego struktury.

Wykrywanie zmian w niezmiennych (ang. *immutable*) obiektach jest stosunkowo łatwe. Jeśli referencja aktualnego obiektu jest inna od referencji poprzedniego, to znaczy, że nastąpiła jakaś zmiana.

#### Kiedy ponownie renderować w Reakcie {#determining-when-to-re-render-in-react}

Główną korzyścią z niezmienności danych jest możliwość tworzenia w Reakcie tzw. _czystych komponentów_ (ang. *pure components*). Taki komponent w łatwy sposób może sprawdzić, czy nastąpiły jakiekolwiek zmiany i czy w związku z tym powinien się ponownie wyrenderować.

Aby dowiedzieć się więcej na temat metody `shouldComponentUpdate()` i budowania *czystych komponentów*, zajrzyj do rozdziału pt. ["Optymalizacja wydajności"](/docs/optimizing-performance.html#examples).

### Komponenty funkcyjne {#function-components}

Przekształcimy teraz `Square` w **komponent funkcyjny** (ang. *function component*).

W Reakcie **komponenty funkcyjne** są prostym sposobem na stworzenie komponentów posiadających tylko metodę `render` i niemających żadnego stanu. Zamiast definiować klasę dziedziczącą po `React.Component`, możemy napisać funkcję z argumentem `props`, która zwraca strukturę do wyrenderowania. Komponenty funkcyjne są prostsze i czytelniejsze od klas, a ponadto mają szerokie zastosowanie.

Zastąp klasę `Square` poniższą funkcją:

```javascript
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

a następnie zamień wszystkie `this.props` na `props`.

**[Zobacz dotychczasowy kod](https://codepen.io/gaearon/pen/QvvJOv?editors=0010)**

>Uwaga
>
>Po przekształceniu `Square` na komponent funkcyjny, zmieniliśmy także `onClick={() => this.props.onClick()}` na krótsze `onClick={props.onClick}` (zwróć uwagę na brak nawiasów okrągłych w *obu* miejscach). W klasie użyliśmy funkcji strzałkowej (ang. *arrow function*), aby odwołać się do właściwego `this`, natomiast w komponencie funkcyjnym nie musimy w ogóle martwić się o `this`.

### Granie na zmianę {#taking-turns}

W następnej kolejności musimy naprawić widoczny na pierwszy rzut oka defekt: użytkownik nie może umieścić na planszy symbolu kółka ("O").

Ustalmy, że domyślnie "X" wykonuje pierwszy ruch. Aby to zrobić, zmień stan początkowy w konstruktorze komponentu `Board`:

```javascript{6}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
```

Za każdym razem, gdy użytkownik wykona ruch, zmienna `xIsNext` (typu zerojedynkowego; ang. *boolean*) zmieni wartość na przeciwną, informując, który z graczy jest następny w kolejce, a zaraz po tym stan gry zostanie zapisany. Zmieńmy metodę `handleClick` komponentu `Board` tak, aby zmieniała flagę `xIsNext` na przeciwną:

```javascript{3,6}
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```

Po tej modyfikacji "krzyżyki" i "kółka" będą wykonywać ruch na zmianę. Zaktualizujmy teraz wartość `status` w metodzie `render`, aby poprawnie wyświetlała, który gracz jest następny:

```javascript{2}
  render() {
    const status = 'Następny gracz: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      // reszta kodu pozostaje bez zmian
```

Zmieniony komponent `Board` powinien wyglądać następująco:

```javascript{6,11-16,29}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Następny gracz: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

**[Zobacz dotychczasowy kod](https://codepen.io/gaearon/pen/KmmrBy?editors=0010)**

### Ogłaszanie zwycięzcy {#declaring-a-winner}

Teraz, gdy już wyświetlamy, który z graczy będzie wykonywał następny ruch, powinniśmy również wyświetlać zwycięzce lub informację o braku możliwych ruchów. Do wyłaniania zwycięzcy posłuży nam następujące funkcja pomocnicza, którą należy dodać na końcu pliku:

```javascript
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```

Funkcję `calculateWinner(squares)` wywołamy w metodzie `render` komponentu `Board`, sprawdzając w ten sposób, czy aktualny gracz jest zwycięzcą. Jeśli odpowiedź będzie pozytywna, możemy wyświetlić tekst w stylu "Wygrywa: X" lub "Wygrywa: O". Podmieńmy `status` w metodzie `render` na:

```javascript{2-8}
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Wygrywa: ' + winner;
    } else {
      status = 'Następny gracz: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      // reszta kodu pozostaje bez zmian
```

W metodzie `handleClick` komponentu `Board` możemy teraz zwrócić wartość wcześniej, ignorując kliknięcia po wyłonieniu zwycięzcy lub wypełnieniu całej planszy:

```javascript{3-5}
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```

**[Zobacz dotychczasowy kod](https://codepen.io/gaearon/pen/LyyXgK?editors=0010)**

Gratulacje! Gra w "kółko i krzyżyk" jest gotowa. A przy okazji znasz już podstawy Reacta. Więc tak naprawdę to *Ty* jesteś tu zwycięzcą.

## Adding Time Travel {#adding-time-travel}

As a final exercise, let's make it possible to "go back in time" to the previous moves in the game.

### Storing a History of Moves {#storing-a-history-of-moves}

If we mutated the `squares` array, implementing time travel would be very difficult.

However, we used `slice()` to create a new copy of the `squares` array after every move, and [treated it as immutable](#why-immutability-is-important). This will allow us to store every past version of the `squares` array, and navigate between the turns that have already happened.

We'll store the past `squares` arrays in another array called `history`. The `history` array represents all board states, from the first to the last move, and has a shape like this:

```javascript
history = [
  // Before first move
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // After first move
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // After second move
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, 'O',
    ]
  },
  // ...
]
```

Now we need to decide which component should own the `history` state.

### Lifting State Up, Again {#lifting-state-up-again}

We'll want the top-level Game component to display a list of past moves. It will need access to the `history` to do that, so we will place the `history` state in the top-level Game component.

Placing the `history` state into the Game component lets us remove the `squares` state from its child Board component. Just like we ["lifted state up"](#lifting-state-up) from the Square component into the Board component, we are now lifting it up from the Board into the top-level Game component. This gives the Game component full control over the Board's data, and lets it instruct the Board to render previous turns from the `history`.

First, we'll set up the initial state for the Game component within its constructor:

```javascript{2-10}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
```

Next, we'll have the Board component receive `squares` and `onClick` props from the Game component. Since we now have a single click handler in Board for many Squares, we'll need to pass the location of each Square into the `onClick` handler to indicate which Square was clicked. Here are the required steps to transform the Board component:

* Delete the `constructor` in Board.
* Replace `this.state.squares[i]` with `this.props.squares[i]` in Board's `renderSquare`.
* Replace `this.handleClick(i)` with `this.props.onClick(i)` in Board's `renderSquare`.

The Board component now looks like this:

```javascript{17,18}
class Board extends React.Component {
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Następny gracz: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

We'll update the Game component's `render` function to use the most recent history entry to determine and display the game's status:

```javascript{2-11,16-19,22}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Następny gracz: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
```

Since the Game component is now rendering the game's status, we can remove the corresponding code from the Board's `render` method. After refactoring, the Board's `render` function looks like this:

```js{1-4}
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
```

Finally, we need to move the `handleClick` method from the Board component to the Game component. We also need to modify `handleClick` because the Game component's state is structured differently. Within the Game's `handleClick` method, we concatenate new history entries onto `history`.

```javascript{2-4,10-12}
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
```

>Note
>
>Unlike the array `push()` method you might be more familiar with, the `concat()` method doesn't mutate the original array, so we prefer it.

At this point, the Board component only needs the `renderSquare` and `render` methods. The game's state and the `handleClick` method should be in the Game component.

**[Zobacz dotychczasowy kod](https://codepen.io/gaearon/pen/EmmOqJ?editors=0010)**

### Showing the Past Moves {#showing-the-past-moves}

Since we are recording the tic-tac-toe game's history, we can now display it to the player as a list of past moves.

We learned earlier that React elements are first-class JavaScript objects; we can pass them around in our applications. To render multiple items in React, we can use an array of React elements.

In JavaScript, arrays have a [`map()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) that is commonly used for mapping data to other data, for example:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]
```

Using the `map` method, we can map our history of moves to React elements representing buttons on the screen, and display a list of buttons to "jump" to past moves.

Let's `map` over the `history` in the Game's `render` method:

```javascript{6-15,34}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Następny gracz: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
```

**[Zobacz dotychczasowy kod](https://codepen.io/gaearon/pen/EmmGEa?editors=0010)**

For each move in the tic-tac-toes's game's history, we create a list item `<li>` which contains a button `<button>`. The button has a `onClick` handler which calls a method called `this.jumpTo()`. We haven't implemented the `jumpTo()` method yet. For now, we should see a list of the moves that have occurred in the game and a warning in the developer tools console that says:

>  Warning:
>  Each child in an array or iterator should have a unique "key" prop. Check the render method of "Game".

Let's discuss what the above warning means.

### Picking a Key {#picking-a-key}

When we render a list, React stores some information about each rendered list item. When we update a list, React needs to determine what has changed. We could have added, removed, re-arranged, or updated the list's items.

Imagine transitioning from

```html
<li>Alexa: 7 tasks left</li>
<li>Ben: 5 tasks left</li>
```

to

```html
<li>Ben: 9 tasks left</li>
<li>Claudia: 8 tasks left</li>
<li>Alexa: 5 tasks left</li>
```

In addition to the updated counts, a human reading this would probably say that we swapped Alexa and Ben's ordering and inserted Claudia between Alexa and Ben. However, React is a computer program and does not know what we intended. Because React cannot know our intentions, we need to specify a *key* property for each list item to differentiate each list item from its siblings. One option would be to use the strings `alexa`, `ben`, `claudia`. If we were displaying data from a database, Alexa, Ben, and Claudia's database IDs could be used as keys.

```html
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
```

When a list is re-rendered, React takes each list item's key and searches the previous list's items for a matching key. If the current list has a key that didn't exist before, React creates a component. If the current list is missing a key that existed in the previous list, React destroys the previous component. If two keys match, the corresponding component is moved. Keys tell React about the identity of each component which allows React to maintain state between re-renders. If a component's key changes, the component will be destroyed and re-created with a new state.

`key` is a special and reserved property in React (along with `ref`, a more advanced feature). When an element is created, React extracts the `key` property and stores the key directly on the returned element. Even though `key` may look like it belongs in `props`, `key` cannot be referenced using `this.props.key`. React automatically uses `key` to decide which components to update. A component cannot inquire about its `key`.

**It's strongly recommended that you assign proper keys whenever you build dynamic lists.** If you don't have an appropriate key, you may want to consider restructuring your data so that you do.

If no key is specified, React will present a warning and use the array index as a key by default. Using the array index as a key is problematic when trying to re-order a list's items or inserting/removing list items. Explicitly passing `key={i}` silences the warning but has the same problems as array indices and is not recommended in most cases.

Keys do not need to be globally unique; they only need to be unique between components and their siblings.


### Implementing Time Travel {#implementing-time-travel}

In the tic-tac-toe game's history, each past move has a unique ID associated with it: it's the sequential number of the move. The moves are never re-ordered, deleted, or inserted in the middle, so it's safe to use the move index as a key.

In the Game component's `render` method, we can add the key as `<li key={move}>` and React's warning about keys should disappear:

```js{6}
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
```

**[Zobacz dotychczasowy kod](https://codepen.io/gaearon/pen/PmmXRE?editors=0010)**

Clicking any of the list item's buttons throws an error because the `jumpTo` method is undefined. Before we implement `jumpTo`, we'll add `stepNumber` to the Game component's state to indicate which step we're currently viewing.

First, add `stepNumber: 0` to the initial state in Game's `constructor`:

```js{8}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }
```

Next, we'll define the `jumpTo` method in Game to update that `stepNumber`. We also set `xIsNext` to true if the number that we're changing `stepNumber` to is even:

```javascript{5-10}
  handleClick(i) {
    // this method has not changed
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    // this method has not changed
  }
```

We will now make a few changes to the Game's `handleClick` method which fires when you click on a square.

The `stepNumber` state we've added reflects the move displayed to the user now. After we make a new move, we need to update `stepNumber` by adding `stepNumber: history.length` as part of the `this.setState` argument. This ensures we don't get stuck showing the same move after a new one has been made.

We will also replace reading `this.state.history` with `this.state.history.slice(0, this.state.stepNumber + 1)`. This ensures that if we "go back in time" and then make a new move from that point, we throw away all the "future" history that would now become incorrect.

```javascript{2,13}
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
```

Finally, we will modify the Game component's `render` method from always rendering the last move to rendering the currently selected move according to `stepNumber`:

```javascript{3}
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // reszta kodu pozostaje bez zmian
```

If we click on any step in the game's history, the tic-tac-toe board should immediately update to show what the board looked like after that step occurred.

**[Zobacz dotychczasowy kod](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**

### Wrapping Up {#wrapping-up}

Congratulations! You've created a tic-tac-toe game that:

* Lets you play tic-tac-toe,
* Indicates when a player has won the game,
* Stores a game's history as a game progresses,
* Allows players to review a game's history and see previous versions of a game's board.

Nice work! We hope you now feel like you have a decent grasp on how React works.

Check out the final result here: **[Efekt końcowy](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**.

If you have extra time or want to practice your new React skills, here are some ideas for improvements that you could make to the tic-tac-toe game which are listed in order of increasing difficulty:

1. Display the location for each move in the format (col, row) in the move history list.
2. Bold the currently selected item in the move list.
3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
4. Add a toggle button that lets you sort the moves in either ascending or descending order.
5. When someone wins, highlight the three squares that caused the win.
6. When no one wins, display a message about the result being a draw.

Throughout this tutorial, we touched on React concepts including elements, components, props, and state. For a more detailed explanation of each of these topics, check out [the rest of the documentation](/docs/hello-world.html). To learn more about defining components, check out the [`React.Component` API reference](/docs/react-component.html).
