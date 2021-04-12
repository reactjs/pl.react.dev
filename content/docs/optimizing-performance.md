---
id: optimizing-performance
title: Optymalizacja wydajności
permalink: docs/optimizing-performance.html
redirect_from:
  - "docs/advanced-performance.html"
---

React używa "pod maską" kilku sprytnych sztuczek, dzięki którym może zminimalizować liczbę kosztownych operacji na modelu DOM potrzebnych do zaktualizowania interfejsu. W wielu aplikacjach użycie Reacta powinno zapewnić satysfakcjonującą szybkość interfejsu bez stosowania wielu skomplikowanych optymalizacji wydajnościowych. Mimo wszystko, jeśli okaże się inaczej, istnieje kilka sposobów na przyspieszenie twojej aplikacji reactowej.

## Użyj kodu produkcyjnego {#use-the-production-build}

Jeśli testujesz wydajność swojej aplikacji lub odczuwasz problemy z jej wydajnością, upewnij się, że używasz zminifikowanego kodu produkcyjnego (ang. *production build*).

Domyślnie React dorzuca do kodu wiele ostrzeżeń, które przydają się podczas pisania aplikacji. Niestety z ich powodu React jest cięższy i wolniejszy, dlatego zaleca się wrzucać na produkcję tylko wygenerowany kod produkcyjny.

Jeśli masz wątpliwości co do tego, czy twój proces budowania aplikacji jest ustawiony poprawnie, sprawdź to instalując [React Developer Tools dla Chrome'a](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi). Jeśli po instalacji odwiedzisz stronę korzystającą z kodu produkcyjnego, ikona wtyczki będzie miała ciemne tło:

<img src="../images/docs/devtools-prod.png" style="max-width:100%" alt="React DevTools na stronie korzystającej z produkcyjnej wersji Reacta">

Jeśli jednak strona będzie korzystać z trybu deweloperskiego, ikona będzie czerwona:

<img src="../images/docs/devtools-dev.png" style="max-width:100%" alt="React DevTools na stronie korzystajhącej z deweloperskiej wersji Reacta">

Co do zasady, trybu deweloperskiego powinno używać się podczas tworzenia aplikacji, a kod produkcyjny wrzucać tam, gdzie będą z niego korzystać docelowi użytkownicy.

Poniżej znajdziesz więcej instrukcji dotyczących budowania aplikacji produkcyjnej.

### Create React App {#create-react-app}

Jeśli twój projekt powstał przy pomocy [Create React App](https://github.com/facebookincubator/create-react-app), uruchom polecenie:

```
npm run build
```

Stworzy ono kod produkcyjny twojej aplikacji i umieści go w folderze `build/`.

Pamiętaj, aby używać powyższej komendy tylko przed wrzuceniem kodu na produkcję. Do normalnej pracy nad aplikacją uruchamiaj `npm start`.

### Jednoplikowe zbudowane paczki {#single-file-builds}

React oraz React DOM są dostępne jako pojedyncze pliki, wprost gotowe do użycia na produkcji:

```html
<script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
```

Pamiętaj, że tylko pliki o nazwie kończącej się na `.production.min.js` są przystosowane do działania na produkcji.

### Brunch {#brunch}

Aby uzyskać najwydajniejszy build produkcyjny przy użyciu narzędzia Brunch, zainstaluj do niego wtyczkę [`terser-brunch`](https://github.com/brunch/terser-brunch):

```
# Jeśli używasz npma
npm install --save-dev terser-brunch

# Jeśli używasz Yarna
yarn add --dev terser-brunch
```

Następnie stwórz kod produkcyjny dodając flagę `-p` do komendy `build`:

```
brunch build -p
```

Pamiętaj, że uruchamianie powyższej komendy jest koniecznie tylko wtedy, gdy chcesz stworzyć kod produkcyjny. Do codziennej pracy nie korzystaj z flagi `-p` ani nie używaj tej wtyczki, ponieważ spowoduje to ukrycie przydatnych ostrzeżeń reactowych oraz spowolni sam proces budowania aplikacji.

### Browserify {#browserify}

Aby uzyskać najwydajniejszy build produkcyjny przy użyciu narzędzia Browserify, zainstaluj kilka wtyczek:

```
# Jeśli używasz npma
npm install --save-dev envify terser uglifyify 

# Jeśli używasz Yarna
yarn add --dev envify terser uglifyify 
```

Aby stworzyć kod produkcyjny, dodaj poniższe transformacje **(kolejność ma znaczenie)**:

* Transformacja [`envify`](https://github.com/hughsk/envify) ustawia poprawne środowisko dla procesu budowania. Użyj jej globalnie (`-g`).
* Transformacja [`uglifyify`](https://github.com/hughsk/uglifyify) usuwa importy deweloperskie. Również i jej użyj globalnie (`-g`).
* Na koniec powstały kod jest przepuszczany przez [`terser`](https://github.com/terser-js/terser), który dekoruje (ang. *mangle*) kod ([przeczytaj dlaczego](https://github.com/hughsk/uglifyify#motivationusage)).

Na przykład:

```
browserify ./index.js \
  -g [ envify --NODE_ENV production ] \
  -g uglifyify \
  | terser --compress --mangle > ./bundle.js
```

Pamiętaj, że uruchamianie powyższej komendy jest koniecznie tylko wtedy, gdy chcesz stworzyć kod produkcyjny. Do codziennej pracy nie korzystaj z tych wtyczek, ponieważ spowoduje to ukrycie przydatnych ostrzeżeń reactowych oraz spowolni sam proces budowania aplikacji.

### Rollup {#rollup}

Aby uzyskać najwydajniejszy build produkcyjny przy użyciu narzędzia Rollup, zainstaluj kilka wtyczek:

```bash
# Jeśli używasz npma
npm install --save-dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-terser

# Jeśli używasz Yarna
yarn add --dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-terser
```

Aby stworzyć kod produkcyjny, dodaj poniższe wtyczki **(kolejność ma znaczenie)**:

* Wtyczka [`replace`](https://github.com/rollup/rollup-plugin-replace) ustawia poprawne środowisko dla procesu budowania.
* Wtyczka [`commonjs`](https://github.com/rollup/rollup-plugin-commonjs) dodaje do Rollupa wsparcie dla CommonJS.
* Wtyczka [`terser`](https://github.com/TrySound/rollup-plugin-terser) kompresuje i dekoruje (ang. *mangle*) kod wynikowy.

```js
plugins: [
  // ...
  require('rollup-plugin-replace')({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  require('rollup-plugin-commonjs')(),
  require('rollup-plugin-terser')(),
  // ...
]
```

Kompletny przykład konfiguracji możesz [zobaczyć w tym giście](https://gist.github.com/Rich-Harris/cb14f4bc0670c47d00d191565be36bf0).

Pamiętaj, że uruchamianie powyższej komendy jest koniecznie tylko wtedy, gdy chcesz stworzyć kod produkcyjny. Do codziennej pracy nie korzystaj z wtyczki `terser` ani z `replace` z ustawioną wartością na `'production'`, ponieważ spowoduje to ukrycie przydatnych ostrzeżeń reactowych oraz spowolni sam proces budowania aplikacji.

### webpack {#webpack}

>**Uwaga:**
>
>Jeśli korzystasz z Create React App, przeczytaj [tę instrukcję](#create-react-app).<br>
>Poniższa sekcja dotyczy sytuacji, w której webpack jest konfigurowany bezpośrednio.

Webpack w wersji 4+ minifikuje kod domyślnie w trybie produkcyjnym.

```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({ /* dodatkowe opcje */ })],
  },
};
```

Więcej na ten temat możesz przeczytać w [dokumentacji webpacka](https://webpack.js.org/guides/production/).

Pamiętaj, że uruchamianie powyższej komendy jest koniecznie tylko wtedy, gdy chcesz stworzyć kod produkcyjny. Do codziennej pracy nie korzystaj z wtyczki `TerserPlugin`, ponieważ spowoduje to ukrycie przydatnych ostrzeżeń reactowych oraz spowolni sam proces budowania aplikacji.

<<<<<<< HEAD
## Profilowanie komponentów w zakładce Performance w Chromie {#profiling-components-with-the-chrome-performance-tab}

React uruchomiony w trybie **deweloperskim** pozwala na skorzystanie w niektórych przeglądarkach z narzędzi mierzących wydajność. Dzięki temu możesz zobaczyć, jak komponenty są montowane, aktualizowane i odmontowywane. Na przykład:

<center><img src="../images/blog/react-perf-chrome-timeline.png" style="max-width:100%" alt="Komponenty reactowe na osi czasu w Chromie" /></center>

Aby uruchomić taką wizualizację w Chromie:

1. Tymczasowo **wyłącz wszystkie rozszerzenia Chrome'a, łącznie z React DevTools**. Mogą one znacząco pogorszyć wyniki!

2. Upewnij się, że aplikacja działa w trybie deweloperskim.

3. Przejdź do zakładki **[Performance](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool)** (pol. *Wydajność*) w narzędziach deweloperskich Chrome'a i kliknij **Record** (pol. *Rozpocznij nagrywanie*).

4. Teraz wykonaj czynności, które chcesz sprofilować. Nie nagrywaj jednak dłużej niż 20 sekund, gdyż Chrome może się zawiesić.

5. Zatrzymaj nagrywanie.

6. Zdarzenia reactowe będą pogrupowane pod etykietą **User Timing** (pol. *Pomiary użytkownika*).

Bardziej szczegółową instrukcję profilowania znajdziesz w [tym artykule autorstwa Bena Schwarza](https://calibreapp.com/blog/react-performance-profiling-optimization).

Zwróć uwagę, że **podane liczby są względne i na produkcji komponenty będą renderowane szybciej**. Mimo to taki raport powinien pomóc ci znaleźć fragment interfejsu, który niepotrzebnie jest aktualizowany zbyt często, a także dowiedzieć się, jak głęboko sięgają zmiany w drzewie komponentów.

Obecnie tylko Chrome, Edge oraz IE posiadają tę funkcję, lecz wykorzystywany jest tu standardowy interfejs [User Timing API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API), więc liczymy na to, że wkrótce także pozostałe przeglądarki zaczną go wspierać.

## Profilowanie komponentów za pomocą Profilera z React DevTools {#profiling-components-with-the-devtools-profiler}
=======
## Profiling Components with the DevTools Profiler {#profiling-components-with-the-devtools-profiler}
>>>>>>> 968f09159512b59afd5246a928789ae52592c923

`react-dom` 16.5+ oraz `react-native` 0.57+ zapewniają zwiększone możliwości profilowania w trybie deweloperskim w połączeniu z Profilerem wtyczki React DevTools.
Ogólne informacje na temat Profilera można znaleźć w poście ["Introducing the React Profiler"](/blog/2018/09/10/introducing-the-react-profiler.html) (pol. "Wprowadzenie do React Profilera").
Filmik opowiadający o profilerze jest także [dostępny na YouTube](https://www.youtube.com/watch?v=nySib7ipZdk).

Jeśli jeszcze nie masz zainstalowanej wtyczki React DevTools, możesz znaleźć ją tutaj:

- [Wtyczka do Chrome'a](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=pl)
- [Wtyczka do Firefoksa](https://addons.mozilla.org/en-GB/firefox/addon/react-devtools/)
- [Niezależna paczka Node'owa](https://www.npmjs.com/package/react-devtools)

> Uwaga
>
> Profiler do kodu produkcyjnego jest również dostępny w paczce `react-dom` pod ścieżką `react-dom/profiling`.
> Więcej informacji na temat jego użycia znajdziesz na [fb.me/react-profiling](https://fb.me/react-profiling)

<<<<<<< HEAD
## Wirtualizacja długich list {#virtualize-long-lists}
=======
> Note
>
> Before React 17, we use the standard [User Timing API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API) to profile components with the chrome performance tab. 
> For a more detailed walkthrough, check out [this article by Ben Schwarz](https://calibreapp.com/blog/react-performance-profiling-optimization).

## Virtualize Long Lists {#virtualize-long-lists}
>>>>>>> 968f09159512b59afd5246a928789ae52592c923

Jeśli twoja aplikacja renderuje długie listy z danymi (setki lub tysiące wierszy), zalecamy użycie techniki zwanej "okienkowaniem" (ang. *windowing*). Technika ta renderuje w danym momencie jedynie niewielką część wszystkich wierszy, co może znacząco wpłynąć na zredukowanie czasu ponownego renderowania komponentów oraz zmniejszenie liczby tworzonych węzłów DOM.

[react-window](https://react-window.now.sh/) oraz [react-virtualized](https://bvaughn.github.io/react-virtualized/) to popularne biblioteki "okienkujące". Dostarczają kilka generycznych komponentów służących do wyświetlania list, siatek i tabel. Jeśli potrzebujesz czegoś bardziej szytego na miarę do swojej aplikacji, możesz napisać własny komponent okienkujący, jak [zrobił to Twitter](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3).

## Unikaj rekoncyliacji {#avoid-reconciliation}

React buduje i zarządza wewnętrzną reprezentacją renderowanego UI. Zawiera ona elementy reactowe zwracane przez komponenty aplikacji. Dzięki niej React może unikać niepotrzebnych operacji, jak np. tworzenia węzłów DOM i modyfikowania istniejących. Tego typu operacje są wolniejsze niż analogiczne operacje na obiektach javascriptowych. Czasem do tej reprezentacji odnosimy się jako "wirtualny DOM" (ang. *virtual DOM*), lecz podobna występuje w React Native.

Kiedy zmieniają się właściwości lub stan komponentu, React decyduje, czy należy zaktualizować DOM, poprzez porównanie poprzednio zwróconego elementu z tym zwróconym po zmianie. Jeśli nie są takie same, następuje aktualizacja modelu DOM.

Nawet pomimo tego, że React aktualizuje jedynie zmodyfikowane węzły DOM, ponowne wyrenderowanie zajmuje trochę czasu. W wielu przypadkach nie jest to problemem, jednak czasami spowolnienie jest widoczne gołym okiem. Można temu zaradzić nadpisując metodę cyklu życia komponentu o nazwie `shouldComponentUpdate`, która wywoływana jest tuż przed rozpoczęciem ponownego renderowania. Domyślna implementacja tej metody zwraca zawsze `true`, wymuszając na Reakcie każdorazowe ponowne renderowanie:

```javascript
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
```

Jeśli wiesz, że w niektórych przypadkach twój komponent nie musi być aktualizowany, możesz nadpisać `shouldComponentUpdate` w taki sposób, aby zwracało `false`. Dzięki temu React pominie cały proces renderowania, wraz z wywołaniem metody `render()`, na tym komponencie i na wszystkich jego potomkach.

W większości przypadków, zamiast pisania własnej implementacji metody `shouldComponentUpdate()`, wystarczy odziedziczyć po klasie [`React.PureComponent`](/docs/react-api.html#reactpurecomponent). Daje to ten sam efekt, co zaimplementowanie metody `shouldComponentUpdate()` w taki sposób, aby wykonywała płytkie porównanie (ang. *shallow comparison*) na aktualnym oraz poprzednim zestawie właściwości i stanu.

## shouldComponentUpdate w akcji {#shouldcomponentupdate-in-action}

Załóżmy, że mamy takie poddrzewo komponentów. Dla każdego z nich `SCU` oznacza wartość zwróconą przez metodę `shouldComponentUpdate`, a `vDOMEq` określa, czy wyrenderowane elementy były takie same. Natomiast kolor kółka określa, czy dany komponent musiał zostać sprawdzony przez mechanizm rekoncyliacji, czy nie.

<figure><img src="../images/docs/should-component-update.png" style="max-width:100%" /></figure>

Ponieważ `shouldComponentUpdate` zwróciło `false` dla poddrzewa w węźle C2, React nie musiał renderować C2, a co za tym idzie, nie musiał nawet wywoływać metody `shouldComponentUpdate` na C4 i C5.

Dla C1 i C3 `shouldComponentUpdate` zwróciło `true`, więc React musiał zejść głębiej do liści drzewa i je sprawdzić. Metoda `shouldComponentUpdate` komponentu C6 zwróciła `true`, a ponieważ wyrenderowane elementy różniły się od siebie, React musiał zaktualizować DOM.

Ostatnim interesującym przypadkiem jest C8. React musiał wyrenderować ten komponent, ale wyrenderowany element był taki sam jak poprzednio, w związku z czym nie trzeba było aktualizować modelu DOM.

Zwróć uwagę, że React musiał nanieść poprawki w modelu DOM tylko dla C6, co było nieuniknione. W przypadku C8 nastąpiło wczesne przerwanie, ponieważ wyrenderowane elementy były takie same, natomiast w poddrzewie C2 oraz węźle C7 React nie musiał nawet niczego porównywać, gdyż `shouldComponentUpdate` zwróciło `false`, przez co `render` nie zostało wywołane w ogóle.

## Przykłady {#examples}

Jeśli twój komponent zmienia się tylko przy zmianie wartości `props.color` lub `state.count`, możesz je sprawdzić wewnątrz metody `shouldComponentUpdate`:

```javascript
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Licznik: {this.state.count}
      </button>
    );
  }
}
```

W powyższym kodzie `shouldComponentUpdate` sprawdza jedynie, czy zmieniły się wartości `props.color` lub `state.count`. Jeśli nie, wówczas nie ma potrzeby renderować komponentu ponownie. Gdyby komponent nieco się rozrósł, można by zastosować "płytkie porównanie" (ang. *shallow comparison*) wszystkich pól z `props` i `state`, aby stwierdzić, czy należy komponent wyrenderować ponownie. Ten wzorzec jest na tyle popularny, że wyposażyliśmy Reacta w klasę pomocniczą, która to robi. Wystarczy, że twój komponent będzie dziedziczył po klasie `React.PureComponent`, a płytkie porównanie nastąpi automatycznie. Poniższy kod pokazuje prostszy sposób na uzyskanie tego samego efektu:

```js
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Licznik: {this.state.count}
      </button>
    );
  }
}
```

W wielu przypadkach, zamiast pisać własną implementację metody `shouldComponentUpdate`, możesz z powodzeniem skorzystać z klasy `React.PureComponent`. Pamiętaj jednak, że wykonuje ona płytkie porównanie, więc na nic się zda, kiedy właściwości lub stan są modyfikowane w sposób, którego ono nie wykrywa.

Problem może pojawić się przy bardziej złożonych strukturach danych. Na przykład, załóżmy, że mamy komponent `ListOfWords`, który wypisuje słowa po przecinku, oraz nadrzędny komponent `WordAdder`, który pozwala kliknąć na guzik i dodać tym samym nowe słowo do listy. Poniższy kod *nie* zadziała poprawnie:

```javascript
class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // Ten fragment jest źle napisany i zawiera błąd
    const words = this.state.words;
    words.push('marklar');
    this.setState({words: words});
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}
```

Problem polega na tym, że `PureComponent` używa prostego porównania starej i nowej wartości `this.props.words`. Jako że ten kod mutuje tablicę `words` wewnątrz metody `handleClick`, stara i nowa wartość dla `this.props.words` będą identyczne, nawet pomimo faktu, iż słowa w tablicy uległy zmianie. Na skutek tego `ListOfWords` nie zostanie zaktualizowany, pomimo że zmieniła się lista słów, które należy wyrenderować.

## Potęga niemutowania danych {#the-power-of-not-mutating-data}

Najprostszym sposobem na uniknięcie tego problemu jest uniknięcie mutowania wartości, których używasz jako właściwości lub stan. Na przykład, powyższą metodę `handleClick` można napisać z użyciem `concat`:

```javascript
handleClick() {
  this.setState(state => ({
    words: state.words.concat(['marklar'])
  }));
}
```

Standard ES6 dostarcza między innymi [operator rozwinięcia (ang. *spread operator*)](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Operatory/Sk%C5%82adnia_rozwini%C4%99cia) dla tablic, który może uprościć ten zapis. Jeśli korzystasz z Create React App, składnia ta jest dostępna domyślnie.

```js
handleClick() {
  this.setState(state => ({
    words: [...state.words, 'marklar'],
  }));
};
```

W podobny sposób możesz zmienić kod, który mutuje obiekty, tak, aby uniknąć mutacji. Na przykład, załóżmy, że mamy obiekt o nazwie `colormap` i chcemy napisać funkcję, która zmienia wartość `colormap.right` na `'blue'`. Możemy napisać:

```js
function updateColorMap(colormap) {
  colormap.right = 'blue';
}
```

Aby uniknąć mutowania oryginalnego obiektu, możemy użyć metody [Object.assign](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Object/assign):

```js
function updateColorMap(colormap) {
  return Object.assign({}, colormap, {right: 'blue'});
}
```

`updateColorMap` zwraca teraz nowy obiekt, zamiast mutować stary. Metoda `Object.assign` jest dostępna w standardzie ES6 i wymaga polyfilla.

[Składnia rozwinięcia obiektu](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Operatory/Sk%C5%82adnia_rozwini%C4%99cia) sprawia, że aktualizowanie obiektów bez ich mutowania jest łatwiejsze:

```js
function updateColorMap(colormap) {
  return {...colormap, right: 'blue'};
}
```

Ta funkcjonalność została dodana do JavaScriptu w ES2018.

Jeśli korzystasz z Create React App, zarówno `Object.assign`, jak i składnia rozwinięcia obiektu są dostępne domyślnie.

Jeśli działasz na głęboko zagnieżdżonych obiektach, aktualizowanie ich w niemutowalny sposób może okazać się karkołomne. Z pomocą przychodzą [Immer](https://github.com/mweststrate/immer) oraz [immutability-helper](https://github.com/kolodny/immutability-helper). Biblioteki te pozwalają pisać czytelny kod bez utraty korzyści płynących z niemutowalności (ang. *immutability*).
