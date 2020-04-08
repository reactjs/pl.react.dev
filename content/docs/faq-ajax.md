---
id: faq-ajax
title: AJAX i API
permalink: docs/faq-ajax.html
layout: docs
category: FAQ
---

### Jak mogę wykonać zapytanie AJAX? {#how-can-i-make-an-ajax-call}

Możesz użyć dowolnej biblioteki AJAX. Do najpopularniejszych wyborów należą: [Axios](https://github.com/axios/axios), [jQuery AJAX](https://api.jquery.com/jQuery.ajax/) oraz wbudowane w przeglądarki [window.fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

### W którym momencie cyklu życia komponentu powinno się wykonać zapytanie AJAX? {#where-in-the-component-lifecycle-should-i-make-an-ajax-call}

Dane należy uzupełniać z wykorzystaniem zapytań AJAX w metodzie [`componentDidMount`](/docs/react-component.html#mounting). Dzięki temu po pobraniu danych możliwe będzie użycie metody `setState` do zmodyfikowania stanu komponentu.

### Przykład: Używanie rezultatu zapytania AJAX do ustawienia lokalnego stanu {#example-using-ajax-results-to-set-local-state}

Niniejszy przykład pokazuje, jak wykonując zapytania AJAX w metodzie `componentDidMount` można zmodyfikować stan komponentu.

Nasze przykładowe API zwraca następujący obiekt JSON:

```
{
  "items": [
    { "id": 1, "name": "Jabłka",  "price": "2 zł" },
    { "id": 2, "name": "Brzoskwinie", "price": "5 zł" }
  ]
}
```

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Uwaga: to ważne, żeby obsłużyć błędy tutaj, a
        // nie w bloku catch(), aby nie przetwarzać błędów
        // mających swoje źródło w komponencie.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Błąd: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Ładowanie...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.name}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      );
    }
  }
}
```

Here is the equivalent with [Hooks](https://reactjs.org/docs/hooks-intro.html): 

```js
function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.items);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {items.map(item => (
          <li key={item.name}>
            {item.name} {item.price}
          </li>
        ))}
      </ul>
    );
  }
}
```
