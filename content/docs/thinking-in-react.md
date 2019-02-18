---
id: thinking-in-react
title: Myślenie reaktowe
permalink: docs/thinking-in-react.html
redirect_from:
  - 'blog/2013/11/05/thinking-in-react.html'
  - 'docs/thinking-in-react-zh-CN.html'
prev: composition-vs-inheritance.html
---

Naszym zdaniem React dostarcza pierwszorzędnych narzędzi do budowy dużych szybkich aplikacji webowych. Znakomicie sprawdza się na przykład w naszych zastosowaniach na Facebooku i w Instagramie.


Jedną z wielu zalet Reacta jest to jak praca z tą biblioteką uczy cię myśleć o tworzonych przez ciebie aplikacjach. Poniżej przybliżymy ci proces myślowy towarzyszący budowie przykładowego programu. Będzie to tabela z danymi o produktach z funkcją wyszukiwania zbudowana w Reakcie.

## Zacznij od projektu {#start-with-a-mock}

Załóżmy, że mamy już gotowy JSON API oraz projekt designu. Projekt wygląda następująco:

![Projekt](../images/blog/thinking-in-react-mock.png)

Nasz JSON API dostarcza następujących informacji:

```
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
```

## Krok 1: Podziej interfejs użytkownika na zhierarchizowany układ komponentów {#step-1-break-the-ui-into-a-component-hierarchy}


W pierwszej kolejności zakreśl na projekcie wszystkie komponenty (i komponenty pochodne) oraz nadaj im nazwy. Jeśli współpracujesz z zespołem designerów, możliwe że oni zrobili to już za ciebie. Koniecznie skontaktuj się z nimi. Nazwy komponentów Reacta często biorą się z nazw nadanych warstwom w Photoshopie. 

Skąd wiadomo co powinno być komponentem? Zastosuj te same metody, których używamy tworząc nowe funkcje lub objekty. Jedną z takich metod jest [Zasada jednej odpowiedzialności](https://pl.wikipedia.org/wiki/Zasada_jednej_odpowiedzialno%C5%9Bci), zgodnie z którą każdy komponent powinien być odpowiedzialny za tylko jedną rzecz. Jeśli komponent nie spełnia tej zasady i odpowiada za więcej rzeczy, należy go rozłożyć na kilka mniejszych komponentów.

Model danych wyświetlanych użytkownikowi często odpowiada modelowi zawartemu w plikach JSON. Dlatego jeśli właściwie skonstruujesz swój model, twój interfejs użytkownika (a co za tym idzie także twój układ komponentów) zostanie właściwie zmapowany. Wiąże się to z faktem, że interfejsy użytkownika i modele danych zwykle stosują się do tych samych zasad *architektury informacji*. Wszystko to zaś oznacza, że zadanie podziału interfejsu użytkownika na komponenty jest zwykle zadaniem dziecinnie prostym. Po prostu podziel go tak, aby jednemu elementowi twojego modelu danych odpowiadał jeden komponent.

![Wykres komponentów](../images/blog/thinking-in-react-components.png)

Zwróć uwagę, że nasza prosta aplikacja składa się z pięciu komponentów. Dane za które odpowiedzialne są poszczególne komponenty zaznaczyliśmy kursywą.

  1. **`FilterableProductTable` [pol. tabela produktów z wyszukiwaniem] (pomarańczowy):** mieszczą sie w nim wszystkie pozostałe komponennty
  2. **`SearchBar` [pol. pasek wyszukiwania] (niebieski):** odbiera wpisane przez użytkownika słowo lub frazę (*szukana fraza*)
  3. **`ProductTable` [pol. tabela produktów] (zielony):** wyświetla i filtruje *dane zebrane* na podstawie  *szukanej frazy*
  4. **`ProductCategoryRow` [pol. wiersz rodzaju produktu] (turkusowy):** wyświetla nagłówek dla każdego *rodzaju* produktów
  5. **`ProductRow` [pol. wiersz produktu] (czerwony):** wyświetla wiersz dla każdego *produktu*

Zauważ, że nagłówek naszej `ProductTable` (zawierający nazwy kolumn "Name" i "Price") nie jest osobnym komponentem chociaż mógłby nim by. W tym przypadku jest to bardziej kwestia naszych indywidualnych preferencji niż zasada ogólna dla tego typu elementów. W naszej przykładowej aplikacji uznaliśmy ten nagłówek za integralną część komponentu `ProductTable` ponieważ wyświetlany jest razem z *danymi zebranymi*, a wyświetlanie *danych zebranych* jest odpowiedzialnością `ProductTable`. Jeśli jednak element ten miałby się w naszej aplikacji rozrosnąć (tzn. gdybyśmy mieli dodać do niego funkcję sortowania), jak najbardziej wskazane byłoby zrobienie z niego osobnego komponentu `ProductTableHeader`.

Teraz kiedy już określiliśmy, które z elementów projektu mają być komponentami, ułożymy je w odpowiedniej hierarchii. Nie jest to zbyt trudne. Komponenty występujące wewnątrz innych komponentów przedstawimy w najszej hierarchii jako komponenty potomne.

  * `FilterableProductTable `
    * `SearchBar `
    * `ProductTable`
      * `ProductCategoryRow `
      * `ProductRow `

## Krok 2: Zbuduj wersję statyczną w Reakcie {#step-2-build-a-static-version-in-react}

<p data-height="600" data-theme-id="0" data-slug-hash="BwWzwm" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">See the Pen <a href="https://codepen.io/gaearon/pen/BwWzwm">Myślenie Reactem: Krok 2</a> on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Skoro wiemy już jak wygląda hierarchia naszych komponentów, możemy zacząć ją wdrażać. Budowę aplikacji najłatwiej jest zacząć od od wersji statycznej, tzn. takiej która zrenderuje interfejs użytkownika na podstawie naszego modelu danych, ale nie będzie zawierała żadnych elementów interaktywnych. Dobrze jest rozdzielić te procesy ponieważ budowa wersji statycznej wymaga więcej pisania niż myślenia, podczas gdy dodawanie interaktywności wymaga więcej myślenia niż pisania. Za chwilę zobaczysz dlaczego.

Aby zbudować statyczną wersję aplikacji, która zrenderuje nasz model danych, musimy stworzyć komponenty, które będą wykorzystywać inne komponenty i przekazywać dane za pomoca *atrybutów* (ang. *props*). *Atrybuty* umożliwiają przekazywanie danych z komponentu rodzicielskiego do komponentu potomnego. Jeśli zapoznałeś się już z zagadnieniem *stanu* w Reakcie, okiełznaj pokusę zastosowania go tutaj. **Nie należy używać stanu** do budowy statycznych wersji aplikacji. Stan wiąże się wyłącznie z interaktywnością, tzn. danymi zmieniającymi się w czasie.

Tworzenie naszej aplikacji możemy rozpocząć albo od komponentów znajdujących się wysoko w hierarchii (w naszym przypadku od `FilterableProductTable`) lub od tych znajdujących się na samym dole (`ProductRow`). Zazwyczaj budując proste aplikacje zaczyna się od góry, natomiast w przypadku projektów większych łatwiej jest zacząć pracę od dołu hierarchii jednocześnie pisząc testy dla poszczególnych funkcjonalności.

Kończąc ten etap pracy nad aplikacją będziesz miał dostępną bibliotekę komponentów wielokrotnego użytku, które renderują twój model danych. Komponenty te bedą miały tylko jedną metodę `render()` (pol. renderuj) ponieważ jest to statyczna wersja aplikacji. Komponent na szczycie hierarchii komponentów(`FilterableProductTable`) wykorzysta nasz model danych jako atrybut. Każda zmiana w naszym modelu danych w połączeniu z ponownym wywołaniem `ReactDOM.render()` spowoduje aktualizację interfejsu użytkownika. Cały proces aktualizacji interfejsu jest bardzo prosty, a że wszelkie zminay są od razu widoczne łatwo można się zorientować, które fragmenty kodu wymagają poprawy. **Jednokierunkowy transfer danych** w Reakcie (nazwyany również *wiązaniem jednokierunkowym*) zapewnia modularność kodu i szybkie działanie aplikacji.

Jeśli potrzebujesz pomocy w na tym etapie budowy aplikacji zajrzyj do [Dokumentacji Reacta](/docs/).

### Krótki przerywnik: atrybuty a stan {#a-brief-interlude-props-vs-state}

W Reakcie wyróżniamy dwa modele danych: atrybuty i stan. To bardzo ważne żebyś rozumiał czym dokładnie modele te się różnią. Dla przypomnienia rzuć okiem na [oficjalną dokumentajcę Reacta](/docs/interactivity-and-dynamic-uis.html),

## Krok 3: Określ minimalne (ale kompletne) odwzorowanie stanu interfejsu użytkownika{#step-3-identify-the-minimal-but-complete-representation-of-ui-state}

Aby interfejs użytkwnika mógł zawierać elementy interaktywne, musimy mieć możliwośc dokonywania zmian w modelu danych na którym opiera się nasza aplikacja. W Reakcie jest to bardzo łatwe dzięki **stanowi**. 

To build your app correctly, you first need to think of the minimal set of mutable state that your app needs. The key here is [DRY: *Don't Repeat Yourself*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Figure out the absolute minimal representation of the state your application needs and compute everything else you need on-demand. For example, if you're building a TODO list, just keep an array of the TODO items around; don't keep a separate state variable for the count. Instead, when you want to render the TODO count, simply take the length of the TODO items array.

Poprawna budowa aplikacji wymaga w pierwszej kolejności określenia minimalnego zmiennego zestawu danych dla stanu aplikacji. Kluczową jest tutaj reguła [DRY: *Don't Repeat Yourself*](https://pl.wikipedia.org/wiki/DRY) [pol. Nie powtarzaj się]. Zadecyduj jak ma wyglądać najprostsze możliwe odwzorowanie stanu aplikacji, a wszystko inne obliczaj gdy pojawi się taka potrzeba. Przykładowo jeśli tworzysz aplikację mającą być Listą rzeczy do zrobienia, zachowaj "pod ręką" jedynie tablicę z rzeczami do zrobienia; nie ma potrzeby tworzenia osobnej zmiennej stanu przechowującej liczbę tych rzeczy. Kiedy zachodzi potrzeba renderowania liczby rzeczy do zrobienia, po prostu pobierz długość tablicy.

Przyjrzyjmy się wszystkim rodzajom informacjom w naszej przykładowej aplikacji. Mamy tutaj:

  * Początkową listę produktów,
  * Frazę wyszukiwania podaną przez użytkownika,
  * Wartość odznaczonego pola
  * Listę produktów spełniających kryteria wyszukiwania

Aby zdecydować która z powyższych informacji zalicza się do stanu, w przypadku każdej z nich musimy zadać sobie trzy pytania:

  1. Czy informacja ta jest przekazywana za pomocą atrybutu? Jeśli tak to prawdopodobnie nie wchodzi w skład stanu.
  2. Czy informacja ta ulega zmianom? Jeśli tak to prawdopodobnie nie wchodzi w skład stanu.
  3. Czy informację tę można obliczyć na podstawie innego stanu lub atrybutu w danym komponencie. Jeśli tak to nie należy zaliczyć jej do stanu.

Początkowa lista produktów jest przekazywana jako atrybut, zatem nie jest stanem. Wyszukiwana fraza i wartość odznaczonego pola wydają się wchodzić w skład stanu ponieważ mogą ulegać zmianom i nie da się ich w żaden sposób wygenerować. Jeśli chodzi o listę produktów spełniających kryteria wyszukiwania, to nie jest ona stanem ponieważ może być wygenerowana na podstawie wyszukiwanej frazy i wartości odznaczonego pola.

Zatem ostatecznie nasz stan przestawia się następująco:
  * Fraza wyszukiwania podana przez użytkownika
  * Wartość zaznaczonego pola

## Krok 4: Określ gdzie powinien się mieścić stan {#step-4-identify-where-your-state-should-live}

<p data-height="600" data-theme-id="0" data-slug-hash="qPrNQZ" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">Zajrzyj na CodePen <a href="https://codepen.io/gaearon/pen/qPrNQZ">Myślenie reaktowe: Krok 4</a> on <a href="http://codepen.io">CodePen</a>.</p>

Mamy zatem określony minimalny zestaw danych stanu aplikacji. Teraz musimy określić, który z naszych komponentów ulega zmianom, czyli do którego komponentu *należy* stan.

Pamiętaj: Dane w Reakcie płyną tylko w jedną stronę - z góry w dół hierarchii komponentów. Przynależność stanu do danego komponentu nie jest sprawą oczywistą i *często przysparza problemów na początku pracy z Reactem*. Aby to dobrze zrozumieć postępuj zgodnie z następującymi wskazówkami:

Dla każdego elementu stanu w twojej aplikacji:

  * Określ każdy komponent, który coś renderuje na podstawie danego elementu stanu.
  * Znajdź wspólnego właściciela stanu (tzn. komponent znajdujący się w hierarchii wyżej od wszystkich pozostałych komponentów wykorzystujących dany element stanu).
  * Stan powinien należeć do wspólnego właściciela lub po prostu do innego komponentu znajdującego się wyżej w hierarchii komponentów.
  * Jeśli trudno ci określić właściwe miejsce umieszczenia stanu, stwórz nowy komponent, którego jedynym celem będzie przechowywanie stanu. Ulokuj go w hierarchii komponentów gdzieś powyżej komponentu będącego wspólnym właścicielem.

Zastosujmy tę strategię w pracy nad naszą aplikacją:

  * `ProductTable` wymaga stanu aby filtrować listę produktów.  `SearchBar` wymaga stanu, aby wyświetlać wyszukiwaną frazę i wartosć zaznaczonego pola
  * Wspólnym właścicielem jest `FilterableProductTable`.
  * Sensownym rozwiązaniem jest umieszczenie wyszukiwanej frazy i wartości zaznaczonego pola w `FilterableProductTable`

No dobra. Zatem ustaliliśmy, że stan umieścimy w `FilterableProductTable`. Teraz do konstruktora tego komponentu dodajemy ///instance property/// `this.state = {filterText: '', inStockOnly: false}` aby oddać początkowy stan naszej aplikacji. Następnie za pomocą atrybutów podajemy `filterText` oraz `inStockOnly` do komponentów `ProductTable` i `SearchBar`. Na końcu użyjemy tych atrybutów aby przefiltrować wiersze `ProductTable` i ustawić wartość pola formularza w `SearchBar`.

Teraz widać już jak będzię działała nasza aplikacja: ustawiamy `filterText` jako `"ball"` i odświeżamy aplikację. Nasza tabela danych poprawnie wyświetla nowe informacje.

## Step 5: Add Inverse Data Flow {#step-5-add-inverse-data-flow}

<p data-height="600" data-theme-id="0" data-slug-hash="LzWZvb" data-default-tab="js,result" data-user="rohan10" data-embed-version="2" data-pen-title="Thinking In React: Step 5" class="codepen">See the Pen <a href="https://codepen.io/gaearon/pen/LzWZvb">Myślenie Reactem: Krok 5</a> on <a href="http://codepen.io">CodePen</a>.</p>

So far, we've built an app that renders correctly as a function of props and state flowing down the hierarchy. Now it's time to support data flowing the other way: the form components deep in the hierarchy need to update the state in `FilterableProductTable`.

React makes this data flow explicit to make it easy to understand how your program works, but it does require a little more typing than traditional two-way data binding.

If you try to type or check the box in the current version of the example, you'll see that React ignores your input. This is intentional, as we've set the `value` prop of the `input` to always be equal to the `state` passed in from `FilterableProductTable`.

Let's think about what we want to happen. We want to make sure that whenever the user changes the form, we update the state to reflect the user input. Since components should only update their own state, `FilterableProductTable` will pass callbacks to `SearchBar` that will fire whenever the state should be updated. We can use the `onChange` event on the inputs to be notified of it. The callbacks passed by `FilterableProductTable` will call `setState()`, and the app will be updated.

Though this sounds complex, it's really just a few lines of code. And it's really explicit how your data is flowing throughout the app.

## To byłoby na tyle {#and-thats-it}

Mamy nadzieję, że niniejszy przewodnik przybliżył ci myślenie Reactem, tzn. główne zasady którymi kierujemy się tworząc komponenty i aplikacje z użyciem React.js. Być może stosowanie tej biblioteki wymaga pisania większej ilości kodu niż inne znane ci biblioteki i frameworki, pamiętaj jednak, że kod czyta się znacznie częściej niż tworzy, a czytanie kodu napisanego w Reakcie nie przysparza najmniejszych problemów ze wzglęgu na jego modularność i przejrzystość. Zalety tej przejrzystości i modularności napewno docenisz tworząc duże biblioteki komponentów. Natomiast wielokrotne stostowanie gotowych kawałków kodu zaoszczędzi ci wiele pracy. :) 