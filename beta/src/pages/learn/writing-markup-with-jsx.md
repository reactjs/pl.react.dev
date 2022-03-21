<<<<<<< HEAD
---
title: Pisanie kodu w JSX
---

<Intro>

JSX to rozszerzenie składni JavaScriptu, które pozwala używać znaczników podobnych do tych w HTML-u wewnątrz pliku javascriptowego. Większość deweloperów korzysta z niego ze względu na zwięzłość, mimo że istnieją inne sposoby na tworzenie komponentów.

</Intro>

<YouWillLearn>

* Dlaczego React miesza znaczniki z logiką renderowania
* Czym JSX różni się od HTML-u
* Jak wyświetlić informacje za pomocą JSX-a

</YouWillLearn>

## JSX: Wrzucanie znaczników do JavaScriptu {/*jsx-putting-markup-into-javascript*/}

Sieć WWW z grubsza została zbudowana przy pomocy HTML-u, CSS-a i JavaScriptu. Przez wiele lat deweloperzy trzymali treść w HTML-u, wygląd w CSS-ie i logikę w JavaScripcie - często każda z tych rzeczy była w osobnym pliku! Treść była opisywana znacznikami wewnątrz HTML-u, a logika strony była w osobnym skrypcie JavaScriptowym:

![HTML i JavaScript trzymane w osobnych plikach](/images/docs/illustrations/i_html_js.svg)

Jednak z czasem strony WWW stały się bardziej interaktywne, a logika częściej stanowiła o zawartości. JavaScript stał się odpowiedzialny za HTML! To dlatego **w Reakcie logika renderowania i znaczniki żyją w tym samym miejscu - w komponencie!**

![Funkcje javascriptowe przeplatane kodem znaczników](/images/docs/illustrations/i_jsx.svg)

Trzymanie logiki renderowania przycisku razem z jego kodem znaczników daje nam pewność, że będą zsynchronizowane przy każdej edycji. Z drugiej strony, detale, które nie są ze sobą powiązane, jak np. kody przycisku i paska bocznego, są od siebie odseparowane, dzięki czemu bezpieczniej jest modifykować każde z nich.

Każdy komponent reactowy jest funkcją javascriptową, która może zwracać strukturę renderowaną przez Reacta do przeglądarki. Komponenty te używają rozszerzenia składni zwanego JSX, za pomocą którego określają strukturę kodu. JSX wygląda bardzo podobnie do HTML-u, jednak jest nieco bardziej restrykcyjny, a ponadto może wyświetlać dynamiczną zawartość. Najłatwiej będzie to zrozumieć, kiedy przepiszemy fragment kodu HTML-owego na JSX.

<Note>

[JSX i React to dwie różne rzeczy](/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform), których _można_ używać niezależnie.

</Note>

## Przekształcanie HTML-u w JSX {/*converting-html-to-jsx*/}

Załóżmy, że mamy taki (całkowicie poprawny) kod HTML:

```html
<h1>Lista zadań Hedy Lamarr</h1>
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  class="photo"
>
<ul>
    <li>Wynaleźć nową sygnalizację świetlną
    <li>Przećwiczyć scenę do filmu
    <li>Usprawnić technologię rozpraszania widma
</ul>
```

I chcemy wrzucić go do poniższego komponentu:

```js
export default function TodoList() {
  return (
    // ???
  )
}
```

Jeśli zwyczajnie skopiujesz kod taki, jaki jest, nie zadziała:

<Sandpack>

```js
export default function TodoList() {
  return (
    // Nie chce działać!
    <h1>Lista zadań Hedy Lamarr</h1>
    <img 
      src="https://i.imgur.com/yXOvdOSs.jpg" 
      alt="Hedy Lamarr" 
      class="photo"
    >
    <ul>
      <li>Wynaleźć nową sygnalizację świetlną
      <li>Przećwiczyć scenę do filmu
      <li>Usprawnić technologię rozpraszania widma
    </ul>
  );
}
```

```css
img { height: 90px }
```

</Sandpack>

Dzieje się tak, ponieważ składnia JSX jest nieco bardziej restrykcyjna i ma więcej reguł niż HTML! Błędy, które pojawiają się przy powyższym kodzie, powinny naprowadzić cię na to, jak go naprawić. Jeśli nie, czytaj dalej.

<Note>

W większości przypadków błędy wyświetlane przez Reacta naprowadzą cię na źródło problemu. Jeśli coś nie działa, postępuj zgodnie z instrukcjami!

</Note>

## Zasady składni JSX {/*the-rules-of-jsx*/}

### 1. Zwróć pojedynczy element główny {/*1-return-a-single-root-element*/}

Aby komponent zwrócił kilka elementów, **musimy je opakować w pojedynczy komponent główny**.

Możesz, na przykład, użyć znacznika `<div>`:

```js {1,11}
<div>
  <h1>Lista zadań Hedy Lamarr</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</div>
```


Jeśli nie chcesz wstawiać dodatkowego `<div>` do struktury, zamiast tego możesz użyć pary `<>` oraz `</>`:

```js {1,11}
<>
  <h1>Lista zadań Hedy Lamarr</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</>
```

Ten pusty znacznik nazywamy *[fragmentem reactowym](TODO)*. Fragmenty pozwalają grupować rzeczy bez zostawiania śladu w drzewie HTML przesłanym do przeglądarki.

<DeepDive title="Dlaczego musimy opakowywać kilka znaczników JSX-owych?">

Składnia JSX wygląda jak HTML, ale pod spodem jest transformowana do zwykłych obiektów javascriptowych. Nie można przecież zwrócić w funkcji dwóch obiektów bez uprzedniego opakowania ich w tablicę. Dlatego właśnie nie można zwrócić dwóch znaczników JSX bez opakowywania ich w jeden główny znacznik lub fragment.

</DeepDive>

### 2. Zamknij wszystkie znaczniki {/*2-close-all-the-tags*/}

JSX wymaga, by wszystkie znaczniki były jawnie zamknięte: samozamykające się znaczniki jak `<img>` musimy zapisać jako `<img />`, a znaczniki opakowujące jak `<li>pomarańcze` musimy zapisać jako `<li>pomarańcze</li>`.

Tak wyglądałoby zdjęcie Hedy Lamarr i jej lista zadań z domkniętymi znacznikami:

```js {2-6,8-10}
<>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
   />
  <ul>
    <li>Wynaleźć nową sygnalizację świetlną</li>
    <li>Przećwiczyć scenę do filmu</li>
    <li>Usprawnić technologię rozpraszania widma</li>
  </ul>
</>
```

### 3. <s>Wszystko</s> Większość rzeczy musi być zapisana camelCasem! {/*3-camelcase-salls-most-of-the-things*/}

JSX przekształcany jest w JavaScript, a atrybuty zapisane w JSX-ie stają się kluczami obiektów javascriptowych. W swoich własnych komponentach zwykle będziemy chcieli odczytywać wartości tych atrybutów pod postacią zmiennych. Jednak JavaScript ma pewne ograniczenia co do nazw zmiennych. Na przykład, nazwy nie mogą zawierać myślników ani być słowami zarezerwowanymi, jak `class`.

To dlatego w Reakcie wiele atrybutów HTML-owych i SVG zapisujemy camelCasem. Dla przykładu, zamiast pisać `stroke-width`, piszemy `strokeWidth`. Z uwagi na fakt, że `class` jest słowem zarezerwowanym, w Reakcie zapisujemy go jako `className`, idąc w ślady za nomenklaturą [odpowiadającej mu właściwości DOM](https://developer.mozilla.org/en-US/docs/Web/API/Element/className):

```js {4}
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  className="photo"
/>
```

[Wszystkie te atrybuty znajdziesz w elementach React DOM](TODO). Jeśli zdarzy ci się pomylić, nie martw się - React wyświetli w [konsoli przeglądarki](https://developer.mozilla.org/docs/Tools/Browser_Console) błąd z instrukcją, jak naprawić problem.

<Gotcha>

Ze względów historycznych atrybuty [`aria-*`](https://developer.mozilla.org/docs/Web/Accessibility/ARIA) oraz [`data-*`](https://developer.mozilla.org/docs/Learn/HTML/Howto/Use_data_attributes) piszemy tak, jak w HTML-u, czyli z myślnikami.

</Gotcha>

### Wskazówka: Używaj konwertera JSX {/*pro-tip-use-a-jsx-converter*/}

Konwertowanie wszystkich tych atrybutów w odpowiedni kod znaczników jest żmudne! Zalecamy korzystanie z [konwertera](https://transform.tools/html-to-jsx), który pomoże przekształcić istniejący kod HTML i SVG w JSX. Tego typu konwertery są pomocne w praktyce, jednak warto wiedzieć, co tak naprawdę dzieje się pod spodem, aby umieć pisać JSX samodzielnie.

Oto nasz rezultat końcowy:

<Sandpack>

```js
export default function TodoList() {
  return (
    <>
      <h1>Lista zadań Hedy Lamarr</h1>
      <img 
        src="https://i.imgur.com/yXOvdOSs.jpg" 
        alt="Hedy Lamarr" 
        className="photo" 
      />
      <ul>
        <li>Wynaleźć nową sygnalizację świetlną</li>
        <li>Przećwiczyć scenę do filmu</li>
        <li>Usprawnić technologię rozpraszania widma</li>
      </ul>
    </>
  );
}
```

```css
img { height: 90px }
```

</Sandpack>

<Recap>

Teraz już wiesz, po co istnieje składnia JSX i jak jej używać w komponentach:

* Komponenty reactowe grupują w sobie logikę renderowania ze strukturą elementów, ponieważ obie rzeczy są ze sobą powiązane.
* JSX jest podobny do HTML-u, z kilkoma różnicami. Jeśli zajdzie potrzeba, możesz skorzystać z [konwertera](https://transform.tools/html-to-jsx).
* Błędy wyświetlane na ekranie czy w konsoli przeglądarki zwykle poprowadzą cię do rozwiązania problemów z kodem.

</Recap>



<Challenges>

### Przepisz kod HTML na JSX {/*convert-some-html-to-jsx*/}

Pewien kod HTML został wklejony do komponentu, jednak nie jest zgodny ze składnią JSX. Napraw go:

<Sandpack>

```js
export default function Bio() {
  return (
    <div class="intro">
      <h1>Witaj na mojej stronie!</h1>
    </div>
    <p class="summary">
      Wrzucam na nią swoje przemyślenia.
      <br><br>
      <b>I <i>zdjęcia</b></i> naukowców!
    </p>
  );
}
```

```css
.intro {
  background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.summary {
  padding: 20px;
  border: 10px solid gold;
}
```

</Sandpack>

Od ciebie zależy, czy poprawisz go ręcznie, czy przepuścisz przez konwerter!

<Solution>

<Sandpack>

```js
export default function Bio() {
  return (
    <div>
      <div className="intro">
        <h1>Witaj na mojej stronie!</h1>
      </div>
      <p className="summary">
        Wrzucam na nią swoje przemyślenia.
        <br /><br />
        <b>I <i>zdjęcia</i></b> of naukowców!
      </p>
    </div>
  );
}
```

```css
.intro {
  background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.summary {
  padding: 20px;
  border: 10px solid gold;
}
```

</Sandpack>

</Solution>

</Challenges>
=======
---
title: Writing Markup with JSX
---

<Intro>

JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file. Although there are other ways to write components, most React developers prefer the conciseness of JSX, and most codebases use it.

</Intro>

<YouWillLearn>

* Why React mixes markup with rendering logic
* How JSX is different from HTML
* How to display information with JSX

</YouWillLearn>

## JSX: Putting markup into JavaScript {/*jsx-putting-markup-into-javascript*/}

The Web has been built on HTML, CSS, and JavaScript. For many years, web developers kept content in HTML, design in CSS, and logic in JavaScript—often in separate files! Content was marked up inside HTML while the page's logic lived separately in JavaScript:

<DiagramGroup>

<Diagram name="writing_jsx_html" height={237} width={325} alt="HTML markup with purple background and a div with two child tags: p and form. ">

HTML

</Diagram>

<Diagram name="writing_jsx_js" height={237} width={325} alt="Three JavaScript handlers with yellow background: onSubmit, onLogin, and onClick.">

JavaScript

</Diagram>

</DiagramGroup>

But as the Web became more interactive, logic increasingly determined content. JavaScript was in charge of the HTML! This is why **in React, rendering logic and markup live together in the same place—components!**

<DiagramGroup>

<Diagram name="writing_jsx_sidebar" height={330} width={325} alt="React component with HTML and JavaScript from previous examples mixed. Function name is Sidebar which calls the function isLoggedIn, highlighted in yellow. Nested inside the function highlighted in purple is the p tag from before, and a Form tag referencing the component shown in the next diagram.">

Sidebar.js

</Diagram>

<Diagram name="writing_jsx_form" height={330} width={325} alt="React component with HTML and JavaScript from previous examples mixed. Function name is Form containing two handlers onClick and onSubmit highlighted in yellow. Following the handlers is HTML highlighted in purple. The HTML contains a form element with a nested input element, each with an onClick prop.">

Form.js

</Diagram>

</DiagramGroup>

Keeping a button's rendering logic and markup together ensures that they stay in sync with each other on every edit. Conversely, details that are unrelated, such as the button's markup and a sidebar's markup, are isolated from each other, making it safer to change either of them on their own.

Each React component is a JavaScript function that may contain some markup that React renders into the browser. React components use a syntax extension called JSX to represent that markup. JSX looks a lot like HTML, but it is a bit stricter and can display dynamic information. The best way to understand this is to convert some HTML markup to JSX markup.

<Note>

[JSX and React are two separate things](/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform) you _can_ use independently of each other.

</Note>

## Converting HTML to JSX {/*converting-html-to-jsx*/}

Suppose that you have some (perfectly valid) HTML:

```html
<h1>Hedy Lamarr's Todos</h1>
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  class="photo"
>
<ul>
    <li>Invent new traffic lights
    <li>Rehearse a movie scene
    <li>Improve the spectrum technology
</ul>
```

And you want to put it into your component:

```js
export default function TodoList() {
  return (
    // ???
  )
}
```

If you copy and paste it as is, it will not work:


<Sandpack>

```js
export default function TodoList() {
  return (
    // This doesn't quite work!
    <h1>Hedy Lamarr's Todos</h1>
    <img 
      src="https://i.imgur.com/yXOvdOSs.jpg" 
      alt="Hedy Lamarr" 
      class="photo"
    >
    <ul>
      <li>Invent new traffic lights
      <li>Rehearse a movie scene
      <li>Improve the spectrum technology
    </ul>
  );
}
```

```css
img { height: 90px }
```

</Sandpack>

This is because JSX is stricter and has a few more rules than HTML! If you read the error messages above, they'll guide you to fix the markup, or you can follow the guide below.

<Note>

Most of the times, React's on-screen error messages will help you find where the problem is. Give them a read if you get stuck!

</Note>

## The Rules of JSX {/*the-rules-of-jsx*/}

### 1. Return a single root element {/*1-return-a-single-root-element*/}

To return multiple elements from a component, **wrap them with a single parent tag**.

For example, you can use a `<div>`:

```js {1,11}
<div>
  <h1>Hedy Lamarr's Todos</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</div>
```


If you don't want to add an extra `<div>` to your markup, you can write `<>` and `</>` instead:

```js {1,11}
<>
  <h1>Hedy Lamarr's Todos</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</>
```

This empty tag is called a *[React fragment](TODO)*. React fragments let you group things without leaving any trace in the browser HTML tree.

<DeepDive title="Why do multiple JSX tags need to be wrapped?">

JSX looks like HTML, but under the hood it is transformed into plain JavaScript objects. You can't return two objects from a function without wrapping them into an array. This explains why you also can't return two JSX tags without wrapping them into another tag or a fragment.

</DeepDive>

### 2. Close all the tags {/*2-close-all-the-tags*/}

JSX requires tags to be explicitly closed: self-closing tags like `<img>` must become `<img />`, and wrapping tags like `<li>oranges` must be written as `<li>oranges</li>`.

This is how Hedy Lamarr's image and list items look closed:

```js {2-6,8-10}
<>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
   />
  <ul>
    <li>Invent new traffic lights</li>
    <li>Rehearse a movie scene</li>
    <li>Improve the spectrum technology</li>
  </ul>
</>
```

### 3. camelCase <s>all</s> most of the things! {/*3-camelcase-salls-most-of-the-things*/}

JSX turns into JavaScript and attributes written in JSX become keys of JavaScript objects. In your own components, you will often want to read those attributes into variables. But JavaScript has limitations on variable names. For example, their names can't contain dashes or be reserved words like `class`.

This is why, in React, many HTML and SVG attributes are written in camelCase. For example, instead of `stroke-width` you use `strokeWidth`. Since `class` is a reserved word, in React you write `className` instead, named after the [corresponding DOM property](https://developer.mozilla.org/en-US/docs/Web/API/Element/className):

```js {4}
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  className="photo"
/>
```

You can [find all these attributes in the React DOM Elements](TODO). If you get one wrong, don't worry—React will print a message with a possible correction to the [browser console](https://developer.mozilla.org/docs/Tools/Browser_Console).

<Gotcha>

For historical reasons, [`aria-*`](https://developer.mozilla.org/docs/Web/Accessibility/ARIA) and [`data-*`](https://developer.mozilla.org/docs/Learn/HTML/Howto/Use_data_attributes) attributes are written as in HTML with dashes.

</Gotcha>

### Pro-tip: Use a JSX Converter {/*pro-tip-use-a-jsx-converter*/}

Converting all these attributes in existing markup can be tedious! We recommend using a [converter](https://transform.tools/html-to-jsx) to translate your existing HTML and SVG to JSX. Converters are very useful in practice, but it's still worth understanding what is going on so that you can comfortably write JSX on your own.

Here is your final result:

<Sandpack>

```js
export default function TodoList() {
  return (
    <>
      <h1>Hedy Lamarr's Todos</h1>
      <img 
        src="https://i.imgur.com/yXOvdOSs.jpg" 
        alt="Hedy Lamarr" 
        className="photo" 
      />
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve the spectrum technology</li>
      </ul>
    </>
  );
}
```

```css
img { height: 90px }
```

</Sandpack>

<Recap>

Now you know why JSX exists and how to use it in components:

* React components group rendering logic together with markup because they are related.
* JSX is similar to HTML, with a few differences. You can use a [converter](https://transform.tools/html-to-jsx) if you need to.
* Error messages will often point you in the right direction to fixing your markup.

</Recap>



<Challenges>

### Convert some HTML to JSX {/*convert-some-html-to-jsx*/}

This HTML was pasted into a component, but it's not valid JSX. Fix it:

<Sandpack>

```js
export default function Bio() {
  return (
    <div class="intro">
      <h1>Welcome to my website!</h1>
    </div>
    <p class="summary">
      You can find my thoughts here.
      <br><br>
      <b>And <i>pictures</b></i> of scientists!
    </p>
  );
}
```

```css
.intro {
  background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.summary {
  padding: 20px;
  border: 10px solid gold;
}
```

</Sandpack>

Whether to do it by hand or using the converter is up to you!

<Solution>

<Sandpack>

```js
export default function Bio() {
  return (
    <div>
      <div className="intro">
        <h1>Welcome to my website!</h1>
      </div>
      <p className="summary">
        You can find my thoughts here.
        <br /><br />
        <b>And <i>pictures</i></b> of scientists!
      </p>
    </div>
  );
}
```

```css
.intro {
  background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.summary {
  padding: 20px;
  border: 10px solid gold;
}
```

</Sandpack>

</Solution>

</Challenges>
>>>>>>> 1e3b023d3192c36a2da7b72389debee2f0e0e8b0
