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