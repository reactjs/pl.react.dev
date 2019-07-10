---
id: fragments
title: Fragmenty
permalink: docs/fragments.html
---

Często spotykanym wzorcem w Reakcie jest tworzenie komponentów, które zwracają wiele elementów. Fragmenty pozwalają zgrupować listę potomków bez konieczności dodawania zbędnych węzłów do drzewa DOM.

```js
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

Istnieje również nowy [skrócony zapis](#short-syntax) do deklarowania fragmentów.

## Motywacja {#motivation}

Zdarza się, że potrzebujemy w komponencie zwrócić listę potomków. Rozważmy poniższy przykład:

```jsx
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}
```

Aby zapewnić poprawność wyrenderowanego kodu HTML, komponent `<Columns />` powinien zwrócić kilka elementów `<td>`. Gdyby komórki tabeli, zwracane przez funkcję `render()` komponentu `<Columns />`, otoczyć np. elementem `<div>`, powstały w ten sposób kod HTML byłby nieprawidłowy.

```jsx
class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Witaj</td>
        <td>Świecie</td>
      </div>
    );
  }
}
```

daje w rezultacie następującą strukturę dla komponentu `<Table />`:

```jsx
<table>
  <tr>
    <div>
      <td>Witaj</td>
      <td>Świecie</td>
    </div>
  </tr>
</table>
```

Fragmenty rozwiązują ten problem.

## Użycie {#usage}

```jsx{4,7}
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Witaj</td>
        <td>Świecie</td>
      </React.Fragment>
    );
  }
}
```

daje w rezultacie następującą strukturę dla komponentu `<Table />`:

```jsx
<table>
  <tr>
    <td>Witaj</td>
    <td>Świecie</td>
  </tr>
</table>
```

### Skrócony zapis {#short-syntax}

Istnieje nowy, krótszy zapis służący do deklarowania fragmentów. Z wyglądu przypomina puste znaczniki:

```jsx{4,7}
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Witaj</td>
        <td>Świecie</td>
      </>
    );
  }
}
```

Możesz używać `<></>` tak samo, jak innych komponentów. Nie możesz jednak przekazywać do niego klucza (`key`) ani żadnych innych właściwości.

Zwróć uwagę, że **[wiele narzędzi nie posiada jeszcze wsparcia dla tego zapisu](/blog/2017/11/28/react-v16.2.0-fragment-support.html#support-for-fragment-syntax)**. Do czasu jego dodania pisz po prostu `<React.Fragment>`.

### Fragmenty z kluczem {#keyed-fragments}

Fragmenty zadeklarowane jawnie przy użyciu składni `<React.Fragment>` mogą posiadać klucze. Ma to zastosowanie, gdy zechcesz przemapować kolekcję na tablicę fragmentów -- na przykład do stworzenia listy opisów:

```jsx
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Bez `key` React wyrzuci błąd
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

`key` jest jedyną właściwością, którą można przekazać do fragmentu. Możliwe, że w przyszłości dodamy wsparcie dla innych właściwości, np. procedur obsługi zdarzeń.

### Demo {#live-demo}

Możesz wypróbować nową składnię JSX dla fragmentów na tym [CodePenie](https://codepen.io/reactjs/pen/VrEbjE?editors=1000).
