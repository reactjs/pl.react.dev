---
id: lists-and-keys
title: Listy i klucze
permalink: docs/lists-and-keys.html
prev: conditional-rendering.html
next: forms.html
---

<div class="scary">

> These docs are old and won't be updated. Go to [react.dev](https://react.dev/) for the new React docs.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Rendering Lists](https://react.dev/learn/rendering-lists)

</div>

Na początku przyjrzymy się, jak przekształca się listy w JavaScripcie.
 
W kodzie poniżej, użyliśmy funkcji [`map()`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array/map), aby podwoić wartość liczb w tablicy `numbers`. Następnie przypisaliśmy nową tablicę zwróconą z funkcji `map()` do zmiennej `doubled` i wyświetliliśmy ją w konsoli:

```javascript{2}
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```
 
Kod ten wyświetla w konsoli `[2, 4, 6, 8, 10]`.
 
W Reakcie przekształcanie tablic w listy [elementów](/docs/rendering-elements.html) przebiega niemalże identyczne.
 
### Wyświetlanie wielu komponentów {#rendering-multiple-components}
 
Możesz zbudować kolekcje elementów i [dodać je do JSX](/docs/introducing-jsx.html#embedding-expressions-in-jsx) używając nawiasów klamrowych `{}`.
 
Poniżej iterujemy tablicę liczb `numbers` używając javascriptowej funkcji [`map()`](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array/map). Zwracamy element `<li>` dla każdego elementu tablicy. Na koniec przypisujemy powstałą w ten sposób tablicę do zmiennej `listItems`:
 
```javascript{2-4}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```
 
Umieszczamy całą tablicę `listItems` wewnątrz elementu `<ul>`:

```javascript{2}
<ul>{listItems}</ul>
```
 
[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)
 
Ten kod wyświetla wypunktowaną listę liczb od 1 do 5.
 
### Podstawowy komponent listy {#basic-list-component}
 
Zazwyczaj będziesz wyświetlać listy wewnątrz [komponentu](/docs/components-and-props.html).
 
Możemy przekształcić poprzedni przykład w komponent, który akceptuje tablicę liczb `numbers` i zwraca listę elementów.
 
```javascript{3-5,7,13}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
 
const numbers = [1, 2, 3, 4, 5];
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NumberList numbers={numbers} />);
```
 
Kiedy uruchomisz powyższy kod, dostaniesz ostrzeżenie o tym, że do elementów listy należy dostarczyć właściwość klucza. „Klucz” (ang. *key*) jest specjalnym atrybutem o typie łańcucha znaków, który musisz dodać podczas tworzenia elementów listy. O tym, dlaczego jest to ważne, opowiemy w następnej sekcji.
 
Przypiszmy właściwość `key` do naszych elementów listy wewnątrz `numbers.map()`, czym naprawimy problem brakującego klucza.
 
```javascript{4}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
```
 
[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)
 
## Klucze {#keys}
 
Klucze pomagają Reaktowi zidentyfikować, które elementy uległy zmianie, zostały dodane lub usunięte. Klucze powinny zostać nadane elementom wewnątrz tablicy, aby elementy zyskały stabilną tożsamość:
 
```js{3}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```
 
Najlepszym sposobem wyboru klucza jest użycie unikatowego ciągu znaków, który jednoznacznie identyfikuje element listy spośród jego rodzeństwa. Jako kluczy często będziesz używać identyfikatorów (ang. *IDs*) ze swoich danych:
 
```js{2}
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```
 
Jeśli w danych nie masz stabilnych identyfikatorów dla wyświetlanych elementów, w skrajnym przypadku do określenia klucza możesz użyć indeksu elementu tablicy:
 
```js{2,3}
const todoItems = todos.map((todo, index) =>
  // Rób to tylko w przypadku, gdy elementy nie mają stabilnych identyfikatorów
  <li key={index}>
    {todo.text}
  </li>
);
```
 
Nie zalecamy używania indeksów jako kluczy, jeżeli kolejność elementów może ulec zmianie. Może to negatywnie wpłynąć na wydajność i spowodować problemy ze stanem komponentu. Sprawdź artykuł Robina Pokorny'ego ze [szczegółowym wyjaśnieniem negatywnych aspektów używania indeksu jako klucza](https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/). Jeżeli nie zdecydujesz się jawnie ustawić kluczy dla elementów listy, React domyślnie jako kluczy użyje indeksów.
 
Jeżeli chcesz dowiedzieć się więcej, tutaj znajdziesz [szczegółowe wyjaśnienie, dlaczego klucze są niezbędne](/docs/reconciliation.html#recursing-on-children).
 
### Wyodrębnianie komponentów z kluczami {#extracting-components-with-keys}
 
Klucze mają sens tylko w kontekście otaczającej tablicy.
 
Dla przykładu, jeżeli [wyodrębnisz](/docs/components-and-props.html#extracting-components) komponent `ListItem`, ustaw klucz na elementach `<ListItem />` wewnątrz tablicy zamiast na elemencie `<li>` wewnątrz komponentu `ListItem`.
 
**Przykład: Niepoprawne użycie klucza**
 
```javascript{4,5,14,15}
function ListItem(props) {
  const value = props.value;
  return (
    // Źle! Nie ma potrzeby definiowania klucza tutaj:
    <li key={value.toString()}>
      {value}
    </li>
  );
}
 
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Źle! Klucz powinien zostać określony w tym miejscu:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```
 
**Przykład: Poprawne użycie klucza**
 
```javascript{2,3,9,10}
function ListItem(props) {
  // Dobrze! Nie ma potrzeby definiowania klucza tutaj:
  return <li>{props.value}</li>;
}
 
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Dobrze! Klucz powinien zostać ustawiony na elementach wewnątrz tablicy.
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```
 
[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)
 
Podstawową regułą jest to, że elementy wewnątrz wywołania `map()` potrzebują kluczy.
 
### Klucze muszą być unikalne tylko wśród rodzeństwa {#keys-must-only-be-unique-among-siblings}
 
Klucze używane wewnątrz tablic powinny być unikalne w kontekście swojego rodzeństwa. Jednakże nie muszą one być niepowtarzalne globalnie. Możemy użyć tych samych kluczy, gdy tworzymy dwie różne tablice:
 
```js{2,5,11,12,19,21}
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}
 
const posts = [
  {id: 1, title: 'Witaj Świecie', content: 'Witamy uczących się Reacta!'},
  {id: 2, title: 'Instalacja', content: 'Możesz zainstalować Reacta używając npm.'}
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Blog posts={posts} />);
```
 
[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)
 
Klucze służą Reactowi jako wskazówka, ale nie są one przekazywane do twoich komponentów. Jeżeli potrzebujesz tych wartości w swoim komponencie, przekaż je jawnie poprzez właściwość o innej nazwie:
 
```js{3,4}
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```
 
W powyższym przykładzie, komponent `Post` może odczytać `props.id`, ale nie `props.key`.
 
### Użycie map() wewnątrz JSX {#embedding-map-in-jsx}
 
W poprzednich przykładach zadeklarowaliśmy oddzielną zmienną `listItems` wewnątrz JSX:
 
```js{3-6}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```
 
JSX pozwala na [wstawienie dowolnego wyrażenia](/docs/introducing-jsx.html#embedding-expressions-in-jsx) wewnątrz nawiasów klamrowych, dzięki temu możemy użyć wyniku funkcji `map()` bez przypisywania go do zmiennej:
 
```js{5-8}
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```
 
[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)
 
Czasami dzięki temu kod staje się bardziej przejrzysty, jednak łatwo doprowadzić do nadużywania tego sposobu. Tak samo jak w JavaScripcie, wybór należy do Ciebie, czy warto wyodrębnić zmienną, aby zwiększyć czytelność. Zapamiętaj, że jeżeli ciało funkcji `map()` jest zbyt zagnieżdżone, może to być odpowiedni moment na [wyodrębnienie komponentu](/docs/components-and-props.html#extracting-components).
