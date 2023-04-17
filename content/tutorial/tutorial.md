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

<div class="scary">

> These docs are old and won't be updated. Go to [react.dev](https://react.dev/) for the new React docs.
> 
> The updated [Tutorial](https://react.dev/learn/tutorial-tic-tac-toe) teaches modern React and includes live examples.

</div>

Ten samouczek nie zakłada jakiejkolwiek znajomości Reacta.

## Zanim zaczniemy się uczyć {#before-we-start-the-tutorial}

W tym samouczku skupimy się na stworzeniu niewielkiej gry. **Być może po tym zdaniu zechcesz go pominąć, bo nie zajmujesz się pisaniem gier - ale mimo wszystko daj mu szansę**. Techniki, których nauczysz się w tym poradniku są fundamentami do zbudowania *dowolnej* aplikacji w Reakcie, a zrozumienie ich zapewni ci dogłębne poznanie tematu.

>Uwaga
>
>Ten samouczek jest przeznaczony dla osób, które wolą **uczyć się poprzez praktykę**. Jeśli wolisz pouczyć się zagadnień od podstaw, zajrzyj do naszego [poradnika krok po kroku](/docs/hello-world.html). Wiedz jednak, że ten samouczek oraz tamten poradnik nawzajem się uzupełniają.

Samouczek podzieliliśmy na kilka części:

* [Przygotowanie i konfiguracja](#setup-for-the-tutorial) opisuje, **jak rozpocząć projekt**, aby móc wykonywać dalsze kroki samouczka,
* [Przegląd](#overview) zawiera informacje o **podstawach** Reacta: komponentach, atrybutach i stanie,
* [Dokończenie gry](#completing-the-game) pokazuje **najczęstsze techniki** programowania w Reakcie,
* [Dodanie "podróży w czasie"](#adding-time-travel) pozwala **dogłębnie zrozumieć** mocne strony Reacta.

Nie musisz wcale przechodzić przez wszystkie części samouczka naraz, żeby wynieść z niego cokolwiek. Spróbuj jednak dojść najdalej jak możesz - nawet jeśli będą to tylko dwa rozdziały.

### Co będziemy budować? {#what-are-we-building}

Na koniec nasz kod będzie wyglądał tak: **[Efekt końcowy](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**. Być może w tej chwili kod wygląda bez sensu albo nie rozumiesz jego składni, ale bez obaw! Celem tego samouczka jest właśnie pomóc ci zrozumieć Reacta i jego składnię.

Zanim przystąpisz do dalszej lektury, zachęcamy cię do uruchomienia gry w "kółko i krzyżyk". Zwróć uwagę, że jedną z funkcjonalności tej aplikacji jest, znajdująca się na prawo od planszy, numerowana lista. Wyświetla ona na bieżąco wszystkie wykonywane w danej rozgrywce ruchy.

Radzimy wypróbować grę w kółko i krzyżyk przed dalszą lekturą samouczka. Jedną z funkcjonalności, która z pewnością rzuci się od razu w oczy, jest numerowana lista na prawo od planszy. Zawiera ona historię wszystkich ruchów wykonanych podczas gry i jest aktualizowana na bieżąco.

### Wymagania {#prerequisites}

Zakładamy, że HTML i JavaScript nie są ci obce, ale nawet jeśli to twoja pierwsza styczność z tymi językami, to samouczek nie powinien przysporzyć ci większego problemu. Zakładamy również, że znasz takie pojęcia z programowania obiektowego jak "funkcja", "obiekt" czy "tablica", a także przynajmniej w niewielkim stopniu rozumiesz, czym jest "klasa".

Jeśli potrzebujesz odświeżyć sobie wiedzę o JavaScripcie, zalecamy lekturę [tego poradnika](https://developer.mozilla.org/pl/docs/Web/JavaScript/Ponowne_wprowadzenie_do_JavaScript). Zwróć uwagę, że będziemy tu korzystać z niektórych funkcjonalności standardu ES6 - jednej z ostatnich wersji języka JavaScript - takich jak [funkcje strzałkowe](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Functions/Funkcje_strzalkowe) (ang. *arrow functions*), [klasy](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Classes) oraz wyrażenia [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) i [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const). Możesz skorzystać ze środowiska [Babel REPL](babel://es5-syntax-example), aby sprawdzić, co powstanie w wyniku transpilowania kodu napisanego w standardzie ES6.

## Konfiguracja pod samouczek {#setup-for-the-tutorial}

Masz do wyboru dwa sposoby pracy z tym samouczkiem: możesz pisać kod w przeglądarce lub skonfigurować lokalne środowisko na swoim komputerze.

### Opcja konfiguracyjna nr 1: Pisanie kodu w przeglądarce {#setup-option-1-write-code-in-the-browser}

To zdecydowanie najszybszy i najłatwiejszy sposób na rozpoczęcie przygody z Reactem!

Na początek otwórz w nowej karcie **[szablon startowy](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)**. Twoim oczom powinna ukazać się pusta plansza do gry w "kółko i krzyżyk" oraz panel z kodem reactowym. To tutaj będziemy edytować nasz kod.

Możesz teraz pominąć opcję nr 2 i przejść do rozdziału pt. ["Przegląd"](#overview), w którym przedstawiliśmy ogólne informacje o Reakcie.

### Opcja konfiguracyjna nr 2: Lokalne środowisko programistyczne {#setup-option-2-local-development-environment}

Ten sposób pracy z naszym samouczkiem jest całkowicie opcjonalny i nie jest konieczny do jego ukończenia!

<br>

<details>

<summary><b>Opcjonalne: Instrukcje na temat pisania kodu w wybranym przez siebie edytorze tekstu</b></summary>

Ta konfiguracja wymaga więcej wysiłku, lecz pozwala na ukończenie samouczka przy użyciu dowolnego edytora. W tym celu:

1. Sprawdź, czy masz najnowszą wersję [Node.js](https://nodejs.org/en/).
2. Wykonaj [instrukcje instalacji "Create React App"](/docs/create-a-new-react-app.html#create-react-app), aby zainicjalizować projekt.

```bash
npx create-react-app moja-aplikacja
```

3. Usuń wszystkie pliki z folderu `src/` w nowo utworzonym projekcie

> Uwaga:
>
>**Nie usuwaj całego folderu `src`, tylko znajdujące się w nim pliki.** W następnym kroku podmienimy domyślne pliki źródłowe przykładami z samouczka.

```bash
cd moja-aplikacja
cd src

# Jeśli używasz Maca lub Linuxa, wpisz:
rm -f *

# Jeśli używasz Windowsa:
del *

# A następnie wróć do folderu z projektem
cd ..
```

4. W folderze `src/` dodaj plik `index.css` i wstaw do niego [ten kod CSS](https://codepen.io/gaearon/pen/oWWQNa?editors=0100).

5. W folderze `src/` dodaj plik `index.js` i wstaw do niego [ten kod JS](https://codepen.io/gaearon/pen/oWWQNa?editors=0010).

6. Wstaw te trzy wiersze na początku pliku `index.js` znajdującego się w folderze `src/`:

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
```

Teraz, gdy w folderze z projektem wykonasz polecenie `npm start`, a następnie wpiszesz w przeglądarce adres `http://localhost:3000`, na ekranie powinna pojawić się pusta plansza do gry w "kółko i krzyżyk".

Zalecamy wykonanie [tych instrukcji](https://babeljs.io/docs/editors/). Pozwoli ci to skonfigurować narzędzia do podświetlania składni w wybranym edytorze tekstu.

</details>

### Pomocy, nie wiem, co robić! {#help-im-stuck}

Jeśli w którymś momencie się zgubisz, przejrzyj [listę źródeł wsparcia od społeczności](/community/support.html). Zwłaszcza [Reactiflux Chat](https://discord.gg/reactiflux) jest znany z szybkiego udzielania pomocy. Jeśli mimo wszystko nie otrzymasz odpowiedzi lub nadal masz z czymś problem, zgłoś nam to, a spróbujemy ci jakoś pomóc.

## Przegląd {#overview}

Teraz, gdy już masz wszystko skonfigurowane, czas dowiedzieć się czegoś o Reakcie!

### Czym jest React? {#what-is-react}

React jest deklaratywną, wydajną i elastyczną biblioteką javascriptową do budowania interfejsów użytkownika. Pozwala na tworzenie złożonych UI przy użyciu małych i odizolowanych od siebie kawałków kodu, zwanych "komponentami".

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

Do tych nietypowych znaczników XML-owych wrócimy za chwilę. Komponenty pozwalają wytłumaczyć Reactowi, co chcemy ujrzeć na ekranie. Gdy zmienią się nasze dane, React w sposób efektywny zaktualizuje i ponownie wyrenderuje komponenty.

W powyższym przykładzie `ShoppingList` (pol. *lista zakupów*) jest **reactowym komponentem klasowym**. Na wejściu komponent przyjmuje parametry, nazywane "atrybutami" (ang. *props*; skrót od *properties*), i przy pomocy metody `render` zwraca strukturę widoków do wyświetlenia.

Metoda `render` zwraca *opis* tego, co zostanie wyświetlone na ekranie. React analizuje ten opis i wyświetla wynik końcowy renderowania. Precyzyjniej rzecz ujmując, metoda `render` zwraca **element reactowy**, który jest zwięzłą reprezentacją tego, co zostanie wyświetlone na ekranie. Większość programistów reactowych używa specjalnej składni zwanej "JSX", która ułatwia pisanie wspomnianych struktur. Składnia `<div />` podczas budowania jest przekształcana w kod: `React.createElement('div')`. Idąc dalej, powyższy przykład jest równoznaczny z:

```javascript
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('ul', /* ... ul children ... */)
);
```

[Zobacz pełną wersję kodu](babel://tutorial-expanded-version)

Jeśli ciekawość nie daje ci spokoju, opis funkcji `createElement()` znajdziesz w [dokumentacji API](/docs/react-api.html#createelement), aczkolwiek w tym samouczku nie będziemy jej używać. Zamiast tego skorzystamy ze składni JSX.

Składnia JSX ma pełną moc JavaScriptu. Między klamry można wstawić *dowolny* kod javascriptowy. Każdy element reactowy jest obiektem, który można przypisać do zmiennej i przekazywać dowolnie w swoim programie.

Powyższy komponent `ShoppingList` wyrenderuje jedynie wbudowane komponenty znane z drzewa DOM, jak `<div />` czy `<li />`. Ale równie dobrze można wyrenderować w nim inny, własny komponent. Na przykład, do całej listy zakupów można odwołać się pisząc `<ShoppingList />`. Każdy komponent w Reakcie jest enkapsulowany (ang. *encapsulated*) i może działać niezależnie; pozwala to na budowanie skomplikowanych interfejsów użytkownika przy użyciu prostych komponentów.

### Analizowanie szablonu startowego {#inspecting-the-starter-code}

Jeśli zamierzasz przejść przez ten samouczek **w przeglądarce**, otwórz ten link w nowej karcie: **[Szablon startowy](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)**. Jeśli zamierzasz pracować **lokalnie**, zamiast tego otwórz plik `src/index.js`, znajdujący się w folderze z projektem (jego tworzenie opisywaliśmy w rozdziale pt. ["Konfiguracja pod samouczek"](#setup-option-2-local-development-environment)).

Wspomniany "szablon startowy" będzie bazą dla naszej aplikacji. Dodaliśmy już do niego style CSS, więc teraz nareszcie można skupić się na nauce Reacta i implementowaniu gry w "kółko i krzyżyk".

Analizując kod, łatwo zauważyć, że mamy do czynienia z trzema komponentami reactowymi:

* Square (pole na planszy),
* Board (plansza),
* Game (gra).

Komponent `Square` (pole) renderuje pojedynczy element `<button>`, a `Board` (plansza) renderuje 9 takich pól. Z kolei komponent `Game` (gra) renderuje planszę wypełnioną symbolami zastępczymi, które podmienimy nieco później. Aplikacja w obecnym stanie nie zawiera żadnych interaktywnych komponentów.

### Przekazywanie danych przez atrybuty {#passing-data-through-props}

Na dobry początek, spróbujmy przekazać jakieś dane z komponentu `Board` do `Square`.

W trakcie wykonywania poleceń zalecamy pisanie kodu samodzielnie. Pozwoli ci to bardziej skupić się na poszczególnych zagadnieniach, dzięki czemu lepiej je sobie przyswoisz i zrozumiesz.

W metodzie `renderSquare` komponentu `Board` przekaż komponentowi `Square` atrybut o nazwie `value` (pol. *wartość*):

```js{3}
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
}
```

Teraz zmodyfikuj metodę `render` komponentu `Square` tak, by wyświetlała przekazaną wartość. Wystarczy, że zamienisz `{/* TODO */}` na `{this.props.value}`:

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

Po zmianie: W każdym wyrenderowanym polu powinien wyświetlać się kolejny numer.

![React Devtools](../images/tutorial/tictac-numbers.png)

**[Zobacz dotychczasowy kod](https://codepen.io/gaearon/pen/aWWQOG?editors=0010)**

Gratulacje! Właśnie udało ci się "przekazać atrybut" z komponentu nadrzędnego `Board` do komponentu potomnego `Square`. Przekazywanie atrybutów to jeden ze sposobów na przepływ danych między rodzicem a komponentem potomnym w drzewie.

### Tworzenie interaktywnego komponentu {#making-an-interactive-component}

Teraz sprawmy, aby komponent `Square` wypełniał się literą "X", kiedy w niego klikniemy.
Najpierw dokonaj zmian w elemencie `<button />` zwracanym przez `Square` w metodzie `render()`:

```javascript{4}
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={function() { console.log('kliknięto w przycisk'); }}>
        {this.props.value}
      </button>
    );
  }
}
```

Teraz gdy klikniesz na polu, w konsoli narzędzi programistycznych zobaczysz wiadomość "click".

>Uwaga
>
>Żeby oszczędzić sobie pisania i zapobiec [mylącemu zachowaniu `this`](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/), od teraz obsługę zdarzeń będziemy zapisywać za pomocą [funkcji strzałkowych](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Functions/Funkcje_strzalkowe) (ang. *arrow functions*):
>
>```javascript{4}
>class Square extends React.Component {
>  render() {
>    return (
>      <button className="square" onClick={() => console.log('kliknięto w przycisk')}>
>        {this.props.value}
>      </button>
>    );
>  }
>}
>```
>
>Zauważ, że za pomocą `onClick={() => console.log('kliknięto w przycisk')}` pod atrybutem `onClick` przekazujemy *funkcję*. React wywoła ją dopiero po kliknięciu w przycisk. Częstym błędem jest zapominanie o `() =>` i pisanie `onClick={console.log('kliknięto w przycisk')}`, co powoduje wyświetlenie wiadomości w momencie renderowania komponentu.

W następnym kroku sprawimy, by komponent `Square` "pamiętał", że został kliknięty, i wyświetlał literę "X". Komponenty mogą "pamiętać" o różnych rzeczach dzięki **stanowi** (ang. *state*).

Komponenty w Reakcie można wyposażyć w stan, przypisując w konstruktorze odpowiednią wartość do właściwości klasy `this.state`. Właściwość `this.state` powinna być traktowana jako prywatna, dostępna tylko dla komponentu, w którym została zdefiniowana. Przypiszmy więc aktualną wartość przycisku do `this.state` i nadpisujmy ją przy kliknięciu.

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
      <button className="square" onClick={() => console.log('kliknięto w przycisk')}>
        {this.props.value}
      </button>
    );
  }
}
```

>Uwaga
>
>W [klasach javascriptowych](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Classes) należy zawsze wywoływać metodę `super` w konstruktorze klasy potomnej. Dlatego wszystkie komponenty reactowe będące klasą, które mają zdefiniowany konstruktor, powinny zaczynać się od wywołania `super(props)`.

Teraz zmienimy kod w metodzie `render` komponentu `Square` tak, aby po kliknięciu wyświetlał wartość aktualnego stanu:

* zamień `this.props.value` na `this.state.value` wewnątrz znacznika `<button>`,
* zamień procedurę obsługi zdarzenia `onClick={...}` na `onClick={() => this.setState({value: 'X'})}`,
* umieść atrybuty `className` i `onClick` w osobnych liniach dla lepszej czytelności kodu.

Po wprowadzeniu powyższych zmian, element `<button>`, zwracany przez komponent `Square`, powinien wyglądać następująco:

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

Wywołując `this.setState` z wnętrza procedury obsługi zdarzenia `onClick` w metodzie `render`, mówimy Reactowi, aby po każdym kliknięciu ponownie renderował element `<button>`. Po aktualizacji, wartość zmiennej `this.state.value` będzie równa `"X"`, dlatego też `X` zostanie wyświetlone na planszy. Kliknięcie na dowolne pole powinno spowodować wyświetlenie w nim litery "X".

Gdy w komponencie wywołujesz `setState`, React automatycznie aktualizuje również wszystkie komponenty znajdujące się poniżej w hierarchii.

**[Zobacz dotychczasowy kod](https://codepen.io/gaearon/pen/VbbVLg?editors=0010)**

### Narzędzia deweloperskie {#developer-tools}

Rozszerzenie o nazwie "React Devtools" dla przeglądarek [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=pl) i [Firefox](https://addons.mozilla.org/pl/firefox/addon/react-devtools/) pozwala na zbadanie drzewa komponentów reactowych za pomocą narzędzi deweloperskich wbudowanych w przeglądarkę.

<img src="../images/tutorial/devtools.png" alt="React Devtools" style="max-width: 100%">

Dzięki temu rozszerzeniu możesz podejrzeć atrybuty i stan dowolnego komponentu w drzewie.

Po zainstalowaniu rozszerzenia wystarczy kliknąć prawym przyciskiem myszy na dowolnym elemencie strony i wybrać z menu "Zbadaj" (ang. "Inspect"). W pasku zakładek, jako dwie ostatnie po prawej, powinny pojawić się zakładki "⚛️ Components" oraz "⚛️ Profiler". Skorzystaj z "⚛️ Components", aby zbadać drzewo komponentów.

**Jeśli korzystasz z CodePen, potrzebne będą dodatkowe czynności:**

1. Zaloguj się lub zarejestruj i potwierdź swój adres e-mail (wymagane w celach antyspamowych).
2. Kliknij na przycisk "Fork".
3. Kliknij na "Change View" i wybierz "Debug mode".
4. W nowej karcie otworzą się narzędzia deweloperskie z dodatkową zakładką "React".

## Dokończenie gry {#completing-the-game}

Zbudowaliśmy solidne fundamenty pod grę w "kółko i krzyżyk". Zostało nam jeszcze umożliwienie graczom wykonywanie ruchów na przemian ("X" lub "O"), a także określenie sposobu wybierania zwycięzcy.

### Wyciąganie stanu w górę {#lifting-state-up}

W obecnej wersji aplikacji każdy z komponentów `Square` decyduje o własnym stanie. Jednak do rozstrzygnięcia gry potrzebny nam będzie jeden wspólny stan, przechowujący wartości dla wszystkich 9 pól na planszy.

Być może przeszło ci przez myśl, że to komponent `Board` powinien "pytać" każdy z komponentów `Square` o jego stan. Nawet jeśli jest to możliwe w Reakcie, odradzamy takiego podejścia, ponieważ kod stanie się wtedy bardziej zagmatwany, podatny na błędy i trudny w utrzymaniu. Zamiast tego należy przenieść stan całej planszy do komponentu nadrzędnego - `Board`. Komponent ten, poprzez atrybuty, będzie mówił każdemu z komponentów `Square`, co mają wyrenderować - podobnie jak w jednym z poprzednich podrozdziałów, gdzie [przekazywaliśmy kolejne numery do komponentów `Square`](#passing-data-through-props).

**Aby móc zebrać dane z wielu komponentów potomnych lub umożliwić dwóm potomkom komunikowanie się ze sobą, należy zadeklarować ich wspólny stan w rodzicu. Taki rodzic może wtedy przekazać poszczególne wartości potomkom poprzez atrybuty; dzięki temu potomkowie będą zsynchronizowani zarówno ze sobą nawzajem, jak i z rodzicem.**

Wynoszenie stanu w górę struktury to dość częsty zabieg podczas refaktoryzacji (ang. *refactoring*) kodu. Wykorzystajmy zatem okazję do wypróbowania tego schematu. 

Dodaj konstruktor do komponentu `Board` i ustaw w nim stan przechowujący tablicę dziewięciu wartości `null`. Każdy z elementów tej tablicy będzie odpowiadał jednemu polu na planszy:

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
```

Gdy później wypełnimy planszę wartościami, tablica `this.state.squares` będzie wyglądała mniej więcej tak:

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

Na początku tego samouczka [przekazaliśmy atrybut `value`](#passing-data-through-props) z komponentu `Board`, aby wyświetlić liczby od 0 do 8 w kolejnych polach planszy. W innym rozdziale zastąpiliśmy liczby literą "X", [określaną na podstawie własnego stanu komponentu `Square`](#making-an-interactive-component). To właśnie dlatego `Square` obecnie ignoruje atrybut `value` przekazywany z nadrzędnego komponentu `Board`.

Teraz ponownie zastosujemy mechanizm przekazywania atrybutów. Zmienimy kod komponentu `Board` tak, aby mówił poszczególnym komponentom `Square`, jaką mają wartość (`"X"`, `"O"` lub `null`). Zdefiniowaliśmy już tablicę `squares` (pol. *pola*) w konstruktorze komponentu `Board`, więc teraz zostaje nam zmodyfikować metodę `renderSquare` (pol. *renderuj pole*) tak, aby odczytywała z niej wartości:

```javascript{2}
  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }
```

**[Zobacz dotychczasowy kod](https://codepen.io/gaearon/pen/gWWQPY?editors=0010)**

Każde pole otrzyma poprzez atrybut `value` odpowiednio: `"X"`, `"O"` lub `null` (w przypadku pola pustego).

Następnie musimy zmienić zachowanie komponentu `Square` po kliknięciu na nim, ponieważ teraz to `Board` decyduje, które pola są wypełnione. Musimy zatem określić sposób, w jaki komponent `Square` może aktualizować stan swojego rodzica. Jako że stan komponentu `Board` należy tylko do niego, nie możemy tak po prostu nadpisać jego wartości z poziomu potomka `Square`.

Zamiast tego, do komponentu `Square` przekażemy odpowiednią funkcję za pomocą atrybutów i sprawimy, by `Square` wywoływał ją za każdym razem, gdy ktoś kliknie na pole. Zmieńmy więc metodę `renderSquare` w następujący sposób:

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

* zamienić `this.state.value` na `this.props.value` w metodzie `render` komponentu `Square`,
* zamienić `this.setState()` na `this.props.onClick()` w metodzie `render` komponentu `Square`,
* usunąć konstruktor z klasy `Square`, ponieważ nie będzie ona już przechowywała stanu gry.

Po wprowadzeniu powyższych zmian, kod komponentu `Square` powinien wyglądać następująco:

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

1. Atrybut `onClick` wbudowanego komponentu DOM `<button>` informuje Reacta, żeby zaczął nasłuchiwać kliknięć użytkownika.
2. Gdy użytkownik kliknie na przycisk, React wywoła procedurę obsługi zdarzenia `onClick` zdefiniowaną w metodzie `render()` komponentu `Square`.
3. Procedura ta wywoła funkcję `this.props.onClick()`, czyli atrybut przekazany przez komponent `Board`.
4. Ponieważ komponent `Board` przekazał swojemu potomkowi atrybut `onClick={() => this.handleClick(i)}`, kliknięcie w `Square` spowoduje w konsekwencji wywołanie `handleClick(i)` wewnątrz komponentu `Board`.
5. Nie zdefiniowaliśmy jeszcze metody `handleClick()`, dlatego aplikacja w tym momencie przestanie działać. Jeśli klikniesz na dowolne pole, zobaczysz błąd na czerwonym tle, mówiący coś w stylu: "this.handleClick is not a function" (pol. *this.handleClick nie jest funkcją*).

>Uwaga
>
>Atrybut `onClick` elementu DOM `<button>` ma dla Reacta specjalne znaczenie, ponieważ jest to wbudowany komponent. W przypadku własnych komponentów, jak `Square`, nazwa tego atrybutu może być dowolna. Moglibyśmy nazwać inaczej zarówno atrybut `onClick` w `Square`, jak i `handleClick` w `Board`, a kod nadal działałby w taki sam sposób. Przyjęło się jednak określać atrybuty odpowiedzialne za wywołanie zdarzenia jako `on[Event]`, a procedury obsługi zdarzeń jako `handle[Event]`.

Jeśli teraz klikniemy na pole planszy, otrzymamy błąd, ponieważ nie zdefiniowaliśmy jeszcze metody `handleClick`. Dodajmy ją zatem:

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

Po zastosowaniu powyższych zmian znów będziemy mogli klikać w pola planszy. Różnica polega na tym, że teraz stan planszy jest przechowywany w komponencie `Board`, nie zaś w każdym z komponentów `Square` z osobna. Gdy stan w `Board` ulegnie zmianie, wszystkie pola zostaną ponownie wyrenderowane. Przechowywanie stanu wszystkich pól w jednym miejscu pozwoli nam w przyszłości wyłonić zwycięzcę rozgrywki.

Przenieśliśmy stan z komponentu `Square` do `Board`, przez co każdy `Square` otrzymuje od rodzica swoją wartość i informuje go o kliknięciu. W terminologii reactowej komponenty `Square` są teraz **komponentami kontrolowanymi**. `Board` ma nad nimi pełną kontrolę.

Zauważ, że w metodzie `handleClick` używamy `.slice()` do stworzenia kopii tablicy `squares`, zamiast ją modyfikować bezpośrednio. W następnym podrozdziale dowiesz się dlaczego.

### Dlaczego niezmienność jest istotna {#why-immutability-is-important}

W poprzednim przykładzie zasugerowaliśmy stworzenie kopii tablicy `squares` przy użyciu metody `.slice()`, zamiast ją bezpośrednio modyfikować. Omówimy teraz bardzo ważne zagadnienie, jakim jest niezmienność (ang. *immutability*).

Ogólnie rzecz biorąc, istnieją dwa sposoby na zmianę danych. Pierwszym z nich jest *mutowanie* (ang. *mutate*) danych poprzez bezpośrednią zmianę ich wartości. Drugim sposobem jest zastąpienie danych ich nową kopią, zawierającą wszystkie potrzebne zmiany.

#### Zmiana danych poprzez mutację {#data-change-with-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// Teraz zmienna "player" ma wartość: {score: 2, name: 'Jeff'}
```

#### Zmiana danych bez mutacji {#data-change-without-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// Zmienna "player" nie uległa zmianie, a "newPlayer" jest nowym obiektem o wartościach {score: 2, name: 'Jeff'}

// Jeśli używasz składni "operatora rozszczepienia" obiektu (ang. spread operator), możesz napisać:
// var newPlayer = {...player, score: 2};
```

Rezultat jest podobny, lecz jeśli zdecydujemy się nie mutować (ani nie zmieniać znajdujących się wewnątrz) danych bezpośrednio, zyskamy kilka korzyści opisanych poniżej.

#### Skomplikowane funkcjonalności stają się proste {#complex-features-become-simple}

Niezmienność (ang. *immutability*) sprawia, że skomplikowane funkcjonalności są łatwiejsze w implementacji. W późniejszej części tego samouczka dodamy funkcjonalność "podróży w czasie", która pozwoli nam przejrzeć historię ruchów gry w "kółko i krzyżyk" i "cofać się w czasie" do wybranego ruchu. Nie jest to jednak coś, co można zaimplementować tylko w grze - możliwość cofania i ponawiania czynności jest dość popularnym wymogiem w aplikacjach. Unikanie bezpośredniej modyfikacji danych pozwoli nam przechowywać poprzednie stany gry nienaruszone i ponownie ich używać.

#### Wykrywanie zmian {#detecting-changes}

Wykrywanie zmian w mutowalnych (ang. *mutable*) obiektach jest trudne, ponieważ są one zmieniane bezpośrednio. Tego typu mechanizm detekcji zmian musiałby porównać aktualną i poprzednią wersję obiektu na każdym poziomie jego struktury.

Wykrywanie zmian w niezmiennych (ang. *immutable*) obiektach jest stosunkowo łatwe. Jeśli referencja aktualnego obiektu jest różna od referencji poprzedniego, to znaczy, że nastąpiła jakaś zmiana.

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

zmieniając przy okazji wszystkie `this.props` na `props`.

**[Zobacz dotychczasowy kod](https://codepen.io/gaearon/pen/QvvJOv?editors=0010)**

>Uwaga
>
>Po przekształceniu `Square` na komponent funkcyjny, zmieniliśmy także `onClick={() => this.props.onClick()}` na krótsze `onClick={props.onClick}` (zwróć uwagę na brak nawiasów okrągłych w *obu* miejscach). W klasie użyliśmy funkcji strzałkowej (ang. *arrow function*), aby odwołać się do właściwego `this`, natomiast w komponencie funkcyjnym nie musimy w ogóle martwić się o `this`.

### Granie na zmianę {#taking-turns}

W następnej kolejności należałoby naprawić widoczny na pierwszy rzut oka defekt: żaden z graczy nie może umieścić na planszy symbolu kółka ("O").

Ustalmy, że domyślnie "X" wykonuje pierwszy ruch. Aby to zrobić, zmieńmy stan początkowy w konstruktorze komponentu `Board`:

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

Po tej modyfikacji "krzyżyki" i "kółka" będą wykonywać ruchy na zmianę. Spróbuj zagrać!

Zaktualizujmy teraz wartość `status` w metodzie `render`, aby poprawnie wyświetlała, który gracz jest następny:

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

Teraz gdy już wyświetlamy, który z graczy będzie wykonywał następny ruch, powinniśmy również ogłaszać zwycięzcę lub wyświetlać informację o braku możliwych ruchów. Do wyłaniania zwycięzcy posłuży nam następująca funkcja pomocnicza, którą należy dodać na końcu pliku:

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

Dla dowolnej tablicy z dziewięcioma polami sprawdzi ona, który z graczy wygrał, a następnie zwróci odpowiednio: `'X'`, `'O'` lub `null`.

Funkcję `calculateWinner(squares)` wywołamy w metodzie `render` komponentu `Board`, sprawdzając w ten sposób, czy gracz aktualnie wykonujący ruch jest zwycięzcą. Jeśli odpowiedź będzie pozytywna, możemy wyświetlić tekst w stylu "Wygrywa: X" lub "Wygrywa: O". Podmieńmy `status` w metodzie `render` na:

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

W metodzie `handleClick` komponentu `Board` możemy teraz zakończyć funkcję przedwcześnie, ignorując kliknięcia po wyłonieniu zwycięzcy lub wypełnieniu całej planszy:

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

## Dodanie "podróży w czasie" {#adding-time-travel}

W ramach ostatniego ćwiczenia dodamy możliwość "cofania się w czasie" do wykonanych już ruchów.

### Przechowywanie historii ruchów {#storing-a-history-of-moves}

Gdybyśmy bezpośrednio modyfikowali tablicę `squares`, zaimplementowanie "podróży w czasie" byłoby bardzo trudne.

Jednak zamiast tego po każdym ruchu tworzymy kopię tablicy `squares` przy pomocy metody `slice()`, [traktując ją jako niezmienną](#why-immutability-is-important) (ang. *immutable*). Pozwoli nam to przechowywać wszystkie poprzednie wersje tej tablicy i przeskakiwać między poszczególnymi ruchami graczy.

Poprzednie wersje tablicy `squares` będziemy przechowywać w innej tablicy o nazwie `history`. Tablica ta będzie zawierać wszystkie stany planszy, od pierwszego aż do ostatniego, i będzie wyglądała mniej więcej tak:

```javascript
history = [
  // Przed pierwszym ruchem
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // Po pierwszym ruchu
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // Po drugim ruchu
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

Teraz musimy już tylko zdecydować, który komponent powinien być właścicielem tablicy `history`.

### Wynoszenie stanu w górę - po raz kolejny {#lifting-state-up-again}

Chcielibyśmy, aby komponent `Game` wyświetlał listę poprzednich ruchów, z racji tego, że jest najwyżej w hierarchii. W tym celu będzie on potrzebował dostępu do tablicy `history`, dlatego to właśnie on powinien być jej właścicielem.

Umieszczenie zmiennej `history` w komponencie `Game` pozwoli nam usunąć zmienną `squares` z komponentu potomnego `Board`. Podobnie jak ["wynieśliśmy stan w górę"](#lifting-state-up) z komponentu `Square` do `Board`, tak teraz przeniesiemy go jeszcze wyżej - z `Board` do `Game`. Dzięki temu komponent `Game` będzie miał pełną kontrolę nad danymi dostarczanymi do `Board`, co pozwoli poinstruować komponent `Board`, aby wyrenderował któryś z poprzednich ruchów.

Najpierw musimy zainicjalizować stan dla komponentu `Game` w jego konstruktorze:

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
          <div>{/* Status */}</div>
          <ol>{/* Do zrobienia */}</ol>
        </div>
      </div>
    );
  }
}
```

Następnie przekażemy komponentowi `Board` atrybuty `squares` oraz `onClick` od jego rodzica. Ponieważ będziemy odtąd przekazywać tylko jeden obserwator zdarzenia "onClick" obsługujący wiele pól, musimy go wywoływać z parametrem określającym lokalizację klikniętego pola. Można to zrobić w trzech krokach:

1. Usuń konstruktor z klasy `Board`.
2. Zamień `this.state.squares[i]` na `this.props.squares[i]` w metodzie `renderSquare` komponentu `Board`.
3. Zamień `this.handleClick(i)` na `this.props.onClick(i)` w metodzie `renderSquare` komponentu `Board`.

Po tych zmianach komponent `Board` powinien wyglądać następująco:

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
      status = 'Wygrywa: ' + winner;
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

Zaktualizujemy teraz metodę `render` w komponencie `Game` tak, aby odczytywała ostatni wykonany ruch z historii i wyświetlała na jego podstawie odpowiedni status gry:

```javascript{2-11,16-19,22}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Wygrywa: ' + winner;
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
          <ol>{/* Do zrobienia */}</ol>
        </div>
      </div>
    );
  }
```

Ponieważ teraz komponent `Game` zajmuje się renderowaniem statusu gry, możemy usunąć odpowiadający za to kod z metody `render` komponentu `Board`. Po tej refaktoryzacji metoda `render` w `Board` powinna wyglądać tak:

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

Na koniec przeniesiemy metodę `handleClick` z komponentu `Board` do `Game`. Z uwagi na fakt, iż stan gry jest teraz przechowywany w inny sposób, musimy odpowiednio zaktualizować kod tej metody, aby dodawała wykonywane ruchy na koniec tablicy `history`.

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

>Uwaga
>
>W przeciwieństwie do metody `push()`, którą pewnie już znasz, metoda `concat()` nie modyfikuje tablicy, lecz dodaje element do jej kopii, co jest nam bardzo na rękę.

W tym momencie komponent `Board` będzie potrzebował już tylko dwóch metod: `renderSquare` oraz `render`. Stan gry oraz metoda `handleClick` powinny znaleźć się w komponencie `Game`.

**[Zobacz dotychczasowy kod](https://codepen.io/gaearon/pen/EmmOqJ?editors=0010)**

### Wyświetlanie ruchów z przeszłości {#showing-the-past-moves}

Dzięki temu, że zapisujemy historię stanów gry w "kółko i krzyżyk", możemy wyświetlić na ekranie ruchy z przeszłości w formie listy.

W poprzednich rozdziałach dowiedzieliśmy się, że elementy reactowe są [pierwszoklasowymi obiektami javascriptowymi](https://pl.wikipedia.org/wiki/Typ_pierwszoklasowy) (ang. *first-class JavaScript objects*); możemy je przekazywać w aplikacji do woli. Do wyrenderowania listy w Reakcie możemy wykorzystać tablicę elementów reactowych.

Javascriptowe tablice mają wbudowaną [metodę `map()`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array/map), której często używa się do przekształcania danych na inne, na przykład:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]
```

Przy pomocy metody `map` możemy przekształcić historię ruchów w listę elementów reactowych reprezentujących przyciski na ekranie, a następnie wyświetlić tę listę, aby umożliwić "przeskakiwanie" między ruchami.

Użyjmy zatem `map` na tablicy `history` wewnątrz metody `render` komponentu `Game`:

```javascript{6-15,34}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Przejdź do ruchu #' + move :
        'Przejdź na początek gry';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Wygrywa: ' + winner;
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

Podczas iterowania po tablicy `history`, zmienna `step` odnosi się do konkretnego elementu w `history`, a `move` odnosi się do indeksu tegoż elementu. Nas tutaj interesuje tylko `move`, dlatego nie używamy `step`.

Dla każdego z ruchów w historii gry tworzymy element listy `<li>` zawierający przycisk `<button>`. Do przycisku przekazujemy obserwator zdarzenia `onClick`, który wywołuje metodę `this.jumpTo()` (której jeszcze nie zaimplementowaliśmy). Powinniśmy być teraz w stanie zobaczyć listę wykonanych już ruchów oraz ostrzeżenie w konsoli narzędzi deweloperskich o treści:

>  Warning:
>  Each child in an array or iterator should have a unique "key" prop. Check the render method of "Game".
>
>  (Ostrzeżenie:
>  Każdy potomek w tablicy lub iteratorze powinien posiadać unikalną wartość atrybutu "key". Sprawdź metodę render komponentu "Game".)

Ustalmy, co oznacza powyższe ostrzeżenie.

### Wybieranie odpowiedniego klucza {#picking-a-key}

Gdy renderujemy listę, React zapamiętuje pewne informacje o każdym z jej wyrenderowanych elementów. Kiedy zaktualizujemy listę, React musi wiedzieć, jak określić, które z elementów uległy zmianie. Moglibyśmy przecież dodać, usunąć, przesunąć lub zmienić zawartość dowolnego z elementów listy.

Wyobraź sobie, że taka lista:

```html
<li>Alicja: pozostało 7 zadań</li>
<li>Bartek: pozostało 5 zadań</li>
```

zmieniłaby się w taką:

```html
<li>Bartek: pozostało 9 zadań</li>
<li>Czarek: pozostało 8 zadań</li>
<li>Alicja: pozostało 5 zadań</li>
```

Człowiek czytający tę listę może z łatwością zauważyć, że oprócz zmiany wartości liczbowych, zamieniliśmy miejscami Alicję z Bartkiem, a także "wcisnęliśmy" Czarka pomiędzy nich. Niestety React jest tylko programem komputerowym i nie zna naszych intencji. Z tego powodu musimy jawnie określić atrybut *key* dla każdego z elementów listy, który wyróżnia go spośród sąsiednich elementów. Jedną z możliwych wartości mógłby być ciąg znaków, np. `alicja`, `bartek`, `czarek`. Gdyby te dane pochodziły z bazy danych, każda z powyższych osób miałaby zapewne przyporządkowany unikalny identyfikator, którego można by użyć jako klucza.

```html
<li key={user.id}>{user.name}: pozostało {user.taskCount} zadań</li>
```

Gdy lista jest ponownie renderowana, React odczytuje wartość klucza każdego z elementów i wyszukuje po niej odpowiadające elementy na poprzedniej liście. Jeśli nowa lista zawiera klucz, którego wcześniej na niej nie było, element jest tworzony. Jeśli na nowej liście nie ma klucza, który był na niej poprzednio, element jest usuwany. Jeśli uda się dopasować klucze na obydwóch listach, odpowiadający im element jest odpowiednio przesuwany. Klucze informują Reacta o tożsamości każdego z elementów, co pozwala na zarządzanie stanem pomiędzy kolejnymi renderowaniami. Jeśli klucz elementu się zmieni, React usunie ten element i stworzy go na nowo - z nową wartością klucza i nowym stanem.

`key` jest w Reakcie specjalną i zarezerwowaną właściwością (tak jak `ref` - bardziej zaawansowana funkcjonalność). W momencie gdy element jest tworzony po raz pierwszy, React odczytuje wartość jego atrybutu `key` i zachowuje ją bezpośrednio w renderowanym elemencie. Mimo iż `key` wygląda jak jeden z atrybutów, nie można go odczytać z `this.props.key`. React używa właściwości `key` automatycznie, aby zdecydować, które komponenty wymagają aktualizacji. Zaś sam komponent nie jest w stanie odczytać wartości własnego `key`.

**Zalecamy przypisywanie odpowiednich kluczy do każdej tworzonej listy dynamicznej**. Jeśli nie masz do dyspozycji wartości, która nadawałaby się na klucz, zastanów się, czy nie możesz lepiej ustrukturyzować danych.

Jeśli nie podasz klucza, React wyświetli ostrzeżenie w konsoli i domyślnie użyje indeksu elementu. Używanie indeksu jako klucza może przysporzyć ci kłopotów, gdy zechcesz zmienić kolejność lub dodać/usunąć elementy do listy. Jawne przekazanie `key={i}` "uciszy" ostrzeżenie, jednak problem nadal będzie występował. Takie podejście nie jest zalecane w większości przypadków.

Klucze nie muszą być unikalne globalnie; wystarczy, że będą unikalne w ramach danej listy.

### Implementowanie "podróży w czasie" {#implementing-time-travel}

W historii gry w "kółko i krzyżyk" każdy wykonany ruch ma przyporządkowany unikalny identyfikator - numer odpowiadający kolejności ruchu. Kolejność ruchów w naszej grze nigdy nie będzie zmieniana, nigdy też ruchy nie będą dodawane lub usuwane ze środka tejże listy. Można więc śmiało użyć indeksu elementu jako klucza.

W metodzie `render` komponentu `Game` możemy dodać klucz jako `<li key={move}>`, przez co pozbędziemy się reactowego ostrzeżenia z konsoli:

```js{6}
    const moves = history.map((step, move) => {
      const desc = move ?
        'Przejdź do ruchu #' + move :
        'Przejdź na początek gry';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
```

**[Zobacz dotychczasowy kod](https://codepen.io/gaearon/pen/PmmXRE?editors=0010)**

Jeśli teraz klikniesz na którykolwiek z przycisków znajdujących się na liście ruchów, zobaczysz błąd, ponieważ metoda `jumpTo` nie została jeszcze zdefiniowana. Zanim ją zaimplementujemy, musimy dodać zmienną `stepNumber` do stanu komponentu `Game`, aby wiedzieć, który ruch jest aktualne wyświetlany na planszy.

Dodajmy teraz `stepNumber: 0` do stanu początkowego w konstruktorze komponentu `Game`:

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

Pozostaje nam jeszcze zdefiniować metodę `jumpTo`, która będzie aktualizować wartość zmiennej `stepNumber`. Będziemy również zmieniać wartość zmiennej `xIsNext` na przeciwną, jeśli `stepNumber` jest liczbą parzystą:

```javascript{5-10}
  handleClick(i) {
    // ta metoda się nie zmieniła
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    // ta metoda się nie zmieniła
  }
```

Notice in `jumpTo` method, we haven't updated `history` property of the state. That is because state updates are merged or in more simple words React will update only the properties mentioned in `setState` method leaving the remaining state as is. For more info **[see the documentation](/docs/state-and-lifecycle.html#state-updates-are-merged)**.

Następnie zmienimy nieco metodę `handleClick` w komponencie `Game`, która wywoływana jest po kliknięciu na pole planszy.

Zmienna `stepNumber` obecnie odzwierciedla numer ruchu, który wyświetlany jest na ekranie. Po wykonaniu kolejnego ruchu powinniśmy ją ustawiać na `stepNumber: history.length`. Zapobiegnie to utknięciu na jednym i tym samym kroku, nawet pomimo wykonania przez gracza ruchu.

Zamienimy również odczytywanie wartości `this.state.history` na `this.state.history.slice(0, this.state.stepNumber + 1)`. Dzięki temu, gdy "cofniemy się w czasie", a następnie wykonamy jakiś ruch, odrzucimy wszelkie kolejne zapisane w historii wpisy "z przyszłości", które stałyby się nieprawidłowe w zaistniałej sytuacji.

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

Na koniec zmienimy kod w metodzie `render` komponentu `Game`, aby zamiast wyświetlać zawsze ostatni ruch z historii, renderowała planszę zgodną z ruchem określonym przez `stepNumber`:

```javascript{3}
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // reszta kodu pozostaje bez zmian
```

Teraz jeśli klikniemy na którymkolwiek elemencie listy ruchów, plansza powinna zmienić stan na taki, który obowiązywał w wybranej turze.

**[Zobacz dotychczasowy kod](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**

### Podsumowanie {#wrapping-up}

Gratulacje! Udało ci się stworzyć grę w "kółko i krzyżyk", która:

* umożliwia granie w "kółko i krzyżyk",
* informuje, gdy któryś z graczy wygra,
* przechowuje na bieżąco historię ruchów,
* pozwala na przeglądanie historii ruchów, a co za tym idzie, kolejnych stanów planszy.

Dobra robota! Mamy nadzieję, że czujesz już większą swobodę w pisaniu aplikacji w Reakcie.

Sprawdź, jak na koniec powinien wyglądać kod: **[Efekt końcowy](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**.

Jeśli masz jeszcze trochę wolnego czasu i chcesz poćwiczyć Reacta, mamy dla ciebie kilka pomysłów na udoskonalenia gry w "kółko i krzyżyk" (w kolejności od najłatwiejszego do najtrudniejszego):

1. Wyświetl w historii współrzędne dla każdego z ruchów w formacie (kolumna, wiersz).
2. Zastosuj pogrubienie na aktualnie wyświetlanym elemencie listy ruchów.
3. Przepisz komponent `Board` w taki sposób, aby wyświetlić wszystkie pola za pomocą dwóch pętli, zamiast jawnie je podawać w kodzie.
4. Dodaj przycisk, który będzie na zmianę sortował listę ruchów rosnąco i malejąco.
5. Gdy któryś z graczy wygra, podświetl trzy pola, które zapewniły zwycięstwo.
6. Jeśli gra zakończy się z powodu braku możliwych ruchów, wyświetl odpowiednią wiadomość.

W tym samouczku poruszyliśmy temat elementów, komponentów, atrybutów i stanu. Jeśli chcesz bardziej zagłębić się w te zagadnienia, [przeczytaj resztę dokumentacji](/docs/hello-world.html). Jeśli natomiast wolisz dowiedzieć się więcej na temat definiowania komponentów, zajrzyj do [Dokumentacji API klasy `React.Component`](/docs/react-component.html).
