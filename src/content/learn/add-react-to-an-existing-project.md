---
title: Dodaj Reacta do istniejącego projektu
---

<Intro>

Jeśli chcesz dodać trochę interaktywności do istniejącego projektu, nie musisz przepisywać go w Reakcie. Dodaj Reacta do istniejącego stacku i renderuj interaktywne komponenty w dowolnym miejscu

</Intro>

<Note>

**Musisz zainstalować [Node.js](https://nodejs.org/en/) do programowania w środowisku lokalnym.** Chociaż możesz [wypróbować Reacta](/learn/installation#try-react) online lub z pomocą prostej strony HTML, realistycznie większość javascriptowych narzędzi, których będziesz chcieć użyć do programowania, wymaga Node.js.

</Note>

## Korzystanie z Reacta dla całej podścieżki istniejącej strony internetowej {/*using-react-for-an-entire-subroute-of-your-existing-website*/}

Załóżmy, że masz istniejącą aplikację internetową pod adresem `example.com` zbudowaną przy użyciu innej technologii serwerowej (np. Rails) i chcesz zaimplementować wszystkie ścieżki zaczynające się od `example.com/some-app/` przy użyciu Reacta.

Oto jak polecamy to skonfigurować:

<<<<<<< HEAD
1. **Zbuduj część aplikacji w Reakcie** przy użyciu jednego z [frameworków opartych na Reakcie](/learn/start-a-new-react-project).
2. **Określ `/some-app` jako *bazową ścieżkę*** w konfiguracji twojego frameworka (oto jak: [Next.js](https://nextjs.org/docs/api-reference/next.config.js/basepath), [Gatsby](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/)).
3. **Skonfiguruj serwer lub proxy**, aby wszystkie żądania pod adresem `/some-app/` były obsługiwane przez twoją aplikację w Reakcie.
=======
1. **Build the React part of your app** using one of the [React-based frameworks](/learn/start-a-new-react-project).
2. **Specify `/some-app` as the *base path*** in your framework's configuration (here's how: [Next.js](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath), [Gatsby](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/)).
3. **Configure your server or a proxy** so that all requests under `/some-app/` are handled by your React app.
>>>>>>> 6fc98fffdaad3b84e6093d1eb8def8f2cedeee16


Dzięki temu część aplikacji napisana w Reakcie będzie mogła [korzystać z najlepszych praktyk](/learn/start-a-new-react-project#can-i-use-react-without-a-framework) wbudowanych w te frameworki.

Wiele frameworków opartych na Reakcie jest full-stackowych i pozwala twojej reactowej aplikacji wykorzystać serwer. Można jednak zastosować takie samo podejście, nawet jeśli nie możesz lub nie chcesz uruchamiać JavaScriptu na serwerze. W takim przypadku, zamiast tego dostarcz wyeksportowane pliki HTML/CSS/JS ([pliki wyjściowe z `next export`](https://nextjs.org/docs/advanced-features/static-html-export) dla Next.js, domyślne dla Gatsby) pod adresem `/some-app/`.

## Korzystanie z Reacta dla części istniejącej strony {/*using-react-for-a-part-of-your-existing-page*/}

Załóżmy, że masz istniejącą stronę zbudowaną przy użyciu innej technologii (może to być technologia serwerowa, jak Rails, lub klientowa, jak Backbone), i chcesz renderować interaktywne komponenty Reacta gdzieś na tej stronie. Jest to powszechny sposób integracji Reacta - w rzeczywistości, większość zastosowań Reacta wyglądała właśnie tak w Meta przez wiele lat!

Możesz to zrobić w dwóch krokach:

1. **Skonfiguruj środowisko javascriptowe**, które pozwoli ci używać [składni JSX](/learn/writing-markup-with-jsx), podziel kod na moduły za pomocą składni [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) / [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) oraz używaj pakietów (na przykład React) z rejestru pakietów [npm](https://www.npmjs.com/).
2. **Renderuj swoje reactowe komponenty** tam, gdzie chcesz je zobaczyć na stronie.

Dokładny sposób postępowania zależy od konfiguracji istniejącej strony, więc przejdźmy przez kilka szczegółów.

### Krok 1: Skonfiguruj modularne środowisko javascriptowe {/*step-1-set-up-a-modular-javascript-environment*/}

Modularne środowisko javascriptowe umożliwia pisanie reactowych komponentów w osobnych plikach, zamiast umieszczania całego kodu w jednym pliku. Pozwala również na korzystanie ze wspaniałych pakietów opublikowanych przez innych deweloperów w rejestrze [npm](https://www.npmjs.com/) - w tym także z Reacta! Sposób postępowania zależy od istniejącej konfiguracji:

<<<<<<< HEAD
* **Jeśli twoja aplikacja jest już podzielona na pliki, które używają instrukcji `import`**, spróbuj użyć istniejącej konfiguracji. Sprawdź, czy napisanie `<div />` w kodzie JavaScript powoduje błąd składniowy. Jeśli powoduje błąd składniowy, możesz potrzebować [przetworzyć swój kod JavaScript za pomocą narzędzia Babel](https://babeljs.io/setup) i włączyć [Babel React preset](https://babeljs.io/docs/babel-preset-react), aby używać JSX.
=======
* **If your app doesn't have an existing setup for compiling JavaScript modules,** set it up with [Vite](https://vite.dev/). The Vite community maintains [many integrations with backend frameworks](https://github.com/vitejs/awesome-vite#integrations-with-backends), including Rails, Django, and Laravel. If your backend framework is not listed, [follow this guide](https://vite.dev/guide/backend-integration.html) to manually integrate Vite builds with your backend.
>>>>>>> 6fc98fffdaad3b84e6093d1eb8def8f2cedeee16

* **Jeśli twoja aplikacja nie ma istniejącej konfiguracji do kompilowania modułów JavaScript**, skonfiguruj ją przy użyciu [Vite](https://vitejs.dev/). Społeczność Vite utrzymuje [wiele integracji z frameworkami backendowymi](https://github.com/vitejs/awesome-vite#integrations-with-backends), w tym z Rails, Django i Laravel. Jeśli nie widzisz na liście twojego frameworka backendowego, [postępuj zgodnie z tym przewodnikiem](https://github.com/vitejs/awesome-vite#integrations-with-backends), aby ręcznie zintegrować proces budowy Vite z twoim backendem.

Aby sprawdzić, czy twoja konfiguracja działa, uruchom następującą komendę w folderze projektu:

<TerminalBlock>
npm install react react-dom
</TerminalBlock>

Następnie dodaj te linie kodu na początku głównego pliku JavaScript (może to być plik o nazwie `index.js` lub `main.js`):

<Sandpack>

```html public/index.html hidden
<!DOCTYPE html>
<html>
  <head><title>Moja aplikacja</title></head>
  <body>
<<<<<<< HEAD
    <!-- Zawartość istniejącej strony (w tym przykładzie zostanie zastąpiona) -->
=======
    <!-- Your existing page content (in this example, it gets replaced) -->
    <div id="root"></div>
>>>>>>> 6fc98fffdaad3b84e6093d1eb8def8f2cedeee16
  </body>
</html>
```

```js src/index.js active
import { createRoot } from 'react-dom/client';

// Wyczyść istniejącą zawartość HTML
document.body.innerHTML = '<div id="app"></div>';

// Zamiast niej wyrenderuj swój komponent reactowy
const root = createRoot(document.getElementById('app'));
root.render(<h1>Witaj, świecie!</h1>);
```

</Sandpack>

Jeśli cała zawartość twojej strony została zastąpiona przez "Witaj, świecie!", to wszystko działa! Kontynuuj czytanie.

<Note>

<<<<<<< HEAD
Integracja modularnego środowiska javascriptowego po raz pierwszy do istniejącego już projektu może wydawać się przytłaczająca, ale warto! Jeśli utkniesz, spróbuj skorzystać z [zasobów społeczności](/community) lub [czatu Vite]((https://chat.vitejs.dev/)).
=======
Integrating a modular JavaScript environment into an existing project for the first time can feel intimidating, but it's worth it! If you get stuck, try our [community resources](/community) or the [Vite Chat](https://chat.vite.dev/).
>>>>>>> 6fc98fffdaad3b84e6093d1eb8def8f2cedeee16

</Note>

### Krok 2: Renderuj reactowe komponenty gdziekolwiek na stronie {/*step-2-render-react-components-anywhere-on-the-page*/}

W poprzednim kroku umieściliśmy poniższy kod na początku pliku głównego:

```js
import { createRoot } from 'react-dom/client';

// Wyczyść istniejącą zawartość HTML
document.body.innerHTML = '<div id="app"></div>';

// Zamiast niej wyrenderuj swój komponent reactowy
const root = createRoot(document.getElementById('app'));
root.render(<h1>Witaj, świecie!</h1>);
```

Oczywiście nie chcesz faktycznie wyczyścić istniejącej zawartości HTML!

Usuń ten kod.

Zamiast tego prawdopodobnie chcesz renderować swoje reactowe komponenty w określonych miejscach w HTML-u. Otwórz swoją stronę HTML (lub szablony serwera, które ją generują) i dodaj unikalny atrybut [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id) do dowolnego tagu, na przykład:

```html
<!-- ... gdzieś w twoim kodzie html ... -->
<nav id="navigation"></nav>
<!-- ... więcej html-a ... -->
```

Pozwoli ci to znaleźć ten element HTML za pomocą [`document.getElementById`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) i przekazać go do [`createRoot`](/reference/react-dom/client/createRoot), abyś mógł renderować twój własny komponent reactowy wewnątrz niego:

<Sandpack>

```html public/index.html
<!DOCTYPE html>
<html>
  <head><title>Moja aplikacja</title></head>
  <body>
    <p>Ten akapit jest częścią HTML-a.</p>
    <nav id="navigation"></nav>
    <p>Ten akapit jest również częścią HTML-a.</p>
  </body>
</html>
```

```js src/index.js active
import { createRoot } from 'react-dom/client';

function NavigationBar() {
  // TODO: Dodać implementację paska nawigacji
  return <h1>Witaj z Reacta!</h1>;
}

const domNode = document.getElementById('navigation');
const root = createRoot(domNode);
root.render(<NavigationBar />);
```

</Sandpack>

Zauważ, że oryginalna zawartość HTML z pliku `index.html` została zachowana, ale twój własny komponent `NavigationBar` od teraz pojawia się wewnątrz `<nav id="navigation">` w kodzie HTML. Przeczytaj dokumentację dotyczącą użycia [`createRoot`](/reference/react-dom/client/createRoot#rendering-a-page-partially-built-with-react), aby dowiedzieć się więcej na temat renderowania komponentów reactowych na istniejącej stronie HTML.

Kiedy wdrażasz Reacta w istniejącym projekcie, proces ten często zaczyna się od małych interaktywnych komponentów (takich jak przyciski), a następnie stopniowo "przesuwa się w górę", aż w końcu cała strona jest zbudowana z użyciem Reacta. Jeśli kiedykolwiek osiągniesz ten punkt, zalecamy migrację do [frameworka opartego na Reakcie](/learn/start-a-new-react-project), aby w pełni wykorzystać jego możliwości.

## Korzystanie z React Native w istniejącej aplikacji mobilnej napisanej w natywnym języku {/*using-react-native-in-an-existing-native-mobile-app*/}

[React Native](https://reactnative.dev/) można również stopniowo integrować z istniejącymi aplikacjami natywnymi. Jeśli masz istniejącą aplikację natywną dla systemu Android (napisaną w Java lub Kotlin) lub iOS (napisaną w Objective-C lub Swift), [postępuj zgodnie z tym przewodnikiem](https://reactnative.dev/docs/integration-with-existing-apps), aby dodać do niej ekran w React Native.
