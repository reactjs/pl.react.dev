---
id: add-react-to-a-website
title: Dodaj Reacta do swojej strony
permalink: docs/add-react-to-a-website.html
redirect_from:
  - "docs/add-react-to-an-existing-app.html"
prev: getting-started.html
next: create-a-new-react-app.html
---

Użyj tak mało lub tak dużo Reacta ile potrzebujesz.

Biblioteka React została zaprojektowana z myślą o stopniowym wdrażaniu. Dzięki temu zawarte w niej rozwiązania możesz stosować wybiórczo w zależności od potrzeb. Być może chcesz jedynie dodać trochę interaktywności do istniejącej strony. Komponenty reactowe świetnie się do tego nadają.

Większość stron internetowych nie jest i nie musi być aplikacjami jednostronowymi. Z **kilkoma liniami kodu i bez narzędzi kompilacji**, wypróbuj React w małej części Twojej strony. Następnie możesz stopniowo zwiększać jego wykorzystanie lub przechowywać w kilku dynamicznych widżetach.

---

- [Dodaj Reacta w minutę](#add-react-in-one-minute)
- [Opcjonalnie: Wypróbuj React z JSX](#optional-try-react-with-jsx) (bundler nie jest wymagany!)

## Dodaj Reacta w minutę {#add-react-in-one-minute}

W tej sekcji pokażemy jak dodać komponent Reakta do strony internetowej. Możesz to zrobić korzystając z własnej strony internetowej lub stwórz nową pustą stronę.

Nie będziemy instalowali żadnych zależności ani korzystali ze skomplikowanych narzędzi -- **aby ukończyć ten rozdział, będziesz potrzebować jedynie połączenia internetowego i minuty wolnego czasu.**

Opcjonalnie: [Pobierz cały przykład (2KB po kompresji)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)

### Krok 1: Dodaj kontener do HTML {#step-1-add-a-dom-container-to-the-html}

Najpierw otwórz stronę internetową, którą chcesz edytować. Dodaj pusty znacznik `<div>`, aby określić miejsce, w którym React będzie wyświetlał treść. Na przykład:

```html{3}
<!-- ... istniejący kod HTML ... -->

<div id="like_button_container"></div>

<!-- ... istniejący kod HTML ... -->
'''

Przypisaliśmy temu znacznikowi `<div>` unikalny atrybut `id`. Pozwoli nam to na późniejsze odnalezienie kodu za pomocą JavaScripta oraz na wyświetlenie w nim komponentu reactowego.


>Wskazówka
>
>Możesz umieścić "kontener" '<div>' **w dowolnym miejscu** wewnątrz znacznika '<body>'. Możesz mieć tyle niezależnych kontenerów na jednej stronie, ile potrzebujesz. Zazwyczaj są one puste -- React zastąpi istniejącą zawartość w kontenerze.

### Krok 2: Dodaj znaczniki `<script>` {#step-2-add-the-script-tags}

Następnie dodaj trzy znaczniki `<script>` do strony HTML tuż przed zamykającym znacznikiem `</body>`:

```html{5,6,9}
<!-- ... pozostały kod HTML ... -->

<!-- Załaduj React. -->
<!-- Uwaga: podczas wdrażania, zamień "development.js" na "production.min.js". -->
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

<!-- Załaduj nasz komponent React. -->
<script src="like_button.js"></script>

</body>
'''

Pierwsze dwa znaczniki wczytują Reacta. Trzeci załaduje kod Twojego komponentu.

### Krok 3: Stwórz komponent Reacta {#step-3-create-a-react-component}

Stwórz plik 'like_button.js' w folderze swojej strony.

Otwórz **[przykładowy kod](https://cdn.rawgit.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)** i wklej jego zawartość do pliku, który stworzyłeś.

>Wskazówka
>
>Ten kod definiuje komponent Reakta nazwany 'LikeButton'. Nie przejmuj sie, jeżeli jeszcze tego nie rozumiesz -- wyjaśnimy bloki konstrukcyjne React później w naszym [praktycznym tutorialu](/tutorial/tutorial.html) i [w głównych koncepcjach](/docs/hello-world.html). Na razie pokażmy to na ekranie!

Po **[przykładowym kodzie](https://cdn.rawgit.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)**, dodaj dwie linijki na na końcu 'like_button.js':

'''js{3,4}
// ... przykładowy kod, który wkleiłeś ...

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
'''

Te dwie linijki kodu znajda znacznik '<div>' który dodaliśmy do naszego kodu HTML w pierwszym kroku i wyświetla nasz przycisk "Like" jako komponent Reacta.

### To wszystko! {#thats-it}

Nie ma kroku czwartego. **Właśnie dodałeś pierwszy komponent Reacta do swojej strony.**

Zapoznaj się z następnymi sekcjami, aby uzyskać więcej podpowiedzi na temat integracji w React.

**[Zobacz przykładowy kod źródłowy](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605)**

**[Pobierz cały przykład (2KB zipped)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)**

### Wskazówka: Wykorzystaj komponent ponownie {#tip-reuse-a-component}

Często możesz chcieć wyświetlić komponent Reacta w wielu miejscach na stronie. Oto przykład, który trzykrotnie wyświetla przycisk "Like" i przekazuje do niego dane:

[Zobacz przykładowy kod źródłowy](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda)

[Pobierz cały przykład (2KB zipped)](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda/archive/9d0dd0ee941fea05fd1357502e5aa348abb84c12.zip)

>Wskazówka
>
>Ta strategia jest szczegoólnie przydatna gdy części strony oparte na Reackcie sa od siebie odizolowane. Wewnatrz kodu React, łatwiej jest korzystać z [kompozycji komponentow](/docs/components-and-props.html#composing-components).

### Wskazówka: Minifikuj JavaScript dla środowiska produkcyjnego {#tip-minify-javascript-for-production}

Przed wdrozeniem strony na środowisko produkcyjne, pamiętaj że nie zminifikowany kod JavaScript może znacznie spowolnić działanie Twojej strony.

Jeżeli już zminifikowałeś skrypty aplikacji, **Twoja strona internetowa będzie gotowa dla środowiska produkcyjnego** jeżeli wdrożony kod ładuje wersje Reacta zakonczoną `production.min.js`:

```js
<script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
```

Jeżeli nie wykonujesz minifikacji dla swoich skryptow, [oto jeden ze sposobów aby to zrobić](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3).

## Opcjonalnie: Wypróbuj Reacta z JSX {#optional-try-react-with-jsx}

W przykładach powyżej opieramy się tylko na funkcjach, które są natywnie obsługiwane przez przeglądarki. Dlatego wywołaliśmy funkcję JavaScript, aby powiedzieć Reactowi, co wyświetlić:

'''js
const e = React.createElement;

// Wyświetl "Like" <button>
return e(
'button',
{ onClick: () => this.setState({ liked: true }) },
'Like'
);
'''

Jednakże React również oferuje możliwość użycia [JSX](/docs/introducing-jsx.html):

'''js
// Wyświetl "Like" <button>
return (
<button onClick={() => this.setState({ liked: true })}>
Like
</button>
);
'''

Te dwa fragmenty kodu są równoważne. Ponieważ **JSX jest [całkowicie opcjonalny](/docs/react-without-jsx.html)**, wiele osób uważa, że jest to pomocne przy pisaniu kodu UI -- zarówno z React, jak i z innymi bibliotekami.

Możesz wypróbować JSX korzystając z [tego konwertera online](http://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2%2Cstage-3&prettier=true&targets=Node-6.12&version=6.26.0&envVersion=).

### Szybko wypróbuj JSX {#quickly-try-jsx}

Najszybszym sposobem na wyprobowanie JSX w Twoim projekcie jest dodanie znacznika '<script>' do strony:

'''html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
'''

Teraz możesz użyć JSX w dowolnym znaczniku '<script>' dodając do niego atrybut 'type="text/babel"'. Tutaj jest [przykład pliku HTML z JSX](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html), który możesz pobrać i zapoznać się.

Takie podejście jest dobre do nauki i tworzenia projektów demo. Powoduje to jednak spowolnienie działania strony i **nie jest odpowiednie na środowisko produkcyjne**. Gdy będziesz gotowy, aby przejść dalej, usuń znacznik '<script>' i atrybut 'type="text/babel"' który dodałeś. Zamiast tego, w następnej sekcji skonfigurujesz preprocesor JSX, aby automatycznie konwertować wszystkie znaczniki '<script>'.

### Dodaj JSX do projektu {#add-jsx-to-a-project}

Dodanie JSX do projektu nie wymaga skomplikowanych narzędzi takich jak bundler lub serwer deweloperski. Zasadniczo, dodanie JSX **nie jest jak dodanie preprocesora CSS.** Jedynym wymaganiem jest [Node.js](https://nodejs.org/) zainstalowany na komputerze.

Przejdź do folderu projektu i wklej dwie komendy:

1. **Krok 1:** Uruchom 'npm init -y' (jeżeli sie nie uda [tutaj jest opisana poprawka](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d))
2. **Krok 2:** Uruchom 'npm install babel-cli@6 babel-preset-react-app@3'

>Wskazówka
>
>Korzystamy z **npm tylko do instalacji preprocesora JSX;** nie będziesz go potrzebował do niczego innego. Zarówno Rect, jak i kod aplikacji mogą pozostać bez zmian w znaczniku '<script>'

Gratulacje! Właśnie dodałeś do swojego projektu **gotowa konfiguracje JSX**.


### Uruchom preprocesor JSX {#run-jsx-preprocessor}

Utwórz folder o nazwie `src` i uruchom polecenie w terminalu:

'''
npx babel --watch src --out-dir . --presets react-app/prod
'''

>Notatka
>
>'npx' nie jest literówka -- jest to [narzędzie do uruchamiania pakietów dostępne w npm 5.2+](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).
>
>Jeśli zobaczysz komunikat o błędzie "Błędnie zainstalowałeś pakiet 'babel'", mogłeś pominąć [poprzedni krok](#add-jsx-to-a-project). Wykonaj go w tym samym folderze, i spróbuj ponownie.

Nie czekaj na jego zakończenie -- to polecenie uruchamia automatyczne śledzenie dla JSX.

Jeśli utworzysz teraz plik o nazwie 'src/like_button.js' wraz z **[przykładowym kodem JSX](https://cdn.rawgit.com/gaearon/c8e112dc74ac44aac4f673f2c39d19d1/raw/09b951c86c1bf1116af741fa4664511f2f179f0a/like_button.js)**, obserwator utworzy przeprocesowany plik 'like_button.js' z kodem JavaScript odpowiednim dla przeglądarki. Gdy edytujesz plik źródłowy, korzystając z JSX, transformacja zostanie ponownie automatycznie uruchomiona.

Dodatkowo umożliwi to również korzystanie z nowych składni JavaScript, takich jak klasy, bez obawy o brak kompatybilności ze starszymi przeglądarkami. Narzędzie, które właśnie użyliśmy, nazywa się Babel, i możesz dowiedzieć się więcej na jego temat z [dokumentacji](http://babeljs.io/docs/en/babel-cli/).

Jeśli zauważyłeś, że czujesz się komfortowo z narzędziami do kompilacji i chcesz by robiły dla Ciebie więcej, [następna sekcja](/docs/create-a-new-react-app.html) opisuje niektóre z najbardziej popularnych i przystępnych narzędzi. Jeżeli nie -- znaczniki script będą wystarczające.
