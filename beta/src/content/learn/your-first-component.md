---
title: Twój pierwszy komponent
---

<Intro>

*Komponent* jest jednym z podstawowych pojęć w świecie Reacta. Jest bazą, na której buduje się interfejsy użytkownika (UI), przez co idealnie nadaje się na pierwszy temat do nauki!

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

<Pitfall>

Komponenty reactowe są zwykłymi funkcjami javascriptowymi, lecz **ich nazwy muszą naczynać od wiekiej litery**. W przeciwnym razie nie będą działać!

</Pitfall>

### Krok 3: Dodaj kod {/*step-3-add-markup*/}

Komponent zwraca znacznik `<img />` z atrybutami `src` oraz `alt`. `<img />` jest napisany jak w HTML-u, lecz tak naprawdę pod spodem wykonuje się kod javascriptowy! Ta składnia nosi nazwę [JSX](/learn/writing-markup-with-jsx) i pozwala umieszczać znaczniki w kodzie javascriptowym.

Instrukcje wyjścia (_ang._ return statements) mogą być napisane w jednej linii, jak w poniższym przykładzie:

```js
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
```

lecz jeśli znaczniki nie znajdują się w tej samej linii co słowo kluczowe `return`, musisz otoczyć je parą nawiasów:

```js
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

<Pitfall>

Jeśli nie dodasz nawiasów, kod zawarty w kolejnych liniach po `return` [zostanie zignorowany](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)!

</Pitfall>

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

<<<<<<< HEAD
<DeepDive title="Komponenty od góry do dołu">
=======
<Pitfall>

Components can render other components, but **you must never nest their definitions:**

```js {2-5}
export default function Gallery() {
  // 🔴 Never define a component inside another component!
  function Profile() {
    // ...
  }
  // ...
}
```

The snippet above is [very slow and causes bugs.](/learn/preserving-and-resetting-state#different-components-at-the-same-position-reset-state) Instead, define every component at the top level:

```js {5-8}
export default function Gallery() {
  // ...
}

// ✅ Declare components at the top level
function Profile() {
  // ...
}
```

When a child component needs some data from a parent, [pass it by props](/learn/passing-props-to-a-component) instead of nesting definitions.

</Pitfall>

<DeepDive title="Components all the way down">
>>>>>>> e21b37c8cc8b4e308015ea87659f13aa26bd6356

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

#### Wyeksportuj komponent {/*export-the-component*/}

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

#### Napraw zwracaną wartość {/*fix-the-return-statement*/}

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

#### Znajdź pomyłkę {/*spot-the-mistake*/}

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

#### Napisz swój własny komponent {/*your-own-component*/}

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
