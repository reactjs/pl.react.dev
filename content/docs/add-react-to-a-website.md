---
id: add-react-to-a-website
title: Dodaj Reacta do swojej strony
permalink: docs/add-react-to-a-website.html
redirect_from:
  - "docs/add-react-to-an-existing-app.html"
prev: getting-started.html
next: create-a-new-react-app.html
---

Używaj Reacta wybiórczo w miarę potrzeb.

Biblioteka React została zaprojektowana z myślą o stopniowym wdrażaniu. Dzięki temu zawarte w niej rozwiązania możesz stosować wybiórczo w zależności od potrzeb. Być może chcesz jedynie dodać trochę interaktywności do istniejącej strony. Komponenty reactowe świetnie się do tego nadają.

Większość stron internetowych nie jest i nie musi być aplikacjami jednostronicowymi (ang. *single-page apps*). Wypróbuj Reacta na niewielkiej części swojej strony za pomocą **kilku linii kodu i bez narzędzi kompilacji**. Następnie możesz stopniowo zwiększać jego wykorzystanie lub poprzestać na kilku dynamicznych widżetach.

---

- [Dodaj Reacta w mgnieniu oka](#add-react-in-one-minute)
- [Opcjonalnie: Wypróbuj Reacta z JSX](#optional-try-react-with-jsx) (bundler nie jest wymagany!)

## Dodaj Reacta w mgnieniu oka {#add-react-in-one-minute}

W tej sekcji pokażemy, jak dodać komponent reactowy do strony internetowej. Możesz to zrobić korzystając z własnej strony internetowej lub stworzyć nowy plik HTML.

Nie będziemy instalowali żadnych zależności ani korzystali ze skomplikowanych narzędzi -- **aby ukończyć ten rozdział, będziesz potrzebować jedynie połączenia internetowego i odrobiny wolnego czasu.**

Opcjonalnie: [Pobierz cały przykład (2KB po kompresji)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)

### Krok 1: Dodaj kontener do HTML {#step-1-add-a-dom-container-to-the-html}

Najpierw otwórz stronę internetową, którą chcesz edytować. Dodaj pusty znacznik `<div>`, aby określić miejsce, w którym React będzie wyświetlał treść. Na przykład:

```html{3}
<!-- ... istniejący kod HTML ... -->

<div id="like_button_container"></div>

<!-- ... istniejący kod HTML ... -->
```

Przypisaliśmy temu znacznikowi `<div>` unikalny atrybut `id`. Pozwoli nam to na późniejsze odnalezienie kodu za pomocą JavaScripta oraz na wyświetlenie w nim komponentu reactowego.


>Wskazówka
>
>"Kontenery" `<div>` można umieszczać **w dowolnych miejscach** wewnątrz znacznika `<body>`.  Dopuszczlna liczba niezależnych kontenerów na stronie jest nieograniczona.  Zazwyczaj są one puste -- React i tak zastąpi istniejącą zawartość w kontenerze.

### Krok 2: Dodaj znaczniki `<script>` {#step-2-add-the-script-tags}

Następnie dodaj trzy znaczniki `<script>` do strony HTML tuż przed zamykającym znacznikiem `</body>`:

```html{5,6,9}
<!-- ... pozostała część kodu HTML ... -->

<!-- Załaduj Reacta. -->
<!-- Uwaga: podczas wdrażania aplikacji do środowiska produkcyjnego, zamień "development.js" na "production.min.js". -->
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

<!-- Załaduj nasz komponent reactowy. -->
<script src="like_button.js"></script>

</body>
```

Pierwsze dwa znaczniki wczytają Reacta. Trzeci załaduje kod twojego komponentu.

### Krok 3: Stwórz komponent reactowy {#step-3-create-a-react-component}

Stwórz plik `like_button.js` w folderze, obok pliku HTML ze stroną.

Otwórz **[szablon startowy](https://cdn.rawgit.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)** i wklej jego zawartość do utworzonego pliku.

>Wskazówka
>
>Kod ten definiuje komponent reactowy o nazwie `LikeButton`. Nie przejmuj się, jeśli jeszcze czegoś nie rozumiesz na tym etapie -- podstawy Reacta wyjaśnimy później w naszym [praktycznym samouczku](/tutorial/tutorial.html) i [w rozdziale pt. "Główne idee"](/docs/hello-world.html). Na razie jednak skupmy się na wyświetleniu tego na ekranie!

Pod kodem z **[szablonu startowego](https://cdn.rawgit.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)** w pliku `like_button.js` dodaj dwie linijki:

```js{3,4}
// ... wklejony kod startowy ...

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
```

Te dwie linijki kodu są odpowiedzialne za znalezienie naszego elementu `<div>` z pierwszego kroku i wyświetlenie przycisku `"Like"` pochodzącego z wklejonego komponentu.

### To wszystko! {#thats-it}

Nie ma kroku czwartego. **Właśnie udało ci się dodać do strony pierwszy komponent reactowy.**

Zapoznaj się z następnymi rozdziałami, aby uzyskać więcej informacji na temat integrowania strony z Reactem.

**[Zobacz przykładowy kod źródłowy](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605)**

**[Pobierz cały przykład (2KB po kompresji)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)**

### Wskazówka:  Wykorzystuj komponenty wielokrotnie {#tip-reuse-a-component}

Często zdarza się, że komponent trzeba wyświetlić na stronie kilka razy. Oto przykład, który trzykrotnie wyświetla przycisk "Like" i przekazuje do niego dane:

[Zobacz przykładowy kod źródłowy](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda)

[Pobierz cały przykład (2KB po kompresji)](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda/archive/9d0dd0ee941fea05fd1357502e5aa348abb84c12.zip)

>Wskazówka
>
>Ta strategia jest szczególnie przydatna, gdy części strony oparte na Reakcie są od siebie odizolowane. W kodzie reactowym łatwiej jest zamiast tego korzystać z [kompozycji komponentów](/docs/components-and-props.html#composing-components).

### Wskazówka: Minifikuj JavaScript dla potrzeb środowiska produkcyjnego {#tip-minify-javascript-for-production}

Przed wdrożeniem strony do środowiska produkcyjnego, pamiętaj, że niezminifikowany kod javascriptowy może znacznie spowolnić działanie twojej strony.

Jeżeli twoje skrypty są już zminifikowane i jeśli wdrożony dokument HTML ładuje wersję Reacta z końcówką `production.min.js` w nazwie, wówczas twoja aplikacja będzie gotowa do użytku w środowisku produkcyjnym:

```js
<script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
```

Jeżeli nie masz jeszcze skonfigurowanej minifikacji skryotów, [oto jeden ze sposobów, aby to zrobić](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3).

## Opcjonalnie: Wypróbuj Reacta z JSX {#optional-try-react-with-jsx}

W przykładach powyżej opieramy się tylko na funkcjonalnościach, które są natywnie obsługiwane przez przeglądarki. Dlatego wywołaliśmy funkcję javascriptową, aby poinformować Reacta, co ma wyświetlić:

```js
const e = React.createElement;

// Wyświetla przycisk "Lubię to!"
return e(
  'button',
  { onClick: () => this.setState({ liked: true }) },
  'Lubię to!'
);
```

Niemniej React oferuje również możliwość użycia składni [JSX](/docs/introducing-jsx.html):

```js
// Wyświetla przycisk "Lubię to!"
return (
  <button onClick={() => this.setState({ liked: true })}>
Lubię to!
  </button>
);
```

Te dwa fragmenty kodu działają w ten sam sposób. Mimo iż **składnia JSX jest [całkowicie opcjonalna](/docs/react-without-jsx.html)**, wiele osób uważa, że jest pomocna przy pisaniu kodu dla UI -- zarówno w Reakcie, jak i z innymi bibliotekami.

<<<<<<< HEAD
Możesz wypróbować składnię JSX korzystając z [tego konwertera online](http://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2%2Cstage-3&prettier=true&targets=Node-6.12&version=6.26.0&envVersion=).
=======
You can play with JSX using [this online converter](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.4.3).
>>>>>>> 4244fc646618de6bae934686f93dd04c9000d9ae

### Szybki test składni JSX {#quickly-try-jsx}

Najszybszym sposobem na wypróbowanie składni JSX w projekcie jest dodanie następującego znacznika `<script>` do strony:

```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

Od teraz możesz używać składni JSX wewnątrz dowolnego znacznika `<script>`, który zaopatrzony jest w atrybut `type="text/babel"`. Tutaj jest [przykład pliku HTML z JSX](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html), który możesz pobrać i wypróbować.

Takie podejście jest dobre do nauki i tworzenia projektów na prezentacje. Powoduje to jednak spowolnienie działania strony i **nie jest odpowiednie dla środowiska produkcyjnego**. Kiedy już zdecydujesz, że możesz iść naprzód z materiałem, usuń ostatnio dodany znacznik `<script>` i atrybuty `type="text/babel"` z innych znaczników. W następnym podrozdziale skonfigurujemy preprocesor składni JSX, który będzie konwertował zawartość wszystkich znaczników `<script>` automatycznie.

### Dodaj JSX do projektu {#add-jsx-to-a-project}

Dodanie JSX do projektu nie wymaga skomplikowanych narzędzi, takich jak bundler czy serwer deweloperski. Zasadniczo dodawanie JSX **przypomina dodawanie preprocesora CSS**. Jedynym wymaganiem jest posiadanie zainstalowanego na komputerze środowiska [Node.js](https://nodejs.org/).

Przejdź do folderu projektu i wywołaj dwie komendy:

1. **Krok 1:** Uruchom `npm init -y` (jeżeli wywołanie się nie powiedzie - [tutaj opisano, jak obejść problem](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d))
2. **Krok 2:** Uruchom `npm install babel-cli@6 babel-preset-react-app@3`

>Wskazówka
>
>**Korzystamy tu z `npm` tylko do instalacji preprocesora JSX**; nie będzie on potrzebny do niczego innego. Zarówno React, jak i kod aplikacji mogą pozostać bez zmian w znacznikach `<script>`.

Gratulacje! Właśnie udało ci się dodać do swojego projektu **konfigurację JSX gotową do wdrożenia do środowiska produkcyjnego**.


### Uruchom preprocesor JSX {#run-jsx-preprocessor}

Utwórz folder o nazwie `src` i uruchom polecenie w terminalu:

```
npx babel --watch src --out-dir . --presets react-app/prod
```

>Uwaga
>
>`npx` to nie literówka -- jest to [narzędzie do uruchamiania pakietów, dostępne w npm 5.2+](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).
>
>Jeśli wyświetli się komunikat o błędzie: "You have mistakenly installed the `babel` package" (pol. "Błędnie zainstalowano pakiet `babel`"), możliwe, że pominięty został [poprzedni krok](#add-jsx-to-a-project). Wykonaj go w tym samym folderze i spróbuj ponownie.

Nie czekaj na jego zakończenie -- to polecenie uruchamia skrypt automatycznie śledzący zmiany w kodzie ze składnią JSX.

Jeśli utworzysz teraz plik o nazwie `src/like_button.js` przy użyciu **[tego przykładowego kodu JSX](https://cdn.rawgit.com/gaearon/c8e112dc74ac44aac4f673f2c39d19d1/raw/09b951c86c1bf1116af741fa4664511f2f179f0a/like_button.js)**, obserwator (ang. *watcher*) utworzy przetworzony plik o nazwie `like_button.js` zawierający kod javascriptowy zrozumiały dla przeglądarki. Gdy wyedytujesz plik źródłowy z kodem JSX, transformacja zostanie ponownie uruchomiona automatycznie.

Dodatkowo umożliwi to również korzystanie z nowych składni JavaScript, takich jak klasy, bez obawy o brak kompatybilności ze starszymi przeglądarkami. Narzędzie, którego właśnie użyliśmy, nazywa się Babel. Więcej na jego temat możesz dowiedzieć się z [dokumentacji](http://babeljs.io/docs/en/babel-cli/).

Jeśli uważasz, że czujesz się już komfortowo z narzędziami do kompilacji i chcesz, by robiły za ciebie więcej, zajrzyj do [następnego rozdziału](/docs/create-a-new-react-app.html), w którym opisaliśmy niektóre z najbardziej popularnych i przystępnych narzędzi. Jeżeli nie -- cóż, znaczniki `script` też wystarczą!
