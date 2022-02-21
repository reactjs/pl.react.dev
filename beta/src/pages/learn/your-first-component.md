<<<<<<< HEAD
---
title: Twój pierwszy komponent
---

<Intro>

Komponent jest jednym z podstawowych pojęć w świecie Reacta. Jest bazą, na której buduje się interfejsy użytkownika (UI), przez co idealnie nadaje się na pierwszy temat do nauki!

</Intro>

<YouWillLearn>

- Czym jest komponent?
- Jaką rolę komponenty odgrywają w aplikacji reactowej?
- Jak napisać swój pierwszy komponent?

</YouWillLearn>

## Komponenty: cegiełki do budowania UI-a {/*components-ui-building-blocks*/}

W świecie aplikacji internetowych HTML pozwala nam na tworzenie dokumentów o bogatej strukturze przy pomocy wbudowanych znaczników, jak `<h1>` czy `<li>`:

```html
<article>
  <h1>Twój pierwszy komponent</h1>
  <ol>
    <li>Komponenty: cegiełki do budowania UI</li>
    <li>Definiowanie komponentu</li>
    <li>Używanie komponentu</li>
  </ol>
</article>
```

Powyższy kod odzwierciedla czytany przez ciebie artykuł `<article>`, jego nagłówek `<h1>` i (skrócony) spis treści w postaci listy numerowanej `<ol>`. Tego typu kod, połączony ze stylami CSS oraz interaktywnością napisaną w JavaScripcie, stoi za każdym paskiem bocznym, awatarem, oknem dialogowym, listą rozwijaną - każdym fragmentem UI-a widocznym w sieci.

React pozwala na połączenie znaczników, CSS-a i JavaScriptu w "komponent", **element wielokrotnego użytku stanowiący część UI-a twojej aplikacji.** Powyższy kod, reprezentujący spis treści, mógłby zostać zastąpiony komponentem `<TableOfContents />`, renderowanym na każdej stronie. Pod spodem nadal byłby to ten sam kod HTML, składający się z `<article>`, `<h1>` itd.

Podobnie jak w przypadku znaczników HTML-owych, komponenty można łączyć, zagnieżdżać i zmieniać im kolejność, tworząc w ten sposób całe strony. Dla przykładu, dokumentacja, którą właśnie czytasz, składa się z następujących komponentów:

```js
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">Dokumentacja</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
```

Wraz ze wzrostem złożoności projektu z pewnością zauważysz, że wiele widoków można poskładać z istniejących już komponentów, co znacznie skróci czas pisania kodu. Nasz spis treści mógłby być dodawany do każdej strony jako `<TableOfContents />`! Co więcej, możesz rozpędzić prace nad aplikacją korzystając z tysięcy komponentów udostępnianych przez reactową społeczność open-source'ową, takich jak [Chakra UI](https://chakra-ui.com/) czy [Material UI](https://material-ui.com/).

## Definiowanie komponentu {/*defining-a-component*/}

W przeszłości, kiedy programiści tworzyli stronę internetową, składali najpierw HTML, aby zbudować treść, a następnie dokładali kod javascriptowy dodający interakcje. Takie podejście działało, gdy interakcje na stronie były tylko przyjemnym dodatkiem; teraz dla wielu stron jest to mus. React stawia interakcje na pierwszym miejscu, w dalszym ciągu korzystając z tej samej technologii: **komponent reactowy jest więc funkcją javascriptową _okraszony znacznikami_**. Oto przykład, jak to może wyglądać w rzeczywistości (poniższy kod można edytować):

<Sandpack>

```js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}
```

```css
img { height: 200px; }
```

</Sandpack>

A oto przepis na stworzenie komponentu:

### Krok 1: Wyeksportuj komponent {/*step-1-export-the-component*/}

Prefiks `export default` należy do [standardowej składni JavaScriptu](https://developer.mozilla.org/docs/web/javascript/reference/statements/export) (nie jest specyficzny dla samego Reacta). Pozwala oznaczyć funkcję tak, aby można było ją zaimportować w innych plikach. (Więcej na temat importowania dowiesz się z rozdziału pt. [Importowanie i eksportowanie komponentów](/learn/importing-and-exporting-components)!)

### Krok 2: Zdefiniuj funkcję {/*step-2-define-the-function*/}

Za pomocą `function Profile() { }` definiujemy funkcję javascriptową o nazwie `Profile`.

<Gotcha>

Komponenty reactowe są zwykłymi funkcjami javascriptowymi, lecz **ich nazwy muszą naczynać od wiekiej litery**. W przeciwnym razie nie będą działać!

</Gotcha>

### Krok 3: Dodaj kod {/*step-3-add-markup*/}

Komponent zwraca znacznik `<img />` z atrybutami `src` oraz `alt`. `<img />` jest napisany jak w HTML-u, lecz tak naprawdę pod spodem wykonuje się kod javascriptowy! Ta składnia nosi nazwę [JSX](/learn/writing-markup-with-jsx) i pozwala umieszczać znaczniki w kodzie javascriptowym.

Instrukcje wyjścia (_ang._ return statements) mogą być napisane w jednej linii, jak w poniższym przykładzie:

```js
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
```

lecz jeśli znaczniki nie znajdują się w tej samej linii co instrukcja wyjścia, musisz otoczyć je parą nawiasów:

```js
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

<Gotcha>

Jeśli nie dodasz nawiasów, kod zawarty w kolejnych liniach po `return` [zostanie zignorowany](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)!

</Gotcha>

## Używanie komponentu {/*using-a-component*/}

Teraz gdy masz już zdefiniowany komponent `Profile`, możesz zagnieździć go w innych komponentach. Na przykład, możesz wyeksportować komponent `Gallery`, który wyświetla kilka komponentów `Profile`:

<Sandpack>

```js
function Profile() {
    return (
      <img
        src="https://i.imgur.com/MK3eW3As.jpg"
        alt="Katherine Johnson"
      />
    );
}

export default function Gallery() {
  return (
    <section>
      <h1>Niesamowici naukowcy</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

### Co widzi przeglądarka {/*what-the-browser-sees*/}

Zauważ różnicę w wielkości liter:

- `<section>` zaczyna się od małej litery, dzięki czemu React wie, że mamy na myśli znacznik HTML-owy.
- `<Profile />` zaczyna się od wielkiej litery `P`, stąd React wie, że mamy na myśli komponent o nazwie `Profile`.

A sam `Profile` zawiera jeszcze więcej kodu HTML: `<img />`. Ostatecznie, to, co trafia do przeglądarki, to:

```html
<section>
  <h1>Niesamowici naukowcy</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

### Zagnieżdżanie i rozmieszczanie komponentów {/*nesting-and-organizing-components*/}

Komponenty są zwykłymi funkcjami javascriptowymi, dzięki czemu możesz mieć kilka komponentów w tym samym pliku. Jest to wygodne, gdy komponenty są małe lub mocno ze sobą powiązane. Jeśli jednak plik zacznie robić się długi i skomplikowany, zawsze możesz przenieść `Profile` do osobnego pliku. Wkrótce dowiesz się, jak to zrobić, na [stronie o importach](/learn/importing-and-exporting-components).

Ponieważ komponenty `Profile` są renderowane wewnątrz `Gallery` — nawet kilka razy! — możemy powiedzieć, że `Gallery` jest **komponentem-rodzicem** (nadrzędnym), a każdy z `Profile` jest "dzieckiem" (potomkiem). Na tym właśnie polega magia Reacta: możesz zdefiniować komponent jeden raz, a używać go wielokrotnie w wielu miejscach.

<DeepDive title="Komponenty od góry do dołu">

Twoja aplikacja reactowa zaczyna się w komponencie głównym (_ang._ root - "korzeń"). Zwykle jest on tworzony automatycznie przy starcie nowego projektu. Na przykład, jeśli używasz [CodeSandbox](https://codesandbox.io/) lub [Create React App](https://create-react-app.dev/), komponent główny jest zdefiniowany w pliku `src/App.js`. Jeśli używasz frameworka [Next.js](https://nextjs.org/), komponent główny jest zdefiniowany w pliku `pages/index.js`. W poprzednich przykładach eksportowaliśmy własne komponenty główne.

Większość aplikacji reactowych używa komponentów "od góry do dołu". Oznacza to, że nie tylko fragmenty wielokrotnego użytku, jak przyciski, stają się komponentami, lecz także większe kawałki interfejsu, jak paski boczne, listy czy nawet całe strony! Komponenty doskonale sprawdzają się w porządkowaniu kodu UI, nawet jeśli niektórych z nich używamy tylko jeden raz.

Frameworki takie jak Next.js idą o krok dalej. Zamiast tworzyć pusty plik HTML i pozwolić Reactowi "przejąć kontrolę" nad stroną poprzez JavaScript, niektóre frameworki _również_ automatycznie generują kod HTML z komponentów. Umożliwia to wyświetlenie choć części treści strony, podczas gdy kod javascriptowy jest ładowany.

Mimo wszystko wiele stron używa Reacta tylko po to, by [dodać do nich "szczyptę interaktywności"](/learn/add-react-to-a-website). Mają one wiele komponentów głównych zamiast jednego na całą stronę. Świadczy to o tym, że Reacta można używać w takim stopniu, jaki jest aktualnie potrzebny.

</DeepDive>

<Recap>

Masz za sobą przedsmak tego, co potrafi React! Zróbmy małe podsumowanie.

- React umożliwia tworzenie komponentów - **elementów wielokrotnego użytku stanowiących fragmenty UI-a twojej aplikacji.**
- W aplikacji reactowej każdy kawałek interfejsu użytkownika jest komponentem.
- Komponenty reactowe są zwykłymi funkcjami javascriptowymi, przy czym:

  1. Ich nazwa musi zaczynać się od wielkiej litery.
  2. Zwracają kod JSX.

</Recap>

<Challenges>

### Wyeksportuj komponent {/*export-the-component*/}

Poniższy sandbox nie działa, ponieważ główny komponent nie jest wyeksportowany:

<Sandpack>

```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/lICfvbD.jpg"
      alt="Aklilu Lemma"
    />
  );
}
```

```css
img { height: 181px; }
```

</Sandpack>

Spróbuj naprawić błąd samodzielnie, zanim zajrzyjsz do rozwiązania!

<Solution>

Dodaj prefiks `export default` przed definicją funkcji:

<Sandpack>

```js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/lICfvbD.jpg"
      alt="Aklilu Lemma"
    />
  );
}
```

```css
img { height: 181px; }
```

</Sandpack>

Być może zastanawiasz się, dlaczego nie wystarczyło napisać `export`? Różnice pomiędzy `export` a `export default` opisaliśmy w rozdziale pt. [Importowanie i eksportowanie komponentów](/learn/importing-and-exporting-components).

</Solution>

### Napraw zwracaną wartość {/*fix-the-return-statement*/}

Coś jest nie tak z tą instrukcją `return`. Potrafisz to naprawić?

<Hint>

Podczas naprawiania tego błędu możesz natknąć się na błąd "Unexpected token". W takim wypadku upewnij się, że średnik znajduje się _po_ nawiasie zamykającym. Jeśli średnik znajdzie się wewnątrz `return ( )`, otrzymasz błąd.

</Hint>

<Sandpack>

```js
export default function Profile() {
  return
    <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}
```

```css
img { height: 180px; }
```

</Sandpack>

<Solution>

Możesz naprawić ten komponent przesuwając całe zwracane wyrażenie do jednej linii:

<Sandpack>

```js
export default function Profile() {
  return <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}
```

```css
img { height: 180px; }
```

</Sandpack>

Lub otaczając zwracany kod JSX parą nawiasów, która otwiera się za słowem `return`:

<Sandpack>

```js
export default function Profile() {
  return (
    <img 
      src="https://i.imgur.com/jA8hHMpm.jpg" 
      alt="Katsuko Saruhashi" 
    />
  );
}
```

```css
img { height: 180px; }
```

</Sandpack>

</Solution>

### Znajdź pomyłkę {/*spot-the-mistake*/}

Coś jest nie tak z definicją i użyciem komponentu `Profile`. Potrafisz znaleźć pomyłkę? (Spróbuj przypomnieć sobie, jak React odróżnia komponenty od zwykłych znaczników HTML-owych!)

<Sandpack>

```js
function profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Niesamowici naukowcy</h1>
      <profile />
      <profile />
      <profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

<Solution>

Nazwy komponentów reactowych muszą zaczynać się od wielkiej litery.

Zmień `function profile()` na `function Profile()`, a następnie każde `<profile />` na `<Profile />`:

<Sandpack>

```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Niesamowici naukowcy</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; }
```

</Sandpack>

</Solution>

### Napisz swój własny komponent {/*your-own-component*/}

Napisz komponent od zera. Możesz nadać mu dowolną poprawną nazwę i zwrócić dowolną strukturę znaczników. Jeśli brakuje ci pomysłów, stwórz komponent `Congratulations`, który wyświetla `<h1>Dobra robota!</h1>`. Nie zapomnij go wyeksportować!

<Sandpack>

```js
// Napisz tutaj swój komponent!
```

</Sandpack>

<Solution>

<Sandpack>

```js
export default function Congratulations() {
  return (
    <h1>Dobra robota!</h1>
  )
}
```

</Sandpack>

</Solution>

</Challenges>
=======
---
title: Your First Component
---

<Intro>

Components are one of the core concepts of React. They are the foundation upon which you build user interfaces (UI), which makes them the perfect place to start your React journey!

</Intro>

<YouWillLearn>

* What a component is
* What role components play in a React application
* How to write your first React component

</YouWillLearn>

## Components: UI building blocks {/*components-ui-building-blocks*/}

On the Web, HTML lets us create rich structured documents with its built-in set of tags like `<h1>` and `<li>`:

```html
<article>
  <h1>My First Component</h1>
  <ol>
    <li>Components: UI Building Blocks</li>
    <li>Defining a Component</li>
    <li>Using a Component</li>
  </ol>
</article>
```

This markup represents this article `<article>`, its heading `<h1>`, and an (abbreviated) table of contents as an ordered list `<ol>`. Markup like this, combined with CSS for style, and JavaScript for interactivity, lies behind every sidebar, avatar, modal, dropdown—every piece of UI you see on the Web.

React lets you combine your markup, CSS, and JavaScript into custom "components," **reusable UI elements for your app.** The table of contents code you saw above could be turned into a `<TableOfContents />` component you could render on every page. Under the hood, it still uses the same HTML tags like `<article>`, `<h1>`, etc.

Just like with HTML tags, you can compose, order and nest components to design whole pages. For example, the documentation page you're reading is made out of React components:

```js
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">Docs</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
```

As your project grows, you will notice that many of your designs can be composed by reusing components you already wrote, speeding up your development. Our table of contents above could be added to any screen with `<TableOfContents />`! You can even jumpstart your project with the thousands of components shared by the React open source community like [Chakra UI](https://chakra-ui.com/) and [Material UI](https://material-ui.com/).

## Defining a component {/*defining-a-component*/}

Traditionally when creating web pages, web developers marked up their content and then added interaction by sprinkling on some JavaScript. This worked great when interaction was a nice-to-have on the web. Now it is expected for many sites and all apps. React puts interactivity first while still using the same technology: **a React component is a JavaScript function that you can _sprinkle with markup_**. Here's what that looks like (you can edit the example below):

<Sandpack>

```js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}
```

```css
img { height: 200px; }
```

</Sandpack>

And here's how to build a component:

### Step 1: Export the component {/*step-1-export-the-component*/}

The `export default` prefix is a [standard JavaScript syntax](https://developer.mozilla.org/docs/web/javascript/reference/statements/export) (not specific to React). It lets you mark the main function in a file so that you can later import it from other files. (More on importing in [Importing and Exporting Components](/learn/importing-and-exporting-components)!)

### Step 2: Define the function {/*step-2-define-the-function*/}

With `function Profile() { }` you define a JavaScript function with the name `Profile`.

<Gotcha>

React components are regular JavaScript functions, but **their names must start with a capital letter** or they won't work!

</Gotcha>

### Step 3: Add markup {/*step-3-add-markup*/}

The component returns an `<img />` tag with `src` and `alt` attributes. `<img />` is written like HTML, but it is actually JavaScript under the hood! This syntax is called [JSX](/learn/writing-markup-with-jsx), and it lets you embed markup inside JavaScript.

Return statements can be written all on one line, as in this component:

```js
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
```

But if your markup isn't all on the same line as the `return` keyword, you must wrap it in a pair of parentheses like this:

```js
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

<Gotcha>

Without parentheses, any code on the lines after `return` [will be ignored](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)!

</Gotcha>

## Using a component {/*using-a-component*/}

Now that you've defined your `Profile` component, you can nest it inside other components. For example, you can export a `Gallery` component that uses multiple `Profile` components:

<Sandpack>

```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

### What the browser sees {/*what-the-browser-sees*/}

Notice the difference in casing:

* `<section>` is lowercase, so React knows we refer to an HTML tag.
* `<Profile />` starts with a capital `P`, so React knows that we want to use our component called `Profile`.

And `Profile` contains even more HTML: `<img />`. In the end, this is what the browser sees:

```html
<section>
  <h1>Amazing scientists</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

### Nesting and organizing components {/*nesting-and-organizing-components*/}

Components are regular JavaScript functions, so you can keep multiple components in the same file. This is convenient when components are relatively small or tightly related to each other. If this file gets crowded, you can always move `Profile` to a separate file. You will learn how to do this shortly on the [page about imports](/learn/importing-and-exporting-components).

Because the `Profile` components are rendered inside `Gallery`—even several times!—we can say that `Gallery` is a **parent component,** rendering each `Profile` as a "child". This is part of the magic of React: you can define a component once, and then use it in as many places and as many times as you like.

<DeepDive title="Components All the Way Down">

Your React application begins at a "root" component. Usually, it is created automatically when you start a new project. For example, if you use [CodeSandbox](https://codesandbox.io/) or [Create React App](https://create-react-app.dev/), the root component is defined in `src/App.js`. If you use the framework [Next.js](https://nextjs.org/), the root component is defined in `pages/index.js`. In these examples, you've been exporting root components.

Most React apps use components all the way down. This means that you won't only use components for reusable pieces like buttons, but also for larger pieces like sidebars, lists, and ultimately, complete pages! Components are a handy way to organize UI code and markup, even if some of them are only used once.

Frameworks like Next.js take this a step further. Instead of using an empty HTML file and letting React "take over" managing the page with JavaScript, they *also* generate the HTML automatically from your React components. This allows your app to show some content before the JavaScript code loads.

Still, many websites only use React to [add "sprinkles of interactivity"](/learn/add-react-to-a-website). They have many root components instead of a single one for the entire page. You can use as much—or as little—React as you need.

</DeepDive>

<Recap>

You've just gotten your first taste of React! Let's recap some key points.

* React lets you create components, **reusable UI elements for your app.**
* In a React app, every piece of UI is a component.
* React components are regular JavaScript functions except:

  1. Their names always begin with a capital letter.
  2. They return JSX markup.

</Recap>



<Challenges>

### Export the component {/*export-the-component*/}

This sandbox doesn't work because the root component is not exported:

<Sandpack>

```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/lICfvbD.jpg"
      alt="Aklilu Lemma"
    />
  );
}
```

```css
img { height: 181px; }
```

</Sandpack>

Try to fix it yourself before looking at the solution!

<Solution>

Add `export default` before the function definition like so:

<Sandpack>

```js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/lICfvbD.jpg"
      alt="Aklilu Lemma"
    />
  );
}
```

```css
img { height: 181px; }
```

</Sandpack>

You might be wondering why writing `export` alone is not enough to fix this example. You can learn the difference between `export` and `export default` in [Importing and Exporting Components](/learn/importing-and-exporting-components).

</Solution>

### Fix the return statement {/*fix-the-return-statement*/}

Something isn't right about this `return` statement. Can you fix it?

<Hint>

You may get an "Unexpected token" error while trying to fix this. In that case, check the that semicolon appears *after* the closing parenthesis. Leaving a semicolon inside `return ( )` will cause an error.

</Hint>


<Sandpack>

```js
export default function Profile() {
  return
    <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}
```

```css
img { height: 180px; }
```

</Sandpack>

<Solution>

You can fix this component by moving the return statement to one line like so:

<Sandpack>

```js
export default function Profile() {
  return <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}
```

```css
img { height: 180px; }
```

</Sandpack>

Or by wrapping the returned JSX markup in parentheses that open right after `return`:

<Sandpack>

```js
export default function Profile() {
  return (
    <img 
      src="https://i.imgur.com/jA8hHMpm.jpg" 
      alt="Katsuko Saruhashi" 
    />
  );
}
```

```css
img { height: 180px; }
```

</Sandpack>

</Solution>

### Spot the mistake {/*spot-the-mistake*/}

Something's wrong with how the `Profile` component is declared and used. Can you spot the mistake? (Try to remember how React distinguishes components from the regular HTML tags!)

<Sandpack>

```js
function profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <profile />
      <profile />
      <profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

<Solution>

React component names must start with a capital letter.

Change `function profile()` to `function Profile()`, and then change every `<profile />` to `<Profile />`:

<Sandpack>

```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; }
```

</Sandpack>

</Solution>

### Your own component {/*your-own-component*/}

Write a component from scratch. You can give it any valid name and return any markup. If you're out of ideas, you can write a `Congratulations` component thats shows `<h1>Good job!</h1>`. Don't forget to export it!

<Sandpack>

```js
// Write your component below!

```

</Sandpack>

<Solution>

<Sandpack>

```js
export default function Congratulations() {
  return (
    <h1>Good job!</h1>
  );
}
```

</Sandpack>

</Solution>

</Challenges>
>>>>>>> 2310e15532aba273d713996a4c6ef04247dff764
