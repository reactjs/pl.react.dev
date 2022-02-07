<<<<<<< HEAD
---
title: Dodaj Reacta do strony
---

<Intro>

React od początku był projektowany z myślą o stopniowym wdrażaniu, dzięki czemu możesz go użyć w takiej ilości, jaka jest ci potrzebna. Bez względu na to, czy pracujesz z mikrofrontendami, istniejącym systemem czy po prostu chcesz się pobawić Reactem, możesz zacząć dodawać komponenty reactowe do strony HTML dzięki zaledwie kilku linijkom kodu - i to bez instalowania całego zestawu narzędzi do budowania!

</Intro>

## Dodaj Reacta w minutę {/*add-react-in-one-minute*/}

Dodanie pierwszego komponentu reactowego do istniejącej strony HTML zajmie ci mniej niż minutę. Wypróbuj poniższych kroków na własnej stronie lub na [pustym pliku HTML](https://gist.github.com/rachelnabors/7b33305bf33776354797a2e3c1445186/archive/859eac2f7079c9e1f0a6eb818a9684a464064d80.zip) — potrzebujesz jedynie aktywnego połączenia internetowego i edytora tekstu, jak np. Notepad (lub VSCode — sprawdź nasz poradnik o tym, [jak go skonfigurować](/learn/editor-setup/))!

### Krok 1: Dodaj element do kodu HTML {/*step-1-add-an-element-to-the-html*/}

Na stronie HTML-owej, którą chcesz zmodyfikować, dodaj element, np. pusty znacznik `<div>` z unikalnym `id`, aby wyznaczyć miejsce, w którym chcesz wyświetlić coś za pomocą Reacta.

"Kontener", taki jak ten `<div>`, możesz umieścić gdziekolwiek wewnątrz `<body>`. React zastąpi jego całą zawartość, dlatego zwykle pozostawia się go pustego. Możesz mieć wiele takich elementów na jednej stronie HTML-owej.

```html {3}
<!-- ... istniejący kod HTML ... -->

<div id="tutaj-trafi-komponent"></div>

<!-- ... istniejący kod HTML ... -->
```

### Krok 2: Dodaj znaczniki script {/*step-2-add-the-script-tags*/}

Na stronie HTML-owej, zaraz przed zamykającym znacznikiem `</body>`, umieść trzy znaczniki `<script>` dla następujących plików:

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

Wreszcie, dodaj poniższe dwie linie na końcu pliku **like_button.js**. Odpowiadają one za znalezienie elementu `<div>` dodanego przez ciebie w kroku pierwszym, a następnie wyświetlenie wewnątrz niego przycisku "Lubię to".

```js
const domContainer = document.getElementById('tutaj-bedzie-komponent');
ReactDOM.render(React.createElement(LikeButton), domContainer);
```

**Gratulacje! Właśnie udało ci się wyrenderować swój pierwszy komponent reactowy na swojej stronie!**

- [Zobacz kompletny kod źródłowy](https://gist.github.com/rachelnabors/c64b3aeace8a191cf5ea6fb5202e66c9)
- [Pobierz kompletny przykład (2KB po spakowaniu)](https://gist.github.com/rachelnabors/c64b3aeace8a191cf5ea6fb5202e66c9/archive/7b41a88cb1027c9b5d8c6aff5212ecd3d0493504.zip)

#### Możesz używać komponentów wielokrotnie! {/*you-can-reuse-components*/}

Czasem chcemy wyświetlić któryś z komponentów reactowych w kilku miejscach na tej samej stronie HTML-owej. Najlepiej sprawdza się to, gdy części strony obsługiwane przez Reacta są od siebie odizolowane. Żeby tego dokonać, wywołaj `ReactDOM.render()` wielokrotnie na kilku elementach-kontenerach.

1. W pliku **index.html** dodaj drugi kontener `<div id="tutaj-tez-bedzie-komponent"></div>`.
2. W pliku **like_button.js** dodaj drugie wywołanie `ReactDOM.render()`, tym razem dla nowego kontenera:

```js {6,7,8,9}
ReactDOM.render(
  React.createElement(LikeButton),
  document.getElementById('tutaj-bedzie-komponent')
);

ReactDOM.render(
  React.createElement(LikeButton),
  document.getElementById('tutaj-tez-bedzie-komponent')
);
```

Sprawdź [przykład, który wyświetla przycisk "Lubię to" trzy razy i przekazuje do niego dane](https://gist.github.com/rachelnabors/c0ea05cc33fbe75ad9bbf78e9044d7f8)!

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

Powyższe przykłady bazują na funkcjonalnościach wspieranych natywnie przez przeglądarki. To właśnie dlatego **like_button.js** używa javascriptowego wywołania funkcji, żeby powiedzieć Reactowi, co ma wyświetlić:

```js
return React.createElement(
  'button',
  {
    onClick: () => setLiked(true),
  },
  'Lubię to'
);
```

Musisz jednak wiedzieć, że React oferuje także możliwość skorzystania z [JSX](/learn/writing-markup-with-jsx), składni javascriptowej podobnej do HTML:

```jsx
return <button onClick={() => setLiked(true)}>Lubię to</button>;
```

Obydwa fragmenty kodu są równoważne. JSX jest popularną składnią do opisywania znaczników w JavaScripcie. Wielu ludzi lubi ją za to, że wygląda znajomo i pomaga w pisaniu kodu dla UI - zarówno w Reakcie, jak i w innych bibliotekach. W innych projektach także możesz zobaczyć "znaczniki rozsiane po kodzie javascriptowym"!

> Możesz poeksperymentować z przekształcaniem znaczników HTML-owych na JSX przy użyciu [tego konwertera online](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.4.3).

### Wypróbuj JSX {/*try-jsx*/}

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
  ReactDOM.render(
  <h1>Witaj, świecie!</h1>, document.getElementById('root') );
</script>
```

Aby przekształcić plik **like_button.js** na składnię JSX:

1. W pliku **like_button.js** zamień

```js
return React.createElement(
  'button',
  {
    onClick: () => setLiked(true),
  },
  'Lubię to'
);
```

na:

```jsx
return <button onClick={() => setLiked(true)}>Lubię to</button>;
```

2. W pliku **index.html** dodaj atrybut `type="text/babel"` do znacznika `<script>` ładującego przycisk:

```html
<script src="like_button.js" type="text/babel"></script>
```

Oto [gotowy przykładowy plik HTML z JSX-em](https://raw.githubusercontent.com/reactjs/reactjs.org/main/static/html/single-file-example.html), który możesz pobrać i uruchomić.

Takie podejście jest w akceptowalne przy nauce czy tworzeniu prostych wersji demo aplikacji. Jednak znacznie spowalnia ono stronę i **nie nadaje się na produkcję**. Kiedy stwierdzisz, że czas ruszyć dalej, usuń ten nowy znacznik `<script>` i dodany atrybut `type="text/babel"`. Zamiast tego wykonaj instrukcje z następnej sekcji, aby skonfigurować preprocesor JSX, który będzie automatycznie konwertował twoje znaczniki `<script>`.

### Dodaj JSX do projektu {/*add-jsx-to-a-project*/}

Dodanie wsparcia dla składni JSX w projekcie nie wymaga użycia skomplikowanych narzędzi jak [bundler (_pol._ skrypt pakujący)](/learn/start-a-new-react-project#custom-toolchains) czy serwer deweloperski. Dodanie preprocesora JSX przypomina nieco dodawanie preprocesora CSS.

Za pomocą terminala przejdź do folderu projektu i wklej poniższe dwie komendy (**Przedtem upewnij się, że masz zainstalowany [Node.js](https://nodejs.org/)!**):

1. `npm init -y` (jeśli wystąpi błąd, [tutaj znajdziesz rozwiązanie](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d))
2. `npm install babel-cli@6 babel-preset-react-app@3`

Do zainstalowania preprocesora JSX potrzebujesz jedynie npm. Nie będzie ci on jednak potrzebny do niczego więcej. Zarówno React, jak i kod aplikacji mogą zostać w znacznikach `<script>` bez żadnych zmian.

Gratulacje! Właśnie udało ci się **skonfigurować JSX pod produkcję**.

### Uruchom preprocesor JSX {/*run-the-jsx-preprocessor*/}

Możesz uruchamiać preprocesor na kodzie JSX za każdym razem, gdy zapisujesz plik. Dzięki temu transformacja zostanie przeprowadzona ponownie, zamieniając plik JSX na nowy plik napisany w czystym JavaScripcie.

1. Stwórz folder o nazwie **src**
2. W terminalu uruchom polecenie: `npx babel --watch src --out-dir . --presets react-app/prod ` (Nie czekaj, aż polecenie się skończy! Ta komenta uruchamia automatyczny skrypt nasłuchujący dla plików JSX-owych.)
3. Przenieś swój świeżo przerobiony plik **like_button.js** do nowego folderu **src** (lub stwórz w nim plik **like_button.js** zawierający [ten kod startowy ze składnią JSX](https://gist.githubusercontent.com/rachelnabors/ffbc9a0e33665a58d4cfdd1676f05453/raw/652003ff54d2dab8a1a1e5cb3bb1e28ff207c1a6/like_button.js))

Skrypt nasłuchujący automatycznie stworzy przekonwertowany plik **like_button.js**, zawierający czysty kod javascriptowy zrozumiały dla przeglądarki.

<Gotcha>

Jeśli widzisz błąd o treści: "You have mistakenly installed the `babel` package" (_pol._ "Omyłkowo zainstalowano pakiet `babel`"), wróć do [poprzedniego kroku](#add-jsx-to-a-project). Wykonaj zawarte w nim instrukcje w tym samym folderze, a następnie spróbuj ponownie.

</Gotcha>

Gdyby tego było mało, dzięki tej transformacji możesz używać nowoczesnej składni języka JavaScript (np. klas) bez obaw o wsparcie starszych przeglądarek. Narzędzie, którego dopiero co użyliśmy, to Babel. Możesz poczytać o nim więcej w [oficjalnej dokumentacji](https://babeljs.io/docs/en/babel-cli/).

Jeśli czujesz się już pewnie z narzędziami do budowania i chcesz, żeby robiły za ciebie więcej rzeczy, [zajrzyj do rozdziału, w którym opisujemy najpopularniejsze, przystępne zestawy narzędzi](/learn/start-a-new-react-project).

<DeepDive title="React bez składni JSX">

Pierwotnie JSX został stworzony po to, aby pisanie komponentów w Reakcie było podobne do pisania kodu HTML. Od tamtej pory używa się go dość powszechnie. Mimo to, czasem możesz nie chcieć lub nie móc użyć JSX-a. Wtedy masz dwie opcje:

- Użyć alternatywy dla JSX, np. [htm](https://github.com/developit/htm), która nie korzysta z kompilatora - zamiast tego operuje na natywnych dla JavaScriptu "Tagged Templates".
- Użyć funkcji [`React.createElement()`](/reference/createelement), która ma specyficzną strukturę, opisaną poniżej.

W składni JSX, komponent wyglądałby tak:

```jsx
function Hello(props) {
  return <div>Witaj, {props.toWhat}</div>;
}

ReactDOM.render(<Hello toWhat="świecie" />, document.getElementById('root'));
```

Przy użyciu funkcji `React.createElement()` to samo można zapisać jako:

```js
function Hello(props) {
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

Jeśli męczy cię ciągłe pisanie pełnego `React.createElement()`, możesz skrócić zapis poprzez przypisanie do zmiennej:

```js
const e = React.createElement;

ReactDOM.render(
  e('div', null, 'Witaj, świecie'),
  document.getElementById('root')
);
```

Po takim sprytnym przypisaniu może się okazać, że React bez JSX nie jest aż taki straszny i niewygodny, jak mogłoby się wydawać.

</DeepDive>
=======
---
title: Add React to a Website
---

<Intro>

React has been designed from the start for gradual adoption, and you can use as little or as much React as you need. Whether you're working with micro-frontends, an existing system, or just giving React a try, you can start adding interactive React components to an HTML page with just a few lines of code—and no build tooling!

</Intro>

## Add React in one minute {/*add-react-in-one-minute*/}

You can add a React component to an existing HTML page in under a minute. Try this out with your own website or [an empty HTML file](https://gist.github.com/rachelnabors/7b33305bf33776354797a2e3c1445186/archive/859eac2f7079c9e1f0a6eb818a9684a464064d80.zip)—all you need is an internet connection and a text editor like Notepad (or VSCode—check out our guide on [how to set yours up](/learn/editor-setup/))!

### Step 1: Add an element to the HTML {/*step-1-add-an-element-to-the-html*/}

In the HTML page you want to edit, add an HTML element like an empty `<div>` tag with a unique `id` to mark the spot where you want to display something with React.

You can place a "container" element like this `<div>` anywhere inside the `<body>` tag. React will replace any existing content inside HTML elements, so they are usually empty. You can have as many of these HTML elements on one page as you need.

```html {3}
<!-- ... existing HTML ... -->

<div id="component-goes-here"></div>

<!-- ... existing HTML ... -->
```

### Step 2: Add the Script Tags {/*step-2-add-the-script-tags*/}

In the HTML page, right before the closing `</body>` tag, add three `<script>` tags for the following files:

- [**react.development.js**](https://unpkg.com/react@17/umd/react.development.js) loads the core of React
- [**react-dom.development.js**](https://unpkg.com/react-dom@17/umd/react-dom.development.js) lets React render HTML elements to the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model).
- **like_button.js** is where you'll write your component in step 3!

<Gotcha>

When deploying, replace "development.js" with "production.min.js".

</Gotcha>

```html
  <!-- end of the page -->
  <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
  <script src="like_button.js"></script>
</body>
```

### Step 3: Create a React component {/*step-3-create-a-react-component*/}

Create a file called **like_button.js** next to your HTML page, add this code snippet, and save the file. This code defines a React component called `LikeButton`. [You can learn more about making components in our guides.](/learn/your-first-component)

```js
'use strict';

function LikeButton() {
  const [liked, setLiked] = React.useState(false);

  if (liked) {
    return 'You liked this!';
  }

  return React.createElement(
    'button',
    {
      onClick: () => setLiked(true),
    },
    'Like'
  );
}
```

### Step 4: Add your React Component to the page {/*step-4-add-your-react-component-to-the-page*/}

Lastly, add two lines to the bottom of **like_button.js**. These two lines of code find the `<div>` you added to your HTML in the first step and then display the "Like" button React component inside of it.

```js
const domContainer = document.getElementById('component-goes-here');
ReactDOM.render(React.createElement(LikeButton), domContainer);
```

**Congratulations! You have just rendered your first React component to your website!**

- [View the full example source code](https://gist.github.com/rachelnabors/c64b3aeace8a191cf5ea6fb5202e66c9)
- [Download the full example (2KB zipped)](https://gist.github.com/rachelnabors/c64b3aeace8a191cf5ea6fb5202e66c9/archive/7b41a88cb1027c9b5d8c6aff5212ecd3d0493504.zip)

#### You can reuse components! {/*you-can-reuse-components*/}

You might want to display a React component in multiple places on the same HTML page. This is most useful while React-powered parts of the page are isolated from each other. You can do this by calling `ReactDOM.render()` multiple times with multiple container elements.

1. In **index.html**, add an additional container element `<div id="component-goes-here-too"></div>`.
2. In **like_button.js**, add an additional `ReactDOM.render()` for the new container element:

```js {6,7,8,9}
ReactDOM.render(
  React.createElement(LikeButton),
  document.getElementById('component-goes-here')
);

ReactDOM.render(
  React.createElement(LikeButton),
  document.getElementById('component-goes-here-too')
);
```

Check out [an example that displays the "Like" button three times and passes some data to it](https://gist.github.com/rachelnabors/c0ea05cc33fbe75ad9bbf78e9044d7f8)!

### Step 5: Minify JavaScript for production {/*step-5-minify-javascript-for-production*/}

Unminified JavaScript can significantly slow down page load times for your users. Before deploying your website to production, it's a good idea to minify its scripts.

- **If you don't have a minification step** for your scripts, [here's one way to set it up](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3).
- **If you already minify** your application scripts, your site will be production-ready if you ensure that the deployed HTML loads the versions of React ending in `production.min.js` like so:

```html
<script src="https://unpkg.com/react@17/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js" crossorigin></script>
```

## Try React with JSX {/*try-react-with-jsx*/}

The examples above rely on features that are natively supported by browsers. This is why **like_button.js** uses a JavaScript function call to tell React what to display:

```js
return React.createElement('button', {onClick: () => setLiked(true)}, 'Like');
```

However, React also offers an option to use [JSX](/learn/writing-markup-with-jsx), an HTML-like JavaScript syntax, instead:

```jsx
return <button onClick={() => setLiked(true)}>Like</button>;
```

These two code snippets are equivalent. JSX is popular syntax for describing markup in JavaScript. Many people find it familiar and helpful for writing UI code--both with React and with other libraries. You might see "markup sprinkled throughout your JavaScript" in other projects!

> You can play with transforming HTML markup into JSX using [this online converter](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.4.3).

### Try JSX {/*try-jsx*/}

The quickest way to try JSX in your project is to add the Babel compiler to your page's `<head>` along with React and ReactDOM like so:

```html {6}
<!-- ... rest of <head> ... -->

<script src="https://unpkg.com/react@17/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js" crossorigin></script>

<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

</head>
<!-- ... rest of <body> ... -->
```

Now you can use JSX in any `<script>` tag by adding `type="text/babel"` attribute to it. For instance:

```jsx {1}
<script type="text/babel">
  ReactDOM.render(
  <h1>Hello, world!</h1>, document.getElementById('root') );
</script>
```

To convert **like_button.js** to use JSX:

1. In **like_button.js**, replace

```js
return React.createElement(
  'button',
  {
    onClick: () => setLiked(true),
  },
  'Like'
);
```

with:

```jsx
return <button onClick={() => setLiked(true)}>Like</button>;
```

2. In **index.html**, add `type="text/babel"` to the like button's script tag:

```html
<script src="like_button.js" type="text/babel"></script>
```

Here is [an example HTML file with JSX](https://raw.githubusercontent.com/reactjs/reactjs.org/main/static/html/single-file-example.html) that you can download and play with.

This approach is fine for learning and creating simple demos. However, it makes your website slow and **isn't suitable for production**. When you're ready to move forward, remove this new `<script>` tag and the `type="text/babel"` attributes you've added. Instead, in the next section you will set up a JSX preprocessor to convert all your `<script>` tags automatically.

### Add JSX to a project {/*add-jsx-to-a-project*/}

Adding JSX to a project doesn't require complicated tools like a [bundler](/learn/start-a-new-react-project#custom-toolchains) or a development server. Adding a JSX preprocessor is a lot like adding a CSS preprocessor.

Go to your project folder in the terminal, and paste these two commands (**Be sure you have [Node.js](https://nodejs.org/) installed!**):

1. `npm init -y` (if it fails, [here's a fix](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d))
2. `npm install babel-cli@6 babel-preset-react-app@3`

You only need npm to install the JSX preprocessor. You won't need it for anything else. Both React and the application code can stay as `<script>` tags with no changes.

Congratulations! You just added a **production-ready JSX setup** to your project.

### Run the JSX Preprocessor {/*run-the-jsx-preprocessor*/}

You can preprocess JSX so that every time you save a file with JSX in it, the transform will be re-run, converting the JSX file into a new, plain JavaScript file.

1. Create a folder called **src**
2. In your terminal, run this command: `npx babel --watch src --out-dir . --presets react-app/prod ` (Don't wait for it to finish! This command starts an automated watcher for JSX.)
3. Move your JSX-ified **like_button.js** to the new **src** folder (or create a **like_button.js** containing this [JSX starter code](https://gist.githubusercontent.com/rachelnabors/ffbc9a0e33665a58d4cfdd1676f05453/raw/652003ff54d2dab8a1a1e5cb3bb1e28ff207c1a6/like_button.js))

The watcher will create a preprocessed **like_button.js** with the plain JavaScript code suitable for the browser.

<Gotcha>

If you see an error message saying "You have mistakenly installed the `babel` package", you might have missed [the previous step](#add-jsx-to-a-project). Perform it in the same folder, and then try again.

</Gotcha>

As a bonus, this also lets you use modern JavaScript syntax features like classes without worrying about breaking older browsers. The tool we just used is called Babel, and you can learn more about it from [its documentation](https://babeljs.io/docs/en/babel-cli/).

If you're getting comfortable with build tools and want them to do more for you, [we cover some of the most popular and approachable toolchains here](/learn/start-a-new-react-project).

<DeepDive title="React without JSX">

Originally JSX was introduced to make writing components with React feel as familiar as writing HTML. Since then, the syntax has become widespread. However, there may be instances where you do not want to use or cannot use JSX. You have two options:

- Use a JSX alternative like [htm](https://github.com/developit/htm) which doesn't use a compiler—it uses JavaScript's native Tagged Templates.
- Use [`React.createElement()`](/apis/createelement), which has a special structure explained below.

With JSX, you would write a component like so:

```jsx
function Hello(props) {
  return <div>Hello {props.toWhat}</div>;
}

ReactDOM.render(<Hello toWhat="World" />, document.getElementById('root'));
```

With `React.createElement()`, you would write it like this:

```js
function Hello(props) {
  return React.createElement('div', null, `Hello ${props.toWhat}`);
}

ReactDOM.render(
  React.createElement(Hello, {toWhat: 'World'}, null),
  document.getElementById('root')
);
```

It accepts three arguments: `React.createElement(component, props, children)`. Here's how they work:

1. A **component**, which can be a string representing an HTML element or a function component
2. An object of any [**props** you want to pass](/learn/passing-props-to-a-component)
3. An object of any **children** the component might have, such as text strings

If you get tired of typing `React.createElement()`, one common pattern is to assign a shorthand:

```js
const e = React.createElement;

ReactDOM.render(e('div', null, 'Hello World'), document.getElementById('root'));
```

If you use this shorthand form for `React.createElement()`, it can be almost as convenient to use React without JSX.

</DeepDive>
>>>>>>> 20f0fe280f3c122df7541256b983c46e21e33b20
