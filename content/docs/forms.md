---
id: forms
title: Formularze
permalink: docs/forms.html
prev: lists-and-keys.html
next: lifting-state-up.html
redirect_from:
  - "tips/controlled-input-null-value.html"
  - "docs/forms-zh-CN.html"
---

W Reakcie elementy formularza HTML działają trochę inaczej niż pozostałe elementy DOM. Wynika to stąd, że elementy formularza same utrzymują swój wewnętrzny stan. Dla przykładu przyjrzyjmy się zwykłemu formularzowi HTML z jedną wartością - imieniem:

```html
<form>
  <label>
    Imię:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Wyślij" />
</form>
```

Powyższy formularz posiada domyślną funkcję automatycznego przekierowania przeglądarki do nowej strony po wysłaniu formularza przez użytkownika. Jeśli zależy ci na tej funkcjonalności, to działa ona również w Reakcie. Jednak w większości przypadków dobrze jest mieć funkcję javascriptową, która obsługuje wysyłanie formularza i ma dostęp do podanych przez użytkownika danych. Standardem stała się obsługa formularzy poprzez tzw. "komponenty kontrolowane".

## Komponenty kontrolowane {#controlled-components}

W HTML-u, elementy formularza takie jak `<input>`, `<textarea>` i `<select>` najczęściej zachowują swój własny stan, który jest aktualizowany na podstawie danych wejściowych podawanych przez użytkownika. Natomiast w Reakcie zmienny stan komponentu jest zazwyczaj przechowywany we właściwości `state` (pol. *stan*) danego komponentu. Jest on aktualizowany jedynie za pomocą funkcji [`setState()`](/docs/react-component.html#setstate).

Możliwe jest łączenie tych dwóch rozwiązań poprzez ustanowienie reactowego stanu jako "wyłącznego źródła prawdy". Wówczas reactowy komponent renderujący dany formularz kontroluje również to, co zachodzi wewnątrz niego podczas wypełniania pól przez użytkownika. Element `input` formularza, kontrolowany w ten sposób przez Reacta, nazywamy "komponentem kontrolowanym"

Gdybyśmy chcieli sprawić, aby podany wcześniej przykładowy formularz wyświetlał przy wysłaniu podane przez użytkownika imię, możemy zrobić z niego komponent kontrolowany w następujący sposób:

```javascript{4,10-12,24}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Podano następujące imię: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Imię:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Wyślij" />
      </form>
    );
  }
}
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/VmmPgp?editors=0010)

Dzięki ustawieniu atrybutu `value` na elemencie formularza, wyświetlane dane zawsze będą odpowiadały `this.state.value`. Tym samym reactowy stan jest tutaj źródłem prawdy. Ponieważ zaś `handleChange` aktualizuje reactowy stan przy każdym wciśnięciu klawisza, wyświetlane dane aktualizują się na bieżąco w miarę wpisywania ich przez użytkownika.

W komponentach kontrolowanych wartość elementu formularza zawsze zależy od stanu reactowego. Owszem, wymaga to napisania większej ilości kodu, jednak dzięki temu możliwe jest przekazanie wartości do innych elementów interfejsu albo nadpisanie jej wewnątrz procedur obsługi zdarzeń.

## Znacznik `textarea` {#the-textarea-tag}

W HTML-u element `<textarea>` definiuje swój tekst poprzez elementy potomne:

```html
<textarea>
  Cześć, oto przykład tekstu w polu tekstowym.
</textarea>
```

Natomiast w Reakcie `<textarea>` wykorzystuje w tym celu atrybut `value`. Dzięki temu kod formularza zawierającego `<textarea>` może być podobny do kodu formularza z jednoliniowym elementem `input`:

```javascript{4-6,12-14,26}
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Proszę napisać wypracowanie o swoim ulubionym elemencie DOM'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Wysłano następujące wypracowanie: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Wypracowanie:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Wyślij" />
      </form>
    );
  }
}
```

Zwróć uwagę, że wartość `this.state.value` jest inicjalizowana w konstruktorze, tak aby pole tekstowe zawierało jakiś domyślny tekst.

## Znacznik `select` {#the-select-tag}

W HTML-u element `<select>` tworzy rozwijaną listę. Dla przykładu poniższy kod HTML tworzy rozwijaną listę smaków:

```html
<select>
  <option value="grejpfrutowy">Grejpfrutowy</option>
  <option value="limonkowy">Limonkowy</option>
  <option selected value="kokosowy">Kokosowy</option>
  <option value="mango">Mango</option>
</select>
```

Zwróć uwagę na atrybut `selected`, który sprawia, że opcją wybraną domyślnie jest opcja "Kokosowy". W Reakcie zamiast atrybutu `selected` używamy atrybutu `value` na głównym znaczniku `select`. W przypadku komponentów kontrolowanych jest to rozwiązanie bardziej dogodne, ponieważ wartość tego atrybutu aktualizowana jest tylko w jednym miejscu:

```javascript{4,10-12,24}
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: "kokosowy"};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Twój ulubiony smak to: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Wybierz swój ulubiony smak:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grejpfrutowy">Grejpfrutowy</option>
            <option value="limonkowy">Limonkowy</option>
            <option value="kokosowy">Kokosowy</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Wyślij" />
      </form>
    );
  }
}
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/JbbEzX?editors=0010)

Ogólnie elementy `<input type="text">`, `<textarea>`, i `<select>` działają podobnie. Wszystkie przyjmują atrybut `value`, który można wykorzystać w komponentach kontrolowanych.

> Wskazówka
>
> Wartością atrybutu `value` może być także tablica. Daje to możliwość wyboru spośród wielu opcji w znaczniku `select`:
>
> ```js
> <select multiple={true} value={['B', 'C']}>
> ```

## Znacznik `input` dla plików {#the-file-input-tag}

W HTML-u element `<input type="file">` pozwala użytkownikom wybrać jeden lub więcej plików z pamięci swojego urządzenia, które następnie mogą być wysłane do serwera lub przetworzone z użyciem kodu JavaScript poprzez [interfejs klasy `File`](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications).

```html
<input type="file" />
```

Ponieważ wartość tego elementu jest wartością przeznaczoną tylko do odczytu, w Reakcie jest to komponent **niekontrolowany**. Przedstawimy go wraz z innymi komponentami tego typu [w dalszej części dokumentacji](/docs/uncontrolled-components.html#the-file-input-tag).

## Obsługa wielu elementów `input` {#handling-multiple-inputs}

Kiedy zachodzi potrzeba obsługi wielu kontrolowanych elementów `input`, do każdego elementu można dodać atrybut `name` oraz pozwolić funkcji obsługującej (ang. *handler function*) zadecydować o dalszych krokach w zależności od wartości atrybutu `event.target.name`.

Przyjrzyjmy się następującemu przykładowi:

```javascript{15,18,28,37}
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.name === "isGoing" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Wybiera się:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Liczba gości:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

[**Przetestuj kod na CodePen**](https://codepen.io/gaearon/pen/wgedvV?editors=0010)

Zwróć uwagę na wykorzystaną przez nas składnię [obliczonych nazw właściwości](https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Operatory/Object_initializer#Obliczone_nazwy_w%C5%82a%C5%9Bciwo%C5%9Bci) umożliwioną przez ES6. Pozwala ona na aktualizację klucza stanu odpowiadającego nazwie danego elementu `input`:

```js{2}
this.setState({
  [name]: value
});
```

W składni ES5 wyglądałoby to następująco:

```js{2}
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

Ponadto ponieważ `setState()` automatycznie [scala podany stan częściowy ze stanem aktualnym](/docs/state-and-lifecycle.html#state-updates-are-merged), funkcja ta wywoływana jest tylko z nowo dostarczonymi danymi.

## Wartość `null` w kontrolowanym elemencie `input` " {#controlled-input-null-value}

Określenie wartości właściwości (ang. *prop*) [komponentu kontrolowanego](/docs/forms.html#controlled-components) zapobiega niepożądanym zmianom danych wejściowych przez użytkownika. Jeśli określisz wartość dla `value`, a dane wejściowe w dalszym ciągu będzie można edytować, sprawdź, czy przez pomyłkę nie przekazujesz wartości `undefined` lub `null`.

Kod poniżej ilustruje ten problem. (Element `input` jest początkowo zablokowany, ale po krótkiej chwili jego zawartość można edytować.)

```javascript
ReactDOM.render(<input value="Cześć" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);
```

## Inne rozwiązania {#alternatives-to-controlled-components}

Stosowanie kontrolowanych komponentów może być niekiedy uciążliwe, ponieważ wymaga nie tylko tworzenia funkcji obsługujących każdą możliwą zmianę twoich danych, lecz także przekazywania stanu elementu `input` poprzez komponent reactowy. To z kolei może się stać wyjątkowo irytującym doświadczeniem, zwłaszcza gdy konwertujesz istniejący już kod na kod reactowy lub kiedy integrujesz aplikację reactową z biblioteką nie-reactową. W tych sytuacjach warto abyś przyjrzał się [komponentom niekontrolowanym](/docs/uncontrolled-components.html), które stanowią alternatywną technikę stosowania formularzy.

## Rozwiązania całościowe {#fully-fledged-solutions}

Jeśli szukasz rozwiązania kompleksowego umożliwiającego walidację, śledzenie odwiedzonych pól oraz obsługę wysyłania danych, często wybieraną opcją jest [biblioteka Formik](https://jaredpalmer.com/formik). Rozwiązanie to bazuje jednak na tych samych zasadach co komponenty kontrolowane i zarządzanie stanem. Dlatego bardzo ważne jest, abyś przyswoił sobie te zasady.