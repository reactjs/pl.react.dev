---
id: thinking-in-react
title: Myślenie Reaktem
permalink: docs/thinking-in-react.html
redirect_from:
  - 'blog/2013/11/05/thinking-in-react.html'
  - 'docs/thinking-in-react-zh-CN.html'
prev: composition-vs-inheritance.html
---

Naszym zdaniem biblioteka React dostarcza pierwszorzędnych narzędzi do budowy dużych szybkich aplikacji webowych. Znakomicie sprawdza się na przykład w naszych zastosowaniach na Facebooku i w Instagramie.


Jedną z wielu zalet Reacta jest to jak React uczy cię myśleć o tworzonych przez ciebie aplikacjach. Poniżej przybliżymy ci proces myślowy towarzyszący budowie przykładowego programu. Będzie to tabela z danymi o produktach z funkcją wyszukiwania zbudowana w Reakcie.

## Zacznij od projektu {#start-with-a-mock}

Załóżmy, że mamy już gotowy JSON API oraz projekt designu. Projekt wygląda następująco:

![Projekt](../images/blog/thinking-in-react-mock.png)

Nasz JSON API dostarcza następujących informacji:

```
[
  {kategoria: "Artykuły sportowe", cena: "179,99 zł", naStanie: true, nazwa: "Football"},
  {kategoria: "Artykuły sportowe", cena: "38.99 zł", naStanie: true, nazwa: "Baseball"},
  {kategoria: "Artykuły sportowe", cena: "114.99 zł", naStanie: false, nazwa: "Basketball"},
  {kategoria: "Elektronika", cena: "379.99 zł", naStanie: true, nazwa: "iPod Touch"},
  {kategoria: "Elektronika", cena: "1529.99 zł", naStanie: false, nazwa: "iPhone 5"},
  {kategoria: "Elektronika", cena: "767.99 zł", naStanie: true, nazwa: "Nexus 7"}
];
```

## Etap 1: Podziej interfejs użytkownika na zhierarchizowany układ komponentów {#step-1-break-the-ui-into-a-component-hierarchy}


W pierwszej kolejności zakreśl na projekcie wszystkie komponenty (i komponenty pochodne) oraz nadaj im nazwy. Jeśli współpracujesz z zespołem designerów, możliwe że oni zrobili to już za ciebie. Koniecznie skontaktuj się z nimi. Nazwy komponentów Reacta często biorą się z nazw nadanych warstwom w Photoshopie. 

Skąd wiadomo co powinno być komponentem? Zastosuj te same metody, których używamy tworząc nowe funkcje lub objekty. Jedną z takich metod jest [Zasada jednej odpowiedzialności](https://pl.wikipedia.org/wiki/Zasada_jednej_odpowiedzialno%C5%9Bci), zgodnie z którą każdy komponent powinien być odpowiedzialny za tylko jedną rzecz. Jeśli komponent nie spełnia tej zasady i odpowiada za więcej rzeczy, należy go rozmontować na kilka mniejszych komponentów.


Since you're often displaying a JSON data model to a user, you'll find that if your model was built correctly, your UI (and therefore your component structure) will map nicely. That's because UI and data models tend to adhere to the same *information architecture*, which means the work of separating your UI into components is often trivial. Just break it up into components that represent exactly one piece of your data model.

Model danych wyświetlanych użytkownikowi często odpowiada modelowi zawartemu w plikach JSON. Dlatego jeśli właściwie skonstruujesz swój model, twój interfejs użytkownika (a co za tym idzie także twój układ komponentów) zostanie właściwie zmapowany. Wiąże się to z faktem, że interfejsy użytkownika i modele danych zwykle stosują się do tych samych zasad *architektury informacji*. Wszystko to zaś oznacza, że zadanie podziału interfejsu użytkownika na komponenty jest zwykle zadaniem dziecinnie prostym. Po prostu podziel go tak, aby jednemu modelowi danych odpowiadał jeden komponent.

![Component diagram](../images/blog/thinking-in-react-components.png)

Zwróć uwagę, że nasza prosta aplikacja składa się z pięciu komponentów. Dane za które odpowiedzialne są poszczególne komponenty zaznaczyliśmy kursywą.

  1. **`TabelaProduktowZWyszukiwaniem` (pomarańczowy):** mieszczą sie w nim wszystkie pozostałe komponennty
  2. **`PasekWyszukiwania` (niebieski):** odbiera wpisane przez użytkownika słowo lub frazę (*szukana fraza*)
  3. **`TabelaProduktow` (zielony):** wyświetla i filtruje *dane zebrane* na podstawie  *szukanej frazy*
  4. **`WierszRodzajuProduktu` (turkusowy):** wyświetla nagłówek dla każdego *rodzaju* produktów
  5. **`WierszProduktu` (czerwony):** wyświetla wiersz dla każdego *produktu*

Zauważ, że nagłówek naszej `TabeliProduktów` (zawierający nazwy kolumn "Nazwa" i "Cena") nie jest osobnym komponentem chociaż mógłby nim by. W tym przypadku jest to bardziej kwestia naszych indywidualnych preferencji niż zasada ogólna dla tego typu elementów. W naszej przykładowej aplikacji uznaliśmy ten nagłówek za integralną część komponentu `TabelaProduktów` ponieważ wyświetlany jest razem z *danymi zebranymi*, a wyświetlanie *danych zebranych* jest odpowiedzialnością `TabeliProduktów`. Jeśli jednak element ten miałby się w naszej aplikacji rozrosnąć (tzn. gdybyśmy mieli dodać do niego funkcję sortowania), jak najbardziej wskazane byłoby zrobienie z niego osobnego komponentu `NagłówekTabeliProduktów`.


Teraz kiedy już określiliśmy, które z elementów projektu mają być komponentami, ułożymy je w odpowiedniej hierarchii. Nie jest to zbyt trudne. Komponenty występujące wewnątrz innych komponentów przedstawimy w najszej hierarchii jako komponenty potomne.

  * `TabelaProduktowZWyszukiwaniem`
    * `PasekWyszukiwania`
    * `TabelaProdutkow`
      * `WierszRodzajuProduktu`
      * `WierszProduktu`

## Etap 2: Zbuduj wersję statyczną w Reakcie {#step-2-build-a-static-version-in-react}

<p data-height="600" data-theme-id="0" data-slug-hash="BwWzwm" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">See the Pen <a href="https://codepen.io/gaearon/pen/BwWzwm">Myślenie Reactem: Krok 2</a> on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Skoro wiemy już jak wygląda hierarchia naszych komponentów, możemy zacząć ją wdrażać. Budowę aplikacji najłatwiej jest zacząć od od wersji statycznej, tzn. takiej która zrenderuje interfejs użytkownika na podstawie naszego modelu danych, ale nie będzie zawierała żadnych elementów interaktywnych. Dobrze jest rozdzielić te procesy ponieważ budowa wersji statycznej wymaga więcej pisania niż myślenia, podczas gdy dodawanie interaktywności wymaga więcej myślenia niż pisania. Za chwilę zobaczysz dlaczego.

Aby zbudować statyczną wersję aplikacji, która zrenderuje nasz model danych, musimy stworzyć komponenty, które będą wykorzystywać inne komponenty i przekazywać dane za pomoca *atrybutów* (ang. *props*). *Atrybuty* umożliwiają przekazywanie danych z komponentu rodzicielskiego do komponentu potomnego. Jeśli zapoznałeś się już z zagadnieniem *stanu* w Reakcie, okiełznaj pokusę zastosowania go tutaj. **Nie należy używać stanu** do budowy statycznych wersji aplikacji. Stan wiąże się wyłącznie z interaktywnością, tzn. danymi zmieniającymi się w czasie.

Tworzenie naszej aplikacji możemy rozpocząć albo od komponentów znajdujących się wysoko w hierarchii (w naszym przypadku od `TabelaProduktowZWyszukiwaniem`) lub od tych znajdujących się na samym dole (`WierszProduktu`). Zazwyczaj budując proste aplikacje zaczyna się od góry, natomiast w przypadku projektów większych łatwiej jest zacząć pracę od dołu hierarchii jednocześnie pisząc testy dla poszczególnych funkcjonalności.

Kończąc ten etap pracy nad aplikacją będziesz miał dostępną bibliotekę komponentów wielokrotnego użytku, które renderują twój model danych. Komponenty te bedą miały tylko jedną metodę `render()` (pol. renderuj) ponieważ jest to statyczna wersja aplikacji. Komponent na szczycie hierarchii komponentów(`TabelaProduktowZWyszukiwaniem`) użyje nasz model danych jako atrybut. Każda zmiana w naszym modelu danych w połączeniu z ponownym wywołaniem `ReactDOM.render()` spowoduje aktualizację interfejsu użytkownika. Cały proces aktualizacji interfejsu jest bardzo prosty, a że wszelkie zminay są od razu widoczne łatwo można się zorientować, które fragmenty kodu wymagają poprawy. **Jednokierunkowy transfer danych** w Reakcie (nazwyany również *wiązaniem jednokierunkowym*) zapewnia modularność kodu i szybkie działanie aplikacji.

Jeśli potrzebujesz pomocy w na tym etapie budowy aplikacji zajrzyj do [Dokumentacji Reacta](/docs/).

### Krótki przerywnik: Atrybuty a Stan {#a-brief-interlude-props-vs-state}

W Rakcie wyróżniamy dwa modele danych: atrybuty i stan. To bardzo ważne żebyś rozumiał czym dokładnie się od siebie różnią. Dla przypomnienia rzuć okiem na [oficjalną dokumentajcę Reacta](/docs/interactivity-and-dynamic-uis.html),

## Etap 3: Określ minimalne (ale kompletne) odwzorowanie stanu interfejsu użytkownika{#step-3-identify-the-minimal-but-complete-representation-of-ui-state}

To make your UI interactive, you need to be able to trigger changes to your underlying data model. React makes this easy with **state**.

To build your app correctly, you first need to think of the minimal set of mutable state that your app needs. The key here is [DRY: *Don't Repeat Yourself*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Figure out the absolute minimal representation of the state your application needs and compute everything else you need on-demand. For example, if you're building a TODO list, just keep an array of the TODO items around; don't keep a separate state variable for the count. Instead, when you want to render the TODO count, simply take the length of the TODO items array.

Think of all of the pieces of data in our example application. We have:

  * The original list of products
  * The search text the user has entered
  * The value of the checkbox
  * The filtered list of products

Let's go through each one and figure out which one is state. Simply ask three questions about each piece of data:

  1. Is it passed in from a parent via props? If so, it probably isn't state.
  2. Does it remain unchanged over time? If so, it probably isn't state.
  3. Can you compute it based on any other state or props in your component? If so, it isn't state.

The original list of products is passed in as props, so that's not state. The search text and the checkbox seem to be state since they change over time and can't be computed from anything. And finally, the filtered list of products isn't state because it can be computed by combining the original list of products with the search text and value of the checkbox.

So finally, our state is:

  * The search text the user has entered
  * The value of the checkbox

## Step 4: Identify Where Your State Should Live {#step-4-identify-where-your-state-should-live}

<p data-height="600" data-theme-id="0" data-slug-hash="qPrNQZ" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">See the Pen <a href="https://codepen.io/gaearon/pen/qPrNQZ">Myślenie Reactem: Krok 4</a> on <a href="http://codepen.io">CodePen</a>.</p>

OK, so we've identified what the minimal set of app state is. Next, we need to identify which component mutates, or *owns*, this state.

Remember: React is all about one-way data flow down the component hierarchy. It may not be immediately clear which component should own what state. **This is often the most challenging part for newcomers to understand,** so follow these steps to figure it out:

For each piece of state in your application:

  * Identify every component that renders something based on that state.
  * Find a common owner component (a single component above all the components that need the state in the hierarchy).
  * Either the common owner or another component higher up in the hierarchy should own the state.
  * If you can't find a component where it makes sense to own the state, create a new component simply for holding the state and add it somewhere in the hierarchy above the common owner component.

Let's run through this strategy for our application:

  * `ProductTable` needs to filter the product list based on state and `SearchBar` needs to display the search text and checked state.
  * The common owner component is `FilterableProductTable`.
  * It conceptually makes sense for the filter text and checked value to live in `FilterableProductTable`

Cool, so we've decided that our state lives in `FilterableProductTable`. First, add an instance property `this.state = {filterText: '', inStockOnly: false}` to `FilterableProductTable`'s `constructor` to reflect the initial state of your application. Then, pass `filterText` and `inStockOnly` to `ProductTable` and `SearchBar` as a prop. Finally, use these props to filter the rows in `ProductTable` and set the values of the form fields in `SearchBar`.

You can start seeing how your application will behave: set `filterText` to `"ball"` and refresh your app. You'll see that the data table is updated correctly.

## Step 5: Add Inverse Data Flow {#step-5-add-inverse-data-flow}

<p data-height="600" data-theme-id="0" data-slug-hash="LzWZvb" data-default-tab="js,result" data-user="rohan10" data-embed-version="2" data-pen-title="Thinking In React: Step 5" class="codepen">See the Pen <a href="https://codepen.io/gaearon/pen/LzWZvb">Myślenie Reactem: Krok 5</a> on <a href="http://codepen.io">CodePen</a>.</p>

So far, we've built an app that renders correctly as a function of props and state flowing down the hierarchy. Now it's time to support data flowing the other way: the form components deep in the hierarchy need to update the state in `FilterableProductTable`.

React makes this data flow explicit to make it easy to understand how your program works, but it does require a little more typing than traditional two-way data binding.

If you try to type or check the box in the current version of the example, you'll see that React ignores your input. This is intentional, as we've set the `value` prop of the `input` to always be equal to the `state` passed in from `FilterableProductTable`.

Let's think about what we want to happen. We want to make sure that whenever the user changes the form, we update the state to reflect the user input. Since components should only update their own state, `FilterableProductTable` will pass callbacks to `SearchBar` that will fire whenever the state should be updated. We can use the `onChange` event on the inputs to be notified of it. The callbacks passed by `FilterableProductTable` will call `setState()`, and the app will be updated.

Though this sounds complex, it's really just a few lines of code. And it's really explicit how your data is flowing throughout the app.



## To byłoby na tyle {#and-thats-it}

Mamy nadzieję, że niniejszy przewodnik przybliżył ci myślenie Reactem, tzn. główne zasady którymi kierujemy się tworząc komponenty i aplikacje z użyciem React.js. Być może stosowanie tej biblioteki wymaga pisania większej ilości kodu niż inne znane ci biblioteki i frameworki, pamiętaj jednak, że kod czyta się znacznie częściej niż tworzy, a czytanie kodu napisanego w Reakcie nie przysparza najmniejszych problemów ze wzglęgu na jego modularność i przejrzystość. Zalety tej przejrzystości i modularności napewno docenisz tworząc duże biblioteki komponentów. Natomiast wielokrotne stostowanie gotowych kawałków kodu zaoszczędzi ci wiele pracy. :) 