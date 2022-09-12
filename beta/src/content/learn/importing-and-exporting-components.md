---
title: Importowanie i eksportowanie komponentów
---

<Intro>

Magia komponentów polega na ich możliwość wielokrotnego użycia. Możesz tworzyć komponenty składające się z innych komponentów. Jednak gdy liczba zagnieżdżeń w ramach danego komponentu stanie się duża, warto wydzielić je do osobnych plików. Dzięki temu łatwiej będzie przeglądać pliki i używać komponentów w wielu miejscach.

</Intro>

<YouWillLearn>

* Czym jest plik z komponentem głównym
* Jak wyeksportować i zaimportować komponent
* Jak używać domyślnych i nazwanych importów i eksportów
* Jak zaimportować i wyeksportować kilka komponentów z jednego pliku
* Jak podzielić komponenty na osobne pliki

</YouWillLearn>

## Plik z komponentem głównym {/*the-root-component-file*/}

W rozdziale pt. [Twój pierwszy komponent](/learn/your-first-component) stworzyliśmy komponent `Profile` oraz komponent `Gallery`, który go renderuje:

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

W powyższym przykładzie wszystkie te komponenty istnieją w **pliku komponentu głównego** o nazwie `App.js`. W [Create React App](https://create-react-app.dev/) aplikacja jest zdefiniowana w pliku `src/App.js`. Jednak przy odpowiedniej konfiguracji komponent główny mógłby znaleźć się w innym pliku. Jeśli używasz frameworka z routingiem opartym na plikach, np. Next.js, dla każdej strony będziesz mieć inny komponent główny.

## Eksportowanie i importowanie komponentu {/*exporting-and-importing-a-component*/}

Co jeśli w przyszłości pojawi się potrzeba zmiany strony głównej i wyświetlenie na niej listy książek naukowych? Albo umieszczenie wszystkich profili gdzieś indziej? Przeniesienie `Gallery` i `Profile` do innego pliku wydaje się być sensowne. Sprawi to, że będą bardziej modularne i łatwiej dostępne dla innych plików. Komponenty można przenieść do innego pliku w trzech krokach:

1. **Stwórz** nowy plik JS, w którym umieścisz komponenty.
2. **Wyeksportuj** swój komponent funkcyjny z tego pliku (za pomocą [domyślnego (_ang._ default)](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_the_default_export) lub [nazwanego (_ang._ named)](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_named_exports) eksportu).
3. **Zaimportuj** komponent w pliku, w którym chcesz go użyć (używając odpowiednio [domyślnego (_ang._ default)](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#importing_defaults) lub [nazwanego (_ang._ named)](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#import_a_single_export_from_a_module) importu).

W poniższym kodzie zarówno `Profile` jak i `Gallery` zostały przeniesione z pliku `App.js` do nowego pliku o nazwie `Gallery.js`. Teraz możesz zmienić kod w `App.js` tak, aby importował komponent `Gallery` z pliku `Gallery.js`:

<Sandpack>

```js App.js
import Gallery from './Gallery.js';

export default function App() {
  return (
    <Gallery />
  );
}
```

```js Gallery.js
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
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

Zauważ, że teraz nasz przykład składa się z dwóch plików:

1. `Gallery.js`:
<<<<<<< HEAD:beta/src/pages/learn/importing-and-exporting-components.md
     - Definiuje komponent `Profile`, który jest użyty tylko w tym samym pliku i dlatego nie jest wyeksportowany.
     - Eksportuje komponent `Gallery` jako **eksport domyślny**.
2. `App.js`:
     - Importuje `Gallery` jako **import domyślny** z pliku `Gallery.js`.
     - Eksportuje główny komponent `App` jako **eksport domyślny**.
=======
     - Defines the `Profile` component which is only used within the same file and is not exported.
     - Exports the `Gallery` component as a **default export.**
2. `App.js`:
     - Imports `Gallery` as a **default import** from `Gallery.js`.
     - Exports the root `App` component as a **default export.**
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6:beta/src/content/learn/importing-and-exporting-components.md


<Note>

Możesz spotkać także odwołania do plików bez rozszerzenia `.js`:

```js 
import Gallery from './Gallery';
```

W Reakcie możesz napisać zarówno `'./Gallery.js'` jak i `'./Gallery'`, jednak ten pierwszy zapis jest bliższy zasadzie działania [natywnych Modułów ES](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules).

</Note>

<<<<<<< HEAD:beta/src/pages/learn/importing-and-exporting-components.md
<DeepDive title="Eksporty domyślne kontra nazwane">
=======
<DeepDive title="Default vs named exports">
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6:beta/src/content/learn/importing-and-exporting-components.md

W JavaScripcie istnieją dwa sposoby eksportowania wartości: eksport domyślny oraz eksport nazwany. Dotychczasowe przykłady używały jedynie eksportów domyślnych. Ale w ramach jednego pliku można używać obydwu. **W danym pliku nie może być więcej niż jeden _domyślny_ eksport, natomiast _nazwanych_ eksportów możesz dodać tyle, ile chcesz.**

![Eksporty domyślne i nazwane](/images/docs/illustrations/i_import-export.svg)

Sposób, w jaki eksportujesz komponent, narzuca sposób, w jaki musisz go zaimportować. Jeśli spróbujesz zaimportować eksport domyślny za pomocą importu nazwanego, dostaniesz błąd! Poniższa tabela pomoże ci zapamiętać tę regułę:

| Składnia    | Instrukcja eksportująca               | Instrukcja importująca                  |
| ----------- | -----------                           | -----------                             |
| Domyślna    | `export default function Button() {}` | `import Button from './button.js';`     |
| Nazwana     | `export function Button() {}`         | `import { Button } from './button.js';` |

Kiedy używasz importu _domyślnego_, po słowie `import` możesz wpisać dowolną nazwę. Jeśli chcesz, możesz napisać np. `import Banana from './button.js'`, a w rezultacie otrzymasz i tak dokładnie tę samą wartość. Dla kontrastu, przy nazwanych eksportach wpisana nazwa musi się zgadzać po obu stronach. To dlatego nazywamy je importami _nazwanymi_!

**Wiele osób używa domyślnych eksportów, gdy plik eksportuje tylko jeden komponent, a nazwanych eksportów, gdy eksportuje wiele komponentów i wartości.** Bez względu na to, który styl programowania preferujesz, zawsze używaj sensownych i wymownych nazw dla funkcji i plików, które je przechowują. Odradzamy eksportowanie komponentów bez nazw, np. `export default () => {}`, ponieważ taki zapis utrudnia debugowanie.

</DeepDive>

## Eksportowanie i importowanie wielu komponentów z tego samego pliku {/*exporting-and-importing-multiple-components-from-the-same-file*/}

A co, jeśli chcielibyśmy wyświetlić pojedynczy `Profile` zamiast całej galerii? Komponent `Profile` również można wyeksportować. Ale plik `Gallery.js` ma już *domyślny* eksport, a nie może być przecież _dwóch_ takich w jednym pliku. W takiej sytuacji możesz albo wydzielić `Profile` do osobnego pliku i użyć domyślnego eksportu, albo wyeksportować go przy użyciu eksportu *nazwanego*. **Dany plik może mieć tylko jeden domyślny eksport, lecz może mieć wiele nazwanych eksportów!**

> Aby zapobiec niepotrzebnym nieporozumieniom podczas używania domyślnych i nazwanych eksportów, niektóre zespoły wybierają jeden z nich (domyślny lub nazwany) i używają konsekwentnie w całym projekcie, lub unikają mieszania ich w ramach pojedynczego pliku. To wszystko jednak kwestia preferencji. Wybierz to, co ci najbardziej odpowiada!

Najpierw **wyeksportuj** `Profile` z pliku `Gallery.js`, używając nazwanego eksportu (bez słowa kluczowego `default`):

```js
export function Profile() {
  // ...
}
```

Następnie **zaimportuj** `Profile` z `Gallery.js` w pliku `App.js`, używając nazwanego importu (tego z klamrami):

```js
import { Profile } from './Gallery.js';
```

Na koniec **wyrenderuj** `<Profile />` w komponencie `App`:

```js
export default function App() {
  return <Profile />;
}
```

Teraz plik `Gallery.js` zawiera dwa eksporty: domyślny dla `Gallery` i nazwany dla `Profile`. Plik `App.js` importuje je obydwa. Spróbuj wyedytować poniższy kod, zamieniając `<Profile />` na `<Gallery />` i odwrotnie:

<Sandpack>

```js App.js
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

export default function App() {
  return (
    <Profile />
  );
}
```

```js Gallery.js
export function Profile() {
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
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

Mamy teraz miks domyślnego i nazwanego eksportu:

* `Gallery.js`:
<<<<<<< HEAD:beta/src/pages/learn/importing-and-exporting-components.md
  - Eksportuje komponent `Profile` jako **nazwany eksport `Profile`**.
  - Eksportuje komponent `Gallery` jako **domyślny eksport**.
* `App.js`:
  - Importuje `Profile` z pliku `Gallery.js` jako **nazwany import `Profile`**.
  - Importuje `Gallery` z pliku `Gallery.js` jako **domyślny import**.
  - Eksportuje główny komponent `App` jako **domyślny eksport**.
=======
  - Exports the `Profile` component as a **named export called `Profile`.**
  - Exports the `Gallery` component as a **default export.**
* `App.js`:
  - Imports `Profile` as a **named import called `Profile`** from `Gallery.js`.
  - Imports `Gallery` as a **default import** from `Gallery.js`.
  - Exports the root `App` component as a **default export.**
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6:beta/src/content/learn/importing-and-exporting-components.md

<Recap>

W tym rozdziale nauczyliśmy się:

* Czym jest plik komponentu głównego
* Jak zaimportować i wyeksportować komponent
* Kiedy i jak używać domyślnych, a kiedy nazwanych importów i eksportów
* Jak wyeksportować kilka komponentów z tego samego pliku

</Recap>



<Challenges>

<<<<<<< HEAD:beta/src/pages/learn/importing-and-exporting-components.md
### Podziel komponenty {/*split-the-components-further*/}
=======
#### Split the components further {/*split-the-components-further*/}
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6:beta/src/content/learn/importing-and-exporting-components.md

Aktualnie plik `Gallery.js` eksportuje zarówno `Profile` jak i `Gallery`, co może być mylące.

Przenieś komponent `Profile` do osobnego pliku o nazwie `Profile.js`, a następnie zmień komponent `App` tak, aby renderował `<Profile />` i `<Gallery />`, jeden po drugim.

Możesz użyć domyślnego lub nazwanego eksportu dla `Profile`, jednak pamiętaj, aby użyć odpowiedniej składni importu w plikach `App.js` i `Gallery.js`! Dla przypomnienia, oto tabela z sekcji dla dociekliwych:

| Składnia    | Instrukcja eksportująca               | Instrukcja importująca                  |
| ----------- | -----------                           | -----------                             |
| Domyślna    | `export default function Button() {}` | `import Button from './button.js';`     |
| Nazwana     | `export function Button() {}`         | `import { Button } from './button.js';` |

<Hint>

Pamiętaj, by zaimportować komponenty w plikach, które ich używają. Czy `Gallery` czasem nie korzysta z `Profile`?

</Hint>

<Sandpack>

```js App.js
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

export default function App() {
  return (
    <div>
      <Profile />
    </div>
  );
}
```

```js Gallery.js active
// Przenieś mnie do pliku Profile.js!
export function Profile() {
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

```js Profile.js
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

Jak już uda ci się zmienić kod tak, aby działał z jednym typem eksportu, spróbuj przerobić go na drugi typ.

<Solution>

Oto rozwiązanie z eksportem nazwanym:

<Sandpack>

```js App.js
import Gallery from './Gallery.js';
import { Profile } from './Profile.js';

export default function App() {
  return (
    <div>
      <Profile />
      <Gallery />
    </div>
  );
}
```

```js Gallery.js
import { Profile } from './Profile.js';

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

```js Profile.js
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

A to rozwiązanie z eksportem domyślnym:

<Sandpack>

```js App.js
import Gallery from './Gallery.js';
import Profile from './Profile.js';

export default function App() {
  return (
    <div>
      <Profile />
      <Gallery />
    </div>
  );
}
```

```js Gallery.js
import Profile from './Profile.js';

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

```js Profile.js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

</Solution>

</Challenges>