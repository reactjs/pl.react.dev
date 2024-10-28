---
title: Myślenie reactowe
---

<Intro>

React potrafi zmienić sposób myślenia o designach, na których się wzorujemy, i aplikacjach, które tworzymy. Kiedy tworzysz interfejs użytkownika w Reakcie, najpierw rozbijasz go na kawałki zwane *komponentami*. Następnie, opisujesz różne stany wizualne każdego z komponentów. Na koniec łączysz komponenty ze sobą, tak aby mogły przez nie przepływać dane. W tym samouczku poprowadzimy cię przez proces tworzenia w Reakcie tabeli z danymi produktowymi.

</Intro>

## Rozpoczynanie od makiety interfejsu {/*start-with-the-mockup*/}

Załóżmy, że masz już API JSON-owe oraz makiety interfejsu od designerów.

Niech API zwraca dane podobne do tych:

```json
[
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]
```

A designy niech wyglądają tak:

<img src="/images/docs/s_thinking-in-react_ui.png" width="300" style={{margin: '0 auto'}} />

Implementacja interfejsu w Reakcie zwykle sprowadza się do tych samych pięciu kroków.

## Krok 1: Rozbij UI na hierarchię komponentów {/*step-1-break-the-ui-into-a-component-hierarchy*/}

Zacznij od narysowania na designach prostokątów wokół każdego komponentu i podkomponentu, a następnie nadaj im nazwy. Jeśli współpracujesz z designerem, spytaj go o to - być może ma już dla nich gotowe nazwy.

Zależnie od tego, z jakiej działki się wywodzisz, możesz myśleć o podziale na komponenty na różne sposoby:

* **Programowanie** - zastosuj te same techniki, co przy decydowaniu, czy warto stworzyć nową funkcję lub obiekt. Jedną z takich technik jest [zasada jednej odpowiedzialności](https://pl.wikipedia.org/wiki/Zasada_jednej_odpowiedzialno%C5%9Bci), to znaczy, że idealnie by było, gdyby komponent robił tylko jedną rzeczy. Jeśli za bardzo się rozrośnie, warto zastanowić się nad podzialeniem go na kilka mniejszych.
* **CSS** - pomyśl, co powinno otrzymać swój własny selektor CSS-owy. (Chociaż komponenty zwykle są nieco bardziej rozdrobnione.)
* **Design** - pomyśl, jak należałoby zorganizować warstwy projektu graficznego.

Jeśli dane z API są dobrze zorganizowane, często naturalnie mapują się na strukturę komponentów UI, ponieważ mają taką samą strukturę informacyjną - czyli kształt. Porozdzielaj komponenty od siebie tak, by każdy z nich pasował do jednej części modelu danych.

Na naszej makiecie możemy wyróżnić pięć komponentów:

<FullWidth>

<CodeDiagram flip>

<img src="/images/docs/s_thinking-in-react_ui_outline.png" width="500" style={{margin: '0 auto'}} />

1. `FilterableProductTable` (szary) zawiera cały UI aplikacji.
2. `SearchBar` (niebieski) zbiera dane od użytkownika.
3. `ProductTable` (fioletowy) wyświetla i filtruje listę elementów na podstawie ustawień użytkownika.
4. `ProductCategoryRow` (zielony) wyświetla nagłówek każdej z kategorii.
5. `ProductRow`	(żółty) wyświetla wiersz dla każdego produktu.

</CodeDiagram>

</FullWidth>

Jeśli spojrzysz na `ProductTable` (fioletowy), zauważysz, że nagłówek tabeli (zawierający tekst "Name" i "Price") nie jest osobnym komponentem. To kwestia preferencji i można to zrobić inaczej. W tym przykładzie jest on częścią `ProductTable`, ponieważ wyświetlany jest wewnątrz listy `ProductTable`. Jednakże jeśli logika tego nagłówka się skomplikuje (np. jeśli dodamy sortowanie), sensownym byłoby wydzielenie go jako osobny komponent o nazwie `ProductTableHeader`.

Teraz, kiedy już zidentyfikowaliśmy wszystkie komponenty na grafice, możemy rozmieścić je w hierarchii. Komponenty, które znajdują się wewnątrz innych, w hierarchii powinny być głębiej:

* `FilterableProductTable`
    * `SearchBar`
    * `ProductTable`
        * `ProductCategoryRow`
        * `ProductRow`

## Krok 2: Zbuduj statyczną wersję w Reakcie {/*step-2-build-a-static-version-in-react*/}

Teraz, gdy już mamy gotową hierarchię komponentów, czas na implementację aplikacji. Najprościej będzie zbudować taką wersję, która renderuje interfejs z modelu danych bez dodawania żadnej interaktywności. Przynajmniej na razie! Często łatwiej jest najpierw zbudować statyczną wersję interfejsu, a następnie dodać do niej interakcje. Budowanie statycznej wersji wymaga dużo pisania i niewiele myślenia, natomiast dodawanie interaktywności wymaga dużo myślenia i niewiele pisania.

Aby zbudować statyczną wersję aplikacji, która renderuje dane, należy stworzyć [komponenty](/learn/your-first-component), które używają innych komponentów i przekazują do nich dane za pomocą [właściwości (ang. *props*)](/learn/passing-props-to-a-component). Właściwości pozwalają przekazywać dane z rodzica do potomka. (Jeśli wiesz, co to [stan](/learn/state-a-components-memory), nie dodawaj go do wersji statycznej. Stan jest zarezerwowany tylko dla interakcji, a konkretniej dla danych, które zmieniają się w czasie. A ponieważ to tylko wersja statyczna, zwyczajnie go nie potrzebujesz.)

Możesz zacząć budować "od góry do dołu", zaczynając od komponentów znajdujących się wyżej w hierarchii (np. `FilterableProductTable`) lub "od dołu do góry", zaczynając od tych najniżej (np. `ProductRow`). W prostszych przypadkach łatwiej jest iść z góry na dół, natomiast w większych projektach zwykle lepiej sprawdza się to drugie podejście.

<Sandpack>

```jsx src/App.js
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding-top: 10px;
}
td {
  padding: 2px;
  padding-right: 40px;
}
```

</Sandpack>

(Jeśli powyższy kod wydaje ci się za trudny, zajrzyj najpierw do rozdziału pt. [Szybki start](/learn/)!)

Po zakończeniu zadania będziesz mieć bibliotekę komponentów, które renderują twój model danych. Jako że na razie jest to statyczna wersja aplikacji, komponenty te będą jedynie zwracać kod JSX. Komponent na górze hierarchii (`FilterableProductTable`) otrzyma dane przez właściwość. Nazywamy to _przepływem jednokierunkowym_ (ang. *one-way data flow*), ponieważ dane przechodzą z górnego komponentu do komponentów potomnych.

<Pitfall>

Na tym etapie twoje komponenty nie powinny mieć żadnego stanu. Zajmiemy się tym w następnym kroku!

</Pitfall>

## Krok 3: Znajdź minimalną, ale kompletną reprezentację stanu interfejsu {/*step-3-find-the-minimal-but-complete-representation-of-ui-state*/}

Aby nadać interfejsowi interaktywności, musisz pozwolić użytkownikom zmieniać model danych znajdujący się pod spodem. W tym celu użyj *stanu*.

Pomyśl o stanie jako o minimalnym zestawie zmieniających się danych, które twoja aplikacja musi pamiętać. Najważniejszą zasadą projektowania stanu jest to, by [nie powtarzać się (DRY)](https://pl.wikipedia.org/wiki/DRY). Wymyśl absolutnie minimalną reprezentację stanu, jakiej potrzebuje twoja aplikacja, a wszystko inne obliczaj w razie potrzeby. Na przykład, jeśli tworzysz listę zakupów, możesz przechowywać produkty w tablicy. Jeśli chcesz dodatkowo wyświetlić liczbę produktów na liście, nie przechowuj tej liczby w osobnej zmiennej stanu. Zamiast tego odczytaj długość tablicy.

Zastanówmy się teraz nad wszystkimi kawałkami danych, które przetwarzać będzie nasza aplikacja:

1. Oryginalna lista produktów
2. Tekst wpisany przez użytkownika w polu wyszukiwania
3. Wartość pola wyboru
4. Przefiltrowana lista produktów

Które z nich kwalifikują się na stan? Wybierając je, kieruj się następującymi zasadami:

* Czy wartość **pozostaje stała** w czasie? Jeśli tak, to nie jest to stan.
* Czy wartość **jest przekazywana od rodzica** przez właściwości? Jeśli tak, to nie jest to stan.
* **Czy możesz obliczyć ją** na podstawie istniejącego stanu lub właściwości komponentu? Jeśli tak, to *z pewnością* nie jest stan!

Wszystko inne najprawdopodobniej jest stanem.

Przejdźmy przez wszystkie pozycje krok po kroku:

1. Oryginalna lista produktów **jest przekazywana przez właściwości, więc nie jest stanem**. 
2. Tekst wyszukiwarki wydaje się być stanem, bo zmienia się w czasie i nie można go obliczyć na podstawie niczego innego.
3. Wartość pola wyboru wydaje się być stanem, bo zmienia się w czasie i nie można go obliczyć na podstawie niczego innego.
4. Przefiltrowana lista produktów **nie jest stanem, bo można ją wyliczyć**, biorąc oryginalną listę produktów i filtrując ją zgodnie z tekstem wyszukiwarki i wartością pola wyboru.

Oznacza to, że jedynie tekst wyszukiwarki i wartość pola wyboru są stanem! Dobra robota!

<DeepDive>

#### Właściwości a stan {/*props-vs-state*/}

W Reakcie rozróżniamy dwa typy danych "modelowych": właściwości i stan. Obydwa różnią się od siebie:

* [**Właściwości** są jak argumenty, które przekazujemy](/learn/passing-props-to-a-component) do funkcji. Pozwalają komponentowi nadrzędnemu przekazać dane do komponentu potomnego i skonfigurować jego wygląd. Na przykład, `Form` może przekazać właściwość `color` do komponentu `Button`.
* [**Stan** jest jak pamięć komponentu.](/learn/state-a-components-memory) Pozwala komponentowi śledzić jakąś informację i zmieniać jej wartość w odpowiedzi na interakcje. Na przykład, `Button` może śledzić stan `isHovered`.

Właściwości i stan różnią się od siebie, ale dobrze ze sobą współgrają. Komponent nadrzędny często trzyma jakieś informacje w stanie (tak, aby mógł je zmieniać), a następnie *przekazuje je w dół* do komponentów potomnych poprzez właściwości. Nie przejmuj się, jeśli za pierwszym razem te różnice wydają ci się jeszcze trochę niejasne. Dokładne zrozumienie tego tematu wymaga nieco praktyki!

</DeepDive>

## Krok 4: Zdecyduj, gdzie stan powinien być trzymany {/*step-4-identify-where-your-state-should-live*/}

Po zidentyfikowaniu minimalnego stanu aplikacji, musisz zdecydować, który komponent powinien być odpowiedzialny za zmianę tego stanu - lub innymi słowy: który jest *właścicielem* stanu. Pamiętaj, że w Reakcie stosuje się jednokierunkowy przepływ danych, w którym dane przechodzą z góry na dół, od rodzica do potomka. To, który komponent powinien zarządzać stanem, może jeszcze wydawać się niejasne. Jeśli ta koncepcja jest dla ciebie nowa, może wydawać się trudna, ale kolejne akapity powinny pomóc ci ją lepiej zrozumieć!

Dla każdego fragmentu stanu aplikacji:

1. Zidentyfikuj *każdy* komponent, który renderuje coś na podstawie tego stanu.
2. Znajdź ich najbliższego wspólnego rodzica - komponent powyżej nich w hierarchii.
3. Zdecyduj, gdzie stan powinien być umieszczony:
    1. Często wystarczy umieścić go we wspólnym rodzicu.
    2. Możesz go również umieścić w komponencie powyżej tego rodzica.
    3. Jeśli nie możesz znaleźć odpowiedniego komponentu, stwórz go specjalnie w celu przechowywania stanu i dodaj go gdzieś wyżej w hierarchii, nad wspólnym rodzicem.

W poprzednim kroku znaleźliśmy dwa fragmenty stanu aplikacji: tekst wyszukiwarki oraz wartość pola wyboru. Akurat w tym przykładzie zawsze występują one równocześnie, dlatego łatwiej jest myśleć o nich jak o pojedynczym fragmencie stanu.

Zastosujmy na tym stanie poznaną przez nas strategię:

<<<<<<< HEAD
1. **Zidentyfikuj komponenty, które korzystają z tego stanu:**
    * `ProductTable` musi filtrować produkty na podstawie tego stanu (tekstu wyszukiwarki i wartości pola wyboru). 
    * `SearchBar` musi wyświetlać ten stan (tekst wyszukiwarki i wartość pola wyboru).
1. **Znajdź ich wspólnego rodzica:** Pierwszym rodzicem wspólnym dla obydwu komponentów jest `FilterableProductTable`.
2. **Zdecyduj, gdzie stan powinien być umieszczony**: Będziemy trzymać go w `FilterableProductTable`.
=======
1. **Identify components that use state:**
    * `ProductTable` needs to filter the product list based on that state (search text and checkbox value). 
    * `SearchBar` needs to display that state (search text and checkbox value).
2. **Find their common parent:** The first parent component both components share is `FilterableProductTable`.
3. **Decide where the state lives**: We'll keep the filter text and checked state values in `FilterableProductTable`.
>>>>>>> eb174dd932613fb0784a78ee2d9360554538cc08

Tak więc wartości stanu będą przechowywane w komponencie `FilterableProductTable`. 

Aby dodać stan do komponentu, użyj [hooka `useState()`](/reference/react/useState). Hooki pozwalają "zahaczyć" się o [cykl renderowania (ang. *render cycle*)](/learn/render-and-commit) komponentu. Dodaj dwie zmienne stanu na górze ciała komponentu `FilterableProductTable` i określ początkowy stan aplikacji:

```js
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);  
```

Następnie przekaż właściwości `filterText` i `inStockOnly` do komponentów `ProductTable` i `SearchBar`:

```js
<div>
  <SearchBar 
    filterText={filterText} 
    inStockOnly={inStockOnly} />
  <ProductTable 
    products={products}
    filterText={filterText}
    inStockOnly={inStockOnly} />
</div>
```

Teraz możesz przetestować zachowanie aplikacji. Zmień w poniższym kodzie początkową wartość stanu `filterText` z `useState('')` na `useState('fruit')`. Zauważ, że aktualizuje się zarówno tekst wyszukiwarki, jak i tabela pod spodem:

<Sandpack>

```jsx src/App.js
import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} />
      <ProductTable 
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} 
        placeholder="Search..."/>
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding-top: 5px;
}
td {
  padding: 2px;
}
```

</Sandpack>

Zwróć uwagę, że edytowanie formularza jeszcze nie działa. W konsoli sandboxu wyświetla się błąd, który tłumaczy, co się stało:

<ConsoleBlock level="error">

You provided a \`value\` prop to a form field without an \`onChange\` handler. This will render a read-only field.

</ConsoleBlock>

Co oznacza: "Do pola formularza przekazano właściwość `value` bez podania `onChange`. Spowoduje to wyrenderowanie pola tylko do odczytu."

W powyższym kodzie komponenty `ProductTable` i `SearchBar` odczytują właściwości `filterText` i `inStockOnly`, aby wyrenderować tabelę, pole tekstowe i pole wyboru. Dla przykładu, tak `SearchBar` wypełnia pole tekstowe:

```js {1,6}
function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} 
        placeholder="Wyszukaj..."/>
```

Nie dodaliśmy jeszcze żadnego kodu, który by obsłużył akcje użytkownika, jak na przykład wpisywanie tekstu. To będzie nasze ostatnie zadanie.

## Krok 5: Dodaj odwrócony przepływ danych {/*step-5-add-inverse-data-flow*/}

Aktualnie nasza aplikacja poprawnie renderuje się na podstawie właściwości i stanu płynących z góry hierarchii. Jednak aby można było zmienić stan na podstawie danych wprowadzonych przez użytkownika, należy dodać przepływ w drugą stronę: komponenty formularza będące głęboko w hierarchii muszą móc aktualizować stan z `FilterableProductTable`. 

React wymusza jawność tego przepływu danych, co wymaga trochę więcej pisania kodu niż wiązanie dwukierunkowe (ang. *two-way data binding*). Jeśli spróbujesz wpisać tekst lub zmienić zaznaczenie w przykładzie powyżej, zauważysz, że React ignoruje twoje zmiany. I robi to celowo. Pisząc `<input value={filterText} />` ustawiasz właściwość `value` elementu `input` tak, by zawsze odzwierciedlała stan `filterText` przekazany z `FilterableProductTable`. A ponieważ stan `filterText` nigdy się nie zmienia, również polem tekstowym się nie zmienia.

Naszym celem jest, aby każdorazowa zmiana kontrolek formularza powodowała zmianę stanu. Stan jest zarządzany przez komponent `FilterableProductTable`, dlatego tylko on może wywołać `setFilterText` i `setInStockOnly`. Aby umożliwić komponentowi `SearchBar` aktualizację stanu w `FilterableProductTable`, trzeba przekazać te funkcje do `SearchBar`:

```js {2,3,10,11}
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
```

Wewnątrz komponentu `SearchBar` nalezy dodać procedurę obsługi zdarzenia `onChange` i ustawiać w niej wartość stanu rodzica:

```js {4,5,13,19}
function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
```

Teraz nasza aplikacja jest w pełni funkcjonalna!

<Sandpack>

```jsx src/App.js
import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText} 
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
        products={products} 
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} placeholder="Search..." 
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} 
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding: 4px;
}
td {
  padding: 2px;
}
```

</Sandpack>

Więcej na temat obsługi zdarzeń i aktualizowania stanu możesz dowiedzieć się z rozdziału pt. [Dodawanie interaktywności](/learn/adding-interactivity).

## Dokąd teraz {/*where-to-go-from-here*/}

To było bardzo krótkie wprowadzenie do tego, w jaki sposób należy myśleć o tworzeniu komponentów i aplikacji w Reakcie. Możesz teraz [stworzyć projekt reactowy](/learn/installation) lub [zgłębić tajniki składni](/learn/describing-the-ui) użytej w tym samouczku.
