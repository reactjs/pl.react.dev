---
title: Dodaj Reacta do strony
---

<Intro>

<<<<<<< HEAD
React od początku był projektowany z myślą o stopniowym wdrażaniu, dzięki czemu możesz go użyć w takiej ilości, jaka jest ci potrzebna. Bez względu na to, czy pracujesz z mikrofrontendami, istniejącym systemem czy po prostu chcesz się pobawić Reactem, możesz zacząć dodawać komponenty reactowe do strony HTML dzięki zaledwie kilku linijkom kodu - i to bez instalowania całego zestawu narzędzi do budowania!

</Intro>

## Dodaj Reacta w minutę {/*add-react-in-one-minute*/}

Dodanie pierwszego komponentu reactowego do istniejącej strony HTML zajmie ci mniej niż minutę. Wypróbuj poniższych kroków na własnej stronie lub na [pustym pliku HTML](https://gist.github.com/rachelnabors/7b33305bf33776354797a2e3c1445186/archive/859eac2f7079c9e1f0a6eb818a9684a464064d80.zip) — potrzebujesz jedynie aktywnego połączenia internetowego i edytora tekstu, jak np. Notepad (lub VSCode — sprawdź nasz poradnik o tym, [jak go skonfigurować](/learn/editor-setup/))!

### Krok 1: Dodaj element do kodu HTML {/*step-1-add-an-element-to-the-html*/}

Na stronie HTML-owej, którą chcesz zmodyfikować, dodaj element, np. pusty znacznik `<div>` z unikalnym `id`, aby wyznaczyć miejsce, w którym chcesz wyświetlić coś za pomocą Reacta.

"Kontener", taki jak ten `<div>`, możesz umieścić gdziekolwiek wewnątrz `<body>`. React zastąpi jego całą zawartość, dlatego zwykle pozostawia się go pustego. Możesz mieć wiele takich elementów na jednej stronie HTML-owej.
=======
You don't have to build your whole website with React. Adding React to HTML doesn't require installation, takes a minute, and lets you start writing interactive components right away.

</Intro>

<YouWillLearn>

* How to add React to an HTML page in one minute
* What is the JSX syntax and how to quickly try it
* How to set up a JSX preprocessor for production

</YouWillLearn>

## Add React in one minute {/*add-react-in-one-minute*/}

React has been designed from the start for gradual adoption. Most websites aren't (and don't need to be) fully built with React. This guide shows how to add some “sprinkles of interactivity” to an existing HTML page.

Try this out with your own website or [an empty HTML file](https://gist.github.com/gaearon/edf814aeee85062bc9b9830aeaf27b88/archive/3b31c3cdcea7dfcfd38a81905a0052dd8e5f71ec.zip). All you need is an internet connection and a text editor like Notepad or VSCode. (Here's [how to configure your editor](/learn/editor-setup/) for syntax highlighting!)

### Step 1: Add a root HTML tag {/*step-1-add-a-root-html-tag*/}

First, open the HTML page you want to edit. Add an empty `<div>` tag to mark the spot where you want to display something with React. Give this `<div>` a unique `id` attribute value. For example:
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4

```html {3}
<!-- ... istniejący kod HTML ... -->

<<<<<<< HEAD
<div id="tutaj-trafi-komponent"></div>
=======
<div id="like-button-root"></div>
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4

<!-- ... istniejący kod HTML ... -->
```

<<<<<<< HEAD
### Krok 2: Dodaj znaczniki script {/*step-2-add-the-script-tags*/}
=======
It's called a "root" because it's where the React tree will start. You can place a root HTML tag like this anywhere inside the `<body>` tag. Leave it empty because React will replace its contents with your React component.

You may have as many root HTML tags as you need on one page.

### Step 2: Add the script tags {/*step-2-add-the-script-tags*/}
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4

Na stronie HTML-owej, zaraz przed zamykającym znacznikiem `</body>`, umieść trzy znaczniki `<script>` dla następujących plików:

<<<<<<< HEAD
- [**react.development.js**](https://unpkg.com/react@17/umd/react.development.js) - wczytuje podstawowy kod Reacta
- [**react-dom.development.js**](https://unpkg.com/react-dom@17/umd/react-dom.development.js) - pozwala Reactowi renderować elementy HTML-owe do modelu [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model).
- W kroku 3 swój nowy komponent umieścisz w pliku **like_button.js**!

<Gotcha>

Przy wypuszczaniu kodu na produkcję zamień "development.js" na "production.min.js".

</Gotcha>

```html
  <!-- koniec strony -->
  <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
  <script src="like_button.js"></script>
</body>
```

### Krok 3: Stwórz komponent reactowy {/*step-3-create-a-react-component*/}

Stwórz plik o nazwie **like_button.js** obok pliku HTML, dodaj w nim poniższy fragment kodu, a następnie zapisz plik. Kod ten definiuje komponent reactowy o nazwie `LikeButton`. [Więcej na temat tworzenia komponentów dowiesz się z innego poradnika.](/learn/your-first-component)
=======
- [`react.development.js`](https://unpkg.com/react@18/umd/react.development.js) lets you define React components.
- [`react-dom.development.js`](https://unpkg.com/react-dom@18/umd/react-dom.development.js) lets React render HTML elements to the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model).
- **`like-button.js`** is where you'll write your component in the next step!

Your HTML should now end like this:

```html
    <!-- end of the page -->
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="like-button.js"></script>
  </body>
</html>
```

<Gotcha>

Before deploying to a live website, make sure to replace `development.js` with `production.min.js`! Development builds of React provide more helpful error messages, but slow down your website *a lot.*

</Gotcha>

### Step 3: Create a React component {/*step-3-create-a-react-component*/}

Create a file called **`like-button.js`** next to your HTML page, add this code snippet, and save the file. This code defines a React component called `LikeButton`. (Learn more about making components in the [Quick Start!](/learn))
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4

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

<<<<<<< HEAD
### Krok 4: Dodaj swój komponent reactowy do strony {/*step-4-add-your-react-component-to-the-page*/}

Wreszcie, dodaj poniższe trzy linie na końcu pliku **like_button.js**. Odpowiadają one za znalezienie elementu `<div>` dodanego przez ciebie w kroku pierwszym, stworzenie w nim aplikacji reactowej, a następnie wyświetlenie wewnątrz niego przycisku "Lubię to".

```js
const domContainer = document.getElementById('tutaj-bedzie-komponent');
const root = ReactDOM.createRoot(domContainer);
=======
### Step 4: Add your React component to the page {/*step-4-add-your-react-component-to-the-page*/}

Lastly, add three lines to the bottom of **`like-button.js`**. These lines of code find the `<div>` you added to the HTML in the first step, create a React root, and then display the "Like" button React component inside of it:

```js
const rootNode = document.getElementById('like-button-root');
const root = ReactDOM.createRoot(rootNode);
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4
root.render(React.createElement(LikeButton));
```

**Gratulacje! Właśnie udało ci się wyrenderować swój pierwszy komponent reactowy na swojej stronie!**

<<<<<<< HEAD
- [Zobacz kompletny kod źródłowy](https://gist.github.com/rachelnabors/c64b3aeace8a191cf5ea6fb5202e66c9)
- [Pobierz kompletny przykład (2KB po spakowaniu)](https://gist.github.com/rachelnabors/c64b3aeace8a191cf5ea6fb5202e66c9/archive/7b41a88cb1027c9b5d8c6aff5212ecd3d0493504.zip)
=======
- [View the full example source code](https://gist.github.com/gaearon/0b535239e7f39c524f9c7dc77c44f09e)
- [Download the full example (2KB zipped)](https://gist.github.com/gaearon/0b535239e7f39c524f9c7dc77c44f09e/archive/651935b26a48ac68b2de032d874526f2d0896848.zip)
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4

#### Możesz używać komponentów wielokrotnie! {/*you-can-reuse-components*/}

<<<<<<< HEAD
Czasem chcemy wyświetlić któryś z komponentów reactowych w kilku miejscach na tej samej stronie HTML-owej. Najlepiej sprawdza się to, gdy części strony obsługiwane przez Reacta są od siebie odizolowane. Żeby tego dokonać, wywołaj `ReactDOM.createRoot()` wielokrotnie na kilku elementach-kontenerach.

1. W pliku **index.html** dodaj drugi kontener `<div id="tutaj-tez-bedzie-komponent"></div>`.
2. W pliku **like_button.js** dodaj drugie wywołanie `ReactDOM.render()`, tym razem dla nowego kontenera:

```js {6,7,8,9}
const root1 = ReactDOM.createRoot(
  document.getElementById('tutaj-bedzie-komponent')
);
root1.render(React.createElement(LikeButton));

const root2 = ReactDOM.createRoot(
  document.getElementById('tutaj-tez-bedzie-komponent')
);
root2.render(React.createElement(LikeButton));
```

Sprawdź [przykład, który wyświetla przycisk "Lubię to" trzy razy i przekazuje do niego dane](https://gist.github.com/rachelnabors/c0ea05cc33fbe75ad9bbf78e9044d7f8)!
=======
You might want to display React components in multiple places on the same HTML page. This is useful if React-powered parts of your page are separate from each other. You can do this by putting multiple root tags in your HTML and then rendering React components inside each of them with `ReactDOM.createRoot()`. For example:

1. In **`index.html`**, add an additional container element `<div id="another-root"></div>`.
2. In **`like-button.js`**, add three more lines at the end:

```js {6,7,8,9}
const anotherRootNode = document.getElementById('another-root');
const anotherRoot = ReactDOM.createRoot(anotherRootNode);
anotherRoot.render(React.createElement(LikeButton));
```

If you need to render the same component in many places, you can assign a CSS `class` instead of `id` to each root, and then find them all. Here is [an example that displays three "Like" buttons and passes data to each.](https://gist.github.com/gaearon/779b12e05ffd5f51ffadd50b7ded5bc8)
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4

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

<<<<<<< HEAD
Powyższe przykłady bazują na funkcjonalnościach wspieranych natywnie przez przeglądarki. To właśnie dlatego **like_button.js** używa javascriptowego wywołania funkcji, żeby powiedzieć Reactowi, co ma wyświetlić:
=======
The examples above rely on features that are natively supported by browsers. This is why **`like-button.js`** uses a JavaScript function call to tell React what to display:
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4

```js
return React.createElement('button', {onClick: () => setLiked(true)}, 'Lubię to');
```

Musisz jednak wiedzieć, że React oferuje także możliwość skorzystania z [JSX](/learn/writing-markup-with-jsx), składni javascriptowej podobnej do HTML:

```jsx
return <button onClick={() => setLiked(true)}>Lubię to</button>;
```

<<<<<<< HEAD
Obydwa fragmenty kodu są równoważne. JSX jest popularną składnią do opisywania znaczników w JavaScripcie. Wielu ludzi lubi ją za to, że wygląda znajomo i pomaga w pisaniu kodu dla UI - zarówno w Reakcie, jak i w innych bibliotekach. W innych projektach także możesz zobaczyć "znaczniki rozsiane po kodzie javascriptowym"!
=======
These two code snippets are equivalent. JSX is popular syntax for describing markup in JavaScript. Many people find it familiar and helpful for writing UI code--both with React and with other libraries.
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4

> Możesz poeksperymentować z przekształcaniem znaczników HTML-owych na JSX przy użyciu [tego konwertera online](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.17).

### Wypróbuj JSX {/*try-jsx*/}

<<<<<<< HEAD
Najszybszym sposobem na wypróbowanie składni JSX we własnym projekcie jest dodanie kompilatora Babel do sekcji `<head>` twojej strony, zaraz obok React i ReactDOM:

```html {6}
<!-- ... reszta sekcji <head> ... -->

<script src="https://unpkg.com/react@17/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js" crossorigin></script>

<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

</head>
<!-- ... reszta sekcji <body> ... -->
```

Od teraz możesz aktywować składnię JSX w dowolnym znaczniku `<script>` poprzez dodanie do niego atrybutu `type="text/babel"`, na przykład:

```jsx {1}
<script type="text/babel">
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<h1>Witaj, świecie!</h1>);
</script>
```

Aby przekształcić plik **like_button.js** na składnię JSX:

1. W pliku **like_button.js** zamień
=======
The quickest way to try JSX is to add the Babel compiler as a `<script>` tag to the page. Put it before **`like-button.js`**, and then add `type="text/babel"` attribute to the `<script>` tag for **`like-button.js`**:

```html {3,4}
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="like-button.js" type="text/babel"></script>
</body>
```

Now you can open **`like-button.js`** and replace
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4

```js
return React.createElement(
  'button',
  {
    onClick: () => setLiked(true),
  },
  'Lubię to'
);
```

<<<<<<< HEAD
na:

```jsx
return <button onClick={() => setLiked(true)}>Lubię to</button>;
```

2. W pliku **index.html** dodaj atrybut `type="text/babel"` do znacznika `<script>` ładującego przycisk:
=======
with the equivalent JSX code:

```jsx
return (
  <button onClick={() => setLiked(true)}>
    Like
  </button>
);
```

It may feel a bit unusual at first to mix JS with markup, but it will grow on you! Check out [Writing Markup in JSX](/learn/writing-markup-with-jsx) for an introduction. Here is [an example HTML file with JSX](https://raw.githubusercontent.com/reactjs/reactjs.org/main/static/html/single-file-example.html) that you can download and play with.
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4

<Gotcha>

<<<<<<< HEAD
Oto [gotowy przykładowy plik HTML z JSX-em](https://raw.githubusercontent.com/reactjs/reactjs.org/main/static/html/single-file-example.html), który możesz pobrać i uruchomić.

Takie podejście jest w akceptowalne przy nauce czy tworzeniu prostych wersji demo aplikacji. Jednak znacznie spowalnia ono stronę i **nie nadaje się na produkcję**. Kiedy stwierdzisz, że czas ruszyć dalej, usuń ten nowy znacznik `<script>` i dodany atrybut `type="text/babel"`. Zamiast tego wykonaj instrukcje z następnej sekcji, aby skonfigurować preprocesor JSX, który będzie automatycznie konwertował twoje znaczniki `<script>`.
=======
The Babel `<script>` compiler is fine for learning and creating simple demos. However, **it makes your website slow and isn't suitable for production**. When you're ready to move forward, remove the Babel `<script>` tag and remove the `type="text/babel"` attribute you've added in this step. Instead, in the next section you will set up a JSX preprocessor to convert all your `<script>` tags from JSX to JS.

</Gotcha>
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4

### Dodaj JSX do projektu {/*add-jsx-to-a-project*/}

Dodanie wsparcia dla składni JSX w projekcie nie wymaga użycia skomplikowanych narzędzi jak [bundler (_pol._ skrypt pakujący)](/learn/start-a-new-react-project#custom-toolchains) czy serwer deweloperski. Dodanie preprocesora JSX przypomina nieco dodawanie preprocesora CSS.

Za pomocą terminala przejdź do folderu projektu i wklej poniższe dwie komendy (**Przedtem upewnij się, że masz zainstalowany [Node.js](https://nodejs.org/)!**):

1. `npm init -y` (jeśli wystąpi błąd, [tutaj znajdziesz rozwiązanie](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d))
2. `npm install babel-cli@6 babel-preset-react-app@3`

Do zainstalowania preprocesora JSX potrzebujesz jedynie npm. Nie będzie ci on jednak potrzebny do niczego więcej. Zarówno React, jak i kod aplikacji mogą zostać w znacznikach `<script>` bez żadnych zmian.

Gratulacje! Właśnie udało ci się **skonfigurować JSX pod produkcję**.

### Uruchom preprocesor JSX {/*run-the-jsx-preprocessor*/}

<<<<<<< HEAD
Możesz uruchamiać preprocesor na kodzie JSX za każdym razem, gdy zapisujesz plik. Dzięki temu transformacja zostanie przeprowadzona ponownie, zamieniając plik JSX na nowy plik napisany w czystym JavaScripcie.

1. Stwórz folder o nazwie **src**
2. W terminalu uruchom polecenie: `npx babel --watch src --out-dir . --presets react-app/prod ` (Nie czekaj, aż polecenie się skończy! Ta komenta uruchamia automatyczny skrypt nasłuchujący dla plików JSX-owych.)
3. Przenieś swój świeżo przerobiony plik **like_button.js** do nowego folderu **src** (lub stwórz w nim plik **like_button.js** zawierający [ten kod startowy ze składnią JSX](https://gist.githubusercontent.com/rachelnabors/ffbc9a0e33665a58d4cfdd1676f05453/raw/652003ff54d2dab8a1a1e5cb3bb1e28ff207c1a6/like_button.js))

Skrypt nasłuchujący automatycznie stworzy przekonwertowany plik **like_button.js**, zawierający czysty kod javascriptowy zrozumiały dla przeglądarki.
=======
You can preprocess JSX so that every time you save a file with JSX in it, the transform will be re-run, converting the JSX file into a new, plain JavaScript file that the browser can understand. Here's how to set this up:

1. Create a folder called **`src`**.
2. In your terminal, run this command: `npx babel --watch src --out-dir . --presets react-app/prod ` (Don't wait for it to finish! This command starts an automated watcher for edits to JSX inside `src`.)
3. Move your JSX-ified **`like-button.js`** ([it should look like this!](https://gist.githubusercontent.com/gaearon/1884acf8834f1ef9a574a953f77ed4d8/raw/dfc664bbd25992c5278c3bf3d8504424c1104ecf/like-button.js)) to the new **`src`** folder.

The watcher will create a preprocessed **`like-button.js`** with the plain JavaScript code suitable for the browser.
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4

<Gotcha>

Jeśli widzisz błąd o treści: "You have mistakenly installed the `babel` package" (_pol._ "Omyłkowo zainstalowano pakiet `babel`"), wróć do [poprzedniego kroku](#add-jsx-to-a-project). Wykonaj zawarte w nim instrukcje w tym samym folderze, a następnie spróbuj ponownie.

</Gotcha>

<<<<<<< HEAD
Gdyby tego było mało, dzięki tej transformacji możesz używać nowoczesnej składni języka JavaScript (np. klas) bez obaw o wsparcie starszych przeglądarek. Narzędzie, którego dopiero co użyliśmy, to Babel. Możesz poczytać o nim więcej w [oficjalnej dokumentacji](https://babeljs.io/docs/en/babel-cli/).
=======
The tool you just used is called Babel, and you can learn more about it from [its documentation](https://babeljs.io/docs/en/babel-cli/). In addition to JSX, it lets you use the most recent JavaScript syntax features without worrying about breaking older browsers.
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4

Jeśli czujesz się już pewnie z narzędziami do budowania i chcesz, żeby robiły za ciebie więcej rzeczy, [zajrzyj do rozdziału, w którym opisujemy najpopularniejsze, przystępne zestawy narzędzi](/learn/start-a-new-react-project).

<DeepDive title="React bez składni JSX">

Pierwotnie JSX został stworzony po to, aby pisanie komponentów w Reakcie było podobne do pisania kodu HTML. Od tamtej pory używa się go dość powszechnie. Mimo to, czasem możesz nie chcieć lub nie móc użyć JSX-a. Wtedy masz dwie opcje:

<<<<<<< HEAD
- Użyć alternatywy dla JSX, np. [htm](https://github.com/developit/htm), która nie korzysta z kompilatora - zamiast tego operuje na natywnych dla JavaScriptu "Tagged Templates".
- Użyć funkcji [`React.createElement()`](/apis/createelement), która ma specyficzną strukturę, opisaną poniżej.
=======
- Use a JSX alternative like [htm](https://github.com/developit/htm) which uses JavaScript [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) instead of a compiler.
- Use [`React.createElement()`](/apis/createelement) which has a special structure explained below.
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4

W składni JSX, komponent wyglądałby tak:

```jsx
function Hello(props) {
  return <div>Witaj, {props.toWhat}</div>;
}

<<<<<<< HEAD
ReactDOM.render(<Hello toWhat="świecie" />, document.getElementById('root'));
=======
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Hello toWhat="World" />, );
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4
```

Przy użyciu funkcji `React.createElement()` to samo można zapisać jako:

```js
function Hello(props) {
<<<<<<< HEAD
  return React.createElement('div', null, `Witaj, ${props.toWhat}`);
}

ReactDOM.render(
  React.createElement(Hello, {toWhat: 'świecie'}, null),
  document.getElementById('root')
);
```

Funkcja ta przyjmuje trzy argumenty: `React.createElement(component, props, children)`. Oto jak działają:

1. Komponent **component**, który może być łańcuchem znaków reprezentującym element HTML-owy lub komponentem funkcyjnym
2. Obiekt **props**, zawierający dowolne [właściwości, jakie chcemy przekazać do komponentu](/learn/passing-props-to-a-component)
3. Obiekt **children**, reprezentujący dowolne komponenty potomne, np. tekst
=======
  return React.createElement('div', null, 'Hello ', props.toWhat);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  React.createElement(Hello, { toWhat: 'World' }, null)
);
```

It accepts several arguments: `React.createElement(component, props, ...children)`.

Here's how they work:

1. A **component**, which can be a string representing an HTML element or a function component
2. An object of any [**props** you want to pass](/learn/passing-props-to-a-component)
3. The rest are **children** the component might have, such as text strings or other elements
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4

Jeśli męczy cię ciągłe pisanie pełnego `React.createElement()`, możesz skrócić zapis poprzez przypisanie do zmiennej:

```js
const e = React.createElement;

<<<<<<< HEAD
ReactDOM.render(
  e('div', null, 'Witaj, świecie'),
  document.getElementById('root')
);
```

Po takim sprytnym przypisaniu może się okazać, że React bez JSX nie jest aż taki straszny i niewygodny, jak mogłoby się wydawać.
=======
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e('div', null, 'Hello World'));
```

Then, if you prefer this style, it can be just as convenient as JSX.
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4

</DeepDive>
