---
id: handling-events
title: Obsługa zdarzeń
permalink: docs/handling-events.html
prev: state-and-lifecycle.html
next: conditional-rendering.html
redirect_from:
  - "docs/events-ko-KR.html"
---

<<<<<<< HEAD
Obsługa zdarzeń w Reakcie jest bardzo podobna do tej z drzewa DOM. Istnieje jednak kilka różnic w składni:
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Responding to Events](https://beta.reactjs.org/learn/responding-to-events)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)


Handling events with React elements is very similar to handling events on DOM elements. There are some syntax differences:
>>>>>>> 63c77695a95902595b6c2cc084a5c3650b15210a

* Zdarzenia reactowe pisane są camelCasem, a nie małymi literami.
* W JSX procedura obsługi zdarzenia przekazywana jest jako funkcja, a nie łańcuch znaków.

Na przykład, poniższy kod HTML:

```html
<button onclick="activateLasers()">
  Aktywuj lasery
</button>
```

w Reakcie wygląda nieco inaczej::

```js{1}
<button onClick={activateLasers}>
  Aktywuj lasery
</button>
```

Kolejna różnica polega na tym, że w Reakcie nie można zwrócić `false` w celu zapobiegnięcia wykonania domyślnej akcji. Należy jawnie wywołać `preventDefault`. Na przykład, w czystym HTML-u, aby zapobiec domyślnej akcji formularza (wysłaniu danych), można napisać:

```html
<form onsubmit="console.log('Kliknięto na przycisk Wyślij.'); return false">
  <button type="submit">Wyślij</button>
</form>
```

W Reakcie, zamiast tego należy napisać:

```js{3}
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('Kliknięto na przycisk Wyślij.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Wyślij</button>
    </form>
  );
}
```

Zmienna `e` to zdarzenie syntetyczne (ang. *synthetic event*). React tworzy zdarzenia tego typu zgodnie ze [specyfikacją W3C](https://www.w3.org/TR/DOM-Level-3-Events/), dzięki czemu nie trzeba martwić się o kompatybilność z przeglądarkami. Zdarzenia reactowe nie działają dokładnie tak samo jak te natywne. Po więcej informacji sięgnij do specyfikacji obiektu [`SyntheticEvent`](/docs/events.html).

W kodzie reactowym nie ma potrzeby dodawania obserwatora zdarzenia (ang. *event listener*) do elementu DOM po jego utworzeniu, poprzez wywoływanie funkcji `addEventListener`. Zamiast tego, wystarczy przekazać go podczas pierwszego renderowania komponentu.

Gdy komponent definiowany jest przy użyciu [klasy ze standardu ES6](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Classes), często definiuje się procedurę obsługi zdarzenia jako metodę tej klasy. Na przykład, poniższy komponent `Toggle` wyświetli przycisk, który pozwala użytkownikowi przełączać się między stanami "WŁĄCZONY" i "WYŁĄCZONY":

```js{6,7,10-14,18}
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // Poniższe wiązanie jest niezbędne do prawidłowego przekazania `this` przy wywołaniu funkcji
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'WŁĄCZONY' : 'WYŁĄCZONY'}
      </button>
    );
  }
}
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)

Należy zwrócić szczególną uwagę na znaczenie `this` funkcjach zwrotnych (ang. *callbacks*) używanych w JSX. W JavaScripcie metody klasy nie są domyślnie [dowiązane](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Functions/Funkcje_strzalkowe) do instancji. Jeśli zapomnisz dowiązać metodę `this.handleClick` i przekażesz ją jako atrybut `onClick`, to `this` przy wywołaniu będzie miało wartość `undefined`.

To zachowanie nie jest specyficzne dla Reacta; [tak właśnie działają funkcje w JavaScripcie](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/). Generalnie, jeśli odwołujesz się do metody bez `()` po nazwie, jak na przykład `onClick={this.handleClick}`, pamiętaj, aby zawsze dowiązywać ją do instancji.

Jeśli denerwuje Cię ciągłe wywoływanie `bind`, istnieją dwa sposoby na obejście tego problemu. Możesz skorzystać ze [składni publicznych pól klasy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_instance_fields), aby poprawnie dowiązać metody do instancji:

```js{2-6}
class LoggingButton extends React.Component {
  // Poniższy kod wymusza dowiązanie `this` wewnątrz handleClick.
  handleClick = () => {
    console.log('this ma wartość:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Kliknij mnie
      </button>
    );
  }
}
```

Powyższa składnia jest domyślnie włączona w [Create React App](https://github.com/facebookincubator/create-react-app).

Jeśli nie chcesz używać tej składni, możesz skorzystać z [funkcji strzałkowej](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Functions/Funkcje_strzalkowe) (ang. *arrow function*):

```js{7-9}
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this ma wartość:', this);
  }

  render() {
    // Poniższy kod wymusza dowiązanie `this` wewnątrz handleClick.
    return (
      <button onClick={() => this.handleClick()}>
        Kliknij mnie
      </button>
    );
  }
}
```

Problem z taką składnią polega na tym, że za każdym razem, gdy `LoggingButton` jest renderowany, tworzona jest nowa funkcja. W większości przypadków nie ma to większego znaczenia. Jeśli jednak będzie przekazywana do komponentów osadzonych głębiej w strukturze, będzie niepotrzebnie powodowała ich ponowne renderowanie. Zalecamy więc korzystanie ze składni pól klasy lub wiązanie metod w konstruktorze, aby uniknąć tego typu problemów z wydajnością.

## Przekazywanie argumentów do procedur obsługi zdarzeń {#passing-arguments-to-event-handlers}

Dość często, na przykład w pętli, potrzebujemy przekazać do procedury obsługi zdarzenia dodatkowy parametr. Na przykład, jeśli zmienna `id` zawierałaby identyfikator wiersza w tabeli, można by rozwiązać to na dwa sposoby:

```js
<button onClick={(e) => this.deleteRow(id, e)}>Usuń wiersz</button>
<button onClick={this.deleteRow.bind(this, id)}>Usuń wiersz</button>
```

Obydwie linie robią to samo, przy użyciu, odpowiednio, [funkcji strzałkowej](https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Functions/Funkcje_strzalkowe) oraz [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind).

W obydwóch przypadkach argument `e`, reprezentujący zdarzenie reactowe, zostanie przekazany jako drugi w kolejności, zaraz po identyfikatorze wiersza. W przypadku funkcji strzałkowej, musimy przekazać go jawnie, natomiast w `bind` kolejne argumenty są przekazywane do funkcji automatycznie.
