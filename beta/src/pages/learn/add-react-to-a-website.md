---
title: Dodaj Reacta do strony
---

<Intro>

Nie musisz budować całej strony za pomocą Reacta. Dodawanie Reacta do HTML-a nie wymaga instalacji, zajmuje niecałą minutę, a w dodatku pozwala od razu pisać interaktywne komponenty.

</Intro>

<YouWillLearn>

* Jak dodać Reacta do strony HTML-owej w minutę
* Czym jest składnia JSX i jak ją wypróbować na szybko
* Jak skonfigurować preprocesor JSX dla środowiska produkcyjnego

</YouWillLearn>

## Dodaj Reacta w minutę {/*add-react-in-one-minute*/}

React od początku był tworzony z myślą o stopniowym wdrażaniu. Większość stron nie jest (i nie musi być) w całości zbudowana w Reakcie. Ten rozdział pokaże ci, jak dodać "szczyptę interaktywności" do istniejącej strony HTML.

Spróbuj tego podejścia na swojej własnej stronie lub [na pustym pliku HTML](https://gist.github.com/gaearon/edf814aeee85062bc9b9830aeaf27b88/archive/3b31c3cdcea7dfcfd38a81905a0052dd8e5f71ec.zip). Będziesz potrzebować jedynie połączenia z internetem oraz edytora tekstu, np. Nodepad lub VSCode. (Tutaj przeczytasz o tym, [jak skonfigurować edytor](/learn/editor-setup/), żeby podświetlał składnię!)

### Step 1: Dodaj główny element-korzeń do HTML {/*step-1-add-a-root-html-tag*/}

Na początku otwórz stronę HTML, którą chcesz zmodyfikować. Dodaj pusty znacznik `<div>`, aby oznaczyć miejsce, w którym chcesz wyświetlić coś za pomocą Reacta. Nadaj mu unikalny atrybut `id`. Na przykład:

```html {3}
<!-- ... istniejący kod HTML ... -->

<div id="glowny-przycisk-lajkujacy"></div>

<!-- ... istniejący kod HTML ... -->
```

Nazywamy go "korzeniem" (ang. *root*), ponieważ to tutaj zacznie się drzewo zbudowane przez Reacta. Możesz umieścić znacznik korzenia gdziekolwiek chcesz, jednak tylko wewnątrz znacznika `<body>`. Nie wstawiaj jednak do niego żadnej treści - React zastąpi go zawartością twojego komponentu reactowego.

Na jednej stronie możesz mieć tyle korzeni, ile tylko chcesz.

### Krok 2: Dodaj znaczniki script {/*step-2-add-the-script-tags*/}

Na stronie HTML-owej, zaraz przed zamykającym znacznikiem `</body>`, umieść trzy znaczniki `<script>` dla następujących plików:

- [`react.development.js`](https://unpkg.com/react@18/umd/react.development.js) pozwala definiować komponenty reactowe
- [`react-dom.development.js`](https://unpkg.com/react-dom@18/umd/react-dom.development.js) pozwala Reactowi renderować elementy HTML-owe do modelu [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model).
- W kroku 3 swój nowy komponent umieścisz w pliku **like-button.js**!

Twój kod HTML powinien teraz wyglądać tak:

```html
    <!-- koniec strony -->
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="like-button.js"></script>
  </body>
</html>
```

<Gotcha>

Zanim opublikujesz swoją stronę, podmień `development.js` na `production.min.js`! React zbudowany w trybie deweloperskim dostarcza więcej pomocnych błędów, jednak *znacznie* spowalnia działanie aplikacji.

</Gotcha>

### Krok 3: Stwórz komponent reactowy {/*step-3-create-a-react-component*/}

Stwórz plik o nazwie **`like-button.js`** obok pliku HTML, dodaj w nim poniższy fragment kodu, a następnie zapisz plik. Kod ten definiuje komponent reactowy o nazwie `LikeButton`. (Więcej na temat tworzenia komponentów dowiesz się z rozdziału pt. [Szybki start](/learn).)

```js
'use strict';

function LikeButton() {
  const [liked, setLiked] = React.useState(false);

  if (liked) {
    return 'Polubiono!';
  }

  return React.createElement(
    'button',
    {
      onClick: () => setLiked(true),
    },
    'Lubię to'
  );
}
```

### Krok 4: Dodaj swój komponent reactowy do strony {/*step-4-add-your-react-component-to-the-page*/}

Wreszcie, dodaj poniższe trzy linie na końcu pliku **`like-button.js`**. Odpowiadają one za znalezienie elementu `<div>` dodanego przez ciebie w kroku pierwszym, stworzenie w nim korzenia drzewa Reacta, a następnie wyświetlenie wewnątrz niego przycisku "Lubię to":

```js
const rootNode = document.getElementById('glowny-przycisk-lajkujacy');
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(LikeButton));
```

**Gratulacje! Właśnie udało ci się wyrenderować swój pierwszy komponent reactowy na swojej stronie!**

- [Zobacz kompletny kod źródłowy](https://gist.github.com/gaearon/0b535239e7f39c524f9c7dc77c44f09e)
- [Pobierz kompletny przykład (2KB po spakowaniu)](https://gist.github.com/gaearon/0b535239e7f39c524f9c7dc77c44f09e/archive/651935b26a48ac68b2de032d874526f2d0896848.zip)

#### Możesz używać komponentów wielokrotnie! {/*you-can-reuse-components*/}

Czasem chcemy wyświetlić komponenty reactowe w kilku miejscach na tej samej stronie HTML-owej. Najlepiej sprawdza się to, gdy części strony obsługiwane przez Reacta są od siebie odizolowane. Żeby tego dokonać, dodaj w kodzie HTML kilka korzeni, a następnie wyrenderuj w każdym z nich komponenty Reactowe za pomocą `ReactDOM.createRoot()`. Na przykład:

1. W pliku **`index.html`** dodaj drugi kontener `<div id="tutaj-tez-bedzie-komponent"></div>`.
2. W pliku **`like-button.js`** dodaj na końcu trzy dodatkowe linie:

```js {6,7,8,9}
const anotherRootNode = document.getElementById('another-root');
const anotherRoot = ReactDOM.createRoot(anotherRootNode);
anotherRoot.render(React.createElement(LikeButton));
```

Jeśli chcesz wyrenderować ten sam komponent w kilku miejscach, zamiast `id` możesz korzeniom przypisać klasę CSS-ową `class`, a następnie znaleźć je wszystkie za jednym zamachem. Oto [przykład, który wyświetla trzy przyciski "Lubię to" i przekazuje do nich dane](https://gist.github.com/gaearon/779b12e05ffd5f51ffadd50b7ded5bc8).

### Krok 5: Zminifikuj kod javascriptowy pod produkcję {/*step-5-minify-javascript-for-production*/}

Niezminifikowany kod javascriptowy może znacząco spowolnić czas ładowania dla użytkowników strony. Zanim wrzucisz kod na produkcję, dobrym pomysłem będzie minifikacja kodu.

- **Jeśli nie masz skonfigurowanego kroku minifikującego** w swoich skryptach, [oto jeden ze sposobów na jego dodanie](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3).
- **Jeśli masz już ustawiony skrypt minifikujący**, twoja strona będzie gotowa na produkcję pod warunkiem, że będziesz używać wersji Reacta kończących się na `production.min.js`, jak poniżej:

```html
<script
  src="https://unpkg.com/react@17/umd/react.production.min.js"
  crossorigin></script>
<script
  src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"
  crossorigin></script>
```

## Wypróbuj Reacta ze składnią JSX {/*try-react-with-jsx*/}

Powyższe przykłady bazują na funkcjonalnościach wspieranych natywnie przez przeglądarki. To właśnie dlatego **`like-button.js`** używa javascriptowego wywołania funkcji, żeby powiedzieć Reactowi, co ma wyświetlić:

```js
return React.createElement('button', {onClick: () => setLiked(true)}, 'Lubię to');
```

Musisz jednak wiedzieć, że React oferuje także możliwość skorzystania z [JSX](/learn/writing-markup-with-jsx), składni javascriptowej podobnej do HTML:

```jsx
return <button onClick={() => setLiked(true)}>Lubię to</button>;
```

Obydwa fragmenty kodu są równoważne. JSX jest popularną składnią do opisywania znaczników w JavaScripcie. Wielu ludzi lubi ją za to, że wygląda znajomo i pomaga w pisaniu kodu dla UI - zarówno w Reakcie, jak i w innych bibliotekach.

> Możesz poeksperymentować z przekształcaniem znaczników HTML-owych na JSX przy użyciu [tego konwertera online](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.17).

### Wypróbuj JSX {/*try-jsx*/}

Najszybszym sposobem na wypróbowanie składni JSX we własnym projekcie jest dodanie do strony kompilatora Babel za pomocą znacznika `<script>`. Umieść go przed **`like-button.js`**, a następnie do znacznika `<script>` odnoszącego się do **`like-button.js`** dodaj atrybut `type="text/babel"`:

```html {3,4}
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="like-button.js" type="text/babel"></script>
</body>
```

Teraz możesz otworzyć plik **`like-button.js`** i zamienić w nim:

```js
return React.createElement(
  'button',
  {
    onClick: () => setLiked(true),
  },
  'Lubię to'
);
```

na równoznaczny kod w składni JSX:

```jsx
return (
  <button onClick={() => setLiked(true)}>
    Like
  </button>
);
```

Z początku może wydawać się to nieintuicyjne, że do kodu javascriptowego dodajemy znaczniki, ale z czasem przywykniesz! Wstęp do tego tematu znajdziesz w rozdziale pt. [Pisanie kodu w JSX](/learn/writing-markup-with-jsx). Tutaj natomiast znajdziesz [przykładowy plik HTML ze składnią JSX](https://raw.githubusercontent.com/reactjs/reactjs.org/main/static/html/single-file-example.html), który możesz pobrać i się z nim pobawić.

<Gotcha>

Kompilator Babel ze `<script>` nada się do nauki i tworzenia prostych dem. Jednak **spowalnia on działanie strony i nie nadaje się do środowisk produkcyjnych**. Kiedy już stwierdzisz, że czas ruszać dalej, usuń znacznik `<script>` z Babelem i usuń niedawno dodany atrybut `type="text/babel"`. Zamiast nich użyjemy preprocesora JSX, który przekonwertuje wszystkie znaczniki `<script>` z JSX na JS - ale o tym w następnej sekcji.

</Gotcha>

### Dodaj JSX do projektu {/*add-jsx-to-a-project*/}

Dodanie wsparcia dla składni JSX w projekcie nie wymaga użycia skomplikowanych narzędzi jak [bundler (_pol._ skrypt pakujący)](/learn/start-a-new-react-project#custom-toolchains) czy serwer deweloperski. Dodanie preprocesora JSX przypomina nieco dodawanie preprocesora CSS.

Za pomocą terminala przejdź do folderu projektu i wklej poniższe dwie komendy (**Przedtem upewnij się, że masz zainstalowany [Node.js](https://nodejs.org/)!**):

1. `npm init -y` (jeśli wystąpi błąd, [tutaj znajdziesz rozwiązanie](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d))
2. `npm install babel-cli@6 babel-preset-react-app@3`

Do zainstalowania preprocesora JSX potrzebujesz jedynie npm. Nie będzie ci on jednak potrzebny do niczego więcej. Zarówno React, jak i kod aplikacji mogą zostać w znacznikach `<script>` bez żadnych zmian.

Gratulacje! Właśnie udało ci się **skonfigurować JSX pod produkcję**.

### Uruchom preprocesor JSX {/*run-the-jsx-preprocessor*/}

Możesz uruchamiać preprocesor na kodzie JSX za każdym razem, gdy zapisujesz plik. Dzięki temu transformacja zostanie przeprowadzona ponownie, zamieniając plik JSX na nowy plik napisany w czystym JavaScripcie, który jest zrozumiały dla przeglądarki. Oto jak to zrobić:

1. Stwórz folder o nazwie **`src`**
2. W terminalu uruchom polecenie: `npx babel --watch src --out-dir . --presets react-app/prod ` (Nie czekaj, aż polecenie się skończy! Ta komenta uruchamia automatyczny skrypt nasłuchujący zmian w plikach JSX-owych.)
3. Przenieś swój świeżo przerobiony plik **`like-button.js`** ([powinien wyglądać tak!](https://gist.githubusercontent.com/gaearon/1884acf8834f1ef9a574a953f77ed4d8/raw/dfc664bbd25992c5278c3bf3d8504424c1104ecf/like-button.js)) do nowego folderu **`src`**.

Skrypt nasłuchujący automatycznie stworzy przekonwertowany plik **`like-button.js`**, zawierający czysty kod javascriptowy zrozumiały dla przeglądarki.

<Gotcha>

Jeśli widzisz błąd o treści: "You have mistakenly installed the `babel` package" (_pol._ "Omyłkowo zainstalowano pakiet `babel`"), wróć do [poprzedniego kroku](#add-jsx-to-a-project). Wykonaj zawarte w nim instrukcje w tym samym folderze, a następnie spróbuj ponownie.

</Gotcha>

Narzędzie, którego dopiero co użyliśmy, to Babel. Możesz poczytać o nim więcej w [oficjalnej dokumentacji](https://babeljs.io/docs/en/babel-cli/). Poza obsługą składni JSX, pozwala również na korzystanie z nowoczesnej składni JavaScriptu bez obaw o wsparcie starszych przeglądarek.

Jeśli czujesz się już pewnie z narzędziami do budowania i chcesz, żeby robiły za ciebie więcej rzeczy, [zajrzyj do rozdziału, w którym opisujemy najpopularniejsze, przystępne zestawy narzędzi](/learn/start-a-new-react-project).

<DeepDive title="React bez składni JSX">

Pierwotnie JSX został stworzony po to, aby pisanie komponentów w Reakcie było podobne do pisania kodu HTML. Od tamtej pory używa się go dość powszechnie. Mimo to, czasem możesz nie chcieć lub nie móc użyć JSX-a. Wtedy masz dwie opcje:

- Użyć alternatywy dla JSX, np. [htm](https://github.com/developit/htm), która zamiast kompilatora korzysta z [literałów szablonowych (ang. *template literals*)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).
- Użyć funkcji [`React.createElement()`](/apis/createelement), która ma specyficzną strukturę, opisaną poniżej.

W składni JSX, komponent wyglądałby tak:

```jsx
function Hello(props) {
  return <div>Witaj, {props.toWhat}</div>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Hello toWhat="Świecie" />, );
```

Przy użyciu funkcji `React.createElement()` to samo można zapisać jako:

```js
function Hello(props) {
  return React.createElement('div', null, 'Witaj, ', props.toWhat);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  React.createElement(Hello, { toWhat: 'Świecie' }, null)
);
```

Funkcja ta przyjmuje kilka argumentów: `React.createElement(component, props, ...children)`.

Oto jak działają:

1. Komponent **component**, który może być łańcuchem znaków reprezentującym element HTML-owy lub komponentem funkcyjnym
2. Obiekt **props**, zawierający dowolne [właściwości, jakie chcemy przekazać do komponentu](/learn/passing-props-to-a-component)
3. Pozostałe argumenty to **children**, czyli potomkowie, np. tekst lub inne elementy

Jeśli męczy cię ciągłe pisanie pełnego `React.createElement()`, możesz skrócić zapis poprzez przypisanie do zmiennej:

```js
const e = React.createElement;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e('div', null, 'Witaj, Świecie'));
```

Po takim sprytnym przypisaniu może się okazać, że React bez JSX nie jest aż taki straszny i niewygodny, jak mogłoby się wydawać.

</DeepDive>
